'use client';

import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export function CartDrawer() {
  const { 
    isOpen, 
    toggleCart, 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice 
  } = useCartStore();

  if (!isOpen) return null;

  const total = getTotalPrice();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-white/20 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-montserrat font-black">YOUR CART</h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <p className="font-inter">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border border-white/20 bg-white/5"
              >
                <div className="relative w-24 h-32 flex-shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover grayscale"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-montserrat font-bold">{item.name}</h3>
                    <p className="text-sm text-white/60">{item.variant}</p>
                    <p className="text-lg font-bold mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-white/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-inter">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-500/20 text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/20 p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-montserrat font-bold">
              <span>TOTAL</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="w-full bg-white text-background py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white/90 transition-colors">
              CHECKOUT
            </button>
            <p className="text-xs text-center text-white/60 font-inter">
              Secure checkout powered by Stripe
            </p>
          </div>
        )}
      </div>
    </>
  );
}
