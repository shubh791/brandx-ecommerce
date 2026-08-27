import fs from 'fs';

const footerCss = `.fashionFooter {
  --footer-canvas: #f4f2ed;
  --footer-ink: #09090b;
  --footer-muted: #65656d;
  --footer-line: rgba(9, 9, 11, .14);
  --footer-accent: #f2cf45;
  position: relative;
  overflow: hidden;
  background: var(--footer-canvas);
  color: var(--footer-ink);
  border-top: 1px solid var(--footer-line);
}

/* =========================================================
   1. TOP TRUST & GUARANTEES STRIP
   ========================================================= */
.trustStripSection {
  border-bottom: 1px solid var(--footer-line);
  background: rgba(255, 255, 255, .6);
}

.trustGrid {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(2rem, 3.5vw, 2.75rem) clamp(1rem, 2.5vw, 2.5rem);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.trustItem {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.trustIconWrap {
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid var(--footer-line);
  color: var(--footer-ink);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .03);
  flex-shrink: 0;
}

.trustIcon {
  width: 1.25rem;
  height: 1.25rem;
}

.trustCopy strong {
  display: block;
  font-size: .88rem;
  font-weight: 800;
  color: var(--footer-ink);
  letter-spacing: -.01em;
}

.trustCopy p {
  margin-top: .25rem;
  color: var(--footer-muted);
  font-size: .75rem;
  line-height: 1.45;
}

/* =========================================================
   2. MAIN FOOTER SHELL & 4-COLUMN GRID (THEME MATCHED)
   ========================================================= */
.fashionFooterShell {
  position: relative;
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(4rem, 6vw, 5.5rem) clamp(1rem, 2.5vw, 2.5rem) clamp(2rem, 3vw, 2.75rem);
}

.mainRow {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(20rem, 1.45fr) repeat(3, minmax(11rem, 1fr));
  gap: clamp(2.5rem, 4.5vw, 4.5rem);
  padding-bottom: clamp(3rem, 4.5vw, 4.5rem);
  border-bottom: 1px solid var(--footer-line);
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 28rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: .85rem;
  text-decoration: none;
  color: var(--footer-ink);
}

.logoBadge {
  width: 2.65rem;
  height: 2.65rem;
  display: grid;
  place-items: center;
  background: var(--footer-ink);
  color: #ffffff;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -.02em;
}

.logo strong {
  display: flex;
  flex-direction: column;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -.04em;
  line-height: .95;
  color: var(--footer-ink);
}

.logo small {
  margin-top: .45rem;
  color: var(--footer-muted);
  font-family: var(--font-geist-mono), monospace;
  font-size: .52rem;
  font-weight: 800;
  letter-spacing: .2em;
}

.bio {
  color: #52525b;
  font-size: .88rem;
  line-height: 1.65;
}

.contactList {
  display: flex;
  flex-direction: column;
  gap: .75rem;
}

.contactItem {
  display: flex;
  align-items: flex-start;
  gap: .65rem;
  color: var(--footer-muted);
  font-size: .8rem;
  line-height: 1.5;
  text-decoration: none;
  transition: color .2s ease;
}

.contactItem strong {
  color: var(--footer-ink);
  font-family: var(--font-geist-mono), monospace;
  letter-spacing: .05em;
}

.contactIcon {
  width: 1rem;
  height: 1rem;
  color: var(--footer-ink);
  flex-shrink: 0;
  margin-top: .15rem;
}

.contactItem:hover {
  color: var(--footer-ink);
}

/* Social Icon Bar */
.socialIconBar {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin-top: .5rem;
}

.socialIconBtn {
  width: 2.4rem;
  height: 2.4rem;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid var(--footer-line);
  color: var(--footer-ink);
  box-shadow: 0 2px 6px rgba(0, 0, 0, .03);
  transition: background-color .2s ease, border-color .2s ease, transform .25s ease, color .2s ease;
}

.socialIconBtn:hover {
  background: var(--footer-ink);
  border-color: var(--footer-ink);
  color: var(--footer-accent);
  transform: translateY(-3px);
}

/* =========================================================
   COLUMNS & NAVIGATION
   ========================================================= */
.fashionFooterLinks {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.fashionFooterLinks h2 {
  color: var(--footer-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: .68rem;
  font-weight: 800;
  letter-spacing: .2em;
  text-transform: uppercase;
}

.linkList {
  display: flex;
  flex-direction: column;
  gap: .8rem;
}

.footerNavLink {
  color: var(--footer-muted);
  font-size: .84rem;
  line-height: 1.4;
  text-decoration: none;
  transition: color .2s ease, transform .25s cubic-bezier(.22, 1, .36, 1);
  display: inline-block;
}

.footerNavLink:hover {
  color: var(--footer-ink);
  transform: translateX(.25rem);
}

/* Social Detailed Row Links */
.socialDetailList {
  display: flex;
  flex-direction: column;
  gap: .75rem;
}

.socialRowLink {
  display: flex;
  align-items: center;
  gap: .85rem;
  padding: .65rem .85rem;
  background: #ffffff;
  border: 1px solid var(--footer-line);
  color: var(--footer-ink);
  text-decoration: none;
  transition: background-color .2s ease, border-color .2s ease, transform .25s ease, box-shadow .2s ease;
}

.socialRowLink:hover {
  background: #ffffff;
  border-color: var(--footer-ink);
  box-shadow: 0 4px 16px rgba(0, 0, 0, .06);
  transform: translateX(.25rem);
}

.socialRowIcon {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  background: rgba(9, 9, 11, .06);
  color: var(--footer-ink);
  flex-shrink: 0;
}

.socialRowText {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: .1rem;
}

.socialRowText strong {
  font-size: .8rem;
  font-weight: 750;
  color: var(--footer-ink);
}

.socialRowText small {
  font-family: var(--font-geist-mono), monospace;
  font-size: .62rem;
  color: var(--footer-muted);
}

.socialRowArrow {
  width: .95rem;
  height: .95rem;
  margin-left: auto;
  color: var(--footer-muted);
  transition: transform .25s ease, color .25s ease;
}

.socialRowLink:hover .socialRowArrow {
  color: var(--footer-ink);
  transform: translate(.15rem, -.15rem);
}

/* =========================================================
   3. LARGE AMBIENT WATERMARK
   ========================================================= */
.watermarkContainer {
  position: absolute;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  overflow: hidden;
}

.watermarkText {
  font-size: clamp(6rem, 15vw, 15rem);
  font-weight: 900;
  letter-spacing: -.06em;
  color: rgba(9, 9, 11, .03);
  white-space: nowrap;
  line-height: .8;
  display: block;
}

/* =========================================================
   4. BOTTOM LEGAL ROW
   ========================================================= */
.fashionFooterLegal {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: clamp(1.75rem, 3vw, 2.5rem);
}

.legalLeft {
  display: flex;
  flex-direction: column;
  gap: .35rem;
}

.legalLeft p {
  color: #71717a;
  font-family: var(--font-geist-mono), monospace;
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .12em;
}

.legalBadge {
  font-family: var(--font-geist-mono), monospace;
  font-size: .55rem;
  font-weight: 750;
  letter-spacing: .16em;
  color: var(--footer-ink);
}

.legalLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.legalLinks a {
  color: #71717a;
  font-family: var(--font-geist-mono), monospace;
  font-size: .62rem;
  font-weight: 750;
  letter-spacing: .12em;
  text-decoration: none;
  transition: color .2s ease;
}

.legalLinks a:hover {
  color: var(--footer-ink);
}

/* =========================================================
   RESPONSIVE BREAKPOINTS
   ========================================================= */
@media (max-width: 1024px) {
  .trustGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mainRow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem 2rem;
  }

  .identity {
    grid-column: 1 / -1;
    max-width: none;
  }
}

@media (max-width: 640px) {
  .trustGrid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .mainRow {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .fashionFooterLegal {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .legalLinks {
    flex-direction: column;
    gap: .75rem;
  }
}
`;

fs.writeFileSync('components/layout/Footer.module.css', footerCss, 'utf-8');
console.log('Footer.module.css updated with site theme match!');
