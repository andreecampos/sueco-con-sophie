# Plan de arquitectura — Dashboard de administración (SaaS)

> Informe previo a escribir código. Diseña un panel de administración escalable para Sueco con Sophie, preparado para crecer años, sin romper la plataforma ni afectar el progreso de los alumnos. **No se implementa nada hasta tu aprobación.**

---

## 1. Arquitectura propuesta

**Principio central:** pasar de un modelo "centrado en alumno" a un modelo genérico **Usuarios + Productos + Suscripciones**, sin renombrar ni romper lo existente.

- **La tabla `students` se conserva** (cambiar su nombre rompería código y RLS). Conceptualmente pasa a ser la tabla de **usuarios**: se le añaden columnas nuevas (con valores por defecto) para `type`, `status`, `group_id`, `notes`, `archived_at`. Las filas actuales siguen funcionando igual.
- **Se separan dos conceptos** que hoy están mezclados:
  - **Tipo** (qué es el usuario): `coaching` · `plataforma` · `invitado` · `prueba` · `admin` · `especial`.
  - **Estado** (situación de su cuenta/pago): `active` · `pending` · `failed` · `cancelled` · `archived` · `manual`.
- **Productos** se modelan aparte (tabla `products`), desacoplados del concepto "alumno". Un usuario puede tener uno o varios productos (junción `user_products`).
- **Todo lo sensible** corre en **edge functions** (service key + verificación de admin), como ya hace `admin-ops`. El frontend nunca toca datos sensibles ni claves.
- **El área de progreso del alumno NO se toca** (mismas tablas, mismos ids). El dashboard solo lee agregados y edita metadatos de usuario/producto/grupo.
- **Registro de acciones** (audit log) para trazabilidad.

**Pantallas del dashboard (menú lateral):**
1. Resumen (métricas + gráficos)
2. Usuarios (paginado, buscador, filtros, panel lateral de edición)
3. Grupos
4. Productos / Planes
5. Notificaciones
6. Contenido (base)
7. Ecosistema de la plataforma (documentación viva — ver informe aparte)
8. Ajustes (config de Stripe, admins)

---

## 2. Nuevas tablas necesarias

| Tabla | Para qué | Campos clave |
|---|---|---|
| `products` | Productos/planes vendibles | id, name, type, `stripe_price_id`, `stripe_payment_link`, price, currency, interval, active, created_at |
| `user_products` | Qué producto(s) tiene cada usuario (junción) | user_id, product_id, status, current_period_end, created_at |
| `groups` | Grupos de usuarios | id, name, description, created_at |
| `notifications` | Avisos in-app / email | id, target_type (all/group/user/product/level), target_id, channel (in_app/email/both), title, body, template_id, scheduled_at, sent_at, status |
| `notification_templates` | Plantillas reutilizables | id, name, subject, body |
| `content_items` | Contenido administrable (base, aditivo) | id (nuevo, nunca reusar ids existentes), module, level, type, status (draft/published), data (jsonb), created_at |
| `admin_audit_log` | Registro de acciones importantes | id, admin_email, action, target, details (jsonb), created_at |

> Todas con RLS que **bloquea al cliente**; solo la service key (edge functions) escribe. Índices en `students(type)`, `students(status)`, `students(group_id)`, `user_products(user_id)`, `notifications(target_type,target_id)`.

---

## 3. Tablas existentes que se reutilizan (sin cambios de esquema salvo `students`)

- **`students`** → tabla de usuarios (se le AÑADEN columnas nuevas con default; no se borra ni renombra nada).
- **`config`** → ya guarda configuración (p. ej. link de Stripe). Se reutiliza y amplía.
- **`user_progress`, `exam_progress`, `vocabulary_progress`, `tala_progress`, `medborgarskap_progress`, `nivel_resultados`** → **NO se tocan**. El dashboard solo las lee de forma agregada (conteos), nunca cambia ids ni borra progreso.
- **`reviews`, `avatars`** → se reutilizan como hoy.

---

## 4. Cambios en Supabase

1. **`ALTER TABLE students ADD COLUMN IF NOT EXISTS`**: `type text default 'coaching'`, `status` (ya existe; se estandarizan valores), `group_id uuid`, `notes text`, `archived_at timestamptz`. (No destructivo; filas actuales quedan con default.)
2. **Crear las tablas nuevas** (sección 2) con RLS restrictiva + índices.
3. **Ampliar la edge function admin-ops** (o crear `admin-dashboard`) con nuevas acciones **agregadas y paginadas**: `dashboard_metrics`, `users_page` (con filtros/orden/paginación), `user_detail`, `groups_crud`, `products_crud`, `notifications_send`, `content_crud`, `stripe_action` (cancelar/pausar/reactivar), `audit_log`.
4. **Vistas o funciones SQL agregadas** para métricas (conteos por tipo/estado, ingresos) — para no traer filas al frontend.
5. **Backfill suave**: asignar a los alumnos actuales un `type` inicial (p. ej. todos `coaching` o según su `price`), que tú luego reclasificas desde el panel.

