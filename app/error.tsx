'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-4 max-w-md">
        <h1 className="text-6xl font-montserrat font-black tracking-tight">
          SOMETHING WENT WRONG
        </h1>
        <p className="text-xl text-white/60 font-inter">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-white text-background px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white/90 transition-all"
          >
            TRY AGAIN
          </button>
          <Link
            href="/"
            className="border-2 border-white px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white hover:text-background transition-all"
          >
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
