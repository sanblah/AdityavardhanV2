import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import process from 'process';

const PUBLIC = join(process.cwd(), 'public/images');
const MAX_WIDTH = 2560;
const QUALITY = 90;

// Skip hero — it's already a small optimized poster
const SKIP_DIRS = ['hero', 'logo'];

async function findJpegs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) {
        files.push(...await findJpegs(full));
      }
    } else if (['.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function compressImage(filePath) {
  const before = (await stat(filePath)).size;
  const img = sharp(filePath);
  const meta = await img.metadata();

  const resizeOpts = meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : {};

  const buf = await img
    .rotate() // auto-orient from EXIF
    .resize(resizeOpts)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  // Only overwrite if we actually made it smaller
  if (buf.length < before) {
    await sharp(buf).toFile(filePath);
    const saved = ((before - buf.length) / 1024 / 1024).toFixed(1);
    const pct = Math.round((1 - buf.length / before) * 100);
    console.log(`✓ ${filePath.replace(PUBLIC + '/', '')} — ${(before/1024/1024).toFixed(1)}MB → ${(buf.length/1024/1024).toFixed(1)}MB (-${pct}%)`);
  } else {
    console.log(`= ${filePath.replace(PUBLIC + '/', '')} — already optimal`);
  }
}

const files = await findJpegs(PUBLIC);
console.log(`Compressing ${files.length} images (max ${MAX_WIDTH}px, q${QUALITY})...\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const f of files) {
  const before = (await stat(f)).size;
  await compressImage(f);
  const after = (await stat(f)).size;
  totalBefore += before;
  totalAfter += after;
}

console.log(`\nDone. ${(totalBefore/1024/1024).toFixed(0)}MB → ${(totalAfter/1024/1024).toFixed(0)}MB (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(0)}MB)`);
