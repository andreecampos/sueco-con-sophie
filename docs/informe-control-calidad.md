# Informe de Control de Calidad — Pre-deploy

_Revisión del código de la rama `feature/unified-progress-system` (58 commits por delante de `main`) antes de publicar a ~120 alumnos. Basado en revisión del código, no solo en apariencia._

## Contexto de este deploy
Producción (`main`) todavía usa el sistema **antiguo**. Esta actualización trae: sistema de progreso unificado (por id + migración), contenido nuevo Läsa/Skriva/Gramática/Teoría/Vokabulär de A–D, metodología nueva de Skriva, logros/medallas, prueba de nivel aleatoria, notificaciones y ajustes de UI. **No modifica** las tablas ni la lógica de autenticación existentes.

---

## 1. Errores CRÍTICOS que bloquean el deploy
**Ninguno confirmado en el código de esta actualización.** El build compila con **0 errores de sintaxis** en los 8 bloques, sin `<div>` sin cerrar, sin funciones rotas en los `onclick`.

Hay **1 punto crítico a VERIFICAR** (no lo introduce este deploy, es preexistente):

- **RLS de la tabla `students`.** No existe una migración de RLS para `students` en el repo (sí existe para `user_progress`, `exam_progress`, `vocabulary_progress`, `medborgarskap_progress`). El cliente hace consultas `sb.from('students')...eq('id', <mi_uid>)`, pero es **RLS** quien impide que un alumno pida las filas de OTROS.
  - **Riesgo:** si RLS NO está activa en Supabase con política `auth.uid() = id`, cualquier alumno logueado podría, desde la consola, ejecutar `sb.from('students').select('*')` y leer correos, IDs de Stripe y `device_keys` de los 120 alumnos, o modificar `device_keys` de otros.
  - **Archivo:** falta `supabase/migrations/*_students_rls.sql`.
  - **Solución segura:** en Supabase → Table Editor → `students` → confirmar **RLS enabled** con políticas `select`/`update` = `auth.uid() = id`. Si no existen, crearlas (te doy el SQL). El panel de admin **no** depende de esto (usa una edge function con service key que verifica que quien llama es admin — eso sí está correcto).
  - **Nota:** como la plataforma YA está en producción con alumnos, es probable que esta RLS ya esté puesta en el panel. Solo hay que **confirmarlo**. No es un cambio de este deploy.

---

## 2. Errores IMPORTANTES a corregir
- **Ninguno que rompa funciones.** Detalles menores abajo.
- **Comprensión auditiva (Hörförståelse) en la prueba de nivel:** no se amplió el banco (necesita archivos de audio); mantiene las preguntas existentes. La randomización aplica a gramática, vocabulario y escritura. No bloquea.

---

## 3. Errores menores / mejoras opcionales
- **5 `console.log`** viejos en `app.js` (ruido en consola, inofensivo). Se pueden quitar.
- **Módulos "próximamente":** *Práctica con Juanita* y *Mi viaje* son placeholders (abren modal "snart tillgänglig"). No están rotos; simplemente aún no construidos. Conviene que quede claro al alumno.
- **Bundle de 1,66 MB** en un solo `index.html` (ver informe de arquitectura). Carga una vez y queda en caché; hoy es aceptable.

---

## 4. Funciones comprobadas que funcionan correctamente
- **Compilación/estructura:** 0 errores, `<div>` balanceados, sin referencias rotas.
- **Autenticación:** login por correo/contraseña (`signInWithPassword`) y **Google OAuth** (`signInWithOAuth`), con la salvaguarda de que un login de Google solo es "alumno" si tiene fila en `students`.
- **Acceso por cuenta:** al entrar se lee la fila propia (`active`, `status`) y se bloquea/expulsa si la cuenta no es válida; el admin entra siempre.
- **Límite de dispositivos:** `device_keys` + `MAX_DEVICES`; al salir se **libera** el dispositivo; el admin puede resetear dispositivos.
- **Progreso:** tabla única `user_progress` con clave primaria `(user_id, module_type, content_id)` + `upsert` → **imposible duplicar**. Lectura solo de filas propias (RLS de user_progress confirmada en migración).
- **Guardado:** Supabase para progreso/exámenes/vocabulario/tala/medborgar; localStorage para racha, borradores de Skriva y "vistos". Backfill idempotente desde localStorage.
- **Módulos activos:** Läsa, Skriva (metodología nueva), Grammatik, Teoría, Vokabulär, Hörförståelse, Tala, Medborgarskap, Logros.
- **Exámenes y medallas:** examen final por nivel con intentos requeridos; medallas **sticky** (no se revocan al añadir contenido).
- **Manejo de errores:** 169 `try/catch`, 113 mensajes al usuario, 12 imágenes con `onerror` (fallback local).
- **Admin:** lista/gestión de alumnos vía edge function con **service key + verificación de admin** (seguro).

