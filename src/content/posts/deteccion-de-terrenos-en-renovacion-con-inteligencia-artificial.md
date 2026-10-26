---
title: Detección de terrenos en renovación con Inteligencia Artificial
description: La Paz. 2021 En este artículo, veremos cómo llevar a cabo la
  detección de terrenos con Inteligencia Artificial con el objetivo identificar
  los terrenos (lotes) disponibles para producción (en renovación). De esta
  manera…
pubDate: 2021-11-18
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Agua Industria Innovación e Infraestructura
  - Imágenes
  - Regresión
  - SVM
image: /media/532ada31d9074cda.webp
imageAlt: Detección de terrenos en renovación con Inteligencia Artificial
legacyPath: /2021/11/18/deteccion-de-terrenos-en-renovacion-con-inteligencia-artificial/
sourceUrl: https://saturdays.ai/2021/11/18/deteccion-de-terrenos-en-renovacion-con-inteligencia-artificial/
sourceId: 4442
language: es
draft: false
---

![](/media/532ada31d9074cda.webp)

[La Paz](https://saturdays.ai/la-paz/). 2021

En este artículo, veremos cómo llevar a cabo la detección de terrenos con Inteligencia Artificial con el objetivo identificar los terrenos (lotes) disponibles para producción (en renovación). De esta manera pretendemos mejorar los costes y la eficiencia que se asocian a su detección y explotación.

Entendemos por loteo de terrenos el proceso de división del suelo, cualquiera sea el número de predios resultantes, cuyo proyecto contempla la apertura de nuevas vías públicas, y su correspondiente urbanización. No obstante, analizaremos los terrenos de cara a su producción agrícola.

Los datos son extraídos de la base de datos geográficos de monitoreo de producción de los cañeros de la zona norte de Santa Cruz. Todo esto se maneja en un CATASTRO.

![](/media/a770db39afc96230.webp)

Esta información geográfica tiene relaciona información tabulada:

![](/media/6447b96175333674.webp)

Entonces se puede tener una visualización del estado de los lotes, si están en producción (con cobertura) o en renovación (sin cobertura) a través de los polígonos que limitan los lotes y las imágenes satelitales.

![](/media/3b8c667cc4d6dd8f.webp)

Son estas imágenes en diferentes épocas del año las que permiten analizar visualmente si los lotes están en renovación o no.

##   
**Descripción del problema:**

La determinación de si un lote está o no en renovación es importante ya que es una variable a la hora de calcular la producción y rendimiento de las propiedades de cada cañero, y para ello se presentan los siguientes inconvenientes:

-   Las inspecciones de campo y a través de imágenes satelitales son morosas.
-   Susceptible a errores.
-   Demasiado tiempo invertido.

##   
**Objetivo:**

Determinar si un lote de cultivo de caña está en renovación a través del cambio de cobertura a partir de los datos estadísticos de NDVI de los últimos 12 meses con Machine Learning.

##   
**Propuesta de solución.**

Las imágenes satelitales pueden ser procesadas para obtener ciertos índices. El índice de interés para observar si un lote está en renovación se llama NDVI (Normalized Difference Vegetation Index):

![](/media/64e09d8c5f90f090.webp)

Se puede observar los lotes con cobertura en color verde, y los que están sin cobertura en rojo, esto de los colores es solo simbología. Lo que en verdad se tiene con el NDVI es una matriz de píxeles:

![](/media/38624ef5c2c38c46.webp)

Cada pixel tiene valores entre -1 y 1; siendo -1 suelos completamente descubiertos, y 1 suelos con cobertura vegetal.

Entonces, se puede obtener la estadística descriptiva de cada lote, y a través de su media y desviación estándar determinar si un lote está en renovación o no.

![](/media/a7ff653adc44af31.webp)

Como se puede apreciar, lotes con cobertura tiene una media cercana a 1 y una desviación estándar baja, y los que están sin cobertura una media cercana a 0 y también una desviación estándar baja, la desviación estándar es importante ya que determina que las uniforme son los valores de los píxeles en cada lote.

##   
**Ingeniería de características.**

-   Utilizamos el campo Variedad para construir la variable objetivo: contiene la variedad sembrada o la etiqueta «Renovación» cuando el lote está en ese proceso. Renombramos la nueva columna como Renovación.
-   Convertimos el campo Renovación de categórico a booleano.
-   Unimos los 13 dataset (1 de catastro y 12 de los valores estadísticos del último año) en uno solo dataset para mejor uso.

##   
**Visualización de Datos**

-   Cantidad de registros por Renovación.

![](/media/d0ae6c430d82b8af.webp)

-   Cantidad de registros por gestión.

![](/media/fbd0d3bcaa69a89e.webp)

-   Cantidad de registros por hectareaje.

![](/media/1557cb938f4237d5.webp)

-   Matriz de correlación.

![](/media/c0021752de19e39c.webp)

-   Visualización del balanceo del target.

![](/media/de3f9ab23acfe45f.webp)

##   
**Reducción de dimensiones a través de PCA.**

Se realizó la reducción de dimensiones a través de PCA a dos componentes principales, y se puede apreciar una diferencia entre los registros:

![](/media/0f6455b8eef6c1bc.webp)

##   
**Entrenamiento de modelos**

Se probaron tres tipos de modelos, también se implementó Cross Validation. Los resultados fueron los siguientes:

-   Regresión Logística

![](/media/1fe16e4638e98d6a.webp)

-   Random Forest

![](/media/fcdc8d4820a0b0bf.webp)

-   SVM

![](/media/583bea08d128963a.webp)

##   
**Elección del mejor modelo**

En base a los resultados obtenidos, elegiremos ahora el modelo de Inteligencia Artificial más adecuado para la detección de terrenos en renovación:

![](/media/d5f657a16df4d100.webp)

Se observa que los 3 modelos seleccionados se aproximan a la misma probabilidad 0.93, sin embargo, SVM tiene un mejor score.

También se decidió aplicar la Curva de ROC, y dio el dio el siguiente resultando:

![](/media/fe955d82a4a646b7.webp)

En este caso Random Forest es quien presenta mayor área bajo la curva, por lo tanto, SVM y Random Forest son los mejores modelos a considerar para la clasificación de lotes en renovación.

**Autores del proyecto.**

-   Bismark Socompi.
-   Ruth Paola Vedia
-   Cristian Vargas

[Saturdays.AI](https://medium.com/saturdays-ai?source=post_sidebar--------------------------post_sidebar--------------)



-   [Machine Learning](https://medium.com/saturdays-ai/tagged/machine-learning)
-   [Lotes](https://medium.com/saturdays-ai/tagged/lotes)
-   [Renovacipon](https://medium.com/saturdays-ai/tagged/renovacipon)
-   [Regresion Logistica](https://medium.com/saturdays-ai/tagged/regresion-logistica)
-   [Svm](https://medium.com/saturdays-ai/tagged/svm)




WRITTEN BY

## [Bismark Socompi Rodriguez](https://medium.com/@bismark.sr.17?source=follow_footer-----7c4b802b51d0-----------------------------------)



[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----7c4b802b51d0-----------------------------------)

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
