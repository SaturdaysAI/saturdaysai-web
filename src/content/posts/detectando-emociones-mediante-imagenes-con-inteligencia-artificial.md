---
title: Detectando emociones mediante imágenes con Inteligencia Artificial
description: Donostia. Primera edición. 2020 Introducción En la vida cotidiana,
  ¿Cuántas veces nos ocurre que preguntamos a una persona qué tal está, y la
  respuesta es positiva mientras que su rostro indica lo contrario? ¿Cuántas
  veces has…
pubDate: 2022-03-16
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Clasificación
  - CNN
  - Deep Learning
  - Red Neuronal
  - Salud y Bienestar
image: /media/ac5af025d63ba9f4.webp
imageAlt: Detectando emociones mediante imágenes con Inteligencia Artificial
legacyPath: /2022/03/16/detectando-emociones-mediante-imagenes-con-inteligencia-artificial/
sourceUrl: https://saturdays.ai/2022/03/16/detectando-emociones-mediante-imagenes-con-inteligencia-artificial/
sourceId: 6558
language: es
draft: false
---

![](/media/ac5af025d63ba9f4.webp)

Logo del equipo

[Donostia](https://donostia.saturdays.ai). Primera edición. 2020

## Introducción

En la vida cotidiana, ¿Cuántas veces nos ocurre que preguntamos a una persona qué tal está, y la respuesta es positiva mientras que su rostro indica lo contrario? ¿Cuántas veces has ido a la peluquería y has pretendido salir contenta cuando realmente, no te gustaba el resultado final? ¿Alguna vez has querido recibir el feedback de miles de personas en una conferencia o en el transcurso de ella?

![](/media/8936c90d797ce92a.webp)

Frase de Carl Rogers

Si nos ponemos a reflexionar sobre las cuestiones mencionadas, probablemente nos daremos cuenta de que muchas veces se miente cuando se tratan las emociones, ¿pero nuestra cara también miente?

## Definición del problema

Muchas veces se da más importancia a lo que se dice con la voz, que a lo que se dice con la expresión facial, siendo más fácil mentir o esconder la realidad con la primera de ellas. Con este proyecto queríamos, además de desplegar un proyecto real de inteligencia artificial, hacer algo que pudiese ser útil, pudiese detectar las emociones de las personas según su cara, mediante una imagen o la detección de la cara con una webcam. Las emociones surgen cuando ocurre algo relevante. Aparecen rápidamente, de forma automática, y hacen cambiar nuestro foco de atención.

La inteligencia emocional es algo que ha ido adquiriendo mucha relevancia los últimos años, la importancia en percibir, usar, comprender y manejar las emociones, tanto las correspondientes a uno mismo como a las del resto. Para ello, es evidente que necesitamos emociones reales, por lo que queríamos facilitar la forma en la que se pueden percibir las emociones. ¿Será una máquina capaz de detectar y clasificar las emociones mejor que el ser humano?

> _Facial Expression Recogniser será una aplicación encargada de detectar las emociones a tiempo real. En esta primera versión se utilizarán las imágenes y, a continuación, su función será clasificar las emociones en cuanto la cámara pueda detectar caras._

## Dataset

El dataset utilizado para el desarrollo de este proyecto, que se obtuvo en Kaggle, consistía en una serie de imágenes divididas en carpetas en función de la expresión de rostro. Las etiquetas de las carpetas se dividían según la siguiente clasificación:

0 — Angry

1 — Disgust

2 — Fear

3 — Happy emotions

4 — Sad

5 — Surprise

6 — Neutral

El objetivo principal del proyecto era detectar y clasificar las emociones según estas etiquetas. Para dicha predicción, se usaría imágenes obtenidas mediante la webcam.

![](/media/83b0d454055170a8.webp)

Data train

## La aproximación

Tal y como ha sido mencionado con anterioridad, a la hora de describir el dataset utilizado, se ha visto que se contaba con imágenes y con las etiquetas de las emociones correspondientes. Esto ha hecho que el proceso de EDA haya restado importancia en este proyecto.

Sin embargo, si ha sido necesario cierto análisis y transformación de los datos. Para empezar, se ha tenido que crear dataframes partiendo del dataset. Para ello, se ha pasado de las fotos que se tenían a pixeles, y se han creado dos columnas en dicha tabla, una la relacionada con la emoción y la otra con los píxeles.

![](/media/9e851ffbefa65611.webp)

Formato dataset

Además, cabe destacar que desde un inicio se contaba con una clasificación del dataset entre train y test, por lo que la transformación de imágenes a pixels se hizo dos veces, terminando así con dos dataframes: train\_data y test\_data

![](/media/f5baead15ba4369a.webp)

Tamaño de tablas

## Construyendo el model

El proyecto realizado se basa en Deep Learning, por lo que ha sido necesario el uso de redes neuronales. En nuestro caso, se han utilizado redes neuronales convolucionales, las cuales se utilizan sobre todo para tareas de visión artificial, pues son muy efectivas en la clasificación y segmentación de imágenes, entre otras aplicaciones.

Para ello, se ha presentado un modelo secuencial, lo que permite apilar capas secuenciales en orden de entrada a salida.

![](/media/6cb2fbf2e5fbc3f7.webp)

![](/media/edbe32ad8ab461af.webp)

Las capas añadidas al modelo han sido:

– Conv2D

– Batch Normalization

– MaxPooling2D

– Flatten

– Dense

– Activation

– Dropout

Para crear el modelo anteriormente mencionado, se ha utilizado Tensorflow y Keras. Este último es una biblioteca de Redes Neuronales escrita en Python. Es capaz de ejecutarse sobre TensorFlow. Este último satisface las necesidades de los sistemas capaces de construir y entrenar redes neuronales para detectar y descifrar patrones y correlaciones.

Después de crear el modelo se inició el entrenamiento del modelo. Al principio, se entrenó el modelo con un solo epoch, lo que además de tardar mucho tiempo, solo obtuvo un accuracy del 0,29. Es por esto por lo que se tuvo que modificar el entrenamiento del modelo, aumentando los epochs, cambiando los pasos a dar en cada epoch, etc.

Además, debido a un problema de guardado se tuvo que crear un callback al ModelCheckpoint, para que almacenará un checkpoint cada vez que un epoch finalizara, así, se pudo obtener un modelo final con más epochs.

Al final, el modelo obtenido ha conseguido un accuracy final del 0.9602. Esto indica la precisión de lo que se entrenó. Sin embargo, si analizamos el val\_accuracy, el cual se refiere a cuánto funciona su modelo en general para casos fuera del conjunto de entrenamiento, el valor obtenido ha sido del 0.6035.

![](/media/bc8b97b571b62c1b.webp)

Sin embargo, si calculamos la precisión del modelo con el dataset utilizado para el testeo, veremos que el accuracy es bastante bajo, del 0,1733, lo que implica tener mucho margen de mejora este modelo.

![](/media/16570de7a3a181f3.webp)

## Predicción

Una vez tuviésemos el modelo listo, había que predecir y probarlo. Para ello, se codificó de forma que nos indicase aquellas emociones que se podían considerar en la expresión facial de la imagen introducida, y según el porcentaje, concluir con el sentimiento más significativo. Por ejemplo:

![](/media/b7fa33267fa5b258.webp)

Imagen a predecir

Introducimos esta primera imagen, donde es evidente que el chico está mostrando cierto enfado. De esta forma, nuestro modelo lo ha clasificado de la siguiente manera:

![](/media/76ba594a4eb82ac3.webp)

![](/media/89734a0d8113b7e1.webp)

Recalcando que el enfado es el sentimiento que predomina en la imagen. Si utilizamos nuestro modelo, con el fin de detectar alguna otra emoción, veremos que también funciona.

![](/media/6c533a0d7e282bd6.webp)

Imagen predecida

Tal y como se mencionara en las conclusiones, la intención era incorporar la detección de caras mediante las webcam y así, poder detectar las emociones de una forma más real.

## Conclusiones

Una vez finalizado el proyecto, en una reflexión grupal, se comentó lo mucho que se ha aprendido en el desarrollo de este mismo, además de habernos dado cuenta de lo lejos que puede llegar la tecnología, y para ser más precisos la inteligencia artificial.

Hemos visto que en este ámbito de reconocimiento facial se están dando grandes avances, existen modelos que reconocen rostros incluso llevando la mascarilla puesta, y las aplicaciones de esta tecnología sólo están limitadas por nuestra imaginación. Desde el punto de vista de marketing, recoger el feedback de los usuarios y clientes es un proceso muy importante, pero obtener esta información suele costar, casi nadie nos paramos a rellenar un formulario para decir cómo ha sido nuestra experiencia a menos que haya sido negativa.

Es por ello que si somos capaces de detectar puntos rojos en la experiencia de los usuarios sin que suponga para ellos un esfuerzo más se podría mejorar el servicio, y gracias a esta tecnología esto sí es posible.

## Próximos pasos

Los próximos pasos que se darán con este proyecto están directamente relacionados con los problemas que se han tenido en la culminación del proyecto. La primera dificultad sufrida por el equipo fue la correspondiente al despliegue en Amazon Web Services, lo que debía facilitar el entrenamiento, hizo que el proyecto quedase parado dada la inexperiencia de los integrantes del equipo con dicha herramienta. Esto ha hecho que el entrenamiento no se pudiese hacer en los servidores de Amazon, lo que ha tardado mucho tiempo y dificulta cualquier modificación y ejecución en el modelo. Es por esto por lo que, próximamente, se intentará realizar dicho despliegue para poder trabajar de una manera más eficiente y eficaz.

Este problema hizo que la desviación sufrida en el tiempo fuese muy elevada, lo que dificultó la culminación de toda la funcionalidad que previmos en primera instancia. Además, esto también estaba directamente relacionado con el pequeño margen que nos quedaba para entrenar el modelo, lo que implica que la eficacia y precisión del modelo no sea la óptima, y aun quede un margen bastante amplio de mejora. Es por esto por lo que se podría, mediante más entrenamientos, obtener un modelo de mayor calidad.

No considerábamos tener tantos problemas cuando definimos el proyecto que queríamos realizar, debido a la inexperiencia que teníamos en este ámbito. Una de las funcionalidades que planteamos al principio era la incorporación de una Web Cam que nos permitiera sacar fotos al instante y poder clasificar las emociones de dicha imagen, para poder hacerlo más real. Sin embargo, debido a la falta de tiempo, es un aspecto que no se ha podido desarrollar pero que sería lo primero que realizaríamos en el futuro.

Sería muy útil integrar nuestro modelo con webcams en las entradas/salidas de todos aquellos lugares que quieran valorar la satisfacción o experiencia del cliente en dicho lugar. Por ejemplo, restaurantes, tiendas, conferencias, etc.

Además, en el futuro sería genial programar que la aplicación fuese capaz de reconocer una imagen tomada en la salida de un lugar con aquella imagen tomada en la entrada a la misma persona. Eso haría que se pudiese comparar eficientemente los resultados de todos los usuarios, y sería un paso adelante enorme ya que dotaríamos a la empresa/institución que lo utilice de inteligencia empresarial. Si a eso le sumásemos una serie de gráficos que visualicen los resultados en una especie de dashboard, podría ayudar a los directivos a tomar diversas decisiones en base a la satisfacción del cliente.

## Integrantes

-   [Paul Hernandez Guridi](https://www.linkedin.com/in/paul-hern%C3%A1ndez-guridi-157a201b5/)
-   [Iñaki Segurola Olaizola](https://www.linkedin.com/in/i%C3%B1aki-segurola-61940b1a7/)
-   [Nerea Solabarrieta Saizar](https://www.linkedin.com/in/nerea-solabarrieta-saizar-86aa1215b/)
-   [Jon Zabaleta Peña](https://www.linkedin.com/in/jon-zabaleta-pe%C3%B1a-19524118a/)

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/bGbQXjvTYGI?start=3778&feature=oembed)

## Repositorio

En el siguiente repositorio se encuentra el código usuado para desarrollar esta aplicación: [https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2020/Facial\_Expression\_Saturdays](https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2020/Facial_Expression_Saturdays)

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
