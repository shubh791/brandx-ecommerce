import fs from 'fs';

// Ensure directory exists
if (!fs.existsSync('app/wishlist')) {
  fs.mkdirSync('app/wishlist', { recursive: true });
}

const wishlistPageCss = `.pageWrapper {
  --wl-canvas: #f4f2ed;
  --wl-ink: #09090b;
  --wl-muted: #65656d;
  --wl-line: rgba(9, 9, 11, 0.14);
  --wl-accent: #f2cf45;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--wl-canvas);
  color: var(--wl-ink);
}

.mainContent {
  flex: 1;
}

/* =========================================================
   1. EDITORIAL WISHLIST HEADER
   ========================================================= */
.headerSection {
  position: relative;
  overflow: hidden;
  background: var(--wl-canvas);
  border-bottom: 1px solid var(--wl-line);
  padding: clamp(2.2rem, 4vw, 3.5rem) clamp(1rem, 2.5vw, 2.5rem);
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

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--wl-muted);
  text-transform: uppercase;
}

.breadcrumb a {
  color: var(--wl-muted);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--wl-ink);
}

.breadcrumbSep {
  color: #a1a1aa;
}

.breadcrumbCurrent {
  color: var(--wl-ink);
  font-weight: 800;
}

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
  color: var(--wl-ink);
  text-transform: uppercase;
}

.eyebrowLine {
  width: 2rem;
  height: 1px;
  background: currentColor;
}

.pageTitle {
  font-size: clamp(2.4rem, 5.5vw, 4.2rem);
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: 0.88;
  color: var(--wl-ink);
  text-transform: uppercase;
  margin: 0;
}

.pageDesc {
  color: var(--wl-muted);
  font-size: 0.88rem;
  line-height: 1.5;
  max-width: 24rem;
  margin-top: 0.25rem;
}

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
   2. WISHLIST GRID BODY
   ========================================================= */
.wishlistShell {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(2rem, 3.5vw, 3.5rem) clamp(1rem, 2.5vw, 2.5rem);
}

.wishlistGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
}

/* Wishlist Card */
.wishlistCard {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid var(--wl-line);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.wishlistCard:hover {
  border-color: rgba(9, 9, 11, 0.3);
  box-shadow: 0 16px 36px rgba(9, 9, 11, 0.08);
  transform: translateY(-2px);
}

.mediaWrap {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f4f2ed;
  display: block;
}

.productImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.wishlistCard:hover .productImg {
  transform: scale(1.05);
}

.removeBtn {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  z-index: 10;
  width: 2.2rem;
  height: 2.2rem;
  display: grid;
  place-items: center;
  background: #09090b;
  border: 1px solid #09090b;
  color: var(--wl-accent);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.removeBtn:hover {
  transform: scale(1.08);
  background: #27272a;
}

.removeBtn svg {
  fill: var(--wl-accent);
}

.cardContent {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  flex: 1;
}

.cardMeta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--wl-muted);
  text-transform: uppercase;
}

.cardTitle {
  font-size: 0.92rem;
  font-weight: 850;
  color: var(--wl-ink);
  text-decoration: none;
  line-height: 1.35;
  letter-spacing: -0.015em;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cardTitle:hover {
  text-decoration: underline;
}

.priceGroup {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
}

.priceCurrent {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.96rem;
  font-weight: 900;
  color: var(--wl-ink);
}

.priceOriginal {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  color: #a1a1aa;
  text-decoration: line-through;
}

.discountBadge {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.52rem;
  font-weight: 850;
  padding: 0.15rem 0.35rem;
  background: var(--wl-accent);
  color: #000000;
}

/* Size Strip & Move to Bag */
.sizeSelectRow {
  display: flex;
  gap: 0.35rem;
  margin-top: 0.25rem;
}

.sizeChoiceBtn {
  flex: 1;
  padding: 0.35rem 0;
  background: #f4f2ed;
  border: 1px solid var(--wl-line);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 800;
  color: var(--wl-ink);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.sizeChoiceBtnActive {
  background: var(--wl-ink);
  border-color: var(--wl-ink);
  color: #ffffff;
}

.moveToBagBtn {
  margin-top: auto;
  width: 100%;
  padding: 0.75rem 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--wl-ink);
  color: #ffffff;
  border: 1px solid var(--wl-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.moveToBagBtn:hover {
  background: #27272a;
  transform: translateY(-1px);
}

/* Empty State */
.emptyState {
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #ffffff;
  border: 1px solid var(--wl-line);
  gap: 1.15rem;
}

.emptyIconWrap {
  width: 4rem;
  height: 4rem;
  display: grid;
  place-items: center;
  background: #f4f2ed;
  border: 1px solid var(--wl-line);
  color: var(--wl-ink);
}

.emptyState h2 {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--wl-ink);
}

.emptyState p {
  color: var(--wl-muted);
  font-size: 0.88rem;
  max-width: 24rem;
  line-height: 1.5;
}

.exploreBtn {
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.75rem;
  background: var(--wl-ink);
  color: #ffffff;
  border: 1px solid var(--wl-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.exploreBtn:hover {
  background: #27272a;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1200px) {
  .wishlistGrid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .wishlistGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .headerSection {
    padding: 1.75rem 1rem;
  }

  .wishlistShell {
    padding: 1.5rem 0.85rem 3rem;
  }

  .pageTitle {
    font-size: 2.2rem;
  }

  .wishlistGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .cardContent {
    padding: 0.75rem;
    gap: 0.45rem;
  }
}
`;

