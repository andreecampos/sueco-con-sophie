-- ═══════════════════════════════════════════════════════════════
--  TABLA DE RESEÑAS (reviews) + SEGURIDAD (RLS)
--  Córrelo una vez en Supabase → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null,
  name        text not null,
  rating      int  not null check (rating between 1 and 5),
  comment     text,
  verified    boolean not null default false,
  status      text    not null default 'pending',  -- pending | approved | hidden
  created_at  timestamptz not null default now()
);

create index if not exists reviews_status_idx on public.reviews (status, created_at desc);

-- Activar seguridad a nivel de fila
alter table public.reviews enable row level security;

-- 1) Cualquiera (público) puede LEER solo las reseñas APROBADAS
drop policy if exists "reviews_public_read_approved" on public.reviews;
create policy "reviews_public_read_approved"
  on public.reviews for select
  using (status = 'approved');

-- 2) Un alumno con sesión puede CREAR su propia reseña, siempre en estado 'pending'
drop policy if exists "reviews_insert_own_pending" on public.reviews;
create policy "reviews_insert_own_pending"
  on public.reviews for insert
  to authenticated
  with check (auth.uid() = user_id and status = 'pending');

-- (Aprobar / ocultar / borrar lo hace el admin desde el panel, que usa la
--  service role key y salta estas reglas. No hace falta política para eso.)
