/* ═══════════════════════════════════════════════════════════════════
   VOKABULÄR — contenido (vive en código → 0 espacio en la BD)
   El progreso se guarda en la tabla `vocabulary_progress` (1 fila por
   alumno+elemento). El denominador del % se calcula del contenido ACTIVO
   real: para añadir palabras, solo agrega objetos aquí (no toques lógica).

   Campos:
     id    · identificador único ESTABLE (no cambiarlo nunca)
     lvl   · 'A' | 'B' | 'C' | 'D'
     cat   · 'word' | 'verb'
     sv    · palabra en sueco (base)
     es    · traducción al español
     ex    · oración de ejemplo en sueco
     exEs  · traducción de la oración
     note  · explicación breve (opcional)
     active· false para desactivar sin borrar (por defecto activo)
   Sustantivos (cuando aplica): g ('en'|'ett'), def (definida), pl (plural)
   Verbos: inf, pres, pret (pasado), sup (supino)
   ═══════════════════════════════════════════════════════════════════ */

const VOCAB = [

  /* ════════ SFI A · PALABRAS (40) ════════ */
  // Saludos y frases
  { id: 'a-w-01', lvl: 'A', cat: 'word', sv: 'hej', es: 'hola', ex: 'Hej, hur mår du?', exEs: 'Hola, ¿cómo estás?' },
  { id: 'a-w-02', lvl: 'A', cat: 'word', sv: 'hej då', es: 'adiós', ex: 'Hej då, vi ses imorgon!', exEs: '¡Adiós, nos vemos mañana!' },
  { id: 'a-w-03', lvl: 'A', cat: 'word', sv: 'tack', es: 'gracias', ex: 'Tack så mycket för hjälpen.', exEs: 'Muchas gracias por la ayuda.' },
  { id: 'a-w-04', lvl: 'A', cat: 'word', sv: 'förlåt', es: 'perdón', ex: 'Förlåt, jag är sen.', exEs: 'Perdón, llego tarde.' },
  { id: 'a-w-05', lvl: 'A', cat: 'word', sv: 'ja', es: 'sí', ex: 'Ja, det stämmer.', exEs: 'Sí, es correcto.' },
  { id: 'a-w-06', lvl: 'A', cat: 'word', sv: 'nej', es: 'no', ex: 'Nej, tack.', exEs: 'No, gracias.' },
  // Familia
  { id: 'a-w-07', lvl: 'A', cat: 'word', sv: 'mamma', es: 'mamá', g: 'en', def: 'mamman', pl: 'mammor', ex: 'Min mamma heter Eva.', exEs: 'Mi mamá se llama Eva.' },
  { id: 'a-w-08', lvl: 'A', cat: 'word', sv: 'pappa', es: 'papá', g: 'en', def: 'pappan', pl: 'pappor', ex: 'Min pappa arbetar mycket.', exEs: 'Mi papá trabaja mucho.' },
  { id: 'a-w-09', lvl: 'A', cat: 'word', sv: 'syster', es: 'hermana', g: 'en', def: 'systern', pl: 'systrar', ex: 'Jag har en syster.', exEs: 'Tengo una hermana.' },
  { id: 'a-w-10', lvl: 'A', cat: 'word', sv: 'bror', es: 'hermano', g: 'en', def: 'brodern', pl: 'bröder', ex: 'Min bror bor i Malmö.', exEs: 'Mi hermano vive en Malmö.' },
  { id: 'a-w-11', lvl: 'A', cat: 'word', sv: 'barn', es: 'niño/a; hijo/a', g: 'ett', def: 'barnet', pl: 'barn', ex: 'De har två barn.', exEs: 'Tienen dos hijos.', note: 'El plural de "barn" no cambia.' },
  { id: 'a-w-12', lvl: 'A', cat: 'word', sv: 'familj', es: 'familia', g: 'en', def: 'familjen', pl: 'familjer', ex: 'Min familj är stor.', exEs: 'Mi familia es grande.' },
  // Casa
  { id: 'a-w-13', lvl: 'A', cat: 'word', sv: 'hus', es: 'casa', g: 'ett', def: 'huset', pl: 'hus', ex: 'De bor i ett stort hus.', exEs: 'Viven en una casa grande.' },
  { id: 'a-w-14', lvl: 'A', cat: 'word', sv: 'lägenhet', es: 'apartamento', g: 'en', def: 'lägenheten', pl: 'lägenheter', ex: 'Jag har en liten lägenhet.', exEs: 'Tengo un apartamento pequeño.' },
  { id: 'a-w-15', lvl: 'A', cat: 'word', sv: 'kök', es: 'cocina', g: 'ett', def: 'köket', pl: 'kök', ex: 'Vi lagar mat i köket.', exEs: 'Cocinamos en la cocina.' },
  { id: 'a-w-16', lvl: 'A', cat: 'word', sv: 'dörr', es: 'puerta', g: 'en', def: 'dörren', pl: 'dörrar', ex: 'Stäng dörren, tack.', exEs: 'Cierra la puerta, por favor.' },
  { id: 'a-w-17', lvl: 'A', cat: 'word', sv: 'fönster', es: 'ventana', g: 'ett', def: 'fönstret', pl: 'fönster', ex: 'Öppna fönstret.', exEs: 'Abre la ventana.' },
  { id: 'a-w-18', lvl: 'A', cat: 'word', sv: 'säng', es: 'cama', g: 'en', def: 'sängen', pl: 'sängar', ex: 'Barnet sover i sängen.', exEs: 'El niño duerme en la cama.' },
  // Comida
  { id: 'a-w-19', lvl: 'A', cat: 'word', sv: 'mat', es: 'comida', g: 'en', def: 'maten', ex: 'Maten är god.', exEs: 'La comida está rica.' },
  { id: 'a-w-20', lvl: 'A', cat: 'word', sv: 'bröd', es: 'pan', g: 'ett', def: 'brödet', pl: 'bröd', ex: 'Jag köper bröd.', exEs: 'Compro pan.' },
  { id: 'a-w-21', lvl: 'A', cat: 'word', sv: 'mjölk', es: 'leche', g: 'en', def: 'mjölken', ex: 'Mjölken står i kylen.', exEs: 'La leche está en el refrigerador.' },
  { id: 'a-w-22', lvl: 'A', cat: 'word', sv: 'vatten', es: 'agua', g: 'ett', def: 'vattnet', ex: 'Kan jag få vatten?', exEs: '¿Me puede dar agua?' },
  { id: 'a-w-23', lvl: 'A', cat: 'word', sv: 'äpple', es: 'manzana', g: 'ett', def: 'äpplet', pl: 'äpplen', ex: 'Jag äter ett äpple.', exEs: 'Como una manzana.' },
  { id: 'a-w-24', lvl: 'A', cat: 'word', sv: 'kaffe', es: 'café', g: 'ett', def: 'kaffet', ex: 'Vill du ha kaffe?', exEs: '¿Quieres café?' },
  // Números
  { id: 'a-w-25', lvl: 'A', cat: 'word', sv: 'en / ett', es: 'uno', ex: 'Jag har en katt och ett hus.', exEs: 'Tengo un gato y una casa.', note: '"en" con en-ord, "ett" con ett-ord.' },
  { id: 'a-w-26', lvl: 'A', cat: 'word', sv: 'två', es: 'dos', ex: 'Jag har två barn.', exEs: 'Tengo dos hijos.' },
  { id: 'a-w-27', lvl: 'A', cat: 'word', sv: 'tre', es: 'tres', ex: 'Klockan är tre.', exEs: 'Son las tres.' },
  { id: 'a-w-28', lvl: 'A', cat: 'word', sv: 'fyra', es: 'cuatro', ex: 'Vi är fyra personer.', exEs: 'Somos cuatro personas.' },
  { id: 'a-w-29', lvl: 'A', cat: 'word', sv: 'fem', es: 'cinco', ex: 'Bussen kommer om fem minuter.', exEs: 'El autobús llega en cinco minutos.' },
  // Días y horas
  { id: 'a-w-30', lvl: 'A', cat: 'word', sv: 'dag', es: 'día', g: 'en', def: 'dagen', pl: 'dagar', ex: 'Ha en bra dag!', exEs: '¡Que tengas buen día!' },
  { id: 'a-w-31', lvl: 'A', cat: 'word', sv: 'vecka', es: 'semana', g: 'en', def: 'veckan', pl: 'veckor', ex: 'Vi ses nästa vecka.', exEs: 'Nos vemos la próxima semana.' },
  { id: 'a-w-32', lvl: 'A', cat: 'word', sv: 'idag', es: 'hoy', ex: 'Vad gör du idag?', exEs: '¿Qué haces hoy?' },
  { id: 'a-w-33', lvl: 'A', cat: 'word', sv: 'imorgon', es: 'mañana (día)', ex: 'Imorgon ska jag jobba.', exEs: 'Mañana voy a trabajar.' },
  { id: 'a-w-34', lvl: 'A', cat: 'word', sv: 'klocka', es: 'reloj; hora', g: 'en', def: 'klockan', pl: 'klockor', ex: 'Vad är klockan?', exEs: '¿Qué hora es?' },
  // Transporte
  { id: 'a-w-35', lvl: 'A', cat: 'word', sv: 'buss', es: 'autobús', g: 'en', def: 'bussen', pl: 'bussar', ex: 'Jag tar bussen till jobbet.', exEs: 'Tomo el autobús al trabajo.' },
  { id: 'a-w-36', lvl: 'A', cat: 'word', sv: 'tåg', es: 'tren', g: 'ett', def: 'tåget', pl: 'tåg', ex: 'Tåget går klockan nio.', exEs: 'El tren sale a las nueve.' },
  { id: 'a-w-37', lvl: 'A', cat: 'word', sv: 'bil', es: 'coche', g: 'en', def: 'bilen', pl: 'bilar', ex: 'Vi åker bil till Stockholm.', exEs: 'Vamos en coche a Estocolmo.' },
  { id: 'a-w-38', lvl: 'A', cat: 'word', sv: 'cykel', es: 'bicicleta', g: 'en', def: 'cykeln', pl: 'cyklar', ex: 'Jag har en ny cykel.', exEs: 'Tengo una bicicleta nueva.' },
  // Objetos cotidianos
  { id: 'a-w-39', lvl: 'A', cat: 'word', sv: 'bok', es: 'libro', g: 'en', def: 'boken', pl: 'böcker', ex: 'Jag läser en bok.', exEs: 'Leo un libro.' },
  { id: 'a-w-40', lvl: 'A', cat: 'word', sv: 'telefon', es: 'teléfono', g: 'en', def: 'telefonen', pl: 'telefoner', ex: 'Var är min telefon?', exEs: '¿Dónde está mi teléfono?' },

  /* ════════ SFI A · VERBOS (20) ════════ */
  { id: 'a-v-01', lvl: 'A', cat: 'verb', sv: 'vara', es: 'ser/estar', inf: 'att vara', pres: 'är', pret: 'var', sup: 'varit', ex: 'Jag är trött idag.', exEs: 'Estoy cansado hoy.' },
  { id: 'a-v-02', lvl: 'A', cat: 'verb', sv: 'ha', es: 'tener', inf: 'att ha', pres: 'har', pret: 'hade', sup: 'haft', ex: 'Jag har en fråga.', exEs: 'Tengo una pregunta.' },
  { id: 'a-v-03', lvl: 'A', cat: 'verb', sv: 'heta', es: 'llamarse', inf: 'att heta', pres: 'heter', pret: 'hette', sup: 'hetat', ex: 'Vad heter du?', exEs: '¿Cómo te llamas?' },
  { id: 'a-v-04', lvl: 'A', cat: 'verb', sv: 'bo', es: 'vivir (residir)', inf: 'att bo', pres: 'bor', pret: 'bodde', sup: 'bott', ex: 'Jag bor i Sverige.', exEs: 'Vivo en Suecia.' },
  { id: 'a-v-05', lvl: 'A', cat: 'verb', sv: 'prata', es: 'hablar', inf: 'att prata', pres: 'pratar', pret: 'pratade', sup: 'pratat', ex: 'Vi pratar svenska.', exEs: 'Hablamos sueco.' },
  { id: 'a-v-06', lvl: 'A', cat: 'verb', sv: 'äta', es: 'comer', inf: 'att äta', pres: 'äter', pret: 'åt', sup: 'ätit', ex: 'Vi äter frukost.', exEs: 'Desayunamos.' },
  { id: 'a-v-07', lvl: 'A', cat: 'verb', sv: 'dricka', es: 'beber', inf: 'att dricka', pres: 'dricker', pret: 'drack', sup: 'druckit', ex: 'Jag dricker kaffe.', exEs: 'Bebo café.' },
  { id: 'a-v-08', lvl: 'A', cat: 'verb', sv: 'gå', es: 'ir; caminar', inf: 'att gå', pres: 'går', pret: 'gick', sup: 'gått', ex: 'Jag går till skolan.', exEs: 'Voy a la escuela.' },
  { id: 'a-v-09', lvl: 'A', cat: 'verb', sv: 'komma', es: 'venir', inf: 'att komma', pres: 'kommer', pret: 'kom', sup: 'kommit', ex: 'Bussen kommer nu.', exEs: 'El autobús viene ahora.' },
  { id: 'a-v-10', lvl: 'A', cat: 'verb', sv: 'göra', es: 'hacer', inf: 'att göra', pres: 'gör', pret: 'gjorde', sup: 'gjort', ex: 'Vad gör du?', exEs: '¿Qué haces?' },
  { id: 'a-v-11', lvl: 'A', cat: 'verb', sv: 'se', es: 'ver', inf: 'att se', pres: 'ser', pret: 'såg', sup: 'sett', ex: 'Jag ser en katt.', exEs: 'Veo un gato.' },
  { id: 'a-v-12', lvl: 'A', cat: 'verb', sv: 'vilja', es: 'querer', inf: 'att vilja', pres: 'vill', pret: 'ville', sup: 'velat', ex: 'Jag vill lära mig svenska.', exEs: 'Quiero aprender sueco.' },
  { id: 'a-v-13', lvl: 'A', cat: 'verb', sv: 'kunna', es: 'poder; saber', inf: 'att kunna', pres: 'kan', pret: 'kunde', sup: 'kunnat', ex: 'Jag kan prata lite svenska.', exEs: 'Puedo hablar un poco de sueco.' },
  { id: 'a-v-14', lvl: 'A', cat: 'verb', sv: 'arbeta', es: 'trabajar', inf: 'att arbeta', pres: 'arbetar', pret: 'arbetade', sup: 'arbetat', ex: 'Jag arbetar på ett kafé.', exEs: 'Trabajo en un café.' },
  { id: 'a-v-15', lvl: 'A', cat: 'verb', sv: 'läsa', es: 'leer', inf: 'att läsa', pres: 'läser', pret: 'läste', sup: 'läst', ex: 'Jag läser tidningen.', exEs: 'Leo el periódico.' },
  { id: 'a-v-16', lvl: 'A', cat: 'verb', sv: 'skriva', es: 'escribir', inf: 'att skriva', pres: 'skriver', pret: 'skrev', sup: 'skrivit', ex: 'Jag skriver ett brev.', exEs: 'Escribo una carta.' },
  { id: 'a-v-17', lvl: 'A', cat: 'verb', sv: 'köpa', es: 'comprar', inf: 'att köpa', pres: 'köper', pret: 'köpte', sup: 'köpt', ex: 'Jag köper mjölk.', exEs: 'Compro leche.' },
  { id: 'a-v-18', lvl: 'A', cat: 'verb', sv: 'sova', es: 'dormir', inf: 'att sova', pres: 'sover', pret: 'sov', sup: 'sovit', ex: 'Barnet sover.', exEs: 'El niño duerme.' },
  { id: 'a-v-19', lvl: 'A', cat: 'verb', sv: 'titta', es: 'mirar', inf: 'att titta', pres: 'tittar', pret: 'tittade', sup: 'tittat', ex: 'Vi tittar på TV.', exEs: 'Vemos la tele.' },
  { id: 'a-v-20', lvl: 'A', cat: 'verb', sv: 'lyssna', es: 'escuchar', inf: 'att lyssna', pres: 'lyssnar', pret: 'lyssnade', sup: 'lyssnat', ex: 'Jag lyssnar på musik.', exEs: 'Escucho música.' }

  /* B/C/D: se agregan enseguida — solo añadir objetos con lvl 'B'/'C'/'D'. */
];

if (typeof window !== 'undefined') window.VOCAB = VOCAB;
