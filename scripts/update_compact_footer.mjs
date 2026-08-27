import fs from 'fs';

const footerJsx = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  ArrowUpRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import styles from './Footer.module.css';

// Crisp, lightweight inline SVGs for Social Icons
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733-16z"/>
      <path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768"/>
    </svg>
  );
}

const shopLinks = [
  { label: 'New Arrivals', href: '/category/all' },
  { label: 'Oversized Tees', href: '/category/oversized-tees' },
  { label: 'Hoodies', href: '/category/hoodies' },
  { label: 'Bottoms & Denim', href: '/category/cargos-denim' },
];

const helpLinks = [
  { label: 'Track Orders', href: '/track-order/BX-2026-9041' },
  { label: 'Easy Exchange', href: 'mailto:contact@brandxclothing.in?subject=Exchange%20Request' },
  { label: 'Contact Us', href: 'mailto:contact@brandxclothing.in?subject=Customer%20Enquiry' },
  { label: 'Privacy Policy', href: 'mailto:contact@brandxclothing.in?subject=Privacy%20Policy' },
];

const socialLinks = [
  { label: 'Instagram', href: siteConfig.socials.instagram || 'https://instagram.com', Icon: InstagramIcon },
  { label: 'Facebook', href: siteConfig.socials.facebook || 'https://facebook.com', Icon: FacebookIcon },
  { label: 'WhatsApp', href: siteConfig.socials.whatsapp || 'https://wa.me/919999180180', Icon: WhatsAppIcon },
  { label: 'Twitter / X', href: 'https://twitter.com', Icon: TwitterIcon },
];

const serviceBenefits = [
  {
    icon: Truck,
    title: 'FREE DELIVERY',
    subtitle: 'On orders above ₹999',
  },
  {
    icon: RotateCcw,
    title: 'EASY EXCHANGE',
    subtitle: '7-day doorstep pickup',
  },
  {
    icon: ShieldCheck,
    title: 'SECURE PAYMENTS',
    subtitle: '100% encrypted & verified',
  },
];

