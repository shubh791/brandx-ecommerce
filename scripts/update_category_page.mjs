import fs from 'fs';

const categoryPageCss = `.pageWrapper {
  --cat-canvas: #f4f2ed;
  --cat-ink: #09090b;
  --cat-muted: #65656d;
  --cat-line: rgba(9, 9, 11, 0.14);
  --cat-accent: #f2cf45;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--cat-canvas);
  color: var(--cat-ink);
}

.mainContent {
  flex: 1;
}

/* =========================================================
   1. EDITORIAL COLLECTION HEADER
   ========================================================= */
.headerSection {
  position: relative;
  overflow: hidden;
  background: var(--cat-canvas);
  border-bottom: 1px solid var(--cat-line);
  padding: clamp(2rem, 3.5vw, 3.5rem) clamp(1rem, 2.5vw, 2.5rem);
}

.headerShell {
  position: relative;
  z-index: 2;
  width: min(100%, 82rem);
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Breadcrumbs */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--cat-muted);
  text-transform: uppercase;
}

.breadcrumb a {
  color: var(--cat-muted);
  text-decoration: none;
  transition: color 0.18s ease;
}

.breadcrumb a:hover {
  color: var(--cat-ink);
}

.breadcrumbSeparator {
  color: #a1a1aa;
}

.breadcrumbCurrent {
  color: var(--cat-ink);
  font-weight: 800;
}

/* Header Content Row */
.headerRow {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.headerTitleBlock {
  max-width: 44rem;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: var(--cat-ink);
  text-transform: uppercase;
}

.eyebrowLine {
  width: 2rem;
  height: 1px;
  background: currentColor;
}

.categoryTitle {
  font-size: clamp(2.4rem, 5.5vw, 4.2rem);
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: 0.88;
  color: var(--cat-ink);
  text-transform: uppercase;
  margin: 0;
}

.categoryDesc {
  color: var(--cat-muted);
  font-size: 0.88rem;
  line-height: 1.5;
  max-width: 24rem;
  margin-top: 0.25rem;
}

/* Subtle Watermark Word */
.watermarkWord {
  position: absolute;
  right: -1rem;
  bottom: -1rem;
  z-index: 1;
  font-size: clamp(6rem, 15vw, 13rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  color: rgba(9, 9, 11, 0.032);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  line-height: 0.8;
}

/* =========================================================
   2. COLLECTION BODY & FILTERS
   ========================================================= */
.catalogShell {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(1.8rem, 3.5vw, 3rem) clamp(1rem, 2.5vw, 2.5rem);
}

/* Horizontal Category Navigation Bar */
.categoryTabsBar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.categoryTabsBar::-webkit-scrollbar {
  display: none;
}

.categoryTabBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.1rem;
  background: #ffffff;
  border: 1px solid var(--cat-line);
  color: #52525b;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
}

.categoryTabBtn:hover {
  background: #faf9f6;
  border-color: var(--cat-ink);
  color: var(--cat-ink);
  transform: translateY(-1px);
}

.categoryTabBtnActive {
  background: var(--cat-ink);
  border-color: var(--cat-ink);
  color: #ffffff;
}

.categoryTabBtnActive:hover {
  background: var(--cat-ink);
  color: #ffffff;
}

.tabCount {
  padding: 0.12rem 0.38rem;
  font-size: 0.54rem;
  font-weight: 850;
  background: rgba(9, 9, 11, 0.08);
  color: #27272a;
  line-height: 1;
}

.categoryTabBtnActive .tabCount {
  background: var(--cat-accent);
  color: #000000;
}

/* Controls Bar (Search + Sort + Count) */
.controlsBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 2rem;
  padding: 0.75rem 1rem;
  background: #ffffff;
  border: 1px solid var(--cat-line);
  flex-wrap: wrap;
}

.searchWrap {
  position: relative;
  flex: 1;
  min-width: 15rem;
  max-width: 26rem;
  display: flex;
  align-items: center;
}

.searchIcon {
  position: absolute;
  left: 0.85rem;
  width: 1rem;
  height: 1rem;
  color: #71717a;
  pointer-events: none;
}

.searchInput {
  width: 100%;
  padding: 0.6rem 2.2rem 0.6rem 2.35rem;
  background: #f4f2ed;
  border: 1px solid var(--cat-line);
  font-size: 0.78rem;
  color: var(--cat-ink);
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.searchInput:focus {
  background: #ffffff;
  border-color: var(--cat-ink);
}

.searchInput::placeholder {
  color: #a1a1aa;
}

.clearSearchBtn {
  position: absolute;
  right: 0.75rem;
  width: 1.1rem;
  height: 1.1rem;
  display: grid;
  place-items: center;
  background: transparent;
  border: none;
  color: #71717a;
  cursor: pointer;
}

.clearSearchBtn:hover {
  color: var(--cat-ink);
}

.controlsRight {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-left: auto;
}

.itemCountText {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.65rem;
  font-weight: 750;
  letter-spacing: 0.12em;
  color: var(--cat-muted);
  text-transform: uppercase;
}

.itemCountText strong {
  color: var(--cat-ink);
  font-weight: 900;
}

.sortGroup {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.sortIcon {
  width: 0.95rem;
  height: 0.95rem;
  color: var(--cat-ink);
}

.sortSelect {
  padding: 0.55rem 0.85rem;
  background: #f4f2ed;
  border: 1px solid var(--cat-line);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.66rem;
  font-weight: 750;
  color: var(--cat-ink);
  outline: none;
  cursor: pointer;
  transition: border-color 0.18s ease, background-color 0.18s ease;
}

.sortSelect:focus {
  border-color: var(--cat-ink);
  background: #ffffff;
}

.mobileFilterToggleBtn {
  display: none;
}

/* =========================================================
   3. RESPONSIVE PRODUCT GRID (3-4 COLUMNS)
   ========================================================= */
.productGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
}

/* Empty Results State */
.emptyState {
  padding: 4.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #ffffff;
  border: 1px solid var(--cat-line);
  gap: 1rem;
}

.emptyIconWrap {
  width: 3.5rem;
  height: 3.5rem;
  display: grid;
  place-items: center;
  background: #f4f2ed;
  border: 1px solid var(--cat-line);
  color: var(--cat-ink);
}

.emptyState h2 {
  font-size: 1.25rem;
  font-weight: 850;
  letter-spacing: -0.02em;
  color: var(--cat-ink);
}

.emptyState p {
  color: var(--cat-muted);
  font-size: 0.85rem;
  max-width: 24rem;
  line-height: 1.5;
}

.resetBtn {
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.8rem 1.5rem;
  background: var(--cat-ink);
  border: 1px solid var(--cat-ink);
  color: #ffffff;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.resetBtn:hover {
  background: #27272a;
  transform: translateY(-2px);
}

.resetBtn svg {
  width: 0.9rem;
  height: 0.9rem;
}

/* =========================================================
   4. MOBILE BOTTOM-SHEET FILTER DRAWER
   ========================================================= */
.drawerOverlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.drawerSheet {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 101;
  background: #faf9f6;
  border-top: 2px solid var(--cat-ink);
  padding: 1.5rem 1.25rem 2rem;
  max-height: 85vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.drawerHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--cat-line);
}

.drawerHeader h3 {
  font-size: 1rem;
  font-weight: 850;
  letter-spacing: -0.01em;
  color: var(--cat-ink);
}

.drawerCloseBtn {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid var(--cat-line);
  color: var(--cat-ink);
}

.drawerSectionTitle {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cat-muted);
  margin-bottom: 0.65rem;
}

.drawerOptionsList {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
}

.drawerOptionBtn {
  padding: 0.65rem 0.75rem;
  background: #ffffff;
  border: 1px solid var(--cat-line);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.65rem;
  font-weight: 750;
  color: #52525b;
  text-align: left;
}

.drawerOptionBtnActive {
  background: var(--cat-ink);
  border-color: var(--cat-ink);
  color: #ffffff;
}

/* =========================================================
   RESPONSIVE BREAKPOINTS
   ========================================================= */
@media (max-width: 1200px) {
  .productGrid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .productGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .controlsBar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .searchWrap {
    max-width: none;
  }

  .controlsRight {
    justify-content: space-between;
    width: 100%;
    margin-left: 0;
  }

  .mobileFilterToggleBtn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 0.85rem;
    background: #ffffff;
    border: 1px solid var(--cat-line);
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.66rem;
    font-weight: 800;
    color: var(--cat-ink);
  }
}

@media (max-width: 640px) {
  .headerSection {
    padding: 1.5rem 1rem;
  }

  .catalogShell {
    padding: 1.25rem 0.85rem 2.5rem;
  }

  .headerRow {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .categoryTitle {
    font-size: 2.1rem;
  }

  .categoryDesc {
    font-size: 0.8rem;
  }

  .productGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }
}
`;

