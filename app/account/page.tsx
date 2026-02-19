'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { getOrderHistory, type OrderHistoryEntry } from '@/lib/orderHistory';
import { formatPrice } from '@/lib/utils';

export default function AccountPage() {
  const [history, setHistory] = useState<OrderHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getOrderHistory());
  }, []);

  const totalSpent = useMemo(
    () => history.reduce((sum, order) => sum + order.total, 0),
    [history]
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="border border-roseGold/25 p-6 md:p-8 bg-background/60 backdrop-blur-glass">
          <h1 className="text-4xl font-montserrat font-black tracking-tight glow-rose">RECENT CHECKOUTS</h1>
          <p className="text-white/70 font-inter mt-2">
            Quick access to your recent checkout links.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-roseGold/20 p-5">
            <p className="text-sm text-white/60 uppercase tracking-wider">Saved Checkouts</p>
            <p className="text-3xl font-montserrat font-black glow-champagne">{history.length}</p>
          </div>
          <div className="border border-roseGold/20 p-5">
            <p className="text-sm text-white/60 uppercase tracking-wider">Total Value</p>
            <p className="text-3xl font-montserrat font-black glow-champagne">{formatPrice(totalSpent)}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-montserrat font-black tracking-tight glow-rose">SHOP HISTORY</h2>

          {history.length === 0 ? (
            <div className="border border-roseGold/20 p-6 text-white/70 font-inter">
              No checkout history yet.
            </div>
          ) : (
            history.map((order) => (
              <article key={order.id} className="border border-roseGold/20 p-5 space-y-4 bg-background/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-white/60">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="font-montserrat font-bold text-lg">Checkout #{order.id.slice(-6).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/60">Total</p>
                    <p className="text-xl font-montserrat font-black glow-champagne">{formatPrice(order.total)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={`${order.id}-${item.id}`} className="flex items-center gap-4 border border-roseGold/10 p-3">
                      <div className="relative w-14 h-16 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-montserrat font-bold leading-tight">{item.name}</p>
                        <p className="text-sm text-white/60">{item.variant}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/70">x{item.quantity}</p>
                        <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={order.checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-champagne hover:text-roseGold transition-colors"
                >
                  Open checkout link
                </a>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
