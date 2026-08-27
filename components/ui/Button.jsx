'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl overflow-hidden cursor-pointer select-none';

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
    icon: 'p-2.5 w-10 h-10',
  };

  const variants = {
    primary:
      'bg-black text-white hover:bg-zinc-800 shadow-sm hover:shadow-md border border-black',
    amber:
      'bg-amber-400 text-black hover:bg-amber-300 shadow-sm border border-amber-500/30',
    secondary:
      'bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200/70',
    glass:
      'bg-white/80 hover:bg-white text-zinc-900 border border-zinc-200 shadow-sm hover:shadow',
    outline:
      'border border-zinc-300 hover:border-black text-zinc-800 hover:text-black bg-transparent',
    ghost:
      'bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100',
    danger:
      'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 1 }}
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </motion.button>
  );
}
