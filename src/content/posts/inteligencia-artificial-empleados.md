---
title: "HUMANDS: INTELIGENCIA ARTIFICIAL PARA EMPLEADOS"
description: Donostia. 2021 Inteligencia Artificial para empleados Bilbao 2021.
  Pablo Martín García (pablo) y Omar Calderón (Omar Calderon). Las técnicas de
  inteligencia artificial aplicadas a empleados cubren una creciente necesidad
  dado…
pubDate: 2021-12-31
author: Miguel Guerrero
category: AI for good
kind: project
tags:
  - Random Forest
  - Tabular
  - Trabajo Decente y Crecimiento Económico
image: /media/fb0bf814a7105e72.webp
imageAlt: "HUMANDS: INTELIGENCIA ARTIFICIAL PARA EMPLEADOS"
legacyPath: /2021/12/31/inteligencia-artificial-empleados/
sourceUrl: https://saturdays.ai/2021/12/31/inteligencia-artificial-empleados/
sourceId: 4831
language: es
draft: false
---

[Donostia](https://saturdays.ai/donostia/). 2021

## **Inteligencia Artificial para empleados**

Bilbao 2021. [Pablo Martín García](https://www.linkedin.com/in/pablomartingar/) ([pablo](https://medium.com/u/a7380d3261bc?source=post_page-----b7ad69e6e2f-----------------------------------)) y [Omar Calderón](https://www.linkedin.com/in/adolfoomarcalderon/) ([Omar Calderon](https://medium.com/u/d27eba410bb3?source=post_page-----b7ad69e6e2f-----------------------------------)). Las técnicas de inteligencia artificial aplicadas a empleados cubren una creciente necesidad dado lo costoso en tiempo y dinero que es conseguir buenos colaboradores para las empresas, además de eso la formación que tienen que darles para su buen desempeño dentro de la organización. Por ello, retener estos talentos se ha vuelto un gran reto y a la vez una necesidad, que no esta siendo nada fácil de enfrentar, las personas hoy en día ya no tienden a quedarse donde no están cómodas y no se sientan valoradas.

Las altas rotaciones de empleados se han vuelto normales en muchas empresas. Como ejemplo, en los sectores tecnológico y turístico, 75% de sus empleados a pesar de tener un puesto fijo, están en búsqueda activa de nuevas ofertas. Lo que representa un gran problema en términos de costes, ambiente laboral y eficiencia. Cuando se tiene un entorno laboral así, los otros empleados tienden a hacer lo mismo, ya que eso da sensación de inestabilidad y provoca atrasos en el trabajo.

> Actualmente, uno de los problemas más graves a los que se enfrentan las empresas es la **fuga de talento**. Y, aunque esta migración de talento humano afecta a todas las empresas y todos los sectores, a día de hoy, en nuestro país, los sectores que se ven más perjudicados por este motivo son el tecnológico y el turístico. Según varias encuestas realizadas a lo largo de 2020, más del 75% de los empleados de estos sectores afirma que, a pesar de tener un puesto de trabajo, sigue buscando activamente otras ofertas de empleo, problema que intentaremos abordar con técnicas de inteligencia artificial.([https://interimgrouphr.com/blog/gestion-talento/fuga-talento-causas-soluciones/](https://interimgrouphr.com/blog/gestion-talento/fuga-talento-causas-soluciones/))

Actualmente en España 9 de cada 10 empleados no se sienten cómodos en su actual puesto de trabajo y esto hace que las organizaciones tengan que replantearse estrategias para mejorar las condiciones de sus colaboradores, pero los criterios para mejorar las mismas no deben ser elegidos por intuición, como se ha hecho toda la vida, lo que ha llevado a estos resultados actuales.

> Uno de los motivos por los que las organizaciones pierden a sus empleados es la insatisfacción laboral. Por desgracia y según los datos que maneja [Bizneo HR](https://www.bizneo.com/), **casi 9 de cada 10 españoles son infelices en su puesto de trabajo**. Y, ¿cuáles son las razones de este descontento? Entre otros, la imposibilidad de prosperar en la compañía y la dificultad para conciliar entre vida laboral y familiar. Principalmente.([https://www.bizneo.com/blog/como-evitar-la-fuga-de-talentos-en-tu-empresa/](https://www.bizneo.com/blog/como-evitar-la-fuga-de-talentos-en-tu-empresa/))



## **Objetivos:**

-   Predecir el verdadero nivel de desgaste de los empleados dentro de una organización mediante Inteligencia Artificial.
-   Darle a la empresa la información necesaria y precisa para que realice los ajustes y cambios necesarios para reducir el desgaste y así reducir la fuga de talento.  


##   
**Datos:**

[**IBM HR Analytics Employee Attrition & Performance**](https://www.kaggle.com/pavansubhasht/ibm-hr-analytics-attrition-dataset)

Es un dataset de IBM en el cual recopilaron datos de 1470 de sus empleados ideal para aplicar técnicas de Inteligencia Artificial. En este dataset existen diferentes tipos de columnas, que van desde su edad, salario, satisfacción, etc.



## **Exploración de datos:**

Vistazo a las primeras filas:

![](/media/fb0bf814a7105e72.webp)

Descripción de columnas:

**AGE**: Valor numérco

**ATTRITION**: Empleado dejando la empresa (desgaste) (0=no, 1=yes)

**BUSINESS TRAVEL**: (1=No viaje, 2=Viaja frecuentemente, 3=Viaja ocacionalmente)

**DAILY RATE**: Valor numérico — Nivel salarial

**DEPARTMENT**: (1=RRHH, 2=I&D, 3=Ventas)

**DISTANCE FROM HOME**: Valor numérico — Distancia desde casa

**EDUCATION**: Valor numérico

**EDUCATION FIELD**: (1=RRHH, 2=Ciencias, 3=Marketing, 4=Ciencias Médicas, 5=Otros, 6=Técnico)

**EMPLOYEE COUNT**: Valor numérico

**EMPLOYEE NUMBER**: Valor numérico — ID del Empleado

**ENVIROMENT SATISFACTION**: Valor numérico — Satisfacción con el ambiente

**GENDER**: (1=Femenino, 2=Masculino)

**HOURLY RATE**: Valor numérico — Salario por hora

**JOB INVOLVEMENT**: Valor numérico — Involucramiento en el trabajo

**JOB LEVEL**: Valor numérico — Nivel de trabajo

**JOB ROLE**: (1=Recepción, 2=RRHH, 3=LAB Técnico, 4=Manager, 5= Director de Gerencia, 6= Director de Investigación, 7= Científico de Investigación, 8=Ejecutivo de Ventas, 9= Representante de Ventas)

**JOB SATISFACTION**: Valor numérico — Satisfacción con el Trabajo

**MARITAL STATUS**: (1=Divorciado, 2=Casado, 3=Soltero)

**MONTHLY INCOME**: Valor numérico — Salario Mensual

**MONTHY RATE**: Valor numérico — Ratio Mensual

**NUMCOMPANIES WORKED**: Valor numérico — Número de Empresas Trabajadas

**OVER 18**: (1=Si, 2=No)

**OVERTIME**: (1=No, 2=Si)

**PERCENT SALARY HIKE**: Valor numérico — Porcentaje de Incremento Salarial

**PERFORMANCE RATING**: Valor numérico — Ratio de Desempeño

**RELATIONS SATISFACTION**: Valor numérico — Satisfacción de Relaciones

**STANDARD HOURS**: Valor numérico — Horas Estándar

**STOCK OPTIONS LEVEL**: Valor numérico — Opciones de Participaciones

**TOTAL WORKING YEARS**: Valor numérico — Total de Años Trabajados

**TRAINING TIMES LAST YEAR**: Valor numérico — Horas de Entrenamiento

**WORK LIFE BALANCE**: Valor numérico — Equilibrio Vida Laboral — Personal

**YEARS AT COMPANY**: Valor numérico — Total de Años en la Empresa

**YEARS IN CURRENT ROLE**: Valor numérico — Años en el Puesto Actual

**YEARS SINCE LAST PROMOTION**: Valor numérico — Última Promoción

**YEARS WITH CURRENT MANAGER**: Valor numérico — Años con el Gerente Actual

**No existen valores nulos en el dataset:**

![](/media/e99d25d142ef3b94.webp)

**Matriz de correlaciones:**

![](/media/d5b38ed745a4f7fb.webp)

Matriz de correlaciones

Como podemos ver, dentro de la matriz, las variables que más correlacionas tienen entre sí son las variables relacionadas con tiempo, como la cantidad de años de experiencia, edad, etc. Entre sí y con variables como salario y nivel del puesto de trabajo.

![jdjjdjddjd](/media/ad7a3611456c16bc.webp)

Nivel de educación y edad

![](/media/9802de712c0f95bc.webp)

Años de experiencia y nivel de trabajo

![](/media/7832df7a8e825210.webp)

Ratio de desempeño y subida de salario

En el siguiente plot podemos observar la evolución del desgaste de los empleados dentro de la organización, viendo desde el que tiene 40 años en la empresa (que es el más antiguo) hasta los que acaban de entrar que tienen 0 años.

![](/media/7cbefcd2375246e5.webp)

##   
**Features engineering:**

Vamos a trabajar profundamente con nuestra variable dependiente que en este caso sería **Attrition.** Esta variable es binaria, consta con dos valores que son YES y NO. Para lo que queremos hacer nosotros que es medir y predecir el verdadero nivel de desgaste de un empleado no nos sirve, esto debemos transformalo a probabilidades. Sabemos de algunos modelos de clasificación que se ajustan a nuestras necesacidades, pero vamos a hacer la comparación entre ellos a ver cual nos da mejor rendimiento con este tipo de datos.

RandomForestClassifier {0: {'train\_time': 0.4280989170074463, 'pred\_time': 0.05773425102233887, 'acc\_train': 1.0, **'acc\_test': 0.9271255060728745**, 'f\_train': 1.0, 'f\_test': 0.923076923076923}}  

AdaBoostClassifier {0: {'train\_time': 0.36793017387390137, 'pred\_time': 0.08242297172546387, **'acc\_train': 0.9259634888438134**, 'acc\_test': 0.9109311740890689, 'f\_train': 0.9255102040816326, 'f\_test': 0.9083333333333333}}  

GaussianNB {0: {'train\_time': 0.008366107940673828, 'pred\_time': 0.025140047073364258, 'acc\_train': 0.8078093306288032, **'acc\_test': 0.771255060728745**, 'f\_train': 0.8265446224256293, 'f\_test': 0.7911275415896488}}

Basándonos en el resultado del accuracy\_test, vamos a continuar trabajando con Random Forest Classifier, que además de haber tenido mejor rendimiento, consta con las características de _Feature Importances_ y _Predict Proba._

Utilizando _Feature Importances_ podemos apreciar cuales son las variables que según el modelo son las que más influyen en su predicción.

![](/media/d12e8412226d1610.webp)

Feature Importances by Random Forest Classifier

##   
**Ampliación del dataset:**

![](/media/89eca7bb7ae631d8.webp)

Yes 16%, No 84%

El dataset esta desbalanceado, 16% de los 1470 rows son para personas con desgaste (Attrition), para que el modelo de aún mejor predicciones y no este sesgado, vamos a ampliar el dataset utilizando el método SMOTE.

Shape of X before SMOTE: (1470, 51)  
Shape of X after SMOTE: (2466, 51)  

Balance of positive and negative classes (%):  
No     50.0  
Yes    50.0

Después de entrenar el modelo Random Forest Classifier con el dataset ampliado, vamos a ver cuales son sus predicciones en probabilidades para cada columna de nuestro dataset.

![](/media/39811a658a4a88fb.webp)

Va de 0 a 1, siendo 1 desgaste total

0       0.72  
1       0.03  
2       0.93  
3       0.20  
4       0.08  
        ...   
2461    0.99  
2462    1.00  
2463    0.99  
2464    0.99  
2465    0.95

Con la columna de Attrition transformada a probabilidades podemos ver con exactitud el desgaste en cada fila y asi medir con precisión que tanto afecta en el desgaste los cambios y ajustes que la empresa haga en las condiciones de sus empleados.

##   
**Cambios y ajustes que la empresa puede hacer para reducir el desgaste en sus empleados:**

En esta parte estamos tomando en cuenta las variables en las cuales la empresa puede intervenir directamente, como salario, sobretiempos, etc. Las que son personales no, porque ya requeriría de consentimientos de terceros o gestiones más complejas.

Como primer experimento, hemos decidido medir como cambiaría el nivel de desgaste dentro de la empresa efectuando ajustes salariales de 10, 20, 30, 40, 50, 60, 70, 80 y 90%.

Para compartir los cambios en el nivel de desgaste a medida que se va aumentando el salario, hemos hecho los siguientes histogramas.

![](/media/7ed1604fb34da718.webp)

Incremento de 10% de Monthly Income

![](/media/15590ca7e39f7ab9.webp)

Incremento de 20% de Monthly Income

![](/media/1db14834c5b552f3.webp)

Incremento de 30% de Monthly Income

![](/media/420a893e4ff3dc4b.webp)

Incremento de 40% de Monthly Income

![](/media/be0f0a7fad0dc390.webp)

Incremento de 50% de Monthly Income

![](/media/fc6a5c40ab343bc2.webp)

Incremento de 60% de Monthly Income

![](/media/9de91e7bd599e94e.webp)

Incremento de 70% de Monthly Income

![](/media/84e53bd637354ab8.webp)

Incremento de 80% de Monthly Income

![](/media/5b38981856347c26.webp)

Incremento de 90% de Monthly Income

Hemos podido ver que la cantidad de personas sin desgaste aumenta, el punto es que aumenta muy poco para la gran inversión que esta haciendo la empresa, lo que en la práctica no sería factible.

Por eso hemos escogido otra forma de experimentar, en vez de trabajar con todos los empleados, vamos a trabajar de forma individual, con dos casos que tienen desgaste y dependiendo de su condición específica, vamos a realizar los ajustes necesarios.

Como primer candidato hemos tomado un row con Attrition alto y le hemos puesto _candidate\_1_

candidate\_1\['Attrition'\]**0.76**

Hemos realizado unos cambios en algunos valores para ver como cambia su nivel de desgaste, hemos elegido _MonthlyIncome_ y _OverTime._ En este caso hemos aumentado su salario mensual un 10% y le hemos quitado que tenga que hacer sobretiempos.

candidate\_1\['MonthlyIncome'\] = candidate\_1\['MonthlyIncome'\] \* 1.1  
2230.8candidate\_1\[‘OverTime\_No’\] = 1  
candidate\_1\['OverTime\_Yes'\] = 0

Cambiando estos valores y pasandolo como input por el Random Forest Classifier, podemos ver la nueva probabilidad de Attrition que nos da.

prob\_candidate\_1 = clf.predict\_proba(candidate\_1)\[:,1\]**0.47**

Considerablemente ha bajado mucho su nivel de desgaste, haciéndolo ya estar en un nivel sano.

Realizaremos un segundo ejemplo, esta vez con un empleado que no esté haciendo horas extra.

Ejemplo con el candidato 2

candidate\_2\['Attrition'\] **0.76**          

Para este segundo ejemplo, hemos elegido _MonthlyIncome_ y _StockOptionLevel._ En este caso hemos aumentado su salario mensual un 10% y le hemos dado una opción de participación de nivel 2 dentro de la empresa, para que se sienta partícipe.

candidate\_2\['MonthlyIncome'\] = candidate\_2\['MonthlyIncome'\] \* 1.1  
3256.00candidate\_2\['StockOptionLevel'\] = 2

Cambiando estos valores y pasandolo como input por el Random Forest Classifier, podemos ver la nueva probabilidad de Attrition que nos da.

prob\_candidate\_2 = clf.predict\_proba(candidate\_2)\[:,1\]**0.49**

También ha dejado de estar en la zona de desgaste con estos ajustes que están dentro de las manos de la empresa.

##   
**Conclusiones**

Trabajando este caso nos hemos dado cuenta que solamente predecir Si y No en el desgaste no es suficiente, ya que no se estaría midiendo que tan desgastada está una persona, ni las cosas que podrían cambiar su estado y en que medida.

Por eso hemos elegido abordar el proyecto de una forma más proactiva y que pueda ayudar a cambiar la situación de las personas antes de que sea tarde y también ayudar a tomar estas decisiones de forma informada.

Con esta forma de abordar el proyecto hemos validado nuestra hipótesis de que es si es posible combatir el desgaste y reducir la fuga de talento si se aplican los cambios necesarios y que estos mismos están dentro de las manos de la empresa. Dentro de lo que hemos podido ver en los resultados, el salario cambia un poco el nivel de desgaste, pero no es definitivo, hay que analizar la situación de cada colaborador de forma individual.

Los siguientes pasos serían medir de forma más eficiente cuales variables afectan en medida exacta a los empleados y volver a aplicar Inteligencia Artificial para obtener una predicción más precisa.

[Aquí](https://github.com/pabsmartin/HUMANDS) en repositorio del proyecto.

Gracias.[Saturdays.AI](https://medium.com/saturdays-ai?source=post_sidebar--------------------------post_sidebar--------------)

## Repositorio

En el siguiente repositorio se encuentra el código usado para desarrollar esa aplicación: https://github.com/SaturdaysAI/Projects/tree/master/Donostia/Donostia2021/HUMANDS-master

## **¡Más Inteligencia artificial!**

La misión de [Saturdays.ai](https://www.saturdays.ai/) es hacer la inteligencia artificial más accesible (_#ai4all_) mediante cursos y programas intensivos donde se realizan proyectos para el bien (_#ai4good_).

Si quieres aprender más inteligencia artificial únete a nuestra comunidad en [community.saturdays.ai](http://community.saturdays.ai/) o visítanos en nuestra web [www.saturdays.ai](https://www.saturdays.ai/) ¡te esperamos!

Infórmate de nuestro master sobre inteligencia artifical en [https://saturdays.ai/master-ia-online/](https://saturdays.ai/master-ia-online/)
