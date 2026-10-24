---
title: Detección Temprana de Incendios en Áreas Forestales con Inteligencia
  Artificial- Parte I
description: Quito. 2021 ¿Sabes cuántas hectáreas se queman cada año por causa
  de incendios forestales? ¿Sabías que producto de esto muchas especies dejan su
  hábitat en busca de un nuevo hogar?¿Me creerías si te dijera que podemos
  utilizar…
pubDate: 2021-11-19
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Acción por el Clima
  - Imagenes
  - YoloV5
image: /media/fab41aa6eba978fa.webp
imageAlt: Detección Temprana de Incendios en Áreas Forestales con Inteligencia
  Artificial- Parte I
legacyPath: /2021/11/19/deteccion-temprana-de-incendios-en-areas-forestales-con-inteligencia-artificial-parte-idet/
sourceUrl: https://saturdays.ai/2021/11/19/deteccion-temprana-de-incendios-en-areas-forestales-con-inteligencia-artificial-parte-idet/
sourceId: 4561
language: es
draft: false
---



![](/media/fab41aa6eba978fa.webp)

[Quito](https://quito.saturdays.ai/?_ga=2.214452372.2064571031.1649088432-1474023447.1648397939). 2021

¿Sabes cuántas hectáreas se queman cada año por causa de incendios forestales? ¿Sabías que producto de esto muchas especies dejan su hábitat en busca de un nuevo hogar?¿Me creerías si te dijera que podemos utilizar la tecnología sobre todo la Inteligencia Artificial para disminuir el impacto de los incendios forestales? En este artículo, utilizaremos la Inteligencia Artificial para detectar de forma temprana incendios en áreas forestales.

Yoal igual que tú estaba un poco escéptico al inicio, pero déjame contarte cómo el ser humano puede ayudarse de la tecnología para frenar estos atentados contra la madre naturaleza. Por eso te invito a leer nuestra idea de cómo detectar incendios desde sus etapas muy tempranas para poder frenarlos y así evitar grandes desastres. ¿Te imaginas un mundo donde podamos minimizar este tipo de incendios forestales? Pues aquí colocamos casi todo lo que necesitas para llevar a cabo este proyecto y te conviertas en un defensor de la Pachamama.

##   
**Primero pasos**

La idea del proyecto para detectar incendios forestales mediante Inteligencia Artificial comenzó una tarde en el taller que llevábamos en Saturday AI y con los compañeros: Luis Marcelo Viteri Aguilar, Danilo Josue Erazo Quinaluisa, Jonathan Alejandro Zambrano Mejía y Wilfredo Martel; decidimos hacer frente a esta problemática.

##   
**Idea General**

La idea del proyecto de Detección Temprana de Incendios Forestales es utilizar la Inteligencia Artificial con ayuda de un Dron compuesto con un GPS y una cámara para que escaneen áreas forestales y en caso de detectar incendio envíen la alarma a un servidor principal que se encargará de notificar a los bomberos y comunidades aledañas informándoles con una foto del sector, la posición en un mapa y el porcentaje de estimación con la finalidad de evitar que se propague el incendio y arrase con la flora y fauna del sector.

![](/media/f45ce46c227b848b.webp)

Esquema del funcionamiento

##   
**Problemática**

Enel 2020, más de [5.5 millones](https://www.wwf.es/?54921/Informe-incendios-forestales-2020-El-planeta-en-llamas) de hectáreas fueron devastadas por incendios forestales a nivel mundial teniendo un gran impacto sobre la flora y fauna salvaje que habitaba en esta área.

En Ecuador, en el mismo año se perdieron aproximadamente [23.462](https://www.gestionderiesgos.gob.ec/wp-content/uploads/2020/11/Informe-de-Situacion-No-005-Incendios-Forestales-08112020_17h00.pdf) hectáreas y debido a la estructura montañosa de los lugares es complicado para los bomberos llegar a tiempo. El fuego devastador devoró todo a sus alrededores y tuvieron que pasar en el mejor de los casos semanas para mitigar el incendio y en el peor de los casos meses.

Ante este alarmante problema con impacto social y ambiental se pensaron soluciones que ayuden a detectar a tiempo los incendios forestales, es entonces cómo surge la idea de fusionar la Inteligencia Artificial (de ahora en adelante I.A.) con un dron para la detección temprana de incendios en las áreas forestales de nuestro país. La idea consiste en entrenar un modelo de I.A. (detectar fuego en cualquier superficie) que interactúe con el dron el cual dispondrá de una cámara y un _GPS_, por lo tanto, en tiempo real se sabrá la posición del incendio y enviará una alarma a los bomberos para su mitigación.

##   
**Fase de Ejecución**

Para llevar a cabo la ejecución de este grandioso prototipo, que desde ya se observa a la distancia los beneficios, se realizó en cinco fases:

1.  Fase de recolección de datos ([_dataset_](https://drive.google.com/file/d/1QiQx8_ypjDXvDXQu6wTPQNxKb9Civj2B/view?usp=sharing))
2.  Investigación previa de modelo Pre-entrenados de I.A.
3.  Reentrenamiento y Validación del modelo
4.  Deployment del modelo
5.  Desarrollo de un sitio Web para presentación del Prototipo

Antes de continuar se aclara que la fase de integración con el dron, el servidor, notificación a las comunidades y bomberos queda pendiente para la segunda parte de este artículo.

##   
**1\. Fase de recolección de datos e Investigación de modelos para Clasificación de Imágenes**

Esta fase se enfocó en la recolección de imágenes de incendios forestales ocasionados alrededor del mundo y en nuestro país. Se logró obtener un total de [250 MB](https://drive.google.com/file/d/1QiQx8_ypjDXvDXQu6wTPQNxKb9Civj2B/view?usp=sharing) de información la cual se empleará como entrada para el aprendizaje de nuestro modelo.

Una vez ya obtenido el dataset, como una tarea en paralelo se realizó una investigación de modelos de I.A. clasificadores de imágenes y el que escogimos debido a su efectividad fue [Yolo v5](https://github.com/ultralytics/yolov5). Esto a la vez significa que se tiene que realizar un proceso de anotación que consiste en dar las coordenadas del segmento a caracterizar dentro de una imagen.

En otras palabras, explicaremos lo que implica en nuestro dataset el utilizar Yolo v5:

1\. Se debe anotar o indicar los segmentos a aprender dentro de la imagen. En nuestro caso son poner las coordenadas donde hay fuego y de esta manera la herramienta Yolo V5 pueda aprender y obtener patrones de diferenciación. Para saber más sobre el proceso de anotación de Yolo v5 se recomienda echar una lectura a este [enlace](https://blog.paperspace.com/train-yolov5-custom-data/) para despejar sus dudas.

2\. Para el proceso de anotación se utilizó una herramienta de mucha ayuda llamada [HyperLabel](https://docs.hyperlabel.com/) que la encontramos en [enlace](https://towardsdatascience.com/how-to-create-an-end-to-end-object-detector-using-yolov5-35fbb1a02810).

3\. Una vez que se obtuvo las anotaciones, que básicamente es un archivo xml que hace alusión a la imagen con sus coordenadas, se procede a generar un archivo para el formato de Yolo v5. Para este proceso se siguió el código github [ai-coodiantor](https://github.com/ai-coodinator/xml_to_textYolo).

Con estos pasos ya ejecutados, se tiene preparado el entrenamiento personalizado con nuestro propio dataset.

##   
**2\. Reentrenamiento y Validación del modelo**

Para la parte de entrenamiento del modelo ya pre-entrenado se utilizó Google Colab Pro con GPU v100 y un tiempo estimado de 12 horas para su finalización. Al finalizar el proceso se obtuvo como resultado del entrenamiento un modelo de inferencia con extensión .pt. En nuestro caso, nuestro archivo [fireModel.pt](https://drive.google.com/file/d/1jjqbdkLrY-OKznRGmcE1pyhKWFR36sLK/view?usp=sharing) que servirá de insumo para inferir sobre imágenes de prueba. Antes de avanzar hay que aclarar que este modelo una vez que pase todas las pruebas, se pondrá en un dron mediante una placa Nvidia Jetson TX2 para su procesamiento en tiempo real, en donde cuando se detecte algún indicio de incendio forestal se proceda a enviar la alarma a instituciones tales como: Bomberos, Comunidades aledañas etc.

A continuación, en la Ilustración 2 se muestra el [código](https://colab.research.google.com/drive/1FGRcv6YmvgtFl5BBkSULp-AwLpm40one?usp=sharing) que se utilizó para entrenar el modelo de detección de incendios.

![](/media/a86d9a662c3834a5.webp)

Modelo de entrenamiento de Yolov5

##   
**3\. Deployment del modelo**

Una vez que se obtuvo el modelo fireModel.pt se procedió a realizar un pequeño aplicativo en Python utilizando Flask como servidor de aplicaciones. Es decir, en Flask se tendrá una API que recibirá la imagen a inferir y el modelo fireModel.pt nos retornará el resultado y la sección donde se ha detectado el incendio en la foto con su respectivo porcentaje de predicción. A continuación, en la Ilustración 3 se muestra el código que realiza la descripción previa.

**app**.**py**

![](/media/ec6ae1a1d0d597a9.webp)

[Enlace](https://github.com/wilfoderek/flaskInferenceModel/commit/a0099e004544fce1f15ba7bc76fee7e1c9635041) del código.

A continuación, en la Ilustración 4 se muestra la prueba del modelo usando Postman.

![](/media/9052c8f3fc4af487.webp)

Resultado de la Inferencia del modelo entrenado

##   
**4\. Desarrollo de un sitio Web para presentación del Prototipo**

Para nuestro prototipo se desarrolló una Landing Page que permite cargar una imagen la cual será enviada al servidor para su procesamiento para que una vez terminada la inferencia de la imagen, los resultados se envíen al cliente con las posiciones de donde se ha detectado el incendio y el porcentaje de predicción.

Las herramientas utilizadas para la página web son:

1\. Angular 2+

2\. Angular Material

Por otro lado, para pintar los resultados de la inferencia se utilizó canvas para posteriormente dibujar las coordenadas dentro de la imagen cargada. Vale la pena mencionar que, al momento de pintar las coordenadas debido a que las dimensiones no son las mismas se tuvo que adecuar de tal manera que todas tengan las mismas dimensiones. A continuación, en la Ilustración 5 se muestra el código.

![](/media/f37daca5f86ac1bd.webp)

Función de transformación de las coordenadas de yolo v5 al frontal

Finalmente, en la siguiente ilustración se muestra la Landing Page y los resultados del modelo.

![](/media/b83accd40afea9f3.webp)

Landing page para presentación del demoday

![](/media/e0c426c15468037a.webp)

Inferencia del modelo sobre una imagen de prueba

##   
**5\. Resultado del Entrenamiento**

Los resultados obtenidos durante el entrenamiento son muy alentadores a pesar de haber trabajado con un dataset no tan grande. Se ha alcanzado un porcentaje de predicción del **71**% lo cual es aceptable. Además, se tiene que las pruebas realizadas con imágenes con incendios forestales, se pudo detectar el incendio absolutamente en todas. Estas imágenes contenían incendios a la luz del sol, faltaría realizar pruebas con imágenes que contengan incendios forestales nocturnos.

**Matriz de confusión**

En la Figura 1, se muestra el desempeño de nuestro algoritmo con una predicción del **71%** de acierto.

![](/media/bcf37043b4f645fc.webp)

Matriz de confusión


**Curva de Precisión de Recuperación (PR)**

La curva PR se la utilizó para la evaluación de rendimiento de nuestro modelo. En la Figura se observa que el AP(Promedio de Precisión) es de 0.5, un nivel de precisión normal para empezar. Para conocimiento general, si este valor se acerque más a 1 será mucho mejor el [nivel de precisión](https://medium.com/bluekiri/curvas-pr-y-roc-1489fbd9a527) de nuestro modelo.

![](/media/1c4db728a057269c.webp)

Curva PR del modelo tuneado

##   
**Conclusiones**

-   Se requiere un mayor poder computacional para entrenar modelos que tardan más de 12 horas en terminar el proceso de aprendizaje y los mismos tengan un buen porcentaje de confianza en la predicción.
-   El modelo tiene un tiempo corto de respuesta para la inferencia y esto es útil una vez que esté montado en el dron para la vigilancia de los bosques.
-   Después de realizar varios experimentos con el modelo se ve un potencial enorme que se puede explotar para detección de incendios de todo tipo.

“Nunca se alcanza la verdad total, ni nunca se está totalmente alejado de ella”. Aristóteles _(384 AC-322 AC)_

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esa aplicación: https://github.com/SaturdaysAI/Projects/tree/master/Quito/2021/deteccion-temprana-de-incendios\_main

##   
**¡Más inteligencia artificial!**

La misión de [Saturdays.ai](http://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](http://www.saturdays.ai/) ¡te esperamos! [Saturdays.AI](https://medium.com/saturdays-ai?source=post_sidebar--------------------------post_sidebar--------------)



-   [Detección De Incendios](https://medium.com/saturdays-ai/tagged/detecci%C3%B3n-de-incendios)
-   [Fire Detection](https://medium.com/saturdays-ai/tagged/fire-detection)
-   [Yolov5](https://medium.com/saturdays-ai/tagged/yolov5)
-   [Incendios Forestales](https://medium.com/saturdays-ai/tagged/incendios-forestales)
-   [AI](https://medium.com/saturdays-ai/tagged/ai)



WRITTEN BY

## [Wilfredo Martel](https://medium.com/@wilfredo.martel?source=follow_footer-----ad6865c1d2e5-----------------------------------)

I am a very curious and sometimes an intrepid person. I love learning and build new things.

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----ad6865c1d2e5-----------------------------------)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----ad6865c1d2e5-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education.
