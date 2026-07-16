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
    {
      id: 'm06', title: 'Medier', active: true,
      aprende: 'En Suecia hay libertad de prensa (**tryckfrihet**) y libertad de expresión. Los medios (**medier**) —prensa, radio, TV e internet— informan y fiscalizan a quienes tienen el poder; por eso se les llama el "tercer poder". El servicio público (**public service**), como SVT y Sveriges Radio, se financia de forma pública y debe ser independiente e imparcial. La crítica de fuentes (**källkritik**) es clave: comprobar si una información es fiable antes de creerla o compartirla. Además, el principio de acceso público permite a cualquiera consultar documentos oficiales.',
      palabras: [
        { sv: 'medier', es: 'medios' }, { sv: 'tryckfrihet', es: 'libertad de prensa' }, { sv: 'källkritik', es: 'crítica de fuentes' },
        { sv: 'public service', es: 'servicio público' }, { sv: 'nyheter', es: 'noticias' }, { sv: 'yttrandefrihet', es: 'libertad de expresión' }
      ],
      questions: [
        { q: 'Vad är massmediernas viktiga roll i en demokrati?', qEs: '¿Cuál es el papel importante de los medios en una democracia?', options: ['Att granska makten och informera', 'Att sälja varor', 'Att styra landet', 'Att döma brott'], correct: 0, exp: 'Su papel clave es informar y fiscalizar (controlar) al poder.', phrase: 'Rätt! Medier granskar makten och informerar.', why: 'En una democracia, los medios libres informan y vigilan a quienes tienen el poder; por eso se les llama el "tercer poder".' },
        { q: 'Vad betyder tryckfrihet?', qEs: '¿Qué significa libertad de prensa?', options: ['Rätten att publicera utan censur', 'Att allt är gratis', 'Att staten styr tidningarna', 'Förbud mot tidningar'], correct: 0, exp: 'Libertad de prensa: derecho a publicar sin censura.', phrase: 'Rätt! Tryckfrihet är rätten att publicera fritt.' },
        { q: 'Vad är källkritik?', qEs: '¿Qué es la crítica de fuentes?', options: ['Att granska om information är pålitlig', 'Att kritisera alla', 'Att tro på allt', 'Att undvika nyheter'], correct: 0, exp: 'Crítica de fuentes: examinar si la información es fiable.', phrase: 'Rätt! Källkritik är att granska informationens tillförlitlighet.', why: 'Ante tanta información (y desinformación), es clave comprobar quién dice algo, cuándo y por qué antes de creerlo.' },
        { q: 'Vad är exempel på public service i Sverige?', qEs: '¿Qué es un ejemplo de servicio público en Suecia?', options: ['SVT och Sveriges Radio', 'Netflix', 'Privata bloggar', 'Reklamföretag'], correct: 0, exp: 'SVT y Sveriges Radio son servicio público.', phrase: 'Rätt! SVT och SR är public service.' },
        { q: 'En person läser en sensationell nyhet på nätet. Vad är klokt att göra?', qEs: 'Una persona lee una noticia sensacionalista en internet. ¿Qué es sensato hacer?', options: ['Kontrollera källan innan man tror på den', 'Dela den direkt', 'Tro på allt', 'Ignorera all information'], correct: 0, isCase: true, exp: 'Lo sensato es comprobar la fuente antes de creerla o compartirla.', phrase: 'Rätt! Man bör kontrollera källan först.', why: 'La crítica de fuentes (källkritik) evita difundir desinformación: verifica el origen y contrástalo con medios fiables.' }
      ]
    },
    {
      id: 'm07', title: 'Mänskliga rättigheter', active: true,
      aprende: 'Los derechos humanos (**mänskliga rättigheter**) pertenecen a todas las personas, sin importar su origen, religión, sexo u opinión. Suecia los protege y ha firmado convenios internacionales de la ONU. Principios clave: el igual valor de todas las personas (**alla människors lika värde**), la libertad de religión (**religionsfrihet**), la libertad de expresión y la protección frente a la discriminación (**diskriminering**). Los niños tienen derechos especiales (la Convención del Niño, **barnkonventionen**). La igualdad entre mujeres y hombres (**jämställdhet**) es un valor central en la sociedad sueca.',
      palabras: [
        { sv: 'mänskliga rättigheter', es: 'derechos humanos' }, { sv: 'lika värde', es: 'igual valor' }, { sv: 'religionsfrihet', es: 'libertad de religión' },
        { sv: 'diskriminering', es: 'discriminación' }, { sv: 'jämställdhet', es: 'igualdad de género' }, { sv: 'barnkonventionen', es: 'Convención del Niño' }
      ],
      questions: [
        { q: 'Vem har mänskliga rättigheter?', qEs: '¿Quién tiene derechos humanos?', options: ['Alla människor', 'Bara svenskar', 'Bara vuxna', 'Bara medborgare'], correct: 0, exp: 'Todas las personas tienen derechos humanos.', phrase: 'Rätt! Alla människor har mänskliga rättigheter.', why: 'Los derechos humanos son universales: valen para todos por el hecho de ser personas.' },
        { q: 'Vad betyder religionsfrihet?', qEs: '¿Qué significa libertad de religión?', options: ['Rätten att tro eller inte tro', 'Alla måste ha en religion', 'Bara en religion tillåts', 'Förbud mot religion'], correct: 0, exp: 'Libertad de religión: derecho a creer o no creer.', phrase: 'Rätt! Religionsfrihet betyder att man får tro eller inte tro.' },
        { q: 'Vad är diskriminering?', qEs: '¿Qué es la discriminación?', options: ['Att behandla någon sämre på grund av t.ex. kön eller ursprung', 'Att alla är lika', 'Att hjälpa någon', 'Att betala skatt'], correct: 0, exp: 'Discriminación: tratar peor a alguien por su sexo, origen, etc.', phrase: 'Rätt! Diskriminering är att behandla någon orättvist.', why: 'En Suecia la discriminación por sexo, origen, religión, discapacidad u orientación está prohibida por ley.' },
        { q: 'Vad menas med jämställdhet?', qEs: '¿Qué significa igualdad de género?', options: ['Lika rättigheter för kvinnor och män', 'Att män bestämmer', 'Att kvinnor bestämmer', 'Ingen jämlikhet'], correct: 0, exp: 'Igualdad de género: iguales derechos para mujeres y hombres.', phrase: 'Rätt! Jämställdhet är lika rättigheter för kvinnor och män.' },
        { q: 'En arbetsgivare vägrar anställa en person på grund av dess religion. Vad gäller?', qEs: 'Un empleador se niega a contratar a alguien por su religión. ¿Qué rige?', options: ['Det är olaglig diskriminering', 'Det är tillåtet', 'Det bestämmer arbetsgivaren fritt', 'Man måste byta religion'], correct: 0, isCase: true, exp: 'Es discriminación ilegal negar un empleo por la religión.', phrase: 'Rätt! Det är olaglig diskriminering.', why: 'La ley de discriminación (diskrimineringslagen) prohíbe rechazar a alguien por motivos como religión, sexo u origen.' }
      ]
    },
    {
      id: 'm08', title: 'Arbete och ekonomi', active: true,
      aprende: 'En Suecia la mayoría de los adultos trabaja (**arbeta**) y paga impuestos (**skatt**) sobre sus ingresos (**inkomst**); esos impuestos financian el bienestar. El mercado laboral (**arbetsmarknad**) tiene reglas: un contrato de trabajo (**anställningsavtal**), sindicatos (**fackförbund**) que defienden a los trabajadores, y derechos como vacaciones y lugares de trabajo seguros. Ante el desempleo (**arbetslöshet**) hay ayudas. La agencia pública de empleo (**Arbetsförmedlingen**) ayuda a encontrar trabajo y ofrece orientación y formación.',
      palabras: [
        { sv: 'arbete', es: 'trabajo' }, { sv: 'inkomst', es: 'ingreso' }, { sv: 'skatt', es: 'impuesto' },
        { sv: 'fackförbund', es: 'sindicato' }, { sv: 'anställningsavtal', es: 'contrato de trabajo' }, { sv: 'arbetslöshet', es: 'desempleo' }
      ],
      questions: [
        { q: 'Vad betalar man skatt på i Sverige?', qEs: '¿Sobre qué se paga impuesto en Suecia?', options: ['Sin inkomst', 'Ingenting', 'Bara på lyxvaror', 'Bara företag betalar'], correct: 0, exp: 'Se paga impuesto sobre los ingresos.', phrase: 'Rätt! Man betalar skatt på sin inkomst.', why: 'Los impuestos financian la sanidad, la escuela y el bienestar; casi todos los que trabajan contribuyen.' },
        { q: 'Vad gör ett fackförbund?', qEs: '¿Qué hace un sindicato?', options: ['Företräder och skyddar arbetstagarna', 'Styr landet', 'Dömer brott', 'Säljer varor'], correct: 0, exp: 'Un sindicato representa y protege a los trabajadores.', phrase: 'Rätt! Ett fackförbund företräder arbetstagarna.', why: 'Los sindicatos negocian salarios y condiciones y defienden los derechos de los empleados.' },
        { q: 'Vad behöver man oftast för att jobba i Sverige?', qEs: '¿Qué se necesita normalmente para trabajar en Suecia?', options: ['Ett anställningsavtal', 'Ingenting', 'Bara pengar', 'Ett körkort'], correct: 0, exp: 'Normalmente se necesita un contrato de trabajo.', phrase: 'Rätt! Man behöver ett anställningsavtal.' },
        { q: 'Vad kallas det när man inte har ett jobb?', qEs: '¿Cómo se llama cuando no se tiene trabajo?', options: ['Arbetslöshet', 'Semester', 'Inkomst', 'Pension'], correct: 0, exp: 'Se llama desempleo (arbetslöshet).', phrase: 'Rätt! Att sakna jobb kallas arbetslöshet.' },
        { q: 'En person söker jobb i Sverige. Vilken myndighet kan hjälpa till?', qEs: 'Una persona busca trabajo en Suecia. ¿Qué organismo puede ayudar?', options: ['Arbetsförmedlingen', 'Skatteverket', 'Polisen', 'Migrationsverket'], correct: 0, isCase: true, exp: 'El Servicio de Empleo (Arbetsförmedlingen) ayuda a buscar trabajo.', phrase: 'Rätt! Arbetsförmedlingen hjälper till att hitta jobb.', why: 'Arbetsförmedlingen es la agencia pública de empleo: orienta, ofrece formación y conecta con empleadores.' }
      ]
    },
    {
      id: 'm09', title: 'Välfärd', active: true,
      aprende: 'El modelo de bienestar (**välfärd**) sueco da a todos acceso a la sanidad (**sjukvård**), la escuela (**skola**) y la seguridad social, financiado con impuestos. La atención sanitaria es en gran parte gratuita o de bajo coste. La escuela es gratuita y hay escolaridad obligatoria (**skolplikt**) para los niños. Existen ayudas por enfermedad, permiso parental (**föräldrapenning**), pensiones (**pension**) y apoyo a las familias. El objetivo es la seguridad (**trygghet**) y la igualdad de oportunidades para todas las personas.',
      palabras: [
        { sv: 'välfärd', es: 'bienestar' }, { sv: 'sjukvård', es: 'sanidad' }, { sv: 'skolplikt', es: 'escolaridad obligatoria' },
        { sv: 'föräldrapenning', es: 'prestación parental' }, { sv: 'pension', es: 'pensión' }, { sv: 'trygghet', es: 'seguridad' }
      ],
      questions: [
        { q: 'Hur finansieras välfärden i Sverige?', qEs: '¿Cómo se financia el bienestar en Suecia?', options: ['Med skatter', 'Med reklam', 'Med lån från kungen', 'Med privata företag'], correct: 0, exp: 'El bienestar se financia con impuestos.', phrase: 'Rätt! Välfärden finansieras med skatter.', why: 'Los impuestos que pagan quienes trabajan financian la sanidad, la escuela, las pensiones y las ayudas.' },
        { q: 'Vad gäller för barn i Sverige när det gäller skola?', qEs: '¿Qué rige para los niños en Suecia respecto a la escuela?', options: ['Det finns skolplikt', 'Skolan är frivillig', 'Bara pojkar går i skolan', 'Skolan kostar mycket'], correct: 0, exp: 'Existe escolaridad obligatoria (skolplikt) y la escuela es gratuita.', phrase: 'Rätt! I Sverige finns skolplikt.', why: 'Todos los niños tienen el derecho y la obligación de ir a la escuela, que es gratuita.' },
        { q: 'Vad är föräldrapenning?', qEs: '¿Qué es la prestación parental (föräldrapenning)?', options: ['Ersättning när man är hemma med sitt barn', 'Lön för att arbeta', 'En skatt', 'En pension'], correct: 0, exp: 'Prestación parental: dinero para estar en casa cuidando al hijo.', phrase: 'Rätt! Föräldrapenning ger ersättning när man är hemma med barnet.', why: 'Suecia tiene un permiso parental generoso, que ambos progenitores pueden compartir.' },
        { q: 'Vad får man när man blir gammal och slutar arbeta?', qEs: '¿Qué se recibe al hacerse mayor y dejar de trabajar?', options: ['Pension', 'Studielån', 'Barnbidrag', 'Böter'], correct: 0, exp: 'Al jubilarse se recibe una pensión (pension).', phrase: 'Rätt! När man slutar arbeta får man pension.' },
        { q: 'En person blir sjuk och kan inte arbeta en period. Vad kan hen få?', qEs: 'Una persona se enferma y no puede trabajar un tiempo. ¿Qué puede recibir?', options: ['Sjukpenning', 'Ingenting', 'Böter', 'Studielån'], correct: 0, isCase: true, exp: 'Puede recibir un subsidio por enfermedad (sjukpenning).', phrase: 'Rätt! Man kan få sjukpenning när man är sjuk.', why: 'El seguro social (Försäkringskassan) paga sjukpenning cuando una enfermedad impide trabajar.' }
      ]
    },
    { id: 'm10', title: 'Sveriges historia', active: false },
    { id: 'm11', title: 'Sverige i världen', active: false },
    { id: 'm12', title: 'Religion och mångfald', active: false },
    { id: 'm13', title: 'Kultur och traditioner', active: false }
  ]
};

if (typeof window !== 'undefined') window.MEDBORGAR = MEDBORGAR;
