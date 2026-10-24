---
title: Herramienta para el control del TIE (Trastorno de Inestabilidad Emocional)
description: La Paz. Deep Learning. 2021 INTRODUCCIÓN Uno de los problemas que
  la mayoría de los jóvenes padece hoy en día son los distintos trastornos
  mentales que existen, dentro de estos se encuentra el Trastorno de
  Inestabilidad…
pubDate: 2021-10-13
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Ai4all
  - Ai4good
  - Deep Learning
  - Imagenes
  - Machine Learning
  - Recurrent Neural Network
  - Salud y Bienestar
image: /media/05eb2b2b4b3ace7d.webp
imageAlt: Herramienta para el control del TIE (Trastorno de Inestabilidad Emocional)
legacyPath: /2021/10/13/herramienta-para-el-control-del-tie-trastorno-de-inestabilidad-emocional/
sourceUrl: https://saturdays.ai/2021/10/13/herramienta-para-el-control-del-tie-trastorno-de-inestabilidad-emocional/
sourceId: 4217
language: es
draft: false
---

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

**INTRODUCCIÓN**

Uno de los problemas que la mayoría de los jóvenes padece hoy en día son los distintos trastornos mentales que existen, dentro de estos se encuentra el Trastorno de Inestabilidad Emocional (TIE), el cual afecta de manera contundente la vida de las personas que lo padecen.

El TIE se define como un conjunto de síntomas que aparecen en la etapa de la adolescencia, produciendo desequilibrios de las emociones y los sentimientos en estos. Es muy común que el adolescente padezca inestabilidad emocional debido a las dificultades que lo rodean, cuando en realidad es exactamente lo opuesto, este pasa de un estado de indiferencia a uno de afectación emocional sin motivo aparente, perdiendo así control sobre el mismo.

Este problema llega a afectar hasta a un 6% de los adolescentes, una cifra que aumenta si existen agravantes de la situación familiar como, por ejemplo, problemas económicos.

Actualmente se ha demostrado que la terapia icónica da buenos resultados en este trastorno. Este método se basa en utilizar imágenes (o ciertos iconos para cada área tratada). El paciente lo asocia al área que se está trabajando durante la sesión. Se le ayuda a evocar mediante las imágenes un razonamiento concreto y así se pueden anticipar al impulso emocional, por lo que se propuso el uso de Deep Learning como herramienta para esta terapia y para el seguimiento de la persona que padece de este trastorno.

![](/media/05eb2b2b4b3ace7d.webp)

**DESCRIPCIÓN DEL PROBLEMA**

Debido a que la mayor característica del TIE es el cambio repentino de emociones existen diferentes terapias para tratar este trastorno, pero una de la más recomendadas es la terapia icónica que fue explicada anteriormente.

Al momento de realizar la terapia icónica, el doctor debe estar atento a los diferentes cambios de emoción que presente el paciente, pero en el transcurso en el que va mostrando las imágenes o registrando las emociones que presenta el paciente, no detecta en tiempo real, qué tan rápido fue el cambio de emoción que presentó el paciente.Debido a este problema, el especialista en este trastorno puede perder valiosa información para la terapia y la recuperación de este paciente.

**OBJETIVO**

Realizar un código el cual será usado como herramienta para controlar y evaluar más a fondo el progreso del paciente, más específicamente para la terapia icónica, usando una cámara que monitoree al paciente, guardando en tiempo real en un archivo, las diferentes emociones que presentó al mostrarle las imágenes y/o iconos, de tal manera que ayude a los psicólogos y/o psiquiatras a la evaluación de su trastorno.

**DATASET**

Se utilizó un dataset existente y de acceso libre, el cual se encontraba en la página web llamada kaggle, el cual fue creado por Jonathan Oheix. En este archivo se clasifican expresiones faciales de 35900 imágenes. Cada imagen tiene un tamaño de 48×48 píxeles en escala de grises y tiene el formato en el que solo se ve su rostro con la expresión facial correspondiente. Este dataset cuenta con dos carpetas (train y validation) las cuales tienen 7 sentimientos: enojo, disgusto, miedo, feliz,neutral,triste y sorprendido

