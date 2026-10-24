import { isPublished } from './content-rules.mjs';
import { normalizeSearch } from './filter-state.mjs';
const generic = new Set([
  'ai',
  'ia',
  'inteligencia artificial',
  'artificial intelligence',
  'podcast',
  'saturdays.ai',
  'machine learning',
]);
const topics = (post) =>
  new Set((post.data.tags || []).map(normalizeSearch).filter((tag) => !generic.has(tag)));
export function relatedPosts(current, entries, limit = 3, now = new Date()) {
  const currentTopics = topics(current);
  return entries
    .filter(
      (post) =>
        post.id !== current.id &&
        isPublished(post.data, now) &&
        (current.data.category !== 'Podcast' || post.data.category === 'Podcast'),
    )
    .map((post) => ({
      post,
      score:
        [...topics(post)].filter((tag) => currentTopics.has(tag)).length * 5 +
        (post.data.category === current.data.category ? 3 : 0) +
        (post.data.language === current.data.language ? 2 : 0) +
        (post.data.kind === current.data.kind ? 1 : 0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.data.pubDate).getTime() - new Date(a.post.data.pubDate).getTime() ||
        a.post.id.localeCompare(b.post.id),
    )
    .slice(0, limit)
    .map((item) => item.post);
}
