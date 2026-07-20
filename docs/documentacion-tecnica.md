# Documentación técnica y funcional — Sueco con Sophie

> Documento para que otra IA (o desarrollador) entienda la plataforma sin leer el código. Describe qué hace, cómo está construida y cómo diseñar nuevas funciones sin romper lo existente.

---

## 1. Resumen general

- **Qué es:** una plataforma web de aprendizaje de **sueco para hispanohablantes** (contexto SFI: Svenska för invandrare), niveles **A, B, C y D**. Marca: *Sueco con Sophie*.
- **Objetivo:** que el alumno domine cada nivel en las cuatro destrezas (leer, escribir, hablar/escuchar) más gramática, vocabulario, prueba de ciudadanía y una prueba de nivel.
- **Tipo:** **SaaS educativo** por suscripción (pago mensual o trimestral vía Stripe). ~120 alumnos activos.
- **Cómo funciona (alto nivel):** aplicación de una sola página (SPA) en JavaScript puro. El **contenido** vive en archivos de datos; la **lógica** en unos pocos archivos JS; el **backend** es Supabase (auth + base de datos + storage + edge functions). Se sirve como sitio estático en Cloudflare Pages. Los pagos y el alta de cuentas los maneja Stripe con un webhook.

---

## 2. Arquitectura

### Tecnologías
- **Frontend:** HTML + JavaScript vanilla (sin framework) + **Tailwind CSS** (vía CDN). Gráficos con **Chart.js**.
- **Backend:** **Supabase** (PostgreSQL, Auth, Storage, Edge Functions en Deno/TypeScript).
- **Pagos:** **Stripe** (Payment Links + webhook).
- **Hosting:** **Cloudflare Pages** (sitio estático). Dominio: `www.suecoconsophie.com`.
- **Email transaccional:** **Resend** (correos de acceso).
- **Voz (opcional/futuro):** **ElevenLabs** (voz clonada de Sophie para audios).

### Estructura de carpetas (resumen)
```
src/                      Código fuente (se compila a index.html)
  template.html           Plantilla HTML: todas las "vistas" (pantallas) y modales
  app.js                  Lógica principal (auth, navegación, render de módulos, admin)
  progress.js             Sistema de progreso unificado (cálculo, guardado, migración)
  achievements.js         Logros y medallas (definiciones + render + certificado)
  data.js                 CONTENIDO: gramática, teoría, lecturas, escritura, audios, prueba de nivel
  talaSituations.js       CONTENIDO: situaciones de conversación (Tala)
  vocabData.js            CONTENIDO: vocabulario (Vokabulär)
  medborgarData.js        CONTENIDO: preguntas de ciudadanía (Medborgarskap)
index.html                Archivo final servido (generado desde src/, NO editar a mano)
supabase/migrations/      Definición de tablas y políticas RLS (SQL)
supabase/functions/       Edge functions (admin-ops)
webhooks/                 Webhook de Stripe (stripe-webhook.ts)
juanita/                  Imágenes locales del personaje Juanita (.webp)
audio/                    Audios de comprensión auditiva (a01..d06.mp3)
docs/                     Informes y esta documentación
```

### Proceso de build
`index.html` se genera **concatenando** los `src/*.js` dentro de `template.html` (reemplazando los `<script src="...">` por el código en línea). **Regla:** editar siempre en `src/` y regenerar `index.html`; nunca editar `index.html` a mano. El sitio es estático: no hay servidor de aplicación.

### Archivos principales y su función
- **`app.js`** (~6.000 líneas): autenticación, ruteo (URLs), render de cada módulo, panel de admin, pagos, notificaciones. Es el "cerebro".
- **`progress.js`**: capa única de progreso. Calcula porcentajes (denominadores dinámicos), guarda en Supabase (`user_progress`), migra formatos antiguos, expone helpers a `window`.
- **`achievements.js`**: medallas por nivel (Bronce/Plata/Oro/Diamante = A/B/C/D) y logros progresivos; genera el certificado descargable.
- **`data.js`** (~12.000 líneas): todo el contenido pedagógico estructurado en objetos (GRAMMAR_DATA, THEORY_DATA, DB por nivel con read/write, HORST_DATA para audios, LEVEL_TEST).

---

