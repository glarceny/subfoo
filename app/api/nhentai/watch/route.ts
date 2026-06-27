// By STENLY
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get('id');
    const urlParam = searchParams.get('url');

    let id = idParam;
    if (urlParam) {
      const match = urlParam.match(/\/g\/(\d+)/);
      if (match) id = match[1];
    }

    if (!id) {
      return NextResponse.json({
        status: false,
        author: "STENLY",
        message: "ID atau URL gallery wajib disertakan."
      }, { status: 400 });
    }

    const targetUrl = `https://nhentai.to/g/${id}/`;

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
        author: "STENLY",
        message: `HTTP Error ${response.status} saat mengakses target.`,
      }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title_english = $('#info h1').text().trim();
    const title_japanese = $('#info h2').text().trim();
    const gallery_id = $('#gallery_id').text().replace('#', '').trim();

    const parseTags = (selector: string) => {
      const tags: any[] = [];
      $(selector).find('.tag').each((_, el) => {
        const name = $(el).find('.name').text().trim();
        const count = $(el).find('.count').text().trim();
        const url = $(el).attr('href');
        if (name) {
          tags.push({ name, count, url: url ? `https://nhentai.to${url}` : null });
        }
      });
      return tags;
    };

    const tags = parseTags('.tag-container:contains("Tags")');
    const artists = parseTags('.tag-container:contains("Artists")');
    const characters = parseTags('.tag-container:contains("Characters")');
    const parodies = parseTags('.tag-container:contains("Parodies")');
    const groups = parseTags('.tag-container:contains("Groups")');
    const languages = parseTags('.tag-container:contains("Languages")');
    const categories = parseTags('.tag-container:contains("Categories")');

    const pagesCount = $('.tag-container:contains("Pages:") .name').text().trim();
    const uploaded = $('.tag-container:contains("Uploaded:") time').attr('datetime');
    const uploaded_text = $('.tag-container:contains("Uploaded:") time').text().trim();

    const coverNode = $('#cover img');
    let cover = coverNode.attr('src');
    if (cover && cover.startsWith('data:image')) {
      const fallbackStr = coverNode.attr('data-fallbacks');
      if (fallbackStr) {
        try {
          const parsedFallbacks = JSON.parse(fallbackStr);
          if (parsedFallbacks && parsedFallbacks.length > 0) {
            cover = parsedFallbacks[0];
          }
        } catch (e) {}
      }
    }

    const thumbnails: any[] = [];
    $('.thumb-container').each((_, el) => {
      const aNode = $(el).find('a.gallerythumb');
      const imgNode = aNode.find('img');
      const link = aNode.attr('href');
      
      let thumbUrl = imgNode.attr('data-src') || imgNode.attr('src');
      if (thumbUrl && thumbUrl.startsWith('data:image')) {
          // No fallback for thumbnails usually in this source but keeping logic
      }

      thumbnails.push({
        link: link ? `https://nhentai.to${link}` : null,
        thumbnail: thumbUrl || null,
        width: imgNode.attr('width'),
        height: imgNode.attr('height'),
        alt: imgNode.attr('alt')
      });
    });

    // Extract Like/Dislike counts
    const likes = $('#like-count').text().trim();
    const dislikes = $('#dislike-count').text().trim();
    const favorites = $('.nobold').text().replace(/[()]/g, '').trim();

    return NextResponse.json({
      status: true,
      author: "STENLY",
      result: {
        id: gallery_id || id,
        title: {
          english: title_english,
          japanese: title_japanese,
        },
        cover,
        stats: {
            likes,
            dislikes,
            favorites
        },
        tags_info: {
            tags,
            artists,
            characters,
            parodies,
            groups,
            languages,
            categories
        },
        pages_count: pagesCount,
        uploaded: {
            datetime: uploaded,
            text: uploaded_text
        },
        thumbnails
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
