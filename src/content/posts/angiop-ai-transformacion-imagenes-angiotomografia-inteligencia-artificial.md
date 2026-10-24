---
title: Transformación de Imágenes de Angiotomografía por medio del uso de
  Inteligencia Artificial.
description: Latam online. Segunda Edición. 2021 Angiotomografías con contraste
  ¿Cuál es el problema? El reto Los medios de contraste vía endovenosa que se
  usan en las angiotomografias contrastadas pueden tener incidencia en la salud…
pubDate: 2022-03-09
author: Info Saturdays
category: AI for good
kind: project
tags:
  - CycleGan
  - Deep Learning
  - Imágenes
  - Salud y Bienestar
image: /media/453c908ba4f875ed.webp
imageAlt: Transformación de Imágenes de Angiotomografía por medio del uso de
  Inteligencia Artificial.
legacyPath: /2022/03/09/angiop-ai-transformacion-imagenes-angiotomografia-inteligencia-artificial/
sourceUrl: https://saturdays.ai/2022/03/09/angiop-ai-transformacion-imagenes-angiotomografia-inteligencia-artificial/
sourceId: 6018
language: es
draft: false
---

## 

_[Latam online](https://saturdays.ai/latam-online/). Segunda Edición. 2021_

## Angiotomografías con contraste ¿Cuál es el problema?

![](/media/b77b9ffd571868fb.webp)

## El reto

Los medios de contraste vía endovenosa que se usan en las angiotomografias contrastadas pueden tener incidencia en la salud nefrológica de los pacientes, sobre todo en aquellos que tienen antecedentes de hipertensión arterial, hipercolesterolemia, antecedentes genéticos, en edad adulta mayor (60 años en adelante) y un riesgo cardiovascular aumentado (1), es decir, son más propensos a:

-   tener accidentes cerebrovasculares,
-   infarto agudo de miocardio,
-   enfermedad arterial periférica y,
-   enfermedades de la aorta en general

Existe la posibilidad de realizar angiotomografias simples que no requieren el uso de medios de contraste y que tienen un costo menor (alrededor de $200,00 de diferencia), pero estas no permiten una visualización completa de las estructuras aórticas con claridad (2), por lo que no son útiles en muchos casos, como en el de Jesús.

![](/media/ecf272159604edbb.webp)

### Por qué escogimos Angiotomografías?

![](/media/38f6ed8eae67a7bd.webp)

![](/media/8b00ed8c410b83ea.webp)

# La oportunidad ¿Cómo proponemos solucionarlo?

ANGIOP.AI (Sistema de Transformación de Imágenes de Angiotomografía) genera avances significativos en el análisis de imágenes médicas mediante modelos de análisis de inteligencia artificial para angiotomografias, brindando una alternativa que signifique un menor impacto para la salud de los pacientes que, por su diagnóstico y estado general, requieren realizarse este tipo de análisis de manera recurrente.

![](/media/dc8640ee09f80f7c.webp)

Figura 1. Estructura del modelo GAN aplicado a la transformación de imágenes de Angiotomografía  

ANGIOP.AI basa su funcionamiento en el entrenamiento, validación y evaluación de un modelo CycleGAN para procesar imágenes de angiotomografias sin contraste y transformarlas en imágenes similares a las que se obtendrían usando métodos de contraste; se entrena un CycleGan para leer una imagen de un dataset X (imágenes sin contraste) y transformarlo para que parezca como si perteneciera a un dataset Y (imágenes con contraste).

## ¿Cuáles son los beneficios?

![](/media/c4272855ef5dd188.webp)

ANGIOP.AI está alineada al cumplimiento de los objetivos de desarrollo sostenible de las Naciones Unidas al 2030.

![](/media/46f28729f4e91148.webp)

## Lo explicamos paso a paso: metodología, modelo usado y datasets

Los datasets utilizados corresponden a los provistos por el Dr. Gonzalo Pullas, director de la carrera de Medicina en la Universidad de las Fuerzas Armadas; quien facilitó las imágenes de angiotomografias con contraste y angiotomografias simples (sin contraste) de 10 pacientes anónimos.

El total de imágenes facilitadas fueron de 5.144, de tamaño 512 x 512, en escala de grises, a las que se les aplicó una exploración de los datos — análisis estadístico para descartar imágenes a color y en 3D, sin datos atípicos y con Diferencias en distribución de pixeles (zonas / cortes). Es importante mencionar que las angiotomografías fueron tomadas en la misma zona anatómica, pero en diferentes oportunidades, es decir, las imágenes no corresponden a una paridad 1:1.

El modelo utilizado es CycleGan con pre-procesamiento de imágenes de escala -1 a 1 para la entrada del modelo. Los discriminadores son redes convolucionales con 5 capas que receptan imágenes de 256×256. Las 4 capas son de definición de patrones y una capa de clasificación. El generador utiliza tres capas convolucionales y seis bloques residuales. Para el cálculo de las funciones de costos, tanto para las imágenes reales como falsas, se está utilizando el proceso del error cuadrático medio (mean squared error).

El modelo utiliza los siguientes parámetros:

-   20000 épocas
-   Tasa de aprendizaje del 0,0001

Para el entrenamiento se aplicaron los siguientes pasos:

-   Seleccionar una cantidad de imágenes reales
-   El generador toma las imágenes reales y les agrega ruido para crear una cantidad de imágenes falsas
-   Entrenar al discriminador, haciendo que clasifique las imágenes como falsas o verdaderas un cierto número de veces o épocas
-   Generar otra cantidad de imágenes falsas para entrenar el generador
-   Se entrena al modelo
-   Para finalizar el modelo, se debe revisar la veracidad de la ejecución, revisando el gráfico de pérdidas a través del tiempo y revisando las muestras generadas por el modelo.

![](/media/71c5886c5ea297b0.webp)

Veamos los resultados:

[Abrir vídeo o recurso](https://www.youtube.com/embed/Zv9DC27_ABw?feature=oembed)

## Lecciones aprendidas

-   Enseñar al modelo a validar las imágenes de entrada si corresponde a la zona angio toráxica.
-   Aumentar el Dataset para futuros entrenamientos.
-   Se requiere una validación de las imágenes generadas con un panel de expertos médicos.

## Lo que se viene: Futuro de ANGIOP.AI

-   Usar la data generada para medir el impacto del uso del sistema en reducción de incidencia de enfermedades renales.
-   Desarrollar una aplicación Web.

## **Referencias**

(1) Cueva Torres, Dr., F. (2021). [Epidemiología y Manejo de las Enfermedades de la Aorta — SIAC.](https://www.siacardio.com/academia/lideresemergentes/editorialesle/epidemiologia-y-manejo-de-las-enfermedades-de-la-aorta/) Sociedad Interamericana de Cardiología.

(2) RadiologyInfo para pacientes (2020). [Materiales de Contraste.](https://www.radiologyinfo.org/es/info/safety-contrast)

(3) [World Heart Federation (2016) World Congress of cardiology & Cardiovascular Health](https://world-heart-federation.org/wp-content/uploads/2017/05/spanish-press-release.pdf)

(4) Ferreira, J (2017) [Actualidad en nefropatía por medio de contraste](https://www.elsevier.es/es-revista-nefrologia-latinoamericana-265-articulo-actualidad-nefropatia-por-medio-contraste-S2444903217300185). Universidad Pontificia Bolivariana, Medellín — Colombia. ELSEVIER Volumen 14 Número 2

## Integrantes

_Diego Chiza, Ana Gayosso, Gabriela Jiménez, Paola Peralta, [Patricia Román](https://medium.com/@rosettepr) José Daniel Sacoto, María Teresa Vergara, Hilario Villamar, David Medrano._

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/Qq8Sbkh5fnQ?start=9531&feature=oembed)

## Repositorio

El código fuente de este proyecto se puede encontrar en: [github](https://github.com/SaturdaysAI/Projects/tree/master/LATAM_remote/angiop.ai)

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
