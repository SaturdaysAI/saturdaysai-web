import { load } from 'cheerio';

// Enhance the existing editable Markdown without moving biographies into a second CMS model.
export function teamLayout(html) {
  const $ = load(html, null, false);
  const team = $('h2')
    .filter((_, el) => $(el).text().trim() === 'Our Team')
    .first();
  if (!team.length) return html;
  const nodes = team.nextAll().toArray();
  const grid = $('<div class="about-team"></div>');
  let card;
  let biography;
  for (const node of nodes) {
    const el = $(node);
    if (el.is('p') && el.children('img').length && !el.text().trim()) {
      card = $('<section class="about-person"></section>');
      biography = null;
      grid.append(card);
      card.append(el);
    } else if (card && el.is('h3')) {
      el.attr('translate', 'no');
      card.append(el);
      card.find('img').attr('alt', el.text().trim());
    } else if (card && el.is('p') && el.children('strong').length && !biography) {
      el.addClass('person-role');
      card.append(el);
      biography = $('<details><summary>Read biography</summary></details>');
      card.append(biography);
    } else if (biography) biography.append(el);
    else if (card) card.append(el);
  }
  team.after(grid);
  return $.html();
}
