---
title: Detector distancia mínima COVID-19 mediante Inteligencia artificial
description: "WATCHDOG: un prototipo de 2020 que combina visión artificial,
  Raspberry Pi y un microcontrolador para explorar la detección de distancias
  entre personas."
pubDate: 2022-03-16
author: Info Saturdays
category: AI for good
kind: project
tags:
  - Deep Learning
  - Imagenes
  - Salud y Bienestar
  - YoloV4
image: /media/ed0d8f835fa7921a.webp
imageAlt: Detector distancia mínima COVID-19 mediante Inteligencia artificial
legacyPath: /2022/03/16/detector-distancia-minima-covid-19-mediante-inteligencia-artificial/
sourceUrl: https://saturdays.ai/2022/03/16/detector-distancia-minima-covid-19-mediante-inteligencia-artificial/
sourceId: 6556
language: es
draft: false
---

![](/media/ed0d8f835fa7921a.webp)

[Donostia](https://donostia.saturdays.ai). Primera Edición. 2020

El fatídico 11 de marzo del 2020, la OMS declaró la pandemia mundial por COVID-19. Más de 300 días después, hemos decidido hacer público y accesible para el mundo entero el trabajo que hemos venido desarrollando durante más de 8 semanas.

![](/media/3ec8dcb9e2bf484d.webp)

Prepárense, gobiernos e instituciones sanitarias del planeta, pues lo que van a ver en este artículo establecerá los cimientos de un nuevo sistema de vigilancia que permitirá asegurar el cumplimiento de una de las medidas que más se ha repetido durante estos fatídicos 300 días: la distancia de seguridad interpersonal de metro y medio.

Nuestro incombustible grupo, formado por 3 “locos” ingenieros (alguno de ellos en proceso) ha trabajado día y noche para traer la mejor solución posible a este problema.

El proyecto, que comenzó bajo el nombre de **WATCHDOG** (perro guardián) por la misión inicial que teníamos en mente (un robot con autonomía de movimientos que vigilase el cumplimiento de la distancia de seguridad y que ladrase cada vez que esta fuera quebrantada) iba a ofrecer, más allá del obvio beneficio de un constante recordatorio a las personas de la necesidad de cumplir con la medida de la distancia interpersonal, una herramienta para el mapeo y creación de “puntos calientes” en los que la distancia se incumpliese más a menudo.

Para todo ello, el equipo ha tratado de crear una convergencia entre los mundos de la electrónica y la Inteligencia Artificial, haciendo uso de los medios más innovadores que tenía a su mano. Con una Raspberry Pi 3, un microcontrolador de bajo nivel equivalente a Arduino Mega, diferentes medios para la comunicación, algoritmos, librerías y redes neuronales convolucionales se ha tratado de alcanzar la solución con la mayor satisfacción posible.

## El proyecto

Para el proyecto de [Saturdays.AI](https://www.saturdays.ai/) se ha pensado en desarrollar un proyecto _Watchdog_ (perro guardián) que vigila la distancia mínima recomendada por los protocolos Anti-COVID.

El planteamiento inicial ha sido el de programar un robot capaz de emitir un ladrido cuando la distancia de seguridad (requerido por los protocolos Anti-COVID) fuera quebrantada, enviando los datos adquiridos a un servidor y realizar un mapeo (mapa de calor) en tiempo real.

El objetivo básico del proyecto es **converger el mundo OT con el mundo IT, es decir, la convergencia de la electrónica con el de la IA** (inteligencia artificial) muy de moda en el mundo IT, utilizando técnicas de _Deep Learning_, que es una de las ramas del _Machine Learning_. De hecho, a pesar de que esta primera edición de AI Saturdays Euskadi se haya orientado al _Machine Learning_ en general, hemos decidido profundizar en el _Deep Learning_ por voluntad propia.

Poco a poco se están desarrollando tarjetas electrónicas autónomas que funcionan _At The Edge_ (es decir que la misma tarjeta de control aplica los algoritmos) sin utilizar el _Cloud_ para ello, o sin utilizar una unidad PC más potente para su procesado. Este fenómeno, conocido como _Edge Computing_, permite aliviar la carga de procesamiento a servidores centrales delegando tareas que puedan ser sencillas pero repetitivas a los nodos externos.

## Funcionamiento

Cuando se detectan 2 personas, manda la posición de la detección y la imagen de violación de la distancia a un servidor Web, creado con Flask.

En lo que al mapeo respecta, la idea inicial era realizar un mapeo SLAM (_simultaneous localization and mapping_) utilizando un sensor _LIDAR_ o una cámara 3D, pero nos hemos encontrado con limitaciones para hacer un _Point Cloud_ que nos permitiera ejecutar el mapeo. Se describe esta limitación en los Trabajos a Futuro.

## Objetivo

El objetivo inicial era plasmar todo el código dentro de una tarjeta Raspberry PI 3 (de aquí en adelante **RPi3**), pero a pesar de existen librerías para controlar los módulos de entradas y salidas (GPIO), el dispositivo no es lo suficientemente potente para poder procesar todo en tiempo real. Para ello existen módulos dedicados y deterministas que facilitan estas tareas.

Para tratar de cumplir con el objetivo aquí propuesto se ha utilizado un microcontrolador **STM32F411RET.** Se trata de un microcontrolador de gama baja equivalente a un Arduino Mega, pero con un sistema operativo de tiempo real (_Real Time Operating System_ o RTOS), al ser determinista se tiene el control del timing y tareas, pudiendo tener un mayor control para la adquisición de datos y respuesta de los actuadores.

Se decidió utilizar esta tecnología por la gran cantidad de librerías robustas que existen para controlar los periféricos.

![](/media/809cd41b4178d78a.webp)

## Algoritmo YOLOv4

_El algoritmo final que se ha usado ha sido por goleada YOLO (para nuestro caso), respecto a otros conocidos como SSD (Single Shot Detection) o la más precisa de todas las tecnologías RESNET._

_El reto en este apartado ha sido buscar la tecnología que mejor se adapta al tiempo real y nos basamos en las reglas de oro que dijo uno de los mentores:_

**1\. ¿Qué pasa en el mercado? ¿Cuál es la tendencia del mismo? ¿Qué tipo de arquitectura es más viable con las restricciones presupuestarias y de tiempo que tenéis?**

**2\. Mirad lo que hacen los grandes. ¿Podemos pensar igual a ellos? Es decir, ¿tenemos que plantearnos entrenar redes extremadamente complejas, o tenemos que poner los pies en la tierra y plantear ejemplos más rápidos para construir un Producto Mínimo Viable (MVP)?**

**3\. ¡Adáptate!**

_En esta fórmula, el resultado de 1+1 en ingeniería sería determinista pero en la vida real el resultado es estocástico, así que depende._ ?

Este proyecto está acotado para capacidad computacional de gama media y se ha querido estrujar al máximo desde ese punto de vista. Por ello, el mejor algoritmo que encontramos, el cual estaba puramente escrito en C (siendo un terrible reto el aplicar funciones matemáticas a pelo; aprovechamos para agradecer a [Joseph Redmon](https://pjreddie.com/)) es lo más rápido comparado con librerías escritas a mayor alto nivel (TensorFlow, pyTorch).

_Como curiosidad, usando la versión para embebidos de SSD se llega a unos 18 Frames por Segundo (FPS) comparado con YOLO, que llega a 24 FPS. Sin haber añadido telecomunicaciones nos dimos cuenta cuál era el camino a seguir, pero se encontraron todo tipo de resoluciones de las distintas tecnologías._

Con más capacidad de cómputo podríamos explorar la segmentación de instancias, por ejemplo con Mask R-CNN. A diferencia de las cajas de detección, estos modelos generan una máscara para cada objeto. La explicación original confundía esta tarea con las redes recurrentes (RNN).
> 
> Si se tiene aún más curiosidad al respecto, os dejamos este [link](https://blog.netcetera.com/object-detection-and-tracking-in-2020-f10fb6ff9af3).

Como esto se extendería hasta el infinito, no se van a explicar los detalles del funcionamiento a fondo; se adjunta un [link](https://blog.paperspace.com/how-to-implement-a-yolo-object-detector-in-pytorch/) donde se explica detalladamente el algoritmo en su versión v3. La diferencia está en que en la versión v4 aumenta la precisión pero en su versión tiny la velocidad se mantiene constante.

### EDA: Y ahora… ¡Metemos los “Datos” de nuestros sensores a la caja negra!

La analogía del “EDA” realizado en nuestro proyecto de Deep Learning tendría que ver, entre otros, con limpieza y preprocesamientos hechos de las imágenes obtenidas. El primer preprocesamiento ejecutado sería el que ofrece la función BLOB de OpenCV que reduce la escala de 8 bits (255 RGB) a escala porcentual unitaria.

Este detalle es muy importante ya que pasa el resultado de cualquier cámara a la que el algoritmo necesita de entrada. ¿Lo malo? Que se vuelen datos de coma flotante y eso requiere más gasto computacional pero de ese problema ya se encargaron sus autores.

El “tuning” de los parámetros en este aspecto que hemos hecho ha sido pasar la imagen de entrada a la escala más pequeña (316 x 316 píxeles).

Habiendo hecho este primer paso, la imagen pasará por múltiples filtros internos cambiando la dimensionalidad de la entrada y readaptando al mejor estilo de Nolan con películas del calibre de Tenet o Inception. ¿El resultado?

El algoritmo YOLOv4 entrega los datos de la imagen en una matriz compuesta de **13x13x (A x ((B+P) + C))**, siendo:

-   A: La cantidad de _anchor boxes_ (siendo una _anchor box_ un “espacio en el que se puede detectar la posible presencia de un objeto”).
-   B: Las coordenadas de posición del objeto.
-   P: La probabilidad de confianza de que hay objeto.
-   C: Las clases que deseamos identificar y su respectiva probabilidad.

![](/media/3b6d26f1225876bd.webp)

Dentro del archivo “coco.names” están las clases asociadas a sus respectivos nombres pero de este resultado se filtran “únicamente” los resultados en la que la clase es una persona

> ? **¿Y por qué no reentrenar la red aplicando transfer learning?**
> 
> Mucho ojo, ya que nuestro equipo se peleó para mejorar la respuesta de este algoritmo para aumentar y darle más valor a la matriz de salida de la versión tiny.
> 
> Los resultados, por desgracia, no fueron los esperados. El mapa de características que se crea en estos modelos se basa en cantidades muy grandes de datos y de mucha variedad en el tema de la visión, donde son necesarias grandes cantidades (10.000 imágenes) para que el procesamiento pueda ser fluido. Y es cierto, si se reentrenara partiendo de transfer learning nos ahorraríamos muchas imágenes de entrada, pero también hay que tener en cuenta las clases de objetos que se quieran reconocer. Mientras más clases de objetos haya el mapa de características aprende mejor a separar cada clase.
> 
> Por ello, se han usado los pesos de la versión COCO para el algoritmo YOLO, ya que era la más similar para nuestro caso.

A continuación, se aplica un segundo filtro, usado para aplicar el BBOX de los distintos _anchor boxes_ para ver cuál es el mejor.

Estos pasos anteriores formarían el proceso EDA como tal. Sin embargo, y en comparación con un proceso de ML, el filtro que se aplicaría dependería del grado de confianza que se tenga de la detección de un objeto, mientras que en un proceso de ML la “manipulación” se suele hacer sobre el mismo dato.

Todo esto se ensambla en una función llamada “**_Impure Detector_**_”_ que nos va a devolver los datos que más nos interesan en una lista de Python de la siguiente forma:

### \[Coordenadas de las Personas, Index\_Impuros\]

## RPI3

La Raspberry 3B+ cuenta con el sistema operativo Raspbian y librerías OpenCV (4.1.0.22).

El funcionamiento de manera general es sencillo: Se procesan los datos de la imagen y se reenvían a un servidor Web Flask instalado en un PC.

Podemos ver más detalles sobre el código de la RPi en CLIENT.py:

● **Comunicación Serie**

Tenemos una comunicación serie con el microcontrolador. Después de unas cuantas pruebas nos hemos dado cuenta de que, a la velocidad máxima con la que puede trabajar la RPi con python es con un BaudRate 115200 Bits/s, lo que limita la capacidad de mejorar el tiempo de espera entre Cliente-Servidor. Anotamos este aspecto como Trabajo futuro.

● **MQTT**

También se ha usado MQTT para enviar los datos respecto a la “violación” de la distancia de seguridad” a otro servidor. Sin embargo, como se ha mencionado antes, no se ha llegado a hacer un mapa de calor con el área de los “delitos de distancia de seguridad” a tiempo real, pero conseguimos enviar los datos e insertarlos en un archivo remoto, guardándolos en un fichero CSV dentro del servidor.

Un trabajo a futuro al que, por desgracia no pudimos llegar, era el de generar un pequeño _script_ para graficar o plotear esos datos.

![](/media/9143e06e79acc5df.webp)

El diagrama de bloques obtenido para nuestro proceso.

> Las imágenes son bastante problemáticas ya que enviar los paquetes de información tan largos y en la que la que el orden influya es complicado, es necesario indexarlos. Se han probado muchas, pero muchas metodologías distintas y la que mejores resultados ha dado ha sido usando una REST API del servidor.

## Servidor FLASK:

**En Internet se encuentra de todo excepto lo que realmente se quiere, por lo tanto hemos tenido que desarrollar el sistema de envío de imágenes comprimidas por HTTP.**

Para ello se han utilizado las funciones de imágenes por excelencia, recogidas en el paquete Open Source [OpenCV](https://opencv.org/) utilizando un buffer dinámico, evitando la escritura en el disco. Esto se debe ya que por experiencia se ha visto que, a la larga, si no se cuidan, los servidores “envejecen” o “degeneran”. Esto evita por ejemplo forzar los soportes de memoria flash y controlar los ciclos de lectura/escritura aplicados.

Después de emplear [OpenCV](https://opencv.org/), nuestro sistema crea la captura en un buffer, lo comprime y se envía al servidor, quien lo descomprime y escribe a disco, dejándolo preparado para su almacenamiento y/o post procesamiento. Este envío se hace en formato JSON ya que se tenían errores al enviarlos en otros formatos.

> ? **¿Cómo enviar datos que son variables en el tiempo de forma constante?**
> 
> Normalmente, para que dos personas y/o máquinas se comuniquen tienen que hablar el mismo idioma. En Machine Learning, además, los datos suelen enviarse en bloques constantes de información y de tamaño reducido. En nuestro caso, los pasos que va a ejecutar nuestro cliente son secuenciales y si se tropieza en algún punto todo se va al traste.
> 
> Por tanto, se han creado datos “ficticios” para enviarlos como mínimo para que todas las piezas del proyecto puedan funcionar sincronizadamente y en armonía.
> 
> Los “impuros” nos van a marcar el index del objeto al que esté pecando pero en los negativos no se va a fijar. Por tanto, esa es la razón por la que el proyecto consigue funcionar sin que se note este pequeño bug.

![](/media/97448eba391c9005.webp)

Esquema general del funcionamiento del servidor Flask.

## _Microcontrolador_

Se ha elegido este microcontrolador (**STM32F411RET**) por una opción que un Arduino no ofrecía:

_La programación de distintas subtareas para que se ejecuten de manera concurrente además de las interrupciones_.

Programar en el STMCubeIde nos da la opción de tener la facilidad de programación de Arduino, así como librerías de entornos más industriales.

A diferencia del Arduino en el que el uso de multitareas metiéndolas en un proceso [Round Robin](https://www.guru99.com/round-robin-scheduling-example.html) es muy complejo, sumado a la limitación de la cantidad de temporizadores o _timers_ que ofrece Arduino Uno 3, con el **STM32F404RE** estos problemas para insertarlos en la industria se mitigan.

Por tanto, una vez que el micro haya ejecutado la configuración inicial (tareas, interrupciones, timers…) el programa empezará a ejecutar las tareas aplicando un Round Robin, las cuales se agrupan en el siguiente esquema:

![](/media/7ff8d01e2fc14792.webp)

Esquema de las Tareas o Programas Concurrentes existentes.

Dentro de las tareas o programas concurrentes existentes existen tres:

**1\. ADC**

Este subprograma se encarga de leer las entradas digitales y procesarlas en 10–12 bits; aspecto que en una lectura por Arduino solo ofrecerá 8 bits de conversión.

Una vez acabadas una por una en orden secuencial, insertará los datos aplicando sus respectivas conversiones en un vector global int32, siendo el motivo para guardarlos como int y no en float que la cantidad de espacio que ocupan se duplicaría (de 32 a 64 bits, por la coma flotante).

Como se puede apreciar en la imagen del envío del Transmisor-Receptor Asíncrono Universal (UART), se envían 4 datos por cada sensor. El último dato es el que quedaría detrás de la coma flotante para su posterior preprocesamiento sencillo en la RPi.

Ejemplo de esto sería recibir del sensor de distancia un valor de 1004 y transformarlo a 100, 4 en este caso simulando metros de profundidad.

![](/media/faae350494007463.webp)

_Sensores conectados por UART al microcontrolador_

**2\. ACTUATORS**

Dentro de los actuadores podemos encontrar que se conmutarán los estados de las salidas digitales pertenecientes al Buzzer y LED\_EXT encargados de dotar al robot de notificar al entorno de manera acústica y visual.

No se ha añadido el actuador del motor porque se cree que separado se entiende mejor a la hora de distribuir el código.

**3\. MOTOR**

Los servomotores trabajan entre 500 y 2500 ticks por lo que nuestra tarea TASK\_MOTOR se aprovechará de las interrupciones del timer\_4 para cambiar su valor ON/OFF.

Además, se ha añadido un acumulador, de tal manera que si mientras se detecta una violación de la distancia de seguridad y antes de que la función se apague se vuelve a recibir una interrupción por la violación de distancia, aumentará el tiempo de espera 5 segundos más en esa posición. Con esto nos aseguramos de que hay un mayor control de las presencias detectadas.

## Interrupciones

> Las interrupciones son peticiones síncronas o asíncronas al reloj en la que el procesador va a dejar de lado la tarea que esté realizando para centrarse en la interrupción.

Nosotros hemos definido 4 tipos de interrupciones.

1\. IRQ\_EXT:

Es la interrupción externa por botón a la que se va a acceder en caso de que haya un error tanto de comunicación o de cualquier otro tipo para resetear la configuración del microcontrolador sin que resetee todo. Reenviará la información y nos avisará enviando un “DONE” por el puerto serial.

2\. IRQ\_TIM4

Se ha configurado el timer\_4 del microcontrolador para que se ejecute cada 1 MHz.

En resumen, para que tardemos 50 Hz que es la velocidad del servomotor tenemos que añadir un registro contador de 0–2000 unidades para que entre en la interrupción cada 50 Hz.

Es decir, que en cada 200 ms recibiremos 20000 ticks. O dicho de otra manera, cada 200 milisegundos nuestro micro interrumpirá la interrupción de ese timer.

3\. IRQ\_TX:

Esta interrupción únicamente va a encender un LED interno del microcontrolador para saber de manera rápida que todo está funcionando correctamente.

En la figura inferior, además de ver la distribución de los pines se puede ver el pin del LED interno así como el pulsador interno del microcontrolador.

![](/media/4a9129961d3457e6.webp)

Distribución de los pines del proyecto.

4\. IRQ\_RX:

**A pesar de estar la última en la lista, es la interrupción más importante**. Para que la RPi actúe como “cabeza pensante”, es necesaria una interrupción que esté atenta a cualquier señal asíncrona que reciba del microPC y que alerte a la RPi.

Los comandos que se van a enviar desde la RPi son dos:

-   **“SEND”**
-   **“ALRM”**

Cuando recibamos **SEND** el microcontrolador enviará los datos que tenga en ese momento en el vector “**sens**”.

Si recibe **ALRM** ejecutará los actuadores y si antes de que se acabe vuelve a recibir una entrada ALRM, aumentará el tiempo del mismo.

![](/media/e7808d323fe6fcdd.webp)

Figura que muestra el envío de señales a las tareas.

## Conclusiones

Se trata de un proyecto aparentemente simple, pero que detrás de todo existe un ecosistema muy complejo al que se le quería meter mano. Solo hay que ver la arquitectura de la infraestructura que ha quedado:

![](/media/f2b9d7b0d091194a.webp)

-   Sensores – Unidad del Microcontrolador (MCU).
-   MCU – RPi.
-   RPi – PC: Uso de protocolo HTTP con peticiones POST al servidor web (REST API montada en Flask).

Aunque el objetivo era aplicar temas de _Machine Learning_, estos temas requieren de una determinada arquitectura y funciones para comunicaciones, tratamiento de imágenes etc. El tema de SLAM + ML se ha quedado a las puertas pero sí se han dado pasos para poder continuar con la misma.

Y a la larga, el objetivo que se había planteado que era aplicar esta tecnología al mundo real aparte de la IT y darle una aplicación más industrial, creemos que aunque no se haya logrado, se está un paso más cerca con el uso de estas “herramientas caseras”.

Como reflexión obtenido, hemos detectado que si se va a empezar a usar el Cloud Computing, para las próximas generaciones hará falta un cifrado de la información muy densa que se envíe (aunque se sacrifique la latencia), ya que es un tema muy serio al que poca importancia se le está dando actualmente.

## Trabajo a futuro

Hemos detectado diferentes tareas como trabajo futuro de cara a este proyecto:

1. Mapeo y localización en interiores. Las pruebas con el GPS mostraron las limitaciones de usarlo sin una vista despejada del cielo. Como alternativas para interiores, consideraríamos AprilTags o balizas Bluetooth de baja energía (BLE).
2. Mejorar el microcontrolador y medir su efecto sobre el sistema completo. Descargar tareas de la Raspberry Pi podría reducir parte del tiempo de procesamiento, pero no implica duplicar su velocidad ni eliminar la latencia entre cliente y servidor.
3. Crear un script para representar gráficamente los datos obtenidos mediante MQTT.

## Integrantes

-   [**Jon Leiñena**](https://www.linkedin.com/in/jonleinena/)
-   [**Juan Jose Arin**](https://es.linkedin.com/in/jj-arin-donoso-70371487)
-   **Unai**

## Presentación del proyecto: DemoDay

[Abrir vídeo o recurso](https://www.youtube.com/embed/bGbQXjvTYGI?start=1458&feature=oembed)

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esta aplicación: [https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2020/Impure\_Detector-main](https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2020/Impure_Detector-main)

## **¡Más inteligencia artificial!**

Saturdays.AI makes AI more accessible through shared learning and projects with a social purpose. Our motto is AI4ALL IS AI4GOOD.

[Explore the available courses](https://cursos.saturdays.ai/)

[Meet the Saturdays.AI community](https://cursos.saturdays.ai/courses/saturdaysai-community-onboarding)
