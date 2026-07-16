-- ═══════════════════════════════════════════════════════════════════
-- Migración: progreso de Medborgarskapsprovet (independiente del resto)
-- 1 fila por (alumno, módulo). Solo el resultado final por upsert.
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.medborgarskap_progress (
  user_id     uuid    not null references auth.users(id) on delete cascade,
  module_id   text    not null,
  completed   boolean default false,
  score       int     default 0,          -- mejor % obtenido en el módulo
  updated_at  timestamptz default now(),
  primary key (user_id, module_id)
);

alter table public.medborgarskap_progress enable row level security;

drop policy if exists "medb_own_select" on public.medborgarskap_progress;
drop policy if exists "medb_own_insert" on public.medborgarskap_progress;
drop policy if exists "medb_own_update" on public.medborgarskap_progress;

create policy "medb_own_select" on public.medborgarskap_progress
  for select using (auth.uid() = user_id);
create policy "medb_own_insert" on public.medborgarskap_progress
  for insert with check (auth.uid() = user_id);
create policy "medb_own_update" on public.medborgarskap_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
