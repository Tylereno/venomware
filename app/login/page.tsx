'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

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
      router.replace('/');
    }
  }, [status, router]);

  const handleCredentialsAuth = async (mode: 'login' | 'register') => {

    if (!availableProviders.includes('credentials')) {
      setEmailStatus('Email/password sign-in is currently unavailable.');
      return;
    }

    if (!email.trim()) {
      setEmailStatus('Enter your email address to continue.');
      return;
    }

    if (password.length < 6) {
      setEmailStatus('Password must be at least 6 characters.');
      return;
    }

    setIsSubmittingEmail(true);
    setEmailStatus(null);

    const response = await signIn('credentials', {
      email: email.trim(),
      password,
      callbackUrl: '/',
      redirect: false,
    });

    if (response?.error) {
      setEmailStatus('Login failed. Check your email/password and try again.');
    } else if (response?.ok) {
      setEmailStatus(
        mode === 'register'
          ? 'Account ready — redirecting...'
          : 'Login successful — redirecting...'
      );
      router.replace('/');
    } else {
      setEmailStatus('Could not complete login. Please try again.');
    }

    setIsSubmittingEmail(false);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto border border-roseGold/25 bg-background/60 backdrop-blur-glass p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-montserrat font-black tracking-tight glow-rose">
            SIGN IN
          </h1>
          <p className="text-white/70 font-inter">
            Continue with your preferred account for a faster checkout.
          </p>
        </div>

        {(availableProviders.includes('google') ||
          availableProviders.includes('facebook') ||
          availableProviders.includes('apple')) && (
          <div className="space-y-3">
            {availableProviders.includes('google') && (
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="w-full py-3 px-4 bg-gradient-to-r from-roseGold to-champagne text-background font-montserrat font-bold tracking-wide hover:opacity-90 transition-opacity"
              >
                Continue with Google
              </button>
            )}

            {availableProviders.includes('facebook') && (
              <button
                onClick={() => signIn('facebook', { callbackUrl: '/' })}
                className="w-full py-3 px-4 border border-roseGold/60 text-roseGold font-montserrat font-bold tracking-wide hover:bg-roseGold hover:text-background transition-colors"
              >
                Continue with Facebook
              </button>
            )}

            {availableProviders.includes('apple') && (
              <button
                onClick={() => signIn('apple', { callbackUrl: '/' })}
                className="w-full py-3 px-4 border border-white/40 text-white font-montserrat font-bold tracking-wide hover:bg-white hover:text-background transition-colors"
              >
                Continue with Apple
              </button>
            )}
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-roseGold/25" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-white/60 tracking-wider">Or with email</span>
          </div>
        </div>

        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            handleCredentialsAuth('login');
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className="w-full bg-background/70 border border-roseGold/25 px-4 py-3 font-inter text-white placeholder:text-white/40 focus:outline-none focus:border-roseGold/60"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            className="w-full bg-background/70 border border-roseGold/25 px-4 py-3 font-inter text-white placeholder:text-white/40 focus:outline-none focus:border-roseGold/60"
          />
          <button
            type="submit"
            disabled={!availableProviders.includes('credentials') || isSubmittingEmail}
            className="w-full py-3 px-4 bg-gradient-to-r from-roseGold to-champagne text-background font-montserrat font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmittingEmail ? 'Processing...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => handleCredentialsAuth('register')}
            disabled={!availableProviders.includes('credentials') || isSubmittingEmail}
            className="w-full py-3 px-4 border border-roseGold/60 text-roseGold font-montserrat font-bold tracking-wide hover:bg-roseGold hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-roseGold"
          >
            {isSubmittingEmail ? 'Processing...' : 'Register'}
          </button>
        </form>

        {emailStatus && (
          <p className="text-center text-xs text-champagne font-inter">{emailStatus}</p>
        )}

        <p className="text-center text-sm text-white/60 font-inter">
          Secure checkout and order emails are handled by Shopify.
        </p>

        {availableProviders.length === 0 && (
          <p className="text-center text-xs text-roseGold/90 font-inter">
            Configure OAuth credentials in .env.local to enable social login.
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
