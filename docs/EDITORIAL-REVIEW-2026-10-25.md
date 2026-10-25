# Revisión editorial de español e inglés

Fecha: 25 de octubre de 2026. Sitio: https://saturdays.ai/.

## Información confirmada y narrativa

Miguel confirmó directamente que Saturdays.AI ha ayudado a más de 30.000 fellows y que él es su fundador y presidente. La portada, la presentación de la comunidad, los metadatos y su ficha utilizan esa información en español e inglés. La cifra describe personas acompañadas, no una certificación de 30.000 graduados. Jan conserva su atribución como cofundador. Los demás perfiles mantienen una nota sobre su procedencia histórica; no se han confirmado nuevos cargos para ellos.

La presentación conecta el aprendizaje en comunidad, la creación de proyectos y el impacto social. Se mantiene el lema AI4ALL IS AI4GOOD. Las páginas de España online, Latinoamérica online, AI Saturdays y el máster distinguen la introducción al programa del archivo de ediciones anteriores. Las convocatorias antiguas no se presentan como inscripciones abiertas.

## Alcance de la revisión

- Lectura y corrección detallada de navegación, portada, presentación, programas, textos de ciudades, contacto, podcast, aviso legal y privacidad en ambos idiomas.
- Lectura de los 162 títulos de artículos y sus versiones localizadas. Correcciones de gramática, nombres de proyectos, títulos de episodios y términos técnicos.
- Revisión de descripciones de páginas, incluidas las 23 ciudades. Se eliminaron textos truncados, fechas antiguas presentadas sin contexto y una cantidad económica que seguía en los metadatos de una página general. Se conserva el contenido económico del blog.
- Comparación automática de segmentos del archivo traducidos anteriormente con modelos Argos/OPUS: 2.274 campos actualizados después de controles de nombres, cifras, longitud y enlaces. Once candidatos que requerían atención se resolvieron editorialmente; tres quedaron obsoletos tras corregir sus fuentes.
- Correcciones adicionales de terminología y mensajes incoherentes, como traducciones literales de Hugging Face, encabezados de la aplicación Energía en Acción y textos del podcast.

El inventario inicial contenía 13.218 segmentos y aproximadamente 197.500 palabras de origen, de las que unas 195.700 aparecían en las páginas activas. No se ha realizado una revisión humana palabra por palabra de ese volumen. Los cambios automáticos conservan `reviewed: false` y registran el proveedor y sus controles; una comprobación automática no equivale a aprobación editorial. Los cambios revisados por el agente identifican `Codex`, fecha y alcance. El aviso de traducción automática permanece en el archivo y se omite en las páginas informativas revisadas.

## Correcciones factuales localizadas

- El artículo de desertificación incluía una cifra imposible de 15.000 millones de personas afectadas. Se sustituyó por la referencia histórica de UNCCD de 2021 sobre más de mil millones de personas cuyos medios de vida estaban amenazados; se añadió la fuente y una nota de corrección, conservando el contexto temporal del artículo de 2022.
- El título de AlphaFold atribuía el Nobel al modelo. Ahora distingue el trabajo de AlphaFold de las personas premiadas: David Baker, Demis Hassabis y John Jumper. También se matizan las posibles aplicaciones médicas, que requieren validación.

Estas correcciones no certifican los resultados científicos o clínicos de todos los proyectos del archivo.

Fuentes: [informe UNCCD de 2021](https://catalogue.unccd.int/UNCCD_DLDD_SDS_Land_Human_Health_7_April_2021.pdf), [Nobel de Química de 2024](https://www.nobelprize.org/prizes/chemistry/2024/press-release/).

## Identidad y privacidad

El propietario facilitó el CIF G67349076 y el domicilio de calle Llull, 189, planta primera, 08005 Barcelona. La denominación AI SATURDAYS ASOCIACIÓN coincide con esos datos en el [directorio empresarial de Cinco Días](https://cincodias.elpais.com/directorio-empresas/empresa/9363145/ai-saturdays). Ese directorio no se presenta como una certificación registral.

El aviso legal y la privacidad incluyen la identidad y el contacto. La política describe la web estática, el registro de IP de GitHub Pages, las preferencias locales de idioma y apariencia, los reproductores que se activan al pulsar, las consultas por correo y el archivo de contenido público. Distingue las plataformas externas de cursos e inscripciones. No se ha añadido analítica ni publicidad.

Referencias: [datos de visitas en GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection), [derechos ante la AEPD](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos). El texto actualizado no constituye una certificación jurídica ni una auditoría de los tratamientos internos de la asociación o de servicios externos.

## Mantenimiento y comprobaciones

El nuevo glosario protege nombres de marca, programas y herramientas antes de solicitar traducciones. El importador rechaza traducciones que pierdan un nombre protegido. Los textos siguen editables en Markdown, Pages CMS y los catálogos versionados.

La verificación de producción pasa Astro, 36 pruebas automatizadas, la construcción estática y los controles de enlaces, imágenes, presupuestos de tamaño, tarjetas sociales y localización. Hay 916 documentos HTML, 1.832 alternancias de idioma y cero traducciones ausentes. La revisión de títulos regenera también sus tarjetas de compartir. El catálogo final contiene 13.335 segmentos; 343 identifican la revisión de redacción por Codex en esta pasada, aparte de los 272 que ya estaban marcados como revisados.

La evidencia de trabajo y los registros de comprobación se guardan en `artifacts/editorial-2026-10-25/`, excluidos de la publicación. Las pruebas en dispositivos físicos y los datos de campo de rendimiento siguen teniendo las limitaciones documentadas en la auditoría anterior.

En navegador se ha leído la presentación española e inglesa, la página de España Online y la privacidad inglesa. En la presentación a 375 px se comprobó el cambio de idioma y la biografía desplegable de Miguel: sin desbordamiento horizontal ni imágenes cargadas rotas. La revisión en contexto detectó y eliminó una pregunta económica huérfana, corrigió horarios que decían `13 AM` y unió párrafos partidos del programa. La última construcción y sus comprobaciones incluyen esas correcciones.

## Publicación

Contenido publicado: `28c8da2b1fed89e15711f65dabe205100cfa00d8`. La [ejecución de GitHub Actions](https://github.com/SaturdaysAI/saturdaysai-web/actions/runs/40226712935) completó correctamente la validación y el despliegue en `https://saturdays.ai/`.

Se confirmó por HTTPS el texto nuevo de portada, presentación, aviso legal, privacidad y España Online en ambos idiomas. La portada española y la presentación inglesa también se leyeron en el navegador público. En escritorio, la portada tenía 1265 px de anchura sin desbordamiento ni imágenes cargadas rotas; no se capturaron errores de consola. Captura: `artifacts/editorial-2026-10-25/home-live-es.png`.

La verificación pública completa terminó a las 20:45 CET del 25 de octubre: **6.219 archivos, incluidas las 916 páginas HTML y 444 tarjetas sociales vigentes, con cero fallos**. Se usaron DNS público y validación estricta de certificados TLS. Los metadatos publicados coinciden con la construcción revisada; también pasaron las alternancias de idioma, datos estructurados, sitemap, robots, redirecciones y respuesta 404. Informe local: `artifacts/editorial-2026-10-25/live-verification.json`. Las diez comprobaciones específicas de narrativa y datos legales constan en `live-editorial-checks.json`.
