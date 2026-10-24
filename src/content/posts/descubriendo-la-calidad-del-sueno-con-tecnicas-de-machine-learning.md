---
title: Descubriendo la calidad del sueño con técnicas de Machine Learning
description: Latam online. Segunda Edición. 2021 El brote de COVID-19 y las
  respuestas sociales adoptadas para combatir su propagación (por ejemplo, el
  confinamiento y el distanciamiento social) han tenido consecuencias de gran
  alcance,…
pubDate: 2022-03-09
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Machine Learning
  - Regresión
  - Salud y Bienestar
  - Tabular
image: /media/8b9ebb630e072085.webp
imageAlt: Descubriendo la calidad del sueño con técnicas de Machine Learning
legacyPath: /2022/03/09/descubriendo-la-calidad-del-sueno-con-tecnicas-de-machine-learning/
sourceUrl: https://saturdays.ai/2022/03/09/descubriendo-la-calidad-del-sueno-con-tecnicas-de-machine-learning/
sourceId: 6090
language: es
draft: false
---

![](/media/8b9ebb630e072085.webp)

_[Latam online](https://saturdays.ai/latam-online/). Segunda Edición. 2021_

El brote de COVID-19 y las respuestas sociales adoptadas para combatir su propagación (por ejemplo, el confinamiento y el distanciamiento social) han tenido consecuencias de gran alcance, pero han brindando también una oportunidad única para examinar los efectos que el estrés crónico y la incertidumbre pueden tener en los patrones de sueño de la población en general.

Está bien documentado que el sueño puede verse afectado cuando se está bajo estrés y que los cambios en el sueño pueden tener consecuencias negativas en las emociones y el bienestar mental. Un metanálisis reciente mostró que la pandemia de COVID-19[(1)](#section-7) ha provocado una alta prevalencia de trastornos del sueño, que afectan aproximadamente al 40 % de las personas de la población general.

Se sabe que además del estrés debido a la pandemia por COVID-19, hay otros factores que podrían alterar la resiliencia mostrada bajo estrés, por ejemplo,la falta de interacción social, la falta de ejercicio físico, el bienestar económico etc.

Este proyecto tiene como objetivo determinar qué factores pueden afectar la calidad del sueño de la población cuando están sujetas a situaciones de estrés crónico como es el caso de una pandemia. Predecir dichos factores permitiría emitir consejos útiles para la población, de tal forma que estén mejor preparados para futuras pandemias y/o situaciones de estrés crónico que permitan mitigar el impacto emocional causado por la mala calidad de sueño.

## Metodología

La base de datos seleccionada para este proyecto ha sido la publicada por la Universidad de Boston2, que consiste de una serie de encuestas realizadas a 1,518 personas a través de redes sociales para evaluar el impacto de la pandemia en el bienestar emocional y mental de las personas dependiendo diversos factores como la edad, el impacto económico, la condición de minoría y o el estado de riesgo.

Una vez seleccionada la base de datos proseguimos a la limpieza y procesamiento de los datos. Después de este proceso, el número de variables de nuestra base de datos fue de 216 y el tamaño de la muestra se redujo a 839 sujetos debido a que no toda la información estaba completa.

Las variables principales incluyen información demográfica (edad, identidad de género, ingresos, etc.), información relativa a los hábitos de sueño, niveles de ansiedad, regulación emocional cognitiva, y personalidad, entre otras.

La métrica elegida para evaluar la calidad del sueño fue la variable del índice total de calidad del sueño de Pittsburgh (PSQI), que tiene una escala de 0 a 21. En dicha escala, una puntuación global de 5 o más indica una mala calidad del sueño; cuanto mayor sea la puntuación, peor será la calidad.

## Análisis del dataset

Observamos la distribución de los datos

![Histograma Calidad del sueño por género](/media/bfb1101ec8b39d75.webp)

Puntuación sueño

![Barplot Calidad del sueño por estado civil](/media/1d9412af47da695f.webp)

![Barplot Calidad del sueño por ingresos](/media/08eaf16f8e21bfa3.webp)

Observamos la correlación que entra la calidad de sueño con otras variables no asociadas al sueño:

-   Diferencia de cronotipo pre y post covid

![](/media/39cc94241fb4ea22.webp)

-   Variable de ansiedad (No consigue dejar de preocuparse)

![](/media/ef7813b711f20a35.webp)

-   Variable de personalidad (Se considera relajado)

![](/media/2675fcfffa801834.webp)

-   Variable de ansiedad social (Miedo a extraños post covid)

![](/media/2b90bd52b42300d7.webp)

## Modelos

### Clasificación

En el conjunto de datos, nuestra métrica elegida para evaluar toma valores del 0 al 18 (no se han observado casos de 19 a 21). Si tomamos estos valores como si fueran clases o subconjuntos podemos aplicar un método de clasificación.

Hemos elegido aplicar el algoritmo de RandomForestClassifier con el que en un principio obtenemos valores muy bajos de precisión rondando el 0,20. A continuación, probamos a recudir las clases agrupando los valores originales de la métrica. A medida que vamos reduciendo las clases observamos que los valores de precisión van mejorando, para 6 clases el resultado mejora en torno a 0,5 y para 4 clases el resultado llega a 0,7.

Para tener una explicación de estos resultados mostramos los shap values de las predicciones:

![](/media/4be4c8b7ba3c7fa2.webp)

Podemos observar que las variables que aparecen con más peso, son las que están directamente ligadas con datos de sueño (psqi\_\*). Las primeras de todas ellas son si la persona ha recurrido a medicinas para dormir, la percepción que declara de su calidad de sueño, y el tiempo que tarda en conciliar el sueño. Dentro de estas variables también observamos que tienen impacto datos de personalidad (big5\_\*) , como si se considera una persona relajada, o ansiedad (gad\_\*), como la capacidad de dejar las preocupaciones.

Según lo observado podemos concluir que el algoritmo está funcionando correctamente y que los datos en los que se basa para realizar las estimaciones son los esperados. Creemos que el número de observaciones con las que contamos son muy bajas para el número de clases a predecir y que aumentando los datos se podrían mejorar las predicciones.

### Regresión

Para la regresión hemos elegido cuatro algoritmos distintos: RandomForest, Logistic, GradientBoosting y HistGradientBoosting.

![](/media/fbaf2e9b5d4ed989.webp)

![](/media/3f8f614a367807f0.webp)

El algoritmo que produjo el mayor coeficiente de determinación fue el de GradientBoosting, con un R2=0.9. Lo que significa que el 90% de los puntos se ajustan a la línea de regresión.

![](/media/12c387bafeb63026.webp)

Una vez seleccionado el mejor algoritmo intentamos utilizar la optimización de los argumentos usando RandomizedSearchCV pero no obtuvimos nada mejor. Además probamos reducir el número de variables mediante el uso de PCA. Obtuvimos el número óptimo de variables y redujimos el tamaño de la base de datos a ese número, en este caso 138, pero los resultados empeoraron, la R2 disminuyó hasta 0.57.

![](/media/aa66dde7b6c832d0.webp)

Análisis PCA para reducir el número de variables

Por esta razón decidimos quedarnos con el resultado obtenido con el algoritmo de GradientBooster como la mejor opción para predecir la calidad del sueño.

## Conclusión

Es posible predecir la calidad del sueño con un 90% de precisión. Pudimos observar que la calidad del sueño depende en mayor medida de variables relacionadas con:

-   Medicación
-   Tiempo que toma a la persona conciliar el sueño
-   Entusiasmo por llevar a cabo cosas
-   Manejo del estrés
-   Control de las preocupaciones

Esta predicción, aunque intuitiva, puede ser de utilidad para implantar medidas que puedan ayudar a la población a mejorar la calidad del sueño en situaciones de estrés crónico como la sufrida durante una pandemia.

En el futuro, este proyecto se podría mejorar aumentando el número de muestras de la base de datos actual.

## Referencias

1\. Jahrami, H. _et al_. Sleep problems during COVID-19 pandemic by population: a systematic review and meta-analysis. _J Clin Sleep Med_, jcsm-8930. (2020).

2\. Cunningham, T.J., Fields, E.C. & Kensinger, E.A. (2021) Boston College daily sleep and well-being survey data during early phase of the COVID-19 pandemic. Sci Data 8, 110. [https://www.nature.com/articles/s41597-021-00886-y](https://www.nature.com/articles/s41597-021-00886-y)

## Integrantes

-   Ana Galindo Alonso
-   [Bianey Palma](https://medium.com/@tanikdea)

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/c3x6q36DnuU?start=1792&feature=oembed)

## **¡Más Inteligencia Artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
