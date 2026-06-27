/* by Stenly */
"use client"

import Link from "next/link";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Terminal, 
  BookOpen, 
  Server, 
  Zap, 
  Globe, 
  Layers, 
  Download, 
  Youtube, 
  ChevronRight, 
  Twitter, 
  PlayCircle, 
  Sparkles, 
  Search, 
  ShoppingBag,
  Check,
  ChevronDown,
  Instagram,
  Github,
  Music,
  MapPin,
  MessageCircle,
  Database,
  CloudCog,
  Cpu,
  Shield,
  Activity,
  MessageSquare,
  Linkedin,
  LineChart,
  FileText,
  Workflow,
  Command,
  Wind,
  Box,
  Image as ImageIcon,
  Camera
} from "lucide-react";
import { ReactNode } from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900">
      {/* Header */}
      <header className="px-4 md:px-6 py-1.5 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#ea4e31] flex items-center justify-center text-white font-bold text-[10px]">
            {/* Simple logo shape */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v5h5"/><path d="M3 15h6v2H3z"/><path d="M3 11h6v2H3z"/></svg>
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">Stenly API</span>
        </div>
        <Link href="/docs" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ea4e31] text-white text-[10px] font-bold rounded-full hover:bg-[#d64124] transition-colors tracking-wide">
          MULAI <ArrowRight className="w-3 h-3" />
        </Link>
      </header>

      <main className="max-w-3xl mx-auto pb-8">
        {/* Hero Section */}
        <section className="pt-5 pb-4 px-4 md:px-6">
          {/* Floating Logos Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
            {/* Randomly placed logos */}
            <FloatingLogo Logo={GeminiLogo} size={28} top="12%" left="82%" delay={0.1} />
            <FloatingLogo Logo={OpenAILogo} size={24} top="45%" left="88%" delay={0.2} />
            <FloatingLogo Logo={ClaudeLogo} size={32} top="18%" left="15%" delay={0.3} />
            <FloatingLogo Logo={DeepSeekLogo} size={22} top="75%" left="85%" delay={0.5} />
            <FloatingLogo Logo={GrokLogo} size={26} top="5%" left="25%" delay={0.6} />
            <FloatingLogo Logo={LlamaLogo} size={24} top="35%" left="5%" delay={0.7} />
            <FloatingLogo Logo={MistralLogo} size={20} top="82%" left="12%" delay={0.8} />
            <FloatingLogo Logo={RaphaelLogo} size={26} top="40%" left="35%" delay={0.9} />
            <FloatingLogo Logo={YoutubeLogo} size={24} top="52%" left="65%" delay={1.0} />
            <FloatingLogo Logo={GeminiLogo} size={18} top="48%" left="18%" delay={1.1} />
            <FloatingLogo Logo={OpenAILogo} size={20} top="58%" left="75%" delay={1.1} />
            <FloatingLogo Logo={ClaudeLogo} size={22} top="32%" left="92%" delay={1.2} />
            <FloatingLogo Logo={DeepSeekLogo} size={16} top="68%" left="42%" delay={1.3} />
            <FloatingLogo Logo={PerplexityLogo} size={20} top="85%" left="55%" delay={1.5} />
            
            {/* Tech logos but smaller */}
            <FloatingLogo Logo={VercelLogo} size={12} top="10%" left="45%" delay={1.4} />
            <FloatingLogo Logo={DockerLogo} size={16} top="88%" left="40%" delay={1.0} />
            <FloatingLogo Logo={PythonLogo} size={12} top="25%" left="92%" delay={1.1} />
            <FloatingLogo Logo={NodeLogo} size={14} top="55%" left="95%" delay={1.2} />
            <FloatingLogo Logo={ReactLogo} size={12} top="15%" left="5%" delay={1.3} />
            <FloatingLogo Logo={NextLogo} size={14} top="92%" left="75%" delay={1.4} />
            <FloatingLogo Logo={RedisLogo} size={15} top="72%" left="2%" delay={1.5} />
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-gray-200 rounded-full text-[9px] font-bold tracking-widest uppercase text-gray-600 mb-4 shadow-sm relative">
            <span className="flex items-center gap-1.5 text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ALL SYSTEMS NORMAL
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">API V1.2</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-2 text-slate-900 leading-[1.05]">
            Infrastruktur Data Engine By Stenly.
          </h1>
          
          <p className="text-[10px] md:text-xs text-gray-600 mb-4 max-w-lg leading-relaxed font-semibold">
            Satu titik akhir untuk ribuan kemungkinan. Akses scraper, konverter, dan AI processing dengan arsitektur Edge berkecepatan 20ms/request.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-start mb-6">
            <Link href="/docs" className="w-full sm:w-auto px-4 py-2 bg-[#111827] hover:bg-slate-800 text-white rounded-full text-[11px] font-bold transition-all flex items-center justify-center gap-2">
              <span className="text-emerald-400 font-mono font-bold text-[10px] flex items-center">{"_>"}</span> Buat API Key
            </Link>
            <Link href="/docs" className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-slate-700 rounded-full text-[11px] font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
              <BookOpen className="w-3 h-3 text-gray-500" /> Dokumentasi V1
            </Link>
            <Link href="/docsv2" className="w-full sm:w-auto px-4 py-2 bg-white border-2 border-[#ea4e31] hover:bg-[#ea4e31]/5 text-[#ea4e31] rounded-full text-[11px] font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
              <Sparkles className="w-3 h-3" /> Dokumentasi V2
            </Link>
          </div>

          {/* Metrics bar */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 bg-white p-2 border border-gray-100 rounded-lg shadow-sm text-[10px] font-bold text-gray-800 justify-start md:justify-center lg:justify-start overflow-x-auto whitespace-nowrap scrollbar-hide mb-6">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Server className="w-2.5 h-2.5" /></div>
              <div className="flex items-baseline gap-1.5"><span className="text-slate-900 font-extrabold text-xs">99.99%</span><span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Uptime Edge</span></div>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-100 shrink-0"></div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-600"><Zap className="w-2.5 h-2.5" /></div>
              <div className="flex items-baseline gap-1.5"><span className="text-slate-900 font-extrabold text-xs">{"< 20ms"}</span><span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Latensi Node</span></div>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-100 shrink-0"></div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><Globe className="w-2.5 h-2.5" /></div>
              <div className="flex items-baseline gap-1.5"><span className="text-slate-900 font-extrabold text-xs">15M+</span><span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Req/Bulan</span></div>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-100 shrink-0"></div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><Layers className="w-2.5 h-2.5" /></div>
              <div className="flex items-baseline gap-1.5"><span className="text-slate-900 font-extrabold text-xs">40+</span><span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">API Aktif</span></div>
            </div>
          </div>
        </section>

        {/* Katalog Endpoint */}
        <section className="px-4 md:px-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-[9px] font-extrabold tracking-widest text-slate-900 uppercase">Katalog Endpoint</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <ApiCard 
              icon={<Download className="w-3.5 h-3.5" />} iconColor="text-red-600" iconBg="bg-red-50 text-red-600"
              title="TikTok DL" desc="Tarik video/slide HD bebas watermark seketika." 
              tags={[{text:"VIDEO", c:"text-red-700 bg-red-100"}, {text:"AUDIO", c:"text-red-700 bg-red-100"}, {text:"JSON", c:"text-red-700 bg-red-100"}]} 
            />
            <ApiCard 
              icon={<YoutubeLogo />} iconColor="text-red-600" iconBg="bg-red-50 text-red-600"
              title="YouTube MP3/MP4" desc="Unduh media YouTube kualitas HD (MP3 & Video)." 
              tags={[{text:"VIDEO", c:"text-red-700 bg-red-100"}, {text:"MP3", c:"text-red-700 bg-red-100"}, {text:"HD", c:"text-red-700 bg-red-100"}]} 
            />
            <ApiCard 
              icon={<RaphaelLogo />} iconColor="text-rose-600" iconBg="bg-rose-50 text-rose-600"
              title="Raphael Art AI" desc="Generasi gambar artistik dari deskripsi teks sederhana." 
              tags={[{text:"AI", c:"text-rose-700 bg-rose-100"}, {text:"IMAGE", c:"text-rose-700 bg-rose-100"}]} 
            />
            <ApiCard 
              icon={<Youtube className="w-3.5 h-3.5" />} iconColor="text-slate-700" iconBg="bg-slate-100 text-slate-700"
              title="YT Extract" desc="Ekstrak MP4/MP3 dan data komplit dari YouTube." 
              tags={[{text:"STATS", c:"text-slate-700 bg-slate-200"}, {text:"MP3", c:"text-slate-700 bg-slate-200"}, {text:"MP4", c:"text-slate-700 bg-slate-200"}]} 
            />
            <ApiCard 
              icon={<Camera className="w-3.5 h-3.5" />} iconColor="text-indigo-600" iconBg="bg-indigo-50 text-indigo-600"
              title="SSWEB Node" desc="Screenshot website dengan kustomisasi viewport dan delay." 
              tags={[{text:"SCREENSHOT", c:"text-indigo-700 bg-indigo-100"}, {text:"RENDER", c:"text-indigo-700 bg-indigo-100"}]} 
            />
            <ApiCard 
              icon={<ChevronRight className="w-3.5 h-3.5" />} iconColor="text-blue-600" iconBg="bg-blue-50 text-blue-600"
              title="Claude Haiku" desc="Akses LLM Anthropic Claude 3.5 Haiku super cepat." 
              tags={[{text:"AI", c:"text-blue-700 bg-blue-100"}, {text:"LLM", c:"text-blue-700 bg-blue-100"}, {text:"CHAT", c:"text-blue-700 bg-blue-100"}]} 
            />
            <ApiCard 
              icon={<Twitter className="w-3.5 h-3.5" />} iconColor="text-sky-600" iconBg="bg-sky-50 text-sky-600"
              title="Twitter X API" desc="Ambil tweet, media, dan profil tanpa login token." 
              tags={[{text:"TWEETS", c:"text-sky-700 bg-sky-100"}, {text:"MEDIA", c:"text-sky-700 bg-sky-100"}]} 
            />
            <ApiCard 
              icon={<PlayCircle className="w-3.5 h-3.5" />} iconColor="text-indigo-600" iconBg="bg-indigo-50 text-indigo-600"
              title="Database Anime" desc="Jadwal terbaru, detail resolusi & streaming batch." 
              tags={[{text:"ONGOING", c:"text-indigo-700 bg-indigo-100"}, {text:"BATCH", c:"text-indigo-700 bg-indigo-100"}]} 
            />
            <ApiCard 
              icon={<Sparkles className="w-3.5 h-3.5" />} iconColor="text-fuchsia-600" iconBg="bg-fuchsia-50 text-fuchsia-600"
              title="Pinterest Pin" desc="Unduh moodboard dan resolusi asli foto aesthetic." 
              tags={[{text:"PINS", c:"text-fuchsia-700 bg-fuchsia-100"}, {text:"BOARDS", c:"text-fuchsia-700 bg-fuchsia-100"}]} 
            />
            <ApiCard 
              icon={<Search className="w-3.5 h-3.5" />} iconColor="text-teal-600" iconBg="bg-teal-50 text-teal-600"
              title="Google SERP" desc="Parsing pencarian terstruktur langsung dari Google." 
              tags={[{text:"WEB", c:"text-teal-700 bg-teal-100"}, {text:"NEWS", c:"text-teal-700 bg-teal-100"}]} 
            />
            <ApiCard 
              icon={<ShoppingBag className="w-3.5 h-3.5" />} iconColor="text-orange-600" iconBg="bg-orange-50 text-orange-600"
              title="Shopee Scrape" desc="Ambil info produk, harga, dan review otomatis." 
              tags={[{text:"PRODUK", c:"text-orange-700 bg-orange-100"}, {text:"HARGA", c:"text-orange-700 bg-orange-100"}]} 
            />
            <ApiCard 
              icon={<Instagram className="w-3.5 h-3.5" />} iconColor="text-pink-600" iconBg="bg-pink-50 text-pink-600"
              title="Instagram Graph API" desc="Akses langsung profil, reels, dan stories tanpa login." 
              tags={[{text:"REELS", c:"text-pink-700 bg-pink-100"}, {text:"STORY", c:"text-pink-700 bg-pink-100"}]} 
            />
            <ApiCard 
              icon={<MapPin className="w-3.5 h-3.5" />} iconColor="text-amber-600" iconBg="bg-amber-50 text-amber-600"
              title="Google Maps Data" desc="Dapatkan ulasan, foto tempat, dan jam operasional dengan kordinat akurat." 
              tags={[{text:"PLACES", c:"text-amber-700 bg-amber-100"}, {text:"REVIEWS", c:"text-amber-700 bg-amber-100"}]} 
            />
            <ApiCard 
              icon={<Music className="w-3.5 h-3.5" />} iconColor="text-green-600" iconBg="bg-green-50 text-green-600"
              title="Spotify Tracks API" desc="Metadata lengkap lagu, lirik real-time, dan informasi album komplit." 
              tags={[{text:"AUDIO", c:"text-green-700 bg-green-100"}, {text:"LYRICS", c:"text-green-700 bg-green-100"}]} 
            />
            <ApiCard 
              icon={<CloudCog className="w-3.5 h-3.5" />} iconColor="text-cyan-600" iconBg="bg-cyan-50 text-cyan-600"
              title="Weather Station Live" desc="Prakiraan cuaca seluruh kabupaten di seluruh wilayah Indonesia presisi." 
              tags={[{text:"BMKG", c:"text-cyan-700 bg-cyan-100"}, {text:"CLIMATE", c:"text-cyan-700 bg-cyan-100"}]} 
            />
            <ApiCard 
              icon={<MessageSquare className="w-3.5 h-3.5" />} iconColor="text-emerald-600" iconBg="bg-emerald-50 text-emerald-600"
              title="WhatsApp Bot API" desc="Integrasi kirim dan terima pesan instan WhatsApp Gateway." 
              tags={[{text:"WA", c:"text-emerald-700 bg-emerald-100"}, {text:"BOT", c:"text-emerald-700 bg-emerald-100"}]} 
            />
            <ApiCard 
              icon={<Linkedin className="w-3.5 h-3.5" />} iconColor="text-blue-700" iconBg="bg-blue-100 text-blue-700"
              title="LinkedIn Scraper" desc="Tarik detail data profil serta riwayat dan informasi perusahaan secara langsung." 
              tags={[{text:"PROFIL", c:"text-blue-800 bg-blue-200"}, {text:"KARIR", c:"text-blue-800 bg-blue-200"}]} 
            />
            <ApiCard 
              icon={<LineChart className="w-3.5 h-3.5" />} iconColor="text-violet-600" iconBg="bg-violet-50 text-violet-600"
              title="Financial Data API" desc="Data pasar saham IHSG, reksa dana, kripto, crypto, mata uang realtime." 
              tags={[{text:"STOCKS", c:"text-violet-700 bg-violet-100"}, {text:"CRYPTO", c:"text-violet-700 bg-violet-100"}]} 
            />
            <ApiCard 
              icon={<FileText className="w-3.5 h-3.5" />} iconColor="text-rose-600" iconBg="bg-rose-50 text-rose-600"
              title="OCR Document" desc="Parsing dan ekstrak teks langsung dari struk, invoice, & KTP akurat." 
              tags={[{text:"KTP", c:"text-rose-700 bg-rose-100"}, {text:"INVOICE", c:"text-rose-700 bg-rose-100"}]} 
            />
          </div>
        </section>

        {/* Arsitektur Info */}
        <section className="px-4 md:px-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-[9px] font-extrabold tracking-widest text-slate-900 uppercase">Performa Ekstrem</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-md flex items-start gap-3 group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent blur-xl"></div>
               <div className="w-7 h-7 bg-emerald-500/20 rounded flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30">
                  <Activity className="w-3.5 h-3.5" />
               </div>
               <div>
                  <h3 className="text-[10px] font-extrabold text-white mb-1">Global Edge Network</h3>
                  <p className="text-[8px] font-bold text-slate-400 leading-relaxed">
                    Lebih dari sekedar API biasa. Kami mendistribusikan node logic scraper kami ke puluhan wilayah Edge secara paralel. Mengurangi kemungkinan terblokir IP secara signifikan.
                  </p>
               </div>
            </div>
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-md flex items-start gap-3 group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent blur-xl"></div>
               <div className="w-7 h-7 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/30">
                  <Shield className="w-3.5 h-3.5" />
               </div>
               <div>
                  <h3 className="text-[10px] font-extrabold text-white mb-1">Bot Bypasser & Proxy</h3>
                  <p className="text-[8px] font-bold text-slate-400 leading-relaxed">
                    Setiap request dilengkapi header rotasi canggih dengan residential proxies dari 4 server regional berbeda. Cloudflare Anti-Bot terlewati seketika dalam hitungan 15ms.
                  </p>
               </div>
            </div>
          </div>
        </section>



        {/* FAQs */}
        <section className="px-4 md:px-6 mb-6 max-w-2xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-sm font-extrabold tracking-tight text-slate-900 mb-1 uppercase">Pertanyaan Terkait</h2>
            <p className="text-[9px] font-extrabold tracking-widest text-gray-500 uppercase">Metode, Kuota, & Arsitektur.</p>
          </div>
          <div className="space-y-2">
            <FaqItem 
              q="Apakah ini benar-benar gratis tanpa kartu kredit?" 
              a="Ya, paket Hobby kami sepenuhnya gratis untuk Anda yang baru memulai. Tidak perlu setup kartu kredit, 1,000 token bebas pakai langsung ke semua endpoint non-AI setiap bulan. Anda hanya akan diminta upgrade otomatis jika konsumsi API melebihi jatah server kami." 
            />
            <FaqItem 
              q="Edge Network Cloudflare atau Vercel?" 
              a="Kami menggunakan sistem hybrid. Caching statis dipegang oleh Cloudflare, sementara compute dinamis dan parsing endpoint berat didistribusikan langsung menggunakan Vercel Edge Server di regional Asia Tenggara (Singapore) sehingga latensi di Indonesia konsisten dibawah 30ms." 
            />
            <FaqItem 
              q="Bagaimana jika rate limit tercapai tiba-tiba?" 
              a="Permintaan Anda akan dikembalikan dengan kode HTTP 429 (Too Many Requests). Jika Anda di paket Hobby, cukup tunggu 1 menit kedepan karena reset limit berjalan per-menit. Namun sangat disarankan upgrade ke pro jika trafik stabil di kisaran 300 Req/min." 
            />
            <FaqItem 
              q="Apakah ada SDK bawaan untuk Typescript & React?" 
              a="Tentu saja. Anda bisa memanggil setiap instruksi secara native menggunakan package @stenly/client. Penuh dengan types inference bawaan (IntelliSense) langsung dari interface kami." 
            />
            <FaqItem 
              q="Bagaimana integrasi dengan IIS / Windows Server?" 
              a="Meskipun arsitektur kami menggunakan Vercel Edge Linux, semua API terekspos sebagai REST JSON murni. Anda dapat mengkonsumsinya langsung via C# HttpClient atau backend IIS tanpa hambatan." 
            />
            <FaqItem 
              q="Berapa lama uptime rata-ratanya?" 
              a="Berdasarkan SLA layanan korporat kami, platform ini dipatok pada 99.99% Node availability. Server kami akan redundan memutasikan setiap endpoint fail over secara instan tanpa mengganggu pipeline Anda." 
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-6 pb-4 px-4 md:px-6 text-[9px]">
        <div className="max-w-3xl mx-auto">
          {/* Top section footer */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="w-4 h-4 rounded bg-[#ea4e31] flex items-center justify-center text-white font-bold text-[8px]">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v5h5"/><path d="M3 15h6v2H3z"/><path d="M3 11h6v2H3z"/></svg>
                </div>
                <span className="font-extrabold text-xs tracking-tight text-slate-900">Stenly API</span>
              </div>
              <p className="text-gray-500 font-semibold leading-relaxed pr-4 text-[9px] max-w-sm">Arsitektur API data paling tangguh, dibuat skalabel khusus efisiensi enterprise, memadukan edge computing dengan high-availability node processing.</p>
            </div>
            
            <div>
              <h4 className="font-extrabold tracking-widest text-[#ea4e31] uppercase mb-2.5 text-[8px]">Akses Global</h4>
              <ul className="space-y-1.5 font-bold text-[9px] text-gray-600">
                <li><a href="#" className="hover:text-[#ea4e31]">TikTok & YT Extract</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">Social Graph Data</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">Residential Proxy</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">AI Model Gateway</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-extrabold tracking-widest text-[#ea4e31] uppercase mb-2.5 text-[8px]">Informasi</h4>
              <ul className="space-y-1.5 font-bold text-[9px] text-gray-600">
                <li><a href="#" className="hover:text-[#ea4e31]">Dokumentasi Docs</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">API Playground</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">Sistem Status Ping</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">Komunitas Discord</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold tracking-widest text-[#ea4e31] uppercase mb-2.5 text-[8px]">Korporat</h4>
              <ul className="space-y-1.5 font-bold text-[9px] text-gray-600">
                <li><a href="#" className="hover:text-[#ea4e31]">Harga Institusi</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">Perjanjian Layanan</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">Kebijakan Data</a></li>
                <li><a href="#" className="hover:text-[#ea4e31]">Karir & Tim</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom section footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-gray-100 gap-3">
            <div className="flex items-center gap-1.5 text-[8px] font-extrabold tracking-widest text-slate-600 uppercase bg-slate-100 px-2 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full z-10 bg-emerald-500 animate-pulse"></span> SEMUA SISTEM BEROPERASI
            </div>
            <p className="text-[8px] font-extrabold tracking-widest text-gray-400 uppercase">© 2026 STENLY API INFRASTRUCTURE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FloatingLogo({ Logo, size, top, left, delay }: { Logo: any, size: number, top: string, left: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 10 }}
      animate={{ opacity: 0.4, scale: 1, y: 0 }}
      whileHover={{ opacity: 1, scale: 1.2, rotate: 5 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="absolute"
      style={{ top, left, width: size, height: size }}
    >
      <Logo />
    </motion.div>
  );
}

function ApiCard({ icon, iconBg, title, desc, tags }: { icon: ReactNode, iconBg: string, iconColor: string, title: string, desc: string, tags: {text: string, c: string}[] }) {
  return (
    <div className="bg-white p-3 md:p-3.5 rounded-lg border border-gray-100 shadow-sm hover:border-gray-300 hover:shadow-md transition-all group relative flex flex-col h-full overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-bl-full"></div>
      <div className={`w-7 h-7 md:w-8 md:h-8 rounded md:rounded flex items-center justify-center mb-2.5 shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="font-extrabold text-[10px] md:text-[11px] text-slate-900 mb-1 leading-tight">{title}</h3>
        <p className="text-[8px] md:text-[9px] text-gray-500 font-extrabold mb-3 leading-relaxed flex-1">{desc}</p>
        <div className="flex flex-wrap gap-1 md:gap-1.5 mt-auto">
          {tags.map((t, i) => (
            <span key={i} className={`text-[6px] md:text-[7px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded-[3px] ${t.c}`}>{t.text}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string, a?: string }) {
  return (
    <details className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors group">
      <summary className="px-4 py-3 flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-[11px] font-extrabold text-slate-800">{q}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-open:rotate-180 transition-transform" />
      </summary>
      {a && (
        <div className="px-4 pb-3 pt-0 text-[10px] text-gray-600 font-bold leading-relaxed border-t border-gray-50 mt-1">
          {a}
        </div>
      )}
    </details>
  )
}

// Logo Definitions
const GeminiLogo = () => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65"><mask id="maskme" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="65" height="65"><path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="#000"/><path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="url(#prefix__paint0_linear_2001_67)"/></mask><g mask="url(#maskme)"><g filter="url(#prefix__filter0_f_2001_67)"><path d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z" fill="#FFE432"/></g><g filter="url(#prefix__filter1_f_2001_67)"><path d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z" fill="#FC413D"/></g><g filter="url(#prefix__filter2_f_2001_67)"><path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"/></g><g filter="url(#prefix__filter3_f_2001_67)"><path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"/></g><g filter="url(#prefix__filter4_f_2001_67)"><path d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z" fill="#00B95C"/></g><g filter="url(#prefix__filter5_f_2001_67)"><path d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z" fill="#3186FF"/></g><g filter="url(#prefix__filter6_f_2001_67)"><path d="M-13.065 40.944c9.33 7.094 22.959 4.869 30.442-4.972 7.483-9.84 5.987-23.569-3.343-30.663C4.704-1.786-8.924.439-16.408 10.28c-7.483 9.84-5.986 23.57 3.343 30.664z" fill="#FBBC04"/></g><g filter="url(#prefix__filter7_f_2001_67)"><path d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z" fill="#3186FF"/></g><g filter="url(#prefix__filter8_f_2001_67)"><path d="M54.984-2.336c2.833 3.852-.808 11.34-8.131 16.727-7.324 5.387-15.557 6.631-18.39 2.78-2.833-3.853.807-11.342 8.13-16.728 7.324-5.387 15.558-6.631 18.39-2.78z" fill="#749BFF"/></g><g filter="url(#prefix__filter9_f_2001_67)"><path d="M31.727 16.104C43.053 5.598 46.94-8.626 40.41-15.666c-6.53-7.04-21.006-4.232-32.332 6.274s-15.214 24.73-8.683 31.77c6.53 7.04 21.006 4.232 32.332-6.274z" fill="#FC413D"/></g><g filter="url(#prefix__filter10_f_2001_67)"><path d="M8.51 53.838c6.732 4.818 14.46 5.55 17.262 1.636 2.802-3.915-.384-10.994-7.116-15.812-6.731-4.818-14.46-5.55-17.261-1.636-2.802 3.915.383 10.994 7.115 15.812z" fill="#FFEE48"/></g></g><defs><filter id="prefix__filter0_f_2001_67" x="-19.824" y="13.152" width="39.274" height="43.217" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.46" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter1_f_2001_67" x="-15.001" y="-40.257" width="84.868" height="85.688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="11.891" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter2_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter3_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter4_f_2001_67" x="-19.845" y="15.459" width="79.731" height="81.505" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter5_f_2001_67" x="29.832" y="-11.552" width="75.117" height="73.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="9.606" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter6_f_2001_67" x="-38.583" y="-16.253" width="78.135" height="78.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="8.706" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter7_f_2001_67" x="8.107" y="-5.966" width="78.877" height="77.539" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="7.775" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter8_f_2001_67" x="13.587" y="-18.488" width="56.272" height="51.81" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="6.957" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter9_f_2001_67" x="-15.526" y="-31.297" width="70.856" height="69.306" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="5.876" result="effect1_foregroundBlur_2001_67"/></filter><filter id="prefix__filter10_f_2001_67" x="-14.168" y="20.964" width="55.501" height="51.571" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="7.273" result="effect1_foregroundBlur_2001_67"/></filter><linearGradient id="prefix__paint0_linear_2001_67" x1="18.447" y1="43.42" x2="52.153" y2="15.004" gradientUnits="userSpaceOnUse"><stop stopColor="#4893FC"/><stop offset=".27" stopColor="#4893FC"/><stop offset=".777" stopColor="#969DFF"/><stop offset="1" stopColor="#BD99FE"/></linearGradient></defs></svg>
);

const RaphaelLogo = () => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
  >
    <g transform="scale(32)">
      <clipPath id="prefix__a">
        <path d="M0 0h16v16H0z" />
      </clipPath>
      <g clipPath="url(#prefix__a)">
        <path
          d="M20.607 2.247c-2.917-.966-5.426 1.084-6.011 2.96 0 0-2.105 6.76-3.002 9.58-.428 1.346-1.489 3.548-3.487 3.548-1.627 0-2.463-1.527-2.816-2.437L2.865 9.431c-.281-.681.013-2.04 1.14-2.447 1.204-.432 1.978.575 2.178 1.11l3.022 7.74c.72-.928 1.178-2.438 1.476-3.507l-1.984-5.21C7.756 4.686 5.267 3.58 2.962 4.43 1.095 5.118-.702 7.474.275 10.435l2.504 6.44c.38.976 1.881 4.163 5.275 4.163 4.073 0 5.601-3.473 6.449-6.218.424-1.373 2.749-8.797 2.749-8.797.338-1.109 1.71-1.428 2.568-1.148.605.196 1.698 1.031 1.345 2.325-.066.236-1.92 6.209-2.604 8.026-.357.948-1.262 3.006-3.324 2.72-.628 1.39-1.15 2.199-1.94 2.925 2.572 1.218 6.32-.009 7.898-4.776.586-1.773 2.644-8.166 2.644-8.166.598-1.963-.469-4.768-3.232-5.682z"
          fill="url(#prefix___Linear2)"
          fillRule="nonzero"
          transform="scale(.66667)"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="prefix___Linear2"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="scale(27.95) rotate(24.687 -.447 .163)"
      >
        <stop offset="0" stopColor="#40edd8" />
        <stop offset=".02" stopColor="#38e7e2" />
        <stop offset=".08" stopColor="#28daf7" />
        <stop offset=".12" stopColor="#22d5ff" />
        <stop offset=".36" stopColor="#1abfff" />
        <stop offset=".85" stopColor="#0786fe" />
        <stop offset=".91" stopColor="#047ffe" />
        <stop offset="1" stopColor="#047ffe" />
      </linearGradient>
    </defs>
  </svg>
);


const YoutubeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
  </svg>
);

const OpenAILogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 509.639"><path fill="#fff" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/><path fillRule="nonzero" d="M412.037 221.764a90.834 90.834 0 004.648-28.67 90.79 90.79 0 00-12.443-45.87c-16.37-28.496-46.738-46.089-79.605-46.089-6.466 0-12.943.683-19.264 2.04a90.765 90.765 0 00-67.881-30.515h-.576c-.059.002-.149.002-.216.002-39.807 0-75.108 25.686-87.346 63.554-25.626 5.239-47.748 21.31-60.682 44.03a91.873 91.873 0 00-12.407 46.077 91.833 91.833 0 0023.694 61.553 90.802 90.802 0 00-4.649 28.67 90.804 90.804 0 0012.442 45.87c16.369 28.504 46.74 46.087 79.61 46.087a91.81 91.81 0 0019.253-2.04 90.783 90.783 0 0067.887 30.516h.576l.234-.001c39.829 0 75.119-25.686 87.357-63.588 25.626-5.242 47.748-21.312 60.682-44.033a91.718 91.718 0 0012.383-46.035 91.83 91.83 0 00-23.693-61.553l-.004-.005zM275.102 413.161h-.094a68.146 68.146 0 01-43.611-15.8 56.936 56.936 0 002.155-1.221l72.54-41.901a11.799 11.799 0 005.962-10.251V241.651l30.661 17.704c.326.163.55.479.596.84v84.693c-.042 37.653-30.554 68.198-68.21 68.273h.001zm-146.689-62.649a68.128 68.128 0 01-9.152-34.085c0-3.904.341-7.817 1.005-11.663.539.323 1.48.897 2.155 1.285l72.54 41.901a11.832 11.832 0 0011.918-.002l88.563-51.137v35.408a1.1 1.1 0 01-.438.94l-73.33 42.339a68.43 68.43 0 01-34.11 9.12 68.359 68.359 0 01-59.15-34.11l-.001.004zm-19.083-158.36a68.044 68.044 0 0135.538-29.934c0 .625-.036 1.731-.036 2.5v83.801l-.001.07a11.79 11.79 0 005.954 10.242l88.564 51.13-30.661 17.704a1.096 1.096 0 01-1.034.093l-73.337-42.375a68.36 68.36 0 01-34.095-59.143 68.412 68.412 0 019.112-34.085l-.004-.003zm251.907 58.621l-88.563-51.137 30.661-17.697a1.097 1.097 0 011.034-.094l73.337 42.339c21.109 12.195 34.132 34.746 34.132 59.132 0 28.604-17.849 54.199-44.686 64.078v-86.308c.004-.032.004-.065.004-.096 0-4.219-2.261-8.119-5.919-10.217zm30.518-45.93c-.539-.331-1.48-.898-2.155-1.286l-72.54-41.901a11.842 11.842 0 00-5.958-1.611c-2.092 0-4.15.558-5.957 1.611l-88.564 51.137v-35.408l-.001-.061a1.1 1.1 0 01.44-.88l73.33-42.303a68.301 68.301 0 0134.108-9.129c37.704 0 68.281 30.577 68.281 68.281a68.69 68.69 0 01-.984 11.545v.005zm-191.843 63.109l-30.668-17.704a1.09 1.09 0 01-.596-.84v-84.692c.016-37.685 30.593-68.236 68.281-68.236a68.332 68.332 0 0143.689 15.804 63.09 63.09 0 00-2.155 1.222l-72.54 41.9a11.794 11.794 0 00-5.961 10.248v.068l-.05 102.23zm16.655-35.91l39.445-22.782 39.444 22.767v45.55l-39.444 22.767-39.445-22.767v-45.535z"/></svg>
);

const ClaudeLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 509.64"><path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/><path fill="#FCF2EE" fillRule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"/></svg>);

const PerplexityLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 509.64"
  >
    <path
      fill="#1F1F1F"
      d="M115.613 0h280.774C459.974 0 512 52.025 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.613C52.026 509.64 0 457.614 0 394.027V115.612C0 52.025 52.026 0 115.613 0z"
    />
    <path
      fill="#fff"
      fillRule="nonzero"
      d="M348.851 128.063l-68.946 58.302h68.946v-58.302zm-83.908 48.709l100.931-85.349v94.942h32.244v143.421h-38.731v90.004l-94.442-86.662v83.946h-17.023v-83.906l-96.596 86.246v-89.628h-37.445V186.365h38.732V90.768l95.309 84.958v-83.16h17.023l-.002 84.206zm-29.209 26.616c-34.955.02-69.893 0-104.83 0v109.375h20.415v-27.121l84.415-82.254zm41.445 0l82.208 82.324v27.051h21.708V203.388c-34.617 0-69.274.02-103.916 0zm-42.874-17.023l-64.669-57.646v57.646h64.669zm13.617 124.076v-95.2l-79.573 77.516v88.731l79.573-71.047zm17.252-95.022v94.863l77.19 70.83c0-29.485-.012-58.943-.012-88.425l-77.178-77.268z"
    />
  </svg>
);

const DeepSeekLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 509.64"><path fill="#fff" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/><path fill="#4D6BFE" fillRule="nonzero" d="M440.898 139.167c-4.001-1.961-5.723 1.776-8.062 3.673-.801.612-1.479 1.407-2.154 2.141-5.848 6.246-12.681 10.349-21.607 9.859-13.048-.734-24.192 3.368-34.04 13.348-2.093-12.307-9.048-19.658-19.635-24.37-5.54-2.449-11.141-4.9-15.02-10.227-2.708-3.795-3.447-8.021-4.801-12.185-.861-2.509-1.725-5.082-4.618-5.512-3.139-.49-4.372 2.142-5.601 4.349-4.925 9.002-6.833 18.921-6.647 28.962.432 22.597 9.972 40.597 28.932 53.397 2.154 1.47 2.707 2.939 2.032 5.082-1.293 4.41-2.832 8.695-4.186 13.105-.862 2.817-2.157 3.429-5.172 2.205-10.402-4.346-19.391-10.778-27.332-18.553-13.481-13.044-25.668-27.434-40.873-38.702a177.614 177.614 0 00-10.834-7.409c-15.512-15.063 2.032-27.434 6.094-28.902 4.247-1.532 1.478-6.797-12.251-6.736-13.727.061-26.285 4.653-42.288 10.777-2.34.92-4.801 1.593-7.326 2.142-14.527-2.756-29.608-3.368-45.367-1.593-29.671 3.305-53.368 17.329-70.788 41.272-20.928 28.785-25.854 61.482-19.821 95.59 6.34 35.943 24.683 65.704 52.876 88.974 29.239 24.123 62.911 35.943 101.32 33.677 23.329-1.346 49.307-4.468 78.607-29.27 7.387 3.673 15.142 5.144 28.008 6.246 9.911.92 19.452-.49 26.839-2.019 11.573-2.449 10.773-13.166 6.586-15.124-33.915-15.797-26.47-9.368-33.24-14.573 17.235-20.39 43.213-41.577 53.369-110.222.8-5.448.121-8.877 0-13.287-.061-2.692.553-3.734 3.632-4.041 8.494-.981 16.742-3.305 24.314-7.471 21.975-12.002 30.84-31.719 32.933-55.355.307-3.612-.061-7.348-3.879-9.245v-.003zM249.4 351.89c-32.872-25.838-48.814-34.352-55.4-33.984-6.155.368-5.048 7.41-3.694 12.002 1.415 4.532 3.264 7.654 5.848 11.634 1.785 2.634 3.017 6.551-1.784 9.493-10.587 6.55-28.993-2.205-29.856-2.635-21.421-12.614-39.334-29.269-51.954-52.047-12.187-21.924-19.267-45.435-20.435-70.542-.308-6.061 1.478-8.207 7.509-9.307 7.94-1.471 16.127-1.778 24.068-.615 33.547 4.9 62.108 19.902 86.054 43.66 13.666 13.531 24.007 29.699 34.658 45.496 11.326 16.778 23.514 32.761 39.026 45.865 5.479 4.592 9.848 8.083 14.035 10.656-12.62 1.407-33.673 1.714-48.075-9.676zm15.899-102.519c.521-2.111 2.421-3.658 4.722-3.658a4.74 4.74 0 011.661.305c.678.246 1.293.614 1.786 1.163.861.859 1.354 2.083 1.354 3.368 0 2.695-2.154 4.837-4.862 4.837a4.748 4.748 0 01-4.738-4.034 5.01 5.01 0 01.077-1.981zm47.208 26.915c-2.606.996-5.2 1.778-7.707 1.88-4.679.244-9.787-1.654-12.556-3.981-4.308-3.612-7.386-5.631-8.679-11.941-.554-2.695-.247-6.858.246-9.246 1.108-5.144-.124-8.451-3.754-11.451-2.954-2.449-6.711-3.122-10.834-3.122-1.539 0-2.954-.673-4.001-1.224-1.724-.856-3.139-3-1.785-5.634.432-.856 2.525-2.939 3.018-3.305 5.6-3.185 12.065-2.144 18.034.244 5.54 2.266 9.727 6.429 15.759 12.307 6.155 7.102 7.263 9.063 10.773 14.39 2.771 4.163 5.294 8.451 7.018 13.348.877 2.561.071 4.74-2.341 6.277-.981.625-2.109 1.044-3.191 1.458z"/></svg>
);


const BootstrapLogo = () => (
  <svg viewBox="0 0 16 16" fill="#7952b3"><path d="M6.375 7.125V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .746-.594 1.23-1.564 1.23h-1.758zm0 3.706V8.144h1.954c1.117 0 1.745.527 1.745 1.356 0 .88-.708 1.331-1.826 1.331h-1.873z"/><path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12V3.545h3.399c1.587 0 2.544.808 2.544 2.043 0 .996-.65 1.648-1.566 1.81v.063c1.226.164 1.954.912 1.954 1.996 0 1.385-1.117 2.543-3.113 2.543H5.062z"/></svg>
);

const NextLogo = () => (
  <svg viewBox="0 0 128 128" fill="#000000"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9l-49-62.8v38.8h-7.8V42.6h7.1l48.2 61.8c5.4-8.8 8.6-19.2 8.6-30.4C102 28.7 73.3 0 64 0zm20.8 77.4V42.6h-7.8v34.8h7.8z"/></svg>
);

const ReactLogo = () => (
    <svg viewBox="-11.5 -10.232 23 20.463"><circle r="2.05" fill="#61dafb"/><g fill="none" stroke="#61dafb"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
)

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" fill="#38B2AC"><path d="M12 6.036c-2.287 0-3.431 1.144-3.431 3.432 0 2.287 1.144 3.431 3.431 3.431 2.288 0 3.432-1.144 3.432-3.431 0-2.288-1.144-3.432-3.432-3.432zm-6.857 6.857c-2.287 0-3.431 1.144-3.431 3.431 0 2.288 1.144 3.432 3.431 3.432 2.288 0 3.432-1.144 3.432-3.432 0-2.287-1.144-3.431-3.432-3.431zM12 0c-3.431 0-5.147 1.716-5.147 5.147 0 3.432 1.716 5.148 5.147 5.148 3.432 0 5.148-1.716 5.148-5.148C17.148 1.716 15.432 0 12 0zm6.857 6.857c-3.431 0-5.147 1.716-5.147 5.147 0 3.432 1.716 5.148 5.147 5.148 3.432 0 5.148-1.716 5.148-5.148 0-3.431-1.716-5.147-5.148-5.147z"/></svg>
)

const GrokLogo = () => (
  <svg viewBox="0 0 24 24" fill="#000000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
)

const LlamaLogo = () => (
  <svg viewBox="0 0 24 24" fill="#0668E1"><path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm-3.5 16.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm7 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"/></svg>
)

const MistralLogo = () => (
  <svg viewBox="0 0 24 24" fill="#FF7000"><path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 4.6l6.6 3.8v7.2L12 19.4l-6.6-3.8V8.4L12 4.6z"/></svg>
)

const logosArr = [GeminiLogo, OpenAILogo, ClaudeLogo, DeepSeekLogo, GrokLogo, LlamaLogo, MistralLogo, PerplexityLogo];
const logoNamesArr = ["Gemini", "ChatGPT", "Claude", "DeepSeek", "Grok", "Llama", "Mistral", "Perplexity"];

const VercelLogo = () => (
  <svg viewBox="0 0 128 128" fill="currentColor"><path d="M64 12.5L128 122.5H0L64 12.5Z"/></svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13.983 11.078h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM11.221 11.078h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM11.221 8.315h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM8.458 11.078h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM8.458 8.315h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM5.695 11.078h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM2.932 11.078h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM8.458 5.553h2.119c.102 0 .186.084.186.186v2.119c0 .102-.084.186-.186.186h-2.119a.186.186 0 0 1-.186-.186v-2.119c0-.102.084-.186.186-.186zM23.99 12.39c-.524-.315-1.123-.194-1.637-.101-1.385.253-2.737.756-3.951 1.487a9.231 9.231 0 0 0-4.048-1.503c-.015-.008-.031-.016-.046-.024H2.07c-.12.001-.225.074-.265.188a.301.301 0 0 0 .102.327c.433.315.861.642 1.282.98.083.066.113.176.074.275a5.553 5.553 0 0 1-.531 1.05c-.173.275-.333.56-.477.854a.276.276 0 0 0 .002.26.275.275 0 0 0 .235.143h15.932c.11 0 .214-.055.275-.147a11.134 11.134 0 0 0 1.258-3.09c.27-.03.541-.059.814-.087.674-.069 1.439-.148 2.016.14a.267.267 0 0 0 .332-.07c.365-.469.758-.916 1.173-1.341a.273.273 0 0 0-.166-.445z"/></svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" fill="#3776AB"><path d="M14.25.18l.9.2.73.28.59.35.45.45.34.54.23.63.1.72v1.54l-.06.28-.13.24-.21.19-.24.12-.3.05h-1.65l-.34.05-.28.1-.2.15-.14.22-.1.25-.03.35v1.27l.02.2.08.15.13.13.15.06h.31l.4.02h.4l.43.02.43.03.46.06.45.1.44.13.4.18.36.24.28.32.22.41.13.51.05.62V19.3l-.01.55-.07.48-.13.44-.2.4-.28.35-.35.28-.4.22-.48.14-.54.08-.6.02H9.27l-.65-.02-.55-.08-.5-.14-.4-.22-.35-.28-.28-.35-.2-.4-.14-.44-.06-.48-.02-.55v-1.55l.06-.3.13-.23.2-.18.25-.11.3-.06h5.45l.34-.05.28-.1.2-.15.14-.23.1-.25.03-.34V15.3l-.03-.35-.09-.27-.14-.22-.2-.14-.27-.1h-5.46l-.32-.01-.32-.03-.36-.06-.34-.1-.32-.15-.28-.2-.23-.29-.16-.36-.1-.44-.04-.54V8.42l.01-.54.06-.47.12-.44.2-.4.27-.35.36-.28.4-.22.47-.14.54-.08.6-.02h1.66l.3-.06.25-.11.2-.18.13-.23.06-.3V5.15l-.03-.35-.1-.25-.14-.22-.2-.15-.28-.1-.34-.05H7.75l-.3-.02H6.4l-.4-.05-.36-.1-.32-.14-.27-.21-.2-.28-.14-.35-.09-.43-.03-.5V.9l.02-.32.07-.3.13-.28.2-.24.3-.2.35-.14.43-.07.5-.02h5.5l.34.02zm-3.01 1.63a.81.81 0 0 0-.42.12.8.8 0 0 0-.3.35.79.79 0 0 0-.1.42c0 .15.03.29.1.41.07.13.18.21.3.26.13.05.27.08.42.08.15 0 .29-.02.42-.08.12-.05.22-.13.3-.26.07-.12.1-.26.1-.41 0-.15-.03-.29-.1-.42a.8.8 0 0 0-.3-.35.81.81 0 0 0-.42-.12zm3 18.06a.81.81 0 0 0-.42.12.8.8 0 0 0-.3.35.79.79 0 0 0-.1.42c0 .15.03.29.1.41.06.13.18.21.3.26.13.05.27.08.42.08.15 0 .29-.02.42-.08.12-.05.22-.13.3-.26.07-.12.1-.26.1-.41 0-.15-.03-.29-.1-.42a.8.8 0 0 0-.3-.35.81.81 0 0 0-.42-.12z"/></svg>
);

const NodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="#339933"><path d="M12 0L1.44 6.13v12.26L12 24l10.56-6.13V6.13L12 0zm-1.12 18.23l-3.32-1.92V12.7l3.32 1.92v3.61zm0-5.74L7.56 10.57v3.61l3.32 1.92v-3.61zm5.73 3.82l-3.32 1.92V12.7l3.32 1.92v3.61zm0-5.74l-3.32 1.92V6.99l3.32-1.92v3.61z"/></svg>
);

const RedisLogo = () => (
  <svg viewBox="0 0 24 24" fill="#DC382D"><path d="M12 0C5.372 0 0 1.636 0 3.654v16.692C0 22.364 5.372 24 12 24s12-1.636 12-3.654V3.654C24 1.636 18.628 0 12 0zm0 2c5.522 0 10 1.122 10 2.5s-4.478 2.5-10 2.5-10-1.122-10-2.5S6.478 2 12 2zm0 2c5.522 0 10 1.122 10 2.5s-4.478 2.5-10 2.5-10-1.122-10-2.5S6.478 2 12 2z"/></svg>
);

const MySqlLogo = () => (
    <svg viewBox="0 0 24 24" fill="#4479A1"><path d="M12 24c-6.627 0-12-1.79-12-4s5.373-4 12-4 12 1.79 12 4-5.373 4-12 4zm0-6c-6.627 0-12-1.79-12-4s5.373-4 12-4 12 1.79 12 4-5.373 4-12 4zm0-6c-6.627 0-12-1.79-12-4s5.373-4 12-4 12 1.79 12 4-5.373 4-12 4zm0-6c-6.627 0-12-1.79-12-4S5.373 0 12 0s12 1.79 12 4-5.373 4-12 4z"/></svg>
);

const MongoLogo = () => (
  <svg viewBox="0 0 24 24" fill="#47A248"><path d="M17.193 11.11c-.131-4.707-1.954-7.447-4.634-11.11a.341.341 0 0 0-.559 0c-2.478 3.511-4.469 6.273-4.634 11.11-.115 3.376.754 5.922 2.308 7.564v2.793a.311.311 0 0 0 .524.223l1.196-1.168c.321.055.65.084.98.084 3.03 0 4.934-4.887 4.819-9.498zM12 17.51a5.64 5.64 0 0 1-.98-.083l.019-.019v-9.664c0-.188.16-.341.354-.341a.345.345 0 0 1 .374.341v9.646l.233.227v-.108z"/></svg>
);

const logos = logosArr;
const logoNames = logoNamesArr;

