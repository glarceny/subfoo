/* by Stenly */
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stenly.org'),
  title: {
    default: 'Stenly API - Infrastructure Data Engine',
    template: '%s | Stenly API'
  },
  description: 'Platform API Infrastructure oleh Stenly. Menyediakan akses API untuk DeepSeek, Perplexity Research, Media Downloader, dan Cloud Hosting Services dalam satu ekosistem yang stabil.',
  keywords: ['Stenly API', 'Stenly Data Engine', 'DeepSeek R1 API', 'Perplexity Pro API', 'AI Researcher API', 'YouTube MP3 Downloader API', 'Direct Link Uploader', 'API Indonesia', 'Developer Infrastructure'],
  authors: [{ name: 'Stenly', url: 'https://stenly.org' }],
  creator: 'Stenly',
  publisher: 'Stenly API',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://stenly.org',
  },
  openGraph: {
    title: 'Stenly API - Infrastructure Data Engine',
    description: 'Akses API AI, Media Downloader, & Cloud Hosting yang stabil dan cepat.',
    url: 'https://stenly.org',
    siteName: 'Stenly API',
    images: [
      {
        url: 'https://files.catbox.moe/i506rh.jpeg',
        width: 1200,
        height: 630,
        alt: 'Stenly API Branding Image',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stenly API - Infrastructure Data Engine',
    description: 'Platform API dengan performa serverless global. AI, Downloader, & Cloud Hosting.',
    creator: '@stenly',
    images: ['https://files.catbox.moe/i506rh.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
