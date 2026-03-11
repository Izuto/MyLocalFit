const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(__dirname, '..', 'assets', 'icons');
const svgFile = path.join(iconsDir, 'heart.svg');
const outputs = [
  { name: 'icon-192-192.png', size: 192 },
  { name: 'icon-512-512.png', size: 512 }
];

async function run() {
  if (!fs.existsSync(svgFile)) {
    console.error('SVG source not found:', svgFile);
    process.exit(1);
  }
  const svgBuffer = fs.readFileSync(svgFile);
  for (const o of outputs) {
    const outPath = path.join(iconsDir, o.name);
    console.log(`Rendering ${o.name} at ${o.size}x${o.size}`);
    await sharp(svgBuffer)
      .resize(o.size, o.size, { fit: 'contain' })
      .png({ quality: 90 })
      .toFile(outPath);
  }
  console.log('Icon export completed.');
}

run().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});
