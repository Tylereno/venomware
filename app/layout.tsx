import { Inter, Montserrat } from 'next/font/google';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VenomWear | Handmade Exotic & Rave Wear',
  description: 'Premium handcrafted exotic dancewear and rave outfits. Each piece is uniquely designed and made with high-quality materials.',
  keywords: ['exotic wear', 'rave wear', 'dancewear', 'festival clothing', 'handmade', 'custom outfits'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-background text-foreground font-inter antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-roseGold/20 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-montserrat font-black tracking-tight glow-champagne">
                VENOMWEAR
              </h2>
              <p className="text-white/60 text-sm">
                Handcrafted with precision. Designed to captivate.
              </p>
              <div className="shimmer-divider w-48 mx-auto" />
              <p className="text-white/40 text-xs">
                © 2026 VenomWear. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
