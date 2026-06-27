import { NextRequest, NextResponse } from "next/server";
import https from 'https';

class CapCutDownloader {
    apiUrl = '3bic.com';
    endpoint = '/api/download';

    async download(templateUrl: string) {
        const payload = { url: templateUrl };
        const postData = JSON.stringify(payload);

        return new Promise((resolve) => {
            const options = {
                hostname: this.apiUrl,
                port: 443,
                path: this.endpoint,
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk.toString();
                });
                
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        
                        if (json.code === 200) {
                            resolve({
                                success: true,
                                author: 'Stenly',
                                creator: 'Stenly',
                                title: json.title,
                                author_name: json.authorName,
                                original_url: templateUrl,
                                download_video: this.buildFullUrl(json.originalVideoUrl),
                                download_cover: json.coverUrl
                            });
                        } else {
                            resolve({
                                success: false,
                                author: 'Stenly',
                                creator: 'Stenly',
                                error: `API returned code ${json.code}`
                            });
                        }
                    } catch(e) {
                        resolve({
                            success: false,
                            author: 'Stenly',
                            creator: 'Stenly',
                            error: 'Failed to parse response'
                        });
                    }
                });
            });
            
            req.on('error', (error) => {
                resolve({
                    success: false,
                    author: 'Stenly',
                    creator: 'Stenly',
                    error: error.message
                });
            });
            
            req.write(postData);
            req.end();
        });
    }

    buildFullUrl(path: string) {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `https://3bic.com${path}`;
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url") || searchParams.get("query") || searchParams.get("q") || searchParams.get("link");

    if (!url) {
        return NextResponse.json({
            success: false,
            author: 'Stenly',
            creator: 'Stenly',
            error: 'Masukkan url capcut',
            usage: '?url=https://www.capcut.com/tv2/ZSQANHeT9/'
        }, { status: 400 });
    }

    const downloader = new CapCutDownloader();
    const result = await downloader.download(url);

    return NextResponse.json(result);
}
