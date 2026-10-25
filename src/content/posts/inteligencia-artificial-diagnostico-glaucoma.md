---
title: "IA y glaucoma: un proyecto de apoyo al análisis de imágenes"
description: "Un proyecto de análisis de imágenes oculares con redes neuronales: cómo se preparan los datos y qué límites tiene su uso como apoyo clínico."
pubDate: 2022-05-02
author: Info Saturdays
category: Community
kind: article
tags:
  - Glaucoma
  - Inteligencia Artificial
  - Red Neuronal
image: /media/bc4e4fecf9d1a014.webp
imageAlt: Uso de inteligencia artificial de soporte de diagnóstico presuntivo del glaucoma humano
legacyPath: /2022/05/02/inteligencia-artificial-diagnostico-glaucoma/
sourceUrl: https://saturdays.ai/2022/05/02/inteligencia-artificial-diagnostico-glaucoma/
sourceId: 7294
language: es
draft: false
updatedDate: 2026-10-25
---

El glaucoma puede dañar el nervio óptico y causar pérdida de visión. La cifra global de discapacidad visual citada por la OMS no se refiere solo al glaucoma: al menos 2.200 millones de personas tienen dificultades de visión de cerca o de lejos y, en al menos 1.000 millones de casos, la discapacidad podría haberse evitado o aún no se ha atendido.

[OMS: discapacidad visual](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment)

Corrección editorial, 25 de octubre de 2026: se corrigen las unidades de la cifra original y su atribución al glaucoma. El proyecto conserva su contexto de publicación de 2022.

Este artículo describe una propuesta de investigación que utiliza imágenes oculares y redes neuronales para explorar el apoyo al análisis clínico. Los resultados de un conjunto de datos no bastan para establecer un diagnóstico ni para demostrar que una herramienta funciona en otros centros o poblaciones.

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

La propuesta muestra cómo preparar imágenes y entrenar un clasificador. Para valorar su utilidad clínica harían falta una evaluación independiente, datos representativos y la revisión de profesionales sanitarios. El rendimiento depende de la calidad de los datos, del diseño del modelo y de cómo se separan los conjuntos de entrenamiento y prueba; una precisión alta por sí sola no demuestra seguridad clínica.

Si quieres formar parte de la búsqueda de soluciones óptimas, no dudes en comenzar o continuar tu formación en Inteligencia Artificial con nosotros. Consulta los cursos de Saturdays.AI y elige el que más te guste en nuestra [web](https://saturdays.ai/).

## Bibliografía

1.-Buri Abad, Edison Arturo. _Procesamiento de imágenes digitales del fondo de ojo con el uso de inteligencia artificial para brindar una herramienta de soporte de diagnóstico presuntivo del glaucoma humano._ Feb-2022.

2.-Mayo Clinic. Glaucoma. Consultar en: [https://www.mayoclinic.org/es-es/diseases-conditions/glaucoma/symptoms-causes/syc-20372839#:~:text=El%20glaucoma%20es%20un%20grupo,personas%20mayores%20de%2060%20a%C3%B1os.](<https://www.mayoclinic.org/es-es/diseases-conditions/glaucoma/symptoms-causes/syc-20372839#:~:text=El%20glaucoma%20es%20un%20grupo,personas%20mayores%20de%2060%20a%C3%B1os.>)

## **Written by**

Eva Arnall

![Saturdays.AI](/media/20f74d067937cef9.webp)

## [Saturdays.AI](https://medium.com/saturdays-ai?source=follow_footer-----32715df8e699-----------------------------------)

Saturdays.AI is an impact-focused organization on a mission to empower diverse individuals to learn Artificial Intelligence in a collaborative and project-based way, beyond the conventional path of traditional education
