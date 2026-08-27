'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LookbookBento() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 font-bold">
              FABRIC SPECIFICATIONS & SILHOUETTES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
              THE 2026 LOOKBOOK
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md">
            Heavyweight combed cotton, stone mineral wash patterns, and utility cargo silhouettes.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Card 1: 450 GSM Heavy French Terry (Large 2 Cols) */}
          <Link
            href="/category/hoodies"
            className="md:col-span-2 relative group rounded-3xl border border-zinc-200 bg-zinc-900 text-white p-6 sm:p-8 overflow-hidden cursor-pointer shadow-md min-h-[340px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                alt="450 GSM Hoodie"
                className="h-full w-full object-cover object-center opacity-45 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-black text-[10px] font-mono font-bold uppercase">
                450 GSM FRENCH TERRY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Architectural Heavyweight Hoodies
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 max-w-md">
                Zero-drawstring double hood. Pure combed loopback cotton that maintains its structured boxy fit.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Hoodies <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono text-zinc-300 font-bold">From ₹2,499</span>
            </div>
          </Link>

          {/* Card 2: Boxy Acid-Wash Tees */}
          <Link
            href="/category/oversized-tees"
            className="relative group rounded-3xl border border-zinc-200 bg-zinc-100 p-6 overflow-hidden cursor-pointer shadow-sm min-h-[340px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                alt="Acid Wash Tee"
                className="h-full w-full object-cover object-center opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-mono font-bold uppercase">
                260 GSM MINERAL
              </span>
              <h3 className="text-xl font-bold text-zinc-950 mt-3">
                Boxy Drop-Shoulder Tees
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                Reinforced high-collar ribbing and hand-crafted stone wash finishes.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Shop Tees <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono text-zinc-600 font-bold">From ₹999</span>
            </div>
          </Link>

          {/* Card 3: Tactical Parachute Cargos */}
          <Link
            href="/category/cargos-denim"
            className="relative group rounded-3xl border border-zinc-200 bg-zinc-100 p-6 overflow-hidden cursor-pointer shadow-sm min-h-[340px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
                alt="Tactical Cargos"
                className="h-full w-full object-cover object-center opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-white text-[10px] font-mono font-bold uppercase">
                WEATHER RESISTANT
              </span>
              <h3 className="text-xl font-bold text-zinc-950 mt-3">
                Tactical Parachute Cargos
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                6 functional 3D bellows pockets with bottom ankle bungee adjusters.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Shop Cargos <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono text-zinc-600 font-bold">From ₹1,899</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
