'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, Send } from 'lucide-react';
import { submitSupportRequest } from '@/lib/actions';

type SupportForm = {
  name: string;
  email: string;
  orderNumber?: string;
  issueType: string;
  details: string;
};

export default function SupportPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupportForm>();

  const onSubmit = async (data: SupportForm) => {
    setSubmitError(null);

    try {
      await submitSupportRequest(data);
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
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-montserrat font-black tracking-tight glow-rose">
            SUPPORT & ALTERATIONS
          </h1>
          <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
            Need a repair, replacement, or alteration? Submit your request below and we will help you directly.
          </p>
          <div className="shimmer-divider w-40 mx-auto" />
        </div>

        <div className="border border-roseGold/25 p-8 mb-8 bg-roseGold/[0.03] space-y-3">
          <h2 className="text-2xl font-montserrat font-black">Hygiene + Support Policy</h2>
          <p className="text-white/80 font-inter">
            Due to hygiene standards, returns and refunds are generally limited. If there is an issue with your item,
            please use this form so we can review support options and alterations.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border border-white/20 p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-montserrat font-black uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-roseGold transition-colors font-inter"
                placeholder="Jane Doe"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-montserrat font-black uppercase tracking-wider mb-2">
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
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-roseGold transition-colors font-inter"
                placeholder="jane@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="orderNumber" className="block text-sm font-montserrat font-black uppercase tracking-wider mb-2">
                Order Number (Optional)
              </label>
              <input
                id="orderNumber"
                type="text"
                {...register('orderNumber')}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-roseGold transition-colors font-inter"
                placeholder="#VW-1234"
              />
            </div>

            <div>
              <label htmlFor="issueType" className="block text-sm font-montserrat font-black uppercase tracking-wider mb-2">
                Request Type *
              </label>
              <select
                id="issueType"
                {...register('issueType', { required: 'Please select a request type' })}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-roseGold transition-colors font-inter"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Repair">Repair</option>
                <option value="Replacement">Replacement</option>
                <option value="Alteration">Alteration</option>
                <option value="Other">Other Support</option>
              </select>
              {errors.issueType && <p className="text-red-400 text-sm mt-1">{errors.issueType.message}</p>}
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-montserrat font-black uppercase tracking-wider mb-2">
                Issue Details *
              </label>
              <textarea
                id="details"
                rows={7}
                {...register('details', {
                  required: 'Please describe the issue',
                  minLength: {
                    value: 20,
                    message: 'Please provide at least 20 characters of detail',
                  },
                })}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-roseGold transition-colors font-inter resize-none"
                placeholder="Tell us what happened, when it happened, and what help you need."
              />
              {errors.details && <p className="text-red-400 text-sm mt-1">{errors.details.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-roseGold to-champagne text-background py-4 font-montserrat font-black text-lg tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                SUBMITTING...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                SUBMIT SUPPORT REQUEST
              </>
            )}
          </button>

          {submitError && <p className="text-sm text-red-400 text-center font-inter">{submitError}</p>}
        </form>

        {isSubmitted && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 flex items-center gap-3 shadow-lg animate-in slide-in-from-bottom">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-montserrat font-bold">Request Submitted!</p>
              <p className="text-sm">We will contact you soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
