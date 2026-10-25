import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import { htmlFiles, readCatalog, key, visitStrings } from './lib/localization.mjs';
import { languagePath } from '../src/lib/preferences.mjs';
import { indexablePath } from '../src/lib/seo.mjs';
import overrides from '../src/i18n/overrides.json' with { type: 'json' };

const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const origin = (process.env.SITE_URL || 'https://saturdays.ai').replace(/\/$/, '');
const catalog = await readCatalog();
const files = await htmlFiles('dist');
const routeFor = (file) =>
  '/' +
  path
    .relative('dist', file)
    .replaceAll('\\', '/')
    .replace(/^en\//, '')
    .replace(/index\.html$/, '')
    .replace(/^404\.html$/, '404/');
const routes = new Set(files.map(routeFor));
const missing = new Set();
const translate = (source, language) => {
  if (
    source.endsWith(' | Saturdays.AI') &&
    overrides[source.replace(/ \| Saturdays\.AI$/, '')]?.[language]
  )
    return overrides[source.replace(/ \| Saturdays\.AI$/, '')][language] + ' | Saturdays.AI';
  const result = overrides[source]?.[language] ?? catalog.get(key(source))?.[language];
  if (result == null || (result === '' && !Object.hasOwn(overrides[source] || {}, language)))
    missing.add(source);
  return result ?? source;
};
const localizedURL = (value, language) => {
  try {
    if (!value || value.startsWith('#')) return value;
    const parsed = new URL(value, origin);
    if (parsed.origin !== origin || (base && !parsed.pathname.startsWith(base + '/'))) return value;
    const originalPath = parsed.pathname.slice(base.length).replace(/^\/en(?=\/)/, '');
    if (!routes.has(originalPath) && originalPath !== '/feed.xml') return value;
    parsed.pathname = languagePath(parsed.pathname, language, base);
    return /^https?:/.test(value) ? parsed.href : parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return value;
  }
};
const report = [];
const social = JSON.parse(await fs.readFile('public/social/manifest.json', 'utf8'));
for (const file of files) {
  const original = await fs.readFile(file, 'utf8');
  if (load(original)('html').attr('data-localized'))
    throw new Error('Run a fresh Astro build before localization.');
  const route = routeFor(file);
  for (const language of ['es', 'en']) {
    const $ = load(original, { scriptingEnabled: false });
    visitStrings($, (source, replace) => replace(translate(source, language)));
    if (language === 'es') $('[data-hero-pronoun]').remove();
    if (language === 'es')
      $('[data-community-heading]').html(
        '¿Lo mejor de la IA?<br>Las <span class="orange-word">personas</span>.',
      );
    $('html').attr({ lang: language, 'data-localized': 'true', 'data-base': base });
    $('[lang]').not('[translate="no"], [translate="no"] *').attr('lang', language);
    $('[data-reading-minutes]').each((_, el) => {
      const minutes = Number($(el).attr('data-reading-minutes'));
      $(el).text(language === 'es' ? `${minutes} min de lectura` : `${minutes} min read`);
    });
    $('time[datetime]').each((_, el) => {
      const date = new Date($(el).attr('datetime'));
      if (Number.isFinite(+date))
        $(el).text(
          new Intl.DateTimeFormat(language, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          }).format(date),
        );
    });
    $('[href],[data-href],[data-path],[action]').each((_, el) => {
      for (const attr of ['href', 'data-href', 'data-path', 'action'])
        if ($(el).attr(attr)) $(el).attr(attr, localizedURL($(el).attr(attr), language));
    });
    const canonical = origin + base + (language === 'en' ? '/en' : '') + route;
    $('link[rel="canonical"]').attr('href', canonical);
    $('meta[property="og:url"]').attr('content', canonical);
    $('meta[property="og:locale"]').attr('content', language === 'es' ? 'es_ES' : 'en_US');
    const heading = $('h1').first().clone();
    heading.find('br').replaceWith(' ');
    const headingText = heading.text().replace(/\s+/g, ' ').trim();
    const socialDescription = `Saturdays.AI: ${headingText} ${language === 'es' ? 'Aprende IA y crea proyectos con impacto social.' : 'Learn AI and build projects with social impact.'}`;
    $('meta[property="og:image:alt"],meta[name="twitter:image:alt"]').attr(
      'content',
      socialDescription,
    );
    $('head').append(
      `<meta property="og:locale:alternate" content="${language === 'es' ? 'en_US' : 'es_ES'}">`,
    );
    for (const lang of ['es', 'en', 'x-default'])
      $('head').append(
        `<link rel="alternate" hreflang="${lang}" href="${origin + base + (lang === 'en' ? '/en' : '') + route}">`,
      );
    $('[data-current-language]').text(language.toUpperCase());
    $('.brand').attr(
      'aria-label',
      language === 'es' ? 'Saturdays.AI, inicio' : 'Saturdays.AI home',
    );
    $('[data-language]').each((_, el) => {
      const lang = $(el).attr('data-language');
      $(el).attr('href', base + (lang === 'en' ? '/en' : '') + route + '?lang=' + lang);
      if (lang === language) $(el).attr('aria-current', 'true');
    });
    $('.language-picker summary').attr(
      'aria-label',
      language === 'es' ? 'Seleccionar idioma' : 'Select language',
    );
    $('.menu-toggle').attr(
      'aria-label',
      language === 'es' ? 'Abrir navegación' : 'Open navigation',
    );
    $('[data-search]').each((_, el) =>
      $(el).attr('data-search', $(el).attr('data-search') + ' ' + $(el).text()),
    );
    $('script[type="application/ld+json"]').each((_, el) => {
      const value = JSON.parse($(el).text());
      const walk = (object) => {
        if (!object || typeof object !== 'object') return;
        for (const [field, value] of Object.entries(object)) {
          if (field === 'inLanguage') object[field] = language;
          else if (typeof value === 'string' && ['@id', 'url', 'item'].includes(field))
            object[field] = localizedURL(value, language);
          else if (typeof value === 'object') walk(value);
        }
      };
      walk(value);
      $(el).text(JSON.stringify(value).replace(/</g, '\\u003c'));
    });
    // Label the translated archive accurately; audio/video recordings remain in their original language.
    const reviewedInformationPages = new Set([
      '/about/', '/terms/', '/privacy-policy/', '/privacy-policy-2/', '/contact/', '/contacto/', '/seguridad-ia/',
    ]);
    if ($('.reading-body .prose,.city-history .prose').length && !reviewedInformationPages.has(route)) {
      const notice = $('<p class="translation-notice"></p>').text(
        language === 'en'
          ? 'This archive includes automatic translations. Audio, video and text inside images remain in their original language.'
          : 'Este archivo incluye traducciones automáticas. El audio, el vídeo y el texto de las imágenes conservan su idioma original.',
      );
      $('.reading-body .prose,.city-history .prose').first().before(notice);
    }
    const image = language === 'en' ? social.english?.[route] || social.english?.default : null;
    if (image)
      $(
        'meta[property="og:image"],meta[property="og:image:secure_url"],meta[name="twitter:image"]',
      ).attr('content', origin + base + image);
    $('a[href^="https://wa.me/"]').attr(
      'href',
      'https://wa.me/?text=' + encodeURIComponent(`${headingText} | Saturdays.AI\n${canonical}`),
    );
    const relativeFile = path.relative('dist', file).replace(/^en[\\/]/, '');
    const target = path.join(language === 'es' ? 'dist' : 'dist/en', relativeFile);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, $.html());
    report.push({ route: (language === 'en' ? '/en' : '') + route, language });
  }
}
// GitHub Pages serves 404.html for unknown routes; language links have real destinations too.
for (const locale of ['', 'en/']) {
  await fs.mkdir(`dist/${locale}404`, { recursive: true });
  await fs.copyFile(`dist/${locale}404.html`, `dist/${locale}404/index.html`);
}
// Both RSS feeds and sitemap entries point to the matching static language version.
const feedSource = await fs.readFile('dist/feed.xml', 'utf8');
for (const language of ['es', 'en']) {
  const $ = load(feedSource, { xmlMode: true });
  $('title,description').each((_, el) => $(el).text(translate($(el).text(), language)));
  $('link,guid').each((_, el) => $(el).text(localizedURL($(el).text(), language)));
  $('channel').append(`<language>${language}</language>`);
  await fs.mkdir(language === 'en' ? 'dist/en' : 'dist', { recursive: true });
  await fs.writeFile(language === 'en' ? 'dist/en/feed.xml' : 'dist/feed.xml', $.xml());
}
const sitemap = load(await fs.readFile('dist/sitemap-0.xml', 'utf8'), { xmlMode: true });
sitemap('urlset').attr('xmlns:xhtml', 'http://www.w3.org/1999/xhtml');
sitemap('url')
  .toArray()
  .forEach((el) => {
    const originalURL = localizedURL(sitemap(el).find('loc').text(), 'es');
    sitemap(el).find('loc').text(originalURL);
    const englishURL = localizedURL(originalURL, 'en');
    if (!indexablePath(new URL(originalURL).pathname, base)) return;
    const alternate = `<xhtml:link rel="alternate" hreflang="es" href="${originalURL}"/><xhtml:link rel="alternate" hreflang="en" href="${englishURL}"/>`;
    sitemap(el).append(alternate);
    const copy = sitemap(el).clone();
    copy.find('loc').text(englishURL);
    sitemap('urlset').append(copy);
  });
await fs.writeFile('dist/sitemap-0.xml', sitemap.xml());
await fs.mkdir('artifacts/bilingual-theme', { recursive: true });
await fs.writeFile(
  'artifacts/bilingual-theme/coverage.json',
  JSON.stringify(
    { pages: report.length, segments: catalog.size, missing: [...missing], routes: report },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    localizedPages: report.length,
    catalogSegments: catalog.size,
    missing: missing.size,
  }),
);
if (missing.size)
  throw new Error(
    `Missing ${missing.size} translations. Run npm run translations:collect, then npm run translations:translate. See artifacts/bilingual-theme/coverage.json.`,
  );
