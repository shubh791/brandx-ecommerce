'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
  const { toggleWishlist, isItemWishlisted, addToCart, showToast } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isItemWishlisted(product.id);

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
    showToast(`Added ${product.name} (Size: ${size}) to Bag!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const isHot = product.badgeType === 'hot' || product.tag === 'BESTSELLER';

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container linking to /product/[id] */}
      <Link href={`/product/${product.id}`} className={styles.mediaWrap} aria-label={product.name}>
        <img
          src={isHovered && product.gallery?.[1] ? product.gallery[1] : product.image}
          alt={product.name}
          className={styles.productImg}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className={styles.badgeStack}>
          {product.tag && (
            <span className={[styles.tagBadge, isHot ? styles.tagBadgeHot : ''].join(' ')}>
              {product.tag}
            </span>
          )}
          {product.gsm && (
            <span className={styles.gsmBadge}>{product.gsm}</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={[styles.wishlistBtn, wishlisted ? styles.wishlistBtnActive : ''].join(' ')}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className="w-3.5 h-3.5" />
        </button>

        {/* Quick Size Selector Strip on Desktop Hover */}
        <div className={styles.quickSizeBar}>
          <div className={styles.quickSizeHeader}>
            <span>QUICK ADD SIZE:</span>
            <strong>IN STOCK</strong>
          </div>
          <div className={styles.sizeBtns}>
            {product.sizes?.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => handleQuickAdd(e, size)}
                className={styles.sizeBtn}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </Link>

      {/* Product Information */}
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span>{product.categoryLabel || product.category}</span>
          {product.color && <span>{product.color}</span>}
        </div>

        <Link href={`/product/${product.id}`} className={styles.cardTitle}>
          {product.name}
        </Link>

        {product.fabric && (
          <p className={styles.cardFabric}>{product.fabric}</p>
        )}

        {/* Pricing & Add to Bag */}
        <div className={styles.priceRow}>
          <div className={styles.priceGroup}>
            <span className={styles.priceCurrent}>₹{product.price}</span>
            {product.originalPrice && (
              <span className={styles.priceOriginal}>₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className={styles.discountBadge}>{product.discount}</span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => handleQuickAdd(e, product.sizes?.[0] || 'M')}
            className={styles.addBagBtn}
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag />
          </button>
        </div>
      </div>
    </div>
  );
}
