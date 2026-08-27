import fs from 'fs';

// 1. Update context/ShopContext.jsx with rock-solid route change scroll restoration
const shopContextJsx = `'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { productsData } from '../data/productsData';
import { promoCodes } from '../data/promoData';
import { siteConfig } from '../data/siteConfig';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const pathname = usePathname();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Load user-added items from localStorage on initial mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('bx_cart_v2');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('bx_wishlist_v2');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Persist user-added cart items
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('bx_cart_v2', JSON.stringify(cart));
    } catch (e) {}
  }, [cart, isLoaded]);

  // Persist user-added wishlist items
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('bx_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist, isLoaded]);

  // AUTOMATIC ROUTE CHANGE CLEANUP: Close all overlays & ensure body scroll is NEVER trapped
  useEffect(() => {
    setActiveOverlay(null);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, [pathname]);

  // SINGLE CENTRALIZED BODY SCROLL LOCK MANAGER
  useEffect(() => {
    if (activeOverlay) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setActiveOverlay(null);
      }
    };

    window.addEventListener('keydown', handleEscape, { passive: true });
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeOverlay]);

  const toggleOverlay = useCallback((name) => {
    setActiveOverlay((current) => (current === name ? null : name));
  }, []);

  const closeAllOverlays = useCallback(() => {
    setActiveOverlay(null);
  }, []);

  const isCartOpen = activeOverlay === 'cart';
  const setIsCartOpen = useCallback((val) => {
    if (typeof val === 'function') {
      setActiveOverlay((curr) => (val(curr === 'cart') ? 'cart' : null));
    } else {
      setActiveOverlay(val ? 'cart' : null);
    }
  }, []);

  const isWishlistOpen = activeOverlay === 'wishlist';
  const setIsWishlistOpen = useCallback((val) => {
    if (typeof val === 'function') {
      setActiveOverlay((curr) => (val(curr === 'wishlist') ? 'wishlist' : null));
    } else {
      setActiveOverlay(val ? 'wishlist' : null);
    }
  }, []);

  const isAuthModalOpen = activeOverlay === 'auth';
  const openAuthModal = useCallback((mode = 'login') => {
    setAuthModalMode(mode);
    setActiveOverlay('auth');
  }, []);
  const closeAuthModal = useCallback(() => {
    setActiveOverlay(null);
  }, []);

  const isMobileMenuOpen = activeOverlay === 'menu';
  const setIsMobileMenuOpen = useCallback((val) => {
    if (typeof val === 'function') {
      setActiveOverlay((curr) => (val(curr === 'menu') ? 'menu' : null));
    } else {
      setActiveOverlay(val ? 'menu' : null);
    }
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToastMessage({ message, type, id });
    setTimeout(() => {
      setToastMessage((current) => (current?.id === id ? null : current));
    }, 3200);
  }, []);

  const addToCart = useCallback((product, size = null, quantity = 1, color = null) => {
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
  }, [showToast]);

  const removeFromCart = useCallback((uniqueCartId) => {
    setCart((prev) => prev.filter((item) => item.uniqueCartId !== uniqueCartId));
    showToast('Item removed from Bag', 'info');
  }, [showToast]);

  const updateQuantity = useCallback((uniqueCartId, delta) => {
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
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product) => {
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
  }, [showToast]);

  const isInWishlist = useCallback((productId) => wishlist.some((item) => item.id === productId), [wishlist]);

  const moveToCart = useCallback((product, size = null) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    addToCart(product, chosenSize, 1);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast('Moved "' + product.name + '" (' + chosenSize + ') to Bag', 'success');
  }, [addToCart, showToast]);

  const moveToWishlist = useCallback((cartItem) => {
    const matchedProduct = productsData.find((p) => p.id === cartItem.id) || cartItem;
    toggleWishlist(matchedProduct);
    removeFromCart(cartItem.uniqueCartId);
    showToast('Moved "' + cartItem.name + '" to Wishlist', 'success');
  }, [toggleWishlist, removeFromCart, showToast]);

  const openQuickView = useCallback((product) => setQuickViewProduct(product), []);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  const applyPromoCode = useCallback((inputCode) => {
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
  }, [showToast]);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
    setPromoError(null);
    showToast('Coupon removed', 'info');
  }, [showToast]);

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

// 2. Clean up Navbar.jsx (remove redundant body scroll lock that conflicted with ShopContext)
let navbarJsx = fs.readFileSync('components/layout/Navbar.jsx', 'utf-8');

// Remove the conflicting duplicate useEffect in Navbar.jsx
const navScrollLockRegex = /useEffect\(\(\)\s*=>\s*\{\s*if\s*\(!isMobileMenuOpen\)\s*return\s*undefined;[\s\S]*?\}, \[isMobileMenuOpen\]\);/;
if (navScrollLockRegex.test(navbarJsx)) {
  navbarJsx = navbarJsx.replace(navScrollLockRegex, '');
  fs.writeFileSync('components/layout/Navbar.jsx', navbarJsx, 'utf-8');
}

// 3. Update HeroBanner.jsx (Optimize GSAP matchMedia & ensure proper cleanup + passive listeners)
let heroJsx = fs.readFileSync('components/shop/HeroBanner.jsx', 'utf-8');
const optimizedHeroBanner = `'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './HeroBanner.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const fashionObjects = [
  { id: 'cream-tee', src: '/images/hero/hero-cream-tee.png', alt: 'Cream oversized Brand X T-shirt', className: styles.creamTee, depth: 0.55, width: 1024, height: 1536 },
  { id: 'denim', src: '/images/hero/hero-denim.png', alt: 'Washed black premium denim jeans', className: styles.denim, depth: 0.75, width: 1024, height: 1536 },
  { id: 'blue-denim', src: '/images/hero/hero-blue-denim.png', alt: 'Premium indigo blue denim jeans', className: styles.blueDenim, depth: 0.85, width: 928, height: 1856 },
  { id: 'black-tee', src: '/images/hero/hero-black-tee.png', alt: 'Black oversized Brand X T-shirt', className: styles.blackTee, depth: 1.1, width: 1024, height: 1536 },
  { id: 'bag', src: '/images/hero/hero-brandx-bag.png', alt: 'Black Brand X Samalkha shopping bag', className: styles.bag, depth: 1.2, width: 1024, height: 1536 },
  { id: 'black-sneaker', src: '/images/hero/hero-black-sneaker.png', alt: 'Black Brand X streetwear runner sneaker', className: styles.blackSneaker, depth: 1.35, width: 1200, height: 800 },
  { id: 'sneakers', src: '/images/hero/hero-sneakers.png', alt: 'White and black Brand X streetwear sneakers', className: styles.sneakers, depth: 1.45, width: 1536, height: 1024 },
];

