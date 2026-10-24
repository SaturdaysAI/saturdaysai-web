import cities from '../data/cities.json';
import courses from '../data/courses.json';
import { assertSafeLink, assertDistinctRoutes } from './content-rules.mjs';
let validated = false;
export function validateSiteData() {
  if (validated) return;
  const published = cities.cities.filter((city) => !city.draft);
  assertDistinctRoutes(published.map((city) => `/${city.slug}/`));
  for (const city of published) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(city.slug))
      throw new Error(`Invalid city slug: ${city.slug}`);
    if (!city.name?.trim() || !city.country?.trim() || !city.description?.trim())
      throw new Error(`Complete the name, country and description for ${city.slug}.`);
    if (!['Europe', 'Americas'].includes(city.region))
      throw new Error(`Unknown region: ${city.region}`);
    assertSafeLink(city.contact);
  }
  for (const course of courses.courses) {
    if (!course.title?.trim() || !course.description?.trim())
      throw new Error('A learning path needs a title and description.');
    if (!['Starting out', 'Going deeper'].includes(course.level))
      throw new Error(`Unknown course level: ${course.level}`);
    if (!['book', 'code', 'spark', 'globe'].includes(course.icon))
      throw new Error(`Unknown course icon: ${course.icon}`);
    assertSafeLink(course.url);
  }
  validated = true;
}
