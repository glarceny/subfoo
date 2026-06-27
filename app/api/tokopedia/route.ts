import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";

const ENDPOINT = "https://gql.tokopedia.com/graphql/SearchProductV5Query";
const TIMEOUT = 30000;

const QUERY = `
query SearchProductV5Query($params: String!) {
  searchProductV5(params: $params) {
    header {
      totalData
      responseCode
      isQuerySafe
      additionalParams
    }
    data {
      totalDataText
      products {
        oldID: id
        id: id_str_auto_
        ttsProductID
        name
        url
        applink
        mediaURL {
          image
          image300
          videoCustom
        }
        shop {
          oldID: id
          id: id_str_auto_
          ttsSellerID
          name
          url
          city
          tier
        }
        stock {
          ttsSKUID
        }
        badge {
          oldID: id
          id: id_str_auto_
          title
          url
        }
        price {
          text
          number
          range
          original
          discountPercentage
        }
        labelGroups {
          position
          title
          type
          url
        }
        category {
          oldID: id
          id: id_str_auto_
          name
          breadcrumb
          gaKey
        }
        rating
        wishlist
        ads {
          id
          productClickURL
          productViewURL
          productWishlistURL
          tag
        }
      }
    }
  }
}
`;

function buildParams(keyword: string, page: number, rows: number, uniqueId: string) {
  return new URLSearchParams({
    device: "desktop",
    enter_method: "normal_search",
    l_name: "sre",
    navsource: "home",
    ob: "23",
    page: String(page),
    q: keyword,
    related: "true",
    rows: String(rows),
    safe_search: "false",
    sc: "",
    scheme: "https",
    shipping: "",
    show_adult: "false",
    source: "universe",
    st: "product",
    start: String((page - 1) * rows),
    topads_bucket: "true",
    unique_id: uniqueId,
    user_addressId: "",
    user_cityId: "176",
    user_districtId: "2274",
    user_id: "",
    user_lat: "",
    user_long: "",
    user_postCode: "",
    user_warehouseId: "",
    variants: "",
    warehouses: ""
  }).toString();
}

function cleanProduct(x: any) {
  return {
    Id: x?.id || null,
    Tts_product_id: x?.ttsProductID || null,
    Name: x?.name || null,
    Url: x?.url || null,
    Applink: x?.applink || null,
    Image: x?.mediaURL?.image || null,
    Image_300: x?.mediaURL?.image300 || null,
    Video: x?.mediaURL?.videoCustom || null,
    Price: x?.price?.text || null,
    Price_number: x?.price?.number || null,
    Original_price: x?.price?.original || null,
    Discount: x?.price?.discountPercentage || 0,
    Rating: x?.rating || null,
    Sold: x?.labelGroups?.find((v: any) => v.position === "ri_product_credibility")?.title || null,
    Shop: {
      Id: x?.shop?.id || null,
      Name: x?.shop?.name || null,
      Url: x?.shop?.url || null,
      City: x?.shop?.city || null,
      Tier: x?.shop?.tier ?? null
    },
    Category: {
      Id: x?.category?.id || null,
      Name: x?.category?.name || null,
      Breadcrumb: x?.category?.breadcrumb || null
    },
    Badge: x?.badge?.title || null,
    Ads: {
      Id: x?.ads?.id || null,
      Tag: x?.ads?.tag ?? null,
      Click_url: x?.ads?.productClickURL || null,
      View_url: x?.ads?.productViewURL || null
    }
  };
}

export async function GET(req: NextRequest) {
  const started = Date.now();
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("query") || searchParams.get("keyword") || "vivo x300";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const rows = parseInt(searchParams.get("rows") || "60", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);

  const deviceId = String(Math.floor(7000000000000000000 + Math.random() * 999999999999999999));
  const uniqueId = crypto.randomBytes(16).toString("hex");

  try {
    const payload = [
      {
        operationName: "SearchProductV5Query",
        variables: {
          params: buildParams(keyword, page, rows, uniqueId)
        },
        query: QUERY
      }
    ];

    const res = await axios.post(ENDPOINT, payload, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        origin: "https://www.tokopedia.com",
        referer: "https://www.tokopedia.com/",
        "x-tkpd-lite-service": "zeus",
        "x-price-center": "true",
        "bd-device-id": deviceId,
        "bd-web-id": deviceId,
        "x-version": "bab78f7",
        "x-device": "desktop-0.0",
        "x-dark-mode": "false",
        "x-source": "tokopedia-lite",
        "tkpd-userid": "",
        "iris_session_id": ""
      },
      timeout: TIMEOUT,
      validateStatus: () => true
    });

    const root = Array.isArray(res.data) ? res.data[0] : res.data;
    const search = root?.data?.searchProductV5;
    const header = search?.header || {};
    const products = search?.data?.products || [];
    const limitedProducts = products.slice(0, limit);

    return NextResponse.json({
      Status: res.status >= 200 && res.status < 300 && Array.isArray(products),
      Code: res.status,
      Input: keyword,
      Page: page,
      Rows: rows,
      Limit: limit,
      Total: Number(header?.totalData || products.length || 0),
      Total_fetched: products.length,
      Total_showed: limitedProducts.length,
      Total_text: search?.data?.totalDataText || String(products.length),
      Response_code: header?.responseCode ?? null,
      Is_query_safe: header?.isQuerySafe ?? null,
      Additional_params: header?.additionalParams || null,
      Result: limitedProducts.map(cleanProduct),
      Time_ms: Date.now() - started
    });
  } catch (err: any) {
    return NextResponse.json({
      Status: false,
      Code: err?.response?.status || 500,
      Input: keyword,
      Error: err?.message || String(err),
      Time_ms: Date.now() - started
    }, { status: 500 });
  }
}