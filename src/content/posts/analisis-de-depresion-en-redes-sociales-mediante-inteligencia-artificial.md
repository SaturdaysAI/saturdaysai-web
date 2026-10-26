---
title: "Análisis de Depresión en Redes Sociales: Una aplicación en Bioestadística"
description: "ANÁLISIS DE DEPRESIÓN EN REDES SOCIALES: UNA APLICACIÓN EN BIOESTADÍSTICA"
pubDate: 2022-03-16
author: Info Saturdays
category: AI for good
kind: project
tags:
  - depresion
  - K-Means
  - Machine Learning
  - Regresión
  - Salud y Bienestar
  - Tabular
image: /media/0574ec369d983414.webp
imageAlt: "Análisis de Depresión en Redes Sociales: Una aplicación en Bioestadística"
legacyPath: /2022/03/16/analisis-de-depresion-en-redes-sociales-mediante-inteligencia-artificial/
sourceUrl: https://saturdays.ai/2022/03/16/analisis-de-depresion-en-redes-sociales-mediante-inteligencia-artificial/
sourceId: 6554
language: es
draft: false
---

![](/media/0574ec369d983414.webp)

[Donostia](https://donostia.saturdays.ai/). Primera Edición. 2020

## **Introducción**

¿Te has preguntado alguna vez si tanto usar las redes sociales podría afectar a tu estado de ánimo? Hay quien relaciona un mal uso de las redes sociales a problemas psicológicos como la depresión, pero ¿qué hay de cierto en esta idea? ¿Existe evidencia científica que nos alerte sobre peligros reales de las redes sociales, o se trata de temores infundados?

Durante la primera edición del programa Saturdays AI en Euskadi, el grupo **Facemood** nos embarcamos en el reto de analizar si podemos predecir una serie de síntomas relacionados con la depresión en base al uso que hacemos de las redes sociales. Para ello, usamos un abanico de herramientas estadísticas y de _Machine Learning_ que nos ayudaron a entender la relación entre estas variables.

La **depresión** constituye un problema importante de salud pública, ya que es un gran factor de riesgo para el suicidio, que reclama cientos de miles de vidas cada año.

Conocer mejor los factores asociados a la depresión puede contribuir a diseñar políticas públicas y apoyar los esfuerzos para salvar vidas.

## ¿Quiénes somos?

Como si se tratara de un partido de fútbol sala, os presentamos nuestro quinteto inicial:

-   ¡Hola, internauta! Soy Sergio Navarro y trabajo en ingeniería de software. Soy desarrollador full stack en una pequeña startup de Álava y paso mi tiempo entre líneas de código, bases de datos y preguntas de Stack Overflow que puedan ayudarme a resolver ese bug que no me deja dormir.

Como punto de partida, nos basamos en el trabajo realizado por un grupo de investigadores neerlandeses y estadounidenses titulado: _‘Social Media and Depression Symptoms: A Network Perspective’_ ([DOI:10.1037/xge0000528](http://dx.doi.org/10.1037/xge0000528); accesible también [en abierto](https://openaccess.leidenuniv.nl/bitstream/handle/1887/73951/Aalbers_et_al_2018_T.pdf?sequence=1)). En este estudio, los investigadores analizaron si el uso pasivo de las redes sociales (es decir, hacer _scrolling_ en el _feed_ de noticias o fotografías de nuestros amigos y contactos) provoca síntomas depresivos, o viceversa.

Para la obtención de los datos, cada uno de los participantes en el estudio recibía en su teléfono móvil un cuestionario en el que debía responder de 0 a 100 como se sentía en referencia a cada uno de los posibles síntomas de depresión: falta de energía (_Fatigue_), estado de ánimo bajo (_LowMood_), soledad (_Loneliness_), problemas de concentración (_Concentration_), pérdida de interés (_Loss of Interest_), sentimiento de inferioridad (_Inferiority_), desesperanza (_Hopeless_), y estrés (_Stress_). También tuvieron que responder de 0 a 100 a tres preguntas relacionadas con el uso de las Redes Sociales: uso pasivo (_PSMU_), activo (_ASMU_), y consulta de noticias (_News:_ acceder a información de carácter político o de interés público). Los participantes rellenaron este cuestionario siete veces al día durante 14 días.

A continuación, una breve descripción de las **11 variables del estudio**:

![](/media/8b6a702b36256743.webp)

Para llevar a cabo este proyecto, hemos planificado una estrategia de análisis según el esquema de abajo, en el que hemos utilizado distintas metodologías y herramientas:

**1.** **EDA (Exploratory Data Analysis)**

**2\. Cluster Analysis**

**3\. ANOVA de Medidas Repetidas**

**4\. Análisis de Regresión**

![](/media/6c332b60dada5819.webp)

Figura 1. Estrategia de Análisis.

## 1\. EDA (Exploratory Data Analysis)

Al tratarse de un conjunto de datos proveniente de una publicación científica y haber pasado por un análisis previo durante dicha investigación, podríamos decir que cuenta con una mayor validez en comparación a un _dataset_ que obtengamos a través de una plataforma _open source_ como _Kaggle_. No obstante, esto no significa que no debamos llevar a cabo un análisis de los datos por nuestra parte, con el fin de encontrar patrones y preparar los datos para las tareas de _Machine Learning_.

La primera fase consistió en identificar aquellas mediciones que consideramos válidas. Lógicamente muchos de los participantes olvidaron llevar a cabo algunas de las mismas (realizar 7 mediciones al día durante 14 días no es tarea fácil [?](https://apps.timwhitlock.info/emoji/tables/unicode#emoji-modal)), o no supieron responder a algunos de los síntomas (cuantificar tu estado de ánimo de 0 a 100 tampoco lo es…). Todas estas mediciones fueron eliminadas.

En una segunda fase, nos fijamos en si las mediciones restantes eran coherentes: no poseen el mismo valor en todos los síntomas, no son respuestas recurrentes, fueron realizadas en el plazo de tiempo definido, etc.

De esta forma, ¡ya estamos listos para pasar a la acción!

## 2\. Cluster Analysis

La siguiente fase consistió en llevar a cabo un **_Cluster Analysis_**, una de las técnicas de _Machine Learning_ para identificar grupos en el _dataset_. Utilizamos los métodos **_Elbow_** y **_Silhouette_** para obtener el **número de _clusters_ óptimo** y el algoritmo **_K-means_**, técnica de _unsupervised learning_ para hacer _clustering_.

**Identificación del número óptimo de _clusters_**

**Método _Elbow_**: en este se calcula la distorsión promedio de los _clusters_, es decir, la distancia promedio del centroide a todos los puntos del _cluster_. Esta se obtiene con el algoritmo de _K-means_ en función del número de _clusters_. Para resolver este ejercicio, hemos creado la función **_plot\_elbow_**, que recibe un conjunto de datos y un título de gráfico. Fijamos los valores de los parámetros **_max\_k_** en 10. Lo que hace la función es probar con cada valor del 1 al 9 y graficar el resultado.

![](/media/66ecc1a30fe7c8a9.webp)

**Figura 2.** Gráfica que representa el método Elbow.

El gráfico nos muestra que, a partir del valor 3, la dispersión se empieza a reducir drásticamente. Por lo tanto, podemos tomar el 3 como valor óptimo.

Método Silhouette: para cada observación, a es la distancia media a las demás observaciones de su propio grupo; b es la menor distancia media a las observaciones de otro grupo. El coeficiente se calcula como (b − a) / max(a, b) y toma valores entre −1 y 1.

![](/media/c5042cbd4f5a720a.webp)

![](/media/04f0d4856835acc4.webp)

**Figura 3.** Gráfica que representa el método Silhouette.

Con este método comprobamos que el 3 puede ser un buen valor para probar nuestro _cluster analysis_.

**Implementación del algoritmo _k-means_ y visualización de los grupos en un gráfico 3D**

El algoritmo recibe un conjunto de datos para entrenarlo y un número de _clusters_ para dividirlo. Mediante el método _predict_ se obtiene la clase del objeto entrenado en el _dataset_, y finalmente se representa cada dato con un color distinto en función del _cluster_ al que ha sido asignado. Podemos apreciar el resultado en la **Figura 4** y la distribución de participantes en la **Figura 5**.

![](/media/1309407563012162.webp)

**Figura 4.** Visualización de los grupos en un gráfico 3D.

![](/media/1ff16a7db85a324b.webp)

**Figura 5.** Distribución de los participantes por _cluster_.

Finalmente, para concluir con el _Cluster Analysis,_ hemos elaborado una serie de gráficos (histogramas solapados), para identificar de un vistazo las diferencias en cada variable entre los miembros de cada _cluster_.

![](/media/55eaacc7ca79f000.webp)

**Figura 6.** Variables de RR.SS. por _cluster_.

![](/media/69a9053a4fd7b5bc.webp)

**Figura 7.** Variables relacionadas a la depresión, por _cluster_.

![](/media/4c4ff348fde41d31.webp)

**Figura 8.** Variables relacionadas a la depresión, por _cluster_.

Se observa que los 3 _clusters_ son diferentes en lo que concierne a los síntomas relacionados con la depresión, siendo el **_Cluster 1_** el que contiene las **mayores puntuaciones medias** en relación a los 8 síntomas del estudio, por lo que se podría afirmar que es el grupo con mayor propensión a presentar un posible cuadro de depresión.

Sin embargo, como podemos observar en la **Figura 6** (_Variables de RR.SS. por Cluster_), en el caso de las variables relacionadas con RR.SS. no encontramos grandes diferencias entre _clusters_.

![](/media/683a1d553ead2209.webp)

**Figura 9.** Tabla de medias por _cluster_.

## 3\. ANOVA de Medidas Repetidas

Hay dos aspectos de este _dataset_ que nos llamaron especialmente la atención. Por un lado, el hecho de haber tomado mediciones durante dos semanas nos ofrece la posibilidad de explorar si dichas mediciones varían con el tiempo. Mediante un gráfico de líneas o _lineplot_ podemos hacernos una idea de cómo ha variado, de media, cada uno de los síntomas relacionados con la depresión que se han medido.

![](/media/9ec19d79666acdf3.webp)

**Figura 10.** Medias de cada variable agrupadas por día de la semana.

Aunque parece haber cierta variación a lo largo del tiempo en alguna de las variables, no podemos estar seguros a simple vista de si cabría esperar que los datos varíen así por puro azar o porque no hemos usado un instrumento de medida muy bueno.

Por otro lado, sabemos que se realizaron un gran número de mediciones a cada participante. Como explicamos arriba, se hizo un seguimiento de sintomatología relacionada con la depresión durante 14 días a 125 sujetos. Además, cada día se pidió a los participantes que rellenaran la escala cada 2h desde las 10:00 a las 22:00. Por tanto, con siete mediciones diarias durante dos semanas en 125 sujetos, tenemos un total de 12.250 observaciones en el _dataset_.

¡Pero cuidado! Estas observaciones no son independientes entre sí. No podemos utilizar un modelo estadístico que tome cada una de esas observaciones como si proviniera de distintas personas, porque la variabilidad que obtenemos al medir repetidamente a un mismo individuo será distinta a la variabilidad obtenida al medir a distintos individuos (al menos si la medición es mínimamente fiable).

Existe un modelo estadístico que sí nos permite analizar la influencia del tiempo en nuestros datos, pero respetando el hecho de que no todas las observaciones son independientes, sino que tenemos grupos de 98 observaciones a lo largo del tiempo para 125 sujetos. Este modelo se llama **Análisis de la Varianza (o ANOVA) de Medidas Repetidas**.

Como el tamaño de nuestra muestra no es excesivamente grande (125 participantes) y contamos con 8 variables de síntomas relacionados con la depresión, decidimos no incorporar al modelo estadístico todas las variables y estimar un modelo simplificado para la variable ‘estado de ánimo bajo’ (_LowMood_). Por tanto, se trataría de un ANOVA de medidas repetidas con dos factores: (i) _tiempo_, donde se incluyen las puntuaciones medias de cada día en esta variable; y (ii) _cluster_, donde se recoge la pertenencia de cada sujeto a los _clusters_ calculados anteriormente. La hipótesis nula de este modelo establece que todas las medias del _LowMood_ son iguales a lo largo de los 14 días de encuestas.

![](/media/56411d14003a22dc.webp)

**Figura 11.** Promedio de cada variable del cuestionario por día y _cluster_.

Como podemos ver en la **Figura 11** (variable _LowMood_), la variabilidad de los datos a lo largo del tiempo es mínima y, de hecho, aunque el resultado del test estadístico es estadísticamente significativo (_F_(13,26) = 2.261, _p_ = 0.018), el tamaño de efecto es prácticamente despreciable (_η2_ = 0.02).

Por tanto, el modelo estadístico de ANOVA de Medidas Repetidas nos ha informado que, a pesar de tener un _dataset_ relativamente rico en detalles en la dimensión temporal, los síntomas relacionados con la depresión asociados al uso de redes sociales no parecen variar demasiado a lo largo del tiempo.

## 4\. Análisis de Regresión

El primer paso que dimos para ajustar las regresiones lineales fue calcular las medias de todas las mediciones por **participante** y **variable**. Esto nos permitió “eliminar” el aspecto temporal de las “medidas repetidas” del estudio.

A continuación, construimos **gráficas de dispersión** entre todas las variables del estudio, y calculamos los **coeficientes de correlación lineal de Pearson** (_r2_) para todas las combinaciones de variables, con el objetivo de identificar los diversos tipos de correlación y alguna posible “multicolinealidad” entre variables (_r2_ > 90%).

Observamos que algunas variables estaban **muy correlacionadas linealmente**, como se puede observar en la gráfica de abajo:

![](/media/0113da3138e03ecc.webp)

**Figura 12.** Diagrama de matriz de las gráficas de dispersión de las 11 variables del estudio.

Para ajustar un modelo inicial, tuvimos que definir una variable “respuesta” o “_Y_”. Elegimos “**_LowMood_**”, por tratarse en principio de una de las variables más importantes del estudio.

En el mapa de calor de correlaciones lineales de Pearson, se observa multicolinealidad entre “**_Loneliness_** y **_Hopeless_**”, y “**_Inferior_** y **_Hopeless_**”, por lo que decidimos no utilizar en un primer momento “**_Hopeless_**”.

![](/media/06c248e3b1584c8a.webp)

**Figura 13.** Mapa de calor de los coeficientes de correlación de Pearson  
de las 11 variables del estudio.

Para el ajuste del **Modelo de Regresión**, utilizamos el método “**_backward_**”: a partir del modelo saturado con todas las variables independientes disponibles, el método iba eliminando, una a una, dichas variables cuyo **_p-value_** > **_alpha_**, siendo _alpha_ \= probabilidad del “_error tipo 1_”.

Para ello, creamos una función recurrente llamada “**_calculateRegression_**”, que utiliza un 80% de los datos para los ajustes, y reserva un 20% de los datos para los testeos.

Además, la función calcula el “_RootMeanSquareError_” (_RMSE_) y el “Coeficiente de Determinación” (_R2_) para todos los ajustes.

![](/media/a8e68a9c97f6001d.webp)

Figura 14. Resultado del procedimiento de eliminación hacia atrás (backward) de variables con poca capacidad explicativa.

El **Modelo Final** ajustado involucra 3 variables, siendo “**_News_**” una de ellas.

**_LowMood_ = -0,85 + 0,78 _Loneliness_ + 0,18 _Stress_ + 0,04 _News_**

Es importante resaltar que el coeficiente de determinación (_R2_) del modelo ajustado es “alto” (93,1%).

Para validar definitivamente el modelo, realizamos un “**Análisis de Residuos**”, también recogido en una función llamada “**_residualAnalysis_**”. Esta función realiza el “test de normalidad” (_Kolmogorov-Smirnov_) de los residuos estandarizados e imprime 3 gráficas: Gráfica de Dispersión entre “Predicción” y “Residuos Estandarizados”, Histograma de los Residuos Estandarizados, y “Normal Q-Q Plot” de los Residuos Estandarizados.

Como el Análisis de Residuos también fue considerado satisfactorio, se valida el modelo estadísticamente.

![](/media/96e672997d8e5897.webp)

**Figura 15.** _Output_ de la función “**_residualAnalysis_**”.

Es importante observar que el peso de “**_News_**” (0,04) es muy inferior a los pesos de “**_Loneliness_**” (0,78) y “**_Stress_**” (0,18), y que, si hubiésemos definido un “_alpha_” más exigente, “**_News_**” no se mantendría en el modelo final.

Por otro lado, dada la complejidad para diagnosticar una persona con depresión, construimos un “**índice de depresión**”, para ser utilizado como variable respuesta de un segundo modelo. La idea era comparar los 2 modelos, de cara a corroborar las conclusiones anteriores.

El índice de depresión, a partir de ahora “**_DeprRate_**”, fue calculado como el promedio simple entre “**_LowMood_**”, “**_LostOfInt_**” y “**_Hopeless_**”, ya que estas variables podrían contener indicios importantes de una posible depresión, según la literatura.

Seguimos los mismos pasos expuestos anteriormente. El modelo final contiene ahora **5 variables** y no involucra ninguna variable relacionada al uso de Redes Sociales.

**_DeprRate_ = -0,025 + 0,31 _Loneliness_ + 0,25 _Inferior_ + 0,19 _Concentrat_ + 0,15 _Stress_ + 0,06 _Fatigue_**

El coeficiente de determinación (R2) del modelo ajustado siguió siendo alto (90,8%), y como el Análisis de Residuos también fue considerado satisfactorio, se valida el modelo bajo un punto de vista estadístico.

Es interesante constatar que “**_Loneliness_**” de nuevo aparece como la variable de mayor peso para “**_DeprRate_**”, y que “**_Stress_**” sigue en este segundo modelo, con un peso parecido.

Nota: las dos funciones anteriores están definidas en `regresion_functions.py`. Este archivo también incluye otras funciones utilizadas en el análisis, como:

-   **_printMatrixDiagram_**: función que genera gráficas de dispersión (2 a 2), involucrando todos los indicadores del estudio. Útil para ver de forma gráfica, en un único vistazo, los indicadores que están más correlacionados entre ellos.
-   **_printPearsonCorrelations_**: genera un mapa de calor de las correlaciones de Pearson entre todos los indicadores del estudio. Útil para ver, en un único vistazo, los indicadores que están más correlacionados entre ellos y si hay multicolinealidad.
-   **_eliminateOutliers_**: elimina los residuos estandarizados considerados “altos” (menores que -3 y mayores que +3), de cara a realizar posteriormente nuevos ajustes sin estos datos que muchas veces distorsionan los resultados. La función imprime los datos eliminados, posibilitando un control de lo que se está eliminando.
-   **_repeatRegression_**: vuelve a ajustar el modelo de regresión lineal final ajustado en “calculateRegression”, ahora para los datos libres de “_outliers_”. Además, vuelve a calcular el “_RootMeanSquareError_” (RMSE) y el “Coeficiente de Determinación” (R2).

## Conclusiones Finales

Con relación al **_Cluster Analysis_**, se observa que los 3 _clusters_ formados son diferentes en lo que concierne a los “síntomas de depresión”, siendo el **_Cluster 1_** el que contiene las mayores medias en relación a los 8 síntomas del estudio. Sin embargo, lo mismo no pasa con las variables de Redes Sociales, ya que los histogramas solapados por _cluster_ no muestran grandes diferencias para las variables **PSMU**, **News** y **ASMU**.

Por otro lado, el **ANOVA de Medidas Repetidas** sugiere que no hay diferencias significativas a lo largo de los 14 días de encuestas realizadas para cada individuo.

Los **Modelos de Regresión** ajustados indican que el uso de las Redes Sociales tiene un peso mucho menor que las demás variables utilizadas en el estudio para explicar un posible cuadro de depresión.

La **Soledad**, el sentimiento de **Inferioridad**, la pérdida de **Concentración** y el **Estrés** tienen un **peso notablemente mayor** para este conjunto de datos.

Esta constatación coincide con los resultados del **_Cluster Analysis_** presentados anteriormente.

Todas las conclusiones presentadas aquí son referentes única y exclusivamente al conjunto de datos utilizado en este proyecto. Para hacer inferencias más concluyentes, habría que ampliar el estudio utilizando un muestreo mayor, entre otras cosas.

## Pasos Futuros

El estudio que hemos realizado nos muestra que el perfil de uso de las redes sociales no parece ser un buen predictor de síntomas relacionados con la depresión. Sin embargo, los sentimientos de soledad e inferioridad, los problemas de concentración, el estrés y la fatiga sí resultan predictoras de un posible riesgo de sufrir depresión.

Lo que hemos aprendido con este modelo predictivo nos permitiría un siguiente paso: construir una herramienta de procesamiento natural del lenguaje que detecte usuarios en riesgo de sufrir depresión en base a la identificación de contenido emocional relacionado con las variables detectadas en nuestro estudio.

## Agradecimientos

Agradecemos a los mentores y organizadores de [**Saturdays.AI**](https://www.saturdays.ai/) **Donostia**, especialmente a [**Beñat Galdós**](https://www.linkedin.com/in/benatgaldos/) y [**Joxemari Gallastegi**](https://www.linkedin.com/in/jgallastegi/), por su profesionalidad, dedicación y entusiasmo.

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/bGbQXjvTYGI?start=2519&feature=oembed)

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esta aplicación: [https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2020/AISaturdays-depresion-rrss](https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2020/AISaturdays-depresion-rrss)

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
