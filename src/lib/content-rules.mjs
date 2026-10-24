export function isPublished(data, now = new Date()) {
  return data.draft === false && new Date(data.pubDate).getTime() <= now.getTime();
}
export function isSafePath(path) {
  return (
    typeof path === 'string' &&
    /^\/[a-zA-Z0-9\-_/]+\/$/.test(path) &&
    !path.includes('//') &&
    !path.includes('..')
  );
}
export function assertUniquePaths(entries) {
  const seen = new Set();
  const reserved = new Set([
    '/blog-y-noticias/',
    '/online/',
    '/cities/',
    '/proyectos/',
    '/contact/',
    '/about/',
    '/admin/',
    '/explore/',
    '/podcast/',
  ]);
  for (const entry of entries) {
    const path = entry.data?.legacyPath || entry.legacyPath;
    if (!isSafePath(path) || seen.has(path) || reserved.has(path))
      throw new Error(`Invalid, reserved or duplicate article path: ${path}`);
    seen.add(path);
  }
}
export function assertDistinctRoutes(paths) {
  const seen = new Set();
  for (const path of paths) {
    if (!isSafePath(path) || seen.has(path))
      throw new Error(`Invalid or conflicting public route: ${path}`);
    seen.add(path);
  }
}
export function withBase(path, base = '/') {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
