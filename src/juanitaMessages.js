// ═══════════════════════════════════════════════════════════════
//  PRACTICANDO CON JUANITA — Frases e imágenes (editable)
//  Aquí editas las frases y las imágenes de Juanita. No toques app.js.
// ═══════════════════════════════════════════════════════════════

// Dónde viven las imágenes (Supabase Storage, bucket 'assets', carpeta 'juanita').
// Sube ahí los archivos con estos nombres exactos (formato .webp).
const JUANITA_IMG_BASE = 'https://nblxzqdtczitpzxdqexz.supabase.co/storage/v1/object/public/assets/juanita/';
const JUANITA_STATES = {
  neutral:     'juanita-neutral.webp',
  feliz:       'juanita-feliz.webp',
  orgullosa:   'juanita-orgullosa.webp',
  pensando:    'juanita-pensando.webp',
  riendo:      'juanita-riendo.webp',
  seria:       'juanita-seria.webp',
  sorprendida: 'juanita-sorprendida.webp',
  aplaudiendo: 'juanita-aplaudiendo.webp',
  cafe:        'juanita-cafe.webp',
  chancleta:   'juanita-chancleta.webp',
  explicando:  'juanita-explicando.webp',
};
function juanitaImg(emotion) {
  const file = JUANITA_STATES[emotion] || JUANITA_STATES.neutral;
  return JUANITA_IMG_BASE + file;
}

