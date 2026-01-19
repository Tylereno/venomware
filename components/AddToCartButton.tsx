'use client';

import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/store';

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    if (!disabled) {
      addItem(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-full py-4 font-montserrat font-black text-lg tracking-wider flex items-center justify-center gap-3 transition-all ${
        disabled
          ? 'bg-white/20 text-white/40 cursor-not-allowed'
          : 'bg-white text-background hover:bg-white/90'
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {disabled ? 'SOLD OUT' : 'ADD TO CART'}
    </button>
  );
}
