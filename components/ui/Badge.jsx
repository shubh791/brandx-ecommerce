'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ children, variant = 'cyan', className = '' }) {
  const variants = {
    cyan: 'bg-sky-50 text-sky-900 border-sky-200/80',
    amber: 'bg-amber-50 text-amber-900 border-amber-200/80',
    purple: 'bg-purple-50 text-purple-900 border-purple-200/80',
    green: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
    dark: 'bg-zinc-900 text-white border-zinc-800',
    glass: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border font-bold transition-all duration-200',
        variants[variant] || variants.cyan,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
