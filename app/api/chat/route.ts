/* by Stenly */
import { NextRequest } from "next/server";
import crypto from "node:crypto";
import { pool } from "@/lib/db";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, chatId, deviceId } = body;

    const pDeviceId = deviceId || crypto.randomUUID();
    const pChatId = chatId || crypto.randomUUID();

    const latestMessage = messages[messages.length - 1];

    if (process.env.DB_HOST && process.env.DB_HOST !== 'your-db-host.example.com') {
      try {
        await pool.execute(
          'INSERT IGNORE INTO sessions (id, device_id) VALUES (?, ?)',
          [pChatId, pDeviceId]
        );
        await pool.execute(
          'INSERT INTO messages (id, session_id, role, content) VALUES (?, ?, ?, ?)',
          [crypto.randomUUID(), pChatId, latestMessage.role, latestMessage.content]
        );
      } catch (e) {
      }
    }

    const mappedMessages = messages.map((m: any) => ({
      id: crypto.randomUUID(),
      role: m.role,
      content: m.content
    }));

    const systemMessage = {
      id: crypto.randomUUID(),
      role: "system",
      content: "Ikuti bahasa user dan jawab dengan gaya natural, singkat, dan jelas.",
    };

    const apiBody = {
      chatId: pChatId,
      model: "claude-haiku-4-5-20251001",
      messages: [...mappedMessages, systemMessage],
      personaId: "claude-haiku-4-5-landing",
      frequency_penalty: 0,
      max_tokens: 4000,
      presence_penalty: 0,
      stream: true,
      temperature: 0.5,
      top_p: 0.95,
    };

    console.log("SENDING API BODY:", JSON.stringify(apiBody, null, 2));

    const headers = {
      "sec-ch-ua-platform": `"Android"`,
      "x-device-uuid": pDeviceId,
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
      "accept-language": "id-ID,id;q=0.9",
      "priority": "u=1, i",
    };

    const response = await fetch("https://api.overchat.ai/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(apiBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: errText, status: response.status, body: apiBody, reqHeaders: headers }), { status: response.status });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let fullAnswer = "";

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const rawLine of lines) {
              const line = rawLine.trim();
              if (!line.startsWith("data:")) continue;
              
              const data = line.slice(5).trim();
              if (!data || data === "[DONE]") continue;

              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  fullAnswer += content;
                  controller.enqueue(new TextEncoder().encode(content));
                }
              } catch (e) {
              }
            }
          }

          if (process.env.DB_HOST && process.env.DB_HOST !== 'your-db-host.example.com' && fullAnswer) {
            try {
              await pool.execute(
                'INSERT INTO messages (id, session_id, role, content) VALUES (?, ?, ?, ?)',
                [crypto.randomUUID(), pChatId, 'assistant', fullAnswer]
              );
            } catch (e) {
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "x-chat-id": pChatId,
        "x-device-id": pDeviceId
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message, stack: error.stack }), { status: 500 });
  }
}
