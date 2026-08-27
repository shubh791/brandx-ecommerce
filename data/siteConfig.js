/**
 * ==============================================================================
 * BRAND X - SITE CONFIGURATION & METADATA
 * ==============================================================================
 * Edit this file to update the store name, contact numbers, address in Samalkha/Panipat,
 * Google Maps link, and social profiles.
 */

export const siteConfig = {
  // Brand Identity
  brandName: 'BRAND X',
  tagline: 'High-Street Luxury & Heavyweight Drip',
  description:
    'Premium readymade menswear, oversized streetwear, and luxury denim crafted for the modern generation. Visit our Samalkha Flagship or shop the drop online.',
  currency: '₹',
  currencyCode: 'INR',

  // Physical Flagship Store Details (Samalkha, Panipat)
  store: {
    name: 'Brand X Samalkha Flagship',
    landmark: 'Near Tota Ram Gate, Old Truck Union',
    address: 'NH-1, Near Tota Ram Gate, Old Truck Union, Samalkha, Panipat, Haryana - 132101',
    city: 'Samalkha',
    district: 'Panipat',
    state: 'Haryana',
    postalCode: '132101',
    country: 'India',
    phone: '+91 99991 80180',
    phoneDisplay: '+91 99991-80180',
    whatsapp: '919999180180',
    email: 'contact@brandxclothing.in',
    googleMapsUrl:
      'https://maps.google.com/?q=Brand+X+Near+Tota+Ram+Gate+Old+Truck+Union+Samalkha+Panipat',
    coordinates: {
      lat: 29.2406514,
      lng: 77.0083139,
    },
  },

  // Operating Hours
  timings: {
    days: 'Monday to Sunday',
    hours: '08:00 AM - 08:30 PM',
    statusText: 'Open Daily • Walk-ins Welcome',
  },

  // Social Links
  socials: {
    instagram: 'https://instagram.com',
    whatsapp: 'https://wa.me/919999180180',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
  },

  // Free shipping threshold
  freeShippingThreshold: 999,
  standardShippingFee: 99,

  // Trust Badges & Guarantees
  perks: [
    {
      title: 'Free Express Shipping',
      description: 'On all prepaid orders across India above ₹999',
      icon: 'Truck',
    },
    {
      title: 'Heavyweight Fabrics',
      description: '240 - 450 GSM pure combed cotton & custom blends',
      icon: 'ShieldCheck',
    },
    {
      title: 'Instant In-Store Pickup',
      description: 'Collect your order at our Samalkha store in 30 mins',
      icon: 'Store',
    },
    {
      title: 'Easy 7-Day Exchange',
      description: 'Hassle-free size replacement and support',
      icon: 'RotateCcw',
    },
  ],
};
