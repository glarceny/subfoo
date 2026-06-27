// by Stenly
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = 'force-dynamic';

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0";

async function bootstrap() {
    const visitorId = crypto.randomUUID();
    const sessionId = crypto.randomUUID();
    const edgeVid = crypto.randomUUID();
    const edgeSid = crypto.randomUUID();

    const captured: string[] = [];
    try {
        const res = await fetch("https://www.perplexity.ai/", {
            headers: {
                "user-agent": UA,
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": '"Chromium";v="148", "Microsoft Edge";v="148", "Not/A)Brand";v="99"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "upgrade-insecure-requests": "1"
            },
            next: { revalidate: 0 }
        });
        
        // Use getSetCookie if available (Node 18+ / Next.js)
        const setCookies = (res.headers as any).getSetCookie ? (res.headers as any).getSetCookie() : (res.headers.get("set-cookie")?.split(",") || []);
        
        for (const c of setCookies) {
            captured.push(c.split(";")[0].trim());
        }
    } catch (e) {
        console.error("Bootstrap error:", e);
    }

    const cookieParts = [
        `pplx.visitor-id=${visitorId}`,
        `pplx.session-id=${sessionId}`,
        `pplx.edge-vid=${edgeVid}`,
        `pplx.edge-sid=${edgeSid}`,
        "pplx.trackingAllowed=true",
        ...captured
    ];
    return { visitorId, sessionId, cookie: cookieParts.join("; ") };
}

async function readSSE(stream: ReadableStream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let lastChunk: any = null;
    const allChunks: any[] = [];

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() || "";

        for (const ev of events) {
            if (!ev.trim()) continue;
            let dataStr = "";
            for (const ln of ev.split(/\r?\n/)) {
                if (ln.startsWith("data: ")) dataStr += ln.slice(6);
                else if (ln.startsWith("data:")) dataStr += ln.slice(5).trim();
            }
            if (!dataStr || dataStr === "{}") continue;
            try {
                const obj = JSON.parse(dataStr);
                if (obj && typeof obj === "object" && Object.keys(obj).length > 0) {
                    lastChunk = obj;
                    allChunks.push(obj);
                }
            } catch {}
        }
    }
    return { lastChunk, allChunks };
}

function extractAnswerFromChunk(chunk: any) {
    const empty = { answer: "", chunks: [], structured: [], extra_web_results: [] };
    if (!chunk?.text) return empty;
    let steps;
    try { steps = JSON.parse(chunk.text); } catch { return empty; }
    if (!Array.isArray(steps)) return empty;
    const finalStep = steps.find(s => s.step_type === "FINAL" || s.step_type === "ANSWER");
    const targetContent = finalStep?.content?.answer || steps.find(s => s.content?.answer)?.content?.answer;
    if (!targetContent) return empty;
    try {
        const inner = JSON.parse(targetContent);
        return {
            answer: inner.answer || "",
            chunks: inner.chunks || [],
            structured: inner.structured_answer || [],
            extra_web_results: inner.extra_web_results || []
        };
    } catch {
        // Fallback for non-JSON answer
        return { ...empty, answer: targetContent };
    }
}

function extractMedia(chunk: any) {
    const media: any[] = [];
    if (!chunk?.blocks || !Array.isArray(chunk.blocks)) return media;
    for (const block of chunk.blocks) {
        const items = block?.media_items_block?.media_items;
        if (Array.isArray(items)) {
            for (const it of items) {
                media.push({
                    title: it.title || it.name || "",
                    url: it.medium_url || it.url || it.image_url || it.image || "",
                    thumbnail: it.thumbnail || it.thumb_url || it.thumb || null,
                    source: it.source || it.source_url || null,
                    domain: it.domain || null
                });
            }
        }
        const images = block?.inline_images_block?.images;
        if (Array.isArray(images)) {
            for (const img of images) {
                media.push({
                    title: img.title || "",
                    url: img.image_url || img.url || "",
                    thumbnail: img.thumbnail || null,
                    source: img.source_url || null
                });
            }
        }
    }
    return media.filter(m => m.url);
}

function cleanSources(arr: any[]) {
    if (!Array.isArray(arr)) return [];
    return arr.map(s => ({
        title: s.name || s.title || "",
        url: s.url || s.link || "",
        snippet: s.snippet || s.description || "",
        domain: (() => { try { return new URL(s.url).hostname.replace(/^www\./, ""); } catch { return null; } })(),
        publishedAt: s.publish_date || s.timestamp || null
    })).filter(s => s.url);
}

