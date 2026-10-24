---
title: "Student Experience: cómo mejorar la experiencia de aprendizaje en la
  universidad"
description: Donostia. 2021 ¿Cómo calificarías la experiencia de aprendizaje que
  viviste/estás viviendo en la universidad? ¿Sabrías decir qué es lo que hace
  que estás más satisfecho/a con un profesor? Cuando hablamos de experiencias,
  es…
pubDate: 2021-07-29
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Decission Trees
  - Educación de Calidad
  - Tabular
image: /media/dafc92f14b166407.webp
imageAlt: "Student Experience: cómo mejorar la experiencia de aprendizaje en la
  universidad"
legacyPath: /2021/07/29/como-mejorar-la-experiencia-de-aprendizaje-en-la-universidad-con-inteligencia-artificial/
sourceUrl: https://saturdays.ai/2021/07/29/como-mejorar-la-experiencia-de-aprendizaje-en-la-universidad-con-inteligencia-artificial/
sourceId: 35
language: es
draft: false
---

![aprendiendo inteligencia artificial](/media/dafc92f14b166407.webp)

aprendiendo inteligencia artificial

[Donostia](https://saturdays.ai/bilbao/). 2021

¿Cómo calificarías la experiencia de aprendizaje que viviste/estás viviendo en la universidad? ¿Sabrías decir qué es lo que hace que estás más satisfecho/a con un profesor?

Cuando hablamos de experiencias, es complicado poner nombres y apellidos a nuestras sensaciones. Además, estas sensaciones de una persona pueden ser muy diferentes a las de otra, y no es fácil encontrar patrones comunes. Sin embargo, todos/as somos capaces de recordar con cariño a algún/a profesor/a de nuestra etapa preuniversitaria, una persona que nos transmitió algo diferente al resto.

¿No sería ideal tener claro qué es lo que hace que ese profesor/a nos haya generado una experiencia positiva? ¿No sería útil que ese/a profesor/a (y el equipo de coordinación) tuviera esto en cuenta como un factor crítico para medir su desempeño?

Y, seamos claros. Además de la experiencia, valoramos mucho el resultado final del proceso. La motivación extrínseca de la evaluación final es un factor muy relevante, por lo que, ¿no sería importante conocer qué es lo que hace que un/a profesor/a mejore los resultados académicos de un grupo? De esta forma, no solo tener un grupo contento, sino un grupo que ofrece su mayor potencial. Y, estando la universidad tan cerca del mercado laboral, esto es si cabe más importante que en otras etapas formativas.

## Por qué nos hemos metido en esto

Cuando empezamos a pensar sobre estas preguntas, creíamos que ya estarían respondidas la mayoría de ellas. Pero, al parecer la medición de la experiencia universitaria no es un tema de debate nacional. Y los ranking están casi más dedicados a lo bien clasificados que están los MBAs que a la satisfacción del alumnado.

Así que desde [Saturdays.AI Bilbao](https://bilbao.saturdays.ai/) un equipo formado por dos estudiantes universitarios ([Gorka Legarreta Ibarra](https://www.linkedin.com/in/gorka-legarreta-999003208/) y [Rubén García Pedrejón](https://es.linkedin.com/in/rub%C3%A9n-garc%C3%ADa-pedrej%C3%B3n-846235194)) y un servidor, profesor universitario, ([Iñaki Fernández López-Zuazo](https://www.linkedin.com/in/inakifernandezlz/)) nos pusimos manos a la obra. Los 3, por motivos obvios, tenemos interés en hacer que la experiencia y los resultados académicos sean los mejores posibles. Y, desde una visión muy personal como profesor, si algo me irrita es que todo el mundo crea que tenga la razón sobre cuál es la mejor forma de enseñar/educar. Así que, citando a Deming “para no ser una persona más con una opinión” vamos a trabajar para llegar a conclusiones basadas en datos.

Ninguno de los 3 teníamos experiencia en programación, pero a fuerza de practicar, practicar, y practicar (y un poquito de controlC+controlV, todo hay que decirlo) hemos llegado a alguna conclusión interesante.

Si eres estudiante, ¿preparado/a para saber qué es lo que tienes pedir a tu universidad para tener la mejor experiencia y notas posibles?

Si eres profesor/a universitario/a ¿preparado/a para conocer los elementos en los que más tienes que enfocarte para mejorar tu desempeño profesional?

# El dataset

Sin datos no hay paraíso, y ha sido complicado hacerse con una buena base de datos, que contuviera información suficiente para llegar a conclusiones de interés. Una universidad ha cedido amablemente un dataset, anonimizando cualquier atributo de caracterización, e introduciendo multiplicadores a algunos atributos para evitar su identificación. Estos cambios no han afectado en ningún caso al resultado del proyecto, pues ambos dataset (el original y el modificado) arrojan las mismas conclusiones. Por último, aunque en este análisis se han utilizado los comentarios aportados por los alumnos/as en el dataset, se han borrado posteriormente, pues contenían información que hacía fácil identificar a profesores/as y situaciones concretas.

Este dataset contiene información sobre más de 20.000 encuestas de satisfacción realizadas al alumnado desde febrero 2015 a diciembre 2020. Se ha completado la información de la encuesta con datos identificativos del profesor/a que impartía la asignatura y de la nota media del grupo.

Entrando al detalle, la información que más se trabajará a lo largo del dataset es:

**Respuestas a las preguntas concretas de satisfacción**: Se evalúa el conocimiento del/a profesor/a, su manera de explicar, la metodología que utiliza en el aula y el feed-back que da. Por último, se le da una nota general.

**Nota media:** Se ha realizado una media de todo el grupo que responde a la encuesta. Es decir, un registro no contiene la nota que ha sacado el alumno/a en la evaluación, sino la nota media de todo el grupo al que pertenece

**Datos identificativos del profesor/a** **y su asignatura:** Sexo, edad, campus donde trabaja habitualmente, tipo de asignatura que imparte…

# EDA: Cuánta razón tenían…

En las primeras sesiones de [Saturdays.AI](http://www.saturdays.ai) siempre se menciona la importancia de la limpieza de datos, y que es una tarea que lleva más del 80% del tiempo de casi cualquier proyecto. Sinceramente, parecía una exageración, pero quizás hemos llegado al 90% 🙂

Para no liarnos demasiado en este punto, estas han sido las mayores transformaciones:

-   Eliminación de registros con NaN: Al tener una BBDD tan grande, creíamos que no merecía la pena inferir resultados, y nos quedamos solo con aquellos registros que tenían toda la información.
-   Foco en un grado en particular: Teníamos información de varios grados, pero la información del resto de ellos era parcial, y además no disponíamos de sus notas, claves para el proyecto. Por lo que decidimos centrarnos en un solo grado.
-   Homogeneización y eliminación de atributos: En un año en concreto, se cambió el modelo de aprendizaje hacia la co-docencia, y por cada aula hay 3 profesores/as. Por tanto, el/la estudiante ponía nota a los/as tres, y eso trabajo algunos problemas para la homogeneización del dataset. Todos solucionados con mucho esfuerzo y tesón 🙂
-   Categorización de atributos: Para mejorar posteriores análisis se categorizaron las respuestas a las preguntas de satisfacción (con el Net Promoter Score) y las notas. En la satisfacción categorizamos en detractores (0 a 6) pasivos/neutros (7 y 8) y promotores (9 y 10). En las notas: suspensos (0 a 4,9) aprobados (de 5 a 7,9) y sobresalientes (8 a 10).

# Explorando los datos: reafirmando intuiciones

Con el dataset preparadito para trabajar en él, empezamos con un Heatmap para conocer la correlación entre todas las variables:

![](/media/774ba2849dcd9b8c.webp)

Si nos fijamos en las variables relacionadas con la satisfacción, podemos comprobar que la metodología es lo que más correlaciona con la nota general del profesor/a (aunque explicar y feed\_back están muy cerca) y el conocimiento del/a profesor/a, lo que menos. Vamos, que empezamos a reafirmar algo que ya imaginábamos: por mucho que sepa una persona, como no cuenta con la metodología adecuada, puede no llegar a satisfacer lo suficiente al alumnado. Pero ojo, conocer también se correlaciona con explicar, por tanto, para poder explicar bien hay que conocer bien lo que se imparte. Condición necesaria, pero no suficiente.

También nos pareció interesante conocer si el sexo y la edad influyen en la satisfacción del alumnado, así que pasamos a agrupar con estos criterios:

![](/media/6e2968887607c5e6.webp)

Pues parece que los/as más jóvenes obtienen generalmente mejor puntuación. Sin diferencias destacables entre sexos, aunque es cierto que las mujeres más adultas (>55) parecen ofrecer una mejor experiencia que los hombres de su edad.

Por último, queríamos saber si, más allá de la edad, lo relevante era la antigüedad del/a profesor/a en la universidad. El profesorado está ordenado según su entrada en la facultad, por lo que bastaba con plotear este orden respecto a la nota de satisfacción.

![](/media/a34a39f86210e242.webp)

Pues sí, parece que los nuevos fichajes tienen menos puntuaciones negativas que los/as veteranos/as del lugar. Eso sí, les cuesta más llegar al 10.

Ahora que tenemos ya algunas ideas sobre el dataset, pasamos a los modelos.

# De aprendizaje supervisado a no supervisado, aderezado con NLP de preescolar

Hemos trabajado 4 modelos, cada uno con un objetivo.

\-Regresión lineal: Para poder predecir la satisfacción general si contamos con los 4 ítems de satisfacción, y conocer la importancia de cada uno de ellos.

\-Asociación: Para conocer qué atributos se “mezclan” más con otros.

\-Decision Trees: Para clasificar de forma sencilla a promotores/detractores/neutros.

\-Clustering: Para identificar la relación entre nota y satisfacción, y lo más importante, describir los grupos de profesores/as que se forman.

\-NLP: Para conocer qué comentarios se repiten más según la satisfacción y la nota del grupo.

**Regresión lineal**

Escogimos las 4 variables de satisfacción como variables independientes, y la satisfacción general como la variable dependiente del modelo. Suponíamos, vistas las correlaciones, que íbamos a tener buenos resultados.

Y así fue, utilizando la técnica Ridge de regresión obtenemos un accuracy del… ¡67%! Seguro que jugando con los datos train y test podemos llegar a un resultado mejor, pero nos dimos por satisfechos. Para contextualizar mejor este dato, medimos la importancia relativa de cada variable.

![](/media/378f796cee19fb19.webp)

Es decir, podemos predecir el resultado, y comprobamos que explicar es el elemento que más hace variar este resultado. Así que ya sabéis profesores/as, si os parece que os está yendo mal con un grupo, ¡a explicar mejor!

**Asociación**

Ya tenemos varias pistas sobre qué afecta más a la satisfacción, pero todavía no sabemos si hay relación entre un grupo con buenas notas y un buen profesor/a. Para comprobarlo, implementamos el algoritmo “a priori” para visualizar las asociaciones entre variables. A continuación, adjuntamos las asociaciones con un lift>1 (ocurren más de lo esperado).

![](/media/ffd0ec385907a942.webp)

Aunque hay un poco de todo, la asociación con mayor lift y confianza es “sobresaliente” con “promotor” Por lo tanto, podemos intuir que aquellos grupos que tienen una media sobresaliente, tienen un/a profesor/a que han valorado muy positivamente, pero no al contrario. Y tampoco podemos concluir que malas notas llevan mayoritariamente aparejadas malos/as profesores/as.

Para profundizar más en qué es lo que hace que ese profesor/a tenga promotores o detractores, empezamos con los decision trees.

**Decision Trees**

La primera prueba que hicimos fue con una profundidad de 2, para empezar a visualizar los primeros resultados.

![](/media/4e4c563d0bdc91d4.webp)

Conclusiones similares a lo anterior para el profesorado: Explicar es lo que más diferencia a promotores de detractores/neutros. Pero para asegurar un mayor número de alumnos/as promotores, mejor tener una buena metodología en las sesiones. Y, si explicar no es tu fuerte, céntrate en dar un buen feedback para no tener detractores.

Pero bueno, el score del árbol es de 0.35, así que hay que coger el resultado con cierto escepticismo.

Si ampliamos la profundidad a 5, ya vemos que entran nuevos atributos, y sube el score a 0.45. Un _insight_ que descubrimos con este árbol es que, si el feedback no es lo suficientemente bueno, pero el conocimiento percibido por el alumno/a es alto, la posibilidad de tener promotores sube.

Visto todo esto, vamos a centrarnos en cómo son los/as profesores/as según la satisfacción de los/as alumnos/as y las notas que ponen.

**Clustering**

Antes que nada, aplicamos el algoritmo K-Means para identificar el número óptimo de clústeres: 6. Pasamos a plottear esta relación entre notas y satisfacción:

![](/media/7460b0e8b569f174.webp)

Tenemos 6 grupos diferenciados, pero vamos a poner el foco en 3 de ellos:

-   Profesores/as que solo tienen detractores, al margen de la nota media del grupo:. Tiene más de 55 años, de la zona oeste de Gipuzkoa, con los conocimientos suficientes para ser bien valorados, pero sin las metodologías adecuadas según la opinión de sus alumnos/as. Es decir, profesores/as mayores con metodologías poco atractivas (¿quizás anticuadas?) tienen muchas papeletas para tener detractores.
-   Profesores/as que **solo tienen promotores,** teniendo sus grupos notas medias <6. Entre 35 y 55 años, imparten asignaturas de finanzas, son del este de Gipuzkoa y son bien valorados por sus conocimiento. En cambio, el feedback que ofrecen no parece ser el suficiente. Se puede inferir que por muy satisfecho que esté un alumno/a, como no se le de el feedback necesario para su mejora, no tendrá resultados notables.
-   Profesores/as que tienen **mayoritariamente promotores** y su nota media mínima es de 7: Menores de 35, de asignaturas de estrategia, con mucho conocimiento y buenas explicaciones.

Para profundizar algo más en cómo clasificar a estos profesores, vamos a darle un poco al NLP.

**NLP**

Como todo proyecto, en las fases finales quedan pocas energías. Y si lo último es NLP, que no es precisamente el algoritmo más sencillo, cuesta llegar a conclusiones reveladores. Sin embargo, con un simple counts de cuáles son las frases más repetidas (cuando se les pregunta aspectos a mantener) de los/as alumnos/as en función de la nota que dan al profesorado y las notas que reciben, obtenemos los siguientes _insights_.

En el caso de los detractores, los comentarios giran en torno al trabajo en equipo. Vamos, que lo positivo de la asignatura han sido sus compañeros/as de clase más que la propia clase. En cambio, los comentarios más repetidos con los promotores ensalzan al profesor/a: su conocimiento, formas diferentes de dar clase, buen feedback a todos los trabajos…

Si analizamos las respuestas según la nota obtenida, los comentarios más repetidos en el caso de los suspensos hacen referencia al material aportado. Es decir, lo único bueno que tiene que decir es que la asignatura o los PPTs son buenos. Y en el caso de los sobresalientes, ya aparecen (por primera vez) muchos comentarios sobre la disposición del profesor/a: atención, actitud, motivación, ganas de ayudar…

# Vamos acabando: 3 grandes conclusiones

-   La forma de explicar del profesor/a es el elemento clave para la satisfacción.
-   Generalmente, profesores/as con promotores tienen grupos con mejores resultados. Especialmente si son jóvenes y son percibidos con mucho conocimiento.
-   Para mejorar los resultados de un grupo, la actitud y la disposición del profesor parece ser el elemento diferencial.

No son conclusiones reveladoras que nos hagan ganar el nobel de educación, y puede que no sean extrapolables a otras universidades y contextos. Pero al menos ya hay una base por dónde empezar, y aunque ahora lo complicado sea precisamente cómo mejorar esas explicaciones o la actitud, los profesores/as ya sabemos dónde incidir, y los alumnos/as qué exigir 😉

Si tuviéramos que cerrar con una conclusión final, sería precisamente la importancia de la actitud. Es el comentario más repetido, con diferencia, en el caso de los grupos con notas sobresalientes. Ya no es cuestión de que estén más o menos satisfechos, sino de que obtienen mejores resultados. Y aunque mejores calificaciones no equivalen necesariamente a un mejor desarrollo futuro, nos surgen dos preguntas de cierre.

Como profesores/as, o desde la coordinación: ¿Se hacen los esfuerzos suficientes para mejorar la actitud y disposición del profesorado hacia los/as alumnos/as? ¿Puede más la burocracia o la experiencia del estudiante?

Como alumnos/as: ¿Hasta qué punto existe actitud hacia el aprendizaje? ¿Cuánta responsabilidad tiene el profesor en motivarnos? ¿No sería más lógico venir motivados/as de casa?

# Líneas futuras

Todavía queda mucho por hacer…

-   Un buen análisis NLP, más allá de contar las frases más repetidas. Mucho potencial para extraer el valor a más de 4.000 comentarios.
-   Clustering: se podría mejorar tanto el clustering hecho al profesorado, como introducir nuevas variables del alumnado para hacer un nuevo clustering.
-   Y más allá de la programación, implementar un sistema “close the loop” para tomar acciones y decisiones en base a los resultados de las encuestas. Que lleven a proyectos accionables.

# Cierre

En el siguiente enlace de [GitHub](https://github.com/rubengp39/StudentExperience-ResultsAI) encontrarás el dataset y los diferentes notebooks utilizados en el proyecto.

Si quieres ver la presentación que se hizo del proyecto, la tienes por [aquí](https://drive.google.com/file/d/1ZYOemphOYExWL-8atW3TvJJsTztxpcPB/view?usp=sharing).

Y para acabar, un agradecimiento a todo el equipo de [Saturdays.AI Bilbo](https://bilbao.saturdays.ai/). De estar contando filas en un Excel hemos pasado a un proyecto presentable, nada habría sido posible sin la comunidad. Mila esker denoi!

Thanks to Rubén García Pedrejón. 

## Repositorio

En el siguiente repositorio se encuentra el código usuado para desarrollar esta aplicación: [https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2021/StudentExperience-ResultsAI-main](https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2021/StudentExperience-ResultsAI-main)

## **¡Más inteligencia artificial!**

La misión de [Saturdays.ai](http://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) a la vez que se realizan proyectos para el bien (_#ai4good_). Los talleres que realizamos forman parte del programa [AI 4 Schools](https://saturdays.ai/ai-4-schools/) para que cualquier persona “_aprenda haciendo_” IA sin importar su especialidad o nivel de partida.

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en este [link](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](http://www.saturdays.ai/) ¡te esperamos!

[Abrir vídeo o recurso](https://www.youtube.com/embed/O6c21Cy3Lqs?feature=oembed)
