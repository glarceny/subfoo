// by Stenly
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = "https://deep-seek.ai";
const CHAT_PAGE = `${BASE}/chat`;
const API = `${BASE}/api/chat`;

const MODELS: Record<string, string> = {
  chat31: "deepseek/deepseek-chat-v3.1",
  r1: "deepseek/deepseek-r1",
  v32: "deepseek/deepseek-v3.2"
};

const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

function splitSetCookie(value: string | null) {
  if (!value) return [];
  return value.split(/,(?=\s*[^;,]+=)/g).map((v) => v.trim()).filter(Boolean);
}

function mergeCookies(oldCookie = "", setCookies: string[] = []) {
  const map = new Map();
  for (const part of oldCookie.split(";").map((v) => v.trim()).filter(Boolean)) {
    map.set(part.split("=")[0], part);
  }
  for (const item of setCookies) {
    const pair = item.split(";")[0];
    if (pair.includes("=")) map.set(pair.split("=")[0], pair);
  }
  return [...map.values()].join("; ");
}

function findCsrf(html: string) {
  const patterns = [
    /<meta[^>]+name=["']csrf-token["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']csrf-token["']/i,
    /csrfToken["']?\s*[:=]\s*["']([^"']+)["']/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, model = "v32", history = [] } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    const selectedModel = MODELS[model] || MODELS.v32;

    // 1. Refresh Session untuk dapet Cookie & CSRF
    const sessionRes = await fetch(CHAT_PAGE, {
      method: "GET",
      headers: { 
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });

    const html = await sessionRes.text();
    const setCookies = splitSetCookie(sessionRes.headers.get("set-cookie"));
    const cookie = mergeCookies("", setCookies);
    const csrfToken = findCsrf(html);

    // 2. Kirim Chat Request
    const messages = [
      ...history.map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: prompt }
    ];

    const body = { model: selectedModel, messages };

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "sec-ch-ua-platform": `"Android"`,
        "x-csrf-token": csrfToken,
        "User-Agent": UA,
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Origin": BASE,
        "Referer": CHAT_PAGE,
        "Cookie": cookie
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
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
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const rawLine of lines) {
              const line = rawLine.trim();
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (!data || data === "[DONE]") continue;

              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (typeof content === "string") {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {}
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
        "X-Stenly-Engine": `DeepSeek-SL-${model.toUpperCase()}`,
        "X-Stenly-Model": selectedModel
      },
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
