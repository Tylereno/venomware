'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const currentImage = product.images[0];

  const isSoldOut = product.status === 'sold_out';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSoldOut) {
      addItem(product);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="group relative border border-white/20 bg-background overflow-hidden cursor-pointer transition-all hover:border-roseGold/50 hover:shadow-[0_0_22px_rgba(196,132,142,0.12)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
          <Image
            src={currentImage}
            alt={`${product.name} - ${product.variant}`}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Sold Out Badge */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-2xl font-montserrat font-black tracking-wider border-2 border-white px-6 py-3">
                SOLD OUT
              </span>
            </div>
          )}

          {/* Add to Cart Button - appears on hover */}
          {!isSoldOut && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-roseGold to-champagne text-background px-6 py-3 font-inter font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:opacity-90"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-montserrat font-bold text-lg tracking-tight">
            {product.name}
          </h3>
          <p className="text-sm text-white/60 font-inter">
            {product.variant}
          </p>
          <p className="text-xl font-inter font-bold">
            {formatPrice(product.price)}
          </p>
          
          {product.status === 'limited' && (
            <span className="inline-block text-xs uppercase tracking-wider border border-white/40 px-2 py-1 text-white/80">
              Limited Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
