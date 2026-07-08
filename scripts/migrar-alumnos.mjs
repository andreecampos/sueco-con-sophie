#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════
 *  MIGRACIÓN DE ALUMNOS DE STRIPE → PLATAFORMA (Supabase + correo Resend)
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Qué hace (una sola vez, en lotes):
 *   1. Lee de Stripe TODAS las suscripciones ACTIVAS (los que ya pagan).
 *   2. Por cada alumno que NO exista aún en la plataforma:
 *        - crea su usuario en Supabase (SIN cobrarle nada),
 *        - lo guarda en la tabla `students` con su precio real y estado activo,
 *        - genera un link para poner contraseña y le envía el correo por Resend.
 *   3. Salta a los que ya tienen cuenta (no los duplica).
 *
 *  NO cambia el precio de nadie: importa a cada uno con el precio que ya paga
 *  (grandfathering). Subir a 339 es un paso aparte (script distinto).
 *
 *  SEGURIDAD: todas las llaves se leen de variables de entorno. NADA va escrito
 *  en el código. Corre SIEMPRE primero en modo prueba (dry-run) y en lotes chicos.
 *
 * ─── Cómo usarlo ────────────────────────────────────────────────────────
 *   npm install stripe @supabase/supabase-js        (una vez)
 *
 *   # 1) Configura tus llaves en la terminal (NO las pegues en ningún archivo):
 *   export STRIPE_SECRET_KEY="sk_live_..."
 *   export SUPABASE_URL="https://xxxx.supabase.co"
 *   export SUPABASE_SERVICE_ROLE_KEY="eyJ..."
 *   export RESEND_API_KEY="re_..."
 *   export APP_URL="https://app.suecoconsophie.com"                 # a dónde llega el link del correo
 *   export RESEND_FROM="Sueco con Sophie <noreply@suecoconsophie.com>"  # tu dominio verificado
 *
 *   # 2) PRUEBA sin tocar nada (solo lista lo que haría):
 *   node scripts/migrar-alumnos.mjs
 *
 *   # 3) Lote pequeño DE VERDAD (crea cuentas y envía correos a 5 personas):
 *   node scripts/migrar-alumnos.mjs --live --limit 5
 *
 *   # 4) Cuando el lote de prueba te llegue bien, corre el resto:
 *   node scripts/migrar-alumnos.mjs --live
 *
 *   Opciones:
 *     --live            Ejecuta de verdad (por defecto es prueba, no cambia nada).
 *     --limit N         Procesa solo N alumnos (para probar por lotes).
 *     --email x@y.com   Procesa solo ese correo (para una prueba con tu propio email).
 *     --no-email        Crea las cuentas pero NO envía correos (útil para importar callado).
 *     --resend-existing Reenvía el correo a los que YA tienen cuenta (por si se perdió).
 * ─────────────────────────────────────────────────────────────────────────
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// ── Configuración desde variables de entorno ────────────────────────────
const {
  STRIPE_SECRET_KEY,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY,
  APP_URL = 'https://app.suecoconsophie.com',
  RESEND_FROM = 'Sueco con Sophie <hola@suecoconsophie.com>',
} = process.env;

// ── Flags ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const NO_EMAIL = args.includes('--no-email');
const RESEND_EXISTING = args.includes('--resend-existing');
const LIMIT = (() => { const i = args.indexOf('--limit'); return i !== -1 ? parseInt(args[i + 1], 10) : Infinity; })();
const ONLY_EMAIL = (() => { const i = args.indexOf('--email'); return i !== -1 ? (args[i + 1] || '').toLowerCase() : null; })();

