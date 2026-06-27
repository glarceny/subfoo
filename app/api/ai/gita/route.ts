import { NextRequest, NextResponse } from "next/server";
import https from 'https';

class GitaAI {
    endpoint = 'wwgvrumteg.execute-api.us-east-1.amazonaws.com';
    path = '/prod/api/chat';
    userId: string | null = null;
    context: any[] = [];
    questionCount = 0;
    contextSummary: string | null = null;

    generateUserId() {
        this.userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        return this.userId;
    }

    async chat(message: string) {
        if (!this.userId) {
            this.generateUserId();
        }

        this.context.push({
            role: 'user',
            content: message,
            timestamp: Date.now()
        });

        const payload = {
            message: message,
            userId: this.userId,
            context: this.context,
            questionCount: this.questionCount,
            contextSummary: this.contextSummary
        };

        const result: any = await this.sendRequest(message, payload);
        
        if (result.type === 'follow_up') {
            this.questionCount = result.questionCount || this.questionCount + 1;
            this.context.push({
                role: 'assistant',
                content: result.message,
                timestamp: Date.now()
            });
        } else if (result.type === 'guidance') {
            this.questionCount = 0;
            this.context = [];
            this.contextSummary = result.contextSummary || null;
        }

        return result;
    }

    sendRequest(question: string, payload: any) {
        const postData = JSON.stringify(payload);
        
        const options = {
            hostname: this.endpoint,
            port: 443,
            path: this.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        return new Promise((resolve) => {
            const req = https.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk.toString();
                });
                
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        resolve({
                            success: true,
                            author: 'Stenly',
                            creator: 'Stenly',
                            data: {
                                question: question,
                                answer: json.message
                            }
                        });
                    } catch(e: any) {
                        resolve({
                            success: false,
                            author: 'Stenly',
                            creator: 'Stenly',
                            error: e.message
                        });
                    }
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
        this.context = [];
        this.questionCount = 0;
        this.contextSummary = null;
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

    const gita = new GitaAI();
    const result = await gita.chat(text);

    return NextResponse.json(result);
}
