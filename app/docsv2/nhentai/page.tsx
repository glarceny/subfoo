// by Stenly
"use client"

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal as TerminalIcon, 
  Copy, 
  Check, 
  ArrowLeft,
  ChevronRight,
  Zap,
  Loader2,
  Blocks,
  ListVideo,
  Images
} from "lucide-react";

type NhMode = 'list' | 'watch' | 'read';

// --- MICRO COMPONENTS ---

const NHentaiLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.182 17.51h-2.182V10.15l-3.364 7.36H9.728l-3.364-7.36v7.36H4.182V6.49h2.545l4.091 8.944 4.091-8.944h2.545v11.02z" />
  </svg>
);

const Header = () => (
  <div className="bg-white border-b border-slate-200 py-2 px-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2">
      <div className="p-1 rounded bg-[#ed2553] text-white shrink-0">
         <NHentaiLogo className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-1 font-extrabold text-slate-900 text-[10px] tracking-tight uppercase">
        <span>Stenly API</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">Docs</span>
        <span className="text-slate-300">/</span>
        <span className="text-[#ed2553]">Nhentai</span>
      </div>
    </div>
    <Link href="/docsv2" className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[7px] font-extrabold text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-widest shadow-sm">
      <ArrowLeft className="w-2.5 h-2.5" /> KEMBALI
    </Link>
  </div>
);

