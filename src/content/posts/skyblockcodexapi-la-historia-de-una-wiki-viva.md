---
title: "SkyBlock Minecraft: la historia de una wiki viva"
description: "De una isla de SkyBlock a una wiki viva: la experiencia de
  construir una herramienta para organizar información y explorar nuevas
  posibilidades con IA."
pubDate: 2026-04-15
author: Gerard
category: Build with AI
kind: article
tags:
  - Ai4all
  - Gaming
  - IA
  - Inteligencia Artificial
  - minecraft
  - Skyblock
image: /media/a745696023a42da4.webp
imageAlt: "SkyBlock Minecraft: la historia de una wiki viva"
legacyPath: /2026/04/15/skyblockcodexapi-la-historia-de-una-wiki-viva/
sourceUrl: https://saturdays.ai/2026/04/15/skyblockcodexapi-la-historia-de-una-wiki-viva/
sourceId: 11768
language: es
draft: false
---

Todo empezó como empiezan muchas obsesiones en Minecraft: en una isla de SkyBlock, solo, con recursos limitados y una sensación constante de que el verdadero cuello de botella no era el juego… sino la información. Horas saltando entre wikis desactualizadas, foros enterrados y vídeos inconexos para entender una sola mecánica. En ese momento surge la pregunta: ¿y si la wiki no fuera un archivo muerto, sino un sistema vivo que aprende al ritmo del juego?

SkyBlockCodexAPI nace de esa fricción, pero también de esa intuición: convertir el caos de conocimiento de SkyBlock en una infraestructura dinámica donde comunidad, datos y modelos de IA no solo documentan lo que pasa, sino que lo entienden, lo actualizan y lo anticipan.

La primera fase fue bastante directa en apariencia: conectar con la API pública de Hypixel y empezar a mostrar información de:

-   ítems
-   colecciones
-   skills
-   elecciones
-   bingo
-   museum

Sobre el papel, la idea era simple: pedir datos y enseñarlos. En la práctica, no tardamos en descubrir el problema real: la información no llega siempre con el mismo formato ni con el mismo nivel de limpieza.

-   Algunas descripciones venían en texto plano.
-   Otras traían listas.
-   Otras mezclaban lore, perks, unlocks y campos especiales.
-   Y muchas incluían códigos de formato de Minecraft como §7, §a, §d o incluso formatos alternativos como %%light\_purple%%.

Ese fue uno de los primeros momentos en los que la IA empezó a aportar valor de verdad. Nos ayudó a:

-   detectar estructuras repetidas dentro del caos
-   proponer normalizaciones sin perder información
-   transformar formatos pensados para el juego en algo legible para web
-   acelerar iteraciones pequeñas sin perder coherencia visual

No se trataba solo de “traducir JSON”. Se trataba de **interpretar el lenguaje visual del juego** y llevarlo a un entorno web sin que perdiera personalidad.

![](/media/a745696023a42da4.webp)

## El reto de hacerlo estático sin que se sintiera estático

Uno de los condicionantes más importantes del proyecto fue decidir que la aplicación debía vivir en GitHub Pages.

Eso imponía una restricción muy clara: sin backend tradicional.  
Sin servidor persistente.  
Sin lógica privada en el lado del servidor.

Lejos de verlo como un límite, lo tratamos como una restricción creativa. Si queríamos una web estática, entonces teníamos que conseguir que pareciera dinámica usando únicamente:

-   HTML
-   CSS
-   JavaScript
-   llamadas a endpoints públicos
-   una arquitectura ligera pero flexible

La IA fue especialmente útil aquí porque nos ayudó a repensar el proyecto varias veces sin tener que rehacerlo entero. A medida que descubríamos qué endpoints eran públicos, cuáles no, qué cosas se podían consultar directamente y cuáles convenía simplificar, fuimos ajustando la arquitectura con rapidez.

El resultado fue una decisión importante: **apostar por una web muy viva**, pero sin backend propio, aprovechando solo lo que podía resolverse de forma segura y pública. Eso nos permitió mantener el despliegue simple y el proyecto muy fácil de compartir.

## Una dificultad real: el formato visual de Minecraft no existe en la web

Uno de los problemas más curiosos —y más entretenidos— fue el tratamiento del texto.

En SkyBlock, una enorme parte del significado visual está en el color. Un perk no solo dice algo: cómo lo dice también importa. Un texto dorado, una línea en azul claro, un stat en rojo o una rareza en morado no son adornos; son parte de la experiencia del juego.

Ejemplos típicos:

-   +0.5% ☣ Crit Chance
-   +1 ❈ Defense
-   +5 SkyBlock XP
-   perks con colores embebidos
-   nombres de ítems con formato especial

