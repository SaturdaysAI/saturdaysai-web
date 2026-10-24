---
title: "AIoT en la agricultura y ganadería: cuando los campos empiezan a tomar
  decisiones"
description: Sensores, datos e inteligencia artificial en la agricultura y la
  ganadería. Un recorrido por aplicaciones prácticas que conectan el campo con
  la tecnología.
pubDate: 2026-04-02
author: Raul
category: AI for good
kind: article
tags:
  - agriculatura
  - agtech
  - Deep Learning
  - ganaderia
  - Inteligencia Artificial
  - Machine Learning
image: /media/f8b23c1b5985010a.webp
imageAlt: "AIoT en la agricultura y ganadería: cuando los campos empiezan a
  tomar decisiones"
legacyPath: /2026/04/02/aiot-en-la-agricultura-y-ganaderia-cuando-los-campos-empiezan-a-tomar-decisiones/
sourceUrl: https://saturdays.ai/2026/04/02/aiot-en-la-agricultura-y-ganaderia-cuando-los-campos-empiezan-a-tomar-decisiones/
sourceId: 11719
language: es
draft: false
---

En una explotación agrícola, una decisión tan antigua como regar ya no depende solo del calendario, del tacto de la tierra o de mirar al cielo. En algunos campos, esa decisión empieza en una pantalla. Un sensor enterrado a distintas profundidades detecta cómo se mueve la humedad en el suelo. Una plataforma cruza ese dato con el tiempo atmosférico, la fase del cultivo y otros parámetros agronómicos. Y, a partir de ahí, propone una acción concreta: hoy sí, mañana no, aquí más, allí menos.

Eso es, en esencia, el AIoT aplicado al campo: la combinación de sensores conectados —el Internet de las Cosas— con algoritmos capaces de interpretar lo que sucede y convertirlo en decisiones operativas. No se trata de llenar la agricultura de gadgets, sino de resolver problemas clásicos con una capa nueva de inteligencia: gastar menos agua, aplicar mejor los insumos, detectar antes una enfermedad o reorganizar una tarea que hasta ahora dependía de mucha mano de obra.

La literatura reciente identifica múltiples aplicaciones del AIoT en agricultura de precisión, incluyendo riego inteligente, monitorización de cultivos, gestión de nutrientes, detección de plagas y enfermedades, estimación de rendimiento y robótica agrícola (Majeed _et al._, 2024). Pero el interés del AIoT en agricultura no está en la tecnología por sí sola, sino en lo que cambia sobre el terreno: menos intuición aislada, más observación continua; menos respuesta tardía, más intervención precisa.

## Del dato al cultivo: qué cambia realmente

Visto desde fuera, AIoT puede sonar a etiqueta técnica. Visto desde una finca, se entiende mejor: un sistema nervioso digital repartido por el campo. Los sensores miden; la conectividad transmite; la plataforma ordena; el algoritmo interpreta. El resultado no es una abstracción, sino una recomendación útil.

![](/media/f9a987ab2895b798.webp)

Ejemplo de arquitectura de un sistema AIoT/IoT agrícola. Fuente: Rehman et al. (2022)

![](/media/f8b23c1b5985010a.webp)