fs.writeFileSync('app/wishlist/WishlistPage.module.css', wishlistPageCss, 'utf-8');

// Create app/wishlist/page.js
const wishlistPageJsx = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, moveToCart } = useShop();
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleMoveToBag = (product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes?.[0] || 'M';
    moveToCart(product, chosenSize);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* 1. Editorial Wishlist Header */}
        <section className={styles.headerSection} aria-label="Wishlist Header">
          <div className={styles.headerShell}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">HOME</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>WISHLIST</span>
            </nav>

            <div className={styles.headerRow}>
              <div className={styles.headerTitleBlock}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} aria-hidden="true" />
                  <span>SAMALKHA / SAVED ARCHIVE</span>
                </div>
                <h1 className={styles.pageTitle}>YOUR WISHLIST</h1>
              </div>

              <p className={styles.pageDesc}>
                {wishlist.length === 0
                  ? 'Your saved wishlist is currently empty.'
                  : 'You have ' + wishlist.length + ' saved streetwear piece' + (wishlist.length === 1 ? '' : 's') + ' in your personal archive.'}
              </p>
            </div>
          </div>

          <span className={styles.watermarkWord} aria-hidden="true">WISHLIST</span>
        </section>

        {/* 2. Wishlist Grid Body */}
        <section className={styles.wishlistShell}>
          {wishlist.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <Heart className="w-7 h-7" />
              </div>
              <h2>YOUR WISHLIST IS EMPTY</h2>
              <p>
                Save your favorite heavyweight hoodies, tees, and tactical bottoms while you browse to keep track of seasonal drops.
              </p>
              <Link href="/category/all" className={styles.exploreBtn}>
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <motion.div layout className={styles.wishlistGrid}>
              <AnimatePresence>
                {wishlist.map((product) => {
                  const activeSize = selectedSizes[product.id] || product.sizes?.[0] || 'M';
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={styles.wishlistCard}
                    >
                      <div className={styles.mediaWrap}>
                        <Link href={'/product/' + product.id}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className={styles.productImg}
                          />
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleWishlist(product)}
                          className={styles.removeBtn}
                          title="Remove from Wishlist"
                          aria-label="Remove from Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.cardMeta}>
                          <span>{product.categoryLabel || product.category}</span>
                          {product.gsm && <span>{product.gsm}</span>}
                        </div>

                        <Link href={'/product/' + product.id} className={styles.cardTitle}>
                          {product.name}
                        </Link>

                        <div className={styles.priceGroup}>
                          <span className={styles.priceCurrent}>₹{product.price}</span>
                          {product.originalPrice && (
                            <span className={styles.priceOriginal}>₹{product.originalPrice}</span>
                          )}
                          {product.discount && (
                            <span className={styles.discountBadge}>{product.discount}</span>
                          )}
                        </div>

                        {/* Size Selection */}
                        <div>
                          <span className={styles.cardMeta} style={{ marginBottom: '0.25rem', display: 'block' }}>
                            SELECT SIZE:
                          </span>
                          <div className={styles.sizeSelectRow}>
                            {product.sizes?.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => handleSizeSelect(product.id, size)}
                                className={[
                                  styles.sizeChoiceBtn,
                                  activeSize === size ? styles.sizeChoiceBtnActive : '',
                                ].join(' ')}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Move to Bag Action */}
                        <button
                          type="button"
                          onClick={() => handleMoveToBag(product)}
                          className={styles.moveToBagBtn}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>MOVE TO BAG</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
`;

fs.writeFileSync('app/wishlist/page.js', wishlistPageJsx, 'utf-8');
console.log('Wishlist page created successfully!');
