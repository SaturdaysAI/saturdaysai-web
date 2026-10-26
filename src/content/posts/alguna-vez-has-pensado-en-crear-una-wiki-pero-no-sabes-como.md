---
title: Crea una web wiki de tu juego o contenido favorito siguiendo estos pasos
  (y con IA)
description: "¿Alguna vez has querido crear una wiki y no sabías por dónde
  empezar? Piensa en ella como un museo temático: eliges la colección (el tema),
  diseñas el recorrido (la navegación) y curas cada pieza (las páginas de
  detalle). De…"
pubDate: 2025-10-22
author: Adrian Algar
category: Community
kind: article
tags:
  - Desarrollo web
  - Fan-made
  - Hollow Knight
  - Inteligencia Artificial
  - Proyecto Wiki
  - Trivia game
  - Wiki
image: /media/ccddefbf07d52518.webp
imageAlt: Crea una web wiki de tu juego o contenido favorito siguiendo estos
  pasos (y con IA)
legacyPath: /2025/10/22/alguna-vez-has-pensado-en-crear-una-wiki-pero-no-sabes-como/
sourceUrl: https://saturdays.ai/2025/10/22/alguna-vez-has-pensado-en-crear-una-wiki-pero-no-sabes-como/
sourceId: 11243
language: es
draft: false
---

En este artículo encontrarás una guía clara y accionable para construir una wiki moderna con búsqueda compartible, galerías reutilizables, páginas de detalle, mapa interactivo y un minijuego de trivia. **Todo con Vite + React Router y un empujón de IA.**

A continuación te mostraré cómo hice la mía basada en uno de mis videojuegos favoritos: **Hollow Knight** .

Puedes acceder a la Wiki desde los siguientes enlaces para visualizar el  resultado y todo el contenido **AL COMPLETO** antes de la explicación: 

