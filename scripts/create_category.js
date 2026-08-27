const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'app', 'category', '[slug]');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const content = `'use client';

import React, { useMemo, useState, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { productsData } from '@/data/productsData';
import { categoriesData, sortOptions } from '@/data/categoriesData';
import { Search, SlidersHorizontal, ChevronRight, SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CategoryPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams?.slug || 'all';
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(slug === 'men' ? 'all' : slug);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('featured');

  const currentCategoryInfo = useMemo(() => {
    const matched = categoriesData.find((c) => c.id === activeCategory);
    if (matched) return matched;
    if (slug === 'men' || activeCategory === 'all') return { id: 'all', label: 'All Streetwear Drops' };
    return { id: slug, label: slug.replace('-', ' ').toUpperCase() };
  }, [activeCategory, slug]);

  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (activeCategory && activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.fit.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.reverse();
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb & Banner */}
        <div className="bg-zinc-50 border-b border-zinc-200 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono mb-3">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-zinc-500">Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-black font-bold capitalize">{currentCategoryInfo.label}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500">
                  SAMALKHA ARCHIVE 2026
                </span>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 capitalize mt-1">
                  {currentCategoryInfo.label}
                </h1>
              </div>
              <p className="text-xs text-zinc-500 max-w-sm">
                240–450 GSM pure combed cotton, mineral wash treatments & tactical cargo silhouettes.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {categoriesData.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:text-black hover:border-zinc-400 hover:bg-zinc-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200 mb-8">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search within this collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-xs bg-white border border-zinc-200 rounded-xl text-black placeholder-zinc-400 focus:outline-none focus:border-black"
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

            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs font-mono text-zinc-500">
                Showing <strong className="text-black">{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-zinc-200 text-xs font-mono text-zinc-800 py-2 px-3 rounded-xl focus:outline-none focus:border-black cursor-pointer"
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

          {/* Grid of Products */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl border border-zinc-200 bg-zinc-50/50 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                <SearchX className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950">No products found in this category</h3>
              <p className="text-xs text-zinc-500 max-w-sm">
                Try searching for another keyword or switch categories to view our complete streetwear vault.
              </p>
              <Button
                variant="primary"
                size="md"
                icon={RotateCcw}
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                View All Drops
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

fs.writeFileSync(path.join(targetDir, 'page.js'), content, 'utf8');
console.log('Category page written successfully!');
