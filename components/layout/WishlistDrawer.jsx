'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, moveToCart } = useShop();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer */}
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
                  <div className="flex h-8 w-8 items-center justify-center bg-black text-[#f2cf45] border border-black">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h2 className="text-xs font-mono font-black tracking-widest uppercase text-zinc-950">
                      YOUR WISHLIST
                    </h2>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {wishlist.length} {wishlist.length === 1 ? 'PIECE' : 'PIECES'} SAVED
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  className="flex h-8 w-8 items-center justify-center bg-white border border-zinc-200 text-zinc-600 hover:text-black"
                  aria-label="Close wishlist drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              {wishlist.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center bg-white border border-zinc-200 text-zinc-400">
                    <Heart className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-zinc-950">
                    WISHLIST EMPTY
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                    Save your favorite streetwear pieces to access and order them whenever drops release.
                  </p>
                  <Link
                    href="/category/all"
                    onClick={() => setIsWishlistOpen(false)}
                    className="mt-2 px-5 py-2.5 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-zinc-800"
                  >
                    <span>EXPLORE COLLECTION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-zinc-200">
                    {wishlist.map((item) => (
                      <div key={item.id} className="pt-3 first:pt-0 flex gap-3.5 items-start">
                        <Link
                          href={'/product/' + item.id}
                          onClick={() => setIsWishlistOpen(false)}
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
                                onClick={() => setIsWishlistOpen(false)}
                                className="text-xs font-bold text-zinc-950 line-clamp-1 hover:underline"
                              >
                                {item.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => toggleWishlist(item)}
                                className="text-zinc-400 hover:text-black p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-mono font-bold text-zinc-900">
                                ₹{item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-[10px] font-mono text-zinc-400 line-through">
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => moveToCart(item, item.sizes?.[0] || 'M')}
                              className="w-full py-2 bg-black text-white text-[11px] font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-zinc-800"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>MOVE TO BAG</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-4 border-t border-zinc-200 bg-white">
                    <Link
                      href="/wishlist"
                      onClick={() => setIsWishlistOpen(false)}
                      className="w-full py-2.5 bg-[#f4f2ed] border border-zinc-300 text-black text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white hover:border-black transition-colors"
                    >
                      <span>VIEW FULL WISHLIST PAGE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
