---
title: Clasificación de idiomas originarios de Bolivia con Machine Learning
description: La Paz. 2021 Usamos técnicas de Machine Learning para la
  clasificación de idiomas. Bolivia lucha para que no desaparezcan los idiomas
  indígenas, sin embargo, es aún muy complicado acceder a recursos que ayuden la
  asimilación y…
pubDate: 2021-11-19
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Educación de Calidad
  - SVM
  - Texto
image: /media/11a66fe8599ab856.webp
imageAlt: Clasificación de idiomas originarios de Bolivia con Machine Learning
legacyPath: /2021/11/19/clasificacion-idiomas-machine-learning/
sourceUrl: https://saturdays.ai/2021/11/19/clasificacion-idiomas-machine-learning/
sourceId: 4555
language: es
draft: false
---



![](/media/11a66fe8599ab856.webp)

[La Paz](https://saturdays.ai/la-paz/). 2021

Usamos técnicas de Machine Learning para la clasificación de idiomas.

Bolivia lucha para que no desaparezcan los idiomas indígenas, sin embargo, es aún muy complicado acceder a recursos que ayuden la asimilación y aprendizaje de los mismos. Es por ello que planteamos crear una herramienta con Machine Learning para la clasificación de idiomas, que si bien es una tarea sencilla es elemental para realizar tareas más complejas como la traducción automática, el análisis de sentimientos, conversión de habla a texto, texto a habla, etc. Este modelo de clasificación se creó usando herramientas de NLP (procesamiento de lenguaje natural) y ML (aprendizaje automático), obteniendo una precisión superior al 99%.

Desde 2006 Bolivia es líder en la defensa y reivindicación de los pueblos y las culturas indígenas en su territorio y en el mundo.

> “Hoy en día, las 36 lenguas originarias en Bolivia son idiomas oficiales. En Bolivia se tiene que hablar y enseñar inicialmente un idioma originario» \[1\].

Pero todo esté trabajo ¿realmente tiene resultados positivos en la asimilación y aprendizaje de las lenguas originarias en Bolivia?.

##   
**Descripción del problema**

Si bien en nuestro país se lucha porque no desaparezcan estos idiomas indígenas es aún muy complicado acceder a recursos que ayuden la asimilación y aprendizaje de los mismos.  
Sin embargo, actualmente se puede usar la tecnología como un aliado para solucionar este problema y la detección de idiomas es un punto inicial y primordial para crear herramientas de traducción automática de texto, de conversión de texto a voz, voz a texto, voz a voz, entre muchas otras aplicaciones.

##   
**Objetivo**

Crear una herramienta con Machine Learning capaz de identificar y clasificar idiomas originarios de Bolivia, para agilizar tareas relacionadas como la traducción, recuperación de la información, etc.

##   
**Límites y alcances**

**LÍMITES**: Debido a la dificultad de conseguir un conjunto de datos suficientemente grande de los idiomas más hablados en Bolivia (quechua, guaraní, aymara), solo nos centramos en el idioma quechua.

**ALCANCES**: La herramienta de identificación, en una primera etapa, será capaz de clasificar el idioma de frases ya sea como quechua o español.

##   
**Metodología**

Para la clasificación de idiomas mediante Machine Learning se utilizó una metodología iterativa incremental, que conlleva las siguientes fases:

![](/media/3c7ddd607cea93b9.webp)

Figura 1. Metodología (Dataiku)

##   
**Captura de datos**

Posterior a la creación del dataset nos dimos cuenta que éste estaba desbalanceado porque el número de frases en quechua duplicaban el de español, por esa razón decidimos balancear los datos agregando frases de español obtenidos de un dataset de Kaggle.

![](/media/cdb22775289266e9.webp)

Figura 2. Captura de datos (Imagen extraída de un [sitio web](https://www.gettyimages.in/photos/drawing-activity))

##   
**Pre-procesamiento**

En esta etapa se realizaron diversas formas de pre-procesamiento, desde la ingeniería de características (feature engineering) hasta la vectorización. Las cuales se describen a continuación.

**Limpieza de caracteres irrelevantes**

Las frases en español de Kaggle tenían caracteres de otros idiomas e irrelevantes para la clasificación, es por ello que antes de unir con el dataset que se tenía se pasó a realizar una limpieza de todos esos caracteres de las frases de Kaggle. Una vez unido el dataset aún se tenían caracteres que no aportaban información como: dígitos, signos de puntuación, etc. y por tanto se realizó una limpieza de estos caracteres.

**Técnicas implementadas**

En base a la información del dataset se pudo notar que había un dato mal tabulado y se realizó la imputación de datos por valores nulos. Por otro lado, como el dataset cuenta con solo un feature y el target, no se tuvo la necesidad de reducir las dimensiones.

**Análisis de los features**

Cada idioma tiene sus propias reglas gramaticales y el idioma Quechua no es ajeno a eso, por ende se investigó las reglas de este idioma y se pudo notar ciertas características interesantes que lo diferencian de otros idiomas, por mencionar algunas:

1.  El alfabeto quechua cuenta con 28 consonantes (algunas consonantes son diferentes al de español como: ch’, chh, qh, p’) y 3 vocales (a, i, u)
2.  Las consonantes del quechua se clasifican según el modo de articulación, algunas de estas son:

-   O_clusivas (p, t, k, q)_
-   _Aspiradas (ph, th, chh, kh, qh)_
-   _Glotalizadas (p’, t’, ch’, k’, q’)_
-   _Semiconsonantes (w, y)_

3\. Para diferenciar el género de una persona se usan las palabras: warmi y qhari

4\. La interrogación en el quechua se realiza agregando a la palabra el sufijo -chu.

Estas y muchas más características de la gramática Quechua, así como la gramática del Español fueron tomadas en cuenta para realizar las gráficas, las cuales nos permiten corroborar estas diferencias entre las reglas gramaticales en el dataset.

Uno de los gráficos que realizamos fue la frecuencia de las vocales por idioma en el dataset (Figura 3). La frecuencia de las vocales fueron calculadas según el número de caracteres de cada frase.

![](/media/de37f4b19b674253.webp)

Figura 3. Frecuencia de vocales (Elaboración propia)

Otras gráficas que realizamos fueron la frecuencia de las consonantes como: **K, H, M, R** (Figura 4) y caracteres especiales como: **á, é, í, ó, ú, ä, ü, ‘** (Figura 4), según el idioma.

![](/media/c062a02804f6098f.webp)

![](/media/46db40cba04facf5.webp)

Figura 4. Histograma de caracteres (Elaboración propia)

Estas gráficas nos permitieron aclarar algunas dudas sobre las diferencias gramaticales entre el idioma Español y Quechua, y representaron un punto clave para realizar el pre-procesamiento de los datos.

Por las diferencias de algunas letras y caracteres utilizados para cada idioma, además de ciertos sufijos o prefijos propios, numeración y demás características, decidimos vectorizar las frases según el modelo n-gram de caracteres. Para capturar características importantes en ambos idiomas delimitamos el modelo n-gram de 1 a 5, esto por temas de rendimiento y también porque consideramos que este número nos permite abstraer aquellas características gramaticales que citamos anteriormente.

![](/media/048822bad59c2d71.webp)

Figura 5: Pre-procesamiento y vectorización de los features (Elaboración propia)

Además de vectorizar las frases según la frecuencia de caracteres únicos que tiene cada frase se aplicó la frecuencia TF-IDF, medida estadística que evalúa cuán relevante es un término para un documento en una colección. En este caso cada término es representado por cada carácter y el documento es representado por la frase del idioma en el dataset (colección de frases).

##   
**Selección y evaluación de modelos**

Con los datos listos se procedió a construir los modelos de predicción. Se utilizaron modelos de clasificación debido a que tenemos un problema de clasificación binaria, sólo se tienen dos posibles etiquetas, **“Quechua” y “Español”.**

Por lo tanto, se utilizaron los siguientes algoritmos de aprendizaje supervisado:

-   Naive Bayes
-   Support vector Machine
-   Logistic regression

Para encontrar la mejor combinación de hiperparámetros se utilizo GridSearch de la biblioteca Sklearn.

Las matrices de confusión para los 3 modelos son:

![](/media/6c9cad8b7a77a58b.webp)

Figura 6. Matrices de confusión, balanced accuracy y tiempo de ejecución de los 3 modelos (Elaboración propia)

##   
**Clasificación de nuevos datos**

Una vez seleccionado nuestro mejor modelo, es necesario probarlo con algunas frases nunca antes vistas, por ello probamos frases que solo contienen palabras de un idioma, frases que contienen palabras de ambos idiomas que es usual en el habla coloquial de los quechua hablantes y por último una frase sin sentido. Nuestro modelo seleccionado se comporta bien con los dos primeros tipos de frases, sin embargo, al ingresar frases sin sentido que no pertenece ni al español o al quechua, estas frases son clasificadas directamente como quechua, esto se debe a que como manejamos un modelo binario el texto ingresado sea cual sea debe etiquetarlos con una etiqueta u otra.

![](/media/b8c2b1625b12bbf5.webp)

Figura 7. Resultados del modelos (Elaboración propia)

##   
**Conclusión**

En general, el modelo de Machine Learning para la clasificación de idiomas basado en Support Vector Machine ofrece el mejor resultado predictivo con una puntuación de precisión balanceada superior al 99%.

Específicamente, el modelo funciona bien para clasificar Español y Quechua dada la alta precisión, y puntajes f1 para estos dos idiomas.

Si bien la mejor precisión se obtuvo con SVM, considerando las variables precisión y rendimiento el mejor modelo sería el basado en Regresión Logística, ya que ofrece un tiempo de ejecución menor al de SVM y tiene una precisión superior al 99%, lo cual es un factor importante en aplicaciones en real time.

Se logró abstraer algunas características del idioma quechua, por lo que es posible realizar el mismo análisis con otros idiomas originarios de Bolivia

##   
**Trabajos futuros**

Si bien este problema aparenta ser sencillo es un paso necesario para:

-   Traducción automática
-   Detección de idioma para el uso de boots
-   Análisis de sentimientos, etc.

El codigo fuente de este proyecto se puede encontrar en: [github](https://github.com/andreina-covi/DataNLP)

##   
**Referencias**

[ONU – Bolivia, a la vanguardia en la protección y promoción de las lenguas indígenas](https://news.un.org/es/story/2019/06/1457591#:~:text=%E2%80%9CHoy%20en%20d%C3%ADa%2C%20las%2036,inicialmente%20en%20la%20lengua%20originaria.%E2%80%9D&text=En%20cambio%2C%20sus%20nietas%20s%C3%AD,les%20ense%C3%B1a%20en%20la%20escuela.)[Saturdays.AI](https://medium.com/saturdays-ai?source=post_sidebar--------------------------post_sidebar--------------)



-   [NLP](https://medium.com/saturdays-ai/tagged/nlp)
-   [Machine Learning](https://medium.com/saturdays-ai/tagged/machine-learning)
-   [Supervised Learning](https://medium.com/saturdays-ai/tagged/supervised-learning)
-   [Tf Idf](https://medium.com/saturdays-ai/tagged/tf-idf)


WRITTEN BY

## [EVELYN CUSI LOPEZ](https://cusi-evelyn.medium.com/?source=follow_footer-----91cb0c0b7b48-----------------------------------)

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----91cb0c0b7b48-----------------------------------)

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esa aplicación: https://github.com/SaturdaysAI/Projects/tree/master/Lapaz/clasificacion-idiomas-machine-learning-main

## **¡Más Inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
