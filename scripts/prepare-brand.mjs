import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Deterministic production derivation only: preserve the approved source bytes.
const source = '_source/DCS-logo-approved-gold.png';
const bytes = await readFile(source);
const { data, info } = await sharp(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const visited = new Uint8Array(width * height);
const queue = new Uint32Array(width * height);
let head = 0,
  tail = 0;
function visit(pixel) {
  if (visited[pixel]) return;
  visited[pixel] = 1;
  const offset = pixel * 4;
  const channels = [data[offset], data[offset + 1], data[offset + 2]];
  if (Math.min(...channels) >= 230 && Math.max(...channels) - Math.min(...channels) <= 12)
    queue[tail++] = pixel;
}
for (let x = 0; x < width; x++) {
  visit(x);
  visit((height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  visit(y * width);
  visit(y * width + width - 1);
}
while (head < tail) {
  const pixel = queue[head++],
    x = pixel % width,
    y = Math.floor(pixel / width);
  data[pixel * 4 + 3] = 0;
  if (x > 0) visit(pixel - 1);
  if (x < width - 1) visit(pixel + 1);
  if (y > 0) visit(pixel - width);
  if (y < height - 1) visit(pixel + width);
}
let left = width,
  top = height,
  right = 0,
  bottom = 0;
for (let y = 0; y < height; y++)
  for (let x = 0; x < width; x++)
    if (data[(y * width + x) * 4 + 3]) {
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
const crop = { left, top, width: right - left + 1, height: bottom - top + 1 };
const artwork = await sharp(data, { raw: { width, height, channels: 4 } })
  .extract(crop)
  .png()
  .toBuffer();
await mkdir('public/brand', { recursive: true });
const emblem = await sharp(artwork)
  .resize({ width: 256, withoutEnlargement: true })
  .webp({ lossless: true })
  .toBuffer();
await writeFile('public/brand/dcs-emblem.webp', emblem);
for (const [name, size] of [
  ['favicon', 32],
  ['apple-touch-icon', 180],
])
  await sharp(artwork)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`public/brand/${name}.png`);
const metadata = await sharp(emblem).metadata();
await mkdir('.inspection', { recursive: true });
await writeFile(
  '.inspection/approved-logo-derivation.json',
  JSON.stringify(
    {
      source,
      sha256: createHash('sha256').update(bytes).digest('hex'),
      sourceSize: { width, height },
      crop,
      emblem: { width: metadata.width, height: metadata.height, bytes: emblem.length },
      method:
        'Remove only edge-connected near-white background; preserve enclosed white artwork. Crop and downsample without enlargement.',
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({ crop, width: metadata.width, height: metadata.height, bytes: emblem.length }),
);
