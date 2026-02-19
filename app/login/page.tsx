'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const response = await fetch('/api/auth/providers');
        if (!response.ok) {
          return;
        }

        const providers = (await response.json()) as Record<string, { id: string }>;
        setAvailableProviders(Object.keys(providers));
      } catch {
        setAvailableProviders([]);
      }
    };

    loadProviders();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/account');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto border border-roseGold/25 bg-background/60 backdrop-blur-glass p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-montserrat font-black tracking-tight glow-rose">
            SIGN IN
          </h1>
          <p className="text-white/70 font-inter">
            Continue with your preferred account to access profile and shopping history.
          </p>
        </div>

        <div className="space-y-3">
          <button
            disabled={!availableProviders.includes('google')}
            onClick={() => signIn('google', { callbackUrl: '/account' })}
            className="w-full py-3 px-4 bg-gradient-to-r from-roseGold to-champagne text-background font-montserrat font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {availableProviders.includes('google') ? 'Continue with Google' : 'Google login unavailable'}
          </button>
          <button
            disabled={!availableProviders.includes('facebook')}
            onClick={() => signIn('facebook', { callbackUrl: '/account' })}
            className="w-full py-3 px-4 border border-roseGold/60 text-roseGold font-montserrat font-bold tracking-wide hover:bg-roseGold hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-roseGold"
          >
            {availableProviders.includes('facebook')
              ? 'Continue with Facebook'
              : 'Facebook login unavailable'}
          </button>
        </div>

        <p className="text-center text-sm text-white/60 font-inter">
          By signing in, you can track your checkout history on your profile.
        </p>

        {availableProviders.length === 0 && (
          <p className="text-center text-xs text-roseGold/90 font-inter">
            Configure Google/Facebook credentials in .env.local to enable social login.
          </p>
        )}

        <div className="text-center">
          <Link href="/" className="text-champagne hover:text-roseGold transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
