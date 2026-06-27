/* by Stenly */
"use client"

import Link from "next/link";
import { 
  ArrowLeft,
  ChevronRight,
  Database,
  Search,
  Camera,
  Image as ImageIcon,
  CircleDollarSign,
  ShoppingBag,
  Download,
  Bot,
  Globe,
  Languages,
  Box,
  Music,
  BookOpen,
  BotMessageSquare,
  Activity
} from "lucide-react";

const SpawnLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className={className}>
    <path d="M256 6l216.506 125v250L256 506 39.493 381V131L256 6z" fill="#673ab8" fillRule="nonzero"/>
    <ellipse rx="75" ry="196" fill="none" stroke="#fff" strokeWidth="16" transform="matrix(.5945 .77476 -.77476 .5945 256 256)"/>
    <ellipse rx="75" ry="196" fill="none" stroke="#fff" strokeWidth="16" transform="matrix(.5945 -.77476 .77476 .5945 256 256)"/>
    <circle r="34" fill="#fff" transform="translate(256 256) scale(.97656)"/>
  </svg>
);

export default function DocsV2Page() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-3 px-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center text-white font-black text-[10px] shadow-inner">S</div>
          <div className="flex items-center gap-1 font-extrabold text-slate-900 text-[11px] tracking-tight uppercase">
            <span>Stenly API</span>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600">Docs V2</span>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-extrabold text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-widest shadow-sm">
          <ArrowLeft className="w-3 h-3" /> CONSOLE
        </Link>
      </header>

      <main className="max-w-[700px] mx-auto px-4 py-8 space-y-8">
        
        {/* Intro */}
        <section className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            API Reference
          </h1>
          <p className="text-[12px] font-medium text-slate-600 leading-relaxed max-w-xl">
            Sistem dokumentasi <span className="font-bold text-indigo-600">V2</span>. Menyediakan arsitektur endpoint yang padat, respons Cepat, dan antarmuka pengujian terisolasi untuk mengintegrasikan model dalam hitungan menit.
          </p>
        </section>

        {/* Categories / List */}
        <div className="space-y-6 pt-4">
          
          <EndpointCategory 
            title="Intelligence & Language" 
            icon={<BrainIcon className="w-4 h-4 text-indigo-600" />}
          >
            <EndpointRow 
              title="Spawn AI Node"
              desc="Engine pemrosesan hybrid dengan log penalaran (Deep Thinking)."
              method="POST"
              path="/api/spawn-ai"
              href="/docsv2/spawn-ai"
              tag="ACTIVE"
              icon={<SpawnLogo className="w-3.5 h-3.5" />}
            />
            <EndpointRow 
              title="AIPrompt Node"
              desc="Interaksi AI cerdas dengan konfigurasi sistem prompt (kepribadian) custom."
              method="GET"
              path="/api/ai/aiprompt"
              href="/docsv2/aiprompt"
              tag="ACTIVE"
              icon={<Bot className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="ChatGPT Anon Node"
              desc="Scraper backend anonymous ChatGPT gratis."
              method="GET"
              path="/api/ai/chatgpt"
              href="/docsv2/chatgpt"
              tag="NEW"
              icon={<Bot className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="Turboseek AI Node"
              desc="AI-powered search & answer generator. Menggabungkan hasil pencarian dengan penjelasan AI."
              method="GET"
              path="/api/turboseek"
              href="/docsv2/turboseek"
              tag="ACTIVE"
              icon={<Search className="w-3.5 h-3.5 text-blue-500" />}
            />
            <EndpointRow 
              title="Honcho AI Node"
              desc="AI cerdas menggunakan model claude-sonnet-4-5-20250929 dari Honcho."
              method="GET"
              path="/api/ai/honcho"
              href="/docsv2/honcho"
              tag="NEW"
              icon={<Bot className="w-3.5 h-3.5 text-indigo-500" />}
            />
            <EndpointRow 
              title="Qwen3 Coder Node"
              desc="Chat dengan Qwen3 Coder AI yang powerful dan unlimited."
              method="GET"
              path="/api/ai/qwen3"
              href="/docsv2/qwen3"
              tag="NEW"
              icon={<Bot className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="Gita AI Node"
              desc="Chat dengan Bhagavad Gita AI Assistant."
              method="GET"
              path="/api/ai/gita"
              href="/docsv2/gita"
              tag="NEW"
              icon={<Bot className="w-3.5 h-3.5 text-orange-500" />}
            />
            <EndpointRow 
              title="Llama 4 Scout Node"
              desc="Chat dengan Llama 4 Scout 17B via aiconvert.online."
              method="GET"
              path="/api/ai/llama4"
              href="/docsv2/llama4"
              tag="NEW"
              icon={<Bot className="w-3.5 h-3.5 text-teal-500" />}
            />
            <EndpointRow 
              title="ImgToPrompt Node"
              desc="Generate prompt dari gambar menggunakan model Nano Banana Pro."
              method="GET"
              path="/api/ai/imgtoprompt"
              href="/docsv2/imgtoprompt"
              tag="NEW"
              icon={<Bot className="w-3.5 h-3.5 text-pink-500" />}
            />
          </EndpointCategory>

          <EndpointCategory 
            title="Search & Extraction" 
            icon={<Search className="w-4 h-4 text-sky-600" />}
          >
            <EndpointRow 
              title="Pinterest Node"
              desc="Scraping Pinterest Search untuk mencari pin berdasarkan kata kunci."
              method="GET"
              path="/api/search/pinterest"
              href="/docsv2/pinterest"
              tag="ACTIVE"
              icon={<ImageIcon className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="Web Fetcher Node"
              desc="Mengunduh website/aset, menyimpannya di file temporary, dan mengembalikan Base64 buffer."
              method="GET"
              path="/api/downloader/web-fetcher"
              href="/docsv2/web-fetcher"
              tag="ACTIVE"
              icon={<Globe className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="Translate & TTS Node"
              desc="Terjemahkan teks ke multi-bahasa dan ubah ke file suara (MP3)."
              method="GET"
              path="/api/tools/translate"
              href="/docsv2/translate"
              tag="ACTIVE"
              icon={<Languages className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="IPA Pelajaran Node"
              desc="Scraping pencarian dan materi pelajaran IPA dari ipa.pelajaran.co.id."
              method="GET"
              path="/api/search/ipa"
              href="/docsv2/ipa"
              tag="ACTIVE"
              icon={<BookOpen className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="Wikipedia Search Node"
              desc="Scraper untuk mengambil artikel Wikipedia lengkap beserta infobox dan gambar."
              method="GET"
              path="/api/search/wikipedia"
              href="/docsv2/wikipedia"
              tag="ACTIVE"
              icon={<BookOpen className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="MCPEDL Search Node"
              desc="Scraper untuk mencari mod/addon/maps langsung dari situs MCPEDL dengan filter."
              method="GET"
              path="/api/search/mcpedl"
              href="/docsv2/mcpedl-search"
              tag="ACTIVE"
              icon={<Search className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="Spotify DL Node"
              desc="Download audio lagu Spotify lengkap dengan metadata track."
              method="GET"
              path="/api/downloader/spotify"
              href="/docsv2/spotify"
              tag="ACTIVE"
              icon={<Music className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="MCPEDL DL Node"
              desc="Scraper untuk download mod/addon/maps langsung dari situs MCPEDL."
              method="GET"
              path="/api/downloader/mcpedl"
              href="/docsv2/mcpedl"
              tag="ACTIVE"
              icon={<Box className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="TikTok DL Node"
              desc="Unduh video/slide HD bebas watermark seketika via tikdownloader.io"
              method="GET"
              path="/api/downloader/tiktok"
              href="/docsv2/tiktok"
              tag="ACTIVE"
              icon={<Download className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="CapCut DL Node"
              desc="Download CapCut templates dan videos via 3bic."
              method="GET"
              path="/api/downloader/capcut"
              href="/docsv2/capcut"
              tag="NEW"
              icon={<Download className="w-3.5 h-3.5 text-black" />}
            />
            <EndpointRow 
              title="SeeGore Node"
              desc="Ekstraksi high-speed aset video dan metadata dari SeeGore secara real-time."
              method="GET"
              path="/api/seegore"
              href="/docsv2/seegore"
              tag="ACTIVE"
              icon={<Database className="w-3.5 h-3.5 text-rose-500" />}
            />
            <EndpointRow 
              title="Nhentai Node"
              desc="Scraping indeks manga dan doujinshi dari nhentai.to/go"
              method="GET"
              path="/api/nhentai"
              href="/docsv2/nhentai"
              tag="ACTIVE"
              icon={<Database className="w-3.5 h-3.5 text-[#ed2553]" />}
            />
            <EndpointRow 
              title="Hentaigasm Node"
              desc="Scraping anime, pencarian, dan tautan tontonan dari hentaigasm."
              method="GET"
              path="/api/hentaigsm/anime"
              href="/docsv2/hentaigsm"
              tag="NEW"
              icon={<Database className="w-3.5 h-3.5 text-pink-500" />}
            />
            <EndpointRow 
              title="XVideos Node"
              desc="Scraping XVideos lengkap dengan fitur pencarian dan video terkini."
              method="GET"
              path="/api/xvideos"
              href="/docsv2/xvideos"
              tag="NEW"
              icon={<Database className="w-3.5 h-3.5 text-red-500" />}
            />
          </EndpointCategory>

          <EndpointCategory 
            title="Visual & Rendering" 
            icon={<Camera className="w-4 h-4 text-indigo-600" />}
          >
            <EndpointRow 
              title="SSWEB Node"
              desc="Screenshot website dengan kustomisasi viewport dan delay."
              method="GET"
              path="/api/ssweb"
              href="/docsv2/ssweb"
              tag="ACTIVE"
              icon={<ImageIcon className="w-3.5 h-3.5 text-indigo-500" />}
            />
          </EndpointCategory>

          <EndpointCategory 
            title="Financial & Utilities" 
            icon={<CircleDollarSign className="w-4 h-4 text-emerald-600" />}
          >
            <EndpointRow 
              title="Wise Currency Node"
              desc="Konversi mata uang real-time dan generator grafik history dari Wise."
              method="GET"
              path="/api/wise"
              href="/docsv2/wise"
              tag="ACTIVE"
              icon={<CircleDollarSign className="w-3.5 h-3.5 text-emerald-500" />}
            />
            <EndpointRow 
              title="BMKG Gempa Node"
              desc="API Informasi Gempa Bumi terkini & dirasakan langsung dari BMKG TEWS."
              method="GET"
              path="/api/info/gempa"
              href="/docsv2/gempa"
              tag="ACTIVE"
              icon={<Activity className="w-3.5 h-3.5 text-rose-500" />}
            />
          </EndpointCategory>

          <EndpointCategory 
            title="E-Commerce" 
            icon={<ShoppingBag className="w-4 h-4 text-orange-500" />}
          >
            <EndpointRow 
              title="Tokopedia Search Node"
              desc="API pencarian produk Tokopedia secara real-time."
              method="GET"
              path="/api/tokopedia"
              href="/docsv2/tokopedia"
              tag="ACTIVE"
              icon={<ShoppingBag className="w-3.5 h-3.5 text-orange-400" />}
            />
          </EndpointCategory>

        </div>
      </main>
    </div>
  );
}

// Sub-components

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1 3 4 4.5 4.5 0 0 1 3-4Z"/></svg>
  );
}

function EndpointCategory({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2.5 mb-2 relative z-10 bg-[#fafafa] w-max pr-3 py-1">
        <div className="p-1 border border-slate-300 rounded bg-white text-slate-700 shadow-sm shrink-0">
          {icon}
        </div>
        <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{title}</h2>
      </div>
      <div className="ml-[11px] border-l-2 border-slate-300 pl-[23px] pb-5 space-y-2.5 relative">
        {children}
      </div>
    </div>
  );
}

function EndpointRow({ title, desc, path, method, href, tag, icon }: { title: string, desc: string, path: string, method: string, href: string, tag: string, icon: any }) {
  const isComingSoon = tag === "COMING_SOON" || tag === "DEPRECATED";
  const TagColor = tag === "ACTIVE" 
    ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
    : tag === "DEPRECATED"
    ? "bg-rose-100 text-rose-700 border-rose-200"
    : "bg-slate-100 text-slate-600 border-slate-200";

  const MethodColor = method === "POST" 
    ? "text-emerald-400" 
    : method === "GET" 
    ? "text-sky-400" 
    : "text-slate-400";

  return (
    <div className="relative group">
      {/* Node connector line */}
      <div className="absolute -left-[24px] top-[18px] w-[24px] h-[2px] bg-slate-300 transition-colors group-hover:bg-indigo-400"></div>
      <div className="absolute -left-[27px] top-[15.5px] w-1.5 h-1.5 bg-slate-400 rounded-full ring-2 ring-[#fafafa] transition-colors group-hover:bg-indigo-500"></div>
      
      <Link href={href} className={`block bg-white border border-slate-200/80 rounded-xl p-2 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md ${isComingSoon ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5 mt-0.5">
                <h3 className="text-[10px] font-black text-slate-900 truncate">{title}</h3>
                {tag !== "ACTIVE" ? (
                  <span className={`text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest border ${TagColor}`}>
                    {tag}
                  </span>
                ) : (
                  <>
                    <span className="text-[6px] font-black px-1.5 py-[2px] rounded uppercase tracking-widest border bg-slate-50 border-slate-200 text-slate-500 hidden sm:inline-block">JSON</span>
                    <span className="text-[6px] font-black px-1.5 py-[2px] rounded uppercase tracking-widest border bg-emerald-50 border-emerald-100 text-emerald-600 hidden sm:inline-block">HTTP/2</span>
                  </>
                )}
              </div>
              <p className="text-[9px] text-slate-500 font-bold leading-tight truncate">{desc}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex flex-col items-end mr-1 border-r border-slate-200 pr-3">
               <span className="text-[5px] font-black text-slate-400 uppercase tracking-widest">AVG_LATENCY</span>
               <span className="text-[8px] font-bold text-emerald-500">~24ms</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#050505] border border-slate-800 rounded-md shrink-0 shadow-inner">
              <span className={`text-[7px] font-black tracking-widest uppercase ${MethodColor}`}>{method}</span>
              <span className="text-slate-700">|</span>
              <code className="text-[8px] font-bold text-slate-300 font-mono tracking-tight">{path}</code>
            </div>
            {!isComingSoon && (
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all hidden md:block" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

