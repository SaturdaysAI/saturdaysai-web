# Archivo bilingüe y Seguridad de la IA

Fecha: 25 de octubre de 2026. Ampliación de la revisión editorial anterior.

## Cambios visibles

- Nueva página `/seguridad-ia/` y versión `/en/seguridad-ia/`.
- Bloque de portada: «Construye el futuro. Protege lo que importa.» / “Build the future. Protect what matters.”
- Presencia en Aprende, el selector de temas y el pie de página.
- Curso destacado: [Introducción a la Seguridad de la IA](https://cursos.saturdays.ai/courses/introduction-to-ai-safety). Se comprobó la página real y su temario público. Se indica que se imparte en español también en la web inglesa.
- En español, el apartado se denomina «Seguridad de la IA». En inglés, “AI Safety / Security”. No se ha cambiado el título del curso en la plataforma externa.
- El contenido diferencia riesgos y comportamientos perjudiciales de ataques deliberados. Incluye evaluación, supervisión, permisos, límites y recursos del [NIST](https://www.nist.gov/itl/ai-risk-management-framework) y [OWASP](https://genai.owasp.org/llm-top-10/).
- Componente Astro y CSS, sin dependencias, servicios externos o JavaScript adicionales para el bloque. El curso sigue siendo un enlace externo.

## Alcance editorial

El inventario contiene 162 entradas públicas, con unas 172.444 palabras españolas en el cuerpo renderizado, sin los ejemplos de código. Se compararon las aperturas y los cierres de las entradas en ambos idiomas y se pasó un detector de restos de español sobre todo el cuerpo inglés. Ese detector requiere interpretación: los ejemplos de código y prompts originales pueden conservar su idioma.

Se leyeron los 41 episodios del podcast y se reescribieron sus presentaciones en español e inglés. También se revisaron sus enlaces, capítulos y nombres. Se corrigieron una presentación copiada de otro episodio, cambios de género, nombres traducidos, frases inconexas, el uso incorrecto de «privatización» por «privacidad» y «fishing» por «phishing». Se retiró un capítulo sobre NEURE_ que estaba copiado en el episodio de Inés Huertas. Se preservan los tiempos restantes; no se han escuchado todas las grabaciones para certificar cada marca temporal.

En el resto del archivo se revisaron con mayor detalle los pasajes problemáticos detectados, incluidos artículos de salud, arte, herramientas de programación y Seguridad de la IA. Hay modificaciones de fuente en 63 entradas. Una comparación de metadatos confirma que se mantienen sus autores, fechas originales, identificadores y URLs.

El catálogo incorpora 198 segmentos nuevos y correcciones en 135 segmentos existentes, que modifican 145 campos de idioma. Se protegen más nombres propios en el glosario, incluidos La Paz, Narrativa, Suma Positiva, FríoMon y varios invitados del podcast. Las traducciones permanecen editables.

Esta es una revisión editorial asistida y dirigida por incidencias, no una lectura certificada palabra por palabra de las dos versiones completas ni una validación de todos los resultados de investigación. El aviso de traducción automática permanece en el archivo. Las correcciones puntuales no convierten automáticamente un párrafo largo en una traducción íntegramente revisada.

## Correcciones de sentido y de hechos

- **Dron militar:** la historia se había presentado como un experimento realizado. Se ha rectificado, con nota editorial visible, manteniendo la URL y la autoría original. La [Royal Aeronautical Society](https://www.aerosociety.com/news/highlights-from-the-raes-future-combat-air-space-capabilities-summit/) aclaró que era un escenario hipotético.
- **Glaucoma:** «2,2 billones» se corrige a 2.200 millones; la cifra corresponde a discapacidad visual en general, no a glaucoma. Se añade la [fuente de la OMS](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment) y se aclaran los límites del proyecto.
- **Expresiones faciales:** se distingue clasificar imágenes de conocer emociones, atención o bienestar. El artículo vinculado a terapia se reescribe para no atribuir al prototipo eficacia clínica no demostrada. [Revisión científica](https://pmc.ncbi.nlm.nih.gov/articles/PMC6640856/).
- **Proyectos sanitarios:** se identifica su carácter educativo y se distingue el objetivo del equipo de la validación clínica. Esto no certifica los conjuntos de datos ni las métricas originales.
- **MaMamIA:** se corrige la confusión entre mortalidad por cáncer de mama y mortalidad femenina por cualquier causa. [OMS](https://www.who.int/news-room/fact-sheets/detail/breast-cancer).
- **FoodCheck:** se distingue historial guardado en el navegador del envío de imágenes a Cloudflare Workers AI y consultas a OpenFoodFacts. Un prompt pide JSON estructurado, pero no garantiza que el resultado sea válido.
- **Arte:** se reescriben pasajes parcialmente sin traducir, se conserva el contexto de 2022 y se corrige el relato sobre el acceso a DALL-E 2. [Anuncio original de OpenAI](https://openai.com/index/dall-e-now-available-without-waitlist/).
- **Cursor:** se describe como editor basado en VS Code, no como una extensión. [Documentación oficial](https://cursor.com/docs/configuration/migrations/vscode).
- **Periodismo:** se elimina la promesa de que generar contenidos con IA garantiza precisión y fiabilidad.
- **HaPyness:** se corrige la referencia al Capitolio, que decía Casa Blanca.
- **Comparativa R1/o1:** se aclara su fecha, el carácter de experiencia personal y la diferencia entre las funciones de una plataforma y las capacidades de un modelo. No se presenta como un benchmark actual.

## Comprobaciones

- `npm run verify`: Astro sin errores, 36 pruebas aprobadas, enlaces y medios locales, presupuestos de tamaño, localización y tarjetas sociales.
- 918 documentos HTML, 1.836 enlaces de alternancia de idioma y cero traducciones ausentes.
- 446 tarjetas sociales vigentes verificadas, incluidas las de la página nueva.
- La portada transferida comprimida ocupa aproximadamente 13,6 kB de HTML; esto no equivale a una medición nueva de rendimiento de campo.
- Controles adicionales evitan regresiones en el nombre español del apartado, el enlace exacto al curso y la corrección del artículo militar.
- En navegador: lectura de la página nueva, búsqueda «seguridad» con un resultado, recorrido al curso real y cambio ES/EN. A 375 px de ancho útil, sin desbordamiento horizontal ni imágenes cargadas rotas. El tema oscuro permanece al cambiar de idioma.

La evidencia y los registros están en `artifacts/archive-review-2026-10-25/`, excluidos de la web publicada. La publicación y la verificación pública se registrarán al terminar el despliegue.
