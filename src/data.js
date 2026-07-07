// ═══════════════════════════════════════════════════════════
//  SUECO CON SOFI — Base de datos de contenido
//  Editable desde el panel de administración o directamente
// ═══════════════════════════════════════════════════════════

const DEFAULT_DATA = {

  // ── SFI A ───────────────────────────────────────────────
  A: {
    listen: [
      {
        id: 'a-l-1',
        title: 'I butiken',
        topic: 'Supermercado',
        icon: '🛒',
        duration: '~45s',
        text: `Hej! Kan jag hjälpa dig? Ja tack. Jag letar efter mjölk. Var är mjölken? Mjölken finns i kylen, längst bak i butiken. Tack! Har ni också bröd? Ja, brödet ligger på hyllan bredvid kassan. Perfekt. Hur mycket kostar det? Brödet kostar tjugofem kronor. Okej, jag tar ett bröd och en liter mjölk. Varsågod. Betalar du med kort eller kontant? Med kort, tack.`,
        questions: [
          { text: '¿Dónde está la leche?', options: ['Cerca de la entrada', 'En el refrigerador al fondo', 'Junto a la caja', 'No hay leche'], correct: 1, explanation: 'Mjölken finns i kylen, längst bak = la leche está en el refrigerador, al fondo.' },
          { text: '¿Cuánto cuesta el pan?', options: ['15 coronas', '30 coronas', '25 coronas', '20 coronas'], correct: 2, explanation: 'Brödet kostar tjugofem kronor = el pan cuesta veinticinco coronas.' },
          { text: '¿Cómo paga el cliente?', options: ['En efectivo', 'Con tarjeta', 'Con Swish', 'No paga'], correct: 1, explanation: 'Med kort = con tarjeta.' },
          { text: '¿Qué compra el cliente?', options: ['Solo pan', 'Solo leche', 'Pan y un litro de leche', 'Pan y dos litros de leche'], correct: 2, explanation: 'Jag tar ett bröd och en liter mjölk = tomo un pan y un litro de leche.' },
        ]
      },
      {
        id: 'a-l-2',
        title: 'Hos läkaren',
        topic: 'En el médico',
        icon: '🏥',
        duration: '~50s',
        text: `Goddag! Vad kan jag hjälpa dig med? Hej, jag heter Sofia och jag har ont i halsen sedan tre dagar. Har du feber? Ja, lite. Ungefär trettioåtta grader. Okej, jag ska titta på halsen. Öppna munnen, tack. Hmm, du har halsfluss. Du behöver antibiotika. Hur länge ska jag ta det? I tio dagar. Ta en tablett tre gånger om dagen. Kan jag jobba? Nej, du bör vila hemma i minst två dagar. Jag skriver ett läkarintyg till dig.`,
        questions: [
          { text: '¿Qué problema tiene Sofia?', options: ['Dolor de cabeza', 'Dolor de garganta', 'Dolor de estómago', 'Fiebre muy alta'], correct: 1, explanation: 'Jag har ont i halsen = tengo dolor de garganta.' },
          { text: '¿Cuánta fiebre tiene Sofia?', options: ['37 grados', '39 grados', '38 grados', '40 grados'], correct: 2, explanation: 'Ungefär trettioåtta grader = aproximadamente 38 grados.' },
          { text: '¿Cuántos días debe tomar la medicina?', options: ['5 días', '7 días', '10 días', '14 días'], correct: 2, explanation: 'I tio dagar = durante diez días.' },
          { text: '¿Cuántas veces al día toma la pastilla?', options: ['Una vez', 'Dos veces', 'Tres veces', 'Cuatro veces'], correct: 2, explanation: 'Tre gånger om dagen = tres veces al día.' },
        ]
      },
      {
        id: 'a-l-3',
        title: 'På tunnelbanan',
        topic: 'Transporte público',
        icon: '🚇',
        duration: '~40s',
        text: `Ursäkta, jag ska till Centralen. Vilken linje ska jag ta? Du kan ta tunnelbana röd linje mot Norsborg. Byt sedan vid T-Centralen. Hur lång tid tar det? Ungefär femton minuter. Var köper jag biljett? Du kan köpa i automaten där borta, eller betala med Swish. Kostar det lika mycket? Ja, enkelbiljetten kostar fyrtiotre kronor. Tack så mycket! Varsågod. Ha en bra resa!`,
        questions: [
          { text: '¿Qué línea debe tomar el pasajero?', options: ['Línea azul', 'Línea roja', 'Línea verde', 'Línea amarilla'], correct: 1, explanation: 'Röd linje = línea roja.' },
          { text: '¿Cuánto tiempo dura el viaje?', options: ['5 minutos', '10 minutos', '15 minutos', '20 minutos'], correct: 2, explanation: 'Ungefär femton minuter = aproximadamente quince minutos.' },
          { text: '¿Cuánto cuesta el billete?', options: ['23 coronas', '33 coronas', '43 coronas', '53 coronas'], correct: 2, explanation: 'Enkelbiljetten kostar fyrtiotre kronor = el billete sencillo cuesta cuarenta y tres coronas.' },
          { text: '¿Cómo se puede pagar el billete?', options: ['Solo en efectivo', 'Solo con tarjeta', 'En máquina o con Swish', 'No se puede comprar en la estación'], correct: 2, explanation: 'I automaten eller med Swish = en la máquina o con Swish.' },
        ]
      },
      {
        id: 'a-l-4',
        title: 'Väderprognoset',
        topic: 'El tiempo / Clima',
        icon: '⛅',
        duration: '~35s',
        text: `Godmorgon och välkommen till väderprognoset. Idag blir det mulet och kallt i Stockholm. Temperaturen ligger runt fem grader. På eftermiddagen väntas regn i söder och möjligen lite snö på natten. I Göteborg är det soligare med temperaturer kring tio grader. Malmö får delvis sol och temperaturer runt åtta grader. Ta med paraply om du ska ut i Stockholm. Ha en bra dag!`,
        questions: [
          { text: '¿Qué tiempo hace en Estocolmo hoy?', options: ['Soleado y cálido', 'Nublado y frío', 'Soleado y frío', 'Lluvia todo el día'], correct: 1, explanation: 'Mulet och kallt = nublado y frío.' },
          { text: '¿Qué temperatura hay en Gotemburgo?', options: ['5 grados', '8 grados', '10 grados', '15 grados'], correct: 2, explanation: 'Temperaturer kring tio grader = temperaturas en torno a diez grados.' },
          { text: '¿Qué se recomienda llevar en Estocolmo?', options: ['Gafas de sol', 'Ropa de baño', 'Un paraguas', 'Botas de nieve'], correct: 2, explanation: 'Ta med paraply = lleva (un) paraguas.' },
          { text: '¿Qué puede caer en Estocolmo por la noche?', options: ['Granizo', 'Nieve', 'Lluvia intensa', 'Nada'], correct: 1, explanation: 'Möjligen lite snö på natten = posiblemente algo de nieve por la noche.' },
        ]
      },
    ],

    read: [
      {
        id: 'a-r-1',
        title: 'Familjen Lindgren',
        tag: 'Familia',
        icon: '👨‍👩‍👧‍👦',
        text: `Maria och Erik Lindgren bor i en lägenhet i Stockholm. De har två barn: Emma, som är sex år, och Lucas, som är nio år. Maria jobbar som sjuksköterska och Erik jobbar på ett kontor i centrum. Barnen går i skolan nära hemmet. På helgerna brukar familjen gå på promenader i parken eller besöka morföräldrar som bor i Uppsala. De gillar att laga mat tillsammans och Emmas favoriträtt är pannkakor.`,
        questions: [
          { text: '¿Dónde vive la familia Lindgren?', options: ['En una casa en Uppsala', 'En un apartamento en Estocolmo', 'En una casa en Gotemburgo', 'En Uppsala'], correct: 1, explanation: 'De bor i en lägenhet i Stockholm = viven en un apartamento en Estocolmo.' },
          { text: '¿Cuántos hijos tienen Maria y Erik?', options: ['Uno', 'Dos', 'Tres', 'Cuatro'], correct: 1, explanation: 'De har två barn = tienen dos hijos.' },
          { text: '¿Dónde trabaja Erik?', options: ['En un hospital', 'En una escuela', 'En una oficina en el centro', 'En un supermercado'], correct: 2, explanation: 'Erik jobbar på ett kontor i centrum = Erik trabaja en una oficina en el centro.' },
          { text: '¿Cuál es el plato favorito de Emma?', options: ['Köttbullar (albóndigas)', 'Pizza', 'Pannkakor (tortitas)', 'Fisk (pescado)'], correct: 2, explanation: 'Emmas favoriträtt är pannkakor = el plato favorito de Emma son las tortitas.' },
        ]
      },
      {
        id: 'a-r-2',
        title: 'Min dag',
        tag: 'Rutina diaria',
        icon: '📅',
        text: `Jag heter Pedro och jag kommer från Spanien. Jag bor i Göteborg och studerar svenska på SFI. Varje morgon vaknar jag klockan sju. Jag äter frukost och dricker kaffe. Sedan tar jag spårvagnen till skolan. Lektionerna börjar klockan nio och slutar klockan tolv. På lunch äter jag i skolans matsal. På eftermiddagen jobbar jag ibland som vikarie på ett café. På kvällen lagar jag mat och studerar svenska i en timme innan jag sover.`,
        questions: [
          { text: '¿De dónde viene Pedro?', options: ['De Italia', 'De España', 'De Portugal', 'De México'], correct: 1, explanation: 'Jag kommer från Spanien = vengo de España.' },
          { text: '¿A qué hora empieza la clase?', options: ['A las ocho', 'A las nueve', 'A las diez', 'A las siete'], correct: 1, explanation: 'Lektionerna börjar klockan nio = las clases empiezan a las nueve.' },
          { text: '¿Cómo va Pedro a la escuela?', options: ['En metro', 'En autobús', 'En tranvía', 'Caminando'], correct: 2, explanation: 'Jag tar spårvagnen = tomo el tranvía.' },
          { text: '¿Qué hace Pedro por las tardes algunas veces?', options: ['Estudia en la biblioteca', 'Trabaja en una cafetería', 'Practica deporte', 'Ve la televisión'], correct: 1, explanation: 'Jobbar jag ibland som vikarie på ett café = a veces trabajo como suplente en una cafetería.' },
        ]
      },
      {
        id: 'a-r-3',
        title: 'Lägenheten',
        tag: 'Vivienda',
        icon: '🏠',
        text: `Fatima och hennes familj bor i en lägenhet i Husby. Lägenheten har tre rum och kök. De bor på tredje våningen och har en liten balkong. Hyran är nio tusen kronor i månaden. Fatima gillar sin lägenhet men vill ha en större trädgård för sina barn. I närheten finns en park, en skola och ett bibliotek. Det tar fem minuter att gå till tunnelbanan. De har bott där i två år och trivs bra.`,
        questions: [
          { text: '¿Cuántas habitaciones tiene el apartamento?', options: ['Dos habitaciones', 'Tres habitaciones', 'Cuatro habitaciones', 'Una habitación'], correct: 1, explanation: 'Tre rum och kök = tres habitaciones y cocina.' },
          { text: '¿En qué piso vive Fatima?', options: ['En el primero', 'En el segundo', 'En el tercero', 'En la planta baja'], correct: 2, explanation: 'De bor på tredje våningen = viven en el tercer piso.' },
          { text: '¿Cuánto tarda en llegar al metro?', options: ['10 minutos caminando', '5 minutos caminando', '15 minutos en autobús', '3 minutos en coche'], correct: 1, explanation: 'Fem minuter att gå till tunnelbanan = cinco minutos andando hasta el metro.' },
          { text: '¿Qué echa de menos Fatima?', options: ['Un garaje', 'Un jardín más grande', 'Un balcón', 'Una piscina'], correct: 1, explanation: 'Vill ha en större trädgård = quiere tener un jardín más grande.' },
        ]
      },
      {
        id: 'a-r-4',
        title: 'På restaurangen',
        tag: 'Restaurante',
        icon: '🍽️',
        text: `Idag äter Lena och hennes kolleger lunch på en restaurang nära jobbet. Restaurangen heter Gröna Köket och serverar vegetarisk mat. Lena beställer en vegetarisk lasagne och ett glas vatten. Hennes kollega Ahmed beställer en sallad med bröd. Lunchen kostar nittiofem kronor per person. Restaurangen är öppen måndag till fredag klockan elva till fjorton. De betalar med kort och ger lite dricks till servitören.`,
        questions: [
          { text: '¿Qué tipo de comida sirve el restaurante?', options: ['Comida española', 'Comida japonesa', 'Comida vegetariana', 'Comida italiana'], correct: 2, explanation: 'Serverar vegetarisk mat = sirven comida vegetariana.' },
          { text: '¿Qué pide Lena?', options: ['Ensalada y pan', 'Lasaña vegetariana y agua', 'Sopa y zumo', 'Pizza y refresco'], correct: 1, explanation: 'Lena beställer en vegetarisk lasagne och ett glas vatten = Lena pide una lasaña vegetariana y un vaso de agua.' },
          { text: '¿Cuánto cuesta el almuerzo?', options: ['75 coronas', '85 coronas', '95 coronas', '105 coronas'], correct: 2, explanation: 'Nittiofem kronor per person = noventa y cinco coronas por persona.' },
          { text: '¿Cuándo está abierto el restaurante?', options: ['Todos los días de 10 a 15', 'Lunes a viernes de 11 a 14', 'Lunes a sábado de 11 a 15', 'Solo los fines de semana'], correct: 1, explanation: 'Måndag till fredag klockan elva till fjorton = lunes a viernes de once a catorce.' },
        ]
      },
    ],

    write: [
      {
        id: 'a-w-1',
        title: 'Skriv ett mejl till din granne',
        icon: '📧',
        words: '30–50 ord',
        prompt: 'Tu vecino Carlos te ha invitado a una cena el próximo viernes. Escríbele un correo en sueco.\n\nEn tu correo debes:\n• Aceptar la invitación\n• Preguntar a qué hora empieza\n• Preguntar si debes llevar algo',
        checklist: ['Usa un saludo: Hej Carlos!', 'Acepta: Tack för inbjudan! Jag kommer gärna.', 'Pregunta la hora: Vilken tid börjar middagen?', 'Pregunta qué llevar: Ska jag ta med något?', 'Firma: Hälsningar, [tu nombre]'],
        example: 'Hej Carlos!\n\nTack för inbjudan till middagen på fredag! Jag kommer gärna. Vilken tid börjar det? Ska jag ta med något att äta eller dricka?\n\nSer fram emot det!\nHälsningar, Ana',
        criteria: ['Contenido: ¿Cumplió todas las tareas?', 'Gramática: verbos correctos, orden de palabras', 'Vocabulario: palabras adecuadas al nivel A', 'Formato: saludo, cuerpo, firma']
      },
      {
        id: 'a-w-2',
        title: 'Beskriv dig själv',
        icon: '🙋',
        words: '40–60 ord',
        prompt: 'Escribe una presentación sobre ti mismo en sueco.\n\nIncluye:\n• Tu nombre y de dónde vienes\n• Dónde vives en Suecia\n• Tu trabajo o estudios\n• Un hobby o algo que te gusta',
        checklist: ['Jag heter... och jag kommer från...', 'Jag bor i... sedan...', 'Jag jobbar/studerar...', 'På fritiden tycker jag om att...'],
        example: 'Hej! Jag heter María och jag kommer från Colombia. Jag bor i Malmö sedan ett år. Jag studerar svenska på SFI och jobbar ibland på ett café. På fritiden tycker jag om att promenera och laga mat.',
        criteria: ['Contenido: se presenta correctamente', 'Gramática: verbos en presente', 'Vocabulario: palabras de presentación básica', 'Coherencia: las ideas se entienden']
      },
      {
        id: 'a-w-3',
        title: 'Skriv ett meddelande till jobbet',
        icon: '💼',
        words: '20–35 ord',
        prompt: 'Estás enfermo y no puedes ir al trabajo hoy. Escribe un mensaje a tu jefe (chef).\n\nEn tu mensaje debes:\n• Decir que estás enfermo\n• Decir que no puedes ir hoy\n• Pedir disculpas',
        checklist: ['Hej [nombre del jefe]!', 'Jag är sjuk idag...', 'Jag kan tyvärr inte komma till jobbet.', 'Förlåt för besväret. / Sorry för kort varsel.'],
        example: 'Hej Anna!\n\nJag är tyvärr sjuk idag och kan inte komma till jobbet. Jag har ont i halsen och feber. Förlåt för besväret.\n\nMed vänliga hälsningar,\nCarlos',
        criteria: ['Contenido: explica el motivo', 'Tono: formal y respetuoso', 'Brevedad: mensaje corto y claro', 'Vocabulario: sjuk, tyvärr, förlåt']
      },
    ],

    speak: [
      {
        id: 'a-s-1',
        title: 'Boka en läkartid',
        icon: '🏥',
        context: 'En el centro de salud (vårdcentralen)',
        cardA: 'Eres un paciente. Tienes dolor de garganta desde hace tres días y tienes algo de fiebre.\n\nDebes:\n• Decir tu nombre\n• Explicar tus síntomas\n• Pedir una cita para esta semana\n• Preguntar la dirección del centro',
        cardB: 'Eres la recepcionista de un centro de salud. Atiende al paciente.\n\nDebes:\n• Preguntar nombre y número de persona (personnummer)\n• Preguntar el motivo de la consulta\n• Ofrecer hora: martes a las 14:00\n• Dar la dirección: Vasagatan 8',
        teacherQuestions: ['Vad heter du? (¿Cómo te llamas?)', 'Vad är problemet? (¿Cuál es el problema?)', 'Hur länge har du haft ont? (¿Cuánto tiempo llevas con dolor?)', 'Kan du komma på tisdag? (¿Puedes venir el martes?)', 'Var bor du? (¿Dónde vives?)'],
        phrases: ['Jag har ont i halsen.', 'Jag har lite feber.', 'Kan jag boka en tid?', 'Hur dags?', 'Var ligger ni?', 'Tack för hjälpen.']
      },
      {
        id: 'a-s-2',
        title: 'Handla i butiken',
        icon: '🛒',
        context: 'En el supermercado',
        cardA: 'Eres un cliente. Quieres comprar: leche, pan y manzanas. No encuentras la leche.\n\nDebes:\n• Saludar y pedir ayuda\n• Preguntar dónde está la leche\n• Preguntar el precio del pan\n• Pagar con tarjeta',
        cardB: 'Eres la persona que trabaja en el supermercado (butiksbiträde).\n\nDebes:\n• Saludar y ofrecer ayuda\n• Indicar dónde está la leche (al fondo, en el refrigerador)\n• Decir el precio del pan (29 kr)\n• Procesar el pago',
        teacherQuestions: ['Vad söker du? (¿Qué buscas?)', 'Var är kassan? (¿Dónde está la caja?)', 'Betalar du med kort? (¿Pagas con tarjeta?)', 'Hur mycket kostar det? (¿Cuánto cuesta?)', 'Behöver du en påse? (¿Necesitas una bolsa?)'],
        phrases: ['Ursäkta, var är...?', 'Hur mycket kostar...?', 'Jag tar det här.', 'Kan jag betala med kort?', 'Tack så mycket!', 'Varsågod.']
      },
      {
        id: 'a-s-3',
        title: 'Presentera dig på jobbet',
        icon: '💼',
        context: 'Primer día de trabajo',
        cardA: 'Es tu primer día de trabajo en un restaurante. Preséntate a tu jefe y a tus nuevos compañeros.\n\nHabla sobre:\n• Tu nombre y origen\n• Tu experiencia de trabajo\n• Por qué quieres trabajar allí\n• Tus hobbies',
        cardB: 'Eres el jefe. Recibe al nuevo empleado con amabilidad.\n\nDebes preguntar sobre:\n• De dónde viene\n• Su experiencia previa\n• Sus idiomas\n• Sus expectativas del trabajo',
        teacherQuestions: ['Vad heter du? (¿Cómo te llamas?)', 'Varifrån kommer du? (¿De dónde vienes?)', 'Har du jobbat förut? (¿Has trabajado antes?)', 'Vad tycker du om att jobba med? (¿Qué te gusta hacer en el trabajo?)', 'Vilka språk pratar du? (¿Qué idiomas hablas?)'],
        phrases: ['Hej, jag heter...', 'Jag kommer från...', 'Jag har jobbat som...', 'Jag pratar spanska och svenska.', 'Jag är glad att vara här.', 'Trevligt att träffas!']
      },
      {
        id: 'a-s-4',
        title: 'Berätta om familjen',
        icon: '👨‍👩‍👧',
        context: 'Conversación sobre la familia',
        cardA: 'Habla sobre tu familia con tu compañero. Describe:\n• Cuántas personas hay en tu familia\n• Dónde viven\n• Qué hacen (trabajo/estudios)\n• Una cosa que hacen juntos',
        cardB: 'Escucha a tu compañero y haz preguntas sobre su familia.\n\nPreguntas sugeridas:\n• ¿Tienes hermanos?\n• ¿Dónde viven tus padres?\n• ¿Cuándo los ves?\n• ¿Echas de menos a tu familia?',
        teacherQuestions: ['Hur många är ni i familjen? (¿Cuántos son en tu familia?)', 'Bor din familj i Sverige? (¿Vive tu familia en Suecia?)', 'Hur ofta pratar du med dem? (¿Con qué frecuencia hablas con ellos?)', 'Vad gör ni ihop? (¿Qué hacen juntos?)', 'Saknar du din familj? (¿Echas de menos a tu familia?)'],
        phrases: ['Jag har... syskon.', 'Mina föräldrar bor i...', 'Vi träffas...', 'Jag saknar dem.', 'Min familj är viktig för mig.', 'Vi pratar på video.']
      },
    ],

    test: [
      { category: 'Gramática', text: 'Välj rätt artikel: _____ hus är stort.', options: ['En', 'Ett', 'Ingen artikel', 'De'], correct: 1, explanation: 'Hus är ett ett-ord (neutrum). = Ett hus.' },
      { category: 'Gramática', text: 'Konjugera verbet: Jag _____ (bo) i Stockholm.', options: ['bor', 'boar', 'bore', 'bora'], correct: 0, explanation: 'Att bo → jag bor (presente). Verbos grupo 1: -ar en presente.' },
      { category: 'Vocabulario', text: '¿Qué significa "sjukhus"?', options: ['Casa pequeña', 'Hospital', 'Escuela', 'Supermercado'], correct: 1, explanation: 'Sjukhus = hospital. Sjuk = enfermo, hus = casa.' },
      { category: 'Gramática', text: 'Negación correcta: Jag _____ kaffe.', options: ['gillar inte', 'inte gillar', 'gillar ingen', 'inga gillar'], correct: 0, explanation: 'Inte va DESPUÉS del verbo: Jag gillar INTE kaffe.' },
      { category: 'Vocabulario', text: '¿Cómo se dice "lunes" en sueco?', options: ['Tisdag', 'Onsdag', 'Måndag', 'Fredag'], correct: 2, explanation: 'Måndag = lunes. Tisdag = martes, Onsdag = miércoles, Fredag = viernes.' },
      { category: 'Comprensión', text: '"Butiken stänger klockan tjugo." ¿Cuándo cierra la tienda?', options: ['A las 12:00', 'A las 18:00', 'A las 20:00', 'A las 22:00'], correct: 2, explanation: 'Klockan tjugo = a las 20:00 (sistema de 24h).' },
      { category: 'Gramática', text: 'Forma correcta del pasado: Hon _____ (arbeta) igår.', options: ['arbetade', 'arbetar', 'arbeta', 'arbetad'], correct: 0, explanation: 'Arbeta → hon arbetade (preteritum, grupo 1 en -ade).' },
      { category: 'Vocabulario', text: '¿Qué significa "vänster"?', options: ['Derecha', 'Recto', 'Izquierda', 'Arriba'], correct: 2, explanation: 'Vänster = izquierda. Höger = derecha. Rakt fram = todo recto.' },
      { category: 'Gramática', text: 'Pronombre correcto: _____ bor i Sverige. (Ella)', options: ['Han', 'Hon', 'De', 'Ni'], correct: 1, explanation: 'Hon = ella. Han = él. De = ellos/ellas. Ni = vosotros.' },
      { category: 'Comprensión', text: '"Jag är hungrig och vill äta." ¿Qué quiere la persona?', options: ['Dormir', 'Beber algo', 'Comer algo', 'Salir'], correct: 2, explanation: 'Hungrig = hambrienta. Äta = comer. Quiere comer algo.' },
      { category: 'Vocabulario', text: '¿Cómo se dice "gato" en sueco?', options: ['Hund', 'Katt', 'Fågel', 'Fisk'], correct: 1, explanation: 'Katt = gato. Hund = perro. Fågel = pájaro. Fisk = pez.' },
      { category: 'Gramática', text: 'Orden correcto de palabras: [Igår / köpte / Maria / bröd]', options: ['Maria köpte igår bröd.', 'Igår köpte Maria bröd.', 'Igår Maria köpte bröd.', 'Bröd köpte Maria igår.'], correct: 1, explanation: 'Regla V2: con adverbio temporal al inicio, el verbo va en 2ª posición. Igår KÖPTE Maria...' },
    ]
  },

  // ── SFI B ───────────────────────────────────────────────
  B: {
    listen: [
      {
        id: 'b-l-1',
        title: 'På Arbetsförmedlingen',
        topic: 'Oficina de empleo',
        icon: '💼',
        duration: '~70s',
        text: `Goddag! Välkommen till Arbetsförmedlingen. Vad kan jag hjälpa dig med? Hej, jag heter Valentina Reyes och jag har nyligen blivit av med mitt jobb. Jag undrar om jag kan ansöka om a-kassa. Ja, det är möjligt. Har du varit medlem i en a-kassa? Ja, jag var med i Handels a-kassa i ungefär ett år. Det stämmer bra. För att ha rätt till ersättning måste du ha arbetat minst sex månader under de senaste tolv månaderna. Det har jag gjort. Jag jobbade i butik från januari till november förra året. Bra. Då behöver du fylla i ett ansökningsformulär. Du kan göra det digitalt på vår hemsida. Hur lång tid tar det innan jag får svar? Normalt sett tar det mellan tre och fyra veckor.`,
        questions: [
          { text: '¿Por qué visita Valentina la oficina?', options: ['Para buscar empleo', 'Para solicitar el subsidio de desempleo', 'Para renovar su permiso', 'Para pedir información de formación'], correct: 1, explanation: 'Ansöka om a-kassa = solicitar el subsidio de desempleo (caja de paro).' },
          { text: '¿Cuánto tiempo mínimo hay que haber trabajado?', options: ['3 meses', 'Un año', '6 meses', '9 meses'], correct: 2, explanation: 'Minst sex månader = mínimo seis meses.' },
          { text: '¿Cuánto tarda la respuesta?', options: ['1 semana', '2 semanas', '3-4 semanas', '2 meses'], correct: 2, explanation: 'Tre och fyra veckor = tres y cuatro semanas.' },
          { text: '¿Cómo puede rellenar el formulario Valentina?', options: ['Solo en papel en la oficina', 'Digitalmente en la web', 'Por teléfono', 'Por correo postal'], correct: 1, explanation: 'Digitalt på vår hemsida = digitalmente en nuestra web.' },
          { text: '¿Dónde trabajó Valentina el año pasado?', options: ['En un hospital', 'En una oficina', 'En una tienda (butik)', 'En un restaurante'], correct: 2, explanation: 'Jag jobbade i butik = trabajé en una tienda.' },
        ]
      },
      {
        id: 'b-l-2',
        title: 'Nyheter — Integrationscenter',
        topic: 'Noticias locales',
        icon: '📰',
        duration: '~60s',
        text: `God eftermiddag. Här är nyheterna från Stockholm. Stockholms stad öppnar nästa månad ett nytt integrationscenter i Tensta. Centret ska erbjuda kostnadsfri undervisning i svenska, hjälp med CV och jobbsökning samt juridisk rådgivning till nyanlända. Socialborgarrådet uttalar sig: Det är viktigt att vi ger nyanlända de verktyg de behöver för att etablera sig på arbetsmarknaden. Centret beräknas ta emot upp till tvåhundra personer per vecka och kommer att ha öppet måndag till fredag, klockan åtta till sjutton. Projektet är finansierat med EU-bidrag och lokala skattemedel. Det är också planerat att utvidga verksamheten till Botkyrka och Södertälje under nästa år.`,
        questions: [
          { text: '¿Qué ofrecerá el nuevo centro?', options: ['Solo clases de sueco', 'Sueco, ayuda CV y asesoría jurídica', 'Trabajo garantizado', 'Alojamiento y comida'], correct: 1, explanation: 'Undervisning i svenska, CV-hjälp, juridisk rådgivning = clases de sueco, ayuda con CV y asesoría jurídica.' },
          { text: '¿Cuántas personas podrá atender por semana?', options: ['100', '200', '500', 'No se menciona'], correct: 1, explanation: 'Upp till tvåhundra per vecka = hasta doscientas por semana.' },
          { text: '¿Cómo está financiado el proyecto?', options: ['Solo fondos estatales', 'Donaciones privadas', 'Fondos UE e impuestos locales', 'Empresas privadas'], correct: 2, explanation: 'EU-bidrag och lokala skattemedel = fondos de la UE e impuestos locales.' },
          { text: '¿Cuándo está abierto el centro?', options: ['Todos los días', 'Lunes a viernes, 8-17', 'Lunes a sábado, 9-18', 'Fines de semana'], correct: 1, explanation: 'Måndag till fredag klockan åtta till sjutton = lunes a viernes de 8 a 17.' },
          { text: '¿Dónde planean expandir el centro?', options: ['Göteborg y Malmö', 'Botkyrka y Södertälje', 'Uppsala y Västerås', 'Sundsvall y Umeå'], correct: 1, explanation: 'Botkyrka och Södertälje = expandir a Botkyrka y Södertälje.' },
        ]
      },
      {
        id: 'b-l-3',
        title: 'Föräldramötet',
        topic: 'Reunión de padres',
        icon: '🏫',
        duration: '~65s',
        text: `Hej och välkommen till föräldramötet. Jag heter Susanne och är Emilias klasslärare. Tack. Jag heter Rodrigo, jag är Emilias pappa. Kul att du kunde komma. Emilia är en duktig elev. Hon är aktiv på lektionerna och hjälper sina klasskamrater. Det är skönt att höra. Men hemma tycker hon att matematiken är svår. Ja, vi har märkt det. Hon presterar bra i svenska och engelska men behöver stöd i matte. Vi har extra stödundervisning på tisdagar efter skoltid. Är det gratis? Ja, det ingår i skolans verksamhet. Anmäl henne så börjar hon nästa vecka. Bra! Ska jag kontakta dig direkt? Ja, mejla mig eller ring skolan. Tack för informationen!`,
        questions: [
          { text: '¿Cuál es la asignatura más difícil para Emilia?', options: ['Sueco', 'Inglés', 'Matemáticas', 'Ciencias'], correct: 2, explanation: 'Matematiken är svår = las matemáticas son difíciles.' },
          { text: '¿Cuándo son las clases de apoyo?', options: ['Lunes por la mañana', 'Martes después de clases', 'Miércoles al mediodía', 'Jueves'], correct: 1, explanation: 'Tisdagar efter skoltid = los martes después de clase.' },
          { text: '¿Cuánto cuestan las clases de apoyo?', options: ['500 coronas al mes', '200 coronas por sesión', 'Son gratuitas', 'Depende del nivel'], correct: 2, explanation: 'Det ingår i skolans verksamhet = está incluido en la actividad escolar (es gratis).' },
          { text: '¿En qué asignaturas va bien Emilia?', options: ['Matemáticas y ciencias', 'Sueco e inglés', 'Arte y música', 'Historia y geografía'], correct: 1, explanation: 'Presterar bra i svenska och engelska = va bien en sueco e inglés.' },
          { text: '¿Cómo puede contactar Rodrigo a la profesora?', options: ['Solo por teléfono', 'Solo en persona', 'Por email o llamando al colegio', 'Por carta'], correct: 2, explanation: 'Mejla mig eller ring skolan = envía un email o llama al colegio.' },
        ]
      },
      {
        id: 'b-l-4',
        title: 'Bostadssökning',
        topic: 'Búsqueda de apartamento',
        icon: '🏠',
        duration: '~60s',
        text: `Hej, jag ringer om lägenheten ni annonserade om. Ja, hej! Lägenheten är fortfarande ledig. Det är en trea på fyrtiotre kvadratmeter på Södermalm. Hur är hyran? Hyran är tolv tusen kronor i månaden inklusive värme men exklusive el. Vad behöver man ha för att ansöka? Du behöver ha fast anställning eller kunna visa tre månaders hyra i garantier. Vi gör också en kreditkontroll. Är husdjur tillåtna? Nej tyvärr, inga husdjur. Och parkeringsplats? Det finns parkeringsplatser i området men de kostar extra, ungefär trehundra kronor i månaden. När kan man flytta in? Inflyttningsdatum är den första juli. Vi behöver svar senast på fredag.`,
        questions: [
          { text: '¿Cuántas habitaciones tiene el apartamento?', options: ['Una', 'Dos', 'Tres', 'Cuatro'], correct: 2, explanation: 'En trea = un apartamento de tres habitaciones en sueco.' },
          { text: '¿Qué incluye el alquiler?', options: ['Todo incluido', 'Calefacción pero no electricidad', 'Electricidad pero no calefacción', 'Solo el alquiler base'], correct: 1, explanation: 'Inklusive värme men exklusive el = incluye calefacción pero no electricidad.' },
          { text: '¿Están permitidas las mascotas?', options: ['Sí, cualquier mascota', 'Solo perros pequeños', 'No, no están permitidas', 'Solo gatos'], correct: 2, explanation: 'Inga husdjur = no hay mascotas.' },
          { text: '¿Cuándo es la fecha de entrada?', options: ['1 de junio', '1 de julio', '1 de agosto', '15 de julio'], correct: 1, explanation: 'Inflyttningsdatum är den första juli = la fecha de entrada es el primero de julio.' },
          { text: '¿Qué necesita el solicitante?', options: ['Solo una carta de trabajo', 'Empleo fijo o 3 meses de garantía', 'Pasaporte y contrato de trabajo', 'Solo pasar la revisión de crédito'], correct: 1, explanation: 'Fast anställning eller tre månaders hyra i garantier = empleo fijo o tres meses de alquiler en garantías.' },
        ]
      },
    ],

    read: [
      {
        id: 'b-r-1',
        title: 'Integration på arbetsmarknaden',
        tag: 'Sociedad',
        icon: '📊',
        text: `Allt fler nyanlända i Sverige hittar jobb inom ett år efter ankomst, visar en ny rapport från Migrationsverket. Under förra året fick 62 procent av de nyanlända som deltog i etableringsprogrammet ett arbete inom tolv månader. Det är en ökning med åtta procentenheter jämfört med föregående år.\n\nEn av framgångsfaktorerna är det förstärkta samarbetet mellan Arbetsförmedlingen och kommunerna. Kommunerna ansvarar för den initiala mottagningen, medan Arbetsförmedlingen fokuserar på jobbsökning.\n\nKritiker menar dock att kvaliteten på SFI-undervisningen varierar kraftigt mellan kommunerna. En studie från Skolverket visar att elever i storstäderna avklarar SFI snabbare än elever i mindre kommuner.\n\nRegeringen aviserade ytterligare investeringar i yrkessvenska och arbetsplatsförlagd utbildning.`,
        questions: [
          { text: '¿Qué porcentaje de recién llegados encontró trabajo en un año?', options: ['52%', '70%', '62%', '80%'], correct: 2, explanation: '62 procent av de nyanlända = el 62% de los recién llegados.' },
          { text: '¿Cuál es uno de los factores de éxito?', options: ['Más ayudas sociales', 'Colaboración entre Arbetsförmedlingen y municipios', 'Más plazas en SFI', 'Mejor vivienda'], correct: 1, explanation: 'Förstärkt samarbete mellan Arbetsförmedlingen och kommunerna = mayor colaboración entre la Arbetsförmedlingen y los municipios.' },
          { text: '¿Qué crítica se menciona?', options: ['Pocos profesores', 'La calidad de SFI varía mucho por municipio', 'Programas demasiado cortos', 'Los inmigrantes no quieren trabajar'], correct: 1, explanation: 'Kvaliteten på SFI-undervisningen varierar kraftigt = la calidad de SFI varía mucho.' },
          { text: '¿Qué anuncia el gobierno?', options: ['Reducción de plazas SFI', 'Más inversión en sueco laboral y formación en empresa', 'Cierre de oficinas de empleo', 'Nuevas leyes de inmigración'], correct: 1, explanation: 'Investeringar i yrkessvenska och arbetsplatsförlagd utbildning = inversiones en sueco laboral y formación en empresa.' },
          { text: '¿Comparado con el año anterior, cómo ha cambiado el porcentaje?', options: ['Ha bajado 8 puntos', 'Ha subido 8 puntos', 'Se mantiene igual', 'Ha subido 20 puntos'], correct: 1, explanation: 'Ökning med åtta procentenheter = aumento de ocho puntos porcentuales.' },
        ]
      },
      {
        id: 'b-r-2',
        title: 'Brev från hyresvärden',
        tag: 'Vivienda formal',
        icon: '✉️',
        text: `Göteborg, den 15 maj 2025\n\nTill: Ricardo Méndez, Linnégatan 47\nFrån: Stadshem Fastighets AB\n\nKäre hyresgäst,\n\nVi skriver för att informera dig om att din lägenhet kommer att genomgå en obligatorisk besiktning den 3 juni klockan 10.00–12.00. Under besiktningen kontrolleras el, vatten, ventilation och brandskydd.\n\nVi ber dig vara hemma under angiven tid eller kontakta oss senast den 28 maj om du behöver boka om. Besiktningen är lagstadgad och kan inte skjutas upp mer än en gång.\n\nOm du har husdjur ber vi dig se till att de är säkrade under besöket.\n\nVid frågor, ring oss på 031-556 77 88 eller mejla info@stadshem.se.\n\nMed vänliga hälsningar,\nAnna Bergström, Förvaltare`,
        questions: [
          { text: '¿Cuándo es la inspección?', options: ['El 15 de mayo', 'El 3 de junio', 'El 28 de mayo', 'El 1 de julio'], correct: 1, explanation: 'Den 3 juni klockan 10-12 = el 3 de junio de 10 a 12.' },
          { text: '¿Qué se inspecciona?', options: ['Solo el sistema eléctrico', 'Electricidad, agua, ventilación y protección contra incendios', 'Solo las ventanas', 'El mobiliario'], correct: 1, explanation: 'El, vatten, ventilation och brandskydd = electricidad, agua, ventilación y protección contra incendios.' },
          { text: '¿Cuándo hay que avisar si no se puede estar en casa?', options: ['Antes del 1 de junio', 'Antes del 28 de mayo', 'Antes del 10 de mayo', 'No hay plazo'], correct: 1, explanation: 'Kontakta oss senast den 28 maj = contactad antes del 28 de mayo.' },
          { text: '¿Cuántas veces se puede posponer la inspección?', options: ['Indefinidamente', 'Dos veces', 'Una vez', 'No se puede posponer'], correct: 2, explanation: 'Kan inte skjutas upp mer än en gång = no puede posponerse más de una vez.' },
          { text: '¿Qué dice la carta sobre las mascotas?', options: ['No se permiten mascotas en el edificio', 'Deben estar aseguradas durante la visita', 'Hay que llevarlas al veterinario', 'No se menciona'], correct: 1, explanation: 'Se till att de är säkrade = asegúrate de que estén aseguradas durante la visita.' },
        ]
      },
      {
        id: 'b-r-3',
        title: 'Ansök om a-kassa',
        tag: 'Trámites',
        icon: '📋',
        text: `A-kassan är en ekonomisk ersättning som du kan få om du förlorar ditt jobb. För att ha rätt till a-kassa behöver du uppfylla ett arbetsvillkor: du måste ha arbetat minst 80 timmar per månad i minst sex månader under de senaste tolv månaderna.\n\nDu måste också vara medlem i en a-kassa. Det finns flera a-kassor i Sverige och de är kopplade till olika branscher. Handels a-kassa är för de som jobbar inom handel och Unionen är för tjänstemän.\n\nErsättningen är 80 procent av din tidigare lön, men max 1 200 kronor per dag. Ersättningen betalas ut i 300 dagar.\n\nFör att ansöka: registrera dig som arbetssökande hos Arbetsförmedlingen och ansök sedan hos din a-kassa. Du kan göra allt digitalt med BankID.`,
        questions: [
          { text: '¿Cuántas horas mínimo hay que trabajar al mes?', options: ['40 horas', '60 horas', '80 horas', '100 horas'], correct: 2, explanation: 'Minst 80 timmar per månad = mínimo 80 horas al mes.' },
          { text: '¿Cuánto tiempo mínimo hay que haber sido miembro de la a-kassa?', options: ['3 meses', '6 meses', '1 año', '2 años'], correct: 1, explanation: 'Minst sex månader = mínimo seis meses.' },
          { text: '¿Qué porcentaje del salario anterior se recibe?', options: ['60%', '70%', '80%', '100%'], correct: 2, explanation: '80 procent av din tidigare lön = 80% de tu salario anterior.' },
          { text: '¿Cuántos días se recibe la prestación?', options: ['180 días', '200 días', '250 días', '300 días'], correct: 3, explanation: 'Ersättningen betalas ut i 300 dagar = la prestación se paga durante 300 días.' },
          { text: '¿Cómo se puede solicitar la a-kassa?', options: ['Solo en persona', 'Por carta', 'Digitalmente con BankID', 'Por teléfono'], correct: 2, explanation: 'Du kan göra allt digitalt med BankID = puedes hacerlo todo digitalmente con BankID.' },
        ]
      },
      {
        id: 'b-r-4',
        title: 'Klimatförändringar i Sverige',
        tag: 'Medioambiente',
        icon: '🌿',
        text: `Sverige är ett av de länder som tar klimatfrågan på störst allvar. Riksdagen har beslutat att Sverige ska vara klimatneutralt år 2045. Det innebär att utsläppen av växthusgaser ska vara noll och att landet aktivt bidrar till att minska koldioxid i atmosfären.\n\nEn viktig del av klimatarbetet är övergången till förnybar energi. Sverige producerar redan mer än hälften av sin el från vattenkraft och vindkraft. Kärnkraft bidrar med ytterligare en tredjedel.\n\nI vardagslivet uppmanas svenska befolkningen att resa kollektivt, äta mindre kött och sortera sitt avfall noggrant. Källsortering är obligatoriskt i Sverige och kommunerna ansvarar för att samla in och återvinna material.\n\nTrots framstegen kvarstår utmaningar inom transportsektorn, som fortfarande är beroende av fossila bränslen.`,
        questions: [
          { text: '¿Para qué año quiere Suecia ser climaticamente neutral?', options: ['2030', '2040', '2045', '2050'], correct: 2, explanation: 'Sverige ska vara klimatneutralt år 2045 = Suecia quiere ser climáticamente neutra en 2045.' },
          { text: '¿Qué tipo de energía produce Suecia principalmente?', options: ['Solar y eólica', 'Hidráulica y eólica', 'Nuclear y carbón', 'Gas y solar'], correct: 1, explanation: 'Vattenkraft och vindkraft = energía hidráulica y eólica.' },
          { text: '¿Qué se pide a la población sueca en la vida cotidiana?', options: ['Comprar coches eléctricos', 'Usar transporte público, comer menos carne y reciclar', 'Instalar paneles solares', 'No volar al extranjero'], correct: 1, explanation: 'Resa kollektivt, äta mindre kött och sortera sitt avfall = viajar en transporte público, comer menos carne y separar la basura.' },
          { text: '¿Qué sector sigue siendo un desafío?', options: ['La industria pesada', 'El sector agrícola', 'El transporte', 'La construcción'], correct: 2, explanation: 'Transportsektorn kvarstår som utmaning = el sector del transporte sigue siendo un desafío.' },
          { text: '¿Qué porcentaje aproximado de la electricidad produce la energía nuclear?', options: ['10%', '20%', 'Un tercio (33%)', 'Más de la mitad'], correct: 2, explanation: 'Kärnkraft bidrar med ytterligare en tredjedel = la energía nuclear contribuye con otro tercio.' },
        ]
      },
    ],

    write: [
      {
        id: 'b-w-1',
        title: 'Skriv ett formellt klagomålsbrev',
        icon: '📨',
        words: '80–120 ord',
        prompt: 'Has vivido en tu apartamento durante dos años. Hace tres semanas que la calefacción no funciona. Ya has llamado al casero dos veces sin respuesta.\n\nEscribe una carta formal al casero (hyresvärden) en sueco.\n\nEn tu carta debes:\n• Explicar el problema y desde cuándo\n• Mencionar que ya te has puesto en contacto antes\n• Pedir que se solucione urgentemente\n• Indicar que contactarás a Hyresnämnden si no se resuelve',
        checklist: ['Encabezado formal: [Ciudad], den [fecha]', 'Saludo: Käre hyresvärd,', 'Explica el problema con fecha', 'Menciona los contactos anteriores', 'Da un plazo: inom sju dagar', 'Cierre: Med vänliga hälsningar,'],
        example: 'Stockholm, den 28 juni 2025\n\nKäre hyresvärd,\n\nJag skriver för att informera dig om ett allvarligt problem med uppvärmningen i min lägenhet på Björnvägen 14. Sedan den 5 juni fungerar inte värmen ordentligt och temperaturen inomhus understiger tio grader.\n\nJag har redan försökt kontakta dig per telefon den 10 och 17 juni men har inte fått något svar.\n\nJag ber dig att snarast möjligt skicka en reparatör. Om problemet inte är löst inom sju dagar kommer jag att kontakta Hyresnämnden för vidare åtgärder.\n\nMed vänliga hälsningar,\nSofía González',
        criteria: ['Registro formal apropiado', 'Menciona todas las tareas requeridas', 'Usa conectores: dessutom, dock, trots det', 'Gramática: perfekt och konditionalis', 'Cohesión y coherencia del texto']
      },
      {
        id: 'b-w-2',
        title: 'Argumenterande text',
        icon: '🖊️',
        words: '80–100 ord',
        prompt: 'Muchas personas creen que aprender el idioma del país de acogida es la clave para integrarse. ¿Estás de acuerdo?\n\nEscribe un texto de opinión en sueco con argumentos.\n\nTu texto debe:\n• Presentar tu opinión claramente\n• Dar al menos dos argumentos\n• Mencionar un posible contraargumento\n• Concluir con tu posición final',
        checklist: ['Jag anser att...', 'Å ena sidan... / Å andra sidan...', 'Dessutom...', 'Dock bör man komma ihåg att...', 'Sammanfattningsvis...'],
        example: 'Jag anser att det är mycket viktigt att lära sig landets språk för att integreras väl. Å ena sidan gör språket att man kan kommunicera med myndigheter, hitta arbete och skapa vänskaper. Dessutom visar det ett engagemang för det nya landet.\n\nÅ andra sidan bör man komma ihåg att integration är en komplex process. Vissa äldre personer kan ha svårare att lära sig ett nytt språk trots stor vilja.\n\nSammanfattningsvis anser jag att språket är det viktigaste verktyget för integration, men att samhället också behöver stödja inlärningsprocessen.',
        criteria: ['Presenta una opinión clara', 'Argumentos bien desarrollados', 'Usa conectores de discurso', 'Menciona un contraargumento', 'Conclusión coherente', 'Vocabulario nivel B: etablera, engagemang, komplex']
      },
      {
        id: 'b-w-3',
        title: 'Rapport från praktikplatsen',
        icon: '📝',
        words: '80–100 ord',
        prompt: 'Has hecho una semana de prácticas (praktik) en una empresa sueca. Tu profesor de SFI te pide que escribas un informe corto.\n\nDescribe:\n• Dónde hiciste las prácticas y qué hace la empresa\n• Qué hiciste durante la semana\n• Qué aprendiste sobre el entorno laboral sueco\n• Cómo fue comunicarte en sueco',
        checklist: ['Usa tiempos pasados: preteritum y perfekt', 'Describe actividades concretas', 'Reflexión sobre el aprendizaje', 'Usa vocabulario laboral: arbetsplats, kolleger, arbetsuppgifter'],
        example: 'Jag gjorde min praktik på ett litet IT-företag i Kista som heter TechNord AB. Företaget utvecklar appar för smartphones.\n\nUnder veckan hjälpte jag till med kundservice och administration. Jag svarade på mejl och deltog i ett teammöte på tisdagen.\n\nJag lärde mig mycket om den svenska arbetsplatskulturen. Det var informellt och alla pratade med varandra på ett respektfullt men avslappnat sätt. Att kommunicera på svenska var svårt i början men jag förstod det mesta och mina kolleger var tålmodiga.',
        criteria: ['Uso correcto de pretérito perfecto', 'Vocabulario laboral adecuado', 'Estructura clara: inicio, desarrollo, reflexión', 'Honestidad y naturalidad en la expresión', 'Frases complejas con bisatser']
      },
    ],

    speak: [
      {
        id: 'b-s-1',
        title: 'Förhandling på jobbet',
        icon: '🤝',
        context: 'Reunión de trabajo: proponer una solución',
        cardA: 'Trabajas en un almacén. Los turnos de noche son muy largos (10 horas) y el equipo está agotado. Quieres proponer turnos más cortos o rotación.\n\nDebes:\n• Explicar el problema con argumentos\n• Proponer una solución concreta\n• Escuchar las objeciones del jefe\n• Llegar a un acuerdo',
        cardB: 'Eres el jefe de equipo. El empleado quiere hablar sobre los turnos nocturnos.\n\nDebes:\n• Escuchar el problema\n• Presentar las limitaciones de la empresa (costes, producción)\n• Hacer preguntas para entender mejor\n• Buscar una solución viable juntos',
        teacherQuestions: ['Vad är problemet med arbetstiderna? (¿Cuál es el problema con los horarios?)', 'Har du pratat med dina kolleger om detta? (¿Has hablado con tus compañeros?)', 'Vilken lösning föreslår du? (¿Qué solución propones?)', 'Vad är viktigast för dig på jobbet? (¿Qué es lo más importante para ti en el trabajo?)', 'Hur kan vi lösa detta tillsammans? (¿Cómo podemos resolverlo juntos?)'],
        phrases: ['Jag förstår ditt perspektiv, men...', 'Det finns ett alternativ...', 'Vad tycker du om att...?', 'Vi skulle kunna...', 'Jag håller med om att...', 'Det viktigaste är att...']
      },
      {
        id: 'b-s-2',
        title: 'Debatt: Svenska som krav för medborgarskap',
        icon: '🗳️',
        context: 'Debate de opinión en clase',
        cardA: 'Argumenta A FAVOR de que el sueco sea obligatorio para obtener la ciudadanía.\n\nArgumentos posibles:\n• Facilita la integración laboral\n• Permite comunicarse con autoridades\n• Muestra compromiso con el país\n• Ayuda a entender la cultura sueca',
        cardB: 'Argumenta EN CONTRA de que el sueco sea obligatorio.\n\nArgumentos posibles:\n• La ciudadanía es un derecho, no un privilegio\n• Discrimina a personas mayores o con dificultades\n• El idioma no garantiza integración\n• Hay muchas formas de contribuir al país',
        teacherQuestions: ['Vad anser du om detta krav? (¿Qué opinas de este requisito?)', 'Kan du ge ett exempel? (¿Puedes dar un ejemplo?)', 'Hur svarar du på motståndarens argument? (¿Cómo respondes al argumento contrario?)', 'Finns det bättre alternativ? (¿Hay mejores alternativas?)', 'Vad är ditt slutliga ställningstagande? (¿Cuál es tu posición final?)'],
        phrases: ['Jag anser att...', 'Å ena sidan...', 'Å andra sidan...', 'Det stämmer att..., men...', 'Jag håller inte med om att...', 'Dessutom bör man tänka på att...']
      },
      {
        id: 'b-s-3',
        title: 'Söka bostad',
        icon: '🏘️',
        context: 'Llamada para alquilar un apartamento',
        cardA: 'Quieres alquilar un apartamento. Has visto un anuncio de un apartamento de 2 habitaciones en Södermalm por 11.000 coronas al mes.\n\nDebes preguntar sobre:\n• Qué está incluido en el alquiler\n• Si se permiten mascotas (tienes un gato)\n• La fecha de disponibilidad\n• Qué documentos necesitas',
        cardB: 'Eres el propietario del apartamento. El apartamento es moderno, en 3er piso con ascensor.\n\nInformación:\n• Incluye calefacción, excluye electricidad\n• No se permiten mascotas\n• Disponible desde el 1 de agosto\n• Necesita: empleado fijo o garantes, control de crédito',
        teacherQuestions: ['Vad är viktigast när du söker bostad? (¿Qué es más importante cuando buscas piso?)', 'Hur länge har du letat? (¿Cuánto tiempo llevas buscando?)', 'Vad kostar bostäder i din stad? (¿Qué cuestan los pisos en tu ciudad?)', 'Finns det skillnader med bostadsmarknaden i ditt hemland? (¿Hay diferencias con el mercado de vivienda en tu país?)', 'Vad skulle vara din drömbostad? (¿Cuál sería tu vivienda ideal?)'],
        phrases: ['Jag ringer angående lägenheten...', 'Är det möjligt att...?', 'Vad ingår i hyran?', 'Tyvärr har jag ett husdjur...', 'Vilka dokument behöver jag?', 'Det låter bra, kan jag boka en visning?']
      },
      {
        id: 'b-s-4',
        title: 'Hälsa och livsstil',
        icon: '💪',
        context: 'Conversación sobre salud y hábitos de vida',
        cardA: 'Habla con tu compañero sobre tu estilo de vida y salud.\n\nDescribe:\n• Tus hábitos de ejercicio y alimentación\n• Cómo es el sistema de salud en tu país de origen vs Suecia\n• Una experiencia que hayas tenido con el sistema médico sueco\n• Qué aspectos del sistema sueco te parecen mejor o peor',
        cardB: 'Escucha a tu compañero y participa en la conversación.\n\nHaz preguntas como:\n• ¿Cómo funciona el sistema en tu país?\n• ¿Fue fácil entender el sistema sueco?\n• ¿Has tenido alguna dificultad?\n• ¿Qué cambiarías del sistema sueco?',
        teacherQuestions: ['Hur mår du vanligtvis? (¿Cómo te encuentras habitualmente?)', 'Vad gör du för att hålla dig frisk? (¿Qué haces para mantenerte sano?)', 'Har du använt vården i Sverige? (¿Has usado el sistema sanitario en Suecia?)', 'Vad är skillnaden med hälsovården i ditt hemland? (¿Cuál es la diferencia con la sanidad de tu país?)', 'Vad tycker du om 1177? (¿Qué opinas del servicio 1177?)'],
        phrases: ['Jag brukar...', 'Jag har märkt att...', 'I mitt hemland är det annorlunda...', 'Det som förvånade mig var...', 'Jag tycker att...', 'Jämfört med...']
      },
    ],

    test: [
      { category: 'Gramática', text: 'Formen i passiv: "De säljer bröd i butiken." → Passiv:', options: ['Bröd sälja i butiken.', 'Bröd säljs i butiken.', 'Bröd är säljas i butiken.', 'Bröd säljas i butiken.'], correct: 1, explanation: 'Passiv med -s: säljer → säljs. Verbo + s = forma pasiva en sueco.' },
      { category: 'Gramática', text: 'Perfekt korrekt: Jag _____ (bo) i Sverige i tre år.', options: ['bodde', 'bor', 'har bott', 'hade bott'], correct: 2, explanation: 'Perfekt para duración hasta hoy: har + supinum. bo → bott → har bott.' },
      { category: 'Gramática', text: 'Bisats med negation: "Jag vet att han _____ idag."', options: ['arbetar inte', 'inte arbetar', 'arbetar inga', 'ingen arbetar'], correct: 1, explanation: 'En bisatser, inte va ANTES del verbo: att han INTE arbetar.' },
      { category: 'Vocabulario', text: '¿Qué significa "arbetsgivare"?', options: ['Empleado', 'Empresario / empleador', 'Sindicato', 'Convenio colectivo'], correct: 1, explanation: 'Arbetsgivare = el que da trabajo = empleador. Arbetstagare = trabajador.' },
      { category: 'Gramática', text: 'Adjektivo correcto: "Jag bor i ett _____ hus."', options: ['stort', 'stor', 'stora', 'store'], correct: 0, explanation: 'Hus es neutrum (ett-ord). Adjetivo + t para neutrum: stor → stort.' },
      { category: 'Comprensión', text: '"Trots att hon är trött, arbetar hon ändå." ¿Qué nos dice sobre ella?', options: ['Trabaja porque no está cansada', 'No trabaja porque está cansada', 'Trabaja aunque está cansada', 'Descansa porque está cansada'], correct: 2, explanation: 'Trots att = aunque (concesiva). Trabaja AUNQUE está cansada.' },
      { category: 'Gramática', text: 'Konditionalis correcto: "Om jag _____ mer tid, _____ jag studera mer."', options: ['har / ska', 'hade / skulle', 'ha / ska', 'haft / skulle'], correct: 1, explanation: 'Konditionalis: Om + preteritum + skulle + infinitiv: hade / skulle.' },
      { category: 'Vocabulario', text: '¿Qué es "föräldraledighet"?', options: ['Permiso de enfermedad', 'Permiso de maternidad/paternidad', 'Vacaciones de verano', 'Baja voluntaria'], correct: 1, explanation: 'Föräldra = padres, ledighet = permiso/libre. = permiso parental.' },
      { category: 'Gramática', text: 'Rätt konjunktion: "Han fick inte jobbet _____ han saknade erfarenhet."', options: ['trots att', 'när', 'eftersom', 'om'], correct: 2, explanation: 'Eftersom = porque (causal). No consiguió el trabajo PORQUE le faltaba experiencia.' },
      { category: 'Comprensión', text: '"Ansökan behandlas inom tre veckor." ¿Qué significa?', options: ['La solicitud se envía en tres semanas', 'La solicitud se procesa en tres semanas', 'La solicitud caduca en tres semanas', 'Tardas tres semanas en rellenarla'], correct: 1, explanation: 'Behandlas = se trata/procesa. Ansökan = solicitud. La solicitud SE PROCESA en tres semanas.' },
      { category: 'Vocabulario', text: '¿Qué significa "tillgänglig"?', options: ['Cansado', 'Ausente', 'Disponible', 'Ocupado'], correct: 2, explanation: 'Tillgänglig = disponible. Sinónimo: ledig (en este contexto).' },
      { category: 'Gramática', text: 'Passiv med "bli": "Skolan _____ byggd år 2000."', options: ['var', 'blev', 'är', 'hade'], correct: 1, explanation: 'Passiv med bli i preteritum: skolan BLEV byggd = la escuela FUE construida.' },
    ]
  },

  // ── SFI C y D (placeholder) ─────────────────────────────
  C: { listen: [], read: [], write: [], speak: [], test: [] },
  D: { listen: [], read: [], write: [], speak: [], test: [] },
};