**SELECCIÓN DEL/LOS MODELOS**

Debido a que existen diversos modelos en el campo del Deep Learning, se optó por el modelo de ResNet50, esto debido a que luego de un análisis de modelos en el que se tomó en cuenta el tiempo que llevaba entrenarlos, su optimización, entre otros aspectos, fue el que tuvo mejores resultados entre todas las variantes que se tomaron en cuenta.

El ResNet50 se utilizó debido a que es una red neuronal convolucional que posee 50 capas de profundidad. Esta puede cargar una versión previamente entrenada de la red, en el caso de este proyecto se utilizó la database mencionada anteriormente.

![](/media/7a2a40975de133ef.webp)

Otros de los modelos implementados en el proyecto fueron:

Keras: Se uso esta biblioteca de código abierto escrita en Python, ya que se basa principalmente en facilitar un proceso de experimentación rápida, además como es una interfaz de uso intuitivo , nos permitio acceder a frameworks de aprendizaje automático, en este caso se hizo uso de TensorFlow.

Además para completar todos los aspectos del proyecto se utilizó OpenCv y Numpy

**EVALUACIÓN DE MODELOS**

Se hizo pruebas con los siguientes modelos:

**\-AlexNet:** Esta red es de las más populares, pero tiene pocas capas e igualmente se obtuvo una precisión suficiente.

**\-Face Recognizer:** Se llegó a entrar un modelo con este método pero al momento de querer levantar el modelo para evaluarlo a tiempo real este consumía demasiados recursos de la computadora, por lo que no era apropiado si se quería usar en dispositivos más simples.

**\-EfficientNet:** Esta red se trató de entrenar con tres épocas pero no se logró debido al largo periodo de entrenamiento que requería.

**\-ResNet2:** Esta red presentó dificultades al comienzo de su entrenamiento, siendo el caso que no pasó de la etapa número uno, habiendo transcurrido 3 horas.

**\-ResNet50:** Esta red fue la que usamos en el proyecto ya que pudimos entrenar 100 épocas utilizando la GPU de colaboratory y el tiempo utilizado fue de 1hora 45 minutos.

**ANÁLISIS DE RESULTADOS**

![](/media/3cc86f198d122280.webp)

En la gráfica que se muestra corresponde al accuracy que se logró luego de haberlo entrenado con 100 etapas, debido a esto y a la ResNet, se puedo lograr estos resultados

![](/media/da04d2c9e802bcf4.webp)

A diferencia de la anterior gráfica, esta corresponde al loss del modelo

**CONCLUSIÓN Y RECOMENDACIONES**

Se recomienda verificar el dataset correctamente antes de ingresar a la red, ya que muchos de ellos vienen con imágenes que no corresponden. Igualmente en la medida de posible se recomienda entrenar con una GPU física, si no es el caso se recomienda utilizar la GPU de colaboratory. Si es el caso utilizar un dataset con más imágenes, ya que esto elevará la precisión del entrenamiento.

Con el modelo escogido gracias a la evaluación de modelos se pudo elegir el más eficiente para realizar el código, además de lograr el objetivo de detectar emociones para que sirvan de herramienta a psiquiatras y psicólogos que tratan con pacientes con TIE.

## Presentación del proyecto: DemoDay

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) a la vez que se realizan proyectos para el bien (_#ai4good_). Los talleres que realizamos forman parte del programa [AI 4 Schools](https://saturdays.ai/ai-4-schools/) para que cualquier persona “_aprenda haciendo_” IA sin importar su especialidad o nivel de partida.

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en este [link](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!

![](/media/b254bbf683b6cf11.webp)

WRITTEN BY

[Alejandra Rodrigo](https://medium.com/@alevivirodrigomollinedo?source=follow_footer-----6227c0d8d615--------------------------------)
