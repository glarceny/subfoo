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
  Cpu,
  ChevronRight,
  Zap,
  Loader2,
  Database,
  ShieldAlert,
  Blocks
} from "lucide-react";

// --- MICRO COMPONENTS ---

const SpawnLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M256 6l216.506 125v250L256 506 39.493 381V131L256 6z" fill="#673ab8" fillRule="nonzero"/><ellipse rx="75" ry="196" fill="none" stroke="#fff" strokeWidth="16" transform="matrix(.5945 .77476 -.77476 .5945 256 256)"/><ellipse rx="75" ry="196" fill="none" stroke="#fff" strokeWidth="16" transform="matrix(.5945 -.77476 .77476 .5945 256 256)"/><circle r="34" fill="#fff" transform="translate(256 256) scale(.97656)"/></svg>
);

const Header = () => (
  <div className="bg-white border-b border-slate-200 py-2 px-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2">
      <SpawnLogo className="w-4 h-4" />
      <div className="flex items-center gap-1 font-extrabold text-slate-900 text-[10px] tracking-tight uppercase">
        <span>Stenly API</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">Docs</span>
        <span className="text-slate-300">/</span>
        <span className="text-indigo-600">Spawn-AI</span>
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
      <div className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-[3px] text-[8px] font-black tracking-[0.2em] uppercase border border-emerald-500/20">
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
        <ParamRow param="prompt/q" type="String" desc="Input teks instruksi operasional untuk engine AI. Dapat menggunakan key prompt, message, atau q." required />
        <ParamRow param="think" type="Boolean" desc="Mode reasoning untuk hybrid chain-of-thought (CoT). Jika true akan menyertakan log aktivitas pemikiran." />
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
    <td className="py-2 px-3 font-bold text-slate-500 leading-tight text-[8px]">{desc}</td>
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

export default function SpawnAiDocsUltraDense() {
  const [prompt, setPrompt] = useState("Research AI capabilities for automation");
  const [thinkMode, setThinkMode] = useState(true);
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
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    setResponse(null);
    setActiveTab('response');

    try {
      const res = await fetch("/api/spawn-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt,
          think: thinkMode
        })
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
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-indigo-200">
      <Header />
      
      <main className="max-w-[700px] mx-auto px-4 py-8 space-y-10 pb-20">
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 border border-indigo-100/50 rounded-[4px] text-[7px] font-black text-indigo-600 uppercase tracking-[0.2em] shadow-sm">
            <Zap className="w-2.5 h-2.5 fill-indigo-600" /> ULTRA-FAST SCRAPER NODE
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-transparent rounded-xl flex items-center justify-center shrink-0">
              <SpawnLogo className="w-9 h-9 drop-shadow-md" />
            </div>
            <h1 className="text-[20px] font-black text-slate-900 tracking-tight uppercase italic leading-none flex items-center gap-2">
              Spawn AI <span className="text-slate-400">Node</span>
            </h1>
          </div>

          <p className="text-[12px] text-slate-600 leading-relaxed max-w-xl pb-2">
            Akses engine pemrosesan data real-time dengan integrasi <span className="font-semibold text-indigo-600">Deep Thinking</span>. Dioptimalkan secara sempurna untuk parsing data terstruktur dengan hasil langsung dalam format JSON. Endpoints tersedia via GET dan POST.
          </p>

          <EndpointBox method="GET/POST" url="https://stenly.org/api/spawn-ai" />
        </section>

        {/* PAYLOAD / HEADERS */}
        <section className="space-y-3">
          <SectionTitle title="Header & Payload Schema" icon={Blocks} />
          <DenseTable />
        </section>

        {/* INTEGRATION GUIDE SECTION */}
        <section className="space-y-5">
          <SectionTitle title="Full Integration Guide" />

          <div className="flex gap-3 items-start w-full">
            <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5 shadow-sm">1</div>
            <div className="space-y-4 flex-1 min-w-0">
              <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest mt-0.5">Siapkan Request REST</div>
              <p className="text-[10px] text-slate-600 leading-relaxed -mt-2">Lakukan request ke endpoint kami menggunakan metode POST/GET. Pastikan parameter URL atau Body JSON kamu sudah sesuai.</p>
              
              <div className="space-y-4 w-full pt-1">
                <MicroCodeBlock 
                  label="Terminal / Bash (cURL - GET)"
                  rawCode={`curl "https://stenly.org/api/spawn-ai?q=System+metrics&think=true"`}
                  copyId="curl2"
                  copied={copied}
                  onCopy={copyCode}
                >
                  <span className="text-emerald-400">curl</span> <span className="text-emerald-300">&quot;https://stenly.org/api/spawn-ai?q=System+metrics&amp;think=true&quot;</span>
                </MicroCodeBlock>
                <MicroCodeBlock 
                  label="Terminal / Bash (cURL - POST)"
                  rawCode={`curl -X POST "https://stenly.org/api/spawn-ai" \\\n-H "Content-Type: application/json" \\\n-d '{"prompt":"System metrics...","think":true}'`}
                  copyId="curl"
                  copied={copied}
                  onCopy={copyCode}
                >
                  <span className="text-emerald-400">curl</span> <span className="text-slate-400">-X</span> POST <span className="text-emerald-300">&quot;https://stenly.org/api/spawn-ai&quot;</span> \<br/>
                  <span className="text-slate-400">-H</span> <span className="text-emerald-300">&quot;Content-Type: application/json&quot;</span> \<br/>
                  <span className="text-slate-400">-d</span> <span className="text-emerald-300">&apos;{"{"}&quot;prompt&quot;:&quot;System metrics...&quot;,&quot;think&quot;:true{"}"}&apos;</span>
                </MicroCodeBlock>

                <MicroCodeBlock 
                  label="Python (Requests)"
                  rawCode={`import requests\n\nurl = "https://stenly.org/api/spawn-ai"\nres = requests.post(url, json={"prompt": "System metrics...", "think": True})\nprint(res.json())`}
                  copyId="py"
                  copied={copied}
                  onCopy={copyCode}
                >
                  <span className="text-indigo-400">import</span> requests<br/>
                  <br/>
                  url = <span className="text-emerald-300">&quot;https://stenly.org/api/spawn-ai&quot;</span><br/>
                  res = requests.<span className="text-sky-400">post</span>(url, json={"{ "} <span className="text-emerald-300">&quot;prompt&quot;</span>: <span className="text-emerald-300">&quot;System metrics...&quot;</span>, <span className="text-emerald-300">&quot;think&quot;</span>: <span className="text-amber-500">True</span> {"}"})<br/>
                  <span className="text-sky-400">print</span>(res.<span className="text-sky-400">json</span>())
                </MicroCodeBlock>

                <MicroCodeBlock 
                  label="Node.js (Fetch)"
                  rawCode={`const res = await fetch("https://stenly.org/api/spawn-ai", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ prompt: "System metrics...", think: true })\n});\nconst data = await res.json();`}
                  copyId="js"
                  copied={copied}
                  onCopy={copyCode}
                >
                  <span className="text-indigo-400">const</span> res = <span className="text-indigo-400">await</span> <span className="text-sky-400">fetch</span>(<span className="text-emerald-300">&quot;https://stenly.org/api/spawn-ai&quot;</span>, {"{"}<br/>
                  &nbsp;&nbsp;method: <span className="text-emerald-300">&quot;POST&quot;</span>,<br/>
                  &nbsp;&nbsp;headers: {"{ "} <span className="text-emerald-300">&quot;Content-Type&quot;</span>: <span className="text-emerald-300">&quot;application/json&quot;</span> {"}"},<br/>
                  &nbsp;&nbsp;body: JSON.<span className="text-sky-400">stringify</span>({"{ "} prompt: <span className="text-emerald-300">&quot;System metrics...&quot;</span>, think: <span className="text-amber-500">true</span> {"}"})<br/>
                  {"}"});<br/>
                  <span className="text-indigo-400">const</span> data = <span className="text-indigo-400">await</span> res.<span className="text-sky-400">json</span>();
                </MicroCodeBlock>
              </div>
            </div>
          </div>
        </section>

        {/* RESPONSE SECTION */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 mb-3 border-b border-indigo-100 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h2 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest italic">Hasil Yang Didapatkan (Response)</h2>
          </div>

          <div className="bg-white border border-indigo-100 rounded-xl p-5 shadow-sm space-y-6">
            <div className="space-y-2">
               <div className="text-[7px] font-black text-slate-400 uppercase tracking-[0.3em]">HTTP Headers</div>
               <div className="font-mono text-[8px] font-bold space-y-1 bg-slate-50/80 rounded-lg p-3 border border-slate-100">
                 <div className="text-sky-600">HTTP/1.1 200 OK</div>
                 <div className="text-slate-500 uppercase tracking-widest">Content-Type: <span className="text-slate-800 normal-case tracking-normal">application/json</span></div>
                 <div className="text-slate-500 uppercase tracking-widest">X-Stenly-Engine: <span className="text-slate-800 normal-case tracking-normal">Spawn-V2-Node</span></div>
                 <div className="text-slate-500 uppercase tracking-widest">X-Status: <span className="text-slate-800 normal-case tracking-normal">Stable_OK</span></div>
               </div>
            </div>

            <div className="space-y-2">
               <div className="text-[7px] font-black text-slate-400 uppercase tracking-[0.3em]">Stream / Payload Output</div>
               <div className="bg-[#050505] rounded-xl p-4 border border-slate-800 shadow-inner overflow-x-auto">
                 <pre className="font-mono font-bold text-[9px] leading-loose">
                   <div className="text-emerald-500">{"{"}</div>
                   <div className="text-emerald-500 pl-4">&quot;status&quot;: <span className="text-sky-400">true</span>,</div>
                   <div className="text-emerald-500 pl-4">&quot;author&quot;: <span className="text-amber-500">&quot;STENLY&quot;</span>,</div>
                   <div className="text-emerald-500 pl-4">&quot;creator&quot;: <span className="text-amber-500">&quot;STENLY&quot;</span>,</div>
                   <div className="text-emerald-500 pl-4">&quot;result&quot;: {"{"}</div>
                   <div className="text-emerald-500 pl-8">&quot;question&quot;: <span className="text-amber-500">&quot;System metrics...&quot;</span>,</div>
                   <div className="text-emerald-500 pl-8">&quot;answer&quot;: <span className="text-amber-500">&quot;Modular processing completed...&quot;</span>,</div>
                   <div className="text-emerald-500 pl-8">&quot;think_mode&quot;: <span className="text-sky-400">true</span>,</div>
                   <div className="text-emerald-500 pl-8">&quot;thinking_process&quot;: <span className="text-amber-500">&quot;[searching]...&quot;</span>,</div>
                   <div className="text-emerald-500 pl-8">&quot;model&quot;: <span className="text-amber-500">&quot;spawnai&quot;</span>,</div>
                   <div className="text-emerald-500 pl-8">&quot;session_id&quot;: <span className="text-amber-500">&quot;s_12345...&quot;</span></div>
                   <div className="text-emerald-500 pl-4">{"}"}</div>
                   <div className="text-emerald-500">{"}"}</div>
                 </pre>
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
                      <span>tty1</span>
                   </div>
                </div>
                <div className="flex bg-[#050505] rounded-[4px] border border-slate-900 p-0.5">
                   <button 
                     onClick={() => setActiveTab('payload')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'payload' ? 'bg-[#151515] text-emerald-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                   >PAYLOAD.JSON</button>
                   <button 
                     onClick={() => setActiveTab('response')}
                     className={`px-2.5 py-1 rounded-[3px] text-[7px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'response' ? 'bg-[#151515] text-emerald-400 border border-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
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
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># SYSDIN REQUEST</div>
                        <div className="text-emerald-400 text-[10px] font-bold leading-relaxed border-l-2 border-emerald-900/50 pl-3 py-0.5">
                          {prompt || "NULL"}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-slate-700 text-[7px] uppercase tracking-[0.3em] font-black"># RAW SCHEMA</div>
                        <pre className="text-[10px] font-bold leading-loose p-5 bg-[#0a0a0c] rounded-xl border border-slate-900 shadow-inner">
                          <span className="text-slate-500">{"{"}</span><br />
                          &nbsp;&nbsp;<span className="text-indigo-400">&quot;prompt&quot;</span><span className="text-slate-600">:</span> <span className="text-emerald-500">&quot;{prompt}&quot;</span><span className="text-slate-500">,</span><br />
                          &nbsp;&nbsp;<span className="text-indigo-400">&quot;think&quot;</span><span className="text-slate-600">:</span> <span className="text-amber-500">{thinkMode.toString()}</span><br />
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
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> FETCHING_NODE_RESPONSE...
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
                     disabled={isLoading || !prompt.trim()}
                     className="w-full max-w-[300px] bg-emerald-500/10 border border-emerald-500/30 rounded-full py-2 flex items-center justify-center gap-2.5 group hover:bg-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                     <div className="w-6 h-6 rounded-full bg-[#050505] flex items-center justify-center text-emerald-500 font-black text-[9px] group-hover:bg-black transition-colors shadow-sm">N</div>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500 italic">./EXECUTE_CALL.sh</span>
                   </button>
                </div>

                <div className="flex items-center justify-between gap-3 px-2">
                   <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                         type="checkbox" 
                         checked={thinkMode} 
                         onChange={() => setThinkMode(!thinkMode)}
                         className="sr-only"
                      />
                      <div className={`w-7 h-3.5 rounded-full relative transition-all border ${thinkMode ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-900 border-slate-700'}`}>
                         <div className={`absolute top-[1.5px] w-2.5 h-2.5 rounded-full bg-white transition-all shadow-sm ${thinkMode ? 'left-[14px]' : 'left-[1px]'}`} />
                      </div>
                      <span className={`text-[7px] font-black uppercase tracking-[0.2em] ${thinkMode ? 'text-indigo-400' : 'text-slate-600'}`}>REASONING</span>
                   </label>
                   
                   <input 
                     type="text"
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
                     className="bg-transparent border-b border-slate-800 text-[10px] font-bold text-slate-300 outline-none w-56 text-right transition-all focus:border-indigo-600 placeholder:text-slate-700 pb-1"
                     placeholder="custom_prompt_input..."
                   />
                </div>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
