// By STENLY
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// nhentai image type code -> file extension
const EXT_MAP: Record<string, string> = {
  j: 'jpg',
  p: 'png',
  g: 'gif',
  w: 'webp',
};

interface PageImage {
  t: string;
  w: number;
  h: number;
}

const decodeJsonString = (raw: string) => {
  try {
    return JSON.parse(`"${raw}"`);
  } catch {
    return raw;
  }
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get('id');
    const urlParam = searchParams.get('url');
    const pageParam = searchParams.get('page');

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

    // Reader page memuat objek `new N.reader({...})` berisi media_id & daftar halaman HD.
    const targetUrl = `https://nhentai.to/g/${id}/1/`;

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

    // Ambil base media server (default zrocdn.xyz) & media_id internal.
    const mediaUrlMatch = html.match(/media_url\s*:\s*['"]([^'"]+)['"]/);
    let mediaUrl = mediaUrlMatch ? mediaUrlMatch[1] : 'https://zrocdn.xyz/';
    if (!mediaUrl.endsWith('/')) mediaUrl += '/';

    const mediaIdMatch = html.match(/"media_id"\s*:\s*"?(\d+)"?/);
    const mediaId = mediaIdMatch ? mediaIdMatch[1] : null;

    if (!mediaId) {
      return NextResponse.json({
        status: false,
        author: "STENLY",
        message: "Gagal mengekstrak media_id gallery (struktur halaman berubah atau gallery tidak ditemukan)."
      }, { status: 502 });
    }

    const galleryIdMatch = html.match(/"id"\s*:\s*(\d+)/);
    const galleryId = galleryIdMatch ? galleryIdMatch[1] : id;

    const numPagesMatch = html.match(/"num_pages"\s*:\s*(\d+)/);

    const titleEnMatch = html.match(/"english"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const titleJpMatch = html.match(/"japanese"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const titlePrettyMatch = html.match(/"pretty"\s*:\s*"((?:[^"\\]|\\.)*)"/);

    const pagesArrMatch = html.match(/"pages"\s*:\s*(\[[^\]]*\])/);
    let pages: PageImage[] = [];
    if (pagesArrMatch) {
      try {
        pages = JSON.parse(pagesArrMatch[1]);
      } catch {
        pages = [];
      }
    }

    if (pages.length === 0) {
      return NextResponse.json({
        status: false,
        author: "STENLY",
        message: "Daftar halaman tidak ditemukan pada gallery ini."
      }, { status: 502 });
    }

    const buildImage = (index: number) => {
      const meta = pages[index];
      const ext = EXT_MAP[meta.t] || 'jpg';
      const pageNum = index + 1;
      return {
        page: pageNum,
        url: `${mediaUrl}galleries/${mediaId}/${pageNum}.${ext}`,
        thumbnail: `${mediaUrl}galleries/${mediaId}/${pageNum}t.${ext}`,
        width: meta.w,
        height: meta.h,
        type: ext,
      };
    };

    const coverExt = EXT_MAP[pages[0].t] || 'jpg';
    const cover = `${mediaUrl}galleries/${mediaId}/cover.${coverExt}`;

    const totalPages = numPagesMatch ? parseInt(numPagesMatch[1], 10) : pages.length;

    // Mode single page: ?page=N -> hanya gambar HD halaman tersebut.
    if (pageParam) {
      const pageNum = parseInt(pageParam, 10);
      if (isNaN(pageNum) || pageNum < 1 || pageNum > pages.length) {
        return NextResponse.json({
          status: false,
          author: "STENLY",
          message: `Nomor halaman tidak valid. Rentang yang tersedia: 1 - ${pages.length}.`
        }, { status: 400 });
      }

      const current = buildImage(pageNum - 1);
      return NextResponse.json({
        status: true,
        author: "STENLY",
        result: {
          id: galleryId,
          media_id: mediaId,
          title: {
            english: titleEnMatch ? decodeJsonString(titleEnMatch[1]) : null,
            japanese: titleJpMatch ? decodeJsonString(titleJpMatch[1]) : null,
            pretty: titlePrettyMatch ? decodeJsonString(titlePrettyMatch[1]) : null,
          },
          cover,
          total_pages: totalPages,
          page: {
            current: pageNum,
            next: pageNum < pages.length ? pageNum + 1 : null,
            prev: pageNum > 1 ? pageNum - 1 : null,
          },
          image: current,
        }
      });
    }

    // Mode lengkap: seluruh gambar HD gallery.
    const images = pages.map((_, idx) => buildImage(idx));

    return NextResponse.json({
      status: true,
      author: "STENLY",
      result: {
        id: galleryId,
        media_id: mediaId,
        title: {
          english: titleEnMatch ? decodeJsonString(titleEnMatch[1]) : null,
          japanese: titleJpMatch ? decodeJsonString(titleJpMatch[1]) : null,
          pretty: titlePrettyMatch ? decodeJsonString(titlePrettyMatch[1]) : null,
        },
        media_url: mediaUrl,
        cover,
        total_pages: totalPages,
        images,
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