## 3. Base de datos (Supabase / PostgreSQL)

### Tablas
| Tabla | Qué guarda | Clave / notas |
|---|---|---|
| `students` | 1 fila por alumno: email, nombre, `active`, `status`, `price`, `device_keys` (array), `last_login`, `cancels_at`, IDs de Stripe (`stripe_customer_id`, `stripe_subscription_id`). | PK `id` = id de auth. La crean el webhook de Stripe y el admin. |
| `user_progress` | Progreso de la mayoría de módulos. 1 fila por `(user_id, module_type, content_id)`. Campos: `status` (in_progress/completed), `level`, `progress_value`, `score`, `attempts`, `completed_at`, `updated_at`. | **Tabla central reutilizable.** `module_type` ∈ {theory, grammar, listening, reading, writing, achievement}. `upsert` evita duplicados. |
| `exam_progress` | Exámenes finales por nivel: `passes_count`, `best_score`, `locked_until`. | 1 fila por alumno+nivel. |
| `vocabulary_progress` | Vocabulario dominado: 1 fila por palabra (`vocabulary_id`, `status`). | |
| `tala_progress` | Progreso de conversación (Tala): 1 fila por situación (`completed`). | |
| `medborgarskap_progress` | Progreso de ciudadanía por módulo. | |
| `nivel_resultados` | Resultados de la prueba de nivel: nivel asignado, puntaje, destrezas. | Historial por alumno. |
| `reviews` | Reseñas de alumnos (para la landing). `status` = pending/approved/hidden. | Lectura pública solo de aprobadas. |

### Relaciones
Todas las tablas de progreso se relacionan con `students`/`auth.users` por `user_id` = `students.id` = `auth.users.id`. No hay claves foráneas complejas: el modelo es "1 alumno → N filas de progreso" por tabla.

### localStorage (solo en el navegador, por dispositivo)
- `scs_nivel_last`: último resultado de la prueba de nivel (copia local; el oficial está en Supabase).
- `sc_theory`: progreso de teoría (se sincroniza a Supabase con backfill).
- `scs_wdraft_<nivel>_<id>`: borradores de Skriva (no se suben a Supabase).
- `sc_notifs`, `sc_content_ver`, `scs_medals_seen`, racha de estudio, avisos vistos.
> Regla: el **progreso real** vive en Supabase; localStorage solo guarda borradores y estado de UI. Cambiar de dispositivo **no pierde** progreso.

---

## 4. Autenticación

- **Login por correo/contraseña:** Supabase Auth (`signInWithPassword`). Tras autenticar, se comprueba que el alumno tenga fila en `students` y esté `active`; si no, se cierra sesión (salvo admin).
- **Google Auth:** `signInWithOAuth({provider:'google'})`. Un login de Google **solo** cuenta como alumno si tiene fila en `students` (evita accesos sin pagar).
- **Admin:** correos en `ADMIN_EMAILS` entran siempre y ven el panel de administración. La verificación de admin real está en la edge function (por el JWT del que llama).
- **Límite de dispositivos:** cada alumno tiene `device_keys` (array) y un máximo (`MAX_DEVICES`). Al entrar en un dispositivo nuevo se registra su "huella"; superado el límite, se avisa. Al cerrar sesión se **libera** el dispositivo. El admin puede resetear dispositivos.
- **RLS (Row Level Security):** cada tabla de progreso tiene políticas `auth.uid() = user_id`. La tabla `students` debe tener `auth.uid() = id` (ver migración `20260719_students_rls.sql`): el alumno solo ve/edita su fila y solo puede tocar `device_keys` y `last_login`.

---

## 5. Módulos (detalle funcional)

