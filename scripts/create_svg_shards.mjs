import fs from 'fs';
import sharp from 'sharp';

// 1. Shard 1 (Top Left Polygonal Crystal Rock)
const svg1 = `
<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1a" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eae6df"/>
      <stop offset="100%" stop-color="#b5ada1"/>
    </linearGradient>
    <linearGradient id="g1b" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d4cdc2"/>
      <stop offset="100%" stop-color="#8a8276"/>
    </linearGradient>
    <linearGradient id="g1c" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8f877c"/>
      <stop offset="100%" stop-color="#544e45"/>
    </linearGradient>
    <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.18"/>
    </filter>
  </defs>
  <g filter="url(#shadow1)" transform="rotate(-15 60 60)">
    <polygon points="60,20 95,50 60,95 25,65" fill="url(#g1a)" />
    <polygon points="60,20 95,50 100,80 60,95" fill="url(#g1b)" />
    <polygon points="25,65 60,95 50,105 15,80" fill="url(#g1c)" />
    <polygon points="60,20 25,65 15,80 40,30" fill="url(#g1a)" />
  </g>
</svg>
`;

// 2. Shard 2 (Tetrahedron / Pyramid Crystal)
const svg2 = `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2a" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0ece6"/>
      <stop offset="100%" stop-color="#c2b9ac"/>
    </linearGradient>
    <linearGradient id="g2b" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#999084"/>
      <stop offset="100%" stop-color="#615a4f"/>
    </linearGradient>
    <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.16"/>
    </filter>
  </defs>
  <g filter="url(#shadow2)" transform="rotate(25 50 50)">
    <polygon points="50,15 85,75 50,85" fill="url(#g2a)" />
    <polygon points="50,15 15,70 50,85" fill="url(#g2b)" />
    <polygon points="15,70 85,75 50,85" fill="#4d463d" />
  </g>
</svg>
`;

// 3. Shard 3 (Angular Floating Cube Fragment)
const svg3 = `
<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g3a" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8e4dc"/>
      <stop offset="100%" stop-color="#bcb3a5"/>
    </linearGradient>
    <linearGradient id="g3b" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a39a8c"/>
      <stop offset="100%" stop-color="#696155"/>
    </linearGradient>
    <linearGradient id="g3c" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6b6357"/>
      <stop offset="100%" stop-color="#423c34"/>
    </linearGradient>
    <filter id="shadow3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.2"/>
    </filter>
  </defs>
  <g filter="url(#shadow3)" transform="rotate(-30 55 55)">
    <polygon points="55,18 90,38 55,60 20,40" fill="url(#g3a)" />
    <polygon points="55,60 90,38 90,78 55,98" fill="url(#g3b)" />
    <polygon points="20,40 55,60 55,98 20,78" fill="url(#g3c)" />
  </g>
</svg>
`;

// 4. Shard 4 (Small Pointed Crystal Fragment)
const svg4 = `
<svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g4a" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5f2ec"/>
      <stop offset="100%" stop-color="#d0c7bb"/>
    </linearGradient>
    <linearGradient id="g4b" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8c8375"/>
      <stop offset="100%" stop-color="#595145"/>
    </linearGradient>
    <filter id="shadow4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <g filter="url(#shadow4)" transform="rotate(40 45 45)">
    <polygon points="45,10 75,55 45,80" fill="url(#g4a)" />
    <polygon points="45,10 15,50 45,80" fill="url(#g4b)" />
  </g>
</svg>
`;

await sharp(Buffer.from(svg1)).png().toFile('public/images/hero/hero-shard-1.png');
await sharp(Buffer.from(svg2)).png().toFile('public/images/hero/hero-shard-2.png');
await sharp(Buffer.from(svg3)).png().toFile('public/images/hero/hero-shard-3.png');
await sharp(Buffer.from(svg4)).png().toFile('public/images/hero/hero-shard-4.png');

console.log('Crystal sharp PNG assets generated in public/images/hero/!');
