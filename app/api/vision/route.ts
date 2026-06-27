// by Stenly
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const API = "https://aga-api.aichatting.net/aigc/chat/v2/professional/stream";
const MODEL = "gpt-4o-mini";
const PUBLIC_KEY_BASE64 = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCAdf/EyIbLBxjGqmh7qLU6/CPCzru+75+82OSPZ+nf4BFvg88drpZ6KigNW0J8TNgxe6Yms1irCZNVDyu+RXsl4y/7c2KOHc4OGTzHB5fUMiMasFUvcEs2P70e6yA/sKHZfBLG1XPhlb84Ibs3nhD3W5e2SuC+4EuVkaqzN08LQIDAQAB";

const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

function makePublicKey() {
  const wrapped = PUBLIC_KEY_BASE64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${wrapped}\n-----END PUBLIC KEY-----`;
}

function encryptVisitorId(visitorId: string) {
  const encrypted = crypto.publicEncrypt(
    {
      key: makePublicKey(),
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(visitorId)
  );
  return encrypted.toString("base64");
}

function makeVisitorId() {
  return crypto.randomBytes(16).toString("hex");
}

function makeConversationId() {
  return crypto.randomInt(10000000, 99999999);
}

async function urlToDataUrl(imageUrl: string) {
  const response = await fetch(imageUrl, {
    headers: {
      "user-agent": UA,
      accept: "image/jpeg,image/png,*/*;q=0.8",
      referer: "https://www.google.com/",
    },
  });

  if (!response.ok) throw new Error(`Gagal download image URL: ${response.status}`);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = response.headers.get("content-type") || "image/jpeg";
  
  return `data:${contentType};base64,${buffer.toString("base64")}`;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, imageUrl, history = [] } = await req.json();

    const visitorId = makeVisitorId();
    const vtoken = encryptVisitorId(visitorId);
    const conversationId = makeConversationId();

    const content: any[] = [{ type: "text", text: prompt || "Analyze this image" }];
    
    if (imageUrl) {
      try {
        const dataUrl = await urlToDataUrl(imageUrl);
        content.push({ type: "image_url", image_url: { url: dataUrl } });
      } catch (e) {
        console.error("Image loading failed:", e);
      }
    }

    const userMessage = { role: "user", content: content };

    const body = {
      spaceHandle: true,
      roleId: 0,
      messages: [...history.slice(-10), userMessage],
      conversationId: conversationId,
      model: MODEL,
    };

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "sec-ch-ua-platform": `"Android"`,
        "lang": "en",
        "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
        "sec-ch-ua-mobile": "?1",
        "vtoken": vtoken,
        "source": "web",
        "user-agent": UA,
        "accept": "text/event-stream,application/json",
        "content-type": "application/json",
        "origin": "https://www.aichatting.net",
        "referer": "https://www.aichatting.net/",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText }, { status: res.status });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = res.body?.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split(/\r?\n/);
            buffer = lines.pop() || "";

            for (const line of lines) {
              const clean = line.trim();
              if (!clean.startsWith("data:")) continue;
              let data = clean.slice(5);
              if (!data.trim() || data.includes("--@DONE@--")) continue;
              
              // Clean the specific separators used by this API
              data = data.replace(/-=-\s*--/g, " ");
              data = data.replace(/-=-\s*/g, " ");
              data = data.replace(/=--/g, " ");
              data = data.replace(/=-/g, " ");
              data = data.replace(/\s+/g, " ");
              
              controller.enqueue(encoder.encode(data));
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Stenly-Engine": "GPT-4o-Mini-Vision",
        "X-Visitor-ID": visitorId,
        "X-Conversation-ID": conversationId.toString(),
      },
    });

  } catch (error: any) {
    console.error("Vision Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
