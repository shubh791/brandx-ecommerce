'use client';

import React, { useMemo, useState, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { productsData } from '@/data/productsData';
import { categoriesData, sortOptions } from '@/data/categoriesData';
import { Search, SlidersHorizontal, ChevronRight, SearchX, RotateCcw, Filter, X } from 'lucide-react';
import styles from './CategoryPage.module.css';

export default function CategoryPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams?.slug || 'all';
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const initialCat = slug === 'men' ? 'all' : slug;
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  // Category Metadata Info
  const currentCategoryInfo = useMemo(() => {
    const matched = categoriesData.find((c) => c.id === activeCategory);
    if (matched) return matched;
    if (slug === 'men' || activeCategory === 'all') return { id: 'all', label: 'All Streetwear Drops' };
    return { id: slug, label: slug.replace('-', ' ').toUpperCase() };
  }, [activeCategory, slug]);

  // Strict Category Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    // Strict category filtering
    if (activeCategory && activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search query
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

  const getCategoryCount = (catId) => {
    if (catId === 'all') return productsData.length;
    return productsData.filter((p) => p.category === catId).length;
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* 1. Compact Editorial Collection Header */}
        <section className={styles.headerSection} aria-label="Collection Header">
          <div className={styles.headerShell}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">HOME</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{currentCategoryInfo.label}</span>
            </nav>

            <div className={styles.headerRow}>
              <div className={styles.headerTitleBlock}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} aria-hidden="true" />
                  <span>SAMALKHA / 2026 ARCHIVE</span>
                </div>
                <h1 className={styles.categoryTitle}>{currentCategoryInfo.label}</h1>
              </div>

              <p className={styles.categoryDesc}>
                Showing exclusively {filteredProducts.length} verified silhouettes engineered in Samalkha.
              </p>
            </div>
          </div>

          <span className={styles.watermarkWord} aria-hidden="true">
            {currentCategoryInfo.label.replace('Drops', '').trim()}
          </span>
        </section>

        {/* 2. Collection Body & Single Tight Toolbar */}
        <section className={styles.catalogShell}>
          {/* Horizontal Category Navigation Tabs (One Row Scroll) */}
          <div className={styles.categoryTabsBar} role="tablist" aria-label="Category filter tabs">
            {categoriesData.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={[
                    styles.categoryTabBtn,
                    isActive ? styles.categoryTabBtnActive : '',
                  ].join(' ')}
                >
                  <span>{cat.label}</span>
                  <span className={styles.tabCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Compact Toolbar Bar (Search + Sort + Filters Combined) */}
          <div className={styles.controlsBar}>
            {/* Desktop Inline Search */}
            <div className={[styles.searchWrap, isMobileSearchExpanded ? styles.searchWrapActive : ''].join(' ')}>
              <Search className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                placeholder={'Search ' + currentCategoryInfo.label + '...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search within collection"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              ) : isMobileSearchExpanded ? (
                <button
                  type="button"
                  onClick={() => setIsMobileSearchExpanded(false)}
                  className={styles.clearSearchBtn}
                  aria-label="Close search"
                >
                  ✕
                </button>
              ) : null}
            </div>

            {/* Mobile Controls Row */}
            <div className={styles.controlsRight}>
              <button
                type="button"
                onClick={() => setIsMobileSearchExpanded(true)}
                className={styles.mobileSearchToggleBtn}
                aria-label="Open search input"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              <span className={styles.itemCountText}>
                <strong>{filteredProducts.length}</strong> DROPS
              </span>

              <div className={styles.sortGroup}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                  aria-label="Sort products by"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className={styles.mobileFilterToggleBtn}
                aria-label="Open filter drawer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>FILTERS</span>
              </button>
            </div>
          </div>

          {/* 3. Product Grid (Early in viewport on mobile) */}
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <SearchX className="w-6 h-6" />
              </div>
              <h2>No products found</h2>
              <p>
                There are no items matching &ldquo;{searchQuery}&rdquo; in this collection.
              </p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                <RotateCcw />
                <span>View All Drops</span>
              </button>
            </div>
          ) : (
            <motion.div layout className={styles.productGrid}>
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
        </section>
      </main>

      {/* 4. Mobile Bottom-Sheet Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.drawerOverlay}
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={styles.drawerSheet}
            >
              <div className={styles.drawerHeader}>
                <h3>FILTER COLLECTION</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className={styles.drawerCloseBtn}
                  aria-label="Close filter drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className={styles.drawerSectionTitle}>CATEGORIES</div>
                <div className={styles.drawerOptionsList}>
                  {categoriesData.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setIsMobileFilterOpen(false);
                        }}
                        className={[
                          styles.drawerOptionBtn,
                          isActive ? styles.drawerOptionBtnActive : '',
                        ].join(' ')}
                      >
                        {cat.label} ({getCategoryCount(cat.id)})
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className={styles.drawerSectionTitle}>SORT ORDER</div>
                <div className={styles.drawerOptionsList}>
                  {sortOptions.map((opt) => {
                    const isActive = sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.id);
                          setIsMobileFilterOpen(false);
                        }}
                        className={[
                          styles.drawerOptionBtn,
                          isActive ? styles.drawerOptionBtnActive : '',
                        ].join(' ')}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
