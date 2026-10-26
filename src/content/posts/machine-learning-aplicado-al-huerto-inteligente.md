---
title: Machine Learning aplicado al Huerto Inteligente
description: La Paz. Deep Learning. 2021 Todos sabemos la importancia de las
  plantas y a muchas personas les gustaría tener plantas en casa, pero existen
  varios problemas que lo impiden como por ejemplo el tiempo disponible para
  cuidarlas.…
pubDate: 2022-01-02
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Agua Industria Innovación e Infraestructura
  - CNN
  - Imágenes
  - YoloV5
image: /media/2144a2156db6a499.webp
imageAlt: Machine Learning aplicado al Huerto Inteligente
legacyPath: /2022/01/02/machine-learning-aplicado-al-huerto-inteligente/
sourceUrl: https://saturdays.ai/2022/01/02/machine-learning-aplicado-al-huerto-inteligente/
sourceId: 5125
language: es
draft: false
---

![Ideas de decoración: cómo plantar un 'huerto inteligente' en una casa  pequeña y sin terraza — idealista/news](/media/2144a2156db6a499.webp)

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

Todos sabemos la importancia de las plantas y a muchas personas les gustaría tener plantas en casa, pero existen varios problemas que lo impiden como por ejemplo el tiempo disponible para cuidarlas. El presente proyecto plantea resolver estos problemas por medio del Machine Learning creando un huerto inteligente que reconoce que planta va a cuidar y aplica un protocolo de cuidado adecuado. Las tecnologías usadas son redes neurales convolucionales, visión artificial, python y arduino.

Las plantas son una parte importante de nuestro diario vivir y no nos damos cuenta de su importancia. Las plantas en casa vienen con muchas ventajas como es la reducción de contaminación del aire, la reducción de estrés, y la reducción de la contaminación acústica. Pero, con tantas ventajas ¿porque no´ todos tenemos plantas en casa?

Esto pasa porque existen algunos problemas a la hora de tener plantas en casa. Los tres principales problemas son: La falta de conocimiento, descuido y falta de tiempo. El proyecto consiste en un huerto inteligente para los hogares de personas que quieren tener plantas en casa. El huerto reconocería la planta que va a cuidar por medio de visión artificial y redes neurales convolucionales y aplicaría un protocolo adecuado para la planta. Gracias a esto cualquier persona podrá tener plantas en casa sin tener el tiempo o el conocimiento que esto conlleva.

##   
**TECNOLOGÍA USADA**

- _CNN_

- _Visión artificial Python_

- _Arduino_

- _Dataset propio_

El modelo utilizado para la creacion del huerto inteligente aplicando Machine Learning es una red YOLOv5 la cual se modifica para aceptar las clases de nuestro dataset. Por ahora el dataset solo cuenta con siete clases (tipos de plantas) por el tiempo que implica crear un dataset, aun así, se logró un funcionamiento aceptable. El código se realizó en Jypiter y el dataset en la web Roboflow.

##   
**FUNCIONAMIENTO**

El huerto, por medio de una cámara, recoge la imagen de la planta que se procesa por medio de redes neurales convolucionales y visión artificial para así obtener una predicción de que planta está en el huerto. Después, esa predicción hace que se mande una señal, dependiendo de la planta que se identificó, a un arduino el cual al recibir esta señal selecciona el protocolo de cuidado dependiendo el tipo de planta y así controla los tiempos de regado y la cantidad de agua.

![](/media/4be1f1c1fa843da7.webp)

Figura 2. Detección de Frambuesa

##   
**OBSERVACIONES**

![](/media/b5e3b5525d8d75e2.webp)

Figura 3. Matriz de confusión

![](/media/60c147a52f4d1bfb.webp)

Figura 4. Resultados

Como se puede observar en los resultados, después del entrenamiento, se logró una precisión de 0.52 sin llegar a un overfeating. Esto se debe a la falta de datos en el dataset. También se puede observar que hay una gran confusión entre las plantas de Aloe y Cinta, posiblemente el error se debe al parecido de las hojas y la falta de imágenes en el dataset. Aun así, en las pruebas realizadas en otras plantas como la orquídea y la frambuesa son satisfactorias.

##   
**PROXIMOS AVANCES**

Actualmente se continua la mejora del dataset para obtener más imágenes y de esta manera el huerto pueda reconocer mayor cantidad de plantas y con mayor precisión. También se está experimentando con diferentes modelos de deep learning para mejorar el funcionamiento del huerto.

Se planea mejorar mucho la estructura para tener un diseño más estético y cómodo para los hogares de personas en el área urbana. Además, se planea mejorar la parte del hardware para minimizar costos de producción y controlar más factores externos como la temperatura y la luz.

Finalmente se espera poder implementar una versión del huerto para cultivos a gran escala.

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/L4o5tZNqyxs?start=3374&feature=oembed)

##   
**¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)

Saturdays.AIFollow

-   [Deep Learning](https://medium.com/saturdays-ai/tagged/deep-learning)
-   [Vision Artificial](https://medium.com/saturdays-ai/tagged/vision-artificial)
-   [Cnn Model](https://medium.com/saturdays-ai/tagged/cnn-model)
-   [Ai Saturdays](https://medium.com/saturdays-ai/tagged/ai-saturdays)
-   [Agtech](https://medium.com/saturdays-ai/tagged/agtech)




WRITTEN BY

## [Kenneth Bonilla](https://medium.com/@kennethbonillabbo?source=follow_footer-----f995425feed3-----------------------------------)



[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----f995425feed3-----------------------------------)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----f995425feed3-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education.
