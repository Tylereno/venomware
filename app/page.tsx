import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center border-b border-roseGold/20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="mx-auto h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] w-full max-w-[1200px] overflow-hidden">
            <Image
              src="/images/venomwear-logo-transparent.png"
              alt="VenomWear"
              width={1800}
              height={940}
              priority
              className="w-full h-full object-contain scale-[3] drop-shadow-[0_0_24px_rgba(196,132,142,0.4)]"
            />
          </div>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-inter">
            Handcrafted exotic dancewear and rave outfits designed to make you unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/shop/exotic"
              className="group bg-gradient-to-r from-roseGold to-champagne text-background px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_22px_rgba(196,132,142,0.35)]"
            >
              SHOP EXOTIC
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/custom"
              className="group border-2 border-roseGold/60 text-roseGold px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-roseGold hover:text-background transition-all flex items-center gap-2"
            >
              CUSTOM ORDER
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-roseGold/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-champagne/6 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black tracking-tight mb-4 glow-rose">
              FEATURED PIECES
            </h2>
            <p className="text-white/60 text-lg font-inter">
              Explore our most popular handcrafted designs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop/exotic"
              className="inline-block border-2 border-roseGold/60 text-roseGold px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-roseGold hover:text-background transition-all"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 border-t border-roseGold/20 bg-roseGold/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black tracking-tight glow-champagne">
              SHOP BY CATEGORY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'EXOTIC DANCEWEAR', href: '/shop/exotic', desc: 'Premium bikinis, bodysuits & micro sets' },
              { title: 'RAVE WEAR', href: '/shop/rave', desc: 'Festival-ready tops & statement pieces' },
              { title: 'ACCESSORIES', href: '/shop/accessories', desc: 'Complete your look with style' },
            ].map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group border border-roseGold/25 p-8 hover:border-roseGold/55 hover:shadow-[0_0_20px_rgba(196,132,142,0.1)] transition-all hover:bg-roseGold/[0.04]"
              >
                <h3 className="text-2xl font-montserrat font-black mb-2">
                  {category.title}
                </h3>
                <p className="text-white/60 font-inter mb-4">
                  {category.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-inter uppercase tracking-wider text-roseGold/80 group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border-2 border-roseGold/30 p-12 space-y-6 shadow-[0_0_40px_rgba(196,132,142,0.08)]">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black tracking-tight glow-rose">
              CUSTOM COMMISSIONS
            </h2>
            <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
              Have a unique vision? Let's create something extraordinary together. 
              Each custom piece is handcrafted to your exact specifications.
            </p>
            <Link
              href="/custom"
              className="inline-block bg-gradient-to-r from-roseGold to-champagne text-background px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:opacity-90 transition-all shadow-[0_0_22px_rgba(196,132,142,0.35)]"
            >
              START YOUR CUSTOM ORDER
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
