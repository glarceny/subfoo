// by Stenly
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import axios from "axios";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = "https://notegpt.io";
const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

function uuid() {
  return crypto.randomUUID();
}

function randomNumber(length = 10) {
  let result = "";
  for (let i = 0; i < length; i++) result += Math.floor(Math.random() * 10);
  return result;
}

function makeSboxGuid() {
  const now = Math.floor(Date.now() / 1000);
  const raw = `${now}|762|${randomNumber(9)}`;
  return Buffer.from(raw).toString("base64");
}

function makeCookieHeader() {
  const now = Math.floor(Date.now() / 1000);
  const anonymousUserId = uuid();

  return [
    `_ga_PFX3BRW5RQ=GS2.1.s${now}$o1$g0$t${now}$j60$l0$h${randomNumber(9)}`,
    `_ga=GA1.2.${randomNumber(9)}.${now}`,
    `_gid=GA1.2.${randomNumber(9)}.${now}`,
    `_gat_gtag_UA_252982427_14=1`,
    `sbox-guid=${encodeURIComponent(makeSboxGuid())}`,
    `anonymous_user_id=${anonymousUserId}`,
  ].join("; ");
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, history = [] } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    const conversationId = uuid();
    const cookieHeader = makeCookieHeader();

    const payload = {
      message: prompt,
      language: "auto",
      model: "deepseek-v4-flash",
      tone: "default",
      length: "moderate",
      conversation_id: conversationId,
      image_urls: [],
      history_messages: history.slice(-5).flatMap((item: any) => [
        { role: "user", content: item.user },
        { role: "assistant", content: item.assistant },
      ]),
      chat_mode: "deep_think",
    };

    const res = await axios.post(
      `${BASE}/api/v2/chat/stream`,
      JSON.stringify(payload),
      {
        timeout: 60000,
        responseType: "stream",
        validateStatus: () => true,
        headers: {
          "sec-ch-ua-platform": `"Android"`,
          "User-Agent": UA,
          "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
          "Content-Type": "application/json",
          "sec-ch-ua-mobile": "?1",
          Accept: "*/*",
          Origin: BASE,
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          Referer: `${BASE}/chat-deepseek`,
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "id-ID,id;q=0.9",
          Cookie: cookieHeader,
          priority: "u=1, i",
        },
      }
    );

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        res.data.on("data", (chunk: any) => {
          const rawBody = chunk.toString();
          const lines = rawBody.split(/\r?\n/);
          for (const line of lines) {
            const clean = line.trim();
            if (!clean.startsWith("data:")) continue;
            const raw = clean.replace(/^data:\s*/, "").trim();
            if (!raw || raw === "[DONE]") continue;

            try {
              const json = JSON.parse(raw);
              if (json.reasoning) controller.enqueue(encoder.encode(json.reasoning));
              if (json.text) controller.enqueue(encoder.encode(json.text));
              if (json.done) {
                 // We don't close here if there might be more data, but usually [DONE] or json.done is the end
              }
            } catch {}
          }
        });

        res.data.on("end", () => {
          controller.close();
        });

        res.data.on("error", (err: any) => {
          controller.error(err);
        });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Stenly-Engine": "DeepSeek-V4-Flash",
      },
    });

  } catch (error: any) {
    console.error("DeepSeek Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
