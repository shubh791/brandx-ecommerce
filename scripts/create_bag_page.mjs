import fs from 'fs';

if (!fs.existsSync('app/bag')) {
  fs.mkdirSync('app/bag', { recursive: true });
}
if (!fs.existsSync('app/cart')) {
  fs.mkdirSync('app/cart', { recursive: true });
}

const bagPageCss = `.pageWrapper {
  --bag-canvas: #f4f2ed;
  --bag-ink: #09090b;
  --bag-muted: #65656d;
  --bag-line: rgba(9, 9, 11, 0.14);
  --bag-accent: #f2cf45;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bag-canvas);
  color: var(--bag-ink);
  user-select: none;
}

.mainContent {
  flex: 1;
}

/* =========================================================
   1. EDITORIAL BAG HEADER
   ========================================================= */
.headerSection {
  position: relative;
  overflow: hidden;
  background: var(--bag-canvas);
  border-bottom: 1px solid var(--bag-line);
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
  color: var(--bag-muted);
  text-transform: uppercase;
}

.breadcrumb a {
  color: var(--bag-muted);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--bag-ink);
}

.breadcrumbSep {
  color: #a1a1aa;
}

.breadcrumbCurrent {
  color: var(--bag-ink);
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
  color: var(--bag-ink);
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
  color: var(--bag-ink);
  text-transform: uppercase;
  margin: 0;
}

.pageDesc {
  color: var(--bag-muted);
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
   2. MAIN 2-COLUMN BAG LAYOUT
   ========================================================= */
.bagShell {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(2rem, 3.5vw, 3.5rem) clamp(1rem, 2.5vw, 2.5rem);
}

.bagLayout {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.95fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

/* Items List Column */
.itemsCol {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bagItemCard {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem;
  background: #ffffff;
  border: 1px solid var(--bag-line);
}

.itemThumbWrap {
  width: 6.5rem;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f4f2ed;
  flex-shrink: 0;
  display: block;
}

.itemThumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.itemInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.65rem;
}

.itemHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.itemTitle {
  font-size: 1rem;
  font-weight: 850;
  color: var(--bag-ink);
  text-decoration: none;
  line-height: 1.2;
}

.itemTitle:hover {
  text-decoration: underline;
}

.itemMeta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.35rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--bag-muted);
}

.metaBadge {
  padding: 0.15rem 0.4rem;
  background: #f4f2ed;
  border: 1px solid var(--bag-line);
  color: var(--bag-ink);
}

.dispatchNotice {
  font-size: 0.68rem;
  color: #15803d;
  font-family: var(--font-geist-mono), monospace;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

/* Actions Row */
.itemBottomRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(9, 9, 11, 0.08);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.qtyBox {
  display: flex;
  align-items: center;
  background: #f4f2ed;
  border: 1px solid var(--bag-line);
  padding: 0 0.4rem;
  height: 2.2rem;
}

.qtyBtn {
  width: 1.5rem;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--bag-ink);
  cursor: pointer;
}

.qtyVal {
  width: 1.5rem;
  text-align: center;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  font-weight: 850;
  color: var(--bag-ink);
}

.itemPriceGroup {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.itemPrice {
  font-family: var(--font-geist-mono), monospace;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--bag-ink);
}

.itemOriginalPrice {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.78rem;
  color: #a1a1aa;
  text-decoration: line-through;
}

.itemToolActions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.toolActionBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--bag-muted);
  cursor: pointer;
  text-transform: uppercase;
}

.toolActionBtn:hover {
  color: var(--bag-ink);
}

/* ---------------------------------------------------------
   STICKY ORDER SUMMARY COLUMN
   --------------------------------------------------------- */
.summaryStickyCol {
  position: sticky;
  top: 5.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.summaryBox {
  background: #ffffff;
  border: 1px solid var(--bag-line);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.summaryHeading {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--bag-ink);
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--bag-line);
}

/* Coupon Form */
.promoForm {
  display: flex;
  gap: 0.45rem;
}

.promoInput {
  flex: 1;
  padding: 0.6rem 0.75rem;
  background: #f4f2ed;
  border: 1px solid var(--bag-line);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  color: var(--bag-ink);
  text-transform: uppercase;
  outline: none;
}

.promoInput:focus {
  background: #ffffff;
  border-color: var(--bag-ink);
}

.promoBtn {
  padding: 0.6rem 1.1rem;
  background: var(--bag-ink);
  color: #ffffff;
  border: 1px solid var(--bag-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.65rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.appliedPromoBadge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
  color: #065f46;
}

.removePromoBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #065f46;
  font-weight: bold;
}

/* Cost Breakdown */
.costBreakdown {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  color: #52525b;
}

.costRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.costTotalRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--bag-line);
  font-size: 1.15rem;
  font-weight: 900;
  color: var(--bag-ink);
}

/* Checkout Button */
.checkoutBtn {
  width: 100%;
  padding: 1rem 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  background: var(--bag-ink);
  color: #ffffff;
  border: 1px solid var(--bag-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.checkoutBtn:hover {
  background: #27272a;
  transform: translateY(-1px);
}

/* Compact Trust Row */
.trustStrip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  background: #ffffff;
  border: 1px solid var(--bag-line);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.58rem;
  font-weight: 800;
  color: var(--bag-muted);
}

.trustItem {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.trustDivider {
  color: #d4d4d8;
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
  border: 1px solid var(--bag-line);
  gap: 1.15rem;
}

.emptyIconWrap {
  width: 4rem;
  height: 4rem;
  display: grid;
  place-items: center;
  background: #f4f2ed;
  border: 1px solid var(--bag-line);
  color: var(--bag-ink);
}

.emptyState h2 {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--bag-ink);
}

.emptyState p {
  color: var(--bag-muted);
  font-size: 0.88rem;
  max-width: 24rem;
  line-height: 1.5;
}

.continueBtn {
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.75rem;
  background: var(--bag-ink);
  color: #ffffff;
  border: 1px solid var(--bag-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.continueBtn:hover {
  background: #27272a;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 900px) {
  .bagLayout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .summaryStickyCol {
    position: static;
  }
}

@media (max-width: 640px) {
  .headerSection {
    padding: 1.75rem 1rem;
  }

  .bagShell {
    padding: 1.25rem 0.85rem 3rem;
  }

  .pageTitle {
    font-size: 2.2rem;
  }

  .bagItemCard {
    padding: 0.85rem;
    gap: 0.85rem;
  }

  .itemThumbWrap {
    width: 5rem;
  }

  .itemTitle {
    font-size: 0.88rem;
  }

  .trustStrip {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
  }

  .trustDivider {
    display: none;
  }
}
`;

