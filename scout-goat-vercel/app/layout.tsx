import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

const brand = {
  name: 'Scout Goat Services',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(251) 289-0478',
  city: process.env.NEXT_PUBLIC_CITY || 'Mobile, AL',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://scoutgoatservices.com'
};

export const metadata: Metadata = {
  title: {
    default: 'Scout Goat — Junk Removal, Cleaning & Pressure Washing (Mobile, AL)',
    template: '%s | Scout Goat'
  },
  description:
    'Fast, friendly junk removal, house cleaning, and pressure washing in Mobile, AL. Same/next-day slots when available. Photo-based quotes. Simple scheduling.',
  metadataBase: new URL(brand.domain),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Scout Goat — Junk Removal • House Cleaning • Pressure Washing',
    description:
      'Same/next-day service, honest pricing, and fast photo quotes. Get an instant estimate or send photos for an accurate price.',
    url: brand.domain,
    siteName: brand.name,
    type: 'website',
    images: [
      { url: '/og.png', width: 1200, height: 630, alt: 'Scout Goat Services' }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scout Goat — Mobile, AL',
    description: 'Fast photo quotes for junk removal, cleaning, and pressure washing.',
    images: ['/og.png']
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-premium">{children}</body>
    </html>
  );
}
