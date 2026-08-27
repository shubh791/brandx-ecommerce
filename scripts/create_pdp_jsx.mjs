import fs from 'fs';

const pdpJsx = `'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { productsData } from '@/data/productsData';
import { useShop } from '@/context/ShopContext';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  ChevronRight,
  ChevronDown,
  Store,
  Ruler,
  X,
  Share2,
  ArrowUpRight,
} from 'lucide-react';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage({ params }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams?.id;
  const router = useRouter();

  const { addToCart, toggleWishlist, isItemWishlisted, setIsCartOpen, showToast } = useShop();

  // Fetch Product
  const product = useMemo(() => {
    return productsData.find((p) => p.id === productId) || productsData[0];
  }, [productId]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    details: true,
    fabric: false,
    care: false,
    shipping: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const wishlisted = isItemWishlisted(product.id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Related Products (4 items)
  const relatedProducts = useMemo(() => {
    return productsData
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Complementary pieces for "HOW TO WEAR IT"
  const complementaryProducts = useMemo(() => {
    return productsData
      .filter((p) => p.id !== product.id && p.category !== product.category)
      .slice(0, 2);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    showToast(\`Added \${product.name} (\${selectedSize}) to Bag!\`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: product.name,
        text: \`Check out \${product.name} at Brand X Samalkha!\`,
        url: window.location.href,
      });
    } else if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const isHot = product.badgeType === 'hot' || product.tag === 'BESTSELLER';

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* 1. Subtle Breadcrumb Navigation */}
        <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
          <div className={styles.breadcrumbShell}>
            <Link href="/">HOME</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href={\`/category/\${product.category}\`}>{product.categoryLabel}</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </div>
        </nav>

        {/* 2. Main Two-Column Product Layout */}
        <section className={styles.productSection}>
          <div className={styles.productLayout}>
            {/* -------------------------------------------------------------
                LEFT COLUMN: PRODUCT MEDIA & GALLERY (~58–60%)
               ------------------------------------------------------------- */}
            <div className={styles.galleryWrapper}>
              {/* Supporting Thumbnails Strip */}
              <div className={styles.thumbnailStrip} role="tablist" aria-label="Product thumbnails">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={selectedImage === idx}
                    onClick={() => setSelectedImage(idx)}
                    className={[
                      styles.thumbBtn,
                      selectedImage === idx ? styles.thumbBtnActive : '',
                    ].join(' ')}
                    aria-label={\`View image \${idx + 1}\`}
                  >
                    <img src={imgUrl} alt="" className={styles.thumbImg} />
                  </button>
                ))}
              </div>

              {/* Dominant Main Hero Display Image */}
              <div className={styles.mainMediaContainer}>
                <img
                  src={gallery[selectedImage] || product.image}
                  alt={product.name}
                  className={styles.mainProductImg}
                />

                {/* Badges Stack */}
                <div className={styles.badgeStack}>
                  {product.tag && (
                    <span className={[styles.tagBadge, isHot ? styles.tagBadgeHot : ''].join(' ')}>
                      {product.tag}
                    </span>
                  )}
                  {product.gsm && (
                    <span className={styles.gsmBadge}>{product.gsm}</span>
                  )}
                </div>

                {/* Floating Wishlist & Share Actions */}
                <div className={styles.floatingActions}>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={[
                      styles.floatingActionBtn,
                      wishlisted ? styles.wishlistBtnActive : '',
                    ].join(' ')}
                    aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className={styles.floatingActionBtn}
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: PRODUCT INFO & PURCHASE ACTIONS (~40–42%)
               ------------------------------------------------------------- */}
            <div className={styles.infoStickyCol}>
              {/* Title, Category & Ratings */}
              <div className={styles.infoTitleGroup}>
                <div className={styles.editorialEyebrow}>
                  <span>SAMALKHA ARCHIVE</span>
                  <span className={styles.eyebrowDot}>•</span>
                  <span>{product.categoryLabel}</span>
                </div>

                <h1 className={styles.productHeading}>{product.name}</h1>

                <div className={styles.ratingRow}>
                  <div className={styles.ratingBadge}>
                    <Star />
                    <span>{product.rating || 4.9}</span>
                  </div>
                  <span className={styles.reviewCount}>({product.reviewsCount || 120} Reviews)</span>

                  <div className={styles.stockBadge}>
                    <span className={styles.stockPulseDot} aria-hidden="true" />
                    <span>IN STOCK</span>
                  </div>
                </div>
              </div>

              {/* Pricing Box */}
              <div className={styles.pricingBox}>
                <div className={styles.priceGroup}>
                  <span className={styles.currentPrice}>₹{product.price}</span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                  )}
                  {product.discount && (
                    <span className={styles.discountPill}>{product.discount}</span>
                  )}
                </div>
                <span className={styles.taxNotice}>
                  Inclusive of all taxes • Free express delivery above ₹999
                </span>
              </div>

              {/* Short Description */}
              <p className={styles.shortDesc}>{product.description}</p>

              {/* Color Swatch Row */}
              {product.color && (
                <div className={styles.colorRow}>
                  <span className={styles.colorLabel}>COLOR:</span>
                  <div className={styles.colorValue}>
                    <span
                      className={styles.colorSwatch}
                      style={{ background: product.colorCode || '#18181b' }}
                      aria-hidden="true"
                    />
                    <span>{product.color}</span>
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className={styles.sizeBlock}>
                <div className={styles.sizeHeader}>
                  <span className={styles.sizeTitle}>
                    SELECT SIZE: <strong>{selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className={styles.sizeGuideBtn}
                  >
                    <Ruler className="w-3 h-3" />
                    <span>SIZE GUIDE</span>
                  </button>
                </div>

                <div className={styles.sizeGrid} role="radiogroup" aria-label="Product size">
                  {product.sizes?.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedSize(size)}
                        className={[
                          styles.sizeOptionBtn,
                          isSelected ? styles.sizeOptionBtnActive : '',
                        ].join(' ')}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Large Conversion CTAs */}
              <div className={styles.ctaBlock}>
                <div className={styles.ctaRow}>
                  {/* Quantity Selector */}
                  <div className={styles.qtyBox} aria-label="Quantity">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={styles.qtyBtn}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.qtyVal}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className={styles.qtyBtn}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Bag CTA */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={styles.addBagBtn}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>

                {/* Instant Express Checkout CTA */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className={styles.buyNowBtn}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>BUY NOW • ₹{product.price * quantity}</span>
                </button>
              </div>

              {/* Compact Trust / Service Benefits Row */}
              <div className={styles.trustServicesGrid}>
                <div className={styles.trustServiceItem}>
                  <Truck className={styles.trustServiceIcon} />
                  <div>
                    <strong>FREE DELIVERY</strong>
                    <span>Orders over ₹999</span>
                  </div>
                </div>

                <div className={styles.trustServiceItem}>
                  <RotateCcw className={styles.trustServiceIcon} />
                  <div>
                    <strong>7-DAY EXCHANGE</strong>
                    <span>Doorstep pickup</span>
                  </div>
                </div>

                <div className={styles.trustServiceItem}>
                  <ShieldCheck className={styles.trustServiceIcon} />
                  <div>
                    <strong>SECURE PAYMENTS</strong>
                    <span>100% Encrypted</span>
                  </div>
                </div>

                <div className={styles.trustServiceItem}>
                  <Store className={styles.trustServiceIcon} />
                  <div>
                    <strong>FLAGSHIP PICKUP</strong>
                    <span>Samalkha Hub</span>
                  </div>
                </div>
              </div>

              {/* Expandable Product Details Accordions */}
              <div className={styles.accordionSection}>
                {/* 1. Product Details */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('details')}
                    className={styles.accordionTrigger}
                    aria-expanded={openAccordions.details}
                  >
                    <span>PRODUCT DETAILS</span>
                    <ChevronDown
                      className={[
                        styles.accordionArrow,
                        openAccordions.details ? styles.accordionArrowOpen : '',
                      ].join(' ')}
                    />
                  </button>
                  {openAccordions.details && (
                    <div className={styles.accordionContent}>
                      <p>{product.description}</p>
                      {product.features && (
                        <ul className={styles.specList} style={{ marginTop: '0.65rem' }}>
                          {product.features.map((feat, i) => (
                            <li key={i}>{feat}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Fabric & Fit */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('fabric')}
                    className={styles.accordionTrigger}
                    aria-expanded={openAccordions.fabric}
                  >
                    <span>FABRIC & SILHOUETTE FIT</span>
                    <ChevronDown
                      className={[
                        styles.accordionArrow,
                        openAccordions.fabric ? styles.accordionArrowOpen : '',
                      ].join(' ')}
                    />
                  </button>
                  {openAccordions.fabric && (
                    <div className={styles.accordionContent}>
                      <ul className={styles.specList}>
                        <li>Fabric: {product.fabric || '100% Pure Combed Cotton'}</li>
                        <li>Weight: {product.gsm || 'Heavyweight Construction'}</li>
                        <li>Fit: {product.fit || 'Architectural Boxy Streetwear Silhouette'}</li>
                        <li>Pre-shrunk and bio-washed for zero shrinkage and longevity</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* 3. Care Instructions */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('care')}
                    className={styles.accordionTrigger}
                    aria-expanded={openAccordions.care}
                  >
                    <span>CARE INSTRUCTIONS</span>
                    <ChevronDown
                      className={[
                        styles.accordionArrow,
                        openAccordions.care ? styles.accordionArrowOpen : '',
                      ].join(' ')}
                    />
                  </button>
                  {openAccordions.care && (
                    <div className={styles.accordionContent}>
                      <ul className={styles.specList}>
                        <li>Machine wash cold inside out with like colors</li>
                        <li>Do not bleach or dry clean</li>
                        <li>Tumble dry low or hang dry in shade</li>
                        <li>Cool iron on reverse side if needed (avoid direct print ironing)</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* 4. Shipping & Exchange */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('shipping')}
                    className={styles.accordionTrigger}
                    aria-expanded={openAccordions.shipping}
                  >
                    <span>SHIPPING & RETURNS</span>
                    <ChevronDown
                      className={[
                        styles.accordionArrow,
                        openAccordions.shipping ? styles.accordionArrowOpen : '',
                      ].join(' ')}
                    />
                  </button>
                  {openAccordions.shipping && (
                    <div className={styles.accordionContent}>
                      <ul className={styles.specList}>
                        <li>Dispatched from Samalkha Hub within 24 hours</li>
                        <li>Standard Delivery: 2–4 business days across India</li>
                        <li>Hassle-free 7-day doorstep size exchange guarantee</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Visually Rich Editorial Section: HOW TO WEAR IT */}
        <section className={styles.howToWearSection} aria-label="Styling Guide">
          <div className={styles.howToWearShell}>
            <div className={styles.lookVisualFrame}>
              <span className={styles.lookBadge}>HOW TO WEAR IT</span>
              <img
                src="/images/hero/refrence.png"
                alt="Brand X Lookbook Styling"
                className={styles.lookVisualImg}
              />
            </div>

            <div className={styles.howToWearCopy}>
              <div className={styles.sectionEyebrow}>
                <span>STYLE DIRECTION</span>
                <span className={styles.eyebrowDot}>•</span>
                <span>LOOKBOOK 2026</span>
              </div>

              <h2 className={styles.sectionTitle}>THE COMPLETE SILHOUETTE</h2>

              <p className={styles.sectionText}>
                Engineered for elevated casual streetwear presence. Pair this {product.name.toLowerCase()} with tactical relaxed-fit denim or heavyweight cargos, grounded with monochrome court sneakers for an authentic boxy proportion.
              </p>

              <div>
                <span className={styles.colorLabel} style={{ display: 'block', marginBottom: '0.45rem' }}>
                  PAIR WITH COMPLEMENTARY PIECES:
                </span>
                <div className={styles.pairingList}>
                  {complementaryProducts.map((comp) => (
                    <Link
                      key={comp.id}
                      href={\`/product/\${comp.id}\`}
                      className={styles.pairingCard}
                    >
                      <img src={comp.image} alt={comp.name} className={styles.pairingThumb} />
                      <div className={styles.pairingInfo}>
                        <strong>{comp.name}</strong>
                        <span>₹{comp.price} • View Piece →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Related Products: YOU MAY ALSO LIKE */}
        <section className={styles.relatedSection} aria-label="Related Products">
          <div className={styles.relatedHeader}>
            <div>
              <div className={styles.sectionEyebrow}>
                <span>CURATED RECOMMENDATIONS</span>
              </div>
              <h2 className={styles.sectionTitle}>YOU MAY ALSO LIKE</h2>
            </div>
            <Link
              href="/category/all"
              className={styles.editorialEyebrow}
              style={{ color: 'var(--pdp-ink)', textDecoration: 'underline' }}
            >
              <span>VIEW FULL VAULT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      {/* 5. Mobile Sticky Bottom CTA Bar */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.mobileStickyInfo}>
          <span className={styles.mobileStickyPrice}>₹{product.price * quantity}</span>
          <span className={styles.mobileStickySize}>Size: {selectedSize} • Qty: {quantity}</span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className={styles.mobileStickyBtn}
        >
          ADD TO BAG
        </button>
      </div>

      <Footer />

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className={styles.modalOverlay}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
              className={styles.modalBox}
            >
              <div className={styles.modalHeader}>
                <h3>BRAND X SIZE GUIDE</h3>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className={styles.modalCloseBtn}
                  aria-label="Close size guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--pdp-muted)', margin: 0 }}>
                All measurements are in inches. Our silhouettes are cut with drop shoulders and relaxed boxy drape.
              </p>

              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST (IN)</th>
                    <th>LENGTH (IN)</th>
                    <th>SHOULDER (IN)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>42</td>
                    <td>27.5</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>44</td>
                    <td>28.5</td>
                    <td>21</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>46</td>
                    <td>29.5</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>48</td>
                    <td>30.5</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td><strong>XXL</strong></td>
                    <td>50</td>
                    <td>31.5</td>
                    <td>24</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
`;

fs.writeFileSync('app/product/[id]/page.js', pdpJsx, 'utf-8');
console.log('ProductDetailPage JSX created successfully!');
