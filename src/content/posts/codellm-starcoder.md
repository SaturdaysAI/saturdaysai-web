---
title: "StarCoder: ¡Únete a la resistencia!"
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
imageAlt: "StarCoder: ¡Únete a la resistencia!"
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

Los modelos de lenguaje de gran tamaño (LLM) aprenden patrones a partir de grandes volúmenes de texto y pueden generar nuevas secuencias coherentes con el contexto. Cuando se entrenan específicamente con código, hablamos de modelos de lenguaje para código o Code LLMs. Su capacidad para producir una respuesta plausible no garantiza que sea correcta.

Los modelos para código utilizan procedimientos de entrenamiento similares a otros LLM, pero incorporan grandes cantidades de programas, documentación y otros textos relacionados. Así aprenden patrones de sintaxis y estructura en distintos lenguajes de programación.

> Como resultado, son capaces de entender el lenguaje de programación y aprender a escribir código a partir de los patrones y la estructura del código en el entrenamiento

Esta capacidad de generar código puede resultar útil para completar fragmentos, proponer correcciones de sintaxis y sugerir soluciones en un entorno de desarrollo. Al reducir parte del trabajo repetitivo, permite dedicar más tiempo a tareas complejas y creativas. El código generado sigue necesitando revisión y pruebas.

### StarCoder: la promesa open source de los Code LLM

La comunidad BigCode ha presentado el Code LLM “StarCoder”, que ha su vez se divide en los modelos StarCoder y StarCoderBase. Estos modelos no solo son capaces de completar fragmentos de código, sino que también pueden realizar inferencias rápidas con grandes cantidades de datos.

¿Cómo se entrenaron? StarCoderBase aprendió a partir de un billón de tokens, es decir, un millón de millones, procedentes de una selección de The Stack. Después se continuó el entrenamiento con 35.000 millones de tokens de Python para obtener StarCoder. Este ajuste buscaba mejorar su rendimiento en ese lenguaje.

![](/media/627159b47119391a.webp)

Interfaz en Chat Conversacional de StarCoder

