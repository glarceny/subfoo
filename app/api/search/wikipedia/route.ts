import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

function decodeHtml(text: string) {
  return String(text || "")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanText(text: string) {
  return decodeHtml(text)
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/\[[a-z]\]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBlock(text: string) {
  return decodeHtml(text)
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/\[[a-z]\]/gi, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function fixUrl(url: string, baseUrl: string) {
  if (!url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  return url;
}

function uniqueBy(array: any[], key: string) {
  return array.filter((item, index, self) => self.findIndex(x => x[key] === item[key]) === index);
}

async function searchWikipedia(query: string, lang: string, limit: number) {
  const baseUrl = `https://${lang}.wikipedia.org`;
  const api = `${baseUrl}/w/api.php`;

  const { data, status } = await axios.get(api, {
    params: {
      action: "query",
      list: "search",
      srsearch: query,
      srlimit: limit,
      format: "json",
      origin: "*"
    },
    headers: {
      "user-agent": UA,
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
    }
  });

  return {
    code: status,
    results: data?.query?.search || []
  };
}

async function getFullArticle(title: string, lang: string) {
  const baseUrl = `https://${lang}.wikipedia.org`;
  const pagePath = `/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`;
  const pageUrl = `${baseUrl}${pagePath}`;

  const { data, status } = await axios.get(pageUrl, {
    headers: {
      "user-agent": UA,
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "referer": "https://www.wikipedia.org/"
    }
  });

  const $ = cheerio.load(data);

  $("script, style, noscript, sup.reference, .mw-editsection, .navbox, .metadata, .ambox, .hatnote, .toc, #toc, table.vertical-navbox").remove();

  const pageTitle = cleanText($("#firstHeading").text()) || title;
  const description = cleanText($(".tagline").first().text()) || null;

  const introParagraphs: string[] = [];

  $(".mw-parser-output > section").first().find("p").each((_, el) => {
    const text = cleanBlock($(el).text());
    if (text.length > 40) introParagraphs.push(text);
  });

  if (!introParagraphs.length) {
    $(".mw-parser-output > p").each((_, el) => {
      const text = cleanBlock($(el).text());
      if (text.length > 40) introParagraphs.push(text);
    });
  }

  const sections: any[] = [];

  $(".mw-parser-output > section").each((_, section) => {
    const heading = cleanText($(section).find("h2, h3").first().text());

    if (!heading || heading.toLowerCase() === "daftar isi") return;

    const texts: string[] = [];

    $(section).find("p, ul, ol").each((_, el) => {
      const text = cleanBlock($(el).text());
      if (text.length > 40) texts.push(text);
    });

    if (texts.length) {
      sections.push({
        Title: heading,
        Text: texts.join("\n\n")
      });
    }
  });

  const infobox: Record<string, string> = {};

  $(".infobox tr").each((_, tr) => {
    const key = cleanText($(tr).find("th").first().text());
    const value = cleanText($(tr).find("td").first().text());

    if (key && value && key.length < 100) {
      infobox[key] = value;
    }
  });

  const images: any[] = [];

  $(".mw-parser-output img").each((_, img) => {
    const src = fixUrl($(img).attr("src") || "", baseUrl);
    const alt = cleanText($(img).attr("alt") || "");

    if (!src) return;
    if (src.includes("static/images")) return;
    if (src.includes("Semi-protection")) return;
    if (src.includes("OOjs_UI")) return;

    images.push({
      Alt: alt || null,
      Url: src
    });
  });

  return {
    code: status,
    article: {
      Title: pageTitle,
      Description: description,
      Url: pageUrl,
      Extract: introParagraphs.join("\n\n") || null,
      Sections: sections,
      Infobox: infobox,
      Images: uniqueBy(images, "Url")
    }
  };
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  const lang = req.nextUrl.searchParams.get("lang") || "id";
  const limitParam = req.nextUrl.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam) : 5;

  if (!query) {
    return NextResponse.json({
      Status: false,
      Code: 400,
      Input: "",
      Selected: null,
      Result: null,
      Error: "Missing 'query' parameter.",
      Author: "Stenly",
      Creator: "Stenly"
    }, { status: 400 });
  }

  try {
    const search = await searchWikipedia(query, lang, limit);

    if (!search.results.length) {
      return NextResponse.json({
        Status: false,
        Code: search.code,
        Input: query,
        Selected: null,
        Result: null,
        Error: "Artikel tidak ditemukan",
        Author: "Stenly",
        Creator: "Stenly"
      }, { status: search.code === 200 ? 404 : search.code });
    }

    const first = search.results[0];
    const detail = await getFullArticle(first.title, lang);

    return NextResponse.json({
      Status: true,
      Code: detail.code,
      Input: query,
      Selected: {
        Title: first.title,
        Page_id: first.pageid,
        Snippet: cleanText(first.snippet)
      },
      Result: detail.article,
      Author: "Stenly",
      Creator: "Stenly"
    }, { status: detail.code === 200 || detail.code === 201 ? 200 : (detail.code || 500) });
  } catch (error: any) {
    return NextResponse.json({
      Status: false,
      Code: error.response?.status || 500,
      Input: query,
      Selected: null,
      Result: null,
      Error: error.response?.data?.error?.info || error.message,
      Author: "Stenly",
      Creator: "Stenly"
    }, { status: error.response?.status || 500 });
  }
}
