---
title: "Construí una app de Barranquismo sin escribir código: mi experiencia
  creando una PWA con IA"
description: Descubre paso a paso cómo desarrollé la webapp de Barranquismo que
  no encontraba, con ChatGPT, Codex e IA. Código, guía, ejemplos y consejos de
  este aprendizaje para que tú lo puedas aplicar.
pubDate: 2025-10-28
author: Jose Ramon García
category: Community
kind: article
tags:
  - Codex
  - Deep Learning
  - IA
  - Inteligencia Artificial
  - Machine Learning
image: /media/12609bf1a902b1ad.webp
imageAlt: "Construí una app de Barranquismo sin escribir código: mi experiencia
  creando una PWA con IA"
legacyPath: /2025/10/28/construi-una-app-completa-sin-escribir-codigo-mi-experiencia-creando-una-pwa-de-barranquismo-con-ia/
sourceUrl: https://saturdays.ai/2025/10/28/construi-una-app-completa-sin-escribir-codigo-mi-experiencia-creando-una-pwa-de-barranquismo-con-ia/
sourceId: 11403
language: es
draft: false
---

* * *

## Introducción

Como muchos amantes de la montaña, me gustaría la posibilidad de tener una página minimalista, donde encontrar la información de los barrancos de manera sencilla y que me permitiera consultar la los tracks cuando no tuviera cobertura en lugar de saltar entre diez webs para encontrar información fiable de un barranco, además,  _Wikiloc_ me daba el GPS, _Descente-Canyon_ los datos técnicos, pero nada estaba unificado y, sobre todo, nada funcionaba bien sin cobertura en mitad de la nada.

