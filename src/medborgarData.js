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
    {
      id: 'm02', title: 'Demokrati', active: true,
      aprende: 'Democracia (**demokrati**) significa que el pueblo (**folket**) decide. En Suecia, todos los que tienen al menos 18 años pueden votar (**rösta**) en elecciones libres. Las bases de la democracia son: elecciones libres, igualdad de todos ante la ley, libertad de expresión (**yttrandefrihet**) y varios partidos (pluralismo). Suecia es una democracia desde principios del siglo XX; el sufragio universal (**allmän rösträtt**) para hombres y mujeres llegó en 1921. Las decisiones se toman por mayoría (**majoritet**), pero también se protegen los derechos de las minorías y los derechos humanos (**mänskliga rättigheter**).',
      palabras: [
        { sv: 'demokrati', es: 'democracia' }, { sv: 'folket', es: 'el pueblo' }, { sv: 'rösta', es: 'votar' },
        { sv: 'yttrandefrihet', es: 'libertad de expresión' }, { sv: 'allmän rösträtt', es: 'sufragio universal' }, { sv: 'majoritet', es: 'mayoría' }
      ],
      questions: [
        { q: 'Vad betyder demokrati?', qEs: '¿Qué significa democracia?', options: ['Folket bestämmer', 'Kungen bestämmer', 'Militären bestämmer', 'En person bestämmer'], correct: 0, exp: 'Democracia significa que el pueblo decide.', phrase: 'Rätt! I en demokrati bestämmer folket.', why: 'En una democracia el poder viene del pueblo, que elige a sus representantes en elecciones libres.' },
        { q: 'Från vilken ålder får man rösta i Sverige?', qEs: '¿A partir de qué edad se puede votar en Suecia?', options: ['18 år', '15 år', '16 år', '21 år'], correct: 0, exp: 'Se puede votar a partir de los 18 años.', phrase: 'Rätt! Man får rösta från 18 års ålder.' },
        { q: 'Vilket är ett kännetecken för en demokrati?', qEs: '¿Cuál es un rasgo de una democracia?', options: ['Fria val', 'Bara ett parti', 'Ingen yttrandefrihet', 'Kungen styr ensam'], correct: 0, exp: 'Las elecciones libres son un rasgo de la democracia.', phrase: 'Rätt! Fria val är viktigt i en demokrati.', why: 'Las elecciones libres, la igualdad ante la ley y la libertad de expresión son pilares de la democracia.' },
        { q: 'När fick kvinnor rösträtt i Sverige?', qEs: '¿Cuándo obtuvieron las mujeres el derecho al voto en Suecia?', options: ['1921', '1850', '1975', '2000'], correct: 0, exp: 'Las mujeres obtuvieron el derecho al voto en 1921.', phrase: 'Rätt! Kvinnor fick rösträtt 1921.', why: 'El sufragio universal (allmän rösträtt) para hombres y mujeres se implementó en 1921, un hito de la democracia sueca.' },
        { q: 'En medborgare vill påverka samhället. Vad kan hen göra i en demokrati?', qEs: 'Un ciudadano quiere influir en la sociedad. ¿Qué puede hacer en una democracia?', options: ['Rösta i valet', 'Ingenting', 'Betala mer skatt', 'Flytta utomlands'], correct: 0, isCase: true, exp: 'Puede votar en las elecciones para influir.', phrase: 'Rätt! Genom att rösta kan man påverka.', why: 'En democracia, votar es la forma principal de influir; también puede afiliarse a un partido, manifestarse o expresar su opinión libremente.' }
      ]
    },
    {
      id: 'm03', title: 'Hur Sverige styrs', active: true,
      aprende: 'Suecia se gobierna en tres niveles: el Estado (**stat**), la región (**region**) y el municipio (**kommun**). El parlamento, el Riksdag (**Riksdag**), aprueba las leyes (**stiftar lagar**). El gobierno (**regering**), dirigido por el primer ministro (**statsminister**), dirige el país y ejecuta las leyes. El sector público (**offentlig sektor**) ofrece escuela, sanidad y cuidados, y se financia con impuestos (**skatt**). Los municipios se encargan de servicios locales como la escuela y el cuidado de mayores. El Riksdag se elige cada cuatro años.',
      palabras: [
        { sv: 'Riksdag', es: 'parlamento' }, { sv: 'regering', es: 'gobierno' }, { sv: 'statsminister', es: 'primer ministro' },
        { sv: 'kommun', es: 'municipio' }, { sv: 'offentlig sektor', es: 'sector público' }, { sv: 'stifta lagar', es: 'legislar' }
      ],
      questions: [
        { q: 'Vem stiftar lagar i Sverige?', qEs: '¿Quién hace las leyes en Suecia?', options: ['Riksdagen', 'Kungen', 'Kommunen', 'Domstolen'], correct: 0, exp: 'El Riksdag (parlamento) hace las leyes.', phrase: 'Rätt! Riksdagen stiftar lagarna.', why: 'El Riksdag es el poder legislativo; el gobierno ejecuta las leyes y los tribunales juzgan.' },
        { q: 'Vem leder regeringen?', qEs: '¿Quién dirige el gobierno?', options: ['Statsministern', 'Kungen', 'Talmannen', 'Presidenten'], correct: 0, exp: 'El gobierno lo dirige el primer ministro (statsminister).', phrase: 'Rätt! Statsministern leder regeringen.' },
        { q: 'Vad är den offentliga sektorns huvuduppgift?', qEs: '¿Cuál es la función principal del sector público?', options: ['Ge välfärd som skola och vård', 'Sälja varor', 'Göra vinst', 'Styra företag'], correct: 0, exp: 'La función principal del sector público es dar bienestar: escuela, sanidad y cuidados.', phrase: 'Rätt! Den offentliga sektorn ger välfärd.', why: 'El sector público, financiado con impuestos, provee servicios como escuela, sanidad y asistencia social; no busca lucro.' },
        { q: 'Vad ansvarar kommunen för?', qEs: '¿De qué se encarga el municipio?', options: ['Skola och äldreomsorg', 'Försvaret', 'Utrikespolitik', 'Riksbanken'], correct: 0, exp: 'El municipio se encarga de la escuela y del cuidado de mayores, entre otros servicios locales.', phrase: 'Rätt! Kommunen ansvarar för skola och omsorg.' },
        { q: 'Hur ofta hålls riksdagsval i Sverige?', qEs: '¿Cada cuánto se celebran elecciones al parlamento en Suecia?', options: ['Vart fjärde år', 'Varje år', 'Vartannat år', 'Vart tionde år'], correct: 0, exp: 'Las elecciones al Riksdag se celebran cada cuatro años.', phrase: 'Rätt! Riksdagsval hålls vart fjärde år.' },
        { q: 'En person undrar vem som bestämmer om kommunalskatten. Vad är rätt?', qEs: 'Una persona se pregunta quién decide el impuesto municipal. ¿Qué es correcto?', options: ['Kommunfullmäktige', 'Kungen', 'Riksdagen ensam', 'Företagen'], correct: 0, isCase: true, exp: 'El pleno municipal (kommunfullmäktige) decide el impuesto municipal.', phrase: 'Rätt! Kommunfullmäktige bestämmer kommunalskatten.', why: 'Cada municipio tiene una asamblea elegida (kommunfullmäktige) que decide sobre los servicios locales y el impuesto municipal.' }
      ]
    },
    {
      id: 'm04', title: 'Val och politik', active: true,
      aprende: 'En Suecia hay elecciones (**val**) cada cuatro años para el Riksdag, las regiones y los municipios. Los ciudadanos votan por partidos (**partier**), no por personas concretas. El partido o la coalición (**koalition**) con mayoría forma el gobierno. El voto es libre y secreto. Los partidos que no gobiernan forman la oposición (**oppositionen**), que controla al gobierno y propone alternativas. También hay elecciones al Parlamento Europeo. En la papeleta (**valsedel**) se elige el partido.',
      palabras: [
        { sv: 'val', es: 'elección' }, { sv: 'parti', es: 'partido' }, { sv: 'valsedel', es: 'papeleta' },
        { sv: 'koalition', es: 'coalición' }, { sv: 'oppositionen', es: 'la oposición' }, { sv: 'riksdagsval', es: 'elección parlamentaria' }
      ],
      questions: [
        { q: 'Vad röstar man på i ett svenskt val?', qEs: '¿A qué se vota en una elección sueca?', options: ['Partier', 'Företag', 'Kungar', 'Domstolar'], correct: 0, exp: 'En Suecia se vota por partidos.', phrase: 'Rätt! Man röstar på partier.' },
        { q: 'Vad kallas partierna som inte sitter i regeringen?', qEs: '¿Cómo se llaman los partidos que no están en el gobierno?', options: ['Oppositionen', 'Majoriteten', 'Regeringen', 'Kungahuset'], correct: 0, exp: 'Los partidos que no están en el gobierno forman la oposición.', phrase: 'Rätt! De kallas oppositionen.', why: 'La oposición controla al gobierno y propone alternativas; es esencial en una democracia.' },
        { q: 'Är röstningen i Sverige hemlig?', qEs: '¿El voto en Suecia es secreto?', options: ['Ja, den är hemlig', 'Nej, alla ser den', 'Bara för vissa', 'Man röstar öppet'], correct: 0, exp: 'Sí, el voto es secreto.', phrase: 'Rätt! Röstningen är hemlig.' },
        { q: 'Vilket val hålls också i Sverige förutom riksdagsvalet?', qEs: '¿Qué elección también se celebra en Suecia además de la parlamentaria?', options: ['Val till Europaparlamentet', 'Val av kung', 'Val av domare', 'Val av polischef'], correct: 0, exp: 'También hay elecciones al Parlamento Europeo.', phrase: 'Rätt! Man röstar också till Europaparlamentet.', why: 'Como miembro de la UE, Suecia elige a sus representantes en el Parlamento Europeo cada cinco años.' },
        { q: 'En person är 17 år och vill rösta i riksdagsvalet. Får hen det?', qEs: 'Una persona tiene 17 años y quiere votar en las elecciones parlamentarias. ¿Puede?', options: ['Nej, man måste vara 18', 'Ja, från 15 år', 'Ja, alla får', 'Bara med tillstånd'], correct: 0, isCase: true, exp: 'No; hay que tener 18 años para votar.', phrase: 'Rätt! Man måste vara 18 år för att rösta.' }
      ]
    },
    {
      id: 'm05', title: 'Lagar och rättssystemet', active: true,
      aprende: 'En Suecia todos son iguales ante la ley (**lag**). La policía (**polis**) mantiene el orden e investiga delitos (**brott**); los tribunales (**domstol**) juzgan de forma independiente y nadie es culpable hasta que se demuestre. Existe libertad de expresión (**yttrandefrihet**), pero con límites: amenazar, difamar o incitar al odio contra un grupo (**hets mot folkgrupp**) es delito. Las leyes protegen tanto los derechos como los deberes de las personas. El sistema judicial (**rättssystem**) garantiza un proceso justo.',
      palabras: [
        { sv: 'lag', es: 'ley' }, { sv: 'domstol', es: 'tribunal' }, { sv: 'polis', es: 'policía' },
        { sv: 'brott', es: 'delito' }, { sv: 'yttrandefrihet', es: 'libertad de expresión' }, { sv: 'hets mot folkgrupp', es: 'incitación al odio' }
      ],
      questions: [
        { q: 'Vem dömer i brottmål i Sverige?', qEs: '¿Quién juzga los delitos en Suecia?', options: ['Domstolen', 'Polisen', 'Riksdagen', 'Kungen'], correct: 0, exp: 'Los tribunales juzgan los delitos.', phrase: 'Rätt! Domstolen dömer i brottmål.', why: 'La policía investiga, la fiscalía acusa y el tribunal (domstol) juzga de forma independiente.' },
        { q: 'Vad gäller inför lagen i Sverige?', qEs: '¿Qué rige ante la ley en Suecia?', options: ['Alla är lika', 'Rika har mer rätt', 'Män har mer rätt', 'Kungen står över lagen'], correct: 0, exp: 'Todos son iguales ante la ley.', phrase: 'Rätt! Alla är lika inför lagen.' },
        { q: 'Får man säga vad man vill i Sverige?', qEs: '¿Se puede decir lo que uno quiera en Suecia?', options: ['Ja, men hets mot folkgrupp är förbjudet', 'Ja, allt är tillåtet', 'Nej, ingenting', 'Bara politiker får'], correct: 0, exp: 'Hay libertad de expresión, pero incitar al odio contra un grupo está prohibido.', phrase: 'Rätt! Yttrandefrihet finns, men hets mot folkgrupp är olagligt.', why: 'La libertad de expresión es amplia, pero tiene límites: las amenazas, la difamación y la incitación al odio (hets mot folkgrupp) son delitos.' },
        { q: 'En person publicerar en åsikt i sociala medier. Vad säger svensk lag?', qEs: 'Una persona publica una opinión en redes sociales. ¿Qué dice la ley sueca?', options: ['Det är tillåtet, men man får inte hetsa mot en folkgrupp', 'Allt är förbjudet', 'Man måste fråga polisen först', 'Bara positiva åsikter är tillåtna'], correct: 0, isCase: true, exp: 'Publicar una opinión está permitido por la libertad de expresión, pero no se puede incitar al odio contra un grupo.', phrase: 'Rätt! Åsikter är tillåtna, men inte hets mot folkgrupp.', why: 'En redes sociales también rige la libertad de expresión; sin embargo, las amenazas, la difamación o la incitación al odio (hets mot folkgrupp) siguen siendo delitos.' },
        { q: 'Vad gör polisen i Sverige?', qEs: '¿Qué hace la policía en Suecia?', options: ['Upprätthåller ordning och utreder brott', 'Dömer folk', 'Stiftar lagar', 'Styr landet'], correct: 0, exp: 'La policía mantiene el orden e investiga delitos.', phrase: 'Rätt! Polisen upprätthåller ordning och utreder brott.' }
      ]
    },
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
