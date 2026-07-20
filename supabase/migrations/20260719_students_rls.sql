-- ═══════════════════════════════════════════════════════════════════
-- RLS de la tabla `students` (seguridad de datos de los alumnos)
-- Objetivo: que NINGÚN alumno pueda leer ni modificar la fila de otro.
--
-- IMPORTANTE antes de aplicar:
--  · El panel de admin NO se ve afectado: usa la edge function `admin-ops`
--    con la SERVICE ROLE KEY, que salta RLS.
--  · El webhook de Stripe tampoco: usa la service key (crea/actualiza filas).
--  · El cliente (alumno) solo necesita: LEER su propia fila y ACTUALIZAR
--    únicamente `device_keys` y `last_login` (login/logout).
--
-- Verifica primero si RLS ya está activa (probablemente sí, en producción):
--    select relrowsecurity from pg_class where relname = 'students';
--  (t = activada, f = desactivada)
-- ═══════════════════════════════════════════════════════════════════

alter table public.students enable row level security;

-- Cada alumno solo VE su propia fila
drop policy if exists "students_own_select" on public.students;
create policy "students_own_select" on public.students
  for select using (auth.uid() = id);

-- Cada alumno solo ACTUALIZA su propia fila...
drop policy if exists "students_own_update" on public.students;
create policy "students_own_update" on public.students
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ...y SOLO las columnas device_keys y last_login (no puede tocar
-- active, status, price, email, etc.). Así no puede reactivarse ni
-- cambiar su precio desde la consola.
revoke update on public.students from authenticated;
grant update (device_keys, last_login) on public.students to authenticated;

-- (No se define INSERT ni DELETE para el cliente: las filas de alumnos
--  las crean/borran el webhook de Stripe y el admin con la service key.)
