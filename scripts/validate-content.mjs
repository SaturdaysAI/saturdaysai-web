import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { inspectPublication } from './lib/publication-validation.mjs';

const entries = [],
  parseErrors = [];
for (const collection of ['posts', 'pages']) {
  for (const name of await fs.readdir(`src/content/${collection}`)) {
    if (!name.endsWith('.md')) continue;
    const file = `src/content/${collection}/${name}`;
    try {
      const text = await fs.readFile(file, 'utf8');
      const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!frontmatter) throw new Error('Faltan los campos iniciales del artículo.');
      const data = YAML.parse(frontmatter[1]);
      if (!data || typeof data !== 'object' || Array.isArray(data))
        throw new Error('Los campos del contenido no son válidos.');
      entries.push({ file, collection, data, body: text.slice(frontmatter[0].length) });
    } catch (error) {
      parseErrors.push({ file, message: error.message });
    }
  }
}
// Match Linux filename casing even when a maintainer runs this on Windows.
const directories = new Map();
async function mediaExists(source) {
  let directory = path.resolve('public');
  const parts = source.slice(1).split('/');
  for (const part of parts) {
    if (!directories.has(directory))
      directories.set(
        directory,
        fs.readdir(directory).catch(() => []),
      );
    if (!(await directories.get(directory)).includes(part)) return false;
    directory = path.join(directory, part);
  }
  return (await fs.stat(directory)).isFile();
}
const report = await inspectPublication(entries, mediaExists);
report.errors.unshift(...parseErrors);
await fs.mkdir('artifacts/publication', { recursive: true });
await fs.writeFile('artifacts/publication/content.json', JSON.stringify(report, null, 2));
const escape = (value) =>
  String(value).replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
for (const [severity, issues] of [
  ['error', report.errors],
  ['warning', report.warnings],
]) {
  for (const issue of issues) {
    if (process.env.GITHUB_ACTIONS)
      console.log(
        `::${severity} file=${escape(issue.file).replaceAll(',', '%2C')}::${escape(issue.message)}`,
      );
    else console.log(`${severity}: ${issue.file}: ${issue.message}`);
  }
}
console.log(
  JSON.stringify({
    published: report.published,
    excluded: report.excluded.length,
    errors: report.errors.length,
    warnings: report.warnings.length,
  }),
);
if (report.errors.length) process.exitCode = 1;