![](/media/60b2c11803ea6d13.webp)

Para mostrar eso bien en una web tuvimos que resolver muchas pequeñas dificultades:

-   interpretar códigos §
-   interpretar formatos alternativos como %%light\_purple%%
-   diferenciar entre símbolo, número y texto
-   respetar el “+” sin romper el color del stat
-   aplicar colores distintos según el atributo

-   mantener la legibilidad visual sin perder el estilo del juego

Aquí la IA fue especialmente útil como herramienta de iteración rápida. Nos ayudó a convertir reglas visuales informales en reglas concretas de renderizado. Y, quizás más importante, a corregir decenas de bugs pequeños que aparecen cuando se trabaja con texto muy irregular.

Muchos de esos errores habrían costado bastante tiempo si hubiéramos ido caso por caso. Con IA, fue mucho más fácil detectar patrones, revisar excepciones y ajustar el resultado hasta que se sintiera bien.

## Más allá del buscador: convertir datos en experiencia

Una vez que el renderizado básico funcionaba, el siguiente paso fue dejar de pensar solo en “mostrar datos” y empezar a pensar en **cómo se navega una wiki**.

Ahí empezaron a aparecer las decisiones que más personalidad le dieron al proyecto:

### Búsqueda y sugerencias

No queríamos un buscador muerto. Queríamos una búsqueda ágil, con autocompletado y sugerencias que dieran sensación de inmediatez.

Se añadieron:

-   sugerencias en tiempo real
-   búsqueda por items, collections y skills
-   ejemplos visuales en la landing
-   una animación de búsqueda para hacer la home más llamativa

Además, trabajamos para que esas sugerencias no fueran solo texto plano, sino que respetaran colores, rarezas y formatos especiales. Así la experiencia del buscador encajaba con la del resto de la aplicación.

## Ítems: de una ficha plana a una ficha realmente útil

La sección de items fue probablemente una de las más trabajadas.

No bastaba con enseñar nombre, categoría e ID. Eso se parecía demasiado a imprimir un JSON en pantalla. Queríamos algo que hablara el idioma del jugador.

Por eso se fue refinando la ficha hasta incluir:

-   nombre con color según rareza
-   soporte para nombres con formato especial
-   imagen del item según su material
-   soporte para cabezas con skin.value
-   soporte para iconos 3D en skull items
-   manejo de imágenes que fallan sin mostrar el icono roto del navegador
-   stats visuales, ordenados y coloreados
-   información del Museum
-   items relacionados dentro del mismo set
-   suma de stats totales del set

También tuvimos que resolver casos muy concretos y muy “SkyBlock”:

-   materiales legacy como gold\_boots que en assets reales son golden\_boots
-   armaduras tintadas de cuero con campo color
-   sets con nombres poco uniformes como:  
    -   Wise Dragon Boots
    -   Boots of the Pack
    -   Perfect Boots – Tier XII

Aquí la IA volvió a ser muy útil no por “inventar” la solución, sino por ayudarnos a generalizar reglas. Cuando detectábamos un caso raro, podíamos iterar rápido sobre la lógica y convertir excepciones en patrones reutilizables. Llegando al resultado final

![](/media/d93601aec0946059.webp)

## Collections: no solo tiers, sino contexto

La parte de collections también evolucionó bastante.

Al principio bastaba con enseñar categoría y tiers. Pero una vez que empezamos a usar la web como una herramienta real, quedó claro que eso se quedaba corto.

Terminamos añadiendo:

-   iconos por categoría
-   visualización horizontal de tiers
-   unlocks dentro de cada tier
-   resaltado de SkyBlock XP
-   unlocks clicables cuando apuntan a items reales
-   soporte para recipes y minion recipes

Eso permitió que una colección no fuera solo una lista de requisitos, sino una pequeña ruta navegable dentro de la propia wiki. Desde una colección puedes saltar a un item, y desde el item seguir explorando otras partes del contenido.

![](/media/55bf39b6538a4179.webp)

## Skills: niveles, XP y recompensas con contexto

La sección de skills también requirió una buena cantidad de trabajo. No solo por la estructura de datos, sino porque había que interpretar correctamente la información del API.

La API no daba la experiencia “por nivel”, sino la experiencia total acumulada. Así que hubo que recalcular y representar:

-   nivel
-   XP necesaria para ese nivel
-   XP total
-   unlocks por nivel

![](/media/80d3105fe96511da.webp)

Después añadimos un modal de detalle para cada nivel, donde se muestran los unlocks con formato visual mejorado. Y ahí se volvió a repetir la misma idea que ya habíamos aprendido: no basta con mostrar texto; hay que respetar el lenguaje visual del juego.

