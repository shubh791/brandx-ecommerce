/**
 * ==============================================================================
 * BRAND X - PHYSICAL FLAGSHIP STORE (SAMALKHA, PANIPAT)
 * ==============================================================================
 * Edit store location, photos, amenities, and timings here.
 */

export const storeData = {
  name: 'Brand X Flagship Store',
  cityRegion: 'Samalkha, Panipat (Haryana)',
  tagline: 'Experience the drip in person with luxury fitting lounges & direct pickup.',
  
  address: {
    line1: 'Near Tota Ram Gate, Old Truck Union',
    line2: 'National Highway 1 (NH-1)',
    city: 'Samalkha',
    district: 'Panipat',
    state: 'Haryana',
    pincode: '132101',
    country: 'India',
  },

  contact: {
    phone: '+91 99991 80180',
    whatsapp: '+91 99991 80180',
    whatsappLink: 'https://wa.me/919999180180?text=Hello%20Brand%20X,%20I%20want%20to%20inquire%20about%20store%20availability',
    mapsUrl: 'https://maps.google.com/?q=Brand+X+Near+Tota+Ram+Gate+Old+Truck+Union+Samalkha+Panipat',
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.5259779313264!2d77.005739!3d29.2406514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE0JzI2LjMiTiA3N8KwMDAnMzAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000',
  },

  timings: [
    { day: 'Monday - Saturday', hours: '08:00 AM - 08:30 PM', open: true },
    { day: 'Sunday', hours: '08:00 AM - 08:30 PM', open: true },
  ],

  amenities: [
    { title: 'Fitting & Trial Lounges', desc: 'Spacious mirrors with custom studio lighting', icon: 'Sparkles' },
    { title: 'Instant In-Store Pickup', desc: 'Reserve online & try on before payment', icon: 'PackageCheck' },
    { title: 'All Payment Modes', desc: 'UPI (GPay/PhonePe), Credit/Debit Cards, Cash', icon: 'CreditCard' },
    { title: 'Free Parking on NH-1', desc: 'Ample parking space outside the store', icon: 'Car' },
  ],
};
