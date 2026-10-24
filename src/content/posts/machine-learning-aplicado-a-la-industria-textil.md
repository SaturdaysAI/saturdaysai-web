---
title: Machine Learning aplicado a la Industria textil
description: "La Paz. 2021 El proyecto comenzó con esta pregunta: ¿Será posible
  mejorar la toma de decisiones en al Industria textil con Machine Learning?
  Después de decidir que queríamos responder a la incógnita decidimos la
  industria y…"
pubDate: 2022-01-02
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - AdaBoost
  - Agua Industria Innovación e Infraestructura
  - Regresión
  - Tabular
image: /media/e9d9bec6ce50dc7a.webp
imageAlt: Machine Learning aplicado a la Industria textil
legacyPath: /2022/01/02/machine-learning-aplicado-a-la-industria-textil/
sourceUrl: https://saturdays.ai/2022/01/02/machine-learning-aplicado-a-la-industria-textil/
sourceId: 5129
language: es
draft: false
---

[La Paz](https://saturdays.ai/la-paz/). 2021

El proyecto comenzó con esta pregunta: ¿Será posible mejorar la toma de decisiones en al Industria textil con Machine Learning? Después de decidir que queríamos responder a la incógnita decidimos la industria y como sabemos en Bolivia y encontramos a la industria textilera que hasta el 2015, tuvo una contribución de la industria textil boliviana al Producto Interno Bruto (PIB) era del 0,9%, equivalente a 451 millones de dólares,sin embargo este sector se ve severamente afectado por varios problemas tales como:

-   Mercadería Ilegal que ingresa al País
-   Ropa usada
-   Prendas chinas

Porque vimos estos problemas y creemos que Bolivia puede mejorar su competitividad escogimos al sector de la industria textil para aplicarle Machine Learning.

##   
**DESARROLLO**

Encontramos el dataset en Kaggle, este tenía las siguientes variables (están traducidas al español al lado):

_date_ – Fecha ()

smv – valor promedio por trabajo

_day_ – Dia (Lun-Dom)

wip – trabajos en cola

_quarter_ – 5 periodos / mes

over time – sobrehora

_department –_ departamento

incentive – incentivo

_teamno_ – # de equipo

idle time – tiempos ociosos

_no of workers_ – # de trabajadores

_idleman_ – # de trabajadores ociosos

_no of style change_ – # de cambios

actual productivity – productividad actual

_targeted\_productivity_ – productividad esperada

Nuestro dataset obtenido de Kaggle tenía esas características, después de ver las variables vimos que la variable SMV valor (promedio de trabajo) tenía algunos huecos,por lo que viendo su distribución decidimos rellenarla con la tendencia de la media y así ya obtuvimos todos los datos listos para trabajar.

Comenzamos con la idea de regresión pero los métodos parecían no servir o nos daban unos resultados muy bajos por lo cual tuvimos que cambiar de aproach, después se procedió a un problema de clasificación, realizamos una normalización de los datos y ya con los datos trabajados comenzamos a trabajar,acá un ejemplo de la matriz de correlación que logramos obtener una vez pasamos a la parte de clasificación de datos con datos ya normalizados.

![](/media/e9d9bec6ce50dc7a.webp)

Después se comenzó a probar modelos,el con mejores resultados predictivos fue ADAboost(insertamos imagen referencial)

![](/media/0a4f84f7b774d297.webp)

Logramos un 0.82 de accuracy lo cual fue simplemente increible despues de ver como otros métodos no llegaban ni al 0.50, decidimos probar con varios modelos adicionales como Random Forest, pero la precisión era menor (no por mucho)

![](/media/a6da6efd5fea88b5.webp)

Al final nos quedamos con Adaboost y logramos un trabajo excelente.

##   
**CONCLUSIONES**

-   Con los modelos de regresión de acuerdo al rendimiento (scores de 0.5) calculado, no se acomodan al dataset propuesto, se realizó un tratamiento al target para volver un problema de clasificación.
-   Los modelos de clasificación aplicados al dataset dieron resultados favorables en especial Adaboost con un score de 0.82
-   Los mecanismos y procesos de machine learning permitieron en el problema reutilizar el modelo como uno de clasificación.

Saturdays.AIFollow

-   [Machine Learning](https://medium.com/saturdays-ai/tagged/machine-learning)
-   [Adaboost](https://medium.com/saturdays-ai/tagged/adaboost)




WRITTEN BY

## [Jhonpoolcastro Jcs](https://medium.com/@jhonpoolcastro.jcs?source=follow_footer-----9e49f92c48c8-----------------------------------)



[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----9e49f92c48c8-----------------------------------)

##   
¡Más inteligencia artificial!

La misión de [Saturdays.ai](http://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](http://www.saturdays.ai/) ¡te esperamos! [Saturdays.AI](https://medium.com/saturdays-ai?source=post_sidebar--------------------------post_sidebar--------------)
