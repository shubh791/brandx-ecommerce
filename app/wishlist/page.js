'use client';

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
