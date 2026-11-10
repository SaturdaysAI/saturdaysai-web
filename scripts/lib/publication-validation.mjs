import { isPublished, assertPublishedBodies } from '../../src/lib/content-rules.mjs';
import { contentImageSources } from './content-images.mjs';

export function includedInBuild(entry, now = new Date()) {
  return entry.collection === 'posts' ? isPublished(entry.data, now) : entry.data.draft === false;
}

export async function inspectPublication(entries, mediaExists, now = new Date()) {
  const errors = [],
    warnings = [],
    excluded = [];
  let published = 0;
  for (const entry of entries) {
    if (entry.data.updatedDate && new Date(entry.data.updatedDate) < new Date(entry.data.pubDate))
      warnings.push({
        file: entry.file,
        message:
          'La fecha de actualización es anterior a la publicación y se omitirá en la web. Puedes vaciar Last meaningful update; este aviso no bloquea la publicación.',
      });
    if (
      entry.collection === 'posts' &&
      entry.data.draft === false &&
      !Number.isFinite(+new Date(entry.data.pubDate))
    ) {
      errors.push({ file: entry.file, message: 'Falta una fecha de publicación válida.' });
      continue;
    }
    if (!includedInBuild(entry, now)) {
      excluded.push({
        file: entry.file,
        reason: entry.data.draft !== false ? 'draft' : 'future-date',
      });
      continue;
    }
    published++;
    try {
      if (entry.collection === 'posts') assertPublishedBodies([entry], now);
      for (const source of contentImageSources(entry.body, entry.data.image)) {
        if (!(await mediaExists(source)))
          errors.push({
            file: entry.file,
            message: `Falta la imagen ${source}. Súbela o corrige su referencia en Pages CMS; revisa también las mayúsculas del nombre.`,
          });
      }
    } catch (error) {
      errors.push({ file: entry.file, message: error.message });
    }
  }
  return { published, excluded, errors, warnings };
}
