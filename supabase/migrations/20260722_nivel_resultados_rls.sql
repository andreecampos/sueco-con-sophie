-- ═══════════════════════════════════════════════════════════════════
-- RLS de nivel_resultados — que el ALUMNO pueda LEER su propia prueba de nivel
-- en cualquier dispositivo (celular ↔ PC). No destructivo.
--
-- Problema: en un dispositivo nuevo, el resultado de la prueba de nivel no
-- estaba en localStorage y la tabla no permitía al alumno leer su fila →
-- el inicio mostraba 0% / "haz la prueba de nivel".
--
-- El admin (edge function) y el webhook usan la SERVICE KEY y saltan RLS,
-- así que no se ven afectados.
-- ═══════════════════════════════════════════════════════════════════

alter table public.nivel_resultados enable row level security;

-- El alumno lee SOLO sus propios resultados
drop policy if exists "nivel_own_select" on public.nivel_resultados;
create policy "nivel_own_select" on public.nivel_resultados
  for select using (auth.uid() = student_id);

-- El alumno inserta SOLO resultados con su propio id (guardar su prueba)
drop policy if exists "nivel_own_insert" on public.nivel_resultados;
create policy "nivel_own_insert" on public.nivel_resultados
  for insert with check (auth.uid() = student_id);
