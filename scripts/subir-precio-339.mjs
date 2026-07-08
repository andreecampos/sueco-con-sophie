#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════
 *  SUBIR EL PRECIO DE LAS SUSCRIPCIONES ACTIVAS A 339 kr/mes (Stripe)
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Cambia cada suscripción activa al nuevo precio de 339 kr/mes. Usa
 *  proration_behavior = 'none': el alumno NO recibe ningún cobro sorpresa;
 *  el nuevo precio se aplica a partir de su PRÓXIMA renovación normal.
 *
 *  ⚠️  AVISO LEGAL — LÉELO ANTES DE CORRER ESTO ⚠️
 *  En Suecia / la UE, subir el precio de una suscripción en curso exige
 *  AVISAR al cliente CON ANTELACIÓN (normalmente ~30 días) y darle la opción
 *  de cancelar antes de que el nuevo precio entre en vigor. El orden correcto es:
 *      1) Enviar un correo avisando del cambio (de 250/300 → 339) y desde cuándo.
 *      2) Esperar el plazo de aviso.
 *      3) RECIÉN AHÍ correr este script con --live.
 *  Saltarte el aviso puede generar quejas, contracargos y problemas legales.
 *  Este script NO envía el aviso; eso lo haces tú primero.
 *
 *  SEGURIDAD: las llaves solo por variables de entorno. Modo prueba por defecto.
 *
 * ─── Cómo usarlo ────────────────────────────────────────────────────────
 *   npm install stripe        (si no lo hiciste ya)
 *
 *   # 1) Crea el precio de 339 en Stripe (Dashboard → Products → tu producto →
 *   #    Add price → 339 SEK, Recurring, Monthly). Copia su ID (price_...).
 *
 *   # 2) Configura tus llaves:
 *   export STRIPE_SECRET_KEY="sk_live_..."
 *   export STRIPE_PRICE_339="price_..."      # el ID del precio de 339 kr/mes
 *
 *   # 3) PRUEBA (no cambia nada, solo muestra a quién subiría):
 *   node scripts/subir-precio-339.mjs
 *
 *   # 4) Un caso de prueba de verdad (tu propia suscripción de test):
 *   node scripts/subir-precio-339.mjs --live --email tu-correo@ejemplo.com
 *
 *   # 5) Cuando estés seguro y ya avisaste a los alumnos:
 *   node scripts/subir-precio-339.mjs --live
 *
 *   Opciones:
 *     --live         Ejecuta de verdad (por defecto es prueba).
 *     --limit N      Solo N suscripciones (para probar por lotes).
 *     --email x@y    Solo esa persona.
 *     --now          Cobra la diferencia de inmediato (prorrateo). Por defecto NO:
 *                    el precio nuevo entra en la próxima renovación (recomendado).
 * ─────────────────────────────────────────────────────────────────────────
 */

import Stripe from 'stripe';

const { STRIPE_SECRET_KEY, STRIPE_PRICE_339 } = process.env;

const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const NOW = args.includes('--now');
const LIMIT = (() => { const i = args.indexOf('--limit'); return i !== -1 ? parseInt(args[i + 1], 10) : Infinity; })();
const ONLY_EMAIL = (() => { const i = args.indexOf('--email'); return i !== -1 ? (args[i + 1] || '').toLowerCase() : null; })();

