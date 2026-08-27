import sharp from 'sharp';

const { data, info } = await sharp('public/images/hero/refrence.png').raw().toBuffer({ resolveWithObject: true });

function getPixel(x, y) {
  const idx = (y * info.width + x) * info.channels;
  return [data[idx], data[idx+1], data[idx+2], data[idx+3]];
}

console.log('Image dimensions:', info.width, 'x', info.height);

for (let y = 0; y < 80; y += 5) {
  console.log(`y=${y}:`, getPixel(100, y));
}
