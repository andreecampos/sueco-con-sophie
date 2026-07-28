# Auditoría de seguridad — Sueco con Sophie (OWASP Top 10:2021)

> Revisión del código con foco en **manejo de sesiones** y **OWASP Top 10**.
> Fecha de la auditoría: julio 2026. Alcance: frontend (SPA), edge functions
> (`admin-ops`), webhook de Stripe, y configuración de Supabase/Cloudflare.

## Resumen ejecutivo

La **base de seguridad es sólida y de nivel profesional**: autenticación con
Supabase (JWT), aislamiento de datos con RLS, secretos solo en el servidor,
HTTPS por Cloudflare y manejo de tarjetas delegado a Stripe (PCI). Durante esta
auditoría se **encontró y corrigió una vulnerabilidad real (XSS almacenado)** y
se **reforzó el control de acceso al panel** (verificación en el servidor). El
resto son mejoras de endurecimiento (defensa en profundidad), no huecos críticos.

| # | Categoría OWASP | Estado |
|---|---|---|
| A01 | Broken Access Control | ✅ Correcto (reforzado) |
| A02 | Cryptographic Failures | ✅ Correcto |
| A03 | Injection (SQL / XSS) | 🔴→✅ **XSS corregido en esta auditoría** |
| A04 | Insecure Design | ⚠️ Contenido en el cliente (por diseño) |
| A05 | Security Misconfiguration | ⚠️ Falta CSP / afinar CORS |
| A06 | Vulnerable Components | ✅ Correcto (mantener actualizado) |
| A07 | Auth & Session Failures | ⚠️ Falta 2FA / CAPTCHA / rate-limit |
| A08 | Data Integrity Failures | ✅ Webhook firmado · ⚠️ falta SRI |
| A09 | Logging & Monitoring | ⚠️ Falta audit log conectado |
| A10 | SSRF | ✅ No aplica |

---

## A01 — Broken Access Control ✅ (reforzado)

**Hallazgo del asesor externo:** el chequeo de admin en el cliente
(`isAdminUser()` contra `window._sbSession` y `ADMIN_EMAILS`) es editable desde
la consola → cualquiera puede *mostrar* el panel.

**Realidad:** eso es **cosmético**. La seguridad real está en el servidor:
- La edge function `admin-ops` verifica **cada acción** con el token real:
  `sb.auth.getUser(jwt)` y lo compara contra `ADMIN_EMAILS`; si no es admin →
  **401 Unauthorized**. Editar `window` no cambia el token firmado por Supabase.
- **RLS** en `students` y tablas de progreso: cada alumno solo lee/actualiza su
  propia fila, y solo las columnas `device_keys`/`last_login`.

**Corregido en esta auditoría:** al entrar al dashboard, ahora se **verifica con
el servidor** (acción admin-gated `get_config`); a un impostor se le expulsa al
login. El cascarón visual ya no se muestra sin autorización real.

**Pendiente (roadmap):** `create_portal_session` no verifica que quien pide el
portal sea dueño del `customer_id`. Riesgo bajo (IDs no adivinables) pero se debe
cerrar validando la propiedad del cliente.

## A02 — Cryptographic Failures ✅

- **HTTPS/TLS** en todo (Cloudflare, SSL activo).
- **Contraseñas**: las hashea Supabase (bcrypt); la plataforma nunca las guarda.
- **Tarjetas**: las maneja **Stripe** (cumplimiento PCI); la plataforma nunca ve
  números de tarjeta.
- **Secretos**: verificado que en el navegador **solo** está la `anon key`
  (pública por diseño). La `SERVICE_ROLE_KEY` y la `STRIPE_SECRET_KEY` viven solo
  en variables de entorno del servidor.

**Recomendado:** activar en Supabase la **protección de contraseñas filtradas**
(comprobación contra HaveIBeenPwned).

## A03 — Injection 🔴→✅ (corregido)

- **SQL Injection:** no aplica — se usa el cliente de Supabase con consultas
  parametrizadas; no hay SQL crudo construido con datos del usuario.
- **XSS almacenado — VULNERABILIDAD ENCONTRADA Y CORREGIDA:** el **nombre y correo
  del alumno** se insertaban en el HTML del panel **sin escapar** (listas de
  usuarios, tarjeta de atención, panel clásico). Un alumno podía poner como nombre
  un `<img src=x onerror=...>` o `<script>` que se ejecutaría **en el navegador
  del administrador** al ver la lista → robo de sesión/token. **Se corrigió**
  envolviendo todos esos valores en `escHtml()`.

