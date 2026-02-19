'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { getOrderHistory, type OrderHistoryEntry } from '@/lib/orderHistory';
import { formatPrice } from '@/lib/utils';
import { getSavedCheckoutEmail, saveCheckoutEmail } from '@/lib/customerPrefs';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState<OrderHistoryEntry[]>([]);
  const [lookupEmail, setLookupEmail] = useState('');
  const [activeEmail, setActiveEmail] = useState('');

  const userEmail = session?.user?.email ?? '';

  useEffect(() => {
    if (userEmail) {
      const normalized = userEmail.trim().toLowerCase();
      setLookupEmail(normalized);
      setActiveEmail(normalized);
      setHistory(getOrderHistory(normalized));
      return;
    }

    const savedEmail = getSavedCheckoutEmail();
    setLookupEmail(savedEmail);
    setActiveEmail(savedEmail);
    setHistory(getOrderHistory(savedEmail));
  }, [userEmail]);

  const handleLookup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = lookupEmail.trim().toLowerCase();
    setActiveEmail(normalizedEmail);
    saveCheckoutEmail(normalizedEmail);
    setHistory(getOrderHistory(normalizedEmail));
  };

  const totalSpent = useMemo(
    () => history.reduce((sum, order) => sum + order.total, 0),
    [history]
  );

  if (status === 'loading') {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white/70 font-inter">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="border border-roseGold/25 p-6 md:p-8 bg-background/60 backdrop-blur-glass space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
            <div className="flex items-center gap-4">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user?.name ?? 'Profile image'}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border border-roseGold/40"
                />
              ) : (
                <div className="w-[72px] h-[72px] rounded-full border border-roseGold/40 flex items-center justify-center text-xl font-montserrat font-black text-roseGold">
                  {(activeEmail?.[0] ?? 'V').toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-4xl font-montserrat font-black tracking-tight glow-rose">ORDER HISTORY</h1>
                <p className="text-lg text-white/80 font-inter">
                  {session?.user?.name ?? 'Lookup by checkout email'}
                </p>
                <p className="text-sm text-white/60 font-inter">
                  {activeEmail || 'Enter your checkout email below'}
                </p>
              </div>
            </div>

            {session && (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-5 py-2 border border-roseGold/60 text-roseGold font-montserrat font-bold tracking-wide hover:bg-roseGold hover:text-background transition-colors"
              >
                Sign out
              </button>
            )}
          </div>

          <form onSubmit={handleLookup} className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-white/60">
              Lookup by checkout email
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={lookupEmail}
                onChange={(event) => setLookupEmail(event.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-background/70 border border-roseGold/25 px-4 py-3 font-inter text-white placeholder:text-white/40 focus:outline-none focus:border-roseGold/60"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-roseGold to-champagne text-background font-montserrat font-bold tracking-wide hover:opacity-90 transition-opacity"
              >
                Load history
              </button>
            </div>
          </form>
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
              No checkout history found for this email on this device yet.
            </div>
          ) : (
            history.map((order) => (
              <article key={order.id} className="border border-roseGold/20 p-5 space-y-4 bg-background/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-white/60">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="font-montserrat font-bold text-lg">Order Snapshot #{order.id.slice(-6).toUpperCase()}</p>
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
