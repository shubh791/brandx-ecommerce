'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { faqData } from '@/data/faqData';
import { siteConfig } from '@/data/siteConfig';

export function FaqSection() {
  const [openId, setOpenId] = useState('faq-1');

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 font-bold">
            STORE POLICIES & SIZING
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Details on our fabric weights, size exchanges, and offline store visits in Samalkha.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-zinc-50 transition-colors"
                >
                  <span className="font-bold text-sm text-zinc-950 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-black shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Box */}
        <div className="mt-8 p-6 rounded-2xl border border-zinc-200 bg-white text-center space-y-2.5 shadow-sm">
          <h4 className="text-sm font-bold text-zinc-950">Have questions about a specific size or piece?</h4>
          <p className="text-xs text-zinc-500">
            Our Samalkha store team is available on WhatsApp for direct sizing assistance.
          </p>
          <a
            href={siteConfig.store.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-zinc-800 transition-all shadow-sm mt-1"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
