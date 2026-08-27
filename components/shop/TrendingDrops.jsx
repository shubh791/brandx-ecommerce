'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { productsData } from '@/data/productsData';
import styles from './TrendingDrops.module.css';

const lookProducts = ['bx-006', 'bx-001', 'bx-007']
  .map((id) => productsData.find((product) => product.id === id))
  .filter(Boolean);

const lookImage = productsData.find((product) => product.id === 'bx-004')?.gallery?.[1] || '/images/hero/hero-denim.png';

const annotationClasses = [styles.annotationOne, styles.annotationTwo, styles.annotationThree];

function ProductAnnotation({ product, index }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className={`${styles.annotation} ${annotationClasses[index]}`}
      aria-label={`Shop ${product.name} for ₹${product.price.toLocaleString('en-IN')}`}
    >
      <span className={styles.marker}>{String(index + 1).padStart(2, '0')}</span>
      <span className={styles.annotationCopy}>
        <strong>{product.name}</strong>
        <small>₹{product.price.toLocaleString('en-IN')}</small>
        <em>SHOP <span aria-hidden="true">→</span></em>
      </span>
    </Link>
  );
}

export function TrendingDrops() {
  return (
    <section className={styles.shopLookSection} aria-labelledby="shop-look-heading">
      <div className={styles.shopLookShell}>
        <div className={styles.lookLayout}>
          {/* Left Side: Compact Sleek Model Visual with Markers */}
          <figure className={styles.lookVisual}>
            <img src={lookImage} alt="Men's editorial streetwear look" loading="lazy" />
            <div className={styles.visualOverlay} />
            <figcaption>
              <span>BRAND X / SAMALKHA</span>
              <strong>LOOK 01 • ESSENTIAL FIT</strong>
            </figcaption>

            <div className={styles.desktopAnnotations}>
              {lookProducts.map((product, index) => (
                <ProductAnnotation key={product.id} product={product} index={index} />
              ))}
            </div>
          </figure>

          {/* Right Side: Editorial Header + Rich Product Card Divs */}
          <div className={styles.editorialRail}>
            <div className={styles.headerBlock}>
              <span className={styles.kicker}>WEAR IT YOUR WAY</span>
              <h2 id="shop-look-heading">
                SHOP<br />THE LOOK
              </h2>
              <p>
                A complete Brand X uniform built through proportion, heavyweight cottons, and a refusal to disappear into the crowd.
              </p>
            </div>

            {/* Structured Product Card Divs */}
            <div className={styles.productCardsGrid} aria-label="Products in this look">
              {lookProducts.map((product, index) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className={styles.productCardDiv}
                >
                  <div className={styles.cardThumb}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className={styles.cardMarker}>{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.categoryTag}>{product.category || 'Streetwear'}</span>
                      <span className={styles.stockBadge}>In Stock</span>
                    </div>
                    <strong className={styles.cardTitle}>{product.name}</strong>
                    <div className={styles.cardPriceRow}>
                      <span className={styles.cardPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                      {product.mrp && <span className={styles.cardMrp}>₹{product.mrp.toLocaleString('en-IN')}</span>}
                    </div>
                  </div>

                  <div className={styles.cardAction}>
                    <span className={styles.actionBtn}>
                      SHOP <ArrowRight className={styles.actionArrow} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Section CTA & Look Index */}
            <div className={styles.footerActionRow}>
              <Link href="/category/all" className={styles.exploreLink}>
                SHOP THE COMPLETE LOOK <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <div className={styles.lookIndex} aria-hidden="true">
                <span>LOOK 01</span>
                <i />
                <span>BX / 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Products Carousel */}
        <div className={styles.mobileProducts} aria-label="Products in this look">
          {lookProducts.map((product, index) => (
            <Link href={`/product/${product.id}`} className={styles.mobileProduct} key={product.id}>
              <img src={product.image} alt="" loading="lazy" />
              <span className={styles.mobileNumber}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.mobileCopy}>
                <strong>{product.name}</strong>
                <small>₹{product.price.toLocaleString('en-IN')}</small>
                <em>SHOP →</em>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
