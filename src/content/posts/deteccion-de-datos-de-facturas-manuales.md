---
title: Detección de datos de facturas manuales
description: La Paz. Deep Learning. 2021 Introducción La declaración de facturas
  es uno de los deberes que tienen un porcentaje de la población boliviana, ya
  sean contribuyentes dependientes o independientes. Si bien es posible
  importar…
pubDate: 2021-11-22
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Bolivia
  - Craft
  - Deep Learning
  - Keras Ocr
  - Ocr
  - Red Neuronal
  - Texto
  - Trabajo Decente y Crecimiento Económico
image: /media/8cc841e703b764ce.webp
imageAlt: Detección de datos de facturas manuales
legacyPath: /2021/11/22/deteccion-de-datos-de-facturas-manuales/
sourceUrl: https://saturdays.ai/2021/11/22/deteccion-de-datos-de-facturas-manuales/
sourceId: 4616
language: es
draft: false
---

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

### Introducción

La declaración de facturas es uno de los deberes que tienen un porcentaje de la población boliviana, ya sean contribuyentes dependientes o independientes. Si bien es posible importar los datos de una factura electrónica por medio del escaneo de un código QR. El realizar dicha transcripción de una factura manual llega a ser más complicado, lento y moroso, a la hora de transcribir el número de NIT, el número de autorización y el número de factura de cada una. Especialmente para personas que no son muy familiarizadas con sistemas computacionales, siendo este una parte importante de la población adulta en Bolivia.

![facturas](/media/8cc841e703b764ce.webp)

**Figura 1.** Imágenes de una Factura Manual

![facturas](/media/74f8ac3a5ba5cc0c.webp)

**Figura 2.** Imágenes de una Factura Manual y una Factura Digital

Es por ello, que el presente proyecto es un prototipo de un sistema de reconocimiento óptico de caracteres que identifique los valores previamente mencionados. Y por consiguiente permita al usuario exportar dicha información en un archivo CSV o XLSX, para su fácil importación en la plataforma de declaración de facturas SIAT (Sistema Integrado de Administración Tributaria).

![](/media/edd3a7ef4f563cc5.webp)

**Figura 3.** Pantalla principal de la plataforma SIAT, para la importación de datos de facturación.

![](/media/7f6883e98df55543.webp)

**Figura 4.** Botón de importación de archivos xls o xlsx.

### Descripción del problema

El problema identificado es la cantidad de tiempo que se invierte a la hora de transcribir la información de cada una de las facturas manuales; tanto a personas con tiempo limitado por múltiples actividades personales o profesionales, como a personas con poca habilidad computacional.

### Objetivo

El proyecto busca facilitar la detección de los datos más largos de facturas manuales, siendo estos el número de NIT de la empresa, el número de autorización, y el número de factura. Para su posterior exportación en formatos CSV o XLSX para su posterior importación en la página de Mis Facturas del SIAT (Sistema Integrado de Administración Tributaria).

### Selección del modelo

#### **CRAFT**

Se utiliza CRAFT (_Character-Region Awareness For Text detection)_ \[1\], esto debido a que nos permite localizar las regiones de caracteres individuales y vincular los caracteres detectados a una instancia de texto. Se podría haber utilizado Tesseract el cual es un módulo de ORC pero falla en textos con curvas y formas irregulares en ciertos tipos de fuentes.

![CRAFT](/media/92e2ce4023a079a0.webp)

**Figura 5.** Ilustración esquemática de la Arquitectura del modelo CRAFT

La arquitectura se basa en la red neuronal convolucional CNN, VGG-16 \[2\], es esencialmente para la extracción de características que se utiliza para codificar la entrada de la red en una determinada representación de características y el segmento de decodificación de la red CRAFT.

![](/media/cbcd08aff55bd3b6.webp)

**Figura 6.** Modelo de la CNN VGG-16.

### Técnicas implementadas

Las técnicas implementadas por el modelo CRAFT son las básicas para la detección de caracteres, como ser: cortes, rotaciones y/o también variaciones de colores.

![](/media/465762e85334ce1c.webp)

**Figura 7.** Procedimiento de división de caracteres para lograr anotaciones a nivel de caracteres a partir de anotaciones a nivel de palabra: 1) Se recorta la imagen a nivel de palabra; 2) Se predice la puntuación de la región; 3) Se aplica el algoritmo _watershed_; 4) Se obtienen los cuadros delimitadores de caracteres; 5) Se desempaquetan los cuadros delimitadores de caracteres.

### Evaluación de modelos

Al ser un modelo pre-entrenado de KERAS-OCR, con el modelo de CRAFT \[3\]. Podemos ver su eficacia con respecto a otros modelos similares para la detección de caracteres:

.

![](/media/cd6d9e195601a2c0.webp)