async function perplexitySearch(query: string, options: any = {}) {
    const {
        mode = "concise",
        model = "turbo",
        focus = "internet",
        sources = ["web"],
        timezone = "UTC",
        language = "en-US"
    } = options;

    const session = await bootstrap();
    const q = String(query).trim();
    
    const payload = {
        params: {
            attachments: [],
            language,
            timezone,
            search_focus: focus,
            sources,
            frontend_uuid: crypto.randomUUID(),
            mode,
            model_preference: model,
            is_related_query: false,
            is_sponsored: false,
            frontend_context_uuid: crypto.randomUUID(),
            prompt_source: "user",
            query_source: "home",
            is_incognito: false,
            time_from_first_type: 3000 + Math.floor(Math.random() * 4000),
            local_search_enabled: false,
            use_schematized_api: true,
            send_back_text_in_streaming_api: false,
            supported_block_use_cases: [
                "answer_modes", "media_items", "knowledge_cards", "inline_entity_cards",
                "place_widgets", "finance_widgets", "news_widgets", "shopping_widgets",
                "search_result_widgets", "inline_images", "inline_assets", "placeholder_cards",
                "diff_blocks", "inline_knowledge_cards", "entity_group_v2", "refinement_filters",
                "answer_tabs", "preserve_latex", "in_context_suggestions",
                "pending_followups", "inline_claims", "unified_assets"
            ],
            client_coordinates: null,
            mentions: [],
            dsl_query: q,
            skip_search_enabled: true,
            is_nav_suggestions_disabled: false,
            source: "default",
            always_search_override: false,
            override_no_search: false,
            client_search_results_cache_key: crypto.randomUUID(),
            should_ask_for_mcp_tool_confirmation: true,
            browser_agent_allow_once_from_toggle: false,
            force_enable_browser_agent: false,
            supported_features: ["browser_agent_permission_banner_v1.1"],
            extended_context: false,
            version: "2.18",
            rum_session_id: crypto.randomUUID()
        },
        query_str: q
    };

    const res = await fetch("https://www.perplexity.ai/rest/sse/perplexity_ask", {
        method: "POST",
        headers: {
            "accept": "text/event-stream",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "cookie": session.cookie,
            "origin": "https://www.perplexity.ai",
            "pragma": "no-cache",
            "referer": "https://www.perplexity.ai/",
            "sec-ch-ua": '"Chromium";v="148", "Microsoft Edge";v="148", "Not/A)Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": UA,
            "x-perplexity-request-endpoint": "https://www.perplexity.ai/rest/sse/perplexity_ask",
            "x-perplexity-request-reason": "ask-query-state-provider",
            "x-perplexity-request-try-number": "1",
            "x-request-id": crypto.randomUUID()
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(`Perplexity API error: ${res.status}`);
    }

    if (!res.body) {
        throw new Error("No response body from Perplexity");
    }

    const { lastChunk, allChunks } = await readSSE(res.body);
    if (!lastChunk || allChunks.length === 0) {
        throw new Error("Empty response from Perplexity");
    }

    // Aggregate data from all chunks to ensure we don't miss anything sent early
    let finalAnswer = "";
    let finalSources: any[] = [];
    let finalExtraSources: any[] = [];
    let finalMedia: any[] = [];
    let finalRelated: any[] = [];
    let threadId = null;
    let threadUrl = null;

    for (const chunk of allChunks) {
        const inner = extractAnswerFromChunk(chunk);
        if (inner.answer && inner.answer.length > finalAnswer.length) {
            finalAnswer = inner.answer;
        }
        if (inner.extra_web_results?.length > finalExtraSources.length) {
            finalExtraSources = cleanSources(inner.extra_web_results);
        }
        if (chunk.sources?.length > finalSources.length) {
            finalSources = cleanSources(chunk.sources);
        }
        const chunkMedia = extractMedia(chunk);
        if (chunkMedia.length > finalMedia.length) {
            finalMedia = chunkMedia;
        }
        if (chunk.related_queries?.length > finalRelated.length) {
            finalRelated = chunk.related_queries;
        }
        if (chunk.backend_uuid) threadId = chunk.backend_uuid;
        if (chunk.thread_url_slug) {
            threadUrl = `https://www.perplexity.ai/search/${chunk.thread_url_slug}`;
        }
    }
    
    return {
        query: q,
        mode,
        model,
        focus,
        answer: finalAnswer.replace(/【\d+†[^】]*】/g, "").trim(),
        sources: finalSources,
        extraSources: finalExtraSources,
        media: finalMedia,
        related: finalRelated,
        threadId,
        threadUrl,
        sessionInfo: { visitorId: session.visitorId }
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const query = body.q || body.prompt;

        if (!query) {
            return NextResponse.json({ status: false, error: "Query 'q' or 'prompt' is required" }, { status: 400 });
        }

        const result = await perplexitySearch(query, {
            mode: body.mode,
            model: body.model,
            focus: body.focus,
            language: body.language,
            timezone: body.timezone
        });

        return NextResponse.json({
            status: true,
            creator: "Stenly",
            result: result
        });
    } catch (err: any) {
        return NextResponse.json({ status: false, error: err.message }, { status: 500 });
    }
}