// Load data (merge with localStorage)
function loadData() {
  const saved = localStorage.getItem('scs_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Deep merge: saved overrides default
      for (const level of ['A','B','C','D']) {
        if (parsed[level]) {
          for (const mode of ['listen','read','write','speak','test']) {
            if (parsed[level][mode] && parsed[level][mode].length > 0) {
              DEFAULT_DATA[level][mode] = [...DEFAULT_DATA[level][mode], ...parsed[level][mode]];
            }
          }
        }
      }
    } catch(e) {}
  }
  return DEFAULT_DATA;
}

const DB = loadData();

function saveCustomContent(level, mode, item) {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('scs_data') || '{}'); } catch(e) {}
  if (!saved[level]) saved[level] = { listen:[], read:[], write:[], speak:[], test:[] };
  if (!saved[level][mode]) saved[level][mode] = [];
  saved[level][mode].push(item);
  localStorage.setItem('scs_data', JSON.stringify(saved));
  // Also add to live DB
  if (!DB[level]) DB[level] = { listen:[], read:[], write:[], speak:[], test:[] };
  DB[level][mode].push(item);
}

// ═══════════════════════════════════════════════════════════
//  GRAMMAR DATA — 12 temas con 15 preguntas cada uno
// ═══════════════════════════════════════════════════════════
const GRAMMAR_DATA = {
  topics: [
    // ─────────────────────────────────────────────────────
    // 1. PRONOMBRES PERSONALES (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'pronombres-personales',
      title: 'Pronombres personales',
      subtitle: 'jag, du, han, hon… quién hace la acción',
      icon: '🧍',
      color: '#7C3AED',
      level: 'A',
      keywords: 'pronombres personales jag du han hon vi ni de mig dig pronomen yo tu el ella nosotros',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Yo» → ___', options: ['jag', 'du', 'han'], correct: 0, explanation: '«jag» = yo.' },
        { type: 'mc', text: '«Ella» → ___', options: ['hon', 'han', 'den'], correct: 0, explanation: '«hon» = ella. Ojo: «han» = él.' },
        { type: 'mc', text: '«Él» → ___', options: ['han', 'hon', 'de'], correct: 0, explanation: '«han» = él.' },
        { type: 'mc', text: '«Nosotros» → ___', options: ['vi', 'ni', 'de'], correct: 0, explanation: '«vi» = nosotros/as.' },
        { type: 'mc', text: '«Ellos / ellas» → ___', options: ['de', 'vi', 'ni'], correct: 0, explanation: '«de» = ellos/ellas. Se pronuncia «dom».' },
        { type: 'mc', text: '«Ustedes» → ___', options: ['ni', 'vi', 'de'], correct: 0, explanation: '«ni» = ustedes / vosotros.' },
        { type: 'mc', text: '«___ heter Anna»  (Ella se llama Anna)', options: ['Hon', 'Han', 'Den'], correct: 0, explanation: '«Hon heter Anna». hon = ella.' },
        { type: 'mc', text: '«bil» es «en bil». «Es rojo» → «___ är röd»', options: ['Den', 'Det', 'Han'], correct: 0, explanation: '«Den» se usa para palabras con «en» (en bil). «Det» para las de «ett».' },
        { type: 'mc', text: '«hus» es «ett hus». «Es grande» → «___ är stort»', options: ['Det', 'Den', 'Han'], correct: 0, explanation: '«Det» para palabras con «ett» (ett hus). «Den» para las de «en».' },
        { type: 'mc', text: '«Ella me ve» → «Hon ser ___»', options: ['mig', 'jag', 'dig'], correct: 0, explanation: '«mig» = me / a mí. «jag» solo se usa como sujeto (yo).' },
        { type: 'mc', text: '«Yo te veo» → «Jag ser ___»', options: ['dig', 'du', 'mig'], correct: 0, explanation: '«dig» = te / a ti. «du» solo como sujeto (tú).' },
        { type: 'mc', text: '«Nosotros los vemos (a ellos)» → «Vi ser ___»', options: ['dem', 'de', 'oss'], correct: 0, explanation: '«dem» = los / a ellos (se dice «dom»). «de» es solo sujeto.' },
        { type: 'type', prompt: '«yo» en sueco:', answer: 'jag', accept: [], explanation: '«jag» = yo.' },
        { type: 'type', prompt: '«ella» en sueco:', answer: 'hon', accept: [], explanation: '«hon» = ella.' },
        { type: 'type', prompt: '«nosotros» en sueco:', answer: 'vi', accept: [], explanation: '«vi» = nosotros.' },
        { type: 'type', prompt: 'Traduce «ellos»:', answer: 'de', accept: ['dom'], explanation: '«de» = ellos (se dice «dom»).' },
        { type: 'type', prompt: '«a mí / me» (objeto):', answer: 'mig', accept: [], explanation: '«mig» = me / a mí.' },
        { type: 'order', prompt: 'Ordena: «Yo me llamo Erik»', words: ['Jag', 'heter', 'Erik'], answer: ['Jag', 'heter', 'Erik'], explanation: '«Jag heter Erik».' },
        { type: 'order', prompt: 'Ordena: «Ella es de Suecia»', words: ['Hon', 'är', 'från', 'Sverige'], answer: ['Hon', 'är', 'från', 'Sverige'], explanation: '«Hon är från Sverige».' },
        { type: 'order', prompt: 'Ordena: «Nosotros hablamos español»', words: ['Vi', 'talar', 'spanska'], answer: ['Vi', 'talar', 'spanska'], explanation: '«Vi talar spanska».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 2. ARTÍCULOS EN/ETT (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'articulos',
      title: 'En o Ett (un / una)',
      subtitle: '¿en bil o ett hus? Aprende cuál va con cada palabra',
      icon: '📝',
      color: '#10B981',
      level: 'A',
      keywords: 'en ett un una el la genero sustantivo substantivo articulo noun gender substantiv genus utrum neutrum',
      sessionSize: 20,
      questions: [
        { text: '¿en o ett?   ___ bok   (un libro)', options: ['en','ett'], correct: 0, explanation: 'en bok = un libro. Para decir «el libro»: boken. 8 de cada 10 palabras usan «en», así que si dudas, empieza por «en». 😊' },
        { text: '¿en o ett?   ___ hus   (una casa)', options: ['en','ett'], correct: 1, explanation: 'ett hus = una casa. Para decir «la casa»: huset. Termina en -et, y ese final es señal de «ett».' },
        { text: '¿en o ett?   ___ tidning   (un periódico)', options: ['en','ett'], correct: 0, explanation: 'en tidning = un periódico. «El periódico»: tidningen. 🎯 Truco de oro: si termina en -ning o -ing, SIEMPRE es «en». ¡Nunca falla!' },
        { text: '¿en o ett?   ___ bord   (una mesa)', options: ['en','ett'], correct: 1, explanation: 'ett bord = una mesa. «La mesa»: bordet. Esta se aprende de memoria (no tiene truco).' },
        { text: '¿en o ett?   ___ katt   (un gato)', options: ['en','ett'], correct: 0, explanation: 'en katt = un gato. Los animales y las personas casi siempre usan «en» (en hund, en man). Pero cuidado con las que engañan.' },
        { text: '¿en o ett?   ___ barn   (un niño)', options: ['en','ett'], correct: 1, explanation: 'ett barn = un niño. ⚠️ ¡Esta engaña! Las personas casi siempre usan «en», pero barn usa «ett». Otras tramposas: ett djur (animal), ett lejon (león).' },
        { text: '¿en o ett?   ___ möjlighet   (una posibilidad)', options: ['en','ett'], correct: 0, explanation: 'en möjlighet = una posibilidad. 🎯 Truco: si termina en -het, SIEMPRE es «en» (en nyhet = una noticia, en frihet = una libertad).' },
        { text: '¿en o ett?   ___ äpple   (una manzana)', options: ['en','ett'], correct: 1, explanation: 'ett äpple = una manzana. «La manzana»: äpplet. De memoria — pero fíjate: termina en -et, señal de «ett».' },
        { text: '¿en o ett?   ___ station   (una estación)', options: ['en','ett'], correct: 0, explanation: 'en station = una estación. 🎯 Truco: las palabras que terminan en -tion usan «en» (en information, en nation). ¡Y se parecen al español!' },
        { text: '¿en o ett?   ___ museum   (un museo)', options: ['en','ett'], correct: 1, explanation: 'ett museum = un museo. 🎯 Truco: las palabras que terminan en -um usan «ett» (ett centrum = un centro, ett datum = una fecha).' },
        { text: '¿en o ett?   ___ bil   (un coche)', options: ['en','ett'], correct: 0, explanation: 'en bil = un coche. «El coche»: bilen. De memoria — pero recuerda, la mayoría usan «en».' },
        { text: '¿en o ett?   ___ vatten   (agua)', options: ['en','ett'], correct: 1, explanation: 'ett vatten = un agua. «El agua»: vattnet. Muchas cosas que se beben o materiales usan «ett» (ett kaffe = un café).' },
        { text: '¿en o ett?   ___ gata   (una calle)', options: ['en','ett'], correct: 0, explanation: 'en gata = una calle. 🎯 Truco: casi todas las palabras que terminan en -a usan «en» (en flicka, en lampa). Solo 3 engañan.' },
        { text: '¿en o ett?   ___ öga   (un ojo)', options: ['en','ett'], correct: 1, explanation: 'ett öga = un ojo. ⚠️ Termina en -a pero usa «ett» (¡engaña!). Solo son 3 y son del cuerpo: ett öga (ojo), ett öra (oído), ett hjärta (corazón).' },
        { text: '¿en o ett?   ___ bibliotek   (una biblioteca)', options: ['en','ett'], correct: 1, explanation: 'ett bibliotek = una biblioteca. 🎯 Truco: las palabras que terminan en -tek usan «ett» (ett apotek = una farmacia). ¡En español es «la», pero en sueco es «ett»!' },
        { text: '¿en o ett?   ___ hund   (un perro)', options: ['en','ett'], correct: 0, explanation: 'en hund = un perro. Los animales casi siempre usan «en» (en katt, en häst = un caballo). Recuerda la trampa: ett djur (animal) usa «ett».' },
        { text: '¿en o ett?   ___ jobb   (un trabajo)', options: ['en','ett'], correct: 1, explanation: 'ett jobb = un trabajo. «El trabajo»: jobbet. Se aprende de memoria.' },
        { text: '¿en o ett?   ___ program   (un programa)', options: ['en','ett'], correct: 1, explanation: 'ett program = un programa. 🎯 Truco: las palabras que terminan en -gram usan «ett» (ett kilogram = un kilo, ett diagram).' },
        { text: '¿en o ett?   ___ kvinna   (una mujer)', options: ['en','ett'], correct: 0, explanation: 'en kvinna = una mujer. Las personas usan «en» (en man = un hombre). Y además termina en -a, que también pide «en». ¡Doble pista!' },
        { text: '¿en o ett?   ___ år   (un año)', options: ['en','ett'], correct: 1, explanation: 'ett år = un año. «El año»: året. Se aprende de memoria.' },
        { text: '¿en o ett?   ___ stol   (una silla)', options: ['en','ett'], correct: 0, explanation: 'en stol = una silla. «La silla»: stolen. La mayoría de las palabras usan «en».' },
        { text: '¿en o ett?   ___ rum   (una habitación)', options: ['en','ett'], correct: 1, explanation: 'ett rum = una habitación. «La habitación»: rummet. De memoria.' },
        { text: '¿en o ett?   ___ dörr   (una puerta)', options: ['en','ett'], correct: 0, explanation: 'en dörr = una puerta. «La puerta»: dörren.' },
        { text: '¿en o ett?   ___ kök   (una cocina)', options: ['en','ett'], correct: 1, explanation: 'ett kök = una cocina. «La cocina»: köket.' },
        { text: '¿en o ett?   ___ skola   (una escuela)', options: ['en','ett'], correct: 0, explanation: 'en skola = una escuela. «La escuela»: skolan. 🎯 Termina en -a → «en».' },
        { text: '¿en o ett?   ___ brev   (una carta)', options: ['en','ett'], correct: 1, explanation: 'ett brev = una carta. «La carta»: brevet.' },
        { text: '¿en o ett?   ___ vän   (un amigo)', options: ['en','ett'], correct: 0, explanation: 'en vän = un amigo. «El amigo»: vännen. Las personas usan «en».' },
        { text: '¿en o ett?   ___ ord   (una palabra)', options: ['en','ett'], correct: 1, explanation: 'ett ord = una palabra. «La palabra»: ordet.' },
        { text: '¿en o ett?   ___ stad   (una ciudad)', options: ['en','ett'], correct: 0, explanation: 'en stad = una ciudad. «La ciudad»: staden.' },
        { text: '¿en o ett?   ___ land   (un país)', options: ['en','ett'], correct: 1, explanation: 'ett land = un país. «El país»: landet.' },
        { text: '¿en o ett?   ___ buss   (un autobús)', options: ['en','ett'], correct: 0, explanation: 'en buss = un autobús. «El autobús»: bussen.' },
        { text: '¿en o ett?   ___ träd   (un árbol)', options: ['en','ett'], correct: 1, explanation: 'ett träd = un árbol. «El árbol»: trädet.' },
        { text: '¿en o ett?   ___ telefon   (un teléfono)', options: ['en','ett'], correct: 0, explanation: 'en telefon = un teléfono. «El teléfono»: telefonen.' },
        { text: '¿en o ett?   ___ foto   (una foto)', options: ['en','ett'], correct: 1, explanation: 'ett foto = una foto. «La foto»: fotot.' },
        { text: '¿en o ett?   ___ familj   (una familia)', options: ['en','ett'], correct: 0, explanation: 'en familj = una familia. «La familia»: familjen. Aunque en español «familia» es «la», en sueco usa «en».' },
        { text: '¿en o ett?   ___ problem   (un problema)', options: ['en','ett'], correct: 1, explanation: 'ett problem = un problema. «El problema»: problemet.' },
        { text: '¿en o ett?   ___ dag   (un día)', options: ['en','ett'], correct: 0, explanation: 'en dag = un día. «El día»: dagen.' },
        { text: '¿en o ett?   ___ svar   (una respuesta)', options: ['en','ett'], correct: 1, explanation: 'ett svar = una respuesta. «La respuesta»: svaret.' },
        { text: '¿en o ett?   ___ natt   (una noche)', options: ['en','ett'], correct: 0, explanation: 'en natt = una noche. «La noche»: natten.' },
        { text: '¿en o ett?   ___ glas   (un vaso)', options: ['en','ett'], correct: 1, explanation: 'ett glas = un vaso. «El vaso»: glaset.' },
        { text: '¿en o ett?   ___ fråga   (una pregunta)', options: ['en','ett'], correct: 0, explanation: 'en fråga = una pregunta. «La pregunta»: frågan. 🎯 Termina en -a → «en».' },
        { text: '¿en o ett?   ___ bröd   (un pan)', options: ['en','ett'], correct: 1, explanation: 'ett bröd = un pan. «El pan»: brödet.' },
        { text: '¿en o ett?   ___ vecka   (una semana)', options: ['en','ett'], correct: 0, explanation: 'en vecka = una semana. «La semana»: veckan. 🎯 Termina en -a → «en».' },
        { text: '¿en o ett?   ___ kort   (una tarjeta)', options: ['en','ett'], correct: 1, explanation: 'ett kort = una tarjeta. «La tarjeta»: kortet.' },
        { text: '¿en o ett?   ___ hand   (una mano)', options: ['en','ett'], correct: 0, explanation: 'en hand = una mano. «La mano»: handen. Aunque en español «mano» es «la», en sueco usa «en».' },
        { text: '¿en o ett?   ___ hjärta   (un corazón)', options: ['en','ett'], correct: 1, explanation: 'ett hjärta = un corazón. «El corazón»: hjärtat. ⚠️ Termina en -a pero es «ett» (una de las 3 trampas: öga, öra, hjärta).' },
        { text: '¿en o ett?   ___ frihet   (una libertad)', options: ['en','ett'], correct: 0, explanation: 'en frihet = una libertad. 🎯 Truco: -het → siempre «en».' },
        { text: '¿en o ett?   ___ apotek   (una farmacia)', options: ['en','ett'], correct: 1, explanation: 'ett apotek = una farmacia. 🎯 Truco: -tek → «ett».' },
        { text: '¿en o ett?   ___ lösning   (una solución)', options: ['en','ett'], correct: 0, explanation: 'en lösning = una solución. 🎯 Truco: -ning → siempre «en».' },
        { text: '¿en o ett?   ___ centrum   (un centro)', options: ['en','ett'], correct: 1, explanation: 'ett centrum = un centro. 🎯 Truco: -um → «ett».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 3. VERBOS EN PRESENTE (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'presente',
      title: 'Verbos en presente',
      subtitle: 'Lo que haces ahora y siempre. ¡En sueco es igual para todos!',
      icon: '⚡',
      color: '#006AA7',
      level: 'A',
      keywords: 'presente verbos verb nutid ar er talar bor har ar gora ahora hablar vivir tener ser hacer conjugar',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'Yo hablo sueco.  →  Jag ___ svenska.', options: ['talar', 'tala', 'talade'], correct: 0, explanation: '«talar» = hablo. En sueco el presente termina en -r. Lo mejor: es igual para todos (jag talar, du talar, han talar).' },
        { type: 'mc', text: 'Ella lee un libro.  →  Hon ___ en bok.', options: ['läser', 'läsa', 'las'], correct: 0, explanation: '«läser» = lee. Aunque sea «ella», igual termina en -r, como con «yo». No cambia según la persona.' },
        { type: 'mc', text: 'Nosotros trabajamos.  →  Vi ___.', options: ['jobbar', 'jobba', 'jobbade'], correct: 0, explanation: '«jobbar» = trabajamos. El mismo verbo sirve para todos: jag jobbar, vi jobbar, de jobbar.' },
        { type: 'mc', text: 'Yo soy de Perú.  →  Jag ___ från Peru.', options: ['är', 'har', 'vara'], correct: 0, explanation: '«är» = soy / eres / es. Viene de «vara». Es de las más importantes: siempre «är» para todos.' },
        { type: 'mc', text: 'Tú tienes un perro.  →  Du ___ en hund.', options: ['har', 'är', 'ha'], correct: 0, explanation: '«har» = tengo / tienes / tiene. Viene de «ha». Igual para todos: jag har, du har, vi har.' },
        { type: 'mc', text: 'Él come una manzana.  →  Han ___ ett äpple.', options: ['äter', 'äta', 'åt'], correct: 0, explanation: '«äter» = come. Viene de «äta». Termina en -r, como todos los presentes.' },
        { type: 'mc', text: '¿Cuál está en presente (ahora)?', options: ['talar', 'talade', 'tala'], correct: 0, explanation: '«talar» = habla ahora. «talade» = habló (eso es pasado). «tala» sola es la palabra base, sin -r.' },
        { type: 'mc', text: 'Elige la frase correcta:', options: ['Jag bor i Sverige', 'Jag bo i Sverige', 'Jag bors i Sverige'], correct: 0, explanation: '«Jag bor i Sverige» = Vivo en Suecia. «bor» (con -r) es el presente. «bo» sola es solo la base.' },
        { type: 'mc', text: 'Ustedes escriben.  →  Ni ___.', options: ['skriver', 'skriva', 'skrev'], correct: 0, explanation: '«skriver» = escriben. Viene de «skriva». Se le pone -r para el presente.' },
        { type: 'mc', text: 'Yo hago la comida.  →  Jag ___ maten.', options: ['gör', 'göra', 'gjorde'], correct: 0, explanation: '«gör» = hago / hace. Viene de «göra». Es un poco especial, pero también termina en -r.' },
        { type: 'mc', text: 'Ellos beben café.  →  De ___ kaffe.', options: ['dricker', 'dricka', 'drack'], correct: 0, explanation: '«dricker» = beben. Viene de «dricka».' },
        { type: 'mc', text: 'Yo voy a casa.  →  Jag ___ hem.', options: ['går', 'gå', 'gick'], correct: 0, explanation: '«går» = voy / va. Viene de «gå». Es cortita: gå → går.' },
        { type: 'mc', text: 'Ella compra pan.  →  Hon ___ bröd.', options: ['köper', 'köpa', 'köpte'], correct: 0, explanation: '«köper» = compra. Viene de «köpa».' },
        { type: 'mc', text: 'Nosotros vemos una película.  →  Vi ___ en film.', options: ['ser', 'se', 'såg'], correct: 0, explanation: '«ser» = vemos / ve. Viene de «se». Cortita: se → ser.' },
        { type: 'mc', text: '¿Cuál está bien? (Ella habla)', options: ['Hon talar', 'Hon taler', 'Hon tala'], correct: 0, explanation: '«Hon talar». Los verbos como «tala» hacen el presente con -ar → talar.' },
        { type: 'mc', text: '¿Cómo estás?  →  Hur ___ du?', options: ['mår', 'må', 'mående'], correct: 0, explanation: '«mår» = estás (de salud/ánimo). «Hur mår du?» = ¿Cómo estás? Respondes: «Jag mår bra» = Estoy bien.' },
        { type: 'mc', text: 'Yo abro la puerta.  →  Jag ___ dörren.', options: ['öppnar', 'öppna', 'öppnade'], correct: 0, explanation: '«öppnar» = abro. Viene de «öppna». Termina en -a, entonces hace -ar.' },
        { type: 'mc', text: 'Tú llamas por teléfono.  →  Du ___.', options: ['ringer', 'ringa', 'ringde'], correct: 0, explanation: '«ringer» = llamas. Viene de «ringa».' },
        { type: 'mc', text: '«Jag ___ kaffe varje dag» (todos los días). ¿Qué significa?', options: ['Bebo café todos los días', 'Bebí café ayer', 'Beberé café mañana'], correct: 0, explanation: 'El presente también sirve para lo que haces siempre. «varje dag» = cada día. «dricker» = bebo.' },
        { type: 'mc', text: 'De ___ i Sverige  (Ellos viven en Suecia)', options: ['bor', 'bo', 'bodde'], correct: 0, explanation: '«De bor i Sverige». «bor» sirve para todos, también para «de» (ellos).' },
        { type: 'mc', text: '¿Cuál NO es presente?', options: ['talade', 'talar', 'är'], correct: 0, explanation: '«talade» = habló (pasado). «talar» y «är» sí son presente (ahora).' },
        { type: 'mc', text: 'Yo estoy bien.  →  Jag ___ bra.', options: ['mår', 'är', 'gör'], correct: 0, explanation: '«Jag mår bra» = Estoy bien. Para cómo te sientes se usa «mår», no «är».' },
        { type: 'type', prompt: 'Escribe el presente (ahora) de «tala» (hablar):  jag ___', answer: 'talar', accept: [], explanation: '«talar». Los verbos que terminan en -a normalmente hacen -ar: tala → talar.' },
        { type: 'type', prompt: 'Escribe el presente de «bo» (vivir):  jag ___', answer: 'bor', accept: [], explanation: '«bor». Las cortitas solo suman -r: bo → bor.' },
        { type: 'type', prompt: '«Yo tengo» en sueco:  jag ___', answer: 'har', accept: [], explanation: '«har» = tengo / tienes / tiene. Viene de «ha».' },
        { type: 'type', prompt: '«Ella es» en sueco:  hon ___', answer: 'är', accept: [], explanation: '«är». Viene de «vara». Igual para todas las personas.' },
        { type: 'type', prompt: 'Traduce: «Yo leo»  →  jag ___', answer: 'läser', accept: [], explanation: '«läser». Viene de «läsa».' },
        { type: 'type', prompt: 'Traduce al sueco: «Nosotros comemos»  →  vi ___', answer: 'äter', accept: [], explanation: '«äter». Viene de «äta».' },
        { type: 'type', prompt: 'Completa: «Han ___ kaffe»  (Él bebe café)', answer: 'dricker', accept: [], explanation: '«dricker». Viene de «dricka».' },
        { type: 'type', prompt: '«Yo hago» en sueco:  jag ___', answer: 'gör', accept: [], explanation: '«gör». Viene de «göra».' },
        { type: 'type', prompt: '«Yo voy» en sueco:  jag ___', answer: 'går', accept: [], explanation: '«går». Viene de «gå», cortita: gå → går.' },
        { type: 'type', prompt: 'Completa: «Vi ___ svenska»  (Nosotros estudiamos sueco)', answer: 'läser', accept: [], explanation: '«läser» también sirve para «estudiar» un idioma. «Vi läser svenska».' },
        { type: 'order', prompt: 'Ordena para decir «Yo hablo sueco».', words: ['Jag', 'talar', 'svenska'], answer: ['Jag', 'talar', 'svenska'], explanation: '«Jag talar svenska». El verbo «talar» va en segundo lugar.' },
        { type: 'order', prompt: 'Ordena: «Ella vive en Suecia».', words: ['Hon', 'bor', 'i', 'Sverige'], answer: ['Hon', 'bor', 'i', 'Sverige'], explanation: '«Hon bor i Sverige». «bor» = vive.' },
        { type: 'order', prompt: 'Ordena: «Nosotros bebemos café».', words: ['Vi', 'dricker', 'kaffe'], answer: ['Vi', 'dricker', 'kaffe'], explanation: '«Vi dricker kaffe».' },
        { type: 'order', prompt: 'Ordena: «Yo soy de Chile».', words: ['Jag', 'är', 'från', 'Chile'], answer: ['Jag', 'är', 'från', 'Chile'], explanation: '«Jag är från Chile». «är» = soy.' },
        { type: 'order', prompt: 'Ordena: «Tú tienes un gato».', words: ['Du', 'har', 'en', 'katt'], answer: ['Du', 'har', 'en', 'katt'], explanation: '«Du har en katt». «har» = tienes.' },
        { type: 'order', prompt: 'Ordena: «Él come pan».', words: ['Han', 'äter', 'bröd'], answer: ['Han', 'äter', 'bröd'], explanation: '«Han äter bröd».' },
        { type: 'order', prompt: 'Ordena: «Yo leo un libro».', words: ['Jag', 'läser', 'en', 'bok'], answer: ['Jag', 'läser', 'en', 'bok'], explanation: '«Jag läser en bok».' },
        { type: 'order', prompt: 'Ordena: «Nosotros trabajamos en Estocolmo».', words: ['Vi', 'jobbar', 'i', 'Stockholm'], answer: ['Vi', 'jobbar', 'i', 'Stockholm'], explanation: '«Vi jobbar i Stockholm».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 4. NEGACIÓN (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'negacion',
      title: 'Negación',
      subtitle: 'Decir NO: inte, aldrig, ingen',
      icon: '🚫',
      color: '#EF4444',
      level: 'A',
      keywords: 'negacion inte aldrig ingen inget inga no nunca ningun neka',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«No hablo sueco» → «Jag talar ___ svenska»', options: ['inte', 'ingen', 'aldrig'], correct: 0, explanation: '«inte» = no. Va DESPUÉS del verbo: «Jag talar inte svenska».' },
        { type: 'mc', text: 'Elige la frase correcta (No bebo café):', options: ['Jag dricker inte kaffe', 'Jag inte dricker kaffe', 'Inte jag dricker kaffe'], correct: 0, explanation: '«inte» va después del verbo: «Jag dricker inte kaffe».' },
        { type: 'mc', text: '«Ella no come carne» → «Hon äter ___ kött»', options: ['inte', 'ingen', 'aldrig'], correct: 0, explanation: '«Hon äter inte kött». «inte» después del verbo.' },
        { type: 'mc', text: '«Nunca» en sueco:', options: ['aldrig', 'inte', 'ingen'], correct: 0, explanation: '«aldrig» = nunca. «Jag dricker aldrig kaffe» = Nunca bebo café.' },
        { type: 'mc', text: '«No tengo coche» (en bil) → «Jag har ___ bil»', options: ['ingen', 'inget', 'inga'], correct: 0, explanation: '«ingen bil» = ningún coche. «ingen» para palabras con «en».' },
        { type: 'mc', text: '«No tengo casa» (ett hus) → «Jag har ___ hus»', options: ['inget', 'ingen', 'inga'], correct: 0, explanation: '«inget hus». «inget» para palabras con «ett».' },
        { type: 'mc', text: '«No tengo dinero» → «Jag har ___ pengar»', options: ['inga', 'inte', 'ingen'], correct: 0, explanation: '«inga pengar». «inga» para plural (pengar es plural).' },
        { type: 'mc', text: 'Elige la correcta (No soy de aquí):', options: ['Jag är inte härifrån', 'Jag inte är härifrån'], correct: 0, explanation: 'El «inte» va después del verbo «är».' },
        { type: 'mc', text: '«¿No hablas sueco?» → «Talar du ___ svenska?»', options: ['inte', 'ingen', 'aldrig'], correct: 0, explanation: '«Talar du inte svenska?».' },
        { type: 'type', prompt: '«no» en sueco:', answer: 'inte', accept: [], explanation: '«inte» = no. Va después del verbo.' },
        { type: 'type', prompt: '«nunca» en sueco:', answer: 'aldrig', accept: [], explanation: '«aldrig» = nunca.' },
        { type: 'type', prompt: 'Completa: «Jag förstår ___»  (No entiendo)', answer: 'inte', accept: [], explanation: '«Jag förstår inte» = No entiendo.' },
        { type: 'order', prompt: 'Ordena: «No hablo inglés»', words: ['Jag', 'talar', 'inte', 'engelska'], answer: ['Jag', 'talar', 'inte', 'engelska'], explanation: '«Jag talar inte engelska».' },
        { type: 'order', prompt: 'Ordena: «Ella no vive aquí»', words: ['Hon', 'bor', 'inte', 'här'], answer: ['Hon', 'bor', 'inte', 'här'], explanation: '«Hon bor inte här».' },
        { type: 'order', prompt: 'Ordena: «No bebo alcohol»', words: ['Jag', 'dricker', 'inte', 'alkohol'], answer: ['Jag', 'dricker', 'inte', 'alkohol'], explanation: '«Jag dricker inte alkohol».' },
        { type: 'order', prompt: 'Ordena: «Nunca como carne»', words: ['Jag', 'äter', 'aldrig', 'kött'], answer: ['Jag', 'äter', 'aldrig', 'kött'], explanation: '«Jag äter aldrig kött».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 5. PREPOSICIONES BÁSICAS (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'preposiciones',
      title: 'Preposiciones',
      subtitle: 'i, på, till, från, med… dónde y hacia dónde',
      icon: '📍',
      color: '#F59E0B',
      level: 'A',
      keywords: 'preposiciones i pa till fran med under bredvid preposition en sobre a de con',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Vivo en Suecia» → «Jag bor ___ Sverige»', options: ['i', 'på', 'till'], correct: 0, explanation: '«i» para países y ciudades: i Sverige, i Stockholm.' },
        { type: 'mc', text: '«En la mesa (encima)» → «___ bordet»', options: ['på', 'i', 'till'], correct: 0, explanation: '«på» = sobre / en una superficie: på bordet.' },
        { type: 'mc', text: '«Voy a la escuela» → «Jag går ___ skolan»', options: ['till', 'i', 'på'], correct: 0, explanation: '«till» = a / hacia (dirección): till skolan.' },
        { type: 'mc', text: '«Soy de Chile» → «Jag är ___ Chile»', options: ['från', 'i', 'till'], correct: 0, explanation: '«från» = de / desde (origen): från Chile.' },
        { type: 'mc', text: '«Con mi amigo» → «___ min vän»', options: ['med', 'i', 'på'], correct: 0, explanation: '«med» = con.' },
        { type: 'mc', text: '«En el trabajo» → «___ jobbet»', options: ['på', 'i', 'till'], correct: 0, explanation: '«på jobbet» = en el trabajo. Con «jobb» se usa «på».' },
        { type: 'mc', text: '«En el autobús» → «___ bussen»', options: ['på', 'i', 'till'], correct: 0, explanation: '«på bussen». Los medios de transporte usan «på».' },
        { type: 'mc', text: '«Debajo de la mesa» → «___ bordet»', options: ['under', 'över', 'på'], correct: 0, explanation: '«under» = debajo de.' },
        { type: 'mc', text: '«Al lado de la casa» → «___ huset»', options: ['bredvid', 'mellan', 'under'], correct: 0, explanation: '«bredvid» = al lado de.' },
        { type: 'mc', text: '«En sueco» (el idioma) → «___ svenska»', options: ['på', 'i', 'med'], correct: 0, explanation: '«på svenska» = en sueco. Los idiomas usan «på».' },
        { type: 'mc', text: '«Vivo en Estocolmo» → «Jag bor ___ Stockholm»', options: ['i', 'på', 'till'], correct: 0, explanation: '«i» para ciudades: i Stockholm.' },
        { type: 'type', prompt: '«en» (para países) en sueco:', answer: 'i', accept: [], explanation: '«i» para países y ciudades.' },
        { type: 'type', prompt: '«a / hacia» en sueco:', answer: 'till', accept: [], explanation: '«till» = dirección hacia.' },
        { type: 'type', prompt: '«de / desde» en sueco:', answer: 'från', accept: [], explanation: '«från» = origen.' },
        { type: 'type', prompt: '«con» en sueco:', answer: 'med', accept: [], explanation: '«med» = con.' },
        { type: 'order', prompt: 'Ordena: «Vivo en Suecia»', words: ['Jag', 'bor', 'i', 'Sverige'], answer: ['Jag', 'bor', 'i', 'Sverige'], explanation: '«Jag bor i Sverige».' },
        { type: 'order', prompt: 'Ordena: «Voy a la escuela»', words: ['Jag', 'går', 'till', 'skolan'], answer: ['Jag', 'går', 'till', 'skolan'], explanation: '«Jag går till skolan».' },
        { type: 'order', prompt: 'Ordena: «El libro está sobre la mesa»', words: ['Boken', 'ligger', 'på', 'bordet'], answer: ['Boken', 'ligger', 'på', 'bordet'], explanation: '«Boken ligger på bordet».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 6. HACER PREGUNTAS (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'preguntas',
      title: 'Hacer preguntas',
      subtitle: 'vad, vem, var, när… y preguntas de sí/no',
      icon: '❓',
      color: '#0EA5E9',
      level: 'A',
      keywords: 'preguntas vad vem var nar hur varfor fragor pregunta que quien donde cuando como porque',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«¿Qué?» → ___', options: ['Vad', 'Vem', 'Var'], correct: 0, explanation: '«Vad» = qué. «Vad heter du?» = ¿Cómo te llamas?' },
        { type: 'mc', text: '«¿Quién?» → ___', options: ['Vem', 'Vad', 'Var'], correct: 0, explanation: '«Vem» = quién.' },
        { type: 'mc', text: '«¿Dónde?» → ___', options: ['Var', 'Vart', 'Vem'], correct: 0, explanation: '«Var» = dónde. «Var bor du?» = ¿Dónde vives?' },
        { type: 'mc', text: '«¿Cuándo?» → ___', options: ['När', 'Var', 'Hur'], correct: 0, explanation: '«När» = cuándo.' },
        { type: 'mc', text: '«¿Por qué?» → ___', options: ['Varför', 'Vad', 'Hur'], correct: 0, explanation: '«Varför» = por qué.' },
        { type: 'mc', text: '«¿Cómo?» → ___', options: ['Hur', 'Var', 'Vad'], correct: 0, explanation: '«Hur» = cómo. «Hur mår du?» = ¿Cómo estás?' },
        { type: 'mc', text: '«¿Cuánto cuesta?» → «___ kostar det?»', options: ['Vad', 'Hur', 'Vem'], correct: 0, explanation: '«Vad kostar det?» = ¿Cuánto cuesta? (literal: ¿qué cuesta?)' },
        { type: 'mc', text: '«¿Cuántos años tienes?» → «Hur ___ är du?»', options: ['gammal', 'mycket', 'många'], correct: 0, explanation: '«Hur gammal är du?» = ¿Qué edad tienes? (literal: ¿cuán viejo?)' },
        { type: 'mc', text: 'Pregunta de sí/no: «¿Hablas sueco?» →', options: ['Talar du svenska?', 'Du talar svenska?', 'Svenska du talar?'], correct: 0, explanation: 'En preguntas de sí/no el verbo va PRIMERO: «Talar du svenska?».' },
        { type: 'mc', text: '«¿Bebes café?» →', options: ['Dricker du kaffe?', 'Du dricker kaffe?'], correct: 0, explanation: 'El verbo primero: «Dricker du kaffe?».' },
        { type: 'mc', text: '«¿De dónde vienes?» → «___ kommer du ifrån?»', options: ['Var', 'Vem', 'När'], correct: 0, explanation: '«Var kommer du ifrån?» = ¿De dónde vienes?' },
        { type: 'type', prompt: '«¿qué?» en sueco:', answer: 'vad', accept: [], explanation: '«vad» = qué.' },
        { type: 'type', prompt: '«¿dónde?» en sueco:', answer: 'var', accept: [], explanation: '«var» = dónde.' },
        { type: 'type', prompt: '«¿cómo?» en sueco:', answer: 'hur', accept: [], explanation: '«hur» = cómo.' },
        { type: 'type', prompt: '«¿por qué?» en sueco:', answer: 'varför', accept: [], explanation: '«varför» = por qué.' },
        { type: 'order', prompt: 'Ordena la pregunta: «¿Hablas español?»', words: ['Talar', 'du', 'spanska'], answer: ['Talar', 'du', 'spanska'], explanation: '«Talar du spanska?». Verbo primero.' },
        { type: 'order', prompt: 'Ordena: «¿Dónde vives?»', words: ['Var', 'bor', 'du'], answer: ['Var', 'bor', 'du'], explanation: '«Var bor du?».' },
        { type: 'order', prompt: 'Ordena: «¿Cómo te llamas?»', words: ['Vad', 'heter', 'du'], answer: ['Vad', 'heter', 'du'], explanation: '«Vad heter du?».' },
        { type: 'order', prompt: 'Ordena: «¿Cuándo llegas?»', words: ['När', 'kommer', 'du'], answer: ['När', 'kommer', 'du'], explanation: '«När kommer du?».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 7. NÚMEROS Y TIEMPO (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'numeros-tiempo',
      title: 'Números y tiempo',
      subtitle: 'Contar, la hora y los días de la semana',
      icon: '🕐',
      color: '#10B981',
      level: 'A',
      keywords: 'numeros tiempo klockan dagar veckodagar siffror numero hora dia semana lunes tiempo',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«tres» → ___', options: ['tre', 'fyra', 'två'], correct: 0, explanation: '«tre» = tres.' },
        { type: 'mc', text: '«cinco» → ___', options: ['fem', 'sex', 'fyra'], correct: 0, explanation: '«fem» = cinco.' },
        { type: 'mc', text: '«diez» → ___', options: ['tio', 'tjugo', 'tolv'], correct: 0, explanation: '«tio» = diez.' },
        { type: 'mc', text: '«veinte» → ___', options: ['tjugo', 'tolv', 'trettio'], correct: 0, explanation: '«tjugo» = veinte.' },
        { type: 'mc', text: '«¿Qué hora es?» → «Vad är ___?»', options: ['klockan', 'tiden', 'timmen'], correct: 0, explanation: '«Vad är klockan?» = ¿Qué hora es? (klockan = el reloj/la hora)' },
        { type: 'mc', text: '«Son las dos» → «Klockan är ___»', options: ['två', 'tu', 'tå'], correct: 0, explanation: '«Klockan är två» = Son las dos.' },
        { type: 'mc', text: '«lunes» → ___', options: ['måndag', 'tisdag', 'söndag'], correct: 0, explanation: '«måndag» = lunes.' },
        { type: 'mc', text: '«sábado» → ___', options: ['lördag', 'fredag', 'söndag'], correct: 0, explanation: '«lördag» = sábado.' },
        { type: 'mc', text: '«hoy» → ___', options: ['idag', 'imorgon', 'igår'], correct: 0, explanation: '«idag» = hoy.' },
        { type: 'mc', text: '«mañana» (el día) → ___', options: ['imorgon', 'idag', 'igår'], correct: 0, explanation: '«imorgon» = mañana.' },
        { type: 'mc', text: '«ayer» → ___', options: ['igår', 'idag', 'imorgon'], correct: 0, explanation: '«igår» = ayer.' },
        { type: 'type', prompt: '«dos» en sueco:', answer: 'två', accept: [], explanation: '«två» = dos.' },
        { type: 'type', prompt: '«siete» en sueco:', answer: 'sju', accept: [], explanation: '«sju» = siete.' },
        { type: 'type', prompt: '«hoy» en sueco:', answer: 'idag', accept: ['i dag'], explanation: '«idag» = hoy.' },
        { type: 'type', prompt: '«lunes» en sueco:', answer: 'måndag', accept: [], explanation: '«måndag» = lunes.' },
        { type: 'order', prompt: 'Ordena: «¿Qué hora es?»', words: ['Vad', 'är', 'klockan'], answer: ['Vad', 'är', 'klockan'], explanation: '«Vad är klockan?».' },
        { type: 'order', prompt: 'Ordena: «Son las tres»', words: ['Klockan', 'är', 'tre'], answer: ['Klockan', 'är', 'tre'], explanation: '«Klockan är tre».' },
        { type: 'order', prompt: 'Ordena: «Tengo dos hijos»', words: ['Jag', 'har', 'två', 'barn'], answer: ['Jag', 'har', 'två', 'barn'], explanation: '«Jag har två barn». (barn no cambia en plural)' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 8. PRONOMBRES POSESIVOS (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'posesivos',
      title: 'Pronombres posesivos',
      subtitle: 'min, mitt, mina… de quién es',
      icon: '🫱',
      color: '#7C3AED',
      level: 'B',
      keywords: 'posesivos min mitt mina din ditt dina hans hennes var deras possessiva mi tu su nuestro',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«mi coche» (en bil) → «___ bil»', options: ['min', 'mitt', 'mina'], correct: 0, explanation: '«min bil». «min» para palabras con «en».' },
        { type: 'mc', text: '«mi casa» (ett hus) → «___ hus»', options: ['mitt', 'min', 'mina'], correct: 0, explanation: '«mitt hus». «mitt» para palabras con «ett».' },
        { type: 'mc', text: '«mis libros» (böcker, plural) → «___ böcker»', options: ['mina', 'min', 'mitt'], correct: 0, explanation: '«mina böcker». «mina» para plural.' },
        { type: 'mc', text: '«tu coche» (en bil) → «___ bil»', options: ['din', 'ditt', 'dina'], correct: 0, explanation: '«din bil». «din» para «en».' },
        { type: 'mc', text: '«tu casa» (ett hus) → «___ hus»', options: ['ditt', 'din', 'dina'], correct: 0, explanation: '«ditt hus». «ditt» para «ett».' },
        { type: 'mc', text: '«su coche» (de él) → «___ bil»', options: ['hans', 'hennes', 'min'], correct: 0, explanation: '«hans» = su (de él). No cambia nunca: hans bil, hans hus, hans böcker.' },
        { type: 'mc', text: '«su coche» (de ella) → «___ bil»', options: ['hennes', 'hans', 'deras'], correct: 0, explanation: '«hennes» = su (de ella). No cambia nunca.' },
        { type: 'mc', text: '«nuestro coche» (en bil) → «___ bil»', options: ['vår', 'vårt', 'våra'], correct: 0, explanation: '«vår bil». «vår» para «en».' },
        { type: 'mc', text: '«nuestra casa» (ett hus) → «___ hus»', options: ['vårt', 'vår', 'våra'], correct: 0, explanation: '«vårt hus». «vårt» para «ett».' },
        { type: 'mc', text: '«su casa» (de ellos) → «___ hus»', options: ['deras', 'hans', 'hennes'], correct: 0, explanation: '«deras» = su (de ellos). No cambia nunca.' },
        { type: 'mc', text: '«mis amigos» (vänner) → «___ vänner»', options: ['mina', 'min', 'mitt'], correct: 0, explanation: '«mina vänner». Plural → mina.' },
        { type: 'type', prompt: '«mi» (con palabra de «en»):', answer: 'min', accept: [], explanation: '«min» + palabra de «en» (min bil).' },
        { type: 'type', prompt: '«mi» (con palabra de «ett»):', answer: 'mitt', accept: [], explanation: '«mitt» + palabra de «ett» (mitt hus).' },
        { type: 'type', prompt: '«su» (de ella):', answer: 'hennes', accept: [], explanation: '«hennes» = su (de ella). No cambia.' },
        { type: 'type', prompt: '«su» (de ellos):', answer: 'deras', accept: [], explanation: '«deras» = su (de ellos). No cambia.' },
        { type: 'order', prompt: 'Ordena: «Es mi coche»', words: ['Det', 'är', 'min', 'bil'], answer: ['Det', 'är', 'min', 'bil'], explanation: '«Det är min bil».' },
        { type: 'order', prompt: 'Ordena: «Mi casa es grande»', words: ['Mitt', 'hus', 'är', 'stort'], answer: ['Mitt', 'hus', 'är', 'stort'], explanation: '«Mitt hus är stort».' },
        { type: 'order', prompt: 'Ordena: «Sus libros (de ella) están aquí»', words: ['Hennes', 'böcker', 'är', 'här'], answer: ['Hennes', 'böcker', 'är', 'här'], explanation: '«Hennes böcker är här».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 9. VERBOS EN PASADO (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'pasado',
      title: 'Verbos en pasado',
      subtitle: 'Lo que ya pasó: talade, var, hade, gick…',
      icon: '⏪',
      color: '#006AA7',
      level: 'B',
      keywords: 'pasado preteritum verbos ade de te var hade gick ayer talade bodde hable fui tenia',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Yo hablé» → «Jag ___»', options: ['talade', 'talar', 'tala'], correct: 0, explanation: '«talade» = hablé/hablaba. Los verbos -ar hacen el pasado con -ade: tala → talade.' },
        { type: 'mc', text: '«Yo era / fui» → «Jag ___»', options: ['var', 'är', 'vara'], correct: 0, explanation: '«var» = era/fui/estaba. De «vara». (presente: är)' },
        { type: 'mc', text: '«Yo tenía / tuve» → «Jag ___»', options: ['hade', 'har', 'ha'], correct: 0, explanation: '«hade» = tenía/tuve. De «ha». (presente: har)' },
        { type: 'mc', text: '«Yo viví» → «Jag ___ i Sverige»', options: ['bodde', 'bor', 'bo'], correct: 0, explanation: '«bodde» = viví/vivía. De «bo».' },
        { type: 'mc', text: '«Yo comí» → «Jag ___»', options: ['åt', 'äter', 'äta'], correct: 0, explanation: '«åt» = comí. De «äta». Es irregular.' },
        { type: 'mc', text: '«Yo fui / caminé» → «Jag ___ hem»', options: ['gick', 'går', 'gå'], correct: 0, explanation: '«gick» = fui/iba. De «gå». Irregular.' },
        { type: 'mc', text: '«Yo hice» → «Jag ___»', options: ['gjorde', 'gör', 'göra'], correct: 0, explanation: '«gjorde» = hice/hacía. De «göra».' },
        { type: 'mc', text: '«Yo compré» → «Jag ___ bröd»', options: ['köpte', 'köper', 'köpa'], correct: 0, explanation: '«köpte» = compré. De «köpa».' },
        { type: 'mc', text: '«Yo leí» → «Jag ___ en bok»', options: ['läste', 'läser', 'läsa'], correct: 0, explanation: '«läste» = leí. De «läsa».' },
        { type: 'mc', text: '«Yo bebí» → «Jag ___ kaffe»', options: ['drack', 'dricker', 'dricka'], correct: 0, explanation: '«drack» = bebí. De «dricka». Irregular.' },
        { type: 'mc', text: '«Ayer trabajé» → «Igår ___ jag»', options: ['jobbade', 'jobbar', 'jobba'], correct: 0, explanation: '«jobbade» = trabajé. -ar → -ade.' },
        { type: 'mc', text: '¿Cuál está en pasado?', options: ['talade', 'talar', 'tala'], correct: 0, explanation: '«talade» = habló (pasado). «talar» es presente (ahora).' },
        { type: 'type', prompt: 'Pasado de «tala» (hablar):  jag ___', answer: 'talade', accept: [], explanation: '«talade». Los -ar hacen -ade.' },
        { type: 'type', prompt: 'Pasado de «bo» (vivir):  jag ___', answer: 'bodde', accept: [], explanation: '«bodde».' },
        { type: 'type', prompt: '«Yo tenía» → jag ___', answer: 'hade', accept: [], explanation: '«hade». De «ha».' },
        { type: 'type', prompt: '«Yo era» → jag ___', answer: 'var', accept: [], explanation: '«var». De «vara».' },
        { type: 'type', prompt: 'Pasado de «äta» (comer):  jag ___', answer: 'åt', accept: [], explanation: '«åt». Irregular.' },
        { type: 'order', prompt: 'Ordena: «Ayer trabajé mucho»', words: ['Igår', 'jobbade', 'jag', 'mycket'], answer: ['Igår', 'jobbade', 'jag', 'mycket'], explanation: '«Igår jobbade jag mycket». (empieza con Igår → verbo en 2º lugar)' },
        { type: 'order', prompt: 'Ordena: «Comí pan»', words: ['Jag', 'åt', 'bröd'], answer: ['Jag', 'åt', 'bröd'], explanation: '«Jag åt bröd».' },
        { type: 'order', prompt: 'Ordena: «Viví en Perú»', words: ['Jag', 'bodde', 'i', 'Peru'], answer: ['Jag', 'bodde', 'i', 'Peru'], explanation: '«Jag bodde i Peru».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 10. VERBOS MODALES (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'modales',
      title: 'Verbos modales',
      subtitle: 'kan, vill, ska, måste… + verbo base',
      icon: '🔑',
      color: '#F59E0B',
      level: 'B',
      keywords: 'modales kan vill ska maste far bor hjalpverb poder querer deber tener que voy a',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Puedo hablar sueco» → «Jag ___ tala svenska»', options: ['kan', 'vill', 'måste'], correct: 0, explanation: '«kan» = puedo/sé. Después va el verbo base: kan tala.' },
        { type: 'mc', text: '«Quiero comer» → «Jag ___ äta»', options: ['vill', 'kan', 'ska'], correct: 0, explanation: '«vill» = quiero. «vill äta» = quiero comer.' },
        { type: 'mc', text: '«Voy a trabajar» → «Jag ___ jobba»', options: ['ska', 'kan', 'får'], correct: 0, explanation: '«ska» = voy a (futuro/plan). «ska jobba» = voy a trabajar.' },
        { type: 'mc', text: '«Tengo que ir» → «Jag ___ gå»', options: ['måste', 'kan', 'vill'], correct: 0, explanation: '«måste» = tengo que (obligación). «måste gå» = tengo que ir.' },
        { type: 'mc', text: '«¿Puedo (con permiso) entrar?» → «___ jag komma in?»', options: ['Får', 'Kan', 'Ska'], correct: 0, explanation: '«Får jag...?» = ¿Puedo / Me permite...? «får» = poder con permiso.' },
        { type: 'mc', text: 'Después de un verbo modal, ¿qué forma va? «Jag kan ___»', options: ['tala', 'talar', 'talade'], correct: 0, explanation: 'Después del modal va la forma BASE (sin -r): «kan tala», no «kan talar».' },
        { type: 'mc', text: '«Debemos esperar» → «Vi ___ vänta»', options: ['måste', 'vill', 'får'], correct: 0, explanation: '«måste vänta» = tenemos que esperar.' },
        { type: 'mc', text: '«Ella puede/sabe cantar» → «Hon ___ sjunga»', options: ['kan', 'vill', 'ska'], correct: 0, explanation: '«kan sjunga» = puede/sabe cantar.' },
        { type: 'mc', text: 'Elige la correcta:', options: ['Jag kan simma', 'Jag kan simmar'], correct: 0, explanation: 'Después del modal, la forma base: «kan simma» (no «simmar»).' },
        { type: 'mc', text: '«¿Quieres café?» → «___ du kaffe?»', options: ['Vill', 'Kan', 'Måste'], correct: 0, explanation: '«Vill du ha kaffe?» = ¿Quieres café? «vill» = querer.' },
        { type: 'type', prompt: '«puedo / sé» en sueco:', answer: 'kan', accept: [], explanation: '«kan» = poder/saber.' },
        { type: 'type', prompt: '«quiero» en sueco:', answer: 'vill', accept: [], explanation: '«vill» = querer.' },
        { type: 'type', prompt: '«tengo que» en sueco:', answer: 'måste', accept: [], explanation: '«måste» = tener que.' },
        { type: 'type', prompt: '«voy a» (futuro) en sueco:', answer: 'ska', accept: [], explanation: '«ska» = ir a / plan futuro.' },
        { type: 'order', prompt: 'Ordena: «Puedo hablar sueco»', words: ['Jag', 'kan', 'tala', 'svenska'], answer: ['Jag', 'kan', 'tala', 'svenska'], explanation: '«Jag kan tala svenska».' },
        { type: 'order', prompt: 'Ordena: «Tengo que trabajar mañana»', words: ['Jag', 'måste', 'jobba', 'imorgon'], answer: ['Jag', 'måste', 'jobba', 'imorgon'], explanation: '«Jag måste jobba imorgon».' },
        { type: 'order', prompt: 'Ordena: «Voy a comer»', words: ['Jag', 'ska', 'äta'], answer: ['Jag', 'ska', 'äta'], explanation: '«Jag ska äta».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 11. ORDEN DE PALABRAS V2 (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'orden-palabras',
      title: 'Orden de palabras (V2)',
      subtitle: 'La regla de oro: el verbo va en 2º lugar',
      icon: '🔀',
      color: '#0EA5E9',
      level: 'B',
      keywords: 'orden palabras v2 verbo segundo lugar inversion ordfoljd sintaxis frase',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'En sueco, en una frase normal el verbo va en...', options: ['segundo lugar', 'primer lugar', 'último lugar'], correct: 0, explanation: 'El verbo va en 2º lugar (la regla «V2»). Es la regla de oro del orden sueco.' },
        { type: 'mc', text: '«Mañana trabajo» → ¿cuál es correcta?', options: ['Imorgon jobbar jag', 'Imorgon jag jobbar'], correct: 0, explanation: 'Si empiezas con «imorgon», el verbo sigue en 2º lugar y el «jag» pasa después: «Imorgon jobbar jag».' },
        { type: 'mc', text: '«Hoy leo un libro» →', options: ['Idag läser jag en bok', 'Idag jag läser en bok'], correct: 0, explanation: 'El verbo en 2º lugar: «Idag läser jag...». (No «Idag jag läser».)' },
        { type: 'mc', text: '«En Suecia vivo yo» →', options: ['I Sverige bor jag', 'I Sverige jag bor'], correct: 0, explanation: 'Verbo en 2º lugar: «I Sverige bor jag».' },
        { type: 'mc', text: '«Por la mañana bebo café» →', options: ['På morgonen dricker jag kaffe', 'På morgonen jag dricker kaffe'], correct: 0, explanation: 'Verbo 2º → «På morgonen dricker jag kaffe».' },
        { type: 'mc', text: '«Ahora como» →', options: ['Nu äter jag', 'Nu jag äter'], correct: 0, explanation: '«Nu äter jag». El verbo siempre en 2º lugar.' },
        { type: 'mc', text: 'Elige la correcta (El lunes empieza el curso):', options: ['På måndag börjar kursen', 'På måndag kursen börjar'], correct: 0, explanation: 'Verbo 2º: «På måndag börjar kursen».' },
        { type: 'mc', text: 'Frase normal: «Jag dricker kaffe». Empezando por «på morgonen», el verbo...', options: ['se mantiene en 2º lugar', 'se va al final', 'desaparece'], correct: 0, explanation: 'Siempre 2º lugar: «På morgonen dricker jag kaffe».' },
        { type: 'type', prompt: 'En la regla V2, el verbo va en el ___ lugar (número):', answer: '2', accept: ['segundo', '2º', 'dos'], explanation: 'El verbo va siempre en el 2º lugar.' },
        { type: 'type', prompt: 'Completa: «Imorgon ___ jag»  (Mañana trabajo — verbo jobba)', answer: 'jobbar', accept: [], explanation: '«Imorgon jobbar jag». Verbo en 2º lugar.' },
        { type: 'order', prompt: 'Ordena: «Mañana trabajo» (empieza con Imorgon)', words: ['Imorgon', 'jobbar', 'jag'], answer: ['Imorgon', 'jobbar', 'jag'], explanation: '«Imorgon jobbar jag». Verbo en 2º lugar.' },
        { type: 'order', prompt: 'Ordena: «Hoy leo un libro»', words: ['Idag', 'läser', 'jag', 'en bok'], answer: ['Idag', 'läser', 'jag', 'en bok'], explanation: '«Idag läser jag en bok».' },
        { type: 'order', prompt: 'Ordena: «En Estocolmo vivo yo»', words: ['I', 'Stockholm', 'bor', 'jag'], answer: ['I', 'Stockholm', 'bor', 'jag'], explanation: '«I Stockholm bor jag».' },
        { type: 'order', prompt: 'Ordena: «Ahora bebo café»', words: ['Nu', 'dricker', 'jag', 'kaffe'], answer: ['Nu', 'dricker', 'jag', 'kaffe'], explanation: '«Nu dricker jag kaffe».' },
        { type: 'order', prompt: 'Ordena: «El lunes empieza el curso»', words: ['På', 'måndag', 'börjar', 'kursen'], answer: ['På', 'måndag', 'börjar', 'kursen'], explanation: '«På måndag börjar kursen».' },
        { type: 'order', prompt: 'Ordena: «Yo hablo sueco todos los días»', words: ['Jag', 'talar', 'svenska', 'varje', 'dag'], answer: ['Jag', 'talar', 'svenska', 'varje', 'dag'], explanation: '«Jag talar svenska varje dag».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 12. PLURALES SUECOS (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'plurales',
      title: 'Plurales suecos',
      subtitle: '-or, -ar, -er, -n o sin cambio',
      icon: '➕',
      color: '#10B981',
      level: 'B',
      keywords: 'plurales plural or ar er n singular flickor bilar hus barn plural muchos',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'Plural de «en flicka» (una niña):', options: ['flickor', 'flickar', 'flicker'], correct: 0, explanation: '«flickor». Las palabras «en» que terminan en -a cambian a -or: flicka → flickor.' },
        { type: 'mc', text: 'Plural de «en bil» (un coche):', options: ['bilar', 'bilor', 'biler'], correct: 0, explanation: '«bilar». Muchas palabras «en» hacen el plural con -ar: bil → bilar.' },
        { type: 'mc', text: 'Plural de «en hund» (un perro):', options: ['hundar', 'hundor', 'hunder'], correct: 0, explanation: '«hundar». Como bil→bilar, hund→hundar (-ar).' },
        { type: 'mc', text: 'Plural de «ett äpple» (una manzana):', options: ['äpplen', 'äpplar', 'äpple'], correct: 0, explanation: '«äpplen». Las palabras «ett» que terminan en vocal suman -n: äpple → äpplen.' },
        { type: 'mc', text: 'Plural de «ett hus» (una casa):', options: ['hus', 'husar', 'husen'], correct: 0, explanation: '«hus» — ¡no cambia! Muchas «ett» que terminan en consonante son iguales en plural: ett hus → två hus.' },
        { type: 'mc', text: 'Plural de «ett barn» (un niño):', options: ['barn', 'barnar', 'barnen'], correct: 0, explanation: '«barn» — no cambia. ett barn → två barn.' },
        { type: 'mc', text: 'Plural de «en dag» (un día):', options: ['dagar', 'dagor', 'dager'], correct: 0, explanation: '«dagar» (-ar).' },
        { type: 'mc', text: 'Plural de «en gata» (una calle):', options: ['gator', 'gatar', 'gater'], correct: 0, explanation: '«gator». Termina en -a → -or.' },
        { type: 'mc', text: 'Plural de «en kvinna» (una mujer):', options: ['kvinnor', 'kvinnar', 'kvinner'], correct: 0, explanation: '«kvinnor». -a → -or.' },
        { type: 'mc', text: 'Plural de «ett rum» (una habitación):', options: ['rum', 'rummar', 'rummen'], correct: 0, explanation: '«rum» — no cambia. ett rum → två rum.' },
        { type: 'mc', text: '«dos casas» → «två ___» (hus)', options: ['hus', 'husar', 'huser'], correct: 0, explanation: '«två hus». Las «ett» con consonante final no cambian.' },
        { type: 'type', prompt: 'Plural de «en bil»:  två ___', answer: 'bilar', accept: [], explanation: '«bilar» (-ar).' },
        { type: 'type', prompt: 'Plural de «en flicka»:  två ___', answer: 'flickor', accept: [], explanation: '«flickor» (-a → -or).' },
        { type: 'type', prompt: 'Plural de «ett hus»:  två ___', answer: 'hus', accept: [], explanation: '«hus» — no cambia.' },
        { type: 'type', prompt: 'Plural de «ett äpple»:  två ___', answer: 'äpplen', accept: [], explanation: '«äpplen» (ett + vocal → -n).' },
        { type: 'order', prompt: 'Ordena: «Tengo dos coches»', words: ['Jag', 'har', 'två', 'bilar'], answer: ['Jag', 'har', 'två', 'bilar'], explanation: '«Jag har två bilar».' },
        { type: 'order', prompt: 'Ordena: «Hay tres niños»', words: ['Det', 'finns', 'tre', 'barn'], answer: ['Det', 'finns', 'tre', 'barn'], explanation: '«Det finns tre barn». (barn no cambia)' },
        { type: 'order', prompt: 'Ordena: «Compro dos manzanas»', words: ['Jag', 'köper', 'två', 'äpplen'], answer: ['Jag', 'köper', 'två', 'äpplen'], explanation: '«Jag köper två äpplen».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 13. SALUDOS Y PRESENTARSE (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'saludos',
      title: 'Saludos y presentarse',
      subtitle: 'Hej, god morgon, hej då… lo primero que dices cada día',
      icon: '👋',
      color: '#F59E0B',
      level: 'A',
      keywords: 'saludos presentarse hej god morgon dag kväll natt hej då tack förlåt ursäkta heter hola gracias adios buenos dias hälsningar presentation',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Hola» (informal) → ___', options: ['Hej', 'Adjö', 'Tack'], correct: 0, explanation: '«Hej» = hola. Es el saludo más común, sirve a cualquier hora. 😊' },
        { type: 'mc', text: '«Buenos días» → ___', options: ['God morgon', 'God natt', 'Hej då'], correct: 0, explanation: '«God morgon» = buenos días (por la mañana). «god» = bueno/buenas.' },
        { type: 'mc', text: '«Buenas noches» (al ir a dormir) → ___', options: ['God natt', 'God morgon', 'God dag'], correct: 0, explanation: '«God natt» = buenas noches, para despedirse antes de dormir. «God kväll» es para saludar de noche.' },
        { type: 'mc', text: '«Adiós» (informal) → ___', options: ['Hej då', 'Hej', 'Tack'], correct: 0, explanation: '«Hej då» = adiós. Curioso: «hej» solo = hola, pero «hej då» = adiós. 🎯' },
        { type: 'mc', text: '«¿Cómo estás?» → ___', options: ['Hur mår du?', 'Vad heter du?', 'Var bor du?'], correct: 0, explanation: '«Hur mår du?» = ¿cómo estás? Se responde «Bra, tack» (bien, gracias).' },
        { type: 'mc', text: '«Bien, gracias» → ___', options: ['Bra, tack', 'Hej då', 'Varsågod'], correct: 0, explanation: '«Bra, tack» = bien, gracias. «bra» = bien.' },
        { type: 'mc', text: '«¿Cómo te llamas?» → ___', options: ['Vad heter du?', 'Hur mår du?', 'Var kommer du ifrån?'], correct: 0, explanation: '«Vad heter du?» = ¿cómo te llamas? Literal: «¿qué te llamas?».' },
        { type: 'mc', text: '«Me llamo Ana» → «Jag ___ Ana»', options: ['heter', 'är', 'bor'], correct: 0, explanation: '«Jag heter Ana» = me llamo Ana. «heter» = me llamo / se llama.' },
        { type: 'mc', text: '«Gracias» → ___', options: ['Tack', 'Förlåt', 'Ursäkta'], correct: 0, explanation: '«Tack» = gracias. «Tack så mycket» = muchas gracias.' },
        { type: 'mc', text: '«Perdón / lo siento» → ___', options: ['Förlåt', 'Tack', 'Hej'], correct: 0, explanation: '«Förlåt» = perdón / lo siento (cuando te disculpas por algo).' },
        { type: 'mc', text: '«Disculpa» (para llamar la atención) → ___', options: ['Ursäkta', 'Varsågod', 'God dag'], correct: 0, explanation: '«Ursäkta» = disculpa/perdón, para pedir paso o preguntar algo. «Förlåt» es más para pedir perdón.' },
        { type: 'mc', text: '«Mucho gusto (encantado)» → ___', options: ['Trevligt att träffas', 'Hej då', 'Vi ses'], correct: 0, explanation: '«Trevligt att träffas» = mucho gusto / encantado de conocerte.' },
        { type: 'mc', text: '«¿De dónde vienes?» → «Var kommer du ___?»', options: ['ifrån', 'till', 'med'], correct: 0, explanation: '«Var kommer du ifrån?» = ¿de dónde vienes? «ifrån» = de (origen).' },
        { type: 'mc', text: '«Nos vemos» → ___', options: ['Vi ses', 'God natt', 'Tack'], correct: 0, explanation: '«Vi ses» = nos vemos (despedida informal).' },
        { type: 'mc', text: '«De nada» (respuesta a gracias) → ___', options: ['Varsågod', 'Förlåt', 'Hej då'], correct: 0, explanation: '«Varsågod» = de nada / aquí tienes. También se usa al dar algo a alguien.' },
        { type: 'type', prompt: '«Hola» en sueco:', answer: 'hej', accept: [], explanation: '«hej» = hola.' },
        { type: 'type', prompt: '«Gracias» en sueco:', answer: 'tack', accept: [], explanation: '«tack» = gracias.' },
        { type: 'type', prompt: 'Completa: «Jag ___ Erik» (me llamo):', answer: 'heter', accept: [], explanation: '«heter» = me llamo.' },
        { type: 'type', prompt: '«Buenos días» en sueco:', answer: 'god morgon', accept: ['godmorgon'], explanation: '«god morgon» = buenos días.' },
        { type: 'type', prompt: '«Adiós» (informal) en sueco:', answer: 'hej då', accept: ['hejdå'], explanation: '«hej då» = adiós.' },
        { type: 'order', prompt: 'Ordena: «Me llamo Maria»', words: ['Jag', 'heter', 'Maria'], answer: ['Jag', 'heter', 'Maria'], explanation: '«Jag heter Maria».' },
        { type: 'order', prompt: 'Ordena: «¿De dónde vienes?»', words: ['Var', 'kommer', 'du', 'ifrån'], answer: ['Var', 'kommer', 'du', 'ifrån'], explanation: '«Var kommer du ifrån?».' },
        { type: 'order', prompt: 'Ordena: «¿Cómo estás?»', words: ['Hur', 'mår', 'du'], answer: ['Hur', 'mår', 'du'], explanation: '«Hur mår du?».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 14. FORMA DEFINIDA (boken, bilen, huset) (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'forma-definida',
      title: 'El / la (forma definida)',
      subtitle: 'bok → boken, hus → huset. El artículo va PEGADO al final',
      icon: '📖',
      color: '#3B82F6',
      level: 'A',
      keywords: 'forma definida el la boken bilen huset bestämd form artikel bok hus final sufijo definido',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«el libro» (en bok) → ___', options: ['boken', 'boket', 'bokar'], correct: 0, explanation: '«boken» = el libro. En sueco «el/la» va pegado al final. Palabras «en» → +en: bok → boken. 🎯' },
        { type: 'mc', text: '«el coche» (en bil) → ___', options: ['bilen', 'bilet', 'bilar'], correct: 0, explanation: '«bilen» = el coche. «en» → +en: bil → bilen.' },
        { type: 'mc', text: '«la casa» (ett hus) → ___', options: ['huset', 'husen', 'husan'], correct: 0, explanation: '«huset» = la casa. Palabras «ett» → +et: hus → huset.' },
        { type: 'mc', text: '«la mesa» (ett bord) → ___', options: ['bordet', 'borden', 'bordan'], correct: 0, explanation: '«bordet» = la mesa. «ett» → +et: bord → bordet.' },
        { type: 'mc', text: '«la niña» (en flicka) → ___', options: ['flickan', 'flicken', 'flickaet'], correct: 0, explanation: '«flickan» = la niña. Si «en» termina en -a, solo suma -n: flicka → flickan. 🎯' },
        { type: 'mc', text: '«la calle» (en gata) → ___', options: ['gatan', 'gataen', 'gatet'], correct: 0, explanation: '«gatan» = la calle. Termina en -a → solo +n: gata → gatan.' },
        { type: 'mc', text: '«la manzana» (ett äpple) → ___', options: ['äpplet', 'äpplen', 'äppleet'], correct: 0, explanation: '«äpplet» = la manzana. Si «ett» termina en vocal, solo suma -t: äpple → äpplet.' },
        { type: 'mc', text: '«el día» (en dag) → ___', options: ['dagen', 'daget', 'dagan'], correct: 0, explanation: '«dagen» = el día. «en» → +en.' },
        { type: 'mc', text: '«la ciudad» (en stad) → ___', options: ['staden', 'stadet', 'stadan'], correct: 0, explanation: '«staden» = la ciudad. «en» → +en.' },
        { type: 'mc', text: '«la palabra» (ett ord) → ___', options: ['ordet', 'orden', 'ordat'], correct: 0, explanation: '«ordet» = la palabra. «ett» → +et.' },
        { type: 'mc', text: '«la escuela» (en skola) → ___', options: ['skolan', 'skolen', 'skolet'], correct: 0, explanation: '«skolan» = la escuela. Termina en -a → +n.' },
        { type: 'mc', text: '«el trabajo» (ett jobb) → ___', options: ['jobbet', 'jobben', 'jobban'], correct: 0, explanation: '«jobbet» = el trabajo. «ett» → +et.' },
        { type: 'mc', text: '«bilen» ¿qué significa?', options: ['el coche', 'un coche', 'coches'], correct: 0, explanation: '«bilen» = EL coche (definido). «en bil» = UN coche (indefinido).' },
        { type: 'mc', text: '«la respuesta» (ett svar) → ___', options: ['svaret', 'svaren', 'svarat'], correct: 0, explanation: '«svaret» = la respuesta. «ett» → +et.' },
        { type: 'mc', text: '¿Cómo se dice «el/la» en sueco?', options: ['Va pegado al final de la palabra', 'Es una palabra aparte antes', 'No existe'], correct: 0, explanation: 'En sueco «el/la» no va delante: se pega al final. bok → boken (el libro).' },
        { type: 'type', prompt: '«el libro» (de «bok»):', answer: 'boken', accept: [], explanation: '«boken». «en» → +en.' },
        { type: 'type', prompt: '«la casa» (de «hus»):', answer: 'huset', accept: [], explanation: '«huset». «ett» → +et.' },
        { type: 'type', prompt: '«la niña» (de «flicka»):', answer: 'flickan', accept: [], explanation: '«flickan». Termina en -a → +n.' },
        { type: 'type', prompt: '«la manzana» (de «äpple»):', answer: 'äpplet', accept: [], explanation: '«äpplet». «ett» + vocal → +t.' },
        { type: 'type', prompt: '«el día» (de «dag»):', answer: 'dagen', accept: [], explanation: '«dagen». «en» → +en.' },
        { type: 'order', prompt: 'Ordena: «El libro es rojo»', words: ['Boken', 'är', 'röd'], answer: ['Boken', 'är', 'röd'], explanation: '«Boken är röd».' },
        { type: 'order', prompt: 'Ordena: «La casa es grande»', words: ['Huset', 'är', 'stort'], answer: ['Huset', 'är', 'stort'], explanation: '«Huset är stort». (hus es «ett» → stort)' },
        { type: 'order', prompt: 'Ordena: «El coche es nuevo»', words: ['Bilen', 'är', 'ny'], answer: ['Bilen', 'är', 'ny'], explanation: '«Bilen är ny».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 15. ADJETIVOS Y CONCORDANCIA (en röd bil / ett rött hus) (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'adjetivos',
      title: 'Adjetivos y concordancia',
      subtitle: 'en röd bil, ett rött hus, röda bilar. El adjetivo cambia',
      icon: '🎨',
      color: '#EC4899',
      level: 'A',
      keywords: 'adjetivos concordancia adjektiv röd rött röda stor stort stora en ett plural color grande adjetivo concordar',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«un coche rojo» (en bil) → «en ___ bil»', options: ['röd', 'rött', 'röda'], correct: 0, explanation: '«en röd bil». Con palabras «en», el adjetivo va normal: röd. 🎯' },
        { type: 'mc', text: '«una casa roja» (ett hus) → «ett ___ hus»', options: ['rött', 'röd', 'röda'], correct: 0, explanation: '«ett rött hus». Con palabras «ett», el adjetivo suma -t: röd → rött.' },
        { type: 'mc', text: '«coches rojos» (plural) → «___ bilar»', options: ['röda', 'röd', 'rött'], correct: 0, explanation: '«röda bilar». En plural el adjetivo suma -a: röd → röda.' },
        { type: 'mc', text: '«un coche grande» (en bil) → «en ___ bil»', options: ['stor', 'stort', 'stora'], correct: 0, explanation: '«en stor bil». «en» → adjetivo normal: stor.' },
        { type: 'mc', text: '«una casa grande» (ett hus) → «ett ___ hus»', options: ['stort', 'stor', 'stora'], correct: 0, explanation: '«ett stort hus». «ett» → +t: stor → stort.' },
        { type: 'mc', text: '«casas grandes» (plural) → «___ hus»', options: ['stora', 'stort', 'stor'], correct: 0, explanation: '«stora hus». Plural → +a: stora. (hus no cambia en plural)' },
        { type: 'mc', text: '«una manzana verde» (ett äpple) → «ett ___ äpple»', options: ['grönt', 'grön', 'gröna'], correct: 0, explanation: '«ett grönt äpple». «ett» → +t: grön → grönt.' },
        { type: 'mc', text: '«un libro nuevo» (en bok) → «en ___ bok»', options: ['ny', 'nytt', 'nya'], correct: 0, explanation: '«en ny bok». «en» → adjetivo normal: ny.' },
        { type: 'mc', text: '«una casa nueva» (ett hus) → «ett ___ hus»', options: ['nytt', 'ny', 'nya'], correct: 0, explanation: '«ett nytt hus». «ett» → +t: ny → nytt.' },
        { type: 'mc', text: '«flores bonitas» (blommor, plural) → «___ blommor»', options: ['fina', 'fin', 'fint'], correct: 0, explanation: '«fina blommor». Plural → +a: fin → fina.' },
        { type: 'mc', text: 'Con palabras «ett», el adjetivo…', options: ['suma -t (rött)', 'no cambia', 'suma -a'], correct: 0, explanation: 'Con «ett» el adjetivo suma -t: ett rött hus, ett stort hus. Con «en» va normal, en plural suma -a.' },
        { type: 'mc', text: '«El coche es rojo» (en bil) → «Bilen är ___»', options: ['röd', 'rött', 'röda'], correct: 0, explanation: '«Bilen är röd». La palabra es «en bil», así que el adjetivo va normal: röd.' },
        { type: 'mc', text: '«La casa es roja» (ett hus) → «Huset är ___»', options: ['rött', 'röd', 'röda'], correct: 0, explanation: '«Huset är rött». Es «ett hus» → +t: rött.' },
        { type: 'mc', text: '«Los coches son rojos» → «Bilarna är ___»', options: ['röda', 'röd', 'rött'], correct: 0, explanation: '«Bilarna är röda». Plural → +a: röda.' },
        { type: 'type', prompt: 'Completa: «ett ___ hus» (rojo):', answer: 'rött', accept: [], explanation: '«rött». «ett» → +t.' },
        { type: 'type', prompt: 'Completa: «en ___ bil» (grande):', answer: 'stor', accept: [], explanation: '«stor». «en» → normal.' },
        { type: 'type', prompt: 'Completa: «ett ___ hus» (grande):', answer: 'stort', accept: [], explanation: '«stort». «ett» → +t.' },
        { type: 'type', prompt: 'Completa: «___ bilar» (rojos, plural):', answer: 'röda', accept: [], explanation: '«röda». Plural → +a.' },
        { type: 'type', prompt: 'Completa: «ett ___ äpple» (verde):', answer: 'grönt', accept: [], explanation: '«grönt». «ett» → +t.' },
        { type: 'order', prompt: 'Ordena: «El coche es rojo»', words: ['Bilen', 'är', 'röd'], answer: ['Bilen', 'är', 'röd'], explanation: '«Bilen är röd».' },
        { type: 'order', prompt: 'Ordena: «Es una casa grande»', words: ['Det', 'är', 'ett', 'stort', 'hus'], answer: ['Det', 'är', 'ett', 'stort', 'hus'], explanation: '«Det är ett stort hus».' },
        { type: 'order', prompt: 'Ordena: «Tengo un coche rojo»', words: ['Jag', 'har', 'en', 'röd', 'bil'], answer: ['Jag', 'har', 'en', 'röd', 'bil'], explanation: '«Jag har en röd bil».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 16. FUTURO (ska / kommer att) (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'futuro',
      title: 'El futuro (ska / kommer att)',
      subtitle: 'ska = plan que decides · kommer att = predicción',
      icon: '🔮',
      color: '#8B5CF6',
      level: 'B',
      keywords: 'futuro ska kommer att voy a plan prediccion framtid ska kommer imorgon nästa año mañana',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Voy a comer» (un plan) → «Jag ___ äta»', options: ['ska', 'kommer', 'vill'], correct: 0, explanation: '«Jag ska äta». «ska» = voy a (algo que tú decides o planeas). 🎯' },
        { type: 'mc', text: '«Va a llover» (predicción) → «Det ___ att regna»', options: ['kommer', 'ska', 'får'], correct: 0, explanation: '«Det kommer att regna». «kommer att» = va a (algo que pasará, no lo decides tú).' },
        { type: 'mc', text: '«Mañana voy a trabajar» → «Imorgon ___ jag jobba»', options: ['ska', 'kommer', 'är'], correct: 0, explanation: '«Imorgon ska jag jobba». Es un plan → «ska».' },
        { type: 'mc', text: '«Vamos a viajar en verano» → «Vi ___ resa i sommar»', options: ['ska', 'kommer', 'har'], correct: 0, explanation: '«Vi ska resa i sommar». Plan decidido → «ska».' },
        { type: 'mc', text: 'Después de «ska», el verbo va…', options: ['en su forma base (äta)', 'en presente (äter)', 'en pasado (åt)'], correct: 0, explanation: 'Después de «ska» va la forma base (infinitivo): Jag ska äta, Jag ska köpa. 🎯' },
        { type: 'mc', text: '«kommer» necesita ___ antes del verbo', options: ['att', 'och', 'som'], correct: 0, explanation: '«kommer ATT + verbo»: Det kommer att regna. No olvides el «att».' },
        { type: 'mc', text: '¿Cuál expresa un plan/decisión?', options: ['Jag ska plugga', 'Det kommer att snöa', 'Jag pluggade'], correct: 0, explanation: '«Jag ska plugga» = voy a estudiar (lo decido yo). «kommer att» es predicción; «pluggade» es pasado.' },
        { type: 'mc', text: '¿Cuál es una predicción (algo que pasará)?', options: ['Det kommer att snöa', 'Jag ska handla', 'Jag handlade'], correct: 0, explanation: '«Det kommer att snöa» = va a nevar (predicción). «ska handla» es un plan; «handlade» es pasado.' },
        { type: 'mc', text: '«Él va a estudiar sueco» → «Han ___ studera svenska»', options: ['ska', 'skas', 'skar'], correct: 0, explanation: '«Han ska studera svenska». «ska» es igual para todos (jag ska, du ska, han ska).' },
        { type: 'mc', text: '«Voy a comprar pan» → «Jag ska ___ bröd»', options: ['köpa', 'köper', 'köpte'], correct: 0, explanation: '«Jag ska köpa bröd». Tras «ska» va la base: köpa (no köper).' },
        { type: 'mc', text: '«El próximo año voy a mudarme» → «Nästa år ___ jag flytta»', options: ['ska', 'är', 'har'], correct: 0, explanation: '«Nästa år ska jag flytta». Plan → «ska».' },
        { type: 'mc', text: '«No va a funcionar» → «Det ___ inte att fungera»', options: ['kommer', 'ska', 'vill'], correct: 0, explanation: '«Det kommer inte att fungera» = no va a funcionar (predicción).' },
        { type: 'mc', text: '¿Cuál está bien escrito?', options: ['Jag kommer att resa', 'Jag kommer resa att', 'Jag att kommer resa'], correct: 0, explanation: '«Jag kommer att resa». Orden: kommer + att + verbo base.' },
        { type: 'mc', text: '«¿Qué vas a hacer hoy?» → «Vad ___ du göra idag?»', options: ['ska', 'kommer', 'är'], correct: 0, explanation: '«Vad ska du göra idag?». Para planes se usa «ska».' },
        { type: 'type', prompt: '«Voy a» (un plan) en sueco:', answer: 'ska', accept: [], explanation: '«ska» = voy a (plan que decides).' },
        { type: 'type', prompt: 'Completa: «Det ___ att regna» (va a llover):', answer: 'kommer', accept: [], explanation: '«kommer» → Det kommer att regna.' },
        { type: 'type', prompt: 'Después de «ska», «comer» se dice:', answer: 'äta', accept: [], explanation: '«äta» (forma base). Jag ska äta.' },
        { type: 'type', prompt: 'Falta la palabra: «Det kommer ___ regna»:', answer: 'att', accept: [], explanation: '«att». kommer + att + verbo.' },
        { type: 'type', prompt: 'Completa: «Imorgon ska jag ___» (trabajar):', answer: 'jobba', accept: ['arbeta'], explanation: '«jobba» (o «arbeta»). Tras «ska» va la base.' },
        { type: 'order', prompt: 'Ordena: «Voy a estudiar sueco»', words: ['Jag', 'ska', 'studera', 'svenska'], answer: ['Jag', 'ska', 'studera', 'svenska'], explanation: '«Jag ska studera svenska».' },
        { type: 'order', prompt: 'Ordena: «Va a llover mañana»', words: ['Det', 'kommer', 'att', 'regna', 'imorgon'], answer: ['Det', 'kommer', 'att', 'regna', 'imorgon'], explanation: '«Det kommer att regna imorgon».' },
        { type: 'order', prompt: 'Ordena: «Vamos a viajar en verano»', words: ['Vi', 'ska', 'resa', 'i', 'sommar'], answer: ['Vi', 'ska', 'resa', 'i', 'sommar'], explanation: '«Vi ska resa i sommar».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 17. COMPARATIVOS (större / störst) (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'comparativos',
      title: 'Comparativos y superlativos',
      subtitle: 'stor → större → störst · más grande, el más grande',
      icon: '📊',
      color: '#14B8A6',
      level: 'B',
      keywords: 'comparativos superlativos större störst bättre bäst mindre än som mas grande mejor comparar komparation',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«más grande» (de «stor») → ___', options: ['större', 'storare', 'storast'], correct: 0, explanation: '«större» = más grande. Es irregular (no dice «storare»). 🎯' },
        { type: 'mc', text: '«el más grande» (de «stor») → ___', options: ['störst', 'större', 'storast'], correct: 0, explanation: '«störst» = el más grande (superlativo). stor → större → störst.' },
        { type: 'mc', text: '«más rápido» (de «snabb») → ___', options: ['snabbare', 'snabbre', 'snabbast'], correct: 0, explanation: '«snabbare». Los normales suman -are: snabb → snabbare.' },
        { type: 'mc', text: '«el más rápido» (de «snabb») → ___', options: ['snabbast', 'snabbare', 'snabbst'], correct: 0, explanation: '«snabbast». El superlativo normal suma -ast: snabb → snabbast.' },
        { type: 'mc', text: '«mejor» (de «bra») → ___', options: ['bättre', 'braare', 'bäst'], correct: 0, explanation: '«bättre» = mejor. Irregular: bra → bättre → bäst.' },
        { type: 'mc', text: '«el mejor» (de «bra») → ___', options: ['bäst', 'bättre', 'bra'], correct: 0, explanation: '«bäst» = el mejor. bra → bättre → bäst.' },
        { type: 'mc', text: '«más pequeño» (de «liten») → ___', options: ['mindre', 'litenare', 'minst'], correct: 0, explanation: '«mindre» = más pequeño. Irregular: liten → mindre → minst.' },
        { type: 'mc', text: '«mayor / más viejo» (de «gammal») → ___', options: ['äldre', 'gammalare', 'äldst'], correct: 0, explanation: '«äldre» = mayor/más viejo. Irregular: gammal → äldre → äldst.' },
        { type: 'mc', text: '«Ana es más alta QUE Erik» → «Ana är längre ___ Erik»', options: ['än', 'som', 'att'], correct: 0, explanation: '«än» = que (en comparaciones). Ana är längre än Erik. 🎯' },
        { type: 'mc', text: '«Estocolmo es más grande que Malmö» → «Stockholm är ___ än Malmö»', options: ['större', 'störst', 'stor'], correct: 0, explanation: '«större». Comparativo + «än»: större än.' },
        { type: 'mc', text: '«El coche rojo es el más rápido» → «Den röda bilen är ___»', options: ['snabbast', 'snabbare', 'snabb'], correct: 0, explanation: '«snabbast» = el más rápido (superlativo).' },
        { type: 'mc', text: '«más caro» (de «dyr») → ___', options: ['dyrare', 'dyrre', 'dyrast'], correct: 0, explanation: '«dyrare». Normal: dyr → dyrare → dyrast.' },
        { type: 'mc', text: '«menor / más joven» (de «ung») → ___', options: ['yngre', 'ungare', 'yngst'], correct: 0, explanation: '«yngre» = más joven. Irregular: ung → yngre → yngst.' },
        { type: 'mc', text: '«tan grande como» → «lika stor ___»', options: ['som', 'än', 'att'], correct: 0, explanation: '«som». Para igualdad se usa «lika … som»: lika stor som (tan grande como).' },
        { type: 'type', prompt: '«más grande» (de «stor»):', answer: 'större', accept: [], explanation: '«större» (irregular).' },
        { type: 'type', prompt: '«el más grande» (de «stor»):', answer: 'störst', accept: [], explanation: '«störst» (superlativo).' },
        { type: 'type', prompt: '«mejor» (de «bra»):', answer: 'bättre', accept: [], explanation: '«bättre» (irregular).' },
        { type: 'type', prompt: '«que» en una comparación (längre ___ Erik):', answer: 'än', accept: [], explanation: '«än» = que.' },
        { type: 'type', prompt: '«más rápido» (de «snabb»):', answer: 'snabbare', accept: [], explanation: '«snabbare» (+are).' },
        { type: 'order', prompt: 'Ordena: «Ana es más alta que Erik»', words: ['Ana', 'är', 'längre', 'än', 'Erik'], answer: ['Ana', 'är', 'längre', 'än', 'Erik'], explanation: '«Ana är längre än Erik».' },
        { type: 'order', prompt: 'Ordena: «Estocolmo es más grande que Gotemburgo»', words: ['Stockholm', 'är', 'större', 'än', 'Göteborg'], answer: ['Stockholm', 'är', 'större', 'än', 'Göteborg'], explanation: '«Stockholm är större än Göteborg».' },
        { type: 'order', prompt: 'Ordena: «Este coche es el más rápido»', words: ['Den', 'här', 'bilen', 'är', 'snabbast'], answer: ['Den', 'här', 'bilen', 'är', 'snabbast'], explanation: '«Den här bilen är snabbast».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 18. CONJUNCIONES (och / men / eftersom) (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'conjunciones',
      title: 'Conjunciones (och, men, eftersom)',
      subtitle: 'Las palabras que unen frases: y, pero, porque, cuando…',
      icon: '🔗',
      color: '#F97316',
      level: 'B',
      keywords: 'conjunciones och men eller eftersom för att när om konjunktioner y pero o porque que cuando si unir frases',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«y» → ___', options: ['och', 'men', 'eller'], correct: 0, explanation: '«och» = y. Une dos cosas: kaffe och te (café y té). 🎯' },
        { type: 'mc', text: '«pero» → ___', options: ['men', 'och', 'för'], correct: 0, explanation: '«men» = pero. Muestra contraste: trött men glad (cansado pero feliz).' },
        { type: 'mc', text: '«o» → ___', options: ['eller', 'och', 'men'], correct: 0, explanation: '«eller» = o. Da opciones: kaffe eller te (café o té).' },
        { type: 'mc', text: '«porque» → ___', options: ['eftersom', 'men', 'och'], correct: 0, explanation: '«eftersom» = porque (da la razón). También sirve «för».' },
        { type: 'mc', text: '«Creo QUE es bueno» → «Jag tror ___ det är bra»', options: ['att', 'och', 'men'], correct: 0, explanation: '«att» = que (introduce una idea): Jag tror att… (creo que…).' },
        { type: 'mc', text: '«cuando» → ___', options: ['när', 'om', 'och'], correct: 0, explanation: '«när» = cuando: Ring när du kommer (llama cuando llegues).' },
        { type: 'mc', text: '«si» (condición) → ___', options: ['om', 'när', 'att'], correct: 0, explanation: '«om» = si (condición): Om det regnar… (si llueve…).' },
        { type: 'mc', text: '«Quiero café ___ té» (o)', options: ['eller', 'och', 'men'], correct: 0, explanation: '«eller» = o: Jag vill ha kaffe eller te.' },
        { type: 'mc', text: '«Estoy cansado ___ feliz» (pero)', options: ['men', 'och', 'eller'], correct: 0, explanation: '«men» = pero: Jag är trött men glad.' },
        { type: 'mc', text: '«No voy ___ estoy enfermo» (porque)', options: ['eftersom', 'men', 'eller'], correct: 0, explanation: '«eftersom» = porque: Jag går inte eftersom jag är sjuk.' },
        { type: 'mc', text: '«Como ___ tengo hambre» → «Jag äter ___ jag är hungrig» (porque)', options: ['för', 'men', 'och'], correct: 0, explanation: '«för» = porque (coloquial): Jag äter för jag är hungrig. También vale «eftersom».' },
        { type: 'mc', text: '«Voy a casa ___ como» (y)', options: ['och', 'men', 'om'], correct: 0, explanation: '«och» = y: Jag går hem och äter.' },
        { type: 'mc', text: '«Llámame ___ llegas» (cuando)', options: ['när', 'om', 'att'], correct: 0, explanation: '«när» = cuando: Ring mig när du kommer.' },
        { type: 'mc', text: '«Ella dice ___ está feliz» (que)', options: ['att', 'och', 'men'], correct: 0, explanation: '«att» = que: Hon säger att hon är glad.' },
        { type: 'type', prompt: '«y» en sueco:', answer: 'och', accept: [], explanation: '«och» = y.' },
        { type: 'type', prompt: '«pero» en sueco:', answer: 'men', accept: [], explanation: '«men» = pero.' },
        { type: 'type', prompt: '«o» en sueco:', answer: 'eller', accept: [], explanation: '«eller» = o.' },
        { type: 'type', prompt: '«porque» en sueco:', answer: 'eftersom', accept: ['för'], explanation: '«eftersom» (o «för») = porque.' },
        { type: 'type', prompt: '«cuando» en sueco:', answer: 'när', accept: [], explanation: '«när» = cuando.' },
        { type: 'order', prompt: 'Ordena: «Como y bebo»', words: ['Jag', 'äter', 'och', 'dricker'], answer: ['Jag', 'äter', 'och', 'dricker'], explanation: '«Jag äter och dricker».' },
        { type: 'order', prompt: 'Ordena: «Estoy cansado pero feliz»', words: ['Jag', 'är', 'trött', 'men', 'glad'], answer: ['Jag', 'är', 'trött', 'men', 'glad'], explanation: '«Jag är trött men glad».' },
        { type: 'order', prompt: 'Ordena: «Creo que es bueno»', words: ['Jag', 'tror', 'att', 'det', 'är', 'bra'], answer: ['Jag', 'tror', 'att', 'det', 'är', 'bra'], explanation: '«Jag tror att det är bra».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 19. SER Y TENER — vara / ha (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'ser-tener',
      title: 'Ser y tener (vara / ha)',
      subtitle: 'är y har — los dos verbos que más usarás',
      icon: '⭐',
      color: '#EF4444',
      level: 'A',
      keywords: 'ser tener vara ha är har var hade soy es esta tengo tiene edad hambre verbos basicos',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Yo soy» → «Jag ___»', options: ['är', 'har', 'vara'], correct: 0, explanation: '«Jag är» = yo soy/estoy. «är» viene de «vara» y es igual para todos (jag är, du är, han är). ⭐' },
        { type: 'mc', text: '«Yo tengo» → «Jag ___»', options: ['har', 'är', 'ha'], correct: 0, explanation: '«Jag har» = yo tengo. «har» viene de «ha», e igual para todos.' },
        { type: 'mc', text: '«Ella es maestra» → «Hon ___ lärare»', options: ['är', 'har', 'vara'], correct: 0, explanation: '«Hon är lärare». Para profesiones se usa «är» (ser).' },
        { type: 'mc', text: '«Tengo un coche» → «Jag ___ en bil»', options: ['har', 'är', 'ha'], correct: 0, explanation: '«Jag har en bil». Para lo que posees, «har» (tener).' },
        { type: 'mc', text: '«är» ¿qué significa?', options: ['soy / es / está', 'tengo', 'voy'], correct: 0, explanation: '«är» cubre «ser» Y «estar»: una sola palabra para las dos. Jag är trött (estoy cansado), Jag är lärare (soy maestro).' },
        { type: 'mc', text: '«Estoy cansado» → «Jag ___ trött»', options: ['är', 'har', 'vara'], correct: 0, explanation: '«Jag är trött». En sueco «ser» y «estar» son la misma palabra: «är». 🎯' },
        { type: 'mc', text: '«¿Tienes tiempo?» → «___ du tid?»', options: ['Har', 'Är', 'Ha'], correct: 0, explanation: '«Har du tid?». Para preguntar, el verbo va primero.' },
        { type: 'mc', text: '«¿Eres de Suecia?» → «___ du från Sverige?»', options: ['Är', 'Har', 'Vara'], correct: 0, explanation: '«Är du från Sverige?». Origen con «är».' },
        { type: 'mc', text: '«Tengo hambre» en sueco es «Jag ___ hungrig»', options: ['är', 'har', 'ha'], correct: 0, explanation: '¡Sorpresa! En sueco NO se «tiene» hambre, se «es» hambriento: «Jag är hungrig». Usa «är», no «har». 🍽️' },
        { type: 'mc', text: '«Tengo 30 años» → «Jag ___ trettio år»', options: ['är', 'har', 'ha'], correct: 0, explanation: 'La edad va con «är», no con «har»: «Jag är trettio år» (literal: «soy 30 años»). Otro truco que sorprende. 🎂' },
        { type: 'mc', text: '«Nosotros somos amigos» → «Vi ___ vänner»', options: ['är', 'har', 'vara'], correct: 0, explanation: '«Vi är vänner». «är» es igual para todos, también para «vi».' },
        { type: 'mc', text: '«Ellos tienen hijos» → «De ___ barn»', options: ['har', 'är', 'ha'], correct: 0, explanation: '«De har barn». Posesión → «har».' },
        { type: 'mc', text: '«No estoy cansado» → «Jag är ___ trött»', options: ['inte', 'ingen', 'aldrig'], correct: 0, explanation: '«Jag är inte trött». El «no» (inte) va después del verbo «är».' },
        { type: 'mc', text: '«Yo era / estaba» → «Jag ___»', options: ['var', 'är', 'hade'], correct: 0, explanation: '«var» = era/estaba/fui (pasado de «är»). Ej: Jag var trött igår (ayer estaba cansado).' },
        { type: 'mc', text: '«Yo tenía» → «Jag ___»', options: ['hade', 'har', 'var'], correct: 0, explanation: '«hade» = tenía (pasado de «har»). Ej: Jag hade en katt (tenía un gato).' },
        { type: 'type', prompt: '«soy / es / está» (presente):', answer: 'är', accept: [], explanation: '«är» — la misma palabra para ser y estar.' },
        { type: 'type', prompt: '«tengo / tiene» (presente):', answer: 'har', accept: [], explanation: '«har» = tener (presente).' },
        { type: 'type', prompt: 'Completa: «Jag ___ 25 år» (tengo 25 años):', answer: 'är', accept: [], explanation: '«är». La edad va con «är»: Jag är 25 år.' },
        { type: 'type', prompt: '«era / estaba» (pasado):', answer: 'var', accept: [], explanation: '«var» = era/estaba (pasado de är).' },
        { type: 'type', prompt: '«tenía» (pasado):', answer: 'hade', accept: [], explanation: '«hade» = tenía (pasado de har).' },
        { type: 'order', prompt: 'Ordena: «Yo soy maestro»', words: ['Jag', 'är', 'lärare'], answer: ['Jag', 'är', 'lärare'], explanation: '«Jag är lärare».' },
        { type: 'order', prompt: 'Ordena: «Tengo dos hijos»', words: ['Jag', 'har', 'två', 'barn'], answer: ['Jag', 'har', 'två', 'barn'], explanation: '«Jag har två barn».' },
        { type: 'order', prompt: 'Ordena: «¿Tienes tiempo?»', words: ['Har', 'du', 'tid'], answer: ['Har', 'du', 'tid'], explanation: '«Har du tid?».' },
      ]
    },
  ]
};

// ═══════════════════════════════════════════════════════════
//  HÖRFÖRSTÅELSE — Comprensión auditiva (voz de Sophie)
// ═══════════════════════════════════════════════════════════
// audioKey: clave en SOPHIE_AUDIO (base64). null = usa TTS.

const HORST_DATA = {
  levels: {

    // ─── SFI A ───────────────────────────────────────────
    A: [
      {
        id: 'a-01', title: 'Mi mañana', subtitle: 'La rutina diaria de Sophie',
        icon: '🌅', duration: '~25 seg', level: 'A', audioKey: 'a01',
        ttsScript: 'Varje morgon vaknar jag klockan sju. Jag duschar och äter frukost. Jag äter alltid ett ägg och dricker kaffe. Sen tar jag bussen till jobbet. Bussen går klockan åtta. Resan tar tjugo minuter. På jobbet hälsar jag på mina kollegor. Jag börjar arbeta klockan halv nio.',
        questions: [
          { text: '¿A qué hora se despierta Sophie?', options: ['A las 6', 'A las 7', 'A las 8', 'A las 9'], correct: 1, explanation: '"Varje morgon vaknar jag klockan sju" = Cada mañana me despierto a las siete. "Vaknar" = despertarse.' },
          { text: '¿Qué desayuna Sophie siempre?', options: ['Pan y café', 'Un huevo y café', 'Fruta y té', 'Yogur y jugo'], correct: 1, explanation: '"Jag äter alltid ett ägg och dricker kaffe" = Siempre como un huevo y bebo café. "Alltid" = siempre.' },
          { text: '¿Cómo va Sophie al trabajo?', options: ['En coche', 'Caminando', 'En bicicleta', 'En autobús'], correct: 3, explanation: '"Sen tar jag bussen till jobbet" = Luego tomo el autobús al trabajo. "Bussen" = el autobús.' },
          { text: '¿Cuánto dura el viaje?', options: ['10 minutos', '15 minutos', '20 minutos', '30 minutos'], correct: 2, explanation: '"Resan tar tjugo minuter" = El viaje dura veinte minutos. "Resan" = el viaje, "tar" = dura/toma.' },
        ]
      },
      {
        id: 'a-02', title: 'Mi familj', subtitle: 'Sophie habla de su familia',
        icon: '👨‍👩‍👧‍👦', duration: '~25 seg', level: 'A', audioKey: 'a02',
        ttsScript: 'Jag heter Sophie och jag har en liten familj. Min man heter Andree och kommer från Peru. Han är trettio år gammal. Min mamma heter Anna. Hon är sjuttio år gammal. Vi alla bor tillsammans i Stockholm.',
        questions: [
          { text: '¿Cómo se llama el esposo de Sophie?', options: ['Erik', 'Andree', 'Lars', 'Johan'], correct: 1, explanation: '"Min man heter Andree" = Mi esposo se llama Andree. "Min man" = mi esposo/marido.' },
          { text: '¿De dónde viene el esposo de Sophie?', options: ['España', 'Colombia', 'Perú', 'México'], correct: 2, explanation: '"Andree kommer från Peru" = Andree viene de Perú. "Kommer från" = viene de / es de.' },
          { text: '¿Cómo se llama la mamá de Sophie?', options: ['Maria', 'Anna', 'Lena', 'Sofia'], correct: 1, explanation: '"Min mamma heter Anna" = Mi mamá se llama Anna. "Mamma" = mamá.' },
          { text: '¿Cuántos años tiene la mamá de Sophie?', options: ['50 años', '60 años', '70 años', '80 años'], correct: 2, explanation: '"Hon är sjuttio år gammal" = Ella tiene setenta años. "Sjuttio" = 70.' },
        ]
      },
      {
        id: 'a-03', title: 'I affären', subtitle: 'Sophie hace las compras',
        icon: '🛒', duration: '~25 seg', level: 'A', audioKey: 'a03',
        ttsScript: 'Idag handlar jag mat i affären. Jag behöver mjölk, bröd och ägg. Jag tar också lite frukt, äpplen och bananer. Vid kassan frågar kassörskan mig om jag vill betala med kort eller kontant. Jag betalar med kort. Allting kostar 150 kronor. Sedan tar jag mina kassar och går hem.',
        questions: [
          { text: '¿Qué NO compra Sophie?', options: ['Leche', 'Pan', 'Jugo', 'Huevos'], correct: 2, explanation: 'Sophie compra "mjölk" (leche), "bröd" (pan) y "ägg" (huevos). El jugo no lo menciona.' },
          { text: '¿Qué frutas compra?', options: ['Manzanas y naranjas', 'Manzanas y plátanos', 'Peras y uvas', 'Fresas y manzanas'], correct: 1, explanation: '"Äpplen och bananer" = manzanas y plátanos/bananas. "Äpple" = manzana, "banan" = plátano.' },
          { text: '¿Cómo paga Sophie?', options: ['En efectivo', 'Con tarjeta', 'Con Swish', 'No lo dice'], correct: 1, explanation: '"Jag betalar med kort" = Pago con tarjeta. "Kontant" = efectivo, "kort" = tarjeta.' },
          { text: '¿Cuánto paga?', options: ['115 kr', '130 kr', '150 kr', '175 kr'], correct: 2, explanation: '"Etthundra och femtio kronor" = ciento cincuenta coronas. "Etthundra" = cien, "femtio" = cincuenta.' },
        ]
      },
      {
        id: 'a-04', title: 'Vädret idag', subtitle: 'Sophie habla del clima',
        icon: '⛅', duration: '~20 seg', level: 'A', audioKey: 'a04',
        ttsScript: 'Idag är vädret inte så bra. Det är molnigt och kallt. Temperaturen är bara fyra grader. Det regnar lite också. Jag tar med mig ett paraply när jag går ut. På sommaren är det varmt och solen skiner. Men nu är det höst och det blåser mycket.',
        questions: [
          { text: '¿Qué temperatura hace hoy?', options: ['2 grados', '4 grados', '6 grados', '10 grados'], correct: 1, explanation: '"Temperaturen är bara fyra grader" = La temperatura es solo cuatro grados. "Grader" = grados.' },
          { text: '¿Qué lleva Sophie cuando sale?', options: ['Abrigo', 'Gorra', 'Paraguas', 'Bufanda'], correct: 2, explanation: '"Jag tar med mig ett paraply" = Me llevo un paraguas. "Paraply" = paraguas.' },
          { text: '¿Cómo es el verano según Sophie?', options: ['Frío y lluvioso', 'Caliente y soleado', 'Nublado y ventoso', 'Variable'], correct: 1, explanation: '"På sommaren är det varmt och solen skiner" = En verano hace calor y el sol brilla. "Varmt" = caliente.' },
          { text: '¿Qué estación es ahora?', options: ['Primavera', 'Verano', 'Otoño', 'Invierno'], correct: 2, explanation: '"Nu är det höst" = Ahora es otoño. "Höst" = otoño. Las estaciones: vår, sommar, höst, vinter.' },
        ]
      },
      {
        id: 'a-05', title: 'Min lägenhet', subtitle: 'Sophie describe su apartamento',
        icon: '🏠', duration: '~25 seg', level: 'A', audioKey: 'a05',
        ttsScript: 'Jag bor i en trea på Södermalm. Lägenheten har ett kök, ett vardagsrum och två sovrum. Köket är litet men praktiskt. I vardagsrummet har vi en stor soffa och en liten tv. Det finns också en balkong där vi sitter tillsammans på sommaren och grillar. Min hyra är åtta tusen kronor per månad.',
        questions: [
          { text: '¿En qué barrio vive Sophie?', options: ['Östermalm', 'Södermalm', 'Kungsholmen', 'Vasastan'], correct: 1, explanation: '"Jag bor i en trea i Södermalm" = Vivo en un tres habitaciones en Södermalm, barrio de Estocolmo.' },
          { text: '¿Cuántos dormitorios tiene el apartamento?', options: ['1', '2', '3', '4'], correct: 1, explanation: '"Lägenheten har... två sovrum" = El apartamento tiene dos dormitorios. "Sovrum" = dormitorio.' },
          { text: '¿Qué hacen en el balcón en verano?', options: ['Toman café', 'Leen libros', 'Se sientan juntos y hacen barbacoa', 'Hacen yoga'], correct: 2, explanation: '"Vi sitter tillsammans på sommaren och grillar" = Nos sentamos juntos en verano y hacemos barbacoa. "Grilla" = hacer barbacoa/asado.' },
          { text: '¿Cuánto es el alquiler?', options: ['6000 kr', '7000 kr', '8000 kr', '9000 kr'], correct: 2, explanation: '"Hyran är åttatusen kronor i månaden" = El alquiler es ocho mil coronas al mes. "Hyran" = el alquiler.' },
        ]
      },
      {
        id: 'a-06', title: 'Mat jag gillar', subtitle: 'La comida favorita de Sophie',
        icon: '🍝', duration: '~25 seg', level: 'A', audioKey: 'a06',
        ttsScript: 'Jag gillar mat mycket. Min favoriträtt är pasta med tomatsås. Jag lagar mat hemma nästan varje dag. På fredagar äter vi ofta pizza. Det är fredagsmys i Sverige! Jag gillar också svensk mat — köttbullar med potatismos är gott. Men det bästa av allt är kanelbullar med kaffe.',
        questions: [
          { text: '¿Cuál es el plato favorito de Sophie?', options: ['Pizza', 'Pasta con salsa de tomate', 'Albóndigas suecas', 'Kanelbullar'], correct: 1, explanation: '"Min favoriträtt är pasta med tomatsås" = Mi plato favorito es la pasta con salsa de tomate.' },
          { text: '¿Qué comen los viernes?', options: ['Pasta', 'Sopa', 'Pizza', 'Köttbullar'], correct: 2, explanation: '"På fredagar äter vi ofta pizza" = Los viernes comemos pizza a menudo. "Fredagar" = viernes.' },
          { text: '¿Qué es "fredagsmys"?', options: ['Una canción', 'Una tradición sueca del viernes', 'Un tipo de comida', 'Un programa de TV'], correct: 1, explanation: '"Fredagsmys" = tradición sueca de relajarse el viernes con comida y familia. "Fredags" = viernes, "mys" = acogedor.' },
          { text: '¿Qué dice Sophie que es lo mejor de todo?', options: ['Pasta', 'Pizza', 'Köttbullar', 'Kanelbullar con café'], correct: 3, explanation: '"Det bästa av allt är kanelbullar med kaffe" = Lo mejor de todo son los bollos de canela con café.' },
        ]
      },
    ],

    // ─── SFI B ───────────────────────────────────────────
    B: [
      {
        id: 'b-01', title: 'Primera semana en Suecia', subtitle: 'Sophie recuerda su llegada',
        icon: '✈️', duration: '~35 seg', level: 'B', audioKey: 'b01',
        ttsScript: 'Jag minns min första vecka i Sverige mycket väl. Allting var nytt och lite förvirrande. Jag förstod inte så mycket svenska, men folk var snälla och hjälpte mig. Det första jag gjorde var att registrera mig hos Skatteverket för att få ett personnummer. Det tog några dagar. Sen gick jag till Arbetsförmedlingen. Jag var nervös men allt gick bra. Steg för steg lärde jag mig hur Sverige fungerar.',
        questions: [
          { text: '¿Cómo describe Sophie su primera semana?', options: ['Aburrida y sola', 'Nueva y un poco confusa', 'Emocionante y divertida', 'Difícil y triste'], correct: 1, explanation: '"Allting var nytt och lite förvirrande" = Todo era nuevo y un poco confuso. "Förvirrande" = confuso.' },
          { text: '¿Qué fue lo primero que hizo Sophie?', options: ['Ir al banco', 'Registrarse en Skatteverket', 'Buscar trabajo', 'Abrir cuenta bancaria'], correct: 1, explanation: '"Det första jag gjorde var att registrera mig hos Skatteverket" = Lo primero fue registrarme en Skatteverket para el personnummer.' },
          { text: '¿Cómo era la gente según Sophie?', options: ['Fría y distante', 'Ocupada e indiferente', 'Amable y que la ayudaba', 'Curiosa y preguntona'], correct: 2, explanation: '"Folk var snälla och hjälpte mig" = La gente era amable y me ayudaba. "Snälla" = amable/buena.' },
          { text: '¿Cómo aprendió Sophie cómo funciona Suecia?', options: ['Leyendo libros', 'En la escuela', 'Paso a paso', 'Viendo TV'], correct: 2, explanation: '"Steg för steg lärde jag mig hur Sverige fungerar" = Paso a paso aprendí cómo funciona Suecia. "Steg för steg" = paso a paso.' },
        ]
      },
      {
        id: 'b-02', title: 'En dag på jobbet', subtitle: 'Un día de trabajo de Sophie',
        icon: '💼', duration: '~35 seg', level: 'B', audioKey: 'b02',
        ttsScript: 'Jag jobbar på ett lager utanför Stockholm. Jag börjar klockan sex på morgonen, så jag måste stiga upp tidigt. Arbetsdagen slutar klockan tre. På fikarasten, som är klockan nio, dricker vi kaffe och pratar lite. Mina kollegor kommer från många olika länder — det är roligt. Lönen betalas ut den tjugofemte varje månad och jag får också semesterdagar. Jag trivs bra på jobbet.',
        questions: [
          { text: '¿Dónde trabaja Sophie?', options: ['En una tienda', 'En un almacén/bodega', 'En una oficina', 'En un hospital'], correct: 1, explanation: '"Jag jobbar på ett lager" = Trabajo en un almacén/bodega. "Lager" = almacén, bodega.' },
          { text: '¿A qué hora empieza Sophie?', options: ['A las 5', 'A las 6', 'A las 7', 'A las 8'], correct: 1, explanation: '"Jag börjar klockan sex på morgonen" = Empiezo a las seis de la mañana. "Sex" = seis.' },
          { text: '¿Qué pasa durante la fika?', options: ['Trabajan más rápido', 'Toman café y conversan', 'Tienen una reunión', 'Almuerzan'], correct: 1, explanation: '"Dricker vi kaffe och pratar lite" = Tomamos café y conversamos un poco. La fika es una tradición sueca esencial.' },
          { text: '¿Cuándo se paga el salario?', options: ['El día 15', 'El día 20', 'El día 25', 'El último día del mes'], correct: 2, explanation: '"Lönen betalas ut den tjugofemte" = El salario se paga el día veinticinco. "Lönen" = el salario.' },
        ]
      },
      {
        id: 'b-03', title: 'Cómo aprendí sueco', subtitle: 'El camino de Sophie con el idioma',
        icon: '📖', duration: '~35 seg', level: 'B', audioKey: 'b03',
        ttsScript: 'Jag har studerat svenska i ett och ett halvt år. I början var det svårt — grammatiken är annorlunda än spanska. Jag gick på SFI fem dagar i veckan. Hemma försökte jag titta på svenska tv-program med undertexter. Det hjälpte mycket. Jag övade också med mina grannar och på jobbet. Det viktigaste är att inte vara rädd för att göra fel. Alla förstår att man lär sig och är tålmodiga.',
        questions: [
          { text: '¿Cuánto tiempo lleva Sophie estudiando sueco?', options: ['6 meses', '1 año', '1 año y medio', '2 años'], correct: 2, explanation: '"Jag har studerat svenska i ett och ett halvt år" = He estudiado sueco por un año y medio.' },
          { text: '¿Cuántos días por semana iba a SFI?', options: ['2 días', '3 días', '4 días', '5 días'], correct: 3, explanation: '"Jag gick på SFI fem dagar i veckan" = Iba a SFI cinco días a la semana. "Fem" = cinco.' },
          { text: '¿Qué hacía Sophie en casa para practicar?', options: ['Escuchaba música', 'Veía programas de TV con subtítulos', 'Leía libros en sueco', 'Hablaba con una app'], correct: 1, explanation: '"Titta på svenska tv-program med undertexter" = Ver programas de TV suecos con subtítulos.' },
          { text: '¿Cuál es el consejo más importante de Sophie?', options: ['Estudiar cada día', 'No tener miedo de cometer errores', 'Hablar solo con suecos', 'Memorizar gramática'], correct: 1, explanation: '"Det viktigaste är att inte vara rädd för att göra fel" = Lo más importante es no tener miedo de equivocarse.' },
        ]
      },
      {
        id: 'b-04', title: 'Buscar piso en Suecia', subtitle: 'La experiencia de Sophie buscando apartamento',
        icon: '🔑', duration: '~35 seg', level: 'B', audioKey: 'b04',
        ttsScript: 'Att hitta en lägenhet i Sverige kan vara svårt, speciellt i Stockholm. Bostadskön kan ta många år. Men det finns andra alternativ — man kan hyra i andra hand eller leta via privata hyresvärdar. Jag hittade min lägenhet på en hemsida som heter Blocket. Jag kontaktade hyresvärden och fick titta på lägenheten. Vi skrev ett hyreskontrakt och jag fick flytta in den första i månaden.',
        questions: [
          { text: '¿Por qué es difícil encontrar apartamento en Estocolmo?', options: ['Porque son muy caros', 'Porque la cola de vivienda puede tomar años', 'Porque hay pocos edificios', 'Porque piden muchos documentos'], correct: 1, explanation: '"Bostadskön kan ta många år" = La cola de vivienda puede tomar muchos años. "Bostadskön" = lista de espera para vivienda.' },
          { text: '¿Dónde encontró Sophie su apartamento?', options: ['En Hemnet', 'En Blocket', 'A través de un amigo', 'En el trabajo'], correct: 1, explanation: '"Jag hittade min lägenhet på en hemsida som heter Blocket" = Encontré mi apartamento en una web llamada Blocket.' },
          { text: '¿Qué alternativa menciona Sophie aparte de la cola oficial?', options: ['Comprar un apartamento', 'Alquilar de segunda mano o a propietarios privados', 'Compartir piso', 'Vivir en una residencia'], correct: 1, explanation: '"Hyra i andra hand eller leta via privata hyresvärdar" = alquilar de segunda mano o a través de arrendadores privados.' },
          { text: '¿Cuándo pudo mudarse Sophie?', options: ['El día 15 del mes', 'El primero del mes', 'Inmediatamente', 'Después de 3 meses'], correct: 1, explanation: '"Jag fick flytta in den första i månaden" = Me pude mudar el primero del mes. "Flytta in" = mudarse, entrar a vivir.' },
        ]
      },
      {
        id: 'b-05', title: 'Sjukvård i Sverige', subtitle: 'Sophie explica el sistema de salud',
        icon: '🏥', duration: '~35 seg', level: 'B', audioKey: 'b05',
        ttsScript: 'I Sverige har alla rätt till sjukvård. Om man är sjuk ringer man till vårdcentralen och bokar en tid. Man kan också ringa 1177 — det är sjukvårdsrådgivningen — om man behöver råd. Det kostar lite att besöka en läkare, men inte så mycket. Om man har barn är det gratis. Tandvård är lite dyrare. Man betalar aldrig mer än ett visst belopp per år — det kallas högkostnadsskydd.',
        questions: [
          { text: '¿Qué hace uno cuando está enfermo en Suecia?', options: ['Va directamente al hospital', 'Llama a la vårdcentral y pide cita', 'Va a urgencias', 'Llama al médico a casa'], correct: 1, explanation: '"Ringer man till vårdcentralen och bokar en tid" = Se llama al centro de salud y se pide cita. "Bokar" = reservar.' },
          { text: '¿Para qué es el número 1177?', options: ['Para emergencias', 'Para asesoramiento médico', 'Para pedir ambulancia', 'Para pedir medicamentos'], correct: 1, explanation: '"1177 — det är sjukvårdsrådgivningen" = 1177 es la asesoría de salud. Puedes llamar para consejos médicos.' },
          { text: '¿Cuánto cuesta la atención médica para niños?', options: ['Igual que adultos', 'La mitad del precio', 'Gratis', 'No lo menciona'], correct: 2, explanation: '"Om man har barn är det gratis" = Si tienes hijos es gratis. La atención pediátrica no tiene costo en Suecia.' },
          { text: '¿Qué es el "högkostnadsskydd"?', options: ['Un seguro privado', 'Un tope máximo de pago anual', 'Una tarjeta de salud', 'Un descuento en farmacia'], correct: 1, explanation: '"Man betalar aldrig mer än ett visst belopp per år" = Nunca pagas más de cierta cantidad al año. Es el tope de costos.' },
        ]
      },
      {
        id: 'b-06', title: 'Tradiciones suecas', subtitle: 'Sophie comparte sus tradiciones favoritas',
        icon: '🎄', duration: '~30 seg', level: 'B', audioKey: 'b06',
        ttsScript: 'Sverige har många fina traditioner. Midsommar är en av de viktigaste — man dansar runt en majstång och äter sill och jordgubbar. På lucia, den trettonde december, sjunger barn och vuxna lucialåtar med ljus i handen. Jul är också stort — man firar julafton den tjugofjärde december med julmat och julklappar. Och så är det fika förstås — det är en daglig tradition med kaffe och något gott.',
        questions: [
          { text: '¿Qué se hace en Midsommar?', options: ['Se encienden fuegos artificiales', 'Se baila alrededor del majstång y se come arenque y fresas', 'Se intercambian regalos', 'Se va a la iglesia'], correct: 1, explanation: '"Man dansar runt en majstång och äter sill och jordgubbar" = Se baila alrededor del palo y se come arenque y fresas.' },
          { text: '¿Cuándo es la celebración de Lucia?', options: ['El 6 de diciembre', '13 de diciembre', '24 de diciembre', '1 de enero'], correct: 1, explanation: '"Lucia, den trettonde december" = Lucia, el trece de diciembre. "Trettonde" = decimotercero.' },
          { text: '¿Cuándo se celebra Nochebuena en Suecia?', options: ['El 24 de diciembre', 'El 25 de diciembre', 'El 31 de diciembre', 'El 6 de enero'], correct: 0, explanation: '"Man firar julafton den tjugofjärde december" = Se celebra Nochebuena el veinticuatro de diciembre. Como en España.' },
          { text: '¿Qué dice Sophie sobre el fika?', options: ['Es solo para el trabajo', 'Es una tradición diaria con café y algo rico', 'Es solo los domingos', 'Es una comida especial'], correct: 1, explanation: '"Fika är en daglig tradition med kaffe och något gott" = El fika es una tradición diaria con café y algo rico.' },
        ]
      },
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   PRUEBA DE NIVEL (Nivåtest) — Sueco con Sophie
   15 preguntas que SUBEN de dificultad (SFI A → B → C).
   Combina las 4 destrezas: läsförståelse, hörförståelse, skriva, tala.
   Explicaciones en lenguaje simple (que entienda un niño de 6 o alguien de 70).
   Tipos:
     'read'   = läsförståelse  (lee un texto en sueco, elige)
     'listen' = hörförståelse  (escucha a Sophie, elige — el texto NO se ve)
     'mc'     = skriva/gramática (elige la forma correcta escrita)
     'order'  = tala (ordena las palabras para formar la frase que dirías)
═══════════════════════════════════════════════════════════════ */
const LEVEL_TEST = {
  skills: {
    las:   { label: 'Läsförståelse', es: 'Leer',     icon: '📖', color: '#006AA7' },
    hor:   { label: 'Hörförståelse', es: 'Escuchar', icon: '🎧', color: '#0EA5E9' },
    skriv: { label: 'Skriva',        es: 'Escribir',  icon: '✍️', color: '#10B981' },
    tala:  { label: 'Tala',          es: 'Hablar',    icon: '🗣️', color: '#F59E0B' },
  },
  questions: [
    // ───────────────── NIVEL A (básico) ─────────────────
    { nivel: 'A', skill: 'hor', type: 'listen',
      audio: 'Hej! Jag heter Sofia. Jag bor i Stockholm.',
      question: '¿Dónde vive Sofia?',
      options: ['En Estocolmo', 'En Madrid', 'En Oslo'], correct: 0,
      explanation: 'Ella dice «Jag bor i Stockholm» = «Vivo en Estocolmo». La palabra «bor» significa «vivo / vive».' },

    { nivel: 'A', skill: 'las', type: 'read',
      text: 'Det är måndag. Erik går till skolan klockan åtta.',
      question: '¿A qué hora va Erik a la escuela?',
      options: ['A las ocho', 'A las diez', 'A las dos'], correct: 0,
      explanation: '«klockan åtta» = «a las ocho». La palabra «åtta» significa «ocho».' },

    { nivel: 'A', skill: 'skriv', type: 'mc',
      question: 'Elige la forma correcta: «Jag ___ kaffe.» (yo bebo café)',
      options: ['dricker', 'dricka', 'drack'], correct: 0,
      explanation: '«dricker» es el presente: «yo bebo». (dricka = beber; drack = bebí, que es pasado.)' },

    { nivel: 'A', skill: 'skriv', type: 'mc',
      question: '¿en o ett? «___ hus» (una casa)',
      options: ['en', 'ett'], correct: 1,
      explanation: '«ett hus» = una casa. Para decir «la casa» se dice «huset»: termina en -et, señal de «ett».' },

    { nivel: 'A', skill: 'tala', type: 'order',
      question: 'Ordena las palabras para decir «Me llamo María».',
      words: ['jag', 'heter', 'Maria'], answer: ['jag', 'heter', 'Maria'],
      explanation: '«Jag heter Maria» = «Me llamo María». La palabra «heter» significa «me llamo / se llama».' },

    // ───────────────── NIVEL B (intermedio) ─────────────────
    { nivel: 'B', skill: 'las', type: 'read',
      text: 'Igår var jag trött, så jag stannade hemma och vilade.',
      question: '¿Qué hizo ayer esta persona?',
      options: ['Se quedó en casa a descansar', 'Fue a trabajar', 'Salió con amigos'], correct: 0,
      explanation: '«stannade hemma och vilade» = «se quedó en casa y descansó». «Igår» significa «ayer».' },

    { nivel: 'B', skill: 'hor', type: 'listen',
      audio: 'På lördag ska vi åka till Göteborg med tåg.',
      question: '¿Cómo van a viajar a Göteborg?',
      options: ['En tren', 'En coche', 'En avión'], correct: 0,
      explanation: '«med tåg» = «en tren». «tåg» significa «tren». «ska åka» = «van a ir / viajar».' },

    { nivel: 'B', skill: 'skriv', type: 'mc',
      question: 'Elige el pasado: «Igår ___ jag till jobbet.» (ayer fui al trabajo)',
      options: ['gick', 'går', 'gå'], correct: 0,
      explanation: '«gick» = «fui / fue» (pasado de «gå»). «går» es presente («voy / va»).' },

    { nivel: 'B', skill: 'skriv', type: 'mc',
      question: '¿Cómo se pregunta «¿Bebes café?» en sueco?',
      options: ['Dricker du kaffe?', 'Du dricker kaffe?', 'Kaffe du dricker?'], correct: 0,
      explanation: 'En las preguntas, el verbo va primero: «Dricker du kaffe?». Primero «dricker» (bebes), después «du» (tú).' },

    { nivel: 'B', skill: 'tala', type: 'order',
      question: 'Ordena para decir «Voy a comprar mañana».',
      words: ['Jag', 'ska', 'handla', 'imorgon'], answer: ['Jag', 'ska', 'handla', 'imorgon'],
      explanation: '«Jag ska handla imorgon» = «Voy a comprar mañana». «ska» sirve para el futuro («voy a»).' },

    // ───────────────── NIVEL C (avanzado) ─────────────────
    { nivel: 'C', skill: 'las', type: 'read',
      text: 'Även om det regnade, bestämde vi oss för att gå ut, eftersom vi ville träffa våra vänner.',
      question: '¿Por qué salieron?',
      options: ['Porque querían ver a sus amigos', 'Porque hacía sol', 'Porque tenían que trabajar'], correct: 0,
      explanation: '«eftersom vi ville träffa våra vänner» = «porque querían ver a sus amigos». «eftersom» = «porque»; «Även om» = «aunque».' },

    { nivel: 'C', skill: 'hor', type: 'listen',
      audio: 'Jag tycker att svenska är svårt, men jag övar varje dag för att bli bättre.',
      question: '¿Qué hace esta persona cada día?',
      options: ['Practica para mejorar', 'Descansa', 'Ve televisión'], correct: 0,
      explanation: '«jag övar varje dag för att bli bättre» = «practico cada día para mejorar». «övar» = «practico»; «för att» = «para».' },

    { nivel: 'C', skill: 'skriv', type: 'mc',
      question: 'Completa: «Jag stannade hemma ___ jag var sjuk.» (me quedé en casa porque estaba enfermo)',
      options: ['eftersom', 'och', 'eller'], correct: 0,
      explanation: '«eftersom» = «porque» (da la razón). «och» = «y»; «eller» = «o».' },

    { nivel: 'C', skill: 'skriv', type: 'mc',
      question: 'Elige la frase correcta (ella dijo que no viene):',
      options: ['Hon sa att hon inte kommer', 'Hon sa att hon kommer inte', 'Att hon inte kommer hon sa'], correct: 0,
      explanation: 'Después de «att» (que), el «inte» (no) va ANTES del verbo: «...att hon inte kommer» = «...que ella no viene».' },

    { nivel: 'C', skill: 'tala', type: 'order',
      question: 'Ordena para decir «Creo que el sueco es útil».',
      words: ['Jag', 'tycker', 'att', 'svenska', 'är', 'användbart'],
      answer: ['Jag', 'tycker', 'att', 'svenska', 'är', 'användbart'],
      explanation: '«Jag tycker att svenska är användbart» = «Creo que el sueco es útil». «tycker att» = «creo que».' },
  ],
};


// ═══════════════════════════════════════════════════════════
//  THEORY DATA — Sección Teoría (camino del estudiante)
//  Cada unidad: teoría que se LEE (tarjetas) + práctica (reusa GRAMMAR_DATA)
//  Texto 100% original. El libro solo como mapa de temas.
// ═══════════════════════════════════════════════════════════
const THEORY_DATA = {
  units: [
    // ── 0. Bienvenida ───────────────────────────────────────
    {
      id: 'intro-como-funciona',
      title: 'Cómo funciona el sueco',
      subtitle: 'Antes de empezar: 4 cosas que te harán la vida fácil',
      icon: '🌱',
      color: '#0EA5E9',
      level: 'A',
      grammarTopicId: null,
      cards: [
        { title: '¡Bienvenido!', body: 'Vas a aprender sueco paso a paso, como subir una escalera: un escalón a la vez. No tienes que saberlo todo hoy. Solo lee cada lección con calma y luego practica. Si algo no se entiende, se lee otra vez y ya. 🙂' },
        { title: 'Buena noticia #1', body: 'El sueco es <strong>más parecido al español de lo que crees</strong>. Muchas palabras se parecen: <em>station</em> (estación), <em>familj</em> (familia), <em>telefon</em> (teléfono). Ya sabes más sueco del que piensas.' },
        { title: 'Buena noticia #2', body: 'Los verbos en sueco son <strong>fáciles</strong>. En español cambias todo (yo hablo, tú hablas, él habla). En sueco es <strong>igual para todos</strong>: <em>jag talar, du talar, han talar</em>. Una sola forma. ¡Un dolor de cabeza menos!' },
        { title: 'Lo que sí es distinto', body: 'Dos cositas te van a sorprender: <br>1) El «el/la» va <strong>pegado al final</strong> de la palabra (no delante). <br>2) Cada palabra nace con un «un/una» especial: <strong>en</strong> o <strong>ett</strong>. <br>Tranquilo, lo vemos con calma en las próximas lecciones.' },
        { title: 'Cómo estudiar aquí', body: 'Cada lección tiene dos partes: <strong>1) Leer</strong> la teoría (cortita, como esta) y <strong>2) Practicar</strong> con preguntas. Al terminar, la lección queda con su ✓. Sin prisa, sin miedo a fallar: fallar es parte de aprender. ¡Vamos! 💪' },
      ]
    },

    // ── 1. Saludos ──────────────────────────────────────────
    {
      id: 'u-saludos',
      title: 'Saludar y presentarte',
      subtitle: 'Lo primero que dirás cada día',
      icon: '👋',
      color: '#F59E0B',
      level: 'A',
      grammarTopicId: 'saludos',
      cards: [
        { title: 'La palabra mágica', body: 'La palabra más útil del sueco es <strong>Hej</strong> (se dice «jey») = hola. Sirve a cualquier hora y con cualquier persona. Si solo te aprendes una palabra hoy, que sea esta. 👋' },
        { title: 'Según la hora', body: 'También puedes saludar según el momento: <br><strong>God morgon</strong> = buenos días. <br><strong>God dag</strong> = buenas (de día). <br><strong>God kväll</strong> = buenas noches (al saludar). <br><strong>God natt</strong> = buenas noches (al ir a dormir).' },
        { title: 'Para despedirte', body: '<strong>Hej då</strong> = adiós. <br>Curioso, ¿no? <em>Hej</em> solo = hola, pero <em>hej då</em> = adiós. También puedes decir <strong>Vi ses</strong> (nos vemos). 🎯' },
        { title: 'Presentarte', body: 'Para decir tu nombre: <strong>Jag heter…</strong> = me llamo… <br>Ejemplo: <em>Jag heter Ana</em>. <br>Y para preguntar: <strong>Vad heter du?</strong> = ¿cómo te llamas?' },
        { title: 'Cortesía', body: 'Tres palabras que abren puertas: <br><strong>Tack</strong> = gracias. <br><strong>Förlåt</strong> = perdón/lo siento. <br><strong>Ursäkta</strong> = disculpa (para llamar la atención). <br>Con esto ya puedes tener tu primer saludo completo. ¡A practicar! 💪' },
      ]
    },

    // ── 2. Pronombres ───────────────────────────────────────
    {
      id: 'u-pronombres',
      title: 'Las personas: jag, du, han, hon',
      subtitle: 'Quién hace la acción',
      icon: '🧍',
      color: '#7C3AED',
      level: 'A',
      grammarTopicId: 'pronombres-personales',
      cards: [
        { title: '¿Qué es esto?', body: 'Los pronombres son las palabritas que dicen <strong>quién</strong> hace algo: yo, tú, él, ella… En sueco son cortitas y se usan muchísimo. Vale la pena aprenderlas de memoria.' },
        { title: 'Las básicas', body: '<strong>jag</strong> = yo (se dice «ya»). <br><strong>du</strong> = tú. <br><strong>han</strong> = él. <br><strong>hon</strong> = ella. <br>Ojo con estas dos: <em>han</em> (él) y <em>hon</em> (ella) se parecen. Truco: h<strong>o</strong>n con «o» de «mujer». 👩' },
        { title: 'En grupo', body: '<strong>vi</strong> = nosotros. <br><strong>ni</strong> = ustedes. <br><strong>de</strong> = ellos/ellas (se dice «dom»). <br>Sí, <em>de</em> se escribe con «e» pero se pronuncia «dom». El sueco tiene esas sorpresas. 😄' },
        { title: 'Cosas: den y det', body: 'Para las cosas no se usa «él/ella», se usa <strong>den</strong> o <strong>det</strong>. ¿Cuál? Depende de si la palabra es «en» o «ett» (lo vemos pronto). <em>en bil → den</em> (el coche), <em>ett hus → det</em> (la casa).' },
        { title: 'Yo te veo', body: 'Cuando la persona <strong>recibe</strong> la acción, cambian: <em>jag</em> → <strong>mig</strong> (me/a mí), <em>du</em> → <strong>dig</strong> (te/a ti). <br>Ejemplo: <em>Jag ser dig</em> = yo te veo. <em>Hon ser mig</em> = ella me ve. ¡A practicar! 💪' },
      ]
    },

    // ── 3. en / ett ─────────────────────────────────────────
    {
      id: 'u-en-ett',
      title: 'Un y una: en / ett',
      subtitle: '¿en bil o ett hus?',
      icon: '📝',
      color: '#10B981',
      level: 'A',
      grammarTopicId: 'articulos',
      cards: [
        { title: 'La idea', body: 'En español tenemos «un» y «una». En sueco también hay dos, pero se llaman <strong>en</strong> y <strong>ett</strong>. Lo raro: no es cuestión de hombre o mujer. Cada palabra simplemente «nace» con su <em>en</em> o su <em>ett</em>, y se aprende junto con la palabra. 🚗🏠' },
        { title: 'La buena noticia', body: 'No es mitad y mitad: <strong>8 de cada 10 palabras usan «en»</strong>. Así que si dudas, di <em>en</em> y lo más probable es que aciertes. <em>ett</em> es la minoría. <br>Ej: <em>en bil</em> (un coche), <em>en bok</em> (un libro), <em>en katt</em> (un gato).' },
        { title: 'Trucos que no fallan', body: 'Algunas terminaciones te avisan: <br>• Termina en <strong>-a</strong> → casi siempre «en»: <em>en flicka</em> (niña). <br>• Termina en <strong>-ning</strong> o <strong>-het</strong> → siempre «en»: <em>en tidning</em>. <br>• Termina en <strong>-um</strong> → «ett»: <em>ett centrum</em>.' },
        { title: 'Las tramposas', body: 'Casi todo lo que termina en <strong>-a</strong> es «en»… menos tres palabras del cuerpo, que son «ett»: <em>ett öga</em> (ojo), <em>ett öra</em> (oído), <em>ett hjärta</em> (corazón). ❤️ Solo tres; apréndetelas como un chiste y listo.' },
        { title: 'Por qué importa', body: 'El <em>en</em> o <em>ett</em> decide cómo dices «el/la» después: <em>en bil → bilen</em> (el coche), <em>ett hus → huset</em> (la casa). Por eso conviene aprender la palabra siempre con su <em>en</em>/<em>ett</em> pegado. ¡A practicar! 💪' },
      ]
    },

    // ── 4. Forma definida ───────────────────────────────────
    {
      id: 'u-forma-definida',
      title: 'El y la: boken, huset',
      subtitle: 'El artículo va pegado al final',
      icon: '📖',
      color: '#3B82F6',
      level: 'A',
      grammarTopicId: 'forma-definida',
      cards: [
        { title: 'La sorpresa', body: 'En español decimos «<strong>el</strong> libro», con la palabrita delante. En sueco es al revés: «el/la» se <strong>pega al final</strong> de la palabra. <em>bok</em> (libro) → <strong>boken</strong> (el libro). ¡La palabra crece por detrás! 📖' },
        { title: 'Palabras «en»', body: 'Si la palabra es «en», para decir «el/la» le sumas <strong>-en</strong>: <br><em>en bil → bilen</em> (el coche). <br><em>en dag → dagen</em> (el día). <br>Si ya termina en -a, solo sumas <strong>-n</strong>: <em>en flicka → flickan</em> (la niña).' },
        { title: 'Palabras «ett»', body: 'Si la palabra es «ett», le sumas <strong>-et</strong>: <br><em>ett hus → huset</em> (la casa). <br><em>ett bord → bordet</em> (la mesa). <br>Si termina en vocal, solo <strong>-t</strong>: <em>ett äpple → äpplet</em> (la manzana).' },
        { title: 'Un / el', body: 'Fíjate en la diferencia: <br><em>en bil</em> = <strong>un</strong> coche (cualquiera). <br><em>bilen</em> = <strong>el</strong> coche (ese que ya conocemos). <br>Es la misma idea que en español, solo que aquí se pega atrás. ¡A practicar! 💪' },
      ]
    },

    // ── 5. Plurales ─────────────────────────────────────────
    {
      id: 'u-plurales',
      title: 'Muchos: los plurales',
      subtitle: 'Una casa, dos casas',
      icon: '➕',
      color: '#10B981',
      level: 'A',
      grammarTopicId: 'plurales',
      cards: [
        { title: 'La idea', body: 'Plural es cuando hay <strong>más de uno</strong>: una casa → dos casas. En español casi siempre sumamos «-s». En sueco hay varias terminaciones, pero no te asustes: con unos pocos patrones ya te defiendes. ➕' },
        { title: 'Termina en -a → -or', body: 'Las palabras «en» que terminan en <strong>-a</strong> cambian la -a por <strong>-or</strong>: <br><em>en flicka → flickor</em> (niñas). <br><em>en gata → gator</em> (calles). <br>Es el patrón más ordenadito. 🎯' },
        { title: 'El clásico -ar', body: 'Muchísimas palabras «en» suman <strong>-ar</strong>: <br><em>en bil → bilar</em> (coches). <br><em>en hund → hundar</em> (perros). <br>Si dudas con una palabra «en», prueba con <em>-ar</em>: aciertas mucho.' },
        { title: 'Las que no cambian', body: 'Sorpresa: varias palabras «ett» son <strong>iguales</strong> en singular y plural: <br><em>ett hus → två hus</em> (dos casas). <br><em>ett barn → två barn</em> (dos niños). <br>¡Menos trabajo para ti! Las «ett» que terminan en vocal suman -n: <em>ett äpple → äpplen</em>.' },
      ]
    },

    // ── 6. Presente ─────────────────────────────────────────
    {
      id: 'u-presente',
      title: 'Lo que haces ahora: el presente',
      subtitle: '¡Igual para todos!',
      icon: '⏱️',
      color: '#F59E0B',
      level: 'A',
      grammarTopicId: 'presente',
      cards: [
        { title: 'La mejor noticia del sueco', body: 'En español el verbo cambia con cada persona: yo hablo, tú hablas, él habla, nosotros hablamos… En sueco es <strong>igual para todos</strong>: <em>jag talar, du talar, han talar, vi talar</em>. Una sola forma. 🎉' },
        { title: 'La regla', body: 'El presente (lo que pasa ahora) casi siempre termina en <strong>-r</strong>: <br><em>tala → talar</em> (hablar → hablo/hablas/habla). <br><em>bo → bor</em> (vivir → vivo). <br>¿Ves la -r al final? Esa es la señal de «ahora».' },
        { title: 'También para siempre', body: 'El presente sirve para lo de ahora <strong>y</strong> para lo que haces siempre: <br><em>Jag dricker kaffe varje dag</em> = bebo café todos los días. <br>No necesitas otra forma para «costumbres». Práctico, ¿no?' },
        { title: 'Ojo con el pasado', body: 'No confundas: <em>talar</em> = habla (ahora), pero <em>talade</em> = habló (ayer). La <strong>-r</strong> es presente; la <strong>-de</strong> suele ser pasado. Por ahora quédate con: presente = -r. ¡A practicar! 💪' },
      ]
    },

    // ── Ser y tener (vara / ha) ─────────────────────────────
    {
      id: 'u-ser-tener',
      title: 'Ser y tener: vara y ha',
      subtitle: 'är y har, los dos verbos estrella',
      icon: '⭐',
      color: '#EF4444',
      level: 'A',
      grammarTopicId: 'ser-tener',
      cards: [
        { title: 'Los dos más importantes', body: 'Si hay dos verbos que vas a usar todo el día, son <strong>vara</strong> (ser/estar) y <strong>ha</strong> (tener). En presente: <strong>är</strong> (soy/es/está) y <strong>har</strong> (tengo/tiene). Y lo mejor: son <strong>iguales para todos</strong>. ⭐' },
        { title: 'är = ser Y estar', body: 'En español separas «ser» y «estar». En sueco es <strong>una sola palabra</strong>: <strong>är</strong>. <br><em>Jag är lärare</em> = soy maestro. <br><em>Jag är trött</em> = estoy cansado. <br>¡Un problema menos! No tienes que elegir entre ser y estar. 🎯' },
        { title: 'har = tener', body: 'Para lo que <strong>posees</strong> usas <strong>har</strong>: <br><em>Jag har en bil</em> = tengo un coche. <br><em>Har du tid?</em> = ¿tienes tiempo? <br>Igual para todos: jag har, du har, han har, vi har…' },
        { title: '¡Ojo! Hambre y edad', body: 'Aquí el sueco te sorprende. Lo que en español «tienes», en sueco a veces lo «eres»: <br><em>Jag <strong>är</strong> hungrig</em> = tengo hambre (literal: «soy hambriento»). <br><em>Jag <strong>är</strong> 30 år</em> = tengo 30 años. <br>Con hambre, sed y edad → usa <strong>är</strong>, no «har». 🍽️🎂' },
        { title: 'En pasado', body: 'Para contar lo de antes: <br><strong>var</strong> = era/estaba/fui (de «är»). <em>Igår var jag trött</em> (ayer estaba cansado). <br><strong>hade</strong> = tenía (de «har»). <em>Jag hade en katt</em> (tenía un gato). <br>Con estos dos ya te presentas y cuentas tu vida. ¡A practicar! 💪' },
      ]
    },

    // ── 7. Orden de palabras ────────────────────────────────
    {
      id: 'u-orden-palabras',
      title: 'El orden de las palabras',
      subtitle: 'Dónde va cada cosa en la frase',
      icon: '🔀',
      color: '#6366F1',
      level: 'A',
      grammarTopicId: 'orden-palabras',
      cards: [
        { title: 'La base', body: 'La frase normal sueca sigue el orden: <strong>quién + acción + resto</strong>. Igual que el español: <em>Jag (yo) äter (como) frukost (desayuno)</em>. Fácil, empezamos en terreno conocido. 🙂' },
        { title: 'La regla de oro', body: 'El sueco tiene una regla muy querida: <strong>el verbo va SIEMPRE en segundo lugar</strong>. No importa qué pongas primero, la acción va justo después. A esto se le llama la «regla del segundo puesto».' },
        { title: 'Empezar por otra cosa', body: 'Si empiezas por «mañana» o «hoy», el verbo <strong>sigue en segundo lugar</strong>, así que se cambia el orden: <br><em>Imorgon <strong>jobbar</strong> jag</em> = mañana trabajo yo (literal). <br>En español dirías «mañana yo trabajo»; en sueco el verbo se adelanta.' },
        { title: 'El truco', body: 'Piensa en el verbo como el vagón número 2 del tren: pase lo que pase delante, él siempre va segundo. 🚂 Si te acostumbras a eso, hablarás mucho más natural. ¡A practicar! 💪' },
      ]
    },

    // ── 8. Negación ─────────────────────────────────────────
    {
      id: 'u-negacion',
      title: 'Decir que no: inte',
      subtitle: 'No hablo, no quiero, nunca',
      icon: '🚫',
      color: '#EF4444',
      level: 'A',
      grammarTopicId: 'negacion',
      cards: [
        { title: 'La palabra clave', body: 'Para negar algo en sueco usas <strong>inte</strong> = no. <br><em>Jag talar svenska</em> = hablo sueco. <br><em>Jag talar <strong>inte</strong> svenska</em> = no hablo sueco. <br>Una sola palabra y ya niegas. 🚫' },
        { title: '¿Dónde va?', body: 'En una frase normal, <strong>inte</strong> va <strong>después del verbo</strong>: <br><em>Jag <u>förstår</u> inte</em> = no entiendo. <br><em>Han <u>bor</u> inte här</em> = él no vive aquí. <br>Primero la acción, luego el «no».' },
        { title: 'Nunca y nada', body: 'Otras palabras negativas útiles: <br><strong>aldrig</strong> = nunca. <br><strong>ingen / inget</strong> = ningún/nada. <br><em>Jag dricker <strong>aldrig</strong> kaffe</em> = nunca bebo café.' },
        { title: 'Ojo', body: 'A diferencia del español, en sueco <strong>no se dobla</strong> la negación. Nosotros decimos «no tengo nada»; en sueco es una sola negación. Por ahora quédate con <em>inte</em> = no, y ya estás negando bien. ¡A practicar! 💪' },
      ]
    },

    // ── 9. Preguntas ────────────────────────────────────────
    {
      id: 'u-preguntas',
      title: 'Preguntar',
      subtitle: 'Sí/no y las palabras de pregunta',
      icon: '❓',
      color: '#0EA5E9',
      level: 'A',
      grammarTopicId: 'preguntas',
      cards: [
        { title: 'Preguntas de sí/no', body: 'Para preguntar algo de sí o no, solo <strong>pones el verbo primero</strong>: <br><em>Du talar svenska</em> = hablas sueco. <br><em><strong>Talar</strong> du svenska?</em> = ¿hablas sueco? <br>¡No necesitas «¿acaso?» ni nada! Solo adelantas la acción. 🙌' },
        { title: 'Las palabras de pregunta', body: 'Muchas empiezan con <strong>V</strong>, como en español con «qu»: <br><strong>Vad</strong> = qué. <strong>Var</strong> = dónde. <strong>Vem</strong> = quién. <strong>När</strong> = cuándo. <strong>Hur</strong> = cómo. <strong>Varför</strong> = por qué.' },
        { title: 'Cómo se arma', body: 'Palabra de pregunta + verbo + resto: <br><em><strong>Var</strong> bor du?</em> = ¿dónde vives? <br><em><strong>Vad</strong> heter du?</em> = ¿cómo te llamas? <br><em><strong>Hur</strong> mår du?</em> = ¿cómo estás?' },
        { title: 'Truco para recordar', body: 'Casi todas las preguntas suecas empiezan con <strong>V</strong> o <strong>H</strong>. Si quieres preguntar y no recuerdas la palabra, piensa «V de pregunta». Con estas seis ya preguntas casi todo. ¡A practicar! 💪' },
      ]
    },

    // ── 10. Adjetivos ───────────────────────────────────────
    {
      id: 'u-adjetivos',
      title: 'Describir: los adjetivos',
      subtitle: 'en röd bil, ett rött hus',
      icon: '🎨',
      color: '#EC4899',
      level: 'A',
      grammarTopicId: 'adjetivos',
      cards: [
        { title: 'La idea', body: 'Un adjetivo describe: rojo, grande, nuevo. En sueco el adjetivo <strong>cambia un poquito</strong> según la palabra que acompaña. Suena raro, pero son solo tres formas. Vamos con calma. 🎨' },
        { title: 'Con palabras «en»', body: 'Con una palabra «en», el adjetivo va <strong>normal</strong>: <br><em>en <strong>röd</strong> bil</em> = un coche rojo. <br><em>en <strong>stor</strong> hund</em> = un perro grande. <br>Esta es la forma base, sin cambios.' },
        { title: 'Con palabras «ett»', body: 'Con una palabra «ett», el adjetivo suma <strong>-t</strong>: <br><em>ett <strong>rött</strong> hus</em> = una casa roja. <br><em>ett <strong>stort</strong> bord</em> = una mesa grande. <br>Regla corta: «ett» → ponle una -t al adjetivo. 🎯' },
        { title: 'En plural', body: 'Cuando hay varios, el adjetivo suma <strong>-a</strong>: <br><em><strong>röda</strong> bilar</em> = coches rojos. <br><em><strong>stora</strong> hus</em> = casas grandes. <br>Resumen: «en» normal, «ett» +t, plural +a. ¡A practicar! 💪' },
      ]
    },

    // ── 11. Preposiciones de lugar ──────────────────────────
    {
      id: 'u-preposiciones',
      title: 'Dónde están las cosas',
      subtitle: 'en, sobre, bajo, al lado',
      icon: '📍',
      color: '#14B8A6',
      level: 'A',
      grammarTopicId: 'preposiciones',
      cards: [
        { title: 'La idea', body: 'Las preposiciones dicen <strong>dónde</strong> está algo: en, sobre, debajo, al lado. Son palabritas pequeñas pero se usan todo el tiempo. Vamos con las más comunes. 📍' },
        { title: 'Las más usadas', body: '<strong>i</strong> = en (dentro): <em>i huset</em> (en la casa). <br><strong>på</strong> = en/sobre: <em>på bordet</em> (sobre la mesa). <br><strong>under</strong> = debajo: <em>under stolen</em> (debajo de la silla).' },
        { title: 'i o på', body: 'La duda típica: <strong>i</strong> es «dentro de» (i huset, dentro de la casa) y <strong>på</strong> es «encima de» o lugares abiertos (på jobbet, en el trabajo). Con el tiempo te sale solo; por ahora recuerda: <em>i</em> = dentro, <em>på</em> = encima.' },
        { title: 'Más direcciones', body: '<strong>till</strong> = a/hacia: <em>till skolan</em> (a la escuela). <br><strong>från</strong> = de/desde: <em>från Sverige</em> (de Suecia). <br><strong>bredvid</strong> = al lado de. <br>Con estas ya ubicas casi todo. ¡A practicar! 💪' },
      ]
    },

    // ── 12. Números y tiempo ────────────────────────────────
    {
      id: 'u-numeros-tiempo',
      title: 'Números, la hora y los días',
      subtitle: 'Contar y decir cuándo',
      icon: '🔢',
      color: '#8B5CF6',
      level: 'A',
      grammarTopicId: 'numeros-tiempo',
      cards: [
        { title: 'Del 1 al 5', body: 'Empecemos a contar: <br><strong>ett</strong> (1), <strong>två</strong> (2), <strong>tre</strong> (3), <strong>fyra</strong> (4), <strong>fem</strong> (5). <br>Léelos en voz alta un par de veces; se pegan rápido. 🔢' },
        { title: 'Del 6 al 10', body: '<strong>sex</strong> (6), <strong>sju</strong> (7), <strong>åtta</strong> (8), <strong>nio</strong> (9), <strong>tio</strong> (10). <br>Ojo: <em>sju</em> (7) suena como un soplido, «juu». Es uno de los sonidos típicos del sueco.' },
        { title: 'La hora', body: 'Para preguntar la hora: <strong>Hur mycket är klockan?</strong> = ¿qué hora es? <br>Y respondes: <em>Klockan är tre</em> = son las tres. <br><em>klockan</em> = el reloj/la hora.' },
        { title: 'Los días', body: 'Los días terminan en <strong>-dag</strong> (día): <em>måndag</em> (lunes), <em>tisdag</em> (martes)… hasta <em>söndag</em> (domingo). <br>¿Ves el parecido con el inglés? <em>Monday → måndag</em>. ¡A practicar! 💪' },
      ]
    },

    // ── 13. Posesivos ───────────────────────────────────────
    {
      id: 'u-posesivos',
      title: 'Mío y tuyo: los posesivos',
      subtitle: 'min bok, mitt hus, mina böcker',
      icon: '🫰',
      color: '#8B5CF6',
      level: 'B',
      grammarTopicId: 'posesivos',
      cards: [
        { title: 'La idea', body: 'Los posesivos dicen <strong>de quién</strong> es algo: mi, tu, su. En sueco, «mi» tiene <strong>tres formas</strong> según la palabra que acompaña. Suena raro, pero es el mismo truco de siempre: en / ett / plural. 🫰' },
        { title: 'Mi = min / mitt / mina', body: '<strong>min</strong> con palabras «en»: <em>min bok</em> (mi libro). <br><strong>mitt</strong> con palabras «ett»: <em>mitt hus</em> (mi casa). <br><strong>mina</strong> en plural: <em>mina böcker</em> (mis libros). <br>Fíjate: es el mismo patrón que los adjetivos (en / ett+t / plural+a). 🎯' },
        { title: 'Tu = din / ditt / dina', body: 'Igualito, cambiando la primera letra: <br><em>din bok</em> (tu libro), <em>ditt hus</em> (tu casa), <em>dina böcker</em> (tus libros). <br>Si te aprendiste «min», ya te sabes «din». Es copiar y pegar.' },
        { title: 'Su (de él / de ella)', body: 'Estas <strong>no cambian</strong>, ¡qué alivio!: <br><strong>hans</strong> = su/de él: <em>hans bil</em>, <em>hans hus</em>. <br><strong>hennes</strong> = su/de ella: <em>hennes bil</em>, <em>hennes hus</em>. <br>Una sola forma para todo. 😌' },
        { title: 'Nuestro y de ellos', body: '<strong>vår / vårt / våra</strong> = nuestro (sí, también tres formas). <br><strong>deras</strong> = de ellos (no cambia). <br>Ejemplo: <em>vårt hus</em> (nuestra casa), <em>deras barn</em> (sus hijos). ¡A practicar! 💪' },
      ]
    },

    // ── 14. Modales ─────────────────────────────────────────
    {
      id: 'u-modales',
      title: 'Verbos que ayudan: kan, vill, ska',
      subtitle: 'Poder, querer, deber…',
      icon: '🤝',
      color: '#F59E0B',
      level: 'B',
      grammarTopicId: 'modales',
      cards: [
        { title: 'La idea', body: 'Los verbos modales son «ayudantes»: acompañan a otro verbo para decir si <strong>puedes, quieres o debes</strong> hacer algo. En español: puedo comer, quiero comer, debo comer. En sueco funcionan igual de fácil. 🤝' },
        { title: 'La regla de oro', body: 'Después de un modal, el segundo verbo va en su <strong>forma base</strong> (sin -r): <br><em>Jag <strong>kan</strong> simma</em> = puedo nadar. <br><em>Jag <strong>vill</strong> äta</em> = quiero comer. <br>Nunca «kan simmar». El ayudante manda; el otro descansa en su forma base.' },
        { title: 'Los más útiles', body: '<strong>kan</strong> = puedo/sé. <br><strong>vill</strong> = quiero. <br><strong>ska</strong> = voy a (plan). <br><strong>måste</strong> = tengo que. <br><em>Jag måste jobba</em> = tengo que trabajar.' },
        { title: 'Permiso y consejo', body: '<strong>får</strong> = puedo (con permiso): <em>Får jag komma in?</em> = ¿puedo pasar? <br><strong>bör</strong> = debería: <em>Du bör vila</em> = deberías descansar. <br>Con estos ya pides permiso y das consejos. ¡A practicar! 💪' },
      ]
    },

    // ── 15. Pasado ──────────────────────────────────────────
    {
      id: 'u-pasado',
      title: 'Lo que ya pasó: el pasado',
      subtitle: 'Ayer hablé, comí, fui',
      icon: '⏪',
      color: '#0EA5E9',
      level: 'B',
      grammarTopicId: 'pasado',
      cards: [
        { title: 'La idea', body: 'El pasado sirve para contar lo que <strong>ya sucedió</strong>: ayer, la semana pasada. Igual que el presente, en sueco es <strong>una sola forma para todos</strong> (yo, tú, él…). Un dolor de cabeza menos. ⏪' },
        { title: 'La señal: -de / -te', body: 'Muchos verbos hacen el pasado sumando <strong>-de</strong> o <strong>-te</strong>: <br><em>tala → talade</em> (hablé). <br><em>ringa → ringde</em> (llamé). <br><em>köpa → köpte</em> (compré). <br>Si el presente termina en -r, el pasado suele terminar en -de/-te. 🎯' },
        { title: 'Presente vs pasado', body: 'Compara: <br><em>Jag talar</em> = hablo (ahora). <br><em>Jag talade</em> = hablé (ayer). <br>La <strong>-r</strong> es «ahora»; la <strong>-de</strong> es «antes». Un cambiecito y viajas en el tiempo. ⏳' },
        { title: 'Los rebeldes (irregulares)', body: 'Algunos muy comunes cambian a su manera y se aprenden de memoria: <br><em>är → <strong>var</strong></em> (soy → fui/era). <br><em>har → <strong>hade</strong></em> (tengo → tenía). <br><em>går → <strong>gick</strong></em> (voy → fui). <br>Son poquitos pero se usan mucho. ¡A practicar! 💪' },
      ]
    },

    // ── 16. Futuro ──────────────────────────────────────────
    {
      id: 'u-futuro',
      title: 'Lo que va a pasar: el futuro',
      subtitle: 'ska / kommer att',
      icon: '🔮',
      color: '#7C3AED',
      level: 'B',
      grammarTopicId: 'futuro',
      cards: [
        { title: 'La idea', body: 'El futuro es lo que <strong>va a pasar</strong>: mañana, la próxima semana. En sueco hay dos formas y la diferencia es sencilla: una para tus <strong>planes</strong> y otra para tus <strong>predicciones</strong>. 🔮' },
        { title: 'ska = mi plan', body: 'Usa <strong>ska</strong> cuando <strong>tú decides</strong> hacer algo: <br><em>Jag <strong>ska</strong> äta</em> = voy a comer. <br><em>Imorgon ska jag jobba</em> = mañana voy a trabajar. <br>Después de «ska», el verbo va en su forma base (äta, jobba).' },
        { title: 'kommer att = predicción', body: 'Usa <strong>kommer att</strong> para algo que <strong>pasará</strong> (no lo decides tú): <br><em>Det <strong>kommer att</strong> regna</em> = va a llover. <br>Ojo: no olvides el <strong>att</strong> en medio. «kommer att + verbo».' },
        { title: '¿Cuál elijo?', body: 'Truco rápido: si es <strong>tu decisión</strong> → <em>ska</em>. Si es una <strong>predicción del mundo</strong> (el clima, el futuro) → <em>kommer att</em>. <br><em>Jag ska plugga</em> (yo decido) vs <em>Det kommer att snöa</em> (pasará). ¡A practicar! 💪' },
      ]
    },

    // ── 17. Conjunciones ────────────────────────────────────
    {
      id: 'u-conjunciones',
      title: 'Unir ideas: och, men, eftersom',
      subtitle: 'y, pero, porque…',
      icon: '🔗',
      color: '#F97316',
      level: 'B',
      grammarTopicId: 'conjunciones',
      cards: [
        { title: 'La idea', body: 'Las conjunciones son el <strong>pegamento</strong> de las frases: unen dos ideas en una sola. Con unas pocas ya hablas de corrido, en vez de frases sueltas y cortadas. 🔗' },
        { title: 'Las tres básicas', body: '<strong>och</strong> = y: <em>kaffe och te</em> (café y té). <br><strong>men</strong> = pero: <em>trött men glad</em> (cansado pero feliz). <br><strong>eller</strong> = o: <em>te eller kaffe</em> (té o café). <br>Con estas tres ya unes casi todo.' },
        { title: 'Dar razones', body: '<strong>eftersom</strong> = porque (da el motivo): <em>Jag stannar hemma eftersom jag är sjuk</em> = me quedo en casa porque estoy enfermo. <br>En el día a día también se oye mucho <strong>för</strong> con el mismo sentido.' },
        { title: 'Más pegamento', body: '<strong>att</strong> = que: <em>Jag tror att det är bra</em> (creo que está bien). <br><strong>när</strong> = cuando: <em>Ring när du kommer</em>. <br><strong>om</strong> = si: <em>Om det regnar…</em> (si llueve…). <br>¡A practicar! 💪' },
      ]
    },

    // ── 18. Comparativos ────────────────────────────────────
    {
      id: 'u-comparativos',
      title: 'Comparar: más grande, el más grande',
      subtitle: 'stor → större → störst',
      icon: '📊',
      color: '#14B8A6',
      level: 'B',
      grammarTopicId: 'comparativos',
      cards: [
        { title: 'La idea', body: 'Comparar es decir que algo es <strong>más</strong> que otra cosa, o <strong>el más</strong> de todos. En español usamos «más… / el más…». En sueco, en vez de poner una palabra delante, se le <strong>cambia el final</strong> al adjetivo. 📊' },
        { title: 'La regla normal', body: 'Se suma <strong>-are</strong> (más) y <strong>-ast</strong> (el más): <br><em>snabb → snabbare → snabbast</em> (rápido → más rápido → el más rápido). <br><em>dyr → dyrare → dyrast</em> (caro…). <br>Un final y ya comparas. 🎯' },
        { title: 'Los famosos irregulares', body: 'Unos pocos cambian a su manera (muy usados): <br><em>stor → <strong>större → störst</strong></em> (grande). <br><em>bra → <strong>bättre → bäst</strong></em> (bueno → mejor → el mejor). <br><em>liten → <strong>mindre → minst</strong></em> (pequeño). <br>Se aprenden de memoria; son poquitos.' },
        { title: 'La palabra "que"', body: 'Para comparar dos cosas usas <strong>än</strong> (= que): <br><em>Ana är längre <strong>än</strong> Erik</em> = Ana es más alta que Erik. <br><em>Stockholm är större än Malmö</em>. <br>Comparativo + <em>än</em> y listo. ¡A practicar! 💪' },
      ]
    },
  ]
};