- **Inicio (Home / plataforma):** panel del alumno. Muestra el % de avance (anillo), un "alce" que evoluciona con el progreso global, destrezas, botón de prueba de nivel, objetivos del día, accesos rápidos y notificaciones.
- **Gramática (Grammatik):** temas por nivel (GRAMMAR_DATA), cada uno con preguntas de opción múltiple con explicación. Progreso fraccional por tema (% dominado).
- **Läsa (lectura):** por nivel, **organizada en 15 unidades** (SFI A/B). Cada lectura tiene un texto en sueco + 5 preguntas mixtas (opción múltiple, verdadero/falso, respuesta corta) con explicación al fallar. Se marca completada con ≥60%.
- **Skriva (escritura):** metodología tipo profesor **sin IA**: leer situación → escribir → "Enviar respuesta" → corrección **objetiva** (nº de palabras, saludo, despedida, "?", palabras clave) → autoevaluación (checklist) → "Comparar con un ejemplo" (solo tras enviar). Ayudas: "Necesito una pista" y "Palabras útiles". Se completa solo si cumple los requisitos objetivos.
- **Tala (conversación):** situaciones interactivas (ordenar palabras). Desbloqueo por nivel. Progreso en `tala_progress`.
- **Hörförståelse (comprensión auditiva):** audios de la voz de Sophie (carpeta `audio/`), con preguntas. C y D en sueco (explicación en español). Se muestran 4 preguntas de un banco por episodio.
- **Vokabulär (vocabulario):** palabras por nivel/categoría; se "dominan" y quedan en `vocabulary_progress`.
- **Práctica con Juanita:** *placeholder* ("snart tillgänglig") — conversaciones guiadas con un personaje (aún no construido).
- **Logros (medallas):** medallas por nivel (examen final + ≥50% del contenido) y logros progresivos (racha, palabras, audios, conversaciones). Certificado descargable con la voz/imagen de marca. Medallas **sticky** (no se revocan).
- **Medborgarskapsprovet (prueba de ciudadanía):** módulos con preguntas; progreso en `medborgarskap_progress`.
- **Mi viaje:** *placeholder* (mapa de Suecia, futuro).
- **Cuenta (Mitt konto):** datos del alumno, gestión/cancelación de suscripción (portal de Stripe), soporte.

---

## 6. Flujo del alumno

1. Visita el **landing** (`/`) y elige un plan (mensual o trimestral) → paga en **Stripe**.
2. El **webhook** crea su fila en `students` y Stripe/Resend le envía un correo para **crear contraseña**.
3. Inicia sesión en `/alumnos` → entra a la **plataforma** (`/plataforma`).
4. Hace la **prueba de nivel** (32 preguntas aleatorias, equilibradas) → se le asigna A/B/C/D.
5. Practica los módulos de su nivel; el progreso se guarda en Supabase.
6. Al completar el contenido y aprobar el **examen final** del nivel, gana la **medalla** y desbloquea el siguiente nivel.

---

## 7. Sistema de progreso

- **Cómo se guarda:** cada actividad completada = 1 fila en `user_progress` (upsert por `id` estable, sin duplicados). Läsa/Skriva usan id de contenido; teoría/gramática/listening igual.
- **Cómo se calcula:** porcentaje = completadas ÷ total activo (**denominadores dinámicos**). No se guardan porcentajes → añadir contenido recalcula solo.
- **Desbloqueo:** un nivel se abre por la prueba de nivel o al completar el nivel anterior. Dentro, las actividades no obligan orden estricto salvo Tala (por nivel).
- **Medallas y niveles:** medalla de nivel = aprobar el examen final N veces **y** ≥50% del contenido. Una vez ganada, es **permanente** (sticky), aunque se añada contenido y baje el %.
- **Protección:** añadir contenido nunca borra progreso (solo suma filas). Cambios de diseño no tocan datos. Certificados = se regeneran desde la medalla ganada.

---

## 8. Dashboard de administrador

Accesible solo para `ADMIN_EMAILS`. Funciones actuales:
- **Lista de alumnos** (vía edge function `admin-ops` con service key): ver, crear, actualizar, borrar alumnos; ver su nivel.
- **Resetear dispositivos** de un alumno.
- **Reenviar** el correo de acceso (crear contraseña) vía Resend.
- **Cambiar email** de un alumno.
- **Reseñas:** aprobar/ocultar reseñas de alumnos.
- **Config de Stripe:** editar el link de pago que verán los nuevos alumnos.
- **Registro de pagos** (efectivo / manual) y métricas básicas.

---

## 9. Integraciones

