/* by Stenly */
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const API_URL = 'https://s-pawn.web.id/api/chat';

function generateSessionId() {
    return `s_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`;
}

async function chat(prompt: string, options: { think?: boolean; sessionId?: string; history?: any[] } = {}) {
    const sessionId = options.sessionId || generateSessionId();
    const deepThinking = options.think || false;
    const history = options.history || [];
    
    const payload = JSON.stringify({
        message: prompt,
        sessionId: sessionId,
        stream: true,
        userMemory: "",
        focusMode: "",
        recentHistory: history,
        deepThinking: deepThinking
    });
    
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No reader available");

    let fullResponse = '';
    let thinkingProcess = '';
    let finalData: any = null;
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                try {
                    const jsonStr = line.slice(6).trim();
                    if (jsonStr && jsonStr !== '[DONE]') {
                        const data = JSON.parse(jsonStr);
                        
                        if (data.status === 'searching' || data.status === 'gathering' || data.status === 'merging') {
                            if (deepThinking) {
                                thinkingProcess += `[${data.status}] ${data.message || ''}\n`;
                            }
                        }
                        
                        if (data.token) {
                            fullResponse += data.token;
                        }
                        
                        if (data.done === true) {
                            finalData = data;
                        }
                    }
                } catch (e) {
                    // Ignore parsing errors for partial chunks
                }
            }
        }
    }
    
    return {
        question: prompt,
        answer: fullResponse.trim(),
        think_mode: deepThinking,
        thinking_process: deepThinking ? thinkingProcess.trim() : null,
        model: finalData?.model || 'spawnai',
        session_id: finalData?.sessionId || sessionId,
        suggestions: finalData?.suggestions || [],
        title: finalData?.title || '',
        sources: finalData?.sources || []
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const prompt = body.prompt || body.message || body.q;
        const think = body.think === true || body.think === "true";

        if (!prompt) {
            return NextResponse.json({ 
                status: false, 
                error: "Prompt is required" 
            }, { status: 400 });
        }

        const result = await chat(prompt, { think });

        return NextResponse.json({
            status: true,
            author: 'STENLY',
            creator: 'STENLY',
            result: result
        });

    } catch (error: any) {
        console.error("Spawn AI Error:", error.message);
        return NextResponse.json({
            status: false,
            error: error.message
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const think = searchParams.get('think') === 'true';

    if (!q) {
        return NextResponse.json({ status: false, error: "Query parameter 'q' is required" }, { status: 400 });
    }

    try {
        const result = await chat(q, { think });

        return NextResponse.json({
            status: true,
            author: 'STENLY',
            creator: 'STENLY',
            result: result
        });
    } catch (error: any) {
        return NextResponse.json({ status: false, error: error.message }, { status: 500 });
    }
}
