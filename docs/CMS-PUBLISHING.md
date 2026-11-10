# Publicar artículos desde Pages CMS

Guardar un artículo en Pages CMS actualiza el repositorio. La web se actualiza después de que termine correctamente el [despliegue de GitHub Pages](https://github.com/SaturdaysAI/saturdaysai-web/actions/workflows/deploy.yml).

1. Redacta con **Draft** activado. Completa título, resumen, autor, fecha y URL permanente.
2. Sube las imágenes y selecciónalas desde el editor. Si borras una imagen, elimina también su referencia en el artículo. Los nombres con espacios, acentos y subcarpetas están admitidos.
3. Cuando el original esté listo, desactiva **Draft**. La fecha debe haber llegado para que aparezca públicamente. GitHub comprueba las publicaciones programadas cada día a las 00:17 UTC y despliega la web si las validaciones pasan; GitHub puede retrasar esa ejecución. Guardar un cambio también inicia un despliegue. Las fechas se evalúan en UTC. Deja **Last meaningful update** vacío para un artículo nuevo o reprogramado: solo sirve para una revisión posterior a su publicación. Si conserva una fecha anterior, se mostrará un aviso en la validación y esa fecha se omitirá en la web, sin bloquear el despliegue.
4. La publicación bilingüe necesita también las traducciones nuevas. Codex puede preparar el catálogo, completar el inglés editable y validar el resultado siguiendo [el procedimiento de idiomas](LANGUAGES-AND-THEMES.md#editing-and-publishing). Esta preparación no se ejecuta automáticamente al guardar en Pages CMS.
5. Comprueba que el job **deploy** termina en verde y abre el artículo desde el blog. Si falla la validación, la web conserva la última versión correcta. El resumen del run explica el estado y enlaza esta guía; el archivo descargable **publication-diagnostics** incluye el log, los errores de contenido y las traducciones pendientes con sus páginas.

No repitas el artículo ni cambies su URL para intentar desbloquear un despliegue. Corrige el error de ese despliegue y conserva el enlace permanente.

## Incidencia del 10 de noviembre de 2026

El artículo de finanzas personales tenía `draft: false` y fecha de publicación del 9 de noviembre, pero el último despliegue correcto era del día 4. Al no existir una ejecución programada, llegar a la fecha no actualizaba la web. El siguiente [despliegue, 42901307572](https://github.com/SaturdaysAI/saturdaysai-web/actions/runs/42901307572), falló porque **Last meaningful update** conservaba el 2 de noviembre, anterior a la nueva publicación.

Se vació esa fecha opcional, se conservó la publicación del 9 de noviembre y se recuperó la URL permanente original `/2026/10/30/ia-y-finanzas-personales/`. La fecha incluida en una URL ya compartida no tiene que cambiar al reprogramar el artículo. También se retiró del cuerpo una copia idéntica de la imagen de portada.

La ejecución diaria permite publicar artículos programados cuando su fecha llega, siempre que **Draft** esté desactivado, las imágenes existan y las traducciones estén completas. Una fecha de actualización anterior a la publicación ahora genera un aviso y se excluye de las fechas visibles y los metadatos SEO. Las fechas de actualización inválidas o futuras siguen bloqueando la publicación.

## Incidencia del 1 de noviembre de 2026

Los artículos de MLOps y finanzas personales estaban guardados con `draft: false`, pero el [despliegue 41354557343](https://github.com/SaturdaysAI/saturdaysai-web/actions/runs/41354557343) se detenía al intentar abrir `/media/image.png`, que había sido borrada. El artículo de finanzas también conservaba una referencia a `/media/ChatGPT_screnshot1.png`, igualmente borrada.

Se retiraron esas referencias obsoletas, una captura duplicada y los títulos repetidos dentro del cuerpo. Se conservaron los originales escritos por sus autores, sus fechas y sus URL. Se añadieron las traducciones necesarias para la publicación bilingüe.

El preparador de imágenes ahora interpreta Markdown y HTML, admite nombres con espacios y acentos, evita confundir ejemplos de código con imágenes reales y enumera los archivos de contenido responsables cuando falta una imagen publicada. Las imágenes de artículos en borrador o con fecha futura no bloquean la preparación de la web pública.

La [revisión posterior de todos los jobs fallidos](CI-AUDIT-2026-11-01.md) detectó otro problema: retirar un artículo cambiaba el contador del archivo y exigía una traducción nueva para ese número. Los valores variables de la interfaz ahora usan plantillas bilingües. Cambiar un contador, una fecha o un tiempo de lectura ya no exige completar un segmento nuevo. Los párrafos y títulos nuevos sí necesitan sus traducciones; la validación sigue impidiendo publicar versiones incompletas.
