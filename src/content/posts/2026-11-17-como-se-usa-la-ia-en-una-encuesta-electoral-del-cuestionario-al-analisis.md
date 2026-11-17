---
title: "Cómo se usa la IA en una encuesta electoral: del cuestionario al análisis"
description: La inteligencia artificial empieza a transformar distintas fases de
  las encuestas electorales, desde el diseño del cuestionario y el análisis de
  respuestas hasta el control de calidad y la elaboración de resultados. Este
  artículo repasa aplicaciones reales, sus posibilidades y sus límites.
author: Alejandro López Soria
pubDate: 2026-11-17
updatedDate: 2026-11-17
draft: true
legacyPath: /2026/10/31/encuestas-en-2026/
category: Build with AI
kind: article
language: es
tags:
  - Inteligencia Artificial
  - Machine Learning
  - Encuestas electorales
  - Demoscopia
  - NLP
image: /media/Tecnología e innovación electoral.png
imageAlt: Representación de la inteligencia artificial aplicada al análisis de
  datos y las encuestas electorales.
---
![](</media/iaEnencuestaelectoral/Tecnología e innovación electoral.png>)



**La inteligencia artificial ya ayuda a clasificar respuestas, ajustar el trabajo con las muestras y detectar datos sospechosos. Su aportación se entiende mejor al mirar dentro de una encuesta: qué tareas resuelve, con qué herramientas y qué decisiones siguen necesitando criterio demoscópico.**

Antes de que aparezca un porcentaje de intención de voto, alguien ha decidido a quién preguntar, cómo formular las preguntas, qué respuestas aceptar y cuánto peso dar a cada participante. Después habrá que interpretar los datos. Una encuesta electoral contiene mucho más trabajo que la pregunta «¿a quién votaría usted?».

Es en esas tareas donde la IA está encontrando aplicaciones concretas. Un modelo puede leer miles de explicaciones sobre las preocupaciones de los ciudadanos; otro, identificar registros que se parecen poco a los de participantes fiables. También puede asistir al investigador que prepara el cuestionario o redacta los primeros resultados.

