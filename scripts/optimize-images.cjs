const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  console.log('Running:', cmd);
  execSync(cmd, { stdio: 'inherit' });
}

console.log('Starting image optimization...');

// 1. Editorial Images from backup
const editorialImages = [
  { name: 'hero', src: '/tmp/img_backup/editorial/hero.jpg', isHero: true },
  { name: 'edition', src: '/tmp/img_backup/editorial/edition.jpg' },
  { name: 'silk', src: '/tmp/img_backup/editorial/silk.jpg' },
  { name: 'craft', src: '/tmp/img_backup/editorial/craft.jpg' },
];

for (const img of editorialImages) {
  const baseName = img.name;
  const src = img.src;
  const outDir = 'public/editorial';

  if (img.isHero) {
    // Hero: 750w (mobile), 1100w (tablet), 1376w (desktop full)
    run(`convert "${src}" -quality 84 -define webp:method=6 "${outDir}/${baseName}.webp"`);
    run(`convert "${src}" -resize 1100x -quality 82 -define webp:method=6 "${outDir}/${baseName}-1100.webp"`);
    run(`convert "${src}" -resize 750x -quality 80 -define webp:method=6 "${outDir}/${baseName}-750.webp"`);
    // Fallback JPEGs (progressive)
    run(`convert "${src}" -resize 750x -strip -interlace Plane -quality 80 "${outDir}/${baseName}-750.jpg"`);
    run(`convert "${src}" -strip -interlace Plane -quality 82 "${outDir}/${baseName}.jpg"`);
  } else if (baseName === 'craft') {
    // 1376x768
    run(`convert "${src}" -quality 84 -define webp:method=6 "${outDir}/${baseName}.webp"`);
    run(`convert "${src}" -resize 1000x -quality 82 -define webp:method=6 "${outDir}/${baseName}-1000.webp"`);
    run(`convert "${src}" -resize 600x -quality 80 -define webp:method=6 "${outDir}/${baseName}-600.webp"`);
    run(`convert "${src}" -resize 600x -strip -interlace Plane -quality 80 "${outDir}/${baseName}-600.jpg"`);
    run(`convert "${src}" -strip -interlace Plane -quality 82 "${outDir}/${baseName}.jpg"`);
  } else {
    // 896x1200
    run(`convert "${src}" -quality 84 -define webp:method=6 "${outDir}/${baseName}.webp"`);
    run(`convert "${src}" -resize 600x -quality 82 -define webp:method=6 "${outDir}/${baseName}-600.webp"`);
    run(`convert "${src}" -resize 400x -quality 80 -define webp:method=6 "${outDir}/${baseName}-400.webp"`);
    run(`convert "${src}" -resize 600x -strip -interlace Plane -quality 80 "${outDir}/${baseName}-600.jpg"`);
    run(`convert "${src}" -strip -interlace Plane -quality 82 "${outDir}/${baseName}.jpg"`);
  }
}

// 2. Product Images (front, side, back, detail) from backup
const productImages = ['front', 'side', 'back', 'detail'];
const prodDir = 'public/products/sapphire-bag';

for (const name of productImages) {
  const src = `/tmp/img_backup/products/${name}.jpg`;
  
  // Full WebP (896px)
  run(`convert "${src}" -quality 85 -define webp:method=6 "${prodDir}/${name}.webp"`);
  // Medium WebP (600px)
  run(`convert "${src}" -resize 600x -quality 82 -define webp:method=6 "${prodDir}/${name}-600.webp"`);
  // Small / Mobile WebP (400px)
  run(`convert "${src}" -resize 400x -quality 80 -define webp:method=6 "${prodDir}/${name}-400.webp"`);
  // Ultra-fast Thumbnail (200px) - under 4KB
  run(`convert "${src}" -resize 200x -quality 78 -define webp:method=6 "${prodDir}/${name}-thumb.webp"`);
  run(`convert "${src}" -resize 200x -strip -interlace Plane -quality 75 "${prodDir}/${name}-thumb.jpg"`);
  // Progressive Fallback JPEG
  run(`convert "${src}" -strip -interlace Plane -quality 82 "${prodDir}/${name}.jpg"`);
}

console.log('All images converted successfully!');
