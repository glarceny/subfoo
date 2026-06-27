import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    
    if (!url) {
       return NextResponse.json({ success: false, author: "Stenly", error: "Parameter 'url' is required" }, { status: 400 });
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const match = html.match(/file:\s*["']([^"']+)["']/);
    const videoUrl = match ? match[1] : "";
    const title = $("h1#title").text().trim() || $("title").text().trim();
    const views = $(".stats .views .count").first().text().trim() || "0";
    const genres: string[] = [];
    $("a[rel='tag']").each((i, el) => { genres.push($(el).text().trim()); });
    
    return NextResponse.json({ success: true, author: "Stenly", data: { title, videoUrl, views, genres } });
  } catch (error: any) {
    return NextResponse.json({ success: false, author: "Stenly", error: error.message }, { status: 500 });
  }
}
