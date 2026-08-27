import fs from 'fs';

let css = fs.readFileSync('components/layout/Navbar.module.css', 'utf-8');

// Replace everything from @media (max-width: 767px) / @media (max-width: 768px) onwards with our clean scoped mobile CSS
const mobileCssBlock = `
/* =========================================================
   MOBILE DEDICATED SEARCH ROW (ROW 2)
   ========================================================= */
.mobileSearchRow {
  display: none;
}

/* =========================================================
   MOBILE MENU ACCORDIONS & FEATURED CARD
   ========================================================= */
.mobileCatItem {
  border-bottom: 1px solid rgba(9, 9, 11, 0.08);
}

.mobileCatHeaderRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.5rem;
}

.mobileCatLink {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: clamp(1.6rem, 7vw, 2.2rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #09090b;
  text-decoration: none;
  text-transform: uppercase;
  flex: 1;
}

.mobileCatBadge {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.52rem;
  font-weight: 850;
  padding: 0.15rem 0.4rem;
  background: #f2cf45;
  color: #000000;
  border-radius: 2px;
}

.mobileAccordionToggleBtn {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: transparent;
  border: none;
  color: #09090b;
  cursor: pointer;
}

.mobileAccordionChevron {
  width: 1.15rem;
  height: 1.15rem;
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

.mobileAccordionChevronOpen {
  transform: rotate(180deg);
}

.mobileSubList {
  overflow: hidden;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.mobileSubGroup {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mobileSubHeading {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  color: #71717a;
  text-transform: uppercase;
}

.mobileSubItems {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.mobileSubLink {
  display: block;
  font-size: 0.96rem;
  font-weight: 600;
  color: #27272a;
  text-decoration: none;
  padding: 0.3rem 0;
  line-height: 1.4;
}

.mobileSubLink:active {
  color: #000000;
}

.mobileViewAllLink {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.35rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  color: #09090b;
  text-decoration: underline;
}

/* Compact Featured Card at bottom of mobile menu */
.mobileFeaturedCard {
  margin-top: 1.5rem;
  margin-bottom: 1.25rem;
}

.mobileFeaturedLink {
  display: flex;
  align-items: center;
  gap: 0.95rem;
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid rgba(9, 9, 11, 0.12);
  text-decoration: none;
  color: #09090b;
}

.mobileFeaturedImgWrap {
  width: 4rem;
  height: 4.5rem;
  background: #f4f2ed;
  overflow: hidden;
  flex-shrink: 0;
}

.mobileFeaturedImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobileFeaturedCopy {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobileFeaturedTag {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.52rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #71717a;
}

.mobileFeaturedCopy strong {
  font-size: 0.88rem;
  font-weight: 850;
  letter-spacing: -0.01em;
}

.mobileFeaturedAction {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.58rem;
  font-weight: 850;
  color: #09090b;
  text-decoration: underline;
}

/* =========================================================
   RESPONSIVE BREAKPOINTS (<= 768px MOBILE ARCHITECTURE)
   ========================================================= */
@media (max-width: 768px) {
  .header {
    --nav-height: auto;
    background: #faf9f6;
    border-bottom: 1px solid rgba(9, 9, 11, 0.12);
    position: sticky;
    top: 0;
    z-index: 80;
  }

  .navShell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem clamp(0.75rem, 3vw, 1.25rem);
    gap: 0.5rem;
    width: 100%;
  }

  .mobileMenuButton {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    color: #09090b;
    cursor: pointer;
    flex-shrink: 0;
  }

  .mobileMenuButton svg {
    width: 1.35rem;
    height: 1.35rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-right: auto;
    margin-left: 0.25rem;
  }

  .logoMark {
    width: 1.85rem;
    height: 1.85rem;
    font-size: 0.95rem;
  }

  .logoType strong {
    font-size: 0.98rem;
  }

  .logoType small {
    font-size: 0.42rem;
  }

  .desktopNav,
  .searchWrap,
  .megaMenu,
  .profilePopover {
    display: none !important;
  }

  /* Right Actions Row on Mobile (Touch targets >= 44px) */
  .actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .actionButton {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    display: grid;
    place-items: center;
    background: transparent;
    border: none;
    color: #09090b;
    position: relative;
    padding: 0;
    cursor: pointer;
  }

  .actionLabel {
    display: none !important;
  }

  .iconWrap {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  .iconWrap svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  .actionCount {
    position: absolute;
    top: 6px;
    right: 6px;
    min-width: 1rem;
    height: 1rem;
    padding: 0 0.25rem;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.52rem;
    font-weight: 850;
    border-radius: 999px;
    background: #09090b;
    color: #ffffff;
    display: grid;
    place-items: center;
    line-height: 1;
  }

  .bagCount {
    background: #f2cf45;
    color: #000000;
  }

  .onlineDot {
    position: absolute;
    top: 9px;
    right: 9px;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: #22c55e;
  }

  /* Row 2: Mobile Full-Width Search Input */
  .mobileSearchRow {
    display: block;
    width: 100%;
    padding: 0 clamp(0.75rem, 3vw, 1.25rem) 0.65rem;
    border-bottom: 1px solid rgba(9, 9, 11, 0.08);
    background: #faf9f6;
  }

  .mobileSearchInputWrap {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .mobileSearchIcon {
    position: absolute;
    left: 0.75rem;
    width: 0.95rem;
    height: 0.95rem;
    color: #71717a;
    pointer-events: none;
  }

  .mobileSearchInput {
    width: 100%;
    padding: 0.55rem 2rem 0.55rem 2.2rem;
    background: #f4f2ed;
    border: 1px solid rgba(9, 9, 11, 0.12);
    font-size: 0.78rem;
    color: #09090b;
    outline: none;
    border-radius: 0;
  }

  .mobileSearchInput:focus {
    background: #ffffff;
    border-color: #09090b;
  }

  .mobileSearchClearBtn {
    position: absolute;
    right: 0.65rem;
    width: 1.2rem;
    height: 1.2rem;
    display: grid;
    place-items: center;
    background: transparent;
    border: none;
    color: #71717a;
    cursor: pointer;
  }

  /* Mobile Full Height Slide-Down Menu */
  .mobileMenu {
    position: fixed;
    top: 95px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #faf9f6;
    z-index: 99;
    padding: 1rem clamp(1rem, 3vw, 1.5rem) 3.5rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
  }

  .mobileNav {
    display: flex;
    flex-direction: column;
  }

  .mobileMenuFooter {
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(9, 9, 11, 0.12);
  }

  .mobileUtilities {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .mobileUtilBtn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 0.85rem;
    background: #ffffff;
    border: 1px solid rgba(9, 9, 11, 0.12);
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.65rem;
    font-weight: 800;
    color: #09090b;
    text-decoration: none;
    text-transform: uppercase;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header,
  .mobileMenu,
  .mobileAccordionChevron,
  .actionButton {
    transition-duration: 0.01ms !important;
  }
}
`;

// Find where @media (max-width: 767px) starts and replace with our new block
const splitIndex = css.indexOf('@media (max-width: 767px)');
if (splitIndex !== -1) {
  css = css.slice(0, splitIndex) + mobileCssBlock;
} else {
  css += mobileCssBlock;
}

fs.writeFileSync('components/layout/Navbar.module.css', css, 'utf-8');
console.log('Navbar.module.css updated with mobile Row 1 + Row 2 styling and accordion classes.');