- **Supabase:** Auth (email + Google), PostgreSQL (progreso), Storage (bucket público `assets` para imágenes/logo; audios en repo), Edge Functions (`admin-ops`).
- **Stripe:** Payment Links (mensual y trimestral) + **webhook** `stripe-webhook.ts` que escucha `checkout.session.completed` y `customer.subscription.*` → crea/actualiza `students` (upsert, sin duplicados). Portal de cliente para gestionar/cancelar.
- **Cloudflare Pages:** hosting estático + dominio + despliegue automático desde la rama de producción (`main`). Rollback en 1 clic.
- **Resend:** envío de correos de acceso (dominio verificado `suecoconsophie.com`).
- **ElevenLabs (preparado, no activo):** pipeline en `scripts/audio/` para generar audios con la voz clonada de Sophie y subirlos a Supabase Storage. (La sección de pronunciación se quitó temporalmente.)

---

## 10. Seguridad

- **RLS** en todas las tablas de progreso (`auth.uid() = user_id`) y en `students` (`auth.uid() = id`, con update limitado a `device_keys`/`last_login`).
- **Admin server-side:** las operaciones de admin pasan por una edge function que verifica el JWT del que llama contra `ADMIN_EMAILS` y usa la **service key** (salta RLS). El cliente nunca tiene la service key.
- **Webhook** verificado por firma de Stripe; usa service key.
- **Validaciones:** el cliente filtra por su propio `id`; la RLS es la barrera real. Sin datos personales en URLs. Fallbacks de imagen con `onerror`.
- **Protección de datos:** ningún alumno puede leer/modificar datos de otro (con RLS activa). Secretos (Stripe, service key, Resend, ElevenLabs) viven en variables de entorno de las funciones, nunca en el frontend.

---

## 11. Limitaciones actuales

- Todo el frontend se empaqueta en **un solo `index.html`** (~1,66 MB) que crece con el contenido.
- Archivos de datos muy grandes (`data.js` ~12.000 líneas) → editar a mano es propenso a errores.
- `app.js` monolítico (~6.000 líneas).
- Sin pruebas automáticas ni monitoreo de errores en producción.
- Módulos "Juanita" y "Mi viaje" son placeholders.
- La comprensión auditiva de la prueba de nivel no se amplía sin generar audios nuevos.

---

## 12. Próximas mejoras previstas

- **Lazy-load de contenido por nivel** (cargar A/B/C/D bajo demanda) cuando el bundle crezca.
- **Dividir los archivos de datos** por módulo/nivel.
- Mover el **contenido a base de datos/JSON** para añadir lecciones sin desplegar código.
- Sección de **pronunciación (Uttal)** con la voz de Sophie (pipeline ya listo).
- Construir **Juanita** (conversación con IA) y **Mi viaje** (mapa gamificado).
- Notificación de "nuevo contenido" (ya implementada, ampliable).

---

## 13. Problemas técnicos conocidos

- **RLS de `students`** debe confirmarse activa en producción (migración provista).
- Update de `students` desde el cliente limitado por column-grant (device_keys/last_login) para evitar manipulación.
- Bundle creciente afecta la carga inicial en móviles con mala conexión.
- Algunos `console.log` informativos en producción (inofensivos).
- Contenido de gramática/teoría de C/D aún parcialmente en español (Hörförståelse y Läsa/Skriva C/D ya en sueco).

---

## 14. Recomendaciones para escalar

1. **Infraestructura como código:** mantener todas las políticas RLS y tablas en `supabase/migrations/`.
2. **Separar contenido de bundle:** lazy-load por nivel y dividir `data.js`; a medio plazo, contenido en tablas/JSON consultables.
3. **Modularizar `app.js`** por dominio (auth, pagos, progreso, módulos).
4. **Pruebas y monitoreo:** smoke tests (login, guardar progreso) + monitor de errores (Sentry).
5. **Staging:** entorno de pruebas separado de producción para deploys grandes.
6. **Migración futura a React + TypeScript** (o Next.js para SEO del marketing) sobre el mismo Supabase: factible porque el contenido y el modelo de datos ya están separados de la lógica. Rehacer la "cáscara" (UI), no el "cerebro".

> **Principio rector:** el progreso de los alumnos está protegido por diseño (ids estables, denominadores dinámicos, medallas sticky, operaciones aditivas). Cualquier función nueva debe respetar esto: **añadir contenido/filas, nunca borrar ni renombrar ids existentes.**
