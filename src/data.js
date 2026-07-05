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
      subtitle: 'jag, du, han, hon, vi...',
      icon: '👤',
      color: '#3B82F6',
      level: 'A',
      questions: [
        { text: '¿Cómo se dice "yo" en sueco?', options: ['jag','du','han','vi'], correct: 0, explanation: '"Jag" = yo. Se pronuncia "yag". Es el pronombre de primera persona singular.' },
        { text: '¿Cómo se dice "tú" en sueco?', options: ['jag','du','ni','hon'], correct: 1, explanation: '"Du" = tú. En sueco moderno se usa para todo el mundo — no existe el "usted" formal.' },
        { text: '¿Cómo se dice "él" en sueco?', options: ['hon','den','han','det'], correct: 2, explanation: '"Han" = él. Se usa para personas masculinas.' },
        { text: '¿Cómo se dice "ella" en sueco?', options: ['han','hon','den','hen'], correct: 1, explanation: '"Hon" = ella. Se usa para personas femeninas.' },
        { text: '¿Cuál pronombre significa "nosotros"?', options: ['ni','de','vi','er'], correct: 2, explanation: '"Vi" = nosotros/nosotras. Pronombre de primera persona plural.' },
        { text: '¿Cuál pronombre significa "vosotros/ustedes" (grupo)?', options: ['du','vi','de','ni'], correct: 3, explanation: '"Ni" = vosotros/ustedes en plural.' },
        { text: '¿Cómo se dice "ellos/ellas" en sueco?', options: ['vi','ni','de','dom'], correct: 2, explanation: '"De" = ellos/ellas. En habla informal se dice "dom", pero en escritura formal es "de".' },
        { text: '¿Qué pronombre se usa para cosas de género "en" (inanimadas)?', options: ['det','den','han','hon'], correct: 1, explanation: '"Den" se usa para objetos de género común (en-ord): "bilen" → "den är stor" (el carro → es grande).' },
        { text: '¿Qué pronombre se usa para cosas de género "ett" (neutro)?', options: ['den','det','hen','de'], correct: 1, explanation: '"Det" se usa para objetos de género neutro (ett-ord): "huset" → "det är stort".' },
        { text: 'Completa: "___ heter Maria." (Ella se llama Maria)', options: ['Han','Det','Hon','Den'], correct: 2, explanation: '"Hon heter Maria" = Ella se llama Maria. Usamos "hon" porque Maria es una persona femenina.' },
        { text: 'Completa: "___ bor i Stockholm." (Nosotros vivimos en Estocolmo)', options: ['Ni','Vi','De','Du'], correct: 1, explanation: '"Vi bor i Stockholm" = Nosotros vivimos en Estocolmo.' },
        { text: '¿Cuál es la forma de objeto de "jag"?', options: ['min','mitt','mig','meg'], correct: 2, explanation: '"Mig" es la forma objeto de "jag". Ejemplo: "Han ser mig" = Él me ve.' },
        { text: '¿Cuál es la forma de objeto de "du"?', options: ['dig','deg','din','dej'], correct: 0, explanation: '"Dig" es la forma objeto de "du". "Jag älskar dig" = Te amo.' },
        { text: '¿Qué significa "De pratar svenska"?', options: ['Nosotros hablamos sueco','Ellos hablan sueco','Ustedes hablan sueco','Él habla sueco'], correct: 1, explanation: '"De" = ellos/ellas. "Pratar" = hablan. "De pratar svenska" = Ellos hablan sueco.' },
        { text: '¿Qué significa "hen" en sueco?', options: ['Ella','Él','Pronombre neutro (no binario)','Ellos'], correct: 2, explanation: '"Hen" es un pronombre neutro en cuanto a género, usado para no especificar si es hombre o mujer.' },
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
      subtitle: 'jag arbetar, du bor, han läser...',
      icon: '⚡',
      color: '#F59E0B',
      level: 'A',
      questions: [
        { text: '¿Cómo se forma el presente de los verbos suecos?', options: ['Cambia según la persona como en español','Se agrega -r al infinitivo — igual para TODOS los pronombres','Se agrega -s','No cambia'], correct: 1, explanation: '¡Gran ventaja del sueco! El presente es igual para todos: jag/du/han/vi trabaja(r) = arbetar. Sin conjugar por persona.' },
        { text: '¿Cómo se dice "yo trabajo"? (arbeta = trabajar)', options: ['jag arbeta','jag arbetar','jag arbetare','jag arbetat'], correct: 1, explanation: '"Arbeta" → presente: "arbetar". La misma forma para todos los pronombres.' },
        { text: '¿Cómo se dice "ella lee"? (läsa = leer)', options: ['hon läsar','hon läsa','hon läser','hon lässer'], correct: 2, explanation: '"Läsa" → presente: "läser" (grupo 2 con -er).' },
        { text: '¿Cómo se dice "nosotros vivimos"? (bo = vivir)', options: ['vi bor','vi boar','vi bo','vi bors'], correct: 0, explanation: '"Bo" → presente: "bor". "Vi bor i Sverige" = Vivimos en Suecia.' },
        { text: '¿Cómo se dice "él tiene"? (ha = tener)', options: ['han ha','han havar','han har','han haver'], correct: 2, explanation: '"Ha" → presente: "har". "Han har en bil" = Él tiene un carro.' },
        { text: '¿Cómo se dice "yo soy/estoy"? (vara = ser/estar)', options: ['jag var','jag vara','jag är','jag är vara'], correct: 2, explanation: '"Vara" es irregular. Su presente es "är" para TODOS. "Jag är glad" = Estoy contento/a.' },
        { text: '"Du ___ svenska." (Tú hablas sueco — tala = hablar)', options: ['talar','tala','talas','talen'], correct: 0, explanation: '"Tala" → presente: "talar". "Du talar svenska" = Tú hablas sueco.' },
        { text: '¿Qué significa "Han skriver ett brev"?', options: ['Él escribe una carta','Ella lee un libro','Él escribe un libro','Nosotros escribimos'], correct: 0, explanation: '"Skriver" = escribe (presente de skriva). "Brev" = carta. "Han skriver ett brev" = Él escribe una carta.' },
        { text: '¿Cómo se dice "ellos comen"? (äta = comer)', options: ['de ätar','de ätrar','de äter','de äta'], correct: 2, explanation: '"Äta" → presente: "äter". "De äter middag" = Ellos cenan.' },
        { text: '¿Cuál es el presente de "komma" (venir)?', options: ['kommar','kommer','kommes','komma'], correct: 1, explanation: '"Komma" → presente: "kommer". "Jag kommer från Mexico" = Vengo de México.' },
        { text: '"Jag ___ inte svenska." (No hablo sueco)', options: ['tala','talare','talar','talas'], correct: 2, explanation: '"Talar" es el presente. La negación "inte" va después del verbo: "Jag talar inte svenska."' },
        { text: '¿Qué significa "Vi studerar svenska varje dag"?', options: ['Nosotros estudiamos sueco todos los días','Ellos estudian sueco a veces','Nosotros estudiamos inglés','Yo estudio sueco'], correct: 0, explanation: '"Studerar" = estudiamos. "Varje dag" = todos los días. "Vi" = nosotros.' },
        { text: '¿Cuál es la gran diferencia entre el presente sueco y el español?', options: ['El sueco es más difícil','Cada persona tiene su propia forma','En sueco el verbo NO cambia según la persona','No existe el presente en sueco'], correct: 2, explanation: 'En sueco "jag/du/han/vi/ni/de arbetar" — todos usan la MISMA forma. ¡Mucho más simple!' },
        { text: '¿Cómo se dice "¿Dónde vives tú?"?', options: ['Var bor du?','Var bo du?','Var bor han?','Var boras du?'], correct: 0, explanation: '"Var" = ¿dónde? "Bor" = vive/vives. En preguntas el verbo va antes del pronombre: "Var bor du?"' },
        { text: '¿Cómo se dice "Ella trabaja aquí"? (här = aquí)', options: ['Hon arbetar här','Hon arbeta här','Han arbetar här','Hon arbetar'], correct: 0, explanation: '"Hon arbetar här" = Ella trabaja aquí. Recuerda: mismo "arbetar" para ella que para yo o nosotros.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 4. NEGACIÓN (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'negacion',
      title: 'Negación',
      subtitle: 'inte, ingen, aldrig, nej...',
      icon: '❌',
      color: '#EF4444',
      level: 'A',
      questions: [
        { text: '¿Cuál es la palabra principal para negar un verbo en sueco?', options: ['nej','inte','ingen','inget'], correct: 1, explanation: '"Inte" niega verbos. Va DESPUÉS del verbo: "Jag talar inte svenska" = No hablo sueco.' },
        { text: '¿Dónde va "inte" en la oración?', options: ['Antes del verbo','Al final','Después del verbo conjugado','Al principio'], correct: 2, explanation: '"Inte" va inmediatamente después del verbo conjugado: "Jag förstår inte" = No entiendo.' },
        { text: '¿Qué significa "Jag förstår inte"?', options: ['Yo entiendo','No entiendo','¿Entiendes?','Él no entiende'], correct: 1, explanation: '"Förstår" = entiendo. "Inte" = no. "Jag förstår inte" = No entiendo.' },
        { text: '¿Cuándo se usa "ingen" en lugar de "inte"?', options: ['Para negar verbos','Para negar en-ord sustantivos (ningún/a)','Nunca','Siempre'], correct: 1, explanation: '"Ingen" = ningún/ninguna con en-ord: "Jag har ingen bil" = No tengo ningún carro.' },
        { text: '¿Cuándo se usa "inget" en lugar de "ingen"?', options: ['Para ett-ord','Para en-ord','Para plurales','Nunca'], correct: 0, explanation: '"Inget" con ett-ord: "Jag har inget arbete" = No tengo ningún trabajo. (arbete = ett-ord)' },
        { text: '¿Cuándo se usa "inga"?', options: ['Para en-ord','Para ett-ord','Para plurales','Para verbos'], correct: 2, explanation: '"Inga" con plurales: "Jag har inga pengar" = No tengo dinero (ningún dinero).' },
        { text: '¿Cómo se dice "nunca" en sueco?', options: ['alltid','ibland','aldrig','inte'], correct: 2, explanation: '"Aldrig" = nunca. "Jag dricker aldrig kaffe" = Nunca bebo café.' },
        { text: '¿Cómo se dice "No, gracias" en sueco?', options: ['Tack, nej','Nej, tack','Inte tack','Ingen tack'], correct: 1, explanation: '"Nej, tack" = No, gracias. "Nej" es simplemente "no" como respuesta corta.' },
        { text: '¿Qué significa "Jag är inte trött"?', options: ['Estoy cansado/a','No estoy cansado/a','Él no está cansado','Estamos cansados'], correct: 1, explanation: '"Inte" niega el adjetivo "trött" (cansado/a). "Jag är inte trött" = No estoy cansado/a.' },
        { text: '¿Cómo se dice "Todavía no"?', options: ['Aldrig','Inte ännu','Inte alls','Ingen gång'], correct: 1, explanation: '"Inte ännu" = todavía no / aún no.' },
        { text: '¿Qué significa "Det är inte alls svårt"?', options: ['Es muy difícil','No es nada difícil','Es un poco difícil','¿Es difícil?'], correct: 1, explanation: '"Inte alls" = para nada / en absoluto. "Svårt" = difícil. "Det är inte alls svårt" = No es nada difícil.' },
        { text: 'Elige la oración CORRECTA para "No como carne":', options: ['Jag äter inte kött','Jag inte äter kött','Inte jag äter kött','Jag äter kött inte'], correct: 0, explanation: 'Correcto: "Jag äter inte kött" — el "inte" va DESPUÉS del verbo conjugado.' },
        { text: '¿Cómo se dice "Ella nunca llega tarde"? (sent = tarde)', options: ['Hon kommer aldrig sent','Hon aldrig kommer sent','Aldrig hon kommer sent','Hon inte kommer sent'], correct: 0, explanation: '"Aldrig" va después del verbo: "Hon kommer aldrig sent" = Ella nunca llega tarde.' },
        { text: '¿Qué significa "Nej"?', options: ['Sí','No','Quizás','Gracias'], correct: 1, explanation: '"Nej" = no (respuesta corta). "Ja" = sí. Son las palabras más básicas para responder.' },
        { text: '¿Cómo se dice "No hay nadie aquí"? (ingen/niemand)', options: ['Det finns inte en här','Det finns ingen här','Ingen finns inte','Här är inte ingen'], correct: 1, explanation: '"Det finns ingen här" = No hay nadie aquí. "Finns" = hay/existe. "Ingen" = ninguno/nadie.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 5. PREPOSICIONES BÁSICAS (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'preposiciones',
      title: 'Preposiciones',
      subtitle: 'i, på, till, från, med, för...',
      icon: '📍',
      color: '#8B5CF6',
      level: 'A',
      questions: [
        { text: '¿Qué preposición se usa para estar DENTRO de un lugar?', options: ['på','i','till','vid'], correct: 1, explanation: '"I" = dentro de. "Jag är i Sverige" = Estoy en Suecia. "Jag är i rummet" = Estoy en la habitación.' },
        { text: '¿Cómo se dice "Vivo en Suecia"?', options: ['Jag bor på Sverige','Jag bor i Sverige','Jag bor till Sverige','Jag bor från Sverige'], correct: 1, explanation: 'Para países se usa "i": "Jag bor i Sverige". Para islas: "på Gotland".' },
        { text: '¿Cómo se dice "Voy a Estocolmo"?', options: ['Jag går i Stockholm','Jag går från Stockholm','Jag går till Stockholm','Jag går på Stockholm'], correct: 2, explanation: '"Till" indica dirección/destino. "Jag åker till Stockholm" = Voy a Estocolmo.' },
        { text: '¿Cómo se dice "Soy de México"?', options: ['Jag är till Mexico','Jag är i Mexico','Jag är från Mexico','Jag är av Mexico'], correct: 2, explanation: '"Från" indica origen. "Jag är från Mexico" = Soy de México.' },
        { text: '¿Cómo se dice "Voy con mi amigo"?', options: ['Jag går till min vän','Jag går med min vän','Jag går av min vän','Jag går för min vän'], correct: 1, explanation: '"Med" = con. "Jag reser med min familj" = Viajo con mi familia.' },
        { text: '"El libro está sobre la mesa." (bok=libro, bord=mesa)', options: ['Boken är i bordet','Boken är på bordet','Boken är vid bordet','Boken är till bordet'], correct: 1, explanation: '"På" en superficie: "Boken är på bordet" = El libro está en/sobre la mesa.' },
        { text: '¿Cómo se dice "el lunes" (día específico)?', options: ['i måndag','till måndag','på måndag','för måndag'], correct: 2, explanation: 'Días de la semana usan "på": "på måndag" = el lunes, "på fredag" = el viernes.' },
        { text: '¿Cómo se dice "para mí"?', options: ['med mig','av mig','för mig','om mig'], correct: 2, explanation: '"För" = para (propósito). "Det är för mig" = Es para mí. "Tack för allt" = Gracias por todo.' },
        { text: '¿Cómo se dice "hablar sobre sueco"?', options: ['tala för svenska','tala med svenska','tala om svenska','tala av svenska'], correct: 2, explanation: '"Om" = sobre/acerca de. "Vi pratar om svenska" = Hablamos sobre sueco.' },
        { text: '¿Qué significa "utan"?', options: ['con','sin','sobre','desde'], correct: 1, explanation: '"Utan" = sin. "Kaffe utan socker" = Café sin azúcar.' },
        { text: '¿Cómo se dice "en casa de Ana"?', options: ['i Anas hem','på Anas hem','hos Ana','vid Ana'], correct: 2, explanation: '"Hos" = en casa de / donde. "Jag är hos Ana" = Estoy en casa de Ana.' },
        { text: '¿Cuál es la diferencia entre "i Sverige" y "till Sverige"?', options: ['No hay diferencia','"i" = estás ahí, "till" = vas hacia allá','"till" = vienes de allá','Son sinónimos'], correct: 1, explanation: '"Jag bor i Sverige" = Vivo en Suecia. "Jag åker till Sverige" = Voy a Suecia. ¡Importante!' },
        { text: '¿Cómo se dice "en el segundo piso"?', options: ['i andra våningen','på andra våningen','till andra våningen','vid andra våningen'], correct: 1, explanation: 'Los pisos usan "på": "på andra våningen" = en el segundo piso.' },
        { text: '"Vi ses ___ måndag." (Nos vemos el lunes)', options: ['i','till','på','från'], correct: 2, explanation: '"På måndag" = el lunes. Días de la semana siempre con "på".' },
        { text: '¿Cómo se dice "desde las 8 hasta las 5"? (till = hasta)', options: ['från åtta för fem','från åtta till fem','i åtta på fem','med åtta till fem'], correct: 1, explanation: '"Från... till..." = desde... hasta... "Från åtta till fem" = Desde las ocho hasta las cinco.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 6. HACER PREGUNTAS (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'preguntas',
      title: 'Hacer preguntas',
      subtitle: 'vad, vem, var, när, hur...',
      icon: '❓',
      color: '#EC4899',
      level: 'A',
      questions: [
        { text: '¿Cómo se dice "¿Qué?" en sueco?', options: ['Vem','Var','Vad','Hur'], correct: 2, explanation: '"Vad" = qué. "Vad gör du?" = ¿Qué haces? "Vad heter du?" = ¿Cómo te llamas? (literalmente ¿qué te llamas?)' },
        { text: '¿Cómo se dice "¿Quién?" en sueco?', options: ['Vad','Vem','Var','När'], correct: 1, explanation: '"Vem" = quién. "Vem är du?" = ¿Quién eres?' },
        { text: '¿Cómo se dice "¿Dónde?" en sueco?', options: ['Hur','När','Vad','Var'], correct: 3, explanation: '"Var" = dónde. "Var bor du?" = ¿Dónde vives?' },
        { text: '¿Cómo se dice "¿Cuándo?" en sueco?', options: ['Varför','Hur','När','Var'], correct: 2, explanation: '"När" = cuándo. "När börjar kursen?" = ¿Cuándo empieza el curso?' },
        { text: '¿Cómo se dice "¿Cómo?" en sueco?', options: ['Vad','Vem','Hur','Vilken'], correct: 2, explanation: '"Hur" = cómo. "Hur mår du?" = ¿Cómo estás?' },
        { text: '¿Cómo se dice "¿Por qué?" en sueco?', options: ['Hur','Varför','Vad för','Vilket'], correct: 1, explanation: '"Varför" = por qué (var + för). "Varför studerar du svenska?" = ¿Por qué estudias sueco?' },
        { text: '¿Cómo se dice "¿Cuánto cuesta?"', options: ['Hur många kostar det?','Hur mycket kostar det?','Vad kostar många?','Vem kostar det?'], correct: 1, explanation: '"Hur mycket" = cuánto (precio/cantidad). "Hur mycket kostar det?" = ¿Cuánto cuesta?' },
        { text: '¿Cómo se pregunta la edad en sueco?', options: ['Hur mycket år har du?','Hur gammal är du?','Hur många år kostar?','Vad gammal är du?'], correct: 1, explanation: '"Hur gammal är du?" = ¿Cuántos años tienes? (literalmente: ¿Cuán mayor eres?)' },
        { text: '¿Cómo se dice "¿Cómo estás?"', options: ['Vad mår du?','Hur är du?','Hur mår du?','Vem mår du?'], correct: 2, explanation: '"Hur mår du?" = ¿Cómo estás? La respuesta típica: "Bra, tack!" = ¡Bien, gracias!' },
        { text: '¿Qué significa "Varifrån kommer du?"', options: ['¿A dónde vas?','¿De dónde eres/vienes?','¿Cuándo llegas?','¿Con quién vas?'], correct: 1, explanation: '"Varifrån" = de dónde (var+ifrån). "Varifrån kommer du?" = ¿De dónde eres?' },
        { text: '¿Cómo se hace una pregunta de sí/no en sueco?', options: ['Se agrega "¿" al principio','Se empieza con el verbo','Se agrega "eller" al final','Se usa "om"'], correct: 1, explanation: 'Para sí/no, el verbo va primero: "Talar du svenska?" = ¿Hablas sueco?' },
        { text: '¿Qué significa "Vad gör du?"', options: ['¿Qué tienes?','¿Cómo te llamas?','¿Qué haces?','¿Dónde estás?'], correct: 2, explanation: '"Gör" = hace (presente de göra). "Vad gör du?" = ¿Qué haces? También sirve para preguntar la profesión.' },
        { text: '¿Cuál es la estructura correcta de una pregunta en sueco?', options: ['Pronombre + verbo','Verbo + sujeto','Palabra interrogativa + verbo + sujeto','Sujeto + verbo + interrogativo'], correct: 2, explanation: 'En preguntas: palabra interrogativa → verbo → sujeto. "Var bor du?" (¿Dónde vives tú?)' },
        { text: '¿Cuál es la diferencia entre "Var" y "Vart"?', options: ['No hay diferencia','"Var" = ubicación estática, "Vart" = movimiento con destino','Son intercambiables','"Vart" es más formal'], correct: 1, explanation: '"Var bor du?" = ¿Dónde vives? "Vart åker du?" = ¿A dónde vas? (con movimiento)' },
        { text: '¿Cómo se dice "¿Cómo te llamas?"', options: ['Vad heter du?','Vem är du?','Hur heter du?','A y C son correctas'], correct: 3, explanation: 'Tanto "Vad heter du?" como "Hur heter du?" son correctas. La respuesta: "Jag heter..." = Me llamo...' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 7. NÚMEROS Y TIEMPO (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'numeros-tiempo',
      title: 'Números y tiempo',
      subtitle: 'ett, två, tre... måndag, januari...',
      icon: '🔢',
      color: '#06B6D4',
      level: 'A',
      questions: [
        { text: '¿Cuánto es "tjugo" en español?', options: ['10','20','12','30'], correct: 1, explanation: '"Tjugo" = 20. Números: ett, två, tre, fyra, fem, sex, sju, åtta, nio, tio...' },
        { text: '¿Cómo se dice "50" en sueco?', options: ['femtio','fimtio','femten','fyrtio'], correct: 0, explanation: '"Femtio" = 50. 40=fyrtio, 50=femtio, 60=sextio, 70=sjuttio, 80=åttio, 90=nittio.' },
        { text: '¿Cómo se pregunta la hora en sueco?', options: ['Vad är klockan?','Hur är klockan?','Var är klockan?','När är klockan?'], correct: 0, explanation: '"Vad är klockan?" = ¿Qué hora es? Respuesta: "Klockan är tre" = Son las tres.' },
        { text: '¿Qué significa "halv fyra"?', options: ['Las cuatro en punto','Las cuatro y media','Las tres y media','Las cuatro y cuarto'], correct: 2, explanation: '¡Cuidado! "Halv fyra" = las TRES y media (mitad del camino hacia las cuatro). "Halv tre" = las dos y media.' },
        { text: '¿Cómo se dice "lunes" en sueco?', options: ['tisdag','måndag','fredag','onsdag'], correct: 1, explanation: 'Los días: måndag(L), tisdag(M), onsdag(X), torsdag(J), fredag(V), lördag(S), söndag(D).' },
        { text: '¿Cómo se dice "enero" en sueco?', options: ['juni','juli','januari','mars'], correct: 2, explanation: 'Los meses: januari, februari, mars, april, maj, juni, juli, augusti, september, oktober, november, december.' },
        { text: '¿Qué significa "förra veckan"?', options: ['La próxima semana','Esta semana','La semana pasada','Todas las semanas'], correct: 2, explanation: '"Förra" = pasado/anterior. "Förra veckan" = la semana pasada. "Förra månaden" = el mes pasado.' },
        { text: '¿Cómo se dice "mañana" en sueco?', options: ['igår','idag','imorgon','ikväll'], correct: 2, explanation: '"Imorgon" = mañana. "Idag" = hoy. "Igår" = ayer. "Ikväll" = esta noche.' },
        { text: '¿Cómo se dice "el viernes" (día específico)?', options: ['i fredag','till fredag','på fredag','med fredag'], correct: 2, explanation: 'Los días de la semana usan "på": "på fredag" = el viernes.' },
        { text: '¿Cuánto es "hundra" en sueco?', options: ['10','1000','100','50'], correct: 2, explanation: '"Hundra" = 100. "Tusen" = 1000. "Trettiofem" = 35.' },
        { text: '¿Cómo se dice "el fin de semana"?', options: ['veckodag','helgen','veckoslut','weekenden'], correct: 1, explanation: '"Helgen" = el fin de semana. "I helgen" = este fin de semana.' },
        { text: '¿Cómo se dice "a las cuatro y cuarto"?', options: ['Klockan fyra och kvart','Kvart över fyra','Kvart i fyra','Fyra kvart'], correct: 1, explanation: '"Kvart över fyra" = cuatro y cuarto. "Kvart i fyra" = cuarto para las cuatro (3:45). "Över"=pasada, "i"=para.' },
        { text: '¿Cuántos meses tiene "ett halvår"?', options: ['3','6','4','12'], correct: 1, explanation: '"Halvår" = semestre = 6 meses. "Kvartal" = trimestre = 3 meses.' },
        { text: '¿Cómo se dice "el primero de enero"?', options: ['En januari','Första januari','Ettans januari','Januari ett'], correct: 1, explanation: 'Las fechas usan ordinales: "första" (1ro), "andra" (2do), "tredje" (3ro)...' },
        { text: '¿Cómo se dice "esta tarde" en sueco?', options: ['i morse','imorgon','i eftermiddag','igår'], correct: 2, explanation: '"I eftermiddag" = esta tarde. "I morse" = esta mañana. "I kväll" = esta noche.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 8. PRONOMBRES POSESIVOS (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'posesivos',
      title: 'Pronombres posesivos',
      subtitle: 'min/mitt/mina, din/ditt/dina...',
      icon: '💼',
      color: '#7C3AED',
      level: 'B',
      questions: [
        { text: '¿Cuáles son las tres formas del posesivo "mi/mis" en sueco?', options: ['mi, mis, mios','min, mitt, mina','min, mina, minen','din, ditt, dina'], correct: 1, explanation: 'Los posesivos cambian según el género del sustantivo: "min" (en-ord), "mitt" (ett-ord), "mina" (plural).' },
        { text: '¿Cuándo se usa "min" versus "mitt"?', options: ['masculino/femenino','min para en-ord, mitt para ett-ord','Son intercambiables','min singular, mitt plural'], correct: 1, explanation: '"Min" con en-ord: "min bil", "min bror". "Mitt" con ett-ord: "mitt hus", "mitt arbete".' },
        { text: '¿Cómo se dice "mi madre"? (mamma = en-ord)', options: ['mitt mamma','mina mamma','min mamma','mins mamma'], correct: 2, explanation: '"Mamma" es en-ord → "min mamma". "Min mamma heter Maria" = Mi mamá se llama Maria.' },
        { text: '¿Cómo se dice "mi trabajo"? (arbete = ett-ord)', options: ['min arbete','mitt arbete','mina arbete','mins arbete'], correct: 1, explanation: '"Arbete" es ett-ord → "mitt arbete". "Jag gillar mitt arbete" = Me gusta mi trabajo.' },
        { text: '¿Cómo se dice "mis amigos"? (vänner = amigos, plural)', options: ['min vänner','mitt vänner','mina vänner','mins vänner'], correct: 2, explanation: 'Para plurales siempre "mina". "Mina vänner bor i Göteborg" = Mis amigos viven en Göteborg.' },
        { text: '¿Cómo se dice "tu casa"? (hus = ett-ord)', options: ['din hus','ditt hus','dina hus','dens hus'], correct: 1, explanation: '"Din" (en-ord), "ditt" (ett-ord), "dina" (plural) — igual que min/mitt/mina pero para tú.' },
        { text: '¿Cómo se dice "su carro" refiriéndose a él?', options: ['sin bil','hans bil','hens bil','deras bil'], correct: 1, explanation: '"Hans" = su (de él). No cambia. "Hans bil är röd" = Su carro (de él) es rojo.' },
        { text: '¿Cómo se dice "su trabajo" refiriéndose a ella?', options: ['hans arbete','sin arbete','hennes arbete','hons arbete'], correct: 2, explanation: '"Hennes" = su (de ella). "Hennes arbete är viktig" = Su trabajo (de ella) es importante.' },
        { text: '¿Cuándo se usa "sin/sitt/sina" en lugar de "hans/hennes"?', options: ['Cuando el sujeto es femenino','Cuando el sujeto ES el poseedor (reflexivo)','Solo con objetos','En plural'], correct: 1, explanation: '"Sin/sitt/sina" es reflexivo: el sujeto posee el objeto. "Han tar sin bil" = Él toma su (propio) carro.' },
        { text: '"Han älskar ___ fru." (Él ama a su propia esposa)', options: ['hans','sin','hennes','deras'], correct: 1, explanation: 'El sujeto (han) ama a su propia esposa → reflexivo "sin". "Han älskar sin fru".' },
        { text: '¿Cómo se dice "nuestro/a" para en-ord en sueco?', options: ['vårt','våra','vår','vars'], correct: 2, explanation: '"Vår" (en-ord), "vårt" (ett-ord), "våra" (plural) = nuestro/a/os.' },
        { text: '¿Cómo se dice "nuestro trabajo"? (arbete = ett-ord)', options: ['vår arbete','vårt arbete','våra arbete','vår arbetets'], correct: 1, explanation: '"Arbete" es ett-ord → "vårt". "Vårt arbete är viktigt" = Nuestro trabajo es importante.' },
        { text: '¿Cómo se dice "su carro" cuando son ellos los dueños?', options: ['sin bil','hans bil','deras bil','eras bil'], correct: 2, explanation: '"Deras" = su (de ellos/ellas). No cambia nunca. "Deras bil är ny" = Su carro (de ellos) es nuevo.' },
        { text: '"Vi gillar ___ lärare." (Nos gusta nuestra profesora — lärare = en-ord)', options: ['vårt','vår','våra','er'], correct: 1, explanation: '"Lärare" es en-ord → "vår". "Vi gillar vår lärare" = Nos gusta nuestra profesora.' },
        { text: '¿Qué es lo más difícil de los posesivos para hispanohablantes?', options: ['Que "hans" cambia mucho','Que min/mitt/mina cambian según el género del sustantivo','Que "deras" es largo','Que vår suena raro'], correct: 1, explanation: 'El mayor reto: "mi/tu/nuestro" etc. cambian según el sustantivo que acompañan (en/ett/plural) — algo que no existe en español.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 9. VERBOS EN PASADO (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'pasado',
      title: 'Verbos en pasado',
      subtitle: 'arbetade, kom, åt, var...',
      icon: '⏰',
      color: '#059669',
      level: 'B',
      questions: [
        { text: '¿Cómo se forma el pasado de verbos del grupo 1 (más comunes)?', options: ['Se agrega -ade al infinitivo','Se agrega -te','Cambian completamente','No cambian'], correct: 0, explanation: 'Grupo 1 (-ade): "arbeta" → "arbetade" (trabajé). Este es el grupo más grande y regular.' },
        { text: '¿Cuál es el pasado de "arbeta" (trabajar)?', options: ['arbetat','arbetade','arbetas','arbetarer'], correct: 1, explanation: '"Arbeta" (grupo 1) → pasado: "arbetade". La misma forma para todos los pronombres.' },
        { text: '¿Cuál es el pasado de "vara" (ser/estar)?', options: ['varde','varade','var','vars'], correct: 2, explanation: '"Vara" es irregular. Su pasado es "var". "Jag var trött igår" = Estaba cansado/a ayer.' },
        { text: '¿Cuál es el pasado de "ha" (tener)?', options: ['hava','hade','har','havde'], correct: 1, explanation: '"Ha" → pasado: "hade". "Jag hade en hund när jag var liten" = Tenía un perro cuando era pequeño/a.' },
        { text: '¿Cuál es el pasado de "komma" (venir/llegar)?', options: ['kommade','kommade','kom','kommet'], correct: 2, explanation: '"Komma" es fuerte (irregular). Pasado: "kom". "Han kom sent" = Él llegó tarde.' },
        { text: '¿Cuál es el pasado de "äta" (comer)?', options: ['ätade','åt','ätte','ätede'], correct: 1, explanation: '"Äta" es irregular. Pasado: "åt". "Jag åt lunch klockan tolv" = Comí el almuerzo a las doce.' },
        { text: '¿Cuál es el pasado de "skriva" (escribir)?', options: ['skrivade','skrivte','skrev','skriven'], correct: 2, explanation: '"Skriva" es fuerte. Pasado: "skrev". "Jag skrev ett brev" = Escribí una carta.' },
        { text: '¿Cuál es el pasado de "göra" (hacer)?', options: ['gördade','görte','gjorde','görat'], correct: 2, explanation: '"Göra" → pasado: "gjorde" (se pronuncia "yorde"). "Vad gjorde du igår?" = ¿Qué hiciste ayer?' },
        { text: '¿Cuál es la gran ventaja del pasado sueco vs el español?', options: ['Tiene menos tiempos','La misma forma para TODOS los pronombres','Todos los verbos son regulares','No hay irregulares'], correct: 1, explanation: '¡Igual que el presente! En sueco el pasado tiene UNA SOLA FORMA: jag/du/han/vi/ni/de "arbetade". Sin conjugaciones.' },
        { text: '¿Qué significa "Vi reste till Sverige förra året"?', options: ['Viajaremos a Suecia','Viajamos a Suecia el año pasado','Vivimos en Suecia','Viajamos este año'], correct: 1, explanation: '"Reste" = viajamos (pasado de resa). "Förra året" = el año pasado.' },
        { text: '¿Cómo se dice "No trabajé ayer"? (igår = ayer)', options: ['Jag inte arbetade igår','Jag arbetade inte igår','Jag aldrig arbetade igår','Inte jag arbetade igår'], correct: 1, explanation: '"Inte" va después del verbo también en pasado: "Jag arbetade inte igår".' },
        { text: '¿Cuál es el pasado de "köpa" (comprar)?', options: ['köpade','köpte','köpede','köpade'], correct: 1, explanation: '"Köpa" (grupo 2) → pasado con "-te": "köpte". "Jag köpte nya skor" = Compré zapatos nuevos.' },
        { text: '¿Cómo se dice "¿Qué hiciste el fin de semana?"', options: ['Vad gör du i helgen?','Vad gjorde du i helgen?','Vad görade du i helgen?','Vad gick du i helgen?'], correct: 1, explanation: '"Gjorde" = hiciste (pasado de göra). "I helgen" = el fin de semana (pasado).' },
        { text: '¿Cuál es el pasado de "gå" (ir/caminar)?', options: ['gådde','gick','gåade','gick'], correct: 1, explanation: '"Gå" → pasado fuerte: "gick". "Jag gick till affären" = Fui a la tienda (caminando).' },
        { text: '¿Cuál es el pasado de "se" (ver)?', options: ['sådde','seade','såg','sade'], correct: 2, explanation: '"Se" → pasado fuerte: "såg". "Jag såg en film igår" = Vi una película ayer.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 10. VERBOS MODALES (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'modales',
      title: 'Verbos modales',
      subtitle: 'kan, vill, ska, måste, får...',
      icon: '🔮',
      color: '#F97316',
      level: 'B',
      questions: [
        { text: '¿Qué sigue después de un verbo modal en sueco?', options: ['Infinitivo con "att"','Infinitivo SIN "att"','Presente del verbo','Participio'], correct: 1, explanation: 'Después de un modal, el verbo principal va en INFINITIVO sin "att". "Jag kan tala svenska" (NO "att tala").' },
        { text: '¿Cómo se dice "Puedo hablar sueco" (capacidad)?', options: ['Jag vill tala','Jag ska tala','Jag kan tala svenska','Jag måste tala'], correct: 2, explanation: '"Kan" = poder (ser capaz). "Jag kan tala svenska" = Puedo/Sé hablar sueco.' },
        { text: '¿Cómo se dice "Quiero aprender sueco"?', options: ['Jag kan lära mig svenska','Jag vill lära mig svenska','Jag ska lära svenska','Jag måste lär svenska'], correct: 1, explanation: '"Vill" = querer. "Jag vill lära mig svenska" = Quiero aprender sueco.' },
        { text: '¿Cómo se dice "Tengo que trabajar mañana"?', options: ['Jag vill arbeta imorgon','Jag ska arbeta imorgon','Jag måste arbeta imorgon','Jag får arbeta imorgon'], correct: 2, explanation: '"Måste" = tener que (obligación). "Jag måste arbeta imorgon" = Tengo que trabajar mañana.' },
        { text: '¿Cuál es la diferencia entre "kan" y "får"?', options: ['No hay diferencia','"kan" = capacidad, "får" = permiso','"får" = capacidad, "kan" = permiso','Son sinónimos'], correct: 1, explanation: '"Kan" = poder (soy capaz): "Jag kan simma" = Sé nadar. "Får" = poder (permiso): "Får jag gå?" = ¿Puedo irme?' },
        { text: '¿Cómo se pide permiso en sueco?', options: ['Kan jag använda toaletten?','Vill jag använda toaletten?','Får jag använda toaletten?','Ska jag använda toaletten?'], correct: 2, explanation: 'Para pedir permiso: "Får jag...?" = ¿Puedo...? / ¿Me permites...?' },
        { text: '¿Cómo se dice "Voy a estudiar sueco"?', options: ['Jag vill studera svenska','Jag ska studera svenska','Jag kan studera svenska','Jag måste studera svenska'], correct: 1, explanation: '"Ska" + infinitivo = futuro/plan. "Jag ska studera svenska" = Voy a estudiar sueco.' },
        { text: '¿Qué significa "Du måste inte göra det"?', options: ['No tienes que hacerlo','No debes/está prohibido hacerlo','Puedes hacerlo','Quieres hacerlo'], correct: 1, explanation: '"Måste inte" = NO debes. Para "no tienes que" (no es necesario) se usa "behöver inte".' },
        { text: '¿Cómo se dice "No tienes que venir"? (no es necesario)', options: ['Du måste inte komma','Du ska inte komma','Du behöver inte komma','Du kan inte komma'], correct: 2, explanation: '"Behöver inte" = no es necesario / no tienes que. Muy diferente a "måste inte" (está prohibido).' },
        { text: '¿Cuál es el pasado de "kan"?', options: ['kande','kunde','kant','kannade'], correct: 1, explanation: '"Kan" → pasado: "kunde". "Jag kunde inte sova igår" = No pude dormir ayer.' },
        { text: '¿Cómo se dice "¿Quieres tomar café?"', options: ['Ska du dricka kaffe?','Kan du dricka kaffe?','Vill du ha kaffe?','Måste du dricka kaffe?'], correct: 2, explanation: '"Vill du ha kaffe?" = ¿Quieres café? Es la forma más natural de ofrecer algo en sueco.' },
        { text: '¿Qué significa "Bör" y cuándo se usa?', options: ['Lo mismo que måste','Recomendación/deber moral','Permiso','Capacidad'], correct: 1, explanation: '"Bör" = deber (consejo). "Du bör äta mer grönsaker" = Deberías comer más verduras. Más suave que "måste".' },
        { text: '¿Cuál es el pasado de "vill"?', options: ['ville','villde','villet','villte'], correct: 0, explanation: '"Vill" → pasado: "ville". "Jag ville inte gå" = No quería ir.' },
        { text: '¿Cuál es el pasado de "ska"?', options: ['skade','skade','skulle','skat'], correct: 2, explanation: '"Ska" → pasado: "skulle". "Jag skulle arbeta igår" = Iba a trabajar ayer.' },
        { text: '¿Cuál es la característica más útil de los modales suecos?', options: ['Son muy irregulares','La misma forma para todos los pronombres','Van al final de la oración','Se conjugan como en inglés'], correct: 1, explanation: 'Como todos los verbos suecos, los modales tienen UNA forma para todos: jag/du/han/vi kan. ¡Sin conjugar!' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 11. ORDEN DE PALABRAS V2 (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'orden-palabras',
      title: 'Orden de palabras (V2)',
      subtitle: 'Idag arbetar jag... Igår kom han...',
      icon: '📐',
      color: '#0891B2',
      level: 'B',
      questions: [
        { text: '¿Qué es la regla "V2" en sueco?', options: ['El verbo es siempre la segunda palabra','El sujeto siempre es primero','El verbo va al final','Las preguntas van al final'], correct: 0, explanation: 'V2 = el VERBO CONJUGADO siempre va en la SEGUNDA posición. Si algo más va primero, el sujeto va después del verbo.' },
        { text: '¿Cuál oración es correcta?', options: ['Idag jag arbetar.','Idag arbetar jag.','Arbetar idag jag.','Jag idag arbetar.'], correct: 1, explanation: '"Idag" (hoy) en 1ra posición → verbo "arbetar" en 2da → sujeto "jag" en 3ra. "Idag arbetar jag." = Hoy trabajo.' },
        { text: '¿Cuál oración es correcta?', options: ['Igår jag kom hem sent.','Igår kom jag hem sent.','Igår kom hem jag sent.','Jag igår kom hem sent.'], correct: 1, explanation: '"Igår" primero → verbo "kom" segundo → sujeto "jag" tercero. "Igår kom jag hem sent" = Ayer llegué tarde.' },
        { text: '¿Cuál oración es INCORRECTA?', options: ['Jag bor i Stockholm.','I Stockholm bor jag.','I Stockholm jag bor.','Bor du i Stockholm?'], correct: 2, explanation: '"I Stockholm jag bor" es incorrecta. Si "I Stockholm" es primero, el verbo DEBE ir segundo: "I Stockholm bor jag."' },
        { text: '¿Cuál es la oración correcta para "Mañana voy al médico"?', options: ['Imorgon jag går till läkaren.','Imorgon går jag till läkaren.','Jag imorgon går till läkaren.','Jag går imorgon till läkaren.'], correct: 1, explanation: '"Imorgon" primero → "går" (verbo) segundo → "jag" tercero. "Imorgon går jag till läkaren."' },
        { text: '¿Dónde va "inte" en una oración con inversión V2?', options: ['Antes del verbo','Después del sujeto (que ya fue invertido)','Al principio','Al final siempre'], correct: 1, explanation: '"Idag arbetar jag inte" = Hoy no trabajo. (Adverbio-Verbo-Sujeto-inte).' },
        { text: '¿En las preguntas de sí/no, cuál es el orden?', options: ['Sujeto-Verbo-Objeto','Verbo-Sujeto-Objeto','Objeto-Verbo-Sujeto','Igual que afirmaciones'], correct: 1, explanation: 'En preguntas sí/no: verbo primero. "Arbetar du idag?" = ¿Trabajas hoy? (el verbo está "segundo" por V2).' },
        { text: 'Completa: "Ofta ___ vi svenska hemma."', options: ['pratar','vi pratar','pratade','pratas'], correct: 0, explanation: '"Ofta" (a menudo) primero → verbo "pratar" segundo → "vi" tercero. "Ofta pratar vi svenska hemma."' },
        { text: '¿Qué pasa con el orden en una subordinada (bisats)?', options: ['También usa V2','Inte va ANTES del verbo','El verbo va al final','Es igual al inglés'], correct: 1, explanation: 'En subordinadas (att, när, om...): "inte" va ANTES del verbo. "Jag vet att han inte arbetar" (NO "arbetar inte").' },
        { text: '¿Cuál es el error más común del hispanohablante?', options: ['Usar "inte" al principio','Poner el sujeto antes del verbo aunque ya haya algo primero','Olvidar el sujeto','Usar demasiados adverbios'], correct: 1, explanation: 'El error más frecuente: "Igår jag arbetade" (incorrecto). Lo correcto: "Igår arbetade jag".' },
        { text: '¿Qué pasa después de conjunciones como "och" (y)?', options: ['V2 continúa','El orden es normal S-V','El verbo va al final','No se puede continuar la oración'], correct: 1, explanation: 'Después de och/men/eller, el orden es NORMAL: "Jag arbetar och hon studerar." Sin inversión.' },
        { text: '"Klockan tre ___ jag lunch." (A las tres como almuerzo)', options: ['äter','jag äter','åt','ätas'], correct: 0, explanation: '"Klockan tre" primero → verbo "äter" segundo → "jag" tercero. "Klockan tre äter jag lunch."' },
        { text: '¿Qué caracteriza al sueco entre los idiomas germánicos?', options: ['No tiene regla V2','Tiene V2 igual que el alemán','Solo tiene V2 en frases cortas','V2 es opcional'], correct: 1, explanation: 'El sueco (y el alemán) tienen V2, a diferencia del inglés que es más flexible. Es una regla característica.' },
        { text: '¿Cuál oración es correcta para "Siempre bebo café por la mañana"?', options: ['Alltid jag dricker kaffe på morgonen.','Alltid dricker jag kaffe på morgonen.','Jag alltid dricker kaffe på morgonen.','Kaffe dricker jag alltid morgonen.'], correct: 1, explanation: '"Alltid" primero → verbo "dricker" segundo → "jag" tercero. "Alltid dricker jag kaffe på morgonen."' },
        { text: '¿Con qué tipos de palabras ocurre la inversión V2?', options: ['Solo con adverbios de tiempo','Con cualquier elemento que no sea el sujeto al inicio','Solo con negaciones','Solo en preguntas'], correct: 1, explanation: 'La inversión ocurre cuando CUALQUIER elemento que no sea el sujeto está al inicio: adverbios, complementos, subordinadas, etc.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 12. PLURALES SUECOS (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'plurales',
      title: 'Plurales suecos',
      subtitle: 'bilar, flickor, böcker, barn...',
      icon: '📊',
      color: '#BE185D',
      level: 'B',
      questions: [
        { text: '¿Cuántos grupos de plurales existen en sueco?', options: ['2','3','5','7'], correct: 2, explanation: 'El sueco tiene 5 grupos de plural: -or, -ar, -er, -n, y sin terminación (∅). ¡Uno de los temas más complejos!' },
        { text: '¿Cuál es el plural de "flicka" (chica)?', options: ['flickar','flickor','flicken','flickes'], correct: 1, explanation: '"Flicka" termina en -a átona → grupo 1 (-or): "flickor". Otros: "kvinna→kvinnor", "lampa→lampor".' },
        { text: '¿Cuál es el plural de "bil" (carro)?', options: ['bilar','biler','biln','bilen'], correct: 0, explanation: '"Bil" es en-ord → grupo 2 (-ar): "bilar" = carros. Otros: "dag→dagar", "stol→stolar".' },
        { text: '¿Cuál es el plural de "hus" (casa)?', options: ['huser','husar','husen','hus'], correct: 3, explanation: '"Hus" es ett-ord terminado en consonante → grupo 5 (sin cambio): "hus". "Två hus" = dos casas.' },
        { text: '¿Cuál es el plural de "barn" (niño)?', options: ['barnar','barner','barn','barnor'], correct: 2, explanation: '"Barn" es ett-ord terminado en consonante → sin cambio: "barn". "Många barn" = muchos niños.' },
        { text: '¿Cuál es el plural de "bok" (libro)?', options: ['bokar','boker','böcker','boks'], correct: 2, explanation: '"Bok" cambia la vocal y agrega -er: "böcker". Cambio vocálico (omljud): o→ö.' },
        { text: '¿Cuál es el plural de "stad" (ciudad)?', options: ['stader','städer','stadar','stads'], correct: 1, explanation: '"Stad" → "städer" (a→ä + -er). "Sverige har många städer" = Suecia tiene muchas ciudades.' },
        { text: '¿Cuál es el plural de "äpple" (manzana)?', options: ['äpplen','äppler','äpplar','äpple'], correct: 0, explanation: '"Äpple" es ett-ord terminado en vocal → grupo 4 (-n): "äpplen" = manzanas.' },
        { text: '¿Cuál es el plural de "dag" (día)?', options: ['dager','dagar','dagor','dagn'], correct: 1, explanation: '"Dag" (en-ord) → grupo 2 (-ar): "dagar" = días. "Sju dagar i veckan" = Siete días en la semana.' },
        { text: '¿Cuál es el plural de "år" (año)?', options: ['årar','åren','år','årer'], correct: 2, explanation: '"År" es ett-ord terminado en consonante → sin cambio: "år". "Tre år" = tres años.' },
        { text: '¿Cuál es el plural de "kvinna" (mujer)?', options: ['kvinnar','kvinnor','kvinnen','kvinnas'], correct: 1, explanation: '"Kvinna" termina en -a átona → grupo 1 (-or): "kvinnor" = mujeres.' },
        { text: '¿Cómo se forma el definido plural de en-ord?', options: ['Se agrega -en','Se agrega -na al plural','El plural ya es definido','Se agrega -a'], correct: 1, explanation: 'El definido plural de en-ord se forma con -na: "bilar" → "bilarna" = los carros.' },
        { text: '¿Cuál es el plural de "man" (hombre)?', options: ['manar','maner','män','mans'], correct: 2, explanation: '"Man" tiene un plural irregular con cambio vocálico: "män" = hombres. Igual: "hand→händer".' },
        { text: '¿Cuál es la mejor estrategia para los plurales?', options: ['Usar siempre -ar','Memorizar la regla perfecta','Aprender cada palabra con su plural desde el inicio','Evitar el plural'], correct: 2, explanation: 'La mejor estrategia: aprender cada sustantivo nuevo con su plural: no solo "bil" sino "bil/bilar". El oído te ayudará.' },
        { text: '¿Cuál es el plural de "lärare" (maestro/a)?', options: ['lärarer','lärarena','läraren','lärare'], correct: 3, explanation: '"Lärare" es uno de los sustantivos que no cambia en plural: "lärare" (singular y plural). "Tre lärare" = tres maestros.' },
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
