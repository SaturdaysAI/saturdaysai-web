---
title: "De proyecto existente a producto digital: ¿Cómo construí la web app de
  Energía en Acción?"
description: "Cómo el proyecto Energía en Acción encontró su espacio digital:
  una plataforma para conectar estudiantes, mentores y organizaciones alrededor
  de proyectos compartidos."
pubDate: 2026-03-18
author: Adrian Algar
category: Build with AI
kind: article
tags:
  - App web
  - Codex
  - Desarrollo web
  - Energía en Acción
  - estudiantes
  - IA
  - matching
  - proyectos
image: /media/e88a436f59228932.webp
imageAlt: "De proyecto existente a producto digital: ¿Cómo construí la web app
  de Energía en Acción?"
legacyPath: /2026/03/18/de-proyecto-existente-a-producto-digital-como-construi-la-web-app-de-energia-en-accion/
sourceUrl: https://saturdays.ai/2026/03/18/de-proyecto-existente-a-producto-digital-como-construi-la-web-app-de-energia-en-accion/
sourceId: 11664
language: es
draft: false
---

En este caso, la idea no nació de cero. **Energía en Acción** ya existía como proyecto y lo que faltaba era una **capa digital** que ayudara a ordenar mejor su funcionamiento.

Ahí es donde entró la web app: no como una simple página de apoyo, sino como una **herramienta útil para el día a día**, pensada para dar más claridad a estudiantes, mentores y organizaciones.

![bannerEEA](/media/e88a436f59228932.webp)

#### **EL PUNTO DE PARTIDA**

Desde el principio lo tenía claro: no quería una web que solo explicara el proyecto hacia fuera, sino una herramienta que también sirviera hacia dentro.

Si una estudiante descubre un proyecto y empieza a participar, esa experiencia debía continuar dentro del mismo sistema. En otras palabras, el proyecto ya existía; lo que faltaba era una web app capaz de darle estructura operativa.

![home](/media/71a0b0996658c148.webp)

#### **¿ QUÉ HACE LA APP ?**

La web app está pensada para conectar **estudiantes**, **mentores** y **organizaciones**. Desde el principio tenía claro que no todos debían recorrer la plataforma de la misma manera, porque cada uno llega con una necesidad distinta.

En el caso de las estudiantes, el recorrido va del registro al perfil y de ahí a la exploración de proyectos. Cuando una estudiante aplica, la app deja de ser solo un catálogo y empieza a funcionar como un espacio de seguimiento.

En el caso de los mentores, la lógica es otra. No entran tanto para descubrir como para acompañar, ver en qué proyectos participan, detectar interés y compartir actualizaciones sin depender de canales externos.

La plataforma también contempla el papel de las organizaciones, aunque en esta primera versión la experiencia principal esté más centrada en estudiantes y mentores.

![catalogo](/media/bb3f4ced87afbb11.webp)

#### **LAS HERRAMIENTAS QUE UTILICÉ**

Para construir la web app trabajé con **Next.js**, **React**, **TypeScript**, **Prisma** y **MySQL**. Además, utilicé **Zod** para validaciones, **JWT** para la sesión y **Tailwind CSS** para la interfaz.

Más que acumular herramientas, lo que buscaba era una base técnica estable para poder trabajar con **roles**, **datos**, **mensajería** y distintos recorridos dentro de la misma aplicación.

#### **CÓMO PLANTEÉ LA ARQUITECTURA**

Desde el principio intenté que el proyecto estuviera **ordenado**. Quería evitar una app donde todo acabara mezclado y cada nueva funcionalidad complicara más la anterior.

Por eso mantuve una separación clara entre la **parte visual**, la **lógica de la aplicación**, la **API** y el **modelo de datos**. Eso me permitió avanzar con más control y construir un MVP pequeño, pero bien estructurado.

#### **AUTENTICACIÓN, SESIÓN Y ROLES**

**AUTENTICACIÓN, SESIÓN Y ROLES**

En una aplicación como esta, iniciar sesión no era lo más importante. El verdadero reto estaba en decidir bien qué puede hacer cada persona y en qué contexto.

La sesión se resuelve con **JWT** guardado en una cookie httpOnly, lo que permite validar accesos y proteger rutas según el rol.

Puede parecer un detalle pequeño, pero en una plataforma con varios perfiles este tipo de control es lo que hace que la experiencia se sienta coherente de verdad.

Una de las partes más importantes era proteger bien los recorridos según el perfil. Este fragmento resume cómo la app comprueba la sesión y redirige a cada usuario a su espacio correcto.

				`const PROTECTED = ["/dashboard", "/profile", "/projects/new"];  export async function proxy(req: NextRequest) {   const { pathname } = req.nextUrl;   const needsAuth = PROTECTED.some(     (p) => pathname === p || pathname.startsWith(p + "/")   );   if (!needsAuth) return NextResponse.next();    const session = await readSession(req);   if (!session) {     return NextResponse.redirect(new URL("/auth/login", req.url));   }    if (pathname.startsWith("/dashboard/student") && session.role === "mentor") {     return NextResponse.redirect(new URL("/dashboard/mentor", req.url));   }    return NextResponse.next(); }`


Puede parecer una lógica pequeña, pero este tipo de control es justo lo que evita recorridos incoherentes cuando conviven varios roles dentro del mismo producto.

#### **LO IMPORTANTE: LOS FLUJOS REALES**

Más allá de la parte técnica, lo que me interesaba era que la app contara una historia de uso clara.

En el caso de las estudiantes, el recorrido va del acceso al perfil, del perfil al catálogo y de ahí al dashboard. La idea era evitar esa sensación de “he aplicado y ya no sé qué pasa”. Por eso el panel no funciona solo como resumen, sino como un espacio donde se recupera contexto.

