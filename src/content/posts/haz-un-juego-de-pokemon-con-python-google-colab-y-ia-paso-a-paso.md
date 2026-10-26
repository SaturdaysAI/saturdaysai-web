---
title: Haz un Juego de Pokemon con Python, Google Colab y IA, paso a paso
description: He creado un minijuego interactivo llamado Pokémon Quiz. La idea
  surge para combinar mi afición por los clásicos Pokémon con un poco de
  programación en Python, y lo he hecho todo en Google Colab. No es nada del
  otro mundo,…
pubDate: 2025-02-28
author: Santi
category: Community
kind: article
tags: []
image: /media/ddf8e23f6641cf8a.webp
imageAlt: Create your own videogame
legacyPath: /2025/02/28/haz-un-juego-de-pokemon-con-python-google-colab-y-ia-paso-a-paso/
sourceUrl: https://saturdays.ai/2025/02/28/haz-un-juego-de-pokemon-con-python-google-colab-y-ia-paso-a-paso/
sourceId: 10977
language: es
draft: false
---

He creado un minijuego interactivo llamado **Pokémon Quiz**. La idea surge para combinar mi afición por los clásicos Pokémon con un poco de programación en **Python**, y lo he hecho todo en **Google Colab**. No es nada del otro mundo, pero es una excelente oportunidad para experimentar y aprender. Además, contar con la ayuda de **[ChatGPT](https://saturdays.ai/2025/02/14/deepseek-r1-vs-chatgpt-o1-para-estudiantes/)** facilita la organización de ideas y la estructuración del código, permitiéndome concentrarme en lo divertido.

## 🔧 Herramientas Utilizadas

Para armar Pokémon Quiz, me apoyé en varias herramientas y bibliotecas que me ayudaron a que todo funcionara:

-   **Python🐍:** El lenguaje de programación que utilicé para escribir el código del juego.
-   **Google Colab💻:** El entorno en línea donde probé y compartí mi cuaderno interactivo.
-   **ipywidgets🎛️:** Estos widgets hicieron posible crear una interfaz gráfica sencilla y divertida.
-   **Matplotlib📊:** Me permitió mostrar imágenes y gráficos, como la silueta de los Pokémon.
-   **Pillow (PIL)🖼️:** Con esta biblioteca, pude procesar las imágenes, descargarlas y generar las famosas siluetas.
-   **PokeAPI🔗:** La fuente de los sprites oficiales de Pokémon, para que el juego tuviera ese toque auténtico.

![](/media/b611a582b9487279.webp)

## 🎨Diseño y Estilo visual

Quería que el juego no solo funcionara bien, sino que también se sintiera auténtico y evocador de esos viejos tiempos. Por eso, me decidí por:

-   **Tipografía Retro:** Usé la fuente _«**Press Start 2P**«_ de Google Fonts, perfecta para darle ese aire clásico.
-   **Fondos y Colores:** Elegí un fondo degradado en tonos amarillos y azules, muy en la onda de Pokémon, y añadí contenedores semitransparentes para que los elementos destacaran.
-   **Interfaz Amigable:** Desde la pantalla de inicio con el botón “PLAY” hasta la selección de la generación de Pokémon, cada parte fue diseñada para que el usuario se sienta cómodo y, sobre todo, se divierta.

![](/media/8b5765e319b12b18.webp)

## 🏗️ ¿Cómo Lo Hice?

El proceso de desarrollo se fue armando paso a paso, y aquí te lo cuento de forma sencilla:

1.  **Organización del Proyecto:** Empecé creando un cuaderno en Google Colab, donde separé el código en secciones: una para importar las bibliotecas, otra para definir los estilos CSS, y otras para las funciones y la lógica principal del juego. Esto me ayudó a mantener todo ordenado.
2.  **Preparación de Funciones y Datos:** Desarrollé funciones para descargar imágenes, convertirlas al formato adecuado para los widgets y generar las siluetas de los Pokémon. También definí diccionarios con las URLs de sprites de las diferentes generaciones (Gen 1 a Gen 5), lo que hizo que agregar nuevos Pokémon fuera muy sencillo.
3.  **Creación de la Interfaz:** Utilicé ipywidgets para montar cada pantalla del juego:
    -   Una **pantalla splash** con el título y un botón “PLAY”.![](/media/8b5765e319b12b18.webp)
    -   Una **pantalla de selección de generación** para elegir el grupo de Pokémon. ![](/media/7ee59f8481804570.webp)
    -   La **pantalla del juego**, donde se muestra la silueta y se ofrecen opciones de respuesta.![](/media/3d929b86487110df.webp)
    -   Y una **pantalla de resumen** que muestra tu puntaje y detalles de cada ronda. ![](/media/8a80bc8dbd49c257.webp)
4.  **Ajustes y Pruebas:** No todo salió perfecto a la primera. Hubo momentos en que los botones no se comportaban como esperaba o las opciones no se actualizaban bien. Con varias pruebas en Colab y algunos consejos de ChatGPT, fui afinando cada detalle para que la experiencia fuera lo más fluida posible.

    [💡](https://emojipedia.org/es/bombilla)**Ejemplo de Prompt a ChatGPT:**  
    `"El juego ya funciona, pero necesito un último ajuste: que toda la experiencia mantenga un estilo visual unificado con una estética inspirada en Pokémon. Quiero que se sienta como un videojuego, por lo que al iniciar, aparezca una pantalla con un botón 'PLAY' y, al hacer clic en él, comience el juego. ¿Puedes implementar estos cambios para lograr esa coherencia desde el inicio hasta el final?"   `

5.  Como resultado, **ChatGPT** me devolvió este código donde se crean para que el juego se vea como se muestran en las capturas anteriores asegurando un estilo coherente y atractivo:

```python
# Estilos de ejemplo para el cuaderno de Pokémon Quiz
display(HTML('''
<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body {
  background: linear-gradient(135deg, #FFCB05, #3D7DCA);
  font-family: 'Press Start 2P', cursive;
  color: #FFF;
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Asegura que el cuerpo ocupe toda la altura de la ventana */
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
}
/* Estilo para el splash con fondo y bordes */
.splash {
  border: 5px solid #3D7DCA;
  border-radius: 20px;
  background-color: rgba(255,203,5,0.8);
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Clase para el título Pokémon Quiz */
.pokemon-quiz-title {
  font-family: 'Press Start 2P', cursive;
  font-size: 36px;
  color: #3D7DCA;
  text-shadow: 2px 2px #FFCB05;
}

/* Clase para el botón PLAY con tipografía retro */
.play-button {
  background-color: #3D7DCA;
  border: none;
  border-radius: 10px;
  width: 150px;
  height: 60px;
  color: #FFCB05;
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  cursor: pointer;
}

/* Clase para la sección de selección de generación */
.gen-selection-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ocupa todo el ancho de la pantalla */
  margin: 20px 0; /* Añade un margen arriba y abajo */
}

/* Estilos para el dropdown de generaciones */
.widget-dropdown select {
  font-family: 'Press Start 2P', cursive !important;
  font-size: 16px !important; /* Aumenta el tamaño de la fuente */
  background-color: #3D7DCA !important; /* Fondo azul */
  color: #FFCB05 !important; /* Texto amarillo */
  border: 2px solid #FFCB05 !important; /* Borde amarillo */
  border-radius: 10px !important; /* Bordes redondeados */
  padding: 5px !important; /* Relleno interno */
  width: auto !important;
  appearance: none; /* Elimina el estilo por defecto del dropdown */
  -webkit-appearance: none; /* Safari y Chrome */
  -moz-appearance: none; /* Firefox */
  cursor: pointer; /* Cambia el cursor a "pointer" */
}

/* Estilos para el botón "Iniciar Juego" */
.start-button-style{
    background-color: #3D7DCA;
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 40px;
    color: #FFCB05;
    font-family: 'Press Start 2P', cursive;
    font-size: 14px;
    cursor: pointer;
}

/* Se asegura que todos los demás botones utilicen la tipografía retro */
.widget-button {
  font-family: 'Press Start 2P', cursive !important;
  font-size: 14px !important;
}

/* Estilo para imágenes decorativas si se necesitan */
.decor-image {
  width: 100px;
  height: auto;
  margin: 0 20px;
}

/* Ajustes para los dropdown*/
.widget-dropdown .dropdown-label {
    font-family: 'Press Start 2P', cursive;
}
.widget-dropdown .dropdown-options {
    font-family: 'Press Start 2P', cursive;
}
/* Estilos para las opciones del dropdown */
.widget-dropdown select option {
  background-color: #3D7DCA !important; /* Fondo azul */
  color: #FFCB05 !important; /* Texto amarillo */
  font-family: 'Press Start 2P', cursive !important; /* Tipografía retro */
  font-size: 14px !important; /* Tamaño de fuente */
  border: 2px solid #FFCB05 !important; /* Borde amarillo */
  border-radius: 10px !important;
}
</style>
<script>
  // Este script de JavaScript es para intentar modificar el comportamiento del dropdown
  // Esto es necesario porque no podemos acceder a todos los elementos del dropdown con CSS
  // y tenemos que usar JavaScript para cambiar su comportamiento.
  // Se inyecta JavaScript para que se ejecute en el navegador del cliente.

  // Esperar a que el DOM (Document Object Model) esté completamente cargado
  window.addEventListener('DOMContentLoaded', (event) => {
    // Buscar todos los elementos <select> (dropdowns) en la página
    document.querySelectorAll('select').forEach(select => {
      // Añadir un event listener para el evento 'focus' (cuando el dropdown se abre)
      select.addEventListener('focus', () => {
        // Aumentar el z-index (capa) del dropdown para que se muestre encima de otros elementos
        select.style.zIndex = '100'; // Ajusta este valor si tienes otros elementos con z-index alto
      });

      // Añadir un event listener para el evento 'blur' (cuando el dropdown se cierra)
      select.addEventListener('blur', () => {
        // Restaurar el z-index del dropdown a su valor normal
        select.style.zIndex = 'auto';
      });
    });
  });
</script>
'''))
```


## **🎯** Conclusión

Pokémon Quiz es el resultado de poner en práctica ideas y herramientas que, aunque sencillas, se combinaron para crear algo entretenido y nostálgico. No se trata solo de código, sino de disfrutar el proceso, aprender de los errores y experimentar con la creatividad.

Si te animas a darle un vistazo o incluso a probar y modificar el código, ¡adelante! Cada cambio es una oportunidad para aprender y divertirse.

### **🚀¡Pruébalo tú mismo!**

¿Te gustaría experimentar con el código?

👉Haz clic [aquí](https://colab.research.google.com/drive/1KsoZi1RGGmTfajMw0rdmanO3vbbfqt8E?usp=sharing) para abrir el cuaderno en **Google Colab** y probar el juego **Pokémon Quiz**.
