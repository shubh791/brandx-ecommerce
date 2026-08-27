import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/shubham/.gemini/antigravity/brain/a702c172-607b-4605-98f6-b3751e938051';
const files = fs.readdirSync(brainDir).filter(f => f.startsWith('black_streetwear_sneaker') && f.endsWith('.jpg'));
const latestFile = path.join(brainDir, files[files.length - 1]);
console.log('Processing:', latestFile);

const img = sharp(latestFile);
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const out = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const srcIdx = (y * width + x) * channels;
    const dstIdx = (y * width + x) * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    const isLight = r > 230 && g > 230 && b > 230;
    const isNeutral = Math.abs(r - g) < 14 && Math.abs(g - b) < 14;

    if (isLight && isNeutral) {
      const distFromWhite = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
      if (distFromWhite < 25) {
        out[dstIdx + 3] = 0;
      } else if (distFromWhite < 45) {
        const a = Math.round(255 * ((distFromWhite - 25) / 20));
        out[dstIdx] = r;
        out[dstIdx + 1] = g;
        out[dstIdx + 2] = b;
        out[dstIdx + 3] = a;
      } else {
        out[dstIdx] = r;
        out[dstIdx + 1] = g;
        out[dstIdx + 2] = b;
        out[dstIdx + 3] = 255;
      }
    } else {
      out[dstIdx] = r;
      out[dstIdx + 1] = g;
      out[dstIdx + 2] = b;
      out[dstIdx + 3] = 255;
    }
  }
}

const outputPath = 'public/images/hero/hero-black-sneaker.png';
await sharp(out, { raw: { width, height, channels: 4 } })
  .trim()
  .png()
  .toFile(outputPath);

console.log('Saved transparent black sneaker to:', outputPath);
