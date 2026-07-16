-- ═══════════════════════════════════════════════════════════════════
-- Migración: Examen Final por nivel (Medalla SFI A/B/C/D)
-- 1 fila por (alumno, nivel). Guarda si aprobó (medalla), mejor puntaje
-- y la fecha del último intento (para el bloqueo de 7 días).
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.exam_progress (
  user_id         uuid    not null references auth.users(id) on delete cascade,
  level           text    not null,                 -- 'A' | 'B' | 'C' | 'D'
  passed          boolean default false,            -- medalla conseguida
  best_score      int     default 0,                -- mejor % obtenido
  last_attempt_at timestamptz,                       -- para el bloqueo de 7 días
  updated_at      timestamptz default now(),
  primary key (user_id, level)
);

alter table public.exam_progress enable row level security;

drop policy if exists "exam_own_select" on public.exam_progress;
drop policy if exists "exam_own_insert" on public.exam_progress;
drop policy if exists "exam_own_update" on public.exam_progress;

create policy "exam_own_select" on public.exam_progress
  for select using (auth.uid() = user_id);
create policy "exam_own_insert" on public.exam_progress
  for insert with check (auth.uid() = user_id);
create policy "exam_own_update" on public.exam_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
