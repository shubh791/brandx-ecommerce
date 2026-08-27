import sharp from 'sharp';

const refImg = sharp('public/images/hero/refrence.png');
const { data, info } = await refImg.raw().toBuffer({ resolveWithObject: true });

function extractTransparent(left, top, width, height, threshold = 26) {
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = ((top + y) * info.width + (left + x)) * 4;
      const dstIdx = (y * width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const a = data[srcIdx + 3];

      // Distance from canvas background (242, 237, 231)
      const dist = Math.sqrt((r - 242) ** 2 + (g - 237) ** 2 + (b - 231) ** 2);
      if (dist < threshold) {
        out[dstIdx + 3] = 0; // transparent
      } else if (dist < threshold + 15) {
        out[dstIdx] = r;
        out[dstIdx + 1] = g;
        out[dstIdx + 2] = b;
        out[dstIdx + 3] = Math.round(a * ((dist - threshold) / 15));
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

// Extract Shards
async function saveShard(name, left, top, width, height, threshold = 22) {
  const buf = extractTransparent(left, top, width, height, threshold);
  await sharp(buf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(`public/images/hero/${name}.png`);
  console.log(`Saved ${name}.png`);
}

await saveShard('hero-shard-1', 135, 340, 80, 85);
await saveShard('hero-shard-2', 170, 440, 60, 60);
await saveShard('hero-shard-3', 60, 730, 80, 80);
await saveShard('hero-shard-4', 380, 710, 80, 80);
await saveShard('hero-shard-5', 840, 590, 80, 80);
await saveShard('hero-shard-6', 845, 765, 60, 65);

// Extract Folded Denim
async function saveFoldedDenim() {
  const left = 600, top = 300, width = 570, height = 650;
  const buf = extractTransparent(left, top, width, height, 22);
  await sharp(buf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/images/hero/hero-folded-denim.png');
  console.log('Saved hero-folded-denim.png');
}

await saveFoldedDenim();
console.log('Extraction done!');
