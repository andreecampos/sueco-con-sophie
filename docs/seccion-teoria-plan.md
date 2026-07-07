# Sección Teoría — Plan del camino del estudiante

*El camino tipo Duolingo para aprender sueco dentro de la app. El libro "Gramática Sueca" se usa SOLO como mapa de temas y orden. Todo el texto es original nuestro (cero copia = cero riesgo de copyright).*

---

## 1. Principio pedagógico (la regla de oro)

**Si mi mamá de 65 años no lo entiende, está mal escrito.**

Cada lección de teoría cumple:

- **Frases cortas.** Una idea por frase.
- **Cero jerga.** Nada de "supino", "perífrasis enfática", "complemento predicativo". Si un término técnico es inevitable, se explica con palabras normales primero.
- **Siempre un ejemplo cotidiano.** Comida, familia, compras, el autobús. No ejemplos abstractos.
- **Comparar con el español.** "En sueco esto es al revés que en español" ayuda muchísimo.
- **Un truco memorable cuando exista.** ("Si termina en -ning, siempre es *en*. ¡Nunca falla!")
- **Corto.** 4–8 "tarjetas" de lectura por lección. Se lee en 2–3 minutos.
- **Emoción.** Un emoji, un "¡tú puedes!", una analogía con risa. Que dé gusto volver.

**Flujo de cada lección:** `Leer la teoría → Practicar (preguntas del motor actual) → ✓ Completado` (con racha y progreso visible).

---

## 2. El camino (índice académico → camino amigable)

El libro tiene 17 capítulos en orden de lingüista. Lo reordenamos en un camino que va de lo más útil a lo más complejo. Cada unidad = una parada del camino.

**Estado:**
- ✅ *Reusa* = ya tenemos las preguntas hechas (de los 18 temas de Gramática). Solo falta escribir la teoría → se puede lanzar YA.
- 🆕 *Nuevo* = hay que escribir teoría **y** preguntas nuevas.

| # | Unidad (título amigable) | Capítulo(s) del libro | Nivel | Estado |
|---|--------------------------|-----------------------|-------|--------|
| 0 | Cómo funciona el sueco (bienvenida) | 1.1–1.4 | A | 🆕 (solo teoría, sin práctica) |
| 1 | Tus primeras palabras: saludar y presentarte | — | A | ✅ Reusa (saludos) |
| 2 | Las personas: jag, du, han, hon… | 2.6, 5 | A | ✅ Reusa (pronombres) |
| 3 | Un y una: *en* / *ett* | 2.5, 10.1 | A | ✅ Reusa (articulos) |
| 4 | El y la: la forma definida (boken, huset) | 2.4, 10.2–10.3 | A | ✅ Reusa (forma-definida) |
| 5 | Muchos: los plurales | 10.5–10.9 | A/B | ✅ Reusa (plurales) |
| 6 | Lo que haces ahora: el presente | 2.1, 9.6 | A | ✅ Reusa (presente) |
| 7 | Ser y tener: *vara* y *ha* | 4.9 | A | 🆕 |
| 8 | El orden de las palabras | 3.2, 4.6 | A/B | ✅ Reusa (orden-palabras) |
| 9 | Decir que no: *inte* | 4.1 | A | ✅ Reusa (negación) |
| 10 | Preguntar: sí/no y las palabras interrogativas | 4.2–4.4 | A | ✅ Reusa (preguntas) |
| 11 | Describir cosas: los adjetivos | 2.7, 11 | A | ✅ Reusa (adjetivos) |
| 12 | Dónde están las cosas: preposiciones de lugar | 2.9, 15 | A/B | ✅ Reusa (preposiciones) |
| 13 | Números, la hora y los días | — | A | ✅ Reusa (numeros-tiempo) |
| 14 | Mío y tuyo: los posesivos | 12 | B | ✅ Reusa (posesivos) |
| 15 | Verbos que ayudan: kan, vill, ska, måste | 6.3 | B | ✅ Reusa (modales) |
| 16 | Lo que ya pasó: el pasado | 9.7–9.10 | B | ✅ Reusa (pasado) |
| 17 | Lo que va a pasar: el futuro (ska / kommer att) | 9.2 | B | ✅ Reusa (futuro) |
| 18 | "Ya lo he hecho": el perfecto (har + supino) | 9.1 | B | 🆕 |
| 19 | Unir ideas: och, men, eftersom | 7.1 | B | ✅ Reusa (conjunciones) |
| 20 | Comparar: más grande, el más grande | 14 | B | ✅ Reusa (comparativos) |
| 21 | Este, ese, algún, ningún | 13 | B | 🆕 |
| 22 | Frases largas: oraciones subordinadas | 7, 16 | C | 🆕 |
| 23 | Los sonidos del sueco (pronunciación) | 8 | A–C | 🆕 (solo texto, sin audio por ahora) |
| 24 | Sueco avanzado: pasiva, participios, énfasis | 9.11–9.17, 17 | C | 🆕 |

**Resumen:** 15 unidades se lanzan casi de inmediato (solo escribir teoría, la práctica ya existe). 9 unidades necesitan contenido nuevo completo.

