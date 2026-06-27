import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    
    if (!url) {
       return NextResponse.json({ success: false, author: "Stenly", error: "Parameter 'url' is required" }, { status: 400 });
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any = {};

    // --- 1. METADATA DASAR (DARI TAG HTML) ---
    results.basic_info = {
        title: $('h2.page-title').text().trim() || null,
        duration: $('span.duration').text().trim() || null,
        quality: $('span.video-hd-mark').text().trim() || null,
        views: $('div#v-views strong.mobile-hide').text().trim() || null
    };

    // --- 2. DATA PENGUNGGAH & MODEL (SOCIAL DATA) ---
    const uploaderTag = $('li.main-uploader a');
    if (uploaderTag.length) {
        results.uploader = {
            name: uploaderTag.find('.name').text().trim() || null,
            url: uploaderTag.attr('href') ? `https://www.xvideos.com${uploaderTag.attr('href')}` : null,
            subscribers: uploaderTag.find('.count').text().trim() || null
        };
    } else {
        results.uploader = null;
    }

    const models: any[] = [];
    $('li.model').each((i, el) => {
        const name = $(el).find('.name').text().trim();
        const aTag = $(el).find('a');
        const id = aTag.attr('data-id') || null;
        const href = aTag.attr('href');
        const urlLink = href ? `https://www.xvideos.com${href}` : null;
        const subscribers = $(el).find('.count').text().trim() || "0";
        if (name) {
            models.push({ name, id, url: urlLink, subscribers });
        }
    });
    results.models = models;

    // --- 3. TAKSONOMI (TAGS & CATEGORIES) ---
    const tags: string[] = [];
    $('a.is-keyword').each((i, el) => {
        tags.push($(el).text().trim());
    });
    results.tags = tags;

    const catMatch = html.match(/window\.wpn_categories\s*=\s*"(.*?)";/);
    results.categories = catMatch ? catMatch[1].split(',') : [];

    // --- 4. DATA FILE VIDEO (DIRECT LINKS DARI JAVASCRIPT) ---
    const playerScript = $('script').filter((i, el) => {
        return $(el).text().includes('html5player');
    }).first();
    
    if (playerScript.length) {
        const jsText = playerScript.text();
        
        const mp4LowMatch = jsText.match(/setVideoUrlLow\('(.*?)'\)/);
        const mp4HighMatch = jsText.match(/setVideoUrlHigh\('(.*?)'\)/);
        const hlsMatch = jsText.match(/setVideoHLS\('(.*?)'\)/);
        const thumbSlideMosaicMatch = jsText.match(/setThumbSlide\('(.*?)'\)/);
        const thumbSlideMinuteMatch = jsText.match(/setThumbSlideMinute\('(.*?)'\)/);

        results.video_sources = {
            mp4_low: mp4LowMatch ? mp4LowMatch[1] : null,
            mp4_high: mp4HighMatch ? mp4HighMatch[1] : null,
            hls_m3u8: hlsMatch ? hlsMatch[1] : null,
            thumb_slide_mosaic: thumbSlideMosaicMatch ? thumbSlideMosaicMatch[1] : null,
            thumb_slide_minute: thumbSlideMinuteMatch ? thumbSlideMinuteMatch[1] : null
        };
    }

    // --- 5. STATISTIK INTERAKSI (ENGAGEMENT) ---
    const voteSection = $('.vote-actions');
    if (voteSection.length) {
        results.engagement = {
            rating_percentage: $('.rating-good-perc').text().trim() || null,
            vote_good_count: $('.rating-good-nbr').text().trim() || null,
            vote_bad_count: $('.rating-bad-nbr').text().trim() || null,
            total_votes: $('.rating-total-txt').text().trim() || null,
            comment_count: $('.nb-comments-11 .badge').text().trim() || "0"
        };
    }

    // --- 6. DATA TEKNIS BACKEND (DARI window.xv.conf) ---
    const confScript = $('script').filter((i, el) => {
        return $(el).text().includes('window.xv.conf');
    }).first();
    if (confScript.length) {
        const jsonConfMatch = confScript.text().match(/window\.xv\.conf\s*=\s*({.*?});/s);
        if (jsonConfMatch) {
            try {
                const confData = JSON.parse(jsonConfMatch[1]);
                results.technical = {
                    video_internal_id: confData.id_video,
                    video_encoded_id: confData.encoded_id_video,
                    session_token: confData.session_token,
                    csrf_tokens: {
                        vote_good: confData.dyn?.vmdata?.vote_good,
                        vote_bad: confData.dyn?.vmdata?.vote_bad
                    }
                };
            } catch (e) {
            }
        }
    }

    // --- 7. VIDEO TERKAIT (RELATED VIDEOS) ---
    const relatedMatch = html.match(/var video_related\s*=\s*(\[.*?\]);/s);
    if (relatedMatch) {
        try {
            const relatedJson = JSON.parse(relatedMatch[1]);
            const relatedCleaned = relatedJson.map((v: any) => ({
                id: v.id,
                title: v.tf,
                url: v.u ? `https://www.xvideos.com${v.u}` : null,
                duration: v.d,
                views: v.n,
                rating: v.r,
                thumbnail: v.i
            }));
            results.related_videos = relatedCleaned;
        } catch (e) {}
    }

    // --- 8. DATA SEO & TANGGAL (DARI JSON-LD) ---
    const seoScript = $('script[type="application/ld+json"]');
    if (seoScript.length) {
        try {
            const seoData = JSON.parse(seoScript.first().text());
            results.seo_info = {
                upload_date: seoData.uploadDate,
                description: seoData.description,
                thumbnail_url: seoData.thumbnailUrl
            };
        } catch (e) {}
    }

    return NextResponse.json({ success: true, author: "Stenly", data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, author: "Stenly", error: error.message }, { status: 500 });
  }
}
