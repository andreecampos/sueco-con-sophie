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
    // no por una contraseña compartida. create_portal_session y send_support quedan libres
    // porque las usan los propios alumnos (portal de pago / enviar mensaje de soporte).
    if (action !== 'create_portal_session' && action !== 'send_support' && action !== 'public_reset') {
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
        // Protección: si el correo es de un ADMIN, NO borrar su cuenta de Auth
        // (para no quedarte sin acceso a /admin al borrarte como alumno).
        const ADMIN_EMAILS2 = (Deno.env.get('ADMIN_EMAILS') || 'sophie.sahlin@hotmail.com,orlandoandree1998@gmail.com')
          .split(',').map((e) => e.trim().toLowerCase())
        const { data: st } = await sb.from('students').select('email').eq('id', id).single()
        const isAdmin = st?.email && ADMIN_EMAILS2.includes(String(st.email).toLowerCase())
        await sb.from('students').delete().eq('id', id)
        if (!isAdmin) {
          await sb.auth.admin.deleteUser(id)
        }
        return new Response(JSON.stringify({ ok: true, keptAuth: !!isAdmin }), { headers: corsHeaders })
      }

      case 'reset_devices': {
        const { id } = data
        const { error } = await sb.from('students').update({ device_keys: [] }).eq('id', id)
        if (error) throw error
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      // ── Olvidé mi contraseña (público): genera el enlace y lo envía por Resend ──
      case 'public_reset': {
        const email = String(data.email || '').trim().toLowerCase()
        if (!email || !email.includes('@')) {
          return new Response(JSON.stringify({ error: 'Correo no válido' }), { status: 400, headers: corsHeaders })
        }
        // Por seguridad respondemos ok siempre (no revelamos si el correo existe).
        try {
          const { data: linkData } = await sb.auth.admin.generateLink({
            type: 'recovery',
            email,
            options: { redirectTo: 'https://app.suecoconsophie.com' }
          })
          const actionLink = linkData?.properties?.action_link
          if (actionLink) await sendAccessEmail(email, actionLink)
        } catch (e) {
          console.log('public_reset (no crítico):', (e as any)?.message)
        }
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

      // ── Cambiar el correo de un alumno (ej. el esposo pagó, pero la cuenta la usa la esposa) ──
      case 'change_email': {
        const { id, newEmail } = data
        const email = String(newEmail || '').trim().toLowerCase()
        if (!id || !email.includes('@')) {
          return new Response(JSON.stringify({ error: 'Correo no válido' }), { status: 400, headers: corsHeaders })
        }
        const { error: authErr } = await sb.auth.admin.updateUserById(id, { email, email_confirm: true })
        if (authErr) throw authErr
        const { error: dbErr } = await sb.from('students').update({ email }).eq('id', id)
        if (dbErr) throw dbErr
        // Generar link de acceso para el nuevo correo y (si se puede) enviarlo
        const { data: linkData } = await sb.auth.admin.generateLink({
          type: 'recovery', email, options: { redirectTo: 'https://app.suecoconsophie.com' }
        })
        const actionLink = linkData?.properties?.action_link || ''
        const sent = await sendAccessEmail(email, actionLink)
        return new Response(JSON.stringify({ ok: true, sent, email, link: actionLink }), { headers: corsHeaders })
      }

      // ── Cambiar la contraseña de un alumno (la pone el admin) ──
      case 'set_password': {
        const { id, password } = data
        if (!id || !password || String(password).length < 6) {
          return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 6 caracteres' }), { status: 400, headers: corsHeaders })
        }
        const { error } = await sb.auth.admin.updateUserById(id, { password: String(password) })
        if (error) throw error
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      // ── Soporte: el alumno envía un mensaje → te llega a tu correo ──
      case 'send_support': {
        const { name = '', email = '', message = '', tipo = 'Mensaje' } = data
        if (!message || !email) {
          return new Response(JSON.stringify({ error: 'Falta correo o mensaje' }), { status: 400, headers: corsHeaders })
        }
        const resendKey = Deno.env.get('RESEND_API_KEY')
        const toInbox = Deno.env.get('SUPPORT_EMAIL') || 'orlandoandree1998@gmail.com'
        if (!resendKey) {
          return new Response(JSON.stringify({ error: 'Correo no configurado' }), { status: 500, headers: corsHeaders })
        }
        const safe = (s: string) => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;')
        const html = `<div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#003f6b;color:#fff;padding:18px 24px;border-radius:12px 12px 0 0;">
            <h2 style="margin:0;font-size:18px;">📨 Soporte Sueco con Sophie</h2>
            <p style="margin:4px 0 0;color:#90cdf4;font-size:13px;">${safe(tipo)}</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px;">
            <p style="margin:0 0 8px;color:#374151;"><strong>De:</strong> ${safe(name) || '(sin nombre)'} &lt;${safe(email)}&gt;</p>
            <p style="margin:0 0 16px;color:#374151;"><strong>Mensaje:</strong></p>
            <div style="background:#f7fafc;border-radius:10px;padding:16px;color:#1f2937;line-height:1.7;white-space:pre-wrap;">${safe(message)}</div>
            <p style="margin:20px 0 0;color:#9ca3af;font-size:12px;">Responde directamente a este correo para contestarle a ${safe(email)}.</p>
          </div>
        </div>`
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Soporte Sueco con Sophie <hola@suecoconsophie.com>',
            to: toInbox,
            reply_to: email,
            subject: `Soporte Sueco con Sophie — ${tipo} de ${name || email}`,
            html,
          }),
        })
        const r = await res.json()
        console.log('send_support Resend:', JSON.stringify(r))
        return new Response(JSON.stringify({ ok: res.ok }), { headers: corsHeaders })
      }

      // ── Reseñas: moderación (solo admin) ──────────────────────
      case 'list_reviews': {
        const { data: reviews, error } = await sb
          .from('reviews').select('*').order('created_at', { ascending: false })
        if (error) throw error
        return new Response(JSON.stringify({ reviews: reviews || [] }), { headers: corsHeaders })
      }

      case 'moderate_review': {
        const { id, status } = data // 'approved' | 'hidden' | 'pending'
        if (!id || !['approved', 'hidden', 'pending'].includes(status)) {
          return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400, headers: corsHeaders })
        }
        const { error } = await sb.from('reviews').update({ status }).eq('id', id)
        if (error) throw error
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
      }

      case 'delete_review': {
        const { id } = data
        const { error } = await sb.from('reviews').delete().eq('id', id)
        if (error) throw error
        return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
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
        try {
          const portalSession = await stripe.billingPortal.sessions.create({
            customer: customer_id,
            return_url: return_url || 'https://app.suecoconsophie.com',
          })
          return new Response(JSON.stringify({ url: portalSession.url }), { headers: corsHeaders })
        } catch (se) {
          // Registrar el mensaje COMPLETO de Stripe para diagnóstico
          console.error('create_portal_session Stripe error:', se?.type, se?.code, se?.statusCode, se?.message, se?.raw?.message)
          return new Response(JSON.stringify({
            error: se?.message || 'stripe_error',
            stripe_code: se?.code || null,
            stripe_type: se?.type || null,
          }), { status: 200, headers: corsHeaders })
        }
      }

      // Progreso completo de un alumno (solo lectura). El admin ve el MISMO
      // estado que el alumno; se calcula en el cliente reutilizando la lógica.
      case 'student_report': {
        const { id } = data
        if (!id) return new Response(JSON.stringify({ error: 'No id' }), { status: 400, headers: corsHeaders })
        const [stu, up, exam, vocab, tala, medb, nivel] = await Promise.all([
          sb.from('students').select('*').eq('id', id).single(),
          sb.from('user_progress').select('*').eq('user_id', id),
          sb.from('exam_progress').select('*').eq('user_id', id),
          sb.from('vocabulary_progress').select('*').eq('user_id', id),
          sb.from('tala_progress').select('*').eq('user_id', id),
          sb.from('medborgarskap_progress').select('*').eq('user_id', id),
          sb.from('nivel_resultados').select('*').eq('student_id', id).order('created_at', { ascending: false }).limit(5),
        ])
        return new Response(JSON.stringify({
          student: stu.data || null,
          user_progress: up.data || [],
          exam_progress: exam.data || [],
          vocabulary_progress: vocab.data || [],
          tala_progress: tala.data || [],
          medborgarskap_progress: medb.data || [],
          nivel_resultados: nivel.data || [],
        }), { headers: corsHeaders })
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