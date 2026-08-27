'use client';

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
