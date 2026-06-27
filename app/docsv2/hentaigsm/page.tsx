/* by Stenly */
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
  PlaySquare,
  Search
} from "lucide-react";

// --- MICRO COMPONENTS ---

const HentaigasmLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const Header = () => (
  <div className="bg-white border-b border-slate-200 py-2 px-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2">
      <div className="p-1 rounded bg-slate-900 text-pink-500 shrink-0">
         <HentaigasmLogo className="w-3.5 h-3.5 stroke-pink-500" />
      </div>
      <div className="flex items-center gap-1 font-extrabold text-slate-900 text-[10px] tracking-tight uppercase">
        <span>Stenly API</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">Docs</span>
        <span className="text-slate-300">/</span>
        <span className="text-pink-600">Hentaigasm</span>
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

const DenseTable = ({ mode }: { mode: 'anime' | 'watch' | 'search' }) => {
  if (mode === 'anime') {
    return (
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm p-3">
        <p className="text-[9px] font-bold text-slate-500">Endpoint ini tidak memerlukan parameter query.</p>
      </div>
    );
  }
  
  return (
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
          {mode === 'search' ? (
            <ParamRow param="q" type="String" desc="Kata kunci atau query pencarian untuk mencari anime hentai spesifik." required />
          ) : (
            <ParamRow param="url" type="String" desc="URL watch post lengkap dari Hentaigasm untuk diekstrak videonya." required />
          )}
        </tbody>
      </table>
    </div>
  );
};

const ParamRow = ({ param, type, desc, required = false }: { param: string, type: string, desc: string, required?: boolean }) => (
  <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
    <td className="py-2 px-3 border-r border-slate-100">
      <div className="flex items-center gap-1">
        <span className="font-extrabold text-slate-900 tracking-tight">{param}</span>
        {required && <span className="font-black text-pink-500 text-[8px]">*</span>}
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

export default function HentaigasmDocs() {
  const [apiMode, setApiMode] = useState<'anime' | 'watch' | 'search'>('anime');
  const [queryParam, setQueryParam] = useState("maki");
  const [urlParam, setUrlParam] = useState("https://hentaigasm.com/kansen-sodoma-episode-1-subbed/");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'payload' | 'response'>('payload');

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExecute = async () => {
    if (apiMode === 'search' && !queryParam.trim()) return;
    if (apiMode === 'watch' && !urlParam.trim()) return;
    if (isLoading) return;
    
    setIsLoading(true);
    setResponse(null);
    setActiveTab('response');

    try {
      const endpoint = apiMode === 'anime' 
        ? `/api/hentaigsm/anime`
        : apiMode === 'search'
          ? `/api/hentaigsm/anime/search?q=${encodeURIComponent(queryParam)}`
          : `/api/hentaigsm/anime/watch?url=${encodeURIComponent(urlParam)}`;

      const res = await fetch(endpoint, {
        method: "GET"
      });

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setResponse({ error: "Connection to internal node failed.", details: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getUrlForMode = (mode: string) => {
    switch (mode) {
      case 'anime': return "https://stenly.org/api/hentaigsm/anime";
      case 'search': return "https://stenly.org/api/hentaigsm/anime/search";
      case 'watch': return "https://stenly.org/api/hentaigsm/anime/watch";
      default: return "";
    }
  };

  const getTargetUrlText = () => {
    switch (apiMode) {
      case 'anime': return "https://stenly.org/api/hentaigsm/anime";
      case 'search': return `https://stenly.org/api/hentaigsm/anime/search?q=${queryParam}`;
      case 'watch': return `https://stenly.org/api/hentaigsm/anime/watch?url=${urlParam}`;
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-pink-200">
      <Header />
      
      <main className="max-w-[700px] mx-auto px-4 py-8 space-y-10 pb-20">
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-pink-50 border border-pink-100/50 rounded-[4px] text-[7px] font-black text-pink-600 uppercase tracking-[0.2em] shadow-sm">
              <Zap className="w-2.5 h-2.5 fill-pink-600" /> HENTAIGASM SCRAPER NODE
            </div>
            
            <div className="flex items-center bg-slate-200/50 p-1 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full hide-scrollbar">
              <button 
                onClick={() => { setApiMode('anime'); setResponse(null); setActiveTab('payload'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${apiMode === 'anime' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <ListVideo className="w-3.5 h-3.5" /> ANIME LIST
              </button>
              <button 
                onClick={() => { setApiMode('search'); setResponse(null); setActiveTab('payload'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${apiMode === 'search' ? 'bg-white shadow-sm text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Search className="w-3.5 h-3.5" /> SEARCH
              </button>
              <button 
                onClick={() => { setApiMode('watch'); setResponse(null); setActiveTab('payload'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${apiMode === 'watch' ? 'bg-white shadow-sm text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <PlaySquare className="w-3.5 h-3.5" /> WATCH API
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 text-pink-500 rounded-xl flex items-center justify-center shrink-0">
              <HentaigasmLogo className="w-6 h-6 stroke-pink-500" />
            </div>
            <h1 className="text-[20px] font-black text-slate-900 tracking-tight uppercase italic leading-none flex items-center gap-2">
              Hentaigasm <span className="text-slate-400">Node</span>
            </h1>
          </div>

          <p className="text-[12px] text-slate-600 leading-relaxed max-w-xl pb-2">
            Akses engine scraper Hentaigasm. Pilih <strong>Anime List</strong> untuk daftar anime terbaru, <strong>Search</strong> untuk mencari, atau <strong>Watch API</strong> untuk ekstraksi video url.
          </p>

          <EndpointBox 
            method="GET" 
            url={getUrlForMode(apiMode)} 
          />
        </section>

        {/* PAYLOAD / HEADERS */}
        <section className="space-y-3">
          <SectionTitle title="Header & URL Arguments" icon={Blocks} />
          <DenseTable mode={apiMode} />
        </section>

        {/* INTEGRATION GUIDE SECTION */}
        <section className="space-y-5">
          <SectionTitle title="Full Integration Guide" />

          <div className="flex gap-3 items-start w-full">
            <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5 shadow-sm">1</div>
            <div className="space-y-4 flex-1 min-w-0">
              <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest mt-0.5">Siapkan Request REST</div>
              <p className="text-[10px] text-slate-600 leading-relaxed -mt-2">
                Lakukan request ke endpoint kami menggunakan metode GET.
              </p>
              
              <div className="space-y-4 w-full pt-1">
                {apiMode === 'anime' ? (
                  <>
                    <MicroCodeBlock 
                      label="Terminal / Bash (cURL)"
                      rawCode={`curl "https://stenly.org/api/hentaigsm/anime"`}
                      copyId="curl_hg_anime"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/hentaigsm/anime&quot;</span>
                    </MicroCodeBlock>
                    <MicroCodeBlock 
                      label="Node.js (Fetch)"
                      rawCode={`const res = await fetch("https://stenly.org/api/hentaigsm/anime");\nconst data = await res.json();`}
                      copyId="js_hg_anime"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-indigo-400">const</span> res = <span className="text-indigo-400">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/hentaigsm/anime&quot;</span>);<br/>
                      <span className="text-indigo-400">const</span> data = <span className="text-indigo-400">await</span> res.<span className="text-sky-400">json</span>();
                    </MicroCodeBlock>
                  </>
                ) : apiMode === 'search' ? (
                  <>
                    <MicroCodeBlock 
                      label="Terminal / Bash (cURL)"
                      rawCode={`curl "https://stenly.org/api/hentaigsm/anime/search?q=maki"`}
                      copyId="curl_hg_search"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/hentaigsm/anime/search?q=maki&quot;</span>
                    </MicroCodeBlock>
                    <MicroCodeBlock 
                      label="Node.js (Fetch)"
                      rawCode={`const res = await fetch("https://stenly.org/api/hentaigsm/anime/search?q=maki");\nconst data = await res.json();`}
                      copyId="js_hg_search"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-indigo-400">const</span> res = <span className="text-indigo-400">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/hentaigsm/anime/search?q=maki&quot;</span>);<br/>
                      <span className="text-indigo-400">const</span> data = <span className="text-indigo-400">await</span> res.<span className="text-sky-400">json</span>();
                    </MicroCodeBlock>
                  </>
                ) : (
                  <>
                    <MicroCodeBlock 
                      label="Terminal / Bash (cURL)"
                      rawCode={`curl "https://stenly.org/api/hentaigsm/anime/watch?url=https://hentaigasm.com/kansen-sodoma-episode-1-subbed/"`}
                      copyId="curl_hg_watch"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/hentaigsm/anime/watch?url=https://hentaigasm.com/kansen-sodoma-episode-1-subbed/&quot;</span>
                    </MicroCodeBlock>
                    <MicroCodeBlock 
                      label="Node.js (Fetch)"
                      rawCode={`const res = await fetch("https://stenly.org/api/hentaigsm/anime/watch?url=" + encodeURIComponent("https://hentaigasm.com/kansen-sodoma-episode-1-subbed/"));\nconst data = await res.json();`}
                      copyId="js_hg_watch"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-indigo-400">const</span> res = <span className="text-indigo-400">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/hentaigsm/anime/watch?url=&quot;</span> + <span className="text-sky-400">encodeURIComponent</span>(<span className="text-emerald-300">&quot;https://hentaigasm.com/kansen-sodoma-episode-1-subbed/&quot;</span>));<br/>
                      <span className="text-indigo-400">const</span> data = <span className="text-indigo-400">await</span> res.<span className="text-sky-400">json</span>();
                    </MicroCodeBlock>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT TERMINAL UI */}
        <section className="pt-6">
          <div className="bg-[#050505] rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[650px] ring-1 ring-slate-800">
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
                      <span>tty1</span>
                   </div>
                </div>
                <div className="flex bg-[#050505] rounded-[4px] border border-slate-900 p-0.5">
                   <button 
                     onClick={() => setActiveTab('payload')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'payload' ? 'bg-[#151515] text-sky-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                   >REQUEST.GET</button>
                   <button 
                     onClick={() => setActiveTab('response')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'response' ? 'bg-[#151515] text-sky-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
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
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># TARGET URL</div>
                        <div className="text-sky-400 text-[10px] font-bold leading-relaxed border-l-2 border-sky-900/50 pl-3 py-0.5 break-all">
                          {getTargetUrlText()}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># QUERY PARAMS</div>
                        <pre className="text-[10px] font-bold leading-loose p-5 bg-[#0a0a0c] rounded-xl border border-slate-900 shadow-inner overflow-x-auto whitespace-pre-wrap">
                          {apiMode === 'anime' ? (
                            <span className="text-slate-500">{"{ /* no params */ }"}</span>
                          ) : apiMode === 'search' ? (
                            <><span className="text-slate-500">{"{"}</span><br />
                            &nbsp;&nbsp;<span className="text-indigo-400">&quot;q&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{queryParam}&quot;</span><br />
                            <span className="text-slate-500">{"}"}</span></>
                          ) : (
                            <><span className="text-slate-500">{"{"}</span><br />
                            &nbsp;&nbsp;<span className="text-indigo-400">&quot;url&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{urlParam}&quot;</span><br />
                            <span className="text-slate-500">{"}"}</span></>
                          )}
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
                         <div className="flex items-center gap-2 text-sky-500 text-[10px] font-bold animate-pulse py-3">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> EXECUTING_API_CALL...
                         </div>
                      ) : response ? (
                         <div className="space-y-3">
                           <pre className="text-[10px] font-bold leading-relaxed text-emerald-500 bg-[#0a0a0c] p-5 rounded-xl border border-slate-900 shadow-inner overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(response, null, 2)}
                           </pre>
                         </div>
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
                     disabled={isLoading || (apiMode === 'search' && !queryParam) || (apiMode === 'watch' && !urlParam)}
                     className="w-full max-w-[300px] bg-pink-500/10 border border-pink-500/30 rounded-full py-2 flex items-center justify-center gap-2.5 group hover:bg-pink-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                     <div className="w-6 h-6 rounded-full bg-[#050505] flex items-center justify-center text-pink-500 font-black text-[9px] group-hover:bg-black transition-colors shadow-sm">
                       <Zap className="w-3 h-3 fill-pink-500" />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-pink-500 italic">./EXECUTE_CALL.sh</span>
                   </button>
                </div>

                <div className="flex flex-col gap-3 px-2">
                   {apiMode === 'search' && (
                     <div className="flex items-center gap-2 flex-1">
                       <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest w-16">Q</span>
                       <input 
                         type="text"
                         value={queryParam}
                         onChange={(e) => setQueryParam(e.target.value)}
                         className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-full transition-all focus:border-pink-600 placeholder:text-slate-700 pb-1"
                         placeholder="maki"
                       />
                     </div>
                   )}
                   {apiMode === 'watch' && (
                     <div className="flex items-center gap-2 flex-1">
                       <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest w-16">URL</span>
                       <input 
                         type="text"
                         value={urlParam}
                         onChange={(e) => setUrlParam(e.target.value)}
                         className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-full transition-all focus:border-pink-600 placeholder:text-slate-700 pb-1"
                         placeholder="https://hentaigasm.com/..."
                       />
                     </div>
                   )}
                   {apiMode === 'anime' && (
                     <div className="flex items-center gap-2 flex-1">
                       <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">NO PARAMETERS REQUIRED FOR THIS ENDPOINT</span>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
