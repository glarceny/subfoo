// by Stenly
"use client"

import { useState, useEffect } from "react";
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
  Monitor,
  Camera
} from "lucide-react";

// --- MICRO COMPONENTS ---

const SSWebLogo = ({ className }: { className?: string }) => (
  <Monitor className={className} />
);

const Header = () => (
  <div className="bg-white border-b border-slate-200 py-2 px-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2">
      <div className="p-1 rounded bg-indigo-600 text-white shrink-0">
         <Camera className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-1 font-extrabold text-slate-900 text-[10px] tracking-tight uppercase">
        <span>Stenly API</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">Docs</span>
        <span className="text-slate-300">/</span>
        <span className="text-indigo-600">SSWEB</span>
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

export default function SSWebDocsUltraDense() {
  const origin = "https://stenly.org";
  const [urlParam, setUrlParam] = useState("https://google.com");
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [waitFor, setWaitFor] = useState("3000");
  const [fullPage, setFullPage] = useState(false);
  const [element, setElement] = useState("");
  
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
    if (!urlParam.trim()) return;
    if (isLoading) return;
    
    setIsLoading(true);
    setResponse(null);
    setActiveTab('response');

    try {
      const queryParams = new URLSearchParams({
        url: urlParam,
        width,
        height,
        waitFor,
        fullPage: fullPage.toString(),
      });
      if (element.trim()) queryParams.append("element", element.trim());

      const res = await fetch(`/api/ssweb?${queryParams.toString()}`, {
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
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-indigo-600/20">
      <Header />
      
      <main className="max-w-[700px] mx-auto px-4 py-8 space-y-10 pb-20">
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-600/10 border border-indigo-600/30 rounded-[4px] text-[7px] font-black text-indigo-600 uppercase tracking-[0.2em] shadow-sm">
              <Zap className="w-2.5 h-2.5 fill-indigo-600" /> RENDER ENGINE
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
              <Camera className="w-6 h-6" />
            </div>
            <h1 className="text-[20px] font-black text-slate-900 tracking-tight uppercase italic leading-none flex items-center gap-2">
              SSWEB <span className="text-slate-400">Node</span>
            </h1>
          </div>

          <p className="text-[12px] text-slate-600 leading-relaxed max-w-xl pb-2">
            Engine screenshot website berbasis Microlink. Mampu melakukan rendering halaman web secara real-time dengan opsi kustomisasi viewport, element target, dan delay rendering.
          </p>

          <EndpointBox 
            method="GET/POST" 
            url={`${origin}/api/ssweb`} 
          />
        </section>

        {/* PAYLOAD / HEADERS */}
        <section className="space-y-3">
          <SectionTitle title="Query Parameters" icon={Blocks} />
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
                <ParamRow param="url" type="String" desc="Alamat website yang ingin diambil gambarnya (wajib)." required />
                <ParamRow param="width" type="Number" desc="Lebar viewport (default: 1920)." />
                <ParamRow param="height" type="Number" desc="Tinggi viewport (default: 1080)." />
                <ParamRow param="waitFor" type="Number" desc="Delay dalam ms sebelum mengambil screenshot (default: 3000)." />
                <ParamRow param="fullPage" type="Boolean" desc="Ambil seluruh halaman (default: false)." />
                <ParamRow param="element" type="String" desc="Selector CSS untuk mengambil screenshot elemen spesifik." />
              </tbody>
            </table>
          </div>
        </section>

        {/* INTEGRATION GUIDE SECTION */}
        <section className="space-y-5">
          <SectionTitle title="Full Integration Guide" />

          <div className="flex gap-3 items-start w-full">
            <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5 shadow-sm">1</div>
            <div className="space-y-4 flex-1 min-w-0">
              <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest mt-0.5">Siapkan Request REST</div>
              <p className="text-[10px] text-slate-600 leading-relaxed -mt-2">
                Gunakan URL target sebagai query argument &quot;url&quot;. Anda juga bisa menambahkan parameter opsional untuk kustomisasi hasil.
              </p>
              
              <div className="space-y-4 w-full pt-1">
                <MicroCodeBlock 
                  label="Terminal / Bash (cURL)"
                  rawCode={`curl "${origin}/api/ssweb?url=https://github.com&fullPage=true"`}
                  copyId="curl_ssweb"
                  copied={copied}
                  onCopy={copyCode}
                >
                  <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;{origin}/api/ssweb?url=https://github.com&amp;fullPage=true&quot;</span>
                </MicroCodeBlock>
                <MicroCodeBlock 
                  label="Node.js (Fetch)"
                  rawCode={`const res = await fetch("${origin}/api/ssweb?url=https://github.com&width=1280&height=720");\nconst data = await res.json();`}
                  copyId="js_ssweb"
                  copied={copied}
                  onCopy={copyCode}
                >
                  <span className="text-[#ed2553]">const</span> res = <span className="text-[#ed2553]">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;{origin}/api/ssweb?url=https://github.com&amp;width=1280&amp;height=720&quot;</span>);<br/>
                  <span className="text-[#ed2553]">const</span> data = <span className="text-[#ed2553]">await</span> res.<span className="text-sky-400">json</span>();
                </MicroCodeBlock>
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
                      <span>tty1 - ssweb</span>
                   </div>
                </div>
                <div className="flex bg-[#050505] rounded-[4px] border border-slate-900 p-0.5">
                   <button 
                     onClick={() => setActiveTab('payload')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'payload' ? 'bg-[#151515] text-indigo-500 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                   >REQUEST.PARAMS</button>
                   <button 
                     onClick={() => setActiveTab('response')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'response' ? 'bg-[#151515] text-indigo-500 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
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
                        <div className="text-indigo-500 text-[10px] font-bold leading-relaxed border-l-2 border-indigo-500/50 pl-3 py-0.5 break-all">
                          GET /api/ssweb?url={urlParam || "https://google.com"}&width={width}&height={height}&fullPage={fullPage.toString()}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># QUERY ARGUMENTS</div>
                        <pre className="text-[10px] font-bold leading-loose p-5 bg-[#0a0a0c] rounded-xl border border-slate-900 shadow-inner overflow-x-auto">
                          <span className="text-slate-500">{"{"}</span><br />
                          <span>  <span className="text-indigo-500">&quot;url&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{urlParam || "https://google.com"}&quot;</span>,</span><br />
                          <span>  <span className="text-indigo-500">&quot;width&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">{width}</span>,</span><br />
                          <span>  <span className="text-indigo-500">&quot;height&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">{height}</span>,</span><br />
                          <span>  <span className="text-indigo-500">&quot;waitFor&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">{waitFor}</span>,</span><br />
                          <span>  <span className="text-indigo-500">&quot;fullPage&quot;</span><span className="text-slate-600">:</span> <span className="text-sky-500">{fullPage.toString()}</span></span>
                          {element.trim() && (
                            <>
                              <span className="text-slate-600">,</span><br />
                              <span>  <span className="text-indigo-500">&quot;element&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{element}&quot;</span></span>
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
                         <div className="flex items-center gap-2 text-indigo-500 text-[10px] font-bold animate-pulse py-3">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> GENERATING_SCREENSHOT...
                         </div>
                      ) : response ? (
                         <div className="space-y-4">
                           <pre className="text-[10px] font-bold leading-relaxed text-emerald-500 bg-[#0a0a0c] p-5 rounded-xl border border-slate-900 shadow-inner overflow-x-auto whitespace-pre-wrap flex flex-col gap-2">
                              {JSON.stringify(response, null, 2)}
                           </pre>
                           {response.Result_url && (
                             <div className="space-y-2">
                               <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># PREVIEW RESULT</div>
                               <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-900 flex justify-center">
                                 {/* Use absolute path for preview if it's the internal one, or handle the full URL */}
                                 <img 
                                   src={response.Result_url.replace('https://stenly.org', '')} 
                                   alt="Screenshot result" 
                                   className="w-full h-auto max-h-[400px] object-contain" 
                                 />
                               </div>
                               <div className="flex flex-col gap-1">
                                 <div className="text-slate-500 text-[7px] font-bold uppercase tracking-widest">CLEAN_URL (DENSE):</div>
                                 <div className="text-emerald-400 text-[8px] font-mono truncate bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 break-all whitespace-pre-wrap">
                                   {response.Result_url}
                                 </div>
                               </div>
                             </div>
                           )}
                         </div>
                      ) : (
                         <div className="text-slate-700 font-bold text-[10px] italic py-3">root@stenly:~# ./take_screenshot.sh --url={urlParam}</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Footer Controls */}
             <div className="p-4 bg-[#0a0a0c] border-t border-slate-900 shrink-0 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">URL:</span>
                    <input 
                      type="text"
                      value={urlParam}
                      onChange={(e) => setUrlParam(e.target.value)}
                      className="w-full bg-transparent border-b border-slate-800 text-[9px] font-bold text-slate-300 outline-none transition-all focus:border-indigo-500 pb-1"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">ELEMENT (CSS):</span>
                    <input 
                      type="text"
                      value={element}
                      onChange={(e) => setElement(e.target.value)}
                      className="w-full bg-transparent border-b border-slate-800 text-[9px] font-bold text-slate-300 outline-none transition-all focus:border-indigo-500 pb-1"
                      placeholder=".header"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">WIDTH:</span>
                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="bg-transparent border-b border-slate-800 text-[9px] font-bold text-slate-300 w-12 text-center outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">HEIGHT:</span>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-transparent border-b border-slate-800 text-[9px] font-bold text-slate-300 w-12 text-center outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">WAIT:</span>
                    <input type="number" value={waitFor} onChange={(e) => setWaitFor(e.target.value)} className="bg-transparent border-b border-slate-800 text-[9px] font-bold text-slate-300 w-12 text-center outline-none" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={fullPage} onChange={(e) => setFullPage(e.target.checked)} className="sr-only" />
                    <div className={`w-3.5 h-3.5 rounded border border-slate-700 flex items-center justify-center transition-all ${fullPage ? 'bg-indigo-600 border-indigo-600' : 'bg-transparent'}`}>
                      {fullPage && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300">FULLPAGE</span>
                  </label>
                </div>
                
                <div className="flex items-center justify-center pt-1">
                   <button 
                     onClick={handleExecute}
                     disabled={isLoading || !urlParam.trim()}
                     className="w-full max-w-[300px] bg-indigo-600/10 border border-indigo-600/30 rounded-full py-2 flex items-center justify-center gap-2.5 group hover:bg-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                     <div className="w-6 h-6 rounded-full bg-[#050505] flex items-center justify-center text-indigo-500 font-black text-[9px] group-hover:bg-black transition-colors shadow-sm">S</div>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 italic">./TAKE_SCREENSHOT.sh</span>
                   </button>
                </div>
              </div>
           </div>
         </section>

       </main>
     </div>
  );
}