![](/media/d584e035704e0b5d.webp)

## Mayor y elecciones: cuando el modelo de datos cambia según el contexto

La parte de Mayor fue especialmente interesante porque no solo había que mostrar información, sino también interpretar situaciones distintas:

-   mayor actual
-   minister
-   perks
-   elecciones activas
-   candidatos
-   porcentajes de votos
-   posibles special mayors

A nivel de interfaz, acabamos separando la página en dos columnas:

-   a la izquierda, el gabinete actual
-   a la derecha, las votaciones actuales

Después fuimos refinando la presentación:

-   perks con título y descripción
-   colores de Minecraft en descripciones
-   detección de minister perks
-   años visibles
-   votos mostrados como x / y z%
-   orden de candidatos de mayor a menor voto

Y, como suele pasar en proyectos reales, aparecieron casos especiales. Por ejemplo, cuando la estructura de election no estaba exactamente donde esperábamos o cuando se estaba mostrando la elección anterior en vez de la actual.

Ese tipo de problemas son justamente donde la IA ahorra tiempo de verdad: no porque “adivine” la respuesta, sino porque permite probar rápidamente estrategias de parsing más robustas hasta dar con una solución consistente.

![](/media/5599f5e7374f6787.webp)

## Bingo: convertir una API en una carta jugable

La subpágina de Bingo fue otra de las partes más divertidas de construir.

No queríamos listar objetivos en vertical. Eso no se parecía en nada a la experiencia real del juego. Así que lo convertimos en una **carta 5×5**, visual y navegable.

Se añadieron:

-   grid 5×5
-   modal por objetivo
-   full lore dentro del modal
-   hover interactivo
-   detección de goals comunitarias
-   coloreado progresivo según tier alcanzado
-   información de puntos contextual
-   navegación separada en su propia subpágina

Con Bingo, más que en ningún otro módulo, se vio claramente la diferencia entre “mostrar datos” y “diseñar una experiencia”. Ese cambio de mentalidad fue una de las mejores decisiones del proyecto.

![](/media/3f5b280284f99451.webp)

## Museum: organizar sin saturar

La sección de Museum nació como una necesidad natural del proyecto. Una vez que ya teníamos items bien renderizados, tenía todo el sentido construir un navegador dedicado que permitiera explorar:

-   qué items acepta el Museum
-   cuánta XP da cada uno
-   a qué categoría pertenece

Además, se trabajó específicamente para evitar ruido innecesario:

-   deduplicación de armor sets
-   visualización limpia por categorías
-   iconos representativos
-   navegación desde Museum al item correspondiente

Y también aquí aparecieron los matices: sets completos, icono principal del helmet en Museum, distintas formas de extraer la XP de donación, etc.

![](/media/33910fec97354202.webp)

## Lo que Codex aportó de verdad

A estas alturas, la contribución de la IA se puede resumir muy bien: **menos fricción, más iteración, más consistencia**.

-   No sustituyó criterio.
-   No diseñó por sí sola.
-   No tomó decisiones importantes sin supervisión.

Pero sí hizo posible trabajar mucho más rápido en tareas como:

-   detectar patrones en datos inconsistentes
-   proponer estructuras de render más limpias
-   mantener coherencia entre páginas
-   depurar bugs visuales pequeños pero molestos
-   ajustar casos especiales sin frenar el ritmo del proyecto

Y eso tiene un valor enorme, porque en proyectos así el enemigo real no suele ser la complejidad técnica pura, sino el desgaste acumulado de cien pequeños detalles.

La IA ayudó precisamente ahí: en mantener el proyecto en movimiento.

## Resultado actual

SkyBlockCodexAPI hoy ya no es una idea, sino una base sólida y funcional.

Actualmente incluye:

-   buscador rápido
-   sugerencias inteligentes
-   renderizado fiel al lenguaje visual de SkyBlock
-   fichas de items mucho más orientadas al jugador
-   páginas separadas para Mayor, Bingo y Museum
-   soporte para colores, perks, rarezas y formatos especiales
-   navegación clara entre secciones
-   despliegue en GitHub Pages

Todo ello sin backend tradicional, manteniendo una arquitectura ligera y fácil de compartir.

## Código y aplicación

Podéis acceder al código fuente en:  
[Código fuente de SkyBlockCodexAPI](https://github.com/SaturdaysAI/SkyblockCodexAPI/tree/master)

Y tenéis acceso a la aplicación en:  
[Explorar el museo en la aplicación](https://saturdaysai.github.io/SkyblockCodexAPI/museum.html)