> Nota: los números de nivel (A/B/C) son mi propuesta y Sophie los ajusta. El libro no viene ordenado por SFI.

---

## 3. Cómo se guarda el progreso (recomendación)

**El tamaño NO es problema.** Marcar "lección completada" ocupa ~60 bytes. Todo el camino (~24 unidades, ~200 lecciones incluyendo práctica) ≈ 12 KB por alumno. 1.000 alumnos ≈ 12 MB. El plan gratis de Supabase da 500 MB → usaríamos ~2%.

**Recomendación: v1 en localStorage**, con el dato diseñado para sincronizar después a **una columna JSONB** en la fila del alumno (NO una tabla con una fila por lección). Estructura:

```js
theoryProgress = {
  "unidad-3": { done: true,  bestScore: 0.9, date: "2026-07-07" },
  "unidad-4": { done: false, bestScore: 0.4, date: "2026-07-07" }
}
```

Así lanzamos sin depender del pendiente "mover progreso a Supabase", y cuando se haga esa migración, esto se sube junto en una sola columna, sin rehacer nada.

---

## 4. Estructura técnica (cómo encaja en la app)

Se agrega un objeto nuevo `THEORY_DATA` en `src/data.js`, hermano de `GRAMMAR_DATA`:

```js
const THEORY_DATA = {
  units: [
    {
      id: 'unidad-3',
      title: 'Un y una: en / ett',
      icon: '📝',
      color: '#10B981',
      level: 'A',
      grammarTopicId: 'articulos',   // reusa estas preguntas en "Practicar"
      cards: [                        // la teoría que se LEE, tarjeta por tarjeta
        { title: '…', body: '…', example: '…' },
        ...
      ]
    },
    ...
  ]
};
```

- El paso **"Practicar"** apunta a `grammarTopicId` y reusa el motor de preguntas que ya existe (cero código nuevo del motor).
- El render (leer tarjetas → botón Practicar → ✓) es una vista nueva en `app.js`, encima del motor actual.
- Se reconstruye `index.html` igual que hicimos con la gramática (template + data + app).

---

## 5. Plan por fases

- **Fase A — Cimiento (esta semana):** aprobar el tono con la lección de muestra (abajo), definir estructura `THEORY_DATA` y la vista de lectura. Publicar el camino con 3–4 unidades reales (las ✅ que reusan preguntas).
- **Fase B — Completar lo que ya reusa:** escribir la teoría de las 15 unidades ✅. Camino "básico" completo y jugable.
- **Fase C — Contenido nuevo:** unidades 🆕 (ser/tener, perfecto, este/ese, subordinadas, pronunciación en texto, avanzado) con teoría + preguntas nuevas.
- **Fase D — Pulido:** audio de pronunciación (cuando Sophie grabe), sincronizar progreso a Supabase, gamificación extra.

---

## 6. Lección de muestra (para aprobar el tono)

### Unidad 3 — Un y una: *en* / *ett*

**Tarjeta 1 — La idea**
En español tenemos "un" y "una": *un* coche, *una* casa. En sueco también hay dos, pero se llaman **en** y **ett**. Lo raro para nosotros: no se trata de hombre o mujer. Un coche y una casa… simplemente cada palabra "nace" con su *en* o su *ett*, y hay que aprenderlo junto con la palabra. 🚗🏠

**Tarjeta 2 — La buena noticia**
No es 50 y 50. **8 de cada 10 palabras usan *en*.** Así que si tienes que adivinar, di *en* y lo más probable es que aciertes. *ett* es la minoría.
> Ejemplo: *en bil* (un coche), *en bok* (un libro), *en katt* (un gato).

**Tarjeta 3 — Trucos que nunca fallan**
Algunas terminaciones te avisan sola cuál usar:
- Termina en **-a** → casi siempre *en*: *en flicka* (una niña), *en gata* (una calle).
- Termina en **-ning** o **-het** → siempre *en*: *en tidning* (un periódico), *en möjlighet* (una posibilidad).
- Termina en **-um** → *ett*: *ett centrum* (un centro), *ett museum* (un museo).

**Tarjeta 4 — Las tramposas (ojo)**
Casi todo lo que termina en **-a** es *en*… menos tres palabras del cuerpo, que son *ett*:
*ett öga* (un ojo), *ett öra* (un oído), *ett hjärta* (un corazón). ❤️ Solo son tres; apréndetelas como un chiste y listo.

**Tarjeta 5 — Por qué importa**
No es un capricho: el *en* o *ett* decide cómo dices "el/la" después. *en bil* → *bil**en*** (el coche). *ett hus* → *hus**et*** (la casa). Por eso vale la pena aprender la palabra siempre con su *en*/*ett* pegado, como si fueran una sola cosa.

**Tarjeta 6 — A practicar**
¡Eso es todo! Ahora pruébalo: te voy a mostrar palabras y tú eliges *en* o *ett*. No tengas miedo de fallar — así se aprende. 💪
→ *(botón: Practicar — abre las preguntas del tema "en/ett")*

---

*Fin de la muestra. Si el tono le gusta a Sophie, replico este estilo en todas las unidades.*