const SectionTitle = ({ title, icon: Icon }: { title: string, icon?: any }) => (
  <div className="flex items-center gap-1.5 mb-2 border-b border-slate-200/60 pb-1.5">
    {Icon ? <Icon className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
    <h2 className="text-[9px] font-extrabold text-slate-900 uppercase tracking-widest">{title}</h2>
  </div>
);

const EndpointBox = ({ method, url }: { method: string, url: string }) => (
  <div className="bg-[#050505] rounded-lg p-2.5 flex items-center justify-between shadow-lg border border-slate-800">
    <div className="flex items-center gap-2 shrink-0">
      <div className="bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-[3px] text-[8px] font-black tracking-[0.2em] uppercase border border-sky-500/20">
        {method}
      </div>
      <code className="text-[10px] font-bold text-slate-200 tracking-wide font-mono truncate max-w-[200px] sm:max-w-none">
        {url}
      </code>
    </div>
    <div className="flex items-center gap-1.5 text-[7px] font-extrabold text-slate-500 uppercase tracking-widest px-2 py-0.5 border border-slate-800 rounded bg-slate-900/50 shrink-0">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live
    </div>
  </div>
);

const DenseTable = () => (
  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50/80 border-b border-slate-200 text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <th className="py-2.5 px-3 border-r border-slate-100 w-[100px]">Parameter</th>
          <th className="py-2.5 px-3 border-r border-slate-100 w-[80px]">Type</th>
          <th className="py-2.5 px-3">Description</th>
        </tr>
      </thead>
      <tbody className="text-[9px]">
        <ParamRow param="page" type="Number" desc="Parameter paginasi untuk mengekstraksi halaman spesifik. Jika kosong, default adalah halaman 1." />
      </tbody>
    </table>
  </div>
);

const ParamRow = ({ param, type, desc, required = false }: { param: string, type: string, desc: string, required?: boolean }) => (
  <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
    <td className="py-2 px-3 border-r border-slate-100">
      <div className="flex items-center gap-1">
        <span className="font-extrabold text-slate-900 tracking-tight">{param}</span>
        {required && <span className="font-black text-[#ed2553] text-[8px]">*</span>}
      </div>
    </td>
    <td className="py-2 px-3 font-bold text-indigo-600 uppercase tracking-widest border-r border-slate-100 text-[8px]">{type}</td>
    <td className="py-2 px-3 font-bold text-slate-500 leading-tight text-[8px] break-all">{desc}</td>
  </tr>
);

const MicroCodeBlock = ({ rawCode, children, label, copyId, copied, onCopy }: { rawCode: string, children: React.ReactNode, label: string, copyId: string, copied: string | null, onCopy: (text: string, id: string) => void }) => (
  <div className="space-y-1 w-full flex flex-col justify-start">
    <div className="text-[8px] font-black text-slate-900 tracking-widest uppercase">{label}</div>
    <div className="bg-[#050505] rounded-lg border border-slate-800 overflow-hidden relative group shadow-sm flex flex-col">
      <button 
        onClick={() => onCopy(rawCode, copyId)}
        className="absolute top-1.5 right-1.5 p-1 bg-slate-800 text-slate-400 rounded hover:text-white opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        {copied === copyId ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
      </button>
      <div className="p-2.5 overflow-x-auto scrollbar-hide flex">
        <div className="font-mono text-[9px] leading-relaxed whitespace-pre font-bold shrink-0 text-slate-300 w-full">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN DOCS PAGE ---

export default function NHentaiDocsUltraDense() {
  const [pageParam, setPageParam] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'payload' | 'response'>('payload');
  const [activeMode, setActiveMode] = useState<NhMode>('list');
  const [watchId, setWatchId] = useState("657862");
  const [readId, setReadId] = useState("657267");
  const [readPage, setReadPage] = useState("");

  const activeParam = activeMode === 'list' ? pageParam : activeMode === 'watch' ? watchId : readId;

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExecute = async () => {
    if (!activeParam.trim()) return;
    if (isLoading) return;
    
    setIsLoading(true);
    setResponse(null);
    setActiveTab('response');

    try {
      const endpoint = activeMode === 'watch'
        ? `/api/nhentai/watch?id=${watchId}`
        : activeMode === 'read'
        ? `/api/nhentai/read?id=${readId}${readPage.trim() ? `&page=${readPage.trim()}` : ''}`
        : `/api/nhentai?page=${pageParam}`;

      const res = await fetch(endpoint, {
        method: "GET"
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setResponse(data);
      } catch (parseError) {
        setResponse({ 
          error: "Failed to parse API response. This might be due to anti-bot protection blocking the server request.", 
          status: res.status,
          raw_response_snippet: text.substring(0, 150) + (text.length > 150 ? '...' : '') 
        });
      }
      
    } catch (err: any) {
      setResponse({ error: "Connection to internal node failed.", details: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-[#ed2553]/20">
      <Header />
      
      <main className="max-w-[700px] mx-auto px-4 py-8 space-y-10 pb-20">
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ed2553]/10 border border-[#ed2553]/30 rounded-[4px] text-[7px] font-black text-[#ed2553] uppercase tracking-[0.2em] shadow-sm">
              <Zap className="w-2.5 h-2.5 fill-[#ed2553]" /> SCRAPER NODE
            </div>
            
          <div className="flex items-center bg-slate-200/50 p-1 rounded-lg">
              <button 
                onClick={() => setActiveMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${activeMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <ListVideo className="w-3.5 h-3.5" /> POST LIST
              </button>
              <button 
                onClick={() => setActiveMode('watch')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${activeMode === 'watch' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Zap className="w-3.5 h-3.5" /> WATCH
              </button>
              <button 
                onClick={() => setActiveMode('read')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${activeMode === 'read' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Images className="w-3.5 h-3.5" /> DETAIL HD
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ed2553] text-white rounded-xl flex items-center justify-center shrink-0">
              <NHentaiLogo className="w-6 h-6" />
            </div>
            <h1 className="text-[20px] font-black text-slate-900 tracking-tight uppercase italic leading-none flex items-center gap-2">
              Nhentai <span className="text-slate-400">Node</span>
            </h1>
          </div>

          <p className="text-[12px] text-slate-600 leading-relaxed max-w-xl pb-2">
            {activeMode === 'list' 
              ? "Akses engine scraper spesialis nhentai.to/go. Parsing grid katalog indeks manga publik."
              : activeMode === 'watch'
              ? "Akses engine scraper detail gallery. Ekstraksi cover, tags, stats, dan thumbnails gambar lengkap."
              : "Akses engine reader resolusi penuh. Ekstraksi seluruh gambar HD per halaman langsung dari media server (zrocdn)."}
          </p>

          <EndpointBox 
            method="GET" 
            url={activeMode === 'list' ? "https://stenly.org/api/nhentai" : activeMode === 'watch' ? "https://stenly.org/api/nhentai/watch" : "https://stenly.org/api/nhentai/read"} 
          />
        </section>

        {/* PAYLOAD / HEADERS */}
        <section className="space-y-3">
          <SectionTitle title="Header & URL Arguments" icon={Blocks} />
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <th className="py-2.5 px-3 border-r border-slate-100 w-[100px]">Parameter</th>
                  <th className="py-2.5 px-3 border-r border-slate-100 w-[80px]">Type</th>
                  <th className="py-2.5 px-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-[9px]">
                {activeMode === 'list' ? (
                  <ParamRow param="page" type="Number" desc="Parameter paginasi untuk mengekstraksi halaman spesifik." />
                ) : activeMode === 'watch' ? (
                  <>
                    <ParamRow param="id" type="String" desc="ID gallery (misal: 657862). Wajib jika 'url' tidak ada." required />
                    <ParamRow param="url" type="String" desc="Full URL gallery nhentai.to. Wajib jika 'id' tidak ada." />
                  </>
                ) : (
                  <>
                    <ParamRow param="id" type="String" desc="ID gallery (misal: 657267). Wajib jika 'url' tidak ada." required />
                    <ParamRow param="url" type="String" desc="Full URL gallery nhentai.to. Wajib jika 'id' tidak ada." />
                    <ParamRow param="page" type="Number" desc="Opsional. Jika diisi hanya mengembalikan 1 gambar HD halaman tersebut (beserta navigasi next/prev). Jika kosong, seluruh gambar HD dikembalikan." />
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* INTEGRATION GUIDE SECTION */}
        <section className="space-y-5">
          <SectionTitle title="Full Integration Guide" />

          <div className="flex gap-3 items-start w-full">
            <div className="w-5 h-5 rounded-full bg-[#ed2553] text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5 shadow-sm">1</div>
            <div className="space-y-4 flex-1 min-w-0">
              <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest mt-0.5">Siapkan Request REST</div>
              <p className="text-[10px] text-slate-600 leading-relaxed -mt-2">
                Lakukan request ke endpoint kami menggunakan metode GET. Gunakan argument &quot;page&quot; pada skema URL query.
              </p>
              
              <div className="space-y-4 w-full pt-1">
                {activeMode === 'list' ? (
                  <>
                    <MicroCodeBlock 
                        label="Terminal / Bash (cURL)"
                        rawCode={`curl "https://stenly.org/api/nhentai?page=1"`}
                        copyId="curl_nhentai"
                        copied={copied}
                        onCopy={copyCode}
                      >
                        <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/nhentai?page=1&quot;</span>
                      </MicroCodeBlock>
                      <MicroCodeBlock 
                        label="Node.js (Fetch)"
                        rawCode={`const res = await fetch("https://stenly.org/api/nhentai?page=1");\nconst data = await res.json();`}
                        copyId="js_nhentai"
                        copied={copied}
                        onCopy={copyCode}
                      >
                        <span className="text-[#ed2553]">const</span> res = <span className="text-[#ed2553]">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/nhentai?page=1&quot;</span>);<br/>
                        <span className="text-[#ed2553]">const</span> data = <span className="text-[#ed2553]">await</span> res.<span className="text-sky-400">json</span>();
                      </MicroCodeBlock>
                  </>
                ) : activeMode === 'watch' ? (
                  <>
                    <MicroCodeBlock 
                        label="Terminal / Bash (cURL)"
                        rawCode={`curl "https://stenly.org/api/nhentai/watch?id=657862"`}
                        copyId="curl_nh_watch"
                        copied={copied}
                        onCopy={copyCode}
                      >
                        <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/nhentai/watch?id=657862&quot;</span>
                      </MicroCodeBlock>
                      <MicroCodeBlock 
                        label="Node.js (Fetch)"
                        rawCode={`const res = await fetch("https://stenly.org/api/nhentai/watch?id=657862");\nconst data = await res.json();`}
                        copyId="js_nh_watch"
                        copied={copied}
                        onCopy={copyCode}
                      >
                        <span className="text-[#ed2553]">const</span> res = <span className="text-[#ed2553]">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/nhentai/watch?id=657862&quot;</span>);<br/>
                        <span className="text-[#ed2553]">const</span> data = <span className="text-[#ed2553]">await</span> res.<span className="text-sky-400">json</span>();
                      </MicroCodeBlock>
                  </>
                ) : (
                  <>
                    <MicroCodeBlock 
                        label="Terminal / Bash (cURL) — Semua Halaman HD"
                        rawCode={`curl "https://stenly.org/api/nhentai/read?id=657267"`}
                        copyId="curl_nh_read"
                        copied={copied}
                        onCopy={copyCode}
                      >
                        <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/nhentai/read?id=657267&quot;</span>
                      </MicroCodeBlock>
                      <MicroCodeBlock 
                        label="Terminal / Bash (cURL) — Halaman Spesifik"
                        rawCode={`curl "https://stenly.org/api/nhentai/read?id=657267&page=1"`}
                        copyId="curl_nh_read_page"
                        copied={copied}
                        onCopy={copyCode}
                      >
                        <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/nhentai/read?id=657267&amp;page=1&quot;</span>
                      </MicroCodeBlock>
                      <MicroCodeBlock 
                        label="Node.js (Fetch)"
                        rawCode={`const res = await fetch("https://stenly.org/api/nhentai/read?id=657267");\nconst data = await res.json();`}
                        copyId="js_nh_read"
                        copied={copied}
                        onCopy={copyCode}
                      >
                        <span className="text-[#ed2553]">const</span> res = <span className="text-[#ed2553]">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/nhentai/read?id=657267&quot;</span>);<br/>
                        <span className="text-[#ed2553]">const</span> data = <span className="text-[#ed2553]">await</span> res.<span className="text-sky-400">json</span>();
                      </MicroCodeBlock>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT TERMINAL UI */}
        <section className="pt-6">
          <div className="bg-[#050505] rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[550px] ring-1 ring-slate-800">
             {/* Head */}
             <div className="px-3 py-2.5 bg-[#0a0a0c] border-b border-slate-900 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
                   </div>
                   <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-500 font-mono uppercase tracking-[0.2em] ml-1.5 border-l border-slate-800 pl-2.5">
                      <TerminalIcon className="w-2.5 h-2.5" />
                      <span>tty1 - nhentai</span>
                   </div>
                </div>
                <div className="flex bg-[#050505] rounded-[4px] border border-slate-900 p-0.5">
                   <button 
                     onClick={() => setActiveTab('payload')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'payload' ? 'bg-[#151515] text-[#ed2553] border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                   >REQUEST.PARAMS</button>
                   <button 
                     onClick={() => setActiveTab('response')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'response' ? 'bg-[#151515] text-[#ed2553] border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                   >RESPONSE.LOG</button>
                </div>
             </div>

             {/* Body */}
             <div className="flex-1 overflow-y-auto p-5 font-mono scrollbar-hide bg-[#050505]">
                <AnimatePresence mode="wait">
                  {activeTab === 'payload' ? (
                    <motion.div 
                      key="payload"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1.5">
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># TARGET ENDPOINT</div>
                        <div className="text-[#ed2553] text-[10px] font-bold leading-relaxed border-l-2 border-[#ed2553]/50 pl-3 py-0.5 break-all">
                          GET /api/nhentai{activeMode === 'watch' ? '/watch' : activeMode === 'read' ? '/read' : ''}?{activeMode === 'list' ? `page=${pageParam || "1"}` : activeMode === 'watch' ? `id=${watchId || "657862"}` : `id=${readId || "657267"}${readPage.trim() ? `&page=${readPage.trim()}` : ''}`}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># QUERY ARGUMENTS</div>
                        <pre className="text-[10px] font-bold leading-loose p-5 bg-[#0a0a0c] rounded-xl border border-slate-900 shadow-inner overflow-x-auto">
                          <span className="text-slate-500">{"{"}</span><br />
                          {activeMode === 'list' ? (
                            <span>  <span className="text-[#ed2553]">&quot;page&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">{pageParam || "1"}</span></span>
                          ) : activeMode === 'watch' ? (
                            <span>  <span className="text-[#ed2553]">&quot;id&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{watchId || "657862"}&quot;</span></span>
                          ) : (
                            <>
                              <span>  <span className="text-[#ed2553]">&quot;id&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{readId || "657267"}&quot;</span>{readPage.trim() ? <span className="text-slate-600">,</span> : null}</span>
                              {readPage.trim() ? (
                                <>
                                  <br />
                                  <span>  <span className="text-[#ed2553]">&quot;page&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">{readPage.trim()}</span></span>
                                </>
                              ) : null}
                            </>
                          )}
                          <br />
                          <span className="text-slate-500">{"}"}</span>
                        </pre>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="response"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3"
                    >
                      <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># STDOUT STREAM</div>
                      {isLoading ? (
                         <div className="flex items-center gap-2 text-[#ed2553] text-[10px] font-bold animate-pulse py-3">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> RUNNING_SCRAPER_NODE...
                         </div>
                      ) : response ? (
                         <pre className="text-[10px] font-bold leading-relaxed text-emerald-500 bg-[#0a0a0c] p-5 rounded-xl border border-slate-900 shadow-inner overflow-x-auto whitespace-pre-wrap flex flex-col gap-2">
                            {response.error ? (
                                <>
                                    <div className="text-rose-500">{response.error}</div>
                                    {response.status && <div className="text-slate-500">HTTP Status: {response.status}</div>}
                                    {response.raw_response_snippet && <div className="text-slate-600 whitespace-pre">{response.raw_response_snippet}</div>}
                                    {response.details && <div className="text-slate-600">{response.details}</div>}
                                </>
                            ) : (
                                JSON.stringify(response, null, 2)
                            )}
                         </pre>
                      ) : (
                         <div className="text-slate-700 font-bold text-[10px] italic py-3">root@stenly:~# ...</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Footer Controls */}
             <div className="p-4 bg-[#0a0a0c] border-t border-slate-900 shrink-0 space-y-4">
                
                <div className="flex items-center justify-center pt-1">
                   <button 
                     onClick={handleExecute}
                     disabled={isLoading || !activeParam.trim()}
                     className="w-full max-w-[300px] bg-[#ed2553]/10 border border-[#ed2553]/30 rounded-full py-2 flex items-center justify-center gap-2.5 group hover:bg-[#ed2553]/20 active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                     <div className="w-6 h-6 rounded-full bg-[#050505] flex items-center justify-center text-[#ed2553] font-black text-[9px] group-hover:bg-black transition-colors shadow-sm">N</div>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ed2553] italic">./EXECUTE_EXTRACT.sh</span>
                   </button>
                </div>

                 <div className="flex items-center justify-end gap-3 px-2">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{activeMode === 'list' ? 'PAGE' : 'ID'}:</span>
                    <input 
                      type={activeMode === 'list' ? "number" : "text"}
                      min="1"
                      value={activeMode === 'list' ? pageParam : activeMode === 'watch' ? watchId : readId}
                      onChange={(e) => activeMode === 'list' ? setPageParam(e.target.value) : activeMode === 'watch' ? setWatchId(e.target.value) : setReadId(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
                      className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-24 text-center transition-all focus:border-[#ed2553] pb-1"
                      placeholder={activeMode === 'list' ? "1" : activeMode === 'watch' ? "657862" : "657267"}
                    />
                    {activeMode === 'read' && (
                      <>
                        <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">PAGE:</span>
                        <input 
                          type="number"
                          min="1"
                          value={readPage}
                          onChange={(e) => setReadPage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
                          className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-16 text-center transition-all focus:border-[#ed2553] pb-1"
                          placeholder="all"
                        />
                      </>
                    )}
                  </div>
              </div>
           </div>
         </section>

       </main>
     </div>
   );
 }
