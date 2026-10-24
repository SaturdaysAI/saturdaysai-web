---
title: "?StarCoder: ¡Únete a la resistencia!"
description: Starcoder, es un LLM de código abierto y ético para la generación
  de código y la asistencia técnica para programadores, ¿mejor que ChatGPT?
pubDate: 2023-05-19
author: Miguel Guerrero
category: Community
kind: article
tags:
  - Deep Learning
  - IA
  - intel
  - Machine Learning
image: /media/58a965cea8198726.webp
imageAlt: "?StarCoder: ¡Únete a la resistencia!"
legacyPath: /2023/05/19/codellm-starcoder/
sourceUrl: https://saturdays.ai/2023/05/19/codellm-starcoder/
sourceId: 9221
language: es
draft: false
---

### Un modelo de lenguaje abierto, permisivo y ético para la programación

![](/media/fd24a8223721c394.webp)

StarCoder

**StarCoder** es un modelo de lenguaje de gran tamaño (LLM por sus siglas en inglés), desarrollado por la comunidad [BigCode](https://www.bigcode-project.org/), que se lanzó en mayo de 2023. Este modelo ha sido diseñado para trabajar con código de programación y se presenta como una alternativa open source a herramientas como [GitHub Copilot](https://github.com/features/copilot), o el mismísimo ChatGPT.

El objetivo es mejorar la eficiencia y la productividad de los desarrolladores al generar automáticamente código y corregir errores de sintaxis, entre otras tareas. Pero antes de seguir, veamos quiénes son los responsables que hay detrás de este nuevo modelo, qué significa Code LLM y qué nos aporta StarCoder.

#### BigCode: democratizando el acceso a herramientas de programación avanzadas.

[BigCode](https://www.bigcode-project.org/) es una colaboración de ingenieros y científicos que busca mejorar la forma en que se escribe y se entiende el código, haciendo que la programación sea más accesible y eficiente para todos, desarrollando modelos de lenguaje de programación de alta calidad como StarCoder. Cuenta con el apoyo de ? [HuggingFace](https://huggingface.co/bigcode) y [ServiceNow](https://www.servicenow.com/blogs/2022/bigcode-large-language-models.html), aunque es un proyecto abierto y totalmente comunitario.

StarCoder es fruto de esta colaboración. Otro fruto es [The Stack,](https://www.bigcode-project.org/docs/about/the-stack/) el conjunto de datos de entrenamiento más grande disponible para la programación. Además, BigCode también se preocupa por la responsabilidad en la creación de estos modelos, y trabaja para asegurarse de que sean éticos y justos en su uso.

![](/media/a480cfb3f688960c.webp)

Características de “The Stack”

#### Code LLM: Tecnología de IA para la generación de código de programación

Los modelos de lenguaje de gran tamaño (_Large Language Models_ o LLMs) son tecnologías de inteligencia artificial que han revolucionado la forma en que las máquinas comprenden y generan texto. Al analizar y aprender patrones en grandes volúmenes de texto, los LLMs pueden generar nuevas piezas de texto que son sorprendentemente coherentes y contextuales. Cuando estos modelos se construyen para trabajar específicamente con código de programación, da origen a lo que se conoce como **_Code LLMs_**.

Los _Code LLMs_ se entrenan de la misma manera que los LLMs normales, pero en lugar de aprender patrones en texto normal o natural, o sea, el lenguaje que usamos las personas, aprenden esos patrones usando lenguajes de programación como base. Esto significa que analizan y aprenden a partir de miles de millones de líneas de código escrito en diferentes lenguajes de programación.

> Como resultado, son capaces de entender el lenguaje de programación y aprender a escribir código a partir de los patrones y la estructura del código en el entrenamiento

Esta habilidad para **“aprender” a programa**r los convierte en herramientas poderosas para múltiples tareas, como la generación automática de código, la corrección ortográfica y de sintaxis, y la sugerencia de código en entornos de desarrollo de software. Esto tiene el potencial de **aumentar significativamente la productividad** y la eficiencia de los desarrolladores, ya que pueden delegar tareas repetitivas o tediosas a estos modelos y concentrarse en tareas más complejas y creativas.

### ?StarCoder: la promesa open source de los Code LLM

La comunidad BigCode ha presentado el Code LLM “StarCoder”, que ha su vez se divide en los modelos StarCoder y StarCoderBase. Estos modelos no solo son capaces de completar fragmentos de código, sino que también pueden realizar inferencias rápidas con grandes cantidades de datos.

¿Cómo se ha hecho? Para entrenar estos modelos, BigCode utilizó un conjunto seleccionado y curado de un billón de tokens provenientes de GitHub. Después de este entrenamiento inicial, StarCoderBase fue afinado específicamente para Python. Este proceso de ajuste fino (_fine-tuning_) implicó entrenar el modelo en un conjunto de datos específico de Python, permitiendo que el modelo se especializara en este lenguaje y mejorara su capacidad para generar y trabajar con código Python.

![](/media/627159b47119391a.webp)

Interfaz en Chat Conversacional de StarCoder

El rendimiento de estos modelos ha sido evaluado exhaustivamente y se encontró está entre los mejores modelos de lenguaje de código abierto. En particular, StarCoder y StarCoderBase demostraron su superioridad en términos de precisión y velocidad de inferencia, lo que los convierte en excelentes alternativas para los LLMs cerrados como [OpenAI GPT3.5](https://platform.openai.com/docs/models/overview) , o CoPilot de Microsoft.

Además de potentes, estos modelos han tenido muy en cuenta la ética y seguridad, tomando medidas para garantizar que el entrenamiento de los modelos no violara la privacidad de los datos, así como evitar la generación de contenido ofensivo o inapropiado, sin ser infalibles.

> BigCode ha puesto estos modelos a disposición del público bajo una licencia que permite su uso en aplicaciones comerciales.

La licencia de StarCoder permite a desarrolladores y empresas utilizar estos modelos en sus propias herramientas y aplicaciones, abriendo un mundo de posibilidades para la generación de código asistida por IA, una potencial “[explosión cámbrica](https://lachlangray.blot.im/the-cambrian-period-of-ai)” de aplicaciones basadas en LLMs similar a la producida con [Stable Diffusion](https://stability.ai/blog/stable-diffusion-public-release) hace unos meses.

Para más detalles sobre cómo se entrenó y afinó StarCoder, así como para una discusión en profundidad de sus resultados de rendimiento, se puede consultar el _paper “_[StarCoder: may the source be with you!](https://arxiv.org/pdf/2305.06161.pdf)”.

### Puede ?StarCoder y la alianza rebelde (open-source) desafiar al Imperio (modelos cerrados)?

En la evaluación de StarCoder, se comparan varios modelos de generación de código utilizando dos métricas principales: _HumanEval y MBPP._

**_HumanEval_** es una métrica que evalúa la calidad del código generado por los modelos a través de pruebas realizadas por humanos. En esta prueba, a los evaluadores humanos se les presenta un conjunto de problemas de programación y se les pide que evalúen la calidad del código generado por los modelos en términos de su precisión, eficiencia y legibilidad.

Por otro lado, **MBPP** (_Mean Binary Pairwise Preference_) es una métrica que utiliza un enfoque más estadístico para evaluar la calidad del código generado. En lugar de depender de la evaluación humana, MBPP compara el código generado por dos modelos diferentes para un mismo problema y calcula la probabilidad de que uno sea preferido sobre el otro en términos de calidad.

![](/media/1b611350e7acb013.webp)

Ranking de LLMs

Según esta tabla, **StarCoder y StarCoder-Prompted son los modelos con mejor desempeño general**, obteniendo los mejores puntajes en _HumanEval_ y también en MBPP. Específicamente, StarCoder obtuvo un puntaje de 33.6 en HumanEval y 52.7 en MBPP, mientras que StarCoder-Prompted obtuvo 40.8 y 49.5 en HumanEval y MBPP, respectivamente.

Los otros modelos también tienen tasas de acierto significativas, con _CodeGen-16B-Multi y CodeGeeX_ en el tercer y cuarto lugar en términos de desempeño. Aunque algunos modelos como _LLaMA-7B_ tienen tasas de acierto más bajas, todavía se desempeñan bien considerando que no están específicamente diseñados para la generación de código.

En general, StarCoder se presenta comor uno de los mejores modelos de generación de código en términos de precisión, superado solo por **StarCoder-Prompted**, que utiliza información adicional de entrada del usuario para mejorar aún más el desempeño.

Entonces, **¿puede StarCoder desafiar la hegemonía de OpenAI y sus mejores modelos de lenguaje?** La respuesta ahora mismo es **NO, PERO** se está acortando la distancia significativamente, y en muchas tareas, StarCoder tiene mejor desempeño que [Codex](https://help.openai.com/en/articles/6195637-getting-started-with-codex), el modelo para código de OpenAI.

![](/media/6f2adb68741992a1.webp)

Únete a la alianza rebelde de los LLMs con StarCoder

### Más Allá de la Programación: Lenguaje Natural

Una grata sorpresa ha sido encontrar que StarCoder, aunque ha sido diseñado principalmente para trabajar con lenguaje de programación, ha demostrado ser también competente en una variedad de tareas de lenguaje natural, incluyendo **razonamiento, comprensión lectora y generación de texto,** de hecho, que los modelos entrenados para código sean mejores que los entrenados para texto (lenguaje natural), es una característica emergente que está levantando más de una ceja.

En la tarea de **razonamiento**, se ha utilizado la metodología de PAL (_Premise-Answer-Likelihood_) y CoT (_Choice of Task_), para comparar su rendimiento con el de otros modelos. En lo que respecta a la **comprensión lectora,** se ha evaluado su rendimiento utilizando los benchmarks MMLU (_MultiModal Language Understanding_) y CoQA (_Conversational Question Answering_).

Los resultados de estas evaluaciones muestran que StarCoder es capaz de desempeñarse eficazmente en estas tareas de lenguaje natural, aunque su rendimiento puede ser ligeramente inferior al de otros modelos específicos más grandes. 

> StarCoder ha demostrado su versatilidad más allá de la generación de código, tiene un buen desempeño como modelo de lenguaje para tareas generalistas

### Ética y Seguridad: Un Compromiso Firme

El equipo de BigCode han puesto un esfuerzo real, y demostrable, en hacer de StarCoder un modelo lo más seguro y ético posible. Es conocido que uno de los problemas más comunes con los LLMs es la generación de información inexacta o la amplificación de prejuicios existentes. Esto puede llevar a la generación de contenido ofensivo, engañoso, o discriminatorio. Para contrarrestar estos problemas, se han empleado técnicas de alineación procurando un comportamiento ético del modelo y que no se perpetúen o amplifiquen prejuicios y estereotipos dañinos, que es uno de los principales retos con la IA Generativa. En la sección 7.3 del _paper_, se detallan las estrategias y medidas tomadas para mitigar riesgos.

### Aplicaciones Prácticas: Mejorando la Vida de Desarrolladores y usuarios

StarCoder no es solo una herramienta teórica de inteligencia artificial, sino una aplicación práctica que puede tener un impacto significativo en la vida cotidiana de los desarrolladores de software. Su capacidad para entender, generar y corregir código puede simplificar y automatizar una serie de tareas, mejorando la eficiencia y la productividad. Entre ellas:

-   **Automatización de la escritura de código**. Por ejemplo, un desarrollador puede proporcionar una descripción de alto nivel de la funcionalidad que desea, y StarCoder puede generar automáticamente código útil para implementar esa funcionalidad. Esto puede ahorrar mucho tiempo y esfuerzo, especialmente en tareas repetitivas o estándar, así como evitar el “[síndrome de la hoja en blanco](https://es.wikipedia.org/wiki/Bloqueo_del_escritor#:~:text=Un%20tema%20relacionado%20es%20el,directamente%20relacionado%20con%20el%20tema)”.
-   **Corrección de errores** y QA. Para identificar y corregir errores de sintaxis y semánticos en el código. Una de las tareas más importantes, pero en ocasiones tediosas e ingratas, es la corrección y QA de código, con StarCoder esto se vuelve mucho más dinámico, ayudando a analizar el código existente, sugiriendo correcciones y mejoras, y ayudando a los desarrolladores a evitar errores comunes y mejorar la calidad de su código.
-   **Facilitar** el **aprendizaje** de nuevos lenguajes de programación. Para los desarrolladores que están aprendiendo un nuevo lenguaje de programación, StarCoder puede ser una herramienta de aprendizaje muy útil. Al proporcionar ejemplos de cómo se ve el código en ese lenguaje, puede ayudar a los desarrolladores a familiarizarse más rápidamente con la sintaxis y las convenciones del nuevo lenguaje.
-   **Refactoring** y mejora del código existente. Al analizar el código y sugerir mejoras, ayuda a mantener el código limpio, eficiente y fácil de entender, incluso nos puede generar documentación y comentarios para el código.

En resumen, StarCoder tiene el **potencial** de ser una herramienta valiosa para los desarrolladores, **automatizando y simplificando** una serie de tareas y ayudando a mejorar la eficiencia y la calidad del código.

![](/media/2de584b8f8f925f0.webp)

Ejemplo de cómo integrar “StarCoder” en tus aplicaciones a través de HF Transformers

### Resumen de Fortalezas y Desafíos de ?StarCoder

#### Puntos fuertes

-   Es un **modelo de lenguaje de programación** a gran escala de código abierto, entrenado en más de 80 lenguajes de programación.
-   Es capaz de procesar entradas con una **longitud de contexto de más de 8.000 tokens** (unas 6.000 palabras en inglés, [menos en español](https://denyslinkov.medium.com/why-is-gpt-3-15-77x-more-expensive-for-certain-languages-2b19a4adc4bc)), lo que lo convierte en uno de los modelos más grandes y potentes disponibles.
-   Es una herramienta de **código abierto**, entrenado con **licencias permisivas**, permitiendo que la comunidad de programadores pueda contribuir a su desarrollo y mejora.
-   StarCoder ha sido **entrenado éticamente**, lo que significa que se han tomado medidas para evitar la discriminación y otros comportamientos inapropiados en la generación de código.
-   Los investigadores detrás de StarCoder también han proporcionado **herramientas de atribución** para ayudar a los usuarios a identificar el código generado por el modelo y asegurarse de cumplir con los requisitos de licencia correspondientes.

#### Desafíos

-   Al igual que con cualquier modelo de lenguaje natural, StarCoder puede **generar resultados inexactos** o no confiables, especialmente si se utiliza en áreas donde la programación es muy especializada o técnica.
-   StarCoder puede generar contenido ofensivo, discriminatorio o engañoso. Se han tomado medidas para evitar esto, pero siempre existe el riesgo de que el modelo pueda producir resultados no éticos.
-   Aunque StarCoder es una herramienta de código abierto, aún tiene restricciones de uso que pueden limitar su accesibilidad a algunos desarrolladores.
-   La tecnología detrás de StarCoder aún se encuentra en una **fase temprana de desarrollo**, lo que significa que aún hay muchos desafíos técnicos que deben abordarse antes de que se convierta en una herramienta ampliamente utilizada.
-   Aunque el modelo ha sido evaluado en inglés, aún no está claro lo bien que funcionará en otros idiomas y cómo se traducirán los resultados en diferentes contextos culturales, en español parece estar funcionando bastante bien.

### Conclusión

La inteligencia artificial y el aprendizaje automático (_machine learning_) continúan transformando diversos aspectos de nuestra vida, y el desarrollo de software no es una excepción. **StarCoder**, presentado por BigCode, es una representación de este progreso y un gran paso adelante hacia la democratización del desarrollo de software.

Como un modelo de lenguaje de programación a gran escala (LLM), StarCoder abre un mundo de posibilidades. Su capacidad para generar código automáticamente, corregir errores y facilitar el aprendizaje de nuevos lenguajes, puede mejorar mucho la productividad y eficiencia.

Sin embargo, como cualquier tecnología emergente, StarCoder no está exento de desafíos. La generación de contenido inexacto, ofensivo o discriminatorio es un riesgo inherente en cualquier modelo de lenguaje, y aunque se han tomado medidas para mitigar estos riesgos, es crucial seguir trabajando en la mejora continua de estos aspectos.

En general, StarCoder representa un salto significativo hacia **una nueva era de la programación asistida por IA, y automatización con lenguaje natural.** Si bien todavía hay trabajo por hacer, la promesa de esta tecnología es indudable. Con su compromiso con la ética, la seguridad y el desarrollo abierto, **StarCoder** se posiciona como una de las mejores alternativas a los modelos cerrados y de caja negra disponibles actualmente, contando además con el apoyo de una comunidad comprometida en la mejora continúa de los modelos y su impacto positivo en nuestra sociedad.

**¿Qué esperas para probarlo?**

Artículo escrito por [Jesús Sánchez](https://www.linkedin.com/in/jesussanchez90/) y [Miguel Guerrero](https://www.linkedin.com/in/miguelguer/).

![](/media/2f14cbb5a3056479.webp)

Las armas no ganan batallas. Tu mente y un buen LLM, poderosa combinación es.

### **Anexo**

#### Resumen de las características de StarCoder:

-   LLM de 15Bn de parámetros y 1Tn de tokens
-   8k tokens de contexto (un capítulo de largo de juego de tronos)
-   Licencia permisiva que permite el uso comercial
-   Asistente para programación y tareas generales
-   Conoce más de 80 lenguajes de programación
-   De código y datos abiertos
-   Tiene Plugin en VSCode

#### Links para saber más:

-   Proyecto [https://hf.co/bigcode](https://huggingface.co/bigcode)
-   Blog [https://huggingface.co/blog/starcoder](https://huggingface.co/blog/starcoder)
-   Genera código [https://huggingface.co/spaces/bigcode/bigcode-editor](https://huggingface.co/spaces/bigcode/bigcode-editor)
-   Juega con StarCoder: [https://huggingface.co/spaces/bigcode/bigcode-playground](https://huggingface.co/spaces/bigcode/bigcode-playground)
-   Prueba el razonamiento: [https://huggingface.co/spaces/bigcode/Reasoning-with-StarCoder](https://huggingface.co/spaces/bigcode/Reasoning-with-StarCoder)
-   Explora el conjunto de datos: [https://huggingface.co/spaces/bigcode/search](https://huggingface.co/spaces/bigcode/search)

#### Magnitudes básicas para desarrollar LLMs:

![](/media/4c352bdc536476ca.webp)

Magnitudes a tener en cuenta cuando desarrollas LLMs
