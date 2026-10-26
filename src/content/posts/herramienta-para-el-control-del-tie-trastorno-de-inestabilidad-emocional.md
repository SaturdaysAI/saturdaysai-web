---
title: "Expresiones faciales y bienestar emocional: un prototipo con deep learning"
description: "Un equipo de La Paz explora la clasificación de expresiones faciales con ResNet50. Presentamos el proceso y sus límites: clasificar imágenes no equivale a diagnosticar emociones."
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
updatedDate: 2026-10-25
---

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

**INTRODUCCIÓN**

Este proyecto educativo de 2021 exploró la clasificación de expresiones faciales mediante aprendizaje profundo. El equipo propuso registrar las etiquetas producidas por un modelo mientras una persona observaba imágenes. La idea original se vinculó a la terapia icónica, pero el trabajo presentado no demuestra eficacia terapéutica ni capacidad para diagnosticar un trastorno.

Una expresión facial no permite conocer de forma fiable, por sí sola, el estado emocional de una persona. Las etiquetas del conjunto de datos son categorías de clasificación, no diagnósticos. Esta distinción es especialmente importante si se plantea usar el sistema con menores o en contextos de salud.

[Revisión científica sobre expresiones faciales y emociones](https://pmc.ncbi.nlm.nih.gov/articles/PMC6640856/)

![](/media/05eb2b2b4b3ace7d.webp)

**DESCRIPCIÓN DEL PROBLEMA**

El reto técnico consistía en procesar imágenes de una cámara, clasificar expresiones y guardar los resultados con una referencia temporal. Se buscaba explorar el registro automatizado, sin que ello validara la interpretación psicológica de las etiquetas.

**OBJETIVO**

Construir un prototipo que registre las categorías de expresión facial estimadas por el modelo. Cualquier posible aplicación clínica requeriría un estudio específico, consentimiento y supervisión profesional; el prototipo descrito no acredita esos requisitos.

**DATASET**

Se utilizó un dataset existente y de acceso libre, el cual se encontraba en la página web llamada kaggle, el cual fue creado por Jonathan Oheix. En este archivo se clasifican expresiones faciales de 35900 imágenes. Cada imagen tiene un tamaño de 48×48 píxeles en escala de grises y tiene el formato en el que solo se ve su rostro con la expresión facial correspondiente. Este dataset cuenta con dos carpetas (train y validation) con siete categorías de expresión facial: enojo, disgusto, miedo, feliz,neutral,triste y sorprendido

**SELECCIÓN DEL/LOS MODELOS**

Debido a que existen diversos modelos en el campo del Deep Learning, se optó por el modelo de ResNet50, esto debido a que luego de un análisis de modelos en el que se tomó en cuenta el tiempo que llevaba entrenarlos, su optimización, entre otros aspectos, fue el que tuvo mejores resultados entre todas las variantes que se tomaron en cuenta.

El ResNet50 se utilizó debido a que es una red neuronal convolucional que posee 50 capas de profundidad. Esta puede cargar una versión previamente entrenada de la red, en el caso de este proyecto se utilizó la database mencionada anteriormente.

![](/media/7a2a40975de133ef.webp)

Otras herramientas utilizadas en el proyecto:

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

La comparación permitió escoger un modelo para el prototipo de clasificación. El siguiente paso sería evaluar los errores, la representatividad de los datos y los límites de interpretación antes de plantear cualquier uso fuera del ejercicio educativo.

## Presentación del proyecto: DemoDay

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)

![](/media/b254bbf683b6cf11.webp)

WRITTEN BY

[Alejandra Rodrigo](https://medium.com/@alevivirodrigomollinedo?source=follow_footer-----6227c0d8d615--------------------------------)
