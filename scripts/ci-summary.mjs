import fs from 'node:fs/promises';
const read = async (file) => JSON.parse(await fs.readFile(file, 'utf8').catch(() => 'null'));
const content = await read('artifacts/publication/content.json');
const coverage = await read('artifacts/bilingual-theme/coverage.json');
const md = (value) =>
  String(value).replace(
    /[&<>`|\r\n]/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '`': '&#96;',
        '|': '&#124;',
        '\r': ' ',
        '\n': ' ',
      })[c],
  );
const result = process.env.VALIDATION_OUTCOME || 'local';
const lines = [
  '# Estado de publicación',
  '',
  `Validación: **${md(result)}**.`,
  '',
  result === 'success'
    ? 'La validación ha pasado. Comprueba también el job **deploy** para confirmar que esta versión llegó a la web.'
    : 'Esta validación no ha aprobado una versión nueva para desplegar. La web conserva la última publicación correcta.',
  '',
];
if (content) {
  lines.push(
    `Contenido incluido: ${content.published}. Borradores o fechas futuras excluidos: ${content.excluded.length}.`,
    '',
  );
  for (const issue of content.errors)
    lines.push(`- **Error en ${md(issue.file)}:** ${md(issue.message)}`);
  for (const issue of content.warnings)
    lines.push(`- Aviso en ${md(issue.file)}: ${md(issue.message)}`);
}
if (coverage?.missing?.length) {
  lines.push(
    '',
    `## Traducciones pendientes: ${coverage.missing.length}`,
    '',
    'Hay texto editorial nuevo. Preparar y revisar el catálogo en español e inglés antes de volver a desplegar.',
    '',
  );
  for (const item of (coverage.missingDetails || []).slice(0, 20))
    lines.push(
      `- ${md(item.source.slice(0, 160))} — ${item.locations.slice(0, 3).map(md).join(', ')}`,
    );
  if (coverage.missing.length > 20)
    lines.push('- La lista completa está en el informe descargable.');
}
lines.push(
  '',
  'Descarga **publication-diagnostics** para ver los errores y sus archivos. Consulta [Publicar desde Pages CMS](https://github.com/SaturdaysAI/saturdaysai-web/blob/main/docs/CMS-PUBLISHING.md).',
  '',
);
const summary = lines.join('\n');
await fs.mkdir('artifacts/publication', { recursive: true });
await fs.writeFile('artifacts/publication/summary.md', summary);
if (process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
else console.log(summary);
