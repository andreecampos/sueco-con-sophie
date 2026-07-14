-- ═══════════════════════════════════════════════════════════════════
-- Migración: sistema de progreso unificado
-- Fecha: 2026-07-14
-- Rama: feature/unified-progress-system
--
-- Crea UNA tabla genérica de progreso para todos los módulos
-- (theory, grammar, listening, y futuros como vocabulary).
-- Tala ya tiene su propia tabla `tala_progress` y se sigue usando;
-- la capa de cálculo la lee de allí (no se duplica).
--
-- Principios:
--  · 1 fila por (alumno, módulo, contenido). Nunca una fila por clic.
--  · upsert sobre la clave única → repetir NO crea filas nuevas.
--  · No se guarda el porcentaje: se calcula desde filas completadas / total activo.
--  · RLS estricto: cada alumno solo ve/edita SU progreso.
--  · Compatible con datos existentes (no borra nada). Backfill desde
--    localStorage lo hace el cliente la primera vez (idempotente).
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.user_progress (
  user_id       uuid        not null references auth.users(id) on delete cascade,
  module_type   text        not null,           -- 'theory' | 'grammar' | 'listening' | 'vocabulary' ...
  content_id    text        not null,           -- id estable del contenido (unidad, tema, audio…)
  level         text,                            -- 'A' | 'B' | 'C' | 'D' | null (temas sin nivel)
  status        text        not null default 'in_progress',  -- 'in_progress' | 'completed'
  progress_value numeric     default 0,          -- 0–100 opcional (paso parcial); no es la fuente de verdad
  score         int,                             -- mejor puntaje opcional
  attempts      int         default 0,
  started_at    timestamptz default now(),
  completed_at  timestamptz,
  updated_at    timestamptz default now(),
  primary key (user_id, module_type, content_id)
);

-- Índices: optimizan las consultas reales del sistema.
--  · idx principal (PK) ya cubre "todo el progreso de un usuario" y upsert por (user, module, content).
--  · Este índice acelera los conteos por módulo/nivel/estado sin escanear todo.
create index if not exists idx_user_progress_module
  on public.user_progress (user_id, module_type, status);
create index if not exists idx_user_progress_level
  on public.user_progress (user_id, module_type, level, status);

-- RLS: cada alumno solo su propia fila.
alter table public.user_progress enable row level security;

drop policy if exists "up_own_select" on public.user_progress;
drop policy if exists "up_own_insert" on public.user_progress;
drop policy if exists "up_own_update" on public.user_progress;

create policy "up_own_select" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "up_own_insert" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "up_own_update" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- (No se define DELETE: el progreso no se borra desde el cliente.)

-- updated_at automático
create or replace function public.touch_user_progress()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_touch_user_progress on public.user_progress;
create trigger trg_touch_user_progress
  before update on public.user_progress
  for each row execute function public.touch_user_progress();
