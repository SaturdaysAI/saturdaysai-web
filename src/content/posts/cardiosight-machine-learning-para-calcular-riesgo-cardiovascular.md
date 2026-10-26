---
title: "CARDIOSIGHT: Calculadora de Riesgo Cardiovascular mediante Inteligencia Artificial"
description: Guadalajara. Segunda Edición 2020 ¿Sabias que las enfermedades cardiovasculares (ECV) son la principal causa de muerte en todo el mundo? En México, el 19% de mujeres y hombres de 30 a 69 años mueren de enfermedades…
pubDate: 2022-03-16
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Machine Learning
  - Random Forest
  - Salud y Bienestar
  - Tabular
image: /media/2b3869a3a86abffb.webp
imageAlt: "CARDIOSIGHT: Calculadora de Riesgo Cardiovascular mediante Inteligencia Artificial"
legacyPath: /2022/03/16/cardiosight-machine-learning-para-calcular-riesgo-cardiovascular/
sourceUrl: https://saturdays.ai/2022/03/16/cardiosight-machine-learning-para-calcular-riesgo-cardiovascular/
sourceId: 6568
language: es
draft: false
updatedDate: 2026-10-25
---
Nota editorial: este artículo documenta un proyecto educativo y sus resultados en los datos utilizados. No acredita validación clínica ni autorización para diagnosticar o tratar a pacientes. Las propuestas de aplicación sanitaria se conservan como objetivos del equipo, no como capacidades demostradas.

![](/media/2b3869a3a86abffb.webp)

