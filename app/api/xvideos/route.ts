import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const p = searchParams.get('p');
    
    let targetUrl = "https://www.xvideos.com/";
    if (q) {
      targetUrl = `https://www.xvideos.com/?k=${encodeURIComponent(q)}`;
      if (p) {
        targetUrl += `&p=${encodeURIComponent(p)}`;
      }
    } else if (p) {
      targetUrl = `https://www.xvideos.com/new/${encodeURIComponent(p)}/`;
    }
    
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any = {};

    // --- 1. DATA TEKNIS & CONFIG (DARI JS JSON) ---
    const scriptTag = $('script').filter((i, el) => {
      const text = $(el).text();
      return text.includes('window.xv.conf');
    }).first();
    
    if (scriptTag.length) {
      const text = scriptTag.text();
      const jsonMatch = text.match(/window\.xv\.conf\s*=\s*({.*?});/s);
      if (jsonMatch) {
        try {
          const jsData = JSON.parse(jsonMatch[1]);
          results.system_config = {
            session_token: jsData.session_token,
            ip_address: jsData.dyn?.ip,
            user_country: jsData.dyn?.country,
            browser_info: jsData.browser,
            is_premium_user: jsData.is_premium,
            age_verified: jsData.login_info?.isAgeVerified
          };
          results.available_currencies = jsData.currencies;
          results.quickies_feature = jsData.data?.quickies?.videos || {};
        } catch (e) {
          // Ignore JSON parse errors
        }
      }
    }

    // --- 2. MULTI-LANGUAGE LINKS (HREFLANG) ---
    const languages = $('link[rel="alternate"]');
    results.global_sites = [];
    languages.each((i, el) => {
      const lang = $(el).attr('hreflang');
      const href = $(el).attr('href');
      if (lang) {
        results.global_sites.push({ lang, url: href });
      }
    });

    // --- 3. DAFTAR VIDEO UTAMA (DOM HTML) ---
    const videoList: any[] = [];
    $('div.frame-block').each((i, el) => {
      const isChannel = $(el).attr('data-is-channel') === "1";
      const titleEl = $(el).find('p.title a');
      const uploaderEl = $(el).find('span.name');
      const uploaderLinkEl = $(el).find('p.metadata a').first();
      const imgEl = $(el).find('img').first();
      
      const title = titleEl.attr('title') || titleEl.text().trim();
      const href = titleEl.attr('href') || "";
      const url = href ? (href.startsWith('http') ? href : `https://www.xvideos.com${href}`) : null;
      const duration = $(el).find('span.duration').text().trim();
      const viewsMatch = $(el).find('p.metadata').text().replace(/\n/g, ' ').replace(/\s+/g, ' ').match(/(\d+[kM]?)\s+Views/i);
      const views = viewsMatch ? viewsMatch[1] : $(el).find('p.metadata').text().trim();
      
      const uploaderName = uploaderEl.text().trim();
      const uploaderHref = uploaderLinkEl.attr('href');
      const uploaderUrl = uploaderHref ? `https://www.xvideos.com${uploaderHref}` : null;
      
      const hdMark = $(el).find('span.video-hd-mark').text().trim() || "SD";
      const thumbMain = imgEl.attr('data-src') || imgEl.attr('src');
      const thumbSfw = imgEl.attr('data-sfwthumb');
      const previewMp4 = imgEl.attr('data-pvv');

      if (title && url) {
        videoList.push({
          video_id: $(el).attr('data-id'),
          type: isChannel ? 'channel' : 'profile',
          title,
          url,
          duration,
          views,
          uploader: {
            name: uploaderName,
            url: uploaderUrl
          },
          media: {
            hd_mark: hdMark,
            thumb_main: thumbMain,
            thumb_sfw: thumbSfw,
            preview_mp4: previewMp4
          }
        });
      }
    });
    results.main_grid_videos = videoList;

    // --- 4. FITUR EKSTERNAL (AFFILIATE) ---
    results.external_features = {
      live_cams: $('a.live-cams').attr('href') || null,
      dating: $('a.mobile-slogan-dating').attr('href') || null,
      games: $('a.nutaku-games').attr('href') || null
    };

    // --- 5. PAGINATION ---
    const pagination = $('.pagination');
    if (pagination.length) {
      const pages: string[] = [];
      pagination.find('li a').each((i, el) => {
        const text = $(el).text().trim();
        if (/^\d+$/.test(text)) pages.push(text);
      });
      const nextHref = pagination.find('a.next-page').attr('href');
      results.pagination = {
        current_pages_visible: pages,
        next_page_url: nextHref ? `https://www.xvideos.com${nextHref}` : null
      };
    }

    return NextResponse.json({ success: true, author: "Stenly", data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, author: "Stenly", error: error.message }, { status: 500 });
  }
}
