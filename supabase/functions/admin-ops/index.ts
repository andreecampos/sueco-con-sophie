import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
          return_url: return_url || 'https://suecoconsophie.com',
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