'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle } from 'lucide-react';
import { submitCustomOrderRequest } from '@/lib/actions';

type CustomOrderForm = {
  name: string;
  email: string;
  phone?: string;
  vision: string;
};

export default function CustomOrderPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomOrderForm>();

  const onSubmit = async (data: CustomOrderForm) => {
    setSubmitError(null);

    try {
      await submitCustomOrderRequest(data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit right now. Please try again shortly.'
      );
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-montserrat font-black tracking-tight">
            CUSTOM COMMISSIONS
          </h1>
          <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
            Bring your vision to life. Each custom piece is handcrafted specifically for you.
          </p>
          <div className="h-1 w-24 bg-white mx-auto" />
        </div>

        {/* Info Section */}
        <div className="border border-white/20 p-8 mb-8 bg-white/5">
          <h2 className="text-2xl font-montserrat font-bold mb-4">How It Works</h2>
          <ol className="space-y-3 font-inter text-white/80">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>Submit your vision below with as much detail as possible</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>I'll review your request and reach out within 24-48 hours</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <span>We'll discuss materials, colors, pricing, and timeline</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">4.</span>
              <span>Once approved, I'll create your unique piece (typically 1-3 weeks)</span>
            </li>
          </ol>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border border-white/20 p-8 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-montserrat font-bold uppercase tracking-wider mb-2">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white transition-colors font-inter"
                placeholder="Jane Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-montserrat font-bold uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white transition-colors font-inter"
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-montserrat font-bold uppercase tracking-wider mb-2">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white transition-colors font-inter"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Vision/Description */}
            <div>
              <label htmlFor="vision" className="block text-sm font-montserrat font-bold uppercase tracking-wider mb-2">
                Describe Your Vision *
              </label>
              <textarea
                id="vision"
                {...register('vision', {
                  required: 'Please describe your vision',
                  minLength: {
                    value: 20,
                    message: 'Please provide at least 20 characters of detail',
                  },
                })}
                rows={8}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white transition-colors font-inter resize-none"
                placeholder="Example: I want an orange and gray alien-themed micro bikini set with holographic trim. I love neon accents and want something that will glow under blacklight..."
              />
              {errors.vision && (
                <p className="text-red-500 text-sm mt-1">{errors.vision.message}</p>
              )}
              <p className="text-white/40 text-xs mt-2 font-inter">
                Include: colors, materials, style preferences, inspiration, budget range, etc.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-background py-4 font-montserrat font-black text-lg tracking-wider hover:bg-white/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                SUBMITTING...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                SUBMIT CUSTOM ORDER REQUEST
              </>
            )}
          </button>
          {submitError && (
            <p className="text-sm text-red-400 text-center font-inter">{submitError}</p>
          )}
        </form>

        {/* Success Message */}
        {isSubmitted && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 flex items-center gap-3 shadow-lg animate-in slide-in-from-bottom">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-montserrat font-bold">Request Submitted!</p>
              <p className="text-sm">I'll be in touch soon.</p>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 border-t border-white/20 pt-8 space-y-6">
          <h3 className="text-2xl font-montserrat font-bold">Custom Order Pricing</h3>
          <div className="grid md:grid-cols-2 gap-6 font-inter text-white/80">
            <div>
              <h4 className="font-bold text-white mb-2">Standard Pieces</h4>
              <ul className="space-y-1 text-sm">
                <li>• Bikini Sets: Starting at $85</li>
                <li>• Micro Sets: Starting at $95</li>
                <li>• Bodysuits: Starting at $120</li>
                <li>• Tops: Starting at $45</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Premium Add-Ons</h4>
              <ul className="space-y-1 text-sm">
                <li>• Rhinestone Details: +$15-30</li>
                <li>• Beaded Trim: +$10-20</li>
                <li>• Special Materials: Varies</li>
                <li>• Rush Orders: +$25</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-white/60 italic">
            Final pricing depends on materials and complexity. I'll provide a detailed quote before starting.
          </p>
        </div>
      </div>
    </div>
  );
}
