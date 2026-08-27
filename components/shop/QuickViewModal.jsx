'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Truck,
  Plus,
  Minus,
  MapPin,
  Star,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useShop();

  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.image);
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setSelectedColor(quickViewProduct.colors[0] || 'Standard');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const discountPercent = quickViewProduct.originalPrice
    ? Math.round(
        ((quickViewProduct.originalPrice - quickViewProduct.price) /
          quickViewProduct.originalPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl overflow-hidden text-zinc-900 my-8"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-black hover:bg-zinc-200 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Gallery Column */}
            <div className="space-y-3">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <img
                  src={activeImage || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="h-full w-full object-cover object-center"
                />

                {quickViewProduct.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge variant={quickViewProduct.badgeType || 'dark'}>
                      {quickViewProduct.badge}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
                <div className="flex gap-2">
                  {quickViewProduct.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative h-14 w-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === imgUrl ? 'border-black scale-105' : 'border-zinc-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="thumbnail" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="uppercase tracking-widest font-semibold text-zinc-700">{quickViewProduct.categoryLabel}</span>
                  <span>•</span>
                  <span className="font-bold text-black">{quickViewProduct.gsm}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 mt-1">
                  {quickViewProduct.name}
                </h2>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{quickViewProduct.rating}</span>
                    <span className="text-zinc-400 font-normal">({quickViewProduct.reviewsCount})</span>
                  </div>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock Samalkha
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black font-mono text-zinc-950">
                    ₹{quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <>
                      <span className="text-sm font-mono text-zinc-400 line-through">
                        ₹{quickViewProduct.originalPrice}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-bold">
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-zinc-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Colors */}
                {quickViewProduct.colors && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase">
                      Colorway: <strong className="text-black">{selectedColor}</strong>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 rounded-xl text-xs font-mono border transition-all ${
                            selectedColor === color
                              ? 'bg-black text-white font-bold border-black'
                              : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-200'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                <div className="mt-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase">
                      Select Size: <strong className="text-black">{selectedSize}</strong>
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">{quickViewProduct.fit}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-9 min-w-[36px] px-3 rounded-xl text-xs font-mono font-bold border transition-all ${
                          selectedSize === size
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4 pt-3 border-t border-zinc-100 space-y-1">
                  {quickViewProduct.highlights.slice(0, 3).map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-600">
                      <Sparkles className="w-3 h-3 text-black shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-100 space-y-2.5">
                <div className="flex gap-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-zinc-600 hover:text-black font-bold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs font-bold w-4 text-center text-black">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-zinc-600 hover:text-black font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1 font-bold shadow-md"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Bag (₹{quickViewProduct.price * quantity})
                  </Button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
                      inWishlist
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-black'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-black" /> Free express delivery over ₹999
                  </span>
                  <span className="flex items-center gap-1 text-black font-semibold">
                    <MapPin className="w-3.5 h-3.5" /> Samalkha, Panipat Flagship
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
