#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 *  LISTAR CORREOS CON 2+ SUSCRIPCIONES ACTIVAS (pagos dobles/triples)
 * ═══════════════════════════════════════════════════════════════
 *  Para saber a quién pedirle el "segundo correo" (pareja/mamá que
 *  paga por otra persona con el mismo correo).
 *
 *  Uso:
 *    export STRIPE_SECRET_KEY="sk_live_..."
 *    node scripts/listar-pagos-dobles.mjs
 *
 *  No cambia nada — solo lee y lista. Guarda un CSV (no se sube a git).
 */
import Stripe from 'stripe';

const { STRIPE_SECRET_KEY } = process.env;
if (!STRIPE_SECRET_KEY) {
  console.error('❌ Falta STRIPE_SECRET_KEY. Corre:  export STRIPE_SECRET_KEY="sk_live_..."');
  process.exit(1);
}
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

async function main() {
  const byEmail = {};
  for await (const sub of stripe.subscriptions.list({ status: 'active', expand: ['data.customer'], limit: 100 })) {
    const c = sub.customer;
    if (!c || c.deleted) continue;
    const email = (c.email || '(sin email)').toLowerCase();
    const amount = sub.items?.data?.[0]?.price?.unit_amount;
    (byEmail[email] = byEmail[email] || []).push({
      id: sub.id,
      amount: amount != null ? amount / 100 : '?',
      name: c.name || '',
    });
  }

  const dobles = Object.entries(byEmail)
    .filter(([, subs]) => subs.length >= 2)
    .sort((a, b) => b[1].length - a[1].length);

  console.log('\n═══════════ CORREOS CON 2+ SUSCRIPCIONES ═══════════\n');
  if (!dobles.length) {
    console.log('✅ Nadie paga doble. Todos tienen una sola suscripción.\n');
    return;
  }
  dobles.forEach(([email, subs]) => {
    const nombre = subs[0].name ? ` (${subs[0].name})` : '';
    console.log(`📧 ${email}${nombre} → ${subs.length} suscripciones: ${subs.map(s => s.amount + ' kr').join(' + ')}`);
  });
  console.log(`\n👉 Total de personas con pago múltiple: ${dobles.length}`);
  console.log('   A cada una pídele el/los correo(s) de las otras personas y créalas manualmente.\n');

  const fs = await import('node:fs');
  const rows = [];
  dobles.forEach(([email, subs]) => subs.forEach((s, i) => rows.push(`${email},${subs[0].name},${i + 1},${s.amount},${s.id}`)));
  fs.writeFileSync('pagos-dobles.csv', 'email,nombre,num,precio_kr,subscription_id\n' + rows.join('\n'));
  console.log('📄 Lista guardada en: pagos-dobles.csv');
}

main().catch((e) => { console.error('Error:', e.message); process.exit(1); });
