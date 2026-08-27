import fs from 'fs';

let css = fs.readFileSync('app/product/[id]/ProductDetailPage.module.css', 'utf-8');

const mobileCleanCtaCss = `
@media (max-width: 768px) {
  .ctaRow {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    align-items: stretch;
  }

  .addBagBtn {
    display: none !important;
  }

  .qtyBox {
    height: 3rem;
    padding: 0 0.45rem;
  }

  .qtyBtn {
    width: 1.6rem;
    font-size: 1.1rem;
  }

  .qtyVal {
    width: 1.6rem;
    font-size: 0.82rem;
  }

  .wishlistActionBtn {
    height: 3rem;
    width: 100%;
    min-height: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0 1rem;
    font-size: 0.72rem;
  }

  .buyNowBtn {
    min-height: 3.25rem;
    font-size: 0.8rem;
  }
}
`;

css += mobileCleanCtaCss;
fs.writeFileSync('app/product/[id]/ProductDetailPage.module.css', css, 'utf-8');
console.log('Mobile add to bag removed from cramped row and cta layout cleaned up!');
