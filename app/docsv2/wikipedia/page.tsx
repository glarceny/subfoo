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
  Database,
  Loader2,
  Blocks,
  BookOpen
} from "lucide-react";

// --- MICRO COMPONENTS ---

const Header = () => (
  <div className="bg-white border-b border-slate-200 py-2 px-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-black rounded flex items-center justify-center text-white font-black text-[8px] shadow-inner">W</div>
      <div className="flex items-center gap-1 font-extrabold text-slate-900 text-[10px] tracking-tight uppercase">
        <span>Stenly API</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">Docs</span>
        <span className="text-slate-300">/</span>
        <span className="text-black">Wikipedia</span>
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
    <div className="flex items-center gap-2">
      <div className="bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-[3px] text-[8px] font-black tracking-[0.2em] uppercase border border-sky-500/20">
        {method}
      </div>
      <code className="text-[10px] font-bold text-slate-200 tracking-wide font-mono">
        {url}
      </code>
    </div>
    <div className="flex items-center gap-1.5 text-[7px] font-extrabold text-slate-500 uppercase tracking-widest px-2 py-0.5 border border-slate-800 rounded bg-slate-900/50">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live
    </div>
  </div>
);

const DenseTable = () => (
  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50/80 border-b border-slate-200 text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <th className="py-2.5 px-3 border-r border-slate-100">Parameter</th>
          <th className="py-2.5 px-3 border-r border-slate-100">Type</th>
          <th className="py-2.5 px-3">Description</th>
        </tr>
      </thead>
      <tbody className="text-[9px]">
        <ParamRow param="query" type="String" desc="Keyword pencarian artikel." required />
        <ParamRow param="lang" type="String" desc="Bahasa wikipedia (default: id)." />
        <ParamRow param="limit" type="Number" desc="Limit pencarian artikel (default: 5)." />
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
    <td className="py-2 px-3 font-bold text-sky-600 uppercase tracking-widest border-r border-slate-100 text-[8px]">{type}</td>
    <td className="py-2 px-3 font-bold text-slate-500 leading-tight text-[8px]">{desc}</td>
  </tr>
);

export default function WikipediaDocs() {
  const [queryParam, setQueryParam] = useState("Rendang");
  const [langParam, setLangParam] = useState("id");
  const [limitParam, setLimitParam] = useState("5");
  
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'payload' | 'response'>('payload');

  const handleExecute = async () => {
    if (isLoading || !queryParam) return;
    
    setIsLoading(true);
    setResponse(null);
    setActiveTab('response');

    try {
      const url = new URL("/api/search/wikipedia", window.location.origin);
      url.searchParams.set("query", queryParam);
      url.searchParams.set("lang", langParam);
      url.searchParams.set("limit", limitParam);

      const res = await fetch(url.toString(), {
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
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-sky-200">
      <Header />
      
      <main className="max-w-[700px] mx-auto px-4 py-8 space-y-10 pb-20">
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 border border-gray-200/50 rounded-[4px] text-[7px] font-black text-black uppercase tracking-[0.2em] shadow-sm">
            <BookOpen className="w-2.5 h-2.5" /> WIKIPEDIA NODE
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 border border-gray-200">
              <Database className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-[20px] font-black text-slate-900 tracking-tight uppercase italic leading-none flex items-center gap-2">
              Wikipedia Search <span className="text-slate-400">Node</span>
            </h1>
          </div>

          <p className="text-[12px] text-slate-600 leading-relaxed max-w-xl pb-2">
            Tool scraper untuk mengambil artikel Wikipedia lengkap beserta infobox, sections, extract, dan images secara otomatis.
          </p>

          <EndpointBox method="GET" url="https://stenly.org/api/search/wikipedia" />
        </section>

        {/* PAYLOAD / HEADERS */}
        <section className="space-y-3">
          <SectionTitle title="Query Parameters" icon={Blocks} />
          <DenseTable />
        </section>

        {/* COMPACT TERMINAL UI */}
        <section className="pt-6">
          <div className="bg-[#050505] rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[550px] ring-1 ring-slate-800">
             {/* Head */}
             <div className="px-3 py-2.5 bg-[#0a0a0c] border-b border-slate-900 flex items-center justify-between shrink-0 overflow-x-auto scrollbar-hide">
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
                <div className="flex bg-[#050505] rounded-[4px] border border-slate-900 p-0.5 ml-4">
                   <button 
                     onClick={() => setActiveTab('payload')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === 'payload' ? 'bg-[#151515] text-sky-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                   >REQUEST.GET</button>
                   <button 
                     onClick={() => setActiveTab('response')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === 'response' ? 'bg-[#151515] text-sky-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
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
                          https://stenly.org/api/search/wikipedia?query={encodeURIComponent(queryParam)}&lang={langParam}&limit={limitParam}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># QUERY PARAMS</div>
                        <pre className="text-[10px] font-bold leading-loose p-5 bg-[#0a0a0c] rounded-xl border border-slate-900 shadow-inner overflow-x-auto whitespace-pre-wrap">
                          <span className="text-slate-500">{"{"}</span><br />
                          &nbsp;&nbsp;<span className="text-indigo-400">&quot;query&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{queryParam}&quot;</span>,<br />
                          &nbsp;&nbsp;<span className="text-indigo-400">&quot;lang&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{langParam}&quot;</span>,<br />
                          &nbsp;&nbsp;<span className="text-indigo-400">&quot;limit&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{limitParam}&quot;</span><br />
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
                         <div className="flex items-center gap-2 text-sky-500 text-[10px] font-bold animate-pulse py-3">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> FETCHING_NODE_RESPONSE...
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
                     disabled={isLoading || !queryParam}
                     className="w-full max-w-[300px] bg-sky-500/10 border border-sky-500/30 rounded-full py-2 flex items-center justify-center gap-2.5 group hover:bg-sky-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                     <div className="w-6 h-6 rounded-full bg-[#050505] flex items-center justify-center text-sky-500 font-black text-[9px] group-hover:bg-black transition-colors shadow-sm">N</div>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-500 italic">./EXECUTE_CALL.sh</span>
                   </button>
                </div>

                <div className="flex flex-col gap-3 px-2">
                   <div className="flex items-center gap-2 flex-1">
                     <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest w-16">QUERY</span>
                     <input 
                       type="text"
                       value={queryParam}
                       onChange={(e) => setQueryParam(e.target.value)}
                       className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-full transition-all focus:border-sky-600 placeholder:text-slate-700 pb-1"
                       placeholder="Rendang"
                     />
                   </div>
                   
                   <div className="flex gap-4">
                     <div className="flex items-center gap-2 flex-1">
                       <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest w-16">LANG</span>
                       <input 
                         type="text"
                         value={langParam}
                         onChange={(e) => setLangParam(e.target.value)}
                         className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-full transition-all focus:border-sky-600 placeholder:text-slate-700 pb-1"
                         placeholder="id"
                       />
                     </div>
                     <div className="flex items-center gap-2 flex-1">
                       <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest w-16">LIMIT</span>
                       <input 
                         type="text"
                         value={limitParam}
                         onChange={(e) => setLimitParam(e.target.value)}
                         className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-full transition-all focus:border-sky-600 placeholder:text-slate-700 pb-1"
                         placeholder="5"
                       />
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
