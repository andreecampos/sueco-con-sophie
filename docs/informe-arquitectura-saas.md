# Informe de Arquitectura — Escalabilidad hacia SaaS

_Objetivo: poder añadir cientos de lecciones (gramática, lectura, escritura, vocabulario, audios) sin tocar la lógica ni poner en riesgo a los alumnos. Este informe es solo análisis; no incluye cambios._

## 1. Lo que está BIEN (bases sólidas)

- **Contenido separado de la lógica.** El contenido vive en archivos de datos (`data.js`, `talaSituations.js`, `vocabData.js`, `medborgarData.js`, `pronData` cuando exista) y la lógica en `app.js` / `progress.js`. Añadir una lección = añadir un objeto de datos, sin tocar la lógica. Esto es exactamente lo que pide un SaaS de contenido.
- **Una sola tabla de progreso reutilizable.** `user_progress (user_id, module_type, content_id, ...)` sirve para theory, grammar, listening, writing, reading y hasta logros (`module_type='achievement'`). Escala a cualquier módulo nuevo sin crear tablas.
- **Denominadores dinámicos.** Los porcentajes se calculan (completadas ÷ total activo). Añadir contenido ajusta el total automáticamente. **No se guardan porcentajes** → no hay que migrar nada al crecer.
- **Progreso protegido al añadir contenido.** Es aditivo: nuevas lecciones nunca borran filas de progreso. Las **medallas son sticky** (no se revocan). El progreso se identifica por **id estable**, no por posición → se puede reordenar/insertar contenido sin romper el avance.
- **Seguridad por RLS.** Cada tabla de progreso tiene políticas `auth.uid() = user_id`. El admin usa una **edge function con service key** que verifica que quien llama es admin. Buen patrón.
- **Despliegue simple.** Sitio estático (un `index.html`) en Cloudflare Pages → rollback y despliegue triviales.

## 2. RIESGOS encontrados

- **R1 · Todo en un solo `index.html` (~1,66 MB) que crece con el contenido.** Hoy es aceptable, pero con "cientos de lecciones" el bundle podría llegar a varios MB → carga inicial lenta en móvil. Es el **límite estructural** más importante para escalar.
- **R2 · Archivos de datos gigantes.** `data.js` ya supera las 12.000 líneas. Editar a mano un archivo tan grande es propenso a errores (comas, llaves). A escala SaaS, editar contenido en un `.js` no es sostenible.
- **R3 · Build manual.** El `index.html` se arma concatenando `src/*.js` en una plantilla (script de Python). No hay un pipeline de build real ni versionado del proceso. Si alguien edita `index.html` directamente en vez de `src/`, se desincroniza.
- **R4 · `app.js` muy acoplado (~6.000 líneas).** Toda la lógica (auth, pagos, progreso, render de cada módulo, admin) en un archivo. Funciona, pero a futuro dificulta el mantenimiento y aumenta el riesgo al tocar cualquier cosa.
- **R5 · RLS de `students` no está como migración.** (Ver informe de QA.) La infraestructura de seguridad debería estar en código (migración), no solo en el panel, para no perderla ni olvidarla.
- **R6 · Sin pruebas automáticas ni monitoreo de errores.** Cada cambio se valida a mano. A escala conviene tener smoke tests y un monitor (p. ej. Sentry) para enterarse de errores de los alumnos en producción.
- **R7 · Contenido en el repo, no en base de datos.** Para "solo añadir contenido sin tocar código", lo ideal a futuro es que el contenido viva en una tabla/JSON que se cargue bajo demanda, de modo que subir una lección no requiera un deploy de código.

## 3. Mejoras recomendadas (priorizadas)

### 🔴 Críticas (hacer antes de crecer mucho)
1. **Poner la RLS de `students` en una migración** (`supabase/migrations/…_students_rls.sql`) y confirmarla activa. Seguridad como código.
2. **Definir el flujo de build/deploy** de forma explícita (documentar o automatizar que `index.html` se genera SIEMPRE desde `src/`, nunca a mano). Evita desincronización.

### 🟡 Importantes (cuando el contenido empiece a crecer)
3. **Lazy-load del contenido por nivel.** Separar el contenido de A/B/C/D (y por módulo) en archivos que se carguen solo cuando el alumno entra a ese nivel. Mantiene la carga inicial rápida. Umbral sugerido: cuando el bundle pase de ~3–4 MB.
4. **Dividir los archivos de datos** por módulo/nivel (p. ej. `data/lasa-A.js`, `data/grammar-B.js`). Más fácil y seguro de editar; menos riesgo de romper todo con una coma.
5. **Mover el contenido a una fuente de datos consultable** (tabla de Supabase o JSON en Storage) a medio plazo. Así podrás **añadir lecciones sin desplegar código** — el paso natural hacia SaaS.

### 🟢 Opcionales (calidad de vida)
6. **Modularizar `app.js`** por dominio (auth, pagos, progreso, módulos) para mantener mejor.
7. **Smoke tests automáticos** (login, cargar un módulo, guardar progreso) que corran antes de cada deploy.
8. **Monitoreo de errores en producción** (Sentry o similar).
9. **Entorno de staging** separado de producción para probar deploys grandes con datos de prueba.

## 4. Respuestas directas a tus preguntas

- **¿La arquitectura es escalable?** Sí en el modelo de datos (progreso y contenido bien separados, tabla única, ids estables). El cuello de botella es el **empaquetado en un solo archivo**; se resuelve con lazy-load antes de llegar a cientos de lecciones.
- **¿El contenido está separado de la lógica?** Sí. Añadir contenido no toca la lógica.
- **¿Podremos añadir cientos de lecciones sin romper el sistema?** Sí, funcionalmente. Pero antes de "cientos" conviene (a) lazy-load y (b) dividir los archivos de datos, o el bundle y la edición manual se vuelven un problema.
- **¿El progreso está protegido al añadir contenido?** Sí, muy bien: aditivo, por id, denominadores dinámicos, medallas sticky. Añadir contenido nunca borra progreso.
- **¿Hay código demasiado acoplado?** Sí: `app.js` (6.000 líneas) y `data.js` (12.000 líneas). No es urgente, pero es deuda técnica a vigilar.
- **¿Riesgos de rendimiento/seguridad/mantenimiento?** Rendimiento: el bundle creciente (mitigable). Seguridad: confirmar RLS de `students`. Mantenimiento: archivos muy grandes y sin tests.

## Resumen
La base es **sólida y bien pensada para crecer en contenido** (lo más difícil ya está bien: separación contenido/lógica, progreso por id, tabla única, medallas sticky). Los ajustes clave para el largo plazo son **operativos** (lazy-load, dividir datos, contenido en base de datos, RLS como migración), no una reconstrucción. No necesitas rehacer la plataforma; sí conviene preparar estos pasos antes de multiplicar el contenido.
