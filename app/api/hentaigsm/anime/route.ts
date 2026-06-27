import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch("https://hentaigasm.com/");
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const animeList: any[] = [];
    
    $(".item-post").each((i, el) => {
      const id = $(el).attr("id") || "";
      const titleElement = $(el).find(".title a");
      const title = titleElement.text().trim();
      const link = titleElement.attr("href") || "";
      const image = $(el).find(".thumb img").attr("src") || "";
      const time = $(el).find(".meta .time").text().trim();
      const views = $(el).find(".stats .views .count").text().trim();
      if (title && image) animeList.push({ id, title, link, image, time, views });
    });
    
    return NextResponse.json({ success: true, author: "Stenly", data: animeList });
  } catch (error: any) {
    return NextResponse.json({ success: false, author: "Stenly", error: error.message }, { status: 500 });
  }
}
