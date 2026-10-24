import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('public/brand', { recursive: true });
for (const [source, target] of [
  ['logo-horizontal.png', 'logo-orange.webp'],
  ['logo-white.png', 'logo-white.webp'],
]) {
  await sharp(`artifacts/brand/${source}`)
    .trim()
    .resize({ width: 800 })
    .webp({ lossless: true })
    .toFile(`public/brand/${target}`);
}
// Original supplied vector symbol; retain artwork and remove the sticker print cut-contour layer.
const svg = await readFile('artifacts/brand/icon.svg', 'utf8');
const icon = svg.replace(/<g[^>]*id="CutContour"[\s\S]*$/, '</svg>');
await writeFile('public/favicon.svg', icon);
await writeFile('public/brand/network.svg', icon);
let css = await readFile('src/styles/global.css', 'utf8');
const replacements = {
  '#f6f4ee': '#ffffff',
  '#232620': '#151e3f',
  '#65675e': '#536078',
  '#deded4': '#dce2ed',
  '#c74423': '#ff9d5a',
  '#ef683d': '#ff9d5a',
  '#fae2d5': '#fff0e5',
  '#e9e4f7': '#eaf1f8',
  '#e8edda': '#eff5fb',
  '#dfe9ed': '#e4f0f7',
  "'Space Grotesk Variable'": "'Montserrat Variable'",
  "'DM Sans Variable'": "'Montserrat Variable'",
  '#8654bd': '#0b6099',
  '#eae8df': '#f0f4f9',
  '#55584d': '#536078',
  '#bdbfb0': '#c6d2e2',
  'rgb(246 244 238 / 94%)': 'rgb(255 255 255 / 96%)',
  '#3c4136': '#0b6099',
  '#ba3a1c': '#ffb785',
  '#bfc2b3': '#c6d2e2',
  '#d9d5bf': '#e4f0f7',
  '#eae8dc': '#151e3f',
  '#ed603b': '#ff9d5a',
  '#b9b5ac': '#0b6099',
  '#f6bca4': '#ff9d5a',
  '#bdc7aa': '#151e3f',
  '#e8b79e': '#ff9d5a',
  '#c3b9df': '#0b6099',
};
for (const [a, b] of Object.entries(replacements)) css = css.replaceAll(a, b);
await writeFile('src/styles/global.css', css);
let layout = await readFile('src/layouts/Layout.astro', 'utf8');
layout = layout
  .replace(
    "import '@fontsource-variable/dm-sans';\nimport '@fontsource-variable/space-grotesk';",
    "import '@fontsource-variable/montserrat';",
  )
  .replace(
    "import '../styles/global.css';",
    "import '../styles/global.css';\nimport '../styles/brand.css';",
  )
  .replace('content="#f5f3ed"', 'content="#151E3F"');
for (const p of ['about', 'partners', 'create-your-own-ai-saturdays', 'privacy-policy', 'terms'])
  layout = layout.replaceAll(`href="https://saturdays.ai/${p}/"`, `href={url('/${p}/')}`);
layout = layout
  .replace('About Saturdays.AI ↗', 'About Saturdays.AI')
  .replace('Our partners ↗', 'Our partners')
  .replace('Become a community leader ↗', 'Become a community leader');
layout = layout.replace(
  "<a href={url('/blog-y-noticias/')}>Read our stories</a>",
  "<a href={url('/blog-y-noticias/')}>Read our stories</a>\n          <a href={url('/podcast/')}>Listen to the podcast</a>\n          <a href={url('/explore/')}>Explore all resources</a>",
);
await writeFile('src/layouts/Layout.astro', layout);
await writeFile(
  'src/components/Brand.astro',
  `---\nimport { url } from '../lib/content';\n---\n<a class="brand" href={url('/')} aria-label="Saturdays.AI home"><img class="brand-logo" src={url('/brand/logo-orange.webp')} alt="Saturdays.AI" width="800" height="310" fetchpriority="high" /></a>\n`,
);
let art = await readFile('src/components/CommunityArt.astro', 'utf8');
art = art
  .replace(
    '<Icon name="spark" size={42} />',
    '<img src={url(\'/brand/network.svg\')} width="52" height="52" alt="" />',
  )
  .replace('GOOD PEOPLE.', 'AI4ALL.')
  .replace('GOOD AI.', 'AI4GOOD.')
  .replaceAll('#ed603b', '#ff9d5a')
  .replaceAll('#b9b5ac', '#0b6099');
await writeFile('src/components/CommunityArt.astro', art);
let home = await readFile('src/pages/index.astro', 'utf8');
home = home.replace('AI FOR EVERYONE. GOOD FOR EVERYONE.', 'AI4ALL IS AI4GOOD');
await writeFile('src/pages/index.astro', home);
console.log('Original brand assets exported; brand palette and Montserrat applied.');
