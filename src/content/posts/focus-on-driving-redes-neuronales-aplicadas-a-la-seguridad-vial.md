---
title: "Focus On Driving: Redes Neuronales aplicadas a la Seguridad Vial"
description: Focus on Driving compara cinco modelos de visión artificial para
  reconocer distracciones al volante y comparte los resultados y límites del
  experimento.
pubDate: 2022-03-16
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Deep Learning
  - Imagenes
  - Red Neuronal
  - Salud y Bienestar
image: /media/7fa98a59d9fc6e19.webp
imageAlt: focus on driving
legacyPath: /2022/03/16/focus-on-driving-redes-neuronales-aplicadas-a-la-seguridad-vial/
sourceUrl: https://saturdays.ai/2022/03/16/focus-on-driving-redes-neuronales-aplicadas-a-la-seguridad-vial/
sourceId: 6550
language: es
draft: false
---

![](/media/f089eea8cd29b1e8.webp)

[Donostia](https://donostia.saturdays.ai/). Segunda Edición. 2021

## **Introducción**

Según la Dirección General de Tráfico (DGT), la **distracción en la conducción** es una de las principales causas de los accidentes de tráfico, siendo la causa de **1 de cada 3 accidentes mortales** (33%), por delante de la velocidad (29%) y del alcohol (26%).

Tras un minuto y medio de hablar por el móvil (incluso con manos libres), el conductor no percibe el 40% de las señales, su velocidad media baja un 12%, el ritmo cardíaco se acelera bruscamente durante la llamada y se tarda más en reaccionar.

La peligrosidad por un uso inadecuado del móvil puede llegar a ser equiparable a la conducción con exceso de alcohol.

Más de 1 de cada 3 españoles reconoce haber hablado por teléfono, leído o escrito mensajes durante la conducción en los últimos años.

Un conductor que habla mientras conduce:

- Pierde la capacidad de mantener una velocidad constante.

- No guarda la distancia de seguridad suficiente con el vehículo que circula delante.

- El tiempo de reacción aumenta considerablemente: entre medio a dos segundos, dependiendo de los reflejos de cada conductor.

![](/media/37e0fe86500d6cde.webp)

**Figura 1.** Imágenes de distracciones comunes al conducir.

Esto hace que la detección de estas distracciones sea esencial para mejorar la **seguridad vial**. Si se pudiera “detectarlas” con el fin de avisar al conductor de que algo va mal, el número de accidentes podría **disminuirse radicalmente**.

En este proyecto estaremos enfocados en detectar algunas distracciones más comunes, como utilizar el móvil, mirarse al espejo o beber algo mientras conducimos, bien como identificarlas.

## **Objetivo**

El objetivo de este proyecto es ajustar un modelo de **_Machine Learning_** capaz de **identificar y clasificar las diferentes distracciones** a que estamos expuestos siempre que conducimos.

Para ello, trabajaremos con una técnica de **_Deep Learning_** conocida como “**Redes Neuronales Convolucionales**” (CNN o “_Convolutional Neural Network_”).

Probaremos algunas arquitecturas de redes neuronales, todas ellas mejoradas con redes pre-entrenadas para la clasificación de imágenes (_transfer learning_).

## **Conjunto de Imágenes**

El conjunto de imágenes que hemos utilizado en el marco de este proyecto proviene de un concurso lanzado en la plataforma **_Kaggle_** hace aproximadamente 5 años (pulse [**aquí**](https://www.kaggle.com/c/state-farm-distracted-driver-detection/overview) para verlo).

Todas las imágenes han sido obtenidas por medio de una cámara instalada dentro del coche, siempre con un conductor dentro y en diversas situaciones cotidianas.

Las fotos han sido tomadas en un ambiente controlado: un camión arrastraba el coche por las calles, de tal manera que los conductores no tuviesen que conducir de verdad.

Para el entrenamiento de los modelos, hemos contado con un total de **22.424 imágenes**, clasificadas en **10 categorías**:

![](/media/f862383e6da206c3.webp)

**Figura 2.** Descripción de las 10 categorías del experimento.

## Exploratory Data Analysis

Como parte de la etapa de “**_Exploratory Data Analysis_**”, hemos comprobado que todas las imágenes tenían la misma dimensión: **(480, 640, 3)**.

Tras un muestreo aleatorio, podríamos afirmar que las imágenes estaban **bien clasificadas** a lo largo de las 10 categorías del experimento. Esto se debe seguramente por tratarse de un conjunto de imágenes proveniente de un experimento controlado y que fue a concurso en la plataforma _Kaggle_.

Además, las imágenes estaban distribuidas de una forma razonablemente **equilibrada entre las 10 categorías**, por lo que prácticamente hemos podido “saltarnos” a la etapa de “EDA” para irnos directamente a la fase de entrenamiento de los modelos de **CNN**.

![](/media/ea3491d7cd05c07e.webp)

**Figura 3.** Distribución del número de imágenes entre las 10 categorías del experimento.

También estaban disponibles en la plataforma _Kaggle_ **79.725 imágenes** para testeo, sin ningún tipo de clasificación o etiqueta.

Es importante mencionar que las imágenes de entrenamiento y testeo estaban divididas en _Kaggle_ de tal manera que **un mismo conductor no podría aparecer en los 2 grupos** (entrenamiento y testeo).

En general, las 10 categorías podrían ser consideradas “**excluyentes**”, a excepción de las categorías “**c0**” (conduciendo de forma segura) y “**c9**” (hablando con pasajero), que se parecen más entre ellas y podrían ser consideradas “**no excluyentes**”, ya que, en algunas situaciones, tienen en común las 2 manos colocadas en el volante.

![](/media/77db75d27cbbacfb.webp)

**Figura 4.** Imágenes de 2 conductores, la primera de la categoría “c0”, y la segunda, de la categoría “c9”.

## **Implementación**

En líneas generales, hemos seguido los siguientes pasos para el ajuste de las **Redes Neuronales Convolucionales** presentadas en este proyecto:

1.  Bajar y pre-procesar las imágenes de los conductores.
2.  Construir y entrenar un modelo para clasificar las imágenes de los conductores.
3.  Chequear el ajuste del modelo y mejorarlo usando diferentes técnicas.

**Transfer Learning**

Normalmente, no hace falta entrenar una Red Neuronal Convolucional empezando de cero.

Redes Convolucionales modernas, entrenadas con enormes conjuntos de datos como _ImageNet_, pueden tardar semanas en múltiples GPU’s.

En cambio, una práctica cada vez más habitual es el uso de **redes pre-entrenadas** como un extractor de características fijas, o como una red inicial para ajustes más finos.

La red pre-entrenada **VGG** es interesante para el objetivo de este proyecto porque, aparte de su sencillez, genera excelentes resultados. La idea es mantener todas las capas de la red VGG, conectando su capa final a nuestro propio clasificador.

De esta forma, podríamos usar la red VGG como un extractor de características fijas para nuestras imágenes, quedando pendiente el entrenamiento de un clasificador más sencillo al final de todo (_top model_).

En este proyecto, utilizaremos la red pre-entrenada “**VGG16**”, como punto de partida. Para el ajuste más fino, utilizaremos **3 capas finales**, propuestas en este [**_link_**](http://www.learndatasci.com/tutorials/hands-on-transfer-learning-keras/) (“_Hands-on Transfer Learning with Keras and the VGG16 Model_”).

A partir del resultado de este primer ajuste, construiremos nuevos modelos, **con más capas**. También utilizaremos el recurso de **_Data Augmentation_**, e incluso nos atreveremos a cambiar la “**VGG16**” por la “**VGG19**”, red neuronal pre-entrenada más compleja, ya que cuenta con 3 capas más que la “**VGG16**”.

**Amazon Web Services**

Los ajustes de este primer modelo y de todos los demás presentados en este artículo han sido realizados en _SageMaker_ de **_Amazon Web Services_**. Para ello, hemos contado con el crédito de **1.000$** que _Amazon_ nos concedió por formar parte de la familia **Saturdays.AI.**

Hemos elegido el centro computacional ubicado en ‘_EE.UU. Este (Ohio)us-east-2_’, ya que este centro disponía de **máquinas con GPU**. La máquina elegida para abrir la instancia de nuestro notebook en _SageMaker_ ha sido: ‘**ml.p3.2xlarge**’.

**Parámetros y Evaluación de los Modelos**

Un resumen de los parámetros de los modelos ajustados será presentado a continuación en modo de tabla.

De todas formas, no está de más comentar que, en todos los modelos, hemos fijado **_Batch_ = 32** y **_Epochs_ = 25**, para que hubiese una base de comparabilidad entre los ajustes de los modelos.

Para hacer la evaluación de los modelos ajustados, además de las gráficas de _accuracy_ y de _loss_ generadas por el algoritmo, hemos clasificado **1.002 imágenes**, que a partir de ahora llamaremos ‘**_Test Data_**’.

Esta imágenes han sido elegidas aleatoriamente de las **79.725 imágenes no clasificadas para testeo**, con el objetivo de tener una **medida de _accuracy_** en un conjunto de imágenes totalmente ajeno a los datos utilizados para los entrenamientos (‘_Test Data_’ _Accuracy_).

También hemos preparado un código en _Google Colab_ (“model\_test.ipynb”), para poder **visualizar el resultado del modelo en cada imagen**, como se puede ver en el GIF de abajo.

![](/media/c94a43af5e2344ee.webp)

**Figura 5.** Output de “model\_test.ipynb”.

## **Modelo 1: VGG16 + 3 Capas**

Como comentado anteriormente, para el primer modelo (“base”) hemos utilizado la red pre-entrenada “**VGG16**”, y para el ajuste más fino, hemos utilizado **3 capas finales**.

El resultado del ajuste de este modelo podría ser considerado satisfactorio, teniendo en cuenta que este ha sido el primer intento de modelización del proyecto:

- ‘_Test Data_’ _Accuracy_: **80,44%**

![](/media/9401dcb864d6ee74.webp)

**Figura 6.** Gráficas de A_ccuracy_ y _Loss_ del Modelo 1.

## **Modelo 2: VGG16 + 3 Capas + _Data Augmentation_**

Para mejorar el modelo anterior, nos hemos planteado utilizar el recurso de “**_Data Augmentation_**_”_.

En principio, no sabíamos a que se referían algunos de los diversos parámetros disponibles para hacer el _Data Augmentation_, tampoco qué significaban sus rangos.

Para solventarlo, hicimos una serie de pruebas, para poder decidir qué parámetros de _Data Augmentation_ queríamos emplear en nuestro conjunto de imágenes y sus respectivos rangos.

Al tratarse de un experimento controlado, el conjunto de imágenes utilizado requería un _Data Augmentation_ **controlado y discreto**, teniendo en cuenta que cambios exagerados aplicados a las imágenes originales podrían ser contraproducentes.

Por ejemplo, hemos decidido no hacer “rotaciones”, ya que corríamos el riesgo de generar imágenes “antinaturales”.

Los parámetros de _Data Augmentation_ que hemos utilizado han sido: “**zoom**”, “**width**”, “**height**” y “**brightness**”. A continuación, algunos ejemplos.

![](/media/118486faf2dd091c.webp)

**Figura 7.** Zoom\_range = \[0.95, 1.05\]

![](/media/e0395a458e955d6c.webp)

**Figura 8.** Width\_shift\_range = 0.1

**Nota:** las imágenes tienen ese tono debido al preprocesamiento de RGB.

El resultado del ajuste de este modelo ha mejorado considerablemente con relación al anterior (Modelo 1), por lo que hemos decidido continuar utilizando _Data Augmentation_ en los siguientes modelos ajustados en el marco de este proyecto.

- ‘_Test Data_’ _Accuracy_: **83,73%**

![](/media/284360c748096340.webp)

**Figura 9.** Gráficas de A_ccuracy_ y _Loss_ del Modelo 2.

## **Modelo 3: VGG16 + 5 Capas + _Data Augmentation_**

De cara a seguir mejorando el ajuste anterior, hemos incrementado **2 capas** a la red neuronal final (_top model_), manteniendo los mismos parámetros de _Data Augmentation_ del modelo anterior.

Se observa una mejora importante en el _accuracy_ del modelo en ‘_Test Data_’:

- ‘_Test Data_’ _Accuracy_: **88,12%**

![](/media/f6887c2bfb13d306.webp)

**Figura 10.** Gráficas de A_ccuracy_ y _Loss_ del Modelo 3.

## **Modelo 4: VGG19 + 5 Capas + _Data Augmentation_**

A esta altura, ya que los resultados habían mejorado considerablemente, hemos decidido hacer algo diferente, como un **cambio de la red pre-entrenada**, para seguir explorando nuevos caminos hacia la mejora.

Hemos utilizado la red “**VGG19**”, que contiene **3 capas más** que la red “**VGG16**”.

En este caso, los resultados de _accuracy_ no han mejorado respecto al Modelo 3:

- ‘_Test Data_’ _Accuracy_: **84,53%**

![](/media/2332fb61c5aa9bd2.webp)

**Figura 11.** Gráficas de A_ccuracy_ y _Loss_ del Modelo 4.

Por lo que hemos decidido volver a utilizar la red **“VGG16**” para el ajuste del siguiente modelo.

## **Modelo 5: VGG16 + 9 Capas + _Data Augmentation_**

Para seguir explorando otras posibles mejoras en lo que concierne al _accuracy_ del modelo, hemos decidido **aumentar considerablemente el número de capas**, de **5** a **9**, manteniendo el _Data Augmentation_ anterior.

En este caso, tampoco hemos mejorado el _accuracy_ respecto al **Modelo 3**, aunque el resultado haya sido bastante aceptable:

- ‘_Test Data_’ _Accuracy_: **86,63%**

![](/media/ca17847d518c266b.webp)

**Figura 12.** Gráficas de A_ccuracy_ y _Loss_ del Modelo 5.

## Tabla Resumen

La tabla a continuación detalla los **5 modelos ajustados** y la línea de razonamiento seguida para ir ajustándolos, paso a paso.

En azul, los cambios implementados a partir del primer modelo (“base”), y los mejores resultados de _accuracy_ (**\> 85%**).

![](/media/340595e7db2359b3.webp)

**Figura 13.** Parámetros y resultados de los 5 modelos ajustados.

## Matriz de Confusión: Modelo 3

Los porcentajes de acierto por categoría provenientes del ajuste del **Modelo 3** son en general bastante satisfactorios.

Esto se refleja en la **Matriz de Confusión** del modelo.

![](/media/17d2bbe14d28d68b.webp)

**Figura 14.** Matriz de Confusión del Modelo 3.

Se destacan las siguientes categorías por su **alto porcentaje de acierto** (**\>95%**): “**c3**” (tecleando el móvil -mano izquierda), “**c5**” (manipulando la radio) y “**c7**” (buscando en la parte trasera).

![](/media/3f95be26dd58d4f6.webp)

**Figura 15.** Porcentajes de acierto por categoría.

Es notable la disminución del porcentaje de acierto en la categoría “**c9**” (hablando con pasajero). Esto pasa debido a que las categorías “**c0**” y “**c9**” podrían ser consideradas las “**menos excluyentes**”, según comentado anteriormente.

Si aceptáramos tanto c0 como c9 para las imágenes etiquetadas c9, su porcentaje de acierto pasaría del 54,5 % al 85,7 %: 31,2 puntos porcentuales más. Es un cálculo exploratorio que cambia el criterio de evaluación, no una mejora del modelo ni una medida comparable con la exactitud original.

Hemos realizado este cálculo para intentar cuantificar el **impacto en _accuracy_** por el hecho de haber trabajado con un par de categorías “**algo menos excluyentes**”.

Definir con más claridad la diferencia entre c0 y c9 podría ayudar a etiquetar y evaluar los datos. Aun así, una mejora del rendimiento tendría que comprobarse con un conjunto independiente. Al comparar repetidamente modelos sobre las mismas 1.002 imágenes, ese conjunto pasa a orientar la selección y deja de ser una prueba final independiente.

Por otro lado, entendemos que el estudio tiene que reflejar situaciones cotidianas, ya que serán la realidad a ser afrontada en el momento de desplegar cualquier modelo en la vida real.

## Conclusiones

La **gran capacidad computacional** que requiere este tipo de técnica ha hecho que tuviéramos que dedicar una parte importante del recurso del proyecto para solventar problemas de ejecución de los códigos utilizados.

Hemos tenido que aprender a utilizar los servicios de **_Amazon Web Services_** para hacerlo viable, y los modelos de este proyecto han podido ser entrenados gracias a las **GPU’s** disponibles de esta plataforma.

A continuación, se presentan algunas conclusiones y lecciones aprendidas tras desarrollar este proyecto:

1.  **No siempre un incremento de capas** a la Red Neuronal va a **mejorar el _accuracy_ del ajuste del modelo**. Este hecho se ha podido ver en los ajustes de los Modelos 3 y 5.
2.  El recurso de **_Data Augmentation_** debe ser utilizado **con criterio**, tras un análisis del conjunto de imágenes inicial, ya que su uso indiscriminado puede ser contraproducente.
3.  El **trabajo en equipo** ha sido fundamental para el éxito de este proyecto. Los perfiles diferentes entre los miembros del equipo del proyecto y del equipo coordinador de **Saturdays.AI Donostia** ha sido clave para sumar una **visión amplia y enriquecedora**.

El camino no ha sido fácil y ha requerido muchas horas de entrenamientos. Pero créenos: ¡**ha merecido la pena**!

## Próximos Pasos

Como próximos pasos, nos planteamos lo siguiente:

- Ajustar un segundo modelo más específico que aprenda a detectar las diferencias entre las categorías “**c0**” y “**c9**”.

- Volver a entrenar el **Modelo 4** (VGG19 + 5 capas + _Data Augmentation_), pero ahora con más “**_epochs_**”. La idea es observar si con más entrenamientos la red “**VGG19**” converge a los mismos resultados observados con la red “**VGG16**”.

- Ejecutar el **Modelo 3** en una _Jetson Nano Nvidia_, y por medio de una cámara instalada en el coche, comprobar la eficacia del modelo en la detección de comportamientos inadecuados.

## Equipo de Trabajo

Y para despedirnos, nos gustaría presentarnos.

Hola. Me llamo [Imanol Areizaga](https://www.linkedin.com/in/imanol-areizaga/) y soy Ingeniero Industrial. Desde mis primeras experiencias laborales estoy trabajando en procesos de digitalización en el ámbito industrial. En el camino de _Data Science_ vas descubriendo paso a paso nuevos horizontes y en este paso que estoy dando junto a Saturdays.AI estoy interesado en cómo aplicar _Deep Learning_ en el ámbito Industrial. Un ámbito muy exigente, en el que la eficiencia de los modelos tiene que ser muy cercana al 100%.

Hola a tod@s. Me llamo [Henry Corazza Sef](https://www.linkedin.com/in/henry-corazza-sef-0401161b8/) y soy estadístico. Aunque me haya decantado por trabajar en la implementación de la Metodología 6 Sigma en el área industrial, sigo muy interesado en _Data Science_ en general. Tras este curso, he descubierto otra pasión: ¡el enigmático universo de las Redes Neuronales! ?

Agradecemos a los mentores y organizadores de [**Saturdays.AI**](https://www.saturdays.ai/) **Donostia**, especialmente a [**Beñat Galdós**](https://www.linkedin.com/in/benatgaldos/), [**Joxemari Gallastegi**](https://www.linkedin.com/in/jgallastegi/) e [**Imanol Echeverria**](https://www.linkedin.com/in/imanol-echeverr%C3%ADa-franco-67617513b/), por su **profesionalidad, dedicación y entusiasmo**.

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esta aplicación: [https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2021/focusondriving-main](https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2021/focusondriving-main)

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
