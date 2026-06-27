import { NextRequest, NextResponse } from "next/server";
import https from 'https';

class Llama4API {
    async chat(message: string, history: any[] = []) {
        const messages = [...history, { role: "user", content: message }];
        
        const payload = JSON.stringify({ messages });

        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'aiconvert.online',
                port: 443,
                path: '/api/llama-4-chat',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'text/event-stream',
                    'Content-Length': Buffer.byteLength(payload)
                }
            };

            const req = https.request(options, (res) => {
                let buffer = '';
                let fullResponse = '';

                res.on('data', (chunk) => {
                    buffer += chunk.toString();
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.slice(6);
                            if (dataStr === '[DONE]') continue;
                            try {
                                const data = JSON.parse(dataStr);
                                if (data.choices?.[0]?.delta?.content) {
                                    fullResponse += data.choices[0].delta.content;
                                }
                            } catch(e) {}
                        }
                    }
                });

                res.on('end', () => {
                    resolve({
                        success: true,
                        author: "Stenly",
                        creator: "Stenly",
                        model: "Llama 4 Scout 17B",
                        message: message,
                        response: fullResponse
                    });
                });
            });

            req.on('error', (err) => {
                resolve({
                    success: false,
                    author: "Stenly",
                    creator: "Stenly",
                    error: err.message
                });
            });
            
            req.write(payload);
            req.end();
        });
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const text = searchParams.get("text") || searchParams.get("query") || searchParams.get("q") || searchParams.get("message");

    if (!text) {
        return NextResponse.json({
            success: false,
            author: 'Stenly',
            creator: 'Stenly',
            error: 'Masukkan text pertanyaan',
            usage: '?text=halo'
        }, { status: 400 });
    }

    const llama = new Llama4API();
    const result = await llama.chat(text);

    return NextResponse.json(result);
}
