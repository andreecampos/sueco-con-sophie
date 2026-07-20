-- ═══════════════════════════════════════════════════════════════════
-- Migración: Dashboard de administración (Fase 1)
-- NO DESTRUCTIVA. Solo añade columnas/tablas nuevas (IF NOT EXISTS).
-- Ninguna fila existente se modifica ni se borra. El progreso de los
-- alumnos NO se toca. RLS bloquea al cliente: solo la service key
-- (edge functions) puede escribir en las tablas nuevas.
-- ═══════════════════════════════════════════════════════════════════

-- 1) Columnas nuevas en students (con valores por defecto seguros) ────
ALTER TABLE students ADD COLUMN IF NOT EXISTS phone       text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS type        text DEFAULT 'coaching';
ALTER TABLE students ADD COLUMN IF NOT EXISTS group_id    uuid;
ALTER TABLE students ADD COLUMN IF NOT EXISTS notes       text;
ALTER TABLE students ADD COLUMN IF NOT EXISTS archived_at timestamptz;

-- Índices para filtros/búsqueda rápidos (5.000+ alumnos)
CREATE INDEX IF NOT EXISTS idx_students_status    ON students (status);
CREATE INDEX IF NOT EXISTS idx_students_type       ON students (type);
CREATE INDEX IF NOT EXISTS idx_students_group_id   ON students (group_id);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_students_next_pay   ON students (next_payment_date);

-- 2) Grupos ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS groups (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  created_at  timestamptz DEFAULT now()
);
ALTER TABLE groups ENABLE ROW LEVEL SECURITY; -- sin policies = cliente bloqueado

-- 3) Productos / planes ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  type                text DEFAULT 'plataforma',
  stripe_price_id     text,
  stripe_payment_link text,
  price               numeric,
  currency            text DEFAULT 'SEK',
  interval            text DEFAULT 'month',
  active              boolean DEFAULT true,
  created_at          timestamptz DEFAULT now()
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS user_products (
  user_id            uuid NOT NULL,
  product_id         uuid NOT NULL,
  status             text DEFAULT 'active',
  current_period_end timestamptz,
  created_at         timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);
ALTER TABLE user_products ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_user_products_user ON user_products (user_id);

-- 4) Notificaciones ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notification_templates (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name    text NOT NULL,
  subject text,
  body    text
);
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS notifications (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type  text NOT NULL,           -- all | group | user | product | level
  target_id    text,
  channel      text DEFAULT 'in_app',   -- in_app | email | both
  title        text NOT NULL,
  body         text,
  template_id  uuid,
  scheduled_at timestamptz,
  sent_at      timestamptz,
  status       text DEFAULT 'draft',    -- draft | scheduled | sent
  created_at   timestamptz DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_notifications_target ON notifications (target_type, target_id);

-- Entregas por alumno (para marcar leído en la campana del alumno)
CREATE TABLE IF NOT EXISTS notification_reads (
  notification_id uuid NOT NULL,
  user_id         uuid NOT NULL,
  read_at         timestamptz,
  PRIMARY KEY (notification_id, user_id)
);
ALTER TABLE notification_reads ENABLE ROW LEVEL SECURITY;
-- El alumno puede leer/actualizar SUS propias entregas:
DROP POLICY IF EXISTS notif_reads_own_select ON notification_reads;
CREATE POLICY notif_reads_own_select ON notification_reads FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS notif_reads_own_update ON notification_reads;
CREATE POLICY notif_reads_own_update ON notification_reads FOR UPDATE USING (auth.uid() = user_id);

-- 5) Registro de acciones de admin (auditoría) ─────────────────────────
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email text,
  action      text,
  target      text,
  details     jsonb,
  created_at  timestamptz DEFAULT now()
);
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════════
-- Nota: las tablas nuevas quedan sin policies de cliente → solo la
-- service key (edge function admin-ops) puede leer/escribir. Esto es
-- intencional y seguro. Para revertir columnas (no recomendado):
--   ALTER TABLE students DROP COLUMN IF EXISTS phone; ... etc.
-- ═══════════════════════════════════════════════════════════════════
