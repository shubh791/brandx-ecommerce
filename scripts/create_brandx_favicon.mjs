import fs from 'fs';

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="4" fill="#09090b"/>
  <path d="M8.5 7h4.2l3.3 5.3L19.3 7h4.2l-5.4 8.2L23.5 25h-4.2l-3.3-5.3L12.7 25H8.5l5.4-8.2z" fill="#ffffff"/>
</svg>`;

// Write to public/icon.svg, public/favicon.svg, app/icon.svg
fs.writeFileSync('public/icon.svg', svgIcon, 'utf-8');
fs.writeFileSync('public/favicon.svg', svgIcon, 'utf-8');
fs.writeFileSync('app/icon.svg', svgIcon, 'utf-8');

// Update app/layout.js metadata with icon configuration
let layoutJs = fs.readFileSync('app/layout.js', 'utf-8');
if (!layoutJs.includes("icons:")) {
  layoutJs = layoutJs.replace(
    'openGraph: {',
    `icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '32x32', type: 'image/svg+xml' }
    ],
    apple: '/icon.svg',
  },
  openGraph: {`
  );
  fs.writeFileSync('app/layout.js', layoutJs, 'utf-8');
}

console.log('Brand X favicon created and configured in layout.js!');
