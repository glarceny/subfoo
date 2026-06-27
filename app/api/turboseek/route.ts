import { NextRequest, NextResponse } from "next/server";
import https from 'https';

class Turboseek {
    baseURL = 'https://www.turboseek.io/api';
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    async search(query: string) {
        try {
            const sources = await this.getSources(query);
            
            if (!sources || sources.length === 0) {
                return {
                    success: false,
                    author: 'Stenly',
                    creator: 'Stenly',
                    error: 'Tidak ditemukan sumber untuk query tersebut'
                };
            }

            const filteredSources = sources.filter((s: any) => {
                const title = s.title || '';
                const content = s.content || '';
                const url = s.url || '';
                
                if (url.includes('.pdf') || 
                    url.includes('journal') || 
                    url.includes('ac.id') ||
                    title.includes('Jurnal') ||
                    title.includes('Vol.') ||
                    title.includes('ISSN') ||
                    title.includes('Klasifikasi')) {
                    return false;
                }
                
                if (content.length < 100) return false;
                
                return true;
            });

            const answer = await this.getAnswer(query, filteredSources);
            const cleanAnswer = this.cleanHtml(answer);

            const formattedSources = filteredSources.map((s: any) => ({
                title: this.cleanText(s.title || ''),
                url: s.url || ''
            }));

            return {
                success: true,
                author: 'Stenly',
                creator: 'Stenly',
                data: {
                    query: query,
                    answer: cleanAnswer,
                    sources: formattedSources
                }
            };
        } catch (error: any) {
            return {
                success: false,
                author: 'Stenly',
                creator: 'Stenly',
                error: error.message || 'Unknown error'
            };
        }
    }

    cleanText(text: string) {
        if (!text) return '';
        
        let cleaned = text;
        cleaned = cleaned.replace(/[\n\r\t]+/g, ' ');
        cleaned = cleaned.replace(/\s{2,}/g, ' ');
        cleaned = cleaned.replace(/<[^>]*>/g, '');
        cleaned = cleaned.replace(/&nbsp;/g, ' ');
        cleaned = cleaned.replace(/^#+\s*/gm, '');
        cleaned = cleaned.replace(/^[•·\-*]\s*/gm, '');
        cleaned = cleaned.trim();
        
        return cleaned;
    }

    cleanHtml(html: string) {
        if (!html) return '';
        
        let text = html;
        text = text.replace(/<[^>]*>/g, '');
        text = text.replace(/[\n\r\t]+/g, ' ');
        text = text.replace(/&nbsp;/g, ' ');
        text = text.replace(/\s{2,}/g, ' ');
        text = text.trim();
        
        return text;
    }

    async getSources(query: string): Promise<any> {
        const payload = JSON.stringify({ question: query });
        
        const options = {
            hostname: 'www.turboseek.io',
            port: 443,
            path: '/api/getSources',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'User-Agent': this.userAgent
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const result = JSON.parse(data);
                        resolve(result);
                    } catch (e: any) {
                        reject(new Error(`Gagal parse response: ${e.message}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(payload);
            req.end();
        });
    }

    async getAnswer(query: string, sources: any): Promise<string> {
        const payload = JSON.stringify({ 
            question: query, 
            sources: sources 
        });

        const options = {
            hostname: 'www.turboseek.io',
            port: 443,
            path: '/api/getAnswer',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'User-Agent': this.userAgent
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', reject);
            req.write(payload);
            req.end();
        });
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({
            success: false,
            author: 'Stenly',
            creator: 'Stenly',
            error: 'Masukkan query pencarian',
            usage: '?query=bintang'
        }, { status: 400 });
    }

    const turboseek = new Turboseek();
    const result = await turboseek.search(query);

    return NextResponse.json(result);
}
