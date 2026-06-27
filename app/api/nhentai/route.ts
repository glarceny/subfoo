// By STENLY
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    
    // Default endpoint target according to user's specify
    const targetUrl = page === '1' ? 'https://nhentai.to/go' : `https://nhentai.to/go?page=${page}`;
    
    const response = await fetch(targetUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://nhentai.to/',
      }
    });

    if (!response.ok) {
      return NextResponse.json({ 
        status: false, 
        message: `HTTP Error ${response.status} saat mengakses target.`,
      }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const parseGalleries = (container: any) => {
      const results: any[] = [];
      $(container).find('.gallery').each((_, el) => {
        // Cek jika ini div iklan atau sejenisnya
        if ($(el).text().trim() === '') return;

        const aNode = $(el).find('a.cover');
        const link = aNode.attr('href') || '';
        const title = aNode.find('.caption').text().trim();
        const thumbnailNode = aNode.find('img.lazyload, img');
        
        let thumbnail = thumbnailNode.attr('data-src') || thumbnailNode.attr('src');
        if (thumbnail && thumbnail.startsWith('data:image')) {
            // Coba ambil dari fallback jika data-src tidak ada tapi ada fallback
            const fallbackStr = thumbnailNode.attr('data-fallbacks');
            if (fallbackStr) {
                try {
                    const parsedFallbacks = JSON.parse(fallbackStr);
                    if (parsedFallbacks && parsedFallbacks.length > 0) {
                        thumbnail = parsedFallbacks[0];
                    }
                } catch (e) {
                    // Ignore
                }
            }
        }

        const isNew = aNode.find('.new-badge').length > 0;
        
        // Buat absolute URL
        let fullLink = link;
        if (link && !link.startsWith('http')) {
          fullLink = `https://nhentai.to${link}`;
        }
        
        if (title && fullLink && fullLink.includes('/g/')) {
            results.push({
                title,
                link: fullLink,
                thumbnail: thumbnail || null,
                is_new: isNew
            });
        }
      });
      return results;
    };

    let popularGalleries: any[] = [];
    let newUploads: any[] = [];

    // Ada dua kontainer utama: Popular Now dan New Uploads (berdasarkan source code HTML yang diberikan)
    const containers = $('.container.index-container');
    
    if (containers.length > 1) {
        popularGalleries = parseGalleries(containers.eq(0));
        newUploads = parseGalleries(containers.eq(1));
    } else if (containers.length === 1) {
        newUploads = parseGalleries(containers.eq(0));
    } else {
        // Fallback jika tidak ditemukan class container index-container
        newUploads = parseGalleries($('body'));
    }

    let currentPage = parseInt(page, 10) || 1;
    let totalPages = currentPage;
    
    // Ekstrak Total Pages
    $('.pagination .page').each((_, el) => {
      const numText = $(el).text().trim().replace(/,/g, '');
      const num = parseInt(numText, 10);
      if (!isNaN(num) && num > totalPages) {
        totalPages = num;
      }
    });

    return NextResponse.json({
      status: true,
      author: "STENLY",
      result: {
        pagination: {
          current_page: currentPage,
          total_pages: totalPages
        },
        popular_galleries: popularGalleries.length > 0 ? popularGalleries : undefined,
        galleries: newUploads
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