// ── Validación de llaves ─────────────────────────────────────────────────
function requireEnv() {
  const missing = [];
  if (!STRIPE_SECRET_KEY) missing.push('STRIPE_SECRET_KEY');
  if (!SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!NO_EMAIL && !RESEND_API_KEY) missing.push('RESEND_API_KEY (o corre con --no-email)');
  if (missing.length) {
    console.error('❌ Faltan variables de entorno:\n   ' + missing.join('\n   '));
    console.error('\nConfigúralas con export ... (ver instrucciones arriba en el archivo).');
    process.exit(1);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Correo de bienvenida (mismo diseño que el webhook) ──────────────────
function welcomeHtml(actionLink) {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:40px 0;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
      <tr><td style="padding:0;margin:0;">
        <img src="https://nblxzqdtczitpzxdqexz.supabase.co/storage/v1/object/public/assets/logosophie.jpg" alt="Sueco con Sophie" width="600" style="width:100%;max-width:600px;display:block;border:0;"/>
      </td></tr>
      <tr><td style="padding:48px 48px 40px;">
        <h1 style="margin:0 0 20px;color:#003f6b;font-size:26px;font-weight:800;line-height:1.3;">¡Tu plataforma de Sueco con Sophie ya está lista! 🇸🇪</h1>
        <p style="margin:0 0 20px;color:#2d3748;font-size:16px;line-height:1.8;">¡Buenas noticias! Como ya eres alumno/a, ahora tienes acceso a la nueva plataforma con teoría, práctica de gramática, comprensión auditiva y prueba de nivel — <strong>sin ningún costo extra</strong>, ya está incluido en tu suscripción.</p>
        <p style="margin:0 0 36px;color:#2d3748;font-size:16px;line-height:1.8;">Solo te queda un paso: crea tu contraseña y entra.</p>
        <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-bottom:16px;">
          <a href="${actionLink}" style="display:inline-block;background:linear-gradient(135deg,#006AA7 0%,#003f6b 100%);color:#ffffff;text-decoration:none;font-size:18px;font-weight:800;padding:18px 48px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(0,106,167,0.45);">🔑 Crear mi contraseña</a>
        </td></tr></table>
        <p style="margin:0 0 32px;text-align:center;color:#a0aec0;font-size:13px;">Este enlace expira en 24 horas · Si no funciona el botón, copia el link de abajo</p>
        <div style="background:#f7fafc;border-radius:10px;padding:16px 20px;"><p style="margin:0;color:#718096;font-size:12px;line-height:1.6;word-break:break-all;">${actionLink}</p></div>
      </td></tr>
      <tr><td style="background:#003f6b;padding:28px 48px;text-align:center;">
        <p style="margin:0 0 6px;color:#FECC02;font-size:15px;font-weight:700;letter-spacing:0.5px;">SUECO CON SOPHIE</p>
        <p style="margin:0 0 12px;color:#90cdf4;font-size:13px;">Aprende sueco. Conéctate. Expande tu mundo.</p>
        <p style="margin:0;color:#4a7fa5;font-size:11px;">Si no reconoces este correo, puedes ignorarlo.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

async function sendWelcomeEmail(email, actionLink) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: email,
      subject: '¡Tu plataforma de Sueco con Sophie ya está lista! 🇸🇪',
      html: welcomeHtml(actionLink),
    }),
  });
  if (!res.ok) throw new Error('Resend HTTP ' + res.status + ': ' + (await res.text()));
}

