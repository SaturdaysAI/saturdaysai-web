---
title: Machine Learning aplicado a la compactación de suelo.
description: En este artículo, utilizaremos técnicas de Machine Learning para
  optimizar la compactación del suelo. El suelo es un material compuesto por una
  parte sólida, líquida y gaseosa, que se formó durante cientos de millones de
  años…
pubDate: 2021-11-12
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Agua Industria Innovación e Infraestructura
  - Regresión
  - Tabular
image: /media/3ce5bdbeb4e2a4a7.webp
imageAlt: Machine Learning aplicado a la compactación de suelo.
legacyPath: /2021/11/12/machine-learning-compactacion-de-suelo/
sourceUrl: https://saturdays.ai/2021/11/12/machine-learning-compactacion-de-suelo/
sourceId: 4397
language: es
draft: false
---

En este artículo, utilizaremos técnicas de Machine Learning para optimizar la compactación del suelo.

El suelo es un material compuesto por una parte sólida, líquida y gaseosa, que se formó durante cientos de millones de años de meteorización y sedimentación. Entendemos por compactación el eliminar la mayor cantidad de masa gaseosa (comúnmente aire) del suelo mediante carga.

![](/media/3ce5bdbeb4e2a4a7.webp)

La curva de compactación consiste en una curva que se construye después de marcar los puntos pares de densidad seca y la humedad de la muestra. Con un mínimo de 5 puntos se traza a mano una curva que pueda correlacionar todos estos puntos y se obtienen la densidad seca máxima y la humedad óptima a la que se puede compactar este suelo.

![](/media/4c6f17ef294dffaf.webp)

Estos parámetros son linealmente independientes y no existe una relación entre el ensayo de compactación y la clasificación de suelos, por lo que se realizan dos ensayos diferentes para la obtención del mismo.

##   
**Descripción del problema**

Para cada kilómetro de carretera se requieren 5 pozos de ensayo de los cuales es requisito presentar dos ensayos:

-   Clasificación de suelos
-   Compactación

En la práctica, debido a los recursos económicos y la logística que representa solo se realizan 5 ensayos de clasificación y 2 de compactación y los resultados se interpolan.

![](/media/f76754eca107f1f5.webp)

##   
**Objetivo**

Determinar usando técnicas de Machine Learning una correlación entre la clasificación de suelos y la compactación de suelos, refiriéndose al valor de densidad seca máxima y humedad óptima, para calcular la humedad a la que se compactará un determinado tramo de carretera.

##   
**Selección del modelo**

Debido a que se conoce el resultado y el problema es numérico, los modelos que se usaron fueron:

-   Regresión lineal
-   Regresión multi-lineal
-   Regresión polinómica

##   
**Técnicas implementadas**

###   
**Reducción de dimensiones**

Se redujeron todas las columnas que no aportan una información relevante: ‘Pozo’, ‘Lado’, ‘Prf o (m)’, ‘Prf f (m)’, ‘% Hum’, ‘ST >3’, ‘3’, ‘AASTHO’, ‘#’, ‘SUCS’, ‘100%’, ‘97%’, ‘95%’, ‘100%.1’, ‘97%.1’, ‘95%.1’

###   
**Valores faltantes**

En la columna de LL se encontró que faltaban 30 datos, se utilizó un histograma y se determinó que la curva normal que describe a sus datos estaba desfasada del medio, por lo que se rellenó los datos faltantes con la mediana, que es 32.2

![](/media/5fa849957bd906c8.webp)

###   
**Gráficas**

Se realizaron todas las gráficas necesarias para entender e interpretar el problema.

Relación lineal (con sklearn)

![](/media/566bbf301d8567a3.webp)

Relación polinómica de 2do grado (con numpy)

![](/media/f2bb752bc3aeaad1.webp)

Relación polinómica de 3er grado (con numpy)

![](/media/902ac1422fd80f2c.webp)

Relación multi-lineal (con sklearn)

![](/media/03e69529fd562389.webp)

Relación multi-lineal (con sns) donde se relacionan los 14 parámetros entre sí y su relación con la Humedad óptima.

![](/media/d9d4939c6675c0c2.webp)

![](/media/e5c61e4faf90e794.webp)

![](/media/9dc5c676bbceb58d.webp)

##   
**Evaluación del modelo**

###   
**D max vs H opt**

Regresión lineal:

![](/media/6096b0f6cbda493b.webp)

Regresión polinómica de 2do grado:

![](/media/8e3c0d5477b4af1c.webp)

Regresión polinómica de 3er grado:

![](/media/b646caec4f54027b.webp)

###   
**Feature vs H opt**

Regresión lineal:

![](/media/1956192a031dd526.webp)

##   
Análisis de resultados

###   
**D max vs H opt**

Se puede observar que es la regresión polinómica la que tiene un coeficiente de correlación más cercano a 1 y en gráfica la que mejor se ajusta por lo que será la regresión adoptada

###   
**Feature vs H opt**

Se puede observar un valor de coeficiente de correlación cercano a 1 y en las gráficas de sns la gran mayoría son relaciones lineales por lo que se acepta el modelo multi-lineal conseguido.

##   
**Conclusión**

Se determinó una correlación entre la clasificación de suelos y la compactación de suelos, para calcular la humedad a la que se compactará un determinado tramo de carretera:

![](/media/1d957099ff4665f8.webp)

H opt = 0.117\*(LL) + 0.0212\*(LP) — 0.007\*(2) + 0.010\*(1 ½) — 0.004\*(1) — 0.001\*(¾) + 0.017\*(⅜) — 0.001\*(no 4) — 0.052\*(no 10) +  
\+ 0.054\*(no 40) + 0.036\*(no 200) — 0.043\*(% Grava) + 0.007\*(% Arena) + 0.036\*(% Finos) + 3.779

![](/media/600fc1c6e2a266a5.webp)

D max = 4.110\*10^(-4)\*(H opt)² — 4.256\*10^(-2)\*(H opt) + 2.394



WRITTEN BY

## [Mauricio Ramirez Salamanca](https://medium.com/@ramirezsalamancamauricio?source=follow_footer-----e81d70c8335f-----------------------------------)

Follow

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----e81d70c8335f-----------------------------------)

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
