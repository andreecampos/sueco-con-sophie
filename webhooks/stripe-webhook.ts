import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const sb = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// Envía el email de bienvenida usando Resend (requiere dominio verificado en Resend)
// Si no tienes dominio aún, Supabase envía el email de invitación automáticamente
async function sendWelcomeEmail(email: string, actionLink: string): Promise<boolean> {
  const resendKey = Deno.env.get('RESEND_API_KEY')
  if (!resendKey) {
    console.log('No RESEND_API_KEY — skipping custom email (Supabase invite already sent)')
    return true
  }

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
        <tr>
          <td style="padding:0;margin:0;">
            <img src="https://nblxzqdtczitpzxdqexz.supabase.co/storage/v1/object/public/assets/logosophie.jpg" alt="Sueco con Sofi" width="600" style="width:100%;max-width:600px;display:block;border:0;"/>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 48px 40px;">
            <h1 style="margin:0 0 20px;color:#003f6b;font-size:26px;font-weight:800;line-height:1.3;">
              ¡Bienvenido/a a Sueco con Sophie! 🇸🇪
            </h1>
            <p style="margin:0 0 20px;color:#2d3748;font-size:16px;line-height:1.8;">
              Imagina que, dentro de unos meses, puedas hablar sueco con confianza sin miedo en una entrevista, en el trabajo o en tu día a día. Ese cambio empieza hoy.
            </p>
            <p style="margin:0 0 20px;color:#2d3748;font-size:16px;line-height:1.8;">
              Has llegado a una plataforma creada especialmente para hispanos que quieren aprender sueco de forma práctica y natural. Aquí no solo aprenderás el idioma: lo practicarás hasta hacerlo parte de tu vida.
            </p>
            <p style="margin:0 0 36px;color:#2d3748;font-size:16px;line-height:1.8;">
              Tu próximo paso es muy sencillo: crea tu contraseña y comienza esta nueva etapa.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding-bottom:16px;">
                  <a href="${actionLink}" style="display:inline-block;background:linear-gradient(135deg,#006AA7 0%,#003f6b 100%);color:#ffffff;text-decoration:none;font-size:18px;font-weight:800;padding:18px 48px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(0,106,167,0.45);">
                    🔑 Crear mi contraseña
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 32px;text-align:center;color:#a0aec0;font-size:13px;">
              Este enlace expira en 24 horas · Si no funciona el botón, copia el link de abajo
            </p>
            <div style="background:#f7fafc;border-radius:10px;padding:16px 20px;">
              <p style="margin:0;color:#718096;font-size:12px;line-height:1.6;word-break:break-all;">${actionLink}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#003f6b;padding:28px 48px;text-align:center;">
            <p style="margin:0 0 6px;color:#FECC02;font-size:15px;font-weight:700;letter-spacing:0.5px;">SUECO CON SOFI</p>
            <p style="margin:0 0 12px;color:#90cdf4;font-size:13px;">Aprende sueco. Conéctate. Expande tu mundo.</p>
            <p style="margin:0;color:#4a7fa5;font-size:11px;">Si no creaste esta cuenta, puedes ignorar este email.<br/>© 2025 Sueco con Sofi · Todos los derechos reservados</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Sueco con Sofi <onboarding@resend.dev>',
      to: email,
      subject: '¡Bienvenido/a a Sueco con Sophie! 🇸🇪 Crea tu contraseña',
      html,
    }),
  })

  const result = await res.json()
  console.log('Resend response:', JSON.stringify(result))
  return res.ok
}

