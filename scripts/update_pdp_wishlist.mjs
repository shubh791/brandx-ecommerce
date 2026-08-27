import fs from 'fs';

let css = fs.readFileSync('app/product/[id]/ProductDetailPage.module.css', 'utf-8');

// Ensure wishlist active styles use the restrained yellow accent
const newWishlistCss = `
.wishlistActionBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0 1.15rem;
  min-height: 3.35rem;
  background: #ffffff;
  border: 1px solid var(--pdp-line);
  color: var(--pdp-ink);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.wishlistActionBtn:hover {
  border-color: var(--pdp-ink);
  transform: translateY(-1px);
}

.wishlistActionBtnActive {
  background: #09090b;
  border-color: #09090b;
  color: var(--pdp-accent);
}

.wishlistActionBtnActive svg {
  fill: var(--pdp-accent);
  color: var(--pdp-accent);
}

.wishlistBtnActive {
  background: var(--pdp-ink);
  color: var(--pdp-accent);
  border-color: var(--pdp-ink);
}

.wishlistBtnActive svg {
  fill: var(--pdp-accent);
  color: var(--pdp-accent);
}
`;

if (!css.includes('wishlistActionBtn')) {
  css += newWishlistCss;
  fs.writeFileSync('app/product/[id]/ProductDetailPage.module.css', css, 'utf-8');
}

// Update app/product/[id]/page.js
let pageJs = fs.readFileSync('app/product/[id]/page.js', 'utf-8');

// Add secondary wishlist button in CTA row
const oldCtaRow = `<button
                    type="button"
                    onClick={handleAddToCart}
                    className={styles.addBagBtn}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </button>`;

const newCtaRow = `<button
                    type="button"
                    onClick={handleAddToCart}
                    className={styles.addBagBtn}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </button>

                  {/* Secondary Wishlist Action Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={[
                      styles.wishlistActionBtn,
                      wishlisted ? styles.wishlistActionBtnActive : '',
                    ].join(' ')}
                    aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    title={wishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{wishlisted ? 'SAVED' : 'WISHLIST'}</span>
                  </button>`;

if (pageJs.includes(oldCtaRow)) {
  pageJs = pageJs.replace(oldCtaRow, newCtaRow);
  fs.writeFileSync('app/product/[id]/page.js', pageJs, 'utf-8');
}

console.log('PDP Wishlist button updated with yellow accent and secondary CTA.');
