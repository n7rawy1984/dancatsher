import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const source = '_source/dancatsher_client_assets_2026_09_11/crops';
const inventory = JSON.parse(await readFile('data/client-image-inventory.json', 'utf8'));
const images = [];
for (const item of inventory) {
  if (item.excluded) continue;
  const input = await readFile(`${source}/${item.source}`);
  const name = item.source.replace(/\/\d+-/, '/').replace(/\.jpg$/, '.webp');
  const src = `/images/client-supplied/${name}`;
  await mkdir(`public/images/client-supplied/${item.group}`, { recursive: true });
  const result = await sharp(input)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(`public${src}`);
  images.push({
    ...item,
    src,
    width: result.width,
    height: result.height,
    bytes: result.size,
    sourceHash: createHash('sha256').update(input).digest('hex'),
  });
}
await writeFile('data/client-images.json', JSON.stringify(images, null, 2) + '\n');
console.log({
  prepared: inventory.length,
  published: images.length,
  bytes: images.reduce((sum, image) => sum + image.bytes, 0),
});