---

## 5. Cambios en el frontend

- **Nueva vista de admin** (`view-admin-v2`) con **menú lateral**, tarjetas, gráficos (Chart.js ya está), modales y paneles laterales. Modo claro/oscuro. Identidad Sueco con Sophie (azul #006AA7, amarillo #FECC02, tonos cálidos).
- **Se conserva el admin actual** hasta que el nuevo esté probado (no se borra nada).
- **Todo se pinta con datos agregados/paginados** que devuelven las edge functions; nunca se carga toda la base.
- **Actualización parcial** de la interfaz (re-render de una tarjeta/lista, no recarga de página).

---

## 6. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Añadir columnas a `students` | `ADD COLUMN IF NOT EXISTS` con default → no rompe filas ni el login (sigue leyendo `active`/`status`). |
| Reclasificar tipos mal | Default seguro + reclasificación manual desde el panel; nada automático. |
| Romper progreso | El dashboard **nunca** escribe en tablas de progreso ni cambia ids. Solo lee agregados. |
| Duplicar datos | Métricas calculadas en tiempo real (SQL agregado), no almacenadas. Junciones normalizadas. |
| Exposición de claves | Todo lo sensible en edge functions; el frontend solo usa la anon key + su JWT. |
| Archivado accidental | Archivar es acción manual y reversible; eliminar definitivo es acción separada, protegida y auditada. |

---

## 7. Cómo evitar sobrecargar la base de datos

- **Paginación server-side** (30/página) con `range()`; nunca `select *` de todos los usuarios.
- **Conteos agregados** con `count()` / `group by` (o vista materializada refrescada periódicamente), no trayendo filas.
- **Carga bajo demanda:** la ficha completa de un usuario se pide solo al abrir su panel.
- **Índices** en las columnas de filtro/orden.
- **Caché** de métricas del dashboard (p. ej. 60 s) para no recalcular en cada visita.
- **Sin N+1:** una sola consulta por lista (join del grupo/producto incluido).

---

## 8. Cómo evitar romper la plataforma

- El dashboard es **solo-admin** y **aditivo**: tablas nuevas + columnas nuevas con default.
- **No cambia** el flujo del alumno, ni el login, ni el sistema de progreso, ni los ids de contenido.
- **Corrección de escritura (Skriva):** se mantiene EXACTAMENTE igual (sin IA, sin corrección manual). No se toca.
- Se despliega junto al admin actual; se puede hacer rollback (Cloudflare) sin afectar datos.

---

## 9. Plan de implementación por fases

- **Fase 0 (este informe):** arquitectura y plan. ✅
- **Fase 1:** migraciones (columnas + tablas nuevas con RLS/índices) · edge function ampliada (métricas, usuarios paginados, detalle, grupos, acciones básicas de Stripe, base de notificaciones/productos/contenido) · nueva vista de dashboard (menú lateral, resumen con tarjetas/gráficos, gestión de usuarios paginada con panel lateral, grupos, tipos/estados, Stripe visual + acciones básicas, notificaciones base, Productos/Planes base, Contenido base, Ecosistema).
- **Fase 2:** lógica completa de Productos/Planes (conectar Price IDs, ingresos por producto), notificaciones programadas + plantillas, filtros avanzados, exportaciones.
- **Fase 3:** gestión de contenido real (crear/editar/publicar módulos desde el panel, aditivo, sin migrar todo de golpe), roles y permisos finos, panel de métricas históricas.

---

## 10. ¿Podrá crecer durante años sin rehacerlo?

**Sí.** El modelo es genérico (Usuarios + Productos + Suscripciones + Grupos + Notificaciones + Contenido + Audit), desacoplado del concepto "alumno":
- Nuevos **productos** = filas nuevas en `products` (sin código).
- Nuevos **tipos de usuario** = un valor más en el enum.
- Nuevo **contenido** = filas nuevas en `content_items` (nunca se cambian ids existentes).
- Todo lo sensible pasa por edge functions → seguro y ampliable.
- Rendimiento sostenido por paginación + agregados + índices + caché.

No requiere reconstrucción: se **extiende**, no se reescribe.

---

### Confirmación de límites (tal como pediste)
- No romper la plataforma · No perder datos · No afectar el progreso · No duplicar información · No consultas innecesarias · Rendimiento excelente. **Este diseño respeta los seis.**

> **Espero tu aprobación de este plan (o ajustes) antes de escribir una sola línea de código de la Fase 1.**
