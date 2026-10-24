---
title: Uso de inteligencia artificial de soporte de diagnóstico presuntivo del
  glaucoma humano
description: El glaucoma es una enfermedad que afecta al nervio óptico. Si este
  no se trata de manera precoz puede provocar ceguera. Según afirma la OMS, cada
  año, el glaucoma es la causa que millones de personas pierdan la vista. En el…
pubDate: 2022-05-02
author: Info Saturdays
category: Community
kind: article
tags:
  - Glaucoma
  - Inteligencia Artificial
  - Red Neuronal
image: /media/bc4e4fecf9d1a014.webp
imageAlt: Uso de inteligencia artificial de soporte de diagnóstico presuntivo
  del glaucoma humano
legacyPath: /2022/05/02/inteligencia-artificial-diagnostico-glaucoma/
sourceUrl: https://saturdays.ai/2022/05/02/inteligencia-artificial-diagnostico-glaucoma/
sourceId: 7294
language: es
draft: false
---

El glaucoma es una enfermedad que afecta al nervio óptico. Si este no se trata de manera precoz puede provocar ceguera. Según afirma la OMS, cada año, el glaucoma es la causa que millones de personas pierdan la vista. En el mundo, 2,2 billones de personas padecen discapacidad visual y de estas, **un total de 1 billones hubieran podido controlar esta enfermedad a partir de un diagnóstico previo.**  

El uso de la **inteligencia artificial** en este campo, nos podría **ayudar** enormemente a **diagnosticar a los pacientes de manera preventiva**. Para su uso, a través de imágenes de fondo de ojo tomadas a partir de bases de datos públicos, todas ellas catalogadas por especialistas en el campo de la medicina y tomadas por un tomógrafo de coherencia óptica.

![](/media/0ffb16309957e6a7.webp)

## **¿Cómo se llevaría a cabo el procesamiento de imágenes y software?**

Una vez adquirimos las distintas imágenes de fondo de ojo, estas serán destinadas para el entrenamiento del desarrollo de la **red neuronal**. La totalidad de éstas, teniendo en cuenta que previamente han sido debidamente analizadas por especialistas y obtenidas de varios centros médicos, se clasifican en:  

**\-Sospecha de enfermedad de glaucoma  
\-Paciente sano  
\-Suma total de todas estas**

(Descartando previamente por otro lado todas aquellas que habían salido defectuosas)

## Jupyter Notebook

En el caso del estudio llevado a cabo en la Universidad Politécnica Salesiana, se utilizó _Python_ con el interpretador de _Jupyter Notebook_ que al ser una extensión de _Python_ no necesitaba de otras descargas de programas adicionales en el PC y tampoco de ningún tipo de licencia. Por tanto, una vez conseguido este procedimiento, las imágenes proporcionadas por parte de diversos centros de medicina que conformaron la base de datos fueron separadas en distintas carpetas siendo estas mismas separadas de nuevo en otras dos: una con la clasificación de los **pacientes sanos** y otros con **sospecha de glaucoma**.  

Las imágenes, extraídas a partir de un tomógrafo de coherencia óptica, fueron debidamente recortadas hasta conseguir aislar el disco óptico ya que esta es la región de interés para el diagnóstico. Para ello se creó un algoritmo con dos objetivos muy marcados: primeramente, que la imagen fuera **normalizada a dimensiones parecidas a las de un cuadrado** y segundo, que estas también tuvieran **centradas la ubicación de región de interés.**

![](/media/2a7779c6ec64f482.webp)

_Algoritmo utilizado para recortar las imágenes_.

Posteriormente, a fin de poder procesar estas imágenes correctamente se trató que todas fueran del mismo tamaño para agilizar el proceso. Seguidamente, fueron clasificadas en dos carpetas distintas (sospecha y sano) para entrenar correctamente a la red convolucional y reservando por otra parte las que serían usadas para la prueba de la matriz de confusión.

## Búsqueda de soluciones óptimas

En conclusión, esta propuesta de detección de glaucoma es una de las múltiples que podemos encontrar a día de hoy para el diagnóstico de ésta enfermedad. Desgraciadamente, no tiene una solución óptima, pero sabemos que si la diagnosticamos en una etapa temprana podemos tratarla para paliar algunos de los síntomas. Por otra parte también sabemos que la red neuronal depende de la base de datos que dispongamos. Por tanto, la precisión de los resultados conseguidos dependerá del tamaño del batch, dimensiones de las imágenes, cantidad de capas convulsionales… entre otros siendo necesario el entrenamiento de nuestro modelo.

Si quieres formar parte de la búsqueda de soluciones óptimas, no dudes en comenzar o continuar tu formación en Inteligencia Artificial con nosotros. Consulta los cursos de Saturdays.AI y elige el que más te guste en nuestra [web](https://saturdays.ai/).

## Bibliografía

1.-Buri Abad, Edison Arturo. _Procesamiento de imágenes digitales del fondo de ojo con el uso de inteligencia artificial para brindar una herramienta de soporte de diagnóstico presuntivo del glaucoma humano._ Feb-2022.

2.-Mayo Clinic. Glaucoma. Consultar en: [https://www.mayoclinic.org/es-es/diseases-conditions/glaucoma/symptoms-causes/syc 20372839#:~:text=El%20glaucoma%20es%20un%20grupo,personas%20mayores%20de%2060%20a%C3%B1os.](<https://www.mayoclinic.org/es-es/diseases-conditions/glaucoma/symptoms-causes/syc 20372839#:~:text=El%20glaucoma%20es%20un%20grupo,personas%20mayores%20de%2060%20a%C3%B1os.>)

## **Written by**

Eva Arnall

![Saturdays.AI](/media/20f74d067937cef9.webp)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----32715df8e699-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education
