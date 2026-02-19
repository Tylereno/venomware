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
      router.replace('/account');
    }
  }, [status, router]);

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!availableProviders.includes('email')) {
      setEmailStatus('Email sign-in is unavailable until SMTP is configured.');
      return;
    }

    if (!email.trim()) {
      setEmailStatus('Enter your email address to continue.');
      return;
    }

    setIsSubmittingEmail(true);
    setEmailStatus(null);

    const response = await signIn('email', {
      email: email.trim(),
      callbackUrl: '/account',
      redirect: false,
    });

    if (response?.error) {
      setEmailStatus('Could not send sign-in link. Please try again.');
    } else {
      setEmailStatus('Check your inbox for your secure sign-in link.');
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
          <button
            disabled={!availableProviders.includes('apple')}
            onClick={() => signIn('apple', { callbackUrl: '/account' })}
            className="w-full py-3 px-4 border border-white/40 text-white font-montserrat font-bold tracking-wide hover:bg-white hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
          >
            {availableProviders.includes('apple') ? 'Continue with Apple' : 'Apple login unavailable'}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-roseGold/25" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-white/60 tracking-wider">Or with email</span>
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleEmailSignIn}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className="w-full bg-background/70 border border-roseGold/25 px-4 py-3 font-inter text-white placeholder:text-white/40 focus:outline-none focus:border-roseGold/60"
          />
          <button
            type="submit"
            disabled={!availableProviders.includes('email') || isSubmittingEmail}
            className="w-full py-3 px-4 bg-gradient-to-r from-roseGold to-champagne text-background font-montserrat font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmittingEmail ? 'Sending link...' : 'Login / Register with Email'}
          </button>
        </form>

        {emailStatus && (
          <p className="text-center text-xs text-champagne font-inter">{emailStatus}</p>
        )}

        <p className="text-center text-sm text-white/60 font-inter">
          By signing in, you can track your checkout history on your profile.
        </p>

        {availableProviders.length === 0 && (
          <p className="text-center text-xs text-roseGold/90 font-inter">
            Configure OAuth/SMTP credentials in .env.local to enable social login and email registration.
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
