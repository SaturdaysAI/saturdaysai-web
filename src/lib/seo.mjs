import taxonomies from '../data/taxonomies.json' with { type: 'json' };
const thinArchives = new Set(
  taxonomies
    .filter((item) => item.type === 'tag' && item.postIds.length < 2)
    .map((item) => item.path),
);

export function indexablePath(pathname, base = '/') {
  const prefix = base.replace(/\/$/, '');
  const localPath =
    prefix && pathname.startsWith(prefix + '/') ? pathname.slice(prefix.length) : pathname;
  const path = localPath.replace(/^\/en(?=\/)/, '');
  return (
    !['/admin/', '/404/', '/404.html', '/privacy-policy/', '/terms/', '/starchat/'].includes(
      path,
    ) &&
    !/^\/(?:20\d{2}\/(?:\d{2}\/)?$|category\/(?:20\d{2}|sin-categoria)\/)/.test(path) &&
    !thinArchives.has(path)
  );
}
export const structuredJSON = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