**Figura 8.** Comparativa de diferentes modelos, donde se utilizaron los dataset ICDAR y MSRA-TD500. Dónde: P es la Precisión, R es Recall, H es la H-mean y FPS los cuadros analizados por segundo \[4\].

### Análisis de resultados

Una vez importada la imagen de la factura, se obtienen todos los valores que son detectados en la misma. Por lo que cortamos la imagen en dos, para tener solamente la parte derecha; donde se encuentran los datos que intentamos recopilar. Ya que como se ve en la Figura 9, la cantidad de datos es excesiva.

![](/media/63cd7df5b57ea00c.webp)

**Figura 9.** Detección de caracteres de una factura manual.

Una vez tenemos todos los datos detectados y convertidos en tipo STRING, en un dataframe creado con Pandas. Comparamos cada una de las columnas, buscando el texto deseado. Por tal motivo, comparamos la cantidad de caracteres que tiene el NIT del proveedor (de 8 a 10 caracteres), el Número de autorización (14 a 16 caracteres) y el Número de factura (4 a 6 caracteres). Por lo que, hallamos tras la búsqueda de columnas el valor deseado.

![](/media/c5f56df442554763.webp)

**Figura 10.** Detección de valores deseados, transformación a un dataframe con Pandas y conversión de los datos a STRING para su posterior comparación.

Finalmente, guardamos estos valores en un _dataframe_ creado, con la misma distribución que pide el sistema de mis facturas de la plataforma SIAT. Y exportamos en CSV, o XLSX. Y como se ve en la figura 11.

![](/media/7304f133c93c022e.webp)

**Figura 11.** Exportación de datos generados a los archivos CSV y XLSX.

### Conclusión

Por medio de este prototipo, se puede identificar los valores más relevantes y complicados de transcribir para la mayoría de las personas que realizan su declaración de facturas. Además, que el importarlos desde una foto o imagen escaneada reduce drásticamente el tiempo de transcripción de datos. Lo que sería de mucha ayuda para personas no muy familiarizadas con las computadoras, como un buen porcentaje de adultos mayores en el país.

Si bien, muchos datos son identificados. El mayor problema reside en la calidad de la imagen tomada, ya que si esta no tiene una buena nitidez o tamaño llega a tener problemas con la identificación de algunos caracteres. Y que para trabajos futuros se podría intentar solventar con un entrenamiento más personalizado y no basándose en uno pre entrenado.

A su vez, el realizar una GUI (Interfaz gráfica de usuario), ayudaría bastante en poder llevar a este prototipo a ser más amigable con el usuario. Y por ende, facilita la importación de imágenes o facturas escaneadas para su reconocimiento de caracteres y exportación final.

#### **Código**

[https://github.com/albmarale/SaturdaysAIDeepLearning](https://github.com/albmarale/SaturdaysAIDeepLearning)

### Bibliografía

\[1\] “PyTorch: Scene Text Detection and Recognition by CRAFT and a Four-Stage Network | by Nikita Saxena | Towards Data Science.” [https://towardsdatascience.com/pytorch-scene-text-detection-and-recognition-by-craft-and-a-four-stage-network-ec814d39db05](https://towardsdatascience.com/pytorch-scene-text-detection-and-recognition-by-craft-and-a-four-stage-network-ec814d39db05) (accessed Jul. 13, 2021).

\[2\] M. ul Hassan, “VGG16-Convolutional Network for Classification and Detection,” _en l{\\’\\i}nea\].\[consulta 10 abril 2019\]. Dispon. en https//neurohive. io/en/popular-networks/vgg16_, 2018.

\[3\] F. Morales, “keras-ocr — keras\_ocr documentation,” 2021, Accessed: 13-Jul-2021. \[Online\]. Available: [https://keras-ocr.readthedocs.io/en/latest/.](https://keras-ocr.readthedocs.io/en/latest/)

\[4\] Y. Baek, B. Lee, D. Han, S. Yun, and H. Lee, “Character region awareness for text detection,” in _Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition_, 2019, pp. 9365–9374.

Este proyecto fue elaborado por:

-   Albert Martínez Alegría
-   Alvaro Alanoca Huaycho
-   Belinda Alcón Sullcani
-   Rodrigo Aliaga

Para el programa [Saturdays.AI La Paz](https://www.facebook.com/saturdaysailp/).

## Presentación del proyecto: DemoDay

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esa aplicación: https://github.com/SaturdaysAI/Projects/tree/master/Lapaz/2021.DL/Deteccion-facturas-manuales-main

## ¡Más inteligencia artificial!

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

Si quieres aprender más sobre este proyecto (y otros) únete a nuestra [comunidad](http://community.saturdays.ai/) en o aprende a crear los tuyos en nuestro programa AI Saturdays.

![](/media/79a0c3835eae8c06.webp)

WRITTEN BY

[Albert Mario Martínez Alegría](https://medium.com/@al.martinez.alegria?source=follow_footer-----4423b577df5e-----------------------------------)
