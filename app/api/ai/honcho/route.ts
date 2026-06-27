import { NextRequest, NextResponse } from "next/server";
import https from 'https';

class HonchoChat {
    baseURL = 'https://my-honcho.plasticlabs.workers.dev';
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    messages: any[] = [];
    model = 'claude-sonnet-4-5-20250929';

    async chat(message: string) {
        try {
            this.messages.push({
                role: 'user',
                content: message,
                timestamp: new Date().toISOString(),
                id: this.generateId()
            });

            const payload = {
                messages: this.messages,
                localTime: new Date().toLocaleString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                })
            };

            const result = await this.sendRequest(payload);
            
            this.messages.push({
                role: 'assistant',
                content: result,
                timestamp: new Date().toISOString(),
                id: this.generateId()
            });

            const cleanReply = this.cleanText(result as string);

            return {
                success: true,
                author: 'Stenly',
                creator: 'Stenly',
                data: {
                    model: this.model,
                    message: message,
                    reply: cleanReply
                }
            };
        } catch (error: any) {
            return {
                success: false,
                author: 'Stenly',
                creator: 'Stenly',
                error: error.message || 'Unknown error'
            };
        }
    }

    cleanText(text: string) {
        if (!text) return '';
        let cleaned = text;
        cleaned = cleaned.replace(/\\n/g, ' ');
        cleaned = cleaned.replace(/\\r/g, ' ');
        cleaned = cleaned.replace(/\\t/g, ' ');
        cleaned = cleaned.replace(/\\"/g, '"');
        cleaned = cleaned.replace(/\\'/g, "'");
        cleaned = cleaned.replace(/\s{2,}/g, ' ');
        cleaned = cleaned.trim();
        return cleaned;
    }

    generateId() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    sendRequest(payload: any) {
        return new Promise((resolve, reject) => {
            const jsonPayload = JSON.stringify(payload);

            const options = {
                hostname: 'my-honcho.plasticlabs.workers.dev',
                port: 443,
                path: '/api/chat/guest-turn',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(jsonPayload),
                    'User-Agent': this.userAgent
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                let fullContent = '';

                res.on('data', (chunk) => {
                    data += chunk.toString();
                    const lines = data.split('\n');
                    data = lines.pop() || '';

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const jsonStr = line.slice(6).trim();
                            if (jsonStr === '[DONE]') continue;

                            try {
                                const event = JSON.parse(jsonStr);

                                if (event.type === 'content_block_delta') {
                                    const text = event.delta?.text || '';
                                    fullContent += text;
                                }

                                if (event.type === 'finish') {
                                    resolve(event.outputContent || fullContent);
                                }
                            } catch (e) {}
                        }
                    }
                });

                res.on('end', () => {
                    if (fullContent) resolve(fullContent);
                    else reject(new Error('Tidak ada response'));
                });
            });

            req.on('error', reject);
            req.write(jsonPayload);
            req.end();
        });
    }

    resetChat() {
        this.messages = [];
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

    const honcho = new HonchoChat();
    const result = await honcho.chat(text);

    return NextResponse.json(result);
}
