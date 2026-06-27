import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const TIMEOUT = 60000;
const BASE_URL = "https://wise.com";
const LOCALE = "id";

const jar = new CookieJar();

const client = wrapper(axios.create({
  jar,
  withCredentials: true,
  timeout: TIMEOUT,
  decompress: true,
  validateStatus: () => true,
  headers: {
    "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    "sec-ch-ua": '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": '"Android"',
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "navigate",
    "sec-fetch-dest": "document"
  }
}));

const api = wrapper(axios.create({
  jar,
  withCredentials: true,
  timeout: TIMEOUT,
  decompress: true,
  validateStatus: () => true,
  headers: {
    "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36",
    "accept": "application/json,text/plain,*/*",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  }
}));

function decodeHtml(value: string) {
  return String(value)
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function pickNextData(html: string) {
  const match = String(html).match(/<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return null;
  return JSON.parse(decodeHtml(match[1]));
}

function normalizeCode(code: string) {
  return String(code || "").trim().toUpperCase();
}

function numberValue(value: any) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function formatDateLabel(value: any) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toISOString().slice(0, 10);
}

function uniqByDate(points: any[]) {
  const map = new Map();

  for (const item of points) {
    if (!item.date || item.rate == null) continue;
    map.set(item.date, item);
  }

  return [...map.values()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function normalizeHistory(data: any) {
  const raw = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.rates)
        ? data.rates
        : Array.isArray(data?.history)
          ? data.history
          : [];

  const points = raw.map((item) => {
    const date = item.time || item.date || item.timestamp || item.createdTime || item.providerTimestamp;
    const rate = numberValue(item.rate ?? item.value ?? item.mid ?? item.close);

    return {
      Date: formatDateLabel(date),
      Rate: rate
    };
  }).filter((item) => item.Rate != null);

  return uniqByDate(points.map((item) => ({
    date: item.Date,
    rate: item.Rate
  }))).map((item) => ({
    Date: item.date,
    Rate: item.rate
  }));
}

async function fetchPage(from: string, to: string, amount: number) {
  const slug = `${from.toLowerCase()}-to-${to.toLowerCase()}-rate`;
  const url = `${BASE_URL}/${LOCALE}/currency-converter/${slug}?amount=${encodeURIComponent(amount)}`;
  const res = await client.get(url);

  return {
    url,
    code: res.status,
    html: typeof res.data === "string" ? res.data : String(res.data || "")
  };
}

async function fetchHomeCurrencies() {
  const url = `${BASE_URL}/${LOCALE}/currency-converter/`;
  const res = await client.get(url);
  const data = pickNextData(typeof res.data === "string" ? res.data : String(res.data || ""));
  const model = data?.props?.pageProps?.model || {};

  return {
    url,
    code: res.status,
    currencies: Array.isArray(model.currencies) ? model.currencies : []
  };
}

async function fetchHistory(from: string, to: string, days: number) {
  const source = normalizeCode(from);
  const target = normalizeCode(to);

  const endpoints = [
    `${BASE_URL}/rates/history+live?source=${source}&target=${target}&length=${days}&resolution=daily&unit=day`,
    `${BASE_URL}/rates/history?source=${source}&target=${target}&length=${days}&resolution=daily&unit=day`,
    `${BASE_URL}/gateway/v1/rates/history+live?source=${source}&target=${target}&length=${days}&resolution=daily&unit=day`,
    `${BASE_URL}/gateway/v1/rates/history?source=${source}&target=${target}&length=${days}&resolution=daily&unit=day`
  ];

  for (const url of endpoints) {
    try {
      const res = await api.get(url, {
         headers: {
            "referer": `${BASE_URL}/${LOCALE}/currency-converter/${source.toLowerCase()}-to-${target.toLowerCase()}-rate`
         }
      });
      const contentType = String(res.headers["content-type"] || "");
      const isJson = contentType.includes("application/json") || typeof res.data === "object";
      const points = isJson ? normalizeHistory(res.data) : [];

      if (res.status >= 200 && res.status < 300 && points.length) {
        return {
          ok: true,
          url,
          code: res.status,
          points
        };
      }
    } catch {}
  }

  return {
    ok: false,
    url: null,
    code: 0,
    points: []
  };
}

async function createChartImage({ from, to, amount, converted, rate, points }: any) {
  const labels = points.map((item: any) => item.Date);
  const values = points.map((item: any) => item.Rate);

  const chart = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${from}/${to}`,
          data: values,
          fill: false,
          borderWidth: 3,
          pointRadius: 2,
          tension: 0.25
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `${amount} ${from} = ${converted} ${to}`
        },
        subtitle: {
          display: true,
          text: `Live rate: 1 ${from} = ${rate} ${to}`
        },
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: false
        }
      }
    }
  };

  const res = await axios.post('https://quickchart.io/chart/create', {
    chart: chart,
    width: 1000,
    height: 520,
    format: 'png',
    backgroundColor: 'white'
  }, { validateStatus: () => true });

  if (res.status >= 200 && res.status < 300 && res.data && res.data.url) {
     return { File: res.data.url };
  }

  return { File: null };
}

export async function GET(req: NextRequest) {
  const started = Date.now();
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("mode") || "convert";
  const from = normalizeCode(searchParams.get("from") || "USD");
  const to = normalizeCode(searchParams.get("to") || "IDR");
  const amount = Number(searchParams.get("amount") || 1);
  const days = Number(searchParams.get("days") || 30);

  try {
     if (mode === "currencies") {
       const home = await fetchHomeCurrencies();
   
       return NextResponse.json({
         Status: true,
         Code: home.code,
         Mode: mode,
         Total: home.currencies.length,
         Result: home.currencies.map((item: any) => ({
           Code: item.code,
           Slug: item.slug,
           Symbol: item.symbol
         })),
         Time_ms: Date.now() - started
       });
     }
   
     const page = await fetchPage(from, to, amount);
     const data = pickNextData(page.html);
   
     if (!data) {
       throw new Error("NEXT_DATA tidak ditemukan. Kemungkinan Wise mengubah struktur halaman atau terkena proteksi.");
     }
   
     const model = data?.props?.pageProps?.model || {};
     const rateData = model.rate || {};
     const rate = numberValue(rateData.value);
   
     if (rate == null) {
       throw new Error("Rate tidak ditemukan di response Wise.");
     }
   
     const converted = amount * rate;
     const history = await fetchHistory(from, to, days);
   
     let chart = null;
   
     if (history.points.length >= 2) {
       chart = await createChartImage({
         from,
         to,
         amount,
         converted,
         rate,
         points: history.points
       });
     }
   
     return NextResponse.json({
       Status: true,
       Code: page.code,
       Amount: amount,
       From: from,
       To: to,
       Rate: rate,
       Result: converted,
       Chart_url: chart?.File || null,
       Time_ms: Date.now() - started
     });
  } catch (error: any) {
     return NextResponse.json({
       Status: false,
       Code: 500,
       Input: {
         Mode: mode,
         Amount: amount,
         From: from,
         To: to,
         Days: days
       },
       Result: null,
       Error: error.message
     }, { status: 500 });
  }
}