fs.writeFileSync('app/bag/BagPage.module.css', bagPageCss, 'utf-8');

// Create app/bag/page.js
const bagPageJsx = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useShop } from '@/context/ShopContext';
import {
  ShoppingBag,
  Heart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import styles from './BagPage.module.css';

export default function BagPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    cartItemCount,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    clearCart,
    moveToWishlist,
    showToast,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1000);
  };

  const handleFinishOrder = () => {
    setCheckoutSuccess(false);
    clearCart();
    showToast('Thank you! Order recorded for express dispatch.', 'success');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* 1. Editorial Bag Header */}
        <section className={styles.headerSection} aria-label="Shopping Bag Header">
          <div className={styles.headerShell}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">HOME</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>YOUR BAG</span>
            </nav>

            <div className={styles.headerRow}>
              <div className={styles.headerTitleBlock}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} aria-hidden="true" />
                  <span>SAMALKHA / ACTIVE SELECTION</span>
                </div>
                <h1 className={styles.pageTitle}>YOUR BAG</h1>
              </div>

              <p className={styles.pageDesc}>
                {cartItemCount === 0
                  ? 'Your shopping bag is currently empty.'
                  : 'You have ' + cartItemCount + ' piece' + (cartItemCount === 1 ? '' : 's') + ' prepared for express dispatch.'}
              </p>
            </div>
          </div>

          <span className={styles.watermarkWord} aria-hidden="true">BAG</span>
        </section>

        {/* 2. Main Bag Body */}
        <section className={styles.bagShell}>
          {checkoutSuccess ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap} style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h2>ORDER CONFIRMED • SAMALKHA DISPATCH</h2>
              <p>
                Your order has been recorded. Our team at <strong>Samalkha Flagship Hub</strong> will pack and dispatch your streetwear pieces in heavyweight dust bags within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleFinishOrder}
                className={styles.continueBtn}
              >
                <span>RETURN TO VAULT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h2>YOUR BAG IS EMPTY</h2>
              <p>
                Browse our seasonal drops of heavyweight tees, hoodies, and tactical denim to start your order.
              </p>
              <Link href="/category/all" className={styles.continueBtn}>
                <span>CONTINUE SHOPPING</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className={styles.bagLayout}>
              {/* Left Column: Cart Items List */}
              <div className={styles.itemsCol}>
                {cart.map((item) => (
                  <div key={item.uniqueCartId} className={styles.bagItemCard}>
                    <Link href={'/product/' + item.id} className={styles.itemThumbWrap}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.itemThumb}
                      />
                    </Link>

                    <div className={styles.itemInfo}>
                      <div>
                        <div className={styles.itemHeader}>
                          <Link href={'/product/' + item.id} className={styles.itemTitle}>
                            {item.name}
                          </Link>
                        </div>

                        <div className={styles.itemMeta}>
                          <span className={styles.metaBadge}>SIZE: {item.selectedSize}</span>
                          {item.gsm && <span className={styles.metaBadge}>{item.gsm}</span>}
                          {item.selectedColor && <span>COLOR: {item.selectedColor}</span>}
                        </div>
                      </div>

                      <div className={styles.dispatchNotice}>
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dispatched from Samalkha Hub in 24h</span>
                      </div>

                      <div className={styles.itemBottomRow}>
                        {/* Quantity Controls */}
                        <div className={styles.qtyBox}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.uniqueCartId, -1)}
                            className={styles.qtyBtn}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className={styles.qtyVal}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.uniqueCartId, 1)}
                            className={styles.qtyBtn}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Group */}
                        <div className={styles.itemPriceGroup}>
                          <span className={styles.itemPrice}>₹{item.price * item.quantity}</span>
                          {item.originalPrice && (
                            <span className={styles.itemOriginalPrice}>
                              ₹{item.originalPrice * item.quantity}
                            </span>
                          )}
                        </div>

                        {/* Tool Actions: Move to Wishlist & Remove */}
                        <div className={styles.itemToolActions}>
                          <button
                            type="button"
                            onClick={() => moveToWishlist(item)}
                            className={styles.toolActionBtn}
                            title="Move to Wishlist"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            <span>SAVE TO WISHLIST</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.uniqueCartId)}
                            className={styles.toolActionBtn}
                            title="Remove from bag"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>REMOVE</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Sticky Order Summary */}
              <div className={styles.summaryStickyCol}>
                <div className={styles.summaryBox}>
                  <h3 className={styles.summaryHeading}>ORDER SUMMARY</h3>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className={styles.promoForm}>
                    <input
                      type="text"
                      placeholder="COUPON (BRANDX10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className={styles.promoInput}
                    />
                    <button type="submit" className={styles.promoBtn}>
                      APPLY
                    </button>
                  </form>

                  {appliedPromo && (
                    <div className={styles.appliedPromoBadge}>
                      <span>Coupon {appliedPromo.code} Applied (-₹{cartDiscount})</span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className={styles.removePromoBtn}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <p style={{ color: '#dc2626', fontSize: '0.65rem', fontFamily: 'monospace', margin: 0 }}>
                      {promoError}
                    </p>
                  )}

                  {/* Cost Breakdown */}
                  <div className={styles.costBreakdown}>
                    <div className={styles.costRow}>
                      <span>Subtotal ({cartItemCount} items)</span>
                      <strong style={{ color: 'var(--bag-ink)' }}>₹{cartSubtotal}</strong>
                    </div>

                    {cartDiscount > 0 && (
                      <div className={styles.costRow} style={{ color: '#15803d' }}>
                        <span>Promo Discount</span>
                        <strong>-₹{cartDiscount}</strong>
                      </div>
                    )}

                    <div className={styles.costRow}>
                      <span>Express Shipping</span>
                      <strong style={{ color: cartShipping === 0 ? '#15803d' : 'var(--bag-ink)' }}>
                        {cartShipping === 0 ? 'FREE' : '₹' + cartShipping}
                      </strong>
                    </div>

                    <div className={styles.costTotalRow}>
                      <span>Total Amount</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    disabled={isCheckingOut}
                    className={styles.checkoutBtn}
                  >
                    <span>{isCheckingOut ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Compact Trust Strip */}
                <div className={styles.trustStrip}>
                  <div className={styles.trustItem}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SECURE PAYMENT</span>
                  </div>
                  <span className={styles.trustDivider}>•</span>
                  <div className={styles.trustItem}>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>7-DAY EXCHANGE</span>
                  </div>
                  <span className={styles.trustDivider}>•</span>
                  <div className={styles.trustItem}>
                    <Truck className="w-3.5 h-3.5" />
                    <span>SAMALKHA DISPATCH</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
`;

fs.writeFileSync('app/bag/page.js', bagPageJsx, 'utf-8');

// Also create app/cart/page.js redirecting or rendering BagPage
const cartRedirectJsx = `'use client';

import BagPage from '../bag/page';

export default function CartPage() {
  return <BagPage />;
}
`;

fs.writeFileSync('app/cart/page.js', cartRedirectJsx, 'utf-8');
console.log('Bag & Cart pages created successfully!');
