// by Stenly
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const API = "https://api.overchat.ai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { messages = [], chatId, deviceId } = await req.json();
    
    const finalChatId = chatId || crypto.randomUUID();
    const finalDeviceId = deviceId || crypto.randomUUID();

    // Pastikan setiap pesan memiliki ID dan tambahkan system prompt di urutan yang benar
    const processedMessages = [
      {
        id: crypto.randomUUID(),
        role: "system",
        content: "Ikuti bahasa user dan jawab dengan gaya natural, singkat, dan jelas."
      },
      ...messages.map((msg: any) => ({
        id: msg.id || crypto.randomUUID(),
        role: msg.role,
        content: msg.content
      }))
    ];

    const body = {
      chatId: finalChatId,
      model: "openai/gpt-4o", // Mesin penggerak GPT-5 Nano (Bridge)
      messages: processedMessages,
      personaId: "gpt-4o-landing",
      frequency_penalty: 0,
      max_tokens: 4000,
      presence_penalty: 0,
      stream: true,
      temperature: 0.5,
      top_p: 0.95,
    };

    const headers = {
      "sec-ch-ua-platform": `"Android"`,
      "x-device-uuid": finalDeviceId,
      "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
      "sec-ch-ua-mobile": "?1",
      "x-device-language": "id-ID",
      "x-device-platform": "web",
      "x-device-version": "1.0.44",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36",
      "accept": "*/*",
      "content-type": "application/json",
      "origin": "https://overchat.ai",
      "referer": "https://overchat.ai/",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "priority": "u=1, i",
    };

    const response = await fetch(API, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

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
        "X-Stenly-Engine": "GPT-5-Nano-Bridge",
        "X-Chat-ID": finalChatId,
        "X-Device-ID": finalDeviceId,
      },
    });

  } catch (error: any) {
    console.error("GPT5 Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

