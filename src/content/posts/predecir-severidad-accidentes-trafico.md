---
title: Machine Learning para predecir la severidad de siniestros viales.
description: Latam online. Segunda Edición. 2021 Los accidentes de tránsito
  constituyen una de las causas de fatalidad y gravedad más importantes en
  distintos lugares del mundo, a causa de esto es indispensable disponer de una
  manera de…
pubDate: 2022-03-09
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Ciudades y Comunidades Sostenibles
  - Machine Learning
  - Random Forest
  - Regular Gradient Boosting
  - Seguridad Vial
  - SVM
image: /media/247812ab776a37d0.webp
imageAlt: Machine Learning para predecir la severidad de siniestros viales.
legacyPath: /2022/03/09/predecir-severidad-accidentes-trafico/
sourceUrl: https://saturdays.ai/2022/03/09/predecir-severidad-accidentes-trafico/
sourceId: 6003
language: es
draft: false
---

![](/media/346435df20e56841.webp)

_[Latam online](https://saturdays.ai/latam-online/). Segunda Edición. 2021_

Los accidentes de tránsito constituyen una de las causas de fatalidad y gravedad más importantes en distintos lugares del mundo, a causa de esto es indispensable disponer de una manera de reducirlos en la medida de lo posible a fin de evitar tragedias y pérdidas de vidas humanas dentro de un determinado territorio.

La Organización Mundial de la Salud (OMS) señala que cada año fallecen más de 1,35 millones de personas en todo el mundo a causa de los siniestros de tránsito, es decir una muerte cada 25 segundos, lo que los convierte en la causa más frecuente de decesos entre las personas de 15 a 29 años y en la novena más común en la población general. Los países de ingresos bajos y medianos tienen la mayor carga y las tasas más altas de mortalidad por siniestros de tránsito.

![](/media/830509bb33c469b3.webp)

Los accidentes de tránsito en Ecuador tienen una ocurrencia bastante común, solo en la ciudad de Guayaquil entre el 2018 y el 2021 se registraron 17 671 accidentes con al menos un fallecido y 17 681 accidentes con al menos una persona lesionada de gravedad según fuentes oficiales de la Agencia de Tránsito y Movilidad (ATM); institución encargada de la seguridad vial en dicha ciudad.

![](/media/f9d02960ca6ff43a.webp)

![](/media/78910040ad14b82a.webp)

![](/media/7ca25837fce7f08f.webp)

## Descripción del problema

En base a lo mencionado anteriormente se plantea el siguiente problema:  
¿Se puede crear un sistema web que optimice los recursos de la agencia de tránsito y permita prevenir accidentes graves y/o fatales en la ciudad de Guayaquil?

## Objetivo general

Se plantea como objetivo general implementar un modelo de Machine Learning para la estimación temprana de accidentes de tránsito graves o fatales mediante el análisis de datos previos relacionados a accidentes de tránsito en la ciudad de Guayaquil.

El siguiente gráfico muestra la idea central del proyecto.

![](/media/6adfb51eb68e632a.webp)

## Recolección de la información

La fuente principal de información es el dataset estructurado de la ATM que incluye ciertas condiciones suscitadas durante un siniestro. Luego de un análisis exhaustivo de las diferentes variables obtenidas, se procedió a descartar algunas de ellas debido a que no tenían dependencia significante con los siniestros, esta selección fue basada en artículos científicos relacionados con el tema.

Por motivos de privacidad de la ATM no podemos mostrar imágenes del dataset utilizado, sin embargo daremos información sobre las variables utilizadas:

![](/media/851ac01465243040.webp)

## Selección de los modelos

La selección de los modelos parte de las siguientes dos consideraciones:

-   Facilidad de su implementación.
-   Rendimiento del modelo.

Los modelos a desarrollarse son:

-   SVM (Máquina de Soporte Vectorial)
-   Random Forest
-   Regular Gradient Boosting

![](/media/191cb48760d42279.webp)

![](/media/4eb6678d07d6af98.webp)

![](/media/96a599ae3b4884e7.webp)

## Técnicas implementadas

Las principales técnicas utilizadas para trabajar con el Dataset fueron la codificación de las variables categóricas a través del One-Hot-Encoding y la estandarización de las variables continuas.

![](/media/bd25ceb0a8811a7b.webp)

![](/media/16a07d8b3c9c6323.webp)

## Evaluación de modelos

### SVM (Máquina de soporte vectorial)

![](/media/115c6ca097c7afd1.webp)

### Random Forest

![](/media/d429f26193e2291d.webp)

### Regular Gradient Boosting

![](/media/137d41d6184bc485.webp)

![](/media/d313c27775a47737.webp)

## Análisis de resultados

A continuación se muestran los resultados y precisión de los modelos SVM, Random Forest y Regular Gradient Boosting.

### SVM

![](/media/825ed482f79e5546.webp)

![](/media/59a8f242700dc17e.webp)

### Random Forest

![](/media/7378c21185b2ab22.webp)

![](/media/2571c8456f132808.webp)

### Regular Gradient Boosting

![](/media/40be2c1dbee4055f.webp)

### Precisiones finales

![](/media/52a6d343e14c0731.webp)

## Conclusiones

El sistema se mostrará como una perfecta alternativa para la detección de accidentes graves y/o fatales, ya que permite visualizarlos durante cada hora en un mapa interactivo incrustado en una interfaz web.

Además, los modelos utilizados se encuentran entre los mejores para poder realizar clasificaciones multiclase, lo cual era el meollo del problema desde el inicio del mismo.

## Planes a futuro

El presente proyecto tiene la intención de ser llevado las siguientes agencias e instituciones:

-   Agencia de Tránsito y Movilidad (ATM)

![](/media/ba531d0d78c78111.webp)

-   Comisión de Tránsito del Ecuador (CTE)

![](/media/26e8ed6b67d24643.webp)

-   Agencias e instituciones destinadas al control del tránsito de los GAD y municipios que se encuentren en categoría A.

## Integrantes

Ing. [Miguel Angel Murillo Arteaga](https://medium.com/@miguelangelmurilloarteaga) (miguelangelmurilloarteaga@gmail.com)

Ing. Christopher Vaccaro (chris\_94\_vacced@hotmail.com)

Ing. Stefany Uguña (solange95salazar@gmail.com)

Grace Reyes (grace.reyes22@gmail.com)

Wladimir Robles (W.Robles.Asociados@gmail.com)

## Presentación del proyecto: Demoday

[Abrir vídeo o recurso](https://www.youtube.com/embed/Qq8Sbkh5fnQ?start=8097&feature=oembed)

## Repositorio

[https://github.com/SaturdaysAI/Projects/tree/master/LATAM\_remote/viasegura](https://github.com/SaturdaysAI/Projects/tree/master/LATAM_remote/viasegura)

![](/media/6e1f8abf6cf3eaa5.webp)

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

Si quieres aprender más inteligencia artificial, únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