Otro ejemplo de arquitectura de un sistema AIoT/IoT agrícola. Fuente: [https://s3.amazonaws.com/s3-biz4intellia/images/applications-of-iot-in-agriculture.jpg/](https://s3.amazonaws.com/s3-biz4intellia/images/applications-of-iot-in-agriculture.jpg)

Un sensor de suelo no “mejora” por sí mismo un cultivo. Lo mejora cuando permite ajustar el riego. Una cámara no “hace más sostenible” una viña por sí sola. Lo hace cuando, unida a modelos predictivos y alertas, ayuda a intervenir antes y con mayor precisión. Esa es la diferencia entre digitalizar un proceso y transformarlo de verdad.

La parte más convincente de esta transformación no está en los folletos comerciales, sino en los casos en los que puede seguirse la cadena completa: problema inicial, solución tecnológica y resultado observable. Ahí es donde el AIoT deja de parecer futurista y empieza a parecer agronomía aplicada.

Quien quiera explorar esta temática con más detalle puede visitar la [AIoT Agriculture Wiki de Saturdays.AI](https://saturdaysai.github.io/aiot-agriculture/), un recurso interactivo que amplía muchos de los conceptos que aparecen en este artículo y los organiza de forma visual en secciones como sensores, hardware, conectividad y aplicaciones. De este modo, el lector puede pasar del recorrido narrativo del post a una exploración más estructurada de las tecnologías que están dando forma a la agricultura inteligente. El proyecto puede consultarse también en su [repositorio público en el GitHub de SaturdaysAI](https://github.com/SaturdaysAI/aiot-agriculture), donde se recoge la base técnica de la wiki.

[![Vista destacada de la AIoT Agriculture Wiki de Saturdays.AI](/media/06972b3be00b071c.webp)](https://saturdaysai.github.io/aiot-agriculture/)

Vista de la [AIoT Agriculture Wiki de Saturdays.AI](https://saturdaysai.github.io/aiot-agriculture/), un recurso interactivo para explorar sensores, hardware, conectividad y aplicaciones de la agricultura inteligente. Repositorio disponible en el [GitHub de SaturdaysAI](https://github.com/SaturdaysAI/aiot-agriculture).

## Cuando una mata de patata se riega con datos y no con intuición

En el discurso tecnológico sobre agricultura, el agua suele aparecer como un concepto abstracto: escasez hídrica, eficiencia, sostenibilidad. Pero la diferencia real se mide en decisiones cotidianas. Un productor de patata no necesita una teoría sobre el agua: necesita saber si debe activar el riego esta tarde o esperar hasta mañana.

Ahí es donde encaja CropX. La empresa israelí ha construido una plataforma de agronomía digital basada en sensores de suelo conectados, combinados con datos meteorológicos, imágenes satelitales y modelos agronómicos. Según la documentación pública de la compañía y un reportaje de Amazon sobre su infraestructura en la nube, esos sensores permiten analizar las condiciones del perfil del suelo y traducirlas en recomendaciones concretas de riego: cuándo regar y cuánta agua aplicar (CropX, 2025; Amazon News, 2023).

![](/media/72200ac2ab749cf7.webp)

Sensor de humedad de suelo de CropX. Fuente: CropX (2025)

Lo interesante es que el caso no se queda en la descripción técnica. En la colaboración entre CropX y PepsiCo México, recogida por Amazon, los agricultores de patata que usan la aplicación llegan a consumir hasta un 25 % menos de agua al aplicar “la cantidad adecuada, en el lugar adecuado y en el momento adecuado”. Esa cifra importa porque aterriza el relato: no habla de promesas, sino de un resultado verificable en una cadena agrícola real. Y también deja clara una idea fundamental del AIoT: el ahorro no nace del sensor, sino de la decisión mejorada por el sensor.

## Cuando el riego deja de depender de rutinas fijas: IA para gestionar zonas verdes

Uno de los problemas clásicos del riego es que suele organizarse con criterios rígidos: turnos predefinidos, estimaciones generales o decisiones tomadas con información incompleta. Pero ni una parcela ni una zona verde responden siempre igual. La humedad cambia, el clima se mueve y las necesidades reales del terreno no siempre coinciden con la rutina.

Ahí resulta especialmente revelador el proyecto “AI Based Innovation Project for Automated Smart Management and Smart Irrigation of Green Areas” (ver Tupl, 2024), en el que participa Tupl junto con Smart City Cluster, la Universidad de Málaga, Innova IRV y Cordis SUITE. Según la descripción pública del proyecto, el sistema permite monitorizar y controlar en tiempo real zonas agrícolas y espacios urbanos, integrando sensores, estaciones meteorológicas, satélites y otros dispositivos para traducir datos de campo en recomendaciones concretas de riego y alertas operativas.

Así mismo, la Sociedad Agraria de Transformación Trops contribuyó al desarrollo aportando datos de cultivo recogidos por sus tensiómetros, una colaboración que resultó clave para construir los modelos del sistema. Aunque Trops ya no participa activamente en el proyecto, esa aportación muestra bien cómo un caso agrario real puede servir para entrenar herramientas después aplicables a la gestión hídrica sobre el terreno.

![](/media/2d964ff364e1daed.webp)

Plantación de mangos en Trops. Fuente: Trops (2026)

Lo interesante del caso es que muestra una transformación muy reconocible del trabajo diario. El responsable ya no riega “por calendario”, sino a partir de señales del entorno. El agua deja de aplicarse como costumbre y pasa a administrarse como una decisión contextual y revisable. Ahí es donde el AIoT deja de parecer una capa tecnológica añadida y empieza a funcionar como una nueva forma de criterio agronómico.

## Una viña que se vigila a sí misma: humedad foliar, modelos predictivos y enfermedad

La sanidad vegetal siempre ha sido una carrera contra el tiempo. En viñedo, esperar a ver el problema con claridad suele significar llegar tarde. Por eso resulta tan interesante el modo en que algunas plataformas europeas están abordando la detección y previsión del riesgo.

xFarm Technologies ofrece sensores y módulos de defensa que monitorizan variables decisivas para el desarrollo de patologías. Su sensor de humedad foliar mide el inicio y la duración de la humedad sobre una hoja simulada, y la propia compañía explica que ese dato es crítico para predecir cuándo pueden comenzar determinadas infecciones. Además, en su caso de la Azienda Vitivinicola Enrico Crola (Novara, Piamonte, Italia) se describe un uso muy concreto: sensores en campo, visualización en tiempo real de lluvia, temperatura y humedad foliar, y modelos predictivos que ayudan a estimar el grado de protección del viñedo frente a mildiu y oídio y el mejor momento para tratar (xFarm Technologies, 2021 y 2022).

![](/media/fe521adc01fa9862.webp)

Evaluación del riesgo de ataque de patógenos al viñedo en la finca vitivinícola de Enrico Crola con la tecnología de xFarm. Fuente: xFarm Technologies (2021)

Este caso tiene valor divulgativo precisamente porque no necesita exagerar. No promete milagros. Cuenta algo mucho más útil: desde 2019, una bodega incorpora tecnología para observar mejor su viñedo y decidir con más criterio. Y añade un efecto relevante aunque no cuantificado en porcentaje: gracias al módulo de defensa, la explotación puede estimar mejor el riesgo de enfermedad y decidir con mayor precisión cuándo aplicar tratamientos fitosanitarios. En ciencia aplicada, a veces la fuerza del ejemplo está más en la trazabilidad del proceso que en una cifra redonda.

## El robot no solo cosecha: también genera una nueva capa de información

La robótica agrícola suele narrarse como si el único objetivo fuera sustituir mano de obra. Pero en invernadero está ocurriendo algo más interesante: el robot no solo ejecuta una tarea, también recoge datos mientras la ejecuta.

MetoMotion, empresa israelí especializada en invernaderos, presenta su robot GRoW como una plataforma autónoma para cosecha de tomate con visión 3D, algoritmos de percepción y analítica de cultivo. En su propia documentación explica que el sistema identifica frutos según su grado de maduración, trabaja con apoyo humano limitado y usa el flujo de datos generado por sensores para mejorar la gestión del cultivo. En un artículo corporativo publicado en 2023, la empresa añade dos cifras de impacto muy concretas: el robot puede reducir las horas de trabajo en un 80 % y recortar a la mitad los costes de cosecha y mano de obra (MetoMotion, 2023a, b y c).

La parte más reveladora del relato no es solo la automatización, sino la información que queda después. El robot registra cuánto ha cosechado, dónde lo ha hecho, qué frutos aún no estaban listos y qué filas conviene revisar al día siguiente. Es decir, la máquina no se limita a reemplazar un gesto humano; convierte una tarea repetitiva en una fuente estructurada de inteligencia agronómica.

![](/media/1b123764bfedad55.webp)

Robot recolector de tomate de Metomotion. Fuente: Calcalistech (2019)

## La ganadería también entra en el AIoT: collares, cercas virtuales y comportamiento animal

El imaginario del AIoT agrícola suele centrarse en cultivos, pero la ganadería también está entrando de lleno en esta lógica. Aquí el problema no es detectar humedad del suelo o maduración de un fruto, sino seguir el comportamiento animal con suficiente granularidad como para convertirlo en gestión.

Halter, empresa nacida en Nueva Zelanda, basa su propuesta en collares con GPS y sensores que permiten monitorizar vacas en tiempo real, desplazar rebaños a distancia y establecer cercas virtuales. Su web resume la promesa en términos muy claros: vallado virtual, movimiento remoto y monitorización continua de animales y pastos, 24/7. En su documentación técnica añade dos datos especialmente útiles para un relato riguroso: la compañía describe el uso de algoritmos que entrenan a los animales mediante señales sonoras direccionales y un sistema de posicionamiento GPS de alta precisión para localizar el ganado en la parcela (Halter, s.f.).

![](/media/50ccef594d115f94.webp)

Detalle del smart collar de Halter y manejo del ganado vacuno con el mismo. Fuente: Miller (s.f.)

## Del sensor al código: una capa decisiva en la agricultura inteligente

Cuando se habla de agricultura inteligente, suele pensarse primero en sensores, estaciones meteorológicas, cámaras o plataformas conectadas. Pero entre el dato y la decisión hay otra pieza menos visible y, sin embargo, fundamental: el código.

Ahí es donde la programación se vuelve especialmente útil. No como promesa futurista, sino como herramienta práctica para traducir información del campo en operaciones concretas: una alerta, una recomendación de riego, una estimación sencilla o una automatización pequeña pero valiosa.

Los ejemplos que siguen no buscan representar toda la complejidad de una explotación real. Su interés está en mostrar algo más simple y más cercano: cómo parte de la lógica de la agricultura inteligente también puede empezar con unas pocas líneas de código bien pensadas.

### **Sistema de riego inteligente con Raspberry Pi**

Shahid (2021) presenta un sistema sencillo de riego inteligente compuesto de un ordenador Raspberry Pi, un sensor de humedad de suelo, un relé de un solo canal y una bomba de agua. Cuando el sensor detecta que no hay humedad en el suelo (según sensibilidad ajustada por un potenciómetro) el riego se activa. El esquema del sistema de riego es el siguiente:

![](/media/7d8c21c67d015498.webp)

Esquema de sistema de riego inteligente. Fuente: Shahid (2021)

Y el código Python que lo hace funcionar es:

```
import RPi.GPIO as gp  
 gp.setmode(gp.BOARD)  
 gp.setup(8,gp.IN)  
 gp.setup(12,gp.OUT, initial=gp.LOW)  
 gp.setup(26,gp.OUT,initial=gp.LOW)  
 gp.setup(32,gp.OUT,initial=gp.LOW)
 while True:  
   try:  
     print(not gp.input(8))  
     gp.output(36,gp.input(8))  
     gp.output(32,not gp.input(8))  
     gp.output(12,gp.input(8))  
   except KeyboardInterrupt:  
     gp.cleanup()
```

### **Control de un sensor de luz con MicroPython en la placa STEMinds ESP32 Eduponics mini dev board**

![](/media/ccb2ac01ff805c32.webp)

Placa STEMinds ESP32 Eduponics mini dev board. Fuente: [https://www.mouser.es/new/steminds/steminds-eduponics-mini-esp32-dev-board/?\_gl=1\*1mw7s4o\*\_ga\*dW5kZWZpbmVk\*\_ga\_15W4STQT4T\*dW5kZWZpbmVk\*\_ga\_1KQLCYKRX3\*dW5kZWZpbmVk](https://www.mouser.es/new/steminds/steminds-eduponics-mini-esp32-dev-board/?_gl=1*1mw7s4o*_ga*dW5kZWZpbmVk*_ga_15W4STQT4T*dW5kZWZpbmVk*_ga_1KQLCYKRX3*dW5kZWZpbmVk)

La placa de desarrollo STEMinds ESP32 Eduponics mini dev board tiene una serie de funcionalidades interesantes para su aplicación en agricultura inteligente. Entre ellas se encuentra el control del fotodiodo o sensor de luz BH1750, que sirve para medir la intensidad de luz ambiental en lux. El código MicroPython que se utiliza es el siguiente (ver [https://github.com/STEMinds/micropython-eduponics/blob/main/examples/bh1750.py](https://github.com/STEMinds/micropython-eduponics/blob/main/examples/bh1750.py)):

```
from Eduponics import bh1750
import time
# initialize the bh1750 sensor
light = bh1750.BH1750()
# while true, print the light values in lux
while True:
    print(light.readLight())
    time.sleep(1)
```

Vemos que el código primero inicializa el sensor y después entra en un bucle infinito en el que lee el valor de luz una vez por segundo y lo muestra por pantalla.

### **Sistema inteligente de monitorización de plantas**

Este proyecto es un sistema inteligente de monitorización de plantas que se ha desarrollado utilizando un microcontrolador ESP32 junto con varios sensores como el DHT11, un sensor ultrasónico, un sensor de humedad del suelo y una aplicación Blynk para monitorizar la salud de las plantas de forma remota ([https://github.com/Shishir3D/PlantMonitoringSystem](https://github.com/Shishir3D/PlantMonitoringSystem)).

![](/media/b04cf25eba40949a.webp)

Sistema inteligente de monitorización de plantas. Fuente: [https://github.com/Shishir3D/PlantMonitoringSystem](https://github.com/Shishir3D/PlantMonitoringSystem)

El siguiente código Arduino/C++ muestra cómo se articula técnicamente esa solución: la lectura de distintos sensores, la visualización de datos en una pantalla LCD, el envío de información a Blynk y la activación de respuestas automáticas en función del estado de la planta y de su entorno inmediato.

```
#define BLYNK_TEMPLATE_ID "TMPL6YpEK4W37"
#define BLYNK_TEMPLATE_NAME "switch"

#define BLYNK_FIRMWARE_VERSION        "0.1.0"
#define BLYNK_PRINT Serial
#define APP_DEBUG

#include "BlynkEdgent.h"

#include "DHT.h"
#include <LiquidCrystal_I2C.h>

#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Pins
const int trigPin = 5;
const int echoPin = 18;
const int buzzerPin = 15;
const int moisturePin = 32; //the analog pin
const int motorControlPin = 2;

// LCD
const int lcdColumns = 16;
const int lcdRows = 2;
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);

// Constants
#define SOUND_SPEED 0.034
int soilMoisture;
BlynkTimer timer; //create an object named timer of class BlynkTimer

// Function prototypes
void setup();
void readTemperatureAndHumidity();
void displayTemperatureAndHumidity(float temperature, float humidity);
void ultrasonicSensor();
void moistureSensor();

void setup()
{
  Serial.begin(115200);

  delay(100);
  BlynkEdgent.begin();

  Serial.println(F("DHTxx test!"));

  pinMode(motorControlPin, OUTPUT);
  digitalWrite(motorControlPin, LOW);

  pinMode(moisturePin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  dht.begin();
  lcd.init();
  lcd.backlight();

  timer.setInterval(2000L, moistureSensor); //timer will run every two secs 
  timer.setInterval(2000L, readTemperatureAndHumidity); //timer will run every two secs
  timer.setInterval(2000L, ultrasonicSensor); //timer will run every two secs
  timer.setInterval(5800L, lcdClear); //lcd will get cleared every 5.8 secs
}

void loop() {
  BlynkEdgent.run();
  timer.run();
}

BLYNK_WRITE(V0) {
  int value = param.asInt();
  if (value) {
    digitalWrite(motorControlPin, HIGH);
  } else {
    digitalWrite(motorControlPin, LOW);
  }
}

void readTemperatureAndHumidity() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  displayTemperatureAndHumidity(t, h);

  Blynk.virtualWrite(V2, h); //writes humidity
  Blynk.virtualWrite(V3, t); //write temperature
}

void displayTemperatureAndHumidity(float temperature, float humidity) {
  lcd.setCursor(0, 0);
  lcd.print("H: " + String(int(humidity)) + "%");

  lcd.setCursor(8, 0);
  lcd.print("T: " + String(int(temperature)));
}

void ultrasonicSensor() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distanceCm = duration * SOUND_SPEED / 2;

  Serial.print("Distance (cm): ");
  Serial.println(distanceCm);

  lcd.setCursor(8, 1);
  lcd.print("D :" + String(distanceCm) + "cm");

  if (distanceCm < 5) {
    digitalWrite(buzzerPin, HIGH);
    delay(500);
    digitalWrite(buzzerPin, LOW);
    Serial.println("BEEP!!!");
  } else {
    digitalWrite(buzzerPin, LOW);
  }

  Blynk.virtualWrite(V1, distanceCm);
}

void moistureSensor() {
  soilMoisture = analogRead(moisturePin);
  Serial.println("Soil Moisture : " + String(soilMoisture));

  int moisturePercentage = map(soilMoisture, 4095, 0, 0, 100);
  Blynk.virtualWrite(V4, moisturePercentage);

  lcd.setCursor(0, 1);
  lcd.print("M :" + String(moisturePercentage) + "%");

  if (soilMoisture < 30) { //if soil is dry and moisture level is less than 30 percent
    Serial.println("Soil is DRY!");
    digitalWrite(motorControlPin, LOW); //when soil is dry, motor will stay off
    lcd.setCursor(0, 0);
  } else { //if moisture percentage is more than 30 percent then
    Serial.println("Soil is MOIST!");
    digitalWrite(motorControlPin, HIGH); //when soil is moist, motor is work
    lcd.setCursor(0, 0);
  }
}

void lcdClear() {
  lcd.clear();
}
```

En conjunto, el sistema ilustra de forma clara una lógica central de la agricultura inteligente: captar datos del entorno, interpretarlos y traducirlos en acciones concretas. A pequeña escala, este tipo de integración entre sensorización, conectividad y automatización permite entender cómo muchas soluciones actuales convierten la observación continua en apoyo práctico para la toma de decisiones..

### **Telemetría de tractores**

Tras obtener los datos de telemetría del tractor mediante la API de John Deere, el siguiente paso consiste en prepararlos para su análisis. En Choudhary (2025), este fragmento en Python se plantea precisamente como la fase de procesamiento: convertir los valores brutos en una estructura temporal manejable, limpiar lecturas anómalas, suavizar el ruido de la señal y dejar marcadas posibles anomalías de funcionamiento en parámetros como las revoluciones del motor.

```
# Data processing for telemetry using pandas and numpy
import pandas as pd
import numpy as np
from scipy import signal

def process_telemetry_data(raw_data):
    """Process raw telemetry data: clean, filter, and analyze"""
    df = pd.DataFrame(raw_data['values'])
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df.set_index('timestamp', inplace=True)
    
    # Remove outliers using z-score
    z_scores = np.abs((df['engine_rpm'] - df['engine_rpm'].mean()) / df['engine_rpm'].std())
    df = df[z_scores < 3]
    
    # Apply low-pass filter for noise reduction
    sos = signal.butter(10, 0.1, btype='low', analog=False, output='sos')
    df['filtered_rpm'] = signal.sosfilt(sos, df['engine_rpm'].values)
    
    # Calculate rolling statistics for anomaly detection
    df['rpm_mean_rolling'] = df['filtered_rpm'].rolling(window=10).mean()
    df['anomaly'] = np.where(
        np.abs(df['filtered_rpm'] - df['rpm_mean_rolling']) > df['filtered_rpm'].std(),
        1,
        0
    )
    
    return df

# Example usage (assuming telemetry_data from previous example)
if telemetry_data:
    processed_df = process_telemetry_data(telemetry_data)
    print(processed_df.tail())
    anomalies = processed_df[processed_df['anomaly'] == 1]
    print(f"Detected {len(anomalies)} anomalies")
```

En otras palabras, este código actúa como un puente entre la captura de telemetría del tractor y capas analíticas más avanzadas. Primero organiza los datos en un _DataFrame_ indexado por fecha, después elimina _outliers_ mediante z-score, aplica un filtro paso bajo de Butterworth para reducir ruido y, por último, calcula una media móvil para señalar desviaciones que podrían anticipar incidencias mecánicas o comportamientos anómalos. Así, la telemetría deja de ser una simple colección de lecturas y pasa a convertirse en una base útil para monitorización, alertas y mantenimiento predictivo.

### **Collar inteligente para ganado**

Dentro del proyecto MUUU!: Livestock smart collar, este fragmento corresponde a la capa sensórica encargada de inicializar y actualizar las mediciones biométricas y ambientales del collar. El proyecto, publicado en Hackster por JuanVi (2026), presenta un dispositivo para ganado con comunicación LoRa, geolocalización y monitorización de signos vitales, de modo que el firmware debe capturar de forma periódica variables clave del animal antes de transmitirlas al sistema.

![](/media/b94eee415f10afe3.webp)

Livestock Smart Collar kit. Fuente: JuanVi (2026)

En el código Arduino/C++ siguiente se ve precisamente esa lógica: se declaran los sensores y variables globales, se configura el bus I2C y se inicializan los módulos de frecuencia cardiaca/SpO₂, temperatura corporal y temperatura/humedad ambiental.

```
#include "sensors.h"

// --- Sensors ---
MAX30105 particleSensor;
MAX30205 tempSensor;
Adafruit_SHT31 sht31;

// --- HR vars---
int32_t heartRate;
int8_t validHeartRate;
int32_t spo2;
int8_t validSPO2;

uint32_t irBuffer[100];
uint32_t redBuffer[100];

// --- Temp and Hum vars ---
float bodyTemp;
float ambientTemp;
int humidity;

void sensors_setup() {
    Wire.begin();
    

    // --- MAX30105 ---
    if(!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
        Serial.println(F("MAX30105 no encontrado"));
        while(1);
    }
  particleSensor.setup();
    

    // --- MAX30205 ---
    while(!tempSensor.scanAvailableSensors()) {
        Serial.println(F("No se detecta MAX30205"));
        delay(30000);
    }
    tempSensor.begin();

    // --- SHT31 ---
    if(!sht31.begin(0x44)) {
        Serial.println(F("No se detecta SHT31/SHT30"));
    }
}

void sensors_update() {
    const int bufferLength = 100;

    // --- MAX30105 ---
    for(int i = 25; i < bufferLength; i++) {
        redBuffer[i-25] = redBuffer[i];
        irBuffer[i-25]  = irBuffer[i];
    }

    for(int i = 75; i < bufferLength; i++) {
        while(!particleSensor.available()) particleSensor.check();
        redBuffer[i] = particleSensor.getRed();
        irBuffer[i]  = particleSensor.getIR();
        particleSensor.nextSample();
    }

    maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer,
                                           &spo2, &validSPO2, &heartRate,                                                   &validHeartRate);

    // --- Temp and Hum---
    bodyTemp    = tempSensor.getTemperature();
    ambientTemp = sht31.readTemperature();
    humidity    = sht31.readHumidity();
}
```

En conjunto, este código convierte la placa de sensores en la fuente primaria de datos fisiológicos y de entorno del collar. La rutina sensors\_update() rellena los _buffers_ ópticos, ejecuta el cálculo de frecuencia cardíaca y saturación de oxígeno, y actualiza además la temperatura corporal, la temperatura ambiente y la humedad, dejando esas lecturas listas para que el resto del sistema las empaquete y las envíe por LoRa junto con la posición GPS. Así, esta parte del _firmware_ actúa como el puente entre la adquisición física de señales en el animal y la telemetría inteligente que da sentido al _smart collar_ dentro de un escenario de ganadería de precisión.

## Lo que el AIoT cambia de verdad en el campo

Los casos que se han expuesto a lo largo de este artículo tienen algo en común. No muestran un campo convertido en laboratorio futurista, sino un conjunto de decisiones muy terrenales que se vuelven más precisas: regar mejor, tratar mejor, cosechar mejor, mover mejor un rebaño. Esa es la transformación real.

Por supuesto, quedan límites. La conectividad sigue siendo desigual en muchas zonas rurales. La inversión inicial no siempre es asumible para cualquier explotación. Y la integración entre sensores, software, maquinaria y criterios agronómicos todavía está lejos de ser perfecta. Pero incluso con esas limitaciones, la dirección es clara: la agricultura se está moviendo desde la observación episódica hacia la monitorización continua, y desde la reacción tardía hacia la intervención informada.

Quizá esa sea la mejor manera de entender el AIoT en agricultura: no como una colección de código o dispositivos, sino como una nueva forma de escuchar lo que ocurre en el campo. Y, sobre todo, de responder con más criterio cuando el campo habla.

![](/media/0583a9004aedcdc5.webp)

Fuente: Xenber (2025)

## Referencias

Amazon News (2023). _How agricultural firm CropX uses AWS cloud computing for farming_. [https://www.aboutamazon.com/news/aws/how-cropx-uses-aws-cloud-computing-for-farming](https://www.aboutamazon.com/news/aws/how-cropx-uses-aws-cloud-computing-for-farming)

Calcalistech (2019). _Tomato-Picking Robot Developer MetoMotion Raises $1.5 Million_. [https://www.calcalistech.com/ctech/articles/0,7340,L-3767459,00.html](https://www.calcalistech.com/ctech/articles/0,7340,L-3767459,00.html)

Choudhary, A. (2025). _John Deere API: Python Scripts for AgTech Farm Equipment Telemetry._ [https://johal.in/john-deere-api-python-scripts-for-agtech-farm-equipment-telemetry/](https://johal.in/john-deere-api-python-scripts-for-agtech-farm-equipment-telemetry/)

CropX (2025). _Digital Agronomy Platform_. [https://cropx.com/](https://cropx.com/)

Halter (s.f.). _Virtual fencing and pasture management_. [https://www.halterhq.com/](https://www.halterhq.com/)

[https://github.com/Shishir3D/PlantMonitoringSystem](https://github.com/Shishir3D/PlantMonitoringSystem)

[https://github.com/STEMinds/micropython-eduponics/blob/main/examples/bh1750.py](https://github.com/STEMinds/micropython-eduponics/blob/main/examples/bh1750.py)

[https://s3.amazonaws.com/s3-biz4intellia/images/applications-of-iot-in-agriculture.jpg](https://s3.amazonaws.com/s3-biz4intellia/images/applications-of-iot-in-agriculture.jpg)

JuanVi (2026). _MUUU!: Livestock smart collar_. [https://www.hackster.io/JuanVi/muuu-livestock-smart-collar-70614e](https://www.hackster.io/JuanVi/muuu-livestock-smart-collar-70614e)

Majeed, Y., Fu, L., & He, L. (2024). _Editorial: Artificial intelligence-of-things (AIoT) in precision agriculture_. Frontiers in Plant Science, 15, 1369791. DOI: 10.3389/fpls.2024.1369791.

MetoMotion (2023a)._Greenhouse Robotic Worker_. [https://metomotion.com/robotic-worker/](https://metomotion.com/robotic-worker/)

MetoMotion (2023b). _Intelligent Agricultural Robotics for Speed and Accuracy_. [https://metomotion.com/technology/](https://metomotion.com/technology/)

MetoMotion (2023c). _Robot tomato farmers could help solve Israel’s agricultural labor shortage_. [https://metomotion.com/greenhouse-innovation/robots-solve-agricultural-crisis/](https://metomotion.com/greenhouse-innovation/robots-solve-agricultural-crisis/)

Miller, T. (s.f.). _Embracing Innovation: Journey with Halter’s Virtual Fencing Technology_. [https://www.grazinglands.org/education/embracing-innovation](https://www.grazinglands.org/education/embracing-innovation)

Rehman, A., Saba, T., Kashif, M., Fati, S., Bahaj, S. y Chaudhry, H. (2022). _A Revisit of Internet of Things Technologies for Monitoring and Control Strategies in Smart Agriculture_. Agronomy. 12. 127. 10.3390/agronomy12010127.

Shahid, M, (2021_). Smart Irrigation system Raspberry Pi_. Techatronic. [https://techatronic.com/smart-irrigation-system-raspberry-pi/](https://techatronic.com/smart-irrigation-system-raspberry-pi/)

Trops (2026). _Sobre Trops_. [https://www.trops.es/sobre-trops/](https://www.trops.es/sobre-trops/)

Tupl (2024). _AI Based Innovation Project for Automated Smart Management and Smart Irrigation of Green Areas_. [https://tupl.com/ai-based-innovation-project-for-automated-smart-management-and-smart-irrigation-of-green-areas/](https://tupl.com/ai-based-innovation-project-for-automated-smart-management-and-smart-irrigation-of-green-areas/)

Xenber (2025). _Diversify into Artificial Intelligence of Things (AIoT). Evolution of Internet of Things (IoT)_. [https://xenber.com/aiot-evolution/](https://xenber.com/aiot-evolution/)

xFarm Technologies (2021). _Digital Viticulture – Az. Vit. Enrico Crola_. [https://www.xfarm.ag/en/blog-posts/viticoltura-digitale-az-vit-enrico-crola](https://www.xfarm.ag/en/blog-posts/viticoltura-digitale-az-vit-enrico-crola)

xFarm Technologies (2022). _How to improve your crop protection with the Defense module of xFarm_. [https://www.xfarm.ag/en/blog-posts/come-migliorare-la-protezione-delle-tue-colture-con-il-modulo-difesa-di-xfarm](https://www.xfarm.ag/en/blog-posts/come-migliorare-la-protezione-delle-tue-colture-con-il-modulo-difesa-di-xfarm)
