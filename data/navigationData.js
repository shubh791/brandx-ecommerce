/**
 * ==============================================================================
 * BRAND X - NAVIGATION & MEGA MENU CONFIGURATION (MYNTRA-INSPIRED ROUTES)
 * ==============================================================================
 */

export const navigationData = {
  categories: [
    {
      id: 'men',
      label: 'MEN',
      href: '/category/men',
      megaMenu: {
        title: 'Men’s Streetwear & Tops',
        columns: [
          {
            heading: 'Topwear & Tees',
            href: '/category/oversized-tees',
            items: [
              { label: 'Oversized Acid-Wash Tees (260 GSM)', href: '/category/oversized-tees' },
              { label: 'Boxy Drop-Shoulder Tees', href: '/category/oversized-tees' },
              { label: 'Neo-Tokyo Graphic Tees', href: '/category/oversized-tees' },
              { label: 'Raw Hem Heavyweight Basics', href: '/category/oversized-tees' },
            ],
          },
          {
            heading: 'Heavyweight Hoodies',
            href: '/category/hoodies',
            items: [
              { label: '450 GSM French Terry Hoodies', href: '/category/hoodies' },
              { label: 'Architectural Boxy Hoodies', href: '/category/hoodies' },
              { label: 'Full-Zip Heavy Fleece Hoodies', href: '/category/hoodies' },
              { label: 'Limited Vault Colorways', href: '/category/hoodies' },
            ],
          },
          {
            heading: 'Bottoms & Denim',
            href: '/category/cargos-denim',
            items: [
              { label: 'Tactical Parachute Cargos', href: '/category/cargos-denim' },
              { label: 'Selvedge Stacked Denim', href: '/category/cargos-denim' },
              { label: 'Heavy Duty Carpenter Pants', href: '/category/cargos-denim' },
            ],
          },
          {
            heading: 'Featured Drop',
            featured: true,
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
            badge: 'FLAGSHIP PICK',
            title: '450 GSM French Terry',
            desc: 'In-store trial at Samalkha NH-1',
            href: '/category/hoodies',
          },
        ],
      },
    },
    {
      id: 'oversized-tees',
      label: 'OVERSIZED',
      href: '/category/oversized-tees',
      badge: 'HOT',
      megaMenu: {
        title: 'Oversized Streetwear Vault',
        columns: [
          {
            heading: 'Oversized Tees',
            href: '/category/oversized-tees',
            items: [
              { label: '240 GSM Combed Cotton Tees', href: '/category/oversized-tees' },
              { label: '260 GSM Mineral Acid-Wash', href: '/category/oversized-tees' },
              { label: 'Cyberpunk Puff Print Graphic Tees', href: '/category/oversized-tees' },
              { label: 'Raw Hem Boxy Minimal Tees', href: '/category/oversized-tees' },
            ],
          },
          {
            heading: 'Oversized Sets',
            href: '/category/tracksuits',
            items: [
              { label: 'Velour Drip Matching Tracksuits', href: '/category/tracksuits' },
              { label: 'Reflective 3M Night Street Sets', href: '/category/tracksuits' },
            ],
          },
          {
            heading: 'Outerwear',
            href: '/category/jackets',
            items: [
              { label: 'Archival Quilted Bombers', href: '/category/jackets' },
              { label: 'Heavy Flannel Overshirts', href: '/category/jackets' },
            ],
          },
        ],
      },
    },
    {
      id: 'hoodies',
      label: 'HOODIES',
      href: '/category/hoodies',
      megaMenu: {
        title: '450 GSM French Terry Archive',
        columns: [
          {
            heading: 'Hoodie Styles',
            href: '/category/hoodies',
            items: [
              { label: 'Zero-Drawstring Boxy Pullover', href: '/category/hoodies' },
              { label: 'Monochrome Two-Way Zip Hoodie', href: '/category/hoodies' },
              { label: 'Heavy Brushed Fleece Essentials', href: '/category/hoodies' },
            ],
          },
          {
            heading: 'Fabric Details',
            href: '/category/hoodies',
            items: [
              { label: '450 GSM High-Density Loopback', href: '/category/hoodies' },
              { label: 'Double Layered Architectural Hood', href: '/category/hoodies' },
              { label: 'Zero-Shrink Pre-Washed Cotton', href: '/category/hoodies' },
            ],
          },
        ],
      },
    },
    {
      id: 'cargos-denim',
      label: 'BOTTOMS',
      href: '/category/cargos-denim',
      megaMenu: {
        title: 'Cargos & Denim Archive',
        columns: [
          {
            heading: 'Tactical Cargos',
            href: '/category/cargos-denim',
            items: [
              { label: '6-Pocket Parachute Bungee Cargos', href: '/category/cargos-denim' },
              { label: 'Heavy Duck Canvas Carpenter Pants', href: '/category/cargos-denim' },
              { label: 'Weather Resistant Utility Joggers', href: '/category/cargos-denim' },
            ],
          },
          {
            heading: 'Stacked Denim',
            href: '/category/cargos-denim',
            items: [
              { label: '14.5 Oz Distressed Selvedge Denim', href: '/category/cargos-denim' },
              { label: 'Extended Inseam Stacked Jeans', href: '/category/cargos-denim' },
            ],
          },
        ],
      },
    },
    {
      id: 'tracksuits',
      label: 'SETS',
      href: '/category/tracksuits',
      badge: 'NEW',
      megaMenu: {
        title: 'Two-Piece Sets',
        columns: [
          {
            heading: 'Streetwear Sets',
            href: '/category/tracksuits',
            items: [
              { label: 'Velour Drip Heavyweight Set', href: '/category/tracksuits' },
              { label: 'Reflective 3M Performance Set', href: '/category/tracksuits' },
            ],
          },
        ],
      },
    },
    {
      id: 'jackets',
      label: 'JACKETS',
      href: '/category/jackets',
      megaMenu: {
        title: 'Jackets & Outerwear',
        columns: [
          {
            heading: 'Outerwear',
            href: '/category/jackets',
            items: [
              { label: 'Archival Quilted Tech Bomber', href: '/category/jackets' },
              { label: 'Vintage Timber Flannel Overshirt', href: '/category/jackets' },
            ],
          },
        ],
      },
    },
  ],
};
