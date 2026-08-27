import fs from 'fs';

// 1. Update Navbar.module.css
let navCss = fs.readFileSync('components/layout/Navbar.module.css', 'utf-8');
if (!navCss.includes('overscroll-behavior: contain')) {
  navCss = navCss.replace(
    '-webkit-overflow-scrolling: touch;',
    '-webkit-overflow-scrolling: touch;\n    overscroll-behavior: contain;'
  );
  fs.writeFileSync('components/layout/Navbar.module.css', navCss, 'utf-8');
}

// 2. Update CategoryPage.module.css
let catCss = fs.readFileSync('app/category/[slug]/CategoryPage.module.css', 'utf-8');
if (!catCss.includes('overscroll-behavior: contain')) {
  catCss = catCss.replace(
    '.drawerSheet {',
    '.drawerSheet {\n  overscroll-behavior: contain;\n  -webkit-overflow-scrolling: touch;'
  );
  fs.writeFileSync('app/category/[slug]/CategoryPage.module.css', catCss, 'utf-8');
}

// 3. Update CartDrawer.jsx
let cartDrawerJsx = fs.readFileSync('components/layout/CartDrawer.jsx', 'utf-8');
if (!cartDrawerJsx.includes('overscroll-contain')) {
  cartDrawerJsx = cartDrawerJsx.replace(
    'className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-zinc-200"',
    'className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 divide-y divide-zinc-200"'
  );
  fs.writeFileSync('components/layout/CartDrawer.jsx', cartDrawerJsx, 'utf-8');
}

// 4. Update WishlistDrawer.jsx
let wishDrawerJsx = fs.readFileSync('components/layout/WishlistDrawer.jsx', 'utf-8');
if (!wishDrawerJsx.includes('overscroll-contain')) {
  wishDrawerJsx = wishDrawerJsx.replace(
    'className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-zinc-200"',
    'className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 divide-y divide-zinc-200"'
  );
  fs.writeFileSync('components/layout/WishlistDrawer.jsx', wishDrawerJsx, 'utf-8');
}

console.log('Overscroll containment and touch momentum applied!');
