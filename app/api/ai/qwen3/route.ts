import { NextRequest, NextResponse } from "next/server";
import https from 'https';

class FreeAIUnlimited {
    apiUrl = 'api.free.ai';
    endpoint = '/v1/chat/';
    model = 'qwen3-coder';
    userId: string | null = null;
    conversation: any[] = [];

    generateUserId() {
        this.userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        return this.userId;
    }

    async chat(message: string) {
        if (!this.userId) this.generateUserId();

        this.conversation.push({ role: 'user', content: message });

        const payload = {
            messages: this.conversation,
            model: this.model,
            stream: true,
            lang: 'en'
        };

        const postData = JSON.stringify(payload);

        return new Promise((resolve) => {
            let fullAnswer = '';
            
            const options = {
                hostname: this.apiUrl,
                port: 443,
                path: this.endpoint,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Id': this.userId as string,
                    'Content-Length': Buffer.byteLength(postData),
                    'User-Agent': 'Mozilla/5.0'
                }
            };

            const req = https.request(options, (res) => {
                let buffer = '';
                
                res.on('data', (chunk) => {
                    buffer += chunk.toString();
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const jsonStr = line.slice(6);
                            if (jsonStr === '[DONE]') continue;
                            
                            try {
                                const parsed = JSON.parse(jsonStr);
                                const content = parsed.choices?.[0]?.delta?.content;
                                if (content) {
                                    fullAnswer += content;
                                }
                            } catch(e) {}
                        }
                    }
                });
                
                res.on('end', () => {
                    if (fullAnswer) {
                        this.conversation.push({ role: 'assistant', content: fullAnswer });
                    }
                    
                    resolve({
                        success: true,
                        author: 'Stenly',
                        creator: 'Stenly',
                        data: {
                            question: message,
                            answer: fullAnswer,
                            model: this.model
                        }
                    });
                });
            });
            
            req.on('error', (error) => {
                resolve({
                    success: false,
                    author: 'Stenly',
                    creator: 'Stenly',
                    error: error.message
                });
            });
            
            req.write(postData);
            req.end();
        });
    }

    reset() {
        this.userId = null;
        this.conversation = [];
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

    const freeai = new FreeAIUnlimited();
    const result = await freeai.chat(text);

    return NextResponse.json(result);
}
