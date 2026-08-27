import fs from 'fs';

let jsx = fs.readFileSync('components/layout/Navbar.jsx', 'utf-8');

// Replace Navbar click handlers to use toggleOverlay
jsx = jsx.replace(
  `onClick={() => setIsMobileMenuOpen((open) => !open)}`,
  `onClick={() => toggleOverlay('menu')}`
);

jsx = jsx.replace(
  `onClick={() => openAuthModal('login')}`,
  `onClick={() => toggleOverlay('auth')}`
);

jsx = jsx.replace(
  `onClick={() => setIsWishlistOpen(true)}`,
  `onClick={() => toggleOverlay('wishlist')}`
);

jsx = jsx.replace(
  `onClick={() => setIsCartOpen(true)}`,
  `onClick={() => toggleOverlay('cart')}`
);

// Ensure toggleOverlay is destructured from useShop
jsx = jsx.replace(
  `const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    openAuthModal,
    user,
    setUser,
    showToast,
    searchQuery,
    setSearchQuery,
  } = useShop();`,
  `const {
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
  } = useShop();`
);

// Ensure closeMobileMenu closes all overlays
jsx = jsx.replace(
  `const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileCategory(null);
  };`,
  `const closeMobileMenu = () => {
    closeAllOverlays();
    setExpandedMobileCategory(null);
  };`
);

fs.writeFileSync('components/layout/Navbar.jsx', jsx, 'utf-8');
console.log('Navbar.jsx toggleOverlay handlers updated successfully!');