fs.writeFileSync('app/category/[slug]/CategoryPage.module.css', categoryPageCss, 'utf-8');

// 2. Update app/category/[slug]/page.js
const categoryPageJsx = `'use client';

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

  // Dynamic live count for category buttons
  const getCategoryCount = (catId) => {
    if (catId === 'all') return productsData.length;
    return productsData.filter((p) => p.category === catId).length;
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* 1. Editorial Collection Header */}
        <section className={styles.headerSection} aria-label="Collection Header">
          <div className={styles.headerShell}>
            {/* Subtle Monospace Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">HOME</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span>CATEGORIES</span>
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
                Showing exclusively {filteredProducts.length} verified heavyweight silhouettes engineered with custom washes and boxy proportions.
              </p>
            </div>
          </div>

          {/* Background Ambient Category Watermark */}
          <span className={styles.watermarkWord} aria-hidden="true">
            {currentCategoryInfo.label.replace('Drops', '').trim()}
          </span>
        </section>

        {/* 2. Collection Body & Filters */}
        <section className={styles.catalogShell}>
          {/* Horizontal Category Navigation Tabs */}
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

          {/* Search, Sort, and Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.searchWrap}>
              <Search className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                placeholder={\`Search in \${currentCategoryInfo.label}...\`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search within collection"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.controlsRight}>
              <span className={styles.itemCountText}>
                SHOWING <strong>{filteredProducts.length}</strong> DROPS
              </span>

              <div className={styles.sortGroup}>
                <SlidersHorizontal className={styles.sortIcon} aria-hidden="true" />
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

              {/* Mobile Filter Button */}
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

          {/* 3. Product Grid (3-4 Columns on Desktop, 2 on Mobile) */}
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <SearchX className="w-6 h-6" />
              </div>
              <h2>No products found</h2>
              <p>
                There are no streetwear items matching &ldquo;{searchQuery}&rdquo; in this collection.
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
`;

fs.writeFileSync('app/category/[slug]/page.js', categoryPageJsx, 'utf-8');

console.log('Category page updated successfully with editorial design system!');
