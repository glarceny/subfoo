import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  const resolvedParams = await params;
  const filename = resolvedParams.filename;
  if (!filename) {
    return NextResponse.json({ error: "Filename required" }, { status: 400 });
  }

  // Prevent directory traversal
  const safeFilename = filename.replace(/^.*[\\\/]/, '');
  const filePath = path.join(os.tmpdir(), safeFilename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  
  let contentType = "application/octet-stream";
  if (safeFilename.endsWith(".mp3")) contentType = "audio/mpeg";
  else if (safeFilename.endsWith(".jpg") || safeFilename.endsWith(".jpeg")) contentType = "image/jpeg";
  else if (safeFilename.endsWith(".png")) contentType = "image/png";

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": fileBuffer.length.toString(),
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
