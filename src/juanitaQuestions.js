// ═══════════════════════════════════════════════════════════════
//  PRACTICANDO CON JUANITA — Banco de preguntas (editable, escalable)
//  Agrega preguntas aquí sin tocar la lógica (app.js).
//  Campos: id, level, category, question, options, correctAnswer (índice),
//          explanation, difficulty (1-3), xp, active.
//  level: 'principiante' | 'intermedio' | 'avanzado'
// ═══════════════════════════════════════════════════════════════

const JUANITA_QUESTIONS = [
  // ── PRINCIPIANTE ──────────────────────────────────────────────
  { id: 'jp1', level: 'principiante', category: 'Saludos', question: '¿Cómo se dice "hola" en sueco?', options: ['Tack', 'Hej', 'Adjö', 'Ja'], correctAnswer: 1, explanation: '"Hej" = hola. "Tack" = gracias, "Adjö" = adiós, "Ja" = sí.', difficulty: 1, xp: 10, active: true },
  { id: 'jp2', level: 'principiante', category: 'En / Ett', question: 'Elige el artículo correcto: _____ hus (una casa).', options: ['en', 'ett', 'den', 'de'], correctAnswer: 1, explanation: '"Hus" es un ett-ord (neutro): ett hus.', difficulty: 1, xp: 10, active: true },
  { id: 'jp3', level: 'principiante', category: 'Verbos', question: 'Conjuga: Jag _____ (bo) i Sverige.', options: ['bor', 'boar', 'bo', 'bar'], correctAnswer: 0, explanation: 'Att bo → jag bor (presente).', difficulty: 1, xp: 10, active: true },
  { id: 'jp4', level: 'principiante', category: 'Vocabulario', question: '¿Qué significa "vatten"?', options: ['Pan', 'Agua', 'Leche', 'Café'], correctAnswer: 1, explanation: '"Vatten" = agua.', difficulty: 1, xp: 10, active: true },
  { id: 'jp5', level: 'principiante', category: 'Números', question: '¿Cómo se dice "tres" en sueco?', options: ['två', 'tre', 'fyra', 'fem'], correctAnswer: 1, explanation: '"Tre" = tres. två=2, fyra=4, fem=5.', difficulty: 1, xp: 10, active: true },
  { id: 'jp6', level: 'principiante', category: 'Pronombres', question: 'Pronombre para "ella": _____ heter Anna.', options: ['han', 'hon', 'den', 'jag'], correctAnswer: 1, explanation: '"Hon" = ella. "Han" = él.', difficulty: 1, xp: 10, active: true },
  { id: 'jp7', level: 'principiante', category: 'Negación', question: 'Negación correcta: Jag _____ kaffe.', options: ['inte gillar', 'gillar inte', 'ingen gillar', 'gillar ingen'], correctAnswer: 1, explanation: '"inte" va después del verbo: Jag gillar INTE kaffe.', difficulty: 2, xp: 10, active: true },
  { id: 'jp8', level: 'principiante', category: 'Días', question: '¿Cómo se dice "lunes"?', options: ['Tisdag', 'Måndag', 'Fredag', 'Söndag'], correctAnswer: 1, explanation: '"Måndag" = lunes.', difficulty: 1, xp: 10, active: true },

  // ── INTERMEDIO ────────────────────────────────────────────────
  { id: 'ji1', level: 'intermedio', category: 'Perfekt', question: 'Perfekt: Jag _____ redan _____ maten.', options: ['har / lagat', 'har / laga', 'hade / lagar', 'är / lagat'], correctAnswer: 0, explanation: 'Perfekt: har + supinum (lagat).', difficulty: 2, xp: 15, active: true },
  { id: 'ji2', level: 'intermedio', category: 'Preposiciones', question: 'Jag är intresserad _____ musik.', options: ['på', 'av', 'i', 'för'], correctAnswer: 1, explanation: '"Intresserad AV" = interesado en (preposición fija).', difficulty: 2, xp: 15, active: true },
  { id: 'ji3', level: 'intermedio', category: 'Comparativo', question: 'Det här huset är _____ än det andra.', options: ['stor', 'större', 'störst', 'mer stor'], correctAnswer: 1, explanation: 'Comparativo de stor → STÖRRE.', difficulty: 2, xp: 15, active: true },
  { id: 'ji4', level: 'intermedio', category: 'Bisats', question: 'Orden en bisats: Jag vet att hon _____.', options: ['inte kommer', 'kommer inte', 'inte kom', 'kommer aldrig inte'], correctAnswer: 0, explanation: 'En bisats "inte" va antes del verbo: ...att hon INTE KOMMER.', difficulty: 3, xp: 15, active: true },
  { id: 'ji5', level: 'intermedio', category: 'Partikelverb', question: 'Kan du _____ lampan? (encender)', options: ['sätta på', 'sätta av', 'ta på', 'stänga på'], correctAnswer: 0, explanation: 'Sätta PÅ = encender. Stänga AV = apagar.', difficulty: 2, xp: 15, active: true },
  { id: 'ji6', level: 'intermedio', category: 'Plural', question: 'Plural definido: Jag ser _____ (los coches).', options: ['bilar', 'bilarna', 'biler', 'bilen'], correctAnswer: 1, explanation: 'bil → bilar → BILARNA (los coches).', difficulty: 2, xp: 15, active: true },
  { id: 'ji7', level: 'intermedio', category: 'Vocabulario', question: 'Vad betyder "att ansöka om"?', options: ['Agradecer', 'Solicitar / pedir', 'Pagar', 'Olvidar'], correctAnswer: 1, explanation: 'Ansöka om = solicitar (ej. ansöka om jobb).', difficulty: 2, xp: 15, active: true },
  { id: 'ji8', level: 'intermedio', category: 'Condicional', question: 'Om jag _____ tid, skulle jag hjälpa dig.', options: ['har', 'hade', 'haft', 'ha'], correctAnswer: 1, explanation: 'Condicional: Om jag HADE tid = si tuviera tiempo.', difficulty: 3, xp: 15, active: true },

  // ── AVANZADO ──────────────────────────────────────────────────
  { id: 'ja1', level: 'avanzado', category: 'S-passiv', question: 'S-passiv: Beslutet _____ av styrelsen igår.', options: ['fattade', 'fattades', 'har fattat', 'fatta'], correctAnswer: 1, explanation: 'S-pasiva en pretérito: fattaDES = fue tomado.', difficulty: 3, xp: 20, active: true },
  { id: 'ja2', level: 'avanzado', category: 'Konjunktiv', question: 'Om jag _____ rik, skulle jag resa jorden runt.', options: ['är', 'var', 'vore', 'blev'], correctAnswer: 2, explanation: '"vore" (formal/hipotético) = si yo fuera.', difficulty: 3, xp: 20, active: true },
  { id: 'ja3', level: 'avanzado', category: 'Bli-passiv', question: 'Han _____ vald till ordförande.', options: ['blev', 'var', 'hade', 'skulle'], correctAnswer: 0, explanation: 'Bli-passiv (acción): Han BLEV vald = fue elegido.', difficulty: 3, xp: 20, active: true },
  { id: 'ja4', level: 'avanzado', category: 'Konnektor', question: 'Hon pluggade hårt, _____ klarade hon provet.', options: ['därför', 'trots att', 'eftersom', 'medan'], correctAnswer: 0, explanation: '"därför" (por eso) = consecuencia.', difficulty: 3, xp: 20, active: true },
  { id: 'ja5', level: 'avanzado', category: 'Ordföljd', question: 'När solen gick ner, _____ vi hem.', options: ['vi gick', 'gick vi', 'vi gå', 'har vi gått'], correctAnswer: 1, explanation: 'Regla V2: tras la bisats inicial, verbo primero: GICK VI hem.', difficulty: 3, xp: 20, active: true },
  { id: 'ja6', level: 'avanzado', category: 'Vocabulario', question: 'Vad betyder "hållbar utveckling"?', options: ['desarrollo rápido', 'desarrollo sostenible', 'desarrollo económico', 'desarrollo detenido'], correctAnswer: 1, explanation: 'Hållbar utveckling = desarrollo sostenible.', difficulty: 3, xp: 20, active: true },
  { id: 'ja7', level: 'avanzado', category: 'Particip', question: 'Particip como adjetivo: en _____ dörr (stänga).', options: ['stängande', 'stängd', 'stänga', 'stängt'], correctAnswer: 1, explanation: 'Perfekt particip: en STÄNGD dörr = una puerta cerrada.', difficulty: 3, xp: 20, active: true },
  { id: 'ja8', level: 'avanzado', category: 'Preposiciones', question: 'Rätt preposition: Det beror _____ situationen.', options: ['av', 'på', 'om', 'för'], correctAnswer: 1, explanation: 'Bero PÅ = depender de.', difficulty: 3, xp: 20, active: true },
];
