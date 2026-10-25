import glossary from '../../src/i18n/glossary.json' with { type: 'json' };

// Protect the longest names first, so shorter terms cannot split them.
export function protectTerms(text) {
  const terms = [...glossary.preserve].sort((a, b) => b.length - a.length);
  const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${escaped.join('|')})(?![\\p{L}\\p{N}_])`, 'gu');
  const replacements = [];
  const protectedText = text.replace(pattern, (term) => {
    const token = `QZXBRAND${replacements.length}QZX`;
    replacements.push({ token, term });
    return token;
  });
  return {
    text: protectedText,
    restore(value) {
      for (const { token, term } of replacements) {
        if (!value.includes(token)) throw new Error(`Translation lost protected term: ${term}`);
        value = value.replaceAll(token, term);
      }
      if (/QZXBRAND/.test(value)) throw new Error('Unresolved translation placeholder');
      return value;
    },
  };
}
