---
title: Detección de COVID-19 en imágenes de rayos X con Machine learning
description: La Paz. Deep Learning. 2021 INTRODUCCIÓN La COVID-19 es la
  enfermedad causada por el nuevo coronavirus conocido como SARS-CoV-2. La OMS
  tuvo noticia por primera vez de la existencia de este nuevo virus el 31 de
  diciembre de…
pubDate: 2021-11-22
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Covid
  - Deep LearningCnn
  - Imagenes
  - Machine Learning
  - Salud y Bienestar
  - TensorFlow
image: /media/95334e1f2ee3a2bc.webp
imageAlt: Detección de COVID-19 en imágenes de rayos X con Machine learning
legacyPath: /2021/11/22/deteccion-de-covid-con-machine-learning/
sourceUrl: https://saturdays.ai/2021/11/22/deteccion-de-covid-con-machine-learning/
sourceId: 4591
language: es
draft: false
---

[La Paz](https://saturdays.ai/la-paz/). Deep Learning. 2021

## INTRODUCCIÓN

La COVID-19 es la enfermedad causada por el nuevo coronavirus conocido como SARS-CoV-2. La OMS tuvo noticia por primera vez de la existencia de este nuevo virus el 31 de diciembre de 2019, al ser informada de un grupo de casos de «neumonía vírica» que se habían declarado en Wuhan (República Popular China).

Se llama SARS-CoV-2, por las siglas:

-   “SARS” porque puede producir un “Síndrome Respiratorio Agudo Grave” (siglas en inglés: Severe Acute Respiratory Syndrome, SARS).
-   “CoV” porque es un coronavirus.
-   “2” porque ya existió un virus parecido en 2002–2003 que producía también SARS.

#### ¿QUÉ PRUEBAS SE UTILIZAN PARA DIAGNOSTICAR EL COVID-19?

##### **PCR**

Las PCR (siglas en inglés de “Reacción en Cadena de la Polimersa”), son un tipo de pruebas de diagnóstico que se llevan utilizando durante años en diferentes crisis de salud pública relacionadas con enfermedades infecciosas. Estas pruebas se están usando desde los primeros días del estallido de la pandemia de coronavirus en España. Sin embargo, los test rápidos se han incorporado recientemente y, como su nombre indica, son más rápidos y sencillos. Ambos sirven para comprobar si una persona está infectada o no por el Covid-19.

![PCR test](/media/95334e1f2ee3a2bc.webp)

##### **ANTÍGENO**

Prueba de antígeno. Esta prueba para la COVID-19 detecta ciertas proteínas en el virus. Se usa un hisopo para tomar una muestra de fluido de la nariz, y las pruebas de antígeno pueden dar resultados en minutos.

![Test antígeno](/media/c032f884881a79fe.webp)

##### **RADIOGRAFIA DE TORAX**

Los escáneres o las radiografías producen una imagen de los órganos y estructuras (corazón, pulmones y vías respiratorias) del tórax. Pueden detectar bloqueos, inflamación y exceso de líquido.

-   Las radiografías utilizan una pequeña cantidad de radiación para producir una imagen en dos dimensiones. Por lo general, las realiza un radiólogo en el hospital mediante un equipo fijo, pero también se pueden hacer con una máquina portátil.
-   La tomografía computarizada (TC) utiliza una computadora para fusionar varias radiografías tomadas desde diferentes ángulos y producir así una imagen bidimensional que se puede convertir en una imagen tridimensional. Requiere de un equipo muy especializado y la realiza en el hospital un radiólogo especialista.

Se pueden realizar en un hospital o en otros centros sanitarios, como la consulta de un médico o una clínica.

### PROBLEMATICA

Dado que hay kits de prueba de COVID-19 son de acceso limitado para la población en general, debemos confiar en otras medidas de diagnóstico.

##### **_IMÁGENES DE RAYOS X_**

En el campo de la medicina se utilizan con frecuencia radiografías y tomografías computarizadas para diagnosticar neumonía, inflamación pulmonar, abscesos y / o ganglios linfáticos agrandados. Dado que COVID-19 ataca las células epiteliales que recubren nuestro tracto respiratorio, podemos usar rayos X para analizar la salud de los pulmones de un paciente.

Una gran mayoría de los hospitales tienen máquinas de imágenes de rayos X, se plantea la siguiente pregunta: ¿Cómo se podría detectar COVID-19 en imágenes de rayos X?, sin los kits de prueba dedicados.

### OBJETIVOS

-   Recopilar las entradas del modelo en datasets para el entrenamiento, pruebas y validación.
-   Desarrollar un modelo de diagnóstico del covid a través de imágenes de rayos X usando deep learning, con un porcentaje de confiabilidad aceptable.
-   Evaluar los resultados del modelo a través de la matriz de confusión.

### DESARROLLO DEL MODELO

Para el desarrollo del modelo se ha utilizado un dataset del repositorio de kaggle que tiene un total de 5.856 imágenes, se ha usado radiografías de pacientes que tenían neumonía porque estos pacientes tienen una alta probabilidad de tener covid-19.

[https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia](https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia)

#### SELECCION DEL MODELO Y TECNICAS IMPLEMENTADAS

Para la construcción del modelo se utilizó Redes Neuronales Convolucionales, porque son redes neuronales diseñadas y ampliamente usadas para trabajar con imágenes.

Las redes convolucionales contienen varias hidden layers, las cuales se encargan de detectar líneas, curvas y así con las convoluciones se permitirá detectar formas más complejas como siluetas, rostros, etc.

![](/media/9833bedd5f0f33f6.webp)

Las herramientas utilizadas son: Tensorflow y keras. Tensorflow es una plataforma de código abierto usada para aprendizaje automático compuesta por un conjunto de herramientas, librerías y recursos que facilitan el trabajo en el desarrollo e implementación de soluciones con inteligencia artificial (IA). Keras es una librería, actualmente es API de alto nivel que proporcionan interfaces que simplifican el trabajo en el desarrollo de aplicaciones con IA, a partir de la versión 2.0 keras ya viene integrada dentro de Tensorflow.

![](/media/b848df8f436eab8c.webp)

### DESARROLLO DEL PROYECTO

Debido a que es una pequeña prueba de concepto de clasificación de imágenes para un curso introductorio a Deep Learning, se ha subido las imágenes del dataset a una carpeta de google drive y el desarrollo del modelo se utilizó los servicios de colab.research de Google.

Las imágenes fueron ajustadas a un tamaño de 500×500, para poder entrenar, en la siguiente imagen se observa una radiografía de un paciente normal.

![Modelo](/media/e61fdf8eba0cb7ac.webp)

Con la integración de Keras con Tensorflow, se tienen nuevas clases como “ImageDataGenerator” que facilitan la carga de imágenes:

![](/media/1b1803b98fd3b96c.webp)

Las imágenes fueron divididas en 3 grupos: entrenamiento, pruebas y validación.

![](/media/46e3b7ddce7bf38d.webp)

El modelo de clasificación se puede observar en la siguiente gráfica:

![](/media/8532587508618cd9.webp)

### EVALUACION DEL MODELO

Para realizar la evaluación se ha utilizado la matriz de confusión:

![](/media/c947e69f8398bc16.webp)

Donde se puede observar que el modelo ha identificado:

-   Para personas que estaban sanas y que el modelo predijo como personas sanas fueron 175 casos de verdaderos negativos (VN).
-   Para personas que estaban enfermas y que el modelo predijo como personas enfermas fueron 384 casos de verdaderos positivos (VP).
-   Para personas que estaban enfermas y que el modelo predijo como personas sanas fueron 59 casos de falsos negativos (FN).
-   Para personas que estaban sanas y que el modelo predijo como personas enfermas fueron 6 casos de falsos positivos (FP).

Con estos datos podemos calcular los siguientes indicadores:

Exactitud = (VP + VN) / (VP + VN + FN + FP)

Exactitud = (175 + 384) / (175 + 384 + 59 + 6)

Exactitud = 0,8958

La exactitud es la cantidad de predicciones que fueron positivas que fueron correctas y se llegó a un valor de 89,58%

Precisión = VP / (VP + FP)

Precisión = 384 / (384 + 6)

Precisión = 0,9846

La precisión es el porcentaje de casos positivos detectados llegó a un valor de 98,46%

Sensibilidad = VP / (VP + FN)

Sensibilidad = 384 / (384 + 59)

Sensibilidad = 0,8668

La sensibilidad es la proporción de casos positivos correctamente identificados llegó a un valor de 86,68%

Especificidad = VN / (VN + FN)

Especificidad = 175 / (175 + 59)

Especificidad = 0,7478

La especificidad trata de la cantidad de casos negativos correctamente identificados llegó a un valor de 74,78%.

### ANALISIS DE RESULTADOS

Del proceso de desarrollo del modelo, de acuerdo a las librerías de Keras y Tensorflow pudimos llegar a una precisión del 89,59 %.

![](/media/d6fb8a7e190bac99.webp)

Con los resultados obtenidos podemos observar en la figura que el valor de la precisión se mantuvo por encima del 80%, el valor de la pérdida fue inferior al 20 %.

![machine learning results](/media/4cdde3ed6cece05c.webp)

### CONCLUSION

De acuerdo a los resultados obtenidos se tiene:

-   El valor de confiabilidad del modelo es aceptable, representado por el 89%.
-   El modelo de diagnóstico del covid a través de imágenes de rayos X usando deep learning, podría aplicarse en nuestro medio como otra alternativa de diagnóstico.

### BIBLIOGRAFIA

[https://gacetamedica.com/investigacion/como-funcionan-y-en-que-se-diferencian-las-pcr-y-los-test-rapidos-de-coronavirus/](https://gacetamedica.com/investigacion/como-funcionan-y-en-que-se-diferencian-las-pcr-y-los-test-rapidos-de-coronavirus/)

[https://www.mayoclinic.org/es-es/diseases-conditions/coronavirus/expert-answers/covid-antibody-tests/faq-20484429](https://www.mayoclinic.org/es-es/diseases-conditions/coronavirus/expert-answers/covid-antibody-tests/faq-20484429)

[https://bootcampai.medium.com/redes-neuronales-convolucionales-5e0ce960caf8](https://bootcampai.medium.com/redes-neuronales-convolucionales-5e0ce960caf8)

[https://www.pyimagesearch.com/2020/03/16/detecting-covid-19-in-x-ray-images-with-keras-tensorflow-and-deep-learning/](https://www.pyimagesearch.com/2020/03/16/detecting-covid-19-in-x-ray-images-with-keras-tensorflow-and-deep-learning/)

[https://www.kaggle.com/ankitachoudhury01/covid-patients-chest-xray](https://www.kaggle.com/ankitachoudhury01/covid-patients-chest-xray)

[https://towardsdatascience.com/medical-x-ray-%EF%B8%8F-image-classification-using-convolutional-neural-network-9a6d33b1c2a](https://towardsdatascience.com/medical-x-ray-%EF%B8%8F-image-classification-using-convolutional-neural-network-9a6d33b1c2a)

[https://www.juanbarrios.com/la-matriz-de-confusion-y-sus-metricas/](https://www.juanbarrios.com/la-matriz-de-confusion-y-sus-metricas/)

## Presentación del proyecto: DemoDay

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) a la vez que se realizan proyectos de impacto social (_#ai4good_). Si quieres aprender más sobre este proyecto (y otros) únete a nuestra [comunidad](http://community.saturdays.ai/) en o aprende a crear los tuyos en nuestro programa AI Saturdays.

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!

WRITTEN BY

[Bladimir Calcina](https://medium.com/@bladimir.calcina?source=follow_footer-----32715df8e699-----------------------------------)
