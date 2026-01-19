import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-9xl font-montserrat font-black tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-montserrat font-bold tracking-tight">
          PAGE NOT FOUND
        </h2>
        <p className="text-xl text-white/60 font-inter max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-background px-8 py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white/90 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
