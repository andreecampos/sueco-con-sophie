-- ═══════════════════════════════════════════════════════════════════
-- Migración: progreso de Vokabulär
-- Fecha: 2026-07-16
-- Rama: feature/unified-progress-system
--
-- 1 fila por (alumno, elemento de vocabulario). Nunca por clic/intento.
-- upsert sobre la clave primaria compuesta. No se guarda contenido ni %.
-- Estados: 'learning' | 'mastered'. Dominado = 3 aciertos en sesiones distintas.
-- El % se calcula dinámicamente = mastered / total activo del nivel/categoría.
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.vocabulary_progress (
  user_id             uuid    not null references auth.users(id) on delete cascade,
  vocabulary_id       text    not null,
  correct_count       int     default 0,
  incorrect_count     int     default 0,
  successful_sessions int     default 0,          -- aciertos en sesiones DIFERENTES (máx +1 por sesión)
  status              text    not null default 'learning',  -- 'learning' | 'mastered'
  updated_at          timestamptz default now(),
  primary key (user_id, vocabulary_id)
);

-- Índice para contar por estado sin escanear todo.
create index if not exists idx_vocab_progress_user_status
  on public.vocabulary_progress (user_id, status);

alter table public.vocabulary_progress enable row level security;

drop policy if exists "vocab_own_select" on public.vocabulary_progress;
drop policy if exists "vocab_own_insert" on public.vocabulary_progress;
drop policy if exists "vocab_own_update" on public.vocabulary_progress;

create policy "vocab_own_select" on public.vocabulary_progress
  for select using (auth.uid() = user_id);
create policy "vocab_own_insert" on public.vocabulary_progress
  for insert with check (auth.uid() = user_id);
create policy "vocab_own_update" on public.vocabulary_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
