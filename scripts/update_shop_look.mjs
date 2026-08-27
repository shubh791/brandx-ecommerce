import fs from 'fs';

const trendingDropsJsx = `'use client';

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
      href={\`/product/\${product.id}\`}
      className={\`\${styles.annotation} \${annotationClasses[index]}\`}
      aria-label={\`Shop \${product.name} for ₹\${product.price.toLocaleString('en-IN')}\`}
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
                  href={\`/product/\${product.id}\`}
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
            <Link href={\`/product/\${product.id}\`} className={styles.mobileProduct} key={product.id}>
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
`;

const trendingDropsCss = `.shopLookSection {
  --look-canvas: #f4f2ed;
  --look-ink: #09090b;
  --look-muted: #65656d;
  --look-line: rgba(9, 9, 11, .14);
  --look-accent: #f2cf45;
  overflow: hidden;
  border-bottom: 1px solid var(--look-line);
  background: var(--look-canvas);
  color: var(--look-ink);
}

.shopLookShell {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(5rem, 8vw, 7.5rem) clamp(1rem, 2.5vw, 2.5rem);
}

.lookLayout {
  min-height: clamp(36rem, 46vw, 44rem);
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  border: 1px solid var(--look-line);
  background: #ffffff;
  box-shadow: 0 12px 36px rgba(0, 0, 0, .04);
}

/* =========================================================
   LEFT SIDE: COMPACT SLEEK EDITORIAL MODEL VISUAL
   ========================================================= */
.lookVisual {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: #cbc7bd;
  border-right: 1px solid var(--look-line);
}

.lookVisual > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
  filter: saturate(.82) contrast(1.05);
  transform: scale(1.01);
  transition: transform 1s cubic-bezier(.22, 1, .36, 1), filter .7s ease;
  will-change: transform;
}

.lookVisual:hover > img {
  filter: saturate(.92) contrast(1.06);
  transform: scale(1.04);
}

.visualOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9, 9, 11, .05) 0%, transparent 40%, rgba(9, 9, 11, .65) 100%);
  pointer-events: none;
}

.lookVisual figcaption {
  position: absolute;
  left: 1.4rem;
  bottom: 1.4rem;
  z-index: 3;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.lookVisual figcaption span {
  font-family: var(--font-geist-mono), monospace;
  font-size: .56rem;
  font-weight: 700;
  letter-spacing: .2em;
  color: var(--look-accent);
}

.lookVisual figcaption strong {
  font-size: .88rem;
  font-weight: 850;
  letter-spacing: -.02em;
}

.desktopAnnotations {
  position: absolute;
  inset: 0;
  z-index: 4;
}

.annotation {
  position: absolute;
  display: flex;
  align-items: center;
  color: #fff;
}

.annotation::before {
  width: clamp(2rem, 3vw, 3.5rem);
  height: 1px;
  background: rgba(255, 255, 255, .85);
  content: '';
  transform-origin: right center;
  transition: transform .35s cubic-bezier(.22, 1, .36, 1);
}

.annotationOne {
  top: 18%;
  right: 4%;
}

.annotationTwo {
  top: 48%;
  left: 4%;
  flex-direction: row-reverse;
}

.annotationTwo::before {
  transform-origin: left center;
}

.annotationThree {
  right: 5%;
  bottom: 16%;
}

.marker {
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #fff;
  background: var(--look-accent);
  color: var(--look-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: .57rem;
  font-weight: 800;
  transition: background-color .25s ease, color .25s ease;
}

.annotationCopy {
  width: clamp(8rem, 10vw, 9.5rem);
  display: grid;
  padding: .7rem .75rem;
  background: rgba(9, 9, 11, .92);
  backdrop-filter: blur(8px);
}

.annotationCopy strong {
  overflow: hidden;
  font-size: .68rem;
  font-weight: 750;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.annotationCopy small {
  margin-top: .25rem;
  color: #c7c7cb;
  font-family: var(--font-geist-mono), monospace;
  font-size: .56rem;
}

.annotationCopy em {
  margin-top: .6rem;
  color: var(--look-accent);
  font-family: var(--font-geist-mono), monospace;
  font-size: .53rem;
  font-style: normal;
  font-weight: 750;
  letter-spacing: .1em;
}

.annotationCopy em span {
  display: inline-block;
  transition: transform .3s cubic-bezier(.22, 1, .36, 1);
}

.annotation:hover::before {
  transform: scaleX(1.12);
}

.annotation:hover .marker {
  background: #fff;
  color: var(--look-ink);
}

.annotation:hover .annotationCopy em span {
  transform: translateX(.25rem);
}

/* =========================================================
   RIGHT SIDE: EDITORIAL CONTENT & PRODUCT CARD DIVS
   ========================================================= */
.editorialRail {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(2.2rem, 4vw, 3.8rem);
  background: #ffffff;
}

.editorialRail::after {
  position: absolute;
  right: -.05em;
  bottom: -.15em;
  z-index: 0;
  color: rgba(9, 9, 11, .03);
  font-size: clamp(16rem, 24vw, 26rem);
  font-weight: 900;
  line-height: .7;
  content: 'X';
  pointer-events: none;
}

.headerBlock {
  position: relative;
  z-index: 1;
}

.kicker {
  display: flex;
  align-items: center;
  gap: .65rem;
  margin-bottom: 1.1rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: .62rem;
  font-weight: 750;
  letter-spacing: .18em;
}

.kicker::before {
  width: 2.2rem;
  height: 2px;
  background: var(--look-accent);
  content: '';
}

.editorialRail h2 {
  font-size: clamp(3.6rem, 5.8vw, 5.8rem);
  font-weight: 900;
  letter-spacing: -.078em;
  line-height: .82;
}

.editorialRail p {
  max-width: 32rem;
  margin-top: 1.25rem;
  color: var(--look-muted);
  font-size: .95rem;
  line-height: 1.6;
}

/* =========================================================
   RIGHT SIDE: STRUCTURED PRODUCT CARD DIVS
   ========================================================= */
.productCardsGrid {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: .85rem;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
}

.productCardDiv {
  display: grid;
  grid-template-columns: 4.75rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 1.15rem;
  padding: .85rem 1.1rem;
  border: 1px solid var(--look-line);
  background: #faf9f6;
  transition: transform .28s cubic-bezier(.22, 1, .36, 1), background-color .2s ease, border-color .2s ease, box-shadow .28s ease;
  text-decoration: none;
  color: inherit;
}

.productCardDiv:hover {
  transform: translateY(-2px);
  background: #ffffff;
  border-color: var(--look-ink);
  box-shadow: 0 8px 24px rgba(9, 9, 11, .07);
}

.cardThumb {
  position: relative;
  width: 4.75rem;
  height: 4.75rem;
  overflow: hidden;
  background: #eee;
  border: 1px solid rgba(9, 9, 11, .08);
  flex-shrink: 0;
}

.cardThumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .4s ease;
}

.productCardDiv:hover .cardThumb img {
  transform: scale(1.08);
}

.cardMarker {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.35rem;
  height: 1.35rem;
  display: grid;
  place-items: center;
  background: var(--look-accent);
  color: var(--look-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: .52rem;
  font-weight: 800;
}

.cardBody {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: .22rem;
}

.cardMeta {
  display: flex;
  align-items: center;
  gap: .6rem;
}

.categoryTag {
  font-family: var(--font-geist-mono), monospace;
  font-size: .53rem;
  font-weight: 700;
  letter-spacing: .1em;
  color: var(--look-muted);
  text-transform: uppercase;
}

.stockBadge {
  font-family: var(--font-geist-mono), monospace;
  font-size: .48rem;
  font-weight: 750;
  letter-spacing: .06em;
  color: #16a34a;
  background: rgba(22, 163, 74, .1);
  padding: .1rem .4rem;
  border-radius: 9999px;
}

.cardTitle {
  font-size: .88rem;
  font-weight: 800;
  letter-spacing: -.02em;
  line-height: 1.3;
  color: var(--look-ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cardPriceRow {
  display: flex;
  align-items: baseline;
  gap: .55rem;
  margin-top: .15rem;
}

.cardPrice {
  font-size: .92rem;
  font-weight: 900;
  color: var(--look-ink);
}

.cardMrp {
  font-size: .75rem;
  color: #a1a1aa;
  text-decoration: line-through;
}

.cardAction {
  flex-shrink: 0;
}

.actionBtn {
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  padding: .5rem .85rem;
  border: 1px solid var(--look-line);
  background: #ffffff;
  color: var(--look-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: .58rem;
  font-weight: 800;
  letter-spacing: .08em;
  transition: background-color .2s ease, border-color .2s ease, transform .2s ease;
}

.actionArrow {
  width: .8rem;
  height: .8rem;
  transition: transform .25s cubic-bezier(.22, 1, .36, 1);
}

.productCardDiv:hover .actionBtn {
  background: var(--look-ink);
  color: #ffffff;
  border-color: var(--look-ink);
}

.productCardDiv:hover .actionArrow {
  transform: translateX(.25rem);
}

/* =========================================================
   FOOTER ACTIONS & INDEX ROW
   ========================================================= */
.footerActionRow {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--look-line);
}

.exploreLink {
  display: inline-flex;
  align-items: center;
  gap: .75rem;
  padding: .85rem 1.4rem;
  background: var(--look-ink);
  color: #ffffff;
  border: 1px solid var(--look-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: .65rem;
  font-weight: 800;
  letter-spacing: .12em;
  transition: background-color .2s ease, transform .25s ease;
}

.exploreLink:hover {
  background: #27272a;
  transform: translateY(-2px);
}

.lookIndex {
  display: flex;
  align-items: center;
  gap: .65rem;
  color: var(--look-muted);
  font-family: var(--font-geist-mono), monospace;
  font-size: .56rem;
  font-weight: 700;
  letter-spacing: .14em;
}

.lookIndex i {
  width: 2rem;
  height: 1px;
  background: var(--look-line);
}

.mobileProducts {
  display: none;
}

@media (max-width: 960px) {
  .lookLayout {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  .lookVisual {
    min-height: 28rem;
    border-right: none;
    border-bottom: 1px solid var(--look-line);
  }

  .editorialRail {
    padding: 2.5rem 1.75rem;
  }

  .editorialRail h2 {
    font-size: clamp(3.2rem, 7vw, 4.5rem);
  }
}

@media (max-width: 640px) {
  .shopLookShell {
    padding-top: 3.5rem;
    padding-bottom: 4rem;
  }

  .productCardDiv {
    grid-template-columns: 4rem minmax(0, 1fr);
    gap: .85rem;
    padding: .75rem;
  }

  .cardThumb {
    width: 4rem;
    height: 4rem;
  }

  .cardAction {
    grid-column: 1 / -1;
    width: 100%;
    margin-top: .35rem;
  }

  .actionBtn {
    width: 100%;
    justify-content: center;
  }

  .footerActionRow {
    flex-direction: column;
    align-items: stretch;
  }

  .exploreLink {
    width: 100%;
    justify-content: center;
  }

  .desktopAnnotations {
    display: none;
  }
}
`;

fs.writeFileSync('components/shop/TrendingDrops.jsx', trendingDropsJsx, 'utf-8');
fs.writeFileSync('components/shop/TrendingDrops.module.css', trendingDropsCss, 'utf-8');
console.log('TrendingDrops updated successfully!');
