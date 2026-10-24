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
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
export function assertSafeLink(value) {
  if (typeof value !== 'string' || /[\u0000-\u001f\\]/.test(value)) throw new Error('Invalid link');
  if (value.startsWith('/')) {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith('//') || /[\u0000-\u001f\\]/.test(decoded) || decoded.includes('..'))
      throw new Error(`Invalid local link: ${value}`);
    return;
  }
  const parsed = new URL(value);
  if (
    !['https:', 'mailto:', 'tel:'].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password
  )
    throw new Error(`Unsupported link destination: ${value}`);
  if (parsed.protocol === 'https:' && !parsed.hostname) throw new Error('Missing link hostname');
  if (['mailto:', 'tel:'].includes(parsed.protocol) && !parsed.pathname)
    throw new Error('Missing contact destination');
}
export function assertPublishedBodies(entries, now = new Date()) {
  for (const entry of entries) {
    if (isPublished(entry.data, now) && !entry.body?.trim())
      throw new Error(
        `Published article needs content: ${entry.data.legacyPath}. Keep Draft enabled while writing.`,
      );
  }
}
