'use client';

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { testimonialsData } from '@/data/testimonialsData';

export function TestimonialsSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 font-bold">
            COMMUNITY & REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
            CUSTOMER REVIEWS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Real feedback from buyers who visited our Samalkha store and ordered online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonialsData.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between p-5 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>

                <p className="text-xs text-zinc-700 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="h-8 w-8 rounded-full object-cover border border-zinc-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">{review.author}</h4>
                  <span className="text-[10px] font-mono text-zinc-500">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
