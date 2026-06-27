/* by Stenly */
import { NextRequest, NextResponse } from 'next/server';
import makeFetchCookie from "fetch-cookie";
import * as cheerio from "cheerio";

const fetchw = makeFetchCookie(globalThis.fetch);

const base_url = "https://id.tunexa.io";
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";

const hdrs = {
  "User-Agent": UA,
  "Origin": base_url,
  "Referer": `${base_url}/`,
  "X-Requested-With": "XMLHttpRequest"
};

async function solveTurnstile() {
  // Using the provided solver service
  const res = await fetch("https://cf-solver-renofc.my.id/api/solvebeta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: base_url, siteKey: "0x4AAAAAACvMRVBY7pAdKlfv", mode: "turnstile-min" })
  });
  const data = await res.json();
  if (!data?.token?.result?.token) throw new Error("Solver gagal: " + JSON.stringify(data));
  return data.token.result.token;
}

async function getCsrfToken() {
  const res = await fetchw(base_url, { headers: { "User-Agent": UA } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const token = $('meta[name="csrf-token"]').attr("content");
  return token;
}

async function getFormats(videoUrl: string, csrfToken: string) {
  const res = await fetchw(`${base_url}/format-options`, {
    method: "POST",
    headers: { ...hdrs, "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
    body: new URLSearchParams({ video_url: videoUrl, _token: csrfToken })
  });
  return res.json();
}

async function convert(videoUrl: string, csrfToken: string, cfToken: string, opts: any = {}) {
  const {
    download_type = "audio",
    audio_format = "mp3",
    audio_quality = "320K",
    selected_itag = "",
    selected_ext = "mp3",
    selected_quality_label = "320K",
    prefetched_title = "",
    prefetched_duration = "",
    prefetched_thumbnail = ""
  } = opts;

  const body = new URLSearchParams({
    _token: csrfToken,
    video_url: videoUrl,
    trim_audio: "false",
    start_time: "",
    end_time: "",
    download_type,
    audio_format,
    audio_quality,
    selected_itag,
    selected_ext,
    selected_quality_label,
    is_fast: "0",
    prefetched_title,
    prefetched_duration,
    prefetched_thumbnail,
    separate_vocals: "0",
    detect_original_audio: "",
    youtube_target: "video",
    "cf-turnstile-response": cfToken
  });

  const res = await fetchw(`${base_url}/convert`, {
    method: "POST",
    headers: {
      ...hdrs,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-CSRF-TOKEN": csrfToken
    },
    body
  });
  return res.json();
}

async function pollStatus(conversionId: string, interval = 3000, maxTry = 30) {
  for (let i = 0; i < maxTry; i++) {
    await new Promise(r => setTimeout(r, interval));
    const ts = Date.now();
    const res = await fetchw(`${base_url}/conversion-status/${conversionId}?_ts=${ts}`, {
      headers: hdrs
    });
    const data: any = await res.json();
    if (data.status === "done") return data;
    if (data.status === "error") throw new Error(JSON.stringify(data));
  }
  throw new Error("Timeout polling");
}

export async function POST(req: NextRequest) {
  try {
    const { url, type = 'audio' } = await req.json();

    if (!url) {
      return NextResponse.json({ status: false, error: "URL is required" }, { status: 400 });
    }

    const csrfToken = await getCsrfToken();
    if (!csrfToken) throw new Error("Failed to get CSRF token");

    const formats = await getFormats(url, csrfToken);
    
    let opts: any = {
      prefetched_title: formats.video?.title || "",
      prefetched_duration: formats.video?.duration || "",
      prefetched_thumbnail: formats.video?.thumbnail || "",
    };

    if (type === 'video') {
      opts = {
        ...opts,
        download_type: "video",
        audio_format: "mp4",
        audio_quality: "best",
        selected_itag: "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]",
        selected_ext: "mp4",
        selected_quality_label: "1080p_merged"
      };
    } else {
      opts = {
        ...opts,
        download_type: "audio",
        audio_format: "mp3",
        audio_quality: "320K",
        selected_ext: "mp3",
        selected_quality_label: "320K"
      };
    }

    const cfToken = await solveTurnstile();
    const conv = await convert(url, csrfToken, cfToken, opts);
    if (!conv.conversion_id) throw new Error(JSON.stringify(conv));

    const result = await pollStatus(conv.conversion_id);

    return NextResponse.json({
      status: true,
      creator: 'Stenly',
      title: result.title,
      duration: result.duration,
      thumbnail: result.thumbnail,
      download_url: result.download_url,
      format: result.audio_format || opts.audio_format,
      quality: opts.selected_quality_label
    });

  } catch (error: any) {
    return NextResponse.json({
      status: false,
      creator: 'Stenly',
      error: error.message || "Internal Server Error"
    }, { status: 500 });
  }
}
