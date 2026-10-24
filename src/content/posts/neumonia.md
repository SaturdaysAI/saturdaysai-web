---
title: Diagnósticos de X-Rays con Neumonía en Niños entre 0 a 5 años con Machine
  Learning
description: La Paz. Machine Learning. 2021 (La Paz 2021) Alrededor de todo el
  mundo, existe un problema bastante común en la mayoría de los hospitales y es
  que al existir diariamente, una cantidad bastante grande de personas que
  buscan…
pubDate: 2021-11-11
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Imágenes
  - Red Neuronal
  - Salud y Bienestar
image: /media/c71cb88fd6f4cfd8.webp
imageAlt: Diagnósticos de X-Rays con Neumonía en Niños entre 0 a 5 años con
  Machine Learning
legacyPath: /2021/11/11/neumonia/
sourceUrl: https://saturdays.ai/2021/11/11/neumonia/
sourceId: 4393
language: es
draft: false
---

[La Paz](https://saturdays.ai/la-paz/). Machine Learning. 2021

(La Paz 2021) Alrededor de todo el mundo, existe un problema bastante común en la mayoría de los hospitales y es que al existir diariamente, una cantidad bastante grande de personas que buscan atención médica, el sistema de atención tiende a colapsar y una gran cantidad de personas no llegan a recibir atención médica que puede llegar a ser urgente. Tenemos que tener en cuenta que la variedad de pacientes y la variedad de casos a tratar dentro de un hospital es enorme. Sin embargo, una de las enfermedades más importantes que hay que tratar de forma rápida tras su diagnóstico es la neumonía en niños de 0 a 5 años de edad. En el presente, el Machine Learning nos permite hacer un diagnóstico de neumonía automático y rápido.

La neumonía infantil es la enfermedad infecciosa que más muertes de niños ocasiona día a día en todo el mundo. En promedio, más de 800 000 niños menores de 5 años mueren de neumonía cada año, es decir que cada 39 segundos muere un niño a causa de la neumonía. Lo más impactante en esta situación es que según el artículo realizado por la UNICEF el 20 de enero de 2020, casi todas esas muertes son prevenibles. El número abismal de muertes infantiles a causa de la neumonía es debido a que esta enfermedad se puede transmitir a la hora de respirar partículas suspendidas en el aire.

##   
**Problemática:**

Teniendo en cuenta la cantidad enorme de casos de neumonía en niños menores de 5 años, ¿cómo podemos implementar una Inteligencia Artificial para que el diagnóstico de la neumonía infantil sea más eficiente?

##   
**Objetivo:**

El objetivo principal de este proyecto es desarrollar una Inteligencia Artificial capaz de analizar radiografías de infantes que tengan 3 años de edad o menos. De esta forma, todo infante que tenga radiografías de sus pulmones podrá ser diagnosticado en cuestión de segundos y podrá ser llevado a un área de atención en lugar de tener que pasar primero por un doctor general que deba hacer el diagnóstico si el infante tiene o no neumonía.

##   
**Datasets:**

Se utilizó el dataset “Chest X-Ray Images (Pneumonia)” encontrado en la plataforma de Kaggle. Este dataset contiene 5 863 imágenes divididas en 2 categorías: train (89.4% del dataset total), test (10.6% del dataset total). Estas dos categorías serán utilizadas respectivamente para entrenar y testear nuestro modelo. Así mismo, es importante mencionar que cada categoría del dataset está dividida en dos partes, la primera está compuesta de radiografías de infantes sin pneumonia, esta división está denominada como: “NORMAL”

![](/media/c71cb88fd6f4cfd8.webp)

![](/media/4db2010a6d2da2eb.webp)

La segunda parte está denominada como: “PNEUMONIA” y es donde se encuentran las radiografías de los infantes que tienen neumonía:

![](/media/b53d653098876a99.webp)

![](/media/06c10a6e8d10a0b9.webp)

##   
**Proceso de identificación de la neumonía:**

Para poder realizar una buena identificación de neumonía hemos decidido utilizar el filtro un filtro de escala de grises que se encuentra en la librería de cv2. Este filtro nos permite resaltar las diferentes áreas importantes del cuerpo humano. De esta forma el análisis es más certero y el accuracy del modelo más alto. Así mismo es importante tener en cuenta que si no pasaramos las imágenes por un filtro sería peligroso ya que el modelo se basaría únicamente en la imágen original y no existiría ninguna opción para eliminar el ruido de la imágen.

![](/media/97582c3110d486e3.webp)

En la imágen previa se puede apreciar como los pulmones se ven más resaltados aplicando el filtro ya mencionado.

Subsecuentemente se realizó una normalización a todos los píxeles de cada imagen para que todo valor vaya de 0 a 1.

Así mismo, hemos utilizado la librería de Keras para incluir DataAugmentation dentro de nuestro DataSet. Esta añadidura le permite a nuestro modelo aumentar levemente el accuracy ya obtenido con el filtro de la escala de grises ya que realiza rotaciones, zoom y mueve la imagen de forma horizontal y vertical.

Una vez añadido el filtro se analiza cada imágen y se busca una opacidad homogénea presente al nivel de los pulmones, este es el principal efecto de la neumonía.

##   
**Modelos:**

El modelo que hemos implementado es el CNN (Convolutional Neural Network). En resumen es un tipo de Red neuronal artificial con un aprendizaje supervisado el cual puede identificar distintas características de entrada, por así decirlo, que en algunos casos no se puede intuir.

Las convoluciones consisten en tomar toda la imagen en pixeles y aplicar cada cierto número de píxeles un kernel (una matriz pequeña) el cual altera la imagen original dependiendo el kernel que estamos aplicando.

##   
**Resultados**

-   **Training & Validation Accuracy + Testing Accuracy & Loss**

![](/media/d24f3219f4ce80b9.webp)

-   **Matriz de confusión**

![](/media/de7109c7c5d572a8.webp)

Se intentó una implementación de la métrica de la matriz de confusion pero por un problema de versiones no se pudo obtener los datos buscados

-   **Accuracy:**

![](/media/6e81c0fb7aa5fe5b.webp)

-   **User tests:**

![](/media/33d103fe2117b0e3.webp)

Teniendo en cuenta que si la predicción se acerca a 1 significa que la imagen es la de pulmones sanos y si se acerca a 0 significa que la imagen corresponde a pulmones con síntomas de neumonía, las predicciones realizadas por nuestro modelo son correctas.

##   
**Conclusiones y Recomendaciones**

En conclusión se pudo ver que:

-   Se recomienda utilizar los filtros grises para mejorar la calidad de las imágenes
-   Para que no sobrecargue la máquina virtual, si es que se la programa en colab, es necesario cambiar el tamaño de la imagen para que pueda leer todas las imágenes del dataset.
-   En el Data Augmentation implementado se recomienda que se aplique para mejorar el accuracy.
-   Se recomienda implementar la normalización para que la predicción sea más precisa.

##   
**Referencias:**

[https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia](https://www.kaggle.com/paultimothymooney/chest-xray-pneumonia)

[http://acodigo.blogspot.com/2013/05/procesamiento-de-imagenes-en-opencv.html](http://acodigo.blogspot.com/2013/05/procesamiento-de-imagenes-en-opencv.html)[How to Configure Image Data Augmentation in Keras – Machine Learning MasteryImage data augmentation is a technique that can be used to artificially expand the size of a training dataset by…machinelearningmastery.com](https://machinelearningmastery.com/how-to-configure-image-data-augmentation-when-training-deep-learning-neural-networks/)

**SyDoJa**

![](/media/474c318c169342c7.webp)

**Neumonía**

**“Diagnósticos de X-Rays con Neumonía en Niños entre 0 a 5 años con Machine Learning”**

**INTEGRANTES:**

**Dylan Chambi Frontanilla**

**Joseph Anthony Meneses Salguero**

**Samuel Matias Escobar Bejarano**

**CURSO:**

**Machine Learning**

**LA PAZ 10/09 — BOLIVIA-2021**

##   
¡Más inteligencia artificial!

La misión de [Saturdays.ai](http://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](http://www.saturdays.ai/) ¡te esperamos!
