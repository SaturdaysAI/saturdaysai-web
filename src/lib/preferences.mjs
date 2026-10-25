export const supportedLanguages = ['es', 'en'];

export function preferredLanguage(saved, languages = []) {
  if (supportedLanguages.includes(saved)) return saved;
  for (const language of languages) {
    const short = language.toLowerCase().split('-')[0];
    if (supportedLanguages.includes(short)) return short;
  }
  return 'en';
}

export function languagePath(pathname, language, base = '/') {
  const prefix = base.replace(/\/$/, '');
  let path = prefix && pathname.startsWith(prefix + '/') ? pathname.slice(prefix.length) : pathname;
  path = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return `${prefix}${language === 'en' ? '/en' : ''}${path}`;
}
