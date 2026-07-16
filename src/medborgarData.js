/* ═══════════════════════════════════════════════════════════════════
   MEDBORGARSKAPSPROVET — preparación para el examen de ciudadanía sueca
   Sección INDEPENDIENTE: su propio progreso (tabla medborgarskap_progress),
   no afecta el progreso general de Aprender.

   Estructura de cada módulo:
     id, title, active (false = "Próximamente"),
     aprende  · texto explicativo en español (≤200 palabras); las palabras
                clave en sueco se marcan con **asteriscos**.
     palabras · [{ sv, es }]
     questions· [{ q(sueco), options[](sueco), correct, exp(es), phrase(sueco),
                   why(es), isCase(bool opcional) }]
   Para añadir contenido: rellena aprende/palabras/questions y pon active:true.
   ═══════════════════════════════════════════════════════════════════ */

const MEDBORGAR = {
  modules: [
    {
      id: 'm01', title: 'Sverige som land', active: true,
      aprende: 'Suecia (**Sverige**) es un país nórdico del norte de Europa. Su capital (**huvudstad**) es **Stockholm** y su moneda es la corona sueca (**krona**). El idioma principal es el sueco (**svenska**). Suecia es una monarquía constitucional: el jefe de Estado (**statschef**) es el rey (**kung**), pero tiene una función simbólica y no gobierna. El poder político lo tienen el parlamento (**Riksdag**) y el gobierno (**regering**). El país se divide en municipios (**kommun**) y regiones. Los habitantes (**invånare**) pagan impuestos (**skatt**) que financian la sanidad, la escuela y el bienestar. La economía se apoya en recursos naturales (**naturresurser**) como el bosque (**skog**), el hierro (**järnmalm**) y la energía hidráulica (**vattenkraft**).',
      palabras: [
        { sv: 'Sverige', es: 'Suecia' },
        { sv: 'huvudstad', es: 'capital' },
        { sv: 'kung', es: 'rey' },
        { sv: 'statschef', es: 'jefe de Estado' },
        { sv: 'Riksdag', es: 'parlamento' },
        { sv: 'regering', es: 'gobierno' },
        { sv: 'kommun', es: 'municipio' },
        { sv: 'skatt', es: 'impuesto' },
        { sv: 'skog', es: 'bosque' },
        { sv: 'järnmalm', es: 'mineral de hierro' }
      ],
      questions: [
        { q: 'Vem är Sveriges statschef?', qEs: '¿Quién es el jefe de Estado de Suecia?', options: ['Kungen', 'Statsministern', 'Riksdagen', 'Presidenten'], correct: 0,
          exp: 'El jefe de Estado de Suecia es el rey; tiene una función simbólica.', phrase: 'Rätt! Sveriges statschef är kungen.',
          why: 'Suecia es una monarquía constitucional: el rey es el jefe de Estado pero no gobierna. Las decisiones políticas las toman el Riksdag (parlamento) y el gobierno.' },
        { q: 'Vad heter Sveriges huvudstad?', qEs: '¿Cuál es la capital de Suecia?', options: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala'], correct: 0,
          exp: 'La capital de Suecia es Estocolmo.', phrase: 'Rätt! Sveriges huvudstad är Stockholm.',
          why: 'Estocolmo es la ciudad más grande y la capital, donde se encuentran el Riksdag y el gobierno.' },
        { q: 'Vilken naturresurs är viktig för Sveriges ekonomi?', qEs: '¿Qué recurso natural es importante para la economía de Suecia?', options: ['Skog', 'Olja', 'Guld', 'Diamanter'], correct: 0,
          exp: 'El bosque (madera) es un recurso natural clave para la economía sueca, junto con el hierro y la energía hidráulica.', phrase: 'Rätt! Skogen är en viktig naturresurs i Sverige.',
          why: 'Suecia tiene enormes bosques; la industria de la madera y el papel es histórica. También son importantes el hierro (järnmalm) y la energía hidroeléctrica (vattenkraft). Suecia no es un país petrolero.' },
        { q: 'Vilket är Sveriges officiella huvudspråk?', qEs: '¿Cuál es el idioma oficial principal de Suecia?', options: ['Svenska', 'Norska', 'Finska', 'Danska'], correct: 0,
          exp: 'El idioma principal oficial de Suecia es el sueco.', phrase: 'Rätt! Sveriges huvudspråk är svenska.',
          why: 'El sueco es el idioma principal. Además hay cinco lenguas minoritarias reconocidas (como el finés y el sami).' },
        { q: 'Vad heter Sveriges valuta?', qEs: '¿Cómo se llama la moneda de Suecia?', options: ['Krona', 'Euro', 'Dollar', 'Pund'], correct: 0,
          exp: 'La moneda de Suecia es la corona sueca (krona).', phrase: 'Rätt! Sveriges valuta är svenska kronor.',
          why: 'Aunque Suecia es miembro de la Unión Europea, no usa el euro; mantiene su propia moneda, la corona (krona).' },
        { q: 'En person vill veta vem som styr Sverige politiskt. Vad är rätt?', qEs: 'Una persona quiere saber quién gobierna Suecia políticamente. ¿Qué es correcto?', options: ['Riksdagen och regeringen', 'Kungen ensam', 'Domstolarna', 'Företagen'], correct: 0, isCase: true,
          exp: 'El poder político lo tienen el Riksdag (parlamento) y el gobierno, no el rey.', phrase: 'Rätt! Riksdagen och regeringen styr Sverige politiskt.',
          why: 'El rey es un jefe de Estado simbólico. Quienes aprueban las leyes y gobiernan el país son el Riksdag (elegido por el pueblo) y el gobierno (regering), que responde ante el Riksdag.' }
      ]
    },
    /* ── Módulos siguientes: se llenan igual que el primero ── */
    { id: 'm02', title: 'Demokrati', active: false },
    { id: 'm03', title: 'Hur Sverige styrs', active: false },
    { id: 'm04', title: 'Val och politik', active: false },
    { id: 'm05', title: 'Lagar och rättssystemet', active: false },
    { id: 'm06', title: 'Medier', active: false },
    { id: 'm07', title: 'Mänskliga rättigheter', active: false },
    { id: 'm08', title: 'Arbete och ekonomi', active: false },
    { id: 'm09', title: 'Välfärd', active: false },
    { id: 'm10', title: 'Sveriges historia', active: false },
    { id: 'm11', title: 'Sverige i världen', active: false },
    { id: 'm12', title: 'Religion och mångfald', active: false },
    { id: 'm13', title: 'Kultur och traditioner', active: false }
  ]
};

if (typeof window !== 'undefined') window.MEDBORGAR = MEDBORGAR;
