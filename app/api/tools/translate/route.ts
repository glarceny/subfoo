import { NextRequest, NextResponse } from "next/server";
import { translate, speak } from "google-translate-api-x";

import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const OPTIONS = {
  client: "gtx",
  forceBatch: true,
  fallbackBatch: true,
  autoCorrect: true,
};

async function textToText(text: string, from: string, to: string) {
  const started = Date.now();

  const res = await translate(text, {
    from: from,
    to: to,
    ...OPTIONS,
  });

  return {
    Status: true,
    Code: 200,
    Mode: "text-to-text",
    Input: text,
    From: res.from?.language?.iso || from,
    To: to,
    Result: res.text,
    Pronunciation: res.pronunciation || null,
    Correction: res.from?.text || null,
    Time_ms: Date.now() - started,
    Author: "Stenly",
    Creator: "Stenly"
  };
}

async function textToAudio(text: string, from: string, to: string, autoTranslateBeforeTts: boolean, originUrl: string) {
  const started = Date.now();

  let textTts = text;
  let translated: any = null;

  if (autoTranslateBeforeTts) {
    const res = await translate(text, {
      from: from,
      to: to,
      ...OPTIONS,
    });

    textTts = res.text;

    translated = {
      From: res.from?.language?.iso || from,
      To: to,
      Text: res.text,
      Pronunciation: res.pronunciation || null,
    };
  }

  const base64 = await speak(textTts, {
    to: to,
    client: "gtx",
  });

  const id = crypto.randomBytes(8).toString("hex");
  const filename = `tts_${id}.mp3`;
  const filePath = path.join(os.tmpdir(), filename);
  
  fs.writeFileSync(filePath, Buffer.from(base64, "base64"));
  
  // Create URL using the request origin (or stenly.org if we want to mock)
  const resultUrl = `https://stenly.org/api/media/${filename}`;

  return {
    Status: true,
    Code: 200,
    Mode: "text-to-audio",
    Input: text,
    Text_tts: textTts,
    From: translated?.From || from,
    To: to,
    Auto_translate: autoTranslateBeforeTts,
    Translate: translated,
    Format: "mp3",
    Result_url: resultUrl,
    Time_ms: Date.now() - started,
    Author: "Stenly",
    Creator: "Stenly"
  };
}

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") || "text-to-text";
  const text = req.nextUrl.searchParams.get("text");
  const from = req.nextUrl.searchParams.get("from") || "auto";
  const to = req.nextUrl.searchParams.get("to");
  const autoTranslateParam = req.nextUrl.searchParams.get("autoTranslate");
  const originUrl = req.nextUrl.origin;
  
  const autoTranslate = autoTranslateParam === "false" ? false : true;

  if (!text || !to) {
    return NextResponse.json(
      {
        Status: false,
        Code: 400,
        Error: "Missing 'text' or 'to' parameter.",
        Author: "Stenly",
        Creator: "Stenly"
      },
      { status: 400 }
    );
  }

  try {
    let result;
    if (mode === "text-to-text") {
      result = await textToText(text, from, to);
    } else if (mode === "text-to-audio") {
      result = await textToAudio(text, from, to, autoTranslate, originUrl);
    } else {
      result = {
        Status: false,
        Code: 400,
        Mode: mode,
        Result: null,
        Error: "MODE tidak valid",
        Available_mode: ["text-to-text", "text-to-audio"],
        Author: "Stenly",
        Creator: "Stenly"
      };
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        Status: false,
        Code: error.statusCode || error.code || 500,
        Mode: mode,
        Input: text,
        Error: error.message,
        Author: "Stenly",
        Creator: "Stenly"
      },
      { status: 500 }
    );
  }
}
