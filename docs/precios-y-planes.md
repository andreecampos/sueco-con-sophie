# Precios y planes — Sueco con Sophie

*Referencia para las landing pages y el diseño de la oferta. Los números son una propuesta; ajústalos a tu gusto. Lo importante es la **estructura** y la **psicología** de cada escalera.*

---

## Los dos productos (dos compradores distintos)

| | **Producto A — Coaching con Sophie** | **Producto B — App sola** |
|---|---|---|
| Qué incluye | Plataforma + **clase en vivo semanal** + grupo + Sophie | Solo la plataforma (autoservicio) |
| Tipo de ingreso | Activo (limitado por el tiempo de Sophie) | Pasivo y **escalable** (casi ganancia pura) |
| Landing | `suecoconsophie.com` (principal) | `suecoconsophie.com/app` (segunda página, mismo sitio) |
| Descuentos | **Moderados** (usa tiempo de Sophie) | **Agresivos** (marginal casi 0) |

Regla de oro: el coaching **siempre por encima** de la app sola. Compradores distintos → no se canibalizan.

---

## Producto A — Coaching con Sophie (premium)

Solo **dos opciones** (limpio, convierte mejor que 4):

| Plan | Precio | Sale a | Gancho |
|---|---|---|---|
| 1 mes (nuevos) | **399 kr** | 399/mes | precio nuevo |
| 6 meses | **1.999 kr** | ≈333/mes | "prácticamente 1 mes gratis" ← **empuja este** (retención) |

- **Nuevos** que quieren coaching → **399/mes**, o eligen el plan de 6 meses.
- **Los 104 actuales** (pagaban 250 y 300) → se migran a **339/mes** (grandfathering: su precio especial por ser de los primeros). El nuevo paga 399; el antiguo siente que tiene un trato.
- Descuento moderado a propósito: es premium y consume el tiempo de Sophie.
- **Sin plan de 12 meses** en el coaching — a un año de clases en vivo la gente se compromete menos; 6 meses es el punto dulce.
- Si prefieres que el mensual del plan de 6 meses no baje de los 339 actuales, usa **2.094 kr** (≈349/mes) en vez de 1.999.

---

## Producto B — App sola (autoservicio, escalable)

| Plan | Precio | Sale a | Gancho |
|---|---|---|---|
| 1 mes | **249 kr** | 249/mes | — |
| 6 meses | **1.194 kr** | ≈199/mes | "ahorra 300 kr" |
| 12 meses | **1.990 kr** | ≈166/mes | "casi 3 meses gratis" ← **empuja este** |

- Aquí sí descuentos fuertes: cada suscriptor extra casi no te cuesta.
- El plan anual es el "mejor negocio" → hazlo ver como la opción destacada.
- Idea de captación: **precio de fundador** (primeros 100 a un precio especial "para siempre").

---

## Psicología de la escalera (por qué funciona)

1. **Más largo el compromiso = más barato el mes.** El cliente siente que "ahorra".
2. **Te paga por adelantado** → caja para ti.
3. **Se queda más tiempo** → menos churn, mejores resultados, más renovaciones.
4. **Precios psicológicos:** 339 (no 340), 1.990 (no 2.000).
5. **Ancla:** muestra siempre el precio mensual al lado del plan largo, para que el ahorro se vea.

---

## Cómo se ve en tu dashboard

- Cualquier pago (cualquier link de Stripe) cae solo en tu plataforma vía el webhook: guarda **precio**, **estado** y `stripe_customer_id`.
- Hoy ves el **precio** de cada alumno (339, 249, 1.990…) y su estado.
- **Pendiente (ajuste chico):** agregar una **etiqueta de plan/producto** por alumno (ej. *"App sola · 12 meses"* o *"Coaching · mensual"*), leyendo el producto de Stripe. Se hace después del lanzamiento.

---

## Orden recomendado (no todo a la vez)

1. **Lanzar primero:** migrar los 104 a 339 + subdominio `app.suecoconsophie.com` + SMTP (recuperar contraseña).
2. **Después:** landing principal (coaching) + segunda página (app sola) con estas escaleras.
3. **Al final:** etiqueta de plan en el dashboard para ver quién compró qué.
