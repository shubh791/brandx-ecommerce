import fs from 'fs';

const footerJsx = `'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowUpRight,
  Store,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import styles from './Footer.module.css';

const shopLinks = [
  { label: 'Oversized Tees (240-280 GSM)', href: '/category/oversized-tees' },
  { label: 'Heavyweight Hoodies (450 GSM)', href: '/category/hoodies' },
  { label: 'Tactical Cargo & Denim', href: '/category/cargos-denim' },
  { label: 'Co-ord Sets & Tracksuits', href: '/category/tracksuits' },
  { label: 'Bombers & Outerwear', href: '/category/jackets' },
  { label: 'All New Drops 2026', href: '/category/all' },
];

const customerCareLinks = [
  { label: 'Track Your Order', href: '/track-order/BX-2026-9041' },
  { label: 'Samalkha Hub Dispatch', href: '/track-order/BX-2026-9041' },
  { label: 'Shipping & Delivery Policy', href: 'mailto:contact@brandxclothing.in?subject=Shipping%20Question' },
  { label: 'Easy 7-Day Exchange', href: 'mailto:contact@brandxclothing.in?subject=Exchange%20Request' },
  { label: 'Size & Silhouette Guide', href: '/category/all' },
  { label: 'Admin Portal', href: '/admin' },
];

const socialProfiles = [
  {
    label: 'Instagram',
    handle: '@brandx_samalkha',
    href: siteConfig.socials.instagram || 'https://instagram.com',
    icon: Instagram,
  },
  {
    label: 'WhatsApp',
    handle: 'Direct Concierge',
    href: siteConfig.socials.whatsapp || 'https://wa.me/919999180180',
    icon: MessageCircle,
  },
  {
    label: 'YouTube',
    handle: 'Brand X Lookbook Films',
    href: siteConfig.socials.youtube || 'https://youtube.com',
    icon: Youtube,
  },
  {
    label: 'Facebook',
    handle: 'Brand X Community',
    href: siteConfig.socials.facebook || 'https://facebook.com',
    icon: Facebook,
  },
  {
    label: 'Twitter / X',
    handle: '@brandx_official',
    href: 'https://twitter.com',
    icon: Twitter,
  },
];

const trustPerks = [
  {
    icon: Truck,
    title: 'Free Express Shipping',
    desc: 'On all orders above ₹999 across India',
  },
  {
    icon: ShieldCheck,
    title: '240 - 450 GSM Fabrics',
    desc: 'Heavyweight loopback French Terry & cotton',
  },
  {
    icon: RotateCcw,
    title: '7-Day Easy Exchange',
    desc: 'Hassle-free doorstep exchange & pickup',
  },
  {
    icon: Store,
    title: 'Samalkha Flagship Store',
    desc: 'Visit daily: 08:00 AM - 08:30 PM',
  },
];

function supportHref(subject) {
  return \`mailto:\${siteConfig.store.email}?subject=\${encodeURIComponent(\`BRAND X — \${subject}\`)}\`;
}

export function Footer() {
  return (
    <footer className={styles.fashionFooter} aria-label="Brand X Footer">
      {/* 1. Top Trust & Guarantees Strip */}
      <div className={styles.trustStripSection}>
        <div className={styles.trustGrid}>
          {trustPerks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className={styles.trustItem}>
                <div className={styles.trustIconWrap}>
                  <Icon className={styles.trustIcon} />
                </div>
                <div className={styles.trustCopy}>
                  <strong>{perk.title}</strong>
                  <p>{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.fashionFooterShell}>
        {/* 2. Main 4-Column Footer Grid */}
        <div className={styles.mainRow}>
          {/* Column 1: Brand Identity & Contact */}
          <div className={styles.identity}>
            <Link href="/" className={styles.logo} aria-label="Brand X home">
              <span className={styles.logoBadge}>X</span>
              <strong>
                BRANDX
                <small>SAMALKHA FLAGSHIP</small>
              </strong>
            </Link>

            <p className={styles.bio}>
              High-street readymade menswear and luxury streetwear silhouettes. Engineered with heavyweight combed cottons, boxy proportions, and stone wash finishes in Samalkha, Haryana.
            </p>

            <div className={styles.contactList}>
              <a
                href={siteConfig.store.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <MapPin className={styles.contactIcon} />
                <span>{siteConfig.store.address}</span>
              </a>

              <a href={\`tel:\${siteConfig.store.phone}\`} className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <strong>{siteConfig.store.phoneDisplay}</strong>
              </a>

              <a href={\`mailto:\${siteConfig.store.email}\`} className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span>{siteConfig.store.email}</span>
              </a>
            </div>

            {/* Quick Social Icon Badges */}
            <div className={styles.socialIconBar} aria-label="Social media channels">
              {socialProfiles.map((soc) => {
                const Icon = soc.icon;
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
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <nav className={styles.fashionFooterLinks} aria-label="Footer shop links">
            <h2>COLLECTIONS</h2>
            <div className={styles.linkList}>
              {shopLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerNavLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Column 3: Customer Care & Support */}
          <nav className={styles.fashionFooterLinks} aria-label="Customer support links">
            <h2>CUSTOMER CARE</h2>
            <div className={styles.linkList}>
              {customerCareLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerNavLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Column 4: Follow & Social Channels */}
          <nav className={styles.fashionFooterLinks} aria-label="Brand X social links">
            <h2>CONNECT WITH US</h2>
            <div className={styles.socialDetailList}>
              {socialProfiles.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialRowLink}
                  >
                    <div className={styles.socialRowIcon}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className={styles.socialRowText}>
                      <strong>{soc.label}</strong>
                      <small>{soc.handle}</small>
                    </div>
                    <ArrowUpRight className={styles.socialRowArrow} />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        {/* 3. Large Ambient Typographic Brand Signature */}
        <div className={styles.watermarkContainer} aria-hidden="true">
          <span className={styles.watermarkText}>BRAND X</span>
        </div>

        {/* 4. Bottom Legal Bar */}
        <div className={styles.fashionFooterLegal}>
          <div className={styles.legalLeft}>
            <p>© {new Date().getFullYear()} BRAND X CLOTHING CO. ALL RIGHTS RESERVED.</p>
            <span className={styles.legalBadge}>MADE WITH PRIDE IN SAMALKHA, HARYANA</span>
          </div>

          <div className={styles.legalLinks}>
            <a href={supportHref('Privacy policy enquiry')}>PRIVACY POLICY</a>
            <a href={supportHref('Terms and conditions enquiry')}>TERMS OF SERVICE</a>
            <a href={supportHref('Shipping policy enquiry')}>SHIPPING & DELIVERY</a>
            <a href={supportHref('Refund policy enquiry')}>REFUND POLICY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

const footerCss = `.fashionFooter {
  --footer-ink: #09090b;
  --footer-muted: #a1a1aa;
  --footer-line: rgba(255, 255, 255, .12);
  --footer-accent: #f2cf45;
  position: relative;
  overflow: hidden;
  background: var(--footer-ink);
  color: #fff;
}

