---
title: Deep Learning aplicado a detección temprana de incendios forestales
description: La Paz. Segunda Edición. 2021 En el mundo, los incendios forestales
  constituyen la causa más importante de destrucción de bosques. En un incendio
  forestal no sólo se pierden árboles y matorrales, sino también casas,
  animales,…
pubDate: 2022-03-09
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Deep Learning
  - Imágenes
  - Machine Learning
  - Medio Ambiente
  - Red Neuronal
  - Vida de Ecosistemas Terrestres
image: /media/6282a4d53ef9368d.webp
imageAlt: Deep Learning aplicado a detección temprana de incendios forestales
legacyPath: /2022/03/09/deep-learning-aplicado-a-deteccion-temprana-de-incendios-forestales/
sourceUrl: https://saturdays.ai/2022/03/09/deep-learning-aplicado-a-deteccion-temprana-de-incendios-forestales/
sourceId: 6084
language: es
draft: false
---

[La Paz.](https://saturdays.ai/la-paz/) Segunda Edición. 2021

En el mundo, los incendios forestales constituyen la causa más importante de destrucción de bosques. En un incendio forestal no sólo se pierden árboles y matorrales, sino también casas, animales, fuentes de trabajo e inclusive vidas humanas.

![](/media/c067e94cc2b7dcd3.webp)

Como se puede apreciar en la Fig.1 en Bolivia los últimos siete meses este fenómeno se multiplicó de manera alarmante el área afectada debido a múltiples factores la Fig. 2 muestra algunas de las causas estudiadas para los incendios forestales. Otro factor importante identificado es el cambio climático que debido al aumento de temperatura en los lugares afectados, aumenta las áreas afectadas de manera alarmante.

![](/media/c6aa20b9ea21e629.webp)

Fig. 2 Causas identificadas de los incendios forestales (Vélez)

Debido a las consecuencias de los incendios forestales no controlados ni planificados se deben tomar diferentes estrategias que permitan mitigar su ocurrencia en zonas protegidas o prohibidas para esta actividad.

## Descripción del problema

En base a lo mencionado anteriormente se plantea el siguiente problema:

¿Cómo identificar de manera oportuna incendios forestales no controlados para minimizar su impacto?

## Objetivo general

Se plantea como objetivo general implementar un modelo de _Deep Learning_ para la detección temprana de incendios forestales mediante el reconocimiento de humo en las áreas llanas/boscosas utilizando imágenes del lugar.

El siguiente gráfico muestra la idea central del proyecto.

![](/media/2587bd0fe6d5c0b3.webp)

Fig. 3 Propuesta del proyecto

## Recolección de la información

El dataset para realizar el entrenamiento de los modelos se realizó mediante la descarga de imágenes clasificadas como “incendio forestal” (imágenes tomadas en perspectiva con presencia de humo en zonas forestales) y “no incendio forestal” (imágenes tomadas en perspectiva en zonas forestales sin presencia de humo o fuego).

Las imágenes descargadas (4 grupos de imágenes) fueron llevadas a un repositorio _github_ para su importación sencilla en Google Colab.

![](/media/c29285479d1aebf4.webp)

Impresión de las 8 primeras imágenes de entrenamiento y 8 primeras imágenes de validación:

![](/media/514ca08369afa34b.webp)

## Selección de los modelos

La selección de los modelos parte de las siguientes consideraciones:

-   Facilidad de su implementación.
-   Rendimiento del modelo.
-   Limitación de cálculo.

Estas consideraciones son debido a los recursos que se tienen para realizar el objetivo general. Los modelos a desarrollarse son:

-   CCN Personalizado
-   VGG-16

## Técnicas implementadas

La principal técnica utilizada para compensar el dataset de tamaño limitado por la limitación de búsqueda de imágenes en Google fue la de “_data_ augmentation” realizada por la librería de _keras_ “_ImageDataGenerator_”.

![](/media/1bb3651bbc8c308a.webp)

Fig 5. Data Augmentation

![](/media/b207de344cc8a61d.webp)

Fig. 6 ImageDataGenerator en Keras

## Evaluación de modelos

### 1\. CNN personalizado

![](/media/c28cf370b8dc65d4.webp)

### 2. VGG-16

![](/media/5541933acf0a7e3c.webp)

![](/media/5e9d9e98bd79d207.webp)

## Análisis de resultados

A continuación se muestran los resultados del modelo _CNN personalizado_ y _VGG-16_.

1\. Precisión y _Curva de ROC_ de _CNN_ personalizado:

![](/media/d6c2fc1eaba451af.webp)

Curva ROC de CNN personalizado

2\. Precisión y _Curva de ROC_ de _VGG-16_:

![](/media/e057f3ac11fc4a37.webp)

Precisión de VGG-16.

![](/media/34ef55d5fc4f6a97.webp)

Curva de ROC de VGG-16.

Las predicciones de los modelos a continuación:

### 1\. CNN Personalizado

![](/media/c7080345280b80d8.webp)

![](/media/6ffa693d17bdaa25.webp)

![](/media/ce27071e026a78a2.webp)

![](/media/77725e8c6da42208.webp)

### 2\. VGG-16

![](/media/488f68fd06c49219.webp)

![](/media/e14da5a86d4552fb.webp)

![](/media/7013af7e9804d7a9.webp)

![](/media/7540d97ea6f52d93.webp)

![](/media/2d594ab560b82285.webp)

## Conclusiones

El modelo _CNN_ personalizado tiene un desempeño adecuado para la detección de incendios forestales. El modelo _VGG-16_ con el elemento de pre-entrenamiento requiere más elaboración para obtener resultados más precisos. De esta manera un modelo _Deep Learning_ no siempre requiere tener una alta complejidad para realizar la clasificación de manera eficiente.

El modelo desarrollado obtiene muy buenos pronósticos para el problema planteado y es una solución complementaria al problema de incendios forestales.

La utilización de modelos de _AI Deep Learnin_g pueden ser mejor explotados como complemento a la solución de problemas coyunturales.

## Integrantes

-   [Daniel Blanco](https://medium.com/@danielba.developer)

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/L4o5tZNqyxs?start=2316&feature=oembed)

## **¡Más Inteligencia Artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
