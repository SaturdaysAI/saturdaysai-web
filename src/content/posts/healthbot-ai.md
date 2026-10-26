---
title: Detección de enfermedades cardiovasculares con HEALTHBOT.AI
description: Debido a la pandemia que actualmente estamos viviendo a nivel mundial, una de las problemáticas más inmediatas que se ha observado, es la falta de personal médico en hospitales en general y para atender a personas que sufran…
pubDate: 2021-12-13
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Aritficial Intelligence
  - Health
image: /media/e25f98140f04a20c.webp
imageAlt: Detección de enfermedades cardiovasculares con HEALTHBOT.AI
legacyPath: /2021/12/13/healthbot-ai/
sourceUrl: https://saturdays.ai/2021/12/13/healthbot-ai/
sourceId: 4884
language: es
draft: false
updatedDate: 2026-10-25
---
Nota editorial: este artículo documenta un proyecto educativo y sus resultados en los datos utilizados. No acredita validación clínica ni autorización para diagnosticar o tratar a pacientes. Las propuestas de aplicación sanitaria se conservan como objetivos del equipo, no como capacidades demostradas.

Debido a la pandemia que actualmente estamos viviendo a nivel mundial, una de las problemáticas más inmediatas que se ha observado, es la falta de personal médico en hospitales en general y para atender a personas que sufran alguna otra enfermedad diferente al COVID-19. De acuerdo con esta información, el objetivo de este trabajo es realizar un chatbot que permita una fácil identificación temprana de enfermedades que han sido foco de defunciones a nivel mundial, así como poder ayudar con el seguimiento en los pacientes, de una manera mucho más accesible. Para primer prototipo y con la información que se tiene, se empezará a trabajar con la detección de enfermedades cardiovasculares. Como trabajos futuros, se pretende utilizar el sistema desarrollado, en alguna institución de salud pública, para detectar otras enfermedades que han sido las principales causas de muerte en México.

![](/media/e25f98140f04a20c.webp)

## **Contexto y problemática**


De acuerdo con la información proporcionada por la OMS(Organización Mundial de la Salud), 7 de las 10 principales causas de muerte han sido por enfermedades no transmisibles. De las cuales se necesita prestar una mayor atención en las enfermedades cardiovasculares, el cáncer, la diabetes y las neumopatías crónicas, y de reducir los traumatismos.  
Las enfermedades cardiovasculares han sido una de las principales causas de muerte en el mundo. Con las cifras obtenidas en el año 2012, hubo 17,5 millones defunciones registradas a nivel mundial. Más del 80% de las defunciones, afectan principalmente a los países bajos y medios, de igual manera en hombres como en mujeres. En México, el 77% de las muertes en adultos, se debe a enfermedades cardiovasculares, por lo cual está implicado los factores de riesgos como que el 17% de la población es fumadora, el 22.8% sufre de hipertensión y 1 de cada 3 adultos, son obesos. De los cuales, la obesidad ha sido uno de los principales factores de riesgo. Esto debido al gran consumo de azúcar, y la falta de educación sobre estos temas en el país.

## **Propuesta de Solución**


Como propuesta para la prevención temprana de enfermedades, surge el proyecto HealthBot, el cual consiste en crear una interfaz (chatbot) con la cual el usuario interactúe inicialmente de manera textual para conocer su nivel de riesgo de padecer enfermedades cardiovasculares. Basado en este riesgo el chatbot emitirá una serie de recomendaciones para que el usuario tome las medidas de prevención o tratamiento adecuadas. Además, al recabar información sobre los factores de riesgo proporcionados por el usuario, la interfaz generará reportes clínicos que el usuario puede presentar a su médico durante la cita o ser enviado directamente desde la interfaz al personal de salud si esta está integrada a un sistema de una entidad de Salud como el IMSS.

## **Desarollo del proyecto**


En el desarrollo del Chatbot se usarán modelos de Natural Language Processing (NLP) que permitan generar un diálogo enfocado a la población objetivo. A través del diálogo, el chatbot recopilará la información relevante para generar el diagnóstico. Una de las ventajas de este proyecto, es que la identificación de los factores de riesgo así como el modelo de diagnóstico se tomará del trabajo del equipo naranja de la generación anterior de Saturdays.AI., denominado CardioSight. Esto permite a nuestro equipo enfocarnos en el desarrollo de la interfaz basada en NLP y a la vez, promocionar y extender la funcionalidad de un trabajo previamente generado a traves de Saturdays.AI

## **Modelo de predicción de riesgo de enfermedades cardiovasculares**


Para este proyecto tomaremos como referencia el modelo ya generado por el equipo naranja, de la generación anterior de Saturdays.AI. Este modelo toma encuenta 11 variables de entradas: edad, género, presión arterial sistólica, presión arterial diastólica, colesterol, glucosa, realiza actividad física, altura(cmts), peso(kgs) e índice de masa corporal. A continuación, se muestra la imagen de acuerdo con la correlación entre variables finales, después del análisis exploratorio de datos que previamente ha realizado el equipo naranja.


_Figura 1. Resultado de la correlación de las variables antes mencionadas_

![Cardiovasculares](/media/764b249199271c22.webp)

## **Descripción Técnica del Proyecto**

![Cardiovasculares](/media/ec16bce428251ec1.webp)

## **Créditos**


La realización de este trabajo fue posible con el apoyo en todo momento, de nuestros mentores: Grisell Reyes Rios y Mario Fonseca. Los cuales siempre estuvieron guiando nuestro proceso para el término del proyecto.

## ¡Más inteligencia artificial!

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.
