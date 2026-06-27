// by Stenly
import { NextRequest } from "next/server";

export const runtime = "edge"; // Superset (Vercel Edge Support)

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Remove extension if present (e.g., .png or .jpg)
    const encodedUrl = slug.split('.')[0];
    
    if (!encodedUrl) {
      return new Response("Missing image ID", { status: 400 });
    }

    // Decode from base64url
    let imageUrl: string;
    try {
      imageUrl = Buffer.from(encodedUrl, 'base64url').toString('utf8');
    } catch (e) {
      return new Response("Invalid image ID", { status: 400 });
    }

    if (!imageUrl || !imageUrl.startsWith('http')) {
      return new Response("Invalid image URL decoded", { status: 400 });
    }

    const res = await fetch(imageUrl);
    
    if (!res.ok) {
      return new Response("Failed to fetch image from provider", { status: res.status });
    }

    const contentType = res.headers.get("Content-Type") || "image/png";
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=31536000",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: any) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
