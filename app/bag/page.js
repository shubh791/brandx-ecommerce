'use client';

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
