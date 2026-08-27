'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsData } from '@/data/productsData';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { SearchX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ProductGrid() {
  const { activeCategory, searchQuery, sortBy, setActiveCategory, setSearchQuery } = useShop();

  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    // Category Filter
    if (activeCategory && activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search Query Filter
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

    // Sorting
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

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="catalog" className="py-14 sm:py-20 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 font-bold">
            2026 CATALOG • SAMALKHA FLAGSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
            SHOP THE STREETWEAR DROPS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Select your size and style from our premium heavyweight cotton and cargo archive.
          </p>
        </div>

        {/* Filter Controls */}
        <CategoryFilter totalCount={filteredProducts.length} />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950">No pieces found matching your search</h3>
            <p className="text-xs text-zinc-500 max-w-sm">
              We couldn’t find items matching &quot;{searchQuery}&quot;. Clear your search or change categories to browse all products.
            </p>
            <Button
              variant="primary"
              size="md"
              icon={RotateCcw}
              onClick={handleResetFilters}
            >
              Reset Filters
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
    </section>
  );
}
