import fs from 'fs';

// 1. Update Navbar.jsx
let navbarCode = fs.readFileSync('components/layout/Navbar.jsx', 'utf-8');

const categoryFeaturedImagesDefinition = `const categoryFeaturedImages = {
  men: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
  'oversized-tees': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  hoodies: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  'cargos-denim': 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
  tracksuits: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  jackets: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
};

const menuTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };`;

navbarCode = navbarCode.replace('const menuTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };', categoryFeaturedImagesDefinition);

const oldMegaMenuBlock = `<AnimatePresence>
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
                      <Link href={column.href || activeCategory.href} onClick={() => setActiveMegaMenu(null)}>
                        {column.heading} <ArrowRight aria-hidden="true" />
                      </Link>
                      <ul>
                        {column.items.map((item) => (
                          <li key={item.label}>
                            <Link href={item.href} onClick={() => setActiveMegaMenu(null)}>{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
              <Link href={activeCategory.href} className={styles.megaVisual} onClick={() => setActiveMegaMenu(null)}>
                <span className={styles.megaVisualWord}>X</span>
                <Image
                  src="/hero/placeholder-hoodie.svg"
                  alt=""
                  width={620}
                  height={700}
                  sizes="220px"
                />
                <span className={styles.megaVisualLabel}>
                  <small>BRAND X / SAMALKHA</small>
                  <strong>{activeCategory.label}</strong>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>`;

const newMegaMenuBlock = `<AnimatePresence>
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
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>`;

navbarCode = navbarCode.replace(oldMegaMenuBlock, newMegaMenuBlock);
fs.writeFileSync('components/layout/Navbar.jsx', navbarCode, 'utf-8');

// 2. Update Navbar.module.css
let navbarCss = fs.readFileSync('components/layout/Navbar.module.css', 'utf-8');

const oldCssMega = navbarCss.substring(navbarCss.indexOf('.megaMenu {'), navbarCss.indexOf('.mobileMenuButton,'));

const newCssMega = `.megaMenu {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  border-bottom: 1px solid rgba(9, 9, 11, 0.12);
  background: #f7f5f0;
  box-shadow: 0 24px 48px rgba(9, 9, 11, 0.08);
}

.megaShell {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: 1.85rem clamp(1rem, 2.5vw, 2.5rem);
  display: grid;
  grid-template-columns: 11rem minmax(0, 1fr) 18rem;
  gap: 2.25rem;
  align-items: stretch;
}

.megaHeading {
  padding-right: 1.5rem;
  border-right: 1px solid rgba(9, 9, 11, 0.1);
  display: flex;
  flex-direction: column;
}

.megaHeading span {
  display: block;
  color: #71717a;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.56rem;
  font-weight: 750;
  letter-spacing: 0.18em;
}

.megaHeading strong {
  display: block;
  margin-top: 0.6rem;
  font-size: 1.2rem;
  font-weight: 850;
  line-height: 1.25;
  letter-spacing: -0.035em;
  color: #09090b;
}

.megaColumns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
}

.megaColumn {
  display: flex;
  flex-direction: column;
}

.megaColumnHeader {
  font-size: 1.05rem;
  font-weight: 850;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #09090b;
  padding-bottom: 0.55rem;
  border-bottom: 1.5px solid rgba(9, 9, 11, 0.14);
  transition: color 0.18s ease;
  display: block;
}

.megaColumnHeader:hover {
  color: #09090b;
}

.megaColumn ul {
  display: grid;
  gap: 0.6rem;
  margin-top: 0.85rem;
  margin-bottom: 1rem;
}

.megaColumn li a {
  color: #52525b;
  font-size: 0.92rem;
  line-height: 1.45;
  font-weight: 500;
  transition: color 0.18s ease, transform 0.18s ease;
  display: inline-block;
}

.megaColumn li a:hover {
  color: #09090b;
  font-weight: 600;
  transform: translateX(3px);
}

.megaViewAll {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #09090b;
  text-transform: uppercase;
  padding-top: 0.35rem;
  transition: gap 0.2s ease, color 0.2s ease;
}

.megaViewAll svg {
  width: 0.82rem;
  height: 0.82rem;
  transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.megaViewAll:hover {
  color: #09090b;
  gap: 0.6rem;
}

.megaViewAll:hover svg {
  transform: translateX(3px);
}

.megaVisual {
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
}

`;

navbarCss = navbarCss.replace(oldCssMega, newCssMega);
fs.writeFileSync('components/layout/Navbar.module.css', navbarCss, 'utf-8');

console.log('Mega Menu polished successfully!');
