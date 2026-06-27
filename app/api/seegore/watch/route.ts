// By STENLY
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');
    
    if (!targetUrl) {
      return NextResponse.json({ status: false, message: "Parameter 'url' wajib diisi" }, { status: 400 });
    }
    
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
      return NextResponse.json({ status: false, message: "Target website unreachable or rate-limited" }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('.entry-title.s-post-title').first().text().trim();
    
    const thumbnail = $('meta[property="og:image"]').attr('content') || 
                      $('meta[name="twitter:image"]').attr('content') || null;

    const author = $('.auth-name [itemprop="name"]').first().text().trim();
    const date = $('.entry-date.published').first().text().trim();

    const views = $('.s-post-views .count').first().text().trim();
    const comments = $('.post-comments .count').first().text().trim();
    const votes = $('.post-rating .count .text').first().text().trim();

    const categories: string[] = [];
    $('.s-post-cat-links a').each((_, el) => {
      categories.push($(el).text().trim());
    });

    const tags: string[] = [];
    $('.bb-tags a').each((_, el) => {
      tags.push($(el).text().trim());
    });

    const reactions: any[] = [];
    $('.bb-reaction-box .reaction-item').each((_, el) => {
      const name = $(el).find('.text').first().text().trim();
      const count = $(el).find('.reaction-stat-count').first().text().trim();
      const icon = $(el).find('.circle img').attr('src');
      if (name && count) {
        reactions.push({
          name,
          count: parseInt(count, 10),
          icon: icon || null
        });
      }
    });

    const bodyContent = $('.s-post-content');
    
    const descriptionLines: string[] = [];
    bodyContent.find('p').each((_, el) => {
      const text = $(el).text().trim();
      if (text) {
        descriptionLines.push(text);
      }
    });
    const description = descriptionLines.join('\n\n');

    const images: string[] = [];
    bodyContent.find('img').each((_, el) => {
      const src = $(el).attr('src');
      if (src && !src.includes('data:image')) {
        images.push(src);
      }
    });

    const videos: any[] = [];
    bodyContent.find('.wp-video-shortcode').each((_, el) => {
      const src = $(el).find('source').attr('src');
      const poster = $(el).attr('poster');
      if (src) {
        // Hapus query parameter ?_=X jika ada di URL video
        const cleanSrc = src.split('?')[0];
        videos.push({
          url: cleanSrc,
          poster: poster || null
        });
      }
    });

    return NextResponse.json({
      status: true,
      author: "STENLY",
      result: {
        title,
        thumbnail,
        metadata: {
          author: author || null,
          date: date || null,
          views: views || "0",
          comments: comments || "0",
          votes: votes || "0"
        },
        tags,
        categories,
        reactions,
        content: {
          description,
          images,
          videos
        }
      }
    });
  } catch (err: any) {
    return NextResponse.json({ 
      status: false, 
      author: "STENLY",
      message: err.message 
    }, { status: 500 });
  }
}
