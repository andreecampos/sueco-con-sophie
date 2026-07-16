-- ═══════════════════════════════════════════════════════════════════
-- Migración: Examen Final por nivel (Medalla SFI A/B/C/D)
-- 1 fila por (alumno, nivel).
--   passes_count  · nº de exámenes aprobados (≥80%). Medalla al llegar al
--                   requerido: SFI A/B = 4, SFI C/D = 2.
--   locked_until  · si falla, no puede reintentar hasta esta fecha (7 días).
--                   El administrador no tiene ese límite.
--   best_score, last_attempt_at, updated_at
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.exam_progress (
  user_id         uuid    not null references auth.users(id) on delete cascade,
  level           text    not null,
  passes_count    int     default 0,
  passed          boolean default false,   -- medalla conseguida (passes_count >= requerido)
  best_score      int     default 0,
  locked_until    timestamptz,
  last_attempt_at timestamptz,
  updated_at      timestamptz default now(),
  primary key (user_id, level)
);

-- Si la tabla ya existía de una versión anterior, añade las columnas nuevas.
alter table public.exam_progress add column if not exists passes_count int default 0;
alter table public.exam_progress add column if not exists locked_until timestamptz;

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
