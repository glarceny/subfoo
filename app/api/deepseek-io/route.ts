/* by Stenly */
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = 'deep-seek.ai';

async function getCsrfToken() {
    const res = await fetch(`https://${BASE_URL}/`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    const html = await res.text();
    
    let token = null;
    const metaMatch = html.match(/<meta[^>]*name=["']csrf-token["'][^>]*content=["']([^"']+)["']/i);
    if (metaMatch) token = metaMatch[1];
    
    if (!token) {
        const jsMatch = html.match(/X-CSRF-TOKEN["']?\s*[:=]\s*["']([^"']+)["']/i);
        if (jsMatch) token = jsMatch[1];
    }
    
    return token;
}

async function chat(prompt: string) {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
        throw new Error('Failed to get CSRF token from host');
    }
    
    const payload = JSON.stringify({
        model: "deepseek/deepseek-v4-flash",
        messages: [{ role: "user", content: prompt }]
    });

    const res = await fetch(`https://${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: payload
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.text();
    let response = '';
    const lines = data.split('\n');
    for (const line of lines) {
        if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            try {
                const jsonStr = line.substring(6).trim();
                if (!jsonStr) continue;
                const json = JSON.parse(jsonStr);
                const content = json.choices?.[0]?.delta?.content;
                if (content) response += content;
            } catch(e) {}
        }
    }
    
    return response.trim() || "No response received";
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userInput = body.prompt || body.q;

        if (!userInput) {
            return NextResponse.json({ 
                status: false, 
                error: "Prompt or q is required" 
            }, { status: 400 });
        }

        const answer = await chat(userInput);

        return NextResponse.json({
            status: true,
            author: 'STENLY',
            creator: 'STENLY',
            result: {
                question: userInput,
                answer: answer,
                model: "deepseek-v4-flash",
                engine: "Type-IO-Scraper"
            }
        });

    } catch (error: any) {
        console.error("DeepSeek IO Error:", error.message);
        return NextResponse.json({
            status: false,
            error: error.message
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ status: false, error: "Query parameter 'q' is required" }, { status: 400 });
    }

    try {
        const answer = await chat(q);

        return NextResponse.json({
            status: true,
            author: 'STENLY',
            creator: 'STENLY',
            result: {
                question: q,
                answer: answer,
                model: "deepseek-v4-flash"
            }
        });
    } catch (error: any) {
        return NextResponse.json({ status: false, error: error.message }, { status: 500 });
    }
}
