export const normalizeSearch = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
export function matchesSearch(value, query) {
  const text = normalizeSearch(value);
  return normalizeSearch(query)
    .split(/\s+/)
    .every((word) => text.includes(word));
}
export function readFilterState(
  query,
  categories = [],
  years = [],
  pageSize = 12,
  total = pageSize,
) {
  const params = new URLSearchParams(query);
  const requested = Number(params.get('shown'));
  const category = params.get('topic') || 'all';
  const year = params.get('year') || '';
  return {
    query: params.get('q') || '',
    category: categories.includes(category) ? category : 'all',
    year: years.includes(year) ? year : '',
    limit:
      Number.isSafeInteger(requested) && requested > pageSize
        ? Math.min(requested, Math.max(pageSize, total))
        : pageSize,
  };
}
export function writeFilterState(query, state, pageSize = 12) {
  const params = new URLSearchParams(query);
  for (const [key, value] of Object.entries({
    q: state.query.trim(),
    topic: state.category === 'all' ? '' : state.category,
    year: state.year,
    shown: state.limit > pageSize ? String(state.limit) : '',
  })) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  return params.toString();
}
