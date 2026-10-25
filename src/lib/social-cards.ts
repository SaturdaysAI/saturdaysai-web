import fs from 'node:fs';
const cards: Record<string, string> = JSON.parse(
  fs.readFileSync('public/social/manifest.json', 'utf8'),
);
export function socialCard(pathname: string, base: string) {
  const prefix = base.replace(/\/$/, '');
  const route =
    prefix && pathname.startsWith(prefix + '/') ? pathname.slice(prefix.length) : pathname;
  return cards[route] || cards.default;
}
