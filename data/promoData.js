/**
 * ==============================================================================
 * BRAND X - PROMO CODES & DROP ANNOUNCEMENTS
 * ==============================================================================
 * Manage discount promo codes, banner announcements, and sale alerts here.
 */

export const promoCodes = [
  {
    code: 'BRANDX10',
    discountPercent: 10,
    description: '10% OFF on your entire order',
    minOrder: 0,
  },
  {
    code: 'SAMALKHA20',
    discountPercent: 20,
    description: '20% OFF Samalkha Flagship special discount',
    minOrder: 2000,
  },
  {
    code: 'DRIP100',
    discountFlat: 100,
    description: 'Flat ₹100 OFF on prepaid orders',
    minOrder: 999,
  },
];

export const dropAnnouncement = {
  active: true,
  badge: 'SEASON 04 ARCHIVE',
  title: 'WINTER/SPRING STREETWEAR DROP IS NOW LIVE',
  subtitle: 'Heavyweight French Terry Hoodies, Boxy Mineral Tees & Cargo Parachutes.',
  ctaText: 'Explore New Arrivals',
  discountNote: 'Use code BRANDX10 for 10% OFF at checkout',
};