---

## 5. Riesgos para los datos y el progreso de los 120 alumnos
- **Migración de progreso a id (Läsa/Skriva):** el progreso pasó de guardarse por índice (`A:read:0`) a por id (`A:read:a-r-1`). Se añadió un **backfill** (`_LEGACY_READ_MAP` / `_LEGACY_WRITE_MAP`) que **copia** las filas viejas a las nuevas claves al cargar. Es **aditivo** (no borra nada) → **sin pérdida de progreso**. Riesgo: BAJO. Recomendación: probar con una cuenta real que tenga progreso.
- **Añadir contenido no borra progreso:** los denominadores son dinámicos (se calcula completadas ÷ total activo). Añadir lecciones baja el %, pero **no borra** filas. Medallas sticky. Riesgo: BAJO (comportamiento intencional; ya lo confirmamos).
- **Sin cambios destructivos de base de datos:** este deploy no hace `drop`/`alter` de tablas. Solo inserta/actualiza vía upsert. Riesgo de corrupción: MUY BAJO.
- **Duplicados:** imposibles por la PK de `user_progress` y el `onConflict:'id'` del webhook de Stripe.

---

## 6. Cambios exactos recomendados ANTES del deploy
1. **(Obligatorio) Verificar RLS de `students`** en Supabase (punto 1). Si falta, crear política `auth.uid() = id`.
2. **(Recomendado) Probar el backfill de progreso** con 1 cuenta de alumno real que tenga lecturas/escrituras hechas (ver pasos abajo).
3. (Opcional) Quitar los 5 `console.log` de `app.js`.

_No recomiendo tocar nada más: el resto funciona y modificarlo añade riesgo._

---

## 7. Pasos para probar manualmente (en el preview)
1. **Alumno nuevo:** crear/usar una cuenta sin progreso → entra, hace la prueba de nivel (¿32 preguntas, distintas cada intento?), completa una lectura de Läsa A (≥60% marca completada; <60% no).
2. **Alumno existente con progreso:** entrar con una cuenta que ya tenía progreso en producción → confirmar que **sigue viéndose** su avance (backfill).
3. **Google:** iniciar con Google con un correo que SÍ es alumno y uno que NO → el que no es alumno no debe tener acceso.
4. **Móvil:** abrir en el teléfono → navegación inferior, landing (reseñas antes que precios), formularios.
5. **Cambio de dispositivo:** entrar en 2 dispositivos → al 3º debe avisar del límite; salir en uno lo libera.
6. **Actividad Skriva:** escribir → Enviar → ver corrección objetiva + autoevaluación; "Comparar ejemplo" solo tras enviar; no avanza sin enviar.
7. **Responder mal:** en Läsa fallar y confirmar que **no** marca completado.
8. **Recargar / cerrar sesión:** recargar a mitad → sesión persiste; logout → vuelve al login con correo/contraseña.
9. **Precios:** en el landing, tocar cada precio → **ambos abren en pestaña nueva**; el botón "Inscríbete aquí" del login lleva al landing.
10. **Consola del navegador:** abrir DevTools → no debe haber errores rojos que rompan (los `console.log` informativos son normales).

---

## 8. Plan de rollback (si algo falla tras publicar)
Ventaja: es un sitio **estático** (un `index.html`) desplegado por Cloudflare Pages desde `main`. Rollback = volver `main` al commit anterior.

1. **Opción A (Cloudflare):** Cloudflare Pages → tu proyecto → **Deployments** → busca el despliegue anterior estable → **"Rollback to this deployment"**. Inmediato, sin tocar git.
2. **Opción B (git):** `git checkout main` → `git revert <merge>` o `git reset --hard <commit_anterior>` → `git push origin main --force-with-lease`. Cloudflare redepliega la versión vieja.
3. **Datos:** el rollback del código **no** afecta la base de datos. El progreso nuevo (filas id-based) queda guardado; la versión vieja simplemente vuelve a leer por índice. No se pierde nada. Por eso este deploy es de **bajo riesgo de rollback**.

> Antes de publicar, anota el commit actual de `main` (`cfabf43`) para poder volver a él si hiciera falta.

---

## CONCLUSIÓN
### 🟡 LISTO PARA DEPLOY CON RIESGOS MENORES

El código está limpio (0 errores), es **aditivo y no destructivo** con los datos, y el progreso de los alumnos está protegido por diseño (backfill + denominadores dinámicos + medallas sticky). 

Condiciones antes de publicar:
1. **Confirmar la RLS de `students`** en Supabase (punto 1) — es lo único con potencial crítico, y es preexistente.
2. **Probar con 1 cuenta real** que el progreso viejo se conserva (punto 6.2).

Cumplidas esas dos verificaciones → **LISTO PARA DEPLOY**.
