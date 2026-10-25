// One-time editorial helper. Visitors and deployment builds never call this service.
// Only public site text is sent; translations are committed and editable in Pages CMS.
import fs from 'node:fs/promises';
import { normalize } from './lib/localization.mjs';
import { protectTerms } from './lib/translation-terms.mjs';
const names = (await fs.readdir('src/translations')).filter((name) => name.endsWith('.json'));
const documents = await Promise.all(
  names.map(async (name) => ({
    name,
    doc: JSON.parse(await fs.readFile(`src/translations/${name}`, 'utf8')),
  })),
);
let translated = 0;
async function translate(text, language, sourceLanguage = 'auto') {
  const protectedText = protectTerms(text);
  const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
  for (const [key, value] of Object.entries({
    client: 'gtx',
    sl: sourceLanguage,
    tl: language,
    dt: 't',
    q: protectedText.text,
  }))
    endpoint.searchParams.set(key, value);
  for (let attempt = 0; attempt < 12; attempt++) {
    try {
      const response = await fetch(endpoint, { signal: AbortSignal.timeout(45000) });
      if (response.status === 429) {
        const seconds = Math.max(60, Number(response.headers.get('retry-after')) || 60);
        console.log(
          `Translation service rate limit. Waiting ${seconds}s before resuming the saved catalog.`,
        );
        await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
        continue;
      }
      if (!response.ok) throw new Error(`Translation HTTP ${response.status}`);
      const data = await response.json();
      const result = data[0].map((part) => part[0] || '').join('');
      if (!result.trim()) throw new Error('Empty translation');
      await new Promise((resolve) => setTimeout(resolve, 1800));
      return protectedText.restore(result)
        .replaceAll('\u00b7', '-')
        .replace(/SATURDAYS[_\s]BRAND/gi, 'Saturdays.AI')
        .replace(/(?:Sábados|Sabados)\.?\s*AI/gi, 'Saturdays.AI');
    } catch (error) {
      if (attempt === 11) throw error;
      await new Promise((resolve) => setTimeout(resolve, Math.min(60000, 1500 * 2 ** attempt)));
    }
  }
  throw new Error(
    'Translation service is still rate limited. The completed translations are saved; rerun later.',
  );
}
async function translateBatch(segments, language) {
  const payload = segments
    .map((segment, index) => `ZXQ${String(index).padStart(4, '0')}\n${segment.source}`)
    .join('\n\n');
  const result = await translate(payload, language);
  const matches = [...result.matchAll(/ZXQ\s*(\d{4})\s*/g)];
  if (matches.length === segments.length && matches.every((match, index) => +match[1] === index)) {
    matches.forEach((match, index) => {
      segments[index][language] = normalize(
        result.slice(match.index + match[0].length, matches[index + 1]?.index),
      ).replace(/\u00b7/g, '-');
    });
  } else {
    for (const segment of segments)
      segment[language] = normalize(await translate(segment.source, language));
  }
  if (segments.some((segment) => !segment[language]))
    throw new Error('Incomplete translation batch');
  translated += segments.length;
}
let cursor = 0;
async function worker() {
  while (cursor < documents.length) {
    const { name, doc } = documents[cursor++];
    for (const language of ['es', 'en']) {
      const pending = doc.segments.filter((segment) => !segment[language]);
      while (pending.length) {
        const batch = [];
        let size = 0;
        while (
          pending.length &&
          (size + pending[0].source.length < 2800 || !batch.length) &&
          batch.length < 35
        ) {
          const segment = pending.shift();
          batch.push(segment);
          size += segment.source.length + 15;
        }
        await translateBatch(batch, language);
        await fs.writeFile(`src/translations/${name}`, JSON.stringify(doc, null, 2) + '\n');
      }
    }
    if (cursor % 10 === 0)
      console.log(JSON.stringify({ documents: cursor, total: documents.length, translated }));
  }
}
await worker();
console.log(JSON.stringify({ complete: true, documents: documents.length, translated }));
