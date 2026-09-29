# Roadmap — Sueco con Sophie

Lista de mejoras pendientes y futuras. Ordenadas por prioridad.

## En curso / próximo
- **Sección de Videos (clases grabadas de Sophie)** — biblioteca dentro de la plataforma con los videos de YouTube (título + tema + "qué aprenderás"). Con *drip release*: se desbloquea 1 video cada 7 días desde que el alumno empieza, como estrategia de retención y para dar tiempo a estudiar. Pendiente: los ~10 links de YouTube y confirmar la mecánica exacta del desbloqueo.
- **Correo de recuperar contraseña** — el correo de "olvidé mi contraseña" no llega. Verificar config de Resend (dominio `suecoconsophie.com` verificado + `RESEND_API_KEY` en secrets de Supabase + redirect URL `https://suecoconsophie.com/alumnos` permitida en Supabase Auth). Es problema de configuración, no de código.

## Costos / infraestructura
- **Reducir egress de Supabase (en progreso)** — el logo pesaba 2,2 MB y se servía desde Supabase en cada visita (causó el aviso de "grace period" del ciclo pasado). Se optimizó a ~11 KB y se movió al repo (Cloudflare). Pendiente: mover también las fotos `sophie-about.jpg`, `andree-about.jpg`, `sophie.jpg`, `andree.jpg` de Supabase Storage al repo, y borrar el logo gigante viejo del bucket `assets` de Supabase.
- **Mantener plan gratis** — con el egress corregido, el plan Free (5 GB egress, 0,5 GB DB) es suficiente. Revisar el uso cada mes en el dashboard de Supabase.

## Autenticación
- **Integrar Auth nativa de Supabase** — evaluar usar los flujos/UI nativos de Supabase Auth (magic link, recuperación de contraseña, verificación de email) más adelante, para simplificar el sistema actual de `admin-ops` + Resend.

## Plataforma — mejoras de producto
- **Juanita: audios (comprensión auditiva)** — añadir ejercicios de listening con audios a la herramienta de práctica Juanita.
- **Webhook de Stripe** — redesplegar con el filtro de precios de curso (evita crear alumnos por pagos que no son de la membresía) y borrar el alumno "Sandy" creado por error.

## Publicación pendiente
- **Landing rediseñada (feature/landing-nuevo)** — menú superior, páginas de Membresía / Plataforma / Sobre nosotros / Programas Intensivos, login split-screen, SEO en español. Lista para hacer `git push origin main`.
