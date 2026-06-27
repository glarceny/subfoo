/* by Stenly */
import { Inter, Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import "../globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function DocsV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} ${jakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-jakarta bg-[#f8f9fa] min-h-screen text-slate-900`}>
      {children}
    </div>
  )
}