// Cada banco: emotions = expresiones posibles (Juanita varía), list = frases {id, text}.
// El sistema evita repetir las últimas 10 frases mostradas.
const JUANITA_MSG = {
  correct_answer: {
    emotions: ['feliz', 'orgullosa', 'riendo', 'aplaudiendo'],
    list: [
      { id: 'c1',  text: '¡Eso era! Sabía que tú podías.' },
      { id: 'c2',  text: 'Muy bien, mi amor. Sigue así.' },
      { id: 'c3',  text: '¡Correcto! Ves que sí sabes.' },
      { id: 'c4',  text: 'Así se hace, corazón.' },
      { id: 'c5',  text: 'Muy bien pensado.' },
      { id: 'c6',  text: '¡Excelente! Hoy has venido despierto/a. ¿Qué te digo…?' },
      { id: 'c7',  text: 'Eso me pone orgullosa…' },
      { id: 'c8',  text: '¡Perfecto! Una más para la colección.' },
      { id: 'c9',  text: 'Muy bien, hijito/a. No era tan difícil.' },
      { id: 'c10', text: '¡Eso! Con seguridad. Sin miedo al éxito.' },
      { id: 'c11', text: 'Vas aprendiendo rapidito. ¿Qué te digo, Albert Einstein?' },
      { id: 'c12', text: 'Muy bien. Se nota que estás practicando. ¡Al fin…!' },
      { id: 'c13', text: '¡Correcto! Ahora sí estamos hablando.' },
      { id: 'c14', text: 'Así me gusta: atento/a y concentrado/a.' },
      { id: 'c15', text: 'Muy bien, corazón. Continúa.' },
      { id: 'c16', text: '¡Mira qué bonito respondes cuando lees bien!' },
      { id: 'c17', text: 'Exactamente. Esa era la respuesta.' },
      { id: 'c18', text: 'Muy bien. Tu sueco está mejorando.' },
      { id: 'c19', text: '¡Bravo! Te salió perfecto.' },
      { id: 'c20', text: 'Ves que cuando te concentras, puedes.' },
      { id: 'c21', text: '¡Correctísimo!' },
      { id: 'c22', text: 'Muy bien, hijito/a. Sigue con esa energía.' },
      { id: 'c23', text: 'Esa respuesta estuvo impecable. Como tu habitación.' },
      { id: 'c24', text: '¡Qué orgullo! Lo hiciste muy bien.' },
      { id: 'c25', text: 'Así sí, mi amor.' },
      { id: 'c26', text: 'Muy bien. Juanita aprueba esta respuesta.' },
      { id: 'c27', text: '¡Eso merece un aplauso!' },
      { id: 'c28', text: 'Perfecto. Vamos por la siguiente.' },
      { id: 'c29', text: 'Muy bien. Ya le estás agarrando el truco. Ya era hora.' },
      { id: 'c30', text: '¡Qué elegante esa respuesta!' },
      { id: 'c31', text: 'Así se responde.' },
      { id: 'c32', text: 'Muy bien. Hoy estás imparable. ¿Qué has comido?' },
      { id: 'c33', text: '¡Excelente trabajo!' },
      { id: 'c34', text: 'Correcto, corazón. Vamos avanzando.' },
      { id: 'c35', text: 'Muy bien. Confía más en lo que sabes.' },
      { id: 'c36', text: '¡Eso! Sin miedo al sueco.' },
      { id: 'c37', text: 'Muy bien. Cada respuesta cuenta.' },
      { id: 'c38', text: '¡Perfecto! Me sorprendiste.' },
      { id: 'c39', text: 'Así se aprende: practicando.' },
      { id: 'c40', text: 'Muy bien. Te felicito de verdad.' },
      { id: 'c41', text: '¡Correcto! Ya casi pareces un/a vikingo/a.' },
      { id: 'c42', text: 'Muy bien, hijito/a. Estoy orgullosa.' },
      { id: 'c43', text: '¡Eso salió redondito!' },
      { id: 'c44', text: 'Excelente. Mantén la concentración.' },
      { id: 'c45', text: 'Muy bien. Una respuesta más y seguimos creciendo.' },
      { id: 'c46', text: '¡Perfecto! No cambies el ritmo.' },
      { id: 'c47', text: 'Eso estuvo muy bien pensado.' },
      { id: 'c48', text: '¡Correcto! Juanita está contenta.' },
      { id: 'c49', text: 'Muy bien, mi amor. Vamos por otra.' },
    ]
  },
  wrong_answer: {
    emotions: ['seria', 'pensando', 'sorprendida', 'chancleta'],
    list: [
      { id: 'w1',  text: '¿Qué pasó, hijito/a? Lee otra vez con calma.' },
      { id: 'w2',  text: 'No me hagas renegar. Mira bien la pregunta.' },
      { id: 'w3',  text: 'Casi, mi amor. Inténtalo nuevamente.' },
      { id: 'w4',  text: 'Respira, piensa y vuelve a mirar.' },
      { id: 'w5',  text: 'Ay, hijito/a. Esa no era, pero seguimos.' },
      { id: 'w6',  text: 'Te estoy mirando… concéntrate.' },
      { id: 'w7',  text: 'No corras. Lee cada palabra.' },
      { id: 'w8',  text: 'Casi lo tenías. Vamos otra vez.' },
      { id: 'w9',  text: 'Con calma, corazón. Tú sí puedes.' },
      { id: 'w10', text: 'Esa respuesta se nos escapó.' },
      { id: 'w11', text: 'No pasa nada. Ahora aprende por qué.' },
      { id: 'w12', text: 'Hijito/a, primero piensa y después responde, ¿okey?' },
      { id: 'w13', text: 'Esa no era, pero te salvo esta vez.' },
      { id: 'w14', text: 'Ay, mi amor. Mira bien la explicación.' },
      { id: 'w15', text: 'No adivines. Usa lo que ya aprendiste.' },
      { id: 'w16', text: 'Cuidado con esa palabra, que ahí estaba la trampa.' },
      { id: 'w17', text: 'Ya pues, concéntrate un poquito más.' },
      { id: 'w18', text: 'Casi, casi. Te faltó mirar un detalle.' },
      { id: 'w19', text: 'No te preocupes. Los errores también enseñan.' },
      { id: 'w20', text: 'Esa no era, corazón. Vamos a entenderla.' },
      { id: 'w21', text: 'Juanita no está convencida con esa respuesta.' },
      { id: 'w22', text: 'Hijito/a, esa opción estaba sospechosa.' },
      { id: 'w23', text: 'Léela nuevamente y verás la diferencia.' },
      { id: 'w24', text: 'No me respondas tan rápido.' },
      { id: 'w25', text: 'Esa respuesta necesita otra vuelta.' },
      { id: 'w26', text: 'Ay, hijito/a. Hoy me vas a hacer tomar otro café.' },
      { id: 'w27', text: 'Te perdono, pero aprende la explicación.' },
      { id: 'w28', text: 'No pasa nada. La próxima sí sale.' },
      { id: 'w29', text: 'Mira con atención cuál era la respuesta correcta.' },
      { id: 'w30', text: 'Te faltó poquito. No te rindas.' },
      { id: 'w31', text: 'Esa no era, pero seguimos avanzando.' },
      { id: 'w32', text: 'Con paciencia. Nadie aprende todo a la primera.' },
      { id: 'w33', text: 'Aquí había que pensar un poquito más.' },
      { id: 'w34', text: 'Hijito/a, no ignores las pistas.' },
      { id: 'w35', text: 'Ay, corazón. Esa palabra te confundió.' },
      { id: 'w36', text: 'Casi me sacas la chancleta… pero te daré otra oportunidad.' },
      { id: 'w37', text: 'No me hagas buscar mis lentes. Mira bien.' },
      { id: 'w38', text: 'Esa respuesta salió apurada.' },
      { id: 'w39', text: 'Aprende esta regla y no volverás a caer.' },
      { id: 'w40', text: 'No te castigues. Solo corrige y continúa.' },
      { id: 'w41', text: 'Esta vez ganó la pregunta, pero la próxima ganas tú.' },
      { id: 'w42', text: 'Hijito/a, esa respuesta no pasó la inspección de Juanita.' },
      { id: 'w43', text: 'Vamos de nuevo. Tú sabes más de lo que crees.' },
      { id: 'w44', text: 'No era esa, mi amor. Revisa la explicación.' },
      { id: 'w45', text: 'Aquí faltó concentración, nada más.' },
      { id: 'w46', text: 'Esa opción parecía bonita, pero era una trampa.' },
      { id: 'w47', text: 'No te rindas por una respuesta.' },
      { id: 'w48', text: 'Con calma y buena letra, hijito/a.' },
      { id: 'w49', text: 'Hoy te equivocaste, mañana ya no.' },
      { id: 'w50', text: 'Seguimos. Juanita no abandona a sus alumnos.' },
    ]
  },
  first_visit: {
    emotions: ['feliz', 'orgullosa'],
    list: [
      { id: 'fv1', text: 'Hola, hijito/a. Bienvenido/a a nuestra primera práctica.' },
      { id: 'fv2', text: 'Qué alegría tenerte aquí. Vamos a aprender juntos.' },
      { id: 'fv3', text: 'Hoy comenzamos. Sin miedo y con mucha paciencia.' },
      { id: 'fv4', text: 'Bienvenido/a, corazón. Juanita te acompañará.' },
      { id: 'fv5', text: 'Esta es tu primera práctica. Vamos paso a paso.' },
    ]
  },
  same_day_return: {
    emotions: ['feliz', 'riendo'],
    list: [
      { id: 'sd1', text: '¿Otra vez por aquí? Así me gusta, con ganas.' },
      { id: 'sd2', text: 'Volviste el mismo día. ¡Esa es la actitud!' },
      { id: 'sd3', text: 'Qué bueno tenerte de nuevo hoy. Sigamos.' },
      { id: 'sd4', text: 'Dos prácticas en un día. Juanita está feliz.' },
    ]
  },
  daily_return: {
    emotions: ['feliz', 'orgullosa'],
    list: [
      { id: 'dr1', text: '¡Mira quién volvió! Así se crea una buena costumbre.' },
      { id: 'dr2', text: 'Muy bien, hijito/a. Dos días practicando.' },
      { id: 'dr3', text: 'Así me gusta: constante y responsable.' },
      { id: 'dr4', text: 'Te estaba esperando. Continuemos.' },
      { id: 'dr5', text: 'Volviste rápido. Eso me pone contenta.' },
    ]
  },
  short_absence: {
    emotions: ['neutral', 'pensando', 'feliz'],
    list: [
      { id: 'sa1', text: 'Ya te estaba extrañando, hijito/a.' },
      { id: 'sa2', text: 'Qué bueno que regresaste. Vamos a retomar.' },
      { id: 'sa3', text: 'Te tomaste un descansito, pero ya estamos de vuelta.' },
      { id: 'sa4', text: 'No pasa nada. Lo importante es regresar.' },
      { id: 'sa5', text: '¿Tú crees que esto es un hotel? ¡Vamos a practicar!' },
    ]
  },
  medium_absence: {
    emotions: ['sorprendida', 'seria', 'neutral'],
    list: [
      { id: 'ma1', text: '¿Dónde te habías metido, hijito/a? Vamos a practicar.' },
      { id: 'ma2', text: 'Ya pensaba que te habías olvidado de Juanita.' },
      { id: 'ma3', text: 'Pasaron varios días, pero empezamos nuevamente.' },
      { id: 'ma4', text: 'Bienvenido/a de regreso. Sin culpas y con ganas.' },
      { id: 'ma5', text: 'Vamos a despertar ese sueco que estaba descansando.' },
    ]
  },
  long_absence: {
    emotions: ['sorprendida', 'chancleta', 'riendo'],
    list: [
      { id: 'la1',  text: '¡Hijito/a! Ya estaba por mandarte a buscar.' },
      { id: 'la2',  text: 'Cuánto tiempo sin verte. Vamos poco a poco.' },
      { id: 'la3',  text: 'Te desapareciste, pero Juanita todavía te guarda tu lugar.' },
      { id: 'la4',  text: 'Bienvenido/a nuevamente. Hoy empezamos sin presión.' },
      { id: 'la5',  text: 'Lo importante no es cuánto tardaste, sino que regresaste.' },
      { id: 'la6',  text: 'Tu sueco estaba de vacaciones. Vamos a despertarlo.' },
      { id: 'la7',  text: 'No te voy a regañar… mucho. Comencemos.' },
      { id: 'la8',  text: 'Hace tiempo que no practicábamos. Vamos con algo sencillo.' },
      { id: 'la9',  text: 'Aquí nadie pierde su oportunidad. Empezamos otra vez.' },
      { id: 'la10', text: 'Al fin regresaste, ¡ya casi llamo a la policía para que te busque!' },
    ]
  },
  three_correct: {
    emotions: ['feliz', 'orgullosa'],
    list: [
      { id: 't3_1', text: 'Tres seguidas, hijito/a. Así me gusta.' },
      { id: 't3_2', text: 'Vas agarrando ritmo.' },
      { id: 't3_3', text: 'Muy bien. Ya estás calentando motores.' },
      { id: 't3_4', text: 'Tres correctas. Sigue concentrado/a.' },
      { id: 't3_5', text: 'Esto se está poniendo bueno.' },
    ]
  },
  five_correct: {
    emotions: ['orgullosa', 'aplaudiendo', 'riendo'],
    list: [
      { id: 'f5_1', text: '¡Cinco seguidas! Hoy estás imparable.' },
      { id: 'f5_2', text: 'Mira nomás qué nivel.' },
      { id: 'f5_3', text: 'Cinco correctas. Juanita está orgullosa.' },
      { id: 'f5_4', text: 'Así se demuestra la constancia.' },
      { id: 'f5_5', text: 'Sigue así y pronto no me necesitarás.' },
    ]
  },
  needs_support: {
    emotions: ['seria', 'pensando', 'cafe'],
    list: [
      { id: 'ns1',  text: 'Detengámonos un momento. Respira y seguimos.' },
      { id: 'ns2',  text: 'No pasa nada, hijito/a. Vamos más despacio.' },
      { id: 'ns3',  text: 'Parece que este tema necesita un poquito más de práctica.' },
      { id: 'ns4',  text: 'No adivines. Lee con calma la siguiente.' },
      { id: 'ns5',  text: 'Los errores no mandan aquí. Tú continúas.' },
      { id: 'ns6',  text: 'Vamos a cambiar de estrategia.' },
      { id: 'ns7',  text: 'Mira bien las explicaciones. Ahí está la clave.' },
      { id: 'ns8',  text: 'No te desesperes, corazón.' },
      { id: 'ns9',  text: 'Hoy este tema está terco, pero nosotros más.' },
      { id: 'ns10', text: 'Vamos paso a paso. Juanita está contigo.' },
    ]
  },
  streak_lost: {
    emotions: ['neutral', 'seria'],
    list: [
      { id: 'sl1', text: 'La racha terminó, pero tu aprendizaje continúa.' },
      { id: 'sl2', text: 'No pasa nada. Hoy podemos empezar una nueva.' },
      { id: 'sl3', text: 'Una racha no define todo lo que aprendiste.' },
      { id: 'sl4', text: 'Volvemos a empezar, sin culpa.' },
      { id: 'sl5', text: 'Hoy empieza una nueva oportunidad.' },
    ]
  },
  streak_milestone: {
    emotions: ['orgullosa', 'aplaudiendo'],
    list: [
      { id: 'sm1',  text: 'Tres días seguidos. Muy bien, hijito/a.' },
      { id: 'sm2',  text: 'Tu constancia está creciendo.' },
      { id: 'sm3',  text: 'Mira esa racha tan bonita.' },
      { id: 'sm4',  text: 'Cada día suma.' },
      { id: 'sm5',  text: 'Juanita está orgullosa de tu disciplina.' },
      { id: 'sm6',  text: 'Ya van siete días. Eso sí es compromiso.' },
      { id: 'sm7',  text: 'Dos semanas practicando. Qué maravilla.' },
      { id: 'sm8',  text: 'Un mes de constancia merece celebración.' },
      { id: 'sm9',  text: 'Tu esfuerzo ya se está notando.' },
      { id: 'sm10', text: 'Sigue cuidando esa racha.' },
    ]
  },
  improved_score: {
    emotions: ['orgullosa', 'aplaudiendo', 'feliz'],
    list: [
      { id: 'is1', text: '¡Mejoraste tu puntuación anterior! Así se avanza.' },
      { id: 'is2', text: 'Cada vez lo haces mejor, hijito/a.' },
      { id: 'is3', text: 'Subiste tu marca. Juanita está orgullosa.' },
      { id: 'is4', text: 'Ese progreso no es casualidad, es tu esfuerzo.' },
    ]
  },
  session_complete: {
    emotions: ['feliz', 'orgullosa', 'cafe'],
    list: [
      { id: 'sc1',  text: 'Muy buen trabajo por hoy. Ahora descansa.' },
      { id: 'sc2',  text: 'Terminamos, hijito/a. Mañana seguimos.' },
      { id: 'sc3',  text: 'Cada práctica te acerca a tu meta.' },
      { id: 'sc4',  text: 'Estoy orgullosa de que hayas terminado.' },
      { id: 'sc5',  text: 'Hoy aprendiste algo nuevo, y eso es suficiente.' },
      { id: 'sc6',  text: 'Buen trabajo. Cierra la sesión con orgullo.' },
      { id: 'sc7',  text: 'Terminamos por hoy. Ve a tomar agua.' },
      { id: 'sc8',  text: 'Juanita aprueba tu esfuerzo. Descansa.' },
      { id: 'sc9',  text: 'Gracias por no rendirte.' },
      { id: 'sc10', text: 'Nos vemos en la próxima práctica.' },
    ]
  },
  level_complete: {
    emotions: ['orgullosa', 'aplaudiendo', 'riendo'],
    list: [
      { id: 'lc1',  text: '¡Lo lograste, hijito/a! Nivel completado.' },
      { id: 'lc2',  text: 'Sabía que ibas a conseguirlo.' },
      { id: 'lc3',  text: 'Juanita está muy orgullosa de ti.' },
      { id: 'lc4',  text: 'Todo ese esfuerzo dio resultado.' },
      { id: 'lc5',  text: 'Ya estás preparado/a para el siguiente nivel.' },
      { id: 'lc6',  text: 'Qué alegría verte avanzar.' },
      { id: 'lc7',  text: 'Esto merece una celebración.' },
      { id: 'lc8',  text: 'Mira hasta dónde has llegado.' },
      { id: 'lc9',  text: 'Un nivel menos y mucho sueco aprendido.' },
      { id: 'lc10', text: 'Felicidades, corazón. Te lo ganaste.' },
    ]
  },
};
