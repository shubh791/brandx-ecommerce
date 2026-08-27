import fs from 'fs';

const footerJsx = `'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowUpRight,
  Store,
  MessageSquare,
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

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15"/>
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

function TwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733-16z"/>
      <path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768"/>
    </svg>
  );
}

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
    Icon: InstagramIcon,
  },
  {
    label: 'WhatsApp',
    handle: 'Direct Concierge',
    href: siteConfig.socials.whatsapp || 'https://wa.me/919999180180',
    Icon: WhatsAppIcon,
  },
  {
    label: 'YouTube',
    handle: 'Brand X Films',
    href: siteConfig.socials.youtube || 'https://youtube.com',
    Icon: YoutubeIcon,
  },
  {
    label: 'Facebook',
    handle: 'Brand X Community',
    href: siteConfig.socials.facebook || 'https://facebook.com',
    Icon: FacebookIcon,
  },
  {
    label: 'Twitter / X',
    handle: '@brandx_official',
    href: 'https://twitter.com',
    Icon: TwitterIcon,
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
                const IconComponent = soc.Icon;
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
                    <IconComponent className="w-4 h-4" />
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
                const IconComponent = soc.Icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialRowLink}
                  >
                    <div className={styles.socialRowIcon}>
                      <IconComponent className="w-4 h-4" />
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

fs.writeFileSync('components/layout/Footer.jsx', footerJsx, 'utf-8');
console.log('Footer.jsx updated with custom SVG social icons!');
