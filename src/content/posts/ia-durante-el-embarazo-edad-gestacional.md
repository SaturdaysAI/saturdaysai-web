---
title: ¿Cómo se aplica la inteligencia artificial durante el embarazo? ¿Cómo
  podemos calcular la edad gestacional a partir de la IA?
description: La edad gestacional es el indicador que nos permite poder realizar
  un seguimiento más exhaustivo del embarazo. Este se calcula a partir del
  perímetro biparietal del cráneo y la circunferencia craneal en el primer
  trimestre, a…
pubDate: 2022-03-09
author: Info Saturdays
category: Community
kind: article
tags:
  - Control embarazo
  - Edad gestacional
  - IA
image: /media/93952f2f779c2e4b.webp
imageAlt: ¿Cómo se aplica la inteligencia artificial durante el embarazo? ¿Cómo
  podemos calcular la edad gestacional a partir de la IA?
legacyPath: /2022/03/09/ia-durante-el-embarazo-edad-gestacional/
sourceUrl: https://saturdays.ai/2022/03/09/ia-durante-el-embarazo-edad-gestacional/
sourceId: 6463
language: es
draft: false
---

La edad gestacional es el indicador que nos permite poder realizar un seguimiento más exhaustivo del embarazo. Este se calcula a partir del perímetro biparietal del cráneo y la circunferencia craneal en el primer trimestre, a diferencia del segundo y tercero que, además de estos parámetros, se añade la longitud del fémur.


La aplicación de la Inteligencia Artificial para la evaluación del diagnóstico fetal a partir del ultrasonido permite conseguir unos resultados iguales o con menos errores a diferencia del método tradicional. Esto se consigue a partir del plano axial transtalámico del cerebro a través de una ecografía 2D y comparándolo con las fórmulas actuales basadas en parámetros biométricos fetales estándar en un gran cohorte de anteriores embarazos.


El nuevo método de cálculo para la edad gestacional a partir de plano axial transtalámico fue desarrollado a partir del uso de _DeepLearning_. El estudio se realizó a partir de un total de 1394 imágenes de pacientes previas embarazadas y la ayuda de especialistas maternofetales, siendo estas etiquetadas manualmente con la orientación y puntos de referencia cerebrales específicos utilizando un software de computadora. Este fue necesario para que aprendiera a localizar el cerebro en la imagen conocido a día de hoy como _quantusGA_.


En la siguiente imagen, podemos ver detalladamente como funciona _quantusGA_:

![](/media/93952f2f779c2e4b.webp)

Una vez recibida la imagen de ultrasonido del cerebro fetal en formato DICOM como _imput_, en cuestión de días se genera automáticamente un _output_ con la edad gestacional (GA/EG).


El programa quantus GA nos permite, en primer lugar, detectar la posición y orientación del cráneo fetal. Seguidamente, a partir de los puntos clave se puede cortar la imagen o rotar esta misma permitiendo visionar la posición deseada. En último lugar, también se puede extraer información sobre la textura y el tamaño del cerebro. Todo esto con la finalidad de generar la EG.


El estudio que se realizó posteriormente utilizando python (Python Software Fundation, Wilmington, DE) con el fin de afirmar si la Inteligencia Artificial mejora la predicción de la edad gestacional en el segundo y tercer mes de embarazo concluyó con unos resultados iguales o incluso con menores errores en comparación a los parámetros fetales biométricos utilizados tradicionalmente. Así mismo, con la utilización de la imagen entera y su resolución, el método nos permite los cambios relevantes para la estimación de la EG que a diferencia del ojo humano probablemente asociados al crecimiento y maduración del cerebro.


Así pues la IA nos ayuda mayoritariamente a predecir la edad gestacional del bebé contribuyendo a un cuidado óptimo prenatal. Poder acceder a esta es esencial para actuar en múltiples intervenciones perinatales entre las cuales destacan: la inducción del parto, la maduración pulmonar fetal o incluso la reanimación pulmonar. Por otra parte, este método se podría implementar en un programa automatizado aplicable a cualquier máquina de ultrasonidos. Por lo tanto, esto se podría aplicar en numerosas áreas del planeta y tener un mayor impacto en sitios dónde obtener una ecografía en el primer trimestre de embarazo es difícil.


Además, puede ofrecer muchas otras ventajas, entre las cuales cabe destacar:

-   Mejor atención a las embarazadas
-   Pacientes más tranquilas
-   Reducción de las tasas de mortalidad materno-fetal
-   Mejor control de cambios en la patología

## **Bibliografía:**

1.- Xavier P Burgos-Artizzu , David Coronado-Gutiérrez , Brenda Valenzuela-Alcaraz , KilianVellvé , ElisendaEixarch, FatimaCrispi, Elisenda Bonet-Carne, Mar Bennasar, EduardGratacos. **Analysis of maturation features in fetal brain ultrasound via artificial intelligence for the estimation of gestational age.** August 14, 2021. Am J ObstetGynecol MFM.

## WRITTEN BY

#### Eva Arnall

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----32715df8e699-----------------------------------)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----32715df8e699-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education.
