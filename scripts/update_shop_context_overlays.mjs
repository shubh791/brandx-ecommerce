import fs from 'fs';

const shopContextJsx = `'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsData } from '../data/productsData';
import { promoCodes } from '../data/promoData';
import { siteConfig } from '../data/siteConfig';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // Centralized active overlay state: null | 'cart' | 'wishlist' | 'auth' | 'menu'
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'signup'
  
  // Default demo user for seamless account experience
  const [user, setUser] = useState({
    name: 'Aman Verma',
    email: 'aman.verma@brandx.in',
    phone: '+91 98120 44550',
    isVip: true,
    tier: 'VIP ARCHIVE TIER 01',
    address: 'Flat 402, Block B, Samalkha Grandeur, NH-44, Samalkha, Haryana 132101',
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize sample wishlist items for rich initial demo if empty
  useEffect(() => {
    if (productsData.length >= 2) {
      setWishlist([productsData[0], productsData[1]]);
      setCart([
        {
          ...productsData[0],
          selectedSize: 'L',
          selectedColor: productsData[0].color || 'Standard',
          quantity: 1,
          uniqueCartId: productsData[0].id + '-L-' + (productsData[0].color || 'Standard'),
        },
      ]);
    }
  }, []);

  // Global Body Scroll Lock & Escape Key Handler for Overlays
  useEffect(() => {
    if (!activeOverlay) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setActiveOverlay(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeOverlay]);

  const toggleOverlay = (name) => {
    setActiveOverlay((current) => (current === name ? null : name));
  };

  const closeAllOverlays = () => {
    setActiveOverlay(null);
  };

  const isCartOpen = activeOverlay === 'cart';
  const setIsCartOpen = (val) => {
    if (typeof val === 'function') {
      setActiveOverlay((curr) => (val(curr === 'cart') ? 'cart' : null));
    } else {
      setActiveOverlay(val ? 'cart' : null);
    }
  };

  const isWishlistOpen = activeOverlay === 'wishlist';
  const setIsWishlistOpen = (val) => {
    if (typeof val === 'function') {
      setActiveOverlay((curr) => (val(curr === 'wishlist') ? 'wishlist' : null));
    } else {
      setActiveOverlay(val ? 'wishlist' : null);
    }
  };

  const isAuthModalOpen = activeOverlay === 'auth';
  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setActiveOverlay('auth');
  };
  const closeAuthModal = () => {
    setActiveOverlay(null);
  };

  const isMobileMenuOpen = activeOverlay === 'menu';
  const setIsMobileMenuOpen = (val) => {
    if (typeof val === 'function') {
      setActiveOverlay((curr) => (val(curr === 'menu') ? 'menu' : null));
    } else {
      setActiveOverlay(val ? 'menu' : null);
    }
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToastMessage({ message, type, id });
    setTimeout(() => {
      setToastMessage((current) => (current?.id === id ? null : current));
    }, 3200);
  };

  const addToCart = (product, size = null, quantity = 1, color = null) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    const chosenColor = color || product.color || 'Standard';
    const uniqueCartId = product.id + '-' + chosenSize + '-' + chosenColor;

    setCart((prev) => {
      const existing = prev.find((item) => item.uniqueCartId === uniqueCartId);
      if (existing) {
        return prev.map((item) =>
          item.uniqueCartId === uniqueCartId
            ? { ...item, quantity: item.quantity + (typeof quantity === 'number' ? quantity : 1) }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: typeof quantity === 'number' ? quantity : 1,
          uniqueCartId,
        },
      ];
    });

    showToast('Added "' + product.name + '" (' + chosenSize + ') to Bag', 'success');
  };

  const removeFromCart = (uniqueCartId) => {
    setCart((prev) => prev.filter((item) => item.uniqueCartId !== uniqueCartId));
    showToast('Item removed from Bag', 'info');
  };

  const updateQuantity = (uniqueCartId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.uniqueCartId === uniqueCartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast('Removed "' + product.name + '" from Wishlist', 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast('Saved "' + product.name + '" to Wishlist', 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  const moveToCart = (product, size = null) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    addToCart(product, chosenSize, 1);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast('Moved "' + product.name + '" (' + chosenSize + ') to Bag', 'success');
  };

  const moveToWishlist = (cartItem) => {
    const matchedProduct = productsData.find((p) => p.id === cartItem.id) || cartItem;
    toggleWishlist(matchedProduct);
    removeFromCart(cartItem.uniqueCartId);
    showToast('Moved "' + cartItem.name + '" to Wishlist', 'success');
  };

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const applyPromoCode = (inputCode) => {
    setPromoError(null);
    if (!inputCode) return false;
    const cleaned = inputCode.trim().toUpperCase();
    const match = promoCodes.find((p) => p.code.toUpperCase() === cleaned);

    if (!match) {
      setPromoError('Invalid code. Try BRANDX10 for 10% off');
      return false;
    }

    if (match.minOrder && cartSubtotal < match.minOrder) {
      setPromoError('Minimum order amount ₹' + match.minOrder + ' required for ' + match.code);
      return false;
    }

    setAppliedPromo(match);
    showToast('Coupon ' + match.code + ' applied!', 'success');
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
    showToast('Coupon removed', 'info');
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      cartDiscount = Math.round((cartSubtotal * appliedPromo.discountPercent) / 100);
    } else if (appliedPromo.discountFlat) {
      cartDiscount = appliedPromo.discountFlat;
    }
  }

  const cartShipping =
    cartSubtotal === 0 || cartSubtotal >= siteConfig.freeShippingThreshold
      ? 0
      : siteConfig.standardShippingFee;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products: productsData,
        cart,
        activeOverlay,
        setActiveOverlay,
        toggleOverlay,
        closeAllOverlays,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartItemCount,
        wishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        isItemWishlisted: isInWishlist,
        moveToCart,
        moveToWishlist,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        user,
        setUser,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
`;

fs.writeFileSync('context/ShopContext.jsx', shopContextJsx, 'utf-8');
console.log('ShopContext updated with centralized overlay management!');