Así que decidí construirla yo mismo, aquí tienes el enlace al resultado: [https://saturdaysai.github.io/barranquismo/](https://saturdaysai.github.io/barranquismo/)

![](/media/17313794ebecf96b.webp)

Quería una web sencilla: filtros, mapas y que funciona 100% offline. Pero esta vez, decidí no hacerlo solo. Y no solo eso, sino que no escribiría una línea de código. Asi que busqué dos compañeros que lo hicieran por mi:

-   **[ChatGPT](https://chatgpt.com/)**, como consultor técnico y de UX.
-   **[Codex](https://onedollarvps.com/es/blogs/how-to-use-codex-in-vscode.html)** (integrado en [Visual Studio Code](https://certidevs.com/tutorial-visual-studio-code-instalacion)), como programador ejecutor.

Mi objetivo: demostrar que, con buena planificación y prompts precisos, una sola persona puede construir una aplicación funcional, desde cero, usando solo IA.

## Fase 1. Planificación y elección del stack

Antes de escribir una línea de código, necesitaba un plan sólido. Mi primera interacción fue con ChatGPT, para definir la arquitectura tecnológica.

> **Prompt clave a ChatGPT:**  
> `“Quiero construir una web para un inventario de barrancos. Los usuarios deben poder filtrar por dificultad y ver mapas. Lo más importante: debe funcionar offline. No quiero usar backend y planeo desplegarla gratis en GitHub Pages. ¿Qué stack tecnológico me recomiendas y cómo debería estructurar el proyecto?”`

La IA recomendó Vite + React por su rapidez y facilidad para configurar Service Workers, esenciales para el modo offline. Con eso, ya tenía la brújula técnica del proyecto.

![](/media/d68be80d165f8cdc.webp)

## Fase 2. Inicialización del proyecto en Visual Studio Code

Abrí una nueva carpeta (`canyoningApp`) y, desde Visual Studio Code, lancé Codex en modo agente. Seleccioné la IA GPT-5 Codex Preview y le pedí iniciar el proyecto paso a paso. Introduciendo el prompt que me había facilitado ChatGPT modificando un poco el formato para que lo adaptada a mis necesitades, incorporando paradas y que hubiera retroalimentación durante el proceso.

![](/media/fcbe5f4e2ef67bbe.webp)

## Fase 3. Diseño de la estructura base

El siguiente paso fue definir la estructura de navegación antes de cargar datos o diseñar la interfaz.

> **Prompt de ChatGPT a Codex:**
> 
> -   Desarrollaremos una web app estática tipo PWA con fichas descriptivas de cada barranco, material necesario y enlaces externos (Wikiloc para aproximación y retorno).Quiero que me ayudes paso a paso con este flujo de trabajo estructurado:
> -   Aterriza la idea (concepto): define el propósito, las funcionalidades clave, y el stack tecnológico (React + Vite o JS puro).
> -   Planifica la arquitectura: estructura de carpetas, uso de localStorage en lugar de base de datos, sin autenticación, todo client-side, apto para despliegue en GitHub Pages.
> -   Construye el proyecto: crea el código base con documentación en comentarios y guíame fase por fase (estructura, página principal, fichas, mapa, persistencia local, filtros, diseño, PWA).
> -   Documenta el proceso: cada paso debe incluir explicaciones breves, código comentado, y notas para poder luego redactar un artículo/tutorial.
> -   Prepara el despliegue: muestra cómo configurar vite.config.ts o index.html para GitHub Pages.Condiciones:
> -   Toda la persistencia debe hacerse con localStorage.
> -   No usar ningún backend ni login.
> -   Código modular, limpio y comentado.
> -   Usa inglés en el código, pero español en las explicaciones.
> -   Pide validación antes de avanzar a cada fase.
> -   La app debe ser responsive y ligera. Empieza con la fase 1 (concepto) y espérame antes de pasar a la siguiente fase. Cuando te diga ‘sigue’, pasas a la siguiente.
> -   Genera la estructura de componentes de React (por carpetas) y el código de para gestionar esta navegación de 5 pestañas y la ruta de detalle anidada»
> 
> A continuación me solicitó varias preguntas en relación a lo que había entendido (codex) para seguir, la con la ejecución:
> 
> ![](/media/2ec21613a0af0d7d.webp)
> 
> En cada una de las respuestas que me iba dando le consultaba a ChatGPT si Codex lo estaba haciendo correctamente, en caso afirmativo proseguía con la ejecución:
> 
> ![](/media/81403f8fa0785c4a.webp)
> 
> El resultado fue un esqueleto modular de componentes con rutas, páginas y una estructura de carpetas profesional. Codex se encargó de crear los archivos iniciales, dependencias y configuración del proyecto automáticamente.

Ahora sí, Codex empezó a trabajar, generando carpetas y archivos, durante el proceso va preguntado si quieres ejecutar algunas instrucciones de sistema y de depuración, a lo que le dices que si para que hagas las modificaciones que tiene que hacer.

![](/media/fba7559eb8068664.webp)

Tras unos minutos, Codex generó toda la estructura de carpetas, dependencias y scripts.

Lo mejor de todo es que el proyecto compilaba sin ningún error de compilación ni de ejecución, simplemente increíble… Una vez finalizado probé en arrancar el servidor en local. Pero no sabía cómo levantar la web app así que le pregunté:

![](/media/8c517a1fa21f74ea.webp)

Ahora hay varias opciones: o lo ejecutas desde una consola externa o en mi caso use la que ya está instalada en VSC en la pestaña intermedia terminal:

![](/media/57f77d0a55ea4520.webp)

Una vez lanzada la web app, intento conectarme al navegador para comprobar si funciona:

![](/media/cff6357dfc6391b5.webp)

La página funcionaba. **¡En menos de 30 min ya tenía una página lista!** 

## Fase 4. Subir la app a GitHub Pages

La idea inicial era aprovechar el servicio que dispone GitHub para alojar la web app, por lo que pedí ayuda a codex a como realizarlo correctamente:

Antes de empezar si no tenemos cuenta de [GitHub](https://github.com/), se crea una, es totalmente gratuita. Una vez creada, creamos el repositorio, es muy importante que se llame como vuestra carpeta de proyecto ya que si no las dependencias no funcionarán correctamente.

![](/media/d6784dc8a83c7ee7.webp)

![](/media/02a0407308090bf2.webp)

```
Una vez creado, subimos el repositorio con las siguientes instrucciones desde la carpeta raíz, podemos hacerlo desde una consola o desde la terminal:
```

Si no tenemos Git habrá que instalarlo, lo puedes descargar [aquí](https://git-scm.com/install/windows). Una vez [instalado](https://www.datacamp.com/es/tutorial/how-to-install-git-for-windows):

```
git init // Inicializa un proyecto git en local

git add . // Agrega archivos al repositorio

git commit -m "Primer commit"       // Guarda los cambios en tu repositorio local

git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git
```

// Vincula tu repositorio con GitHub.

```
git push -u origin main // Sube tus cambios a GitHub 
```

Ahora ya tenemos subido el mismo repositorio que tenemos en local con GitHub, ahora cada cambio que queramos hacer deberemos empezar los pasos desde el 2 y muy importante poner a los commits nombres de las modificaciones que vayamos haciendo, así luego es más fácil volver a un estado anterior sabiendo que modificaciones hicimos en ese momento.

Una vez ya tenemos el repositorio le preguntamos a codex como subirlo a GitHub pages correctamente:

![](/media/63ebd3515384a21b.webp)

seguimos las instrucciones:

![](/media/3697a5407872a96d.webp)

y accedemos a la web app desde GitHub:

![](/media/22aca04b49eab690.webp)

Como podemos comprobar, la versión inicial es funcional pero faltan los datos en formato JSON y mejorar la estética. 

## Fase 5 : Recopilación de datos e importar a JSON

Recopilar datos de cada uno de los barrancos uno a uno es muy tedioso, además corres el riesgo de equivocarte al extrapolar los datos, por lo que le pregunto a Codex si me puede ayudar: 

![](/media/ec259bbe46f83713.webp)

Su respuesta es un script

![](/media/9ede2f6773066279.webp)

Vamos un paso más allá, le decimos que genere el mismo un script y que él mismo lo ejecute y que además lo guarde en el el archivo JSON con los barrancos que pusimos ficticios. 

![](/media/ff43c915c1542432.webp)

El mayor desafío era la información. Los datos estaban en fuentes abiertas, en diferentes formatos y cada página tenía una descripción distinta de cada atributo y no mantienen una coherencia  por lo que los datos que obtuve estaban totalmente desestructurados. Necesitaba un _pipeline_ de limpieza.

## Fase 6. Normalización de datos con IA

Como datos de los barrancos provenían de distintas fuentes (_Descente-Canyon_, _Wikiloc_, etc.), y estaban desordenados y con distintos formatos. Necesitaba un script en Node.js para limpiarlos y unificarlos.

> **Prompt a Codex:**  
> `“Tengo varios JSON con datos de barrancos. Necesito un script que lea todos, normalice los nombres, extraiga coordenadas y unifique los niveles de dificultad. Exporta un único dataset.json final.”`

Codex generó un script de limpieza automatizado. El resultado: un archivo `dataset.json` consolidado, que serviría como base de datos local de la aplicación.

## Fase 7. Creación de la interfaz React

Con el dataset listo, era momento de visualizar los datos. En lugar de escribir componentes manualmente, los pedí directamente a Codex.

> **Prompt 1:**  
> `“Crea un componente que importe 'dataset.json'. Debe incluir buscador y filtros dinámicos (por dificultad y zona). Mapea los resultados en tarjetas (‘BarrancoCard’) enlazadas a una vista de detalle.”`

> **Prompt 2:**  
> `“Crea un componente ‘FichaDetalle’. Muestra datos del barranco: rápel máximo, tiempos, coordenadas y enlaces.”`
> 
> Codex generó la estructura React completa y los componentes necesarios. Incluso añadió un mapa interactivo con **Leaflet** tras otro prompt específico.

## Fase 8. Añadir La «memoria» offline

La app necesitaba “recordar” datos del usuario, como la checklist y valoraciones.

> **Prompt a Codex:**  
> `“En mi app, los usuarios deben valorar un barranco con estrellas y añadirlo a una ‘Checklist’. Estos datos deben persistir incluso sin conexión. Usa localStorage.”`

Codex implementó la lógica de almacenamiento local y la recuperación automática. Luego configuramos el Service Worker para hacer la app totalmente funcional offline: ya era una PWA instalable y usable sin cobertura.

## Fase 9. Mejora de diseño UX/UI con ChatGPT

La funcionalidad estaba lista, pero la interfaz necesitaba un toque profesional. Volví a ChatGPT, esta vez como diseñador UX especializado en entornos outdoor.

> **Prompt clave:**  
> `“Estoy diseñando esta app para usarla en montaña, bajo sol intenso y con reflejos. Dame recomendaciones de UX/UI y un prompt detallado para Codex como si fuera un diseñador profesional.”`

\# CONTEXTO DEL PROYECTO

Estoy desarrollando una PWA en React + Vite llamada “Barranquismo”, pensada para usarse en montaña y entornos naturales. 

Los usuarios la consultarán en condiciones reales de campo: con luz solar intensa, reflejos, guantes, y conexión limitada. 

La app muestra fichas de barrancos con dificultad, material, tiempos y enlaces a Wikiloc. 

No tiene backend: todo funciona en el cliente (localStorage, JSON local) y se desplegará en GitHub Pages.

\# OBJETIVO

Quiero que actúes como un \*\*diseñador profesional de UX/UI especializado en entornos outdoor, accesibilidad y diseño funcional\*\*. 

Tu tarea es mejorar el diseño visual y la experiencia de uso de la aplicación \*\*para que sea bonita, legible y profesional\*\*, sin perder simplicidad ni rendimiento.  

Dame sugerencias detalladas de diseño y, si es posible, fragmentos de código (JSX, CSS o Tailwind) listos para implementar.

\# QUÉ QUIERO CONSEGUIR

– Una interfaz \*\*bonita y coherente\*\*, digna de un producto profesional.

– \*\*Alta legibilidad bajo el sol\*\*: textos grandes, fuentes claras y contraste fuerte.

– \*\*Componentes visualmente atractivos\*\* pero sencillos de renderizar en React (sin dependencias pesadas).

– \*\*Jerarquía visual clara\*\* (colores, tamaños y espacios bien definidos).

– \*\*Estilo outdoor\*\*, natural y moderno (inspirado en apps como Komoot, AllTrails o Wikiloc).

– \*\*Interacción táctil cómoda\*\* (botones amplios, feedback visual inmediato).

– \*\*Adaptación móvil total\*\* (mobile-first con breakpoints a tablet).

– Que respete buenas prácticas de \*\*accesibilidad (WCAG 2.1)\*\*.

– Que proponga una \*\*paleta de colores y tipografía profesional\*\*, ideal para sol directo y contextos naturales.

\# PUNTOS CLAVE QUE DEBES CUBRIR

1\. \*\*Tipografía\*\*

   – Usa fuentes sans-serif legibles (ej. Inter, Poppins, Nunito, Roboto Flex).

   – Tamaños: mínimo 16–18px para texto, 22–28px para títulos.

   – Buen espaciado (\`letter-spacing\`, \`line-height\`) para lectura bajo reflejos.

2\. \*\*Colores y contraste\*\*

   – Contraste alto (WCAG AAA) entre fondo y texto.

   – Propón una paleta profesional inspirada en la naturaleza (azules, beige, verdes oscuros, grises cálidos).

   – Incluye un modo alto contraste o “modo exterior”.

3\. \*\*Componentes y botones\*\*

   – Áreas táctiles grandes (mínimo 44x44px).

   – Botones redondeados con sombra suave o borde definido.

   – Feedback visual al pulsar (cambio de color, opacidad o elevación).

   – Mantén consistencia en iconos, sombras y radios.

4\. \*\*Diseño visual\*\*

   – Minimalismo funcional: sin recargar, pero agradable visualmente.

   – Distribución clara: encabezado fijo, lista de barrancos con tarjetas (cards) bien separadas y detalles accesibles.

   – Uso equilibrado de color para jerarquía: títulos, botones primarios, acciones secundarias.

5\. \*\*Estilo global\*\*

   – Insp

iración en Material Design y Fluent UI, adaptado al uso outdoor.

   – Animaciones sutiles (fade, scale) solo si no afectan al rendimiento.

   – Bordes suaves, sombras naturales, espacios amplios.

   – Consistencia entre Home, Detail y Checklist.

6\. \*\*PWA y rendimiento\*\*

   – Fuentes y colores precargados.

   – No uses imágenes pesadas, usa SVG o íconos vectoriales.

   – Optimiza para modo offline (mínimo CSS y assets).

7\. \*\*Accesibilidad\*\*

   – Contraste mínimo 4.5:1 en todos los textos.

   – Colores accesibles para daltónicos (usa color+forma).

   – Texto alternativo en iconos, roles ARIA en botones.

\# FORMATO DE RESPUESTA ESPERADO

– ✅ Lista de recomendaciones de UX/UI ordenadas por prioridad (alta, media, baja).

– 🎨 Propuesta de \*\*paleta de colores y tipografía\*\* profesional.

– 💻 Ejemplos concretos de CSS o Tailwind para implementar.

– 🧠 Justificación breve de cada sugerencia (por qué mejora la visibilidad, estética o usabilidad).

– 📱 Mockup textual o wireframe (opcional) para la estructura ideal de la pantalla principal.

\# TECNOLOGÍAS

– React + Vite

– Tailwind o CSS Modules

– LocalStorage

– GitHub Pages (PWA estática)

\# INSTRUCCIÓN FINAL

Actúa como un diseñador UX/UI profesional.  

No des teoría: \*\*dame propuestas listas para aplicar\*\* con código o estilos concretos.  

Equilibra \*\*belleza, usabilidad y funcionalidad outdoor\*\*.  

El resultado debe parecer hecho por un diseñador experto, pero optimizado para React y PWA ligeras.

El resultado fue una guía completa: tipografías legibles (_Inter_, _Poppins_), alto contraste, botones grandes, jerarquía visual clara y estilo _outdoor_ inspirado en _Komoot_ y _AllTrails_. Codex aplicó las mejoras automáticamente y la interfaz ganó claridad, accesibilidad y coherencia.

## Fase 10. Despliegue final y pruebas

Una vez pedido esos cambios a Codex, modificó lo que consideró necesario, después de unos minutos (es fascinante ver como va modificando a tiempo real el código) ya estaba lista una versión como ya que necesitaba:

volví a visualizar la página ejecutando en consola:

![](/media/5fbab5127bd562ca.webp)

entro en el navegador y…

![](/media/34cc8fc145d8496f.webp)

La página que había creado ya estaba lista y era funcional. Tras verificar los cambios, ejecuté un nuevo `git push` y esperé la actualización de GitHub Pages. A veces los cambios tardan en reflejarse por el almacenamiento en caché o localStorage, pero tras limpiar el navegador, la nueva versión funcionaba perfectamente.

![](/media/1c166b6c473fe698.webp)

[![](/media/47192cfa909ce56b.webp)](/media/47192cfa909ce56b.webp)

Ya tenía una app completa, funcional, ligera y 100% generada con IA**.**

## Conclusiones y aprendizajes

Desarrollar esta aplicación fue mucho más que programar: fue aprender a comunicarme con una IA. El rol del desarrollador cambia: ya no se trata de escribir código, sino de **formular problemas, guiar al sistema y validar resultados.**

-   La precisión de los prompts lo es todo**.** Un buen contexto genera código limpio y funcional.
-   La validación humana sigue siendo esencial**.** La IA propone, pero tú decides qué aceptar o ajustar.
-   El flujo de trabajo híbrido (ChatGPT + Codex) es tremendamente eficiente para proyectos personales o prototipos.
-   GitHub Pages y PWA son la pareja perfecta para proyectos sin backend.

## Recursos y enlaces

-   **Repositorio GitHub:** [https://github.com/SaturdaysAI/barranquismo](https://github.com/SaturdaysAI/barranquismo)
-   **Framework:** React + Vite
-   **IA utilizadas:** ChatGPT (asistente técnico y UX) y Codex (generación de código)
-   **Librerías clave:** Leaflet, Workbox, TailwindCSS
-   **Despliegue:** GitHub Pages (PWA estática)
-   **Web**: [https://saturdaysai.github.io/barranquismo/](https://saturdaysai.github.io/barranquismo/)

## Sobre el autor

**José Ramón García**  
Estudiante de Ingeniería Informática, apasionado por la tecnología aplicada a la naturaleza. Combina su experiencia profesional en la industria alimentaria con proyectos de software y apps outdoor. Explora cómo [www.saturdays.ai](http://www.saturdays.ai) utiliza **la inteligencia artificial para potenciar la creatividad y la productividad humana** en entornos reales.
