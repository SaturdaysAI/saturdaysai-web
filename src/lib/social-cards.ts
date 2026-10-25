import fs from 'node:fs';
const cards: Record<string, string> = JSON.parse(
  fs.readFileSync('public/social/manifest.json', 'utf8'),
);
export function socialCard(pathname: string, base: string) {
  const prefix = base.replace(/\/$/, '');
  const route =
    prefix && pathname.startsWith(prefix + '/') ? pathname.slice(prefix.length) : pathname;
  // The imported WordPress homepage has an archival title; the current home
  // uses the community brand card rather than that legacy page's card.
  return route === '/' ? cards.default : cards[route] || cards.default;
}
