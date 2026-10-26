---
title: "GANs: Inteligencia Artificial para colorear videos"
description: Un equipo de La Paz utiliza U-Net-GAN para dar color a vídeos
  históricos de Bolivia y comparte su proceso, resultados y limitaciones.
pubDate: 2022-01-02
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Agua Industria Innovación e Infraestructura
  - GAN
  - Imágenes
image: /media/da4acebd9ff2dea9.webp
imageAlt: "GANs: Inteligencia Artificial para colorear videos"
legacyPath: /2022/01/02/gans-inteligencia-artificial-para-colorear-videos/
sourceUrl: https://saturdays.ai/2022/01/02/gans-inteligencia-artificial-para-colorear-videos/
sourceId: 5115
language: es
draft: false
---

![](/media/da4acebd9ff2dea9.webp)

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

Durante la última década, la explosión de la cantidad de datos disponibles, la optimización de algoritmos y la evolución constante de la potencia informática han permitido que la inteligencia artificial (IA) realice cada vez más tareas humanas \[1\]. Y desde hace un tiempo la inteligencia artificial se ha convertido en una poderosa herramienta para devolvernos al pasado. Lo demuestran la cada vez mayor cantidad de imágenes y videos restaurados a través de diferentes técnicas de inteligencia artificial, como por ejemplo la capacidad de colorear videos en blanco y negro.

En términos de coloración de imágenes y videos la Inteligencia artificial ha evolucionado y durante los últimos años se ha observado una mejora significativa. Ya que la coloración manual requiere una gran cantidad de tiempo y es un proceso costoso, la aplicación de técnicas de inteligencia artificial es una gran opción para este tipo de tareas porque es capaz de trabajar por sí misma y colorear automáticamente en un corto periodo de tiempo \[2\].  

##   
**Problemática**

Existen pocos registros filmográficos que capturen la vida cotidiana de antaño de nuestro país es por ello que quisimos tener otra perspectiva de estos videos añadiendo color a los pocos que encontramos.  

##   
**Objetivo**

Extraer imágenes de videos antiguos para darles color haciendo uso de una red GAN, para posteriormente generar un video a color.  

##   
**Dataset**

El dataset se pudo obtener a partir de videos encontrados en youtube, de tipo documental y grabaciones de los distintos paisajes de Bolivia, se usaron 10 videos distintos ya que se tienen videos antiguos a color, que tienen un color más opaco, otros videos de los paisajes con un color más definido pero con una calidad no mayor a 480p, y otro con una calidad mayor. No se tomaron todos los frames de estos ya que se optó por usar los frames significativos y asi no tener varios frames de una misma escena.

![](/media/0a95ad388bb4e7b6.webp)

![](/media/6c57c0f868980912.webp)

![](/media/1b225e79f0f3635d.webp)

![](/media/c749beacecc3dc49.webp)

![](/media/1d1a1ad945c6af33.webp)

##   

**Selección del modelo y técnicas usadas**

La arquitectura usada para colorear mediante Inteligencia Artificial fue la de Unet-GAN por su gran capacidad para sintetizar las características de las imágenes lo que mejora ampliamente los resultados finales.

Una red generativa antagonica (GAN) tiene dos redes. Una es el discriminador que intentará discriminar entre imágenes reales y falsas. Y la segunda red de la GAN ​​es el generador que se encargará de generar imágenes falsas pero muy cercanas a las imágenes originales más bien podemos decir que las imágenes falsas estarán en la misma distribución de las imágenes originales.

UNET se utiliza básicamente en problemas de segmentación de imágenes donde las dimensiones de entrada y salida son las mismas. GAN intenta generar nuevas imágenes a partir de un ruido aleatorio. Entonces, el generador de GAN tiene muy pocas dimensiones en la entrada, pero la salida es en gran dimensión. Puede usar UNET como generador en el GAN ​​(pix2pix usa esto).

En este caso, generará imágenes falsas no a partir de ruido aleatorio sino de otra imagen de referencia. Tiene otras opciones como red deconvolución, codificador automático, etc.

Al inicio se realizó la obtención de videos, se segmentó los videos en frames que se usaron como ground truths, se estandarizó las imágenes a un tamaño y se hizo la conversión de los frames RGB a grayscale para usarlos como inputs. Al finalizar con el proceso de colorización se unió los frames resultantes para convertirlos de nuevo en video.

##   
**Análisis de resultados**

En la gráfica 1 podemos observar la pérdida del discriminador y la del generador y se puede ver que existe una tendencia exponencial y que la pérdida es estacionaria en el valor 0.4 para el discriminador y 0 para el generador.

![](/media/a0c8cc98eaf768c5.webp)

Gráfica 1. Pérdida del discriminador y del generador

Se puede apreciar en las imágenes de entrenamiento con 600 épocas que se llega a tener un color correcto, pero no tan intenso como en las imágenes RGB reales, también se puede ver que llega a tener errores cuando se tiene una sección con mayor brillo en la imagen, como ser rayos del sol o secciones de blanco.

