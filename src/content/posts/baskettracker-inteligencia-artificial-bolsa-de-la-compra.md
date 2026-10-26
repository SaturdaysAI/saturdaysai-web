---
title: "BasketTracker.AI: Inteligencia artificial para la bolsa de la compra"
description: Latam online. Primera Edición. 2020 Lo que no se mide, no se puede
  mejorar… Las altas y bajas en los precios son un fenómeno que todos vivimos a
  diario. Es tan cotidiano que muchos damos por hecho que se trata de una
  situación…
pubDate: 2022-03-16
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Fin de la pobreza
  - NLP
  - Regresión
  - Tabular
image: /media/7b3e294792f33e73.webp
imageAlt: "BasketTracker.AI: Inteligencia artificial para la bolsa de la compra"
legacyPath: /2022/03/16/baskettracker-inteligencia-artificial-bolsa-de-la-compra/
sourceUrl: https://saturdays.ai/2022/03/16/baskettracker-inteligencia-artificial-bolsa-de-la-compra/
sourceId: 6564
language: es
draft: false
---

![BasketTracker.AI](/media/7b3e294792f33e73.webp)

[Latam online](https://saturdays.ai/latam-online/). Primera Edición. 2020

## _Lo que no se mide, no se puede mejorar…_

Las altas y bajas en los precios son un fenómeno que todos vivimos a diario. Es tan cotidiano que muchos damos por hecho que se trata de una situación que no podemos cambiar y que sólo nos queda ajustar nuestro presupuesto ante los incrementos que suceden.

¿Será posible crear herramientas que nos ayuden a adaptarnos mejor al cambio en los precios? Nosotros creemos que sí.

En este artículo les mostraremos cómo fué que mientras aprendíamos un poco de Inteligencia Artificial también implementamos un prototipo para monitorear precios de tiendas en línea.

Muchas veces sin saber compramos bienes cuyo precio está en aumento y según la ley de oferta y demanda, solo reforzamos su tendencia alcista cuando consumimos estos productos. Si por el contrario, supiéramos cómo sustituir estos artículos caros con “equivalentes” de menor costo, a largo plazo ayudaríamos a generar un nivel de precios más bajo.

Así que nos propusimos hacer un prototipo para monitorear dichos precios. Desde los primeros intercambios de ideas que tuvimos nos dimos cuenta que eran varios los desafíos que debíamos superar para lograr nuestro propósito.

## ¿Y dónde están los precios?

La primera pregunta que planteamos fue cuáles serían los precios que nos interesaba recabar. Decidimos iniciar con algunos artículos de consumo básico: (a) huevo, (b) frijol, (c) papel higiénico, (d) café y (e) tortillas.

Lo más sorprendente de todo es que la mayoría de la información de precios se encontraba a nuestro alcance. Existe una gran cantidad de supermercados que publican catálogos de sus productos en línea. Para la fase inicial decidimos extraer los precios de los artículos de dos supermercados mexicanos: [Soriana](https://www.soriana.com/) y [Superama](https://www.superama.com.mx/).

Nuestros compañeros Gabriela y Gustavo trabajaron en la extracción de precios, utilizando [web scraping](https://es.wikipedia.org/wiki/Web_scraping). El web scraping es una técnica que permite automatizar la extracción de datos alojados en páginas web. En la siguiente imagen mostramos la información que deseamos extraer desde el sitio web:

![Captura de pantalla del sitio Soriana para el producto “huevo”](/media/af3bcd9ef6c23ca4.webp)

_Captura de pantalla del sitio Soriana para el producto “huevo”_

Con sus habilidades de Ingeniería de Datos, nuestros _AI fellows_ desarrollaron una serie de scripts con Python, Selenium, entre otras herramientas. Como resultado de esta etapa de extracción, consiguieron generar nuestros primeros conjuntos de datos en bruto (_Raw Datasets_):

![Precio de los huevos](/media/aea1f75265b329eb.webp)

_Raw Dataset Superama_

![Precio de los huevos II](/media/495315de7d71efbf.webp)

_Raw Dataset Soriana_

Entre los principales retos enfrentados fueron: (a) Simular el comportamiento de una persona. Si la velocidad de generación de consultas al sitio web es mayor que la que un usuario corriente haría, normalmente los sitios bloquean a los scripts. Por ello fue necesario considerar retrasos en las consultas para evitar ser bloqueados. (b) La estructura de los sitios web, aunque similar, es diferente. Fue necesario hacer pequeñas adecuaciones para cada uno de los sitios.

## Integración de datos con AI

Cuando revisamos los primeros _Raw Data sets_ generados, observamos que era necesario trabajar en homologar criterios de nomenclatura entre las fuentes Soriana y Superama, sobre todo en el campo “descripción”.

Ramón y Juan Esteban tomaron la iniciativa para aplicar técnicas de **Natural Language Processing (NLP)** para integrar los Raw Data sets obtenidos de Soriana y Superama.

Nuestros colegas propusieron enriquecer el Raw Dataset con las siguientes columnas:

-   Tipo: Es el tipo principal de producto. Por ejemplo, “huevo” puede ser un descriptor para cualquier marca de huevo.
-   Tipo\_2 : Es el segundo descriptor, útil para construir una subcategoría al Tipo. Por ejemplo, huevo blanco y huevo rojo son dos tipos de huevo que se necesita diferenciar.
-   Marca: Información sobre marca y submarca de cada Tipo.
-   Empaque: Empaque de cada Tipo.
-   Contenido: Cantidad de cada Tipo en un Empaque.
-   Unidad de medida: Corresponde a cada cantidad en Contenido.

Los scripts que desarrollaron emplearon las siguientes bibliotecas de Python:

-   Nltk
-   Sklearn
-   Fancyimpute
-   Pandas
-   Numpy
-   Unidecode
-   Re

Este diagrama describe los pasos para unificar los datos de Soriana y Superama:

![Diagrama de flujo para limpieza de datos](/media/c25b47f797f9cc99.webp)

_Diagrama de flujo para limpieza de datos_

Adicional de las técnicas de lenguaje natural descritas en el diagrama, realizaron la simplificación del diccionario de categorías de forma manual, con la que evitaron considerar palabras derivadas o aquellas que no aportan información valiosa.

También realizaron la imputación de valores faltantes aplicando una técnica condicional con la que la inferencia de valores imputados se realiza utilizando una secuencia lógica. Por ejemplo, si conocemos que comúnmente la unidad de medida de la leche es por L o ml, la categorización sigue una secuencia lógica para imputar este valor.

Aplicando las técnicas de lenguaje natural más la imputación descrita, generaron el siguiente conjunto de datos enriquecido.

![Conjunto de datos depurado](/media/5135cceab22ac58d.webp)

_Conjunto de datos depurado_

Los principales retos de la metodología empleada se exponen a continuación: (1) La creación manual de los diccionarios de palabras para poder categorizar en las columnas de interés correspondientes. Por ejemplo, la categorización del tipo de alimento que se describe. (2) Procesar palabras nunca antes vistas por el diccionario. Los anglicismos juegan un papel importante en el léxico hispano por lo que un reto importante es la traducción de los anglicismos o en su defecto incluirlos en el diccionario de categorías.

## Precios como series de tiempo

Con un Data set depurado de precios, pareciera que tendríamos los elementos necesarios para hacer análisis más detallados como pronósticos de precios. Pero debido a que la dinámica de precios presenta cambios significativos en espacios de tiempo de una semana, para el tiempo que escribimos este artículo solo contábamos con unos cuantos puntos recolectados semanalmente.

De acuerdo con un artículo escrito por Box y Jenkins en 1976, se recomienda al menos 50 observaciones para realizar pronósticos confiables y en trabajos más actuales, como el de Otero y Trujillo en 1998, se han obtenido buenos resultados con 30 observaciones.

A pesar de esta situación adversa, dos miembros del equipo, John y Mario, quisimos iniciar el análisis de series de tiempo con un conjunto de datos independiente que si contara con dicha cantidad de observaciones, para simular el pronóstico de los precios futuros con el criterio de que el **modelado sea automático,** es decir, que se seleccione el modelo con mejor MAPE (Mean Absolute Percentage Error). Analizamos los siguientes algoritmos:(1) Auto Arima, (2) Suavizado Exponencial triple, (3) Facebook Prophet.

A continuación mostramos los resultados que obtuvimos al modelar cuatro acciones (spx, dax, ftse, nikkei) que se cotizan en diferentes bolsas, con el algoritmo que obtuvo el mejor desempeño:

![](/media/9b537e03f50818de.webp)

## BasketTracker.AI: Monitor de precios

Finalmente, coronamos el esfuerzo descrito anteriormente con una herramienta de visualización que nos permitiera sacar provecho de nuestro Dataset depurado y enriquecido, para ayudar a la toma de decisiones en precios.

Nuestro compañero Juan Manuel y nuestro mentor David, tomaron el liderazgo de la comunicación visual, así como del despliegue del monitor BasketTracker.AI en una aplicación web.

A continuación presentamos los elementos que elegimos comunicar visualmente: (1) Series de tiempo y predicción, (2) Cálculo de inflación de productos, (3) Comparativa entre marcas y tiendas, (4) Top 3 de artículos con mayor/menor costo y algunos KPIs

Consideramos que todo lo anterior debíamos consolidarlo en un solo punto. Debería ser algo de fácil acceso que reuniera todos los elementos que definimos desarrollar en un inicio y presentarlos de manera sencilla hacia el usuario final. Por esto decidimos que la mejor manera de lograrlo sería con un dashboard general de resultados.

Se crearon dos dashboards interactivos, el primero usando el software Tableau y el segundo la herramienta QuickSight de Amazon.

A continuación mostramos algunos screenshots de los dashboards:

![](/media/2f1933f09ce1a3d1.webp)

![](/media/ecd78a74a8a035d4.webp)

![](/media/fe444febd9dee276.webp)

![](/media/ec9256e45741346d.webp)

![](/media/1f083e1a327b0ced.webp)

![](/media/84471128bc0ea7d0.webp)

![](/media/79f585cfeecd5b03.webp)

Dashboard QuickSight

![](/media/37f9fc576a5d0e8a.webp)

_Dashboard Tableau_

## Conclusiones

En este artículo compartimos nuestra experiencia desarrollando un monitor de precios como proyecto de equipo en la primera edición de [Saturdays AI](https://www.saturdays.ai/?utm_source=blog&utm_medium=articulo&utm_campaign=basket_tracker) Latinoamérica. Nos sentimos satisfechos de haber acoplado diferentes disciplinas dentro de la Inteligencia Artificial, como son NLP y pronóstico de series de tiempo, con aspectos de integración de datos y desarrollo web y de Business Intelligence para construir una prueba de concepto para monitorear precios.

Desde luego que hay todavía muchas mejoras que realizar y probablemente las desarrollaremos en futuras versiones de nuestro trabajo.

Esperamos que este artículo los motive a fortalecer sus habilidades en Inteligencia Artificial, poniendo en práctica sus conocimientos para aprender haciendo. Hasta la próxima.

## Bibliografía

Box, G. E. P., and G. M. Jenkins. 1976: Time Series Analysis: Forecasting and Control. Ed. Holden-day. San Francisco.

Otero, J; Trujillo, F. 1998: “Forecasting Tourism Demand in the Short Term: The Case of Andalusian Hotel Establishments”, 4th International Forum on Tourism Statistics. Copenhague

## Integrantes

-   Gabriela Vega
-   Gustavo Leyva
-   Juan Esteban Zurita
-   Juan Manuel Ahumada
-   John Jacho
-   Ramón Díaz
-   Mario Fonseca

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/iuu59W9TirQ?start=2380&feature=oembed)

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esta aplicación: [https://github.com/SaturdaysAI/Projects/tree/master/LATAM\_remote/equipo\_dorado](https://github.com/SaturdaysAI/Projects/tree/master/LATAM_remote/equipo_dorado)

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
