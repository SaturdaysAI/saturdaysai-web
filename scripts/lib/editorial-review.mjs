import { createHash } from 'node:crypto';

const normalize = (value = '') => value.replace(/\s+/g, ' ').trim();

// Review the published wording, including captions and links, rather than a mutable flag.
// Related stories live outside the article and are deliberately not part of its review.
export function editorialDigest($) {
  const article = $('main article')
    .filter((_, el) => $(el).find('.reading-body').length)
    .first();
  const scope = (article.length ? article : $('main')).clone();
  scope
    .find('script,style,svg,.translation-notice,.original-media-notice,[data-editorial-status]')
    .remove();
  const attributes = [];
  scope.find('[alt],[title],[aria-label],[placeholder],[href],[src]').each((_, el) => {
    const values = {};
    for (const name of ['alt', 'title', 'aria-label', 'placeholder', 'href', 'src']) {
      const value = $(el).attr(name);
      if (value !== undefined) values[name] = normalize(value);
    }
    attributes.push(values);
  });
  return createHash('sha256')
    .update(
      JSON.stringify({
        version: 1,
        language: $('html').attr('lang'),
        title: normalize($('title').text()),
        description: normalize($('meta[name="description"]').attr('content')),
        text: normalize(scope.text()),
        attributes,
      }),
    )
    .digest('hex');
}

export function hasCurrentEditorialReview($, reviews, route, language) {
  const review = reviews.pages?.[route]?.[language];
  return Boolean(review?.reviewedAt && review?.digest === editorialDigest($));
}

export function applyEditorialNotice($, reviews, route, language) {
  $('.translation-notice,.original-media-notice').remove();
  const prose = $('.reading-body .prose,.city-history .prose').first();
  if (!prose.length) return 'not-applicable';
  const reviewed = hasCurrentEditorialReview($, reviews, route, language);
  if (!reviewed) {
    prose.before(
      $('<p class="translation-notice"></p>').text(
        language === 'en'
          ? 'This archive includes automatic translations. Audio, video and text inside images remain in their original language.'
          : 'Este archivo incluye traducciones automáticas. El audio, el vídeo y el texto de las imágenes conservan su idioma original.',
      ),
    );
  } else if ($('.episode-intro,.media-player,iframe,video,audio').length) {
    prose.before(
      $('<p class="original-media-notice"></p>').text(
        language === 'en'
          ? 'Audio and video remain in their original language.'
          : 'El audio y el vídeo conservan su idioma original.',
      ),
    );
  }
  return reviewed ? 'reviewed' : 'pending';
}
