---
title: "FindPet: Identificación de mascotas perdidas con Inteligencia Artificial"
description: La Paz. Deep Learning. 2021 En este artículo utilizaremos técnicas
  de Inteligencia Artificial para encontrar mascotas perdidas. Aquellas personas
  que han perdido a una mascota por diferentes motivos saben que aunque muchas…
pubDate: 2021-11-21
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Imágenes
  - Red Neuronal
  - Vida de Ecosistemas Terrestres
image: /media/83d684a0e501a332.webp
imageAlt: "FindPet: Identificación de mascotas perdidas con Inteligencia Artificial"
legacyPath: /2021/11/21/identificacion-mascotas-inteligencia-artificial/
sourceUrl: https://saturdays.ai/2021/11/21/identificacion-mascotas-inteligencia-artificial/
sourceId: 4570
language: es
draft: false
---

![](/media/83d684a0e501a332.webp)

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

En este artículo utilizaremos técnicas de Inteligencia Artificial para encontrar mascotas perdidas. Aquellas personas que han perdido a una mascota por diferentes motivos saben que aunque muchas regresan a sus dueños un gran porcentaje no logra el reencuentro. Unas 420,000 mascotas, entre perros y gatos principalmente, se pierden anualmente en el Perú y son muy pocas las que son encontradas o devueltas a sus dueños, debido a que es muy difícil identificarlas.

La identificación de mascotas por lo general se hace a través de plaquitas metálicas colgadas en su cuello, con su nombre y el teléfono del propietario. Otros optan por insertarles un chip bajo la piel y algunos pocos, por lo costoso, prefieren los GPS e, incluso, tatuarlas. Ante la pérdida de sus mascotas, las personas optan por buscarlas mediante carteles pegados en postes, a través de redes sociales, anuncios en medios de comunicación u ofreciendo recompensas en dinero o con entradas a conciertos o partidos de fútbol. Es por ello, que el objetivo de este proyecto es poder ayudar a las personas a encontrar a sus mascotas perdidas mediante Inteligencia Artificial y Deep Learning para la identificación de sus mascotas de manera rápida, precisa y económica.

##   
Problemática

Diariamente, se calcula que se extravían aproximadamente entre 30 y 40 animales domésticos, entre perros y gatos, solamente en Lima. Sin embargo, se estima que esta cifra puede ser mayor, no solo al contabilizar el resto de las ciudades de Perú, sino también porque muchas personas no saben cómo o dónde pueden reportar la pérdida o extravío de su mascota. Muy pocas mascotas son encontradas o retornadas con sus dueños, debido a que es difícil poder identificarlas y hacer el rastreo correcto. Como consecuencia de ello, muchas de las mascotas terminan como animales callejeros causando sobrepoblación que terminan contaminando la ciudad con sus heces y los parásitos que son expulsados a través de estas.

##   
Objetivo

Desarrollar una aplicación que ayude a las personas a reportar y encontrar mascotas perdidas de manera rápida usando Inteligencia Artificial con técnicas de Deep Learning.

##   
**Datasets**

