# Publicar artículos desde Pages CMS

Guardar un artículo en Pages CMS actualiza el repositorio. La web se actualiza después de que termine correctamente el [despliegue de GitHub Pages](https://github.com/SaturdaysAI/saturdaysai-web/actions/workflows/deploy.yml).

1. Redacta con **Draft** activado. Completa título, resumen, autor, fecha y URL permanente.
2. Sube las imágenes y selecciónalas desde el editor. Si borras una imagen, elimina también su referencia en el artículo. Los nombres con espacios, acentos y subcarpetas están admitidos.
3. Cuando el original esté listo, desactiva **Draft**. La fecha debe haber llegado para que aparezca públicamente.
4. La publicación bilingüe necesita también las traducciones nuevas. Codex puede preparar el catálogo, completar el inglés editable y validar el resultado siguiendo [el procedimiento de idiomas](LANGUAGES-AND-THEMES.md#editing-and-publishing). Esta preparación no se ejecuta automáticamente al guardar en Pages CMS.
5. Comprueba que el último despliegue está en verde. Si falla, la web conserva la última versión correcta: el artículo sigue guardado en el CMS, pero todavía no está publicado en la web.

No repitas el artículo ni cambies su URL para intentar desbloquear un despliegue. Corrige el error de ese despliegue y conserva el enlace permanente.

## Incidencia del 1 de noviembre de 2026

Los artículos de MLOps y finanzas personales estaban guardados con `draft: false`, pero el [despliegue 41354557343](https://github.com/SaturdaysAI/saturdaysai-web/actions/runs/41354557343) se detenía al intentar abrir `/media/image.png`, que había sido borrada. El artículo de finanzas también conservaba una referencia a `/media/ChatGPT_screnshot1.png`, igualmente borrada.

Se retiraron esas referencias obsoletas, una captura duplicada y los títulos repetidos dentro del cuerpo. Se conservaron los originales escritos por sus autores, sus fechas y sus URL. Se añadieron las traducciones necesarias para la publicación bilingüe.

El preparador de imágenes ahora interpreta Markdown y HTML, admite nombres con espacios y acentos, evita confundir ejemplos de código con imágenes reales y enumera los archivos de contenido responsables cuando falta una imagen publicada. Las imágenes de artículos en borrador o con fecha futura no bloquean la preparación de la web pública.