![](/media/d2408f1c9c5ae0b8.webp)

![](/media/8cc78e98f9a8df86.webp)

![](/media/968385d32bae3cd7.webp)

Con las imágenes de testeo se puede ver que las imágenes se llegan a colorear pero se sigue teniendo el problema con las secciones de brillo y que tiene una mayor predisposición a la gama de rojos y azules.

![](/media/31fb7a7a1f800df4.webp)

![](/media/24dfb6929dc7e1cf.webp)

![](/media/65270c6c05d7c23d.webp)

![](/media/3db1ab8d995e0cb4.webp)

En las imagenes del video en blanco y negro elegido para poner a prueba nuestro modelo se tiene una buena coloracion siendo que al ser una grabacion de la ciudad de La Paz-Bolivia se tiene más imagenes de edificios no se necesita tener una gran variedad de colores, el color más intenso que se ve es en el cielo.

![](/media/52496b84b9c612bf.webp)

##   
**Conclusión y recomendaciones**

Se logró implementar un modelo con arquitectura Unet-GAN capaz de colorear imágenes en blanco y negro y con el conjunto de las imagenes coloreadas se obtuvo un video a color, todo este proceso nos permitio familiarizarnos con modelos de Inteligencia Artificial del tipo Deep Unsupervised Learning, preparación de datasets, lenguaje Python, librerias especializadas en Deep learning y Colab como herramienta para la implementacion de nuestro modelo. Los resultados son aceptables sin embargo quedan algunas falencias que subsanar como que ciertas imágenes con brillo que forman parte de nuestro dataset de entrenamiento presentan error al momento de ser reproducidas por la GAN, además algunas colorizaciones no son completas, esto debido a que el dataset no contaba con muchas variaciones de color, por lo tanto es recomendable ampliar la paleta de colores con las que se realiza el entrenamiento.[project\_color.mp4Edit descriptiondrive.google.com](https://drive.google.com/file/d/1jQOqKoCYIXJaah5j4zA6nWcPJxh1fPCQ/view?usp=sharing)

##   
**Bibliografía**

\[1\] _Una introducción básica a las GAN (Generative Adversarial Networks)_. (n.d.). Retrieved December 4, 2021, from [https://ichi.pro/es/una-introduccion-basica-a-las-gan-generative-adversarial-networks-217887110266867](https://ichi.pro/es/una-introduccion-basica-a-las-gan-generative-adversarial-networks-217887110266867)

\[2\] _film colorization, colorize video, colorize black and white videos, colorize video software, film colorization software, colorization of film_. (n.d.). Retrieved December 4, 2021, from [https://pixbim.com/film-colorization](https://pixbim.com/film-colorization)

##   
Códigos

-   Código para la recoleccion del dataset a partir de videos descargados de youtube

[Coloracion-de-videos-/Recoleccion\_Dataset.ipynb at 41b78017da7ae1f54cff0276e1407a57892d8090 -…Proyecto final Saturdays AI, consiste en la coloración de videos con GANs …github.com](https://github.com/DanielaCentellas/Coloracion-de-videos-/blob/41b78017da7ae1f54cff0276e1407a57892d8090/Recoleccion_Dataset.ipynb)  

-   Código para el entrenamiento del modelo

[Coloracion-de-videos-/Entrenamiento\_modelo\_Proyecto.ipynb at…Proyecto final Saturdays AI, consiste en la coloración de videos con GANs …github.com](https://github.com/DanielaCentellas/Coloracion-de-videos-/blob/41b78017da7ae1f54cff0276e1407a57892d8090/Entrenamiento_modelo_Proyecto.ipynb)  

-   Código para la implementación de los pesos del modelo previamente guardados

[Coloracion-de-videos-/Implementacion\_modelo.ipynb at 41b78017da7ae1f54cff0276e1407a57892d8090 -…Proyecto final Saturdays AI, consiste en la coloración de videos con GANs …github.com](https://github.com/DanielaCentellas/Coloracion-de-videos-/blob/41b78017da7ae1f54cff0276e1407a57892d8090/Implementacion_modelo.ipynb)

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/L4o5tZNqyxs?start=4785&feature=oembed)

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esa aplicación: https://github.com/SaturdaysAI/Projects/tree/master/Lapaz/2021.DL/Coloracion-de-videos-main

##   
¡Más inteligencia artificial!

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)

-   [Deep Learning](https://medium.com/saturdays-ai/tagged/deep-learning)
-   [Gans](https://medium.com/saturdays-ai/tagged/gans)
-   [Photography](https://medium.com/saturdays-ai/tagged/photography)
-   [Machine Learning](https://medium.com/saturdays-ai/tagged/machine-learning)
-   [Ai Saturdays](https://medium.com/saturdays-ai/tagged/ai-saturdays)



WRITTEN BY

## [Daniela Centellas Yucra](https://medium.com/@daniela.centellas.yucra?source=follow_footer-----96c5ec076408-----------------------------------)

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----96c5ec076408-----------------------------------)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----96c5ec076408-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education.
