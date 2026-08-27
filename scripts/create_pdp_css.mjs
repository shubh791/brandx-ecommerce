import fs from 'fs';

const pdpCss = `.pageWrapper {
  --pdp-canvas: #f4f2ed;
  --pdp-ink: #09090b;
  --pdp-muted: #65656d;
  --pdp-line: rgba(9, 9, 11, 0.14);
  --pdp-accent: #f2cf45;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--pdp-canvas);
  color: var(--pdp-ink);
  user-select: none;
}

.mainContent {
  flex: 1;
}

/* =========================================================
   1. BREADCRUMBS BAR
   ========================================================= */
.breadcrumbBar {
  background: var(--pdp-canvas);
  border-bottom: 1px solid var(--pdp-line);
  padding: 0.85rem clamp(1rem, 2.5vw, 2.5rem);
}

.breadcrumbShell {
  width: min(100%, 82rem);
  margin-inline: auto;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--pdp-muted);
  text-transform: uppercase;
}

.breadcrumbShell a {
  color: var(--pdp-muted);
  text-decoration: none;
  transition: color 0.18s ease;
}

.breadcrumbShell a:hover {
  color: var(--pdp-ink);
}

.breadcrumbSep {
  color: #a1a1aa;
}

.breadcrumbCurrent {
  color: var(--pdp-ink);
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 18rem;
}

/* =========================================================
   2. MAIN TWO-COLUMN PRODUCT SECTION
   ========================================================= */
.productSection {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(2rem, 3.5vw, 3.5rem) clamp(1rem, 2.5vw, 2.5rem);
}

.productLayout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.95fr);
  gap: clamp(2rem, 4vw, 4.5rem);
  align-items: start;
}

/* ---------------------------------------------------------
   LEFT COLUMN: PRODUCT MEDIA & GALLERY (~58–60%)
   --------------------------------------------------------- */
.galleryWrapper {
  display: flex;
  gap: 1rem;
}

.thumbnailStrip {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 5.5rem;
  flex-shrink: 0;
}

.thumbBtn {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.thumbBtn:hover {
  border-color: var(--pdp-ink);
}

.thumbBtnActive {
  border: 2px solid var(--pdp-ink);
}

.thumbImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.mainMediaContainer {
  position: relative;
  flex: 1;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
}

.mainProductImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.mainMediaContainer:hover .mainProductImg {
  transform: scale(1.06);
}

/* Badges Stack */
.badgeStack {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  pointer-events: none;
}

.tagBadge {
  padding: 0.25rem 0.55rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.56rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--pdp-ink);
  color: #ffffff;
  line-height: 1;
}

.tagBadgeHot {
  background: var(--pdp-accent);
  color: #000000;
}

.gsmBadge {
  padding: 0.25rem 0.55rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--pdp-line);
  color: var(--pdp-ink);
  line-height: 1;
}

/* Floating Actions */
.floatingActions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.floatingActionBtn {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--pdp-line);
  color: var(--pdp-ink);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.floatingActionBtn:hover {
  background: #ffffff;
  border-color: var(--pdp-ink);
  transform: scale(1.08);
}

.wishlistBtnActive {
  background: #ffffff;
  color: #ef4444;
  border-color: #fca5a5;
}

.wishlistBtnActive svg {
  fill: #ef4444;
}

/* ---------------------------------------------------------
   RIGHT COLUMN: PRODUCT INFO & PURCHASE (~40–42%)
   --------------------------------------------------------- */
.infoStickyCol {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  position: sticky;
  top: 5.5rem;
}

/* Header & Meta */
.infoTitleGroup {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.editorialEyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--pdp-muted);
  text-transform: uppercase;
}

.eyebrowDot {
  color: #a1a1aa;
}

.productHeading {
  font-size: clamp(1.85rem, 3.2vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--pdp-ink);
  margin: 0;
}

/* Rating & In-Stock Status */
.ratingRow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.66rem;
  font-weight: 750;
  padding-top: 0.2rem;
}

.ratingBadge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.5rem;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  color: var(--pdp-ink);
}

.ratingBadge svg {
  width: 0.8rem;
  height: 0.8rem;
  fill: #eab308;
  color: #eab308;
}

.reviewCount {
  color: var(--pdp-muted);
}

.stockBadge {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #15803d;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.stockPulseDot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #22c55e;
}

/* Pricing Box */
.pricingBox {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.95rem 1.15rem;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
}

.priceGroup {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.currentPrice {
  font-family: var(--font-geist-mono), monospace;
  font-size: 1.65rem;
  font-weight: 900;
  color: var(--pdp-ink);
}

.originalPrice {
  font-family: var(--font-geist-mono), monospace;
  font-size: 1rem;
  color: #a1a1aa;
  text-decoration: line-through;
}

.discountPill {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 850;
  padding: 0.2rem 0.5rem;
  background: var(--pdp-accent);
  color: #000000;
}

.taxNotice {
  font-size: 0.72rem;
  color: var(--pdp-muted);
}

/* Short Description */
.shortDesc {
  font-size: 0.86rem;
  line-height: 1.55;
  color: #4b4b52;
}

/* Color Variant Row */
.colorRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.9rem;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
}

.colorLabel {
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--pdp-muted);
}

.colorValue {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 850;
  color: var(--pdp-ink);
}

.colorSwatch {
  width: 0.85rem;
  height: 0.85rem;
  border: 1px solid var(--pdp-line);
}

/* Size Selector Block */
.sizeBlock {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.sizeHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.66rem;
}

.sizeTitle {
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--pdp-ink);
}

.sizeTitle strong {
  color: var(--pdp-ink);
}

.sizeGuideBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  color: var(--pdp-muted);
  text-decoration: underline;
  cursor: pointer;
}

.sizeGuideBtn:hover {
  color: var(--pdp-ink);
}

.sizeGrid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.45rem;
}

.sizeOptionBtn {
  padding: 0.75rem 0;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  font-weight: 850;
  color: var(--pdp-ink);
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.sizeOptionBtn:hover {
  border-color: var(--pdp-ink);
}

.sizeOptionBtnActive {
  background: var(--pdp-ink);
  border-color: var(--pdp-ink);
  color: #ffffff;
}

/* Quantity and Action CTAs */
.ctaBlock {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.ctaRow {
  display: flex;
  align-items: stretch;
  gap: 0.65rem;
}

.qtyBox {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  padding: 0 0.5rem;
  height: 3.35rem;
}

.qtyBtn {
  width: 1.8rem;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: var(--pdp-ink);
  cursor: pointer;
}

.qtyVal {
  width: 1.8rem;
  text-align: center;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.82rem;
  font-weight: 850;
  color: var(--pdp-ink);
}

.addBagBtn {
  flex: 1;
  min-height: 3.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  background: var(--pdp-ink);
  color: #ffffff;
  border: 1px solid var(--pdp-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.addBagBtn:hover {
  background: #27272a;
  transform: translateY(-1px);
}

.buyNowBtn {
  width: 100%;
  min-height: 3.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  background: var(--pdp-accent);
  color: #000000;
  border: 1px solid var(--pdp-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.buyNowBtn:hover {
  background: #e6c235;
  transform: translateY(-1px);
}

/* Trust / Service Row */
.trustServicesGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.trustServiceItem {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 0.75rem;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  font-size: 0.72rem;
}

.trustServiceIcon {
  width: 1rem;
  height: 1rem;
  color: var(--pdp-ink);
  flex-shrink: 0;
}

.trustServiceItem strong {
  display: block;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.06em;
  color: var(--pdp-ink);
}

.trustServiceItem span {
  display: block;
  font-size: 0.6rem;
  color: var(--pdp-muted);
}

/* =========================================================
   3. EXPANDABLE ACCORDIONS
   ========================================================= */
.accordionSection {
  margin-top: 0.5rem;
  border-top: 1px solid var(--pdp-line);
  display: flex;
  flex-direction: column;
}

.accordionItem {
  border-bottom: 1px solid var(--pdp-line);
}

.accordionTrigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.95rem 0;
  background: transparent;
  border: none;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  color: var(--pdp-ink);
  text-transform: uppercase;
  cursor: pointer;
}

.accordionArrow {
  width: 0.95rem;
  height: 0.95rem;
  color: var(--pdp-muted);
  transition: transform 0.25s ease;
}

.accordionArrowOpen {
  transform: rotate(180deg);
  color: var(--pdp-ink);
}

.accordionContent {
  padding-bottom: 1.15rem;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #52525b;
}

.specList {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.specList li {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
}

.specList li::before {
  content: '•';
  color: var(--pdp-ink);
  font-weight: bold;
}

/* =========================================================
   4. HOW TO WEAR IT EDITORIAL SECTION
   ========================================================= */
.howToWearSection {
  border-top: 1px solid var(--pdp-line);
  border-bottom: 1px solid var(--pdp-line);
  background: rgba(255, 255, 255, 0.65);
  padding: clamp(3rem, 5vw, 5rem) clamp(1rem, 2.5vw, 2.5rem);
}

.howToWearShell {
  width: min(100%, 82rem);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.lookVisualFrame {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
}

.lookVisualImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.lookBadge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.28rem 0.6rem;
  background: var(--pdp-ink);
  color: #ffffff;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.56rem;
  font-weight: 850;
  letter-spacing: 0.14em;
}

.howToWearCopy {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sectionEyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.2em;
  color: var(--pdp-ink);
  text-transform: uppercase;
}

.sectionTitle {
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.95;
  color: var(--pdp-ink);
  margin: 0;
}

.sectionText {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--pdp-muted);
}

.pairingList {
  display: flex;
  gap: 0.85rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.pairingCard {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  text-decoration: none;
  color: var(--pdp-ink);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.pairingCard:hover {
  border-color: var(--pdp-ink);
  transform: translateY(-2px);
}

.pairingThumb {
  width: 2.75rem;
  height: 2.75rem;
  object-fit: cover;
  background: #f4f2ed;
}

.pairingInfo strong {
  display: block;
  font-size: 0.78rem;
  font-weight: 850;
}

.pairingInfo span {
  display: block;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.65rem;
  color: var(--pdp-muted);
}

/* =========================================================
   5. RELATED PRODUCTS ("YOU MAY ALSO LIKE")
   ========================================================= */
.relatedSection {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(3rem, 5vw, 4.5rem) clamp(1rem, 2.5vw, 2.5rem);
}

.relatedHeader {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
}

.relatedGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
}

/* =========================================================
   6. MOBILE STICKY BOTTOM BAR
   ========================================================= */
.mobileStickyBar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--pdp-line);
  padding: 0.65rem 1rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mobileStickyInfo {
  display: flex;
  flex-direction: column;
}

.mobileStickyPrice {
  font-family: var(--font-geist-mono), monospace;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--pdp-ink);
}

.mobileStickySize {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.58rem;
  font-weight: 750;
  color: var(--pdp-muted);
}

.mobileStickyBtn {
  flex: 1;
  max-width: 13rem;
  padding: 0.75rem 1rem;
  background: var(--pdp-ink);
  color: #ffffff;
  border: 1px solid var(--pdp-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* =========================================================
   7. SIZE GUIDE MODAL
   ========================================================= */
.modalOverlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.modalBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: min(100% - 2rem, 32rem);
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--pdp-line);
}

.modalHeader h3 {
  font-size: 1.1rem;
  font-weight: 850;
  letter-spacing: -0.02em;
}

.modalCloseBtn {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  background: #f4f2ed;
  border: 1px solid var(--pdp-line);
  color: var(--pdp-ink);
  cursor: pointer;
}

.sizeTable {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  text-align: left;
}

.sizeTable th,
.sizeTable td {
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--pdp-line);
}

.sizeTable th {
  background: #f4f2ed;
  font-weight: 850;
}

/* =========================================================
   RESPONSIVE BREAKPOINTS
   ========================================================= */
@media (max-width: 1100px) {
  .productLayout {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 2.5rem;
  }

  .howToWearShell {
    grid-template-columns: 1fr;
  }

  .relatedGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .productLayout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .galleryWrapper {
    flex-direction: column-reverse;
  }

  .thumbnailStrip {
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
  }

  .thumbBtn {
    width: 4.5rem;
  }

  .infoStickyCol {
    position: static;
  }

  .mobileStickyBar {
    display: flex;
  }

  .pageWrapper {
    padding-bottom: 4.5rem;
  }
}

@media (max-width: 640px) {
  .relatedGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .productHeading {
    font-size: 1.65rem;
  }

  .currentPrice {
    font-size: 1.4rem;
  }

  .trustServicesGrid {
    grid-template-columns: 1fr;
  }

  .howToWearSection {
    padding: 2.5rem 1rem;
  }

  .relatedSection {
    padding: 2.5rem 1rem;
  }
}
`;

fs.writeFileSync('app/product/[id]/ProductDetailPage.module.css', pdpCss, 'utf-8');
console.log('ProductDetailPage.module.css created successfully!');
