'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BrandPreloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter using pure timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-zinc-900 select-none overflow-hidden"
        >
          {/* Subtle light background radial */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,244,245,0.8),rgba(255,255,255,1))]" />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Top location tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-600"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              Samalkha Flagship • 2026
            </motion.div>

            {/* Brand Logo & Name */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="flex items-center justify-center gap-2 text-5xl sm:text-7xl font-black tracking-tighter text-black"
            >
              <span>BRAND</span>
              <span className="inline-flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-black text-white text-4xl sm:text-6xl font-black shadow-xl">
                X
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-zinc-500"
            >
              Luxury Streetwear & Heavyweight Drip
            </motion.p>

            {/* Progress Bar & Number */}
            <div className="mt-8 w-48 sm:w-60 flex flex-col items-center gap-2">
              <div className="w-full flex justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <span>Loading Store</span>
                <span className="font-bold text-black">{progress}%</span>
              </div>
              <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/60">
                <motion.div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
            NH-1 • Panipat • Haryana
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
