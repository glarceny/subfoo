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

    async getDetail(slug: string) {
        try {
            const url = `${this.baseURL}/${slug}/`;
            const html = await this.fetchHTML(url);
            const $ = cheerio.load(html);

            const title = $('.entry-title').first().text().trim() || '';
            const content = $('.entry-content').text().trim() || '';
            const thumbnail = $('.content-thumbnail img').first().attr('src') || '';
            const author = $('.entry-author .fn').first().text().trim() || '';
            const date = $('.posted-on time').first().attr('datetime') || '';

            return {
                success: true,
                author: 'stenly',
                creator: 'stenly',
                data: {
                    title,
                    slug,
                    url,
                    thumbnail,
                    content,
                    author,
                    date
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
    const url = new URL(req.url);
    const slug = url.searchParams.get("url") || url.searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ error: "Missing 'url' or 'slug' parameter." }, { status: 400 });
    }

    try {
        const scraper = new IPAScraper();
        const result = await scraper.getDetail(slug);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