-   [**REPOSITORIO EN GITHUB**](https://github.com/SaturdaysAI/hollowknight)
-   [**WIKI WEB LINK**](https://saturdaysai.github.io/hollowknight/)

## **De la Idea al Sitio Vivo**

Crear una wiki es como montar un museo temático: tú eliges la colección (tu tema), diseñas el recorrido (la navegación) y curas cada pieza (las páginas de detalle).

**¿La buena noticia?**

Hoy puedes construirla rápido con Vite + React, publicarla gratis en GitHub Pages y enriquecerla con funciones “sorpresa” como mapas interactivos, búsqueda compartible por URL y un minijuego de trivia para aprender jugando.

La guía técnica que tienes a mano ya te trae el esqueleto con rutas, estilos, carga de imágenes y despliegue, de modo que puedes replicar el proyecto desde cero sin perderte en la configuración.

## **¿Por qué una wiki con ayuda de la IA?**

La IA no “escribe por ti”; te acelera y mantiene la calidad cuando el contenido crece. Estas son razones y casos de uso prácticos:

-   **Arrancas más rápido:** La IA te sugiere un índice inicial y te ayuda a ordenar ideas. Pasas de “tengo un montón de notas” a “ya tengo una estructura”.

-   **Escribes con más fluidez:** Convierte apuntes sueltos en textos claros y con un mismo tono. Tú decides el estilo; la IA te ayuda a mantenerlo.

-   **Todo queda más uniforme:** Propone títulos, slugs y resúmenes cortos para que las listas se vean limpias y fáciles de recorrer.

-   **Menos errores, más cuidado:** Señala enlaces rotos, faltas y alt‑texts que faltan en imágenes. Es como un revisor amable que no se cansa.

-   **Te da ideas nuevas:** Sugiere preguntas para la trivia, sinónimos para la búsqueda y pequeñas mejoras que no habías pensado.

-   **Tú sigues al mando:** La IA acelera, pero no sustituye tu criterio. Tú eliges qué entra, qué se modifica y cómo se cuenta la historia.


**En resumen**: la IA no hace la wiki por ti; hace que sea más fácil, más rápida y más agradable de construir.

## **Visión rápida del proyecto**

-   **Producto**: sitio con dos vistas principales

    -   **Wiki**: índice, galerías por secciones y páginas de detalle.
    -   **Trivia**: partida configurable (categoría/dificultad/cantidad) con resultados.
-   **Datos**: ficheros JSON versionados en el repositorio.

-   **Interfaz**: componentes reutilizables y estilos coherentes.

-   **Navegación**: rutas claras para portada, secciones, detalle, mapa y trivia.

-   **Publicación**: preparado para desplegar fácilmente en GitHub Pages.

-   **IA**: apoyo para estructurar, redactar y revisar el contenido.


Una vez tengamos clara la idea podemos empezar con la creación de la estructura de carpetas. La IA puede ser una parte fundamental en el siguiente paso, ya que te va a ayudar a estructurar-lo de una forma eficiente:

![](/media/5b08692bab45e834.webp)

## **Arranque del Proyecto**

Lo primero que necesitamos es tener la base lista para iniciar en local:

-   Instalar dependencias: `npm install`
-   Arrancar en dev: `npm run dev`
-   Build de producción: `npm run build`
-   Previsualizar el build: `npm run preview`

#### **Estructura mínima que usamos:**

**src/main.tsx**: monta la app y aplica index.css. 

![](/media/d72cd3a84408d3c1.webp)

**src/App.tsx**: define el enrutado con React Router.

Usamos BrowserRouter _**basename={import.meta.env.BASE\_URL}**_ para que funcione en GitHub Pages bajo **/repo**.

![](/media/7b65449fb9e27be8.webp)

**src/index.css**: estilos globales, variables CSS y layouts (grid/galería, detail, hero, navbar…).  A continuación un ejemplo pequeño del CSS, (lo encontrarás completo en mi repositorio de GitHub):

![](/media/7f7df7c2165f8405.webp)

## **Routing y Páginas Principales**

| Ruta | Página (componente) | Función |
| --- | --- | --- |
| `/` | `Home.tsx` | Portada con vídeo de fondo y buscador rápido. Entrada al resto del sitio. |
| `/wiki` | `WikiIndex.tsx` | Índice global; búsqueda “linkeable” (estado tomado de la URL, p. ej. `?q=`). |
| `/wiki/bosses` | `BossesPage.tsx` | Lista de jefes (cards con estrellas). |
| `/wiki/warrior-dreams` | `WarriorDreamsPage.tsx` | Lista del grupo “warrior-dreams”. |
| `/wiki/variants` | `VariantsPage.tsx` | Lista de variantes. |
| `/wiki/charms` | `CharmsPage.tsx` | Lista de charms (muestras). |
| `/wiki/items` | `ItemsPage.tsx` | Lista de ítems (categoría visible en la tarjeta). |
| `/wiki/:group/:slug` | `WikiDetail.tsx` | Detalle por grupo y slug (card + overview + chips). |
| `/map` | `MapPage.tsx` | Mapa interactivo con toolbar y panel de detalle. |
| `/trivia` | `TriviaStart.tsx` | Pantalla inicial de trivia (configuración/cantidad). |
| `/trivia/results` | `TriviaResults.tsx` | Resultados/resumen de la trivia. |
| `*` | `NotFound.tsx` | 404. |

## **Piezas Transversales**

**NavBar.tsx**: HOME/WIKI/TRIVIA con NavLink. 

![](/media/0ef73148addb3b07.webp)

**SearchBar.tsx**: input que, al enviar, navega a /wiki?search=… (la URL es la “fuente de verdad”).

![](/media/b4399835a3aae113.webp)

**Footer.tsx**: info que se mantiene en toda la wiki.

![](/media/e7d6747fc69837bd.webp)

## **Página: HOME**

Pantalla de presentación con **fondo animado a pantalla completa**, logo, texto, barra de búsqueda y dos CTAs hacia la wiki y la trivia.

![](/media/d7fedf086433956a.webp)

## **Índice de la wiki : WIKINDEX**

El buscador de Home te lleva a **/wiki?search=TERM**. El índice lee ese parámetro con **useSearchParams**, normaliza (minúsculas + sin diacríticos) y filtra por title, summary o slug en varios datasets. Ventaja: la búsqueda va en la URL y se puede compartir o refrescar sin perder estado.

![](/media/cc3e0023147293fc.webp)

### **Páginas de sección (listas)**

Todas comparten un patrón: asignan el fondo específico de la sección a la variable CSS `--page-bg` y muestran el componente `Gallery` con sus datos e imágenes:

#### **Bosses**

Listado de los bosses del juego calificados con estrellas de dificultad.

![](/media/a9a082c65b1842c0.webp)

#### **Warrior Dreams**

Listado de bosses oníricos calificados con estrellas de dificultad.

![](/media/358df7e45e8d5c1b.webp)

#### **Variants**

Listado de variantes de bosses calificados con estrellas de dificultad.

![](/media/25953bc24c1cec2d.webp)

#### **Charms**

Listado de amuletos calificados por cantidad de muescas que ocupa.

![](/media/b6cb996722b80f2a.webp)

#### **Items**

Listado de objetos calificados por diferentes funcionalidades en el juego.

![](/media/cad4ef01c5f21d10.webp)

#### **Interactive Map**

Mapa interactivo con etiquetas desplegables por zona. 

El mapa aplica un fondo específico a la página mientras está abierto. 

La imagen principal se escala al **viewport** y puedes arrastrarla para moverte; un tope invisible impide salirte de los bordes. 

Las áreas se renderizan como etiquetas clicables con colores propios. 

La búsqueda filtra esas etiquetas y, al pulsar Enter, centra la primera coincidencia y abre su detalle (también puedes centrar con `?center=slug`). 

El panel de detalle muestra imagen, resumen y lore de la zona y se puede cerrar para volver a explorar.

![](/media/6b45e5123feb941a.webp)

## **Galerías por categoría (reutilizables)**

**Gallery.tsx**: componente de galería reutilizable que lista tarjetas y navega al detalle.

-   **Props**: `title`, `backTo?`, `items[{ slug, title, img?, summary?, difficulty?, notches? }]`, `basePath`, `assetsGlob`, `resolveBy: "slug"|"filename"`, `showStars?`.

-   **Imagen**: resuelve la URL buscando en `assetsGlob` por `slug` (jpg/png/webp) o por `filename`; muestra _fallback_ con el título si no hay imagen.

-   **Card**: `<Link>` a `${basePath}/${slug}`; `figure` con `backgroundImage`, `figcaption` con título.

-   **Meta**: si `showStars` ⇒ **estrellas** (1–5) usando `difficulty`; si no ⇒ **muescas** usando `notches`.

-   **Accesibilidad/maquetado**: `ul.gallery-grid` con `aria-label`; estrellas y muescas con `aria-label`/`title`; clases `gallery-*` para estilos.


![](/media/4cfb7627730f820c.webp)

## **Página de detalle: WIKIDETAIL**

En /wiki/:group/:slug, **WikiDetail.tsx** lee parámetros, selecciona dataset e imagen y renderiza un layout de dos columnas: imagen grande a la izquierda; a la derecha **DETAILS** (p. ej. dificultad→estrellas, efectos, drops…) y más información dependiendo de la sección. Incluye un patrón de tabla que mapea cada grupo a su dataset y su mapa de imágenes.

![](/media/9f6f2fb6a39caa12.webp)

#### **Imágenes automáticas por slug (sin imports manuales)**

Con **import.meta.glob** creas mapas {ruta → url} por carpeta y resuelves por **slug** y extensión (.jpg/.png/.webp). Funciona en dev y en build (Vite copia assets con hash).

![](/media/5f9d32822b800bea.webp)

## **Trivia: aprender jugando**

En TriviaStart configuras categoría/dificultad/cantidad, se crea un mazo barajado (Fisher–Yates) y se juega en la misma vista; al terminar, TriviaResults lee la puntuación desde sessionStorage. _Actualmente se barajan las preguntas; el barajado de respuestas es opcional y fácil de añadir después._

![](/media/b46bc1dd2a870528.webp)

Codigo del **Fisher-Yates**:

![](/media/8ba168e00da5f95d.webp)

Página results con mensaje personalizado dependiendo el resultado:

![](/media/051ddf50e0d38aa4.webp)

Pequeña parte del código para mostrar el **resultado**:

![](/media/b0f9c2d6837c5e02.webp)

## **Despliegue en GitHub Pages**

**vite.config.ts** (base en subcarpeta):

![](/media/bcbb02c081e28455.webp)

**Workflow** .github/workflows/deploy.yml (build + deploy con Actions) y **Pages → Source: GitHub Actions**. Para SPA, copia **index.html a 404.html** tras el build para evitar 404 en rutas internas. Incluye también el **flujo de trabajo** recomendado y una checklist (base correcto, basename en router, globs a assets, buscador responsive). 

## **Consejos finales y cómo entra la IA**

-   Pide a la IA el **índice inicial** (secciones, taxonomías, campos) y que señale huecos;
-   Genera **slugs kebab-case** y nombres de archivo de imagen a partir de títulos;
-   Redacta **resúmenes de 120–160 caracteres** para tarjetas y 2–3 párrafos para el detalle;
-   Crea **lotes de preguntas** (1 correcta + 3 distractores) y pega el JSON en questions.json. El barajado, la carga de imágenes y la búsqueda por URL ya están resueltos en el código.
-   **CODEX** es una herramienta muy útil para el desarrollo de la wiki, y **[este artículo](https://saturdays.ai/2025/09/25/descubre-como-conseguir-el-github-student-developer-pack-y-usar-codex-en-vs-code/?utm_source=chatgpt.com)** te enseña a obtenerla y usarla en VS Code.

Siguiendo este esquema y mi repositorio con el proyecto completo, tendrás una wiki que **se lee bien**, **se comparte fácil** y **apetece explorar**. 

Añade tus datasets, nombra las imágenes por _slug_, publica con un _push_ y listo.

Si te animas, amplía categorías, añade relaciones entre fichas o más minijuegos: **la arquitectura está pensada para crecer**.
