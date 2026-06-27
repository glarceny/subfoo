import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import https from "https";
import zlib from "zlib";

class IPAScraper {
    baseURL: string;
    userAgent: string;

    constructor() {
        this.baseURL = 'https://ipa.pelajaran.co.id';
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    }

    async search(query: string, page = 1) {
        try {
            const url = `${this.baseURL}/page/${page}/?s=${encodeURIComponent(query)}`;
            const html = await this.fetchHTML(url);
            const $ = cheerio.load(html);

            const results: any[] = [];
            const articles = $('article.post');

            articles.each((_, el) => {
                const article = $(el);
                const title = article.find('.entry-title a').text().trim() || '';
                const url = article.find('.entry-title a').attr('href') || '';
                const slug = url.split('/').filter(Boolean).pop() || '';
                const thumbnail = article.find('.content-thumbnail img').attr('src') || '';
                const excerpt = article.find('.entry-content p').text().trim() || '';
                const author = article.find('.entry-author .fn').text().trim() || '';
                const date = article.find('.posted-on time').attr('datetime') || '';

                if (title) {
                    results.push({
                        title,
                        slug,
                        url,
                        thumbnail,
                        excerpt: excerpt.replace(/\[selengkapnya\]$/, '').trim(),
                        author,
                        date
                    });
                }
            });

            let totalPages = 1;
            const pagination = $('.page-numbers');
            if (pagination.length) {
                const links = pagination.find('a.page-numbers, span.page-numbers.current');
                const pageNumbers: number[] = [];
                links.each((_, link) => {
                    const text = $(link).text().trim();
                    if (text && !isNaN(Number(text)) && text !== '...') {
                        pageNumbers.push(parseInt(text));
                    }
                });
                if (pageNumbers.length > 0) {
                    totalPages = Math.max(...pageNumbers);
                }
            }

            return {
                success: true,
                author: 'stenly',
                creator: 'stenly',
                data: {
                    query,
                    current_page: page,
                    total_pages: totalPages,
                    total_results: results.length,
                    has_next_page: page < totalPages,
                    has_prev_page: page > 1,
                    results
                }
            };
        } catch (error: any) {
            return {
                success: false,
                author: 'stenly',
                creator: 'stenly',
                error: error.message || 'Unknown error'
            };
        }
    }

    fetchHTML(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                port: 443,
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'text/html,application/xhtml+xml',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                }
            };

            const req = https.request(options, (res) => {
                const chunks: any[] = [];
                const encoding = res.headers['content-encoding'];

                res.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                res.on('end', () => {
                    try {
                        const buffer = Buffer.concat(chunks);
                        let html;

                        if (encoding === 'zstd') {
                            html = buffer.toString('utf8');
                        } else if (encoding === 'gzip') {
                            html = zlib.gunzipSync(buffer).toString('utf8');
                        } else if (encoding === 'br') {
                            html = zlib.brotliDecompressSync(buffer).toString('utf8');
                        } else if (encoding === 'deflate') {
                            html = zlib.inflateSync(buffer).toString('utf8');
                        } else {
                            html = buffer.toString('utf8');
                        }

                        resolve(html);
                    } catch (e: any) {
                        reject(new Error(`Gagal decompress: ${e.message}`));
                    }
                });
            });

            req.on('error', reject);
            req.end();
        });
    }
}

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("q");
    const pageStr = req.nextUrl.searchParams.get("page");
    const page = pageStr ? parseInt(pageStr, 10) : 1;

    if (!query) {
        return NextResponse.json({ error: "Missing 'q' parameter for search query." }, { status: 400 });
    }

    try {
        const scraper = new IPAScraper();
        const result = await scraper.search(query, isNaN(page) ? 1 : page);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
