// ═══════════════════════════════════════════════════════════════════
//  SIMULACROS SFI / Nationella prov — SOLO ADMIN (dirigido por profesor)
//  Contenido ORIGINAL inspirado en la estructura pública de Skolverket.
//  NO son pruebas oficiales. No se guardan datos de alumnos.
//  Destrezas: lasa (Läsa) · hora (Höra) · skriva (Skriva) · tala (Tala)
//  Audio: 'script' = guion para grabar con la voz de Sophie (audioKey=null
//         hasta subir la grabación). NO se usa TTS automático.
// ═══════════════════════════════════════════════════════════════════

const SIMULACROS = {

  // ─────────────────────────── SFI A ───────────────────────────
  A: [
    {
      id: 'prep-a-1',
      level: 'A',
      official: false,
      title: 'Preparación SFI A – Prov 1',
      subtitle: '¿El alumno está construyendo las bases para avanzar a SFI B?',
      durationHint: 'Aprox. 40–60 min (sesión guiada)',
      note: 'SFI A no tiene Nationellt prov oficial. Esto es una preparación original, no una prueba de Skolverket.',
      sections: [
        {
          skill: 'lasa', label: 'Läsa', icon: '📖',
          instructions: 'Lee cada texto y responde. En clase, léelo primero en voz alta con los alumnos.',
          blocks: [
            {
              kind: 'text',
              title: 'Text 1 — En presentation',
              body: 'Hej! Jag heter Amina. Jag är trettiofem år gammal. Jag kommer från Somalia, men nu bor jag i Malmö. Jag bor i en lägenhet med min man och två barn. Jag studerar svenska på SFI varje dag. På fritiden tycker jag om att laga mat och promenera.',
              questions: [
                { type: 'mc', q: 'Var bor Amina nu?', options: ['I Somalia', 'I Malmö', 'I Stockholm'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Localizar información explícita',
                  sol: { es: 'Vive en Malmö.', sv: '«nu bor jag i Malmö» = ahora vivo en Malmö.', evidence: 'Frase: "men nu bor jag i Malmö".', learn: 'Distinguir de dónde viene (kommer från) y dónde vive ahora (bor).' } },
                { type: 'mc', q: 'Hur många barn har Amina?', options: ['Ett barn', 'Två barn', 'Tre barn'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Detalle numérico',
                  sol: { es: 'Tiene dos hijos.', sv: '«min man och två barn».', evidence: '"med min man och två barn".', learn: 'Números básicos: ett, två, tre.' } },
                { type: 'mc', q: 'Vad tycker Amina om att göra på fritiden?', options: ['Laga mat och promenera', 'Sova och läsa', 'Spela fotboll'], correct: 0, points: 1, difficulty: 'media', competencia: 'Comprensión del mensaje',
                  sol: { es: 'Le gusta cocinar y pasear.', sv: '«tycker om att laga mat och promenera».', evidence: 'Última frase.', learn: '«tycker om att + verbo» = gustar hacer algo.' } }
              ]
            },
            {
              kind: 'text',
              title: 'Text 2 — Öppettider (Biblioteket)',
              body: 'STADSBIBLIOTEKET\nÖppettider:\nMåndag–fredag: 10.00–19.00\nLördag: 11.00–15.00\nSöndag: stängt\n\nVälkommen! Här kan du låna böcker gratis.',
              questions: [
                { type: 'mc', q: 'När är biblioteket stängt?', options: ['På lördag', 'På söndag', 'På måndag'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Leer horarios',
                  sol: { es: 'Está cerrado el domingo.', sv: '«Söndag: stängt» = domingo: cerrado.', evidence: 'Línea "Söndag: stängt".', learn: '«stängt» = cerrado, «öppet» = abierto.' } },
                { type: 'mc', q: 'Vad kostar det att låna böcker?', options: ['20 kronor', 'Ingenting, det är gratis', '50 kronor'], correct: 1, points: 1, difficulty: 'media', competencia: 'Inferir del mensaje',
                  sol: { es: 'Nada, es gratis.', sv: '«låna böcker gratis» = pedir prestados libros gratis.', evidence: '"låna böcker gratis".', learn: '«gratis» = sin costo.' } }
              ]
            },
            {
              kind: 'text',
              title: 'Text 3 — SMS',
              body: 'Hej Karim! Kan du handla mjölk och bröd på vägen hem? Jag är på jobbet till klockan sex. Tack! /Sara',
              questions: [
                { type: 'mc', q: 'Vad vill Sara att Karim gör?', options: ['Lagar middag', 'Handlar mjölk och bröd', 'Städar hemma'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Comprender una petición',
                  sol: { es: 'Que compre leche y pan.', sv: '«Kan du handla mjölk och bröd» = ¿puedes comprar leche y pan?', evidence: 'Primera frase.', learn: '«handla» = hacer la compra.' } },
                { type: 'mc', q: 'Till vilken tid är Sara på jobbet?', options: ['Till klockan fem', 'Till klockan sex', 'Till klockan sju'], correct: 1, points: 1, difficulty: 'media', competencia: 'Detalle de tiempo',
                  sol: { es: 'Hasta las seis.', sv: '«till klockan sex».', evidence: '"Jag är på jobbet till klockan sex".', learn: 'Horas: «klockan sex» = a las seis.' } }
              ]
            }
          ]
        },
        {
          skill: 'hora', label: 'Höra', icon: '🎧',
          instructions: 'Reproduce el audio (o lee el guion en voz alta si aún no hay grabación). El texto NO se muestra al alumno.',
          blocks: [
            {
              kind: 'audio', audioKey: null,
              title: 'Ljud 1 — Monolog: En vanlig dag',
              script: 'Jag vaknar klockan sju varje morgon. Jag äter frukost och dricker kaffe. Sedan tar jag bussen till SFI. Lektionen börjar klockan nio. På eftermiddagen handlar jag mat och lagar middag. På kvällen tittar jag på tv och läser läxor.',
              questions: [
                { type: 'mc', q: 'Hur tar personen sig till SFI?', options: ['Med cykel', 'Med buss', 'Till fots'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Detalle en audio',
                  sol: { es: 'En autobús.', sv: '«jag tar bussen till SFI».', evidence: 'Guion: "tar jag bussen till SFI".', learn: '«ta bussen» = tomar el autobús.' } },
                { type: 'mc', q: 'När börjar lektionen?', options: ['Klockan sju', 'Klockan åtta', 'Klockan nio'], correct: 2, points: 1, difficulty: 'media', competencia: 'Hora en audio',
                  sol: { es: 'A las nueve.', sv: '«Lektionen börjar klockan nio».', evidence: 'Guion.', learn: 'No confundir con las 7 (cuando se despierta).' } },
                { type: 'mc', q: 'Vad gör personen på kvällen?', options: ['Handlar mat', 'Tittar på tv och läser läxor', 'Lagar frukost'], correct: 1, points: 1, difficulty: 'media', competencia: 'Secuencia del día',
                  sol: { es: 'Ve la tele y hace deberes.', sv: '«På kvällen tittar jag på tv och läser läxor».', evidence: 'Final del guion.', learn: 'Palabras de tiempo: morgon/eftermiddag/kväll.' } }
              ]
            },
            {
              kind: 'audio', audioKey: null,
              title: 'Ljud 2 — Dialog: I affären',
              script: '– Hej! Kan jag hjälpa dig?\n– Ja tack. Var finns äpplena?\n– De finns där borta, bredvid bananerna.\n– Tack. Vad kostar ett kilo?\n– Tjugo kronor kilot.\n– Okej, jag tar två kilo.',
              questions: [
                { type: 'mc', q: 'Vad letar kunden efter?', options: ['Bananer', 'Äpplen', 'Bröd'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Objeto de la conversación',
                  sol: { es: 'Manzanas.', sv: '«Var finns äpplena?» = ¿dónde están las manzanas?', evidence: 'Segunda línea.', learn: '«äpple/äpplen» = manzana/manzanas.' } },
                { type: 'mc', q: 'Hur mycket köper kunden?', options: ['Ett kilo', 'Två kilo', 'Tre kilo'], correct: 1, points: 1, difficulty: 'media', competencia: 'Cantidad en diálogo',
                  sol: { es: 'Dos kilos.', sv: '«jag tar två kilo».', evidence: 'Última línea.', learn: '«jag tar…» = me llevo…' } }
              ]
            }
          ]
        },
        {
          skill: 'skriva', label: 'Skriva', icon: '✍️',
          instructions: 'Tarea de escritura. La corrige el profesor (no hay corrección automática).',
          tasks: [
            {
              prompt: 'Skriv en kort presentation om dig själv (3–5 meningar). Skriv: ditt namn, varifrån du kommer, var du bor och vad du tycker om att göra.',
              objetivo: 'Comprobar si el alumno puede escribir frases simples sobre sí mismo con estructura básica sujeto-verbo.',
              mustInclude: ['Nombre (Jag heter…)', 'Origen (Jag kommer från…)', 'Dónde vive (Jag bor i…)', 'Un gusto (Jag tycker om att…)', '3–5 frases completas con mayúscula y punto'],
              criterios: ['Frases completas y comprensibles', 'Orden básico correcto (sujeto + verbo)', 'Vocabulario del tema (familia, ciudad, aficiones)', 'Uso de mayúscula inicial y punto final'],
              errores: ['Omitir el verbo ("Jag från Somalia" en vez de "Jag kommer från Somalia")', 'No usar mayúscula/punto', 'Confundir «bor» (vivir) con «kommer» (venir)'],
              ejemplo: 'Jag heter Amina. Jag kommer från Somalia. Nu bor jag i Malmö med min familj. Jag tycker om att laga mat och promenera.',
              nota: 'En SFI A basta con frases muy simples. Premia la comunicación, no la perfección. Corrige 1–2 errores clave, no todos.'
            }
          ]
        },
        {
          skill: 'tala', label: 'Tala', icon: '🗣️',
          instructions: 'Actividad oral dirigida por el profesor. Guía privada abajo (no se muestra al alumno en modo prueba).',
          guide: {
            situacion: 'Presentación personal y preguntas sencillas cara a cara. El profesor hace de interlocutor.',
            preguntas: ['Vad heter du?', 'Varifrån kommer du?', 'Var bor du?', 'Har du familj?', 'Vad tycker du om att göra på fritiden?'],
            preguntasExtra: ['Hur gammal är du?', 'Vad äter du till frukost?', 'Hur tar du dig till SFI?'],
            criterios: ['Responde a preguntas simples', 'Se hace entender aunque con errores', 'Usa vocabulario básico (nombre, origen, familia)', 'Pronunciación comprensible'],
            ejemplos: ['"Jag heter… Jag kommer från… Jag bor i…"'],
            errores: ['Responder solo con una palabra', 'Silencios muy largos', 'Mezclar con otro idioma'],
            puedeHacer: 'Un alumno de SFI A debe poder presentarse y responder preguntas muy básicas sobre sí mismo con frases cortas.'
          }
        }
      ]
    }
  ],

  // ─────────────────────────── SFI B ───────────────────────────
  B: [
    {
      id: 'natprov-b-1',
      level: 'B',
      official: true,
      title: 'Simulacro Nationella prov SFI B – 1',
      subtitle: 'Estructura por delprov (Höra A, Läsa A, Höra B, Läsa B) + Skriva + Tala',
      durationHint: 'Sesión seria por delprov (Skolverket no publica una duración exacta)',
      note: 'Simulacro ORIGINAL inspirado en la estructura pública. NO es una prueba oficial de Skolverket.',
      sections: [
        {
          skill: 'hora', label: 'Delprov Höra A', icon: '🎧',
          instructions: 'Escucha el audio (o lee el guion). El texto no se muestra al alumno.',
          blocks: [
            {
              kind: 'audio', audioKey: null,
              title: 'Ljud A — Meddelande på telefonsvarare',
              script: 'Hej, det här är tandläkarmottagningen. Vi vill påminna dig om din tid på torsdag klockan halv tre. Om du inte kan komma, ring oss senast onsdag klockan fem, annars får du betala en avgift. Välkommen!',
              questions: [
                { type: 'mc', q: 'Vilken dag är tiden bokad?', options: ['Onsdag', 'Torsdag', 'Fredag'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Detalle explícito',
                  sol: { es: 'El jueves.', sv: '«din tid på torsdag».', evidence: 'Guion.', learn: 'Días de la semana.' } },
                { type: 'mc', q: 'Vad måste du göra om du inte kan komma?', options: ['Skicka ett brev', 'Ringa senast onsdag klockan fem', 'Komma en annan dag utan att säga något'], correct: 1, points: 1, difficulty: 'media', competencia: 'Instrucción condicional',
                  sol: { es: 'Llamar a más tardar el miércoles a las cinco.', sv: '«ring oss senast onsdag klockan fem».', evidence: 'Guion.', learn: '«senast» = a más tardar.' } },
                { type: 'mc', q: 'Vad händer om du inte avbokar i tid?', options: ['Ingenting', 'Du får betala en avgift', 'Du får en ny tandläkare'], correct: 1, points: 1, difficulty: 'alta', competencia: 'Inferencia (consecuencia)',
                  sol: { es: 'Tienes que pagar una tarifa.', sv: '«annars får du betala en avgift».', evidence: '"annars får du betala en avgift".', learn: '«annars» = si no / de lo contrario.' } }
              ]
            }
          ]
        },
        {
          skill: 'lasa', label: 'Delprov Läsa A', icon: '📖',
          instructions: 'Lee el texto y responde.',
          blocks: [
            {
              kind: 'text',
              title: 'Text A — Anslag i tvättstugan',
              body: 'INFORMATION TILL ALLA HYRESGÄSTER\n\nTvättstugan är öppen varje dag mellan 07.00 och 22.00. Boka din tid på tavlan i entrén. Kom ihåg att städa efter dig: torka av maskinerna och ta bort ludd ur torktumlaren. Om du inte använder din bokade tid inom 30 minuter kan någon annan ta tiden.',
              questions: [
                { type: 'mc', q: 'Hur bokar man tvättid?', options: ['På internet', 'På tavlan i entrén', 'Genom att ringa'], correct: 1, points: 1, difficulty: 'media', competencia: 'Localizar procedimiento',
                  sol: { es: 'En el tablón de la entrada.', sv: '«Boka din tid på tavlan i entrén».', evidence: 'Texto.', learn: '«boka» = reservar.' } },
                { type: 'mc', q: 'Vad ska man göra efter tvätten?', options: ['Låsa dörren', 'Städa: torka maskinerna och ta bort ludd', 'Betala en avgift'], correct: 1, points: 1, difficulty: 'media', competencia: 'Comprensión de instrucciones',
                  sol: { es: 'Limpiar: secar las máquinas y quitar la pelusa.', sv: '«torka av maskinerna och ta bort ludd».', evidence: 'Texto.', learn: 'Vocabulario del hogar/lavandería.' } },
                { type: 'open', q: 'Vad händer om du inte använder din bokade tid inom 30 minuter? Svara med en hel mening.', answer: 'Någon annan kan ta tiden.', points: 2, difficulty: 'alta', competencia: 'Respuesta abierta / inferencia',
                  sol: { es: 'Otra persona puede tomar tu hora.', sv: 'Respuesta modelo: «Då kan någon annan ta tiden.»', evidence: '"kan någon annan ta tiden".', learn: 'Producir una frase completa a partir del texto (no copiar literal).' } }
              ]
            }
          ]
        },
        {
          skill: 'hora', label: 'Delprov Höra B', icon: '🎧',
          instructions: 'Escucha el diálogo (o lee el guion).',
          blocks: [
            {
              kind: 'audio', audioKey: null,
              title: 'Ljud B — Dialog: På vårdcentralen',
              script: '– Hej, jag skulle vilja boka en tid. Jag har ont i halsen och feber.\n– Jag förstår. Hur länge har du varit sjuk?\n– I tre dagar.\n– Okej. Vi har en tid imorgon klockan tio. Passar det?\n– Ja, det passar bra. Tack så mycket.',
              questions: [
                { type: 'mc', q: 'Varför ringer personen till vårdcentralen?', options: ['För att avboka en tid', 'För att hon är sjuk och vill boka en tid', 'För att fråga om öppettider'], correct: 1, points: 1, difficulty: 'media', competencia: 'Propósito de la conversación',
                  sol: { es: 'Está enferma y quiere una cita.', sv: '«jag har ont i halsen och feber» + «boka en tid».', evidence: 'Guion.', learn: 'Vocabulario de salud: ont i halsen, feber.' } },
                { type: 'mc', q: 'Hur länge har personen varit sjuk?', options: ['En dag', 'Tre dagar', 'En vecka'], correct: 1, points: 1, difficulty: 'baja', competencia: 'Detalle',
                  sol: { es: 'Tres días.', sv: '«I tre dagar».', evidence: 'Guion.', learn: 'Expresar duración con «i + tiempo».' } }
              ]
            }
          ]
        },
        {
          skill: 'lasa', label: 'Delprov Läsa B', icon: '📖',
          instructions: 'Lee el texto más largo y responde (incluye matching y opción múltiple).',
          blocks: [
            {
              kind: 'text',
              title: 'Text B — En artikel: Att cykla i staden',
              body: 'Allt fler människor i staden väljer att cykla till jobbet i stället för att ta bilen. Kommunen har byggt nya cykelvägar de senaste åren, och det har blivit både säkrare och enklare att cykla. Många säger att de mår bättre när de cyklar, eftersom de rör på sig varje dag. Att cykla är också bra för miljön, för en cykel släpper inte ut några avgaser. Samtidigt tycker vissa att det behövs fler platser att parkera cykeln på. Kommunen planerar därför att bygga fler cykelparkeringar nästa år.',
              questions: [
                { type: 'mc', q: 'Vad handlar texten mest om?', options: ['Att bilar är farliga', 'Att fler väljer att cykla i staden', 'Att kommunen saknar pengar'], correct: 1, points: 1, difficulty: 'media', competencia: 'Idea principal',
                  sol: { es: 'Que cada vez más gente elige la bici en la ciudad.', sv: '«Allt fler människor… väljer att cykla».', evidence: 'Primera frase.', learn: 'Identificar la idea principal, no un detalle.' } },
                { type: 'mc', q: 'Varför mår många bättre när de cyklar?', options: ['För att det är billigt', 'För att de rör på sig varje dag', 'För att de sparar tid'], correct: 1, points: 1, difficulty: 'alta', competencia: 'Relación causa-efecto (paráfrasis)',
                  sol: { es: 'Porque hacen ejercicio cada día.', sv: '«eftersom de rör på sig varje dag».', evidence: '"de mår bättre… eftersom de rör på sig".', learn: '«eftersom» = porque. La respuesta no repite palabras idénticas: hay que entender la relación.' } },
                { type: 'mc', q: 'Vad planerar kommunen att göra nästa år?', options: ['Ta bort cykelvägar', 'Bygga fler cykelparkeringar', 'Förbjuda bilar'], correct: 1, points: 1, difficulty: 'media', competencia: 'Detalle + tiempo futuro',
                  sol: { es: 'Construir más aparcamientos para bicis.', sv: '«bygga fler cykelparkeringar nästa år».', evidence: 'Última frase.', learn: 'Futuro con «planerar att + verbo».' } },
                { type: 'match', q: 'Para el profesor: relaciona cada palabra sueca con su significado (matching en clase).', pairs: [['cykelväg', 'carril bici'], ['avgaser', 'gases de escape'], ['miljön', 'el medio ambiente'], ['säkrare', 'más seguro']], points: 4, difficulty: 'media', competencia: 'Vocabulario clave',
                  sol: { es: 'cykelväg=carril bici, avgaser=gases, miljön=medio ambiente, säkrare=más seguro.', learn: 'Vocabulario del texto que ayuda a inferir el sentido.' } }
              ]
            }
          ]
        },
        {
          skill: 'skriva', label: 'Skriva', icon: '✍️',
          instructions: 'Una tarea de escritura informal (SFI B). La corrige el profesor.',
          tasks: [
            {
              prompt: 'Skriv ett kort mejl till en vän (5–8 meningar). Berätta hur din vecka har varit, vad du har gjort och vad du ska göra i helgen.',
              objetivo: 'Escritura sencilla sobre uno mismo y situaciones cotidianas, con algo de tiempo pasado y futuro.',
              mustInclude: ['Saludo y despedida (Hej…/Vi hörs)', 'Qué ha hecho esta semana (pasado: har + supino, o preteritum)', 'Qué hará el finde (futuro: ska/tänker)', 'Frases conectadas (och, men, sedan)'],
              criterios: ['Se entiende el mensaje', 'Uso básico de tiempos (pasado/futuro)', 'Conectores simples', 'Formato de mensaje informal (saludo/despedida)'],
              errores: ['Usar solo presente para todo', 'Olvidar el saludo/despedida', 'Frases sin verbo', 'Orden V2 incorrecto tras adverbio inicial'],
              ejemplo: 'Hej Lena!\nDen här veckan har jag pluggat mycket svenska. I onsdags träffade jag en kompis och vi fikade. I helgen ska jag städa hemma och kanske gå på bio. Hur mår du? Vi hörs snart!\nKram, Sara',
              nota: 'En SFI B se acepta lenguaje sencillo. Valora si logra contar pasado y futuro de forma comprensible; corrige los errores más importantes, no todos.'
            }
          ]
        },
        {
          skill: 'tala', label: 'Tala', icon: '🗣️',
          instructions: 'Actividad oral dirigida por el profesor. Guía privada (oculta en modo prueba).',
          guide: {
            situacion: 'El alumno habla de experiencias personales conocidas y responde/interactúa con el profesor.',
            preguntas: ['Berätta om en vanlig dag i ditt liv.', 'Vad gjorde du förra helgen?', 'Vad tycker du om att bo i din stad? Varför?'],
            preguntasExtra: ['Vad ska du göra nästa vecka?', 'Vad är svårt med svenskan för dig?', 'Berätta om din familj.'],
            criterios: ['Cuenta experiencias con frases conectadas', 'Usa pasado y presente de forma comprensible', 'Mantiene una conversación breve (responde y pregunta)', 'Vocabulario cotidiano suficiente'],
            ejemplos: ['"Förra helgen träffade jag mina vänner och vi lagade mat…"'],
            errores: ['Responder solo con frases muy cortas sin desarrollar', 'Usar solo presente', 'No interactuar (no hacer ninguna pregunta de vuelta)'],
            puedeHacer: 'Un alumno de SFI B debe poder hablar de sí mismo y de situaciones cotidianas conocidas, y mantener una conversación sencilla.'
          }
        }
      ]
    }
  ],

  C: [],
  D: []
};

if (typeof window !== 'undefined') window.SIMULACROS = SIMULACROS;
