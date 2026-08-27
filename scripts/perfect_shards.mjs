import sharp from 'sharp';

const refImg = sharp('public/images/hero/refrence.png');
const { data, info } = await refImg.raw().toBuffer({ resolveWithObject: true });

function cropTransparent(left, top, width, height, threshold = 18) {
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = ((top + y) * info.width + (left + x)) * 4;
      const dstIdx = (y * width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const a = data[srcIdx + 3];

      const dist = Math.sqrt((r - 242) ** 2 + (g - 237) ** 2 + (b - 231) ** 2);
      if (dist < threshold) {
        out[dstIdx + 3] = 0;
      } else if (dist < threshold + 10) {
        out[dstIdx] = r;
        out[dstIdx + 1] = g;
        out[dstIdx + 2] = b;
        out[dstIdx + 3] = Math.round(a * ((dist - threshold) / 10));
      } else {
        out[dstIdx] = r;
        out[dstIdx + 1] = g;
        out[dstIdx + 2] = b;
        out[dstIdx + 3] = a;
      }
    }
  }
  return out;
}

// 1. Top-Left Floating Block (x: 138, y: 345, w: 72, h: 78)
const s1 = cropTransparent(138, 345, 72, 78, 20);
await sharp(s1, { raw: { width: 72, height: 78, channels: 4 } }).png().toFile('public/images/hero/shard-1.png');

// 2. Mid-Left Small Tetrahedron (x: 175, y: 442, w: 48, h: 48)
const s2 = cropTransparent(175, 442, 48, 48, 20);
await sharp(s2, { raw: { width: 48, height: 48, channels: 4 } }).png().toFile('public/images/hero/shard-2.png');

// 3. Lower-Left Rock near Bag (x: 62, y: 735, w: 68, h: 68)
const s3 = cropTransparent(62, 735, 68, 68, 20);
await sharp(s3, { raw: { width: 68, height: 68, channels: 4 } }).png().toFile('public/images/hero/shard-3.png');

// 4. Center-Bottom Stone (x: 382, y: 712, w: 70, h: 72)
const s4 = cropTransparent(382, 712, 70, 72, 20);
await sharp(s4, { raw: { width: 70, height: 72, channels: 4 } }).png().toFile('public/images/hero/shard-4.png');

// 5. Right-Side Mid Pyramid (x: 862, y: 552, w: 58, h: 60)
const s5 = cropTransparent(862, 552, 58, 60, 20);
await sharp(s5, { raw: { width: 58, height: 60, channels: 4 } }).png().toFile('public/images/hero/shard-5.png');

// 6. Right-Bottom Tetrahedron (x: 810, y: 868, w: 64, h: 68)
const s6 = cropTransparent(810, 868, 64, 68, 20);
await sharp(s6, { raw: { width: 64, height: 68, channels: 4 } }).png().toFile('public/images/hero/shard-6.png');

console.log('All 6 high-precision shards saved!');
