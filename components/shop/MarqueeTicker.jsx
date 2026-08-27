'use client';

import React from 'react';
import { Flame, Sparkles, Zap, Shield, MapPin } from 'lucide-react';

export function MarqueeTicker() {
  const items = [
    { text: 'OVERSIZED ACID-WASH TEES (260 GSM)', icon: Flame },
    { text: 'HEAVYWEIGHT FRENCH TERRY HOODIES (450 GSM)', icon: Sparkles },
    { text: 'TACTICAL PARACHUTE CARGOS', icon: Zap },
    { text: 'SAMALKHA FLAGSHIP STORE • NH-1', icon: MapPin },
    { text: 'DISTRESSED STACKED SELVEDGE DENIM', icon: Shield },
    { text: 'LIMITED VAULT ARCHIVE DROPS', icon: Flame },
    { text: 'EXPRESS DISPATCH ACROSS INDIA', icon: Zap },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-zinc-100 py-3 border-b border-zinc-200 select-none">
      {/* Edge gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-100 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-100 to-transparent z-10" />

      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider uppercase text-zinc-700"
            >
              <Icon className="w-3.5 h-3.5 text-black shrink-0" />
              <span>{item.text}</span>
              <span className="text-zinc-400">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