Pero la adopción es desigual. A octubre de 2026 conviven aplicaciones documentadas en demoscopia electoral, herramientas disponibles para la investigación mediante encuestas y pruebas que todavía deben demostrar su validez. Distinguirlas evita atribuir a todo el sector lo que solo ha ensayado un equipo, o llamar IA a métodos estadísticos que llevan décadas funcionando. El informe de AAPOR sobre integración responsable de IA, publicado en mayo de 2026, recorre precisamente ese ciclo de trabajo y sitúa la evaluación y la supervisión humana en cada fase. [[1]](https://aapor.org/wp-content/uploads/2026/05/Responsible-AI-Integration-In-Survey-Research.pdf)

![](/media/Imagen1.png)



# Preparar las preguntas y conversar con el encuestado



El primer uso es bastante cotidiano: ayudar a construir el instrumento de medida. SurveyMonkey ofrece Build with AI, que genera un borrador de encuesta a partir de una descripción. La compañía documenta tecnología GPT para esa generación y machine learning en SurveyMonkey Genius para evaluar el cuestionario. Son funcionalidades de una plataforma de encuestas; por sí solas no acreditan que una determinada estimación electoral se haya producido con ellas. [[2]](https://www.surveymonkey.com/product/features/ai/)

El ahorro potencial está en preparar una primera versión y explorar formulaciones. La responsabilidad metodológica aparece inmediatamente después. «¿Está de acuerdo con mejorar la seguridad?» y «¿Apoya esta medida concreta de seguridad?» no miden lo mismo. Un texto fluido puede introducir una premisa, mezclar dos asuntos o desequilibrar las opciones de respuesta. Revisar el lenguaje y probar su comprensión sigue formando parte del diseño.

La traducción plantea una dificultad parecida: una versión gramaticalmente correcta puede cambiar el significado político de una pregunta entre idiomas. El informe de AAPOR contempla la traducción asistida, pero mantiene la necesidad de revisión especializada. Aquí un gran modelo de lenguaje (LLM) ayuda a producir y comparar borradores; la equivalencia de la medición requiere comprobaciones adicionales. [[1]](https://aapor.org/wp-content/uploads/2026/05/Responsible-AI-Integration-In-Survey-Research.pdf)

También hay herramientas que intervienen durante la respuesta. Conversational Feedback, de Qualtrics, genera repreguntas a partir de un texto abierto para solicitar detalles o aclaraciones. Si alguien escribe «la vivienda», por ejemplo, una aclaración podría distinguir precio, disponibilidad o condiciones del alquiler. Es una capacidad comercial de investigación mediante encuestas, no evidencia de uso rutinario en sondeos electorales. [[3]](https://www.qualtrics.com/support/survey-platform/survey-module/editing-questions/conversational-feedback/)

Para una encuesta política, esa conversación añade una decisión delicada: cuánto puede variar la repregunta entre participantes sin cambiar aquello que se está midiendo. Conviene conservar tanto la pregunta generada como la respuesta y evaluar si algunos perfiles reciben estímulos diferentes.

La voz va un paso más lejos. En febrero de 2026, Gallup anunció investigación sobre entrevistadores telefónicos con IA: había realizado pruebas en cuatro continentes y siete idiomas, con más de medio millón de intentos de llamada, que no equivalen a entrevistas completadas. Estos sistemas combinan reconocimiento de voz, interpretación de respuestas y voz sintética para conducir una conversación siguiendo un cuestionario. [[4]](https://news.gallup.com/opinion/methodology/702479/gallup-launches-research-phone-interviewing.aspx)

Gallup lo presenta como investigación metodológica. Importan la comprensión de acentos, las interrupciones, la latencia y la disposición a contestar. Una entrevista puede funcionar técnicamente y, aun así, atraer a personas distintas de las que aceptarían hablar con un entrevistador humano. Esa diferencia afectaría a la muestra antes de empezar el análisis.



# Convertir miles de respuestas abiertas en datos analizables



«¿Cuál es el principal problema del país?» parece una pregunta sencilla hasta que llegan miles de respuestas distintas. Unas dicen «no llego a fin de mes»; otras, «los alquileres» o «todo está demasiado caro». Para contar temas hay que establecer categorías y asignarlas de manera consistente. Es lo que se conoce como codificación.

El procesamiento del lenguaje natural, o NLP, ofrece varias rutas. En el aprendizaje supervisado, un clasificador aprende a partir de respuestas que ya tienen una etiqueta humana. Un LLM puede recibir el listado de categorías, sus definiciones y unos ejemplos en el prompt, sin entrenar un modelo nuevo para ese estudio. Ambas opciones necesitan una referencia con la que comprobar si clasifican correctamente.

Un ejemplo electoral concreto procede del British Election Study. Jonathan Mellon y sus coautores compararon seis LLM, varios métodos supervisados y un segundo codificador humano para clasificar respuestas sobre el problema más importante del país en 50 categorías. El artículo se publicó en 2024. En la prueba con textos nuevos de una pregunta ya existente, Claude-1.3 alcanzó un 80,9 % de coincidencia con las etiquetas originales; el segundo humano, un 88,6 %; y DistilRoBERTa, entrenado con unas 576.000 respuestas, un 77,8 %. [[5]](https://orca.cardiff.ac.uk/id/eprint/177688/1/mellon-et-al-2024-do-ais-know-what-the-most-important-issue-is-using-language-models-to-code-open-text-social-survey.pdf)



![](/media/Imagen2.png)

La métrica mide acuerdo con unas etiquetas: tampoco los codificadores humanos coinciden siempre. El estudio evalúa una técnica sobre datos electorales reales; no demuestra su implantación habitual en el British Election Study.



## Cuando las categorías también están por descubrir



En ocasiones, el problema empieza antes: todavía no sabemos qué categorías utilizar. Aquí entran los embeddings, representaciones numéricas del texto que permiten trabajar con semejanzas de significado. «No puedo pagar el alquiler» y «la vivienda está imposible» pueden quedar próximas aunque compartan pocas palabras. Esa geometría es útil para explorar; no convierte automáticamente una semejanza lingüística en una categoría válida de investigación.

Una aplicación operativa reciente está en la metodología de Pew Research Center sobre comunidades online, publicada el 14 de octubre de 2026. Es una encuesta social, no electoral, pero documenta el proceso completo: 3.635 respuestas, embeddings de text-embedding-3-small, un sparse autoencoder para descubrir rasgos recurrentes y GPT-5.2 para interpretar posibles temas. Los investigadores revisaron las categorías y el mismo LLM clasificó después las respuestas en 17 grupos. [[6]](https://www.pewresearch.org/internet/2026/10/14/online-communities-methodology/)

Un sparse autoencoder aprende a reconstruir las representaciones usando pocos rasgos activos en cada caso. Se busca que esos rasgos resulten interpretables al examinar los textos que los activan. El método HypotheSAEs, de Rajiv Movva y sus coautores, combina estas representaciones con interpretaciones en lenguaje natural generadas por un LLM. Sus aplicaciones de investigación incluyen diferencias partidistas en discursos del Congreso estadounidense. No es simplemente pedirle a un chatbot que resuma un montón de textos. [[7]](https://arxiv.org/abs/2502.04382)



![](/media/Imagen3.png)

Pew contrastó la clasificación con codificación humana: tomó una muestra estratificada de 210 respuestas, complementada con respuestas aleatorias. Tras ajustes, obtuvo un micro-F1 de 0,86 y realizó revisiones humanas finales. [[6]](https://www.pewresearch.org/internet/2026/10/14/online-communities-methodology/) F1 combina precisión y exhaustividad; la variante micro agrega los casos de todas las categorías. Describe el comportamiento del clasificador en esa validación, no la exactitud de una estimación electoral.

En una aplicación política, convendría mirar también cada categoría: un buen resultado global puede ocultar fallos en un tema poco frecuente. La ganancia práctica consiste en concentrar la revisión humana donde hay más ambigüedad, manteniendo un código de clasificación explícito y reproducible.



# Sentimiento y segmentación: interpretar sin simplificar demasiado



Clasificar un tema y detectar un sentimiento resuelven problemas diferentes. «Me preocupa que gane este partido» contiene una emoción negativa, pero identificar su orientación política exige saber a qué partido se refiere, quién habla y qué está evaluando. Un contador de textos positivos y negativos no entrega por sí mismo una estimación de voto.

Las plataformas ofrecen análisis automático de sentimiento —SurveyMonkey, por ejemplo, distingue positivo, neutral y negativo—, pero esa funcionalidad no acredita que sea una pieza habitual de la estimación electoral. [[2]](https://www.surveymonkey.com/product/features/ai/) La ironía, los dobles sentidos y las posiciones ambivalentes exigen validación contextual.

Langer Research Associates aporta un contrapunto útil. En un piloto realizado en verano de 2025 con Claude Opus 4 y respuestas de la Texas Education Poll de 2024, encontró problemas de interpretación y codificación, incluidos errores de tono y dirección de la opinión. No era una encuesta de intención de voto ni una prueba de todos los modelos disponibles. Sí ilustra por qué la apariencia razonable de una etiqueta no basta para aceptarla. [[8]](https://www.langerresearch.com/wp-content/uploads/Langer-Research-White-Paper_AI-Coding.pdf)

Una vez codificados los datos, otra pregunta es qué grupos de ciudadanos comparten posiciones. El clustering agrupa casos según sus semejanzas sin necesitar una etiqueta previa: es aprendizaje no supervisado, aunque muchos de sus métodos pertenecen también a una larga tradición estadística. No todo análisis de segmentos constituye una incorporación reciente de IA.

La tipología política de Pew de 2021, un antecedente metodológico, empleó agrupamiento alrededor de medoides con ponderaciones para construir nueve grupos a partir de 27 preguntas de actitudes. Un medoide es un caso representativo del grupo; ayuda a organizar perfiles semejantes sin exigir que coincidan con los partidos. [[9]](https://www.pewresearch.org/politics/2021/11/09/political-typology-appendix-b/)

Los grupos obtenidos dependen de qué preguntas se incluyen, cómo se mide la distancia y cuántos grupos se buscan. Pueden revelar combinaciones interesantes —por ejemplo, posiciones económicas y culturales que no encajan en un único eje—, pero no prueban que existan nueve tipos naturales e inmutables de votantes. Tampoco explican por sí solos por qué alguien cambia su voto.



# Ajustar la muestra: dónde termina la estadística y entra el ML



Una muestra puede tener demasiados participantes de un perfil y pocos de otro. La ponderación asigna pesos para acercar su composición a referencias poblacionales. Técnicas como el ajuste iterativo de márgenes, conocido como raking, son estadística. Usar un ordenador para calcularlas no las transforma en IA. [[10]](https://www.pewresearch.org/methods/2018/01/26/how-different-weighting-methods-work/)

Algo parecido ocurre con MRP, la regresión multinivel y postestratificación. YouGov explica en su metodología británica de marzo de 2026 que utiliza este enfoque para estimar intención de voto: modeliza diferencias entre perfiles y las combina con la composición de la población. Su estimación de participación emplea principalmente información demográfica y sobre participación pasada. Esa descripción no autoriza a rebautizar el procedimiento como aprendizaje automático. [[11]](https://yougov.com/en-gb/articles/54278-how-yougov-conducts-voting-intention-polling)

Tampoco todos los modelos de likely voters, que intentan delimitar quién probablemente votará, son IA. La metodología política de Ipsos en Reino Unido, actualizada en junio de 2024, describe filtros basados en la certeza declarada de acudir a votar y el comportamiento habitual. Son decisiones de modelización de la participación; que produzcan un porcentaje o una puntuación no basta para llamarlas machine learning. [[12]](https://www.ipsos.com/en-uk/ipsos-political-polling-methodology)

Sí existe un uso electoral documentado de ML en SSRS. La empresa describe modelos que predicen la afiliación partidista de personas vinculadas a una dirección y utiliza esa información para estratificar muestras y ponderar resultados. Combina información de registros electorales y comerciales con datos geográficos y electorales. La predicción añade una variable auxiliar que puede ayudar a gestionar desequilibrios partidistas en quién responde. [[13]](https://ssrs.com/research-areas/political-election-polling/)

La distinción técnica importa: el ML estima una característica; el diseño muestral o el ajuste estadístico utiliza después esa estimación. SSRS no publica en esa página la arquitectura del modelo ni una mejora cuantificada atribuible exclusivamente a él. Por tanto, hay evidencia del uso, pero no una demostración pública suficiente para afirmar cuánto reduce el error electoral.

La misma cautela se aplica a los datos ausentes. En la tipología de Pew citada antes se empleó imputación múltiple con predictive mean matching mediante el paquete mice de R. Es una técnica estadística para tratar información incompleta, no un caso de IA generativa. [[9]](https://www.pewresearch.org/politics/2021/11/09/political-typology-appendix-b/) Imputar tampoco significa haber preguntado de nuevo al participante: incorpora supuestos y una incertidumbre que el análisis debe reconocer.

El límite de fondo permanece. Un modelo puede aprender relaciones entre variables disponibles, pero no garantiza corregir una diferencia relevante que no se haya observado. Si las personas que rechazan participar piensan distinto incluso dentro de los perfiles utilizados para ajustar, disponer de un algoritmo más complejo no elimina automáticamente ese sesgo.



# Separar respuestas fiables de registros sospechosos



En una encuesta online también hay que decidir qué datos merecen confianza. Qualtrics integra detección de bots mediante reCAPTCHA y proporciona una puntuación que puede emplearse para señalar registros o configurar reglas. La documentación incluye controles de duplicados y otras comprobaciones. Conviene separar esas capas: una regla de cookies o direcciones IP no es, por sí misma, IA. [[14]](https://www.qualtrics.com/support/survey-platform/survey-module/survey-checker/fraud-detection/)

Una vía específicamente basada en ML es la detección de anomalías. SSRS presentó en junio de 2026 un piloto con isolation forests: entrenó el detector usando su panel probabilístico como referencia y lo aplicó a muestras de participación voluntaria. El trabajo encontró mejoras en indicadores de calidad y menor variación entre proveedores; entrenar solo con la propia muestra voluntaria no produjo el mismo resultado. Es evidencia de un piloto metodológico, no una garantía para cualquier encuesta electoral. [[15]](https://ssrs.com/insights/leveraging-parallel-probability-samples-to-detect-poor-data-quality-in-opt-in-samples/)

Isolation forest identifica observaciones que resultan relativamente fáciles de aislar al dividir repetidamente los datos. La intuición es buscar combinaciones inusuales, no adivinar quién «parece humano» al leer una frase. Aun así, ser infrecuente no significa ser fraudulento. Eliminar automáticamente casos raros puede borrar opiniones minoritarias reales. El umbral y las variables necesitan validación.

La IA también hace más difícil el control. En un estudio publicado en PNAS en 2025, Sean J. Westwood construyó un agente capaz de superar el 99,8 % de los controles de atención evaluados. El resultado muestra que responder correctamente a esas pruebas ya no basta para acreditar participación humana; no mide qué porcentaje de las encuestas actuales está contaminado. [[16]](https://www.pnas.org/doi/pdf/10.1073/pnas.2518075122)

La consecuencia práctica es combinar señales: procedencia del participante, verificación del reclutamiento, duplicados, comportamiento durante la sesión y coherencia de las respuestas. Un texto bien escrito puede ser artificial y una respuesta torpe puede ser humana. Del mismo modo, una alerta automática debe interpretarse como evidencia para revisar, no como una sentencia.



# Del análisis al informe, sin perder la trazabilidad



La automatización también llega a la mesa del analista. Analyze with AI, de SurveyMonkey, permite explorar resultados mediante preguntas en lenguaje natural y generar resúmenes y gráficos. [[2]](https://www.surveymonkey.com/product/features/ai/) Puede ayudar a localizar un patrón que después se compruebe en las tablas o a preparar un primer relato de resultados. En una encuesta electoral, la revisión debe conservar la base de cada porcentaje, las ponderaciones y el periodo de trabajo de campo.

La trazabilidad resulta especialmente importante cuando intervienen modelos generativos: registrar versión, instrucciones, categorías y modificaciones permite investigar un cambio inesperado. También hay que controlar qué información personal se comparte con proveedores externos. AAPOR sitúa transparencia, privacidad y evaluación entre las condiciones para integrar estas herramientas responsablemente. [[1]](https://aapor.org/wp-content/uploads/2026/05/Responsible-AI-Integration-In-Survey-Research.pdf)

Una forma útil de comprobar un resultado es volver a la cadena completa: qué pregunta recibió la persona, qué respondió, cómo se codificó y qué transformación produjo la cifra publicada. Si el sistema solo entrega una conclusión convincente, pero no permite reconstruir esos pasos, la velocidad del informe aporta poco a su credibilidad.



# La frontera experimental: generar a los propios encuestados



Existe, además, una línea que cambia la naturaleza del dato: pedir a un LLM que responda como si fuera una persona con un perfil determinado. Estos encuestados sintéticos prometen rapidez y costes reducidos, pero sus respuestas son predicciones del modelo.

Pew publicó en septiembre de 2026 un experimento con «gemelos digitales» de participantes reales de su American Trends Panel. En tres olas replicadas con Claude Opus 4.6, el error absoluto medio de las distribuciones de respuestas fue de 12,4 puntos porcentuales. La cifra compara encuestas humanas y sintéticas sobre diferentes asuntos; no es un error de predicción del voto. El centro concluyó que estos modelos no constituían un sustituto adecuado de las encuestas de opinión pública evaluadas. [[17]](https://www.pewresearch.org/data-labs/2026/09/30/can-ai-stand-in-for-human-survey-takers-not-really/)

La separación con los usos anteriores es fundamental. Codificar una respuesta conserva una observación de una persona, aunque pueda interpretarla mal. Generar esa respuesta reemplaza la observación por una inferencia. No son intercambiables sus requisitos de validación.



# Una encuesta mejor necesita algo más que un modelo mejor



La aportación más concreta de la IA está en hacer manejable el trabajo que rodea a la medición: convertir texto en categorías, explorar perfiles, aportar predicciones auxiliares o priorizar controles de calidad. Hay herramientas disponibles y aplicaciones documentadas; otras, como ciertas entrevistas automatizadas, siguen contrastándose con métodos establecidos.

El criterio para incorporarlas debería ser qué tarea mejoran y cómo se ha comprobado. Una etiqueta necesita validación; una ponderación, supuestos defendibles; un detector, conocer sus falsos positivos. Ninguno resuelve por separado los problemas de cobertura, participación o formulación de preguntas.

La IA está cambiando cómo se prepara y analiza una encuesta. Su valor aparece cuando deja más tiempo para entender a las personas y permite examinar mejor lo que han dicho. La necesidad de medirlas correctamente sigue siendo el centro del trabajo.



# Fuentes

Fuentes consultadas hasta el 16 de noviembre de 2026. Las páginas de producto sin fecha describen funcionalidades disponibles en el momento de la consulta.

[1] [AAPOR (mayo de 2026). Responsible AI Integration in Survey Research.](https://aapor.org/wp-content/uploads/2026/05/Responsible-AI-Integration-In-Survey-Research.pdf)

[2] [SurveyMonkey. Funcionalidades de IA y documentación de Build with AI.](https://www.surveymonkey.com/product/features/ai/) [Detalle técnico de Build with AI.](https://www.surveymonkey.com/curiosity/build-with-ai/)

[3] [Qualtrics. Documentación de Conversational Feedback.](https://www.qualtrics.com/support/survey-platform/survey-module/editing-questions/conversational-feedback/)

[4] [Jenny Marlar y Mitchell Leon · Gallup (26 de febrero de 2026). Gallup Launches Research on AI Phone Interviewing.](https://news.gallup.com/opinion/methodology/702479/gallup-launches-research-phone-interviewing.aspx)

[5] [Jonathan Mellon et al. (2024). Do AIs know what the most important issue is? Research & Politics, 11(1).](https://orca.cardiff.ac.uk/id/eprint/177688/1/mellon-et-al-2024-do-ais-know-what-the-most-important-issue-is-using-language-models-to-code-open-text-social-survey.pdf)

[6] [Pew Research Center (14 de octubre de 2026). Online communities: metodología y clasificación de respuestas abiertas.](https://www.pewresearch.org/internet/2026/10/14/online-communities-methodology/)

[7] [Rajiv Movva, Kenny Peng, Nikhil Garg, Jon Kleinberg y Emma Pierson (2025). Sparse Autoencoders for Hypothesis Generation. ICML 2025.](https://arxiv.org/abs/2502.04382)

[8] [Langer Research Associates. A Pilot Test of AI Coding of Open-Ended Survey Responses. Piloto realizado en verano de 2025.](https://www.langerresearch.com/wp-content/uploads/Langer-Research-White-Paper_AI-Coding.pdf)

[9] [Pew Research Center (9 de noviembre de 2021). Political typology: Appendix B, clustering e imputación.](https://www.pewresearch.org/politics/2021/11/09/political-typology-appendix-b/)

[10] [Andrew Mercer, Arnold Lau y Courtney Kennedy · Pew (26 de enero de 2018). How different weighting methods work.](https://www.pewresearch.org/methods/2018/01/26/how-different-weighting-methods-work/)

[11] [Anthony Wells · YouGov (10 de marzo de 2026). How YouGov conducts voting intention polling.](https://yougov.com/en-gb/articles/54278-how-yougov-conducts-voting-intention-polling)

[12] [Gideon Skinner · Ipsos (actualización: junio de 2024). Ipsos political polling methodology.](https://www.ipsos.com/en-uk/ipsos-political-polling-methodology)

[13] [SSRS. Political & Election Polling: muestreo, predicción de afiliación partidista y ajustes.](https://ssrs.com/research-areas/political-election-polling/)

[14] [Qualtrics. Documentación de Fraud Detection.](https://www.qualtrics.com/support/survey-platform/survey-module/survey-checker/fraud-detection/)

[15] [Mickey Jackson · SSRS (20 de junio de 2026). Leveraging Parallel Probability Samples to Detect Poor Data Quality in Opt-in Samples.](https://ssrs.com/insights/leveraging-parallel-probability-samples-to-detect-poor-data-quality-in-opt-in-samples/)

[16] [Sean J. Westwood (20 de noviembre de 2025). The potential existential threat of large language models to online survey research. PNAS, 122(47).](https://www.pnas.org/doi/pdf/10.1073/pnas.2518075122)

[17] [Athena Chapekis et al. · Pew Research Center (30 de septiembre de 2026). Can AI Stand In for Human Survey-Takers? Not Really.](https://www.pewresearch.org/data-labs/2026/09/30/can-ai-stand-in-for-human-survey-takers-not-really/)