Se utilizaron datasets existentes y de acceso libre, para la clasificación de razas se utilizaron los datasets de [**_Stanford_**](http://vision.stanford.edu/aditya86/ImageNetDogs/) que contiene imágenes de 120 razas de perros de todo el mundo y [**_Thudogs_**](https://cg.cs.tsinghua.edu.cn/ThuDogs/) que contiene 130 razas de perros junto con los bounding boxes de todo el cuerpo y la cabeza del perro en cada imagen; mientras que para la identificación de mascotas se utilizó [**_Flickr_**](http://intranet.recod.ic.unicamp.br/~rwerneck/datasets/flickr-dog/#download) que contiene sólo los rostros del perro y está dividido por nombre del perro perteneciendo solo a dos tipos de raza: pugs y huskies.

![](/media/b764f64b106636cd.webp)

##   
Proceso de Identificación de Mascotas

El proceso de identificación de mascotas perdidas mediante Inteligencia Artificial consta de cuatro fases como se muestra en la siguiente figura, a continuación se detalla cada una de ellas.

![](/media/a8fe51e32950e9dd.webp)

-   FASE GRUESA: Clasificación de Razas

En esta fase, ingresa la imagen de un perro perdido o encontrado y se evalúa con el modelo de clasificación de razas y como output se obtiene el top N de razas a la que pertenece el perro, esto sirve como input para la fase media donde solo ingresarán las imágenes que se tenga en base de perros encontrados o perdidos que se tenga de estas “N” razas.  

-   FASE MEDIA: Detección de Rostro

En esta fase, se tiene como input la imagen del perro encontrado y el resultado de la clasificación de esta imagen obteniendo las imágenes de top N de las razas, para ser evaluados por el modelo de detección de rostros, en este caso yolo v5, obteniendo como output los bounding boxes del rostro del perro para cada imagen.  

-   FASE FINA: Identificación de la mascota

En esta fase, ingresa como input las imágenes del perro encontrado o perdido junto con las imágenes del top N ya recortadas el rostro utilizando los bounding boxes obtenidos de la fase media, para hacer el entrenamiento del modelo de identificación de rostro.  

-   DECISIÓN SUPERVISADA

Finalmente, para hacer una decisión más precisa utilizamos decisión supervisada con parámetros como la edad y el género del perro, para poder acotar y tener más precisión para identificar al perro correcto.

##   
Modelos

Para la construcción del modelo de clasificación de razas e identificación de mascotas se utilizó Redes Neuronales Convolucionales, específicamene Inception v3 y Xception, ya que que se trata de un problema de clasificación de imágenes con N posibles salidas, donde N es el número de razas o número de nombres de perros, en el caso del dataset de Stanford N tiene un valor de 120 , para Thudogs 130 y Flickr 42. Para la construcción del modelo de detección de rostro de la mascota se usó Yolo v5.  

-   **Inception v3**

Inception-v3 es una arquitectura de red neuronal convolucional de la familia Inception que realiza varias mejoras, incluido el uso de Label Smoothing, convoluciones factorizadas 7 x 7 y el uso de un clasificador auxiliar para propagar información de etiquetas en la parte inferior de la red, junto con el uso de batch normalización para capas en la cabecera lateral.

A continuación, se muestra el diagrama de arquitectura de Inception v3:

![](/media/92987f3fe56a6a5b.webp)



-   **Xception**

Xception significa “xtreme inception”. Esta arquitectura replantea la forma en que vemos las redes neuronales, en particular las redes convolucionales. Y, como sugiere el nombre, lleva los principios de Inception al extremo.

En una red convolucional tradicional, las capas convolucionales buscan correlaciones tanto en el espacio como en la profundidad. En Inception, comenzamos a separar los dos ligeramente. Usamos convoluciones 1×1 para proyectar la entrada original en varios espacios de entrada más pequeños y separados, y de cada uno de esos espacios de entrada usamos un tipo diferente de filtro para transformar esos bloques de datos 3D más pequeños. Xception lleva esto un paso más allá. En lugar de dividir los datos de entrada en varios fragmentos comprimidos, asigna las correlaciones espaciales para cada canal de salida por separado y luego realiza una convolución en profundidad 1×1 para capturar la correlación entre canales.

A continuación, se presenta el diagrama de arquitectura de Xception, donde los datos pasan primero por el flujo de entrada, luego por el flujo medio que se repite ocho veces y finalmente por el flujo de salida. Tenga en cuenta que todas las capas de convolución y convolución separable van seguidas de la normalización por lotes.

![](/media/f8ef408ab26a14e7.webp)



-   **Yolo v5**

Yolo v5 es un modelo de detección de objetos, y su primera versión oficial fue lanzada por Ultralytics. Como YOLO v5 es un detector de objetos de una sola etapa, tiene tres partes importantes como cualquier otro detector de objetos de una sola etapa.

-   **Model Backbone:** se utiliza principalmente para extraer características importantes de la imagen de entrada dada. En YOLO v5, las CSP — Cross Stage Partial Networks se utilizan como backbone para extraer una gran cantidad de características informativas de una imagen de entrada.
-   **Model Neck**: se utiliza principalmente para generar pirámides de características. Las pirámides de características ayudan a los modelos a generalizarse bien en la escala de objetos. Ayuda a identificar el mismo objeto con diferentes tamaños y escalas. Las pirámides de características son muy útiles y ayudan a los modelos a funcionar bien con datos invisibles. Hay otros modelos que utilizan diferentes tipos de técnicas de pirámide de características como FPN, BiFPN, PANet, etc.
-   **Model Head**: se utiliza principalmente para realizar la parte de detección final. Aplicó anchor boxes en features y genera vectores de salida finales con probabilidades de clase, objectness scores, y bounding boxes.

A continuación se muestra el diagrama de arquitectura de Yolo v5:

![](/media/dcb7cb69e1ee4db5.webp)

##   
Resultados

-   **FASE GRUESA: Clasificación de Razas**

![](/media/675000c290bc5fb7.webp)

-   **FASE MEDIA: Detección de Rostro**

![](/media/54e157960dff763a.webp)

-   **FASE FINA: Identificación de la mascota**

![](/media/55c562a2bb329b86.webp)

##   
Conclusiones y Recomendaciones

-   En la fase gruesa de clasificación de razas, se concluye que el modelo más óptimo es Inception v3 con un accuracy de 83.35% usando el dataset de Stanford y 78.28% para el de Thudogs.
-   En la fase media de detección de rostros, se probó únicamente el modelo Yolo v5 obteniendo un MAP de 98.5%.
-   En la fase fina de identificación de rostros, se concluye que el modelo más óptimo es Xception con un accuracy de 67.5% para el dataset de Flickr una vez realizado el data augmentation.
-   El uso de modelos de deep learning en la identificación de mascotas perdidas disminuirá el tiempo de retorno de la mascota a su hogar, permitiendo hacer el rastreo correcto.
-   En la fase fina se recomienda probar GAN’s para data augmentation.
-   En la fase gruesa, se sugiere combinar los datasets de Stanford y Thudogs, y probar los modelos desarrollados.
-   En la fase gruesa, se recomienda crear un dataset propio para identificación.
-   En la fase media, se sugiere probar nuevos modelos adicionales a yolo v5.

##   
Referencias

-   Dog Identification using Biometrics and Neural Networks

[https://arxiv.org/pdf/2007.11986v1.pdf](https://arxiv.org/pdf/2007.11986v1.pdf)

-   Dog Breed Identification Using Deep Learning

[https://www.researchgate.net/publication/328834665\_Dog\_Breed\_Identification\_Using\_Deep\_Learning](https://www.researchgate.net/publication/328834665_Dog_Breed_Identification_Using_Deep_Learning)

-   Yolo v5

[Train Custom Data - ultralytics/yolov5 Wiki? This guide explains how to train your own custom dataset with YOLOv5 ?. UPDATED 25 July 2021. Clone this repo…github.com](https://github.com/ultralytics/yolov5/wiki/Train-Custom-Data)

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/SBu9nw5TR34?feature=oembed)

##   
¡Más inteligencia artificial!

La misión de [Saturdays.ai](http://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](http://www.saturdays.ai/) ¡te esperamos! [Saturdays.AI](https://medium.com/saturdays-ai?source=post_sidebar--------------------------post_sidebar--------------)



-   [Deep Learning](https://medium.com/saturdays-ai/tagged/deep-learning)
-   [Convolution Neural Net](https://medium.com/saturdays-ai/tagged/convolution-neural-net)
-   [Xception](https://medium.com/saturdays-ai/tagged/xception)
-   [Inception V3](https://medium.com/saturdays-ai/tagged/inception-v3)
-   [Yolov5](https://medium.com/saturdays-ai/tagged/yolov5)

WRITTEN BY

## [Mishel Carrion Lopez](https://medium.com/@mcarrionl?source=follow_footer-----b233addc2a4e-----------------------------------)

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----b233addc2a4e-----------------------------------)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----b233addc2a4e-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education.
