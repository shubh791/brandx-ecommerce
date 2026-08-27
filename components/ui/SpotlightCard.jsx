'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function SpotlightCard({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-zinc-200/90 bg-white p-6 transition-all duration-200 hover:border-zinc-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
