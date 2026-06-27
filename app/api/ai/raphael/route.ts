/* by Stenly */
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://raphael.app';
const API_URL = `${BASE_URL}/api/generate-image`;

const randomId = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const parseBool = (v: any, d = false) => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    if (v.toLowerCase() === 'true') return true;
    if (v.toLowerCase() === 'false') return false;
  }
  return d;
};

const parseNumber = (v: any, d: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, options = {} } = await req.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({
        status: false,
        code: 400,
        creator: 'Stenly',
        error: 'Prompt kosong'
      }, { status: 400 });
    }

    const body = {
      prompt: prompt.trim(),
      negativePrompt: (options as any).negativePrompt ?? '',
      aspect: (options as any).aspect ?? '1:1',
      isSafeContent: (options as any).isSafeContent ?? true,
      autoTranslate: (options as any).autoTranslate ?? true,
      model_id: (options as any).model_id ?? 'raphael-basic',
      number_of_images: parseNumber((options as any).number_of_images, 4),
      highQuality: parseBool((options as any).highQuality, false),
      fastMode: parseBool((options as any).fastMode, false),
      turnstileToken: (options as any).turnstileToken ?? null,
      client_request_id: (options as any).client_request_id ?? randomId()
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
        'origin': BASE_URL,
        'referer': `${BASE_URL}/id`,
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36'
      },
      body: JSON.stringify(body)
    });

    const rawText = await res.text();

    if (!res.ok) {
      return NextResponse.json({
        status: false,
        code: res.status,
        creator: 'Stenly',
        input: prompt,
        error: 'Request gagal',
        raw: rawText
      }, { status: res.status });
    }

    const lines = rawText
      .split('\n')
      .map(v => v.trim())
      .filter(v => v.startsWith('{') && v.endsWith('}'));

    const parsed = [];
    for (const line of lines) {
      try {
        parsed.push(JSON.parse(line));
      } catch {}
    }

    const results = parsed.map((item, index) => ({
      no: index + 1,
      url: item.url?.startsWith('http') ? item.url : `${BASE_URL}${item.url ?? ''}`,
      seed: item.seed ?? null,
      width: item.width ?? null,
      height: item.height ?? null,
      isHighQuality: item.isHighQuality ?? false
    })).filter(v => v.url);

    return NextResponse.json({
      status: true,
      code: 200,
      creator: 'Stenly',
      prompt: body.prompt,
      negativePrompt: body.negativePrompt,
      model: body.model_id,
      aspect: body.aspect,
      total: results.length,
      results,
      raw: parsed
    });
  } catch (e: any) {
    return NextResponse.json({
      status: false,
      code: 500,
      creator: 'Stenly',
      error: e.message || 'Terjadi kesalahan'
    }, { status: 500 });
  }
}