const NEW_AMOUNT = 33900; // 339 kr en öre
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_339) {
    console.error('❌ Faltan variables: STRIPE_SECRET_KEY y/o STRIPE_PRICE_339');
    console.error('   Crea el precio de 339 en el Dashboard de Stripe y exporta su ID en STRIPE_PRICE_339.');
    process.exit(1);
  }
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

  // Verificar que el precio de 339 es correcto
  let price339;
  try {
    price339 = await stripe.prices.retrieve(STRIPE_PRICE_339);
  } catch (e) {
    console.error('❌ No pude leer STRIPE_PRICE_339:', e.message);
    process.exit(1);
  }
  if (price339.unit_amount !== NEW_AMOUNT) {
    console.error(`❌ El precio ${STRIPE_PRICE_339} es ${price339.unit_amount / 100} ${(''+price339.currency).toUpperCase()}, no 339. Revisa el ID.`);
    process.exit(1);
  }

  console.log('\n══════════════════════════════════════════════════════');
  console.log('  SUBIR PRECIO → 339 kr/mes');
  console.log('  Modo:', LIVE ? '🔴 DE VERDAD (--live)' : '🟢 PRUEBA (no cambia nada)');
  console.log('  Cobro:', NOW ? '⚠️ prorrateo inmediato (--now)' : 'en la próxima renovación (recomendado)');
  if (LIMIT !== Infinity) console.log('  Límite:', LIMIT);
  if (ONLY_EMAIL) console.log('  Solo:', ONLY_EMAIL);
  console.log('══════════════════════════════════════════════════════');
  if (LIVE) console.log('  ⚠️  ¿Ya avisaste a los alumnos del cambio de precio? (obligatorio legalmente)\n');

  const report = [];
  let processed = 0, updated = 0, already = 0, errors = 0;

  for await (const sub of stripe.subscriptions.list({ status: 'active', expand: ['data.customer'], limit: 100 })) {
    if (processed >= LIMIT) break;
    const customer = sub.customer;
    const email = (customer && !customer.deleted && customer.email || '').toLowerCase();
    if (ONLY_EMAIL && email !== ONLY_EMAIL) continue;

    const item = sub.items?.data?.[0];
    if (!item) continue;
    const current = item.price?.unit_amount ?? null;
    processed++;

    // Solo subimos a los que pagan MENOS de 339 (250/300).
    // A los que ya pagan 339 o MÁS (p.ej. los nuevos de 399) NO se les toca.
    if (current != null && current >= NEW_AMOUNT) {
      already++;
      const cur = current / 100;
      report.push({ email, from: cur, to: cur, action: current === NEW_AMOUNT ? 'ya-en-339' : 'ya-paga-mas (no se toca)' });
      console.log(`⏭️  ${email} — ya paga ${cur} kr (>= 339, no se toca)`);
      continue;
    }

    if (!LIVE) {
      report.push({ email, from: current != null ? current / 100 : '?', to: 339, action: 'subiría' });
      console.log(`🔎 ${email} — subiría de ${current != null ? current / 100 : '?'} → 339`);
      continue;
    }

    try {
      await stripe.subscriptions.update(sub.id, {
        items: [{ id: item.id, price: STRIPE_PRICE_339 }],
        proration_behavior: NOW ? 'create_prorations' : 'none',
      });
      updated++;
      report.push({ email, from: current != null ? current / 100 : '?', to: 339, action: 'subido' });
      console.log(`✅ ${email} — subido de ${current != null ? current / 100 : '?'} → 339`);
      await sleep(300);
    } catch (e) {
      errors++;
      report.push({ email, from: current != null ? current / 100 : '?', to: 339, action: 'ERROR: ' + e.message });
      console.error(`❌ ${email} — ${e.message}`);
    }
  }

  console.log('\n─────────────── RESUMEN ───────────────');
  console.log('Procesadas:', processed);
  console.log('Subidas a 339:', updated);
  console.log('Ya estaban en 339:', already);
  console.log('Errores:', errors);
  if (!LIVE) console.log('\n⚠️  Fue una PRUEBA. Nada cambió. Corre con --live (después de avisar a los alumnos).');

  const fs = await import('node:fs');
  const csv = 'email,precio_antes,precio_despues,accion\n' + report.map((r) => `${r.email},${r.from},${r.to},${r.action}`).join('\n');
  const out = `subida-precio-reporte-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.csv`;
  fs.writeFileSync(out, csv);
  console.log('\n📄 Reporte guardado en:', out);
}

main().catch((e) => { console.error('\nError fatal:', e); process.exit(1); });
