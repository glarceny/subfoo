import { NextRequest, NextResponse } from "next/server";

class BMKGGempa {
  async getGempa() {
    try {
      const res = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        },
        next: { revalidate: 60 } // Cache for 60 seconds
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      const infogempa = json.Infogempa?.gempa || json.gempa || json;

      return {
        success: true,
        author: 'BINTANG',
        creator: 'BINTANG',
        data: {
          tanggal: infogempa.Tanggal || '',
          jam: infogempa.Jam || '',
          datetime: infogempa.DateTime || '',
          coordinates: infogempa.Coordinates || '',
          lintang: infogempa.Lintang || '',
          bujur: infogempa.Bujur || '',
          magnitudo: infogempa.Magnitude || infogempa.Magnitudo || '',
          kedalaman: infogempa.Kedalaman || '',
          wilayah: infogempa.Wilayah || infogempa.Area || '',
          potensi: infogempa.Potensi || '',
          dirasakan: infogempa.Dirasakan || '',
          shakemap: infogempa.Shakemap || '',
          image_url: infogempa.Shakemap ? `https://data.bmkg.go.id/DataMKG/TEWS/${infogempa.Shakemap}` : ''
        }
      };
    } catch (e: any) {
      return {
        success: false,
        author: 'BINTANG',
        creator: 'BINTANG',
        error: e.message
      };
    }
  }

  async getGempaM5() {
    try {
      const res = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        },
        next: { revalidate: 60 } // Cache for 60 seconds
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      const list = json.Infogempa?.gempa || json.gempa || json.list || [];

      const gempaList = Array.isArray(list) ? list.map((g: any) => ({
        tanggal: g.Tanggal || '',
        jam: g.Jam || '',
        datetime: g.DateTime || '',
        coordinates: g.Coordinates || '',
        lintang: g.Lintang || '',
        bujur: g.Bujur || '',
        magnitudo: g.Magnitude || g.Magnitudo || '',
        kedalaman: g.Kedalaman || '',
        wilayah: g.Wilayah || g.Area || '',
        potensi: g.Potensi || ''
      })) : [];

      return {
        success: true,
        author: 'BINTANG',
        creator: 'BINTANG',
        data: {
          total: gempaList.length,
          list: gempaList
        }
      };
    } catch (e: any) {
      return {
        success: false,
        author: 'BINTANG',
        creator: 'BINTANG',
        error: e.message
      };
    }
  }
}

export async function GET(req: NextRequest) {
  const bmkg = new BMKGGempa();
  const searchParams = req.nextUrl.searchParams;
  const action = searchParams.get("action");
  const type = searchParams.get("type");
  const isM5 = searchParams.get("m5") === "true" || searchParams.get("list") === "true";

  if (action === "m5" || action === "list" || type === "m5" || type === "list" || isM5) {
    const result = await bmkg.getGempaM5();
    return NextResponse.json(result);
  } else {
    const result = await bmkg.getGempa();
    return NextResponse.json(result);
  }
}
