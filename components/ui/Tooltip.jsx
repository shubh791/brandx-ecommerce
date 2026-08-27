'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Tooltip({ children, text, position = 'bottom', className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 3 : -3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 3 : -3 }}
            transition={{ duration: 0.12 }}
            className={cn(
              'absolute z-50 pointer-events-none whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1 text-[11px] font-mono font-medium text-white shadow-lg',
              positionStyles[position]
            )}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
