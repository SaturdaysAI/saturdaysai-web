---
title: PREDICCIÓN DE FALLAS FUTURAS EN MOTORES DE TURBOVENTILADORES POR MEDIO DE LSTM
description: "Integrantes: Alanoca Huaycho, Alvaro
  (https://www.linkedin.com/in/alvaro-alanoca-huaycho-b582b6139/) Martínez
  Alegría, Albert (https://www.linkedin.com/in/albert-martinez-alegria/ )
  INTRODUCCIÓN Uno de los mayores problemas a…"
pubDate: 2022-08-10
author: Info Saturdays
category: AI for good
kind: project
tags: []
image: /media/8e983a53d33cc9a8.webp
imageAlt: PREDICCIÓN DE FALLAS FUTURAS EN MOTORES DE TURBOVENTILADORES POR MEDIO DE LSTM
legacyPath: /2022/08/10/prediccion-de-fallas-futuras-en-motores-de-turboventiladores-por-medio-de-lstm/
sourceUrl: https://saturdays.ai/2022/08/10/prediccion-de-fallas-futuras-en-motores-de-turboventiladores-por-medio-de-lstm/
sourceId: 7774
language: es
draft: false
---

Integrantes:

-   **Alanoca Huaycho, Alvaro** ([https://www.linkedin.com/in/alvaro-alanoca-huaycho-b582b6139/](https://www.linkedin.com/in/alvaro-alanoca-huaycho-b582b6139/))
-   **Martínez Alegría, Albert** ([https://www.linkedin.com/in/albert-martinez-alegria/](https://www.linkedin.com/in/albert-martinez-alegria/) )

## **INTRODUCCIÓN**

Uno de los mayores problemas a nivel industrial es el mantenimiento correctivo, debido a sus elevados costes tanto de reparación, como de producción. Por otra parte el mantenimiento preventivo está planificado por medio de una agenda para realizar un paro programado, donde no interesa si el equipo aún puede trabajar o si sus piezas siguen bien; se realiza el mantenimiento porque así fue programado.

Es por ello que, con el pasar de los años la tecnología permite que podamos invertir en nuevas soluciones que nos permita saber cuándo fallará un equipo, esto es llamado **_mantenimiento predictivo (PdM)_**. Que actualmente, por medio de diferentes sensores podemos tener un dataset completo de muchas variables, como ser: vibración, temperatura, análisis de aceites o grasas, etc.

![](/media/8e983a53d33cc9a8.webp)

Fig. 1. Diferencia de ganancia por producción entre el mantenimiento preventivo tradicional y el mantenimiento predictivo, donde solamente se detiene la producción basado en condiciones.

## **DESCRIPCIÓN DEL PROBLEMA**

El problema es el tiempo y los recursos económicos invertidos para poder solventar una falla de mantenimiento correctivo en el menor tiempo posible. A la vez que un mantenimiento preventivo podría optimizarse al hacerlo en base a condiciones de los equipos. Ambos ocupan tiempo en su mantenimiento y también en la producción del producto.

## **DATASET**

Los datasets utilizados, son de la degradación de motores de turbo-ventiladores de la NASA generados por C-MAPSS, lo cual es aplicable a cualquier otra máquina rotativa, como ser: motores de transportes industriales, bombas hidraulicas, etc.

![](/media/dcf790071fe69eea.webp)

Fig. 2. Imagen del turboventilador simulado por C-MAPSS.

![](/media/5159d982953a7a7c.webp)

Tabla 1. Detalle de las columnas de los datasets de prueba y entrenamiento.

## **SOLUCIÓN PROPUESTA**

Por tal motivo el proyecto ayudará a estimar el tiempo en el cual unos turboventiladores llegarán a fallar. Dando el tiempo suficiente para poder programar una parada de mantenimiento y buscar los repuestos necesarios al mejor precio.

## **SELECCIÓN DEL MODELO**

**RNN**

Son un tipo de red neuronal recurrente (RNN) y estas tienen conexiones recurrentes entre estados ocultos, con un retraso de tiempo. Idealmente, las RNN son capaces de descubrir correlaciones temporales entre los eventos secuenciales que están muy lejos unos de otros

![](/media/2a4a6e5a369a652d.webp)

Fig. 3. Arquitectura de una Red neuronal recurrente (RNN)

![](/media/9c45e290d76d2cda.webp)

Fig. 4. Arquitectura de una Long Short-Term Memory (LSTM)

**LSTM**

Sin embargo, en la práctica, es difícil entrenar RNN debido al Vanishing Gradient y los problemas de Exploding Gradient. Por lo que las RNN se enfrentan a dificultades para manejar dependencias en secuencias de largo plazo. Por lo que, el modelo basado en RNN más efectivo se llama LSTM. De manera resumida, su estructura consiste en celdas de memoria. La cual su principal función es la de almacenar un valor y determinar el tiempo que debe almacenarse. Además, estas celdas seleccionan qué entradas se almacenan y también deciden si estas serán recordadas, eliminadas o si serán enviadas como salida de una red.

![](/media/fb12183d61154096.webp)

Fig. 5. Programación de la RNN con LSTM

La red tiene dos capas de LSTM, la primera de 100 unidades y la segunda de 50 unidades. A la salida de cada una se tiene un DropOut para evitar el overfitting, y finalmente se tiene la Dense, que es activada por una sigmoid, que nos da la probabilidad final.

**PCA**

El análisis de componentes principales (PCA) es uno de los algoritmos de machine learning no supervisados más utilizados. Para la reducción de dimensiones y el pre procesamiento de datos.

![](/media/3009b081df1dc1ae.webp)

Fig. 6. PCA aplicado a tres dimensiones para poder graficarlo.

![](/media/7763b0ee8cc26c20.webp)

Fig. 7. Datos del dataset completo, con los 21 sensores, y las 3 configuraciones de los usuarios.

![](/media/aac4cc6bcc1880c8.webp)

Fig. 7. Datos del dataset con PCA aplicado. Se reducen a 8 componentes principales.

## **MÉTRICAS**

A continuación se observarán las métricas analizadas. Donde podemos observar que el accuracy es del 95.11%, y que las F1-Score son muy buenas, la que menor valor tiene es la macro. Además que comparando los datos predecidos con los de prueba, tenemos un accuracy del 97%.

![](/media/797dcba570da54ee.webp)

Fig. 8. Métricas calculadas: Accuracy Score, F1-Score Macro, F1-Score Micro, F1-Score Weighted.

## **ANÁLISIS DE RESULTADOS**

Los resultados que analizamos son la matriz de confusión, que nos muestra que su accuracy es del 92.77%, y por otra parte la ROC Curve, donde podemos observar un buen umbral de discriminación del modelo.

![](/media/e9de410cd578c49b.webp)

Fig. 9. Matriz de Confusión

![](/media/dac0d154f47f5a88.webp)

Fig. 10. ROC CURVE

## **RESULTADO**

Por ende, podemos predecir la probabilidad con la que llegaría a fallar el motor del turbo ventilador en 30 días. Escogiendo el ID de la máquina, tendríamos el siguiente resultado; donde podemos ver que la probabilidad en la que el **Motor 16 falle, es del 1.8%,** por lo que podemos seguir usando este motor de manera tranquila.

Lo ideal es que este análisis se lo haga de manera periódica, al ser implementado. Debido a que da un buen sondeo del estado de las máquinas a los supervisores de mantenimiento para ir planificando lo más crítico en la siguiente parada.

![](/media/5fe49a27a2521523.webp)

Fig. 11. Pantalla final, donde el programa nos dice la probabilidad que tiene el motor seleccionado de fallar dentro de 30 días.

## **CONCLUSIÓN**

Por medio de esta aplicación podemos determinar el tiempo de falla de una máquina rotativa, gracias al análisis de datos de dicho equipo. Por ende, se tiene el tiempo suficiente para comprar repuestos y planificar un mantenimiento programado, mitigando los costes de mantenimiento de la empresa.

La precisión del modelo implementado es del 95%, por lo que llega a ser fiable a la hora de analizar las máquinas. Este programa puede ser implementado en multiples plantas industriales, y por medio de Internet Of Things, podemos ir recabando información de todos los sensores necesarios, los cuales serán registrados en la nube para su posterior análisis.

Implementando este tipo de tecnología también llega a repercutir en el area medio ambiental, ya que se cambiarían menos repuestos industrial o maximizar el uso de aceites o grasas de acuerdo a su degradación; se traduce en menos basura industrial para el medio ambiente.

## **CÓDIGO**

[https://github.com/albmarale/SaturdaysAIMachineLearning/blob/main/detecci-n-de-fallas-futuras-en-motores-de-turboven.ipynb](https://github.com/albmarale/SaturdaysAIMachineLearning/blob/main/detecci-n-de-fallas-futuras-en-motores-de-turboven.ipynb)

## **BIBLIOGRAFÍA**

\[1\] D. Bruneo and F. De Vita, “On the use of LSTM networks for predictive maintenance in smart industries,” in Proceedings — 2019 IEEE International Conference on Smart Computing, SMARTCOMP 2019, 2019, pp. 241–248, doi: 10.1109/SMARTCOMP.2019.00059.

\[2\] S. Guldamlasioglu, O. Aydin, and D. Scientist, “Using LSTM networks to predict engine condition on large scale data processing framework,” 2017, doi: 10.1109/ICEEE2.2017.7935834.

\[3\] L. Swanson, “Linking maintenance strategies to performance,” Int. J. Prod. Econ., vol. 70, no. 3, pp. 237–244, Apr. 2001, doi: 10.1016/S0925–5273(00)00067–0

\[4\] A. Martínez, “Redes Neuronales Recurrentes con LSTM aplicado al Mantenimiento Predictivo, Caso: Degradación de motores de turboventiladores”, 2020, Universidad Católica Boliviana “San Pablo”.

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!
