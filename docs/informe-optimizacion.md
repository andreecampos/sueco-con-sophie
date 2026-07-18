# Informe de optimización — Sueco con Sophie

_Recomendaciones para las demás áreas (Läsa, Tala, Vocabulario, progreso, logros). No incluye cambios; es un análisis. La sección Skriva ya se implementó por separado._

## Principio general (lo que ya está bien)

- **El contenido vive en el repositorio, no en la base de datos.** Textos, preguntas, tareas y ejemplos están en `data.js`. La base de datos solo guarda **progreso**. Esto mantiene la base de datos pequeña y barata.
- **Una sola tabla de progreso reutilizable:** `user_progress` (clave: usuario + módulo + contenido, con upsert). Guarda estado, puntuación y fechas. Es la pieza central y está bien diseñada.
- **Denominadores dinámicos:** los porcentajes se calculan (completadas ÷ total activo). Al añadir contenido, el total sube solo. No se guardan porcentajes.

## Qué NO se debe guardar (evitar duplicación)

Todo esto se calcula en el frontend en tiempo real y **no** debe guardarse:

- conteo de palabras, saludo/despedida, signos, palabras clave (evaluación objetiva de Skriva);
- porcentajes de avance y contadores de logros (se derivan de `user_progress`);
- pistas, ejemplos, checklists y requisitos (están en el contenido del ejercicio);
- múltiples intentos o versiones de una misma respuesta (solo el último estado).

## Área por área

### Läsa (lectura)
- Progreso por **id** (ya migrado) — correcto y a prueba de reordenar contenido.
- Guarda 1 fila por lectura completada. Impacto en base de datos: mínimo.
- Recomendación: ninguna urgente. Opcional: mostrar la mejor puntuación (ya se guarda en `score`).

### Skriva (escritura) — ya implementado
- Reutiliza `user_progress` (estado + puntuación objetiva). El **borrador** se guarda en el navegador (localStorage), no en la base de datos.
- Si en el futuro quieres que el borrador se vea entre dispositivos: añadir **una** columna `answer_text text` (nullable) a `user_progress`. Cambio no destructivo, sin migración de datos.

### Tala (conversación)
- Usa su propia tabla `tala_progress`.
- Recomendación (opcional, a futuro): consolidar en `user_progress` con `module_type='tala'` para tener **una sola tabla de progreso**. No es urgente; hoy funciona. Si se hace, migrar filas viejas con un backfill (como hicimos con Läsa).

### Vocabulario (Vokabulär)
- Usa `vocabulary_progress` (1 fila por palabra dominada).
- Igual que Tala: podría vivir en `user_progress` (`module_type='vocabulary'`), pero no es prioritario.
- Impacto de espacio: bajo (1 fila por palabra dominada por alumno).

### Progreso general
- Bien resuelto con `user_progress` + cálculo dinámico. Sin cambios recomendados.

### Logros / Medallas
- Reutiliza `user_progress` (`module_type='achievement'`). Las medallas son **sticky** (no se revocan si baja el %).
- Sin duplicación. Sin cambios recomendados.

## Recomendación técnica principal: tamaño del archivo

El único costo real de seguir ampliando contenido es que **todo se empaqueta en un solo `index.html`** (hoy ~1,4 MB). Se carga una vez y queda en caché, pero:

- **Umbral sugerido:** si el archivo supera ~3–4 MB, conviene **cargar el contenido por nivel bajo demanda** (lazy-load): separar el contenido de cada nivel (A/B/C/D) en archivos que se carguen solo cuando el alumno entra a ese nivel. Así la carga inicial se mantiene rápida en móvil.
- Mientras tanto (Läsa A + Skriva A), el crecimiento es imperceptible.

## Resumen de acciones sugeridas (no urgentes)

1. Mantener la regla de oro: **contenido en el repo, solo progreso en la base de datos.**
2. Si se quiere borrador de Skriva entre dispositivos → 1 columna `answer_text`.
3. A futuro, unificar `tala_progress` y `vocabulary_progress` dentro de `user_progress` (una sola tabla de progreso).
4. Vigilar el tamaño del bundle; si pasa ~3–4 MB, implementar lazy-load de contenido por nivel.
5. Nunca guardar datos calculables (porcentajes, checks, contadores).
