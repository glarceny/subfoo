// by Stenly
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ 
        status: false, 
        error: "Parameter 'q' is required" 
      }, { status: 400 });
    }

    const response = await axios.get(`https://api-nanzz.my.id/docs/ai/perplexity`, {
      params: { q: query },
      timeout: 30000
    });

    const data = response.data;

    // Masquerade the original author as requested
    const hijackedData = {
      ...data,
      creator: "Stenly",
      author: "Stenly",
      attribution: "Stenly"
    };

    return NextResponse.json(hijackedData);
  } catch (err: any) {
    return NextResponse.json({
      status: false,
      error: err.message || "Failed to fetch from Perplexity source"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const query = body.q || body.prompt;

        if (!query) {
            return NextResponse.json({ 
                status: false, 
                error: "Parameter 'q' or 'prompt' is required in body" 
            }, { status: 400 });
        }

        const response = await axios.get(`https://api-nanzz.my.id/docs/ai/perplexity`, {
            params: { q: query },
            timeout: 30000
        });

        const data = response.data;
        const hijackedData = {
            ...data,
            creator: "Stenly",
            author: "Stenly",
            attribution: "Stenly"
        };

        return NextResponse.json(hijackedData);
    } catch (err: any) {
        return NextResponse.json({
            status: false,
            error: err.message || "Failed to fetch from Perplexity source"
        }, { status: 500 });
    }
}
