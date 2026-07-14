/* ═══════════════════════════════════════════════════════════════════
   TALA — Conversaciones interactivas (ordenar palabras, estilo Duolingo)
   El contenido vive aquí (en código) → 0 espacio en la base de datos.
   El progreso se guarda en la tabla `tala_progress` (1 fila por alumno+situación).

   Estructura de cada situación:
     id        · identificador único (usado en la BD)
     title     · nombre visible
     icon      · emoji
     level     · dificultad SFI: 'A' | 'B' | 'C' | 'D'
     context   · dónde ocurre (español en A/B)
     intro     · situación inicial para el alumno
     locked    · true = "Próximamente" (aún no construida)
     steps[]   · intercambios de la conversación (8–15):
        npc       · lo que dice la otra persona (sueco)
        npcEs     · traducción al español (se muestra en A/B)
        answer[]  · palabras EN ORDEN correcto que el alumno debe armar
        distractors[] · palabras extra que confunden (no van en la respuesta)
        answerEs  · traducción de la respuesta correcta
        hint      · pista opcional (resta puntos, no bloquea)
        explain   · explicación breve en español cuando se equivoca
   ═══════════════════════════════════════════════════════════════════ */

const TALA_SITUATIONS = [

  /* ───────────── PILOTO COMPLETO: EN EL SUPERMERCADO (SFI A) ───────────── */
  {
    id: 'supermercado',
    title: 'En el supermercado',
    icon: '🛒',
    level: 'A',
    context: 'Estás comprando comida y hablas con el empleado (butiksbiträde).',
    intro: 'Entras a ICA. Necesitas leche, pan y manzanas. Salúdale al empleado y arma tus frases en sueco tocando las palabras en el orden correcto.',
    locked: false,
    steps: [
      {
        npc: 'Hej och välkommen! Vad söker du?',
        npcEs: '¡Hola y bienvenido! ¿Qué buscas?',
        answer: ['Hej', 'jag', 'söker', 'mjölk'],
        distractors: ['bok', 'är'],
        answerEs: 'Hola, busco leche.',
        hint: 'Empieza saludando con "Hej".',
        explain: 'En sueco el orden normal es Sujeto + Verbo: "jag söker" = "yo busco".'
      },
      {
        npc: 'Mjölken står där borta i kylen. Något mer?',
        npcEs: 'La leche está allá en el refrigerador. ¿Algo más?',
        answer: ['Ja', 'jag', 'behöver', 'bröd'],
        distractors: ['nej', 'har'],
        answerEs: 'Sí, necesito pan.',
        hint: '"behöver" significa "necesito".',
        explain: '"behöva" = necesitar. Con "jag" el verbo es "behöver".'
      },
      {
        npc: 'Vi har färskt bröd här. Vill du ha något annat?',
        npcEs: 'Tenemos pan fresco aquí. ¿Quieres algo más?',
        answer: ['Har', 'ni', 'äpplen', '?'],
        distractors: ['jag', 'du'],
        answerEs: '¿Tienen manzanas?',
        hint: 'Para preguntar "¿tienen?" el verbo va primero: "Har ni...?"',
        explain: 'En preguntas sí/no el verbo va PRIMERO: "Har ni äpplen?" (¿Tienen manzanas?).'
      },
      {
        npc: 'Ja, äpplena ligger vid frukten.',
        npcEs: 'Sí, las manzanas están junto a la fruta.',
        answer: ['Hur', 'mycket', 'kostar', 'äpplena', '?'],
        distractors: ['är', 'du'],
        answerEs: '¿Cuánto cuestan las manzanas?',
        hint: '"Hur mycket kostar...?" = "¿Cuánto cuesta...?"',
        explain: '"Hur mycket kostar det?" es la forma fija para preguntar precios.'
      },
      {
        npc: 'Äpplena kostar 25 kronor kilot.',
        npcEs: 'Las manzanas cuestan 25 coronas el kilo.',
        answer: ['Jag', 'tar', 'ett', 'kilo'],
        distractors: ['två', 'är'],
        answerEs: 'Me llevo un kilo.',
        hint: '"Jag tar..." = "Me llevo...".',
        explain: '"ett kilo" porque "kilo" es un ett-ord (neutro).'
      },
      {
        npc: 'Perfekt. Något mer idag?',
        npcEs: 'Perfecto. ¿Algo más hoy?',
        answer: ['Nej', 'tack', 'det', 'är', 'allt'],
        distractors: ['ja', 'mer'],
        answerEs: 'No gracias, es todo.',
        hint: '"Det är allt" = "Es todo".',
        explain: '"Det är allt" cierra el pedido con cortesía: "eso es todo".'
      },
      {
        npc: 'Då blir det 89 kronor.',
        npcEs: 'Entonces son 89 coronas.',
        answer: ['Kan', 'jag', 'betala', 'med', 'kort', '?'],
        distractors: ['kontant', 'du'],
        answerEs: '¿Puedo pagar con tarjeta?',
        hint: 'Pregunta empezando con el verbo "Kan": "Kan jag...?"',
        explain: '"Kan jag betala med kort?" — verbo primero por ser pregunta; "med kort" = con tarjeta.'
      },
      {
        npc: 'Javisst, du kan betala med kort.',
        npcEs: 'Claro, puedes pagar con tarjeta.',
        answer: ['Här', 'är', 'mitt', 'kort'],
        distractors: ['din', 'är'],
        answerEs: 'Aquí está mi tarjeta.',
        hint: '"Här är..." = "Aquí está...".',
        explain: '"mitt kort" porque "kort" es ett-ord: mi → "mitt" (no "min").'
      },
      {
        npc: 'Tack! Vill du ha kvitto?',
        npcEs: '¡Gracias! ¿Quieres el recibo?',
        answer: ['Ja', 'tack', 'gärna'],
        distractors: ['nej', 'inte'],
        answerEs: 'Sí, con gusto.',
        hint: '"gärna" = "con gusto / me encantaría".',
        explain: '"Ja tack, gärna" es una forma muy natural y cortés de aceptar.'
      },
      {
        npc: 'Varsågod. Ha en bra dag!',
        npcEs: '¡Aquí tienes. Que tengas buen día!',
        answer: ['Tack', 'detsamma', '!'],
        distractors: ['hej', 'nej'],
        answerEs: '¡Gracias, igualmente!',
        hint: '"detsamma" = "igualmente".',
        explain: '"Tack, detsamma!" se usa para devolver un buen deseo: "gracias, igualmente".'
      }
    ]
  },

  /* ───────────── SITUACIONES SIGUIENTES (se construyen tras aprobar el piloto) ───────────── */
  { id: 'lakartid',    title: 'Pedir cita médica',     icon: '🏥', level: 'A', context: 'En el centro de salud (vårdcentralen).', intro: '', locked: true, steps: [] },
  { id: 'restaurang',  title: 'En el restaurante',     icon: '🍽️', level: 'A', context: 'Pedir comida y pagar.',                 intro: '', locked: true, steps: [] },
  { id: 'jobbintervju',title: 'Entrevista de trabajo', icon: '💼', level: 'B', context: 'Te presentas ante quien te contrata.',  intro: '', locked: true, steps: [] },
  { id: 'apotek',      title: 'En la farmacia',        icon: '💊', level: 'B', context: 'Pides un medicamento.',                 intro: '', locked: true, steps: [] },
  { id: 'transport',   title: 'Transporte público',    icon: '🚌', level: 'B', context: 'Comprar billete y preguntar rutas.',    intro: '', locked: true, steps: [] },
  { id: 'lagenhet',    title: 'Buscar apartamento',    icon: '🏠', level: 'C', context: 'Hablas con el arrendador.',            intro: '', locked: true, steps: [] },
  { id: 'bank',        title: 'En el banco',           icon: '🏦', level: 'C', context: 'Abrir cuenta y trámites.',              intro: '', locked: true, steps: [] },
  { id: 'foraldramote',title: 'Reunión escolar',       icon: '🎒', level: 'D', context: 'Hablas con la maestra de tu hijo/a.',   intro: '', locked: true, steps: [] },
  { id: 'myndighet',   title: 'Trámite en una agencia',icon: '🗂️', level: 'D', context: 'Migrationsverket / Skatteverket.',       intro: '', locked: true, steps: [] }
];

if (typeof window !== 'undefined') window.TALA_SITUATIONS = TALA_SITUATIONS;
