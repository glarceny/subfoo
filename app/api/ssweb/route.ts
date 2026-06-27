// by Stenly
import { NextRequest, NextResponse } from "next/server";
import mql from "@microlink/mql";

export const runtime = "nodejs"; // mql might need nodejs for some features, but we can try edge if needed.

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const width = parseInt(searchParams.get("width") || "1920");
    const height = parseInt(searchParams.get("height") || "1080");
    const waitFor = parseInt(searchParams.get("waitFor") || "3000");
    const fullPage = searchParams.get("fullPage") === "true";
    const element = searchParams.get("element");

    if (!url) {
      return NextResponse.json({
        Status: false,
        Code: 400,
        Error: "URL parameter is required"
      }, { status: 400 });
    }

    const options: any = {
      screenshot: {
        optimizeForSpeed: true,
        fullPage: fullPage
      },
      viewport: {
        width: width,
        height: height
      },
      waitFor: waitFor,
      meta: false
    };

    if (element) {
      options.screenshot.element = element;
    }

    const res = await mql(url, options);
    const data = res.data || {};
    const externalUrl = data.screenshot?.url || null;
    const ok = !!externalUrl;

    // Clean URL implementation - Full URL for response
    const id = externalUrl ? Buffer.from(externalUrl).toString('base64url') : null;
    const cleanUrl = id ? `https://stenly.org/api/ssweb/render/${id}.png` : null;

    return NextResponse.json({
      Status: ok,
      Code: res.statusCode || 200,
      Author: "Stenly",
      Input: url,
      Result_url: cleanUrl,
      Error: ok ? null : data.error?.message || "Screenshot failed"
    });
  } catch (err: any) {
    return NextResponse.json({
      Status: false,
      Code: 500,
      Error: err.message || "Internal Server Error"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, width = 1920, height = 1080, waitFor = 3000, fullPage = false, element } = body;

    if (!url) {
      return NextResponse.json({
        Status: false,
        Code: 400,
        Error: "URL is required"
      }, { status: 400 });
    }

    const options: any = {
      screenshot: {
        optimizeForSpeed: true,
        fullPage: fullPage
      },
      viewport: {
        width: width,
        height: height
      },
      waitFor: waitFor,
      meta: false
    };

    if (element) {
      options.screenshot.element = element;
    }

    const res = await mql(url, options);
    const data = res.data || {};
    const externalUrl = data.screenshot?.url || null;
    const ok = !!externalUrl;

    const id = externalUrl ? Buffer.from(externalUrl).toString('base64url') : null;
    const cleanUrl = id ? `https://stenly.org/api/ssweb/render/${id}.png` : null;

    return NextResponse.json({
      Status: ok,
      Code: res.statusCode || 200,
      Author: "Stenly",
      Input: url,
      Result_url: cleanUrl,
      Error: ok ? null : data.error?.message || "Screenshot failed"
    });
  } catch (err: any) {
    return NextResponse.json({
      Status: false,
      Code: 500,
      Error: err.message || "Internal Server Error"
    }, { status: 500 });
  }
}
