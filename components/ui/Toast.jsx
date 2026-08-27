'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export function Toast() {
  const { toastMessage } = useShop();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-2xl"
        >
          {toastMessage.type === 'success' ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          ) : toastMessage.type === 'error' ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertCircle className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
              <Info className="h-4 w-4" />
            </div>
          )}

          <div className="flex flex-col">
            <span className="font-semibold text-[10px] text-zinc-500 uppercase font-mono tracking-wider">
              Brand X
            </span>
            <span className="text-xs font-semibold text-zinc-900">{toastMessage.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
