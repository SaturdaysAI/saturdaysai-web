---
title: ¿Cómo se aplica la inteligencia artificial durante el embarazo? ¿Cómo
  podemos calcular la edad gestacional a partir de la IA?
description: La edad gestacional es el indicador que nos permite poder realizar
  un seguimiento más exhaustivo del embarazo. Este se calcula a partir del
  perímetro biparietal del cráneo y la circunferencia craneal en el primer
  trimestre, a…
pubDate: 2022-03-09
author: Info Saturdays
category: Community
kind: article
tags:
  - Control embarazo
  - Edad gestacional
  - IA
image: /media/93952f2f779c2e4b.webp
imageAlt: ¿Cómo se aplica la inteligencia artificial durante el embarazo? ¿Cómo
  podemos calcular la edad gestacional a partir de la IA?
legacyPath: /2022/03/09/ia-durante-el-embarazo-edad-gestacional/
sourceUrl: https://saturdays.ai/2022/03/09/ia-durante-el-embarazo-edad-gestacional/
sourceId: 6463
language: es
draft: false
---

La edad gestacional permite situar el embarazo en el tiempo y orientar el seguimiento prenatal. En el primer trimestre se utiliza habitualmente la longitud cráneo-rabadilla; más adelante se emplean medidas como el diámetro biparietal, la circunferencia craneal y la longitud del fémur. La precisión de la estimación disminuye conforme avanza el embarazo.

El estudio citado explora si el análisis automático de una ecografía cerebral fetal puede complementar las medidas biométricas habituales. Utiliza imágenes del plano axial transtalámico y compara las estimaciones con las fórmulas empleadas en la práctica clínica.

El método, conocido como quantusGA, se desarrolló con técnicas de deep learning a partir de imágenes de 1.394 pacientes. Las anotaciones de especialistas ayudaron a localizar y orientar el cerebro fetal en las imágenes.


The following image shows how quantusGA works:

![](/media/93952f2f779c2e4b.webp)

El sistema recibe una imagen de ultrasonido del cerebro fetal en formato DICOM y produce una estimación automática de la edad gestacional, expresada en días.

The original project description reports an implementation in Python. The processing locates and orients the fetal skull, crops the region of interest, and analyses brain texture and size to estimate gestational age.

La evaluación se centró en el segundo y tercer trimestre, no en el segundo y tercer mes. La combinación de IA y biometría obtuvo errores similares o menores que la biometría por sí sola, especialmente en el tercer trimestre. Estos resultados justifican continuar investigando; no implican que cualquier sistema de IA mejore cualquier diagnóstico fetal.

Gestational age informs decisions about delivery and care before and after birth. A more accurate estimate could support clinical teams, especially when an early ultrasound is unavailable. This method aims to complement the available information. Its usefulness and generalisability need evaluation in other settings before broader clinical benefits can be claimed.

Entre las posibles líneas de evaluación futura están:

-   Mejor atención a las embarazadas
-   Pacientes más tranquilas
-   Reducción de las tasas de mortalidad materno-fetal
-   Mejor control de cambios en la patología

[Consultar el estudio original](https://pubmed.ncbi.nlm.nih.gov/34403820/)

## **Bibliografía:**

Xavier P Burgos-Artizzu, David Coronado-Gutiérrez, Brenda Valenzuela-Alcaraz, Kilian Vellvé, Elisenda Eixarch, Fatima Crispi, Elisenda Bonet-Carne, Mar Bennasar, Eduard Gratacos. Analysis of maturation features in fetal brain ultrasound via artificial intelligence for the estimation of gestational age. Am J Obstet Gynecol MFM. 2021;3(6):100462. Published online 14 August 2021. DOI: 10.1016/j.ajogmf.2021.100462.

## WRITTEN BY

#### Eva Arnall

[![Saturdays.AI](/media/c3f89dabcc04aef9.webp)](https://medium.com/saturdays-ai?source=follow_footer-----32715df8e699-----------------------------------)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----32715df8e699-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education.
