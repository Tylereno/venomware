'use client';

import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { createCheckout } from '@/lib/actions';
import { X, Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function CartDrawer() {
  const { 
    isOpen, 
    toggleCart, 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice 
  } = useCartStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckoutError(null);

    // Ensure every item has a Shopify variant ID before proceeding
    const missingVariant = items.find((item) => !item.shopifyVariantId);
    if (missingVariant) {
      setCheckoutError(
        'Checkout is not available yet — Shopify store not connected.'
      );
      return;
    }

    setIsCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        merchandiseId: item.shopifyVariantId,
        quantity: item.quantity,
      }));
      const checkoutUrl = await createCheckout(lineItems);

      window.location.href = checkoutUrl;
    } catch (err) {
      setCheckoutError(
        err instanceof Error ? err.message : 'Checkout failed. Please try again.'
      );
      setIsCheckingOut(false);
    }
  };

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
            aria-label="Close cart"
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
                    className="object-cover"
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
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-inter">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white/10 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-500/20 text-red-500 transition-colors"
                      aria-label="Remove item"
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
            {checkoutError && (
              <p className="text-sm text-red-400 font-inter text-center">
                {checkoutError}
              </p>
            )}
            <a
              href="https://instagram.com/venomwear"
              target="_blank"
              rel="noreferrer noopener"
              className="block text-center text-xs text-champagne hover:text-roseGold transition-colors font-inter"
            >
              Keep up with new drops on Instagram ↗
            </a>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-white text-background py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  REDIRECTING...
                </>
              ) : (
                'CHECKOUT'
              )}
            </button>
            <p className="text-xs text-center text-white/60 font-inter">
              Secure checkout powered by Shopify
            </p>
          </div>
        )}
      </div>
    </>
  );
}
