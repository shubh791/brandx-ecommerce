'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { navigationData } from '@/data/navigationData';
import styles from './Navbar.module.css';

const categoryFeaturedImages = {
  men: '/images/hero/refrence.png',
  'oversized-tees': '/images/hero/hero-cream-tee.png',
  hoodies: '/images/hero/hero-black-tee.png',
  'cargos-denim': '/images/hero/hero-blue-denim.png',
  tracksuits: '/images/hero/hero-denim.png',
  jackets: '/images/hero/hero-sneakers.png',
};

const menuTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };

export function Navbar() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const {
    cartItemCount,
    wishlist,
    activeOverlay,
    toggleOverlay,
    closeAllOverlays,
    setIsCartOpen,
    setIsWishlistOpen,
    openAuthModal,
    user,
    setUser,
    showToast,
    searchQuery,
    setSearchQuery,
    isMobileMenuOpen,
  } = useShop();

  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const megaMenuTimeoutRef = useRef(null);
  const profileTimeoutRef = useRef(null);
  const mobileToggleRef = useRef(null);

  const activeCategory = useMemo(
    () => navigationData.categories.find((category) => category.id === activeMegaMenu),
    [activeMegaMenu],
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => () => {
    clearTimeout(megaMenuTimeoutRef.current);
    clearTimeout(profileTimeoutRef.current);
  }, []);

  const handleMegaMenuEnter = (categoryId) => {
    clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(categoryId);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 140);
  };

  const handleProfileEnter = () => {
    clearTimeout(profileTimeoutRef.current);
    setIsProfileHovered(true);
  };

  const handleProfileLeave = () => {
    profileTimeoutRef.current = setTimeout(() => setIsProfileHovered(false), 140);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      router.push('/category/all?q=' + encodeURIComponent(searchQuery.trim()));
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileHovered(false);
    showToast('Signed out of Brand X', 'info');
  };

  const closeMobileMenu = () => {
    closeAllOverlays();
    setExpandedMobileCategory(null);
  };

  const toggleMobileAccordion = (catId) => {
    setExpandedMobileCategory((prev) => (prev === catId ? null : catId));
  };

  return (
    <header
      className={[
        styles.header,
        isScrolled ? styles.scrolled : '',
        isMobileMenuOpen ? styles.menuOpen : '',
      ].join(' ')}
    >
      {/* Top Navbar Container */}
      <div className={styles.navShell}>
        {/* Mobile Hamburger Menu Toggle (Touch target >= 44px) */}
        <button
          ref={mobileToggleRef}
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => toggleOverlay('menu')}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-fashion-menu"
        >
          {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className={styles.logo} aria-label="Brand X home" onClick={closeMobileMenu}>
          <span className={styles.logoMark}>X</span>
          <span className={styles.logoType}>
            <strong>BRANDX</strong>
            <small>SAMALKHA</small>
          </span>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigationData.categories.map((category) => {
            const hasMegaMenu = Boolean(category.megaMenu);
            const isActive = activeMegaMenu === category.id;
            return (
              <div
                key={category.id}
                className={styles.navItemWrap}
                onMouseEnter={() => hasMegaMenu && handleMegaMenuEnter(category.id)}
                onMouseLeave={() => hasMegaMenu && handleMegaMenuLeave()}
              >
                <Link
                  href={category.href}
                  className={[styles.navItem, isActive ? styles.navItemActive : ''].join(' ')}
                  aria-haspopup={hasMegaMenu ? 'true' : undefined}
                  aria-expanded={hasMegaMenu ? isActive : undefined}
                  onFocus={() => hasMegaMenu && handleMegaMenuEnter(category.id)}
                  onKeyDown={(event) => event.key === 'Escape' && setActiveMegaMenu(null)}
                >
                  <span>{category.label}</span>
                  {category.badge && <span className={styles.navBadge}>{category.badge}</span>}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Desktop Search Input */}
        <div className={styles.searchWrap}>
          <Search aria-hidden="true" />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleSearchSubmit}
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <X aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Action Controls: Profile / Wishlist / Bag */}
        <div className={styles.actions}>
          {/* Profile Action */}
          <div
            className={styles.profileWrap}
            onMouseEnter={handleProfileEnter}
            onMouseLeave={handleProfileLeave}
          >
            <button
              type="button"
              className={[styles.actionButton, styles.profileAction].join(' ')}
              onClick={() => toggleOverlay('auth')}
              onFocus={handleProfileEnter}
              aria-label="Profile"
              aria-expanded={isProfileHovered}
            >
              <span className={styles.iconWrap}>
                <User aria-hidden="true" />
                {user && <span className={styles.onlineDot} />}
              </span>
              <span className={styles.actionLabel}>PROFILE</span>
            </button>

            <AnimatePresence>
              {isProfileHovered && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={menuTransition}
                  className={styles.profilePopover}
                  onKeyDown={(event) => event.key === 'Escape' && setIsProfileHovered(false)}
                >
                  {user ? (
                    <>
                      <div className={styles.profileIntro}>
                        <span>WELCOME BACK</span>
                        <strong>{user.name}</strong>
                        <small>{user.email || 'Samalkha member'}</small>
                      </div>
                      <div className={styles.profileLinks}>
                        <Link href="/account" onClick={() => setIsProfileHovered(false)}>
                          My Account <ChevronRight aria-hidden="true" />
                        </Link>
                        <button type="button" onClick={() => { setIsProfileHovered(false); setIsWishlistOpen(true); }}>
                          Wishlist ({wishlist.length}) <ChevronRight aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => { setIsProfileHovered(false); setIsCartOpen(true); }}>
                          Shopping bag ({cartItemCount}) <ChevronRight aria-hidden="true" />
                        </button>
                        <Link href="/#store-location" onClick={() => setIsProfileHovered(false)}>
                          Store information <ChevronRight aria-hidden="true" />
                        </Link>
                      </div>
                      <button type="button" onClick={handleLogout} className={styles.signOut}>
                        <LogOut aria-hidden="true" /> SIGN OUT
                      </button>
                    </>
                  ) : (
                    <>
                      <div className={styles.profileIntro}>
                        <span>YOUR BRAND X ACCOUNT</span>
                        <strong>Make shopping personal.</strong>
                        <small>Access your wishlist and shopping bag.</small>
                      </div>
                      <button
                        type="button"
                        className={styles.loginButton}
                        onClick={() => { setIsProfileHovered(false); openAuthModal('login'); }}
                      >
                        LOGIN / SIGN UP
                      </button>
                      <div className={styles.profileLinks}>
                        <button type="button" onClick={() => { setIsProfileHovered(false); setIsWishlistOpen(true); }}>
                          Saved wishlist <ChevronRight aria-hidden="true" />
                        </button>
                        <Link href="/#store-location" onClick={() => setIsProfileHovered(false)}>
                          Samalkha flagship <MapPin aria-hidden="true" />
                        </Link>
                        <Link href="/#faqs" onClick={() => setIsProfileHovered(false)}>
                          Sizing & help <HelpCircle aria-hidden="true" />
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist Button (Touch target >= 44px) */}
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => toggleOverlay('wishlist')}
            aria-label="Wishlist"
          >
            <span className={styles.iconWrap}>
              <Heart aria-hidden="true" />
              {wishlist.length > 0 && <span className={styles.actionCount}>{wishlist.length}</span>}
            </span>
            <span className={styles.actionLabel}>WISHLIST</span>
          </button>

          {/* Bag Button (Touch target >= 44px) */}
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => toggleOverlay('cart')}
            aria-label="Shopping bag"
          >
            <span className={styles.iconWrap}>
              <ShoppingBag aria-hidden="true" />
              <AnimatePresence mode="popLayout">
                {cartItemCount > 0 && (
                  <motion.span
                    key={cartItemCount}
                    initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className={[styles.actionCount, styles.bagCount].join(' ')}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className={styles.actionLabel}>BAG</span>
          </button>
        </div>
      </div>

      {/* Row 2: Mobile Dedicated Full-Width Search Bar (<= 768px) */}
      <div className={styles.mobileSearchRow}>
        <div className={styles.mobileSearchInputWrap}>
          <Search className={styles.mobileSearchIcon} aria-hidden="true" />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search hoodies, oversized tees, cargos..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleSearchSubmit}
            className={styles.mobileSearchInput}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={styles.mobileSearchClearBtn}
              aria-label="Clear search"
            >
              <X aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop 3-Column Mega Menu (Hidden on <= 768px) */}
      <AnimatePresence>
        {activeCategory?.megaMenu && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={menuTransition}
            className={styles.megaMenu}
            onMouseEnter={() => handleMegaMenuEnter(activeCategory.id)}
            onMouseLeave={handleMegaMenuLeave}
          >
            <div className={styles.megaShell}>
              <div className={styles.megaHeading}>
                <span>EXPLORE</span>
                <strong>{activeCategory.megaMenu.title}</strong>
              </div>
              <div className={styles.megaColumns}>
                {activeCategory.megaMenu.columns
                  .filter((column) => !column.featured)
                  .map((column) => (
                    <div key={column.heading} className={styles.megaColumn}>
                      <Link
                        href={column.href || activeCategory.href}
                        className={styles.megaColumnHeader}
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        {column.heading}
                      </Link>
                      <ul>
                        {column.items.map((item) => (
                          <li key={item.label}>
                            <Link href={item.href} onClick={() => setActiveMegaMenu(null)}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={column.href || activeCategory.href}
                        className={styles.megaViewAll}
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        <span>VIEW ALL</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  ))}
              </div>
              <Link href={activeCategory.href} className={styles.megaVisual} onClick={() => setActiveMegaMenu(null)}>
                <span className={styles.megaVisualBadge}>NEW DROP</span>
                <span className={styles.megaVisualWatermark} aria-hidden="true">X</span>
                <Image
                  src={categoryFeaturedImages[activeCategory.id] || '/images/hero/hero-black-tee.png'}
                  alt={activeCategory.label}
                  fill
                  sizes="320px"
                  className={styles.megaVisualImg}
                  priority
                />
                <span className={styles.megaVisualLabel}>
                  <small>BRAND X / SAMALKHA</small>
                  <strong>
                    <span>EXPLORE {activeCategory.label}</span>
                    <ArrowRight aria-hidden="true" />
                  </strong>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Editorial Fashion Menu (Slide-in / Full Height, <= 768px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-fashion-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={menuTransition}
            className={styles.mobileMenu}
          >
            {/* Category Accordion List */}
            <nav aria-label="Mobile navigation" className={styles.mobileNav}>
              {navigationData.categories.map((category, index) => {
                const isExpanded = expandedMobileCategory === category.id;
                const megaCols = category.megaMenu?.columns?.filter((col) => !col.featured) || [];

                return (
                  <motion.div
                    key={category.id}
                    initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    className={styles.mobileCatItem}
                  >
                    <div className={styles.mobileCatHeaderRow}>
                      <Link
                        href={category.href}
                        onClick={closeMobileMenu}
                        className={styles.mobileCatLink}
                      >
                        <span>{category.label}</span>
                        {category.badge && <small className={styles.mobileCatBadge}>{category.badge}</small>}
                      </Link>

                      {megaCols.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(category.id)}
                          className={styles.mobileAccordionToggleBtn}
                          aria-label={isExpanded ? 'Collapse subcategories' : 'Expand subcategories'}
                          aria-expanded={isExpanded}
                        >
                          <ChevronDown
                            className={[
                              styles.mobileAccordionChevron,
                              isExpanded ? styles.mobileAccordionChevronOpen : '',
                            ].join(' ')}
                          />
                        </button>
                      )}
                    </div>

                    {/* Expandable Sub-Categories */}
                    <AnimatePresence>
                      {isExpanded && megaCols.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className={styles.mobileSubList}
                        >
                          {megaCols.map((col) => (
                            <div key={col.heading} className={styles.mobileSubGroup}>
                              <strong className={styles.mobileSubHeading}>{col.heading}</strong>
                              <ul className={styles.mobileSubItems}>
                                {col.items.map((item) => (
                                  <li key={item.label}>
                                    <Link href={item.href} onClick={closeMobileMenu} className={styles.mobileSubLink}>
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          <Link
                            href={category.href}
                            onClick={closeMobileMenu}
                            className={styles.mobileViewAllLink}
                          >
                            <span>VIEW ALL {category.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </nav>

            {/* Compact Featured Visual Image at Bottom */}
            <div className={styles.mobileFeaturedCard}>
              <Link href="/category/all" onClick={closeMobileMenu} className={styles.mobileFeaturedLink}>
                <div className={styles.mobileFeaturedImgWrap}>
                  <img
                    src="/images/hero/refrence.png"
                    alt="Brand X Lookbook"
                    className={styles.mobileFeaturedImg}
                  />
                </div>
                <div className={styles.mobileFeaturedCopy}>
                  <span className={styles.mobileFeaturedTag}>SAMALKHA ARCHIVE</span>
                  <strong>SEASON 2026 DROPS</strong>
                  <span className={styles.mobileFeaturedAction}>EXPLORE VAULT →</span>
                </div>
              </Link>
            </div>

            {/* Mobile Footer Utilities */}
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileUtilities}>
                <Link href="/account" onClick={closeMobileMenu} className={styles.mobileUtilBtn}>
                  <User className="w-3.5 h-3.5" />
                  <span>PROFILE</span>
                </Link>
                <Link href="/wishlist" onClick={closeMobileMenu} className={styles.mobileUtilBtn}>
                  <Heart className="w-3.5 h-3.5" />
                  <span>WISHLIST ({wishlist.length})</span>
                </Link>
                <Link href="/account" onClick={closeMobileMenu} className={styles.mobileUtilBtn}>
                  <Package className="w-3.5 h-3.5" />
                  <span>MY ORDERS</span>
                </Link>
                <Link href="/#store-location" onClick={closeMobileMenu} className={styles.mobileUtilBtn}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>SAMALKHA HUB</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
