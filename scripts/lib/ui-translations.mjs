// Generated interface values use templates, not one catalog entry per number/date.
// Deliberately match only known UI messages: unknown editorial text still needs translation.
const counts = {
  stories: ['historia', 'historias', 'story', 'stories'],
  'community projects': [
    'proyecto de la comunidad',
    'proyectos de la comunidad',
    'community project',
    'community projects',
  ],
  resources: ['recurso', 'recursos', 'resource', 'resources'],
  'learning paths': [
    'ruta de aprendizaje',
    'rutas de aprendizaje',
    'learning path',
    'learning paths',
  ],
  communities: ['comunidad', 'comunidades', 'community', 'communities'],
  episodes: ['episodio', 'episodios', 'episode', 'episodes'],
  'stories, projects and conversations': [
    'historia, proyecto o conversación',
    'historias, proyectos y conversaciones',
    'story, project or conversation',
    'stories, projects and conversations',
  ],
};
const origins = {
  es: 'Una historia de la comunidad Saturdays.AI. Publicada originalmente el',
  en: 'A story from the Saturdays.AI community. Originally published on',
  pt: 'Uma história da comunidade Saturdays.AI. Publicada originalmente em',
};
const monthNames = new Map();
for (const language of ['en', 'es', 'pt']) {
  for (let month = 0; month < 12; month++) {
    const label = new Intl.DateTimeFormat(language, { month: 'short', timeZone: 'UTC' })
      .format(new Date(Date.UTC(2026, month, 1)))
      .toLowerCase()
      .replaceAll('.', '');
    monthNames.set(label, month);
  }
}
function parseDisplayDate(text) {
  const parts = text
    .toLowerCase()
    .replace(/[.,]/g, '')
    .split(/\s+/)
    .filter((p) => p !== 'de');
  if (parts.length !== 3 || !/^\d{4}$/.test(parts[2])) return;
  const monthFirst = monthNames.has(parts[0]);
  const month = monthNames.get(monthFirst ? parts[0] : parts[1]);
  const day = Number(monthFirst ? parts[1] : parts[0]);
  const year = Number(parts[2]);
  if (month === undefined || !Number.isInteger(day) || day < 1 || day > 31) return;
  const date = new Date(Date.UTC(year, month, day));
  return date.getUTCMonth() === month ? date : undefined;
}
export function uiTranslation(source, language) {
  if (!['es', 'en'].includes(language)) return;
  const count = source.match(/^(\d+) (.+) to explore\.$/);
  if (count && Object.hasOwn(counts, count[2])) {
    const n = Number(count[1]);
    const labels = counts[count[2]];
    const label = labels[(language === 'en' ? 2 : 0) + (n === 1 ? 0 : 1)];
    return `${n} ${label} ${language === 'es' ? 'por descubrir' : 'to explore'}.`;
  }
  const minutes = source.match(/^(\d+) (?:min read|min de lectura|min de leitura)$/);
  if (minutes) return `${minutes[1]} ${language === 'es' ? 'min de lectura' : 'min read'}`;
  const episode = source.match(/^Season (\d+)(?: \/ Episode (\d+))?$/);
  if (episode)
    return (
      `${language === 'es' ? 'Temporada' : 'Season'} ${episode[1]}` +
      (episode[2] ? ` / ${language === 'es' ? 'Episodio' : 'Episode'} ${episode[2]}` : '')
    );
  const prefix = Object.values(origins).find((value) => source.startsWith(value + ' '));
  if (prefix && source.endsWith('.')) {
    const date = parseDisplayDate(source.slice(prefix.length + 1, -1));
    if (date)
      return `${origins[language]} ${new Intl.DateTimeFormat(language, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date)}.`;
  }
}
