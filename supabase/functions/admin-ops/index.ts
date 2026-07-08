import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Reenvía el correo de acceso (crear contraseña) usando Resend, con la misma
// plantilla de bienvenida. Requiere dominio verificado en Resend.
async function sendAccessEmail(email: string, actionLink: string): Promise<boolean> {
  const resendKey = Deno.env.get('RESEND_API_KEY')
  if (!resendKey) return false
  const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
        <tr><td style="padding:0;margin:0;">
          <img src="https://nblxzqdtczitpzxdqexz.supabase.co/storage/v1/object/public/assets/logosophie.jpg" alt="Sueco con Sofi" width="600" style="width:100%;max-width:600px;display:block;border:0;"/>
        </td></tr>
        <tr><td style="padding:48px 48px 40px;">
          <h1 style="margin:0 0 20px;color:#003f6b;font-size:26px;font-weight:800;line-height:1.3;">Tu acceso a Sueco con Sophie 🇸🇪</h1>
          <p style="margin:0 0 20px;color:#2d3748;font-size:16px;line-height:1.8;">Aquí tienes tu enlace para <strong>crear tu contraseña</strong> y entrar a la plataforma. Es muy sencillo:</p>
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-bottom:16px;">
            <a href="${actionLink}" style="display:inline-block;background:linear-gradient(135deg,#006AA7 0%,#003f6b 100%);color:#ffffff;text-decoration:none;font-size:18px;font-weight:800;padding:18px 48px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(0,106,167,0.45);">🔑 Crear mi contraseña</a>
          </td></tr></table>
          <p style="margin:0 0 32px;text-align:center;color:#a0aec0;font-size:13px;">Este enlace expira en 24 horas · Si no funciona el botón, copia el link de abajo</p>
          <div style="background:#f7fafc;border-radius:10px;padding:16px 20px;"><p style="margin:0;color:#718096;font-size:12px;line-height:1.6;word-break:break-all;">${actionLink}</p></div>
        </td></tr>
        <tr><td style="background:#003f6b;padding:28px 48px;text-align:center;">
          <p style="margin:0 0 6px;color:#FECC02;font-size:15px;font-weight:700;letter-spacing:0.5px;">SUECO CON SOFI</p>
          <p style="margin:0 0 12px;color:#90cdf4;font-size:13px;">Aprende sueco. Conéctate. Expande tu mundo.</p>
          <p style="margin:0;color:#4a7fa5;font-size:11px;">Si no esperabas este correo, puedes ignorarlo.<br/>© 2025 Sueco con Sofi · Todos los derechos reservados</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Sueco con Sophie <hola@suecoconsophie.com>',
      to: email,
      subject: '🔑 Tu acceso a Sueco con Sophie — crea tu contraseña',
      html,
    }),
  })
  const result = await res.json()
  console.log('Resend (resend_access) response:', JSON.stringify(result))
  return res.ok
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, data = {} } = await req.json()

    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Seguridad: verificar que quien llama es admin POR SU LOGIN (su token de sesión),
    // no por una contraseña compartida. create_portal_session queda libre porque la usan
    // los propios alumnos para abrir su portal de pago.
    if (action !== 'create_portal_session') {
      const ADMIN_EMAILS = (Deno.env.get('ADMIN_EMAILS') || 'sophie.sahlin@hotmail.com,orlandoandree1998@gmail.com')
        .split(',').map((e) => e.trim().toLowerCase())
      const jwt = (req.headers.get('Authorization') || '').replace('Bearer ', '').trim()
      let callerEmail = ''
      if (jwt) {
        try { const { data: u } = await sb.auth.getUser(jwt); callerEmail = (u?.user?.email || '').toLowerCase() } catch (_e) {}
      }
      if (!callerEmail || !ADMIN_EMAILS.includes(callerEmail)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
      }
    }

    switch (action) {

      case 'list_students': {
        const { data: students, error } = await sb
          .from('students')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        // Adjuntar el nivel más reciente de cada alumno (de la prueba de nivel)
        const { data: niveles } = await sb
          .from('nivel_resultados')
          .select('student_id, nivel, created_at')
          .order('created_at', { ascending: false })
        const nivelByStudent: Record<string, string> = {}
        ;(niveles || []).forEach((n: any) => {
          if (n.student_id && !nivelByStudent[n.student_id]) nivelByStudent[n.student_id] = n.nivel
        })
        const withLevel = (students || []).map((s: any) => ({ ...s, level: nivelByStudent[s.id] || null }))
        return new Response(JSON.stringify({ students: withLevel }), { headers: corsHeaders })
      }

      case 'create_student': {
        const { name, email, studentPassword, status, price, paymentMethod } = data
        // Crear usuario en Supabase Auth
        const { data: user, error: authErr } = await sb.auth.admin.createUser({
          email,
          password: studentPassword,
          email_confirm: true,
          user_metadata: { name }
        })
        if (authErr) throw authErr
        // Crear fila en students
        const { error: dbErr } = await sb.from('students').insert({
          id: user.user.id,
          name,
          email,
          active: status === 'active',
          status,
          price: Number(price) || 250,
          payment_method: paymentMethod || 'manual',
          created_at: new Date().toISOString(),
        })
        if (dbErr) throw dbErr
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      case 'update_student': {
        const { id, fields } = data
        const { error } = await sb.from('students').update(fields).eq('id', id)
        if (error) throw error
        // Si se actualiza active en DB, también en Auth
        if (fields.active !== undefined) {
          await sb.auth.admin.updateUserById(id, { ban_duration: fields.active ? 'none' : '876600h' })
        }
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      case 'delete_student': {
        const { id } = data
        await sb.from('students').delete().eq('id', id)
        await sb.auth.admin.deleteUser(id)
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      case 'reset_devices': {
        const { id } = data
        const { error } = await sb.from('students').update({ device_keys: [] }).eq('id', id)
        if (error) throw error
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      case 'resend_access': {
        let targetEmail = data.email
        if (!targetEmail && data.id) {
          const { data: st } = await sb.from('students').select('email').eq('id', data.id).single()
          targetEmail = st?.email
        }
        if (!targetEmail) {
          return new Response(JSON.stringify({ error: 'No email' }), { status: 400, headers: corsHeaders })
        }
        const { data: linkData, error: linkErr } = await sb.auth.admin.generateLink({
          type: 'recovery',
          email: targetEmail,
          options: { redirectTo: 'https://app.suecoconsophie.com' }
        })
        if (linkErr) throw linkErr
        const actionLink = linkData?.properties?.action_link || ''
        const sent = await sendAccessEmail(targetEmail, actionLink)
        return new Response(JSON.stringify({ ok: true, sent, email: targetEmail, link: actionLink }), { headers: corsHeaders })
      }

      case 'get_config': {
        const { data: config, error } = await sb
          .from('config')
          .select('value')
          .eq('key', 'stripe_config')
          .single()
        if (error && error.code !== 'PGRST116') throw error
        return new Response(JSON.stringify({ config: config?.value || {} }), { headers: corsHeaders })
      }

      case 'save_config': {
        const { config } = data
        const { error } = await sb.from('config').upsert(
          { key: 'stripe_config', value: config },
          { onConflict: 'key' }
        )
        if (error) throw error
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      case 'create_portal_session': {
        const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
          apiVersion: '2023-10-16',
          httpClient: Stripe.createFetchHttpClient(),
        })
        const { customer_id, return_url } = data
        if (!customer_id) {
          return new Response(JSON.stringify({ error: 'No customer_id' }), {
            status: 400, headers: corsHeaders
          })
        }
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: customer_id,
          return_url: return_url || 'https://app.suecoconsophie.com',
        })
        return new Response(JSON.stringify({ url: portalSession.url }), { headers: corsHeaders })
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400, headers: corsHeaders
        })
    }

  } catch (err) {
    console.error('admin-ops error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: corsHeaders
    })
  }
})