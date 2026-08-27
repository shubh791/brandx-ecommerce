import fs from 'fs';

// 1. Update next.config.mjs to support remote patterns if needed
const nextConfigJs = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
`;
fs.writeFileSync('next.config.mjs', nextConfigJs, 'utf-8');

// 2. Update Navbar.jsx to use local assets ONLY
let navbarCode = fs.readFileSync('components/layout/Navbar.jsx', 'utf-8');

const localCategoryImages = `const categoryFeaturedImages = {
  men: '/images/hero/refrence.png',
  'oversized-tees': '/images/hero/hero-cream-tee.png',
  hoodies: '/images/hero/hero-black-tee.png',
  'cargos-denim': '/images/hero/hero-blue-denim.png',
  tracksuits: '/images/hero/hero-denim.png',
  jackets: '/images/hero/hero-sneakers.png',
};

const menuTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };`;

if (navbarCode.includes('const categoryFeaturedImages = {')) {
  const startIdx = navbarCode.indexOf('const categoryFeaturedImages = {');
  const endIdx = navbarCode.indexOf('const menuTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };') + 'const menuTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };'.length;
  navbarCode = navbarCode.substring(0, startIdx) + localCategoryImages + navbarCode.substring(endIdx);
} else {
  navbarCode = navbarCode.replace('const menuTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };', localCategoryImages);
}

// Update the megaVisual JSX block inside Navbar.jsx
const oldMegaVisual = `<Link href={activeCategory.href} className={styles.megaVisual} onClick={() => setActiveMegaMenu(null)}>
                <span className={styles.megaVisualBadge}>NEW DROP</span>
                <Image
                  src={
                    categoryFeaturedImages[activeCategory.id] ||
                    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={activeCategory.label}
                  fill
                  sizes="320px"
                  className={styles.megaVisualImg}
                  priority
                />
                <span className={styles.megaVisualOverlay} aria-hidden="true" />
                <span className={styles.megaVisualLabel}>
                  <small>BRAND X / SAMALKHA</small>
                  <strong>EXPLORE {activeCategory.label} →</strong>
                </span>
              </Link>`;

const newMegaVisual = `<Link href={activeCategory.href} className={styles.megaVisual} onClick={() => setActiveMegaMenu(null)}>
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
              </Link>`;

navbarCode = navbarCode.replace(oldMegaVisual, newMegaVisual);
fs.writeFileSync('components/layout/Navbar.jsx', navbarCode, 'utf-8');

// 3. Update Navbar.module.css for megaVisual
let navbarCss = fs.readFileSync('components/layout/Navbar.module.css', 'utf-8');

const oldMegaVisualCss = `.megaVisual {
  position: relative;
  overflow: hidden;
  background: #e4e0d7;
  border-radius: 2px;
  min-height: 15rem;
  display: block;
}

.megaVisualImg {
  object-fit: cover;
  object-position: center;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.megaVisual:hover .megaVisualImg {
  transform: scale(1.045);
}

.megaVisualBadge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 4;
  padding: 0.26rem 0.55rem;
  background: #f2cf45;
  color: #000000;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.56rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.megaVisualOverlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(to top, rgba(9, 9, 11, 0.82) 0%, rgba(9, 9, 11, 0.2) 40%, transparent 70%);
  pointer-events: none;
}

.megaVisualLabel {
  position: absolute;
  right: 0.95rem;
  bottom: 0.95rem;
  left: 0.95rem;
  z-index: 3;
  color: #ffffff;
}

.megaVisualLabel small {
  display: block;
  color: #f2cf45;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.54rem;
  font-weight: 750;
  letter-spacing: 0.15em;
}

.megaVisualLabel strong {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #ffffff;
}`;

const newMegaVisualCss = `.megaVisual {
  position: relative;
  overflow: hidden;
  background: #ece8df;
  border: 1px solid rgba(9, 9, 11, 0.1);
  min-height: 15.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.megaVisualWatermark {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 9rem;
  font-weight: 900;
  color: rgba(9, 9, 11, 0.05);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.megaVisualImg {
  z-index: 2;
  object-fit: contain !important;
  padding: 1.25rem 1.5rem 3.5rem;
  filter: drop-shadow(0 14px 16px rgba(0, 0, 0, 0.12));
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.megaVisual:hover .megaVisualImg {
  transform: scale(1.06) translateY(-2px);
}

.megaVisualBadge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 4;
  padding: 0.25rem 0.52rem;
  background: #f2cf45;
  color: #000000;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.52rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.megaVisualLabel {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  left: 0.75rem;
  z-index: 4;
  padding: 0.55rem 0.75rem;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(9, 9, 11, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.megaVisualLabel small {
  display: block;
  color: #71717a;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.5rem;
  font-weight: 750;
  letter-spacing: 0.14em;
}

.megaVisualLabel strong {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.15rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #09090b;
}

.megaVisualLabel strong svg {
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.2s ease;
}

.megaVisual:hover .megaVisualLabel strong svg {
  transform: translateX(3px);
}`;

navbarCss = navbarCss.replace(oldMegaVisualCss, newMegaVisualCss);
fs.writeFileSync('components/layout/Navbar.module.css', navbarCss, 'utf-8');

console.log('Mega Menu updated with local project assets only and browser error fixed!');
