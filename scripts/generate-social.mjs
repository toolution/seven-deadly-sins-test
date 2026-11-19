import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
const svg=await readFile(new URL('../work/art/social.svg',import.meta.url));
await sharp(svg).png().toFile(new URL('../public/social.png',import.meta.url).pathname);
console.log('Rendered public/social.png from authored SVG (1200×630).');
