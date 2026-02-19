import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { getAllProducts } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function HomePage() {
  const products = await getAllProducts();
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center border-b border-white/20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-montserrat font-black tracking-tighter leading-none">
            OWN THE
            <br />
            NIGHT
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-inter">
            Handcrafted exotic dancewear and rave outfits designed to make you unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/shop/exotic"
              className="group bg-white text-background px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white/90 transition-all flex items-center gap-2"
            >
              SHOP EXOTIC
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/custom"
              className="group border-2 border-white px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white hover:text-background transition-all flex items-center gap-2"
            >
              CUSTOM ORDER
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black tracking-tight mb-4">
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
              className="inline-block border-2 border-white px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white hover:text-background transition-all"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 border-t border-white/20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black tracking-tight">
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
                className="group border border-white/20 p-8 hover:border-white/40 transition-all hover:bg-white/5"
              >
                <h3 className="text-2xl font-montserrat font-black mb-2">
                  {category.title}
                </h3>
                <p className="text-white/60 font-inter mb-4">
                  {category.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-inter uppercase tracking-wider group-hover:gap-3 transition-all">
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
          <div className="border-2 border-white/20 p-12 space-y-6">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black tracking-tight">
              CUSTOM COMMISSIONS
            </h2>
            <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
              Have a unique vision? Let's create something extraordinary together. 
              Each custom piece is handcrafted to your exact specifications.
            </p>
            <Link
              href="/custom"
              className="inline-block bg-white text-background px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white/90 transition-all"
            >
              START YOUR CUSTOM ORDER
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
