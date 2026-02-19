'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

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
            onClick={() => signIn('google', { callbackUrl: '/account' })}
            className="w-full py-3 px-4 bg-gradient-to-r from-roseGold to-champagne text-background font-montserrat font-bold tracking-wide hover:opacity-90 transition-opacity"
          >
            Continue with Google
          </button>
          <button
            onClick={() => signIn('facebook', { callbackUrl: '/account' })}
            className="w-full py-3 px-4 border border-roseGold/60 text-roseGold font-montserrat font-bold tracking-wide hover:bg-roseGold hover:text-background transition-colors"
          >
            Continue with Facebook
          </button>
        </div>

        <p className="text-center text-sm text-white/60 font-inter">
          By signing in, you can track your checkout history on your profile.
        </p>

        <div className="text-center">
          <Link href="/" className="text-champagne hover:text-roseGold transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
