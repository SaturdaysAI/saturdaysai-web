import fs from 'node:fs';
import { url } from './content';
type ImageInfo = {
  width: number;
  height: number;
  bytes: number;
  variants: { src: string; width: number; bytes: number }[];
};
let manifest: Record<string, ImageInfo> = {};
try {
  manifest = JSON.parse(fs.readFileSync('public/media/responsive/manifest.json', 'utf8'));
} catch {}
export function responsiveImage(src: string, fallback = { width: 720, height: 480 }) {
  const info = manifest[src];
  if (!info)
    return { src: url(src), width: fallback.width, height: fallback.height, srcset: undefined };
  const choices = [...info.variants, { src, width: info.width, bytes: info.bytes }].sort(
    (a, b) => a.width - b.width,
  );
  const preferred = choices.find((image) => image.width >= 960) || choices.at(-1)!;
  return {
    src: url(preferred.src),
    width: info.width,
    height: info.height,
    srcset:
      choices.length > 1
        ? choices.map((image) => `${url(image.src)} ${image.width}w`).join(', ')
        : undefined,
  };
}
