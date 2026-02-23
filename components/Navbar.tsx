'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { CartDrawer } from './CartDrawer';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const navLinks = [
    { href: '/shop/exotic', label: 'Exotic' },
    { href: '/shop/rave', label: 'Rave' },
    { href: '/shop/accessories', label: 'Accessories' },
    { href: '/custom', label: 'Custom' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/20 backdrop-blur-glass bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/venomwear-logo.jpg"
                alt="VenomWear"
                width={300}
                height={120}
                priority
                className="h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-inter uppercase tracking-wider hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleCart}
                className="relative p-2 hover:bg-white/10 rounded transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-background/95 backdrop-blur-glass">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-inter uppercase tracking-wider hover:text-white/70 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  );
}
