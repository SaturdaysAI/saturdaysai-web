import test from 'node:test';
import assert from 'node:assert/strict';
import { contentImageSources } from '../scripts/lib/content-images.mjs';

test('CMS images with spaces, accents, encoded URLs and subfolders are indexed completely', () => {
  assert.deepEqual(contentImageSources(`
![Diagram](</media/Ciclo MLOps_ del problema a producción.jpg>)
![](/media/subfolder/predicci%C3%B3n%20real.jpg)
<img src="/media/diagram%20one.png?v=2">

![external](https://example.com/media/image.png)
![ref][screenshot]

[screenshot]: /media/step.webp
`, '/media/cover.png'), [
    '/media/cover.png', '/media/Ciclo MLOps_ del problema a producción.jpg',
    '/media/subfolder/predicción real.jpg', '/media/diagram one.png', '/media/step.webp',
  ]);
});

test('code examples are not mistaken for uploads and duplicates are indexed once', () => {
  assert.deepEqual(contentImageSources('`/media/example.png`\n\n![](/media/cover.png)', '/media/cover.png'), ['/media/cover.png']);
  assert.throws(() => contentImageSources('![](/media/%2e%2e/private.png)'), /Unsafe media/);
});
