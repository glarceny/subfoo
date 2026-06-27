import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

const BASE = "https://spowload.cc";

const jar = new CookieJar();
const api = wrapper(axios.create({
  jar,
  withCredentials: true,
  maxRedirects: 5,
  validateStatus: () => true,
  headers: {
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36",
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": '"Android"'
  }
}));

function pickCsrf(html: string) {
  const $ = cheerio.load(html);
  return $('meta[name="csrf-token"]').first().attr("content") || null;
}

function pickTrackData(html: string) {
  const match = html.match(/let\s+urldata\s*=\s*"((?:\\.|[^"\\])*)"/);
  if (!match) return null;
  const decoded = JSON.parse(`"${match[1]}"`);
  return JSON.parse(decoded);
}

function pickImage(data: any) {
  return data?.album?.images?.[0]?.url || data?.images?.[0]?.url || data?.tracks?.items?.[0]?.track?.album?.images?.[0]?.url || data?.tracks?.[0]?.album?.images?.[0]?.url || null;
}

function pickSpotifyUrl(data: any, fallback: string) {
  return data?.external_urls?.spotify || fallback;
}

function cleanArtists(data: any) {
  const artists = data?.artists || data?.track?.artists || [];
  return artists.map((v: any) => v.name).filter(Boolean).join(", ") || null;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pollTask(taskId: string) {
  for (let i = 0; i < 10; i++) {
    const res = await api.get(`${BASE}/tasks/${encodeURIComponent(taskId)}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Referer: `${BASE}/en2`
      }
    });

    const data = res.data;
    const status = data?.data?.status;
    const progress = data?.data?.progress ?? 0;
    const result = data?.data?.result?.download_url || data?.data?.download_url || data?.data?.url || null;

    if (result) return result;

    if (status === "completed" || status === "success" || status === "finished") {
      return result;
    }

    if (status === "failed") {
      throw new Error("Conversion failed");
    }

    console.error(`Processing ${progress}%...`);
    await sleep(2000);
  }

  throw new Error("Task timeout, coba ulangi lagi atau naikkan limit polling.");
}

async function spowload(url: string) {
  const home = await api.get(`${BASE}/en2`, {
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      Referer: BASE
    }
  });

  const token = pickCsrf(home.data);

  if (!token) {
    return {
      Status: false,
      Code: home.status,
      Input: url,
      Result_url: null,
      Error: "CSRF token tidak ditemukan. Kemungkinan kena Cloudflare/captcha."
    };
  }

  const form = new URLSearchParams();
  form.set("_token", token);
  form.set("trackUrl", url);

  const analyzed = await api.post(`${BASE}/analyze`, form.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      Origin: BASE,
      Referer: `${BASE}/en2`,
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document"
    }
  });

  const html = typeof analyzed.data === "string" ? analyzed.data : "";
  const csrf = pickCsrf(html) || token;
  const trackData = pickTrackData(html);

  if (!trackData) {
    return {
      Status: false,
      Code: analyzed.status,
      Input: url,
      Result_url: null,
      Error: "Data track tidak ditemukan dari halaman hasil analyze."
    };
  }

  const spotifyUrl = pickSpotifyUrl(trackData, url);
  const cover = pickImage(trackData);

  const converted = await api.post(`${BASE}/convert`, {
    urls: spotifyUrl,
    cover
  }, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf,
      Origin: BASE,
      Referer: `${BASE}/spotify/${trackData.type || "track"}-${trackData.id}`,
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty"
    }
  });

  const body = converted.data;

  let download = null;

  if (body?.url) {
    download = body.url;
  } else if (body?.task_id || body?.taskId) {
    download = await pollTask(body.task_id || body.taskId);
  } else if (body?.data?.url) {
    download = body.data.url;
  } else if (body?.data?.download_url) {
    download = body.data.download_url;
  }

  if (!download) {
    return {
      Status: false,
      Code: converted.status,
      Input: url,
      Result_url: null,
      Metadata: {
        Id: trackData.id || null,
        Type: trackData.type || null,
        Title: trackData.name || null,
        Artist: cleanArtists(trackData),
        Duration_ms: trackData.duration_ms || null,
        Cover: cover
      },
      Error: body
    };
  }

  return {
    Status: true,
    Code: converted.status || 200,
    Input: url,
    Result_url: download,
    Metadata: {
      Id: trackData.id || null,
      Type: trackData.type || null,
      Title: trackData.name || null,
      Artist: cleanArtists(trackData),
      Duration_ms: trackData.duration_ms || null,
      Cover: cover,
      Spotify_url: spotifyUrl
    }
  };
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({
      Status: false,
      Code: 400,
      Input: "",
      Result_url: null,
      Error: "Missing 'url' parameter.",
      Author: "Stenly",
      Creator: "Stenly"
    }, { status: 400 });
  }

  try {
    const result: any = await spowload(url);
    if (!result.Author) {
      result.Author = "Stenly";
      result.Creator = "Stenly";
    }
    return NextResponse.json(result, { status: result.Code === 200 || result.Code === 201 ? 200 : (result.Code || 500) });
  } catch (error: any) {
    return NextResponse.json({
      Status: false,
      Code: error.response?.status || 500,
      Input: url,
      Result_url: null,
      Error: error.message,
      Author: "Stenly",
      Creator: "Stenly"
    }, { status: error.response?.status || 500 });
  }
}