[Guadalajara](https://saturdays.ai/guadalajara/). Segunda Edición 2020

_¿Sabias que las enfermedades cardiovasculares (ECV) son la principal causa de muerte en todo el mundo?_

En México, el 19% de mujeres y hombres de 30 a 69 años mueren de enfermedades cardiovasculares, y se estima que el 70.3% de la población adulta vive con al menos un factor de riesgo cardiovascular.

Las enfermedades cardiovasculares son un grupo de desórdenes que afectan al corazón y/o los vasos sanguíneos , las cuales representan un problema de salud pública en México .

Estudios epidemiológicos han permitido identificar un conjunto de variables denominadas factores de riesgo de tipo cardiovascular (FRCV), que son todas aquellas características biológicas no modificables y características conductuales modificables (estilos de vida), cuya presencia se relaciona con una mayor probabilidad de sufrir una enfermedad cardiovascular en el futuro. **Su identificación temprana es fundamental para implementar cambios en los hábitos de los pacientes con el objetivo de prevenir un evento de enfermedad cardiovascular primario**.

En los últimos años México ha implementado varias estrategias enfocadas en el sector salud que prometen buenos resultados. A pesar de esto, se han encontrado inconsistencias en los procesos de atención primaria, práctica clínica e instrumentos de vigilancia que limitan la monitorización cardiovascular de la población.

## ¿Qué es CARDIOSIGHT?

El proyecto de _CARDIOSIGHT_ nace debido a la presente necesidad en nuestro país de crear métodos y herramientas de identificación temprana para los individuos con alto riesgo de sufrir enfermedades cardiovasculares. Con el fin de prevenir eventos cardíacos primarios y ayudar a disminuir la incidencia de nuevos casos, por medio de hábitos de prevención. Este método de detección será diseñado con ayuda de la **inteligencia artificial**.

Ventajas de la aplicación:

● La población tendrá la facilidad de conocer su nivel de riesgo sin la necesidad de asistir a una unidad médica de salud. Acelerando de esta manera la identificación de los individuos con un riesgo alto antes de que se desarrolle un evento cardiovascular primario.

● Posterior a la identificación, dependiendo del resultado, se le sugerirá al usuario visitar las páginas disponibles del Instituto Mexicano del seguro social que brindan la información sobre las campañas preventivas actuales relacionadas a este tipo de enfermedades, en las cuales encontrarán la información necesaria para educarse sobre la problemática, además de la posibilidad de encontrar su clínica más cercana para realizar su primer chequeo médico.

## ¡Experimentando con los datos!

Se decidió trabajar con el [dataset _Cardiovascular Disease_](https://www.kaggle.com/sulianova/cardiovascular-disease-dataset) encontrado en la página Kaggle. El cual consiste en 70,000 datos recabados de pacientes, contiene 11 características y una variable objetivo, información recabada por medio de resultados médicos, compartida por el paciente o de forma factual.

![](/media/192a99fbb51924f9.webp)

Figura 1. Relación entre BMI (Indice de masa corporal) y la presencia o no de ECV.

Tras realizar el análisis exploratorio y transformación de nuestros datos se decidió experimentar con el modelo de _Random Forest_ debido a su excelente capacidad de clasificación.

![](/media/bb2290c8eb8f07c4.webp)

Figura 2. Modelo Random Forest

Tras realizar varias pruebas y tuneo de hiperparámetros se encontró el modelo ideal para nuestra aplicación.

Con un accuracy de 0.73 y una curva ROC de 0.8, se decidió obtener gráficas complementarias del modelo para entender de una forma más profunda su comportamiento probabilístico.

![](/media/0293a750880af3f2.webp)

Figura 3. Curva ROC Y AUC

Uno de los retos más grandes en el desarrollo de este proyecto fue encontrar un punto de corte para decidir si una persona tenia una alto o bajo riesgo de sufrir de una enfermedad cardiovascular. Es aquí donde la confianza probabilística entra en juego, y también poner en la balanza cuál situación es mejor: Decirle a los pacientes que tendrán una enfermedad cardiovascular cuando no la tienen, o decirles que no, cuando sí la tienen. En mi caso preferí que mi modelo identificara al mayor numero de personas de sufrir de una enfermedad cardiovascular, con la premisa de que los falsos positivos pueden ser detectados al realizar pruebas clínicas complementarias.

![](/media/2c83876ec17ca473.webp)

Figura 4. Relación entre probabilidad y punto de corte

Como apoyo para la selección de este punto de corte nos basamos en el modulo de Youden, gráficas de calibración y los valores de predicción obtenidos.

![](/media/304b1e9537081bc7.webp)

Figura 5. Curva de calibración obtenida

Debido a que se deseaba que la población pudiera hacer uso de este recurso, se decidió implementar una aplicación web usando la plataforma [streamlit](https://www.streamlit.io/). En la cual el usuario podría consultar su indicador de riesgo por medio del llenado de sus FRC. En caso de que su resultado fuera “Alto” se le redireccionaría a la pagina oficial del IMSS.

## Resultados

Se logró obtener un algoritmo capaz de indicar si un individuo tiene alto riesgo de sufrir una enfermedad cardiovascular o no, con resultados comparables a los mencionados en la bibliografía consultada.

Tras un análisis del poder predictivo de los datos se encontró que tener un grado de hipertensión y ser mayor de 50 años, puede influir a que seas un individuo con alto riesgo. El colesterol y el índice de masa corporal también son características a considerar, ya que, si sus niveles son más altos de lo normal, también pueden influir a un riesgo mayor. Una identificación temprana de estas variables de riesgo es fundamental para poder prevenir un episodio de enfermedad cardiovascular primario.

## ¿Esto es todo?

No, este proyecto sirve como precedente para saber si la metodología utilizada es útil y qué tipo de recursos son necesarios para realizar una investigación más elaborada enfocada a la población mexicana.

Cómo siguientes pasos, es indispensable trabajar con un dataset enfocado en la población mexicana, con él se podría hacer un análisis más profundo respecto a cómo las variables de alimentación, sociales, económicas y educacionales afectan a las predicciones. Además de que se podría crear un algoritmo de cálculo de factor de riesgo, enfocado a esta población.

Se desea trabajar más con el algoritmo creado, para mejorar su desempeño de clasificación aplicando _feature selection_ y otros algoritmos de _machine learning._

_Todavía queda mucho por hacer, pero definitivamente esta experimentación le da dirección a los próximos esfuerzos, te invito a que me sigas, para que puedas seguir leyendo sobre este proyecto._

## Integrantes

Rebeca Sarai Nuñez Ramirez

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/sfwudXSivVk?start=3930&feature=oembed)

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esta aplicación: [https://github.com/SaturdaysAI/Projects/tree/master/Guadalajara/July2020/Cardiosight](https://github.com/SaturdaysAI/Projects/tree/master/Guadalajara/July2020/Cardiosight)

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
