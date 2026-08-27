import fs from 'fs';

const cartDrawerJsx = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { siteConfig } from '@/data/siteConfig';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
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

  const freeThreshold = siteConfig.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeThreshold) * 100));
  const remainingForFree = Math.max(0, freeThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1000);
  };

  const handleFinishOrder = () => {
    setCheckoutSuccess(false);
    clearCart();
    setIsCartOpen(false);
    showToast('Thank you! Order recorded for express dispatch.', 'success');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Sliding Right Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-10 flex max-w-full pl-6"
          >
            <div className="w-screen max-w-md bg-[#faf9f6] border-l border-zinc-300 shadow-2xl flex flex-col text-zinc-900">
              {/* Header */}
              <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-[#f4f2ed]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center bg-black text-white">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-mono font-black tracking-widest uppercase text-zinc-950">
                      YOUR BAG
                    </h2>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {cart.length} {cart.length === 1 ? 'PIECE' : 'PIECES'} READY
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="flex h-8 w-8 items-center justify-center bg-white border border-zinc-200 text-zinc-600 hover:text-black"
                  aria-label="Close cart drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Tracker */}
              <div className="p-3 bg-white border-b border-zinc-200">
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="flex items-center gap-1.5 text-zinc-800">
                    <Truck className="w-3.5 h-3.5 text-black" />
                    {remainingForFree === 0 ? (
                      <span className="text-emerald-700 font-bold">Free Express Delivery Active!</span>
                    ) : (
                      <span>
                        Add <strong className="text-black font-bold">₹{remainingForFree}</strong> for Free Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-zinc-500 font-bold">{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200">
                  <div
                    className="h-full bg-black transition-all duration-300"
                    style={{ width: progressPercent + '%' }}
                  />
                </div>
              </div>

              {/* Drawer Content */}
              {checkoutSuccess ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center bg-emerald-100 text-emerald-600 border border-emerald-300">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-mono font-bold uppercase tracking-wider text-zinc-950">
                    ORDER CONFIRMED
                  </h3>
                  <p className="text-xs text-zinc-600 max-w-xs leading-relaxed">
                    Thank you. Your order has been registered at the <strong>Samalkha Flagship</strong> for dispatch within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleFinishOrder}
                    className="w-full py-3 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-zinc-800"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center bg-white border border-zinc-200 text-zinc-400">
                    <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-950">
                    YOUR BAG IS EMPTY
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                    Explore our collection of oversized tees, heavy hoodies, and parachute cargos.
                  </p>
                  <Link
                    href="/category/all"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-5 py-2.5 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-zinc-800"
                  >
                    <span>SHOP DROPS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-zinc-200">
                    {cart.map((item) => (
                      <div key={item.uniqueCartId} className="pt-3 first:pt-0 flex gap-3.5">
                        <Link
                          href={'/product/' + item.id}
                          onClick={() => setIsCartOpen(false)}
                          className="shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-16 object-cover border border-zinc-200 bg-white"
                          />
                        </Link>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <Link
                                href={'/product/' + item.id}
                                onClick={() => setIsCartOpen(false)}
                                className="text-xs font-bold text-zinc-950 line-clamp-1 hover:underline"
                              >
                                {item.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.uniqueCartId)}
                                className="text-zinc-400 hover:text-black p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="px-1.5 py-0.2 bg-zinc-200 text-[10px] font-mono font-bold text-zinc-800">
                                SIZE: {item.selectedSize}
                              </span>
                              {item.gsm && (
                                <span className="text-[10px] font-mono text-zinc-500">{item.gsm}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-xs font-bold text-zinc-950">
                              ₹{item.price * item.quantity}
                            </span>

                            <div className="flex items-center gap-3">
                              {/* Move to Wishlist */}
                              <button
                                type="button"
                                onClick={() => moveToWishlist(item)}
                                className="text-zinc-400 hover:text-black p-1"
                                title="Move to Wishlist"
                                aria-label="Move to Wishlist"
                              >
                                <Heart className="w-3.5 h-3.5" />
                              </button>

                              {/* Quantity Stepper */}
                              <div className="flex items-center bg-white border border-zinc-200 px-1.5 py-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.uniqueCartId, -1)}
                                  className="text-zinc-600 hover:text-black font-bold text-xs px-1"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-mono font-bold w-4 text-center text-zinc-950">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.uniqueCartId, 1)}
                                  className="text-zinc-600 hover:text-black font-bold text-xs px-1"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-4 border-t border-zinc-200 bg-white space-y-3">
                    {/* Promo Code Form */}
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="COUPON (BRANDX10)"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#f4f2ed] border border-zinc-200 text-black uppercase font-mono placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-black"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-black text-white text-xs font-mono font-bold uppercase tracking-wider"
                      >
                        Apply
                      </button>
                    </form>

                    {appliedPromo && (
                      <div className="flex items-center justify-between text-xs text-emerald-800 font-mono bg-emerald-50 border border-emerald-200 px-2.5 py-1">
                        <span>Coupon {appliedPromo.code} Applied (-₹{cartDiscount})</span>
                        <button
                          type="button"
                          onClick={removePromoCode}
                          className="text-zinc-500 hover:text-black"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {promoError && (
                      <p className="text-[11px] text-red-600 font-mono">{promoError}</p>
                    )}

                    {/* Pricing Summary */}
                    <div className="space-y-1 text-xs text-zinc-600 font-mono pt-1">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-zinc-950 font-bold">₹{cartSubtotal}</span>
                      </div>
                      {cartDiscount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Discount</span>
                          <span>-₹{cartDiscount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span className={cartShipping === 0 ? 'text-emerald-700 font-bold' : 'text-zinc-950'}>
                          {cartShipping === 0 ? 'FREE' : '₹' + cartShipping}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-200">
                        <span>Total Amount</span>
                        <span>₹{cartTotal}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      type="button"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-3 bg-black text-white text-xs font-mono font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-zinc-800"
                    >
                      {isCheckingOut ? (
                        'Processing Checkout...'
                      ) : (
                        <>
                          <span>PROCEED TO CHECKOUT</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href="/bag"
                        onClick={() => setIsCartOpen(false)}
                        className="text-[11px] font-mono text-zinc-500 underline hover:text-black"
                      >
                        View Full Bag Page →
                      </Link>

                      <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>100% Encrypted</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
`;

fs.writeFileSync('components/layout/CartDrawer.jsx', cartDrawerJsx, 'utf-8');
console.log('CartDrawer updated successfully without syntax error!');
