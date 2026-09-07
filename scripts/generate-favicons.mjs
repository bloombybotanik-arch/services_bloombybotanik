import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

async function generateFavicons() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const sourceImgBase64 = fs.readFileSync('src/assets/images/logo_sidebar_1784886108085.png').toString('base64');
  const sourceImgDataUrl = `data:image/png;base64,${sourceImgBase64}`;

  async function renderPng(size) {
    const dataUrl = await page.evaluate(async (src, s) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = s;
          canvas.height = s;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, s, s);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = src;
      });
    }, sourceImgDataUrl, size);

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }

  const png16 = await renderPng(16);
  const png32 = await renderPng(32);
  const png48 = await renderPng(48);
  const png192 = await renderPng(192);
  const png512 = await renderPng(512);

  await browser.close();

  // Ensure directories exist
  fs.mkdirSync('public', { recursive: true });
  fs.mkdirSync('public/brand', { recursive: true });

  fs.writeFileSync('public/favicon-48x48.png', png48);
  fs.writeFileSync('public/favicon-192x192.png', png192);
  fs.writeFileSync('public/favicon.png', png48);
  fs.writeFileSync('public/apple-touch-icon.png', png192);
  fs.writeFileSync('public/logo.png', png512);
  fs.writeFileSync('public/logo_green.png', png512);
  fs.writeFileSync('public/brand/icon_192.png', png192);
  fs.writeFileSync('public/brand/icon_512.png', png512);

  // Build standard multi-resolution ICO file containing 16x16, 32x32, and 48x48 PNGs
  function createIco(pngBuffers) {
    const headerSize = 6;
    const dirEntrySize = 16;
    const numImages = pngBuffers.length;
    let offset = headerSize + dirEntrySize * numImages;

    const header = Buffer.alloc(headerSize);
    header.writeUInt16LE(0, 0); // Reserved
    header.writeUInt16LE(1, 2); // Type: 1 = ICO
    header.writeUInt16LE(numImages, 4);

    const dirEntries = [];
    for (const item of pngBuffers) {
      const entry = Buffer.alloc(dirEntrySize);
      entry.writeUInt8(item.size === 256 ? 0 : item.size, 0); // Width
      entry.writeUInt8(item.size === 256 ? 0 : item.size, 1); // Height
      entry.writeUInt8(0, 2); // Color palette
      entry.writeUInt8(0, 3); // Reserved
      entry.writeUInt16LE(1, 4); // Color planes
      entry.writeUInt16LE(32, 6); // Bits per pixel
      entry.writeUInt32LE(item.buffer.length, 8); // Image size in bytes
      entry.writeUInt32LE(offset, 12); // Offset
      dirEntries.push(entry);
      offset += item.buffer.length;
    }

    return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
  }

  const icoBuffer = createIco([
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 }
  ]);

  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('Favicons and logos generated successfully!');
}

generateFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