// ── Programa principal ───────────────────────────────────────────────────
async function main() {
  requireEnv();

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log('\n══════════════════════════════════════════════════════');
  console.log('  MIGRACIÓN DE ALUMNOS · Stripe → Plataforma');
  console.log('  Modo:', LIVE ? '🔴 DE VERDAD (--live)' : '🟢 PRUEBA (no cambia nada)');
  if (LIMIT !== Infinity) console.log('  Límite:', LIMIT, 'alumnos');
  if (ONLY_EMAIL) console.log('  Solo el correo:', ONLY_EMAIL);
  if (NO_EMAIL) console.log('  Correos: DESACTIVADOS (--no-email)');
  console.log('  Link del correo apunta a:', APP_URL);
  console.log('  Enviado desde:', RESEND_FROM);
  console.log('══════════════════════════════════════════════════════\n');

  // 1. Alumnos que ya existen en la plataforma (para no duplicar)
  const existing = new Set();
  {
    let from = 0;
    while (true) {
      const { data, error } = await sb.from('students').select('email').range(from, from + 999);
      if (error) { console.error('Error leyendo students:', error.message); break; }
      (data || []).forEach((r) => r.email && existing.add(r.email.toLowerCase()));
      if (!data || data.length < 1000) break;
      from += 1000;
    }
  }
  console.log(`Ya hay ${existing.size} alumnos en la plataforma.\n`);

  // 2. Recorrer suscripciones ACTIVAS de Stripe
  const report = [];
  const seenThisRun = new Set();
  let processed = 0, created = 0, skipped = 0, emailed = 0, errors = 0, dupes = 0;

  for await (const sub of stripe.subscriptions.list({ status: 'active', expand: ['data.customer'], limit: 100 })) {
    if (processed >= LIMIT) break;

    const customer = sub.customer;
    if (!customer || customer.deleted) continue;
    const email = (customer.email || '').toLowerCase();
    const name = customer.name || '';
    if (!email || !email.includes('@')) { report.push({ email: '(sin email)', action: 'saltado-sin-email' }); continue; }
    if (ONLY_EMAIL && email !== ONLY_EMAIL) continue;

    // Suscripción DUPLICADA en Stripe: misma persona con 2+ suscripciones activas.
    // La procesamos una sola vez (evita correos dobles) y la contamos como aviso.
    if (seenThisRun.has(email)) {
      dupes++;
      report.push({ email, action: 'duplicado-en-stripe (posible doble cobro)', price: null });
      console.log(`⚠️  ${email} — suscripción DUPLICADA en Stripe (ya procesado en esta corrida · revisa si paga doble)`);
      continue;
    }
    seenThisRun.add(email);

    const priceItem = sub.items?.data?.[0]?.price;
    const priceSek = priceItem?.unit_amount ? Math.round(priceItem.unit_amount / 100) : null;
    const alreadyHas = existing.has(email);

    processed++;

    // Ya tiene cuenta
    if (alreadyHas && !RESEND_EXISTING) {
      skipped++;
      report.push({ email, action: 'ya-existe (saltado)', price: priceSek });
      console.log(`⏭️  ${email} — ya tiene cuenta`);
      continue;
    }

    try {
      if (!LIVE) {
        report.push({ email, action: alreadyHas ? 'reenviaría-correo' : 'crearía-cuenta+correo', price: priceSek });
        console.log(`🔎 ${email} — ${alreadyHas ? 'reenviaría correo' : 'crearía cuenta y enviaría correo'} (precio ${priceSek} SEK)`);
        continue;
      }

      // Crear/obtener usuario + link (type invite NO envía correo de Supabase; lo enviamos nosotros)
      const { data: linkData, error: linkErr } = await sb.auth.admin.generateLink({
        type: alreadyHas ? 'recovery' : 'invite',
        email,
        options: { data: { name }, redirectTo: APP_URL },
      });
      if (linkErr) throw new Error('generateLink: ' + linkErr.message);
      const userId = linkData?.user?.id;
      const actionLink = linkData?.properties?.action_link;
      if (!userId) throw new Error('sin userId');

      // Guardar en students con su precio real (grandfathering)
      const { error: upErr } = await sb.from('students').upsert({
        id: userId,
        name: name || email.split('@')[0],
        email,
        active: true,
        status: 'active',
        cancels_at: null,
        price: priceSek ?? 250,
        payment_method: 'stripe',
        stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : customer.id,
        stripe_subscription_id: sub.id,
        created_at: new Date().toISOString(),
      }, { onConflict: 'id' });
      if (upErr) throw new Error('upsert students: ' + upErr.message);

      if (!alreadyHas) created++;

      // Enviar el correo
      if (!NO_EMAIL && actionLink) {
        await sendWelcomeEmail(email, actionLink);
        emailed++;
        await sleep(600); // no saturar Resend / evitar spam
      }

      report.push({ email, action: alreadyHas ? 'correo-reenviado' : 'cuenta-creada+correo', price: priceSek });
      console.log(`✅ ${email} — ${alreadyHas ? 'correo reenviado' : 'cuenta creada'}${!NO_EMAIL ? ' + correo enviado' : ''}`);
    } catch (e) {
      errors++;
      report.push({ email, action: 'ERROR: ' + e.message, price: priceSek });
      console.error(`❌ ${email} — ${e.message}`);
    }
  }

  // 3. Resumen + reporte CSV
  console.log('\n─────────────── RESUMEN ───────────────');
  console.log('Procesados:', processed);
  console.log('Cuentas creadas:', created);
  console.log('Correos enviados:', emailed);
  console.log('Saltados (ya existían):', skipped);
  console.log('⚠️  Duplicados en Stripe (posible doble cobro):', dupes);
  console.log('Errores:', errors);
  if (!LIVE) console.log('\n⚠️  Fue una PRUEBA. Nada cambió. Corre con --live para ejecutar.');

  const fs = await import('node:fs');
  const csv = 'email,accion,precio_sek\n' + report.map((r) => `${r.email},${r.action},${r.price ?? ''}`).join('\n');
  const outFile = `migracion-reporte-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.csv`;
  fs.writeFileSync(outFile, csv);
  console.log('\n📄 Reporte guardado en:', outFile);
}

main().catch((e) => { console.error('\nError fatal:', e); process.exit(1); });
