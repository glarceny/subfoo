import { NextRequest, NextResponse } from "next/server";

class AIPrompt {
  baseURL: string;
  endpoint: string;

  constructor() {
    this.baseURL = "https://www.askgita.co";
    this.endpoint = "/api/llm/ask";
  }

  bersihkanSSML(teks: string | undefined | null): string {
    if (!teks) return teks || "";
    return teks
      .replace(/<speak>|<\/speak>/gi, "")
      .replace(/<break\s+time=['"][^'"]+['"]\s*\/?>/gi, "")
      .replace(/<emphasis\s+level=['"][^'"]+['"]\s*>/gi, "")
      .replace(/<\/emphasis>/gi, "")
      .replace(/<prosody\s+rate=['"][^'"]+['"]\s*>/gi, "")
      .replace(/<\/prosody>/gi, "")
      .replace(/<say-as[^>]*>|<\/say-as>/gi, "")
      .replace(/<phoneme[^>]*>|<\/phoneme>/gi, "")
      .replace(/<sub[^>]*>|<\/sub>/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  buildPrompt(systemPrompt: string, userQuestion: string): string {
    return `${systemPrompt}\n\nCurrent user question:\n${userQuestion}\n\nNow answer in the exact style defined above.`;
  }

  async chat(systemPrompt: string, userQuestion: string) {
    const fullPrompt = this.buildPrompt(systemPrompt, userQuestion);

    try {
      const response = await fetch(`${this.baseURL}${this.endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const parsed = await response.json();
      const rawAnswer = parsed.text || parsed.response;
      const cleanAnswer = this.bersihkanSSML(rawAnswer);

      return {
        success: true,
        author: "Stenly",
        creator: "Stenly",
        data: {
          question: userQuestion,
          answer: cleanAnswer,
        },
      };
    } catch (e: any) {
      return {
        success: false,
        author: "Stenly",
        creator: "Stenly",
        error: e.message,
      };
    }
  }
}

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("prompt");
  const teks = req.nextUrl.searchParams.get("teks");

  if (!prompt || !teks) {
    return NextResponse.json(
      {
        success: false,
        author: "Stenly",
        creator: "Stenly",
        error: "Missing 'prompt' or 'teks' parameter.",
        usage: "?prompt=kamu adalah asisten&teks=halo",
      },
      { status: 400 }
    );
  }

  try {
    const ai = new AIPrompt();
    const result = await ai.chat(prompt, teks);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        author: "Stenly",
        creator: "Stenly",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    const teks = body.teks;

    if (!prompt || !teks) {
      return NextResponse.json(
        {
          success: false,
          author: "Stenly",
          creator: "Stenly",
          error: "Missing 'prompt' or 'teks' in JSON body.",
        },
        { status: 400 }
      );
    }

    const ai = new AIPrompt();
    const result = await ai.chat(prompt, teks);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        author: "Stenly",
        creator: "Stenly",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
