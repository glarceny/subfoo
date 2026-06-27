// By STENLY
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    
    const targetUrl = page === '1' ? 'https://seegore.com/gore/' : `https://seegore.com/gore/page/${page}/`;
    
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

    const featured_videos: any[] = [];
    $('.bb-featured-strip .item').each((_, el) => {
      const title = $(el).find('.title a').text().trim();
      const link = $(el).find('.title a').attr('href') || '';
      let image = $(el).find('img.wp-post-image').attr('src');
      if (!image) image = $(el).find('img.wp-post-image').attr('data-src');

      if (title && link) {
        featured_videos.push({
          title,
          link,
          thumbnail: image || null
        });
      }
    });

    const videos: any[] = [];
    $('.post-items .post-item').each((_, el) => {
      const title = $(el).find('.entry-title a').text().trim();
      const link = $(el).find('.entry-title a').attr('href') || '';
      let image = $(el).find('img.wp-post-image').attr('src');
      if (!image) image = $(el).find('img.wp-post-image').attr('data-src');
      
      const views = $(el).find('.post-views .count').text().trim() || '0';
      const votes = $(el).find('.post-votes .count').text().trim() || '0';
      const comments = $(el).find('.post-comments .count').text().trim() || '0';
      
      const categories: string[] = [];
      $(el).find('.bb-cat-links a').each((i, cat) => {
        categories.push($(cat).text().trim());
      });

      const reactions: any[] = [];
      $(el).find('.bb-badge-list .reaction').each((i, badge) => {
        const reactionName = $(badge).find('.text').text().trim();
        const reactionIcon = $(badge).find('img').attr('src');
        if (reactionName) {
          reactions.push({
            name: reactionName,
            icon: reactionIcon || null
          });
        }
      });

      if (title && link) {
        videos.push({
          title,
          link,
          thumbnail: image || null,
          stats: {
            views,
            votes,
            comments
          },
          categories,
          reactions
        });
      }
    });

    let currentPage = 1;
    const currentPageText = $('.bb-wp-pagination .current').first().text().trim();
    if (currentPageText) {
      currentPage = parseInt(currentPageText);
    } else {
      currentPage = parseInt(page);
    }

    let totalPages = currentPage;
    const pageNumbers: number[] = [];
    $('.bb-wp-pagination .page-numbers').each((_, el) => {
      const numText = $(el).text().trim().replace(/,/g, '');
      const num = parseInt(numText);
      if (!isNaN(num)) {
        pageNumbers.push(num);
      }
    });
    
    if (pageNumbers.length > 0) {
      totalPages = Math.max(...pageNumbers, totalPages);
    }

    return NextResponse.json({
      status: true,
      author: "STENLY",
      result: {
        pagination: {
          current_page: currentPage,
          total_pages: totalPages
        },
        featured_videos,
        videos
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
