// by Stenly
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import * as cheerio from "cheerio";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const API = "https://top4top.io";
const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

const jar = new CookieJar();
const client = wrapper(
  axios.create({
    baseURL: API,
    jar,
    withCredentials: true,
    timeout: 120000,
    validateStatus: () => true,
    headers: {
      "user-agent": UA,
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
    }
  })
);

function getCookieSid() {
  const cookies = jar.getCookiesSync(API);
  return cookies.find((c) => c.key === "sid")?.value || "";
}

function parseDirectLink(html: string) {
  const $ = cheerio.load(html);
  let direct = null;

  $(".inputbody").each((_, el) => {
    const title = $(el).find(".btitle").text().trim();
    const value = $(el).find("input").attr("value")?.trim();
    
    // Check for both image and file direct link labels in Arabic and English
    if (
      (title.includes("رابط الصورة المباشر") || 
       title.includes("رابط الملف المباشر") || 
       title.includes("تحميل مباشر") ||
       title.includes("Direct link") ||
       title.includes("Direct download link")) && 
      value
    ) {
      direct = value;
    }
  });

  if (direct) return direct;

  // Fallback patterns for direct paths
  const patterns = [
    'input[value^="https://"][value*="/p_"]', // Image
    'input[value^="https://"][value*="/f_"]', // File/Audio
    'input[value^="https://"][value*="/v_"]', // Video
    'input[value*="top4top.io/"][value$=".mp3"]',
    'input[value*="top4top.io/"][value$=".wav"]',
    'input[value*="top4top.io/"][value$=".zip"]',
    'a[href^="https://"][href*="/p_"]',
    'a[href^="https://"][href*="/f_"]',
    'a[href^="https://"][href*="/v_"]'
  ];

  for (const pattern of patterns) {
    const el = $(pattern);
    const val = (pattern.startsWith("a") ? el.attr("href") : el.attr("value"))?.trim();
    if (val && val.startsWith("https://")) return val;
  }

  // Even more aggressive: find any input/a containing top4top and /f_ or /p_
  let fallback = null;
  $('input, a').each((_, el) => {
    const val = ($(el).val() || $(el).attr('href')) as string;
    if (val && typeof val === 'string' && val.startsWith('https://') && val.includes('top4top.io')) {
      if (val.includes('/f_') || val.includes('/p_') || val.includes('/v_')) {
        fallback = val;
        return false; // break
      }
    }
  });

  if (fallback) return fallback;

  // Final attempt: any link with filename-like suffix
  $('input').each((_, el) => {
    const val = $(el).val() as string;
    if (val && typeof val === 'string' && val.startsWith('https://') && /\.(mp3|wav|zip|rar|pdf|png|jpg|jpeg)$/i.test(val)) {
      fallback = val;
      return false;
    }
  });

  return fallback;
}

async function getSid() {
  const res = await client.get("/", {
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      referer: `${API}/`
    }
  });
  const $ = cheerio.load(res.data || "");
  return $('input[name="sid"]').attr("value") || getCookieSid();
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ Status: false, error: "No file uploaded" }, { status: 400 });
    }

    const sid = await getSid();
    const form = new FormData();

    if (sid) {
      form.append("sid", sid);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    form.append("file_0_", buffer, {
      filename: file.name,
      contentType: file.type || "application/octet-stream"
    });

    for (let i = 1; i <= 9; i++) {
        form.append(`file_${i}_`, "");
    }

    form.append("submitr", "[ رفع الملفات ]");

    const res = await client.post("/index.php", form, {
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      headers: {
        ...form.getHeaders(),
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        origin: API,
        referer: `${API}/`,
        "upgrade-insecure-requests": "1"
      }
    });

    const resultUrl = parseDirectLink(res.data || "");

    return NextResponse.json({
      Status: res.status === 200 && !!resultUrl,
      Code: res.status,
      Input: file.name,
      Result_url: resultUrl || "Direct media link not found"
    });

  } catch (err: any) {
    return NextResponse.json({
      Status: false,
      Code: err.response?.status || 500,
      Result_url: err.message
    }, { status: 500 });
  }
}