export function HeroBanner() {
  const heroRef = useRef(null);
  const visualRef = useRef(null);

  useGSAP(() => {
    const root = heroRef.current;
    const visual = visualRef.current;
    if (!root || !visual) return;

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set([
        \`.\${styles.eyebrow}\`,
        \`.\${styles.headlineLine}\`,
        \`.\${styles.description}\`,
        \`.\${styles.actions}\`,
        \`.\${styles.trustStrip}\`,
        \`.\${styles.fashionObject}\`,
        \`.\${styles.chromeX}\`,
        \`.\${styles.annotation}\`,
      ], { clearProps: 'all' });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from(\`.\${styles.eyebrow}\`, { opacity: 0, y: 14, duration: 0.55 })
      .from(\`.\${styles.headlineLine}\`, {
        opacity: 0,
        yPercent: 110,
        rotate: 2,
        duration: 0.82,
        stagger: 0.1,
      }, '-=0.24')
      .from(\`.\${styles.description}\`, { opacity: 0, y: 18, duration: 0.62 }, '-=0.38')
      .from(\`.\${styles.actions}\`, { opacity: 0, y: 16, duration: 0.58 }, '-=0.4')
      .from(\`.\${styles.trustStrip}\`, { opacity: 0, y: 12, duration: 0.5 }, '-=0.32')
      .from(\`.\${styles.fashionObject}\`, {
        opacity: 0,
        x: (index) => [-50, 40, 75, -70, 50, -35, 95][index],
        y: (index) => [-60, 40, 55, 70, 85, 80, 90][index],
        scale: 0.75,
        duration: 1.05,
        stagger: 0.07,
      }, 0.2)
      .from(\`.\${styles.chromeX}\`, {
        opacity: 0,
        scale: 0.62,
        rotate: -24,
        duration: 1.15,
        ease: 'expo.out',
      }, 0.32)
      .from(\`.\${styles.annotation}\`, { opacity: 0, duration: 0.45, stagger: 0.08 }, '-=0.36');

    // Subtle ambient floating tweens
    gsap.to(\`.\${styles.blackTee} .\${styles.objectPlane}\`, {
      y: -8, rotateZ: -1.2, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.creamTee} .\${styles.objectPlane}\`, {
      y: 7, rotateZ: 1, duration: 4.6, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.denim} .\${styles.objectPlane}\`, {
      y: 6, rotateZ: -0.8, duration: 4.4, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.blueDenim} .\${styles.objectPlane}\`, {
      y: -5, rotateZ: 1.0, duration: 4.0, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.bag} .\${styles.objectPlane}\`, {
      y: -6, rotateZ: 1.4, duration: 3.3, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.blackSneaker} .\${styles.objectPlane}\`, {
      y: -6, rotateZ: -1.0, duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.sneakers} .\${styles.objectPlane}\`, {
      y: -7, rotateZ: -0.8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(\`.\${styles.chromeX}\`, {
      rotationY: '+=8', rotationX: '-=4', duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

    const mm = gsap.matchMedia();

    // Run interactive pointer parallax ONLY on desktop with mouse (pointer: fine)
    mm.add('(min-width: 1024px) and (pointer: fine)', () => {
      const objects = gsap.utils.toArray(\`.\${styles.parallaxLayer}\`);
      const moveTo = objects.map((object) => ({
        x: gsap.quickTo(object, 'x', { duration: 0.65, ease: 'power3.out' }),
        y: gsap.quickTo(object, 'y', { duration: 0.65, ease: 'power3.out' }),
        rotationY: gsap.quickTo(object, 'rotationY', { duration: 0.8, ease: 'power3.out' }),
        rotationX: gsap.quickTo(object, 'rotationX', { duration: 0.8, ease: 'power3.out' }),
      }));

      const handlePointerMove = (event) => {
        const bounds = visual.getBoundingClientRect();
        const normalX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const normalY = (event.clientY - bounds.top) / bounds.height - 0.5;
        objects.forEach((object, index) => {
          const depth = Number(object.dataset.depth || 0.5);
          moveTo[index].x(normalX * 16 * depth);
          moveTo[index].y(normalY * 12 * depth);
          moveTo[index].rotationY(normalX * 2.2 * depth);
          moveTo[index].rotationX(normalY * -1.6 * depth);
        });
      };

      const resetPointer = () => {
        moveTo.forEach((move) => {
          move.x(0);
          move.y(0);
          move.rotationY(0);
          move.rotationX(0);
        });
      };

      visual.addEventListener('pointermove', handlePointerMove, { passive: true });
      visual.addEventListener('pointerleave', resetPointer, { passive: true });
      return () => {
        visual.removeEventListener('pointermove', handlePointerMove);
        visual.removeEventListener('pointerleave', resetPointer);
      };
    });

    // Scroll scrub with proper trigger scope
    const scrubTween = gsap.to(visual, {
      yPercent: 6,
      scale: 0.98,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });

    return () => {
      mm.revert();
      scrubTween.kill();
    };
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="brandx-hero-title">
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}><span aria-hidden="true" />BRAND X / SAMALKHA</div>

          <h1 id="brandx-hero-title" className={styles.headline}>
            <span className={styles.lineMask}><span className={styles.headlineLine}>STYLE THAT</span></span>
            <span className={styles.lineMask}><span className={styles.headlineLine}>DOESN&apos;T</span></span>
            <span className={styles.lineMask}><span className={styles.headlineLine}>BLEND IN.</span></span>
          </h1>

          <p className={styles.description}>
            Streetwear made for the bold. High-density 240–450 GSM cottons, architectural silhouettes, and zero compromise. Visit the Samalkha flagship or cop online.
          </p>

          <div className={styles.actions}>
            <Link href="/category/all" className={styles.primaryCta}>
              <span>EXPLORE COLLECTION</span>
              <ArrowRight aria-hidden="true" />
            </Link>

            <Link href="/#store-location" className={styles.secondaryCta}>
              <span>VISIT SAMALKHA</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.trustStrip}>
            <div className={styles.trustItem}>
              <strong>240–450 GSM</strong>
              <span>Heavyweight build</span>
            </div>
            <div className={styles.trustItem}>
              <strong>100% COTTON</strong>
              <span>Combed & bio-washed</span>
            </div>
            <div className={styles.trustItem}>
              <strong>SAME-DAY DISPATCH</strong>
              <span>From Samalkha Hub</span>
            </div>
          </div>
        </div>

        <div ref={visualRef} className={styles.visual}>
          <div className={styles.scene}>
            <div className={styles.ambientGlow} aria-hidden="true" />

            <div className={[styles.parallaxLayer, styles.chromeX].join(' ')} data-depth="0.35">
              <span className={styles.chromeXText} aria-hidden="true">X</span>
            </div>

            {fashionObjects.map((obj) => (
              <div
                key={obj.id}
                className={[styles.parallaxLayer, styles.fashionObject, obj.className].join(' ')}
                data-depth={obj.depth}
              >
                <div className={styles.objectPlane}>
                  <Image
                    src={obj.src}
                    alt={obj.alt}
                    width={obj.width}
                    height={obj.height}
                    priority={obj.id === 'black-tee' || obj.id === 'cream-tee'}
                    sizes="(max-width: 768px) 70vw, 420px"
                    className={styles.objectImage}
                  />
                </div>
              </div>
            ))}

            <div className={[styles.annotation, styles.annotationGsm].join(' ')}>
              <span>HEAVYWEIGHT 450 GSM</span>
            </div>
            <div className={[styles.annotation, styles.annotationFit].join(' ')}>
              <span>BOXY ARCHITECTURAL FIT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('components/shop/HeroBanner.jsx', optimizedHeroBanner, 'utf-8');

// 4. Update globals.css with overflow-x: clip for bulletproof mobile scrolling
const globalsCss = `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #09090b;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
}

html {
  overflow-x: clip;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: #ffffff;
  color: #09090b;
  font-family: var(--font-sans);
  overflow-x: clip;
  min-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: #09090b;
  color: #ffffff;
}

/* Custom Clean Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f4f4f5;
}

::-webkit-scrollbar-thumb {
  background: #d4d4d8;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1aa;
}

/* Infinite Marquee Animation */
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 28s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
`;

fs.writeFileSync('app/globals.css', globalsCss, 'utf-8');
console.log('Scroll lock stability, route change cleanup, and GSAP optimizations applied!');
