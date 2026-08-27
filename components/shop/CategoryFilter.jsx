'use client';

import React from 'react';
import { categoriesData, sortOptions } from '@/data/categoriesData';
import { useShop } from '@/context/ShopContext';
import { Search, Sparkles, SlidersHorizontal, Shirt, Flame, Layers, Zap, Shield } from 'lucide-react';

const iconMap = {
  Sparkles,
  Shirt,
  Flame,
  Layers,
  Zap,
  Shield,
};

export function CategoryFilter({ totalCount }) {
  const {
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
  } = useShop();

  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoriesData.map((cat) => {
          const Icon = iconMap[cat.icon] || Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-black text-white font-bold border-black shadow-sm'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:text-black hover:border-zinc-400 hover:bg-zinc-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-600'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-zinc-200 shadow-sm">
        {/* Search Field */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by fabric, fit, GSM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl text-black placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <span className="text-xs font-mono text-zinc-500">
            Showing <strong className="text-black">{totalCount}</strong> pieces
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-800 py-2 px-3 rounded-xl focus:outline-none focus:border-black cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
