import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://aiconvert.online/api";
const USER_AGENT = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36";

class ImgToPrompt {
    async generateFromUrl(imageUrl: string) {
        try {
            const imageRes = await fetch(imageUrl);
            if (!imageRes.ok) throw new Error("Gagal mengambil gambar dari URL");
            
            const arrayBuffer = await imageRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = buffer.toString('base64');
            const mimeType = imageRes.headers.get('content-type') || 'image/jpeg';
            
            const payload = {
                imageData: base64Image,
                mimeType: mimeType,
                language: "en",
                promptType: "nano-banana-pro"
            };
            
            const submitRes = await fetch(`${BASE_URL}/submit-prompt-job`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": USER_AGENT,
                    "Referer": "https://aiconvert.online/prompt-generator"
                },
                body: JSON.stringify(payload)
            });
            
            const submitData = await submitRes.json();
            
            if (!submitData || !submitData.taskId) {
                return {
                    sukses: false,
                    author: "BINTANG",
                    pesan: submitData?.message || "Gagal submit gambar"
                };
            }
            
            const taskId = submitData.taskId;
            
            let maxCoba = 35;
            let jeda = 2000;
            
            for (let i = 0; i < maxCoba; i++) {
                const pollRes = await fetch(`${BASE_URL}/check-status-kv?taskId=${taskId}`, {
                    headers: {
                        "User-Agent": USER_AGENT,
                        "Referer": "https://aiconvert.online/prompt-generator"
                    }
                });
                
                const data = await pollRes.json();
                
                if (data.status === "SUCCESS" && data.result) {
                    return {
                        sukses: true,
                        author: "BINTANG",
                        task_id: taskId,
                        prompt: data.result.generatedPrompt,
                        pesan: "Prompt berhasil digenerate"
                    };
                } else if (data.status === "PENDING" || data.status === "PROCESSING") {
                    await new Promise(resolve => setTimeout(resolve, jeda));
                } else {
                    return {
                        sukses: false,
                        author: "BINTANG",
                        task_id: taskId,
                        pesan: data.message || "Gagal mendapatkan prompt"
                    };
                }
            }
            
            return {
                sukses: false,
                author: "BINTANG",
                task_id: taskId,
                pesan: "Waktu habis, prompt tidak kunjung selesai"
            };
            
        } catch (error: any) {
            return {
                sukses: false,
                author: "BINTANG",
                pesan: error.message
            };
        }
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url") || searchParams.get("image");

    if (!url) {
        return NextResponse.json({
            sukses: false,
            author: 'BINTANG',
            pesan: 'Masukkan url gambar',
            usage: '?url=https://example.com/image.jpg'
        }, { status: 400 });
    }

    const ai = new ImgToPrompt();
    const result = await ai.generateFromUrl(url);

    return NextResponse.json(result);
}