El rendimiento de estos modelos ha sido evaluado exhaustivamente y se encontró está entre los mejores modelos de lenguaje de código abierto. En particular, StarCoder y StarCoderBase demostraron su superioridad en términos de precisión y velocidad de inferencia, lo que los convierte en excelentes alternativas para los LLMs cerrados como [OpenAI GPT3.5](https://platform.openai.com/docs/models/overview) , o CoPilot de Microsoft.

Además de potentes, estos modelos han tenido muy en cuenta la ética y seguridad, tomando medidas para garantizar que el entrenamiento de los modelos no violara la privacidad de los datos, así como evitar la generación de contenido ofensivo o inapropiado, sin ser infalibles.

> BigCode ha puesto estos modelos a disposición del público bajo una licencia que permite su uso en aplicaciones comerciales.

La licencia de StarCoder permite a desarrolladores y empresas utilizar estos modelos en sus propias herramientas y aplicaciones, abriendo un mundo de posibilidades para la generación de código asistida por IA, una potencial “[explosión cámbrica](https://lachlangray.blot.im/the-cambrian-period-of-ai)” de aplicaciones basadas en LLMs similar a la producida con [Stable Diffusion](https://stability.ai/blog/stable-diffusion-public-release) hace unos meses.

Para más detalles sobre cómo se entrenó y afinó StarCoder, así como para una discusión en profundidad de sus resultados de rendimiento, se puede consultar el _paper “_[StarCoder: may the source be with you!](https://arxiv.org/pdf/2305.06161.pdf)”.

### Puede ?StarCoder y la alianza rebelde (open-source) desafiar al Imperio (modelos cerrados)?

En la evaluación de StarCoder, se comparan varios modelos de generación de código utilizando dos métricas principales: _HumanEval y MBPP._

HumanEval contiene problemas de programación escritos por personas, pero evalúa el código generado mediante pruebas automatizadas. Se comprueba si las funciones producen los resultados esperados; no se trata de un jurado humano que puntúe la legibilidad de cada respuesta.

MBPP significa Mostly Basic Programming Problems. Reúne tareas de programación en Python descritas en lenguaje natural, junto con pruebas que permiten comprobar las soluciones. No es una comparación de preferencias entre pares de modelos.

![](/media/1b611350e7acb013.webp)

Ranking de LLMs

En la tabla, StarCoder obtiene 33,6 en HumanEval y 52,7 en MBPP, mientras que StarCoder-Prompted alcanza 40,8 y 49,5, respectivamente. El cambio de prompt mejora una evaluación y empeora la otra, así que conviene comparar cada tarea por separado.

La tabla también incluye CodeGen, CodeGeeX, LLaMA, PaLM, LaMDA y una versión de Codex. Sus posiciones cambian según la prueba: CodeGen-16B-Multi y CodeGeeX no ocupan el tercer y cuarto puesto. Comparar modelos exige mirar la tarea, la versión y las condiciones de evaluación, además de la puntuación.

StarCoder-Prompted no es un modelo distinto, sino StarCoder con una instrucción de entrada adaptada a la tarea. En esta tabla mejora HumanEval de 33,6 a 40,8, pero reduce MBPP de 52,7 a 49,5. El ejemplo muestra cuánto puede influir el prompt y por qué no conviene hablar de un ganador universal.

Entonces, **¿puede StarCoder desafiar la hegemonía de OpenAI y sus mejores modelos de lenguaje?** La respuesta ahora mismo es **NO, PERO** se está acortando la distancia significativamente, y en muchas tareas, StarCoder tiene mejor desempeño que [Codex](https://help.openai.com/en/articles/6195637-getting-started-with-codex), el modelo para código de OpenAI.

![](/media/6f2adb68741992a1.webp)

Únete a la alianza rebelde de los LLMs con StarCoder

### Más Allá de la Programación: Lenguaje Natural

Aunque StarCoder se diseñó principalmente para código, el trabajo también exploró tareas de lenguaje natural, como razonamiento y comprensión de textos. Es una línea interesante: entrenar con código puede aportar capacidades útiles más allá de programar, aunque no convierte automáticamente al modelo en el mejor para cualquier tarea.

En razonamiento se compararon enfoques como PAL (Program-aided Language Models), que combina generación de programas con ejecución, y CoT (Chain-of-Thought), basado en pasos intermedios. También se estudiaron tareas de conocimiento y comprensión con MMLU (Massive Multitask Language Understanding) y CoQA (Conversational Question Answering).

Los resultados de estas evaluaciones muestran que StarCoder es capaz de desempeñarse eficazmente en estas tareas de lenguaje natural, aunque su rendimiento puede ser ligeramente inferior al de otros modelos específicos más grandes. 

> StarCoder ha demostrado su versatilidad más allá de la generación de código, tiene un buen desempeño como modelo de lenguaje para tareas generalistas

### Ética y Seguridad: Un Compromiso Firme

El equipo de BigCode documentó medidas como el filtrado de información personal, la posibilidad de retirar código del conjunto de datos y las herramientas de atribución. Son pasos hacia un desarrollo responsable, no una certificación de que el modelo sea seguro o esté libre de sesgos. Los LLM pueden generar información falsa, reproducir prejuicios o proponer código vulnerable; por eso es importante estudiar sus límites y revisar sus resultados.

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

- Es un modelo de lenguaje para código con pesos disponibles, entrenado con más de 80 lenguajes de programación.
-   Es capaz de procesar entradas con una **longitud de contexto de más de 8.000 tokens** (unas 6.000 palabras en inglés, [menos en español](https://denyslinkov.medium.com/why-is-gpt-3-15-77x-more-expensive-for-certain-languages-2b19a4adc4bc)), lo que lo convierte en uno de los modelos más grandes y potentes disponibles.
- Los pesos y el código de entrenamiento están disponibles bajo sus respectivas licencias, lo que permite estudiar y adaptar el modelo.
- El proyecto incorpora medidas de desarrollo responsable, aunque siguen existiendo riesgos de privacidad, sesgo y generación de contenido inadecuado.
-   Los investigadores detrás de StarCoder también han proporcionado **herramientas de atribución** para ayudar a los usuarios a identificar el código generado por el modelo y asegurarse de cumplir con los requisitos de licencia correspondientes.

#### Desafíos

-   Al igual que con cualquier modelo de lenguaje natural, StarCoder puede **generar resultados inexactos** o no confiables, especialmente si se utiliza en áreas donde la programación es muy especializada o técnica.
-   StarCoder puede generar contenido ofensivo, discriminatorio o engañoso. Se han tomado medidas para evitar esto, pero siempre existe el riesgo de que el modelo pueda producir resultados no éticos.
-   Aunque StarCoder es una herramienta de código abierto, aún tiene restricciones de uso que pueden limitar su accesibilidad a algunos desarrolladores.
-   La tecnología detrás de StarCoder aún se encuentra en una **fase temprana de desarrollo**, lo que significa que aún hay muchos desafíos técnicos que deben abordarse antes de que se convierta en una herramienta ampliamente utilizada.
-   Aunque el modelo ha sido evaluado en inglés, aún no está claro lo bien que funcionará en otros idiomas y cómo se traducirán los resultados en diferentes contextos culturales, en español parece estar funcionando bastante bien.

### Conclusión

La inteligencia artificial y el aprendizaje automático continúan transformando el desarrollo de software. StarCoder, presentado por BigCode en 2023, fue un paso relevante para ampliar el acceso a modelos capaces de trabajar con código.

Como un modelo de lenguaje de programación a gran escala (LLM), StarCoder abre un mundo de posibilidades. Su capacidad para generar código automáticamente, corregir errores y facilitar el aprendizaje de nuevos lenguajes, puede mejorar mucho la productividad y eficiencia.

Sin embargo, como cualquier tecnología emergente, StarCoder no está exento de desafíos. La generación de contenido inexacto, ofensivo o discriminatorio es un riesgo inherente en cualquier modelo de lenguaje, y aunque se han tomado medidas para mitigar estos riesgos, es crucial seguir trabajando en la mejora continua de estos aspectos.

StarCoder ilustró en 2023 el potencial de los modelos con pesos disponibles para la programación asistida por IA. Su comunidad, documentación y herramientas permiten estudiar y adaptar el sistema. El reto sigue siendo mejorar su utilidad, evaluar sus limitaciones y revisar el código que genera.

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