![inicio](/media/fb1619b3af49cda5.webp)

En el caso de los mentores, el flujo está más orientado al **acompañamiento**. Entran para ver proyectos, detectar interés, abrir conversaciones y mantener el seguimiento desde un mismo lugar.

Su dashboard está pensado más como una **superficie de trabajo** que como una página informativa.

![mentor](/media/75f35127f7b00c62.webp)

Luego está la propia **ficha de proyecto**, que actúa como unidad central dentro de la plataforma. Ahí se concentra el contexto del trabajo: descripción, estado, skills y acciones disponibles según el rol.

![project](/media/5b79cb21d07fc38c.webp)

#### **MENSAJERÍA Y COMUNICACIÓN EN LA APP**

Otra parte importante era evitar que la colaboración se rompiera justo después de empezar. Si todo acababa dependiendo de mensajes fuera de la plataforma, la app perdía parte de su valor.

Por eso integré un sistema de **mensajería interna**, pero conectado al contexto real del proyecto y no a una lógica genérica de contacto entre usuarios.

Además, la parte de **comunicados** la resolví reutilizando esa misma base de mensajería, con una distinción interna para tratar ciertas actualizaciones como mensajes de proyecto. Era una solución simple, pero muy útil para esta fase.

![chat](/media/51c30ca0c187d3f6.webp)

En la parte de mensajería opté por una solución bastante pragmática: reutilizar la infraestructura de mensajes para enviar comunicados vinculados a un proyecto concreto.

				``const bodyWithFlag = `[BC:P${projectId}] ${parsed.data.message}`;  await prisma.messages.createMany({   data: applications.map((app) => ({     sender_id: BigInt(session.uid),     receiver_id: app.student_id,     body: bodyWithFlag,   })), });  return NextResponse.json({ ok: true, sent: applications.length });``


Eso me permitió resolver una necesidad real del MVP sin levantar un sistema paralelo solo para actualizaciones internas.

#### **EL ONBOARDING ES PARTE DEL PRODUCTO**

En un proyecto con varios roles, no quería que la gente tuviera que deducir por intuición cómo usar la plataforma.

Por eso añadí recorridos de **onboarding** en pantallas clave como los dashboards y el catálogo de proyectos. No lo veía como un extra estético, sino como una parte importante de la experiencia.

![onboarding](/media/406cd92b07972215.webp)

#### **LOS PROBLEMAS REALES QUE APARECIERON**

Como suele pasar, la parte más interesante no estuvo solo en construir pantallas, sino en conseguir que la aplicación respondiera bien cuando empezó a comportarse como un sistema real.

Uno de los focos fue la **robustez general**: autenticación, sesiones, protección por rol y respuesta de endpoints sensibles. No me interesaba solo que la app se viera bien, sino que también fuera fiable al ejecutarla.

También aparecieron ajustes más concretos, como el comportamiento del sistema cuando la base de datos no estaba disponible. Ahí me interesaba que la app degradara bien y que el diagnóstico fuera claro.

Otro ajuste importante apareció al pensar en el sistema funcionando de verdad, no solo en local con todo perfecto. El healthcheck pasó a responder de forma clara cuando la base de datos no está disponible.

				``export async function GET() {   try {     const [{ now }] =       await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() AS now`;      return Response.json({ ok: true, database: "up", dbTime: now });   } catch {     return Response.json(       { ok: false, database: "down", error: "Database unavailable" },       { status: 503 },     );   } }``


No es una funcionalidad visible para el usuario final, pero sí una de esas decisiones que marcan la diferencia cuando toca diagnosticar, desplegar y mantener una aplicación.

#### **CÓMO ME AYUDÓ CODEX DURANTE EL DESARROLLO**

Codex fue una ayuda real en varias fases del proyecto. Me sirvió para revisar la estructura de la app con más perspectiva, mapear rutas, componentes y lógica compartida, y detectar ajustes con más claridad.

También me ayudó en la parte más práctica del desarrollo, generando fragmentos de implementación y desbloqueando enfoques de código que me permitieron avanzar más rápido.

Y además tuvo un papel importante al final: revisar, validar y transformar parte de la base técnica del proyecto en documentación y explicaciones más fáciles de comunicar.

Y para quien quiera ir un paso más allá y montarlo por su cuenta, también dejaré enlazado [un artículo donde explico cómo instalar la aplicación paso a paso.](https://saturdays.ai/2025/09/25/descubre-como-conseguir-el-github-student-developer-pack-y-usar-codex-en-vs-code/) 

#### **QUÉ VALIDÉ ANTES DE DARLO POR BUENO**

![](/media/540ad91f64b76219.webp)

Antes de cerrar esta fase del proyecto, revisé la aplicación como si fuera a entregarla para una validación real. Pasé **lint**, revisé el **build** de producción y comprobé el comportamiento de los endpoints más importantes.

El resultado fue bueno a nivel de aplicación: compila, responde y mantiene bien su estructura principal. Para tener funcionalidad completa de extremo a extremo, eso sí, el entorno de datos tenía que estar correctamente levantado.

#### **LO MEJOR DEL PROYECTO**

Lo que más me gusta de la web app de Energía en Acción es que no se siente como una suma de pantallas desconectadas.

Tiene una narrativa clara: entras, descubres proyectos, participas, hablas con otras personas y sigues el contexto desde un mismo lugar.

#### **CONCLUSIÓN**

Construir esta web app fue una forma de dar estructura digital a un proyecto que ya tenía una base real.

Más que crear una web bonita, se trataba de construir una herramienta útil para que estudiantes, mentores y organizaciones pudieran moverse con más claridad y menos fricción.

## Demo de la App de Energianaccion
