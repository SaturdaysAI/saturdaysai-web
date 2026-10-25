import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { load } from 'cheerio';

/** @param {string} body
 * @param {{rewrite?:(value:string)=>string, imageIdentity?:(value:string)=>string, imageInfo?:(src:string)=>Promise<{width:number,height:number,srcset?:string,sizes?:string}|null>, galleries?:boolean, leadImage?:string}} options
 */
export async function renderMarkdown(
  body = '',
  {
    rewrite = (value) => value,
    imageIdentity = (value) => value,
    imageInfo = async () => null,
    galleries = false,
    leadImage = '',
  } = {},
) {
  const safe = sanitizeHtml(await marked.parse(body, { gfm: true }), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'figure',
      'figcaption',
      'h1',
      'details',
      'summary',
    ]),
    allowedAttributes: {
      a: ['href', 'title', 'rel'],
      img: ['src', 'alt'],
      code: ['class'],
      th: ['colspan', 'scope'],
      td: ['colspan'],
    },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    transformTags: {
      a: (_, attrs) => ({
        tagName: 'a',
        attribs: { ...attrs, href: rewrite(attrs.href || ''), rel: 'noopener noreferrer' },
      }),
      img: (_, attrs) => ({
        tagName: 'img',
        attribs: { src: rewrite(attrs.src || ''), alt: attrs.alt || '' },
      }),
    },
  });
  const $ = load(safe, null, false);
  // WordPress often repeats its featured image after introductory paragraphs or
  // uses a second crop of the same upload. Keep captions and linked resources.
  if (leadImage) {
    const cover = imageIdentity(rewrite(leadImage));
    $.root()
      .children('p')
      .each((_, paragraph) => {
        const el = $(paragraph);
        const source = el.children('img').attr('src');
        if (
          !el.text().trim() &&
          el.children().length === 1 &&
          source &&
          imageIdentity(source) === cover
        )
          el.remove();
      });
  }
  const toc = [];
  const headingStack = [];
  $('h1,h2,h3,h4').each((index, heading) => {
    const el = $(heading);
    const text = el.text().replace(/\s+/g, ' ').trim();
    const id = `section-${index + 1}`;
    if (!text) {
      el.replaceWith(`<span id="${id}" aria-hidden="true"></span>${el.html() || ''}`);
      return;
    }
    // Retain the existing section IDs while excluding empty builder headings from navigation.
    el.attr('id', id);
    const originalLevel = Number(heading.name.slice(1));
    while (headingStack.length && headingStack.at(-1).originalLevel >= originalLevel)
      headingStack.pop();
    const level = (headingStack.at(-1)?.level || 1) + 1;
    headingStack.push({ originalLevel, level });
    heading.tagName = `h${Math.min(level, 6)}`;
    toc.push({
      id,
      text: sanitizeHtml(el.html() || '', { allowedTags: [], allowedAttributes: {} }).trim(),
    });
  });
  await Promise.all(
    $('img')
      .toArray()
      .map(async (image) => {
        const el = $(image);
        const src = el.attr('src');
        if (!src) {
          el.remove();
          return;
        }
        const size = await imageInfo(src);
        el.attr({ loading: 'lazy', decoding: 'async' });
        if (size?.width && size?.height)
          el.attr({ width: String(size.width), height: String(size.height) });
        if (size?.srcset)
          el.attr({
            srcset: size.srcset,
            sizes: size.sizes || '(max-width: 1000px) calc(100vw - 36px), 760px',
          });
      }),
  );
  $('a').each((_, anchor) => {
    const el = $(anchor);
    if (!el.text().trim()) {
      if (el.find('img').length) {
        let label = el.find('img').first().attr('alt');
        if (!label && /^https?:/.test(el.attr('href') || '')) {
          try {
            label = `Visit ${new URL(el.attr('href')).hostname.replace(/^www\./, '')}`;
          } catch {}
        }
        el.attr('aria-label', label || 'View linked image or resource');
      } else el.remove();
    }
  });
  $('pre').attr({ tabindex: '0', 'aria-label': 'Code example' });
  $('table').each((_, table) =>
    $(table).wrap(
      '<div class="table-scroll" role="region" aria-label="Data table" tabindex="0"></div>',
    ),
  );
  let html = $.html();
  if (galleries)
    html = html.replace(
      /(?:<p>\s*(?:<a[^>]*>)?<img\b[^>]*>(?:<\/a>)?\s*<\/p>\s*){2,}/g,
      (group) => `<div class="content-gallery">${group}</div>`,
    );
  return { html, toc };
}