export function Footer() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  return (
    <footer className={styles.compactFooter} aria-label="Brand X Footer">
      {/* 1. Compact Service Benefits Strip */}
      <div className={styles.benefitsStrip}>
        <div className={styles.benefitsGrid}>
          {serviceBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className={styles.benefitItem}>
                <div className={styles.benefitIconWrap}>
                  <Icon className={styles.benefitIcon} />
                </div>
                <div className={styles.benefitText}>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.subtitle}</span>
                </div>
                {index < serviceBenefits.length - 1 && (
                  <span className={styles.benefitDivider} aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footerContainer}>
        {/* 2. Compact 3-Part Main Layout */}
        <div className={styles.mainLayout}>
          {/* LEFT — Brand */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogo} aria-label="Brand X Home">
              <span className={styles.logoBadge}>X</span>
              <span className={styles.logoText}>
                <strong>BRANDX</strong>
                <small>SAMALKHA</small>
              </span>
            </Link>
            <p className={styles.brandTagline}>Style that doesn&apos;t blend in.</p>
          </div>

          {/* CENTER — Quick Links (2 Compact Columns / Mobile Accordions) */}
          <div className={styles.linksCol}>
            {/* Desktop View: 2 Columns */}
            <div className={styles.desktopLinkCols}>
              <div className={styles.linkGroup}>
                <span className={styles.groupHeading}>SHOP</span>
                <nav className={styles.linkList} aria-label="Shop categories">
                  {shopLinks.map((item) => (
                    <Link key={item.label} href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className={styles.linkGroup}>
                <span className={styles.groupHeading}>HELP</span>
                <nav className={styles.linkList} aria-label="Customer help">
                  {helpLinks.map((item) => (
                    <Link key={item.label} href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile View: Clean Accordion Rows */}
            <div className={styles.mobileAccordions}>
              <div className={styles.accordionItem}>
                <button
                  type="button"
                  onClick={() => toggleAccordion('shop')}
                  className={styles.accordionTrigger}
                  aria-expanded={openAccordion === 'shop'}
                >
                  <span>SHOP</span>
                  <ChevronDown
                    className={[
                      styles.accordionArrow,
                      openAccordion === 'shop' ? styles.accordionArrowOpen : '',
                    ].join(' ')}
                  />
                </button>
                {openAccordion === 'shop' && (
                  <nav className={styles.accordionContent}>
                    {shopLinks.map((item) => (
                      <Link key={item.label} href={item.href} className={styles.accordionLink}>
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button
                  type="button"
                  onClick={() => toggleAccordion('help')}
                  className={styles.accordionTrigger}
                  aria-expanded={openAccordion === 'help'}
                >
                  <span>HELP</span>
                  <ChevronDown
                    className={[
                      styles.accordionArrow,
                      openAccordion === 'help' ? styles.accordionArrowOpen : '',
                    ].join(' ')}
                  />
                </button>
                {openAccordion === 'help' && (
                  <nav className={styles.accordionContent}>
                    {helpLinks.map((item) => (
                      <Link key={item.label} href={item.href} className={styles.accordionLink}>
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — Visit + Follow */}
          <div className={styles.visitCol}>
            <div className={styles.storeVisitBox}>
              <span className={styles.groupHeading}>VISIT FLAGSHIP</span>
              <p className={styles.storeAddress}>
                <MapPin className={styles.addressPin} />
                <span>{siteConfig.store.address}</span>
              </p>
              <a
                href={siteConfig.store.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.directionsLink}
              >
                <span>GET DIRECTIONS</span>
                <ArrowUpRight className={styles.directionsArrow} />
              </a>
            </div>

            <div className={styles.followBox}>
              <span className={styles.groupHeading}>FOLLOW US</span>
              <div className={styles.socialIconsRow} aria-label="Social media channels">
                {socialLinks.map((soc) => {
                  const Icon = soc.Icon;
                  return (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialIconBtn}
                      aria-label={soc.label}
                      title={soc.label}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Thin Clean Legal Bar */}
        <div className={styles.legalBar}>
          <div className={styles.legalLeft}>
            <span>© {new Date().getFullYear()} BRANDX</span>
          </div>

          <div className={styles.legalRight}>
            <a href="mailto:contact@brandxclothing.in?subject=Privacy%20Policy">Privacy</a>
            <span className={styles.legalDot}>·</span>
            <a href="mailto:contact@brandxclothing.in?subject=Terms%20of%20Service">Terms</a>
            <span className={styles.legalDot}>·</span>
            <a href="mailto:contact@brandxclothing.in?subject=Refund%20Policy">Refund</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

const footerCss = `.compactFooter {
  --ft-canvas: #f4f2ed;
  --ft-ink: #09090b;
  --ft-muted: #65656d;
  --ft-line: rgba(9, 9, 11, 0.12);
  --ft-accent: #f2cf45;
  position: relative;
  background: var(--ft-canvas);
  color: var(--ft-ink);
  border-top: 1px solid var(--ft-line);
}

/* =========================================================
   1. COMPACT SERVICE BENEFITS STRIP
   ========================================================= */
.benefitsStrip {
  border-bottom: 1px solid var(--ft-line);
  background: rgba(255, 255, 255, 0.65);
}

.benefitsGrid {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: 1.15rem clamp(1rem, 2.5vw, 2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.benefitItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  position: relative;
}

.benefitIconWrap {
  width: 2.2rem;
  height: 2.2rem;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid var(--ft-line);
  color: var(--ft-ink);
  flex-shrink: 0;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.benefitItem:hover .benefitIconWrap {
  background: var(--ft-accent);
  border-color: var(--ft-ink);
  transform: translateY(-1px);
}

.benefitIcon {
  width: 1.05rem;
  height: 1.05rem;
}

.benefitText strong {
  display: block;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  color: var(--ft-ink);
  line-height: 1.2;
}

.benefitText span {
  display: block;
  font-size: 0.68rem;
  color: var(--ft-muted);
  line-height: 1.3;
}

.benefitDivider {
  position: absolute;
  right: 0;
  top: 15%;
  height: 70%;
  width: 1px;
  background: var(--ft-line);
}

/* =========================================================
   2. MAIN 3-PART FOOTER LAYOUT (COMPACT & CLEAN)
   ========================================================= */
.footerContainer {
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: 2.5rem clamp(1rem, 2.5vw, 2.5rem) 1.25rem;
}

.mainLayout {
  display: grid;
  grid-template-columns: 1.2fr 1.6fr 1.2fr;
  gap: clamp(2rem, 4vw, 4rem);
  padding-bottom: 2.25rem;
  border-bottom: 1px solid var(--ft-line);
}

/* LEFT — Brand */
.brandCol {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.brandLogo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: var(--ft-ink);
}

.logoBadge {
  width: 2.1rem;
  height: 2.1rem;
  display: grid;
  place-items: center;
  background: var(--ft-ink);
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.logoText {
  display: flex;
  flex-direction: column;
}

.logoText strong {
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--ft-ink);
}

.logoText small {
  margin-top: 0.25rem;
  color: var(--ft-muted);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.48rem;
  font-weight: 800;
  letter-spacing: 0.2em;
}

.brandTagline {
  color: #52525b;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.4;
}

/* CENTER — Quick Links (2 Compact Columns) */
.linksCol {
  display: flex;
  flex-direction: column;
}

.desktopLinkCols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

.linkGroup {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.groupHeading {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.16em;
  color: var(--ft-ink);
  text-transform: uppercase;
}

.linkList {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.navLink {
  color: var(--ft-muted);
  font-size: 0.82rem;
  text-decoration: none;
  transition: color 0.18s ease, transform 0.18s ease;
  display: inline-block;
}

.navLink:hover {
  color: var(--ft-ink);
  transform: translateX(3px);
}

.mobileAccordions {
  display: none;
}

/* RIGHT — Visit + Follow */
.visitCol {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.storeVisitBox {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.storeAddress {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  color: var(--ft-muted);
  font-size: 0.76rem;
  line-height: 1.4;
}

.addressPin {
  width: 0.85rem;
  height: 0.85rem;
  color: var(--ft-ink);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.directionsLink {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  color: var(--ft-ink);
  text-decoration: none;
  transition: gap 0.2s ease, color 0.2s ease;
}

.directionsLink:hover {
  gap: 0.5rem;
}

.directionsArrow {
  width: 0.75rem;
  height: 0.75rem;
}

.followBox {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.socialIconsRow {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.socialIconBtn {
  width: 2.1rem;
  height: 2.1rem;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid var(--ft-line);
  color: var(--ft-ink);
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.2s ease;
}

.socialIconBtn:hover {
  background: var(--ft-ink);
  border-color: var(--ft-ink);
  color: var(--ft-accent);
  transform: translateY(-2px);
}

/* =========================================================
   3. THIN CLEAN LEGAL BAR
   ========================================================= */
.legalBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.15rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #71717a;
}

.legalLeft span {
  color: #71717a;
}

.legalRight {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.legalRight a {
  color: #71717a;
  text-decoration: none;
  transition: color 0.18s ease;
}

.legalRight a:hover {
  color: var(--ft-ink);
}

.legalDot {
  color: #a1a1aa;
}

/* =========================================================
   RESPONSIVE BREAKPOINTS (COMPACT MOBILE)
   ========================================================= */
@media (max-width: 900px) {
  .mainLayout {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .brandCol {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .benefitsGrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.85rem;
    padding: 1rem 0.85rem;
  }

  .benefitDivider {
    display: none;
  }

  .footerContainer {
    padding: 1.75rem 0.85rem 1rem;
  }

  .mainLayout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .desktopLinkCols {
    display: none;
  }

  .mobileAccordions {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--ft-line);
  }

  .accordionItem {
    border-bottom: 1px solid var(--ft-line);
  }

  .accordionTrigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    background: transparent;
    border: none;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.68rem;
    font-weight: 850;
    letter-spacing: 0.14em;
    color: var(--ft-ink);
    cursor: pointer;
  }

  .accordionArrow {
    width: 0.85rem;
    height: 0.85rem;
    transition: transform 0.2s ease;
  }

  .accordionArrowOpen {
    transform: rotate(180deg);
  }

  .accordionContent {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 0.75rem;
  }

  .accordionLink {
    color: var(--ft-muted);
    font-size: 0.8rem;
    text-decoration: none;
  }

  .legalBar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
`;

fs.writeFileSync('components/layout/Footer.jsx', footerJsx, 'utf-8');
fs.writeFileSync('components/layout/Footer.module.css', footerCss, 'utf-8');

console.log('Compact Premium Footer updated successfully!');