Deno.serve(async (req) => {
  const sig  = req.headers.get('stripe-signature')
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body, sig!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    )
  } catch (err) {
    console.error('Stripe signature error:', err.message)
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 })
  }

  try {

    // ── Nuevo pago completado ────────────────────────────────
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const email   = session.customer_details?.email ?? session.customer_email ?? ''
      const name    = session.customer_details?.name ?? ''

      if (!email || !email.includes('@')) {
        return new Response(JSON.stringify({ error: 'No email in session' }), { status: 400 })
      }

      // Detectar precio real pagado (Stripe lo da en öre: 33900 = 339 SEK)
      const pricePaid = session.amount_total ? Math.round(session.amount_total / 100) : 339
      console.log('New checkout:', email, '| price paid:', pricePaid, 'SEK')

      // 1. Ver si ya existe
      const { data: existingUsers } = await sb.auth.admin.listUsers()
      const existing = existingUsers?.users?.find(u => u.email === email)
      let userId: string | null = null
      let actionLink = ''

      if (!existing) {
        // Usuario nuevo: invitar vía Supabase (envía email automáticamente)
        const { data: inviteData, error: inviteError } = await sb.auth.admin.inviteUserByEmail(email, {
          data: { name },
          options: { redirectTo: 'https://aquamarine-faloodeh-d0d732.netlify.app' }
        } as any)
        if (inviteError) {
          console.error('inviteUser error:', inviteError.message)
          return new Response(JSON.stringify({ error: inviteError.message }), { status: 500 })
        }
        userId = inviteData?.user?.id ?? null
        console.log('User invited (email sent by Supabase):', email)

        // Intentar también con Resend para el email bonito (si hay dominio configurado)
        const { data: linkData } = await sb.auth.admin.generateLink({
          type: 'recovery',
          email,
          options: { redirectTo: 'https://aquamarine-faloodeh-d0d732.netlify.app' }
        })
        if (linkData?.properties?.action_link) {
          actionLink = linkData.properties.action_link
          await sendWelcomeEmail(email, actionLink)
        }

      } else {
        userId = existing.id
        console.log('User already exists:', email)

        // Para alumnos que repagan, enviar link de acceso
        const { data: linkData } = await sb.auth.admin.generateLink({
          type: 'recovery',
          email,
          options: { redirectTo: 'https://aquamarine-faloodeh-d0d732.netlify.app' }
        })
        if (linkData?.properties?.action_link) {
          actionLink = linkData.properties.action_link
          await sendWelcomeEmail(email, actionLink)
        }
      }

      // 2. Guardar en tabla students (precio real detectado de Stripe)
      if (userId) {
        const { error: upsertError } = await sb.from('students').upsert({
          id:                     userId,
          name:                   name || email.split('@')[0],
          email,
          active:                 true,
          status:                 'active',
          cancels_at:             null,
          price:                  pricePaid,
          payment_method:         'stripe',
          stripe_customer_id:     typeof session.customer === 'string' ? session.customer : null,
          stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
          created_at:             new Date().toISOString(),
        }, { onConflict: 'id' })

        if (upsertError) {
          console.error('Upsert error:', upsertError.message)
        }
      }

      return new Response(JSON.stringify({ ok: true, email }), { status: 200 })
    }

    // ── Suscripción actualizada ──────────────────────────────
    if (event.type === 'customer.subscription.updated') {
      const sub = event.data.object as Stripe.Subscription

      if (sub.cancel_at_period_end && sub.cancel_at) {
        const cancelsAt = new Date(sub.cancel_at * 1000).toISOString()
        console.log('Subscription cancelling at period end:', sub.id, cancelsAt)
        await sb.from('students').update({
          active:     true,
          status:     'cancelling',
          cancels_at: cancelsAt,
        }).eq('stripe_subscription_id', sub.id)

      } else if (sub.status === 'active' && !sub.cancel_at_period_end) {
        console.log('Subscription reactivated:', sub.id)
        await sb.from('students').update({
          active:     true,
          status:     'active',
          cancels_at: null,
        }).eq('stripe_subscription_id', sub.id)

      } else if (sub.status === 'past_due') {
        console.log('Subscription past due:', sub.id)
        await sb.from('students').update({
          active: true,
          status: 'failed',
        }).eq('stripe_subscription_id', sub.id)

      } else if (sub.status !== 'active') {
        console.log('Subscription inactive:', sub.id, sub.status)
        await sb.from('students').update({
          active: false,
          status: 'inactive',
        }).eq('stripe_subscription_id', sub.id)
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    // ── Suscripción eliminada definitivamente ────────────────
    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription
      console.log('Subscription deleted:', sub.id)
      await sb.from('students').update({
        active:     false,
        status:     'cancelled',
        cancels_at: null,
      }).eq('stripe_subscription_id', sub.id)
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    return new Response(JSON.stringify({ ok: true, ignored: event.type }), { status: 200 })

  } catch (err) {
    console.error('Handler error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
