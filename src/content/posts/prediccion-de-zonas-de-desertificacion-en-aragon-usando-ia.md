---
title: Predicción de zonas de desertificación usando IA.
description: Un proyecto de la comunidad de Zaragoza que utiliza imágenes
  satelitales y aprendizaje automático para estudiar el riesgo de
  desertificación en Aragón.
pubDate: 2022-04-07
author: Saturdays.AI
category: AI for good
kind: project
tags:
  - Imagenes
  - Random Forest Regressor
  - Vida de Ecosistemas Terrestres
image: /media/26c1520ea7d1a2eb.webp
imageAlt: Predicción de zonas de desertificación usando IA.
legacyPath: /2022/04/07/prediccion-de-zonas-de-desertificacion-en-aragon-usando-ia/
sourceUrl: https://saturdays.ai/2022/04/07/prediccion-de-zonas-de-desertificacion-en-aragon-usando-ia/
sourceId: 6795
language: es
draft: false
---

![Desertificacion Aragón.](/media/26c1520ea7d1a2eb.webp)

_[Zaragoza](https://saturdays.ai/zaragoza/). Primera Edición. 2022_

La desertificación se produce por la **degradación de la tierra** que se da en zonas secas: áridas, semiáridas y subhúmedas secas. La actividad humana y las variaciones climáticas están entre las causas de esta degradación del suelo, que **impacta en los ecosistemas y en los recursos y modos de vida** de los habitantes de las zonas afectadas. Estas zonas secas son aquellas con un índice de aridez (IA=P/ETP) inferior a 0,65.

España es uno de los territorios que sufre esta problemática. En Aragón el 75% del territorio está en riesgo de desertización. El cambio climático y el incremento de las temperaturas amenazan las tierras semiáridas que predominan en el Valle del Ebro, desde la ciudad de Huesca hacia el sur. Identificar a tiempo estas zonas será de gran ayuda para el apoyo a la toma de acciones que permitirán mitigar el impacto que la desertificación trae sobre la seguridad alimentaria así como la reducción de la pérdida de hábitats naturales y biodiversidad, todo esto, alineado con los [Objetivos de Desarrollo Sostenible de Naciones Unidas](https://www.undp.org/es/sustainable-development-goals).

![Enfoque sobre los objetivos de Desarrollo Sostenibles 13 y 15. Accion por el clima y biodiversidad](/media/fe8f901d8cc49e1e.webp)

Enfoque sobre los objetivos de Desarrollo Sostenibles 13 y 15. Fuente: [https://sdgs.un.org/goals](https://sdgs.un.org/goals)

Para identificar estas zonas se propone un proceso que gestione el reconocimiento mediante imágenes satelitales de las zonas de desertificación en Aragón y permita realizar una aproximación a la predicción de posibles futuras zonas desérticas con el objetivo de aplicar políticas más eficientes referentes a la reforestación de las zonas afectadas, y nuevos tratamientos de cultivos. Con apoyo de la iniciativa **Saturdays.AI Zaragoza,** cuyo objetivo es acercar la IA a todos los ciudadanos y aplicarla a problemas sociales, queremos dar solución o una aproximación a resolver este escenario que nos hemos planteado como equipo de trabajo.

Es entonces, cuando nos planteamos las siguientes inquietudes, ¿Cómo es posible calcular si hay o no desertificación en una zona determinada?, ¿qué imágenes pueden funcionar para este propósito?, ¿Cómo la IA nos puede apoyar para predecir estos valores? A lo largo de este artículo intentaremos dar solución a estas cuestiones.

## Imágenes Satelitales

Las herramientas de teledetección hacen posible la visualización y cálculo de cambios que ocurren sobre la superficie terrestre, aquellas que nos interesan, los que corresponden a la teledetección pasiva ([Definición de Teledetección](https://eos.com/es/blog/teledeteccion/)), en nuestro caso concreto, captan la radiación solar reflejada por la superficie. Es bien sabido que organismos vivos reflejan y absorben radiación solar en forma diferente a como lo hacen los objetos inertes como calles o edificios. Aprovechando este principio, los satélites generan imágenes que contienen estas diferencias en forma de Niveles Digitales y bandas, que se traducen en unidades numéricas que se corresponden con los valores de longitudes de onda de las diferentes secciones del espectro electromagnético ([Espectro electromagnético y teledetección](https://www.esa.int/SPECIALS/Eduspace_ES/SEMZ3YD3GXF_0.html)). En resumen, miden la radiación reflejada por objetos como edificios o autopistas o entes vivos como bosques o vegetación en general.

![Principales Componentes de un sistema de Teledetección](/media/22aa53f9203a58f2.webp)

Principales Componentes de un sistema de Teledetección. Fuente : Curso de teledección [https://static.uvq.edu.ar/mdm/teledeteccion/unidad-1.html](https://static.uvq.edu.ar/mdm/teledeteccion/unidad-1.html)

## Índice de vegetación NDVI

Los cambios en la vegetación con el soporte de las imágenes satelitales se pueden medir de diferentes formas, una de ellas es extrayendo índices de vegetación, “_Los Índices de Vegetación son combinaciones de las bandas espectrales registradas por los satélites de Teledetección_” ([¿Cuál es el índice de Vegetación NDVI?](https://mappinggis.com/2020/07/los-6-indices-de-vegetacion-para-completar-el-ndvi/)) que permiten identificar vegetación sobre la superficie terrestre. Es allí,con ayuda de estos índices en donde se resaltan y se pueden analizar numéricamente las propiedades de la vegetación como tal.

![Interacción de los elementos de la superficie terrestre con la radiación](/media/780fef72100fa9ae.webp)

Interacción de los elementos de la superficie terrestre con la radiación. Fuente: Universidad de Murcia. Apuntes de teledetección. <[https://www.um.es/geograf/sigmur/teledet/tema02.pdf](https://www.um.es/geograf/sigmur/teledet/tema02.pdf)\>

El NDVI es el Índice de Vegetación Diferencial Normalizado, NDVI por sus siglas en inglés. Este índice es un parámetro calculado que se basa en los valores capturados por el instrumento satelital donde identifica patrones del espectro electromagnético que se corresponden con la reflectividad de coberturas vegetales. Este índice permite ayudar a distinguir fácilmente vegetación en imágenes satelitales.

Los patrones del espectro electromagnético para identificar la vegetación muestran que la vegetación absorbe la sección de radiación solar que corresponde al rojo. A su vez se reflejan valores elevados en el infrarrojo cercano y podremos identificar valores multiespectrales brillantes en esta banda ( [Valores Espectrales del NDVI](http://www.gisandbeers.com/calculo-del-indice-ndvi/)).

![Representación de cobertura vegetal en RED y NIR](/media/8d079411ba346f88.webp)

Representación de cobertura vegetal en RED y NIR. Fuente: Calculo de NDVI [http://www.gisandbeers.com/calculo-del-indice-ndvi/](http://www.gisandbeers.com/calculo-del-indice-ndvi/)

Así podemos diferenciar cubiertas vegetales en diferentes estados. Nuestro índice podrá ser obtenido mediante la siguiente relación:

> **NDVI = (Banda infrarroja cercana — Banda roja) / (Banda infrarroja cercana + Banda roja)**

O lo que es lo mismo, y en términos de nomenclatura cuando trabajamos las bandas multiespectrales:

> **NDVI = (NIR — RED) / (NIR + RED)**

Una vez se ha calculado el índice para cada uno de los píxeles de la imagen, los valores posibles oscilan entre -1 y 1.

![Valores de NDVI para diferentes zonas](/media/5d336c71fe38b66d.webp)

Valores de NDVI para diferentes zonas. Fuente: propia

Cuanto mayor sea el valor más frondosa será la vegetación hasta adquirir valores próximos a 1.

## Manipulando la imagen

Para comprender mejor cómo podemos usar estos valores entre bandas y niveles digitales, es importante identificar las propiedades de una imagen en general y cómo se ven estos valores a nivel de computación.

![Derecha: como un ser humano ve una imagen. Izquierda: como la procesa un ordenador (matrices)](/media/0479f2c2d5f746fe.webp)

Derecha: como un ser humano ve una imagen. Izquierda: como la procesa un ordenador. Fuente: Material Satudays.AI, Zaragoza. Edición I. 2021–2022. Tratamiento de Imágenes.

El ordenador o los métodos de computación, estructuran las imágenes en matrices con valores (i,j) estos valores (i,j) representan numéricamente el valor en términos computacionales de dicha coordenada sobre la imagen original (sin digitalizar). Cada uno de estos valores es lo que se denomina “pixel”

Para imágenes satelitales ocurre algo similar,la única diferencia radica en los valores para cada píxel, en este caso representan en niveles digitales para valores de reflectancia de radiación solar (espectro electromagnético) reflejada por el objeto terrestre sobre el cual el instrumento (el satélite) está midiendo.

![Firmas espectrales en imágenes.](/media/b7cd6295c2583879.webp)

Firmas espectrales en imágenes. Fuente: Imagen 45. Utilización en imágenes multiespectrales. [https://static.uvq.edu.ar/mdm/teledeteccion/unidad-1.html](https://static.uvq.edu.ar/mdm/teledeteccion/unidad-1.html)

## Obtención y preparación de datos

**Obtención**

Ya que se hará un análisis sobre cambios en la superficie terrestre, las imágenes satelitales que se eligieron fueron del instrumento Sentinel 2A. Para la obtención de datos usamos la librería de Python [_SentinelSat_](https://sentinelsat.readthedocs.io/en/stable/) para la descarga de imágenes en el área que nos interesa. Es de anotar que las imágenes se han tomado con los siguientes condicionantes: para un área específica detallada en un fichero .json, para la misma tesela (zona de captura de imagen del satélite) y sección de órbita para garantizar que se está tomando la misma zona de estudio para diferentes momentos de tiempo.

![Fuente: propia (Codigo completo en https://github.com/desertificacion-AI/desertificacion-AI)](/media/1cf7a49775514920.webp)

Fragmento de código para la descarga de imágenes sentinel del sitio scihub.copernicus.eu Fuente: Propia

**NOTA**: Para la obtención y captura de los datos se han descargado las imágenes de Sentinel con un porcentaje de nubes máximo de 10%.

Una vez ejecutado el script para la descarga de imágenes del satélite, se descarga una serie de ficheros zip que contienen cada uno la siguiente estructura al momento de descomprimirlos:

![Estructura de fichero descargado del sitio scihub.copernicus.eu Fuente: propia](/media/ee0277b681cf9960.webp)

Estructura de fichero descargado del sitio scihub.copernicus.eu Fuente: propia

Cada una de las imágenes Sentinel vienen dadas con un consecutivo de nombre de imagen con la siguiente estructura:

MS2\_MSILLL\_YYYYMMDD

Donde:

-   **MS2**: identifica la misión de Sentinel 2, pudiendo encontrar S2A (para Sentinel 2A) o S2B (para Sentinel 2B)
-   **MSI**: indica el instrumento de operación (MultiSpectral instrument)
-   **LLL**: indica el nivel de procesado del producto pudiendo encontrar los niveles L0, L1C, L1B o L2A
-   **YYYY**: designa el momento temporal UTC (año) en el que fue tomada la imagen
-   **MM**: designa el momento temporal UTC (mes) en el que fue tomada la imagen
-   **DD**: designa el momento temporal UTC (día) en el que fue tomada la imagen

Las descargas de Sentinel para el proyecto fueron:

![](/media/c20e2520f28f3b68.webp)

Relación de imágenes. _Fuente: Propia_

## **Preparación**

Una vez obtenidas las imágenes, sobre ellas calcularemos los índices NDVI mediante Script en Python.

![Fuente: propia (Codigo completo en https://github.com/desertificacion-AI/desertificacion-AI)](/media/503fa5a9b024f46f.webp)

Fragmento de código para el cálculo del NDVI para las imágenes descargadas

Para entender la salida de este script, las imágenes con el NDVI calculado (nuevos ficheros tif), se debe tener en cuenta que esta transformación imágenes nos da lugar a una imagen compuesta por una matriz de valores donde cada valor corresponde a un pixel (representación en la imagen) y este valor oscila entre -1 y 1. Recordando el apartado de Índice de Vegetación, a partir de 0.3 entendemos que hay vegetación para ese píxel (valor de matriz).

![](/media/f7f3c47a74c3293d.webp)

_Captura de pantalla de las imágenes NDVI generadas por el script. Fuente: Propia_

![Detalle de una de las imágenes NDVI generadas por el script de Python. Fuente: Propia](/media/ac7928748628ed96.webp)

Detalle de una de las imágenes NDVI generadas por el script de Python. Fuente: Propia

## ¿Y la predicción de valores de desertificación?

Ya estamos en el punto en donde, hemos identificado la zona sobre la que trabajaremos, hemos hallado los índices de vegetación para estas zonas en diferentes momentos de tiempo, ahora continuaremos con el establecimiento de una relación entre los valores medidos y cómo estos cambian en el tiempo (nuestra variable continua) para anticipar un conjunto de nuevos valores.

Deseamos construir un modelo que describa la relación entre las variables de estudio, con el fin, principalmente, de predecir los valores de una variable a partir de los valores de la otra. Elegiremos **Random Forest Regressor** ya que tenemos un conjunto de valores numéricos que hemos considerado como categorías (cada imagen con su matriz específica) y luego promediamos la salida de cada árbol de decisión usando este algoritmo ( Definición de Random Forest regressor. Material Saturdays AI. Zaragoza. Edición I. 2021–2022. Sesión Regresores).

![Fuente: Definición de Random Forest regressor. Material Saturdays AI. Zaragoza. Edición I. Sesión Regresores. 2021–2022](/media/9fde15946a58c9a9.webp)

Breve resumen del funcionamiento de Random Forest Regressor

Como este es un modelo de Machine Learning Supervisado, tomaremos las imágenes con el NDVI calculado, solo una zona de las misma para el aprendizaje del modelo y la zona siguiente de las imágenes para la predicción futura de índices NDVI.

## Evaluación

**Entrenamiento**

Para el entrenamiento del algoritmo, se tomaron 5 imágenes con NDVI calculado y una imagen adicional como salida conocida. De cada una de las imágenes se ha elegido un subset de igual tamaño para añadirlos a un vector en Python. Lo anterior se realiza por capacidad de procesamiento de las máquinas disponibles, las imágenes originales tienen dimensiones de 10.000×10.000 píxeles que no es posible procesar de forma ágil y eficiente con los recursos disponibles en el grupo de trabajo.

![](/media/92faf06931458dae.webp)

Imágenes con NDVI calculado. Fuente: propia.

**Nota Aclaratoria:** Cada imagen de NDVI calculado tiene un tamaño de 470MB aproximadamente, por lo que 6 de ellas nos da un estimado de 2,8GB para hacer el procesamiento de este dataset.

![](/media/06b9676a657dcdf8.webp)

Fragmento de código para la elección del subset de datos para el Random Forest de entrenamiento. Fuente: propia

Con ayuda de la librería [sklearn](https://scikit-learn.org/stable/) establecemos un set de entrenamiento para el algoritmo con el que poder “enseñarle” cómo puede intentar predecir los siguientes valores y ejecutar la siguiente fase de prueba (testing).

**Prueba**

Para probar el algoritmo, se tomaron las mismas 5imágenes con el NDVI calculado pero esta vez, el subset elegido corresponde a otra porción de la imagen. En el entrenamiento hemos elegido una sección, para la prueba (test) elegimos una sección distinta.

![](/media/0a4c7ed7bf0bbed5.webp)

Fragmento de código para la elección de los datos de test para el algoritmo. Fuente: Propia

El margen de error para la imagen predicha es el siguiente:

![Margen de error resultante de la predicción. Fuente Propia.](/media/9fd0909bf5e35c5f.webp)

Margen de error resultante de la predicción. Fuente: Propia.

Es necesario saber si el algoritmo es capaz de predecir correctamente una imagen. Utilizaremos una imagen que ya se tiene para validar la efectividad del algoritmo a la hora de predecir el resultado.

![](/media/8a95a788c386a526.webp)

Derecha: Imagen original. Izquierda: Imagen predicha. Fuente: Propia.

**Visualización en Streamlit**

En la página [desertIAragon](https://share.streamlit.io/desertificacion-ai/desertificacion-ai-streamlit/main/desertificacion_ai.py) se encuentra desplegada la aplicación de Streamlit para visualizar los cambios en NDVI calculados

![Captura de pantalla del sitio web de Streamlit para mostrar imágenes calculadas. Fuente : Propia](/media/c77dade5ed851d1f.webp)

Captura de pantalla del sitio web de Streamlit para mostrar imágenes calculadas. Fuente : Propia

En la sección **Imágenes Satelitales**, encontramos un subset de 2000×2000 píxeles de las imágenes extraídas del sitio web de Sentinel:

![Imágenes satelitales de 200x220 px. Fuente: propia](/media/c20df43b9104994f.webp)

Imágenes satelitales de 2000 x 2000 px. Fuente: propia

La sección de cuadrículas de estudio, nos permite elegir la coordenada deseada para mostrar los cambios en el NDVI calculado y sus valores. Elegir la coordenada en las opciones disponibles en el panel izquierdo:

![Elección de coordenada para la cuadrícula de estudio. Fuente: propia](/media/ba27aa2ae0912e95.webp)

Elección de coordenada para la cuadrícula de estudio. Fuente: propia

![Valor de NDVI calculado para la imagen 1. Fuente: Propia.](/media/05b91f4721cd6b26.webp)

Valor de NDVI calculado para la imagen 1. Fuente: Propia.

**Predicción**

El sistema se entrena con una porción igual de cada una de las imágenes 1 a 5. Esta porción es un recuadro de coordenadas aleatorias y dimensiones igual al ancho/alto de la cuadrícula indicado en la banda lateral (en Streamlit).

La razón de elegir un recuadro reducido es el elevado coste computacional que tiene el entrenamiento del sistema. Este coste puede estar rondando aproximadamente 5 minutos de procesamiento para un fragmento inferior a 250 píxeles de dimensión, en un ordenador con una RAM de 8GB y un procesador: Intel Core I5 2,67 Ghz.

De esta forma la aplicación puede mostrar unos resultados de una forma relativamente ágil. Para el test se ha elegido las imágenes de las cuadrículas 1 a 5 con las que se ha obtenido el índice NDVI.

La predicción se hace con la cuadrícula 6. Se compara la imagen original con la predicha por la IA.

![](/media/dc1ad4de6d3bb688.webp)

Comparación fragmento de la imagen original vs. imagen predicha por la IA

Datos generales de las imágenes:

Coordenadas de la esquina superior izquierda: i\_0_i_0​ \* j\_0_j_0​ = 0 \* 0 px Coordenadas de la esquina superior derecha: i\_n_in_​ \* j\_n_jn_​ = 5 \* 5 px

Error cuadrático promedio: 0.03719

## **Conclusiones**

-   Existe software propietario como [ERDAS](https://www.hexagongeospatial.com/products/power-portfolio/erdas-imagine) para facilitar el cálculo de NDVI y algoritmos de regresión para predecir comportamientos, sin embargo, alineados con los principios de Saturdays.AI: acercar la IA a todos los ciudadanos y aplicarla a problemas sociales, hemos optado por una solución basada en herramientas de código abierto y disponibles para todo público.
-   Este proyecto tiene la potencialidad de explorar como una fase siguiente la capacidad de procesamiento de datos para imágenes de dimensiones más grandes, ya sea en resolución espacial o temporal, de forma más eficiente en la nube. Tomando ventajas como procesamiento en paralelo o distribuido se podrán añadir más entradas al algoritmo y procesamientos más complejos que no se pueden suplir con los recursos actuales
-   La desertificación sobre las zonas evaluadas se puede predecir de forma eficiente, con un margen de error bastante reducido para la primera fase de evaluación. A nivel numérico es posible establecer dónde la vegetación se ha ido perdiendo a lo largo del tiempo y predecir sus valores futuros para tomar acciones a tiempo sobre estas zonas y evitar así, nuevas zonas de desertificación.

## Integrantes del proyecto

[Eva de Miguel Morales](https://www.linkedin.com/in/eva-de-miguel-morales-a63938a0/)

[Pedro Biel](https://www.linkedin.com/in/pedrobiel/)

[Yineth Castiblanco Rojas](http://www.linkedin.com/in/yinethcastiblancorojas)

## Presentación del proyecto: Demoday

[Ver vídeo](https://www.youtube.com/embed/PXPZFAc5-x4?start=8195&feature=oembed)

## Repositorio

Se puede encontrar el código de este proyecto en [GitHub](https://github.com/desertificacion-AI/desertificacion-AI)

Adicionalmente, el código de visualización se puede encontrar en : [GitHub Streamlit](https://github.com/desertificacion-AI/desertificacion-AI-Streamlit)

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
