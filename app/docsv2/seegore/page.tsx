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
  PlaySquare
} from "lucide-react";

// --- MICRO COMPONENTS ---

const SeeGoreLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const Header = () => (
  <div className="bg-white border-b border-slate-200 py-2 px-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2">
      <div className="p-1 rounded bg-slate-900 text-rose-500 shrink-0">
         <SeeGoreLogo className="w-3.5 h-3.5 stroke-rose-500" />
      </div>
      <div className="flex items-center gap-1 font-extrabold text-slate-900 text-[10px] tracking-tight uppercase">
        <span>Stenly API</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">Docs</span>
        <span className="text-slate-300">/</span>
        <span className="text-rose-600">SeeGore</span>
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

const DenseTable = ({ mode }: { mode: 'list' | 'watch' }) => (
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
        {mode === 'list' ? (
          <ParamRow param="page" type="Number" desc="Parameter paginasi untuk mengekstraksi halaman spesifik. Jika kosong, default adalah halaman 1." />
        ) : (
          <ParamRow param="url" type="String" desc="URL watch post lengkap dari Seegore untuk diekstrak video & informasinya." required />
        )}
      </tbody>
    </table>
  </div>
);

const ParamRow = ({ param, type, desc, required = false }: { param: string, type: string, desc: string, required?: boolean }) => (
  <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
    <td className="py-2 px-3 border-r border-slate-100">
      <div className="flex items-center gap-1">
        <span className="font-extrabold text-slate-900 tracking-tight">{param}</span>
        {required && <span className="font-black text-rose-500 text-[8px]">*</span>}
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

export default function SeeGoreDocsUltraDense() {
  const [apiMode, setApiMode] = useState<'list' | 'watch'>('list');
  const [pageParam, setPageParam] = useState("1");
  const [urlParam, setUrlParam] = useState("https://seegore.com/murder-is-part-of-life-17-year-old-from-poland-murders-his-family-and-left-a-manifesto/");
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
    if (apiMode === 'list' && !pageParam.trim()) return;
    if (apiMode === 'watch' && !urlParam.trim()) return;
    if (isLoading) return;
    
    setIsLoading(true);
    setResponse(null);
    setActiveTab('response');

    try {
      const endpoint = apiMode === 'list' 
        ? `/api/seegore?page=${pageParam}`
        : `/api/seegore/watch?url=${encodeURIComponent(urlParam)}`;

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

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-rose-200">
      <Header />
      
      <main className="max-w-[700px] mx-auto px-4 py-8 space-y-10 pb-20">
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 border border-rose-100/50 rounded-[4px] text-[7px] font-black text-rose-600 uppercase tracking-[0.2em] shadow-sm">
              <Zap className="w-2.5 h-2.5 fill-rose-600" /> FULL-ARCHIVE SCRAPER NODE
            </div>
            
            <div className="flex items-center bg-slate-200/50 p-1 rounded-lg">
              <button 
                onClick={() => { setApiMode('list'); setResponse(null); setActiveTab('payload'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${apiMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <ListVideo className="w-3.5 h-3.5" /> POST LIST
              </button>
              <button 
                onClick={() => { setApiMode('watch'); setResponse(null); setActiveTab('payload'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${apiMode === 'watch' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <PlaySquare className="w-3.5 h-3.5" /> WATCH API
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
              <SeeGoreLogo className="w-6 h-6 stroke-rose-500" />
            </div>
            <h1 className="text-[20px] font-black text-slate-900 tracking-tight uppercase italic leading-none flex items-center gap-2">
              SeeGore <span className="text-slate-400">Node</span>
            </h1>
          </div>

          <p className="text-[12px] text-slate-600 leading-relaxed max-w-xl pb-2">
            Akses engine scraper spesialis SeeGore. Pilih <strong>Post List</strong> untuk parsing grid katalog indeks postingan, atau gunakan <strong>Watch API</strong> untuk ekstraksi mendalam (video mp4 murni, image, reactions, stats) pada link Watch tertentu.
          </p>

          <EndpointBox 
            method="GET" 
            url={apiMode === 'list' ? "https://stenly.org/api/seegore" : "https://stenly.org/api/seegore/watch"} 
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
                {apiMode === 'list' ? ' Gunakan argument "page" pada skema URL query.' : ' Tempel URL web langsung ke parameter "url" URL query.'}
              </p>
              
              <div className="space-y-4 w-full pt-1">
                {apiMode === 'list' ? (
                  <>
                    <MicroCodeBlock 
                      label="Terminal / Bash (cURL)"
                      rawCode={`curl "https://stenly.org/api/seegore?page=1"`}
                      copyId="curl_sg_list"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/seegore?page=1&quot;</span>
                    </MicroCodeBlock>
                    <MicroCodeBlock 
                      label="Node.js (Fetch)"
                      rawCode={`const res = await fetch("https://stenly.org/api/seegore?page=1");\nconst data = await res.json();`}
                      copyId="js_sg_list"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-rose-400">const</span> res = <span className="text-rose-400">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/seegore?page=1&quot;</span>);<br/>
                      <span className="text-rose-400">const</span> data = <span className="text-rose-400">await</span> res.<span className="text-sky-400">json</span>();
                    </MicroCodeBlock>
                  </>
                ) : (
                  <>
                    <MicroCodeBlock 
                      label="Terminal / Bash (cURL)"
                      rawCode={`curl "https://stenly.org/api/seegore/watch?url=https://seegore.com/example-post/"`}
                      copyId="curl_sg_watch"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/seegore/watch?url=https://seegore.com/example-post/&quot;</span>
                    </MicroCodeBlock>
                    <MicroCodeBlock 
                      label="Node.js (Fetch)"
                      rawCode={`const endpoint = "https://stenly.org/api/seegore/watch?url=" + encodeURIComponent("https://seegore.com/example-post/");\nconst res = await fetch(endpoint);\nconst data = await res.json();`}
                      copyId="js_sg_watch"
                      copied={copied}
                      onCopy={copyCode}
                    >
                      <span className="text-slate-500">{"// Pastikan url encode URL target!"}</span><br/>
                      <span className="text-rose-400">const</span> target = <span className="text-emerald-300">&quot;https://seegore.com/example-post/&quot;</span>;<br/>
                      <span className="text-rose-400">const</span> url = <span className="text-emerald-300">&quot;https://stenly.org/api/seegore/watch?url=&quot;</span> + <span className="text-sky-400">encodeURIComponent</span>(target);<br/><br/>
                      <span className="text-rose-400">const</span> res = <span className="text-rose-400">await</span> <span className="text-sky-400">fetch</span>(url);<br/>
                      <span className="text-rose-400">const</span> data = <span className="text-rose-400">await</span> res.<span className="text-sky-400">json</span>();
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
                      <span>tty1 - seegore</span>
                   </div>
                </div>
                <div className="flex bg-[#050505] rounded-[4px] border border-slate-900 p-0.5">
                   <button 
                     onClick={() => setActiveTab('payload')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'payload' ? 'bg-[#151515] text-rose-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                   >REQUEST.PARAMS</button>
                   <button 
                     onClick={() => setActiveTab('response')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'response' ? 'bg-[#151515] text-rose-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
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
                        <div className="text-rose-400 text-[10px] font-bold leading-relaxed border-l-2 border-rose-900/50 pl-3 py-0.5 break-all">
                          GET /api/seegore{apiMode === 'list' ? `?page=${pageParam || "1"}` : `/watch?url=${encodeURIComponent(urlParam)}`}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># QUERY ARGUMENTS</div>
                        <pre className="text-[10px] font-bold leading-loose p-5 bg-[#0a0a0c] rounded-xl border border-slate-900 shadow-inner overflow-x-auto">
                          <span className="text-slate-500">{"{"}</span><br />
                          {apiMode === 'list' ? (
                            <>
                              &nbsp;&nbsp;<span className="text-rose-400">&quot;page&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">{pageParam || "1"}</span><br />
                            </>
                          ) : (
                            <>
                              &nbsp;&nbsp;<span className="text-rose-400">&quot;url&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">&quot;{urlParam}&quot;</span><br />
                            </>
                          )}
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
                         <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold animate-pulse py-3">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> RUNNING_SCRAPER_NODE...
                         </div>
                      ) : response ? (
                         <pre className="text-[10px] font-bold leading-relaxed text-emerald-500 bg-[#0a0a0c] p-5 rounded-xl border border-slate-900 shadow-inner overflow-x-auto whitespace-pre-wrap">
                            {JSON.stringify(response, null, 2)}
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
                     disabled={isLoading || (apiMode === 'list' && !pageParam.trim()) || (apiMode === 'watch' && !urlParam.trim())}
                     className="w-full max-w-[300px] bg-rose-500/10 border border-rose-500/30 rounded-full py-2 flex items-center justify-center gap-2.5 group hover:bg-rose-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                     <div className="w-6 h-6 rounded-full bg-[#050505] flex items-center justify-center text-rose-500 font-black text-[9px] group-hover:bg-black transition-colors shadow-sm">N</div>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500 italic">./EXECUTE_EXTRACT.sh</span>
                   </button>
                </div>

                <div className="flex items-center justify-end gap-3 px-2">
                   <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{apiMode === 'list' ? 'PAGE:' : 'WATCH URL:'}</span>
                   {apiMode === 'list' ? (
                     <input 
                       type="number"
                       min="1"
                       value={pageParam}
                       onChange={(e) => setPageParam(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
                       className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-16 text-center transition-all focus:border-rose-600 pb-1"
                       placeholder="1"
                     />
                   ) : (
                     <input 
                       type="text"
                       value={urlParam}
                       onChange={(e) => setUrlParam(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
                       className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none flex-1 text-right transition-all focus:border-rose-600 pb-1"
                       placeholder="https://..."
                     />
                   )}
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
