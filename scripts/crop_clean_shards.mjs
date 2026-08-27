import sharp from 'sharp';

const refImg = sharp('public/images/hero/refrence.png');
const { data, info } = await refImg.raw().toBuffer({ resolveWithObject: true });

function extractTransparent(left, top, width, height, threshold = 22) {
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
      } else if (dist < threshold + 12) {
        out[dstIdx] = r;
        out[dstIdx + 1] = g;
        out[dstIdx + 2] = b;
        out[dstIdx + 3] = Math.round(a * ((dist - threshold) / 12));
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

async function saveCleanShard(name, left, top, width, height) {
  const buf = extractTransparent(left, top, width, height, 20);
  await sharp(buf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(`public/images/hero/${name}.png`);
  console.log(`Saved ${name}.png (${width}x${height})`);
}

await saveCleanShard('hero-shard-1', 135, 340, 80, 85);  // Top Left Block
await saveCleanShard('hero-shard-2', 170, 440, 55, 55);  // Mid Left Pyramid
await saveCleanShard('hero-shard-3', 60, 550, 45, 45);   // Far Left Small
await saveCleanShard('hero-shard-4', 60, 730, 75, 75);   // Lower Left Cube
await saveCleanShard('hero-shard-5', 380, 710, 75, 75);  // Center Bottom Rock
await saveCleanShard('hero-shard-6', 860, 550, 65, 65);  // Right Side Pyramid

console.log('Clean shards extracted successfully!');
