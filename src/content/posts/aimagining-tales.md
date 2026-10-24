---
title: AImagining Tales
description: AImagining Tales es un proyecto que nace en la quinta edición del
  curso de Saturdays AI Madrid, como propuesta para el desafío de crear un
  proyecto de impacto social utilizando la Inteligencia Artificial. La finalidad
  de este…
pubDate: 2023-06-07
author: Info Saturdays
category: AI for good
kind: project
tags: []
image: /media/ed23d6e8b5c4e3d9.webp
imageAlt: AImagining Tales
legacyPath: /2023/06/07/aimagining-tales/
sourceUrl: https://saturdays.ai/2023/06/07/aimagining-tales/
sourceId: 7393
language: es
draft: false
---

AImagining Tales es un proyecto que nace en la quinta edición del curso de [Saturdays AI Madrid](https://saturdays.ai/madrid/), como propuesta para el desafío de crear un proyecto de impacto social utilizando la Inteligencia Artificial.

La finalidad de este proyecto es ser capaces de ilustrar cuentos.

![](/media/ed23d6e8b5c4e3d9.webp)

Generación de imagen por AImagining Tales

**¿Quiénes somos?**

Los integrantes del equipo pertenecemos al itinerario de Deep Learning. Desde el principio hemos estado muy interesados en el procesamiento de imágenes y texto, así que, ¿por qué no combinar ambas?

-   [David Cayuelas García](https://www.linkedin.com/in/dcg12/)
-   [Marta Díez Díez](https://www.linkedin.com/in/marta-d%C3%ADez-d%C3%ADez-a7b4a81a5/)
-   [Alejandra De Francisco Rus](https://www.linkedin.com/in/alejandradfrus/)
-   [Claudia Lucio Sarsa](https://www.linkedin.com/in/claudia-lucio-sarsa-03a383124/)
-   [Pablo Rodríguez Lapetra](https://www.linkedin.com/in/pablorodriguezlapetra/)

## ¿Cuál es nuestra motivación?

A través de esta iniciativa apostamos por el uso de la Inteligencia Artificial como ayuda a personas (en particular, niños) con problemas de aprendizaje, proporcionándoles una herramienta muy atractiva y visual de representación de textos.

Adicionalmente, buscamos potenciar la escritura infantil, de forma que el niño pueda imaginar y escribir un cuento y, a continuación, verlo plasmado en imágenes autogeneradas.

De algún modo nos recuerda a las coloridas vidrieras de las iglesias. Su finalidad original era representar pasajes bíblicos para transmitir al pueblo, en su mayoría analfabeto, sus enseñanzas, a las que de otra manera no eran capaces de acceder.

AImagining Tales nace con la intención de eliminar las principales barreras de acceso a la lectura y escritura.

## ¿En qué consiste nuestra solución?

Queremos construir una herramienta capaz de ilustrar cuentos a través de la Inteligencia Artificial.

En su concepción básica, nuestra herramienta procesaría el texto de un cuento como entrada para generar una imagen representativa de su contenido. Los textos originales, acompañados de sus correspondientes imágenes, se recopilarían en un documento PDF.

Para la generación de las imágenes vamos a utilizar alguna de las soluciones (modelos) existentes más innovadoras de generación de imágenes: VQGAN+CLIP. No obstante, estas soluciones presentan restricciones en cuanto al tamaño del texto que reciben como entrada, por lo que será necesario un tratamiento para reducir el número de palabras.

Se ha optado por desarrollar un modelo de Procesamiento del Lenguaje Natural (NLP) para resumir los textos originales. Dicho modelo estará basado en modelos de sumarización existentes, reentrenados para nuestra tarea específica: la interpretación y resumen de cuentos.

Finalmente, texto e imágenes serán recopilados en un documento en formato PDF.

Con todo ello, el flujo sería el siguiente:

El cuento pasaría por un modelo NLP de sumarización, que daría como salida el texto resumido. Este resultado sería la entrada de la red VQGAN+CLIP, de la que se obtendría su representación. Una vez completadas las etapas, el texto del cuento y sus imágenes se combinarían en un documento PDF para su uso (más adelante se ilustra cada paso).

## 1\. El dataset: Shmoop Corpus

A la hora de entrenar una herramienta como el summarizer se plantea un reto muy importante: se necesitan cuentos o historias resumidas por personas y, además, que incluyan tanto descripciones como diálogos. Esta tarea es costosa y podría suponer una limitación crucial para la viabilidad del proyecto.

Afortunadamente, nos encontramos con que un grupo de investigadores de la Universidad de Toronto ya se había enfrentado a este problema. Para poder trabajar sobre modelos de sumarización, proponen su propio conjunto de datos: [Shmoop Corpus](http://www.cs.toronto.edu/~makarand/shmoop/).

Shmoop Corpus consta de 231 historias con 7.234 capítulos en total, con sus correspondientes resúmenes. Las historias, tal y como se indica en el [paper original](https://arxiv.org/pdf/1912.13082.pdf), han sido extraídas del Proyecto Gutenberg y los resúmenes desde la web de Shmoop, que da nombre al corpus. El verdadero elemento diferenciador en este dataset es que, además, proporcionan las claves para relacionar el par texto-resumen.

El equipo de Shmoop Corpus proporciona el conjunto de ficheros que contienen tanto las historias completas organizadas en carpetas (una por cada capítulo) como los ficheros en los que se indica el alineamiento/claves texto-resumen. Para la obtención de los resúmenes desde la web de Shmoop hemos recurrido a prácticas de raspado web (_web scraping_).

![](/media/acd45b3152391809.webp)

Extracto de ejemplo de par texto-resumen del paper original de Shmoop Corpus.

Para agrupar estos datos y obtener finalmente un dataset en el formato adecuado para entrenar el modelo, se lleva a cabo una tarea de agregación de la información desagregada en diferentes niveles de archivos (textos, resúmenes, claves texto-resumen).

El resultado de este procesamiento, un dataframe con una columna de párrafos y otra de resúmenes, es el input de entrenamiento del summarizer.

## 2\. Procesamiento de textos: Summarizer

Tras la recopilación y procesamiento de los datos, estamos preparados para entrenar nuestro modelo sumarizador, en adelante el _summarizer_.

Un modelo de sumarización es un modelo de NLP capaz de procesar un texto para devolver una versión reducida del mismo, de manera que se retenga la información más importante. El resumen obtenido puede ser un extracto del texto original, un texto generado por el propio modelo en base a su interpretación o una combinación de ambas, como es el caso de nuestro _summarizer_.

![](/media/8c161b3a59a301c9.webp)

Resumen de un texto tras pasarlo por el Summarizer.

Actualmente, existen multitud de modelos preentrenados con este propósito, la mayoría de ellos basados en _transformers_. Estos están recogidos en la plataforma _Hugging Face_, un proyecto especializado en tareas de NLP y que persigue democratizar el acceso a la IA facilitando herramientas, datasets, modelos, etc. en abierto y para la comunidad.

En particular, en este proyecto hemos tomado como base tanto el _tokenizer_ como el _summerizer_ del modelo [_t5_ de Google](https://ai.googleblog.com/2020/02/exploring-transfer-learning-with-t5.html) y lo hemos reentrenado con nuestro propio conjunto de datos para que sea capaz de interpretar y resumir no solo narraciones sino también diálogos. Este procedimiento de reentrenamiento para adaptarlo a una nueva tarea es lo que se conoce como _transfer learning_.

Nota a navegantes extraviados: La tokenización es el paso previo al entrenamiento del modelo en tareas de NLP. Las redes neuronales habituales se entrenan realizando un montón de operaciones tensoriales con datos en formato numérico. Cuando trabajamos con texto es necesario convertirlo a formato numérico para que la red sea capaz de interpretarlo. Un tokenizador es el componente encargado de llevar a cabo dicha conversión, generalmente basado en mecanismos de _one hot encoding_ o _embeddings._

Una vez entrenado con nuestros datos, el nuevo modelo debería ser capaz de resumir el contenido literario mejor que el original. Este resumen de salida del _summarizer_ va a ser consumido por el modelo generador de imágenes.

## 3\. Generación de imágenes: VQGAN + CLIP

Tras aplicar el summarizer sobre nuestros textos, es hora de usar estos resúmenes para generar las imágenes que ilustrarán nuestras historias. Para ello, nos hemos centrado en modelos de generación de imágenes a partir de texto.

Después de hacer la correspondiente investigación del actual estado del arte (más allá de DALL-E y DALL-E 2), encontramos una implementación muy interesante que une VQGAN y CLIP (_Vector Quantized Generative Adversarial Network and Contrastive Language–Image Pre-training_).

Las redes GANs (_Generative Adversial Networks_) son sistemas compuestos por dos redes neuronales, que básicamente “se enfrentan” una contra otra. Un _generador_ que sintetiza imágenes o datos, y un _discriminador_, que puntúa la actuación del anterior. El proceso es recursivo, por lo que ambas redes mejoran sus resultados tras el correspondiente entrenamiento.

En este concepto se basa nuestro modelo. [VQGAN](https://compvis.github.io/taming-transformers/) es la red neuronal generativa, entrenada para generar imágenes similares a otras. Mientras que CLIP, es la red neuronal capaz de determinar “cómo de bien” el texto de entrada coincide con la imagen generada.

Además, en este proceso se pueden añadir multitud de parámetros: imágenes de referencia, estilos, más de un único texto, el tamaño de la imagen generada, etc.

![](/media/36b1d71afb48660f.webp)

Representación de “Fantasy city on a sunny day” con diferentes estilos.

Por supuesto, el reto ha sido entender este modelo ya entrenado, para saber qué parámetros se ajustan mejor a nuestro proyecto, así como los textos de entrada que mejores resultados dan (ni muy cortos, ni muy largos, diferencias entre un único texto con sentido o conceptos clave…).

## 4\. Generación de cuentos: PDF generator

Por último, es hora de unir el resultado de todos los pasos en nuestro cuento ilustrado.

Para ello, hemos desarrollado una serie de funciones que crean el cuento en formato PDF. Aquí unimos los textos iniciales, junto con las imágenes generadas a partir de los resúmenes.

Tras barajar diferentes opciones de librerías de Python que ofrecen esta funcionalidad (_ReportLab_, _PyPDF2_), nos decidimos por [_PyFPDF_](https://pyfpdf.readthedocs.io/en/latest/) por el manejo más sencillo.

Evidentenmente, la primera página constará de una portada con título e imagen generada a partir de él, mientras que para el resto de páginas podemos encontrar diferentes formatos, que se diferencian en la situación de la imagen.

Además, hemos decidido dar un estilo de cuento a nuestros documentos, con un borde y detalles en las esquinas.

![](/media/b0ba0f5d5195bce3.webp)

“La Bella y la Bestia” ilustrado por AImagining Tales.

## Próximos pasos y reflexiones

Esta propuesta es una primera iteración, una prueba de concepto, el resultado del trabajo colaborativo de nuestro equipo a lo largo de seis semanas.

A través de nuestro proyecto queremos poner en valor el inmenso potencial que ofrece la Inteligencia Artificial para dar soluciones a problemas reales de actualidad, soluciones que están al alcance de todos.

Aún queda por hacer para que AImagining Tales sea una realidad.

_Y colorín colorado…_

Si te has quedado con ganas de más y quieres revisar el código en mayor profundidad, te invitamos a visitar [nuestro repositorio de Github](https://github.com/pablorl94/AImagining-tales).

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
