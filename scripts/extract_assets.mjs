import sharp from 'sharp';
import fs from 'fs';

const refImg = sharp('public/images/hero/refrence.png');
const { data, info } = await refImg.raw().toBuffer({ resolveWithObject: true });

function removeBg(buf, width, height, bgR = 242, bgG = 237, bgB = 231, threshold = 22) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = buf[i * 4];
    const g = buf[i * 4 + 1];
    const b = buf[i * 4 + 2];
    const a = buf[i * 4 + 3];

    const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
    if (dist < threshold) {
      out[i * 4] = r;
      out[i * 4 + 1] = g;
      out[i * 4 + 2] = b;
      out[i * 4 + 3] = 0; // transparent
    } else if (dist < threshold + 12) {
      const alphaFactor = (dist - threshold) / 12;
      out[i * 4] = r;
      out[i * 4 + 1] = g;
      out[i * 4 + 2] = b;
      out[i * 4 + 3] = Math.round(a * alphaFactor);
    } else {
      out[i * 4] = r;
      out[i * 4 + 1] = g;
      out[i * 4 + 2] = b;
      out[i * 4 + 3] = a;
    }
  }
  return out;
}

// 1. Extract Shard 1 (Top Left)
async function extractCrop(name, left, top, width, height) {
  const cropBuf = await sharp('public/images/hero/refrence.png')
    .extract({ left, top, width, height })
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const transparent = removeBg(cropBuf.data, width, height);
  await sharp(transparent, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(`public/images/hero/${name}.png`);
  console.log(`Extracted ${name}.png (${width}x${height})`);
}

await extractCrop('hero-shard-top-left', 120, 310, 110, 100);
await extractCrop('hero-shard-mid-left', 50, 480, 80, 80);
await extractCrop('hero-shard-center-top', 640, 220, 140, 130);
await extractCrop('hero-shard-mid-right', 820, 520, 90, 90);
await extractCrop('hero-shard-bottom-right', 840, 710, 80, 80);

console.log('All shards extracted successfully!');