/* =========================================================
   1. TOP TRUST & GUARANTEES STRIP
   ========================================================= */
.trustStripSection {
  border-bottom: 1px solid var(--footer-line);
  background: rgba(255, 255, 255, .025);
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
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .1);
  color: var(--footer-accent);
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
  color: #fff;
  letter-spacing: -.01em;
}

.trustCopy p {
  margin-top: .25rem;
  color: var(--footer-muted);
  font-size: .75rem;
  line-height: 1.45;
}

/* =========================================================
   2. MAIN FOOTER SHELL & 4-COLUMN GRID (LARGER & SPACIOUS)
   ========================================================= */
.fashionFooterShell {
  position: relative;
  width: min(100%, 82rem);
  margin-inline: auto;
  padding: clamp(4.5rem, 6.5vw, 6.5rem) clamp(1rem, 2.5vw, 2.5rem) clamp(2rem, 3.5vw, 3rem);
}

.mainRow {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(20rem, 1.45fr) repeat(3, minmax(11rem, 1fr));
  gap: clamp(2.5rem, 4.5vw, 4.5rem);
  padding-bottom: clamp(3.5rem, 5vw, 5rem);
  border-bottom: 1px solid var(--footer-line);
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  max-width: 28rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: .85rem;
  text-decoration: none;
  color: #fff;
}

.logoBadge {
  width: 2.65rem;
  height: 2.65rem;
  display: grid;
  place-items: center;
  background: #ffffff;
  color: var(--footer-ink);
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
}

.logo small {
  margin-top: .45rem;
  color: var(--footer-accent);
  font-family: var(--font-geist-mono), monospace;
  font-size: .52rem;
  font-weight: 800;
  letter-spacing: .2em;
}

.bio {
  color: #d4d4d8;
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
  color: #fff;
  font-family: var(--font-geist-mono), monospace;
  letter-spacing: .05em;
}

.contactIcon {
  width: 1rem;
  height: 1rem;
  color: var(--footer-accent);
  flex-shrink: 0;
  margin-top: .15rem;
}

.contactItem:hover {
  color: #ffffff;
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
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .12);
  color: #ffffff;
  transition: background-color .2s ease, border-color .2s ease, transform .25s ease, color .2s ease;
}

.socialIconBtn:hover {
  background: var(--footer-accent);
  border-color: var(--footer-accent);
  color: #000000;
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
  color: #ffffff;
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
  color: var(--footer-accent);
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
  background: rgba(255, 255, 255, .03);
  border: 1px solid rgba(255, 255, 255, .08);
  color: #ffffff;
  text-decoration: none;
  transition: background-color .2s ease, border-color .2s ease, transform .25s ease;
}

.socialRowLink:hover {
  background: rgba(255, 255, 255, .08);
  border-color: rgba(255, 255, 255, .25);
  transform: translateX(.25rem);
}

.socialRowIcon {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, .08);
  color: var(--footer-accent);
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
  color: #fff;
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
  color: var(--footer-accent);
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
  color: rgba(255, 255, 255, .02);
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
  color: var(--footer-accent);
}

.legalLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.legalLinks a {
  color: #a1a1aa;
  font-family: var(--font-geist-mono), monospace;
  font-size: .62rem;
  font-weight: 750;
  letter-spacing: .12em;
  text-decoration: none;
  transition: color .2s ease;
}

.legalLinks a:hover {
  color: var(--footer-accent);
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

fs.writeFileSync('components/layout/Footer.jsx', footerJsx, 'utf-8');
fs.writeFileSync('components/layout/Footer.module.css', footerCss, 'utf-8');
console.log('Footer updated successfully!');
