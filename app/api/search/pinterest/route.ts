import { NextRequest, NextResponse } from "next/server";
import { CookieJar } from "tough-cookie";

class PinterestScraper {
  baseURL: string;
  jar: CookieJar;
  userAgent: string;

  constructor(config?: { userAgent?: string }) {
    this.baseURL = "https://id.pinterest.com";
    this.jar = new CookieJar();
    this.userAgent =
      config?.userAgent ||
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36";
  }

  async _initSession() {
    try {
      const response = await fetch(this.baseURL, {
        method: "GET",
        headers: {
          "User-Agent": this.userAgent,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      const setCookies = response.headers.get("set-cookie");
      if (setCookies) {
        // fetch API can combine set-cookie headers with commas.
        // It's a bit tricky to split correctly, but we'll attempt a simple split or just process it.
        // Node's native fetch might give multiple set-cookie as a comma separated string
        const cookies = typeof setCookies === 'string' ? setCookies.split(/,\s*(?=[^;]+?=)/) : [setCookies];
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i]) {
            await this.jar.setCookie(cookies[i], this.baseURL);
          }
        }
      }

      return true;
    } catch (error: any) {
      throw new Error("Session init failed: " + error.message);
    }
  }

  async search(query: string) {
    try {
      await this._initSession();
      const cookieString = await this.jar.getCookieString(this.baseURL);

      const path = "/search/pins/?q=" + encodeURIComponent(query) + "&rs=typed";

      const data = {
        context: {},
        options: {
          domains: null,
          rs: "typed",
          query: query,
          scope: "pins",
          user: null,
          filters: null,
          article: null,
          corpus: null,
          price_max: null,
          price_min: null,
          source_id: null,
          request_params: null,
          top_pin_ids: null,
          query_image_pins: null,
          appliedProductFilters: "---",
          applied_unified_filters: null,
          auto_correction_disabled: false,
          seoDrawerEnabled: false,
          journey_depth: null,
          source_module_id: null,
          source_url: path,
          static_feed: false,
          selected_one_bar_modules: null,
          query_pin_sigs: null,
          page_size: 50,
          customized_rerank_type: null,
          redux_normalize_feed: true,
        },
      };

      const encodedData = encodeURIComponent(JSON.stringify(data));
      const fullUrl =
        this.baseURL +
        "/resource/BaseSearchResource/get/?source_url=" +
        encodeURIComponent(path) +
        "&data=" +
        encodedData +
        "&_=" +
        Date.now();

      const res = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "User-Agent": this.userAgent,
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          Referer: this.baseURL + "/",
          "X-Requested-With": "XMLHttpRequest",
          "X-App-Version": "8048c97",
          "X-Pinterest-Appstate": "active",
          "X-Pinterest-Source-Url": "/",
          "X-Pinterest-Pws-Handler": "www/index.js",
          "Screen-Dpr": "1.25",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          Cookie: cookieString,
        },
      });

      const content = await res.text();
      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        parsed = null;
      }

      const items = this._getItems(parsed);

      return {
        success: true,
        author: "Stenly",
        creator: "Stenly",
        query: query,
        total: items.length,
        data: items,
      };
    } catch (error: any) {
      return {
        success: false,
        author: "Stenly",
        creator: "Stenly",
        error: error.message || "Search failed",
      };
    }
  }

  _getItems(data: any) {
    let raw: any[] = [];
    if (data?.resource_response?.data?.results) {
      raw = data.resource_response.data.results;
    }

    const output: any[] = [];
    for (let i = 0; i < raw.length; i++) {
      const item = raw[i];

      if (!item.id) continue;

      let name = item.grid_title || item.title || item.alt_text || "";
      if (!name || name.trim() === "") {
        name = item.pinner ? item.pinner.full_name || item.pinner.username || "" : "";
        if (name) name = "Pin from " + name;
      }

      const desc = item.description || null;

      let img = null;
      let thumb = null;
      if (item.images) {
        if (item.images.orig) img = item.images.orig.url || null;
        if (!img && item.images["564x564"]) img = item.images["564x564"].url || null;
        if (!img && item.images["474x"]) img = item.images["474x"].url || null;
        if (!img && item.images["236x"]) img = item.images["236x"].url || null;

        if (item.images["236x"]) thumb = item.images["236x"].url || null;
        if (!thumb && item.images["75x"]) thumb = item.images["75x"].url || null;
      }

      let creator = null;
      let creatorUsername = null;
      let creatorId = null;
      if (item.pinner) {
        creator = item.pinner.full_name || item.pinner.username || null;
        creatorUsername = item.pinner.username || null;
        creatorId = item.pinner.id || null;
      }

      let love = 0;
      let talk = 0;
      let share = 0;
      if (item.reaction_counts) {
        love = item.reaction_counts["1"] || 0;
        talk = item.reaction_counts["2"] || 0;
      }
      share = item.repin_count || 0;

      let boardName = null;
      let boardLink = null;
      if (item.board) {
        boardName = item.board.name || null;
        boardLink = item.board.url || null;
      }

      const link = "https://id.pinterest.com/pin/" + item.id + "/";

      output.push({
        id: item.id,
        title: name || null,
        url: link,
        description: desc,
        image: img,
        thumbnail: thumb,
        pinner: {
          name: creator,
          username: creatorUsername,
          id: creatorId,
        },
        likes: love,
        comments: talk,
        repins: share,
        created_at: item.created_at || null,
        board: boardName,
        board_url: boardLink,
      });
    }

    return output;
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing 'q' parameter for search query." }, { status: 400 });
  }

  try {
    const scraper = new PinterestScraper();
    const result = await scraper.search(query);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