**Recomendado:** añadir una cabecera **Content-Security-Policy** como segunda
capa contra XSS.

## A04 — Insecure Design ⚠️ (por diseño)

- El **contenido de los cursos** (lecciones) se entrega al navegador — es una
  app de una sola página. Cualquier usuario técnico puede leer el contenido sin
  pagar. **No es una filtración de datos**, es una limitación inherente a las SPA.
- Blindarlo requeriría servir el contenido desde el servidor con autorización
  (rediseño grande). Aceptable para el tamaño actual; queda en el roadmap.

## A05 — Security Misconfiguration ⚠️

- **CORS**: la edge function usa `Access-Control-Allow-Origin: *`. Para una API
  protegida por JWT es aceptable (el token es la barrera, no el origen), pero se
  recomienda restringirlo a `https://suecoconsophie.com`.
- **Cabeceras de seguridad**: no hay `Content-Security-Policy`, `X-Frame-Options`
  ni `Referrer-Policy`. Recomendado: añadir un archivo `_headers` en Cloudflare.
- **RLS**: verificar que esté activa en **todas** las tablas
  (`select relrowsecurity from pg_class where relname='students'` → debe ser `t`).

## A06 — Vulnerable and Outdated Components ✅

- Librerías por CDN con versión fija (Chart.js 4.4.1, Tailwind, supabase-js).
- Edge functions: SDK de Stripe y Supabase.
- **Recomendado:** revisar actualizaciones periódicamente y fijar versiones.

## A07 — Identification and Authentication Failures ⚠️

- **Autenticación:** Supabase Auth (estándar de industria).
- **Sesión:** el token JWT se guarda en `localStorage` (comportamiento por
  defecto de Supabase). Es accesible por JavaScript → por eso **corregir el XSS
  (A03) era crítico**: sin XSS, no hay forma de robar el token desde la página.
- **Faltantes (roadmap):**
  - **2FA** para las cuentas de administrador.
  - **CAPTCHA** (Cloudflare Turnstile) en login/registro contra bots.
  - **Rate limiting** en login y edge functions (fuerza bruta).
  - **Política de contraseña** más fuerte (hoy mínimo 6; subir a 8+ y activar
    protección de contraseñas filtradas).

## A08 — Software and Data Integrity Failures ✅ / ⚠️

- **Webhook de Stripe: verifica la firma** ✅ — usa
  `stripe.webhooks.constructEventAsync(..., STRIPE_WEBHOOK_SECRET)` y **rechaza**
  eventos con firma inválida (400). Esto impide que alguien falsee pagos.
- **SRI** (Subresource Integrity): los scripts por CDN no tienen atributo
  `integrity`. Recomendado añadirlo (defensa si el CDN se compromete).

## A09 — Security Logging and Monitoring Failures ⚠️

- Hay `console.log`/`console.error` en las edge functions (visibles en logs de
  Supabase).
- **Falta** conectar un **registro de auditoría** de acciones de admin (la tabla
  `admin_audit_log` ya está en la migración, falta escribir en ella).
- **Recomendado:** registrar quién hace cada acción sensible y revisar logs.

## A10 — Server-Side Request Forgery (SSRF) ✅

- No hay peticiones del servidor a URLs controladas por el usuario. Las edge
  functions llaman a endpoints fijos (Stripe, Resend). No aplica.

---

## Acciones ya realizadas en esta auditoría

1. ✅ **XSS almacenado corregido** (A03): escapado de nombre/correo del alumno en
   todo el panel (nuevo y clásico).
2. ✅ **Control de acceso reforzado** (A01): verificación server-side al entrar al
   dashboard; se expulsa a impostores.

## Roadmap de endurecimiento (prioridad sugerida)

1. `create_portal_session`: validar propiedad del `customer_id` (A01).
2. Supabase: activar **protección de contraseñas filtradas** + **CAPTCHA** (A02, A07).
3. **2FA** para administradores (A07).
4. Cabecera **CSP** + `_headers` de seguridad + afinar **CORS** (A03, A05).
5. **Rate limiting** en login / edge functions (A07).
6. Conectar **audit log** `admin_audit_log` (A09).
7. **SRI** en scripts CDN (A08).
8. Subir contraseña mínima a 8+ (A07).
9. Al crecer: **pentest profesional** externo.

> Conclusión: tras corregir el XSS y reforzar el acceso, la plataforma no tiene
> huecos críticos conocidos. Los datos de usuarios y el acceso a Stripe están
> protegidos por servidor + RLS + secretos fuera del cliente. Los puntos del
> roadmap elevan la madurez al nivel de plataformas grandes.
