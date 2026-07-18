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
      {
        id: 'a-l-5', title: 'På posten', topic: 'Correos / trámites', icon: '📦', duration: '~40s',
        text: `Hej! Jag skulle vilja skicka det här paketet till Spanien. Ja, självklart. Vad väger paketet? Jag tror att det väger ungefär två kilo. Då kostar det etthundrafemtio kronor. Hur lång tid tar det? Ungefär en vecka. Vill du ha spårning? Ja, tack, det vill jag gärna ha. Kan jag betala med kort? Absolut. Skriv mottagarens adress här, tack. Varsågod. Tack så mycket! Ha en bra dag!`,
        questions: [
          { text: '¿Adónde envía el paquete?', options: ['A Italia', 'A España', 'A Portugal', 'Dentro de Suecia'], correct: 1, explanation: 'Skicka det här paketet till Spanien = enviar este paquete a España.' },
          { text: '¿Cuánto pesa el paquete?', options: ['1 kilo', '2 kilos', '3 kilos', '5 kilos'], correct: 1, explanation: 'Det väger ungefär två kilo = pesa unos dos kilos.' },
          { text: '¿Cuánto tarda en llegar?', options: ['Un día', 'Una semana', 'Un mes', 'Dos semanas'], correct: 1, explanation: 'Ungefär en vecka = aproximadamente una semana.' },
          { text: '¿Qué pide el cliente además del envío?', options: ['Un sobre', 'Seguimiento (spårning)', 'Una caja', 'Sellos'], correct: 1, explanation: 'Vill ha spårning = quiere seguimiento del paquete.' },
        ]
      },
      {
        id: 'a-l-6', title: 'Boka tid på telefon', topic: 'Teléfono / cita', icon: '📞', duration: '~40s',
        text: `Frisör Klipp och Stil, god morgon! Hej, jag skulle vilja boka en tid för klippning. Javisst. När passar det för dig? Har ni något på fredag? På fredag har vi en tid klockan fjorton eller klockan sexton. Klockan sexton passar bra. Vad heter du? Jag heter Sofia. Och ett telefonnummer? Sjuttio, tolv, trettiofyra, femtiosex. Perfekt, då ses vi på fredag klockan sexton. Tack så mycket. Välkommen!`,
        questions: [
          { text: '¿Para qué llama Sofia?', options: ['Para cancelar', 'Para reservar un corte de pelo', 'Para preguntar precios', 'Para comprar productos'], correct: 1, explanation: 'Boka en tid för klippning = reservar cita para corte de pelo.' },
          { text: '¿Qué día quiere la cita?', options: ['Lunes', 'Miércoles', 'Viernes', 'Sábado'], correct: 2, explanation: 'Har ni något på fredag? = ¿tienen algo el viernes?' },
          { text: '¿A qué hora es la cita?', options: ['A las 14:00', 'A las 15:00', 'A las 16:00', 'A las 17:00'], correct: 2, explanation: 'Klockan sexton = a las 16:00.' },
          { text: '¿Qué datos da Sofia?', options: ['Solo su nombre', 'Su nombre y teléfono', 'Su dirección', 'Su correo'], correct: 1, explanation: 'Da su nombre (Sofia) y su número de teléfono.' },
        ]
      },
    ],

    read: [
      {
            "id": "a-r-u1-1",
            "unit": 1,
            "unitTitle": "Presentaciones",
            "title": "Hej! Jag heter Ana",
            "kind": "Texto personal",
            "icon": "👋",
            "text": "Hej! Jag heter Ana. Jag är trettio år. Jag kommer från Peru. Nu bor jag i Stockholm. Jag studerar svenska på SFI.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿De dónde viene Ana?",
                        "options": [
                              "Från Chile",
                              "Från Peru",
                              "Från Spanien"
                        ],
                        "correct": 1,
                        "explanation": "«Jag kommer från Peru» = vengo de Perú."
                  },
                  {
                        "type": "tf",
                        "text": "Ana bor i Göteborg.",
                        "answer": false,
                        "explanation": "Ella dice «Nu bor jag i Stockholm» = vivo en Estocolmo."
                  },
                  {
                        "type": "short",
                        "text": "Completa: «Jag studerar ___» (¿qué estudia?)",
                        "answer": "svenska",
                        "accept": [
                              "svenskan"
                        ],
                        "explanation": "«Jag studerar svenska» = estudio sueco."
                  },
                  {
                        "type": "tf",
                        "text": "Ana är trettio år.",
                        "answer": true,
                        "explanation": "«Jag är trettio år» = tengo 30 años."
                  },
                  {
                        "type": "mc",
                        "text": "¿Dónde vive ahora?",
                        "options": [
                              "I Lima",
                              "I Stockholm",
                              "I Peru"
                        ],
                        "correct": 1,
                        "explanation": "«Nu bor jag i Stockholm»."
                  }
            ]
      },
      {
            "id": "a-r-u1-2",
            "unit": 1,
            "unitTitle": "Presentaciones",
            "title": "Vad heter du?",
            "kind": "Diálogo",
            "icon": "💬",
            "text": "– Hej, vad heter du?\n– Jag heter Omar.\n– Var kommer du ifrån?\n– Jag kommer från Syrien.\n– Hur gammal är du?\n– Jag är tjugofem år.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cómo se llama?",
                        "options": [
                              "Ali",
                              "Omar",
                              "Karl"
                        ],
                        "correct": 1,
                        "explanation": "«Jag heter Omar»."
                  },
                  {
                        "type": "tf",
                        "text": "Omar är tjugofem år.",
                        "answer": true,
                        "explanation": "«Jag är tjugofem år» = tengo 25 años."
                  },
                  {
                        "type": "short",
                        "text": "¿De qué país es Omar? (en sueco)",
                        "answer": "Syrien",
                        "accept": [
                              "syrien"
                        ],
                        "explanation": "«Jag kommer från Syrien»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué edad tiene Omar?",
                        "options": [
                              "Tjugo",
                              "Tjugofem",
                              "Trettio"
                        ],
                        "correct": 1,
                        "explanation": "«Jag är tjugofem år» = 25."
                  },
                  {
                        "type": "tf",
                        "text": "Omar kommer från Peru.",
                        "answer": false,
                        "explanation": "«från Syrien»."
                  }
            ]
      },
      {
            "id": "a-r-1",
            "unit": 2,
            "unitTitle": "Familia",
            "title": "Familjen Lindgren",
            "kind": "Texto personal",
            "icon": "👨‍👩‍👧‍👦",
            "text": "Maria och Erik Lindgren bor i en lägenhet i Stockholm. De har två barn: Emma, som är sex år, och Lucas, som är nio år. Maria jobbar som sjuksköterska och Erik jobbar på ett kontor i centrum. Barnen går i skolan nära hemmet.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuántos hijos tienen?",
                        "options": [
                              "Ett",
                              "Två",
                              "Tre"
                        ],
                        "correct": 1,
                        "explanation": "«De har två barn» = tienen dos hijos."
                  },
                  {
                        "type": "tf",
                        "text": "Erik jobbar på ett sjukhus.",
                        "answer": false,
                        "explanation": "Erik «jobbar på ett kontor» = trabaja en una oficina."
                  },
                  {
                        "type": "short",
                        "text": "¿Dónde viven? «i en ___ i Stockholm»",
                        "answer": "lägenhet",
                        "accept": [
                              "lägenheten"
                        ],
                        "explanation": "«bor i en lägenhet» = viven en un apartamento."
                  },
                  {
                        "type": "mc",
                        "text": "¿En qué trabaja Maria?",
                        "options": [
                              "Lärare",
                              "Sjuksköterska",
                              "Kock"
                        ],
                        "correct": 1,
                        "explanation": "«Maria jobbar som sjuksköterska» = enfermera."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuántos años tiene Lucas? (número)",
                        "answer": "nio",
                        "accept": [
                              "9"
                        ],
                        "explanation": "«Lucas, som är nio år»."
                  }
            ]
      },
      {
            "id": "a-r-u2-2",
            "unit": 2,
            "unitTitle": "Familia",
            "title": "Min familj",
            "kind": "Texto personal",
            "icon": "👪",
            "text": "Jag heter Sofia. Jag har en man och två barn. Min man heter Karl. Mina barn heter Lisa och Tom. Min mamma bor också i Sverige, men min pappa bor i Chile.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuántos hijos tiene Sofia?",
                        "options": [
                              "Ett",
                              "Två",
                              "Tre"
                        ],
                        "correct": 1,
                        "explanation": "«två barn» = dos hijos."
                  },
                  {
                        "type": "tf",
                        "text": "Sofias pappa bor i Sverige.",
                        "answer": false,
                        "explanation": "«min pappa bor i Chile» = su papá vive en Chile."
                  },
                  {
                        "type": "short",
                        "text": "¿Cómo se llama el esposo?",
                        "answer": "Karl",
                        "accept": [
                              "karl"
                        ],
                        "explanation": "«Min man heter Karl»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Dónde vive la mamá de Sofia?",
                        "options": [
                              "I Chile",
                              "I Sverige",
                              "I Peru"
                        ],
                        "correct": 1,
                        "explanation": "«Min mamma bor också i Sverige»."
                  },
                  {
                        "type": "tf",
                        "text": "Sofia har tre barn.",
                        "answer": false,
                        "explanation": "«två barn» = dos hijos."
                  }
            ]
      },
      {
            "id": "a-r-3",
            "unit": 3,
            "unitTitle": "Vivienda",
            "title": "Lägenheten",
            "kind": "Texto personal",
            "icon": "🏠",
            "text": "Fatima och hennes familj bor i en lägenhet i Husby. Lägenheten har tre rum och kök. De bor på tredje våningen och har en liten balkong. I närheten finns en park, en skola och ett bibliotek. Det tar fem minuter att gå till tunnelbanan.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuántas habitaciones tiene?",
                        "options": [
                              "Två rum",
                              "Tre rum",
                              "Fyra rum"
                        ],
                        "correct": 1,
                        "explanation": "«tre rum och kök»."
                  },
                  {
                        "type": "tf",
                        "text": "De bor på tredje våningen.",
                        "answer": true,
                        "explanation": "«De bor på tredje våningen» = en el tercer piso."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuánto se tarda al metro? (número) ___ minuter",
                        "answer": "fem",
                        "accept": [
                              "5"
                        ],
                        "explanation": "«fem minuter att gå till tunnelbanan»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué hay cerca de la casa?",
                        "options": [
                              "En park, en skola och ett bibliotek",
                              "En stor sjö",
                              "Ett sjukhus"
                        ],
                        "correct": 0,
                        "explanation": "«I närheten finns en park, en skola och ett bibliotek»."
                  },
                  {
                        "type": "tf",
                        "text": "De bor på första våningen.",
                        "answer": false,
                        "explanation": "«på tredje våningen» = tercer piso."
                  }
            ]
      },
      {
            "id": "a-r-u3-2",
            "unit": 3,
            "unitTitle": "Vivienda",
            "title": "Mitt rum",
            "kind": "Texto personal",
            "icon": "🛏️",
            "text": "I mitt rum finns en säng, ett bord och en stol. På bordet står en lampa och en dator. Jag har en garderob för mina kläder. Rummet är litet men mysigt.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué hay sobre la mesa?",
                        "options": [
                              "En tv",
                              "En lampa och en dator",
                              "En säng"
                        ],
                        "correct": 1,
                        "explanation": "«På bordet står en lampa och en dator»."
                  },
                  {
                        "type": "tf",
                        "text": "Rummet är stort.",
                        "answer": false,
                        "explanation": "«Rummet är litet men mysigt» = pequeño pero acogedor."
                  },
                  {
                        "type": "short",
                        "text": "¿Dónde guarda la ropa? en una ___",
                        "answer": "garderob",
                        "accept": [
                              "garderoben"
                        ],
                        "explanation": "«en garderob för mina kläder»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué muebles hay?",
                        "options": [
                              "En säng, ett bord och en stol",
                              "En soffa",
                              "Ett badkar"
                        ],
                        "correct": 0,
                        "explanation": "«en säng, ett bord och en stol»."
                  },
                  {
                        "type": "tf",
                        "text": "Det finns en dator på bordet.",
                        "answer": true,
                        "explanation": "«På bordet står en lampa och en dator»."
                  }
            ]
      },
      {
            "id": "a-r-u4-1",
            "unit": 4,
            "unitTitle": "El tiempo",
            "title": " Anas dag",
            "kind": "Horario",
            "icon": "📅",
            "text": "Idag är det måndag den femte mars. Klockan är nio. Ana har svenska klockan nio till tolv. På eftermiddagen klockan två träffar hon en vän.",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿Qué día es hoy? (en sueco)",
                        "answer": "måndag",
                        "accept": [
                              "mandag"
                        ],
                        "explanation": "«Idag är det måndag» = hoy es lunes."
                  },
                  {
                        "type": "mc",
                        "text": "¿A qué hora empieza el sueco?",
                        "options": [
                              "Klockan åtta",
                              "Klockan nio",
                              "Klockan tio"
                        ],
                        "correct": 1,
                        "explanation": "«klockan nio till tolv»."
                  },
                  {
                        "type": "tf",
                        "text": "Ana träffar en vän på morgonen.",
                        "answer": false,
                        "explanation": "Es «på eftermiddagen» = por la tarde."
                  },
                  {
                        "type": "tf",
                        "text": "Ana har svenska på morgonen.",
                        "answer": true,
                        "explanation": "«klockan nio till tolv» = por la mañana."
                  },
                  {
                        "type": "mc",
                        "text": "¿A qué hora ve a su amiga?",
                        "options": [
                              "Klockan nio",
                              "Klockan två",
                              "Klockan tolv"
                        ],
                        "correct": 1,
                        "explanation": "«klockan två träffar hon en vän»."
                  }
            ]
      },
      {
            "id": "a-r-u4-2",
            "unit": 4,
            "unitTitle": "El tiempo",
            "title": "Kallt väder",
            "kind": "Texto personal",
            "icon": "🌨️",
            "text": "Idag är det kallt och det snöar. Det är minus fem grader. Erik tar på sig en varm jacka, en mössa och vantar. Han cyklar inte idag. Han tar bussen.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué tiempo hace?",
                        "options": [
                              "Sol och varmt",
                              "Kallt och snö",
                              "Regn"
                        ],
                        "correct": 1,
                        "explanation": "«det är kallt och det snöar»."
                  },
                  {
                        "type": "tf",
                        "text": "Erik cyklar idag.",
                        "answer": false,
                        "explanation": "«Han cyklar inte idag. Han tar bussen»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué se pone en la cabeza? en una ___",
                        "answer": "mössa",
                        "accept": [
                              "mossa",
                              "mössan"
                        ],
                        "explanation": "«en mössa» = un gorro."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuántos grados hace? minus ___ (número)",
                        "answer": "fem",
                        "accept": [
                              "5"
                        ],
                        "explanation": "«minus fem grader»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cómo va Erik hoy?",
                        "options": [
                              "Med cykel",
                              "Med buss",
                              "Till fots"
                        ],
                        "correct": 1,
                        "explanation": "«Han tar bussen»."
                  }
            ]
      },
      {
            "id": "a-r-2",
            "unit": 5,
            "unitTitle": "Rutinas diarias",
            "title": "Min dag",
            "kind": "Texto personal",
            "icon": "⏰",
            "text": "Jag heter Pedro. Varje morgon vaknar jag klockan sju. Jag äter frukost och dricker kaffe. Sedan tar jag spårvagnen till skolan. Lektionerna börjar klockan nio. På kvällen lagar jag mat och studerar svenska.",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿A qué hora se despierta? (número) klockan ___",
                        "answer": "sju",
                        "accept": [
                              "7"
                        ],
                        "explanation": "«vaknar jag klockan sju» = a las siete."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cómo va a la escuela?",
                        "options": [
                              "Med buss",
                              "Med spårvagn",
                              "Till fots"
                        ],
                        "correct": 1,
                        "explanation": "«tar jag spårvagnen» = tomo el tranvía."
                  },
                  {
                        "type": "tf",
                        "text": "På kvällen lagar Pedro mat.",
                        "answer": true,
                        "explanation": "«På kvällen lagar jag mat»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué bebe en el desayuno?",
                        "options": [
                              "Te",
                              "Kaffe",
                              "Juice"
                        ],
                        "correct": 1,
                        "explanation": "«dricker kaffe»."
                  },
                  {
                        "type": "tf",
                        "text": "Pedro vaknar klockan nio.",
                        "answer": false,
                        "explanation": "«vaknar jag klockan sju» = a las siete."
                  }
            ]
      },
      {
            "id": "a-r-u5-2",
            "unit": 5,
            "unitTitle": "Rutinas diarias",
            "title": "Efter jobbet",
            "kind": "Texto personal",
            "icon": "🌙",
            "text": "Efter jobbet handlar Maria mat. Sedan lagar hon middag. På kvällen tittar hon på tv och läser en bok. Hon går och lägger sig klockan elva.",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿A qué hora se acuesta? (número) klockan ___",
                        "answer": "elva",
                        "accept": [
                              "11"
                        ],
                        "explanation": "«lägger sig klockan elva» = a las once."
                  },
                  {
                        "type": "tf",
                        "text": "Maria lagar middag.",
                        "answer": true,
                        "explanation": "«Sedan lagar hon middag»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué hace por la noche?",
                        "options": [
                              "Jobbar",
                              "Tittar på tv och läser",
                              "Springer"
                        ],
                        "correct": 1,
                        "explanation": "«tittar hon på tv och läser en bok»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué hace primero después del trabajo?",
                        "options": [
                              "Lagar middag",
                              "Handlar mat",
                              "Tittar på tv"
                        ],
                        "correct": 1,
                        "explanation": "«Efter jobbet handlar Maria mat»."
                  },
                  {
                        "type": "tf",
                        "text": "Maria lägger sig klockan tio.",
                        "answer": false,
                        "explanation": "«klockan elva» = a las once."
                  }
            ]
      },
      {
            "id": "a-r-u6-1",
            "unit": 6,
            "unitTitle": "Escuela y clase",
            "title": "På SFI",
            "kind": "Texto personal",
            "icon": "🏫",
            "text": "Jag går på SFI i Malmö. Vi är femton elever i klassen. Läraren heter Anna. Vi lär oss att läsa, skriva och prata svenska. Lektionen börjar klockan åtta.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuántos alumnos hay?",
                        "options": [
                              "Tio",
                              "Femton",
                              "Tjugo"
                        ],
                        "correct": 1,
                        "explanation": "«Vi är femton elever»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cómo se llama la profesora?",
                        "answer": "Anna",
                        "accept": [
                              "anna"
                        ],
                        "explanation": "«Läraren heter Anna»."
                  },
                  {
                        "type": "tf",
                        "text": "Lektionen börjar klockan nio.",
                        "answer": false,
                        "explanation": "«Lektionen börjar klockan åtta»."
                  },
                  {
                        "type": "mc",
                        "text": "¿En qué ciudad estudia?",
                        "options": [
                              "I Malmö",
                              "I Stockholm",
                              "I Lund"
                        ],
                        "correct": 0,
                        "explanation": "«Jag går på SFI i Malmö»."
                  },
                  {
                        "type": "tf",
                        "text": "De lär sig att laga mat.",
                        "answer": false,
                        "explanation": "«läsa, skriva och prata svenska»."
                  }
            ]
      },
      {
            "id": "a-r-u6-2",
            "unit": 6,
            "unitTitle": "Escuela y clase",
            "title": "Meddelande från läraren",
            "kind": "Mensaje",
            "icon": "✉️",
            "text": "Hej! Imorgon har vi inget prov. Ta med er böcker och en penna. Vi ska öva att skriva. Hälsningar, Anna (lärare)",
            "questions": [
                  {
                        "type": "tf",
                        "text": "Det är prov imorgon.",
                        "answer": false,
                        "explanation": "«Imorgon har vi inget prov» = mañana no hay examen."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué deben traer?",
                        "options": [
                              "Mat",
                              "Böcker och en penna",
                              "Pengar"
                        ],
                        "correct": 1,
                        "explanation": "«Ta med er böcker och en penna»."
                  },
                  {
                        "type": "short",
                        "text": "¿Quién escribe el mensaje?",
                        "answer": "Anna",
                        "accept": [
                              "anna",
                              "läraren"
                        ],
                        "explanation": "Firma «Anna (lärare)»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué van a practicar?",
                        "options": [
                              "Att skriva",
                              "Att sjunga",
                              "Att räkna"
                        ],
                        "correct": 0,
                        "explanation": "«Vi ska öva att skriva»."
                  },
                  {
                        "type": "tf",
                        "text": "Imorgon har de prov.",
                        "answer": false,
                        "explanation": "«inget prov» = ningún examen."
                  }
            ]
      },
      {
            "id": "a-r-u7-1",
            "unit": 7,
            "unitTitle": "Trabajo",
            "title": "Ali jobbar",
            "kind": "Texto personal",
            "icon": "💼",
            "text": "Ali jobbar på ett lager. Han börjar klockan sju på morgonen och slutar klockan fyra. Han lyfter lådor och kör truck. Han trivs med sitt jobb.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Dónde trabaja Ali?",
                        "options": [
                              "På ett café",
                              "På ett lager",
                              "På ett sjukhus"
                        ],
                        "correct": 1,
                        "explanation": "«Ali jobbar på ett lager» = en un almacén."
                  },
                  {
                        "type": "short",
                        "text": "¿A qué hora termina? (número) klockan ___",
                        "answer": "fyra",
                        "accept": [
                              "4"
                        ],
                        "explanation": "«slutar klockan fyra» = a las cuatro."
                  },
                  {
                        "type": "tf",
                        "text": "Ali trivs inte med jobbet.",
                        "answer": false,
                        "explanation": "«Han trivs med sitt jobb» = está a gusto."
                  },
                  {
                        "type": "short",
                        "text": "¿A qué hora empieza? klockan ___ (número)",
                        "answer": "sju",
                        "accept": [
                              "7"
                        ],
                        "explanation": "«börjar klockan sju»."
                  },
                  {
                        "type": "tf",
                        "text": "Ali kör truck.",
                        "answer": true,
                        "explanation": "«lyfter lådor och kör truck»."
                  }
            ]
      },
      {
            "id": "a-r-u7-2",
            "unit": 7,
            "unitTitle": "Trabajo",
            "title": "Vi söker personal",
            "kind": "Anuncio",
            "icon": "📌",
            "text": "Vi söker personal till vårt café. Du ska vara trevlig och tala lite svenska. Arbetstid: helger. Ring 070-123 45 67.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué buscan?",
                        "options": [
                              "Personal till ett café",
                              "En lärare",
                              "En läkare"
                        ],
                        "correct": 0,
                        "explanation": "«Vi söker personal till vårt café»."
                  },
                  {
                        "type": "tf",
                        "text": "Man jobbar på vardagar.",
                        "answer": false,
                        "explanation": "«Arbetstid: helger» = fines de semana."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué días se trabaja? (en sueco)",
                        "answer": "helger",
                        "accept": [
                              "helg",
                              "på helger"
                        ],
                        "explanation": "«Arbetstid: helger»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué se necesita?",
                        "options": [
                              "Tala lite svenska",
                              "Köra bil",
                              "Laga mat"
                        ],
                        "correct": 0,
                        "explanation": "«tala lite svenska»."
                  },
                  {
                        "type": "tf",
                        "text": "Man måste tala perfekt svenska.",
                        "answer": false,
                        "explanation": "solo «lite svenska» = un poco."
                  }
            ]
      },
      {
            "id": "a-r-u8-1",
            "unit": 8,
            "unitTitle": "Compras",
            "title": "Anna handlar",
            "kind": "Texto personal",
            "icon": "🛒",
            "text": "Anna handlar på ICA. Hon köper mjölk för tolv kronor, bröd för tjugofem kronor och äpplen för tjugo kronor. Hon betalar med kort.",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿Cuánto cuesta el pan? (número)",
                        "answer": "tjugofem",
                        "accept": [
                              "25"
                        ],
                        "explanation": "«bröd för tjugofem kronor» = 25 coronas."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cómo paga Anna?",
                        "options": [
                              "Med kort",
                              "Med kontanter",
                              "Med telefon"
                        ],
                        "correct": 0,
                        "explanation": "«Hon betalar med kort» = con tarjeta."
                  },
                  {
                        "type": "tf",
                        "text": "Anna köper fisk.",
                        "answer": false,
                        "explanation": "Compra «mjölk, bröd och äpplen»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuánto cuesta la leche? (número)",
                        "answer": "tolv",
                        "accept": [
                              "12"
                        ],
                        "explanation": "«mjölk för tolv kronor»."
                  },
                  {
                        "type": "tf",
                        "text": "Anna handlar på ICA.",
                        "answer": true,
                        "explanation": "«Anna handlar på ICA»."
                  }
            ]
      },
      {
            "id": "a-r-u8-2",
            "unit": 8,
            "unitTitle": "Compras",
            "title": "REA i butiken",
            "kind": "Anuncio",
            "icon": "🏷️",
            "text": "REA! Denna vecka: jackor 50% rabatt. Skor från 199 kronor. Välkommen till butiken på Storgatan 4!",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué está en oferta?",
                        "options": [
                              "Böcker",
                              "Jackor",
                              "Mat"
                        ],
                        "correct": 1,
                        "explanation": "«jackor 50% rabatt» = chaquetas al 50%."
                  },
                  {
                        "type": "tf",
                        "text": "Skorna kostar 500 kronor.",
                        "answer": false,
                        "explanation": "«Skor från 199 kronor»."
                  },
                  {
                        "type": "short",
                        "text": "¿En qué calle está la tienda?",
                        "answer": "Storgatan",
                        "accept": [
                              "storgatan",
                              "storgatan 4"
                        ],
                        "explanation": "«butiken på Storgatan 4»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuánto descuento en chaquetas?",
                        "options": [
                              "25%",
                              "50%",
                              "10%"
                        ],
                        "correct": 1,
                        "explanation": "«jackor 50% rabatt»."
                  },
                  {
                        "type": "tf",
                        "text": "Skorna kostar från 199 kronor.",
                        "answer": true,
                        "explanation": "«Skor från 199 kronor»."
                  }
            ]
      },
      {
            "id": "a-r-4",
            "unit": 9,
            "unitTitle": "Comida y bebida",
            "title": "På restaurangen",
            "kind": "Texto personal",
            "icon": "🍽️",
            "text": "Idag äter Lena lunch på en restaurang. Restaurangen heter Gröna Köket och serverar vegetarisk mat. Lena beställer en vegetarisk lasagne och ett glas vatten. Lunchen kostar nittiofem kronor. Restaurangen är öppen måndag till fredag.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué tipo de comida sirven?",
                        "options": [
                              "Kött",
                              "Vegetarisk mat",
                              "Fisk"
                        ],
                        "correct": 1,
                        "explanation": "«serverar vegetarisk mat»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuánto cuesta el almuerzo? (número)",
                        "answer": "nittiofem",
                        "accept": [
                              "95"
                        ],
                        "explanation": "«Lunchen kostar nittiofem kronor» = 95."
                  },
                  {
                        "type": "tf",
                        "text": "Restaurangen är öppen på söndag.",
                        "answer": false,
                        "explanation": "«öppen måndag till fredag»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cómo se llama el restaurante?",
                        "options": [
                              "Gröna Köket",
                              "Blå Huset",
                              "Röda Rummet"
                        ],
                        "correct": 0,
                        "explanation": "«Restaurangen heter Gröna Köket»."
                  },
                  {
                        "type": "tf",
                        "text": "Lena dricker vatten.",
                        "answer": true,
                        "explanation": "«ett glas vatten»."
                  }
            ]
      },
      {
            "id": "a-r-u9-2",
            "unit": 9,
            "unitTitle": "Comida y bebida",
            "title": "Recept: pannkakor",
            "kind": "Instrucción",
            "icon": "🥞",
            "text": "Recept: pannkakor. Du behöver mjölk, ägg, mjöl och lite salt. Blanda allt. Stek i en stekpanna. Ät med sylt.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué plato es?",
                        "options": [
                              "Soppa",
                              "Pannkakor",
                              "Sallad"
                        ],
                        "correct": 1,
                        "explanation": "«Recept: pannkakor» = receta de tortitas."
                  },
                  {
                        "type": "short",
                        "text": "¿Con qué se comen? med ___",
                        "answer": "sylt",
                        "accept": [
                              "sylten"
                        ],
                        "explanation": "«Ät med sylt» = con mermelada."
                  },
                  {
                        "type": "tf",
                        "text": "Man behöver kött.",
                        "answer": false,
                        "explanation": "Se necesita «mjölk, ägg, mjöl och salt»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué NO se necesita?",
                        "options": [
                              "Kött",
                              "Mjölk",
                              "Ägg"
                        ],
                        "correct": 0,
                        "explanation": "Se necesita «mjölk, ägg, mjöl och salt», no kött."
                  },
                  {
                        "type": "short",
                        "text": "¿En qué se fríe? i en ___",
                        "answer": "stekpanna",
                        "accept": [
                              "stekpannan"
                        ],
                        "explanation": "«Stek i en stekpanna»."
                  }
            ]
      },
      {
            "id": "a-r-u10-1",
            "unit": 10,
            "unitTitle": "Transporte",
            "title": "Buss 4",
            "kind": "Horario",
            "icon": "🚌",
            "text": "Buss 4 går från Centralen klockan 08:10, 08:30 och 08:50. Resan tar tjugo minuter. En biljett kostar trettio kronor.",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿Cuánto dura el viaje? (número) ___ minuter",
                        "answer": "tjugo",
                        "accept": [
                              "20"
                        ],
                        "explanation": "«Resan tar tjugo minuter» = 20 minutos."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuánto cuesta el billete?",
                        "options": [
                              "Tjugo kronor",
                              "Trettio kronor",
                              "Femtio kronor"
                        ],
                        "correct": 1,
                        "explanation": "«En biljett kostar trettio kronor» = 30."
                  },
                  {
                        "type": "tf",
                        "text": "Bussen går från Centralen.",
                        "answer": true,
                        "explanation": "«Buss 4 går från Centralen»."
                  },
                  {
                        "type": "tf",
                        "text": "Resan tar tjugo minuter.",
                        "answer": true,
                        "explanation": "«Resan tar tjugo minuter»."
                  },
                  {
                        "type": "mc",
                        "text": "¿A qué hora sale el primer autobús?",
                        "options": [
                              "08:10",
                              "08:30",
                              "08:50"
                        ],
                        "correct": 0,
                        "explanation": "«08:10» es el primero."
                  }
            ]
      },
      {
            "id": "a-r-u10-2",
            "unit": 10,
            "unitTitle": "Transporte",
            "title": "Tåget är försenat",
            "kind": "Mensaje",
            "icon": "📱",
            "text": "Hej! Tåget är försenat. Jag kommer tio minuter senare. Vänta på mig vid stationen. Kram, Sara",
            "questions": [
                  {
                        "type": "tf",
                        "text": "Tåget är i tid.",
                        "answer": false,
                        "explanation": "«Tåget är försenat» = el tren va con retraso."
                  },
                  {
                        "type": "mc",
                        "text": "¿Dónde debe esperar?",
                        "options": [
                              "Vid stationen",
                              "Hemma",
                              "På jobbet"
                        ],
                        "correct": 0,
                        "explanation": "«Vänta på mig vid stationen»."
                  },
                  {
                        "type": "short",
                        "text": "¿Quién escribe el mensaje?",
                        "answer": "Sara",
                        "accept": [
                              "sara"
                        ],
                        "explanation": "Firma «Kram, Sara»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuántos minutos tarde? (número) ___ minuter",
                        "answer": "tio",
                        "accept": [
                              "10"
                        ],
                        "explanation": "«tio minuter senare»."
                  },
                  {
                        "type": "tf",
                        "text": "Tåget är försenat.",
                        "answer": true,
                        "explanation": "«Tåget är försenat»."
                  }
            ]
      },
      {
            "id": "a-r-u11-1",
            "unit": 11,
            "unitTitle": "Mensajes cortos",
            "title": "SMS till Omar",
            "kind": "Mensaje",
            "icon": "💬",
            "text": "Hej Omar! Kan du köpa mjölk och bröd på vägen hem? Tack! /Lena",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué debe comprar Omar?",
                        "options": [
                              "Mjölk och bröd",
                              "Fisk och ris",
                              "Kött"
                        ],
                        "correct": 0,
                        "explanation": "«köpa mjölk och bröd»."
                  },
                  {
                        "type": "short",
                        "text": "¿Quién envía el mensaje?",
                        "answer": "Lena",
                        "accept": [
                              "lena"
                        ],
                        "explanation": "Firma «/Lena»."
                  },
                  {
                        "type": "tf",
                        "text": "Omar ska köpa fisk.",
                        "answer": false,
                        "explanation": "Debe comprar «mjölk och bröd»."
                  },
                  {
                        "type": "tf",
                        "text": "Lena ber Omar köpa mat.",
                        "answer": true,
                        "explanation": "«Kan du köpa mjölk och bröd»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué NO debe comprar?",
                        "options": [
                              "Fisk",
                              "Mjölk",
                              "Bröd"
                        ],
                        "correct": 0,
                        "explanation": "Solo «mjölk och bröd»."
                  }
            ]
      },
      {
            "id": "a-r-u11-2",
            "unit": 11,
            "unitTitle": "Mensajes cortos",
            "title": "Tack för igår",
            "kind": "Mensaje",
            "icon": "📩",
            "text": "Hej! Tack för igår, det var jättekul. Vi ses nästa vecka. Hälsningar, Maria",
            "questions": [
                  {
                        "type": "tf",
                        "text": "Maria tackar för igår.",
                        "answer": true,
                        "explanation": "«Tack för igår» = gracias por ayer."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuándo se ven?",
                        "options": [
                              "Imorgon",
                              "Nästa vecka",
                              "Idag"
                        ],
                        "correct": 1,
                        "explanation": "«Vi ses nästa vecka»."
                  },
                  {
                        "type": "short",
                        "text": "¿Quién escribe? (nombre)",
                        "answer": "Maria",
                        "accept": [
                              "maria"
                        ],
                        "explanation": "Firma «Hälsningar, Maria»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cómo estuvo ayer?",
                        "options": [
                              "Tråkigt",
                              "Jättekul",
                              "Dåligt"
                        ],
                        "correct": 1,
                        "explanation": "«det var jättekul» = muy divertido."
                  },
                  {
                        "type": "tf",
                        "text": "De ses idag.",
                        "answer": false,
                        "explanation": "«Vi ses nästa vecka»."
                  }
            ]
      },
      {
            "id": "a-r-u12-1",
            "unit": 12,
            "unitTitle": "Citas",
            "title": "Tid hos doktorn",
            "kind": "Aviso",
            "icon": "🏥",
            "text": "Du har en tid hos doktorn tisdag den 6 maj klockan 10:00. Vårdcentralen ligger på Vasagatan 8. Kom tio minuter innan.",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿Qué día es la cita? (en sueco)",
                        "answer": "tisdag",
                        "accept": [
                              "tisdagen"
                        ],
                        "explanation": "«tisdag den 6 maj»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Dónde está el centro de salud?",
                        "options": [
                              "Storgatan 4",
                              "Vasagatan 8",
                              "Kungsgatan 2"
                        ],
                        "correct": 1,
                        "explanation": "«Vårdcentralen ligger på Vasagatan 8»."
                  },
                  {
                        "type": "tf",
                        "text": "Tiden är klockan tolv.",
                        "answer": false,
                        "explanation": "Es «klockan 10:00» = a las diez."
                  },
                  {
                        "type": "short",
                        "text": "¿A qué hora es la cita? klockan ___ (número)",
                        "answer": "tio",
                        "accept": [
                              "10"
                        ],
                        "explanation": "«klockan 10:00»."
                  },
                  {
                        "type": "tf",
                        "text": "Man ska komma tio minuter innan.",
                        "answer": true,
                        "explanation": "«Kom tio minuter innan»."
                  }
            ]
      },
      {
            "id": "a-r-u12-2",
            "unit": 12,
            "unitTitle": "Citas",
            "title": "Hos doktorn",
            "kind": "Diálogo",
            "icon": "🩺",
            "text": "– Hej, jag har ont i magen.\n– Har du feber?\n– Ja, lite.\n– Ta den här medicinen två gånger om dagen.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué le duele?",
                        "options": [
                              "Halsen",
                              "Magen",
                              "Huvudet"
                        ],
                        "correct": 1,
                        "explanation": "«ont i magen» = dolor de estómago."
                  },
                  {
                        "type": "tf",
                        "text": "Han ska ta medicinen en gång om dagen.",
                        "answer": false,
                        "explanation": "«två gånger om dagen» = dos veces al día."
                  },
                  {
                        "type": "short",
                        "text": "¿Tiene fiebre? (ja/nej)",
                        "answer": "ja",
                        "accept": [
                              "ja lite"
                        ],
                        "explanation": "«Har du feber? – Ja, lite»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cada cuánto toma la medicina?",
                        "options": [
                              "En gång",
                              "Två gånger",
                              "Tre gånger"
                        ],
                        "correct": 1,
                        "explanation": "«två gånger om dagen»."
                  },
                  {
                        "type": "tf",
                        "text": "Han har ont i huvudet.",
                        "answer": false,
                        "explanation": "«ont i magen» = estómago."
                  }
            ]
      },
      {
            "id": "a-r-u13-1",
            "unit": 13,
            "unitTitle": "Invitaciones",
            "title": "Kom på fest!",
            "kind": "Invitación",
            "icon": "🎉",
            "text": "Hej! Jag fyller år på lördag. Kom på fest klockan 18 hemma hos mig. Det blir tårta och musik! /Sofia",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué se celebra?",
                        "options": [
                              "En bröllop",
                              "En födelsedag",
                              "En jul"
                        ],
                        "correct": 1,
                        "explanation": "«Jag fyller år» = cumplo años."
                  },
                  {
                        "type": "short",
                        "text": "¿A qué hora es la fiesta? (número) klockan ___",
                        "answer": "18",
                        "accept": [
                              "arton",
                              "klockan 18"
                        ],
                        "explanation": "«klockan 18» = a las 18."
                  },
                  {
                        "type": "tf",
                        "text": "Det blir ingen tårta.",
                        "answer": false,
                        "explanation": "«Det blir tårta och musik» = habrá tarta y música."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué día es la fiesta?",
                        "options": [
                              "Fredag",
                              "Lördag",
                              "Söndag"
                        ],
                        "correct": 1,
                        "explanation": "«Jag fyller år på lördag»."
                  },
                  {
                        "type": "tf",
                        "text": "Det blir musik på festen.",
                        "answer": true,
                        "explanation": "«tårta och musik»."
                  }
            ]
      },
      {
            "id": "a-r-u13-2",
            "unit": 13,
            "unitTitle": "Invitaciones",
            "title": "Svar på inbjudan",
            "kind": "Mensaje",
            "icon": "💌",
            "text": "Hej Sofia! Tack för inbjudan. Jag kommer gärna! Ska jag ta med något? Kram, Ana",
            "questions": [
                  {
                        "type": "tf",
                        "text": "Ana kommer inte till festen.",
                        "answer": false,
                        "explanation": "«Jag kommer gärna» = iré con gusto."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué pregunta Ana?",
                        "options": [
                              "Var är festen",
                              "Om hon ska ta med något",
                              "Vem kommer"
                        ],
                        "correct": 1,
                        "explanation": "«Ska jag ta med något?»"
                  },
                  {
                        "type": "short",
                        "text": "¿Quién invitó a la fiesta? (nombre)",
                        "answer": "Sofia",
                        "accept": [
                              "sofia"
                        ],
                        "explanation": "Responde a «Hej Sofia»."
                  },
                  {
                        "type": "tf",
                        "text": "Ana tackar för inbjudan.",
                        "answer": true,
                        "explanation": "«Tack för inbjudan»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Ana irá a la fiesta?",
                        "options": [
                              "Ja, gärna",
                              "Nej",
                              "Kanske"
                        ],
                        "correct": 0,
                        "explanation": "«Jag kommer gärna»."
                  }
            ]
      },
      {
            "id": "a-r-u14-1",
            "unit": 14,
            "unitTitle": "Anuncios y formularios",
            "title": "Hissen är trasig",
            "kind": "Cartel",
            "icon": "⚠️",
            "text": "OBS! Hissen är trasig. Använd trappan. Vi lagar hissen imorgon. Tack för förståelsen.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué pasa?",
                        "options": [
                              "Hissen är trasig",
                              "Dörren är öppen",
                              "Vattnet är kallt"
                        ],
                        "correct": 0,
                        "explanation": "«Hissen är trasig» = el ascensor está roto."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué se debe usar? (en sueco)",
                        "answer": "trappan",
                        "accept": [
                              "trappa",
                              "trapporna"
                        ],
                        "explanation": "«Använd trappan» = usa la escalera."
                  },
                  {
                        "type": "tf",
                        "text": "Hissen fungerar.",
                        "answer": false,
                        "explanation": "«Hissen är trasig»."
                  },
                  {
                        "type": "tf",
                        "text": "Hissen lagas imorgon.",
                        "answer": true,
                        "explanation": "«Vi lagar hissen imorgon»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuándo arreglan el ascensor?",
                        "options": [
                              "Idag",
                              "Imorgon",
                              "Nästa vecka"
                        ],
                        "correct": 1,
                        "explanation": "«imorgon»."
                  }
            ]
      },
      {
            "id": "a-r-u14-2",
            "unit": 14,
            "unitTitle": "Anuncios y formularios",
            "title": "Anmälan",
            "kind": "Formulario",
            "icon": "📝",
            "text": "ANMÄLAN\nNamn: Ana Lopez\nAdress: Storgatan 4, Stockholm\nTelefon: 070-111 22 33\nLand: Peru",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿Cuál es el país (Land)?",
                        "answer": "Peru",
                        "accept": [
                              "peru"
                        ],
                        "explanation": "«Land: Peru»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuál es el teléfono?",
                        "options": [
                              "070-111 22 33",
                              "08-123 45",
                              "070-999 88"
                        ],
                        "correct": 0,
                        "explanation": "«Telefon: 070-111 22 33»."
                  },
                  {
                        "type": "tf",
                        "text": "Ana bor i Göteborg.",
                        "answer": false,
                        "explanation": "«Adress: Storgatan 4, Stockholm»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuál es el apellido?",
                        "options": [
                              "Lopez",
                              "Ana",
                              "Peru"
                        ],
                        "correct": 0,
                        "explanation": "«Namn: Ana Lopez» → apellido Lopez."
                  },
                  {
                        "type": "short",
                        "text": "¿En qué ciudad vive?",
                        "answer": "Stockholm",
                        "accept": [
                              "stockholm"
                        ],
                        "explanation": "«Adress: Storgatan 4, Stockholm»."
                  }
            ]
      },
      {
            "id": "a-r-u15-1",
            "unit": 15,
            "unitTitle": "Evaluación final",
            "title": "Marta berättar",
            "kind": "Texto personal",
            "icon": "🏅",
            "text": "Jag heter Marta. Jag är från Polen, men jag bor i Sverige nu. Jag har en dotter. På morgonen går jag till SFI och på eftermiddagen jobbar jag i en butik. På helgen träffar jag vänner.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿De dónde es Marta?",
                        "options": [
                              "Från Sverige",
                              "Från Polen",
                              "Från Peru"
                        ],
                        "correct": 1,
                        "explanation": "«Jag är från Polen»."
                  },
                  {
                        "type": "tf",
                        "text": "Marta jobbar på morgonen.",
                        "answer": false,
                        "explanation": "Por la mañana va a SFI; trabaja «på eftermiddagen»."
                  },
                  {
                        "type": "short",
                        "text": "¿Dónde trabaja? i en ___",
                        "answer": "butik",
                        "accept": [
                              "butiken"
                        ],
                        "explanation": "«jobbar jag i en butik»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Qué tiene Marta?",
                        "options": [
                              "En son",
                              "En dotter",
                              "Inga barn"
                        ],
                        "correct": 1,
                        "explanation": "«Jag har en dotter»."
                  },
                  {
                        "type": "tf",
                        "text": "På helgen jobbar Marta.",
                        "answer": false,
                        "explanation": "«På helgen träffar jag vänner»."
                  }
            ]
      },
      {
            "id": "a-r-u15-2",
            "unit": 15,
            "unitTitle": "Evaluación final",
            "title": "Biblioteket",
            "kind": "Horario",
            "icon": "📚",
            "text": "Biblioteket är öppet måndag–fredag 10–18 och lördag 11–15. På söndag är det stängt. Det är gratis att låna böcker.",
            "questions": [
                  {
                        "type": "short",
                        "text": "¿A qué hora abre el sábado? (número)",
                        "answer": "11",
                        "accept": [
                              "elva"
                        ],
                        "explanation": "«lördag 11–15»."
                  },
                  {
                        "type": "tf",
                        "text": "Biblioteket är öppet på söndag.",
                        "answer": false,
                        "explanation": "«På söndag är det stängt» = domingo cerrado."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuánto cuesta pedir libros?",
                        "options": [
                              "Gratis",
                              "Tio kronor",
                              "Femtio kronor"
                        ],
                        "correct": 0,
                        "explanation": "«Det är gratis att låna böcker»."
                  },
                  {
                        "type": "short",
                        "text": "¿A qué hora cierra entre semana? (número)",
                        "answer": "18",
                        "accept": [
                              "arton"
                        ],
                        "explanation": "«måndag–fredag 10–18»."
                  },
                  {
                        "type": "tf",
                        "text": "Det kostar pengar att låna böcker.",
                        "answer": false,
                        "explanation": "«Det är gratis att låna böcker»."
                  }
            ]
      },
      {
            "id": "a-r-u15-3",
            "unit": 15,
            "unitTitle": "Evaluación final",
            "title": "Vi ses imorgon",
            "kind": "Mensaje",
            "icon": "✅",
            "text": "Hej! Vi ses imorgon klockan 14 vid stationen. Glöm inte biljetten! /Erik",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Dónde se ven?",
                        "options": [
                              "Vid stationen",
                              "Hemma",
                              "På skolan"
                        ],
                        "correct": 0,
                        "explanation": "«vid stationen» = en la estación."
                  },
                  {
                        "type": "short",
                        "text": "¿A qué hora? (número) klockan ___",
                        "answer": "14",
                        "accept": [
                              "fjorton"
                        ],
                        "explanation": "«klockan 14»."
                  },
                  {
                        "type": "tf",
                        "text": "Erik dice: olvida el billete.",
                        "answer": false,
                        "explanation": "«Glöm inte biljetten» = NO olvides el billete."
                  },
                  {
                        "type": "mc",
                        "text": "¿Cuándo se ven?",
                        "options": [
                              "Idag",
                              "Imorgon",
                              "Nästa vecka"
                        ],
                        "correct": 1,
                        "explanation": "«Vi ses imorgon»."
                  },
                  {
                        "type": "short",
                        "text": "¿Quién escribe el mensaje?",
                        "answer": "Erik",
                        "accept": [
                              "erik"
                        ],
                        "explanation": "Firma «/Erik»."
                  }
            ]
      }
],

    write: [
      {
            "id": "a-w-1",
            "title": "Skriv ett kort meddelande till Carlos",
            "icon": "✉️",
            "words": "30–60 ord",
            "prompt": "Situación:\nCarlos bjuder dig på middag på fredag.\n\nInstrucciones:\nSkriv ett kort meddelande. Tacka ja och fråga vilken tid middagen börjar.",
            "checklist": [
                  "Usa un saludo: Hej Carlos!",
                  "Acepta: Tack för inbjudan! Jag kommer gärna.",
                  "Pregunta la hora: Vilken tid börjar middagen?",
                  "Pregunta qué llevar: Ska jag ta med något?",
                  "Firma: Hälsningar, [tu nombre]"
            ],
            "example": "Hej Carlos! Tack för inbjudan, jag kommer gärna på fredag. Vilken tid börjar middagen? Hälsningar, Ana",
            "criteria": [
                  "Saludar",
                  "Aceptar la invitación",
                  "Preguntar la hora",
                  "Despedirse"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": true,
                  "closing": true,
                  "question": true,
                  "keywords": [
                        "tack",
                        "tid"
                  ]
            },
            "selfCheck": [
                  "¿Empezaste con un saludo (Hej)?",
                  "¿Aceptaste la invitación (tack/ja)?",
                  "¿Preguntaste la hora?",
                  "¿Te despediste (Hälsningar)?"
            ],
            "hints": [
                  "Empieza con un saludo: Hej Carlos!",
                  "Para aceptar: Tack för inbjudan!",
                  "Para preguntar la hora usa «Vilken tid...?»",
                  "Termina con: Hälsningar, [tu nombre]"
            ],
            "useful": [
                  "hej",
                  "tack",
                  "middag",
                  "fredag",
                  "komma",
                  "vilken tid",
                  "hälsningar"
            ]
      },
      {
            "id": "a-w-2",
            "title": "Beskriv dig själv",
            "icon": "🙋",
            "words": "30–60 ord",
            "prompt": "Escribe una presentación sobre ti mismo en sueco.\n\nIncluye:\n• Tu nombre y de dónde vienes\n• Dónde vives en Suecia\n• Tu trabajo o estudios\n• Un hobby o algo que te gusta",
            "checklist": [
                  "Jag heter... och jag kommer från...",
                  "Jag bor i... sedan...",
                  "Jag jobbar/studerar...",
                  "På fritiden tycker jag om att..."
            ],
            "example": "Hej! Jag heter María och jag kommer från Colombia. Jag bor i Malmö sedan ett år. Jag studerar svenska på SFI och jobbar ibland på ett café. På fritiden tycker jag om att promenera och laga mat.",
            "criteria": [
                  "Contenido: se presenta correctamente",
                  "Gramática: verbos en presente",
                  "Vocabulario: palabras de presentación básica",
                  "Coherencia: las ideas se entienden"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "heter",
                        "från",
                        "bor"
                  ]
            },
            "selfCheck": [
                  "¿Dijiste tu nombre?",
                  "¿De dónde vienes?",
                  "¿Dónde vives?",
                  "¿Qué estudias o en qué trabajas?"
            ],
            "hints": [
                  "Empieza con: Jag heter...",
                  "Di de dónde vienes: Jag kommer från...",
                  "Di dónde vives: Jag bor i..."
            ],
            "useful": [
                  "jag heter",
                  "kommer från",
                  "bor i",
                  "studerar",
                  "jobbar",
                  "på fritiden"
            ]
      },
      {
            "id": "a-w-3",
            "title": "Skriv ett meddelande till jobbet",
            "icon": "💼",
            "words": "30–60 ord",
            "prompt": "Estás enfermo y no puedes ir al trabajo hoy. Escribe un mensaje a tu jefe (chef).\n\nEn tu mensaje debes:\n• Decir que estás enfermo\n• Decir que no puedes ir hoy\n• Pedir disculpas",
            "checklist": [
                  "Hej [nombre del jefe]!",
                  "Jag är sjuk idag...",
                  "Jag kan tyvärr inte komma till jobbet.",
                  "Förlåt för besväret. / Sorry för kort varsel."
            ],
            "example": "Hej Anna!\n\nJag är tyvärr sjuk idag och kan inte komma till jobbet. Jag har ont i halsen och feber. Förlåt för besväret.\n\nMed vänliga hälsningar,\nCarlos",
            "criteria": [
                  "Contenido: explica el motivo",
                  "Tono: formal y respetuoso",
                  "Brevedad: mensaje corto y claro",
                  "Vocabulario: sjuk, tyvärr, förlåt"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "sjuk"
                  ]
            },
            "selfCheck": [
                  "¿Saludaste?",
                  "¿Dijiste que estás enfermo?",
                  "¿Dijiste que no puedes ir?",
                  "¿Te despediste?"
            ],
            "hints": [
                  "Saluda: Hej [nombre]!",
                  "Di el motivo: Jag är sjuk...",
                  "Despídete: Med vänliga hälsningar"
            ],
            "useful": [
                  "hej",
                  "sjuk",
                  "idag",
                  "kan inte komma",
                  "förlåt",
                  "hälsningar"
            ]
      },
      {
            "id": "a-w-4",
            "unit": 1,
            "unitTitle": "Presentaciones",
            "title": "Presentera dig själv",
            "icon": "🙋",
            "words": "30–60 ord",
            "prompt": "Escribe una presentación sobre ti en sueco.\nIncluye:\n• Tu nombre y de dónde vienes\n• Dónde vives ahora\n• Qué estudias o en qué trabajas\n• Algo que te gusta hacer",
            "checklist": [
                  "Jag heter... och jag kommer från...",
                  "Jag bor i...",
                  "Jag studerar svenska på SFI.",
                  "På fritiden tycker jag om att..."
            ],
            "example": "Hej! Jag heter Ana och jag kommer från Peru. Nu bor jag i Stockholm. Jag studerar svenska på SFI. På fritiden tycker jag om att promenera och laga mat.",
            "criteria": [
                  "Contenido: ¿cumpliste todas las tareas?",
                  "Gramática: verbos y orden de palabras",
                  "Vocabulario: palabras del nivel A",
                  "Claridad: se entiende el mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "heter",
                        "från",
                        "bor"
                  ]
            },
            "selfCheck": [
                  "¿Dijiste tu nombre y país?",
                  "¿Dónde vives ahora?",
                  "¿Qué estudias o en qué trabajas?",
                  "¿Algo que te gusta hacer?"
            ],
            "hints": [
                  "Jag heter... och jag kommer från...",
                  "Jag bor i...",
                  "På fritiden tycker jag om att..."
            ],
            "useful": [
                  "jag heter",
                  "kommer från",
                  "bor i",
                  "studerar",
                  "jobbar",
                  "fritiden"
            ]
      },
      {
            "id": "a-w-5",
            "unit": 1,
            "unitTitle": "Presentaciones",
            "title": "Fyll i formuläret",
            "icon": "📝",
            "words": "30–60 ord",
            "prompt": "Completa un formulario con tus datos personales. Escribe una línea por campo.",
            "checklist": [
                  "Namn: (tu nombre)",
                  "Efternamn: (tu apellido)",
                  "Adress: (tu dirección)",
                  "Telefon: (tu teléfono)",
                  "Land: (tu país)"
            ],
            "example": "Namn: Ana\nEfternamn: Lopez\nAdress: Storgatan 4, Stockholm\nTelefon: 070-111 22 33\nE-post: ana@mail.se\nLand: Peru",
            "criteria": [
                  "Contenido: completaste todos los campos",
                  "Datos claros",
                  "Formato de formulario",
                  "Ortografía de datos básicos"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "namn",
                        "adress",
                        "telefon"
                  ]
            },
            "selfCheck": [
                  "¿Pusiste tu nombre?",
                  "¿Tu dirección?",
                  "¿Tu teléfono?",
                  "¿Tu país?"
            ],
            "hints": [
                  "Escribe una línea por dato",
                  "Namn: ...",
                  "Adress: ..., Telefon: ..."
            ],
            "useful": [
                  "namn",
                  "efternamn",
                  "adress",
                  "telefon",
                  "e-post",
                  "land"
            ]
      },
      {
            "id": "a-w-6",
            "unit": 2,
            "unitTitle": "Familia",
            "title": "Skriv om din familj",
            "icon": "👪",
            "words": "30–60 ord",
            "prompt": "Escribe sobre tu familia.\nIncluye:\n• Cuántas personas son\n• Cómo se llaman\n• Qué hacen",
            "checklist": [
                  "Jag har en...",
                  "Min man/fru heter...",
                  "Jag har ... barn.",
                  "Min mamma/pappa bor i..."
            ],
            "example": "Jag heter Sofia. Jag har en man och två barn. Min man heter Karl. Mina barn heter Lisa och Tom. Min mamma bor i Sverige, men min pappa bor i Chile.",
            "criteria": [
                  "Contenido: ¿cumpliste todas las tareas?",
                  "Gramática: verbos y orden de palabras",
                  "Vocabulario: palabras del nivel A",
                  "Claridad: se entiende el mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "heter",
                        "har"
                  ]
            },
            "selfCheck": [
                  "¿Cuántas personas son?",
                  "¿Cómo se llaman?",
                  "¿Qué hacen (trabajo/escuela)?"
            ],
            "hints": [
                  "Jag har en...",
                  "Min man/fru heter...",
                  "Jag har ... barn."
            ],
            "useful": [
                  "familj",
                  "man",
                  "fru",
                  "barn",
                  "mamma",
                  "pappa",
                  "heter"
            ]
      },
      {
            "id": "a-w-7",
            "unit": 3,
            "unitTitle": "Vivienda",
            "title": "Beskriv ditt hem",
            "icon": "🏠",
            "words": "30–60 ord",
            "prompt": "Describe dónde vives.\nIncluye:\n• Qué tipo de vivienda\n• Cuántas habitaciones\n• Qué hay cerca",
            "checklist": [
                  "Jag bor i en lägenhet / ett hus.",
                  "Den har ... rum.",
                  "I närheten finns...",
                  "Jag trivs bra."
            ],
            "example": "Jag bor i en lägenhet i Husby. Lägenheten har tre rum och kök. I närheten finns en park och en skola. Det tar fem minuter att gå till tunnelbanan. Jag trivs bra.",
            "criteria": [
                  "Contenido: ¿cumpliste todas las tareas?",
                  "Gramática: verbos y orden de palabras",
                  "Vocabulario: palabras del nivel A",
                  "Claridad: se entiende el mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "bor",
                        "rum"
                  ]
            },
            "selfCheck": [
                  "¿Qué tipo de vivienda?",
                  "¿Cuántas habitaciones?",
                  "¿Qué hay cerca?"
            ],
            "hints": [
                  "Jag bor i en lägenhet / ett hus.",
                  "Den har ... rum.",
                  "I närheten finns..."
            ],
            "useful": [
                  "lägenhet",
                  "hus",
                  "rum",
                  "kök",
                  "balkong",
                  "närheten",
                  "trivs"
            ]
      },
      {
            "id": "a-w-8",
            "unit": 5,
            "unitTitle": "Rutinas",
            "title": "Skriv om din dag",
            "icon": "⏰",
            "words": "30–60 ord",
            "prompt": "Describe tu día normal.\nIncluye:\n• A qué hora te levantas\n• Qué haces por la mañana\n• Qué haces por la tarde/noche",
            "checklist": [
                  "Jag vaknar klockan...",
                  "På morgonen...",
                  "Sedan...",
                  "På kvällen..."
            ],
            "example": "Jag vaknar klockan sju. Jag äter frukost och dricker kaffe. Sedan tar jag bussen till SFI. På eftermiddagen handlar jag mat. På kvällen lagar jag mat och tittar på tv.",
            "criteria": [
                  "Contenido: ¿cumpliste todas las tareas?",
                  "Gramática: verbos y orden de palabras",
                  "Vocabulario: palabras del nivel A",
                  "Claridad: se entiende el mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "klockan"
                  ]
            },
            "selfCheck": [
                  "¿A qué hora te levantas?",
                  "¿Qué haces por la mañana?",
                  "¿Qué haces por la tarde/noche?"
            ],
            "hints": [
                  "Jag vaknar klockan...",
                  "På morgonen...",
                  "På kvällen..."
            ],
            "useful": [
                  "vaknar",
                  "frukost",
                  "klockan",
                  "sedan",
                  "eftermiddagen",
                  "kvällen"
            ]
      },
      {
            "id": "a-w-9",
            "unit": 6,
            "unitTitle": "Escuela",
            "title": "Meddelande till läraren",
            "icon": "✉️",
            "words": "30–60 ord",
            "prompt": "Escribe un mensaje corto a tu profesor/a. No puedes ir a clase hoy.\nDebes:\n• Saludar\n• Decir que no puedes ir\n• Dar un motivo",
            "checklist": [
                  "Hej [nombre]!",
                  "Jag kan tyvärr inte komma till SFI idag.",
                  "Jag är sjuk / Mitt barn är sjukt.",
                  "Vi ses imorgon. Hälsningar, [tu nombre]"
            ],
            "example": "Hej Anna!\nJag kan tyvärr inte komma till SFI idag. Jag är sjuk och har feber. Vi ses imorgon.\nHälsningar, Pedro",
            "criteria": [
                  "Contenido: saludo, motivo, despedida",
                  "Tono respetuoso",
                  "Mensaje corto y claro",
                  "Vocabulario: sjuk, tyvärr, imorgon"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "idag"
                  ]
            },
            "selfCheck": [
                  "¿Saludaste al profesor?",
                  "¿Dijiste que no puedes ir?",
                  "¿Diste un motivo?",
                  "¿Te despediste?"
            ],
            "hints": [
                  "Hej [nombre]!",
                  "Jag kan tyvärr inte komma till SFI idag.",
                  "Vi ses imorgon. Hälsningar,"
            ],
            "useful": [
                  "hej",
                  "sjuk",
                  "idag",
                  "kan inte komma",
                  "imorgon",
                  "hälsningar"
            ]
      },
      {
            "id": "a-w-10",
            "unit": 8,
            "unitTitle": "Compras",
            "title": "Skriv en inköpslista",
            "icon": "🛒",
            "words": "30–60 ord",
            "prompt": "Vas al supermercado. Escribe tu lista de compras en sueco (al menos 6 cosas).",
            "checklist": [
                  "Escribe una cosa por línea",
                  "Puedes añadir cantidades: två äpplen",
                  "Usa palabras de comida en sueco"
            ],
            "example": "Inköpslista:\n- mjölk\n- bröd\n- ägg\n- ost\n- äpplen\n- kaffe\n- ris",
            "criteria": [
                  "Contenido: al menos 6 productos",
                  "Vocabulario de comida en sueco",
                  "Ortografía básica",
                  "Formato de lista"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": []
            },
            "selfCheck": [
                  "¿Escribiste al menos 6 productos?",
                  "¿Los escribiste en sueco?",
                  "¿Una cosa por línea?"
            ],
            "hints": [
                  "Una cosa por línea",
                  "Ejemplo: mjölk, bröd, ägg...",
                  "Puedes añadir cantidades: två äpplen"
            ],
            "useful": [
                  "mjölk",
                  "bröd",
                  "ägg",
                  "ost",
                  "frukt",
                  "kaffe",
                  "ris"
            ]
      },
      {
            "id": "a-w-11",
            "unit": 9,
            "unitTitle": "Comida",
            "title": "Min favoritmat",
            "icon": "🍽️",
            "words": "30–60 ord",
            "prompt": "Escribe sobre tu comida favorita.\nIncluye:\n• Qué te gusta comer\n• Cuándo lo comes\n• Con quién",
            "checklist": [
                  "Min favoritmat är...",
                  "Jag äter det ofta / på helgen.",
                  "Jag lagar mat med...",
                  "Det smakar gott."
            ],
            "example": "Min favoritmat är pannkakor. Jag äter dem på helgen med min familj. Ibland lagar jag också ris med kyckling. Det smakar jättegott!",
            "criteria": [
                  "Contenido: ¿cumpliste todas las tareas?",
                  "Gramática: verbos y orden de palabras",
                  "Vocabulario: palabras del nivel A",
                  "Claridad: se entiende el mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "mat"
                  ]
            },
            "selfCheck": [
                  "¿Qué te gusta comer?",
                  "¿Cuándo lo comes?",
                  "¿Con quién?"
            ],
            "hints": [
                  "Min favoritmat är...",
                  "Jag äter det på helgen / med...",
                  "Det smakar gott."
            ],
            "useful": [
                  "favoritmat",
                  "äta",
                  "laga mat",
                  "gott",
                  "helgen",
                  "tillsammans"
            ]
      },
      {
            "id": "a-w-12",
            "unit": 10,
            "unitTitle": "Transporte",
            "title": "Hur tar du dig till skolan?",
            "icon": "🚌",
            "words": "30–60 ord",
            "prompt": "Explica cómo vas a la escuela.\nIncluye:\n• Qué transporte usas\n• Cuánto tarda\n• A qué hora sales",
            "checklist": [
                  "Jag tar bussen / tunnelbanan / cykeln.",
                  "Resan tar ... minuter.",
                  "Jag åker klockan...",
                  "Sedan går jag till klassen."
            ],
            "example": "Jag tar bussen till skolan. Resan tar tjugo minuter. Jag åker hemifrån klockan åtta. Ibland cyklar jag när det är fint väder.",
            "criteria": [
                  "Contenido: ¿cumpliste todas las tareas?",
                  "Gramática: verbos y orden de palabras",
                  "Vocabulario: palabras del nivel A",
                  "Claridad: se entiende el mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "minuter"
                  ]
            },
            "selfCheck": [
                  "¿Qué transporte usas?",
                  "¿Cuánto tarda?",
                  "¿A qué hora sales?"
            ],
            "hints": [
                  "Jag tar bussen / cykeln...",
                  "Resan tar ... minuter.",
                  "Jag åker klockan..."
            ],
            "useful": [
                  "buss",
                  "tunnelbana",
                  "cykel",
                  "åker",
                  "minuter",
                  "klockan"
            ]
      },
      {
            "id": "a-w-13",
            "unit": 11,
            "unitTitle": "Mensajes",
            "title": "Skriv ett SMS till en vän",
            "icon": "💬",
            "words": "30–60 ord",
            "prompt": "Escribe un SMS a un amigo/a.\nDebes:\n• Saludar\n• Invitarle a hacer algo\n• Decir cuándo y dónde",
            "checklist": [
                  "Hej [nombre]!",
                  "Vill du... på lördag?",
                  "Vi kan ses klockan... vid...",
                  "Hör av dig! / Kram"
            ],
            "example": "Hej Omar! Vill du ta en fika på lördag? Vi kan ses klockan tre vid caféet i centrum. Hör av dig! Kram, Ana",
            "criteria": [
                  "Contenido: saludo, invitación, hora/lugar",
                  "Tono informal y amable",
                  "Mensaje corto",
                  "Vocabulario cotidiano"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": true,
                  "closing": true,
                  "question": true,
                  "keywords": [
                        "lördag"
                  ]
            },
            "selfCheck": [
                  "¿Saludaste?",
                  "¿Invitaste a hacer algo?",
                  "¿Dijiste cuándo y dónde?",
                  "¿Te despediste?"
            ],
            "hints": [
                  "Hej [nombre]!",
                  "Vill du... på lördag?",
                  "Vi kan ses klockan... vid...",
                  "Kram / Hälsningar"
            ],
            "useful": [
                  "hej",
                  "vill du",
                  "lördag",
                  "klockan",
                  "vid",
                  "kram"
            ]
      },
      {
            "id": "a-w-14",
            "unit": 12,
            "unitTitle": "Citas",
            "title": "Boka en tid",
            "icon": "🏥",
            "words": "30–60 ord",
            "prompt": "Escribe un mensaje a la vårdcentral para pedir una cita.\nDebes:\n• Dar tu nombre\n• Explicar el problema\n• Pedir una hora",
            "checklist": [
                  "Hej! Jag heter...",
                  "Jag har ont i...",
                  "Kan jag boka en tid den här veckan?",
                  "Tack för hjälpen!"
            ],
            "example": "Hej! Jag heter Pedro. Jag har ont i halsen och lite feber. Kan jag boka en tid den här veckan? Tack för hjälpen!",
            "criteria": [
                  "Contenido: nombre, problema, petición",
                  "Tono cortés",
                  "Vocabulario: ont, feber, tid",
                  "Claridad del mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": true,
                  "closing": true,
                  "question": true,
                  "keywords": [
                        "tid"
                  ]
            },
            "selfCheck": [
                  "¿Diste tu nombre?",
                  "¿Explicaste el problema?",
                  "¿Pediste una hora?",
                  "¿Diste las gracias?"
            ],
            "hints": [
                  "Hej! Jag heter...",
                  "Jag har ont i...",
                  "Kan jag boka en tid...?",
                  "Tack för hjälpen!"
            ],
            "useful": [
                  "hej",
                  "ont",
                  "feber",
                  "boka en tid",
                  "den här veckan",
                  "tack"
            ]
      },
      {
            "id": "a-w-15",
            "unit": 13,
            "unitTitle": "Invitaciones",
            "title": "Skriv en inbjudan",
            "icon": "🎉",
            "words": "30–60 ord",
            "prompt": "Escribe una invitación a una fiesta.\nIncluye:\n• Qué celebras\n• El día y la hora\n• Dónde es",
            "checklist": [
                  "Hej! Jag fyller år / har fest.",
                  "Kom på fest på lördag!",
                  "Vi börjar klockan...",
                  "Välkommen! Hälsningar, [tu nombre]"
            ],
            "example": "Hej! Jag fyller år på lördag och vill bjuda in dig till fest. Vi börjar klockan sex hemma hos mig på Storgatan 4. Det blir tårta och musik. Välkommen! Hälsningar, Sofia",
            "criteria": [
                  "Contenido: ¿cumpliste todas las tareas?",
                  "Gramática: verbos y orden de palabras",
                  "Vocabulario: palabras del nivel A",
                  "Claridad: se entiende el mensaje"
            ],
            "req": {
                  "min": 30,
                  "max": 60,
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "fest"
                  ]
            },
            "selfCheck": [
                  "¿Qué celebras?",
                  "¿El día y la hora?",
                  "¿Dónde es?",
                  "¿Te despediste?"
            ],
            "hints": [
                  "Hej! Jag fyller år / har fest.",
                  "Vi börjar klockan... hemma hos mig.",
                  "Välkommen! Hälsningar,"
            ],
            "useful": [
                  "hej",
                  "fyller år",
                  "fest",
                  "klockan",
                  "tårta",
                  "välkommen",
                  "hälsningar"
            ]
      }
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
      { category: 'Gramática', text: 'Plural correcto: en bok → tre _____.', options: ['boker', 'böcker', 'bokar', 'bokor'], correct: 1, explanation: 'Plural irregular: en bok → BÖCKER (con cambio de vocal).' },
      { category: 'Gramática', text: 'Forma definida: _____ (la casa) är gammal.', options: ['Hus', 'Huset', 'En hus', 'Husen'], correct: 1, explanation: 'Definido singular de hus (ett-ord): HUSET = la casa.' },
      { category: 'Gramática', text: 'Verbo en futuro: I morgon _____ jag jobba.', options: ['ska', 'skulle', 'har', 'är'], correct: 0, explanation: 'Futuro: SKA + infinitivo. I morgon ska jag jobba.' },
      { category: 'Gramática', text: 'Posesivo correcto: Det är _____ bok. (mi)', options: ['min', 'mitt', 'mina', 'jag'], correct: 0, explanation: 'Bok es en-ord → MIN bok. (mitt para ett-ord, mina en plural).' },
      { category: 'Vocabulario', text: '¿Qué significa "att handla"?', options: ['Cocinar', 'Comprar/hacer la compra', 'Limpiar', 'Dormir'], correct: 1, explanation: 'Handla = comprar, hacer las compras.' },
      { category: 'Vocabulario', text: '¿Cómo se dice "ayer" en sueco?', options: ['I dag', 'I morgon', 'Igår', 'I kväll'], correct: 2, explanation: 'Igår = ayer. I dag = hoy. I morgon = mañana.' },
      { category: 'Comprensión', text: '"Tåget går klockan halv nio." ¿A qué hora sale el tren?', options: ['A las 8:30', 'A las 9:30', 'A las 8:00', 'A las 9:00'], correct: 0, explanation: 'Halv nio = 8:30 (media hora ANTES de las 9, sistema sueco).' },
      { category: 'Comprensión', text: '"Jag måste gå till jobbet nu." ¿Qué debe hacer la persona?', options: ['Descansar', 'Ir al trabajo', 'Ir de compras', 'Llamar a un amigo'], correct: 1, explanation: 'Måste gå till jobbet = debe ir al trabajo.' },
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
      {
        id: 'b-l-5', title: 'På banken', topic: 'Banco / trámites', icon: '🏦', duration: '~55s',
        text: `Hej, hur kan jag hjälpa dig? Hej, jag skulle vilja öppna ett bankkonto. Har du personnummer och legitimation? Ja, här är min legitimation. Bra. Är du folkbokförd i Sverige? Ja, sedan tre månader. Perfekt. Vill du också ha ett bankkort och BankID? Ja, tack, det behöver jag för att betala räkningar och logga in på Mina sidor. Absolut. BankID är väldigt viktigt i Sverige. Då fyller vi i en ansökan tillsammans. Det tar bara några minuter.`,
        questions: [
          { text: '¿Qué quiere hacer el cliente?', options: ['Pedir un préstamo', 'Abrir una cuenta bancaria', 'Cambiar dinero', 'Cerrar una cuenta'], correct: 1, explanation: 'Öppna ett bankkonto = abrir una cuenta bancaria.' },
          { text: '¿Qué necesita mostrar?', options: ['Un contrato', 'Su legitimación (ID)', 'Una factura', 'Nada'], correct: 1, explanation: 'Personnummer och legitimation = número de persona e identificación.' },
          { text: '¿Desde cuándo está empadronado en Suecia?', options: ['Una semana', 'Un mes', 'Tres meses', 'Un año'], correct: 2, explanation: 'Folkbokförd sedan tre månader = empadronado desde hace tres meses.' },
          { text: '¿Para qué necesita el BankID?', options: ['Para viajar', 'Para pagar facturas e iniciar sesión', 'Para comprar comida', 'Para trabajar'], correct: 1, explanation: 'För att betala räkningar och logga in på Mina sidor.' },
        ]
      },
      {
        id: 'b-l-6', title: 'Sjukanmälan på jobbet', topic: 'Trabajo / salud', icon: '🤒', duration: '~45s',
        text: `Hej, det är Carlos. Hej Carlos, hur är det? Inte så bra faktiskt. Jag är sjuk idag. Jag har feber och ont i halsen. Åh, vad tråkigt. Då ska du stanna hemma och vila. Ja, jag kan tyvärr inte komma till jobbet. Ingen fara, jag meddelar de andra. Krya på dig! Tack. Om jag är sjuk imorgon också, ska jag ringa igen? Ja, sjukanmäl dig varje morgon du är borta. Och glöm inte läkarintyg om du är sjuk mer än en vecka. Okej, tack för informationen.`,
        questions: [
          { text: '¿Por qué llama Carlos?', options: ['Para pedir vacaciones', 'Para avisar que está enfermo', 'Para renunciar', 'Para pedir un aumento'], correct: 1, explanation: 'Jag är sjuk idag = estoy enfermo hoy (sjukanmälan).' },
          { text: '¿Qué síntomas tiene?', options: ['Dolor de espalda', 'Fiebre y dolor de garganta', 'Dolor de cabeza', 'Ninguno'], correct: 1, explanation: 'Feber och ont i halsen = fiebre y dolor de garganta.' },
          { text: '¿Qué debe hacer cada mañana que falte?', options: ['Ir al médico', 'Volver a avisar (sjukanmäla)', 'Nada', 'Enviar un correo'], correct: 1, explanation: 'Sjukanmäl dig varje morgon du är borta.' },
          { text: '¿Cuándo necesita un justificante médico (läkarintyg)?', options: ['Siempre', 'Si está enfermo más de una semana', 'Nunca', 'Solo el primer día'], correct: 1, explanation: 'Läkarintyg om du är sjuk mer än en vecka.' },
        ]
      },
    ],

    read: [
      {
            "id": "b-r-u1-1",
            "unit": 1,
            "unitTitle": "Presentación personal",
            "title": "Amina berättar",
            "kind": "Texto personal",
            "icon": "👋",
            "text": "Jag heter Amina och är trettiofem år. Jag kom till Sverige för tre år sedan från Somalia. Först bodde jag i Malmö, men nu bor jag i Göteborg med min familj. Jag studerar svenska och jobbar deltid på ett äldreboende. På fritiden gillar jag att träna och träffa vänner.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuándo llegó a Suecia?",
                        "options": [
                              "För tre år sedan",
                              "För fem år sedan",
                              "Förra veckan"
                        ],
                        "correct": 0,
                        "explanation": "«Jag kom till Sverige för tre år sedan»."
                  },
                  {
                        "type": "tf",
                        "text": "Amina bor i Malmö nu.",
                        "answer": false,
                        "explanation": "«nu bor jag i Göteborg»."
                  },
                  {
                        "type": "short",
                        "text": "¿Dónde trabaja? på ett ___",
                        "answer": "äldreboende",
                        "accept": [
                              "aldreboende"
                        ],
                        "explanation": "«jobbar deltid på ett äldreboende»."
                  }
            ]
      },
      {
            "id": "b-r-u1-2",
            "unit": 1,
            "unitTitle": "Presentación personal",
            "title": "Marco",
            "kind": "Texto personal",
            "icon": "🧑",
            "text": "Hej! Jag heter Marco och kommer från Italien. Jag har bott i Sverige i fem år. Jag är gift och har en son som heter Leo. Jag arbetar som kock på en restaurang i centrum. Jag tycker om mitt jobb, men det är ibland stressigt.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuánto lleva en Suecia?",
                        "options": [
                              "Ett år",
                              "Fem år",
                              "Tio år"
                        ],
                        "correct": 1,
                        "explanation": "«Jag har bott i Sverige i fem år»."
                  },
                  {
                        "type": "short",
                        "text": "¿En qué trabaja? som ___",
                        "answer": "kock",
                        "accept": [
                              "kock"
                        ],
                        "explanation": "«Jag arbetar som kock»."
                  },
                  {
                        "type": "tf",
                        "text": "Marco är inte gift.",
                        "answer": false,
                        "explanation": "«Jag är gift och har en son»."
                  }
            ]
      },
      {
            "id": "b-r-u2-1",
            "unit": 2,
            "unitTitle": "Familia y relaciones",
            "title": "Min syster",
            "kind": "Texto personal",
            "icon": "👭",
            "text": "Min syster Nadia är två år äldre än jag. Vi växte upp tillsammans och har alltid varit nära. När vi var små bråkade vi ofta, men idag är hon min bästa vän. Hon bor i Stockholm och vi ringer varandra varje vecka. Ibland åker jag och hälsar på henne.",
            "questions": [
                  {
                        "type": "tf",
                        "text": "Nadia är yngre än berättaren.",
                        "answer": false,
                        "explanation": "«två år äldre än jag»."
                  },
                  {
                        "type": "mc",
                        "text": "¿Con qué frecuencia se llaman?",
                        "options": [
                              "Varje dag",
                              "Varje vecka",
                              "Varje månad"
                        ],
                        "correct": 1,
                        "explanation": "«vi ringer varandra varje vecka»."
                  },
                  {
                        "type": "short",
                        "text": "¿Dónde vive Nadia?",
                        "answer": "Stockholm",
                        "accept": [
                              "stockholm"
                        ],
                        "explanation": "«Hon bor i Stockholm»."
                  }
            ]
      },
      {
            "id": "b-r-u2-2",
            "unit": 2,
            "unitTitle": "Familia y relaciones",
            "title": "En vanlig helg",
            "kind": "Texto personal",
            "icon": "🏡",
            "text": "I helgen var hela familjen hemma hos mina föräldrar. Vi lagade mat tillsammans och åt en stor middag. Barnen lekte i trädgården medan vi vuxna pratade och drack kaffe. Det var en lugn och trevlig dag. På kvällen åkte vi hem, trötta men glada.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Dónde se reunieron?",
                        "options": [
                              "Hemma hos föräldrarna",
                              "På en restaurang",
                              "I parken"
                        ],
                        "correct": 0,
                        "explanation": "«hemma hos mina föräldrar»."
                  },
                  {
                        "type": "tf",
                        "text": "Barnen lekte i trädgården.",
                        "answer": true,
                        "explanation": "«Barnen lekte i trädgården»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué bebieron los adultos?",
                        "answer": "kaffe",
                        "accept": [
                              "kaffe"
                        ],
                        "explanation": "«drack kaffe»."
                  }
            ]
      },
      {
            "id": "b-r-2",
            "title": "Brev från hyresvärden",
            "tag": "Vivienda formal",
            "icon": "✉️",
            "text": "Göteborg, den 15 maj 2025\n\nTill: Ricardo Méndez, Linnégatan 47\nFrån: Stadshem Fastighets AB\n\nKäre hyresgäst,\n\nVi skriver för att informera dig om att din lägenhet kommer att genomgå en obligatorisk besiktning den 3 juni klockan 10.00–12.00. Under besiktningen kontrolleras el, vatten, ventilation och brandskydd.\n\nVi ber dig vara hemma under angiven tid eller kontakta oss senast den 28 maj om du behöver boka om. Besiktningen är lagstadgad och kan inte skjutas upp mer än en gång.\n\nOm du har husdjur ber vi dig se till att de är säkrade under besöket.\n\nVid frågor, ring oss på 031-556 77 88 eller mejla info@stadshem.se.\n\nMed vänliga hälsningar,\nAnna Bergström, Förvaltare",
            "questions": [
                  {
                        "text": "¿Cuándo es la inspección?",
                        "options": [
                              "El 15 de mayo",
                              "El 3 de junio",
                              "El 28 de mayo",
                              "El 1 de julio"
                        ],
                        "correct": 1,
                        "explanation": "Den 3 juni klockan 10-12 = el 3 de junio de 10 a 12."
                  },
                  {
                        "text": "¿Qué se inspecciona?",
                        "options": [
                              "Solo el sistema eléctrico",
                              "Electricidad, agua, ventilación y protección contra incendios",
                              "Solo las ventanas",
                              "El mobiliario"
                        ],
                        "correct": 1,
                        "explanation": "El, vatten, ventilation och brandskydd = electricidad, agua, ventilación y protección contra incendios."
                  },
                  {
                        "text": "¿Cuándo hay que avisar si no se puede estar en casa?",
                        "options": [
                              "Antes del 1 de junio",
                              "Antes del 28 de mayo",
                              "Antes del 10 de mayo",
                              "No hay plazo"
                        ],
                        "correct": 1,
                        "explanation": "Kontakta oss senast den 28 maj = contactad antes del 28 de mayo."
                  },
                  {
                        "text": "¿Cuántas veces se puede posponer la inspección?",
                        "options": [
                              "Indefinidamente",
                              "Dos veces",
                              "Una vez",
                              "No se puede posponer"
                        ],
                        "correct": 2,
                        "explanation": "Kan inte skjutas upp mer än en gång = no puede posponerse más de una vez."
                  },
                  {
                        "text": "¿Qué dice la carta sobre las mascotas?",
                        "options": [
                              "No se permiten mascotas en el edificio",
                              "Deben estar aseguradas durante la visita",
                              "Hay que llevarlas al veterinario",
                              "No se menciona"
                        ],
                        "correct": 1,
                        "explanation": "Se till att de är säkrade = asegúrate de que estén aseguradas durante la visita."
                  }
            ],
            "unit": 3,
            "unitTitle": "Vivienda y barrio",
            "kind": "Carta"
      },
      {
            "id": "b-r-u3-1",
            "unit": 3,
            "unitTitle": "Vivienda y barrio",
            "title": "Vårt nya område",
            "kind": "Texto personal",
            "icon": "🏘️",
            "text": "För ett halvår sedan flyttade vi till ett nytt område. Lägenheten är större än den förra och har en fin balkong. I närheten finns en matbutik, en förskola och en park. Bussen till centrum tar femton minuter. Vi trivs mycket bra här och grannarna är trevliga.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuándo se mudaron?",
                        "options": [
                              "För ett halvår sedan",
                              "Förra veckan",
                              "För tre år sedan"
                        ],
                        "correct": 0,
                        "explanation": "«För ett halvår sedan flyttade vi»."
                  },
                  {
                        "type": "tf",
                        "text": "Den nya lägenheten är mindre.",
                        "answer": false,
                        "explanation": "«större än den förra»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuánto tarda el bus al centro? (número) ___ minuter",
                        "answer": "femton",
                        "accept": [
                              "15"
                        ],
                        "explanation": "«tar femton minuter»."
                  }
            ]
      },
      {
            "id": "b-r-u4-1",
            "unit": 4,
            "unitTitle": "Rutinas y tiempo libre",
            "title": "Min fritid",
            "kind": "Texto personal",
            "icon": "⚽",
            "text": "På vardagarna är jag ganska upptagen med jobb och svenska. Men på helgerna har jag mer tid för mig själv. Jag brukar promenera i skogen, laga god mat och ibland gå på bio. Förra lördagen spelade jag fotboll med några vänner. Det var kul, även om vi förlorade.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué hizo el sábado pasado?",
                        "options": [
                              "Spelade fotboll",
                              "Gick på bio",
                              "Lagade mat"
                        ],
                        "correct": 0,
                        "explanation": "«Förra lördagen spelade jag fotboll»."
                  },
                  {
                        "type": "tf",
                        "text": "Laget vann matchen.",
                        "answer": false,
                        "explanation": "«även om vi förlorade»."
                  },
                  {
                        "type": "short",
                        "text": "¿Dónde suele pasear? i ___",
                        "answer": "skogen",
                        "accept": [
                              "skog",
                              "skogen"
                        ],
                        "explanation": "«promenera i skogen»."
                  }
            ]
      },
      {
            "id": "b-r-u4-2",
            "unit": 4,
            "unitTitle": "Rutinas y tiempo libre",
            "title": "En bra vana",
            "kind": "Texto personal",
            "icon": "🌅",
            "text": "Sedan ett år tillbaka går jag upp tidigt varje morgon. Jag dricker ett glas vatten och tar en kort promenad innan frukost. Det ger mig energi för hela dagen. I början var det svårt, men nu är det en vana. Jag mår mycket bättre än förut.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué hace antes del desayuno?",
                        "options": [
                              "Tar en promenad",
                              "Tittar på tv",
                              "Sover"
                        ],
                        "correct": 0,
                        "explanation": "«tar en kort promenad innan frukost»."
                  },
                  {
                        "type": "tf",
                        "text": "I början var det lätt.",
                        "answer": false,
                        "explanation": "«I början var det svårt»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué bebe al despertar? ett glas ___",
                        "answer": "vatten",
                        "accept": [
                              "vatten"
                        ],
                        "explanation": "«ett glas vatten»."
                  }
            ]
      },
      {
            "id": "b-r-u5-1",
            "unit": 5,
            "unitTitle": "Escuela y estudios",
            "title": "Mitt mål",
            "kind": "Texto personal",
            "icon": "🎯",
            "text": "Jag studerar svenska på SFI sedan ett år. I början förstod jag nästan ingenting, men nu kan jag prata om vardagliga saker. Mitt mål är att klara nivå D och sedan studera till undersköterska. Läraren säger att jag gör framsteg. Jag pluggar varje kväll efter jobbet.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué quiere estudiar después?",
                        "options": [
                              "Till undersköterska",
                              "Till lärare",
                              "Till kock"
                        ],
                        "correct": 0,
                        "explanation": "«studera till undersköterska»."
                  },
                  {
                        "type": "tf",
                        "text": "Berättaren pluggar på morgonen.",
                        "answer": false,
                        "explanation": "«pluggar varje kväll efter jobbet»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué nivel quiere aprobar? nivå ___",
                        "answer": "D",
                        "accept": [
                              "d"
                        ],
                        "explanation": "«klara nivå D»."
                  }
            ]
      },
      {
            "id": "b-r-u5-2",
            "unit": 5,
            "unitTitle": "Escuela y estudios",
            "title": "Meddelande från skolan",
            "kind": "Mensaje",
            "icon": "🏫",
            "text": "Hej alla elever! Nästa vecka är det studiedag på fredag, så då är skolan stängd. På måndag har vi ett prov i läsförståelse. Glöm inte att ta med er penna och legitimation. Om ni är sjuka, ring och anmäl frånvaro före klockan åtta. Hälsningar, Rektorn.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Por qué cierra el viernes?",
                        "options": [
                              "Studiedag",
                              "Semester",
                              "Reparación"
                        ],
                        "correct": 0,
                        "explanation": "«studiedag på fredag»."
                  },
                  {
                        "type": "tf",
                        "text": "El lunes hay examen.",
                        "answer": true,
                        "explanation": "«På måndag har vi ett prov»."
                  },
                  {
                        "type": "short",
                        "text": "¿Antes de qué hora hay que avisar la ausencia? klockan ___",
                        "answer": "åtta",
                        "accept": [
                              "8",
                              "atta"
                        ],
                        "explanation": "«före klockan åtta»."
                  }
            ]
      },
      {
            "id": "b-r-1",
            "title": "Integration på arbetsmarknaden",
            "tag": "Sociedad",
            "icon": "📊",
            "text": "Allt fler nyanlända i Sverige hittar jobb inom ett år efter ankomst, visar en ny rapport från Migrationsverket. Under förra året fick 62 procent av de nyanlända som deltog i etableringsprogrammet ett arbete inom tolv månader. Det är en ökning med åtta procentenheter jämfört med föregående år.\n\nEn av framgångsfaktorerna är det förstärkta samarbetet mellan Arbetsförmedlingen och kommunerna. Kommunerna ansvarar för den initiala mottagningen, medan Arbetsförmedlingen fokuserar på jobbsökning.\n\nKritiker menar dock att kvaliteten på SFI-undervisningen varierar kraftigt mellan kommunerna. En studie från Skolverket visar att elever i storstäderna avklarar SFI snabbare än elever i mindre kommuner.\n\nRegeringen aviserade ytterligare investeringar i yrkessvenska och arbetsplatsförlagd utbildning.",
            "questions": [
                  {
                        "text": "¿Qué porcentaje de recién llegados encontró trabajo en un año?",
                        "options": [
                              "52%",
                              "70%",
                              "62%",
                              "80%"
                        ],
                        "correct": 2,
                        "explanation": "62 procent av de nyanlända = el 62% de los recién llegados."
                  },
                  {
                        "text": "¿Cuál es uno de los factores de éxito?",
                        "options": [
                              "Más ayudas sociales",
                              "Colaboración entre Arbetsförmedlingen y municipios",
                              "Más plazas en SFI",
                              "Mejor vivienda"
                        ],
                        "correct": 1,
                        "explanation": "Förstärkt samarbete mellan Arbetsförmedlingen och kommunerna = mayor colaboración entre la Arbetsförmedlingen y los municipios."
                  },
                  {
                        "text": "¿Qué crítica se menciona?",
                        "options": [
                              "Pocos profesores",
                              "La calidad de SFI varía mucho por municipio",
                              "Programas demasiado cortos",
                              "Los inmigrantes no quieren trabajar"
                        ],
                        "correct": 1,
                        "explanation": "Kvaliteten på SFI-undervisningen varierar kraftigt = la calidad de SFI varía mucho."
                  },
                  {
                        "text": "¿Qué anuncia el gobierno?",
                        "options": [
                              "Reducción de plazas SFI",
                              "Más inversión en sueco laboral y formación en empresa",
                              "Cierre de oficinas de empleo",
                              "Nuevas leyes de inmigración"
                        ],
                        "correct": 1,
                        "explanation": "Investeringar i yrkessvenska och arbetsplatsförlagd utbildning = inversiones en sueco laboral y formación en empresa."
                  },
                  {
                        "text": "¿Comparado con el año anterior, cómo ha cambiado el porcentaje?",
                        "options": [
                              "Ha bajado 8 puntos",
                              "Ha subido 8 puntos",
                              "Se mantiene igual",
                              "Ha subido 20 puntos"
                        ],
                        "correct": 1,
                        "explanation": "Ökning med åtta procentenheter = aumento de ocho puntos porcentuales."
                  }
            ],
            "unit": 6,
            "unitTitle": "Trabajo",
            "kind": "Texto informativo"
      },
      {
            "id": "b-r-u6-1",
            "unit": 6,
            "unitTitle": "Trabajo",
            "title": "Min första arbetsdag",
            "kind": "Texto personal",
            "icon": "💼",
            "text": "Igår var min första dag på det nya jobbet. Jag var lite nervös på morgonen, men mina kollegor var vänliga och hjälpsamma. Chefen visade mig runt och förklarade mina uppgifter. På lunchen åt jag tillsammans med teamet. När dagen var slut kände jag mig nöjd och glad.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuándo fue su primer día?",
                        "options": [
                              "Igår",
                              "Idag",
                              "Förra månaden"
                        ],
                        "correct": 0,
                        "explanation": "«Igår var min första dag»."
                  },
                  {
                        "type": "tf",
                        "text": "Kollegorna var otrevliga.",
                        "answer": false,
                        "explanation": "«mina kollegor var vänliga och hjälpsamma»."
                  },
                  {
                        "type": "short",
                        "text": "¿Con quién almorzó? med ___",
                        "answer": "teamet",
                        "accept": [
                              "laget",
                              "teamet"
                        ],
                        "explanation": "«åt jag tillsammans med teamet»."
                  }
            ]
      },
      {
            "id": "b-r-3",
            "title": "Ansök om a-kassa",
            "tag": "Trámites",
            "icon": "📋",
            "text": "A-kassan är en ekonomisk ersättning som du kan få om du förlorar ditt jobb. För att ha rätt till a-kassa behöver du uppfylla ett arbetsvillkor: du måste ha arbetat minst 80 timmar per månad i minst sex månader under de senaste tolv månaderna.\n\nDu måste också vara medlem i en a-kassa. Det finns flera a-kassor i Sverige och de är kopplade till olika branscher. Handels a-kassa är för de som jobbar inom handel och Unionen är för tjänstemän.\n\nErsättningen är 80 procent av din tidigare lön, men max 1 200 kronor per dag. Ersättningen betalas ut i 300 dagar.\n\nFör att ansöka: registrera dig som arbetssökande hos Arbetsförmedlingen och ansök sedan hos din a-kassa. Du kan göra allt digitalt med BankID.",
            "questions": [
                  {
                        "text": "¿Cuántas horas mínimo hay que trabajar al mes?",
                        "options": [
                              "40 horas",
                              "60 horas",
                              "80 horas",
                              "100 horas"
                        ],
                        "correct": 2,
                        "explanation": "Minst 80 timmar per månad = mínimo 80 horas al mes."
                  },
                  {
                        "text": "¿Cuánto tiempo mínimo hay que haber sido miembro de la a-kassa?",
                        "options": [
                              "3 meses",
                              "6 meses",
                              "1 año",
                              "2 años"
                        ],
                        "correct": 1,
                        "explanation": "Minst sex månader = mínimo seis meses."
                  },
                  {
                        "text": "¿Qué porcentaje del salario anterior se recibe?",
                        "options": [
                              "60%",
                              "70%",
                              "80%",
                              "100%"
                        ],
                        "correct": 2,
                        "explanation": "80 procent av din tidigare lön = 80% de tu salario anterior."
                  },
                  {
                        "text": "¿Cuántos días se recibe la prestación?",
                        "options": [
                              "180 días",
                              "200 días",
                              "250 días",
                              "300 días"
                        ],
                        "correct": 3,
                        "explanation": "Ersättningen betalas ut i 300 dagar = la prestación se paga durante 300 días."
                  },
                  {
                        "text": "¿Cómo se puede solicitar la a-kassa?",
                        "options": [
                              "Solo en persona",
                              "Por carta",
                              "Digitalmente con BankID",
                              "Por teléfono"
                        ],
                        "correct": 2,
                        "explanation": "Du kan göra allt digitalt med BankID = puedes hacerlo todo digitalmente con BankID."
                  }
            ],
            "unit": 7,
            "unitTitle": "Buscar trabajo",
            "kind": "Texto informativo"
      },
      {
            "id": "b-r-u7-1",
            "unit": 7,
            "unitTitle": "Buscar trabajo",
            "title": "En jobbannons",
            "kind": "Anuncio",
            "icon": "📌",
            "text": "Vi söker en butiksbiträde till vår matbutik i Solna. Du ska vara serviceinriktad och kunna arbeta i team. Erfarenhet är bra men inte ett krav. Vi erbjuder deltid, cirka tjugo timmar i veckan. Skicka din ansökan och ditt CV till jobb@butiken.se senast den 30 mars.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué puesto buscan?",
                        "options": [
                              "Butiksbiträde",
                              "Kock",
                              "Lärare"
                        ],
                        "correct": 0,
                        "explanation": "«Vi söker en butiksbiträde»."
                  },
                  {
                        "type": "tf",
                        "text": "Se necesita experiencia obligatoria.",
                        "answer": false,
                        "explanation": "«Erfarenhet är bra men inte ett krav»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuántas horas por semana? cirka ___ timmar",
                        "answer": "tjugo",
                        "accept": [
                              "20"
                        ],
                        "explanation": "«cirka tjugo timmar i veckan»."
                  }
            ]
      },
      {
            "id": "b-r-u8-1",
            "unit": 8,
            "unitTitle": "Compras y devoluciones",
            "title": "Ett köp som blev fel",
            "kind": "Texto personal",
            "icon": "🛍️",
            "text": "Förra veckan köpte jag ett par skor på internet. När paketet kom var skorna för små. Jag kontaktade kundtjänst och de sa att jag kunde byta dem gratis. Jag skickade tillbaka skorna och några dagar senare fick jag ett större par. Nu passar de perfekt.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cuál era el problema?",
                        "options": [
                              "Skorna var för små",
                              "Fel färg",
                              "Trasiga"
                        ],
                        "correct": 0,
                        "explanation": "«skorna för små»."
                  },
                  {
                        "type": "tf",
                        "text": "Han fick betala för el cambio.",
                        "answer": false,
                        "explanation": "«byta dem gratis»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué compró? ett par ___",
                        "answer": "skor",
                        "accept": [
                              "skorna"
                        ],
                        "explanation": "«köpte jag ett par skor»."
                  }
            ]
      },
      {
            "id": "b-r-u8-2",
            "unit": 8,
            "unitTitle": "Compras y devoluciones",
            "title": "REA-annons",
            "kind": "Anuncio",
            "icon": "🏷️",
            "text": "Stor vinterrea hos oss! Alla jackor och vinterskor säljs nu till halva priset. Öppettider: måndag–fredag 10–19, lördag 10–17. Vi har även en avdelning för barnkläder med extra bra priser. Välkommen in till butiken på Drottninggatan 12. Erbjudandet gäller så länge lagret räcker.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué descuento hay en abrigos?",
                        "options": [
                              "Halva priset",
                              "25%",
                              "Ingen rabatt"
                        ],
                        "correct": 0,
                        "explanation": "«till halva priset»."
                  },
                  {
                        "type": "tf",
                        "text": "Los sábados abren hasta las 19.",
                        "answer": false,
                        "explanation": "«lördag 10–17»."
                  },
                  {
                        "type": "short",
                        "text": "¿En qué calle está la tienda?",
                        "answer": "Drottninggatan",
                        "accept": [
                              "drottninggatan"
                        ],
                        "explanation": "«på Drottninggatan 12»."
                  }
            ]
      },
      {
            "id": "b-r-u9-1",
            "unit": 9,
            "unitTitle": "Alimentación y recetas",
            "title": "Köttbullar",
            "kind": "Instrucción",
            "icon": "🍽️",
            "text": "Så här gör du köttbullar. Blanda köttfärs med lök, ägg, ströbröd och lite mjölk. Krydda med salt och peppar. Rulla små bollar och stek dem i smör tills de är gyllenbruna. Servera med kokt potatis, brunsås och lingonsylt. Det är en klassisk svensk husmanskost.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Con qué se fríen las albóndigas?",
                        "options": [
                              "I smör",
                              "I vatten",
                              "I olja"
                        ],
                        "correct": 0,
                        "explanation": "«stek dem i smör»."
                  },
                  {
                        "type": "tf",
                        "text": "Se sirven con arroz.",
                        "answer": false,
                        "explanation": "«Servera med kokt potatis, brunsås och lingonsylt»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué mermelada se sirve? ___sylt",
                        "answer": "lingon",
                        "accept": [
                              "lingonsylt"
                        ],
                        "explanation": "«lingonsylt»."
                  }
            ]
      },
      {
            "id": "b-r-u9-2",
            "unit": 9,
            "unitTitle": "Alimentación y recetas",
            "title": "Middag hos en vän",
            "kind": "Texto personal",
            "icon": "🍲",
            "text": "I lördags var jag bjuden på middag hos min vän Sara. Hon lagade en indisk gryta med kyckling och ris. Det var väldigt gott, men lite starkt för mig. Vi pratade länge och lyssnade på musik. Innan jag gick hem fick jag receptet, så nu kan jag laga det själv.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué cocinó Sara?",
                        "options": [
                              "En indisk gryta",
                              "Pizza",
                              "Köttbullar"
                        ],
                        "correct": 0,
                        "explanation": "«en indisk gryta med kyckling»."
                  },
                  {
                        "type": "tf",
                        "text": "La comida estaba sosa.",
                        "answer": false,
                        "explanation": "«lite starkt för mig» = un poco picante."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué recibió antes de irse? ___et",
                        "answer": "recept",
                        "accept": [
                              "receptet"
                        ],
                        "explanation": "«fick jag receptet»."
                  }
            ]
      },
      {
            "id": "b-r-u10-1",
            "unit": 10,
            "unitTitle": "Salud y vårdcentral",
            "title": "På vårdcentralen",
            "kind": "Texto personal",
            "icon": "🏥",
            "text": "I måndags mådde jag inte bra. Jag hade ont i halsen och feber. Jag ringde vårdcentralen och fick en tid samma eftermiddag. Läkaren undersökte mig och sa att det var en vanlig förkylning. Hon rekommenderade vila och mycket vatten. Efter några dagar kände jag mig bättre.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué síntomas tenía?",
                        "options": [
                              "Ont i halsen och feber",
                              "Ont i benet",
                              "Huvudvärk"
                        ],
                        "correct": 0,
                        "explanation": "«ont i halsen och feber»."
                  },
                  {
                        "type": "tf",
                        "text": "Era una enfermedad grave.",
                        "answer": false,
                        "explanation": "«en vanlig förkylning» = un resfriado común."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué recomendó la médica? vila och mycket ___",
                        "answer": "vatten",
                        "accept": [
                              "vatten"
                        ],
                        "explanation": "«vila och mycket vatten»."
                  }
            ]
      },
      {
            "id": "b-r-u10-2",
            "unit": 10,
            "unitTitle": "Salud y vårdcentral",
            "title": "Kallelse",
            "kind": "Aviso",
            "icon": "📋",
            "text": "Hej! Du har en bokad tid för en hälsokontroll på vårdcentralen tisdag den 14 maj klockan 09:30. Kom fem minuter innan och ta med legitimation. Om du inte kan komma, avboka minst ett dygn i förväg, annars får du betala en avgift. Välkommen!",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Para qué es la cita?",
                        "options": [
                              "En hälsokontroll",
                              "En operation",
                              "Ett prov"
                        ],
                        "correct": 0,
                        "explanation": "«en hälsokontroll»."
                  },
                  {
                        "type": "tf",
                        "text": "Puedes cancelar el mismo día sin coste.",
                        "answer": false,
                        "explanation": "«avboka minst ett dygn i förväg, annars ... en avgift»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué hay que llevar?",
                        "answer": "legitimation",
                        "accept": [
                              "leg",
                              "legitimation"
                        ],
                        "explanation": "«ta med legitimation»."
                  }
            ]
      },
      {
            "id": "b-r-u11-1",
            "unit": 11,
            "unitTitle": "Transporte y viajes",
            "title": "En resa till Kiruna",
            "kind": "Texto personal",
            "icon": "🚆",
            "text": "I vintras reste jag och min familj till Kiruna i norra Sverige. Vi tog nattåget från Stockholm och resan tog nästan sjutton timmar. Det var kallt, nästan minus tjugo grader, men väldigt vackert med snö överallt. Vi såg norrsken på himlen. Det var en resa jag aldrig glömmer.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cómo viajaron?",
                        "options": [
                              "Med nattåg",
                              "Med flyg",
                              "Med bil"
                        ],
                        "correct": 0,
                        "explanation": "«Vi tog nattåget»."
                  },
                  {
                        "type": "tf",
                        "text": "Hacía calor en Kiruna.",
                        "answer": false,
                        "explanation": "«nästan minus tjugo grader»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué vieron en el cielo?",
                        "answer": "norrsken",
                        "accept": [
                              "norrskenet"
                        ],
                        "explanation": "«Vi såg norrsken»."
                  }
            ]
      },
      {
            "id": "b-r-u11-2",
            "unit": 11,
            "unitTitle": "Transporte y viajes",
            "title": "Trafikinfo",
            "kind": "Aviso",
            "icon": "🚧",
            "text": "Information till resenärer: På grund av arbete på spåret är tågtrafiken mellan Uppsala och Stockholm inställd i helgen. Ersättningsbussar går från stationen var trettionde minut. Räkna med längre restid än vanligt. Vi ber om ursäkt för problemen. Tack för ditt tålamod.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Por qué se cancelan los trenes?",
                        "options": [
                              "Arbete på spåret",
                              "Dåligt väder",
                              "Strejk"
                        ],
                        "correct": 0,
                        "explanation": "«arbete på spåret»."
                  },
                  {
                        "type": "tf",
                        "text": "Hay autobuses de reemplazo.",
                        "answer": true,
                        "explanation": "«Ersättningsbussar går»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cada cuántos minutos salen los buses? var ___ minut",
                        "answer": "trettionde",
                        "accept": [
                              "30",
                              "trettio"
                        ],
                        "explanation": "«var trettionde minut»."
                  }
            ]
      },
      {
            "id": "b-r-u12-1",
            "unit": 12,
            "unitTitle": "Citas e invitaciones",
            "title": "Bokningsbekräftelse",
            "kind": "Aviso",
            "icon": "📅",
            "text": "Tack för din bokning! Du har bokat ett bord för fyra personer på restaurang Smaka lördag den 8 juni klockan 19:00. Om ni blir fler eller färre, hör av er senast dagen innan. Vi ser fram emot ert besök. Vänliga hälsningar, restaurang Smaka.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Para cuántas personas es la reserva?",
                        "options": [
                              "Två",
                              "Fyra",
                              "Sex"
                        ],
                        "correct": 1,
                        "explanation": "«ett bord för fyra personer»."
                  },
                  {
                        "type": "tf",
                        "text": "La reserva es para el almuerzo.",
                        "answer": false,
                        "explanation": "«klockan 19:00» = por la noche."
                  },
                  {
                        "type": "short",
                        "text": "¿Cómo se llama el restaurante?",
                        "answer": "Smaka",
                        "accept": [
                              "smaka"
                        ],
                        "explanation": "«restaurang Smaka»."
                  }
            ]
      },
      {
            "id": "b-r-u12-2",
            "unit": 12,
            "unitTitle": "Citas e invitaciones",
            "title": "En inbjudan",
            "kind": "Invitación",
            "icon": "🎉",
            "text": "Hej! Jag vill bjuda in dig till min examensfest lördagen den 15 juni klockan 17. Festen är hemma hos mig på Parkvägen 8. Det blir mat, musik och dans. Säg gärna till senast den 10 juni om du kan komma. Jag hoppas verkligen att vi ses! Kram, Lisa.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué se celebra?",
                        "options": [
                              "En examensfest",
                              "Ett bröllop",
                              "En födelsedag"
                        ],
                        "correct": 0,
                        "explanation": "«min examensfest»."
                  },
                  {
                        "type": "tf",
                        "text": "Hay que confirmar antes del 10 de junio.",
                        "answer": true,
                        "explanation": "«Säg gärna till senast den 10 juni»."
                  },
                  {
                        "type": "short",
                        "text": "¿Quién invita? (nombre)",
                        "answer": "Lisa",
                        "accept": [
                              "lisa"
                        ],
                        "explanation": "«Kram, Lisa»."
                  }
            ]
      },
      {
            "id": "b-r-u13-1",
            "unit": 13,
            "unitTitle": "Mensajes y correos",
            "title": "Ett mejl till en vän",
            "kind": "Mensaje",
            "icon": "📧",
            "text": "Hej Omar! Tack för sist, det var jättekul att träffas förra veckan. Jag undrar om du vill komma på middag hos oss nästa fredag? Vi tänkte grilla om vädret är fint. Ta gärna med din familj. Hör av dig när du kan. Ha det bra! Hälsningar, David.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué propone David?",
                        "options": [
                              "Middag på fredag",
                              "En resa",
                              "En film"
                        ],
                        "correct": 0,
                        "explanation": "«komma på middag hos oss nästa fredag»."
                  },
                  {
                        "type": "tf",
                        "text": "David quiere ir solo con Omar.",
                        "answer": false,
                        "explanation": "«Ta gärna med din familj»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué piensan hacer si hace buen tiempo?",
                        "answer": "grilla",
                        "accept": [
                              "grilla"
                        ],
                        "explanation": "«Vi tänkte grilla»."
                  }
            ]
      },
      {
            "id": "b-r-u13-2",
            "unit": 13,
            "unitTitle": "Mensajes y correos",
            "title": "Meddelande till hyresvärden",
            "kind": "Mensaje",
            "icon": "🔧",
            "text": "Hej! Jag heter Ana och bor på Skolgatan 5, lägenhet 12. Jag vill anmäla ett problem: kranen i köket droppar hela tiden och diskmaskinen fungerar inte. Kan ni skicka en reparatör den här veckan? Jag är hemma på eftermiddagarna. Tack på förhand. Vänliga hälsningar, Ana.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué problema reporta?",
                        "options": [
                              "Kranen droppar och diskmaskinen är trasig",
                              "Ingen värme",
                              "Trasig dörr"
                        ],
                        "correct": 0,
                        "explanation": "«kranen droppar ... diskmaskinen fungerar inte»."
                  },
                  {
                        "type": "tf",
                        "text": "Ana está en casa por las mañanas.",
                        "answer": false,
                        "explanation": "«hemma på eftermiddagarna»."
                  },
                  {
                        "type": "short",
                        "text": "¿En qué calle vive?",
                        "answer": "Skolgatan",
                        "accept": [
                              "skolgatan"
                        ],
                        "explanation": "«på Skolgatan 5»."
                  }
            ]
      },
      {
            "id": "b-r-4",
            "title": "Klimatförändringar i Sverige",
            "tag": "Medioambiente",
            "icon": "🌿",
            "text": "Sverige är ett av de länder som tar klimatfrågan på störst allvar. Riksdagen har beslutat att Sverige ska vara klimatneutralt år 2045. Det innebär att utsläppen av växthusgaser ska vara noll och att landet aktivt bidrar till att minska koldioxid i atmosfären.\n\nEn viktig del av klimatarbetet är övergången till förnybar energi. Sverige producerar redan mer än hälften av sin el från vattenkraft och vindkraft. Kärnkraft bidrar med ytterligare en tredjedel.\n\nI vardagslivet uppmanas svenska befolkningen att resa kollektivt, äta mindre kött och sortera sitt avfall noggrant. Källsortering är obligatoriskt i Sverige och kommunerna ansvarar för att samla in och återvinna material.\n\nTrots framstegen kvarstår utmaningar inom transportsektorn, som fortfarande är beroende av fossila bränslen.",
            "questions": [
                  {
                        "text": "¿Para qué año quiere Suecia ser climaticamente neutral?",
                        "options": [
                              "2030",
                              "2040",
                              "2045",
                              "2050"
                        ],
                        "correct": 2,
                        "explanation": "Sverige ska vara klimatneutralt år 2045 = Suecia quiere ser climáticamente neutra en 2045."
                  },
                  {
                        "text": "¿Qué tipo de energía produce Suecia principalmente?",
                        "options": [
                              "Solar y eólica",
                              "Hidráulica y eólica",
                              "Nuclear y carbón",
                              "Gas y solar"
                        ],
                        "correct": 1,
                        "explanation": "Vattenkraft och vindkraft = energía hidráulica y eólica."
                  },
                  {
                        "text": "¿Qué se pide a la población sueca en la vida cotidiana?",
                        "options": [
                              "Comprar coches eléctricos",
                              "Usar transporte público, comer menos carne y reciclar",
                              "Instalar paneles solares",
                              "No volar al extranjero"
                        ],
                        "correct": 1,
                        "explanation": "Resa kollektivt, äta mindre kött och sortera sitt avfall = viajar en transporte público, comer menos carne y separar la basura."
                  },
                  {
                        "text": "¿Qué sector sigue siendo un desafío?",
                        "options": [
                              "La industria pesada",
                              "El sector agrícola",
                              "El transporte",
                              "La construcción"
                        ],
                        "correct": 2,
                        "explanation": "Transportsektorn kvarstår som utmaning = el sector del transporte sigue siendo un desafío."
                  },
                  {
                        "text": "¿Qué porcentaje aproximado de la electricidad produce la energía nuclear?",
                        "options": [
                              "10%",
                              "20%",
                              "Un tercio (33%)",
                              "Más de la mitad"
                        ],
                        "correct": 2,
                        "explanation": "Kärnkraft bidrar med ytterligare en tredjedel = la energía nuclear contribuye con otro tercio."
                  }
            ],
            "unit": 14,
            "unitTitle": "Noticias y sociedad",
            "kind": "Artículo"
      },
      {
            "id": "b-r-u14-1",
            "unit": 14,
            "unitTitle": "Noticias y sociedad",
            "title": "Nyhet: ny cykelväg",
            "kind": "Artículo",
            "icon": "📰",
            "text": "Från och med nästa månad öppnar en ny cykelväg mellan centrum och universitetet. Kommunen hoppas att fler ska välja cykeln istället för bilen. Det är bra både för hälsan och för miljön. Cykelvägen är fem kilometer lång och har belysning. Många invånare är positiva till förändringen.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué se inaugura?",
                        "options": [
                              "En ny cykelväg",
                              "En ny skola",
                              "Ett sjukhus"
                        ],
                        "correct": 0,
                        "explanation": "«en ny cykelväg»."
                  },
                  {
                        "type": "tf",
                        "text": "La ciudad quiere que la gente use más el coche.",
                        "answer": false,
                        "explanation": "«fler ska välja cykeln istället för bilen»."
                  },
                  {
                        "type": "short",
                        "text": "¿Cuántos km mide? (número) ___ kilometer",
                        "answer": "fem",
                        "accept": [
                              "5"
                        ],
                        "explanation": "«fem kilometer lång»."
                  }
            ]
      },
      {
            "id": "b-r-u15-1",
            "unit": 15,
            "unitTitle": "Experiencias y planes",
            "title": "Mitt första år i Sverige",
            "kind": "Texto personal",
            "icon": "🏅",
            "text": "När jag kom till Sverige kändes allt nytt och svårt. Jag förstod inte språket och saknade mitt hemland. Men steg för steg blev det bättre. Jag hittade vänner på SFI och började förstå hur samhället fungerar. Idag känner jag mig hemma här och ser positivt på framtiden.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Cómo se sentía al principio?",
                        "options": [
                              "Allt var svårt",
                              "Allt var lätt",
                              "Han var glad"
                        ],
                        "correct": 0,
                        "explanation": "«allt nytt och svårt»."
                  },
                  {
                        "type": "tf",
                        "text": "Ahora se siente en casa en Suecia.",
                        "answer": true,
                        "explanation": "«Idag känner jag mig hemma här»."
                  },
                  {
                        "type": "short",
                        "text": "¿Dónde encontró amigos? på ___",
                        "answer": "SFI",
                        "accept": [
                              "sfi"
                        ],
                        "explanation": "«hittade vänner på SFI»."
                  }
            ]
      },
      {
            "id": "b-r-u15-2",
            "unit": 15,
            "unitTitle": "Experiencias y planes",
            "title": "Mina planer",
            "kind": "Texto personal",
            "icon": "🔮",
            "text": "I framtiden vill jag utbilda mig och få ett fast jobb. Först ska jag klara svenskan och sedan söka en yrkesutbildning. Om några år hoppas jag kunna köpa en egen lägenhet. Jag vill också resa tillbaka till mitt hemland och hälsa på min familj. Jag tror att framtiden blir bra.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "¿Qué quiere hacer primero?",
                        "options": [
                              "Klara svenskan",
                              "Köpa en lägenhet",
                              "Resa"
                        ],
                        "correct": 0,
                        "explanation": "«Först ska jag klara svenskan»."
                  },
                  {
                        "type": "tf",
                        "text": "No quiere volver a su país.",
                        "answer": false,
                        "explanation": "«resa tillbaka till mitt hemland»."
                  },
                  {
                        "type": "short",
                        "text": "¿Qué quiere comprar? en egen ___",
                        "answer": "lägenhet",
                        "accept": [
                              "lagenhet",
                              "lägenheten"
                        ],
                        "explanation": "«köpa en egen lägenhet»."
                  }
            ]
      }
],

    write: [
      {
            "id": "b-w-1",
            "unit": 1,
            "unitTitle": "Presentación",
            "title": "Berätta om dig själv",
            "icon": "👋",
            "words": "30–60 ord",
            "prompt": "Situación:\nDu ska presentera dig i din SFI-grupp.\n\nInstrucciones:\nBerätta vem du är: varifrån du kommer, hur länge du har bott i Sverige och vad du gör. Använd minst två sammanbindningsord (och, men, sedan).",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "bor"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿De dónde vienes?",
                  "¿Cuánto llevas en Suecia?",
                  "¿Qué estudias o en qué trabajas?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Empieza: Jag heter... och kommer från...",
                  "Di cuánto tiempo: Jag har bott i Sverige i...",
                  "Une ideas con «och», «men», «sedan»"
            ],
            "useful": [
                  "kom till",
                  "bor",
                  "har bott",
                  "studerar",
                  "jobbar",
                  "sedan",
                  "men"
            ],
            "example": "Jag heter Amina och kommer från Somalia. Jag har bott i Sverige i tre år. Först bodde jag i Malmö, men sedan flyttade jag till Göteborg. Nu studerar jag svenska på SFI och jobbar deltid på ett äldreboende.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-2",
            "unit": 2,
            "unitTitle": "Familia",
            "title": "Skriv om din familj",
            "icon": "👪",
            "words": "30–60 ord",
            "prompt": "Situación:\nEn vän vill veta mer om din familj.\n\nInstrucciones:\nBeskriv din familj: vilka de är, vad de gör och er relation. Skriv sammanhängande med sammanbindningsord.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "familj"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Quiénes forman tu familia?",
                  "¿Qué hacen?",
                  "¿Cómo es tu relación con ellos?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Min familj består av...",
                  "Min man/fru/syster heter... och...",
                  "Vi brukar... tillsammans"
            ],
            "useful": [
                  "familj",
                  "syster",
                  "bror",
                  "föräldrar",
                  "tillsammans",
                  "brukar",
                  "för det mesta"
            ],
            "example": "Min familj är inte så stor. Jag bor med min man och våra två barn. Min syster bor också i Sverige, men mina föräldrar bor kvar i mitt hemland. Vi ringer varandra ofta och för det mesta träffas vi på sommaren.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-3",
            "unit": 3,
            "unitTitle": "Vivienda y barrio",
            "title": "Beskriv ditt område",
            "icon": "🏘️",
            "words": "30–60 ord",
            "prompt": "Situación:\nEn person som ska flytta frågar om ditt bostadsområde.\n\nInstrucciones:\nBeskriv var du bor och hur området är. Nämn vad som finns i närheten och vad du tycker.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "bor"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Dónde vives?",
                  "¿Qué hay cerca?",
                  "¿Qué te gusta o no del barrio?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Jag bor i ett område som heter...",
                  "I närheten finns...",
                  "Jag trivs bra, men..."
            ],
            "useful": [
                  "område",
                  "lägenhet",
                  "i närheten",
                  "matbutik",
                  "park",
                  "trivs",
                  "men"
            ],
            "example": "Jag bor i ett lugnt område utanför centrum. Lägenheten är inte så stor, men den är mysig. I närheten finns en matbutik, en förskola och en fin park. Bussen till centrum tar femton minuter. Jag trivs bra här därför att grannarna är trevliga.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-4",
            "unit": 4,
            "unitTitle": "Rutinas y tiempo libre",
            "title": "Berätta om förra helgen",
            "icon": "📅",
            "words": "30–60 ord",
            "prompt": "Situación:\nDin lärare vill att du berättar om din helg.\n\nInstrucciones:\nBerätta vad du gjorde förra helgen. Använd dåtid (t.ex. åkte, träffade, lagade).",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "sedan"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Qué hiciste el fin de semana?",
                  "¿Con quién?",
                  "¿Usaste el pasado (dåtid)?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "I helgen... / Förra lördagen...",
                  "Först... och sedan...",
                  "På kvällen..."
            ],
            "useful": [
                  "i helgen",
                  "förra lördagen",
                  "åkte",
                  "träffade",
                  "lagade",
                  "sedan",
                  "sträffade"
            ],
            "example": "Förra helgen var lugn och skön. På lördagen träffade jag några vänner och vi fikade i centrum. Sedan handlade jag mat och lagade middag hemma. På söndagen sov jag länge och tog en promenad i parken. Det var en riktigt trevlig helg.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-5",
            "unit": 5,
            "unitTitle": "Escuela y estudios",
            "title": "Dina studier och ditt mål",
            "icon": "🎯",
            "words": "30–60 ord",
            "prompt": "Situación:\nDu skriver om varför du studerar svenska.\n\nInstrucciones:\nBerätta hur det går med svenskan och vad ditt mål är. Förklara varför.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "därför"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Cómo te va con el sueco?",
                  "¿Cuál es tu meta?",
                  "¿Por qué (därför att...)?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Jag studerar svenska därför att...",
                  "Mitt mål är att...",
                  "I början var det svårt, men nu..."
            ],
            "useful": [
                  "studerar",
                  "mål",
                  "därför att",
                  "klara",
                  "utbildning",
                  "framsteg",
                  "men"
            ],
            "example": "Jag studerar svenska därför att jag vill kunna jobba och prata med människor här. I början var det svårt och jag förstod nästan ingenting, men nu går det bättre. Mitt mål är att klara nivå D och sedan börja en utbildning till undersköterska.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-6",
            "unit": 6,
            "unitTitle": "Trabajo",
            "title": "Ett jobb du har haft",
            "icon": "💼",
            "words": "30–60 ord",
            "prompt": "Situación:\nBerätta om ett jobb, i Sverige eller i ditt hemland.\n\nInstrucciones:\nBeskriv jobbet: vad du gjorde, om du trivdes och varför. Använd dåtid.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "jobb"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Qué trabajo era?",
                  "¿Qué hacías?",
                  "¿Te gustaba? ¿Por qué?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Jag jobbade som... i...",
                  "Mina uppgifter var att...",
                  "Jag trivdes, men ibland..."
            ],
            "useful": [
                  "jobbade",
                  "arbetade",
                  "uppgifter",
                  "kollegor",
                  "trivdes",
                  "därför att",
                  "men"
            ],
            "example": "I mitt hemland jobbade jag som lärare i en skola. Mina uppgifter var att undervisa barn och rätta prov. Jag trivdes bra därför att jag tycker om att arbeta med människor. Ibland var det stressigt, men mina kollegor var snälla och hjälpte mig mycket.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-7",
            "unit": 7,
            "unitTitle": "Buscar trabajo",
            "title": "Ett kort personligt brev",
            "icon": "✉️",
            "words": "30–60 ord",
            "prompt": "Situación:\nDu söker ett deltidsjobb i en matbutik.\n\nInstrucciones:\nSkriv ett kort brev. Hälsa, berätta kort om dig själv och varför du passar för jobbet, och avsluta artigt.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "jobb"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Saludaste?",
                  "¿Contaste algo de ti y por qué encajas?",
                  "¿Te despediste correctamente?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Hej! Jag heter... och söker jobbet som...",
                  "Jag är... och har erfarenhet av...",
                  "Med vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "söker",
                  "erfarenhet",
                  "serviceinriktad",
                  "passar",
                  "med vänliga hälsningar"
            ],
            "example": "Hej! Jag heter Marco och jag är intresserad av jobbet som butiksbiträde. Jag är serviceinriktad och gillar att arbeta med människor. Sedan tidigare har jag erfarenhet från en restaurang, därför tror jag att jag passar bra. Med vänliga hälsningar, Marco.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-8",
            "unit": 8,
            "unitTitle": "Compras y devoluciones",
            "title": "Något du har köpt",
            "icon": "🛍️",
            "words": "30–60 ord",
            "prompt": "Situación:\nBerätta om en sak du köpte som blev fel.\n\nInstrucciones:\nBeskriv vad du köpte, vad problemet var och hur det löste sig. Använd dåtid.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "köpte"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Qué compraste?",
                  "¿Cuál era el problema?",
                  "¿Cómo se resolvió?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Förra veckan köpte jag...",
                  "Problemet var att...",
                  "Sedan kontaktade jag..."
            ],
            "useful": [
                  "köpte",
                  "beställde",
                  "problemet",
                  "för liten",
                  "bytte",
                  "kontaktade",
                  "sedan"
            ],
            "example": "Förra månaden köpte jag en jacka på internet. När paketet kom var jackan för liten och fel färg. Sedan kontaktade jag kundtjänst och de var hjälpsamma. Jag skickade tillbaka jackan och fick en ny gratis. Nu är jag nöjd med mitt köp.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-9",
            "unit": 9,
            "unitTitle": "Alimentación",
            "title": "En middag du minns",
            "icon": "🍽️",
            "words": "30–60 ord",
            "prompt": "Situación:\nBerätta om en god middag du har ätit.\n\nInstrucciones:\nBeskriv maten, var du var och med vem. Berätta om det var gott.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "mat"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Qué comida era?",
                  "¿Dónde y con quién?",
                  "¿Cómo estaba?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "I lördags åt jag...",
                  "Vi var hemma hos.../på en restaurang...",
                  "Det var gott, men lite..."
            ],
            "useful": [
                  "mat",
                  "åt",
                  "lagade",
                  "gott",
                  "starkt",
                  "tillsammans",
                  "sedan"
            ],
            "example": "I lördags var jag bjuden på middag hos min vän Sara. Hon lagade en indisk gryta med kyckling och ris. Det var väldigt gott, men lite starkt för mig. Vi pratade länge och lyssnade på musik. Sedan fick jag receptet så att jag kan laga det själv.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-10",
            "unit": 10,
            "unitTitle": "Salud",
            "title": "Ett besök på vårdcentralen",
            "icon": "🏥",
            "words": "30–60 ord",
            "prompt": "Situación:\nBerätta om en gång du var sjuk.\n\nInstrucciones:\nBeskriv vad som hände: symtom, vad läkaren sa och hur det gick. Använd dåtid.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "ont"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Qué te pasó?",
                  "¿Qué dijo el médico?",
                  "¿Cómo terminó?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "I måndags mådde jag inte bra...",
                  "Jag hade ont i...",
                  "Läkaren sa att..."
            ],
            "useful": [
                  "ont",
                  "feber",
                  "förkylning",
                  "läkaren",
                  "undersökte",
                  "vila",
                  "sedan"
            ],
            "example": "I måndags mådde jag inte bra. Jag hade ont i halsen och feber, därför ringde jag vårdcentralen. Jag fick en tid samma dag och läkaren undersökte mig. Hon sa att det bara var en förkylning och att jag skulle vila. Efter några dagar mådde jag bättre.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-11",
            "unit": 11,
            "unitTitle": "Transporte y viajes",
            "title": "Berätta om en resa",
            "icon": "✈️",
            "words": "30–60 ord",
            "prompt": "Situación:\nBerätta om en resa du har gjort.\n\nInstrucciones:\nBeskriv vart du åkte, hur du reste och vad du gjorde. Använd dåtid.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "åkte"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Adónde fuiste?",
                  "¿Cómo viajaste?",
                  "¿Qué hiciste allí?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "I vintras/förra sommaren åkte jag till...",
                  "Vi reste med...",
                  "Vi såg... och..."
            ],
            "useful": [
                  "åkte",
                  "reste",
                  "tåg",
                  "flyg",
                  "såg",
                  "besökte",
                  "sedan"
            ],
            "example": "Förra vintern reste jag och min familj till Kiruna i norra Sverige. Vi åkte nattåg från Stockholm och resan tog nästan sjutton timmar. Det var mycket kallt, men väldigt vackert. Vi såg norrsken på himlen och åkte skidor. Det var en resa jag aldrig glömmer.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-12",
            "unit": 12,
            "unitTitle": "Invitaciones",
            "title": "Bjud in en vän",
            "icon": "🎉",
            "words": "30–60 ord",
            "prompt": "Situación:\nDu vill bjuda in en vän till en fest.\n\nInstrucciones:\nSkriv ett mejl. Hälsa, berätta om festen (dag, tid, plats), fråga om vännen kan komma och avsluta.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": true,
                  "keywords": [
                        "fest"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Saludaste?",
                  "¿Diste día, hora y lugar?",
                  "¿Preguntaste si puede venir?",
                  "¿Te despediste?"
            ],
            "hints": [
                  "Hej [nombre]!",
                  "Jag har fest den... klockan... hemma hos mig.",
                  "Kan du komma? Hör av dig!",
                  "Kram,"
            ],
            "useful": [
                  "hej",
                  "fest",
                  "klockan",
                  "hemma hos mig",
                  "kan du komma",
                  "hör av dig",
                  "kram"
            ],
            "example": "Hej Lisa! Jag fyller år på lördag och vill bjuda in dig till en fest. Den börjar klockan sex hemma hos mig på Parkvägen 8. Det blir mat, musik och dans. Kan du komma? Hör gärna av dig senast på torsdag. Kram, Ana.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-13",
            "unit": 13,
            "unitTitle": "Mensajes y correos",
            "title": "Mejl till hyresvärden",
            "icon": "🔧",
            "words": "30–60 ord",
            "prompt": "Situación:\nNågot är trasigt i din lägenhet.\n\nInstrucciones:\nSkriv ett mejl till hyresvärden. Hälsa, beskriv problemet, be om hjälp och avsluta artigt.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "problem"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Saludaste?",
                  "¿Describiste el problema?",
                  "¿Pediste ayuda/reparación?",
                  "¿Te despediste?"
            ],
            "hints": [
                  "Hej! Jag bor på... och vill anmäla ett problem.",
                  "Kranen/värmen/dörren...",
                  "Kan ni skicka en reparatör?",
                  "Vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "anmäla",
                  "problem",
                  "trasig",
                  "reparatör",
                  "vänliga hälsningar",
                  "tack på förhand"
            ],
            "example": "Hej! Jag heter Ana och bor på Skolgatan 5. Jag vill anmäla ett problem, för kranen i köket droppar hela tiden och diskmaskinen fungerar inte. Kan ni skicka en reparatör den här veckan? Jag är hemma på eftermiddagarna. Tack på förhand. Vänliga hälsningar, Ana.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-14",
            "unit": 14,
            "unitTitle": "Noticias y sociedad",
            "title": "Vad tycker du?",
            "icon": "📰",
            "words": "30–60 ord",
            "prompt": "Situación:\nDu läste en nyhet om en ny cykelväg i din stad.\n\nInstrucciones:\nSkriv kort vad nyheten handlade om och vad du tycker. Förklara varför.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "därför"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿De qué trataba la noticia?",
                  "¿Qué opinas?",
                  "¿Por qué (därför att...)?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "Jag läste att...",
                  "Jag tycker att det är bra/dåligt...",
                  "...därför att..."
            ],
            "useful": [
                  "jag läste",
                  "nyhet",
                  "cykelväg",
                  "jag tycker",
                  "bra för miljön",
                  "därför att",
                  "men"
            ],
            "example": "Jag läste en nyhet om att kommunen ska bygga en ny cykelväg mellan centrum och universitetet. Jag tycker att det är en bra idé därför att fler kan cykla istället för att ta bilen. Det är bra både för hälsan och för miljön, men jag hoppas att den blir klar snart.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      },
      {
            "id": "b-w-15",
            "unit": 15,
            "unitTitle": "Experiencias y planes",
            "title": "Dina planer för framtiden",
            "icon": "🔮",
            "words": "30–60 ord",
            "prompt": "Situación:\nBerätta om dina planer.\n\nInstrucciones:\nSkriv vad du vill göra i framtiden och varför. Använd framtid (ska, vill, hoppas).",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "framtiden"
                  ],
                  "min": 30,
                  "max": 60
            },
            "selfCheck": [
                  "¿Qué quieres hacer en el futuro?",
                  "¿En qué orden (först, sedan)?",
                  "¿Por qué?",
                  "¿Usaste conectores como och, men, sedan o därför att?"
            ],
            "hints": [
                  "I framtiden vill jag...",
                  "Först ska jag... och sedan...",
                  "Jag hoppas att..."
            ],
            "useful": [
                  "framtiden",
                  "vill",
                  "ska",
                  "hoppas",
                  "utbildning",
                  "fast jobb",
                  "sedan"
            ],
            "example": "I framtiden vill jag utbilda mig och få ett fast jobb. Först ska jag klara svenskan och sedan söka en yrkesutbildning. Om några år hoppas jag kunna köpa en egen lägenhet. Jag vill också resa tillbaka till mitt hemland och hälsa på min familj. Jag tror att framtiden blir bra.",
            "criteria": [
                  "Contenido: ¿cumpliste la tarea?",
                  "Coherencia: se entiende tu texto",
                  "Conectores: och, men, sedan, därför att",
                  "Extensión adecuada (30–60 palabras)"
            ]
      }
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
      { category: 'Gramática', text: 'Comparativo/superlativo: "Det här är den _____ boken." (mejor)', options: ['bra', 'bättre', 'bäst', 'bästa'], correct: 3, explanation: 'Superlativo definido: bra → bäst → den BÄSTA boken.' },
      { category: 'Gramática', text: 'Relativo correcto: "Mannen _____ bor här är läkare."', options: ['som', 'vad', 'vilken', 'det'], correct: 0, explanation: '"som" = que (relativo): Mannen SOM bor här = el hombre que vive aquí.' },
      { category: 'Gramática', text: 'Partikelverb: "Kan du _____ ljuset?" (apagar)', options: ['stänga av', 'sätta på', 'ta av', 'gå av'], correct: 0, explanation: 'Stänga AV = apagar. Sätta på = encender.' },
      { category: 'Gramática', text: 'Ordföljd tras bisats: "När jag kom hem, _____ jag mat."', options: ['jag lagade', 'lagade jag', 'jag lagar', 'har jag lagat'], correct: 1, explanation: 'Regla V2: tras la bisats, el verbo va primero: ...LAGADE JAG mat.' },
      { category: 'Vocabulario', text: '¿Qué significa "att ansöka"?', options: ['Rechazar', 'Solicitar', 'Pagar', 'Firmar'], correct: 1, explanation: 'Ansöka = solicitar (ej. ansöka om jobb = solicitar un trabajo).' },
      { category: 'Vocabulario', text: 'Antónimo de "billig":', options: ['dyr', 'ny', 'stor', 'lång'], correct: 0, explanation: 'Billig (barato) ↔ DYR (caro).' },
      { category: 'Comprensión', text: '"Om du blir sjuk, ring vårdcentralen." ¿Qué debes hacer si te enfermas?', options: ['Ir al hospital directo', 'Llamar al centro de salud', 'Esperar', 'Tomar medicina'], correct: 1, explanation: 'Ring vårdcentralen = llama al centro de salud (vårdcentral).' },
      { category: 'Comprensión', text: '"Hyran ska betalas senast den femte varje månad." ¿Cuándo se paga el alquiler?', options: ['El día 15', 'A más tardar el día 5', 'Cuando quieras', 'Cada semana'], correct: 1, explanation: 'Senast den femte = a más tardar el día 5 de cada mes.' },
    ]
  },

  // ── SFI C y D (placeholder) ─────────────────────────────
  C: {
    listen: [
      {
        id: 'c-l-1', title: 'På Arbetsförmedlingen', topic: 'Jobb & samhälle', icon: '💼', duration: '~60s',
        text: `God morgon! Välkommen. Vad kan jag hjälpa dig med idag? Hej. Jag söker jobb och behöver hjälp med mitt CV. Absolut. Vad har du för utbildning och erfarenhet? Jag är utbildad sjuksköterska från mitt hemland, men jag har inte fått min legitimation i Sverige ännu. Jag förstår. Då rekommenderar jag att du kontaktar Socialstyrelsen för att validera din utbildning. Under tiden kan du söka jobb som undersköterska. Har du gått en SFI-kurs? Ja, jag är klar med SFI och läser nu svenska på nivå C. Utmärkt. God svenska är mycket viktigt inom vården.`,
        questions: [
          { text: 'Vad arbetade personen med i sitt hemland?', options: ['Läkare', 'Sjuksköterska', 'Undersköterska', 'Lärare'], correct: 1, explanation: 'Jag är utbildad sjuksköterska = la persona es enfermera de profesión.' },
          { text: 'Vilken myndighet ska personen kontakta för att validera utbildningen?', options: ['Skatteverket', 'Försäkringskassan', 'Socialstyrelsen', 'Migrationsverket'], correct: 2, explanation: 'Kontakta Socialstyrelsen för att validera din utbildning.' },
          { text: 'Vad kan personen jobba som under tiden?', options: ['Läkare', 'Undersköterska', 'Chef', 'Tolk'], correct: 1, explanation: 'Du kan söka jobb som undersköterska mientras valida el título.' },
          { text: 'Vilken svensknivå läser personen nu?', options: ['Nivå A', 'Nivå B', 'Nivå C', 'Nivå D'], correct: 2, explanation: 'Läser nu svenska på nivå C.' },
        ]
      },
      {
        id: 'c-l-2', title: 'Föräldramötet', topic: 'Skola & familj', icon: '🏫', duration: '~55s',
        text: `Hej och välkomna till föräldramötet. Jag är Anna, klasslärare för årskurs tre. Idag vill jag prata om läxor och närvaro. Det är viktigt att barnen kommer i tid till skolan varje morgon. Om ert barn är sjukt, ska ni anmäla frånvaro före klockan åtta. Har alla förstått hur man gör en sjukanmälan? En förälder frågar: Ursäkta, hur anmäler man om man inte kan svenska så bra? Bra fråga. Ni kan ringa skolans expedition eller använda appen. Vi har också information på flera språk.`,
        questions: [
          { text: 'Vilken årskurs undervisar Anna?', options: ['Årskurs ett', 'Årskurs tre', 'Årskurs fem', 'Förskolan'], correct: 1, explanation: 'Klasslärare för årskurs tre.' },
          { text: 'Före vilken tid ska man anmäla frånvaro?', options: ['Klockan sju', 'Klockan åtta', 'Klockan nio', 'Klockan tio'], correct: 1, explanation: 'Anmäla frånvaro före klockan åtta.' },
          { text: 'Vad handlar mötet om?', options: ['Betyg och prov', 'Läxor och närvaro', 'Skolmaten', 'Sommarlovet'], correct: 1, explanation: 'Prata om läxor och närvaro.' },
          { text: 'Hur kan en förälder anmäla frånvaro?', options: ['Bara personligen', 'Ringa expeditionen eller använda appen', 'Skicka brev', 'Det går inte'], correct: 1, explanation: 'Ni kan ringa skolans expedition eller använda appen.' },
        ]
      },
      {
        id: 'c-l-3', title: 'Hos hyresvärden', topic: 'Boende', icon: '🏠', duration: '~55s',
        text: `Hej, jag ringer angående lägenheten på Storgatan. Är den fortfarande ledig? Ja, den är ledig från och med första maj. Vad bra. Hur mycket är hyran? Hyran är niotusen kronor i månaden, och då ingår värme och vatten. Ingår el också? Nej, el betalar du själv. Behöver jag betala deposition? Nej, men vi vill se ett anställningsbevis och en inkomstuppgift. Jag har fast anställning, så det är inga problem. Perfekt. Då kan vi boka en visning på torsdag klockan sjutton.`,
        questions: [
          { text: 'När är lägenheten ledig?', options: ['Första april', 'Första maj', 'Första juni', 'Direkt'], correct: 1, explanation: 'Ledig från och med första maj.' },
          { text: 'Vad ingår i hyran?', options: ['El', 'Värme och vatten', 'Internet', 'Ingenting'], correct: 1, explanation: 'Då ingår värme och vatten.' },
          { text: 'Vad vill hyresvärden se?', options: ['Pass och visum', 'Anställningsbevis och inkomstuppgift', 'Betyg', 'Körkort'], correct: 1, explanation: 'Vi vill se ett anställningsbevis och en inkomstuppgift.' },
          { text: 'När är visningen?', options: ['Måndag', 'Onsdag', 'Torsdag klockan sjutton', 'Fredag'], correct: 2, explanation: 'Boka en visning på torsdag klockan sjutton.' },
        ]
      },
      {
        id: 'c-l-4', title: 'På vårdcentralen', topic: 'Hälsa', icon: '🩺', duration: '~55s',
        text: `Vårdcentralen, hur kan jag hjälpa dig? Hej, jag skulle vilja boka en tid. Jag har ont i ryggen sedan en vecka. Har du feber eller andra symtom? Nej, bara ont i ryggen, särskilt på morgonen. Har du provat receptfria smärtstillande? Ja, men det hjälper inte så mycket. Då bokar jag en tid till dig i morgon klockan halv tre. Kom ihåg att ta med legitimation. Ska jag betala något? Ja, patientavgiften är tvåhundra kronor. Om du har frikort betalar du inget.`,
        questions: [
          { text: 'Hur länge har personen haft ont i ryggen?', options: ['En dag', 'En vecka', 'En månad', 'Ett år'], correct: 1, explanation: 'Ont i ryggen sedan en vecka.' },
          { text: 'När är tiden bokad?', options: ['Idag', 'I morgon klockan halv tre', 'Nästa vecka', 'Om en timme'], correct: 1, explanation: 'En tid i morgon klockan halv tre.' },
          { text: 'Vad ska personen ta med?', options: ['Pengar', 'Legitimation', 'Recept', 'En vän'], correct: 1, explanation: 'Kom ihåg att ta med legitimation.' },
          { text: 'Vad betalar man med frikort?', options: ['Tvåhundra kronor', 'Hundra kronor', 'Inget', 'Femtio kronor'], correct: 2, explanation: 'Om du har frikort betalar du inget.' },
        ]
      },
      {
        id: 'c-l-5', title: 'Kundtjänst — en reklamation', topic: 'Konsument', icon: '📞', duration: '~55s',
        text: `Kundtjänst, du talar med Erik. Hej, jag köpte en tvättmaskin för två veckor sedan och den fungerar inte. Vad tråkigt. Vad är problemet? Den startar inte alls, trots att jag följt instruktionerna. Har du kvar kvittot? Ja, jag har både kvitto och garantibevis. Bra. Enligt konsumentlagen har du rätt att få den lagad eller utbytt. Vi skickar en tekniker inom tre arbetsdagar. Kan jag få en ny maskin istället? Om den inte går att laga, får du en ny utan extra kostnad.`,
        questions: [
          { text: 'Vad är problemet med tvättmaskinen?', options: ['Den läcker vatten', 'Den startar inte', 'Den är för dyr', 'Den är fel färg'], correct: 1, explanation: 'Den startar inte alls.' },
          { text: 'Vad har kunden kvar?', options: ['Bara kvittot', 'Kvitto och garantibevis', 'Ingenting', 'Bara kartongen'], correct: 1, explanation: 'Jag har både kvitto och garantibevis.' },
          { text: 'Vad säger konsumentlagen?', options: ['Man får inga pengar tillbaka', 'Man har rätt att få den lagad eller utbytt', 'Man måste betala reparationen', 'Garantin gäller inte'], correct: 1, explanation: 'Du har rätt att få den lagad eller utbytt.' },
          { text: 'När kommer teknikern?', options: ['Samma dag', 'Inom tre arbetsdagar', 'Nästa månad', 'Aldrig'], correct: 1, explanation: 'Vi skickar en tekniker inom tre arbetsdagar.' },
        ]
      },
      {
        id: 'c-l-6', title: 'Kollektivtrafiken', topic: 'Resor', icon: '🚆', duration: '~50s',
        text: `Information till resenärer. Tåget mot Stockholm är cirka femton minuter försenat på grund av ett tekniskt fel. Vi beklagar förseningen. En resenär frågar en annan: Ursäkta, vet du om jag hinner byta till bussen? Om tåget är femton minuter sent, då missar du nog bussen som går kvart över. Men det går en till en halvtimme senare. Måste jag köpa en ny biljett? Nej, din biljett gäller i sjuttiofem minuter, så du kan byta utan att betala igen. Tack så mycket för hjälpen!`,
        questions: [
          { text: 'Varför är tåget försenat?', options: ['Dåligt väder', 'Ett tekniskt fel', 'För många resenärer', 'En olycka'], correct: 1, explanation: 'Försenat på grund av ett tekniskt fel.' },
          { text: 'Hur mycket är tåget försenat?', options: ['Fem minuter', 'Femton minuter', 'En timme', 'En halvtimme'], correct: 1, explanation: 'Cirka femton minuter försenat.' },
          { text: 'Hur länge gäller biljetten?', options: ['Trettio minuter', 'Sextio minuter', 'Sjuttiofem minuter', 'Hela dagen'], correct: 2, explanation: 'Din biljett gäller i sjuttiofem minuter.' },
          { text: 'Måste resenären köpa en ny biljett för att byta?', options: ['Ja, alltid', 'Nej, biljetten gäller vid byte', 'Bara på helger', 'Bara om tåget är sent'], correct: 1, explanation: 'Du kan byta utan att betala igen.' },
        ]
      },
    ],
    read: [
      {
            "id": "c-r-1",
            "unit": 1,
            "unitTitle": "Arbete och att söka jobb",
            "title": "Att söka jobb i Sverige",
            "kind": "Faktatext",
            "icon": "💼",
            "text": "Att söka jobb i Sverige kräver ofta både ett CV och ett personligt brev. Många jobb finns på nätet, till exempel på Arbetsförmedlingens webbplats. Det är vanligt att arbetsgivare vill träffa dig på en intervju innan de anställer dig. Kontakter är också viktiga – många får jobb genom vänner eller praktik. Var beredd att berätta om din erfarenhet och varför just du passar för tjänsten.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad behöver man ofta när man söker jobb?",
                        "options": [
                              "Ett CV och ett personligt brev",
                              "Bara ett CV",
                              "Ett körkort"
                        ],
                        "correct": 0,
                        "explanation": "«kräver ofta både ett CV och ett personligt brev»."
                  },
                  {
                        "type": "tf",
                        "text": "Enligt texten får många jobb genom kontakter.",
                        "answer": true,
                        "explanation": "«många får jobb genom vänner eller praktik»."
                  },
                  {
                        "type": "short",
                        "text": "Var finns många jobb? På ___ webbplats.",
                        "answer": "Arbetsförmedlingens",
                        "accept": [
                              "arbetsförmedlingen",
                              "arbetsförmedlingens"
                        ],
                        "explanation": "«på Arbetsförmedlingens webbplats»."
                  }
            ]
      },
      {
            "id": "c-r-u1-2",
            "unit": 1,
            "unitTitle": "Arbete och att söka jobb",
            "title": "En jobbannons",
            "kind": "Annons",
            "icon": "📌",
            "text": "Vi söker en engagerad medarbetare till vårt lager i Jönköping. Arbetsuppgifterna innebär att packa varor, köra truck och hålla ordning. Vi ser gärna att du har truckkort och erfarenhet, men det är inte ett krav. Tjänsten är en tillsvidareanställning på heltid. Vi erbjuder kollektivavtal och friskvårdsbidrag. Skicka din ansökan senast den 15 april. Vid frågor, kontakta Anna på 070-123 45 67.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vilken typ av anställning är det?",
                        "options": [
                              "Tillsvidare på heltid",
                              "Deltid på helger",
                              "Sommarjobb"
                        ],
                        "correct": 0,
                        "explanation": "«en tillsvidareanställning på heltid»."
                  },
                  {
                        "type": "tf",
                        "text": "Man måste ha truckkort för att söka.",
                        "answer": false,
                        "explanation": "«men det är inte ett krav»."
                  },
                  {
                        "type": "short",
                        "text": "Senast vilken månad ska man söka?",
                        "answer": "april",
                        "accept": [
                              "april"
                        ],
                        "explanation": "«senast den 15 april»."
                  }
            ]
      },
      {
            "id": "c-r-u2-1",
            "unit": 2,
            "unitTitle": "CV och personligt brev",
            "title": "Tips för ditt CV",
            "kind": "Faktatext",
            "icon": "📄",
            "text": "Ett bra CV är kort och tydligt, oftast en till två sidor. Börja med dina kontaktuppgifter och en kort presentation. Skriv sedan din arbetslivserfarenhet med den senaste tjänsten först. Ta med din utbildning och dina språkkunskaper. Anpassa alltid ditt CV efter jobbet du söker och ta bara med det som är relevant. Kom ihåg att rätta stavfel innan du skickar det.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Hur långt bör ett CV vara?",
                        "options": [
                              "En till två sidor",
                              "Minst fem sidor",
                              "En halv sida"
                        ],
                        "correct": 0,
                        "explanation": "«oftast en till två sidor»."
                  },
                  {
                        "type": "tf",
                        "text": "Man ska skriva den äldsta tjänsten först.",
                        "answer": false,
                        "explanation": "«med den senaste tjänsten först»."
                  },
                  {
                        "type": "short",
                        "text": "Vad ska man rätta innan man skickar? ___fel",
                        "answer": "stav",
                        "accept": [
                              "stavfel"
                        ],
                        "explanation": "«rätta stavfel innan du skickar»."
                  }
            ]
      },
      {
            "id": "c-r-u2-2",
            "unit": 2,
            "unitTitle": "CV och personligt brev",
            "title": "Ett personligt brev",
            "kind": "Brev",
            "icon": "✉️",
            "text": "Hej! Jag heter Marco och söker tjänsten som kock på er restaurang. Jag har arbetat i kök i fem år, både i Italien och i Sverige. Jag är stresstålig, noggrann och gillar att arbeta i team. Jag tror att min erfarenhet av italiensk mat passar bra hos er. Jag bifogar mitt CV och referenser. Jag ser fram emot att höra från er. Med vänliga hälsningar, Marco Rossi.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vilket jobb söker Marco?",
                        "options": [
                              "Kock",
                              "Servitör",
                              "Diskare"
                        ],
                        "correct": 0,
                        "explanation": "«söker tjänsten som kock»."
                  },
                  {
                        "type": "tf",
                        "text": "Marco har bara arbetat i Italien.",
                        "answer": false,
                        "explanation": "«både i Italien och i Sverige»."
                  },
                  {
                        "type": "short",
                        "text": "Hur många år har han arbetat i kök?",
                        "answer": "fem",
                        "accept": [
                              "5"
                        ],
                        "explanation": "«arbetat i kök i fem år»."
                  }
            ]
      },
      {
            "id": "c-r-u3-1",
            "unit": 3,
            "unitTitle": "Intervju och rättigheter",
            "title": "Inför intervjun",
            "kind": "Faktatext",
            "icon": "🤝",
            "text": "Inför en anställningsintervju är det bra att förbereda sig. Läs på om företaget och fundera på vad du vill säga om dig själv. Kom i tid och klä dig prydligt. Under intervjun får du ofta frågor om dina styrkor och svagheter. Var ärlig men positiv. Du får också ställa egna frågor, till exempel om arbetstider och lön. Efter intervjun kan du skicka ett kort tackmejl.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad är bra att göra före intervjun?",
                        "options": [
                              "Läsa på om företaget",
                              "Komma sent",
                              "Låta bli att fråga"
                        ],
                        "correct": 0,
                        "explanation": "«Läs på om företaget»."
                  },
                  {
                        "type": "tf",
                        "text": "Man får inte ställa egna frågor.",
                        "answer": false,
                        "explanation": "«Du får också ställa egna frågor»."
                  },
                  {
                        "type": "short",
                        "text": "Vad kan man skicka efter intervjun? Ett ___mejl",
                        "answer": "tack",
                        "accept": [
                              "tackmejl"
                        ],
                        "explanation": "«skicka ett kort tackmejl»."
                  }
            ]
      },
      {
            "id": "c-r-u3-2",
            "unit": 3,
            "unitTitle": "Intervju och rättigheter",
            "title": "Rättigheter på jobbet",
            "kind": "Faktatext",
            "icon": "⚖️",
            "text": "På en svensk arbetsplats har du både rättigheter och skyldigheter. Du har rätt till en säker arbetsmiljö, semester och lön enligt avtal. Facket kan hjälpa dig om det uppstår problem. Samtidigt har du skyldighet att komma i tid, göra ditt arbete och följa reglerna. Om du blir sjuk ska du sjukanmäla dig samma dag. Kollektivavtal reglerar ofta villkoren mellan arbetsgivare och anställda.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vem kan hjälpa dig vid problem på jobbet?",
                        "options": [
                              "Facket",
                              "Grannen",
                              "Skatteverket"
                        ],
                        "correct": 0,
                        "explanation": "«Facket kan hjälpa dig»."
                  },
                  {
                        "type": "tf",
                        "text": "Man ska sjukanmäla sig samma dag.",
                        "answer": true,
                        "explanation": "«ska du sjukanmäla dig samma dag»."
                  },
                  {
                        "type": "short",
                        "text": "Vad reglerar ofta villkoren? ___avtal",
                        "answer": "kollektiv",
                        "accept": [
                              "kollektivavtal"
                        ],
                        "explanation": "«Kollektivavtal reglerar ofta villkoren»."
                  }
            ]
      },
      {
            "id": "c-r-2",
            "unit": 4,
            "unitTitle": "Hälsa och vården",
            "title": "Sjukvården i Sverige",
            "kind": "Faktatext",
            "icon": "🏥",
            "text": "I Sverige börjar du oftast med att kontakta en vårdcentral om du blir sjuk. Där kan du träffa en läkare eller sjuksköterska. Om det är akut och allvarligt ringer du 112 eller åker till en akutmottagning. För rådgivning kan du ringa 1177 dygnet runt. Vården kostar en patientavgift, men det finns ett högkostnadsskydd så att du inte betalar mer än en viss summa per år.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vart vänder man sig först när man blir sjuk?",
                        "options": [
                              "Vårdcentralen",
                              "Akutmottagningen",
                              "Apoteket"
                        ],
                        "correct": 0,
                        "explanation": "«börjar du oftast med att kontakta en vårdcentral»."
                  },
                  {
                        "type": "tf",
                        "text": "Man ringer 112 för enkla råd.",
                        "answer": false,
                        "explanation": "112 är för akut; för råd ringer man 1177."
                  },
                  {
                        "type": "short",
                        "text": "Vilket nummer ringer man för rådgivning?",
                        "answer": "1177",
                        "accept": [
                              "1177"
                        ],
                        "explanation": "«kan du ringa 1177 dygnet runt»."
                  }
            ]
      },
      {
            "id": "c-r-u4-2",
            "unit": 4,
            "unitTitle": "Hälsa och vården",
            "title": "Kallelse till hälsokontroll",
            "kind": "Aviso",
            "icon": "📋",
            "text": "Du kallas till en hälsokontroll på din vårdcentral onsdagen den 12 juni klockan 10:15. Ta med legitimation och en lista på eventuella mediciner du tar. Om du inte kan komma, avboka minst 24 timmar i förväg, annars debiteras en avgift. Kontrollen tar cirka 30 minuter. Har du frågor kan du logga in på 1177.se eller ringa oss på vardagar mellan klockan 8 och 16.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad ska du ta med dig?",
                        "options": [
                              "Legitimation och en medicinlista",
                              "Bara pengar",
                              "Ingenting"
                        ],
                        "correct": 0,
                        "explanation": "«Ta med legitimation och en lista på ... mediciner»."
                  },
                  {
                        "type": "tf",
                        "text": "Man kan avboka samma dag utan avgift.",
                        "answer": false,
                        "explanation": "«avboka minst 24 timmar i förväg, annars debiteras en avgift»."
                  },
                  {
                        "type": "short",
                        "text": "Hur länge tar kontrollen? cirka ___ minuter",
                        "answer": "30",
                        "accept": [
                              "trettio"
                        ],
                        "explanation": "«tar cirka 30 minuter»."
                  }
            ]
      },
      {
            "id": "c-r-u5-1",
            "unit": 5,
            "unitTitle": "Myndigheter",
            "title": "Skatteverket",
            "kind": "Faktatext",
            "icon": "🏛️",
            "text": "Skatteverket ansvarar för skatter och folkbokföring i Sverige. När du flyttar till Sverige registrerar du dig hos Skatteverket och kan få ett personnummer. Personnumret behövs för nästan allt: att öppna bankkonto, få vård och söka jobb. Varje år ska du deklarera din inkomst, men ofta är deklarationen redan ifylld och du behöver bara godkänna den. Om du flyttar ska du göra en flyttanmälan.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad ansvarar Skatteverket för?",
                        "options": [
                              "Skatter och folkbokföring",
                              "Sjukvård",
                              "Bostäder"
                        ],
                        "correct": 0,
                        "explanation": "«ansvarar för skatter och folkbokföring»."
                  },
                  {
                        "type": "tf",
                        "text": "Personnumret behövs för att öppna bankkonto.",
                        "answer": true,
                        "explanation": "«att öppna bankkonto, få vård och söka jobb»."
                  },
                  {
                        "type": "short",
                        "text": "Vad ska man göra varje år med sin inkomst?",
                        "answer": "deklarera",
                        "accept": [
                              "deklarera",
                              "deklaration"
                        ],
                        "explanation": "«ska du deklarera din inkomst»."
                  }
            ]
      },
      {
            "id": "c-r-u5-2",
            "unit": 5,
            "unitTitle": "Myndigheter",
            "title": "Försäkringskassan och Arbetsförmedlingen",
            "kind": "Faktatext",
            "icon": "🗂️",
            "text": "Försäkringskassan betalar ut ersättningar, till exempel föräldrapenning, sjukpenning och bostadsbidrag. Du ansöker oftast via deras webbplats med bank-id. Arbetsförmedlingen hjälper dig som är arbetslös att hitta jobb och kan erbjuda utbildningar och praktik. Det är viktigt att du är inskriven där om du söker ersättning. Båda myndigheterna har information på flera språk och du kan boka tid för att få hjälp.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad betalar Försäkringskassan ut?",
                        "options": [
                              "Ersättningar som sjukpenning",
                              "Löner",
                              "Skatter"
                        ],
                        "correct": 0,
                        "explanation": "«betalar ut ersättningar, till exempel ... sjukpenning»."
                  },
                  {
                        "type": "tf",
                        "text": "Arbetsförmedlingen hjälper arbetslösa att hitta jobb.",
                        "answer": true,
                        "explanation": "«hjälper dig som är arbetslös att hitta jobb»."
                  },
                  {
                        "type": "short",
                        "text": "Vad använder man ofta för att ansöka? ___-id",
                        "answer": "bank",
                        "accept": [
                              "bank-id",
                              "bankid"
                        ],
                        "explanation": "«via deras webbplats med bank-id»."
                  }
            ]
      },
      {
            "id": "c-r-3",
            "unit": 6,
            "unitTitle": "Bostad och kontrakt",
            "title": "Att hyra en bostad",
            "kind": "Faktatext",
            "icon": "🏠",
            "text": "Att hitta en bostad i storstäderna kan vara svårt. Många ställer sig i en bostadskö för att få en hyresrätt med förstahandskontrakt. Ett förstahandskontrakt betyder att du hyr direkt av hyresvärden och har trygga rättigheter. Ett andrahandskontrakt betyder att du hyr av någon som själv hyr lägenheten. Läs alltid kontraktet noga och var försiktig med bedragare som ber om pengar i förväg utan att visa lägenheten.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad betyder ett förstahandskontrakt?",
                        "options": [
                              "Du hyr direkt av hyresvärden",
                              "Du hyr av en annan hyresgäst",
                              "Du äger lägenheten"
                        ],
                        "correct": 0,
                        "explanation": "«du hyr direkt av hyresvärden»."
                  },
                  {
                        "type": "tf",
                        "text": "Man ska alltid betala i förväg innan man ser lägenheten.",
                        "answer": false,
                        "explanation": "«var försiktig med bedragare som ber om pengar i förväg»."
                  },
                  {
                        "type": "short",
                        "text": "Vad ställer man sig i för att få en hyresrätt? En bostads___",
                        "answer": "kö",
                        "accept": [
                              "bostadskö",
                              "kö"
                        ],
                        "explanation": "«ställer sig i en bostadskö»."
                  }
            ]
      },
      {
            "id": "c-r-u6-2",
            "unit": 6,
            "unitTitle": "Bostad och kontrakt",
            "title": "Meddelande från hyresvärden",
            "kind": "Aviso",
            "icon": "🔧",
            "text": "Information till alla hyresgäster: Nästa vecka byter vi ut vattenledningarna i huset. Vattnet kommer att vara avstängt tisdag den 20 mars mellan klockan 09 och 15. Vi ber er att fylla vatten i förväg. Arbetet är nödvändigt för att undvika framtida läckor. Vi beklagar besväret. Har ni frågor kan ni kontakta fastighetsskötaren. Tack för ert tålamod. Med vänlig hälsning, Fastighetsbolaget.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Varför stängs vattnet av?",
                        "options": [
                              "Vattenledningarna byts ut",
                              "Det är för dyrt",
                              "Ingen bor där"
                        ],
                        "correct": 0,
                        "explanation": "«byter vi ut vattenledningarna»."
                  },
                  {
                        "type": "tf",
                        "text": "Vattnet är avstängt hela dagen.",
                        "answer": false,
                        "explanation": "«mellan klockan 09 och 15»."
                  },
                  {
                        "type": "short",
                        "text": "Vem kan man kontakta vid frågor?",
                        "answer": "fastighetsskötaren",
                        "accept": [
                              "fastighetsskötaren",
                              "fastighetsskötare"
                        ],
                        "explanation": "«kontakta fastighetsskötaren»."
                  }
            ]
      },
      {
            "id": "c-r-u7-1",
            "unit": 7,
            "unitTitle": "Ekonomi och bank",
            "title": "Att betala räkningar",
            "kind": "Faktatext",
            "icon": "💳",
            "text": "I Sverige betalar de flesta sina räkningar via internetbanken. Varje räkning har ett sista betalningsdatum, ett belopp och ett OCR-nummer. Om du betalar för sent kan du få en påminnelseavgift. Många väljer autogiro så att räkningarna dras automatiskt. Det är klokt att göra en budget och spara en del av lönen varje månad. På så sätt får du bättre koll på din ekonomi.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad händer om du betalar för sent?",
                        "options": [
                              "Du kan få en påminnelseavgift",
                              "Räkningen försvinner",
                              "Du får pengar tillbaka"
                        ],
                        "correct": 0,
                        "explanation": "«kan du få en påminnelseavgift»."
                  },
                  {
                        "type": "tf",
                        "text": "Med autogiro dras räkningarna automatiskt.",
                        "answer": true,
                        "explanation": "«väljer autogiro så att räkningarna dras automatiskt»."
                  },
                  {
                        "type": "short",
                        "text": "Vad är klokt att göra för att ha koll? En ___",
                        "answer": "budget",
                        "accept": [
                              "budgeten"
                        ],
                        "explanation": "«klokt att göra en budget»."
                  }
            ]
      },
      {
            "id": "c-r-u7-2",
            "unit": 7,
            "unitTitle": "Ekonomi och bank",
            "title": "En påminnelse",
            "kind": "Aviso",
            "icon": "⚠️",
            "text": "Påminnelse: Vår faktura nummer 4821 på 750 kronor har ännu inte betalats. Sista betalningsdag var den 5 maj. Vänligen betala snarast, senast den 19 maj, för att undvika ytterligare avgifter. Använd OCR-numret på fakturan när du betalar. Om du redan har betalat kan du bortse från detta meddelande. Har du frågor om fakturan, kontakta vår kundtjänst på vardagar.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad handlar meddelandet om?",
                        "options": [
                              "En obetald faktura",
                              "En ny produkt",
                              "En återbetalning"
                        ],
                        "correct": 0,
                        "explanation": "«har ännu inte betalats»."
                  },
                  {
                        "type": "tf",
                        "text": "Fakturan är på 750 kronor.",
                        "answer": true,
                        "explanation": "«en faktura ... på 750 kronor»."
                  },
                  {
                        "type": "short",
                        "text": "Vilket nummer ska man använda när man betalar? ___-numret",
                        "answer": "OCR",
                        "accept": [
                              "ocr",
                              "ocr-numret"
                        ],
                        "explanation": "«Använd OCR-numret»."
                  }
            ]
      },
      {
            "id": "c-r-4",
            "unit": 8,
            "unitTitle": "Familj och skola",
            "title": "Att vara förälder i Sverige",
            "kind": "Faktatext",
            "icon": "👨‍👩‍👧",
            "text": "Som förälder i Sverige har du rätt till föräldraledighet och föräldrapenning från Försäkringskassan. Barn kan börja på förskola från ett års ålder, och det finns en maxtaxa så att avgiften inte blir för hög. Skolan är gratis och obligatorisk från sex års ålder. Det är vanligt att skolan och föräldrarna har utvecklingssamtal om hur barnet trivs och utvecklas. Ett bra samarbete mellan hem och skola är viktigt.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Från vilken ålder kan barn börja på förskola?",
                        "options": [
                              "Från ett års ålder",
                              "Från tre års ålder",
                              "Från sex års ålder"
                        ],
                        "correct": 0,
                        "explanation": "«från ett års ålder»."
                  },
                  {
                        "type": "tf",
                        "text": "Skolan är gratis i Sverige.",
                        "answer": true,
                        "explanation": "«Skolan är gratis och obligatorisk»."
                  },
                  {
                        "type": "short",
                        "text": "Vad kallas mötet mellan skola och föräldrar? ___samtal",
                        "answer": "utvecklings",
                        "accept": [
                              "utvecklingssamtal"
                        ],
                        "explanation": "«har utvecklingssamtal»."
                  }
            ]
      },
      {
            "id": "c-r-u8-2",
            "unit": 8,
            "unitTitle": "Familj och skola",
            "title": "Meddelande från skolan",
            "kind": "Mensaje",
            "icon": "🏫",
            "text": "Hej alla vårdnadshavare! Nästa fredag har vi en gemensam friluftsdag. Eleverna ska vara på skolan klockan 8 och ta med matsäck, oömma kläder och skor efter väder. Vi är tillbaka cirka klockan 14. Om ditt barn inte kan delta, meddela klassläraren i förväg. Det blir en rolig dag med lekar och samarbete. Vänliga hälsningar, personalen på Björkskolan.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad ska eleverna ta med?",
                        "options": [
                              "Matsäck och kläder efter väder",
                              "Böcker och pengar",
                              "Ingenting"
                        ],
                        "correct": 0,
                        "explanation": "«ta med matsäck, oömma kläder och skor efter väder»."
                  },
                  {
                        "type": "tf",
                        "text": "Friluftsdagen är på en måndag.",
                        "answer": false,
                        "explanation": "«Nästa fredag»."
                  },
                  {
                        "type": "short",
                        "text": "Vem ska man meddela om barnet inte kan delta?",
                        "answer": "klassläraren",
                        "accept": [
                              "klassläraren",
                              "läraren"
                        ],
                        "explanation": "«meddela klassläraren»."
                  }
            ]
      },
      {
            "id": "c-r-u9-1",
            "unit": 9,
            "unitTitle": "Samhälle och föreningsliv",
            "title": "Föreningar i Sverige",
            "kind": "Faktatext",
            "icon": "🤸",
            "text": "Föreningslivet är en viktig del av det svenska samhället. Det finns föreningar för nästan allt: idrott, kultur, natur och språk. Att vara med i en förening är ett bra sätt att träffa nya människor, öva svenska och känna sig delaktig. Många föreningar drivs av volontärer, alltså personer som hjälper till utan lön. Ofta kostar det lite eller ingenting att vara medlem. Fråga på biblioteket om du vill hitta en förening.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Varför är det bra att gå med i en förening?",
                        "options": [
                              "För att träffa människor och öva svenska",
                              "För att tjäna pengar",
                              "För att slippa jobba"
                        ],
                        "correct": 0,
                        "explanation": "«ett bra sätt att träffa nya människor, öva svenska»."
                  },
                  {
                        "type": "tf",
                        "text": "Alla föreningar kostar mycket pengar.",
                        "answer": false,
                        "explanation": "«kostar det lite eller ingenting att vara medlem»."
                  },
                  {
                        "type": "short",
                        "text": "Vad kallas personer som hjälper till utan lön?",
                        "answer": "volontärer",
                        "accept": [
                              "volontärer",
                              "volontär"
                        ],
                        "explanation": "«drivs av volontärer»."
                  }
            ]
      },
      {
            "id": "c-r-u9-2",
            "unit": 9,
            "unitTitle": "Samhälle och föreningsliv",
            "title": "Anslag: språkkafé",
            "kind": "Anuncio",
            "icon": "☕",
            "text": "Välkommen till vårt språkkafé! Varje onsdag klockan 18 träffas vi på biblioteket för att prata svenska tillsammans. Det är gratis och öppet för alla som vill öva. Vi fikar, spelar spel och pratar om olika ämnen. Du behöver inte anmäla dig – kom bara förbi. Det spelar ingen roll hur mycket svenska du kan. Vi hjälps åt och har trevligt tillsammans!",
            "questions": [
                  {
                        "type": "mc",
                        "text": "När träffas språkkaféet?",
                        "options": [
                              "Varje onsdag klockan 18",
                              "Varje dag",
                              "På helgerna"
                        ],
                        "correct": 0,
                        "explanation": "«Varje onsdag klockan 18»."
                  },
                  {
                        "type": "tf",
                        "text": "Man måste anmäla sig i förväg.",
                        "answer": false,
                        "explanation": "«Du behöver inte anmäla dig»."
                  },
                  {
                        "type": "short",
                        "text": "Var träffas de?",
                        "answer": "biblioteket",
                        "accept": [
                              "biblioteket",
                              "bibliotek"
                        ],
                        "explanation": "«på biblioteket»."
                  }
            ]
      },
      {
            "id": "c-r-u10-1",
            "unit": 10,
            "unitTitle": "Nyheter och aktuellt",
            "title": "Nyhet: fler cyklar i staden",
            "kind": "Artículo",
            "icon": "📰",
            "text": "Allt fler invånare i staden väljer att cykla till jobbet. Enligt kommunen har antalet cyklister ökat med tjugo procent på två år. En orsak är de nya cykelvägarna som byggts. Kommunen menar att det är bra för både miljön och folkhälsan. Samtidigt påpekar vissa att det behövs fler cykelparkeringar. Kommunen planerar nu att bygga ut cykelnätet ytterligare under de kommande åren.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad handlar nyheten om?",
                        "options": [
                              "Fler cyklar i staden",
                              "Dyrare bussar",
                              "En ny skola"
                        ],
                        "correct": 0,
                        "explanation": "«Allt fler ... väljer att cykla»."
                  },
                  {
                        "type": "tf",
                        "text": "Antalet cyklister har minskat.",
                        "answer": false,
                        "explanation": "«har antalet cyklister ökat med tjugo procent»."
                  },
                  {
                        "type": "short",
                        "text": "Hur många procent har cyklandet ökat? ___ procent",
                        "answer": "tjugo",
                        "accept": [
                              "20"
                        ],
                        "explanation": "«ökat med tjugo procent»."
                  }
            ]
      },
      {
            "id": "c-r-u10-2",
            "unit": 10,
            "unitTitle": "Nyheter och aktuellt",
            "title": "Väderrapport",
            "kind": "Aviso",
            "icon": "🌦️",
            "text": "Här kommer helgens väder. På lördag blir det mestadels molnigt med lite regn på eftermiddagen. Temperaturen ligger runt tolv grader. På söndag klarnar det upp och solen tittar fram, men det blåser en frisk vind. Nätterna är fortfarande kyliga, så ta med en jacka om du ska vara ute på kvällen. I norra delen av landet kan det komma snö på högre höjder.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Hur blir vädret på söndag?",
                        "options": [
                              "Soligt men blåsigt",
                              "Snö hela dagen",
                              "Varmt och stilla"
                        ],
                        "correct": 0,
                        "explanation": "«klarnar det upp och solen tittar fram, men det blåser»."
                  },
                  {
                        "type": "tf",
                        "text": "På lördag blir det regn på eftermiddagen.",
                        "answer": true,
                        "explanation": "«lite regn på eftermiddagen»."
                  },
                  {
                        "type": "short",
                        "text": "Ungefär hur många grader är det på lördag? ___ grader",
                        "answer": "tolv",
                        "accept": [
                              "12"
                        ],
                        "explanation": "«runt tolv grader»."
                  }
            ]
      },
      {
            "id": "c-r-u11-1",
            "unit": 11,
            "unitTitle": "Miljö och hållbarhet",
            "title": "Att sortera sopor",
            "kind": "Faktatext",
            "icon": "♻️",
            "text": "I Sverige är källsortering en självklar del av vardagen. Du sorterar dina sopor i olika kärl: papper, plast, glas, metall och matavfall. Det sorterade materialet återvinns och blir till nya produkter eller energi. Många bostadsområden har ett miljörum eller en återvinningsstation i närheten. Att sortera rätt är viktigt för miljön och sparar resurser. Farligt avfall, som batterier och elektronik, lämnas på särskilda platser.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad gör man med sorterat material?",
                        "options": [
                              "Det återvinns",
                              "Det slängs i sjön",
                              "Det bränns hemma"
                        ],
                        "correct": 0,
                        "explanation": "«återvinns och blir till nya produkter eller energi»."
                  },
                  {
                        "type": "tf",
                        "text": "Batterier får slängas med matavfallet.",
                        "answer": false,
                        "explanation": "«Farligt avfall, som batterier ... lämnas på särskilda platser»."
                  },
                  {
                        "type": "short",
                        "text": "Vad kallas det att sortera soporna? ___sortering",
                        "answer": "käll",
                        "accept": [
                              "källsortering"
                        ],
                        "explanation": "«källsortering»."
                  }
            ]
      },
      {
            "id": "c-r-u11-2",
            "unit": 11,
            "unitTitle": "Miljö och hållbarhet",
            "title": "Spara energi hemma",
            "kind": "Faktatext",
            "icon": "💡",
            "text": "Det finns många enkla sätt att spara energi hemma. Släck lamporna när du lämnar ett rum och dra ur laddare som inte används. Sänk värmen några grader och ta på dig en tröja i stället. Att duscha kortare tid sparar både vatten och el. Många väljer också energisnåla lampor. Genom att spara energi hjälper du miljön och sänker samtidigt dina räkningar.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vilket är ett sätt att spara energi?",
                        "options": [
                              "Släcka lamporna när man går ut ur rummet",
                              "Ha alla lampor tända",
                              "Duscha länge"
                        ],
                        "correct": 0,
                        "explanation": "«Släck lamporna när du lämnar ett rum»."
                  },
                  {
                        "type": "tf",
                        "text": "Att spara energi kan sänka dina räkningar.",
                        "answer": true,
                        "explanation": "«sänker samtidigt dina räkningar»."
                  },
                  {
                        "type": "short",
                        "text": "Vad kan man sänka några grader? ___n",
                        "answer": "värme",
                        "accept": [
                              "värmen"
                        ],
                        "explanation": "«Sänk värmen några grader»."
                  }
            ]
      },
      {
            "id": "c-r-u12-1",
            "unit": 12,
            "unitTitle": "Teknik och sociala medier",
            "title": "Digitala tjänster",
            "kind": "Faktatext",
            "icon": "📱",
            "text": "I Sverige sköts mycket digitalt. Med bank-id kan du logga in säkert på banken, Skatteverket och Försäkringskassan. Du bokar läkartider, betalar räkningar och skriver under avtal på nätet. Det är smidigt, men det är också viktigt att vara försiktig. Lämna aldrig ut ditt bank-id eller dina koder till någon. Bedragare försöker ibland lura människor via mejl eller telefon. Är du osäker, kontakta banken direkt.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad använder man bank-id till?",
                        "options": [
                              "Att logga in säkert på tjänster",
                              "Att köra bil",
                              "Att laga mat"
                        ],
                        "correct": 0,
                        "explanation": "«kan du logga in säkert»."
                  },
                  {
                        "type": "tf",
                        "text": "Man kan lämna ut sina koder om någon ringer.",
                        "answer": false,
                        "explanation": "«Lämna aldrig ut ditt bank-id eller dina koder»."
                  },
                  {
                        "type": "short",
                        "text": "Vad ska man aldrig lämna ut? Sitt ___-id",
                        "answer": "bank",
                        "accept": [
                              "bank-id",
                              "bankid"
                        ],
                        "explanation": "«Lämna aldrig ut ditt bank-id»."
                  }
            ]
      },
      {
            "id": "c-r-u12-2",
            "unit": 12,
            "unitTitle": "Teknik och sociala medier",
            "title": "Sociala medier",
            "kind": "Faktatext",
            "icon": "💬",
            "text": "Sociala medier är ett vanligt sätt att hålla kontakt med familj och vänner. Du kan dela bilder, läsa nyheter och gå med i grupper. Det finns många fördelar, men också nackdelar. Allt du läser på nätet är inte sant, och det är lätt att jämföra sitt liv med andras. Tänk på vad du delar och skydda din integritet. Ta pauser ibland och lägg mobilen åt sidan.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad är en nackdel med sociala medier?",
                        "options": [
                              "Allt man läser är inte sant",
                              "Man kan dela bilder",
                              "Man kan läsa nyheter"
                        ],
                        "correct": 0,
                        "explanation": "«Allt du läser på nätet är inte sant»."
                  },
                  {
                        "type": "tf",
                        "text": "Enligt texten bör man skydda sin integritet.",
                        "answer": true,
                        "explanation": "«skydda din integritet»."
                  },
                  {
                        "type": "short",
                        "text": "Vad bör man lägga åt sidan ibland?",
                        "answer": "mobilen",
                        "accept": [
                              "mobilen",
                              "mobil"
                        ],
                        "explanation": "«lägg mobilen åt sidan»."
                  }
            ]
      },
      {
            "id": "c-r-u13-1",
            "unit": 13,
            "unitTitle": "Kultur och traditioner",
            "title": "Midsommar",
            "kind": "Faktatext",
            "icon": "🌼",
            "text": "Midsommar är en av de största högtiderna i Sverige och firas i slutet av juni. Många åker till landet eller till en park för att fira. Man reser en midsommarstång, dansar runt den och sjunger sånger. Traditionell mat är sill, färskpotatis och jordgubbar. Ofta plockar man blommor och gör kransar. Midsommar handlar om att njuta av den ljusa sommaren tillsammans med familj och vänner.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "När firas midsommar?",
                        "options": [
                              "I slutet av juni",
                              "I december",
                              "På hösten"
                        ],
                        "correct": 0,
                        "explanation": "«firas i slutet av juni»."
                  },
                  {
                        "type": "tf",
                        "text": "Man dansar runt en midsommarstång.",
                        "answer": true,
                        "explanation": "«dansar runt den»."
                  },
                  {
                        "type": "short",
                        "text": "Vilken frukt är traditionell mat?",
                        "answer": "jordgubbar",
                        "accept": [
                              "jordgubbar",
                              "jordgubb"
                        ],
                        "explanation": "«sill, färskpotatis och jordgubbar»."
                  }
            ]
      },
      {
            "id": "c-r-u13-2",
            "unit": 13,
            "unitTitle": "Kultur och traditioner",
            "title": "Fika",
            "kind": "Faktatext",
            "icon": "☕",
            "text": "Att fika är en viktig del av den svenska kulturen. Fika betyder att ta en paus och dricka kaffe eller te, ofta med något gott till, som en bulle eller en kaka. Man fikar hemma, på jobbet och med vänner. Det är inte bara maten som är viktig, utan stunden att prata och umgås. Kanelbullen är kanske den mest kända fikaklassikern, och den har till och med en egen dag.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad betyder det att fika?",
                        "options": [
                              "Ta en paus med kaffe och något gott",
                              "Att träna",
                              "Att sova"
                        ],
                        "correct": 0,
                        "explanation": "«ta en paus och dricka kaffe ... med något gott»."
                  },
                  {
                        "type": "tf",
                        "text": "Det viktigaste med fika är bara maten.",
                        "answer": false,
                        "explanation": "«inte bara maten ... utan stunden att prata och umgås»."
                  },
                  {
                        "type": "short",
                        "text": "Vilken bulle är den mest kända?",
                        "answer": "kanelbullen",
                        "accept": [
                              "kanelbulle",
                              "kanelbullen"
                        ],
                        "explanation": "«Kanelbullen är kanske den mest kända»."
                  }
            ]
      },
      {
            "id": "c-r-u14-1",
            "unit": 14,
            "unitTitle": "Problem och reklamationer",
            "title": "Att reklamera en vara",
            "kind": "Faktatext",
            "icon": "🧾",
            "text": "Om du köper en vara som är trasig eller fel har du rätt att reklamera den. Enligt konsumentköplagen har du tre års reklamationsrätt. Spara alltid kvittot som bevis på köpet. Kontakta butiken och förklara problemet lugnt och tydligt. Ofta kan du få varan lagad, en ny vara eller pengarna tillbaka. Om butiken inte hjälper dig kan du vända dig till Allmänna reklamationsnämnden, ARN.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Hur länge har man reklamationsrätt?",
                        "options": [
                              "Tre år",
                              "En månad",
                              "Tio år"
                        ],
                        "correct": 0,
                        "explanation": "«tre års reklamationsrätt»."
                  },
                  {
                        "type": "tf",
                        "text": "Man behöver inte spara kvittot.",
                        "answer": false,
                        "explanation": "«Spara alltid kvittot som bevis»."
                  },
                  {
                        "type": "short",
                        "text": "Vart kan man vända sig om butiken inte hjälper? ___",
                        "answer": "ARN",
                        "accept": [
                              "arn",
                              "reklamationsnämnden"
                        ],
                        "explanation": "«vända dig till Allmänna reklamationsnämnden, ARN»."
                  }
            ]
      },
      {
            "id": "c-r-u14-2",
            "unit": 14,
            "unitTitle": "Problem och reklamationer",
            "title": "Ett klagomål",
            "kind": "Mensaje",
            "icon": "✉️",
            "text": "Hej! Jag köpte en kaffebryggare i er butik den 3 maj, men den slutade fungera efter bara två veckor. Jag har kvittot kvar och vill reklamera varan. Jag önskar i första hand en ny bryggare, eller annars pengarna tillbaka. Kan ni meddela hur jag ska göra? Jag bifogar en bild på kvittot. Tack på förhand. Med vänlig hälsning, Sara Ek.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Varför skriver Sara?",
                        "options": [
                              "Hon vill reklamera en trasig kaffebryggare",
                              "Hon vill köpa en bryggare",
                              "Hon tackar för hjälpen"
                        ],
                        "correct": 0,
                        "explanation": "«vill reklamera varan»."
                  },
                  {
                        "type": "tf",
                        "text": "Sara har inte kvar kvittot.",
                        "answer": false,
                        "explanation": "«Jag har kvittot kvar»."
                  },
                  {
                        "type": "short",
                        "text": "Vad vill hon i första hand ha? En ny ___",
                        "answer": "bryggare",
                        "accept": [
                              "kaffebryggare",
                              "bryggare"
                        ],
                        "explanation": "«en ny bryggare»."
                  }
            ]
      },
      {
            "id": "c-r-u15-1",
            "unit": 15,
            "unitTitle": "Åsikter och jämförelser",
            "title": "Insändare: kollektivtrafiken",
            "kind": "Artículo",
            "icon": "🚌",
            "text": "Jag tycker att kollektivtrafiken i vår stad fungerar ganska bra. Det finns många bussar och tunnelbanelinjer, och de går ofta. Ett problem är däremot att biljetterna har blivit dyrare de senaste åren. Jag anser att priset borde sänkas så att fler väljer bussen istället för bilen. Det skulle vara bättre för miljön och minska trafiken. Jag hoppas att politikerna lyssnar på oss invånare.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad tycker skribenten om priset?",
                        "options": [
                              "Det borde sänkas",
                              "Det är för lågt",
                              "Det är perfekt"
                        ],
                        "correct": 0,
                        "explanation": "«priset borde sänkas»."
                  },
                  {
                        "type": "tf",
                        "text": "Skribenten tycker att kollektivtrafiken fungerar ganska bra.",
                        "answer": true,
                        "explanation": "«fungerar ganska bra»."
                  },
                  {
                        "type": "short",
                        "text": "Vad har blivit dyrare? ___na",
                        "answer": "biljett",
                        "accept": [
                              "biljetterna",
                              "biljett"
                        ],
                        "explanation": "«biljetterna har blivit dyrare»."
                  }
            ]
      },
      {
            "id": "c-r-u15-2",
            "unit": 15,
            "unitTitle": "Åsikter och jämförelser",
            "title": "Två sätt att bo",
            "kind": "Artículo",
            "icon": "🏘️",
            "text": "Att bo i lägenhet och att bo i hus har både fördelar och nackdelar. I en lägenhet slipper du sköta trädgård och yttre underhåll, och det är ofta billigare. Å andra sidan har du mindre plats och närmare grannar. Ett hus ger mer utrymme och en egen trädgård, men det kräver mer arbete och kostar mer. Vilket som passar bäst beror på din familj, din ekonomi och vad du tycker är viktigt.",
            "questions": [
                  {
                        "type": "mc",
                        "text": "Vad är en fördel med att bo i lägenhet?",
                        "options": [
                              "Man slipper sköta trädgård",
                              "Man har mer plats",
                              "Det kostar alltid mer"
                        ],
                        "correct": 0,
                        "explanation": "«slipper du sköta trädgård ... ofta billigare»."
                  },
                  {
                        "type": "tf",
                        "text": "Ett hus kräver mer arbete än en lägenhet.",
                        "answer": true,
                        "explanation": "«det kräver mer arbete och kostar mer»."
                  },
                  {
                        "type": "short",
                        "text": "Vad ger ett hus mer av? Mer ___",
                        "answer": "utrymme",
                        "accept": [
                              "plats",
                              "utrymme"
                        ],
                        "explanation": "«Ett hus ger mer utrymme»."
                  }
            ]
      }
],
    write: [
      {
            "id": "c-w-1",
            "unit": 1,
            "unitTitle": "Arbete",
            "title": "Personligt brev",
            "icon": "✉️",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu söker ett jobb som du är intresserad av.\n\nInstruktioner:\nSkriv ett personligt brev. Hälsa, berätta kort om dig själv och din erfarenhet, förklara varför du passar för jobbet och avsluta artigt.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "erfarenhet",
                        "söker"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du hälsat?",
                  "Har du berättat om din erfarenhet?",
                  "Har du förklarat varför du passar?",
                  "Har du avslutat artigt?"
            ],
            "hints": [
                  "Börja med: Hej! Jag heter... och söker tjänsten som...",
                  "Berätta: Jag har erfarenhet av...",
                  "Förklara: Jag passar för jobbet eftersom...",
                  "Avsluta: Med vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "söker tjänsten",
                  "erfarenhet",
                  "eftersom",
                  "passar",
                  "med vänliga hälsningar"
            ],
            "example": "Hej! Jag heter Marco och jag söker tjänsten som lagerarbetare hos er. Jag har tidigare arbetat två år på ett lager, där jag packade varor och körde truck. Jag är noggrann, stresstålig och gillar att arbeta i team. Jag tror att jag passar bra för jobbet eftersom jag har rätt erfarenhet och gärna lär mig nya saker. Jag bifogar mitt CV. Med vänliga hälsningar, Marco Rossi.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-2",
            "unit": 5,
            "unitTitle": "Myndigheter",
            "title": "Mejl till en myndighet",
            "icon": "🏛️",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu behöver hjälp med ett ärende hos en myndighet (t.ex. Skatteverket eller Försäkringskassan).\n\nInstruktioner:\nSkriv ett mejl. Hälsa, förklara ditt ärende tydligt, ställ en fråga och avsluta artigt.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": true,
                  "keywords": [
                        "ärende"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du hälsat?",
                  "Har du förklarat ditt ärende tydligt?",
                  "Har du ställt en fråga?",
                  "Har du avslutat artigt?"
            ],
            "hints": [
                  "Hej! Jag heter... och har en fråga om...",
                  "Förklara ärendet lugnt och tydligt",
                  "Ställ din fråga med «?»",
                  "Avsluta: Vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "ärende",
                  "gäller",
                  "jag undrar",
                  "kan ni",
                  "vänliga hälsningar"
            ],
            "example": "Hej! Jag heter Amina Ali och har ett ärende som gäller mitt bostadsbidrag. Jag ansökte för en månad sedan men har ännu inte fått något beslut. Jag undrar hur lång handläggningstiden är och om ni behöver fler papper från mig. Jag har redan skickat in mitt hyreskontrakt. Kan ni meddela hur jag ska göra? Tack på förhand. Med vänliga hälsningar, Amina Ali.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-3",
            "unit": 8,
            "unitTitle": "Familj och skola",
            "title": "Mejl till förskolan",
            "icon": "🏫",
            "words": "60–100 ord",
            "prompt": "Situation:\nDitt barn går på förskola och du behöver meddela något (t.ex. sjukdom eller ledighet).\n\nInstruktioner:\nSkriv ett mejl till personalen. Hälsa, förklara situationen, ge nödvändig information och avsluta.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "barn"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du hälsat?",
                  "Har du förklarat situationen?",
                  "Har du gett nödvändig information?",
                  "Har du avslutat?"
            ],
            "hints": [
                  "Hej! Jag är förälder till...",
                  "Jag vill meddela att...",
                  "Barnet kommer tillbaka...",
                  "Vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "mitt barn",
                  "sjuk",
                  "ledig",
                  "tillbaka",
                  "vänliga hälsningar"
            ],
            "example": "Hej! Jag är mamma till Leo i avdelning Solen. Jag vill meddela att Leo är sjuk idag och därför stannar hemma. Han har feber och ont i halsen. Om han blir bättre kommer han tillbaka på torsdag, annars hör jag av mig igen. Tack för att ni meddelar mig om det händer något viktigt på förskolan. Vänliga hälsningar, Sofia.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-4",
            "unit": 3,
            "unitTitle": "Arbete",
            "title": "Din arbetslivserfarenhet",
            "icon": "💼",
            "words": "60–100 ord",
            "prompt": "Situation:\nBerätta om din erfarenhet av arbete.\n\nInstruktioner:\nBeskriv ett jobb du har haft: vad du gjorde, vad du lärde dig och om du trivdes. Använd dåtid och sammanbindningsord.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "jobbade"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du beskrivit vad du gjorde?",
                  "Har du berättat vad du lärde dig?",
                  "Har du sagt om du trivdes?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "Jag jobbade som... i...",
                  "Mina uppgifter var att...",
                  "Jag lärde mig att...",
                  "Jag trivdes eftersom..."
            ],
            "useful": [
                  "jobbade",
                  "uppgifter",
                  "lärde mig",
                  "ansvar",
                  "trivdes",
                  "eftersom",
                  "därför"
            ],
            "example": "I mitt hemland jobbade jag som lärare i tre år. Mina uppgifter var att undervisa barn, planera lektioner och prata med föräldrar. Jag lärde mig att vara tålmodig och att organisera mitt arbete. Ibland var det stressigt, men jag trivdes ändå eftersom jag tycker om att arbeta med människor. Erfarenheten har hjälpt mig mycket, och nu vill jag gärna jobba med barn även här i Sverige.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-5",
            "unit": 6,
            "unitTitle": "Bostad",
            "title": "Felanmälan till hyresvärden",
            "icon": "🔧",
            "words": "60–100 ord",
            "prompt": "Situation:\nNågot är trasigt i din lägenhet.\n\nInstruktioner:\nSkriv en felanmälan. Hälsa, beskriv problemet tydligt, be om en reparation och säg när du är hemma. Avsluta artigt.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "trasig"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du hälsat?",
                  "Har du beskrivit problemet?",
                  "Har du bett om reparation?",
                  "Har du sagt när du är hemma?"
            ],
            "hints": [
                  "Hej! Jag bor på... och vill anmäla ett fel.",
                  "Problemet är att...",
                  "Kan ni skicka en reparatör?",
                  "Jag är hemma...",
                  "Vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "anmäla",
                  "trasig",
                  "reparatör",
                  "hemma",
                  "vänliga hälsningar",
                  "tack på förhand"
            ],
            "example": "Hej! Jag heter Ana och bor på Skolgatan 5, lägenhet 12. Jag vill anmäla ett fel eftersom kranen i köket droppar hela tiden och diskmaskinen har slutat fungera. Vattnet rinner även när kranen är stängd, vilket oroar mig. Kan ni skicka en reparatör den här veckan? Jag är hemma på eftermiddagarna efter klockan tre. Tack på förhand för hjälpen. Vänliga hälsningar, Ana.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-6",
            "unit": 14,
            "unitTitle": "Reklamationer",
            "title": "Ett klagomål",
            "icon": "🧾",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu har köpt en vara som är trasig eller fel.\n\nInstruktioner:\nSkriv ett klagomål till butiken. Hälsa, förklara vad som är fel, säg vad du vill ha (ny vara eller pengarna tillbaka) och avsluta.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": false,
                  "keywords": [
                        "reklamera"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du hälsat?",
                  "Har du förklarat felet?",
                  "Har du sagt vad du vill ha?",
                  "Har du avslutat artigt?"
            ],
            "hints": [
                  "Hej! Jag köpte... den...",
                  "Problemet är att...",
                  "Jag vill reklamera varan och få...",
                  "Vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "köpte",
                  "fungerar inte",
                  "reklamera",
                  "kvitto",
                  "pengarna tillbaka",
                  "vänliga hälsningar"
            ],
            "example": "Hej! Jag köpte en kaffebryggare i er butik den 3 maj, men den slutade fungera efter bara två veckor. Jag har kvittot kvar och vill därför reklamera varan. Enligt konsumentköplagen har jag rätt att få hjälp. I första hand önskar jag en ny bryggare, men annars vill jag ha pengarna tillbaka. Kan ni meddela hur jag ska göra? Jag bifogar en bild på kvittot. Vänliga hälsningar, Sara Ek.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-7",
            "unit": 10,
            "unitTitle": "Åsikter",
            "title": "Uttryck en åsikt",
            "icon": "💬",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu vill skriva om en fråga som är viktig för dig (t.ex. kollektivtrafik, miljö eller skola).\n\nInstruktioner:\nUttryck din åsikt tydligt och ge minst två skäl. Använd sammanbindningsord.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "tycker"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du sagt vad du tycker?",
                  "Har du gett minst två skäl?",
                  "Har du förklarat varför (eftersom/därför)?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "Jag tycker att...",
                  "För det första...",
                  "För det andra...",
                  "...eftersom..."
            ],
            "useful": [
                  "jag tycker",
                  "jag anser",
                  "för det första",
                  "för det andra",
                  "eftersom",
                  "därför",
                  "men"
            ],
            "example": "Jag tycker att kollektivtrafiken borde vara billigare. För det första skulle fler människor välja bussen istället för bilen, vilket är bra för miljön. För det andra är det viktigt att alla har råd att resa till jobb och skola, även de som tjänar mindre. Jag anser att staden borde satsa mer pengar på detta. Om biljetterna blev billigare skulle luften bli renare och trafiken minska i centrum.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-8",
            "unit": 15,
            "unitTitle": "Jämförelser",
            "title": "Jämför två alternativ",
            "icon": "⚖️",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu ska jämföra två saker (t.ex. att bo i lägenhet eller hus, eller att ta bussen eller cykla).\n\nInstruktioner:\nBeskriv fördelar och nackdelar med båda och säg vad du föredrar och varför.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "fördel"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du beskrivit båda alternativen?",
                  "Har du nämnt fördelar och nackdelar?",
                  "Har du sagt vad du föredrar och varför?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "Å ena sidan...",
                  "Å andra sidan...",
                  "En fördel är... men en nackdel är...",
                  "Jag föredrar... eftersom..."
            ],
            "useful": [
                  "å ena sidan",
                  "å andra sidan",
                  "fördel",
                  "nackdel",
                  "däremot",
                  "jag föredrar",
                  "eftersom"
            ],
            "example": "Att bo i lägenhet och att bo i hus har både fördelar och nackdelar. Å ena sidan är en lägenhet ofta billigare, och man slipper sköta trädgård. Å andra sidan har man mindre plats och närmare grannar. Ett hus ger mer utrymme och en egen trädgård, men det kräver mer arbete och kostar mer pengar. Själv föredrar jag en lägenhet just nu eftersom jag inte har tid att sköta ett hus, men i framtiden vill jag kanske ha ett hus.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-9",
            "unit": 9,
            "unitTitle": "Berätta",
            "title": "Berätta om en händelse",
            "icon": "📖",
            "words": "60–100 ord",
            "prompt": "Situation:\nBerätta om något som hände dig nyligen.\n\nInstruktioner:\nBeskriv vad som hände, i vilken ordning, och hur du kände dig. Använd dåtid och sammanbindningsord.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "sedan"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du berättat vad som hände?",
                  "Har du använt dåtid?",
                  "Har du beskrivit hur du kände dig?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "Förra veckan...",
                  "Först... och sedan...",
                  "Till slut...",
                  "Jag kände mig... eftersom..."
            ],
            "useful": [
                  "förra veckan",
                  "först",
                  "sedan",
                  "till slut",
                  "kände mig",
                  "eftersom",
                  "men"
            ],
            "example": "Förra veckan hade jag min första arbetsdag på ett nytt jobb. På morgonen var jag ganska nervös eftersom jag inte kände någon. Men när jag kom fram var alla vänliga och hjälpsamma. Först visade chefen mig runt, och sedan fick jag börja med enkla uppgifter. På lunchen åt jag tillsammans med mina nya kollegor. Till slut, när dagen var över, kände jag mig nöjd och glad. Nu ser jag fram emot att lära mig mer.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-10",
            "unit": 4,
            "unitTitle": "Hälsa",
            "title": "Mejl till vårdcentralen",
            "icon": "🏥",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu behöver kontakta vårdcentralen.\n\nInstruktioner:\nSkriv ett mejl. Hälsa, förklara ditt problem eller ärende, ställ en fråga om tid och avsluta artigt.",
            "req": {
                  "greeting": true,
                  "closing": true,
                  "question": true,
                  "keywords": [
                        "tid"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du hälsat?",
                  "Har du förklarat ditt problem?",
                  "Har du frågat om en tid?",
                  "Har du avslutat artigt?"
            ],
            "hints": [
                  "Hej! Jag heter... och har...",
                  "Jag har ont i / behöver...",
                  "Kan jag boka en tid...?",
                  "Vänliga hälsningar,"
            ],
            "useful": [
                  "hej",
                  "ont",
                  "besvär",
                  "boka en tid",
                  "den här veckan",
                  "vänliga hälsningar",
                  "tack"
            ],
            "example": "Hej! Jag heter Pedro och har haft ont i ryggen i över en vecka. Smärtan blir värre när jag lyfter saker på jobbet, och värktabletter hjälper inte längre. Därför skulle jag vilja träffa en läkare. Kan jag boka en tid någon gång den här veckan, helst på eftermiddagen? Jag har möjlighet att komma efter klockan tre. Tack på förhand för hjälpen. Vänliga hälsningar, Pedro.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-11",
            "unit": 13,
            "unitTitle": "Kultur",
            "title": "Berätta om en tradition",
            "icon": "🌼",
            "words": "60–100 ord",
            "prompt": "Situation:\nBerätta om en tradition eller högtid, från Sverige eller ditt hemland.\n\nInstruktioner:\nBeskriv vad man firar, hur man firar och varför den är viktig för dig.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "firar"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du sagt vad man firar?",
                  "Har du beskrivit hur man firar?",
                  "Har du förklarat varför den är viktig?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "I mitt hemland/Sverige firar vi...",
                  "Man brukar...",
                  "Traditionen är viktig eftersom..."
            ],
            "useful": [
                  "firar",
                  "högtid",
                  "brukar",
                  "traditionell mat",
                  "tillsammans",
                  "eftersom",
                  "betyder"
            ],
            "example": "I mitt hemland firar vi en stor högtid i slutet av året. Familjen samlas hemma hos mor- och farföräldrarna, och vi lagar mycket traditionell mat tillsammans. Vi äter, sjunger och ger varandra små gåvor. Barnen brukar leka medan de vuxna pratar länge. För mig är den här traditionen viktig eftersom den handlar om att umgås med familjen och komma ihåg var man kommer ifrån. Nu försöker jag fira den även här i Sverige.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-12",
            "unit": 11,
            "unitTitle": "Miljö",
            "title": "En samhällsfråga",
            "icon": "♻️",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu läste om en miljöfråga i din stad.\n\nInstruktioner:\nSkriv kort vad frågan handlar om, vad du tycker och ge minst ett förslag på en lösning.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "miljö"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du förklarat frågan?",
                  "Har du sagt vad du tycker?",
                  "Har du gett ett förslag?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "Jag läste att...",
                  "Jag tycker att det är ett problem eftersom...",
                  "Ett förslag är att..."
            ],
            "useful": [
                  "jag läste",
                  "miljö",
                  "problem",
                  "jag tycker",
                  "ett förslag",
                  "eftersom",
                  "borde"
            ],
            "example": "Jag läste att många slänger skräp i naturen i vår kommun. Jag tycker att det är ett stort problem eftersom skräpet skadar djur och förstör miljön för alla. Dessutom blir det dyrt för kommunen att städa. Ett förslag är att sätta upp fler soptunnor i parkerna och vid busshållplatserna. Man skulle också kunna informera mer i skolorna om varför källsortering är viktigt. Om vi hjälps åt kan vår stad bli renare och trevligare.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-13",
            "unit": 2,
            "unitTitle": "CV",
            "title": "Beskriv dig själv för en arbetsgivare",
            "icon": "🙋",
            "words": "60–100 ord",
            "prompt": "Situation:\nEn arbetsgivare vill veta mer om dig.\n\nInstruktioner:\nBeskriv dig själv: din bakgrund, dina egenskaper och vad du är bra på. Förklara varför du vill ha jobbet.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "jag är"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du beskrivit din bakgrund?",
                  "Har du nämnt dina egenskaper?",
                  "Har du sagt varför du vill ha jobbet?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "Jag heter... och kommer från...",
                  "Jag är... (egenskaper)",
                  "Jag är bra på...",
                  "Jag vill ha jobbet eftersom..."
            ],
            "useful": [
                  "jag heter",
                  "jag är",
                  "noggrann",
                  "ansvarsfull",
                  "bra på",
                  "eftersom",
                  "erfarenhet"
            ],
            "example": "Jag heter Nadia och kommer ursprungligen från Syrien, men jag har bott i Sverige i fyra år. Jag är en noggrann och ansvarsfull person som tycker om att arbeta med andra. Tidigare har jag jobbat inom vården, så jag är van vid att ta hand om människor. Jag är bra på att lyssna och hålla mig lugn i stressiga situationer. Jag vill ha det här jobbet eftersom jag trivs med att hjälpa andra och gärna utvecklas vidare.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-14",
            "unit": 7,
            "unitTitle": "Ekonomi",
            "title": "Skriv om din ekonomi",
            "icon": "💳",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu vill berätta hur du sköter din ekonomi.\n\nInstruktioner:\nBeskriv hur du hanterar pengar: hur du betalar räkningar, om du sparar och vad du tycker är viktigt.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "räkningar"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du beskrivit hur du betalar räkningar?",
                  "Har du sagt om du sparar?",
                  "Har du förklarat vad som är viktigt?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "Jag betalar mina räkningar...",
                  "Varje månad försöker jag spara...",
                  "Jag tycker att det är viktigt att... eftersom..."
            ],
            "useful": [
                  "räkningar",
                  "internetbank",
                  "autogiro",
                  "spara",
                  "budget",
                  "eftersom",
                  "viktigt"
            ],
            "example": "Jag försöker sköta min ekonomi noggrant. Alla mina räkningar betalar jag via internetbanken, och jag har autogiro på hyran så att jag aldrig glömmer den. Varje månad gör jag en enkel budget och försöker spara en liten summa, även om det ibland är svårt. Jag tycker att det är viktigt att ha koll på sina pengar eftersom man då slipper oroa sig och kan känna sig tryggare. I framtiden hoppas jag kunna spara mer.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      },
      {
            "id": "c-w-15",
            "unit": 12,
            "unitTitle": "Teknik",
            "title": "För- och nackdelar med sociala medier",
            "icon": "📱",
            "words": "60–100 ord",
            "prompt": "Situation:\nDu vill skriva om sociala medier.\n\nInstruktioner:\nBeskriv fördelar och nackdelar med sociala medier och säg vad du själv tycker.",
            "req": {
                  "greeting": false,
                  "closing": false,
                  "question": false,
                  "keywords": [
                        "sociala medier"
                  ],
                  "min": 60,
                  "max": 100
            },
            "selfCheck": [
                  "Har du nämnt fördelar?",
                  "Har du nämnt nackdelar?",
                  "Har du sagt vad du själv tycker?",
                  "Har du använt sammanbindningsord (eftersom, därför, men)?"
            ],
            "hints": [
                  "En fördel med sociala medier är att...",
                  "En nackdel är däremot att...",
                  "Själv tycker jag att... eftersom..."
            ],
            "useful": [
                  "sociala medier",
                  "fördel",
                  "nackdel",
                  "däremot",
                  "hålla kontakt",
                  "själv tycker jag",
                  "eftersom"
            ],
            "example": "Sociala medier har både fördelar och nackdelar. En stor fördel är att man lätt kan hålla kontakt med familj och vänner, även i andra länder. Man kan också läsa nyheter och lära sig nya saker. En nackdel är däremot att allt man läser inte är sant, och att många lägger för mycket tid på mobilen. Själv tycker jag att sociala medier är bra om man använder dem lagom, eftersom kontakten med andra är viktig men vilan också behövs.",
            "criteria": [
                  "Innehåll: har du gjort uppgiften?",
                  "Sammanhang: texten är lätt att följa",
                  "Sammanbindningsord: och, men, eftersom, därför",
                  "Längd: 60–100 ord"
            ]
      }
],
    speak: [
      {
        id: 'c-s-1', title: 'Möte på Arbetsförmedlingen', icon: '💼', context: 'En el centro de empleo (Arbetsförmedlingen)',
        cardA: 'Eres una persona que busca trabajo. Tienes formación como cocinero pero no tienes experiencia sueca.\n\nDebes:\n• Explicar tu situación\n• Preguntar qué necesitas para trabajar\n• Preguntar sobre prácticas (praktik)\n• Pedir ayuda con el CV',
        cardB: 'Eres asesor/a del Arbetsförmedlingen. Ayuda a la persona.\n\nDebes:\n• Preguntar por su formación y experiencia\n• Sugerir una práctica o curso\n• Explicar cómo validar el título\n• Ofrecer una cita de seguimiento',
        teacherQuestions: ['Vad har du för utbildning?', 'Har du arbetat i Sverige tidigare?', 'Är du intresserad av en praktikplats?', 'Kan du börja direkt?', 'Vad har du för mål med ditt jobbsökande?'],
        phrases: ['Jag söker jobb som...', 'Jag har utbildning inom...', 'Jag skulle vilja göra praktik.', 'Kan ni hjälpa mig med mitt CV?', 'Hur validerar jag min utbildning?', 'När kan vi träffas igen?']
      },
      {
        id: 'c-s-2', title: 'Samtal med läraren', icon: '🏫', context: 'Reunión con el maestro (utvecklingssamtal)',
        cardA: 'Eres madre/padre. Vas a hablar con el maestro sobre tu hijo/a.\n\nDebes:\n• Preguntar cómo le va en la escuela\n• Preguntar sobre las tareas (läxor)\n• Explicar una preocupación\n• Preguntar cómo puedes ayudar en casa',
        cardB: 'Eres el maestro/a. Habla con la madre/el padre.\n\nDebes:\n• Explicar cómo va el niño\n• Comentar sus fortalezas y lo que debe mejorar\n• Dar consejos para casa\n• Responder a sus preguntas',
        teacherQuestions: ['Hur går det för mitt barn i skolan?', 'Gör han/hon sina läxor?', 'Hur är det med kompisarna?', 'Vad kan vi göra hemma?', 'Behöver mitt barn extra hjälp?'],
        phrases: ['Hur trivs mitt barn?', 'Är det något jag bör veta?', 'Vi hjälper till hemma.', 'Tack för informationen.', 'Vad rekommenderar ni?', 'Vi hörs igen snart.']
      },
      {
        id: 'c-s-3', title: 'Reklamera en vara', icon: '⚠️', context: 'En una tienda (reclamación)',
        cardA: 'Compraste unos zapatos que se rompieron después de una semana. Vas a la tienda a reclamar.\n\nDebes:\n• Explicar qué compraste y el problema\n• Mostrar el recibo (kvitto)\n• Pedir cambio o devolución\n• Insistir educadamente si dicen que no',
        cardB: 'Eres el/la dependiente/a. El cliente quiere reclamar.\n\nDebes:\n• Preguntar qué pasó y cuándo lo compró\n• Pedir el recibo\n• Ofrecer una solución (reparación o cambio)\n• Explicar la política de garantía',
        teacherQuestions: ['Vad är problemet?', 'När köpte du varan?', 'Har du kvittot?', 'Vill du ha pengarna tillbaka eller en ny vara?', 'Följde du skötselråden?'],
        phrases: ['Jag vill reklamera de här skorna.', 'De gick sönder efter en vecka.', 'Här är kvittot.', 'Jag vill få dem utbytta.', 'Enligt konsumentlagen har jag rätt till...', 'Kan ni hjälpa mig med detta?']
      },
    ],
    test: [
      { category: 'Grammatik', text: 'Välj rätt form: Om jag _____ tid, skulle jag hjälpa dig.', options: ['har', 'hade', 'haft', 'ha'], correct: 1, explanation: 'Villkorssats (condicional): Om jag HADE tid... = si tuviera tiempo.' },
      { category: 'Grammatik', text: 'Vilket är rätt: Boken _____ jag läste var spännande.', options: ['som', 'vad', 'vilken', 'det'], correct: 0, explanation: '"som" es el pronombre relativo: Boken SOM jag läste = el libro que leí.' },
      { category: 'Grammatik', text: 'Partikelverb: Kan du _____ lampan? (encender)', options: ['sätta på', 'sätta av', 'ta på', 'stänga på'], correct: 0, explanation: 'Sätta PÅ = encender. Stänga AV = apagar.' },
      { category: 'Grammatik', text: 'Bisats med "att": Han sa _____ han var trött.', options: ['att', 'som', 'för', 'och'], correct: 0, explanation: 'Han sa ATT han var trött = dijo QUE estaba cansado.' },
      { category: 'Grammatik', text: 'Ordföljd i bisats: Jag vet att hon _____.', options: ['inte kommer', 'kommer inte', 'inte kom', 'kommer aldrig inte'], correct: 0, explanation: 'En bisats: "inte" va ANTES del verbo. ...att hon INTE KOMMER.' },
      { category: 'Grammatik', text: 'Perfekt: Vi _____ redan _____ maten.', options: ['har / lagat', 'har / laga', 'hade / lagar', 'är / lagat'], correct: 0, explanation: 'Perfekt: HAR + supinum (lagat). Vi har redan lagat maten.' },
      { category: 'Grammatik', text: 'Komparativ: Det här huset är _____ än det andra.', options: ['stor', 'större', 'störst', 'mer stor'], correct: 1, explanation: 'Comparativo de stor → STÖRRE (más grande).' },
      { category: 'Grammatik', text: 'Preposition: Jag är intresserad _____ musik.', options: ['på', 'av', 'i', 'för'], correct: 1, explanation: 'Intresserad AV = interesado en. Es una preposición fija.' },
      { category: 'Grammatik', text: 'Bestämd form plural: Jag ser _____ (los coches).', options: ['bilar', 'bilarna', 'biler', 'bilen'], correct: 1, explanation: 'Plural definido de bil: bilar → BILARNA (los coches).' },
      { category: 'Grammatik', text: 'Framtid: I morgon _____ jag arbeta.', options: ['ska', 'skulle', 'har', 'vore'], correct: 0, explanation: 'Futuro: SKA + infinitivo. I morgon ska jag arbeta.' },
      { category: 'Ordförråd', text: 'Vad betyder "att ansöka om"?', options: ['Att tacka nej', 'Att solicitar/pedir', 'Att betala', 'Att glömma'], correct: 1, explanation: 'Ansöka om = solicitar (ej. ansöka om jobb, bidrag).' },
      { category: 'Ordförråd', text: 'Motsatsen till "tidig" är:', options: ['snabb', 'sen', 'lång', 'ny'], correct: 1, explanation: 'Tidig (temprano) ↔ SEN (tarde).' },
      { category: 'Ordförråd', text: '"Hyra" betyder:', options: ['comprar', 'alquiler/alquilar', 'vender', 'prestar'], correct: 1, explanation: 'Hyra = alquiler (sustantivo) / alquilar (verbo).' },
      { category: 'Ordförråd', text: 'Vad är en "arbetsgivare"?', options: ['El empleado', 'El empleador/patrón', 'El sindicato', 'El desempleado'], correct: 1, explanation: 'ArbetsGIVARE = quien DA trabajo (empleador). Arbetstagare = empleado.' },
      { category: 'Ordförråd', text: '"Trots att" betyder:', options: ['porque', 'a pesar de que', 'si', 'cuando'], correct: 1, explanation: 'Trots att = a pesar de que (concesivo).' },
      { category: 'Ordförråd', text: 'Vad betyder uttrycket "att ta ansvar"?', options: ['Tomar un descanso', 'Asumir la responsabilidad', 'Tener miedo', 'Pedir ayuda'], correct: 1, explanation: 'Ta ansvar = asumir/tomar responsabilidad.' },
      { category: 'Läsförståelse', text: '"Butiken har öppet vardagar men stängt på helger." När är butiken stängd?', options: ['Måndag till fredag', 'Lördag och söndag', 'Bara söndag', 'Aldrig'], correct: 1, explanation: 'Helger = fines de semana (lördag och söndag).' },
      { category: 'Läsförståelse', text: '"För att få bostad måste du stå i kö." Vad krävs för att få bostad?', options: ['Betala mer', 'Stå i kö', 'Ha ett jobb direkt', 'Inget'], correct: 1, explanation: 'Stå i kö = hacer cola/estar en lista de espera.' },
      { category: 'Läsförståelse', text: '"Anna trivs på jobbet trots att lönen är låg." Hur känner Anna för sitt jobb?', options: ['Hon vantrivs', 'Hon trivs', 'Hon vill sluta', 'Hon är arbetslös'], correct: 1, explanation: 'Trivs = está a gusto, aunque el sueldo sea bajo.' },
      { category: 'Läsförståelse', text: '"Om du är sjuk ska du sjukanmäla dig innan klockan nio." Vad ska man göra om man är sjuk?', options: ['Gå till jobbet', 'Sjukanmäla sig före nio', 'Vänta en vecka', 'Ringa efter nio'], correct: 1, explanation: 'Sjukanmäla sig innan klockan nio = avisar que se está enfermo antes de las 9.' },
    ]
  },
  D: {
    listen: [
      {
        id: 'd-l-1', title: 'Nyheter — arbetsmarknaden', topic: 'Samhälle', icon: '📰', duration: '~60s',
        text: `Här är dagens ekonominyheter. Arbetslösheten i Sverige har minskat något under det senaste kvartalet, enligt Statistiska centralbyrån. Framför allt är det inom vård, omsorg och teknik som efterfrågan på arbetskraft är stor. Experter menar att kompetensbrist är ett växande problem, särskilt eftersom många erfarna medarbetare snart går i pension. Regeringen satsar därför på vuxenutbildning och yrkesutbildningar för att fler ska kunna omskola sig. Samtidigt betonar fackförbunden vikten av trygga anställningar och rättvisa löner.`,
        questions: [
          { text: 'Vad har hänt med arbetslösheten?', options: ['Den har ökat kraftigt', 'Den har minskat något', 'Den är oförändrad', 'Den har försvunnit'], correct: 1, explanation: 'Arbetslösheten har minskat något under det senaste kvartalet.' },
          { text: 'Inom vilka områden är efterfrågan störst?', options: ['Handel och turism', 'Vård, omsorg och teknik', 'Jordbruk', 'Media'], correct: 1, explanation: 'Inom vård, omsorg och teknik är efterfrågan stor.' },
          { text: 'Varför uppstår kompetensbrist?', options: ['Färre studerar', 'Många erfarna går i pension', 'Lönerna är för höga', 'Företagen flyttar'], correct: 1, explanation: 'Många erfarna medarbetare går snart i pension.' },
          { text: 'Vad satsar regeringen på?', options: ['Lägre skatter', 'Vuxenutbildning och yrkesutbildningar', 'Fler poliser', 'Nya vägar'], correct: 1, explanation: 'Regeringen satsar på vuxenutbildning och yrkesutbildningar.' },
        ]
      },
      {
        id: 'd-l-2', title: 'Anställningsintervjun', topic: 'Arbetsliv', icon: '🤝', duration: '~60s',
        text: `Tack för att du kom. Kan du börja med att berätta lite om dig själv? Ja, gärna. Jag har jobbat som projektledare i fem år och trivs med att ta ansvar och leda team. Vad ser du som din största styrka? Jag är strukturerad och bra på att kommunicera, även under press. Och en svaghet? Ibland är jag för noggrann, men jag har lärt mig att prioritera bättre. Varför söker du just den här tjänsten? Jag vill utvecklas i en större organisation och er värdegrund passar mig. Har du några frågor till oss? Ja, hur ser möjligheterna till kompetensutveckling ut?`,
        questions: [
          { text: 'Hur länge har personen arbetat som projektledare?', options: ['Två år', 'Tre år', 'Fem år', 'Tio år'], correct: 2, explanation: 'Jag har jobbat som projektledare i fem år.' },
          { text: 'Vilken styrka nämner personen?', options: ['Snabbhet', 'Strukturerad och bra på att kommunicera', 'Kreativitet', 'Tålamod'], correct: 1, explanation: 'Jag är strukturerad och bra på att kommunicera.' },
          { text: 'Vad beskriver personen som en svaghet?', options: ['Att komma sent', 'Att vara för noggrann', 'Att vara blyg', 'Att inte kunna svenska'], correct: 1, explanation: 'Ibland är jag för noggrann.' },
          { text: 'Vad frågar personen intervjuaren om?', options: ['Lönen', 'Semestern', 'Möjligheter till kompetensutveckling', 'Kontorets läge'], correct: 2, explanation: 'Hur ser möjligheterna till kompetensutveckling ut?' },
        ]
      },
      {
        id: 'd-l-3', title: 'Möte på jobbet', topic: 'Arbetsliv', icon: '📊', duration: '~60s',
        text: `Då sätter vi igång mötet. Första punkten är projektets tidsplan. Som ni vet ligger vi lite efter schemat. Vad beror förseningen på? Främst på att vi väntat på material från leverantören. Kan vi lösa det? Ja, jag föreslår att vi delar upp arbetet i mindre etapper så att vi kan börja med det vi har. Bra idé. Vem tar ansvar för planeringen? Jag kan göra ett utkast till på fredag. Utmärkt. Då bokar vi ett uppföljningsmöte nästa vecka. Är alla överens? Ja, det låter rimligt.`,
        questions: [
          { text: 'Vad är första punkten på mötet?', options: ['Budgeten', 'Projektets tidsplan', 'Semesterschemat', 'Nyanställningar'], correct: 1, explanation: 'Första punkten är projektets tidsplan.' },
          { text: 'Varför ligger projektet efter?', options: ['Personalbrist', 'Väntat på material från leverantören', 'Dåligt väder', 'För lite pengar'], correct: 1, explanation: 'Vi har väntat på material från leverantören.' },
          { text: 'Vad föreslås som lösning?', options: ['Avsluta projektet', 'Dela upp arbetet i mindre etapper', 'Anställa fler', 'Vänta längre'], correct: 1, explanation: 'Dela upp arbetet i mindre etapper.' },
          { text: 'När ska utkastet vara klart?', options: ['På måndag', 'På onsdag', 'På fredag', 'Nästa månad'], correct: 2, explanation: 'Jag kan göra ett utkast till på fredag.' },
        ]
      },
      {
        id: 'd-l-4', title: 'Debatt om integration', topic: 'Samhälle', icon: '🗣️', duration: '~65s',
        text: `Välkomna till dagens debatt om integration. Vår första gäst menar att språket är nyckeln till ett lyckat samhälle. Absolut. Utan svenska är det svårt att få jobb och delta fullt ut. Men vår andra gäst invänder: Språket är viktigt, men vi får inte glömma att diskriminering på arbetsmarknaden också är ett stort hinder. Många med utländsk bakgrund söker hundratals jobb utan att få svar. Håller du med om det? Delvis. Både språk och lika möjligheter behövs. Samhället tjänar på mångfald, men det kräver att alla får en rättvis chans.`,
        questions: [
          { text: 'Vad menar den första gästen är nyckeln?', options: ['Pengar', 'Språket', 'Utbildning', 'Kontakter'], correct: 1, explanation: 'Språket är nyckeln till ett lyckat samhälle.' },
          { text: 'Vilket hinder tar den andra gästen upp?', options: ['Höga skatter', 'Diskriminering på arbetsmarknaden', 'Dåligt väder', 'Brist på bostäder'], correct: 1, explanation: 'Diskriminering på arbetsmarknaden är ett stort hinder.' },
          { text: 'Vad sägs om personer med utländsk bakgrund?', options: ['De får jobb direkt', 'De söker många jobb utan svar', 'De vill inte jobba', 'De föredrar studier'], correct: 1, explanation: 'Många söker hundratals jobb utan att få svar.' },
          { text: 'Vad är slutsatsen?', options: ['Bara språk behövs', 'Både språk och lika möjligheter behövs', 'Ingenting kan göras', 'Mångfald är dåligt'], correct: 1, explanation: 'Både språk och lika möjligheter behövs.' },
        ]
      },
      {
        id: 'd-l-5', title: 'Föreläsning om det svenska samhället', topic: 'Samhälle', icon: '🎓', duration: '~65s',
        text: `Idag ska vi prata om den svenska modellen. Ett centralt begrepp är balansen mellan individ och kollektiv. Å ena sidan värdesätter svenskar självständighet och personlig frihet. Å andra sidan finns en stark tro på solidaritet och ett gemensamt ansvar, till exempel genom skattefinansierad välfärd. Skolan, sjukvården och äldreomsorgen bekostas till stor del av skatter. Detta system bygger på tillit, både mellan medborgare och till myndigheter. Kritiker påpekar dock att systemet är kostsamt och att köerna ibland är långa. Ändå har det bidragit till hög levnadsstandard.`,
        questions: [
          { text: 'Vad handlar föreläsningen om?', options: ['Svensk mat', 'Den svenska modellen', 'Svensk historia', 'Svenskt väder'], correct: 1, explanation: 'Idag ska vi prata om den svenska modellen.' },
          { text: 'Vad finansierar skatterna?', options: ['Bara vägar', 'Skola, sjukvård och äldreomsorg', 'Bara försvaret', 'Privata företag'], correct: 1, explanation: 'Skolan, sjukvården och äldreomsorgen bekostas av skatter.' },
          { text: 'Vad bygger systemet på?', options: ['Rädsla', 'Tillit', 'Tur', 'Konkurrens'], correct: 1, explanation: 'Systemet bygger på tillit.' },
          { text: 'Vad påpekar kritiker?', options: ['Att det är gratis', 'Att systemet är kostsamt och köerna långa', 'Att ingen betalar skatt', 'Att skolan är dålig'], correct: 1, explanation: 'Systemet är kostsamt och köerna ibland långa.' },
        ]
      },
      {
        id: 'd-l-6', title: 'Radioprogram — miljö och vardag', topic: 'Miljö', icon: '🌍', duration: '~60s',
        text: `Välkomna tillbaka till programmet. Idag talar vi om hållbarhet i vardagen. Vår gäst är miljöforskare. Vad kan en vanlig person göra för klimatet? Mycket, faktiskt. Att äta mindre kött, resa kollektivt och återvinna gör skillnad. Men räcker det med individens val? Nej, individen kan inte lösa allt själv. Vi behöver också politiska beslut och att företagen tar ansvar. Är du optimistisk inför framtiden? Ja, jag ser att fler unga engagerar sig och att tekniken utvecklas snabbt. Förändring tar tid, men den är på gång.`,
        questions: [
          { text: 'Vad handlar programmet om?', options: ['Sport', 'Hållbarhet i vardagen', 'Matlagning', 'Resor'], correct: 1, explanation: 'Idag talar vi om hållbarhet i vardagen.' },
          { text: 'Vad kan en vanlig person göra?', options: ['Ingenting', 'Äta mindre kött, resa kollektivt och återvinna', 'Bara rösta', 'Flytta utomlands'], correct: 1, explanation: 'Äta mindre kött, resa kollektivt och återvinna.' },
          { text: 'Räcker det med individens val?', options: ['Ja, det räcker', 'Nej, det behövs också politik och företagsansvar', 'Individen kan inte göra något', 'Bara politiken spelar roll'], correct: 1, explanation: 'Vi behöver också politiska beslut och att företagen tar ansvar.' },
          { text: 'Varför är gästen optimistisk?', options: ['Vädret blir bättre', 'Fler unga engagerar sig och tekniken utvecklas', 'Problemet är löst', 'Ingen bryr sig'], correct: 1, explanation: 'Fler unga engagerar sig och tekniken utvecklas snabbt.' },
        ]
      },
    ],
    read: [
      {
        id: 'd-r-1', title: 'Arbetsmarknaden och integration', tag: 'Samhälle', icon: '📊',
        text: `Att komma in på den svenska arbetsmarknaden kan vara en utmaning för nyanlända. Även personer med hög utbildning möter ibland hinder, till exempel krav på svensk erfarenhet eller svårigheter att få sina examina validerade. Forskning visar dessutom att diskriminering förekommer: personer med utländskt klingande namn blir oftare bortsorterade redan i ansökningsprocessen. Samtidigt finns det stora möjligheter, särskilt inom bristyrken som vård, teknik och bygg. Experter betonar att både språkkunskaper och ett brett kontaktnät ökar chanserna att få ett arbete som motsvarar ens kompetens.`,
        questions: [
          { text: 'Vilket hinder nämns för högutbildade?', options: ['För höga löner', 'Krav på svensk erfarenhet och validering av examina', 'För få jobb totalt', 'Brist på datorer'], correct: 1, explanation: 'Krav på svensk erfarenhet eller svårigheter att få examina validerade.' },
          { text: 'Vad visar forskningen?', options: ['Att alla får jobb snabbt', 'Att diskriminering förekommer', 'Att lönerna sjunker', 'Att ingen söker jobb'], correct: 1, explanation: 'Diskriminering förekommer, särskilt i ansökningsprocessen.' },
          { text: 'Inom vilka områden finns stora möjligheter?', options: ['Vård, teknik och bygg', 'Turism och media', 'Endast handel', 'Jordbruk'], correct: 0, explanation: 'Bristyrken som vård, teknik och bygg.' },
          { text: 'Vad ökar chanserna till rätt jobb, enligt experterna?', options: ['Tur', 'Språkkunskaper och ett brett kontaktnät', 'Att flytta ofta', 'Att sänka sina krav'], correct: 1, explanation: 'Både språkkunskaper och ett brett kontaktnät.' },
        ]
      },
      {
        id: 'd-r-2', title: 'Den svenska demokratin', tag: 'Samhälle', icon: '🗳️',
        text: `Sverige är en demokrati där medborgarna vart fjärde år röstar i allmänna val till riksdagen, regionerna och kommunerna. Rösträtten är en grundläggande rättighet, och valdeltagandet i Sverige är bland de högsta i världen. Demokratin bygger inte bara på att rösta, utan också på yttrandefrihet, fria medier och möjligheten att engagera sig i föreningar och partier. Makten är delad mellan riksdagen, som stiftar lagar, och regeringen, som styr landet. Domstolarna är oberoende. En viktig princip är att alla är lika inför lagen, oavsett bakgrund eller ställning.`,
        questions: [
          { text: 'Hur ofta hålls allmänna val?', options: ['Varje år', 'Vart fjärde år', 'Vartannat år', 'Vart tionde år'], correct: 1, explanation: 'Vart fjärde år röstar medborgarna.' },
          { text: 'Vad bygger demokratin också på, förutom att rösta?', options: ['Höga skatter', 'Yttrandefrihet, fria medier och engagemang', 'En stark kung', 'Militären'], correct: 1, explanation: 'Yttrandefrihet, fria medier och möjligheten att engagera sig.' },
          { text: 'Vad gör riksdagen?', options: ['Styr landet dagligen', 'Stiftar lagar', 'Dömer brottslingar', 'Sätter skatter själv'], correct: 1, explanation: 'Riksdagen stiftar lagar; regeringen styr landet.' },
          { text: 'Vad innebär principen som nämns i slutet?', options: ['Alla är lika inför lagen', 'Bara rika har rättigheter', 'Kungen bestämmer allt', 'Domstolarna styrs av regeringen'], correct: 0, explanation: 'Alla är lika inför lagen, oavsett bakgrund.' },
        ]
      },
      {
        id: 'd-r-3', title: 'Klimat och hållbarhet', tag: 'Miljö', icon: '🌱',
        text: `Klimatfrågan är en av vår tids största utmaningar. Sverige har som mål att inte ha några nettoutsläpp av växthusgaser år 2045. För att nå dit krävs förändringar inom transport, energi och industri. Många kommuner satsar på kollektivtrafik, cykelvägar och förnybar energi som vind- och vattenkraft. Även individen spelar en roll: att återvinna, konsumera mindre och välja tåget framför flyget gör skillnad. Kritiker påpekar dock att individens ansvar inte får överskugga behovet av politiska beslut och att stora företag måste ta sitt ansvar. Förändring kräver samarbete på alla nivåer.`,
        questions: [
          { text: 'Vilket mål har Sverige till år 2045?', options: ['Fler bilar', 'Inga nettoutsläpp av växthusgaser', 'Billigare flyg', 'Mer kol'], correct: 1, explanation: 'Inga nettoutsläpp av växthusgaser år 2045.' },
          { text: 'Vad satsar många kommuner på?', options: ['Fler motorvägar', 'Kollektivtrafik, cykelvägar och förnybar energi', 'Mer flygtrafik', 'Kolkraft'], correct: 1, explanation: 'Kollektivtrafik, cykelvägar och förnybar energi.' },
          { text: 'Vad kan individen göra?', options: ['Ingenting', 'Återvinna, konsumera mindre, välja tåget', 'Bara rösta', 'Köpa mer'], correct: 1, explanation: 'Återvinna, konsumera mindre och välja tåget framför flyget.' },
          { text: 'Vad påpekar kritikerna?', options: ['Att individen ensam kan lösa allt', 'Att politik och företag också måste ta ansvar', 'Att klimatet inte spelar roll', 'Att tåg är dåligt'], correct: 1, explanation: 'Individens ansvar får inte överskugga politiska beslut och företagens ansvar.' },
        ]
      },
      {
        id: 'd-r-4', title: 'Det digitala samhället', tag: 'Teknik & samhälle', icon: '💻',
        text: `Sverige är ett av världens mest digitaliserade länder. Många tjänster sköts numera via internet: du kan deklarera skatt, boka läkartid, betala räkningar och kontakta myndigheter med hjälp av BankID, en digital legitimation. Digitaliseringen gör vardagen enklare och sparar tid, men den skapar också utmaningar. Alla har inte samma vana eller möjlighet att använda digitala verktyg, vilket kan leda till ett så kallat digitalt utanförskap, särskilt bland äldre. Därför är det viktigt att samhället erbjuder stöd och att det fortfarande går att få hjälp på annat sätt än digitalt.`,
        questions: [
          { text: 'Vad är BankID?', options: ['En bank', 'En digital legitimation', 'En app för spel', 'Ett socialt medium'], correct: 1, explanation: 'BankID är en digital legitimation.' },
          { text: 'Vad kan man göra digitalt enligt texten?', options: ['Bara spela', 'Deklarera skatt, boka läkartid och betala räkningar', 'Ingenting viktigt', 'Bara mejla'], correct: 1, explanation: 'Deklarera skatt, boka läkartid, betala räkningar och kontakta myndigheter.' },
          { text: 'Vad är "digitalt utanförskap"?', options: ['Att ha snabbt internet', 'Att inte kunna eller ha möjlighet att använda digitala verktyg', 'Att gilla teknik', 'Att jobba med datorer'], correct: 1, explanation: 'Alla har inte vana/möjlighet att använda digitala verktyg.' },
          { text: 'Vilka drabbas särskilt?', options: ['Barn', 'Äldre', 'Företag', 'Studenter'], correct: 1, explanation: 'Särskilt bland äldre.' },
        ]
      },
    ],
    write: [
      {
        id: 'd-w-1', title: 'Skriv en åsiktstext', icon: '✍️', words: '100–150 ord',
        prompt: 'Escribe un texto de OPINIÓN (åsiktstext) en sueco sobre este tema:\n"Ska mobiltelefoner vara förbjudna i skolan?" (¿Deberían prohibirse los móviles en la escuela?)\n\nDebes:\n• Presentar tu opinión claramente\n• Dar al menos dos argumentos\n• Considerar el otro punto de vista\n• Terminar con una conclusión',
        checklist: ['Inled med din åsikt: "Jag anser att..."', 'Argument 1: "För det första..."', 'Argument 2: "Dessutom..."', 'Motargument: "Visserligen... men..."', 'Avsluta: "Sammanfattningsvis..."'],
        example: 'Jag anser att mobiltelefoner borde begränsas i skolan. För det första stör de koncentrationen, eftersom eleverna lätt distraheras. Dessutom kan mobiler bidra till mobbning på sociala medier. Visserligen kan telefoner vara användbara för att söka information, men det finns datorer för det. Sammanfattningsvis tror jag att en tydlig regel skulle förbättra både studiero och trivsel i klassrummet.',
        criteria: ['Contenido: opinión clara + argumentos + contraargumento + conclusión', 'Estructura: introducción, desarrollo, cierre', 'Conectores: för det första, dessutom, visserligen, sammanfattningsvis', 'Gramática avanzada y vocabulario preciso']
      },
      {
        id: 'd-w-2', title: 'Ett formellt klagomål till en myndighet', icon: '🏛️', words: '90–130 ord',
        prompt: 'Escribe una carta FORMAL de queja a una autoridad (myndighet) en sueco. Por ejemplo: has esperado demasiado por una decisión, o recibiste información incorrecta.\n\nDebes:\n• Explicar el asunto y tu caso (con datos)\n• Describir el problema con claridad\n• Explicar cómo te ha afectado\n• Pedir una acción concreta',
        checklist: ['Formell inledning: "Till [myndighet]"', 'Beskriv ärendet: "Jag skriver angående..."', 'Redogör för problemet sakligt', 'Konsekvens: "Detta har lett till..."', 'Krav: "Jag begär att..." och avsluta formellt'],
        example: 'Till Migrationsverket,\n\nJag skriver angående mitt ärende med nummer 12345. Jag lämnade in min ansökan för åtta månader sedan och har ännu inte fått något beslut, trots att handläggningstiden uppges vara kortare. Detta har lett till att jag inte kan påbörja mitt arbete. Jag begär därför att mitt ärende prioriteras och att jag får besked om när ett beslut kan väntas.\n\nMed vänlig hälsning,\nOmar Haddad',
        criteria: ['Contenido: asunto, problema, consecuencia y petición', 'Registro: formal e impersonal', 'Vocabulario administrativo (ärende, handläggning, begära)', 'Estructura de carta formal']
      },
      {
        id: 'd-w-3', title: 'Diskussionsinlägg', icon: '💬', words: '80–120 ord',
        prompt: 'Escribe una intervención (inlägg) para un foro/debate en sueco sobre:\n"Hur kan integrationen i Sverige förbättras?" (¿Cómo se puede mejorar la integración en Suecia?)\n\nDebes:\n• Dar tu punto de vista\n• Proponer al menos dos soluciones concretas\n• Justificar por qué funcionarían',
        checklist: ['Ta ställning: "Enligt min mening..."', 'Förslag 1 + motivering', 'Förslag 2 + motivering', 'Använd sambandsord: eftersom, därför att, på så sätt', 'Avsluta med en uppmaning eller slutsats'],
        example: 'Enligt min mening kräver bättre integration insatser från både samhället och individen. För det första bör fler få möjlighet att kombinera SFI med praktik, eftersom man lär sig språket snabbare när man använder det på en arbetsplats. Dessutom skulle mentorprogram, där etablerade svenskar hjälper nyanlända, kunna bygga viktiga kontakter. På så sätt minskar avståndet mellan grupper. Integration är ett gemensamt ansvar, och små konkreta åtgärder kan göra stor skillnad.',
        criteria: ['Contenido: postura + 2 propuestas justificadas', 'Coherencia y conectores de causa/consecuencia', 'Registro adecuado a un debate', 'Riqueza léxica y corrección gramatical']
      },
    ],
    speak: [
      {
        id: 'd-s-1', title: 'Anställningsintervju', icon: '🤝', context: 'Entrevista de trabajo (avanzado)',
        cardA: 'Eres el/la candidato/a a un puesto cualificado. Vende tu perfil con seguridad.\n\nDebes:\n• Presentarte profesionalmente\n• Hablar de tus fortalezas con ejemplos\n• Mencionar una debilidad y cómo la manejas\n• Hacer preguntas inteligentes sobre el puesto',
        cardB: 'Eres el/la reclutador/a. Entrevista al candidato en profundidad.\n\nDebes:\n• Preguntar por su experiencia y logros\n• Preguntar cómo maneja el estrés/conflictos\n• Preguntar por qué quiere el puesto\n• Explicar el siguiente paso del proceso',
        teacherQuestions: ['Kan du berätta om dig själv?', 'Vad är dina största styrkor?', 'Hur hanterar du stress och konflikter?', 'Varför söker du den här tjänsten?', 'Var ser du dig själv om fem år?'],
        phrases: ['Jag har lång erfarenhet av...', 'En av mina styrkor är att...', 'Under press brukar jag...', 'Jag motiveras av...', 'Vilka utvecklingsmöjligheter finns det?', 'Hur ser nästa steg ut?']
      },
      {
        id: 'd-s-2', title: 'Diskutera en samhällsfråga', icon: '🗣️', context: 'Debate sobre un tema social',
        cardA: 'Defiende esta postura: "Kollektivtrafiken borde vara gratis." (El transporte público debería ser gratis).\n\nDebes:\n• Presentar tu opinión con argumentos\n• Dar ejemplos concretos\n• Responder a los contraargumentos\n• Mantener un tono respetuoso',
        cardB: 'Defiende la postura contraria: el transporte gratis es demasiado caro y hay que priorizar otras cosas.\n\nDebes:\n• Presentar tus argumentos\n• Cuestionar los del otro\n• Proponer alternativas\n• Buscar puntos en común',
        teacherQuestions: ['Vad tycker du om frågan?', 'Vilka argument har du?', 'Hur svarar du på motargumentet?', 'Kan du ge ett exempel?', 'Finns det en kompromiss?'],
        phrases: ['Jag anser att...', 'Ett starkt argument är att...', 'Å andra sidan...', 'Jag håller delvis med, men...', 'Om vi ser till exemplet...', 'Vi kanske kan enas om att...']
      },
      {
        id: 'd-s-3', title: 'Presentera en idé på jobbet', icon: '📊', context: 'Reunión de trabajo',
        cardA: 'Tienes una idea para mejorar algo en tu trabajo (por ejemplo, un nuevo horario o proceso). Preséntala en la reunión.\n\nDebes:\n• Explicar la idea claramente\n• Justificar los beneficios\n• Anticipar objeciones\n• Proponer un plan concreto',
        cardB: 'Eres un/a colega o jefe/a. Escucha la idea y evalúala críticamente.\n\nDebes:\n• Hacer preguntas sobre costes y tiempo\n• Plantear posibles problemas\n• Pedir detalles del plan\n• Dar tu opinión final',
        teacherQuestions: ['Kan du förklara din idé?', 'Vilka fördelar ser du?', 'Vad kostar det i tid och pengar?', 'Hur löser vi eventuella problem?', 'Vad är nästa steg?'],
        phrases: ['Jag har ett förslag.', 'Fördelen med detta är...', 'Jag förstår oron, men...', 'Vi skulle kunna testa det under...', 'Vad tycker ni om förslaget?', 'Låt oss ta ett beslut.']
      },
    ],
    test: [
      { category: 'Grammatik', text: 'S-passiv: Beslutet _____ av styrelsen igår.', options: ['fattade', 'fattades', 'har fattat', 'fatta'], correct: 1, explanation: 'S-pasiva en pretérito: fattaDES = fue tomado. Beslutet fattades av styrelsen.' },
      { category: 'Grammatik', text: 'Välj rätt: Om jag _____ rik, skulle jag resa jorden runt.', options: ['är', 'var', 'vore', 'blev'], correct: 2, explanation: 'Konjunktiv/hipotético: "vore" (formal) = si yo fuera. Om jag vore rik...' },
      { category: 'Grammatik', text: 'Particip som adjektiv: en _____ dörr (stänga).', options: ['stängande', 'stängd', 'stänga', 'stängt'], correct: 1, explanation: 'Perfekt particip: en STÄNGD dörr = una puerta cerrada.' },
      { category: 'Grammatik', text: 'Konnektor: Hon pluggade hårt, _____ klarade hon provet.', options: ['därför', 'trots att', 'eftersom', 'medan'], correct: 0, explanation: '"därför" (por eso) indica consecuencia. Estudió mucho, POR ESO aprobó.' },
      { category: 'Grammatik', text: 'Bisats med omvänd ordföljd (efter bisats): När solen gick ner, _____ vi hem.', options: ['vi gick', 'gick vi', 'vi gå', 'har vi gått'], correct: 1, explanation: 'Regla V2: tras una bisats inicial, verbo primero: ...GICK VI hem.' },
      { category: 'Grammatik', text: 'Bli-passiv: Han _____ vald till ordförande.', options: ['blev', 'var', 'hade', 'skulle'], correct: 0, explanation: 'Bli-passiv (acción/cambio): Han BLEV vald = fue elegido.' },
      { category: 'Grammatik', text: 'Rätt preposition: Det beror _____ situationen.', options: ['av', 'på', 'om', 'för'], correct: 1, explanation: 'Bero PÅ = depender de. Det beror på situationen.' },
      { category: 'Grammatik', text: 'Satsadverbial: Jag har _____ inte sett filmen.', options: ['ännu', 'redan', 'aldrig', 'ofta'], correct: 0, explanation: '"ännu inte" = todavía no. Jag har ännu inte sett filmen.' },
      { category: 'Grammatik', text: 'Vilket ord passar: Det är en fråga _____ vi måste diskutera noga.', options: ['som', 'vad', 'vilket', 'vars'], correct: 0, explanation: 'Relativo correcto: en fråga SOM vi måste diskutera = una pregunta QUE debemos discutir.' },
      { category: 'Grammatik', text: 'Konjunktion: _____ det regnade, gick vi ut.', options: ['Fastän', 'Eftersom', 'Så att', 'Innan'], correct: 0, explanation: 'Fastän = aunque (concesivo). Aunque llovía, salimos.' },
      { category: 'Ordförråd', text: '"Att ifrågasätta" betyder:', options: ['aceptar sin más', 'cuestionar', 'preguntar la hora', 'responder'], correct: 1, explanation: 'Ifrågasätta = cuestionar, poner en duda.' },
      { category: 'Ordförråd', text: '"En förutsättning" är:', options: ['una consecuencia', 'una condición/requisito previo', 'un error', 'una opinión'], correct: 1, explanation: 'Förutsättning = condición previa, requisito.' },
      { category: 'Ordförråd', text: 'Vad betyder "hållbar utveckling"?', options: ['desarrollo rápido', 'desarrollo sostenible', 'desarrollo económico', 'desarrollo detenido'], correct: 1, explanation: 'Hållbar utveckling = desarrollo sostenible.' },
      { category: 'Ordförråd', text: '"Att bidra till" betyder:', options: ['restar/quitar', 'contribuir a', 'oponerse a', 'esperar'], correct: 1, explanation: 'Bidra till = contribuir a.' },
      { category: 'Ordförråd', text: 'Motsatsen till "öka" är:', options: ['växa', 'minska', 'stiga', 'höja'], correct: 1, explanation: 'Öka (aumentar) ↔ MINSKA (disminuir).' },
      { category: 'Ordförråd', text: '"Jämställdhet" handlar om:', options: ['igualdad de género', 'la economía', 'el clima', 'la salud'], correct: 0, explanation: 'Jämställdhet = igualdad (especialmente de género).' },
      { category: 'Läsförståelse', text: '"Trots ökade satsningar kvarstår problemet med långa vårdköer." Vad säger meningen?', options: ['El problema se resolvió', 'A pesar de más inversión, el problema persiste', 'No hubo inversión', 'Las colas desaparecieron'], correct: 1, explanation: 'Trots ökade satsningar kvarstår problemet = a pesar de más inversión, el problema persiste.' },
      { category: 'Läsförståelse', text: '"Enligt rapporten har sysselsättningen förbättrats markant." Vad har hänt?', options: ['El empleo empeoró', 'El empleo mejoró notablemente', 'No hubo cambios', 'La rapport se perdió'], correct: 1, explanation: 'Sysselsättningen har förbättrats markant = el empleo ha mejorado notablemente.' },
      { category: 'Läsförståelse', text: '"Deltagandet är frivilligt men rekommenderas starkt." Är deltagandet obligatoriskt?', options: ['Ja, är obligatoriskt', 'Nej, men rekommenderas starkt', 'Det är förbjudet', 'Bara för vuxna'], correct: 1, explanation: 'Frivilligt = voluntario; men rekommenderas starkt = pero se recomienda mucho.' },
      { category: 'Läsförståelse', text: '"Han hävdar att förändringen är nödvändig, medan kritikerna är skeptiska." Vad tycker kritikerna?', options: ['De håller med helt', 'De är skeptiska/tveksamma', 'De vet inte', 'De föreslog det'], correct: 1, explanation: 'Kritikerna är skeptiska = los críticos son escépticos/dudan.' },
    ]
  },
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

    // ─────────────────────────────────────────────────────
    // 20. EL PERFECTO — har + supino (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'perfecto',
      title: 'El perfecto (har ätit)',
      subtitle: '«He comido»: har + la forma en supino',
      icon: '✅',
      color: '#0EA5E9',
      level: 'B',
      keywords: 'perfecto har supino supinum atit talat bott varit he comido he hablado pluscuamperfecto hade perfekt',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«He comido» → «Jag har ___»', options: ['ätit', 'äter', 'åt'], correct: 0, explanation: '«Jag har ätit» = he comido. El perfecto es «har + supino» (ätit). ✅' },
        { type: 'mc', text: 'El perfecto se forma con…', options: ['har + supino', 'var + verbo', 'ska + verbo'], correct: 0, explanation: '«har» + la forma supino del verbo: har ätit, har talat, har bott.' },
        { type: 'mc', text: '«He hablado» → «Jag har ___»', options: ['talat', 'talar', 'talade'], correct: 0, explanation: '«talat» es el supino de «tala». Los verbos en -ar hacen el supino en -at: tala → talat.' },
        { type: 'mc', text: '«He trabajado» → «Jag har ___»', options: ['jobbat', 'jobbar', 'jobba'], correct: 0, explanation: '«jobbat». Otro verbo en -ar → supino en -at: jobba → jobbat.' },
        { type: 'mc', text: '«He vivido en Suecia» → «Jag har ___ i Sverige»', options: ['bott', 'bor', 'bodde'], correct: 0, explanation: '«bott» = vivido (supino de bo). Los verbos cortos suelen doblar: bo → bott.' },
        { type: 'mc', text: '«He escrito» → «Jag har ___»', options: ['skrivit', 'skriver', 'skrev'], correct: 0, explanation: '«skrivit». Los verbos fuertes hacen el supino en -it: skriva → skrivit.' },
        { type: 'mc', text: '«He bebido café» → «Jag har ___ kaffe»', options: ['druckit', 'dricker', 'drack'], correct: 0, explanation: '«druckit» = bebido (supino de dricka). Verbo fuerte → -it.' },
        { type: 'mc', text: '¿Cuál es el perfecto («he comido»)?', options: ['Jag har ätit', 'Jag äter', 'Jag åt'], correct: 0, explanation: '«Jag har ätit» = he comido. «Jag äter» = como; «Jag åt» = comí.' },
        { type: 'mc', text: '«Jag åt» significa…', options: ['comí (un momento concreto)', 'he comido', 'como'], correct: 0, explanation: '«åt» es el pretérito: «comí» (ayer, un momento dado). El perfecto «har ätit» conecta con el ahora.' },
        { type: 'mc', text: '«¿Has estado en Estocolmo?» → «Har du ___ i Stockholm?»', options: ['varit', 'är', 'var'], correct: 0, explanation: '«varit» = estado/sido (supino de vara). Har du varit…? = ¿has estado…?' },
        { type: 'mc', text: '«Ella ha llegado» → «Hon har ___»', options: ['kommit', 'kommer', 'kom'], correct: 0, explanation: '«kommit» = llegado/venido (supino de komma).' },
        { type: 'mc', text: 'Los verbos en -ar hacen el supino en…', options: ['-at (talat)', '-it', '-en'], correct: 0, explanation: 'Grupo -ar → supino -at: tala → talat, jobba → jobbat, studera → studerat.' },
        { type: 'mc', text: '«Había comido» (antes de otra cosa) → «Jag ___ ätit»', options: ['hade', 'har', 'var'], correct: 0, explanation: '«hade + supino» = pluscuamperfecto: «Jag hade ätit» = había comido.' },
        { type: 'mc', text: '«No he dormido» → «Jag har ___ sovit»', options: ['inte', 'ingen', 'aldrig'], correct: 0, explanation: '«Jag har inte sovit». El «inte» va entre «har» y el supino.' },
        { type: 'type', prompt: '«he comido» → «Jag har ___» (äta):', answer: 'ätit', accept: [], explanation: '«ätit» (supino de äta).' },
        { type: 'type', prompt: '«he hablado» → «Jag har ___» (tala):', answer: 'talat', accept: [], explanation: '«talat» (-ar → -at).' },
        { type: 'type', prompt: 'El auxiliar del perfecto («he/ha»):', answer: 'har', accept: [], explanation: '«har» + supino = perfecto.' },
        { type: 'type', prompt: '«he vivido» → «Jag har ___» (bo):', answer: 'bott', accept: [], explanation: '«bott» (verbo corto, dobla la t).' },
        { type: 'type', prompt: '«estado» (supino de vara):', answer: 'varit', accept: [], explanation: '«varit».' },
        { type: 'order', prompt: 'Ordena: «He comido pan»', words: ['Jag', 'har', 'ätit', 'bröd'], answer: ['Jag', 'har', 'ätit', 'bröd'], explanation: '«Jag har ätit bröd».' },
        { type: 'order', prompt: 'Ordena: «¿Has estudiado sueco?»', words: ['Har', 'du', 'studerat', 'svenska'], answer: ['Har', 'du', 'studerat', 'svenska'], explanation: '«Har du studerat svenska?».' },
        { type: 'order', prompt: 'Ordena: «Ella ha trabajado hoy»', words: ['Hon', 'har', 'jobbat', 'idag'], answer: ['Hon', 'har', 'jobbat', 'idag'], explanation: '«Hon har jobbat idag».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 21. ESTE, ESE, ALGÚN, NINGÚN (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'demostrativos',
      title: 'Este, ese, algún, ningún',
      subtitle: 'den här, den där, någon, ingen',
      icon: '👉',
      color: '#D946EF',
      level: 'B',
      keywords: 'demostrativos den här den där någon något ingen inget vilken all hela este ese algun ningun cual todo indefinidos',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«este coche» (cerca) → «___ bilen»', options: ['den här', 'den där', 'det här'], correct: 0, explanation: '«den här bilen» = este coche. «den här» = este (para palabras «en»). 👉' },
        { type: 'mc', text: '«esta casa» (ett hus) → «___ huset»', options: ['det här', 'den här', 'de här'], correct: 0, explanation: '«det här huset». Con palabras «ett» se usa «det här».' },
        { type: 'mc', text: '«estos coches» (plural) → «___ bilarna»', options: ['de här', 'den här', 'det här'], correct: 0, explanation: '«de här bilarna» = estos coches. En plural: «de här».' },
        { type: 'mc', text: '«ese coche» (lejos) → «___ bilen»', options: ['den där', 'den här', 'det där'], correct: 0, explanation: '«den där bilen» = ese/aquel coche. «där» = allá (lejos).' },
        { type: 'mc', text: 'Con «den här / den där», el sustantivo va en forma…', options: ['definida (bilen)', 'indefinida (bil)', 'siempre plural'], correct: 0, explanation: 'Va en forma definida: den här bil<strong>en</strong>, det här hus<strong>et</strong>. ¡Doble marca!' },
        { type: 'mc', text: '«algún / alguien» → ___', options: ['någon', 'ingen', 'vilken'], correct: 0, explanation: '«någon» = algún/alguien. Ej: Har du någon fråga? (¿tienes alguna pregunta?).' },
        { type: 'mc', text: '«¿Tienes algún libro?» → «Har du ___ bok?»', options: ['någon', 'något', 'inga'], correct: 0, explanation: '«någon» con palabras «en» (en bok). Para «ett» se usa «något».' },
        { type: 'mc', text: '«ningún / nadie» → ___', options: ['ingen', 'någon', 'all'], correct: 0, explanation: '«ingen» = ningún/nadie. Ej: Ingen är hemma (nadie está en casa).' },
        { type: 'mc', text: '«No tengo dinero» → «Jag har ___ pengar»', options: ['inga', 'ingen', 'inget'], correct: 0, explanation: '«inga» = ningún/ningunos, forma de plural. «pengar» es plural → inga.' },
        { type: 'mc', text: '«¿Cuál coche?» → «___ bil?»', options: ['Vilken', 'Vilket', 'Vilka'], correct: 0, explanation: '«Vilken bil?». «vilken» para palabras «en».' },
        { type: 'mc', text: '«¿Cuál casa?» (ett hus) → «___ hus?»', options: ['Vilket', 'Vilken', 'Vilka'], correct: 0, explanation: '«Vilket hus?». «vilket» para palabras «ett».' },
        { type: 'mc', text: '«todo el día» → «___ dagen»', options: ['hela', 'all', 'allt'], correct: 0, explanation: '«hela dagen» = todo el día. «hel» = entero; con forma definida → «hela».' },
        { type: 'mc', text: '«algo» (una cosa) → ___', options: ['något', 'någon', 'några'], correct: 0, explanation: '«något» = algo. «någon» = alguien; «några» = algunos.' },
        { type: 'mc', text: '«otros / otras» → ___', options: ['andra', 'annan', 'annat'], correct: 0, explanation: '«andra» = otros (plural). «annan» (en), «annat» (ett), «andra» (plural).' },
        { type: 'type', prompt: '«este» (con palabra «en», ej. ___ bilen):', answer: 'den här', accept: ['denhär'], explanation: '«den här» = este.' },
        { type: 'type', prompt: '«ese» (con palabra «en»):', answer: 'den där', accept: ['dendär'], explanation: '«den där» = ese/aquel.' },
        { type: 'type', prompt: '«algún / alguien»:', answer: 'någon', accept: [], explanation: '«någon».' },
        { type: 'type', prompt: '«ningún / nadie»:', answer: 'ingen', accept: [], explanation: '«ingen».' },
        { type: 'type', prompt: '«¿cuál?» (con palabra «en»):', answer: 'vilken', accept: [], explanation: '«vilken».' },
        { type: 'order', prompt: 'Ordena: «Este coche es rojo»', words: ['Den här', 'bilen', 'är', 'röd'], answer: ['Den här', 'bilen', 'är', 'röd'], explanation: '«Den här bilen är röd».' },
        { type: 'order', prompt: 'Ordena: «No tengo ningún problema»', words: ['Jag', 'har', 'inget', 'problem'], answer: ['Jag', 'har', 'inget', 'problem'], explanation: '«Jag har inget problem». (ett problem → inget)' },
        { type: 'order', prompt: 'Ordena: «¿Cuál libro quieres?»', words: ['Vilken', 'bok', 'vill', 'du', 'ha'], answer: ['Vilken', 'bok', 'vill', 'du', 'ha'], explanation: '«Vilken bok vill du ha?».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 22. PRONUNCIACIÓN — los sonidos del sueco (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'pronunciacion',
      title: 'Los sonidos del sueco',
      subtitle: 'Cómo se leen las letras (vocales, sj, tj…)',
      icon: '🔊',
      color: '#10B981',
      level: 'A',
      keywords: 'pronunciacion sonidos vocales sj tj o u a e i y å ä ö uttal acento melodico letras leer',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'La letra «o» en sueco muchas veces suena como…', options: ['«u» (bok se dice «buk»)', '«o» como en español', '«a»'], correct: 0, explanation: 'La «o» sueca a menudo suena como una «u» española: <em>bok</em> («buk») = libro, <em>sol</em> («sul») = sol. 🔊' },
        { type: 'mc', text: 'El sueco tiene 9 vocales. ¿Cuáles NO existen en español?', options: ['å, ä, ö, y', 'solo la ä', 'ninguna nueva'], correct: 0, explanation: 'Las cuatro nuevas son <strong>å, ä, ö</strong> y la <strong>y</strong>. Son las que más cuesta pronunciar al principio.' },
        { type: 'mc', text: 'El sonido «sj» (como en «sju» = siete) suena…', options: ['como un soplido/susurro', 'como una «s» normal', 'como la «j» española'], correct: 0, explanation: '«sj» es un soplido suave, muy típico del sueco: <em>sju</em>, <em>sjö</em> (lago). No es la «j» española.' },
        { type: 'mc', text: '«tj» y la «k» antes de e, i, y, ä, ö suenan parecido a…', options: ['«ch/sh» suave', '«k» dura', '«g»'], correct: 0, explanation: '<em>tjugo</em> (veinte), <em>kött</em> (carne): suenan con un «ch/sh» suave, no con «k» dura.' },
        { type: 'mc', text: 'La «g» antes de e, i, y suena como…', options: ['«y» (ge se dice «ye»)', '«g» dura', 'muda'], correct: 0, explanation: 'Antes de vocal suave, la «g» suena «y»: <em>ge</em> («ye») = dar, <em>gilla</em> («yila») = gustar.' },
        { type: 'mc', text: 'Las vocales suecas pueden ser…', options: ['largas o cortas (¡cambian el significado!)', 'siempre iguales'], correct: 0, explanation: 'La duración importa: <em>vit</em> (blanco, larga) vs <em>vitt</em> (corta). Alargar o acortar cambia la palabra.' },
        { type: 'mc', text: 'La «u» sueca se pronuncia…', options: ['con los labios más redondeados que en español', 'igual que en español'], correct: 0, explanation: 'La «u» sueca se dice adelantando y redondeando más los labios. Suena distinta a la «u» española.' },
        { type: 'mc', text: 'La palabra «och» (= y) se pronuncia normalmente…', options: ['«ok»', '«och» con ch fuerte'], correct: 0, explanation: 'En el habla normal, <em>och</em> suena como «ok» (la última letra casi no se oye).' },
        { type: 'mc', text: 'El sueco tiene un acento «melódico». Eso le da…', options: ['su sonido cantadito (sube y baja)', 'ningún ritmo especial'], correct: 0, explanation: 'El sueco «canta»: el tono sube y baja. Por eso suena musical. Se aprende sobre todo escuchando. 🎵' },
        { type: 'mc', text: 'En «hjul» (rueda), «ljus» (luz), «djur» (animal), la primera letra…', options: ['es muda (se dice «jul», «jus», «jur»)', 'se pronuncia normal'], correct: 0, explanation: 'La h, l o d iniciales son mudas: <em>hjul</em> → «jul», <em>ljus</em> → «jus», <em>djur</em> → «jur».' },
        { type: 'mc', text: 'La letra «å» suena parecida a…', options: ['la «o» española', 'la «a» española', 'la «e»'], correct: 0, explanation: 'La <strong>å</strong> suena como una «o» española: <em>gå</em> («go») = ir, <em>år</em> («or») = año.' },
        { type: 'mc', text: 'El grupo «rs» (como en «kurs») suena…', options: ['parecido a «sh»', 'como «r» + «s» separadas'], correct: 0, explanation: 'La r se junta con la s y suena tipo «sh»: <em>kurs</em>, <em>fors</em>. Pasa también con rt, rd, rn.' },
        { type: 'mc', text: 'La «ä» suena parecida a…', options: ['una «e» abierta', 'una «i»'], correct: 0, explanation: 'La <strong>ä</strong> es como una «e» bien abierta: <em>äta</em> (comer), <em>här</em> (aquí).' },
        { type: 'mc', text: 'La «ö» suena…', options: ['un sonido entre «o» y «e» (con labios redondos)', 'como «o» normal'], correct: 0, explanation: 'La <strong>ö</strong> no existe en español: es un sonido entre «o» y «e», con los labios redondeados: <em>öra</em> (oído), <em>öl</em> (cerveza).' },
        { type: 'type', prompt: 'La «å» suena como la ___ española (escribe una letra):', answer: 'o', accept: [], explanation: 'La å ≈ «o»: gå se dice «go».' },
        { type: 'type', prompt: 'En «bok», la «o» suena como una ___ (escribe u o o):', answer: 'u', accept: [], explanation: 'La o sueca suele sonar «u»: bok = «buk».' },
        { type: 'type', prompt: '«och» se pronuncia como… (escribe «ok» u «och»):', answer: 'ok', accept: [], explanation: '«och» suena «ok».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 23. SUBORDINADAS — frases largas (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'subordinadas',
      title: 'Frases largas: subordinadas',
      subtitle: 'att, som y la regla del «inte»',
      icon: '🔗',
      color: '#F59E0B',
      level: 'C',
      keywords: 'subordinadas bisats att som eftersom när om inte biff orden palabras frases largas que quien relativo',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Sé QUE viene» → «Jag vet ___ han kommer»', options: ['att', 'som', 'och'], correct: 0, explanation: '«att» = que (introduce una idea). Jag vet att… = Sé que… 🔗' },
        { type: 'mc', text: '«El hombre QUE vive aquí» → «Mannen ___ bor här»', options: ['som', 'att', 'vilken'], correct: 0, explanation: '«som» = que/quien (relativo). Une un nombre con más información: Mannen som bor här.' },
        { type: 'mc', text: 'En una frase subordinada, «inte» va…', options: ['antes del verbo', 'después del verbo', 'siempre al final'], correct: 0, explanation: '¡La regla clave! En subordinadas, «inte» va ANTES del verbo: «…att han inte kommer». (En español no cambia, por eso sorprende.) 🎯' },
        { type: 'mc', text: '«Sé que él NO viene» → «Jag vet att han ___»', options: ['inte kommer', 'kommer inte'], correct: 0, explanation: '«Jag vet att han inte kommer». En subordinada el «inte» va delante del verbo.' },
        { type: 'mc', text: 'Pero en frase normal: «Él no viene» → «Han ___»', options: ['kommer inte', 'inte kommer'], correct: 0, explanation: '«Han kommer inte». En la frase principal, «inte» va DESPUÉS del verbo. ¡Es al revés que en la subordinada!' },
        { type: 'mc', text: '«Quiero que vengas» → «Jag vill ___ du kommer»', options: ['att', 'som', 'och'], correct: 0, explanation: '«Jag vill att du kommer». «att» = que.' },
        { type: 'mc', text: '¿Cuál une con subordinación (no con coordinación)?', options: ['eftersom', 'men', 'eller'], correct: 0, explanation: '«eftersom» (porque) crea una subordinada. «men» y «eller» solo enlazan al mismo nivel.' },
        { type: 'mc', text: '«El libro QUE leo» → «Boken ___ jag läser»', options: ['som', 'att', 'vilken'], correct: 0, explanation: '«Boken som jag läser». «som» = que (relativo).' },
        { type: 'mc', text: '«No sé DÓNDE vive» → «Jag vet inte ___ han bor»', options: ['var', 'vart', 'här'], correct: 0, explanation: '«Jag vet inte var han bor» = no sé dónde vive (pregunta metida dentro de la frase).' },
        { type: 'mc', text: '«CUANDO» (subordinante) → ___', options: ['när', 'sedan', 'och'], correct: 0, explanation: '«när» = cuando: «Ring när du kommer» = llama cuando llegues.' },
        { type: 'mc', text: '«Me pregunto SI viene» → «Jag undrar ___ han kommer»', options: ['om', 'att', 'när'], correct: 0, explanation: '«om» = si (dentro de una frase): Jag undrar om han kommer.' },
        { type: 'mc', text: 'En «Jag tror att det regnar», la parte subordinada es…', options: ['att det regnar', 'Jag tror', 'det'], correct: 0, explanation: 'La subordinada es «att det regnar» (que llueve): depende de «Jag tror».' },
        { type: 'mc', text: 'La palabra que introduce el relativo (que/quien/el cual) es…', options: ['som', 'att', 'om'], correct: 0, explanation: '«som» sirve para personas y cosas: mannen som…, boken som…' },
        { type: 'mc', text: 'Truco «BIFF»: en subordinada, el «inte» va… del verbo', options: ['antes', 'después'], correct: 0, explanation: 'BIFF = «i Bisats (subordinada), Inte Framför (antes) det Finita verbet». En subordinada: inte + verbo.' },
        { type: 'type', prompt: '«que» (introduce una idea, ej. Jag vet ___ …):', answer: 'att', accept: [], explanation: '«att» = que.' },
        { type: 'type', prompt: '«que / quien» (relativo, ej. mannen ___ bor här):', answer: 'som', accept: [], explanation: '«som».' },
        { type: 'type', prompt: '«porque» (subordinante):', answer: 'eftersom', accept: [], explanation: '«eftersom».' },
        { type: 'type', prompt: '«si» (me pregunto ___ viene):', answer: 'om', accept: [], explanation: '«om».' },
        { type: 'type', prompt: '«cuando» (subordinante):', answer: 'när', accept: [], explanation: '«när».' },
        { type: 'order', prompt: 'Ordena: «Sé que él vive aquí»', words: ['Jag', 'vet', 'att', 'han', 'bor', 'här'], answer: ['Jag', 'vet', 'att', 'han', 'bor', 'här'], explanation: '«Jag vet att han bor här».' },
        { type: 'order', prompt: 'Ordena: «El hombre que trabaja aquí»', words: ['Mannen', 'som', 'jobbar', 'här'], answer: ['Mannen', 'som', 'jobbar', 'här'], explanation: '«Mannen som jobbar här».' },
        { type: 'order', prompt: 'Ordena: «Creo que él no viene» (regla BIFF)', words: ['Jag', 'tror', 'att', 'han', 'inte', 'kommer'], answer: ['Jag', 'tror', 'att', 'han', 'inte', 'kommer'], explanation: '«Jag tror att han inte kommer». En subordinada, «inte» antes del verbo.' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 24. SUECO AVANZADO — pasiva, participios, énfasis (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'avanzado',
      title: 'Sueco avanzado',
      subtitle: 'Voz pasiva, participios y frases con «det»',
      icon: '🎓',
      color: '#F59E0B',
      level: 'C',
      keywords: 'avanzado pasiva passiv -s participio stängd målad det anticipatorio perifrasis enfatica cleft bli finns',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'La voz pasiva en sueco muchas veces se forma sumando ___ al verbo', options: ['-s', '-ar', '-de'], correct: 0, explanation: 'Se le pega una «-s»: <em>Dörren öppnas</em> (la puerta se abre/es abierta). 🎓' },
        { type: 'mc', text: '«La puerta se abre / es abierta» → «Dörren ___»', options: ['öppnas', 'öppnar', 'öppnade'], correct: 0, explanation: '«Dörren öppnas». La -s marca la pasiva.' },
        { type: 'mc', text: '«El libro es leído» → «Boken ___»', options: ['läses', 'läser', 'läste'], correct: 0, explanation: '«Boken läses» = el libro es leído (pasiva con -s).' },
        { type: 'mc', text: 'Otra forma de pasiva es «bli + participio». «bli» significa…', options: ['llegar a ser / volverse', 'tener', 'ir'], correct: 0, explanation: '«bli» = volverse/llegar a ser: <em>Dörren blir öppnad</em> (la puerta es abierta).' },
        { type: 'mc', text: '«una puerta cerrada» → «en ___ dörr»', options: ['stängd', 'stänga', 'stänger'], correct: 0, explanation: '«en stängd dörr». «stängd» es el participio pasado usado como adjetivo (cerrada).' },
        { type: 'mc', text: '«una pared pintada» → «en ___ vägg»', options: ['målad', 'måla', 'målar'], correct: 0, explanation: '«en målad vägg» = una pared pintada. Participio como adjetivo.' },
        { type: 'mc', text: '«La ventana está cerrada» (ett fönster) → «Fönstret är ___»', options: ['stängt', 'stängd', 'stänga'], correct: 0, explanation: '«Fönstret är stängt». Con palabras «ett», el participio suma -t: stängd → stängt.' },
        { type: 'mc', text: '«Es Anna QUIEN cocina» → «Det är Anna ___ lagar maten»', options: ['som', 'att', 'och'], correct: 0, explanation: '«Det är Anna som lagar maten». Es la fórmula para resaltar algo: «Det är … som …».' },
        { type: 'mc', text: 'La fórmula «Det är … som …» sirve para…', options: ['resaltar/enfatizar una parte', 'negar', 'preguntar la hora'], correct: 0, explanation: 'Enfatiza: «Det är IDAG som vi åker» = es HOY cuando nos vamos.' },
        { type: 'mc', text: '«Llueve» → «___ regnar»', options: ['Det', 'Den', 'Han'], correct: 0, explanation: '«Det regnar». El sueco pone un «det» de relleno cuando no hay un sujeto real (clima, etc.).' },
        { type: 'mc', text: '«Es divertido aprender sueco» → «___ är kul att lära sig svenska»', options: ['Det', 'Den', 'Han'], correct: 0, explanation: '«Det är kul att…». Ese «Det» anticipa la idea que viene después.' },
        { type: 'mc', text: '«Hay muchos coches» → «___ finns många bilar»', options: ['Det', 'Den', 'De'], correct: 0, explanation: '«Det finns…» = hay… Siempre empieza con «Det finns».' },
        { type: 'type', prompt: 'La terminación típica de la voz pasiva (una letra):', answer: 's', accept: [], explanation: 'La «-s»: öppnas, läses.' },
        { type: 'type', prompt: '«llueve» → «___ regnar»:', answer: 'det', accept: [], explanation: '«Det regnar».' },
        { type: 'type', prompt: '«cerrada» (participio, en «en ___ dörr»):', answer: 'stängd', accept: [], explanation: '«stängd».' },
        { type: 'type', prompt: '«que/quien» en la frase enfática (Det är Anna ___):', answer: 'som', accept: [], explanation: '«som».' },
        { type: 'order', prompt: 'Ordena: «Es Anna quien cocina»', words: ['Det', 'är', 'Anna', 'som', 'lagar', 'maten'], answer: ['Det', 'är', 'Anna', 'som', 'lagar', 'maten'], explanation: '«Det är Anna som lagar maten».' },
        { type: 'order', prompt: 'Ordena: «Es divertido aprender sueco»', words: ['Det', 'är', 'kul', 'att', 'lära', 'sig', 'svenska'], answer: ['Det', 'är', 'kul', 'att', 'lära', 'sig', 'svenska'], explanation: '«Det är kul att lära sig svenska».' },
        { type: 'order', prompt: 'Ordena: «El libro es leído en la escuela»', words: ['Boken', 'läses', 'i', 'skolan'], answer: ['Boken', 'läses', 'i', 'skolan'], explanation: '«Boken läses i skolan».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 25. GENITIVO — posesión con -s (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'genitivo',
      title: 'El genitivo (de quién)',
      subtitle: 'Annas bok = el libro de Ana',
      icon: '🔑',
      color: '#10B981',
      level: 'A',
      keywords: 'genitivo posesion s annas eriks de quien pertenece dueño genitiv apostrofo',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«el libro de Ana» → «___ bok»', options: ['Annas', 'Anna', 'Annan'], correct: 0, explanation: '«Annas bok». Para decir «de alguien» se le pega una -s al nombre. 🔑' },
        { type: 'mc', text: 'El genitivo (posesión) se forma añadiendo ___ al nombre', options: ['-s', '-en', '-ar'], correct: 0, explanation: 'Se suma «-s»: Anna → Annas, Erik → Eriks. Como en inglés, pero SIN apóstrofo.' },
        { type: 'mc', text: '«el coche de Erik» → «___ bil»', options: ['Eriks', 'Erik', 'Erikar'], correct: 0, explanation: '«Eriks bil» = el coche de Erik.' },
        { type: 'mc', text: '¿Lleva apóstrofo el genitivo sueco?', options: ['No, solo -s (Annas)', 'Sí, como en inglés (con apóstrofo, como en inglés)'], correct: 0, explanation: 'En sueco NO se pone apóstrofo: se escribe «Annas», «Eriks». (En inglés sí, en sueco no.)' },
        { type: 'mc', text: '«la casa de mi mamá» → «min ___ hus»', options: ['mammas', 'mamma', 'mamman'], correct: 0, explanation: '«min mammas hus» = la casa de mi mamá.' },
        { type: 'mc', text: '«el nombre del perro» → «___ namn»', options: ['hundens', 'hunden', 'hunds'], correct: 0, explanation: '«hundens namn» = el nombre del perro (hunden = el perro, + s).' },
        { type: 'mc', text: 'En sueco, lo que se posee va…', options: ['después del dueño (Annas bok)', 'antes del dueño'], correct: 0, explanation: 'Primero el dueño con -s, luego la cosa: «Annas bok» = de-Ana libro.' },
        { type: 'mc', text: '«el trabajo de papá» → «___ jobb»', options: ['pappas', 'pappa', 'pappan'], correct: 0, explanation: '«pappas jobb» = el trabajo de papá.' },
        { type: 'mc', text: '«la capital de Suecia» → «___ huvudstad»', options: ['Sveriges', 'Sverige', 'Sverigen'], correct: 0, explanation: '«Sveriges huvudstad» = la capital de Suecia. También los países llevan -s.' },
        { type: 'mc', text: '«los amigos de María» → «___ vänner»', options: ['Marias', 'Maria', 'Marian'], correct: 0, explanation: '«Marias vänner» = los amigos de María.' },
        { type: 'type', prompt: '«de Ana» (genitivo):', answer: 'Annas', accept: ['annas'], explanation: '«Annas».' },
        { type: 'type', prompt: '«de Erik» (genitivo):', answer: 'Eriks', accept: ['eriks'], explanation: '«Eriks».' },
        { type: 'type', prompt: 'La letra que marca el genitivo:', answer: 's', accept: [], explanation: 'La «-s»: Annas, Eriks.' },
        { type: 'type', prompt: '«de papá» (pappa):', answer: 'pappas', accept: [], explanation: '«pappas».' },
        { type: 'order', prompt: 'Ordena: «Es el libro de Ana»', words: ['Det', 'är', 'Annas', 'bok'], answer: ['Det', 'är', 'Annas', 'bok'], explanation: '«Det är Annas bok».' },
        { type: 'order', prompt: 'Ordena: «El coche de Erik es rojo»', words: ['Eriks', 'bil', 'är', 'röd'], answer: ['Eriks', 'bil', 'är', 'röd'], explanation: '«Eriks bil är röd».' },
        { type: 'order', prompt: 'Ordena: «La casa de mi mamá»', words: ['Min', 'mammas', 'hus'], answer: ['Min', 'mammas', 'hus'], explanation: '«Min mammas hus».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 26. IMPERATIVO — dar órdenes (SFI A)
    // ─────────────────────────────────────────────────────
    {
      id: 'imperativo',
      title: 'Dar órdenes: el imperativo',
      subtitle: 'Kom! Ät! Vänta! Läs!',
      icon: '📢',
      color: '#10B981',
      level: 'A',
      keywords: 'imperativo ordenes mandato kom ät skriv vänta öppna titta instrucciones imperativ',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'El imperativo sirve para…', options: ['dar una orden o instrucción', 'hacer una pregunta'], correct: 0, explanation: 'El imperativo manda o instruye: «¡Ven!», «¡Abre la puerta!». 📢' },
        { type: 'mc', text: '«¡Ven!» → ___', options: ['Kom!', 'Kommer!', 'Komma!'], correct: 0, explanation: '«Kom!» = ¡ven! (de komma, se quita la -a).' },
        { type: 'mc', text: '«¡Come!» → ___', options: ['Ät!', 'Äter!', 'Äta!'], correct: 0, explanation: '«Ät!» = ¡come!' },
        { type: 'mc', text: '«¡Escribe!» → ___', options: ['Skriv!', 'Skriver!', 'Skriva!'], correct: 0, explanation: '«Skriv!» = ¡escribe!' },
        { type: 'mc', text: '«¡Espera!» → ___', options: ['Vänta!', 'Väntar!', 'Väntad!'], correct: 0, explanation: '«Vänta!» = ¡espera! (los verbos en -ar mantienen la -a: vänta, titta, öppna).' },
        { type: 'mc', text: '«¡Abre la puerta!» → «___ dörren!»', options: ['Öppna', 'Öppnar', 'Öppnad'], correct: 0, explanation: '«Öppna dörren!» = ¡abre la puerta!' },
        { type: 'mc', text: '«¡Mira!» → ___', options: ['Titta!', 'Tittar!', 'Tittad!'], correct: 0, explanation: '«Titta!» = ¡mira!' },
        { type: 'mc', text: '«¡Siéntate!» → ___', options: ['Sitt!', 'Sitter!', 'Sitta!'], correct: 0, explanation: '«Sitt!» = ¡siéntate! (de sitta, se quita la -a).' },
        { type: 'mc', text: '«¡Ven aquí!» → «Kom ___!»', options: ['hit', 'här', 'dit'], correct: 0, explanation: '«Kom hit!» = ¡ven (hacia) aquí! «hit» = hacia aquí.' },
        { type: 'mc', text: 'Para suavizar una orden puedes usar…', options: ['«Kan du…?» (¿puedes…?)', 'gritar más fuerte'], correct: 0, explanation: '«Kan du stänga dörren?» (¿puedes cerrar la puerta?) suena más amable que la orden directa.' },
        { type: 'mc', text: '«¡Lee el libro!» → «___ boken!»', options: ['Läs', 'Läser', 'Läsa'], correct: 0, explanation: '«Läs boken!» = ¡lee el libro!' },
        { type: 'mc', text: 'El imperativo normalmente es el verbo…', options: ['solo la acción (sin decir «tú»)', 'siempre con «du» delante'], correct: 0, explanation: 'No hace falta «du»: la orden es solo el verbo. «Kom!», «Ät!», «Läs!».' },
        { type: 'type', prompt: '«¡ven!» en sueco:', answer: 'kom', accept: ['kom!'], explanation: '«Kom!»' },
        { type: 'type', prompt: '«¡come!» en sueco:', answer: 'ät', accept: ['ät!'], explanation: '«Ät!»' },
        { type: 'type', prompt: '«¡escribe!» en sueco:', answer: 'skriv', accept: ['skriv!'], explanation: '«Skriv!»' },
        { type: 'type', prompt: '«¡espera!» en sueco:', answer: 'vänta', accept: ['vänta!'], explanation: '«Vänta!»' },
        { type: 'order', prompt: 'Ordena: «¡Abre la puerta!»', words: ['Öppna', 'dörren'], answer: ['Öppna', 'dörren'], explanation: '«Öppna dörren!».' },
        { type: 'order', prompt: 'Ordena: «¡Ven aquí!»', words: ['Kom', 'hit'], answer: ['Kom', 'hit'], explanation: '«Kom hit!».' },
        { type: 'order', prompt: 'Ordena: «¡Lee el libro!»', words: ['Läs', 'boken'], answer: ['Läs', 'boken'], explanation: '«Läs boken!».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 27. REFLEXIVOS Y «MAN» (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'reflexivos',
      title: 'Reflexivos y «man»',
      subtitle: 'Jag tvättar mig · Hur säger man?',
      icon: '🔄',
      color: '#3B82F6',
      level: 'B',
      keywords: 'reflexivos sig mig dig oss man impersonal lära sig känna sig tvätta reflexiva',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«Me lavo» → «Jag tvättar ___»', options: ['mig', 'jag', 'sig'], correct: 0, explanation: '«Jag tvättar mig». La forma reflexiva de «jag» es «mig» (me). 🔄' },
        { type: 'mc', text: '«Él aprende sueco» → «Han lär ___ svenska»', options: ['sig', 'mig', 'honom'], correct: 0, explanation: '«Han lär sig svenska». «lära sig» = aprender. Para él/ella/ellos la reflexiva es «sig».' },
        { type: 'mc', text: 'La forma reflexiva de «han / hon / de» es…', options: ['sig', 'hans', 'den'], correct: 0, explanation: '«sig» sirve para él, ella y ellos: Han lär sig, De sätter sig.' },
        { type: 'mc', text: '«Nos sentimos cansados» → «Vi känner ___ trötta»', options: ['oss', 'vi', 'sig'], correct: 0, explanation: '«Vi känner oss trötta». Reflexiva de «vi» = «oss» (nos).' },
        { type: 'mc', text: '«¿Cómo se dice…?» → «Hur säger ___…?»', options: ['man', 'du', 'vi'], correct: 0, explanation: '«Hur säger man…?» = ¿cómo se dice…? «man» = se / uno (en general).' },
        { type: 'mc', text: '«man» significa…', options: ['uno / se (en general)', 'un hombre solamente'], correct: 0, explanation: '«man» es impersonal: «uno», «se». (Aunque se escribe igual que «man» = hombre, aquí es «se».)' },
        { type: 'mc', text: '«Me siento bien» → «Jag känner ___ bra»', options: ['mig', 'jag', 'sig'], correct: 0, explanation: '«Jag känner mig bra» = me siento bien. «känna sig» = sentirse.' },
        { type: 'mc', text: '«¡Apúrate!» (tú) → «Skynda ___!»', options: ['dig', 'sig', 'du'], correct: 0, explanation: '«Skynda dig!». Reflexiva de «du» = «dig».' },
        { type: 'mc', text: '«Ellos se sientan» → «De sätter ___»', options: ['sig', 'dem', 'de'], correct: 0, explanation: '«De sätter sig» = ellos se sientan. «sätta sig» = sentarse.' },
        { type: 'mc', text: '«Aquí se habla sueco» → «Här talar ___ svenska»', options: ['man', 'den', 'de'], correct: 0, explanation: '«Här talar man svenska» = aquí se habla sueco.' },
        { type: 'type', prompt: 'Reflexivo de «jag» (me):', answer: 'mig', accept: [], explanation: '«mig».' },
        { type: 'type', prompt: 'Reflexivo de «han/hon/de» (se):', answer: 'sig', accept: [], explanation: '«sig».' },
        { type: 'type', prompt: '«se / uno» (impersonal):', answer: 'man', accept: [], explanation: '«man».' },
        { type: 'type', prompt: 'Reflexivo de «vi» (nos):', answer: 'oss', accept: [], explanation: '«oss».' },
        { type: 'order', prompt: 'Ordena: «Me lavo»', words: ['Jag', 'tvättar', 'mig'], answer: ['Jag', 'tvättar', 'mig'], explanation: '«Jag tvättar mig».' },
        { type: 'order', prompt: 'Ordena: «Él aprende sueco»', words: ['Han', 'lär', 'sig', 'svenska'], answer: ['Han', 'lär', 'sig', 'svenska'], explanation: '«Han lär sig svenska».' },
        { type: 'order', prompt: 'Ordena: «¿Cómo se dice esto?»', words: ['Hur', 'säger', 'man', 'det här'], answer: ['Hur', 'säger', 'man', 'det här'], explanation: '«Hur säger man det här?».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 28. ADVERBIOS (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'adverbios',
      title: 'Adverbios',
      subtitle: 'snabbt, ofta, alltid, aldrig',
      icon: '🏃',
      color: '#3B82F6',
      level: 'B',
      keywords: 'adverbios snabbt ofta alltid aldrig ibland kanske mycket adverb modo frecuencia rápidamente',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'Para formar un adverbio de modo, al adjetivo se le suma…', options: ['-t (snabb → snabbt)', '-ar'], correct: 0, explanation: 'Adjetivo + t = adverbio: snabb (rápido) → snabbt (rápidamente). 🏃' },
        { type: 'mc', text: '«Él corre rápido» → «Han springer ___»', options: ['snabbt', 'snabb', 'snabba'], correct: 0, explanation: '«Han springer snabbt». Como describe cómo corre (el verbo), va el adverbio: snabbt.' },
        { type: 'mc', text: '«Ella habla bien» → «Hon talar ___»', options: ['bra', 'brat', 'bras'], correct: 0, explanation: '«Hon talar bra». «bra» (bien) es irregular: no cambia.' },
        { type: 'mc', text: '«a menudo» → ___', options: ['ofta', 'alltid', 'aldrig'], correct: 0, explanation: '«ofta» = a menudo.' },
        { type: 'mc', text: '«siempre» → ___', options: ['alltid', 'aldrig', 'ibland'], correct: 0, explanation: '«alltid» = siempre.' },
        { type: 'mc', text: '«nunca» → ___', options: ['aldrig', 'alltid', 'ofta'], correct: 0, explanation: '«aldrig» = nunca.' },
        { type: 'mc', text: '«a veces» → ___', options: ['ibland', 'alltid', 'ofta'], correct: 0, explanation: '«ibland» = a veces.' },
        { type: 'mc', text: '«quizás» → ___', options: ['kanske', 'mycket', 'lite'], correct: 0, explanation: '«kanske» = quizás.' },
        { type: 'mc', text: '«Habla despacio» → «Tala ___»', options: ['långsamt', 'långsam', 'långsamma'], correct: 0, explanation: '«Tala långsamt» = habla despacio. långsam + t = långsamt (adverbio).' },
        { type: 'mc', text: '«mucho» → ___', options: ['mycket', 'lite', 'lagom'], correct: 0, explanation: '«mycket» = mucho. «lite» = poco.' },
        { type: 'mc', text: '«ahora» → ___', options: ['nu', 'sedan', 'då'], correct: 0, explanation: '«nu» = ahora. «sedan» = después, «då» = entonces.' },
        { type: 'mc', text: '«Ella canta bonito» → «Hon sjunger ___»', options: ['vackert', 'vacker', 'vackra'], correct: 0, explanation: '«Hon sjunger vackert». vacker + t = vackert (adverbio).' },
        { type: 'type', prompt: 'Adverbio de «snabb» (rápidamente):', answer: 'snabbt', accept: [], explanation: '«snabbt» (snabb + t).' },
        { type: 'type', prompt: '«siempre» en sueco:', answer: 'alltid', accept: [], explanation: '«alltid».' },
        { type: 'type', prompt: '«nunca» en sueco:', answer: 'aldrig', accept: [], explanation: '«aldrig».' },
        { type: 'type', prompt: '«a menudo» en sueco:', answer: 'ofta', accept: [], explanation: '«ofta».' },
        { type: 'order', prompt: 'Ordena: «Él corre rápido»', words: ['Han', 'springer', 'snabbt'], answer: ['Han', 'springer', 'snabbt'], explanation: '«Han springer snabbt».' },
        { type: 'order', prompt: 'Ordena: «Siempre bebo café»', words: ['Jag', 'dricker', 'alltid', 'kaffe'], answer: ['Jag', 'dricker', 'alltid', 'kaffe'], explanation: '«Jag dricker alltid kaffe».' },
        { type: 'order', prompt: 'Ordena: «Ella habla bien sueco»', words: ['Hon', 'talar', 'bra', 'svenska'], answer: ['Hon', 'talar', 'bra', 'svenska'], explanation: '«Hon talar bra svenska».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 29. LUGAR Y MOVIMIENTO (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'lugar-movimiento',
      title: 'Lugar y movimiento',
      subtitle: 'är hemma vs går hem · här/hit',
      icon: '🧭',
      color: '#3B82F6',
      level: 'B',
      keywords: 'lugar movimiento här hit där dit hemma hem ute ut ligger står sitter donde hacia',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«aquí» (dónde estás) → ___', options: ['här', 'hit', 'där'], correct: 0, explanation: '«här» = aquí (ubicación, dónde estás). 🧭' },
        { type: 'mc', text: '«(hacia) aquí» (movimiento) → ___', options: ['hit', 'här', 'dit'], correct: 0, explanation: '«hit» = hacia aquí (movimiento). El sueco distingue «estar aquí» (här) de «venir aquí» (hit).' },
        { type: 'mc', text: '«Estoy en casa» → «Jag är ___»', options: ['hemma', 'hem', 'hus'], correct: 0, explanation: '«Jag är hemma» = estoy en casa (ubicación).' },
        { type: 'mc', text: '«Voy a casa» → «Jag går ___»', options: ['hem', 'hemma', 'hus'], correct: 0, explanation: '«Jag går hem» = voy a casa (movimiento). ¡Ojo! hemma = estar; hem = ir.' },
        { type: 'mc', text: '«allí» (ubicación) → ___', options: ['där', 'dit', 'här'], correct: 0, explanation: '«där» = allí (dónde algo está).' },
        { type: 'mc', text: '«(hacia) allá» (movimiento) → ___', options: ['dit', 'där', 'hit'], correct: 0, explanation: '«dit» = hacia allá: «Jag åker dit» = voy para allá.' },
        { type: 'mc', text: '«¡Ven aquí!» → «Kom ___»', options: ['hit', 'här'], correct: 0, explanation: '«Kom hit!» — hay movimiento hacia ti, por eso «hit».' },
        { type: 'mc', text: 'El sueco distingue entre…', options: ['dónde estás y hacia dónde vas', 'no distingue, es igual'], correct: 0, explanation: 'Sí: här/hit, där/dit, hemma/hem, ute/ut. Ubicación vs movimiento. 🎯' },
        { type: 'mc', text: '«afuera» (ubicación) → ___', options: ['ute', 'ut', 'in'], correct: 0, explanation: '«ute» = afuera (dónde estás): «Jag är ute».' },
        { type: 'mc', text: '«Sal (hacia afuera)» → «Gå ___»', options: ['ut', 'ute', 'in'], correct: 0, explanation: '«Gå ut!» = ¡sal! (movimiento hacia afuera).' },
        { type: 'mc', text: '«El libro está (acostado) en la mesa» → «Boken ___ på bordet»', options: ['ligger', 'står', 'sitter'], correct: 0, explanation: '«Boken ligger på bordet». Las cosas «acostadas» usan «ligga» (ligger).' },
        { type: 'mc', text: '«El vaso está (parado) en la mesa» → «Glaset ___ på bordet»', options: ['står', 'ligger', 'sitter'], correct: 0, explanation: '«Glaset står på bordet». Las cosas «de pie» usan «stå» (står).' },
        { type: 'type', prompt: '«en casa» (ubicación):', answer: 'hemma', accept: [], explanation: '«hemma» (estar en casa).' },
        { type: 'type', prompt: '«a casa» (movimiento):', answer: 'hem', accept: [], explanation: '«hem» (ir a casa).' },
        { type: 'type', prompt: '«aquí» (ubicación):', answer: 'här', accept: [], explanation: '«här».' },
        { type: 'type', prompt: '«hacia aquí» (movimiento):', answer: 'hit', accept: [], explanation: '«hit».' },
        { type: 'order', prompt: 'Ordena: «Estoy en casa»', words: ['Jag', 'är', 'hemma'], answer: ['Jag', 'är', 'hemma'], explanation: '«Jag är hemma».' },
        { type: 'order', prompt: 'Ordena: «Voy a casa ahora»', words: ['Jag', 'går', 'hem', 'nu'], answer: ['Jag', 'går', 'hem', 'nu'], explanation: '«Jag går hem nu».' },
        { type: 'order', prompt: 'Ordena: «¡Ven aquí!»', words: ['Kom', 'hit'], answer: ['Kom', 'hit'], explanation: '«Kom hit!».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 30. RESPUESTAS CORTAS (SFI B)
    // ─────────────────────────────────────────────────────
    {
      id: 'respuestas-cortas',
      title: 'Respuestas cortas',
      subtitle: 'Ja, det gör jag · Nej, det är jag inte',
      icon: '💬',
      color: '#3B82F6',
      level: 'B',
      keywords: 'respuestas cortas kortsvar ja nej det gör jag jo si no responder svar',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«¿Hablas sueco? Sí» → «Ja, det ___ jag»', options: ['gör', 'är', 'har'], correct: 0, explanation: '«Ja, det gör jag». Para verbos de acción (talar, bor…) la respuesta corta usa «gör» (hago). 💬' },
        { type: 'mc', text: '«¿Estás cansado? Sí» → «Ja, det ___ jag»', options: ['är', 'gör', 'har'], correct: 0, explanation: '«Ja, det är jag». Si la pregunta usa «är» (ser/estar), la respuesta repite «är».' },
        { type: 'mc', text: '«¿Tienes coche? Sí» → «Ja, det ___ jag»', options: ['har', 'gör', 'är'], correct: 0, explanation: '«Ja, det har jag». Si la pregunta usa «har» (tener), la respuesta repite «har».' },
        { type: 'mc', text: 'Para responder corto a un verbo de acción (talar, bor…) se usa…', options: ['gör', 'är', 'har'], correct: 0, explanation: '«gör» (de göra = hacer) sustituye al verbo de acción: Ja, det gör jag.' },
        { type: 'mc', text: '«¿No vienes? — ¡Sí que voy!» se responde con…', options: ['Jo', 'Ja', 'Nej'], correct: 0, explanation: '«Jo». Cuando la pregunta es negativa y quieres decir «sí», se usa «Jo», no «Ja». 🎯' },
        { type: 'mc', text: '«¿Vives aquí? No» → «Nej, det gör jag ___»', options: ['inte', 'ingen', 'aldrig'], correct: 0, explanation: '«Nej, det gör jag inte» = no, no vivo (aquí).' },
        { type: 'mc', text: 'En «Ja, det gör jag», «gör» sustituye a…', options: ['el verbo de acción', 'el sujeto'], correct: 0, explanation: '«gör» reemplaza el verbo que se preguntó (talar, bor, jobbar…), para no repetirlo.' },
        { type: 'mc', text: '«¿Eres de Suecia? No» → «Nej, det ___ jag inte»', options: ['är', 'gör', 'har'], correct: 0, explanation: '«Nej, det är jag inte». Con «är» en la pregunta, se repite «är».' },
        { type: 'type', prompt: 'El verbo que sustituye a las acciones en respuestas cortas:', answer: 'gör', accept: [], explanation: '«gör» (Ja, det gör jag).' },
        { type: 'type', prompt: '«sí» a una pregunta negativa (¿no vienes? — sí):', answer: 'jo', accept: [], explanation: '«Jo».' },
        { type: 'order', prompt: 'Ordena: «Sí, (yo) hablo»', words: ['Ja', 'det', 'gör', 'jag'], answer: ['Ja', 'det', 'gör', 'jag'], explanation: '«Ja, det gör jag».' },
        { type: 'order', prompt: 'Ordena: «No, no tengo»', words: ['Nej', 'det', 'har', 'jag', 'inte'], answer: ['Nej', 'det', 'har', 'jag', 'inte'], explanation: '«Nej, det har jag inte».' },
        { type: 'order', prompt: 'Ordena: «Sí, (lo) estoy»', words: ['Ja', 'det', 'är', 'jag'], answer: ['Ja', 'det', 'är', 'jag'], explanation: '«Ja, det är jag».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 31. VERBOS CON PARTÍCULA — partikelverb (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'partikelverb',
      title: 'Verbos con partícula',
      subtitle: 'tycka om, ge upp, stänga av',
      icon: '🧩',
      color: '#F59E0B',
      level: 'C',
      keywords: 'partikelverb particula tycka om ge upp känna igen stänga av slå på ta reda på phrasal',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'Un «verbo con partícula» es un verbo + una palabrita que juntos cambian el significado. «tycka om» =', options: ['gustar', 'pensar', 'tener'], correct: 0, explanation: '«tycka om» = gustar. Solo, «tycka» es «opinar»; con «om» significa «gustar». 🧩' },
        { type: 'mc', text: '«Me gusta el café» → «Jag ___ kaffe»', options: ['tycker om', 'tycker', 'om tycker'], correct: 0, explanation: '«Jag tycker om kaffe». La partícula «om» va justo después del verbo.' },
        { type: 'mc', text: '«rendirse» → ___', options: ['ge upp', 'ge', 'upp ge'], correct: 0, explanation: '«ge upp» = rendirse. «ge» solo = dar.' },
        { type: 'mc', text: '«reconocer» → ___', options: ['känna igen', 'känna', 'igen känna'], correct: 0, explanation: '«känna igen» = reconocer. «känna» solo = conocer/sentir.' },
        { type: 'mc', text: '«apagar la luz» → «___ lampan»', options: ['stänga av', 'stänga', 'av stänga'], correct: 0, explanation: '«stänga av lampan» = apagar la luz.' },
        { type: 'mc', text: '«encender» → ___', options: ['slå på', 'slå', 'på slå'], correct: 0, explanation: '«slå på» = encender (prender). «stänga av» = apagar.' },
        { type: 'mc', text: '«averiguar» → ___', options: ['ta reda på', 'ta reda', 'reda ta'], correct: 0, explanation: '«ta reda på» = averiguar / informarse.' },
        { type: 'mc', text: 'En «tycka om», la partícula «om»…', options: ['cambia el significado del verbo', 'es una preposición normal cualquiera'], correct: 0, explanation: 'La partícula va pegada al sentido del verbo y se pronuncia con fuerza (acento).' },
        { type: 'mc', text: '«¿Te gusta Suecia?» → «___ du om Sverige?»', options: ['Tycker', 'Tänker', 'Tittar'], correct: 0, explanation: '«Tycker du om Sverige?» = ¿te gusta Suecia?' },
        { type: 'mc', text: 'La partícula suele ir…', options: ['justo después del verbo (antes del objeto)', 'siempre al final de la frase'], correct: 0, explanation: '«stänga av lampan», «tycka om kaffe»: partícula pegada al verbo, antes del objeto.' },
        { type: 'mc', text: '«ocurrírsele / recordar» → ___', options: ['komma på', 'komma', 'på komma'], correct: 0, explanation: '«komma på» = ocurrírsele algo / caer en cuenta.' },
        { type: 'type', prompt: '«gustar» (presente, «me gusta»): tycker ___', answer: 'om', accept: [], explanation: '«tycker om».' },
        { type: 'type', prompt: '«rendirse»:', answer: 'ge upp', accept: [], explanation: '«ge upp».' },
        { type: 'type', prompt: '«apagar»:', answer: 'stänga av', accept: [], explanation: '«stänga av».' },
        { type: 'type', prompt: '«reconocer»:', answer: 'känna igen', accept: [], explanation: '«känna igen».' },
        { type: 'order', prompt: 'Ordena: «Me gusta el café»', words: ['Jag', 'tycker', 'om', 'kaffe'], answer: ['Jag', 'tycker', 'om', 'kaffe'], explanation: '«Jag tycker om kaffe».' },
        { type: 'order', prompt: 'Ordena: «Apaga la luz»', words: ['Stäng', 'av', 'lampan'], answer: ['Stäng', 'av', 'lampan'], explanation: '«Stäng av lampan».' },
        { type: 'order', prompt: 'Ordena: «No me rindo»', words: ['Jag', 'ger', 'inte', 'upp'], answer: ['Jag', 'ger', 'inte', 'upp'], explanation: '«Jag ger inte upp».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 32. EL CONDICIONAL — skulle (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'condicional',
      title: 'El condicional (skulle)',
      subtitle: 'Jag skulle vilja… = querría…',
      icon: '🌤️',
      color: '#F59E0B',
      level: 'C',
      keywords: 'condicional skulle skulle vilja haria querria si tuviera hipotetico cortesia would',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«skulle» equivale en español a…', options: ['«-ría» (haría, querría)', '«-é» (haré, querré)'], correct: 0, explanation: '«skulle» = «-ría»: el condicional. Jag skulle resa = yo viajaría. 🌤️' },
        { type: 'mc', text: '«Querría un café» (cortés) → «Jag ___ vilja ha en kaffe»', options: ['skulle', 'ska', 'vill'], correct: 0, explanation: '«Jag skulle vilja ha…» = querría… Es la forma educada de pedir.' },
        { type: 'mc', text: '«Sería divertido» → «Det ___ vara kul»', options: ['skulle', 'ska', 'är'], correct: 0, explanation: '«Det skulle vara kul» = sería divertido.' },
        { type: 'mc', text: 'Para pedir algo con educación conviene usar…', options: ['skulle vilja (querría)', 'vill (quiero)'], correct: 0, explanation: '«skulle vilja» suena más amable que «vill»: Jag skulle vilja ha… 🎯' },
        { type: 'mc', text: '«Si tuviera dinero, viajaría» → «Om jag hade pengar ___ jag resa»', options: ['skulle', 'ska', 'vill'], correct: 0, explanation: '«…skulle jag resa» = viajaría. «skulle» para lo hipotético.' },
        { type: 'mc', text: 'Después de «skulle», el verbo va en…', options: ['forma base (resa)', 'presente (reser)'], correct: 0, explanation: 'Como con los modales: skulle + verbo base. Jag skulle resa, Det skulle vara…' },
        { type: 'mc', text: '«¿Podrías ayudarme?» → «___ du kunna hjälpa mig?»', options: ['Skulle', 'Ska', 'Vill'], correct: 0, explanation: '«Skulle du kunna hjälpa mig?» = ¿podrías ayudarme? (muy educado).' },
        { type: 'mc', text: '«skulle vilja» significa…', options: ['querría', 'quiero', 'querré'], correct: 0, explanation: '«skulle vilja» = querría (condicional + querer).' },
        { type: 'mc', text: '«Me gustaría ir» → «Jag skulle vilja ___»', options: ['åka', 'åker', 'åkte'], correct: 0, explanation: '«…vilja åka» (forma base). Jag skulle vilja åka.' },
        { type: 'mc', text: '«Compraría una casa» → «Jag ___ köpa ett hus»', options: ['skulle', 'ska', 'köper'], correct: 0, explanation: '«Jag skulle köpa ett hus» = compraría una casa.' },
        { type: 'type', prompt: 'La palabra clave del condicional («-ría»):', answer: 'skulle', accept: [], explanation: '«skulle».' },
        { type: 'type', prompt: '«querría» (cortés):', answer: 'skulle vilja', accept: [], explanation: '«skulle vilja».' },
        { type: 'type', prompt: 'Tras «skulle», «ir» (åka) se dice:', answer: 'åka', accept: [], explanation: '«åka» (forma base).' },
        { type: 'order', prompt: 'Ordena: «Querría un café»', words: ['Jag', 'skulle', 'vilja', 'ha', 'en', 'kaffe'], answer: ['Jag', 'skulle', 'vilja', 'ha', 'en', 'kaffe'], explanation: '«Jag skulle vilja ha en kaffe».' },
        { type: 'order', prompt: 'Ordena: «Sería divertido»', words: ['Det', 'skulle', 'vara', 'kul'], answer: ['Det', 'skulle', 'vara', 'kul'], explanation: '«Det skulle vara kul».' },
        { type: 'order', prompt: 'Ordena: «¿Podrías ayudarme?»', words: ['Skulle', 'du', 'kunna', 'hjälpa', 'mig'], answer: ['Skulle', 'du', 'kunna', 'hjälpa', 'mig'], explanation: '«Skulle du kunna hjälpa mig?».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 33. VERBOS CON PREPOSICIÓN (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'verbos-preposicion',
      title: 'Verbos con preposición',
      subtitle: 'tänka på, vänta på, tycka om',
      icon: '🔌',
      color: '#F59E0B',
      level: 'C',
      keywords: 'verbos preposicion tänka på vänta på titta på lyssna på tro på bero på fasta preposition rection',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«pensar EN» → «tänka ___»', options: ['på', 'i', 'om'], correct: 0, explanation: '«tänka på» = pensar en. Jag tänker på dig. 🔌' },
        { type: 'mc', text: '«esperar (algo)» → «vänta ___»', options: ['på', 'för', 'till'], correct: 0, explanation: '«vänta på» = esperar. Jag väntar på bussen.' },
        { type: 'mc', text: '«mirar» → «titta ___»', options: ['på', 'i', 'åt'], correct: 0, explanation: '«titta på» = mirar. Titta på tavlan.' },
        { type: 'mc', text: '«escuchar» → «lyssna ___»', options: ['på', 'till', 'i'], correct: 0, explanation: '«lyssna på» = escuchar. Lyssna på musik.' },
        { type: 'mc', text: '«gustar» → «tycka ___»', options: ['om', 'på', 'i'], correct: 0, explanation: '«tycka om» = gustar.' },
        { type: 'mc', text: '«depender de» → «bero ___»', options: ['på', 'av', 'om'], correct: 0, explanation: '«bero på» = depender de. Det beror på vädret.' },
        { type: 'mc', text: '«creer en» → «tro ___»', options: ['på', 'i', 'om'], correct: 0, explanation: '«tro på» = creer en. Jag tror på dig.' },
        { type: 'mc', text: 'Las preposiciones de estos verbos…', options: ['se aprenden de memoria (no siempre igual que en español)', 'son siempre iguales al español'], correct: 0, explanation: 'Ojo: «tänka på» (pensar EN, no «i»), «vänta på» (esperar, sin «a»). Hay que memorizarlas. 🎯' },
        { type: 'mc', text: '«Pienso en ti» → «Jag tänker ___ dig»', options: ['på', 'i', 'om'], correct: 0, explanation: '«Jag tänker på dig».' },
        { type: 'mc', text: '«Espero el autobús» → «Jag väntar ___ bussen»', options: ['på', 'för', 'till'], correct: 0, explanation: '«Jag väntar på bussen».' },
        { type: 'type', prompt: '«pensar en» → «tänka ___»:', answer: 'på', accept: [], explanation: '«tänka på».' },
        { type: 'type', prompt: '«esperar (algo)» → «vänta ___»:', answer: 'på', accept: [], explanation: '«vänta på».' },
        { type: 'type', prompt: '«gustar» → «tycka ___»:', answer: 'om', accept: [], explanation: '«tycka om».' },
        { type: 'order', prompt: 'Ordena: «Pienso en ti»', words: ['Jag', 'tänker', 'på', 'dig'], answer: ['Jag', 'tänker', 'på', 'dig'], explanation: '«Jag tänker på dig».' },
        { type: 'order', prompt: 'Ordena: «Espero el autobús»', words: ['Jag', 'väntar', 'på', 'bussen'], answer: ['Jag', 'väntar', 'på', 'bussen'], explanation: '«Jag väntar på bussen».' },
        { type: 'order', prompt: 'Ordena: «Escucho música»', words: ['Jag', 'lyssnar', 'på', 'musik'], answer: ['Jag', 'lyssnar', 'på', 'musik'], explanation: '«Jag lyssnar på musik».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 34. CONJUNCIONES AVANZADAS (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'conjunciones-avanzadas',
      title: 'Conjunciones avanzadas',
      subtitle: 'fastän, medan, innan, så att',
      icon: '🪢',
      color: '#F59E0B',
      level: 'C',
      keywords: 'conjunciones avanzadas fastän trots att medan innan efter att därför att så att aunque mientras antes bisats',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«aunque» → ___', options: ['fastän', 'eftersom', 'medan'], correct: 0, explanation: '«fastän» (o «trots att») = aunque. Fastän det regnar… 🪢' },
        { type: 'mc', text: '«mientras» → ___', options: ['medan', 'innan', 'efter'], correct: 0, explanation: '«medan» = mientras. Medan jag lagar mat…' },
        { type: 'mc', text: '«antes de (que)» → ___', options: ['innan', 'efter', 'medan'], correct: 0, explanation: '«innan» = antes de que. Innan jag äter…' },
        { type: 'mc', text: '«después de (que)» → ___', options: ['efter att', 'innan', 'medan'], correct: 0, explanation: '«efter att» = después de que.' },
        { type: 'mc', text: '«porque» (otra forma) → ___', options: ['därför att', 'därför', 'så'], correct: 0, explanation: '«därför att» = porque (da la razón). Ojo: «därför» solo = por eso.' },
        { type: 'mc', text: '«para que / así que» → ___', options: ['så att', 'fastän', 'medan'], correct: 0, explanation: '«så att» = para que / así que. …så att du förstår.' },
        { type: 'mc', text: 'Estas conjunciones crean una subordinada, así que «inte» va…', options: ['antes del verbo', 'después del verbo'], correct: 0, explanation: 'Recuerda la regla BIFF: en subordinada, «inte» antes del verbo. …fastän jag inte vill.' },
        { type: 'mc', text: '«Aunque llueve, salgo» → «___ det regnar, går jag ut»', options: ['Fastän', 'Eftersom', 'Medan'], correct: 0, explanation: '«Fastän det regnar, går jag ut».' },
        { type: 'mc', text: '«Leo mientras como» → «Jag läser ___ jag äter»', options: ['medan', 'innan', 'efter'], correct: 0, explanation: '«Jag läser medan jag äter».' },
        { type: 'type', prompt: '«aunque»:', answer: 'fastän', accept: ['trots att'], explanation: '«fastän» (o «trots att»).' },
        { type: 'type', prompt: '«mientras»:', answer: 'medan', accept: [], explanation: '«medan».' },
        { type: 'type', prompt: '«antes de»:', answer: 'innan', accept: [], explanation: '«innan».' },
        { type: 'type', prompt: '«para que / así que»:', answer: 'så att', accept: [], explanation: '«så att».' },
        { type: 'order', prompt: 'Ordena: «Espero antes de comer»', words: ['Jag', 'väntar', 'innan', 'jag', 'äter'], answer: ['Jag', 'väntar', 'innan', 'jag', 'äter'], explanation: '«Jag väntar innan jag äter».' },
        { type: 'order', prompt: 'Ordena: «Leo mientras como»', words: ['Jag', 'läser', 'medan', 'jag', 'äter'], answer: ['Jag', 'läser', 'medan', 'jag', 'äter'], explanation: '«Jag läser medan jag äter».' },
        { type: 'order', prompt: 'Ordena: «No salgo porque llueve»', words: ['Jag', 'går', 'inte', 'ut', 'eftersom', 'det', 'regnar'], answer: ['Jag', 'går', 'inte', 'ut', 'eftersom', 'det', 'regnar'], explanation: '«Jag går inte ut eftersom det regnar».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 35. PALABRAS COMPUESTAS — sammansatta ord (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'palabras-compuestas',
      title: 'Palabras compuestas',
      subtitle: 'tandläkare, kylskåp, sommarhus',
      icon: '🧱',
      color: '#F59E0B',
      level: 'C',
      keywords: 'palabras compuestas sammansatta ord tandläkare kylskåp fotboll barnbok sommarhus juntar pegar',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'En sueco, muchas palabras se forman…', options: ['pegando dos o más palabras', 'separándolas con guion'], correct: 0, explanation: 'El sueco pega las palabras: tand + läkare = tandläkare. ¡Todo junto! 🧱' },
        { type: 'mc', text: '«dentista» = tand (diente) + läkare (médico) =', options: ['tandläkare', 'tand läkare', 'läkaretand'], correct: 0, explanation: '«tandläkare» = dentista (médico de dientes), todo junto.' },
        { type: 'mc', text: '«refrigerador» = kyl (frío) + skåp (armario) =', options: ['kylskåp', 'skåpkyl', 'kyl skåp'], correct: 0, explanation: '«kylskåp» = refrigerador (armario del frío).' },
        { type: 'mc', text: 'En una palabra compuesta, el significado base lo da…', options: ['la última palabra', 'la primera palabra'], correct: 0, explanation: 'La última manda: en «tandläkare», lo básico es «läkare» (médico); «tand» solo dice de qué. 🎯' },
        { type: 'mc', text: '«fotboll» (fútbol) es «en» o «ett»? Lo decide…', options: ['la última palabra (en boll → en fotboll)', 'la primera palabra'], correct: 0, explanation: 'La última palabra manda el género: «en boll» → «en fotboll».' },
        { type: 'mc', text: '«libro infantil» = barn (niño) + bok (libro) =', options: ['barnbok', 'bokbarn', 'barn bok'], correct: 0, explanation: '«barnbok» = libro infantil.' },
        { type: 'mc', text: '«casa de verano» = sommar + hus =', options: ['sommarhus', 'hussommar', 'sommar hus'], correct: 0, explanation: '«sommarhus» = casa de verano.' },
        { type: 'mc', text: 'Juntar palabras en sueco es…', options: ['muy común (mejor pegarlas)', 'raro, casi no se hace'], correct: 0, explanation: 'Es normalísimo. Separarlas cuando deberían ir juntas es un error típico (särskrivning).' },
        { type: 'type', prompt: '«dentista» (tand + läkare):', answer: 'tandläkare', accept: [], explanation: '«tandläkare».' },
        { type: 'type', prompt: '«refrigerador» (kyl + skåp):', answer: 'kylskåp', accept: [], explanation: '«kylskåp».' },
        { type: 'type', prompt: '«casa de verano» (sommar + hus):', answer: 'sommarhus', accept: [], explanation: '«sommarhus».' },
        { type: 'type', prompt: '«libro infantil» (barn + bok):', answer: 'barnbok', accept: [], explanation: '«barnbok».' },
        { type: 'order', prompt: 'Ordena: «Tengo un refrigerador nuevo»', words: ['Jag', 'har', 'ett', 'nytt', 'kylskåp'], answer: ['Jag', 'har', 'ett', 'nytt', 'kylskåp'], explanation: '«Jag har ett nytt kylskåp».' },
        { type: 'order', prompt: 'Ordena: «Ella es dentista»', words: ['Hon', 'är', 'tandläkare'], answer: ['Hon', 'är', 'tandläkare'], explanation: '«Hon är tandläkare».' },
        { type: 'order', prompt: 'Ordena: «Es un libro infantil»', words: ['Det', 'är', 'en', 'barnbok'], answer: ['Det', 'är', 'en', 'barnbok'], explanation: '«Det är en barnbok».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 36. ADJETIVO EN FORMA DEFINIDA (SFI C)
    // ─────────────────────────────────────────────────────
    {
      id: 'adjetivo-definido',
      title: 'El adjetivo con «el/la»',
      subtitle: 'den stora bilen, det stora huset',
      icon: '🎯',
      color: '#F59E0B',
      level: 'C',
      keywords: 'adjetivo definido den stora bilen det stora huset de stora bestämd form adjektiv doble determinacion',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«el coche grande» (en bil) → «den ___ bilen»', options: ['stora', 'stor', 'stort'], correct: 0, explanation: '«den stora bilen». Con «el/la», el adjetivo casi siempre termina en -a: stora. 🎯' },
        { type: 'mc', text: '«la casa grande» (ett hus) → «det ___ huset»', options: ['stora', 'stort', 'stor'], correct: 0, explanation: '«det stora huset». ¡Incluso con «ett» el adjetivo definido es -a! (stora, no stort).' },
        { type: 'mc', text: '«los coches grandes» → «de ___ bilarna»', options: ['stora', 'stor', 'stort'], correct: 0, explanation: '«de stora bilarna». En plural también -a: stora.' },
        { type: 'mc', text: 'En forma definida, el adjetivo casi siempre termina en…', options: ['-a', '-t'], correct: 0, explanation: 'Con «el/la/los» el adjetivo va en -a (stora, röda, nya). El -t es solo para «ett» indefinido.' },
        { type: 'mc', text: 'Hay «doble marca»: delante va ___ y el nombre queda en forma definida', options: ['den / det / de', 'nada'], correct: 0, explanation: '«den stora bilen»: den (delante) + stora (-a) + bilen (definido). Tres marcas de «el». 🎯' },
        { type: 'mc', text: '«el coche rojo» (en bil) → «___ röda bilen»', options: ['den', 'det', 'de'], correct: 0, explanation: '«den röda bilen». «en bil» → «den».' },
        { type: 'mc', text: '«la casa roja» (ett hus) → «___ röda huset»', options: ['det', 'den', 'de'], correct: 0, explanation: '«det röda huset». «ett hus» → «det».' },
        { type: 'mc', text: '«los libros nuevos» → «de ___ böckerna»', options: ['nya', 'ny', 'nytt'], correct: 0, explanation: '«de nya böckerna». Plural definido → adjetivo en -a: nya.' },
        { type: 'mc', text: '«en röd bil» vs «den röda bilen». La diferencia es…', options: ['un coche rojo vs EL coche rojo', 'no hay diferencia'], correct: 0, explanation: '«en röd bil» = un coche rojo (indefinido). «den röda bilen» = el coche rojo (definido, con -a).' },
        { type: 'type', prompt: '«el coche grande» → «den ___ bilen»:', answer: 'stora', accept: [], explanation: '«stora» (definido → -a).' },
        { type: 'type', prompt: 'En forma definida, el adjetivo acaba casi siempre en (una letra):', answer: 'a', accept: [], explanation: '«-a»: stora, röda, nya.' },
        { type: 'type', prompt: '«el… rojo» (en bil): «___ röda bilen»:', answer: 'den', accept: [], explanation: '«den» (para palabras «en»).' },
        { type: 'type', prompt: '«la… roja» (ett hus): «___ röda huset»:', answer: 'det', accept: [], explanation: '«det» (para palabras «ett»).' },
        { type: 'order', prompt: 'Ordena: «El coche grande es rojo»', words: ['Den', 'stora', 'bilen', 'är', 'röd'], answer: ['Den', 'stora', 'bilen', 'är', 'röd'], explanation: '«Den stora bilen är röd».' },
        { type: 'order', prompt: 'Ordena: «La casa grande»', words: ['Det', 'stora', 'huset'], answer: ['Det', 'stora', 'huset'], explanation: '«Det stora huset».' },
        { type: 'order', prompt: 'Ordena: «Los coches nuevos»', words: ['De', 'nya', 'bilarna'], answer: ['De', 'nya', 'bilarna'], explanation: '«De nya bilarna».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 37. ESTRUCTURA DEL TEXTO (SFI D)
    // ─────────────────────────────────────────────────────
    {
      id: 'estructura-texto',
      title: 'Cómo escribir un texto',
      subtitle: 'inledning, huvuddel, avslutning',
      icon: '📄',
      color: '#8B5CF6',
      level: 'D',
      keywords: 'estructura texto inledning huvuddel avslutning rubrik stycke introduccion desarrollo conclusion escribir textstruktur',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'La primera parte de un texto, que presenta el tema, se llama…', options: ['inledning', 'avslutning', 'huvuddel'], correct: 0, explanation: '«inledning» = introducción. Ahí presentas el tema y captas el interés del lector. 📄' },
        { type: 'mc', text: '«inledning» significa…', options: ['introducción', 'conclusión', 'opinión'], correct: 0, explanation: '«inledning» = introducción (el comienzo del texto).' },
        { type: 'mc', text: 'El cuerpo del texto, donde desarrollas las ideas, es…', options: ['huvuddel', 'inledning', 'avslutning'], correct: 0, explanation: '«huvuddel» = parte principal / desarrollo. Aquí van los detalles y argumentos.' },
        { type: 'mc', text: 'La parte final, que resume y cierra, se llama…', options: ['avslutning', 'inledning', 'rubrik'], correct: 0, explanation: '«avslutning» = conclusión / cierre.' },
        { type: 'mc', text: 'El orden correcto de un texto es…', options: ['inledning → huvuddel → avslutning', 'avslutning → inledning → huvuddel'], correct: 0, explanation: 'Primero introduces (inledning), luego desarrollas (huvuddel) y al final cierras (avslutning). 🎯' },
        { type: 'mc', text: '«rubrik» significa…', options: ['título', 'párrafo', 'firma'], correct: 0, explanation: '«rubrik» = título (el encabezado del texto).' },
        { type: 'mc', text: '«stycke» significa…', options: ['párrafo', 'palabra', 'letra'], correct: 0, explanation: '«stycke» = párrafo. Cada idea nueva suele ir en un párrafo nuevo.' },
        { type: 'mc', text: 'En la «inledning» debes…', options: ['presentar el tema y captar interés', 'despedirte'], correct: 0, explanation: 'La introducción abre el tema y engancha al lector.' },
        { type: 'mc', text: 'En la «avslutning» normalmente…', options: ['resumes y das una conclusión', 'presentas el tema por primera vez'], correct: 0, explanation: 'El cierre recoge lo dicho y concluye.' },
        { type: 'mc', text: 'Cada idea nueva suele empezar…', options: ['en un párrafo nuevo (stycke)', 'en la misma línea siempre'], correct: 0, explanation: 'Un texto claro separa las ideas en párrafos (stycken).' },
        { type: 'type', prompt: '«introducción» en sueco:', answer: 'inledning', accept: [], explanation: '«inledning».' },
        { type: 'type', prompt: '«conclusión / cierre» en sueco:', answer: 'avslutning', accept: [], explanation: '«avslutning».' },
        { type: 'type', prompt: '«parte principal / desarrollo» en sueco:', answer: 'huvuddel', accept: [], explanation: '«huvuddel».' },
        { type: 'type', prompt: '«párrafo» en sueco:', answer: 'stycke', accept: [], explanation: '«stycke».' },
        { type: 'order', prompt: 'Ordena las partes de un texto (de principio a fin)', words: ['Inledning', 'Huvuddel', 'Avslutning'], answer: ['Inledning', 'Huvuddel', 'Avslutning'], explanation: 'Inledning → Huvuddel → Avslutning.' },
        { type: 'order', prompt: 'Ordena: «Primero escribo la introducción»', words: ['Först', 'skriver', 'jag', 'inledningen'], answer: ['Först', 'skriver', 'jag', 'inledningen'], explanation: '«Först skriver jag inledningen».' },
        { type: 'order', prompt: 'Ordena: «Al final viene la conclusión»', words: ['Till', 'slut', 'kommer', 'avslutningen'], answer: ['Till', 'slut', 'kommer', 'avslutningen'], explanation: '«Till slut kommer avslutningen».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 38. CONECTORES DEL TEXTO — sambandsord (SFI D)
    // ─────────────────────────────────────────────────────
    {
      id: 'conectores',
      title: 'Conectores del texto',
      subtitle: 'dessutom, däremot, därför, slutligen',
      icon: '🔗',
      color: '#8B5CF6',
      level: 'D',
      keywords: 'conectores sambandsord textbindning dessutom däremot därför alltså dock slutligen ändå till exempel å andra sidan',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«además» → ___', options: ['dessutom', 'däremot', 'dock'], correct: 0, explanation: '«dessutom» = además (suma un punto más). 🔗' },
        { type: 'mc', text: '«por ejemplo» → ___', options: ['till exempel', 'till slut', 'därför'], correct: 0, explanation: '«till exempel» (t.ex.) = por ejemplo.' },
        { type: 'mc', text: '«en cambio / por otro lado» → ___', options: ['däremot', 'dessutom', 'alltså'], correct: 0, explanation: '«däremot» = en cambio (marca un contraste).' },
        { type: 'mc', text: '«por eso» → ___', options: ['därför', 'dessutom', 'men'], correct: 0, explanation: '«därför» = por eso. Ojo: «därför att» = porque.' },
        { type: 'mc', text: '«sin embargo / de todos modos» → ___', options: ['ändå', 'dessutom', 'också'], correct: 0, explanation: '«ändå» = aun así / de todos modos.' },
        { type: 'mc', text: '«finalmente / por último» → ___', options: ['slutligen', 'först', 'dessutom'], correct: 0, explanation: '«slutligen» = finalmente. Útil para cerrar el texto.' },
        { type: 'mc', text: '«por lo tanto» → ___', options: ['alltså', 'dock', 'också'], correct: 0, explanation: '«alltså» = por lo tanto / o sea.' },
        { type: 'mc', text: 'Los conectores (sambandsord) sirven para…', options: ['unir ideas y que el texto fluya', 'solo decorar'], correct: 0, explanation: 'Enlazan las frases y le dan «hilo» al texto. Un texto sin ellos suena cortado.' },
        { type: 'mc', text: '«Me gusta Suecia. ___, hace frío» (por otro lado)', options: ['Å andra sidan', 'Dessutom', 'Därför'], correct: 0, explanation: '«Å andra sidan» = por otro lado (contraste).' },
        { type: 'mc', text: '«Estudio mucho. ___ apruebo» (por eso)', options: ['Därför', 'Däremot', 'Dock'], correct: 0, explanation: '«Därför» = por eso (consecuencia).' },
        { type: 'type', prompt: '«además»:', answer: 'dessutom', accept: [], explanation: '«dessutom».' },
        { type: 'type', prompt: '«por ejemplo»:', answer: 'till exempel', accept: ['t.ex.'], explanation: '«till exempel».' },
        { type: 'type', prompt: '«por eso»:', answer: 'därför', accept: [], explanation: '«därför».' },
        { type: 'type', prompt: '«finalmente / por último»:', answer: 'slutligen', accept: [], explanation: '«slutligen».' },
        { type: 'order', prompt: 'Ordena: «Además, hace frío»', words: ['Dessutom', 'är', 'det', 'kallt'], answer: ['Dessutom', 'är', 'det', 'kallt'], explanation: '«Dessutom är det kallt». (Empieza con conector → verbo en 2.º lugar.)' },
        { type: 'order', prompt: 'Ordena: «Por eso estudio sueco»', words: ['Därför', 'pluggar', 'jag', 'svenska'], answer: ['Därför', 'pluggar', 'jag', 'svenska'], explanation: '«Därför pluggar jag svenska».' },
        { type: 'order', prompt: 'Ordena: «Finalmente, quiero decir gracias»', words: ['Slutligen', 'vill', 'jag', 'säga', 'tack'], answer: ['Slutligen', 'vill', 'jag', 'säga', 'tack'], explanation: '«Slutligen vill jag säga tack».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 39. ARGUMENTAR Y DAR TU OPINIÓN (SFI D)
    // ─────────────────────────────────────────────────────
    {
      id: 'argumentar',
      title: 'Argumentar y dar tu opinión',
      subtitle: 'Enligt min åsikt… För det första…',
      icon: '💭',
      color: '#8B5CF6',
      level: 'D',
      keywords: 'argumentar opinion åsikt tycker att håller med motargument för det första enligt min åsikt argumenterande',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«åsikt» significa…', options: ['opinión', 'argumento', 'conclusión'], correct: 0, explanation: '«åsikt» = opinión. 💭' },
        { type: 'mc', text: '«En mi opinión…» → «Enligt min ___…»', options: ['åsikt', 'bok', 'text'], correct: 0, explanation: '«Enligt min åsikt…» = en mi opinión… (una forma clásica de abrir tu postura).' },
        { type: 'mc', text: '«Creo / opino que…» → «Jag ___ att…»', options: ['tycker', 'vet', 'ser'], correct: 0, explanation: '«Jag tycker att…» = creo/opino que… «tycka» = opinar.' },
        { type: 'mc', text: '«En primer lugar…» (primer argumento) → ___', options: ['För det första', 'Till slut', 'Däremot'], correct: 0, explanation: '«För det första…» = en primer lugar. Luego: «För det andra…» (en segundo lugar).' },
        { type: 'mc', text: '«Estoy de acuerdo» → «Jag håller ___»', options: ['med', 'på', 'om'], correct: 0, explanation: '«Jag håller med» = estoy de acuerdo.' },
        { type: 'mc', text: '«No estoy de acuerdo» → «Jag håller ___ med»', options: ['inte', 'ingen', 'aldrig'], correct: 0, explanation: '«Jag håller inte med» = no estoy de acuerdo.' },
        { type: 'mc', text: 'Un «motargument» es…', options: ['un contraargumento', 'la conclusión', 'el título'], correct: 0, explanation: '«motargument» = contraargumento (una razón en contra). Un buen texto los considera.' },
        { type: 'mc', text: 'Para apoyar tu opinión necesitas…', options: ['argument (razones)', 'solo la rubrik'], correct: 0, explanation: 'Los «argument» justifican por qué piensas así.' },
        { type: 'mc', text: '«Por un lado… por otro lado» → «Å ena sidan… ___»', options: ['å andra sidan', 'dessutom', 'därför'], correct: 0, explanation: '«å ena sidan… å andra sidan…» = por un lado… por otro lado…' },
        { type: 'mc', text: '«Creo que es importante» → «Jag tycker att det är ___»', options: ['viktigt', 'viktig', 'viktiga'], correct: 0, explanation: '«…att det är viktigt». Con «det» el adjetivo va en -t: viktigt.' },
        { type: 'type', prompt: '«opinión» en sueco:', answer: 'åsikt', accept: [], explanation: '«åsikt».' },
        { type: 'type', prompt: '«creo / opino que» → «Jag ___ att»:', answer: 'tycker', accept: [], explanation: '«Jag tycker att…».' },
        { type: 'type', prompt: '«estoy de acuerdo» → «Jag håller ___»:', answer: 'med', accept: [], explanation: '«håller med».' },
        { type: 'type', prompt: '«contraargumento» en sueco:', answer: 'motargument', accept: [], explanation: '«motargument».' },
        { type: 'order', prompt: 'Ordena: «Creo que es importante»', words: ['Jag', 'tycker', 'att', 'det', 'är', 'viktigt'], answer: ['Jag', 'tycker', 'att', 'det', 'är', 'viktigt'], explanation: '«Jag tycker att det är viktigt».' },
        { type: 'order', prompt: 'Ordena: «Estoy de acuerdo contigo»', words: ['Jag', 'håller', 'med', 'dig'], answer: ['Jag', 'håller', 'med', 'dig'], explanation: '«Jag håller med dig».' },
        { type: 'order', prompt: 'Ordena: «En primer lugar es barato»', words: ['För', 'det', 'första', 'är', 'det', 'billigt'], answer: ['För', 'det', 'första', 'är', 'det', 'billigt'], explanation: '«För det första är det billigt».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 40. LENGUAJE FORMAL E INFORMAL (SFI D)
    // ─────────────────────────────────────────────────────
    {
      id: 'formal-informal',
      title: 'Lenguaje formal e informal',
      subtitle: 'Cuándo escribir «något» y no «nåt»',
      icon: '🎩',
      color: '#8B5CF6',
      level: 'D',
      keywords: 'formal informal register tilltal du hälsningar med vänliga hälsningar tjena talspråk skriftspråk något nåt',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'En un texto formal (un correo de trabajo) conviene…', options: ['escribir completo, sin abreviar ni jerga', 'usar jerga y emojis'], correct: 0, explanation: 'El registro formal es cuidado: sin abreviaturas ni palabras coloquiales. 🎩' },
        { type: 'mc', text: 'Al escribir formal, «nåt» (habla) se escribe…', options: ['något', 'nåt', 'nada'], correct: 0, explanation: 'En el habla se dice «nåt», pero al escribir se pone la forma completa «något».' },
        { type: 'mc', text: '«de / dem» se pronuncian «dom», pero al escribir usas…', options: ['de / dem (según el caso)', '«dom» siempre'], correct: 0, explanation: 'Se escribe «de» (sujeto) o «dem» (objeto), aunque ambos suenen «dom».' },
        { type: 'mc', text: 'Para despedirte en un correo formal…', options: ['Med vänliga hälsningar', 'Hej då!'], correct: 0, explanation: '«Med vänliga hälsningar» (MVH) = saludos cordiales. Cierre estándar formal.' },
        { type: 'mc', text: '«Tjena!» es un saludo…', options: ['muy informal (entre amigos)', 'formal, para el jefe'], correct: 0, explanation: '«Tjena!» es coloquial. Para lo formal: «Hej» o «God dag».' },
        { type: 'mc', text: 'En Suecia, tratar de «du» a un desconocido…', options: ['es normal (se usa con casi todos)', 'es una falta de respeto grave'], correct: 0, explanation: 'Desde la «du-reformen», «du» es lo normal incluso con desconocidos. No necesitas «usted». 🎯' },
        { type: 'mc', text: 'El lenguaje formal evita…', options: ['abreviaturas y jerga', 'palabras largas'], correct: 0, explanation: 'Evita abreviaturas (typ, ba, nåt) y expresiones de jerga.' },
        { type: 'mc', text: '«sedan» en el habla se acorta a «sen», pero al escribir formal…', options: ['sedan', 'sen'], correct: 0, explanation: 'Forma escrita completa: «sedan».' },
        { type: 'type', prompt: 'Despedida formal de un correo (3 palabras):', answer: 'med vänliga hälsningar', accept: ['mvh'], explanation: '«Med vänliga hälsningar» (MVH).' },
        { type: 'type', prompt: 'Forma escrita correcta de «nåt»:', answer: 'något', accept: [], explanation: '«något».' },
        { type: 'type', prompt: 'Forma escrita correcta de «sen» (después):', answer: 'sedan', accept: [], explanation: '«sedan».' },
        { type: 'order', prompt: 'Ordena: «Saludos cordiales» (cierre formal)', words: ['Med', 'vänliga', 'hälsningar'], answer: ['Med', 'vänliga', 'hälsningar'], explanation: '«Med vänliga hälsningar».' },
        { type: 'order', prompt: 'Ordena: «Gracias por tu correo»', words: ['Tack', 'för', 'ditt', 'mejl'], answer: ['Tack', 'för', 'ditt', 'mejl'], explanation: '«Tack för ditt mejl».' },
        { type: 'order', prompt: 'Ordena: «Espero tu respuesta»', words: ['Jag', 'väntar', 'på', 'ditt', 'svar'], answer: ['Jag', 'väntar', 'på', 'ditt', 'svar'], explanation: '«Jag väntar på ditt svar».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 41. DISCURSO REFERIDO — referat (SFI D)
    // ─────────────────────────────────────────────────────
    {
      id: 'discurso-referido',
      title: 'Contar lo que otros dicen',
      subtitle: 'Enligt artikeln… Hon säger att…',
      icon: '🗣️',
      color: '#8B5CF6',
      level: 'D',
      keywords: 'discurso referido referat referatmarkör enligt säger att menar att hävdar påstår segun cita fuente',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: '«según» (para citar una fuente) → ___', options: ['enligt', 'genom', 'med'], correct: 0, explanation: '«enligt» = según. «Enligt artikeln…» = según el artículo… 🗣️' },
        { type: 'mc', text: '«Él dice que…» → «Han säger ___…»', options: ['att', 'som', 'och'], correct: 0, explanation: '«Han säger att…» = él dice que… Se usa «att» para contar lo dicho.' },
        { type: 'mc', text: '«Ella opina que…» → «Hon ___ att…»', options: ['tycker', 'frågar', 'svarar'], correct: 0, explanation: '«Hon tycker att…» = ella opina que…' },
        { type: 'mc', text: '«hävda» significa…', options: ['afirmar / sostener', 'preguntar'], correct: 0, explanation: '«hävda» = afirmar, sostener (algo con firmeza). «Hon hävdar att…».' },
        { type: 'mc', text: 'Una «referatmarkör» sirve para…', options: ['señalar de quién es la idea que cuentas', 'terminar el texto'], correct: 0, explanation: 'Los referatmarkörer (enligt, säger att, menar att…) marcan que la idea es de otra persona/fuente.' },
        { type: 'mc', text: '«Según el artículo…» → «___ artikeln…»', options: ['Enligt', 'Med', 'På'], correct: 0, explanation: '«Enligt artikeln…».' },
        { type: 'mc', text: '«menar att» significa…', options: ['quiere decir / opina que', 'pregunta si'], correct: 0, explanation: '«menar att» = quiere decir / da a entender que.' },
        { type: 'mc', text: 'Al contar lo que alguien dijo, normalmente usas…', options: ['«att» + la frase', 'comillas obligatorias siempre'], correct: 0, explanation: 'El referat (estilo indirecto) usa «att»: «Hon sa att hon var trött».' },
        { type: 'type', prompt: '«según» (citar una fuente):', answer: 'enligt', accept: [], explanation: '«enligt».' },
        { type: 'type', prompt: '«dice que» → «säger ___»:', answer: 'att', accept: [], explanation: '«säger att».' },
        { type: 'type', prompt: '«afirmar / sostener» (presente, «afirma»):', answer: 'hävdar', accept: ['hävda'], explanation: '«hävdar».' },
        { type: 'order', prompt: 'Ordena: «Ella dice que está cansada»', words: ['Hon', 'säger', 'att', 'hon', 'är', 'trött'], answer: ['Hon', 'säger', 'att', 'hon', 'är', 'trött'], explanation: '«Hon säger att hon är trött».' },
        { type: 'order', prompt: 'Ordena: «Según el artículo es importante»', words: ['Enligt', 'artikeln', 'är', 'det', 'viktigt'], answer: ['Enligt', 'artikeln', 'är', 'det', 'viktigt'], explanation: '«Enligt artikeln är det viktigt».' },
        { type: 'order', prompt: 'Ordena: «Él opina que el sueco es difícil»', words: ['Han', 'tycker', 'att', 'svenska', 'är', 'svårt'], answer: ['Han', 'tycker', 'att', 'svenska', 'är', 'svårt'], explanation: '«Han tycker att svenska är svårt».' },
      ]
    },

    // ─────────────────────────────────────────────────────
    // 42. PARTICIPIOS (SFI D)
    // ─────────────────────────────────────────────────────
    {
      id: 'participios',
      title: 'Los participios',
      subtitle: 'en leende flicka, ett växande problem',
      icon: '🌀',
      color: '#8B5CF6',
      level: 'D',
      keywords: 'participios particip presens leende växande rinnande participio pasado skrivet stängd adjetivo',
      sessionSize: 20,
      questions: [
        { type: 'mc', text: 'El participio de presente (que está haciendo algo) termina en…', options: ['-ande / -ende', '-at'], correct: 0, explanation: 'El particip presens termina en -ande/-ende: leende (sonriente), växande (creciente). 🌀' },
        { type: 'mc', text: '«una niña sonriente» → «en ___ flicka»', options: ['leende', 'ler', 'log'], correct: 0, explanation: '«en leende flicka» (de le = sonreír).' },
        { type: 'mc', text: '«un problema creciente» → «ett ___ problem»', options: ['växande', 'växer', 'växte'], correct: 0, explanation: '«ett växande problem» (de växa = crecer).' },
        { type: 'mc', text: '«agua corriente» → «___ vatten»', options: ['rinnande', 'rinner', 'rann'], correct: 0, explanation: '«rinnande vatten» (de rinna = correr/fluir).' },
        { type: 'mc', text: 'El participio de pasado (algo ya hecho) se usa como…', options: ['adjetivo (una puerta cerrada)', 'verbo principal solo'], correct: 0, explanation: 'El participio pasado describe: «en stängd dörr» (una puerta cerrada), «en målad vägg».' },
        { type: 'mc', text: '«una carta escrita» → «ett ___ brev»', options: ['skrivet', 'skriva', 'skrev'], correct: 0, explanation: '«ett skrivet brev». El participio también concuerda: skriven (en), skrivet (ett).' },
        { type: 'mc', text: 'Los verbos en -a forman el participio presente sumando…', options: ['-nde (tala → talande)', '-at'], correct: 0, explanation: 'tala → talande (hablante), simma → simmande. Se suma -nde.' },
        { type: 'mc', text: '«un perro que ladra» → «en ___ hund»', options: ['skällande', 'skäller', 'skällde'], correct: 0, explanation: '«en skällande hund» (de skälla = ladrar).' },
        { type: 'type', prompt: 'Terminación del participio de presente:', answer: 'ande', accept: ['-ande', 'ende', '-ende'], explanation: '«-ande / -ende».' },
        { type: 'type', prompt: '«sonriente» (de le):', answer: 'leende', accept: [], explanation: '«leende».' },
        { type: 'type', prompt: '«creciente» (de växa):', answer: 'växande', accept: [], explanation: '«växande».' },
        { type: 'order', prompt: 'Ordena: «Es un problema creciente»', words: ['Det', 'är', 'ett', 'växande', 'problem'], answer: ['Det', 'är', 'ett', 'växande', 'problem'], explanation: '«Det är ett växande problem».' },
        { type: 'order', prompt: 'Ordena: «Una niña sonriente»', words: ['En', 'leende', 'flicka'], answer: ['En', 'leende', 'flicka'], explanation: '«En leende flicka».' },
        { type: 'order', prompt: 'Ordena: «La puerta está cerrada»', words: ['Dörren', 'är', 'stängd'], answer: ['Dörren', 'är', 'stängd'], explanation: '«Dörren är stängd».' },
      ]
    },
  ]
};

// ═══════════════════════════════════════════════════════════
//  HÖRFÖRSTÅELSE — Comprensión auditiva (voz de Sophie)
// ═══════════════════════════════════════════════════════════
// audioKey: clave en SOPHIE_AUDIO (base64). null = usa TTS.

const HORST_DATA = {
  "levels": {
    "A": [
      {
        "id": "a-01",
        "title": "Mi mañana",
        "subtitle": "La rutina diaria de Sophie",
        "icon": "🌅",
        "duration": "~25 seg",
        "level": "A",
        "audioKey": "a01",
        "ttsScript": "Varje morgon vaknar jag klockan sju. Jag duschar och äter frukost. Jag äter alltid ett ägg och dricker kaffe. Sen tar jag bussen till jobbet. Bussen går klockan åtta. Resan tar tjugo minuter. På jobbet hälsar jag på mina kollegor. Jag börjar arbeta klockan halv nio.",
        "questions": [
          {
            "text": "¿A qué hora se despierta Sophie?",
            "options": [
              "A las 6",
              "A las 7",
              "A las 8",
              "A las 9"
            ],
            "correct": 1,
            "explanation": "\"Varje morgon vaknar jag klockan sju\" = Cada mañana me despierto a las siete. \"Vaknar\" = despertarse."
          },
          {
            "text": "¿Qué desayuna Sophie siempre?",
            "options": [
              "Pan y café",
              "Un huevo y café",
              "Fruta y té",
              "Yogur y jugo"
            ],
            "correct": 1,
            "explanation": "\"Jag äter alltid ett ägg och dricker kaffe\" = Siempre como un huevo y bebo café. \"Alltid\" = siempre."
          },
          {
            "text": "¿Cómo va Sophie al trabajo?",
            "options": [
              "En coche",
              "Caminando",
              "En bicicleta",
              "En autobús"
            ],
            "correct": 3,
            "explanation": "\"Sen tar jag bussen till jobbet\" = Luego tomo el autobús al trabajo. \"Bussen\" = el autobús."
          },
          {
            "text": "¿Cuánto dura el viaje?",
            "options": [
              "10 minutos",
              "15 minutos",
              "20 minutos",
              "30 minutos"
            ],
            "correct": 2,
            "explanation": "\"Resan tar tjugo minuter\" = El viaje dura veinte minutos. \"Resan\" = el viaje, \"tar\" = dura/toma."
          }
        ]
      },
      {
        "id": "a-02",
        "title": "Mi familj",
        "subtitle": "Sophie habla de su familia",
        "icon": "👨‍👩‍👧‍👦",
        "duration": "~25 seg",
        "level": "A",
        "audioKey": "a02",
        "ttsScript": "Jag heter Sophie och jag har en liten familj. Min man heter Andree och kommer från Peru. Han är trettio år gammal. Min mamma heter Anna. Hon är sjuttio år gammal. Vi alla bor tillsammans i Stockholm.",
        "questions": [
          {
            "text": "¿Cómo se llama el esposo de Sophie?",
            "options": [
              "Erik",
              "Andree",
              "Lars",
              "Johan"
            ],
            "correct": 1,
            "explanation": "\"Min man heter Andree\" = Mi esposo se llama Andree. \"Min man\" = mi esposo/marido."
          },
          {
            "text": "¿De dónde viene el esposo de Sophie?",
            "options": [
              "España",
              "Colombia",
              "Perú",
              "México"
            ],
            "correct": 2,
            "explanation": "\"Andree kommer från Peru\" = Andree viene de Perú. \"Kommer från\" = viene de / es de."
          },
          {
            "text": "¿Cómo se llama la mamá de Sophie?",
            "options": [
              "Maria",
              "Anna",
              "Lena",
              "Sofia"
            ],
            "correct": 1,
            "explanation": "\"Min mamma heter Anna\" = Mi mamá se llama Anna. \"Mamma\" = mamá."
          },
          {
            "text": "¿Cuántos años tiene la mamá de Sophie?",
            "options": [
              "50 años",
              "60 años",
              "70 años",
              "80 años"
            ],
            "correct": 2,
            "explanation": "\"Hon är sjuttio år gammal\" = Ella tiene setenta años. \"Sjuttio\" = 70."
          }
        ]
      },
      {
        "id": "a-03",
        "title": "I affären",
        "subtitle": "Sophie hace las compras",
        "icon": "🛒",
        "duration": "~25 seg",
        "level": "A",
        "audioKey": "a03",
        "ttsScript": "Idag handlar jag mat i affären. Jag behöver mjölk, bröd och ägg. Jag tar också lite frukt, äpplen och bananer. Vid kassan frågar kassörskan mig om jag vill betala med kort eller kontant. Jag betalar med kort. Allting kostar 150 kronor. Sedan tar jag mina kassar och går hem.",
        "questions": [
          {
            "text": "¿Qué NO compra Sophie?",
            "options": [
              "Leche",
              "Pan",
              "Jugo",
              "Huevos"
            ],
            "correct": 2,
            "explanation": "Sophie compra \"mjölk\" (leche), \"bröd\" (pan) y \"ägg\" (huevos). El jugo no lo menciona."
          },
          {
            "text": "¿Qué frutas compra?",
            "options": [
              "Manzanas y naranjas",
              "Manzanas y plátanos",
              "Peras y uvas",
              "Fresas y manzanas"
            ],
            "correct": 1,
            "explanation": "\"Äpplen och bananer\" = manzanas y plátanos/bananas. \"Äpple\" = manzana, \"banan\" = plátano."
          },
          {
            "text": "¿Cómo paga Sophie?",
            "options": [
              "En efectivo",
              "Con tarjeta",
              "Con Swish",
              "No lo dice"
            ],
            "correct": 1,
            "explanation": "\"Jag betalar med kort\" = Pago con tarjeta. \"Kontant\" = efectivo, \"kort\" = tarjeta."
          },
          {
            "text": "¿Cuánto paga?",
            "options": [
              "115 kr",
              "130 kr",
              "150 kr",
              "175 kr"
            ],
            "correct": 2,
            "explanation": "\"Etthundra och femtio kronor\" = ciento cincuenta coronas. \"Etthundra\" = cien, \"femtio\" = cincuenta."
          }
        ]
      },
      {
        "id": "a-04",
        "title": "Vädret idag",
        "subtitle": "Sophie habla del clima",
        "icon": "⛅",
        "duration": "~20 seg",
        "level": "A",
        "audioKey": "a04",
        "ttsScript": "Idag är vädret inte så bra. Det är molnigt och kallt. Temperaturen är bara fyra grader. Det regnar lite också. Jag tar med mig ett paraply när jag går ut. På sommaren är det varmt och solen skiner. Men nu är det höst och det blåser mycket.",
        "questions": [
          {
            "text": "¿Qué temperatura hace hoy?",
            "options": [
              "2 grados",
              "4 grados",
              "6 grados",
              "10 grados"
            ],
            "correct": 1,
            "explanation": "\"Temperaturen är bara fyra grader\" = La temperatura es solo cuatro grados. \"Grader\" = grados."
          },
          {
            "text": "¿Qué lleva Sophie cuando sale?",
            "options": [
              "Abrigo",
              "Gorra",
              "Paraguas",
              "Bufanda"
            ],
            "correct": 2,
            "explanation": "\"Jag tar med mig ett paraply\" = Me llevo un paraguas. \"Paraply\" = paraguas."
          },
          {
            "text": "¿Cómo es el verano según Sophie?",
            "options": [
              "Frío y lluvioso",
              "Caliente y soleado",
              "Nublado y ventoso",
              "Variable"
            ],
            "correct": 1,
            "explanation": "\"På sommaren är det varmt och solen skiner\" = En verano hace calor y el sol brilla. \"Varmt\" = caliente."
          },
          {
            "text": "¿Qué estación es ahora?",
            "options": [
              "Primavera",
              "Verano",
              "Otoño",
              "Invierno"
            ],
            "correct": 2,
            "explanation": "\"Nu är det höst\" = Ahora es otoño. \"Höst\" = otoño. Las estaciones: vår, sommar, höst, vinter."
          }
        ]
      },
      {
        "id": "a-05",
        "title": "Min lägenhet",
        "subtitle": "Sophie describe su apartamento",
        "icon": "🏠",
        "duration": "~25 seg",
        "level": "A",
        "audioKey": "a05",
        "ttsScript": "Jag bor i en trea på Södermalm. Lägenheten har ett kök, ett vardagsrum och två sovrum. Köket är litet men praktiskt. I vardagsrummet har vi en stor soffa och en liten tv. Det finns också en balkong där vi sitter tillsammans på sommaren och grillar. Min hyra är åtta tusen kronor per månad.",
        "questions": [
          {
            "text": "¿En qué barrio vive Sophie?",
            "options": [
              "Östermalm",
              "Södermalm",
              "Kungsholmen",
              "Vasastan"
            ],
            "correct": 1,
            "explanation": "\"Jag bor i en trea i Södermalm\" = Vivo en un tres habitaciones en Södermalm, barrio de Estocolmo."
          },
          {
            "text": "¿Cuántos dormitorios tiene el apartamento?",
            "options": [
              "1",
              "2",
              "3",
              "4"
            ],
            "correct": 1,
            "explanation": "\"Lägenheten har... två sovrum\" = El apartamento tiene dos dormitorios. \"Sovrum\" = dormitorio."
          },
          {
            "text": "¿Qué hacen en el balcón en verano?",
            "options": [
              "Toman café",
              "Leen libros",
              "Se sientan juntos y hacen barbacoa",
              "Hacen yoga"
            ],
            "correct": 2,
            "explanation": "\"Vi sitter tillsammans på sommaren och grillar\" = Nos sentamos juntos en verano y hacemos barbacoa. \"Grilla\" = hacer barbacoa/asado."
          },
          {
            "text": "¿Cuánto es el alquiler?",
            "options": [
              "6000 kr",
              "7000 kr",
              "8000 kr",
              "9000 kr"
            ],
            "correct": 2,
            "explanation": "\"Hyran är åttatusen kronor i månaden\" = El alquiler es ocho mil coronas al mes. \"Hyran\" = el alquiler."
          }
        ]
      },
      {
        "id": "a-06",
        "title": "Mat jag gillar",
        "subtitle": "La comida favorita de Sophie",
        "icon": "🍝",
        "duration": "~25 seg",
        "level": "A",
        "audioKey": "a06",
        "ttsScript": "Jag gillar mat mycket. Min favoriträtt är pasta med tomatsås. Jag lagar mat hemma nästan varje dag. På fredagar äter vi ofta pizza. Det är fredagsmys i Sverige! Jag gillar också svensk mat — köttbullar med potatismos är gott. Men det bästa av allt är kanelbullar med kaffe.",
        "questions": [
          {
            "text": "¿Cuál es el plato favorito de Sophie?",
            "options": [
              "Pizza",
              "Pasta con salsa de tomate",
              "Albóndigas suecas",
              "Kanelbullar"
            ],
            "correct": 1,
            "explanation": "\"Min favoriträtt är pasta med tomatsås\" = Mi plato favorito es la pasta con salsa de tomate."
          },
          {
            "text": "¿Qué comen los viernes?",
            "options": [
              "Pasta",
              "Sopa",
              "Pizza",
              "Köttbullar"
            ],
            "correct": 2,
            "explanation": "\"På fredagar äter vi ofta pizza\" = Los viernes comemos pizza a menudo. \"Fredagar\" = viernes."
          },
          {
            "text": "¿Qué es \"fredagsmys\"?",
            "options": [
              "Una canción",
              "Una tradición sueca del viernes",
              "Un tipo de comida",
              "Un programa de TV"
            ],
            "correct": 1,
            "explanation": "\"Fredagsmys\" = tradición sueca de relajarse el viernes con comida y familia. \"Fredags\" = viernes, \"mys\" = acogedor."
          },
          {
            "text": "¿Qué dice Sophie que es lo mejor de todo?",
            "options": [
              "Pasta",
              "Pizza",
              "Köttbullar",
              "Kanelbullar con café"
            ],
            "correct": 3,
            "explanation": "\"Det bästa av allt är kanelbullar med kaffe\" = Lo mejor de todo son los bollos de canela con café."
          }
        ]
      }
    ],
    "B": [
      {
        "id": "b-01",
        "title": "Primera semana en Suecia",
        "subtitle": "Sophie recuerda su llegada",
        "icon": "✈️",
        "duration": "~35 seg",
        "level": "B",
        "audioKey": "b01",
        "ttsScript": "Jag minns min första vecka i Sverige mycket väl. Allting var nytt och lite förvirrande. Jag förstod inte så mycket svenska, men folk var snälla och hjälpte mig. Det första jag gjorde var att registrera mig hos Skatteverket för att få ett personnummer. Det tog några dagar. Sen gick jag till Arbetsförmedlingen. Jag var nervös men allt gick bra. Steg för steg lärde jag mig hur Sverige fungerar.",
        "questions": [
          {
            "text": "¿Cómo describe Sophie su primera semana?",
            "options": [
              "Aburrida y sola",
              "Nueva y un poco confusa",
              "Emocionante y divertida",
              "Difícil y triste"
            ],
            "correct": 1,
            "explanation": "\"Allting var nytt och lite förvirrande\" = Todo era nuevo y un poco confuso. \"Förvirrande\" = confuso."
          },
          {
            "text": "¿Qué fue lo primero que hizo Sophie?",
            "options": [
              "Ir al banco",
              "Registrarse en Skatteverket",
              "Buscar trabajo",
              "Abrir cuenta bancaria"
            ],
            "correct": 1,
            "explanation": "\"Det första jag gjorde var att registrera mig hos Skatteverket\" = Lo primero fue registrarme en Skatteverket para el personnummer."
          },
          {
            "text": "¿Cómo era la gente según Sophie?",
            "options": [
              "Fría y distante",
              "Ocupada e indiferente",
              "Amable y que la ayudaba",
              "Curiosa y preguntona"
            ],
            "correct": 2,
            "explanation": "\"Folk var snälla och hjälpte mig\" = La gente era amable y me ayudaba. \"Snälla\" = amable/buena."
          },
          {
            "text": "¿Cómo aprendió Sophie cómo funciona Suecia?",
            "options": [
              "Leyendo libros",
              "En la escuela",
              "Paso a paso",
              "Viendo TV"
            ],
            "correct": 2,
            "explanation": "\"Steg för steg lärde jag mig hur Sverige fungerar\" = Paso a paso aprendí cómo funciona Suecia. \"Steg för steg\" = paso a paso."
          }
        ]
      },
      {
        "id": "b-02",
        "title": "En dag på jobbet",
        "subtitle": "Un día de trabajo de Sophie",
        "icon": "💼",
        "duration": "~35 seg",
        "level": "B",
        "audioKey": "b02",
        "ttsScript": "Jag jobbar på ett lager utanför Stockholm. Jag börjar klockan sex på morgonen, så jag måste stiga upp tidigt. Arbetsdagen slutar klockan tre. På fikarasten, som är klockan nio, dricker vi kaffe och pratar lite. Mina kollegor kommer från många olika länder — det är roligt. Lönen betalas ut den tjugofemte varje månad och jag får också semesterdagar. Jag trivs bra på jobbet.",
        "questions": [
          {
            "text": "¿Dónde trabaja Sophie?",
            "options": [
              "En una tienda",
              "En un almacén/bodega",
              "En una oficina",
              "En un hospital"
            ],
            "correct": 1,
            "explanation": "\"Jag jobbar på ett lager\" = Trabajo en un almacén/bodega. \"Lager\" = almacén, bodega."
          },
          {
            "text": "¿A qué hora empieza Sophie?",
            "options": [
              "A las 5",
              "A las 6",
              "A las 7",
              "A las 8"
            ],
            "correct": 1,
            "explanation": "\"Jag börjar klockan sex på morgonen\" = Empiezo a las seis de la mañana. \"Sex\" = seis."
          },
          {
            "text": "¿Qué pasa durante la fika?",
            "options": [
              "Trabajan más rápido",
              "Toman café y conversan",
              "Tienen una reunión",
              "Almuerzan"
            ],
            "correct": 1,
            "explanation": "\"Dricker vi kaffe och pratar lite\" = Tomamos café y conversamos un poco. La fika es una tradición sueca esencial."
          },
          {
            "text": "¿Cuándo se paga el salario?",
            "options": [
              "El día 15",
              "El día 20",
              "El día 25",
              "El último día del mes"
            ],
            "correct": 2,
            "explanation": "\"Lönen betalas ut den tjugofemte\" = El salario se paga el día veinticinco. \"Lönen\" = el salario."
          }
        ]
      },
      {
        "id": "b-03",
        "title": "Cómo aprendí sueco",
        "subtitle": "El camino de Sophie con el idioma",
        "icon": "📖",
        "duration": "~35 seg",
        "level": "B",
        "audioKey": "b03",
        "ttsScript": "Jag har studerat svenska i ett och ett halvt år. I början var det svårt — grammatiken är annorlunda än spanska. Jag gick på SFI fem dagar i veckan. Hemma försökte jag titta på svenska tv-program med undertexter. Det hjälpte mycket. Jag övade också med mina grannar och på jobbet. Det viktigaste är att inte vara rädd för att göra fel. Alla förstår att man lär sig och är tålmodiga.",
        "questions": [
          {
            "text": "¿Cuánto tiempo lleva Sophie estudiando sueco?",
            "options": [
              "6 meses",
              "1 año",
              "1 año y medio",
              "2 años"
            ],
            "correct": 2,
            "explanation": "\"Jag har studerat svenska i ett och ett halvt år\" = He estudiado sueco por un año y medio."
          },
          {
            "text": "¿Cuántos días por semana iba a SFI?",
            "options": [
              "2 días",
              "3 días",
              "4 días",
              "5 días"
            ],
            "correct": 3,
            "explanation": "\"Jag gick på SFI fem dagar i veckan\" = Iba a SFI cinco días a la semana. \"Fem\" = cinco."
          },
          {
            "text": "¿Qué hacía Sophie en casa para practicar?",
            "options": [
              "Escuchaba música",
              "Veía programas de TV con subtítulos",
              "Leía libros en sueco",
              "Hablaba con una app"
            ],
            "correct": 1,
            "explanation": "\"Titta på svenska tv-program med undertexter\" = Ver programas de TV suecos con subtítulos."
          },
          {
            "text": "¿Cuál es el consejo más importante de Sophie?",
            "options": [
              "Estudiar cada día",
              "No tener miedo de cometer errores",
              "Hablar solo con suecos",
              "Memorizar gramática"
            ],
            "correct": 1,
            "explanation": "\"Det viktigaste är att inte vara rädd för att göra fel\" = Lo más importante es no tener miedo de equivocarse."
          }
        ]
      },
      {
        "id": "b-04",
        "title": "Buscar piso en Suecia",
        "subtitle": "La experiencia de Sophie buscando apartamento",
        "icon": "🔑",
        "duration": "~35 seg",
        "level": "B",
        "audioKey": "b04",
        "ttsScript": "Att hitta en lägenhet i Sverige kan vara svårt, speciellt i Stockholm. Bostadskön kan ta många år. Men det finns andra alternativ — man kan hyra i andra hand eller leta via privata hyresvärdar. Jag hittade min lägenhet på en hemsida som heter Blocket. Jag kontaktade hyresvärden och fick titta på lägenheten. Vi skrev ett hyreskontrakt och jag fick flytta in den första i månaden.",
        "questions": [
          {
            "text": "¿Por qué es difícil encontrar apartamento en Estocolmo?",
            "options": [
              "Porque son muy caros",
              "Porque la cola de vivienda puede tomar años",
              "Porque hay pocos edificios",
              "Porque piden muchos documentos"
            ],
            "correct": 1,
            "explanation": "\"Bostadskön kan ta många år\" = La cola de vivienda puede tomar muchos años. \"Bostadskön\" = lista de espera para vivienda."
          },
          {
            "text": "¿Dónde encontró Sophie su apartamento?",
            "options": [
              "En Hemnet",
              "En Blocket",
              "A través de un amigo",
              "En el trabajo"
            ],
            "correct": 1,
            "explanation": "\"Jag hittade min lägenhet på en hemsida som heter Blocket\" = Encontré mi apartamento en una web llamada Blocket."
          },
          {
            "text": "¿Qué alternativa menciona Sophie aparte de la cola oficial?",
            "options": [
              "Comprar un apartamento",
              "Alquilar de segunda mano o a propietarios privados",
              "Compartir piso",
              "Vivir en una residencia"
            ],
            "correct": 1,
            "explanation": "\"Hyra i andra hand eller leta via privata hyresvärdar\" = alquilar de segunda mano o a través de arrendadores privados."
          },
          {
            "text": "¿Cuándo pudo mudarse Sophie?",
            "options": [
              "El día 15 del mes",
              "El primero del mes",
              "Inmediatamente",
              "Después de 3 meses"
            ],
            "correct": 1,
            "explanation": "\"Jag fick flytta in den första i månaden\" = Me pude mudar el primero del mes. \"Flytta in\" = mudarse, entrar a vivir."
          }
        ]
      },
      {
        "id": "b-05",
        "title": "Sjukvård i Sverige",
        "subtitle": "Sophie explica el sistema de salud",
        "icon": "🏥",
        "duration": "~35 seg",
        "level": "B",
        "audioKey": "b05",
        "ttsScript": "I Sverige har alla rätt till sjukvård. Om man är sjuk ringer man till vårdcentralen och bokar en tid. Man kan också ringa 1177 — det är sjukvårdsrådgivningen — om man behöver råd. Det kostar lite att besöka en läkare, men inte så mycket. Om man har barn är det gratis. Tandvård är lite dyrare. Man betalar aldrig mer än ett visst belopp per år — det kallas högkostnadsskydd.",
        "questions": [
          {
            "text": "¿Qué hace uno cuando está enfermo en Suecia?",
            "options": [
              "Va directamente al hospital",
              "Llama a la vårdcentral y pide cita",
              "Va a urgencias",
              "Llama al médico a casa"
            ],
            "correct": 1,
            "explanation": "\"Ringer man till vårdcentralen och bokar en tid\" = Se llama al centro de salud y se pide cita. \"Bokar\" = reservar."
          },
          {
            "text": "¿Para qué es el número 1177?",
            "options": [
              "Para emergencias",
              "Para asesoramiento médico",
              "Para pedir ambulancia",
              "Para pedir medicamentos"
            ],
            "correct": 1,
            "explanation": "\"1177 — det är sjukvårdsrådgivningen\" = 1177 es la asesoría de salud. Puedes llamar para consejos médicos."
          },
          {
            "text": "¿Cuánto cuesta la atención médica para niños?",
            "options": [
              "Igual que adultos",
              "La mitad del precio",
              "Gratis",
              "No lo menciona"
            ],
            "correct": 2,
            "explanation": "\"Om man har barn är det gratis\" = Si tienes hijos es gratis. La atención pediátrica no tiene costo en Suecia."
          },
          {
            "text": "¿Qué es el \"högkostnadsskydd\"?",
            "options": [
              "Un seguro privado",
              "Un tope máximo de pago anual",
              "Una tarjeta de salud",
              "Un descuento en farmacia"
            ],
            "correct": 1,
            "explanation": "\"Man betalar aldrig mer än ett visst belopp per år\" = Nunca pagas más de cierta cantidad al año. Es el tope de costos."
          }
        ]
      },
      {
        "id": "b-06",
        "title": "Tradiciones suecas",
        "subtitle": "Sophie comparte sus tradiciones favoritas",
        "icon": "🎄",
        "duration": "~30 seg",
        "level": "B",
        "audioKey": "b06",
        "ttsScript": "Sverige har många fina traditioner. Midsommar är en av de viktigaste — man dansar runt en majstång och äter sill och jordgubbar. På lucia, den trettonde december, sjunger barn och vuxna lucialåtar med ljus i handen. Jul är också stort — man firar julafton den tjugofjärde december med julmat och julklappar. Och så är det fika förstås — det är en daglig tradition med kaffe och något gott.",
        "questions": [
          {
            "text": "¿Qué se hace en Midsommar?",
            "options": [
              "Se encienden fuegos artificiales",
              "Se baila alrededor del majstång y se come arenque y fresas",
              "Se intercambian regalos",
              "Se va a la iglesia"
            ],
            "correct": 1,
            "explanation": "\"Man dansar runt en majstång och äter sill och jordgubbar\" = Se baila alrededor del palo y se come arenque y fresas."
          },
          {
            "text": "¿Cuándo es la celebración de Lucia?",
            "options": [
              "El 6 de diciembre",
              "13 de diciembre",
              "24 de diciembre",
              "1 de enero"
            ],
            "correct": 1,
            "explanation": "\"Lucia, den trettonde december\" = Lucia, el trece de diciembre. \"Trettonde\" = decimotercero."
          },
          {
            "text": "¿Cuándo se celebra Nochebuena en Suecia?",
            "options": [
              "El 24 de diciembre",
              "El 25 de diciembre",
              "El 31 de diciembre",
              "El 6 de enero"
            ],
            "correct": 0,
            "explanation": "\"Man firar julafton den tjugofjärde december\" = Se celebra Nochebuena el veinticuatro de diciembre. Como en España."
          },
          {
            "text": "¿Qué dice Sophie sobre el fika?",
            "options": [
              "Es solo para el trabajo",
              "Es una tradición diaria con café y algo rico",
              "Es solo los domingos",
              "Es una comida especial"
            ],
            "correct": 1,
            "explanation": "\"Fika är en daglig tradition med kaffe och något gott\" = El fika es una tradición diaria con café y algo rico."
          }
        ]
      }
    ],
    "C": [
      {
        "id": "c-01",
        "title": "Ett missförstånd på jobbet",
        "subtitle": "Sophie malentiende un correo",
        "icon": "📧",
        "duration": "~1:30",
        "level": "C",
        "audioKey": "c01",
        "ttsScript": "Idag vill jag berätta om en situation som hände mig på jobbet för några månader sedan. Det började som en helt vanlig morgon. Jag kom lite tidigare än vanligt eftersom jag ville hinna förbereda mina lektioner. När jag öppnade min mejl såg jag ett meddelande från min chef. Jag läste det ganska snabbt eftersom jag hade mycket att göra. Jag fick uppfattningen att ett viktigt möte hade flyttats från fredag till torsdag klockan nio. Därför flyttade jag en lektion och ändrade hela min planering. När jag kom till mötesrummet var det nästan tomt. Efter några minuter kom min chef och frågade varför jag redan satt där. Då läste vi mejlet tillsammans och upptäckte att jag hade missförstått. Mötet hade egentligen flyttats från torsdag till fredag, inte tvärtom. Jag kände mig generad, men min chef log och sa att sådana misstag kan hända under stress. Sedan dess läser jag alltid viktiga mejl en extra gång.",
        "questions": [
          {
            "text": "¿Por qué llegó Sophie más temprano de lo normal?",
            "options": [
              "Para preparar sus clases",
              "Para hablar con el jefe",
              "Porque perdió el autobús",
              "Para desayunar"
            ],
            "correct": 0,
            "explanation": "\"Jag kom lite tidigare... eftersom jag ville hinna förbereda mina lektioner\" = Llegué antes para preparar mis clases."
          },
          {
            "text": "¿De quién era el correo que leyó?",
            "options": [
              "De su jefe",
              "De un cliente",
              "De un colega",
              "De su familia"
            ],
            "correct": 0,
            "explanation": "\"Ett meddelande från min chef\" = Un mensaje de mi jefe. \"Chef\" = jefe."
          },
          {
            "text": "¿Cómo leyó el correo?",
            "options": [
              "Rápido, porque tenía mucho que hacer",
              "Con mucha calma",
              "En voz alta",
              "Dos veces"
            ],
            "correct": 0,
            "explanation": "\"Jag läste det ganska snabbt eftersom jag hade mycket att göra\" = Lo leí bastante rápido porque tenía mucho que hacer."
          },
          {
            "text": "¿Qué creyó entender Sophie sobre la reunión?",
            "options": [
              "Que se movió del viernes al jueves a las 9",
              "Que se canceló",
              "Que era a las 10",
              "Que era el lunes"
            ],
            "correct": 0,
            "explanation": "\"Ett möte hade flyttats från fredag till torsdag klockan nio\" = era lo que ella creyó entender."
          },
          {
            "text": "¿Qué hizo tras leer el correo?",
            "options": [
              "Movió una clase y cambió su planificación",
              "No hizo nada",
              "Llamó al jefe",
              "Se fue a casa"
            ],
            "correct": 0,
            "explanation": "\"Jag flyttade en lektion och ändrade hela min planering\" = Moví una clase y cambié toda mi planificación."
          },
          {
            "text": "¿Cómo estaba la sala de reuniones cuando llegó?",
            "options": [
              "Casi vacía",
              "Llena de gente",
              "Cerrada",
              "En reforma"
            ],
            "correct": 0,
            "explanation": "\"Mötesrummet var nästan tomt\" = La sala estaba casi vacía. \"Tomt\" = vacío."
          },
          {
            "text": "¿Qué le preguntó el jefe?",
            "options": [
              "Por qué ya estaba sentada ahí",
              "Si quería café",
              "Dónde estaban los demás",
              "Si estaba enferma"
            ],
            "correct": 0,
            "explanation": "\"Min chef... frågade varför jag redan satt där\" = preguntó por qué ya estaba ahí sentada."
          },
          {
            "text": "¿Cuál era la información correcta?",
            "options": [
              "La reunión se movió del jueves al viernes",
              "Del viernes al jueves",
              "Se canceló",
              "Se adelantó una hora"
            ],
            "correct": 0,
            "explanation": "\"Mötet hade flyttats från torsdag till fredag, inte tvärtom\" = del jueves al viernes, no al revés."
          },
          {
            "text": "¿Cómo reaccionó el jefe ante el error?",
            "options": [
              "Sonrió y dijo que pasa con el estrés",
              "Se enojó",
              "No dijo nada",
              "La despidió"
            ],
            "correct": 0,
            "explanation": "\"Min chef log och sa att sådana misstag kan hända under stress\" = sonrió y dijo que esos errores pasan bajo estrés."
          },
          {
            "text": "¿Qué hace Sophie desde entonces?",
            "options": [
              "Lee los correos importantes una vez más",
              "Ya no lee correos",
              "Llega más tarde",
              "Imprime todos los correos"
            ],
            "correct": 0,
            "explanation": "\"Sedan dess läser jag alltid viktiga mejl en extra gång\" = desde entonces leo los correos importantes una vez más."
          }
        ]
      },
      {
        "id": "c-02",
        "title": "Ett samtal med vårdcentralen",
        "subtitle": "Sophie llama al centro de salud",
        "icon": "🏥",
        "duration": "~1:15",
        "level": "C",
        "audioKey": "c02",
        "ttsScript": "För några veckor sedan vaknade jag med ont i halsen och hade dessutom feber. Först tänkte jag att det skulle gå över av sig självt, men efter två dagar mådde jag fortfarande inte bättre. Därför ringde jag vårdcentralen. Det tog lång tid innan jag kom fram eftersom många andra också ringde. När jag äntligen fick prata med en sjuksköterska ställde hon flera frågor om mina symtom. Hon frågade hur länge jag hade varit sjuk, om jag hade hög feber och om jag hade svårt att andas. Efter samtalet rekommenderade hon mig att vila hemma, dricka mycket vatten och ta febernedsättande medicin vid behov. Hon förklarade också att jag skulle kontakta vården igen om symtomen blev värre.",
        "questions": [
          {
            "text": "¿Con qué síntomas despertó Sophie?",
            "options": [
              "Dolor de garganta y fiebre",
              "Dolor de cabeza y tos",
              "Dolor de estómago",
              "Mareos"
            ],
            "correct": 0,
            "explanation": "\"Ont i halsen och... feber\" = dolor de garganta y fiebre. \"Hals\" = garganta."
          },
          {
            "text": "¿Qué pensó al principio?",
            "options": [
              "Que se le pasaría solo",
              "Que era grave",
              "Que debía ir al hospital",
              "Que era alergia"
            ],
            "correct": 0,
            "explanation": "\"Det skulle gå över av sig självt\" = que se pasaría por sí solo."
          },
          {
            "text": "¿Cuánto esperó antes de llamar?",
            "options": [
              "Dos días",
              "Una semana",
              "Unas horas",
              "Un mes"
            ],
            "correct": 0,
            "explanation": "\"Efter två dagar mådde jag fortfarande inte bättre\" = tras dos días seguía sin mejorar."
          },
          {
            "text": "¿A quién llamó Sophie?",
            "options": [
              "Al centro de salud (vårdcentralen)",
              "A la farmacia",
              "A su jefe",
              "A una amiga"
            ],
            "correct": 0,
            "explanation": "\"Jag ringde vårdcentralen\" = Llamé al centro de salud."
          },
          {
            "text": "¿Por qué tardó en comunicarse?",
            "options": [
              "Muchos otros también llamaban",
              "La línea estaba rota",
              "Era de noche",
              "No tenía saldo"
            ],
            "correct": 0,
            "explanation": "\"Många andra också ringde\" = muchos otros también llamaban."
          },
          {
            "text": "¿Con quién habló finalmente?",
            "options": [
              "Con una enfermera",
              "Con un médico",
              "Con una recepcionista",
              "Con un robot"
            ],
            "correct": 0,
            "explanation": "\"Prata med en sjuksköterska\" = hablar con una enfermera. \"Sjuksköterska\" = enfermera."
          },
          {
            "text": "¿Qué le preguntó la enfermera?",
            "options": [
              "Cuánto llevaba enferma y sus síntomas",
              "Su dirección",
              "Su trabajo",
              "Su edad"
            ],
            "correct": 0,
            "explanation": "\"Hur länge jag hade varit sjuk, om jag hade hög feber och svårt att andas\" = cuánto llevaba enferma, si tenía fiebre alta y dificultad para respirar."
          },
          {
            "text": "¿Qué le recomendó hacer?",
            "options": [
              "Descansar, beber agua y tomar antifebril si hace falta",
              "Ir al hospital ya",
              "Hacer ejercicio",
              "Tomar antibióticos"
            ],
            "correct": 0,
            "explanation": "\"Vila hemma, dricka mycket vatten och ta febernedsättande medicin vid behov\" = descansar, beber mucha agua y tomar antifebril si es necesario."
          },
          {
            "text": "¿Cuándo debía volver a contactar a la sanidad?",
            "options": [
              "Si los síntomas empeoraban",
              "Al día siguiente siempre",
              "Nunca más",
              "En un mes"
            ],
            "correct": 0,
            "explanation": "\"Kontakta vården igen om symtomen blev värre\" = contactar de nuevo si los síntomas empeoraban."
          },
          {
            "text": "¿Qué aprendió Sophie de esta experiencia?",
            "options": [
              "Lo importante de describir bien los síntomas",
              "Que la sanidad es cara",
              "Que no hay que llamar",
              "Que es mejor automedicarse"
            ],
            "correct": 0,
            "explanation": "El audio destaca la importancia de describir con claridad los síntomas al buscar atención."
          }
        ]
      },
      {
        "id": "c-03",
        "title": "En resa som inte gick som planerat",
        "subtitle": "Un viaje con imprevistos",
        "icon": "🚆",
        "duration": "~1:00",
        "level": "C",
        "audioKey": "c03",
        "ttsScript": "Förra månaden skulle jag resa till Göteborg för att träffa några vänner som jag inte hade sett på länge. Jag hade planerat resan i flera veckor och kom till stationen nästan trettio minuter innan tåget skulle avgå. Precis innan vi skulle åka hördes ett meddelande i högtalarna. Tåget var försenat på grund av ett signalfel längre fram på spåret. Först trodde jag att det bara skulle handla om några minuter, men förseningen blev nästan en timme. Jag ringde mina vänner och berättade vad som hade hänt. Som tur var hade de förståelse och ändrade våra planer. När jag väl kom fram kunde vi fortfarande äta middag tillsammans. Efter den resan planerar jag alltid med lite extra tid.",
        "questions": [
          {
            "text": "¿A qué ciudad iba a viajar Sophie?",
            "options": [
              "A Gotemburgo",
              "A Malmö",
              "A Estocolmo",
              "A Uppsala"
            ],
            "correct": 0,
            "explanation": "\"Resa till Göteborg\" = viajar a Gotemburgo."
          },
          {
            "text": "¿Para qué iba?",
            "options": [
              "Para ver a unos amigos",
              "Por trabajo",
              "A un examen",
              "De compras"
            ],
            "correct": 0,
            "explanation": "\"Träffa några vänner som jag inte hade sett på länge\" = ver a unos amigos que no veía hacía tiempo."
          },
          {
            "text": "¿Con cuánta antelación llegó a la estación?",
            "options": [
              "Casi 30 minutos antes",
              "5 minutos antes",
              "Una hora antes",
              "Justo a tiempo"
            ],
            "correct": 0,
            "explanation": "\"Nästan trettio minuter innan tåget skulle avgå\" = casi 30 minutos antes de la salida."
          },
          {
            "text": "¿Qué se escuchó por los altavoces?",
            "options": [
              "Que el tren estaba retrasado",
              "Que el tren se canceló",
              "Que había cambio de andén",
              "Una oferta"
            ],
            "correct": 0,
            "explanation": "\"Tåget var försenat\" = el tren estaba retrasado."
          },
          {
            "text": "¿Cuál fue la causa del retraso?",
            "options": [
              "Un fallo de señalización en la vía",
              "Nieve",
              "Una avería del motor",
              "Falta de personal"
            ],
            "correct": 0,
            "explanation": "\"På grund av ett signalfel längre fram på spåret\" = por un fallo de señalización más adelante en la vía."
          },
          {
            "text": "¿Cuánto duró finalmente el retraso?",
            "options": [
              "Casi una hora",
              "Unos minutos",
              "Dos horas",
              "Todo el día"
            ],
            "correct": 0,
            "explanation": "\"Förseningen blev nästan en timme\" = el retraso fue de casi una hora."
          },
          {
            "text": "¿Qué hizo Sophie al enterarse?",
            "options": [
              "Llamó a sus amigos para avisar",
              "Se bajó del tren",
              "Pidió un reembolso",
              "Se enojó con el personal"
            ],
            "correct": 0,
            "explanation": "\"Jag ringde mina vänner och berättade vad som hade hänt\" = llamé a mis amigos y les conté lo que pasó."
          },
          {
            "text": "¿Cómo reaccionaron sus amigos?",
            "options": [
              "Con comprensión y cambiaron los planes",
              "Se enojaron",
              "Cancelaron todo",
              "No contestaron"
            ],
            "correct": 0,
            "explanation": "\"De hade förståelse och ändrade våra planer\" = tuvieron comprensión y cambiaron los planes."
          },
          {
            "text": "¿Qué pudieron hacer al final?",
            "options": [
              "Cenar juntos",
              "Nada, ya era tarde",
              "Ir al cine",
              "Solo llamarse"
            ],
            "correct": 0,
            "explanation": "\"Kunde vi fortfarande äta middag tillsammans\" = todavía pudieron cenar juntos."
          },
          {
            "text": "¿Qué aprendió Sophie?",
            "options": [
              "A planear siempre con tiempo extra",
              "A no viajar en tren",
              "A llegar tarde",
              "A no avisar a nadie"
            ],
            "correct": 0,
            "explanation": "\"Planerar jag alltid med lite extra tid\" = siempre planeo con algo de tiempo extra."
          }
        ]
      },
      {
        "id": "c-04",
        "title": "Ett köp på internet",
        "subtitle": "Una compra por internet",
        "icon": "📦",
        "duration": "~1:00",
        "level": "C",
        "audioKey": "c04",
        "ttsScript": "Nyligen beställde jag en jacka från en webbutik eftersom min gamla hade blivit för liten. Innan jag gjorde beställningen läste jag informationen noggrant och jämförde storlekarna. Jag var därför ganska säker på att jag hade valt rätt. När paketet kom några dagar senare märkte jag direkt att något inte stämde. Jackan var betydligt mindre än jag hade förväntat mig, trots att etiketten visade rätt storlek. Jag kontaktade kundtjänst och förklarade situationen. Personen jag pratade med bad om ursäkt och skickade en retursedel samma dag. En vecka senare fick jag en ny jacka som passade perfekt. Den här händelsen lärde mig att det ibland är svårt att handla kläder på internet.",
        "questions": [
          {
            "text": "¿Qué compró Sophie por internet?",
            "options": [
              "Una chaqueta",
              "Unos zapatos",
              "Un teléfono",
              "Un libro"
            ],
            "correct": 0,
            "explanation": "\"Jag beställde en jacka\" = pedí una chaqueta. \"Jacka\" = chaqueta."
          },
          {
            "text": "¿Por qué la compró?",
            "options": [
              "Su chaqueta vieja le quedaba pequeña",
              "Estaba de oferta",
              "La suya se rompió",
              "Se la pidió un amigo"
            ],
            "correct": 0,
            "explanation": "\"Min gamla hade blivit för liten\" = la vieja se le había quedado pequeña."
          },
          {
            "text": "¿Qué hizo antes de comprar?",
            "options": [
              "Leyó la información y comparó tallas",
              "Nada, compró rápido",
              "Preguntó a una amiga",
              "Fue a la tienda física"
            ],
            "correct": 0,
            "explanation": "\"Läste jag informationen noggrant och jämförde storlekarna\" = leí la información con cuidado y comparé las tallas."
          },
          {
            "text": "¿Qué notó al recibir el paquete?",
            "options": [
              "Que algo no cuadraba",
              "Que era el color equivocado",
              "Que faltaban piezas",
              "Que estaba roto"
            ],
            "correct": 0,
            "explanation": "\"Något inte stämde\" = algo no estaba bien."
          },
          {
            "text": "¿Cuál era el problema con la chaqueta?",
            "options": [
              "Era mucho más pequeña de lo esperado",
              "Era de otro color",
              "Estaba sucia",
              "Era muy grande"
            ],
            "correct": 0,
            "explanation": "\"Jackan var betydligt mindre än jag hade förväntat mig\" = era bastante más pequeña de lo esperado."
          },
          {
            "text": "¿Qué mostraba la etiqueta?",
            "options": [
              "La talla correcta",
              "Una talla equivocada",
              "Nada",
              "Otro producto"
            ],
            "correct": 0,
            "explanation": "\"Trots att etiketten visade rätt storlek\" = aunque la etiqueta mostraba la talla correcta."
          },
          {
            "text": "¿Qué hizo Sophie?",
            "options": [
              "Contactó al servicio de atención al cliente",
              "Tiró la chaqueta",
              "Se quedó con ella",
              "La regaló"
            ],
            "correct": 0,
            "explanation": "\"Jag kontaktade kundtjänst\" = contacté con atención al cliente."
          },
          {
            "text": "¿Cómo respondió el servicio al cliente?",
            "options": [
              "Se disculpó y envió una etiqueta de devolución",
              "No respondió",
              "Le negó el cambio",
              "Le pidió pagar más"
            ],
            "correct": 0,
            "explanation": "\"Bad om ursäkt och skickade en retursedel samma dag\" = se disculpó y envió una etiqueta de devolución el mismo día."
          },
          {
            "text": "¿Qué pasó una semana después?",
            "options": [
              "Recibió una chaqueta nueva que le quedaba perfecta",
              "No recibió nada",
              "Le devolvieron el dinero",
              "Recibió la misma chaqueta"
            ],
            "correct": 0,
            "explanation": "\"Fick jag en ny jacka som passade perfekt\" = recibí una nueva que quedaba perfecta."
          },
          {
            "text": "¿Qué aprendió de esta experiencia?",
            "options": [
              "Que a veces es difícil comprar ropa por internet",
              "Que nunca hay que comprar online",
              "Que la ropa siempre falla",
              "Que hay que comprar dos tallas"
            ],
            "correct": 0,
            "explanation": "\"Det ibland är svårt att handla kläder på internet\" = a veces es difícil comprar ropa por internet."
          }
        ]
      },
      {
        "id": "c-05",
        "title": "Min granne behövde hjälp",
        "subtitle": "Ayudando a una vecina",
        "icon": "🛍️",
        "duration": "~1:05",
        "level": "C",
        "audioKey": "c05",
        "ttsScript": "En kväll när jag kom hem från jobbet mötte jag min äldre granne i trapphuset. Hon hade flera tunga matkassar och såg trött ut. Jag frågade om hon ville ha hjälp att bära upp dem, och hon tackade ja direkt. Medan vi gick uppför trapporna började vi prata. Hon berättade att hon nyligen hade opererat sitt knä och därför hade svårt att bära tunga saker. Hon sa också att hon brukade få hjälp av sin son, men att han var bortrest just den veckan. När vi kom fram till hennes lägenhet tackade hon mig flera gånger. Hon sa att små saker som att få hjälp med matkassarna kunde göra stor skillnad i vardagen.",
        "questions": [
          {
            "text": "¿A quién encontró Sophie en la escalera?",
            "options": [
              "A su vecina mayor",
              "A su jefe",
              "A un cartero",
              "A una amiga"
            ],
            "correct": 0,
            "explanation": "\"Min äldre granne i trapphuset\" = mi vecina mayor en la escalera. \"Granne\" = vecino/a."
          },
          {
            "text": "¿Qué llevaba la vecina?",
            "options": [
              "Varias bolsas pesadas de comida",
              "Una maleta",
              "Un perro",
              "Nada"
            ],
            "correct": 0,
            "explanation": "\"Flera tunga matkassar\" = varias bolsas pesadas de comida."
          },
          {
            "text": "¿Cómo se veía la vecina?",
            "options": [
              "Cansada",
              "Contenta",
              "Enojada",
              "Con prisa"
            ],
            "correct": 0,
            "explanation": "\"Såg trött ut\" = se veía cansada. \"Trött\" = cansado/a."
          },
          {
            "text": "¿Qué le ofreció Sophie?",
            "options": [
              "Ayudarla a subir las bolsas",
              "Comprarle comida",
              "Llamar a su hijo",
              "Acompañarla al médico"
            ],
            "correct": 0,
            "explanation": "\"Om hon ville ha hjälp att bära upp dem\" = si quería ayuda para subirlas."
          },
          {
            "text": "¿Aceptó la ayuda la vecina?",
            "options": [
              "Sí, de inmediato",
              "No",
              "Solo un poco",
              "Lo pensó mucho"
            ],
            "correct": 0,
            "explanation": "\"Hon tackade ja direkt\" = aceptó enseguida."
          },
          {
            "text": "¿Qué le había pasado a la vecina?",
            "options": [
              "La habían operado de la rodilla",
              "Se había caído",
              "Estaba resfriada",
              "Se mudaba"
            ],
            "correct": 0,
            "explanation": "\"Hon nyligen hade opererat sitt knä\" = la habían operado de la rodilla hacía poco. \"Knä\" = rodilla."
          },
          {
            "text": "¿Quién solía ayudarla normalmente?",
            "options": [
              "Su hijo",
              "Su hermana",
              "Una amiga",
              "Nadie"
            ],
            "correct": 0,
            "explanation": "\"Hon brukade få hjälp av sin son\" = solía recibir ayuda de su hijo."
          },
          {
            "text": "¿Por qué no la ayudó esa persona esta vez?",
            "options": [
              "Estaba de viaje esa semana",
              "Estaba enfermo",
              "Se habían peleado",
              "No tenía tiempo"
            ],
            "correct": 0,
            "explanation": "\"Han var bortrest just den veckan\" = él estaba de viaje justo esa semana."
          },
          {
            "text": "¿Cómo reaccionó la vecina al llegar a su piso?",
            "options": [
              "Le dio las gracias varias veces",
              "No dijo nada",
              "Le pagó",
              "Se despidió rápido"
            ],
            "correct": 0,
            "explanation": "\"Tackade hon mig flera gånger\" = me dio las gracias varias veces."
          },
          {
            "text": "¿Qué reflexión sacó Sophie?",
            "options": [
              "Las cosas pequeñas pueden marcar una gran diferencia",
              "Ayudar es una pérdida de tiempo",
              "Los vecinos molestan",
              "Es mejor no hablar con nadie"
            ],
            "correct": 0,
            "explanation": "\"Små saker... kunde göra stor skillnad i vardagen\" = pequeñas cosas pueden marcar una gran diferencia en el día a día."
          }
        ]
      },
      {
        "id": "c-06",
        "title": "Ett svårt beslut",
        "subtitle": "Una decisión difícil sobre el trabajo",
        "icon": "⚖️",
        "duration": "~1:00",
        "level": "C",
        "audioKey": "c06",
        "ttsScript": "För några månader sedan fick jag ett erbjudande om ett nytt jobb. Lönen var högre än på mitt nuvarande arbete, men samtidigt låg arbetsplatsen nästan en timmes resa hemifrån. Jag funderade länge på vad som var viktigast för mig. Å ena sidan skulle jag tjäna mer pengar och få nya erfarenheter. Å andra sidan skulle jag behöva pendla flera timmar varje vecka och få mindre tid över till familj och vänner. Jag pratade med min familj och skrev till och med ner fördelar och nackdelar på ett papper. Efter flera dagars funderande bestämde jag mig för att tacka nej till erbjudandet. Idag känner jag att jag tog rätt beslut. Ibland är högre lön inte det viktigaste.",
        "questions": [
          {
            "text": "¿Qué recibió Sophie hace unos meses?",
            "options": [
              "Una oferta de un nuevo trabajo",
              "Un premio",
              "Una herencia",
              "Una multa"
            ],
            "correct": 0,
            "explanation": "\"Ett erbjudande om ett nytt jobb\" = una oferta de un nuevo trabajo."
          },
          {
            "text": "¿Cómo era el salario del nuevo trabajo?",
            "options": [
              "Más alto que el actual",
              "Más bajo",
              "Igual",
              "No se dice"
            ],
            "correct": 0,
            "explanation": "\"Lönen var högre än på mitt nuvarande arbete\" = el salario era más alto que el del trabajo actual."
          },
          {
            "text": "¿Cuál era la desventaja del nuevo trabajo?",
            "options": [
              "Quedaba a casi una hora de viaje",
              "Era aburrido",
              "El jefe era malo",
              "No tenía vacaciones"
            ],
            "correct": 0,
            "explanation": "\"Nästan en timmes resa hemifrån\" = a casi una hora de viaje desde casa."
          },
          {
            "text": "¿Qué ventajas veía en aceptarlo?",
            "options": [
              "Ganar más dinero y nuevas experiencias",
              "Trabajar menos horas",
              "Estar más cerca de casa",
              "Menos responsabilidad"
            ],
            "correct": 0,
            "explanation": "\"Tjäna mer pengar och få nya erfarenheter\" = ganar más dinero y obtener nuevas experiencias."
          },
          {
            "text": "¿Qué desventaja personal implicaba?",
            "options": [
              "Menos tiempo para familia y amigos",
              "Menos sueldo",
              "Cambiar de ciudad",
              "Aprender otro idioma"
            ],
            "correct": 0,
            "explanation": "\"Mindre tid över till familj och vänner\" = menos tiempo para la familia y los amigos."
          },
          {
            "text": "¿Con quién habló para decidir?",
            "options": [
              "Con su familia",
              "Con su jefe actual",
              "Con un abogado",
              "Con nadie"
            ],
            "correct": 0,
            "explanation": "\"Jag pratade med min familj\" = hablé con mi familia."
          },
          {
            "text": "¿Qué escribió en un papel?",
            "options": [
              "Ventajas y desventajas",
              "Una carta",
              "Su presupuesto",
              "Una lista de compras"
            ],
            "correct": 0,
            "explanation": "\"Skrev... ner fördelar och nackdelar på ett papper\" = anoté ventajas y desventajas en un papel."
          },
          {
            "text": "¿Qué decidió finalmente?",
            "options": [
              "Rechazar la oferta",
              "Aceptar la oferta",
              "Pedir más tiempo",
              "Mudarse"
            ],
            "correct": 0,
            "explanation": "\"Bestämde jag mig för att tacka nej till erbjudandet\" = decidí rechazar la oferta. \"Tacka nej\" = rechazar."
          },
          {
            "text": "¿Cómo se siente hoy con su decisión?",
            "options": [
              "Que tomó la decisión correcta",
              "Arrepentida",
              "Confundida",
              "Triste"
            ],
            "correct": 0,
            "explanation": "\"Idag känner jag att jag tog rätt beslut\" = hoy siento que tomé la decisión correcta."
          },
          {
            "text": "¿Cuál es la conclusión de Sophie?",
            "options": [
              "A veces un sueldo más alto no es lo más importante",
              "El dinero es lo único importante",
              "Nunca hay que cambiar de trabajo",
              "Siempre hay que aceptar más sueldo"
            ],
            "correct": 0,
            "explanation": "\"Ibland är högre lön inte det viktigaste\" = a veces un salario más alto no es lo más importante."
          }
        ]
      }
    ],
    "D": [
      {
        "id": "d-01",
        "title": "Är teknik alltid en förbättring?",
        "subtitle": "Reflexión sobre la tecnología",
        "icon": "📱",
        "duration": "~1:30",
        "level": "D",
        "audioKey": "d01",
        "ttsScript": "Idag vill jag fundera över hur tekniken påverkar våra liv. Om någon hade frågat mig för tio år sedan hade jag sagt att teknisk utveckling nästan alltid är något positivt. Idag är jag inte lika säker. Å ena sidan gör tekniken vår vardag enklare. Vi kan arbeta hemifrån, betala räkningar på några sekunder och hålla kontakten med människor över hela världen. Å andra sidan märker jag att många har svårare att koppla av. Det känns nästan som om vi alltid måste vara tillgängliga. Många läser jobbmejl sent på kvällen eller jämför sig med andra på sociala medier, vilket kan skapa stress. Personligen försöker jag använda tekniken medvetet. Jag vill att den ska vara ett verktyg som hjälper mig, inte något som styr min vardag.",
        "questions": [
          {
            "text": "¿Sobre qué reflexiona Sophie en este audio?",
            "options": [
              "Cómo la tecnología afecta nuestras vidas",
              "Cómo ahorrar dinero",
              "El clima",
              "La política"
            ],
            "correct": 0,
            "explanation": "\"Hur tekniken påverkar våra liv\" = cómo la tecnología afecta nuestras vidas."
          },
          {
            "text": "¿Qué habría dicho hace diez años?",
            "options": [
              "Que el desarrollo técnico casi siempre es positivo",
              "Que la tecnología es mala",
              "Que no le interesaba",
              "Que era peligrosa"
            ],
            "correct": 0,
            "explanation": "\"Teknisk utveckling nästan alltid är något positivt\" = el desarrollo técnico casi siempre es algo positivo."
          },
          {
            "text": "¿Cómo se siente hoy respecto a esa idea?",
            "options": [
              "Ya no está tan segura",
              "Más convencida que nunca",
              "Totalmente en contra",
              "Le da igual"
            ],
            "correct": 0,
            "explanation": "\"Idag är jag inte lika säker\" = hoy no estoy tan segura."
          },
          {
            "text": "Según Sophie, ¿qué facilita la tecnología?",
            "options": [
              "Trabajar desde casa y pagar cuentas rápido",
              "Dormir mejor",
              "Cocinar",
              "Hacer deporte"
            ],
            "correct": 0,
            "explanation": "\"Arbeta hemifrån, betala räkningar på några sekunder\" = trabajar desde casa y pagar cuentas en segundos."
          },
          {
            "text": "¿Qué permite además la tecnología?",
            "options": [
              "Mantener contacto con gente de todo el mundo",
              "Viajar gratis",
              "Aprender sin estudiar",
              "Comer mejor"
            ],
            "correct": 0,
            "explanation": "\"Hålla kontakten med människor över hela världen\" = mantener el contacto con gente de todo el mundo."
          },
          {
            "text": "¿Qué desventaja menciona?",
            "options": [
              "A muchos les cuesta más desconectar",
              "Que es muy cara",
              "Que es difícil de usar",
              "Que se rompe rápido"
            ],
            "correct": 0,
            "explanation": "\"Många har svårare att koppla av\" = a muchos les cuesta más relajarse/desconectar."
          },
          {
            "text": "¿Qué sensación describe sobre la disponibilidad?",
            "options": [
              "Que siempre debemos estar disponibles",
              "Que nadie contesta",
              "Que hay poca conexión",
              "Que todos descansan"
            ],
            "correct": 0,
            "explanation": "\"Vi alltid måste vara tillgängliga\" = siempre tenemos que estar disponibles."
          },
          {
            "text": "¿Qué puede generar estrés según ella?",
            "options": [
              "Leer correos de noche y compararse en redes sociales",
              "Ver televisión",
              "Caminar",
              "Leer libros"
            ],
            "correct": 0,
            "explanation": "\"Läser jobbmejl sent... eller jämför sig med andra på sociala medier\" = leer correos de trabajo tarde o compararse en redes."
          },
          {
            "text": "¿Cómo intenta usar la tecnología Sophie?",
            "options": [
              "De forma consciente",
              "Sin límites",
              "No la usa",
              "Solo en el trabajo"
            ],
            "correct": 0,
            "explanation": "\"Använda tekniken medvetet\" = usar la tecnología de forma consciente."
          },
          {
            "text": "¿Qué quiere que sea la tecnología para ella?",
            "options": [
              "Una herramienta que la ayude, no algo que la controle",
              "Su principal pasatiempo",
              "Una fuente de ingresos",
              "Algo que evitar del todo"
            ],
            "correct": 0,
            "explanation": "\"Ett verktyg som hjälper mig, inte något som styr min vardag\" = una herramienta que ayuda, no algo que gobierna su día a día."
          }
        ]
      },
      {
        "id": "d-02",
        "title": "Vad betyder egentligen integration?",
        "subtitle": "El significado de la integración",
        "icon": "🤝",
        "duration": "~1:15",
        "level": "D",
        "audioKey": "d02",
        "ttsScript": "Integration är ett ord som används väldigt ofta, men jag tror att människor kan mena olika saker när de pratar om det. En del tycker att integration handlar om att lära sig språket så snabbt som möjligt. Andra menar att det viktigaste är att få ett arbete eller att känna sig delaktig i samhället. Enligt min erfarenhet handlar integration om flera saker samtidigt. Språket är viktigt, eftersom det gör det lättare att studera, arbeta och skapa relationer. Samtidigt räcker det inte att bara kunna svenska. Man behöver också förstå hur samhället fungerar. Dessutom tror jag att integration är ett gemensamt ansvar. Den som flyttar behöver vara nyfiken, men samhället behöver också skapa möjligheter.",
        "questions": [
          {
            "text": "¿Qué dice Sophie sobre la palabra \"integración\"?",
            "options": [
              "Que la gente puede entender cosas distintas por ella",
              "Que ya no se usa",
              "Que es fácil de definir",
              "Que es negativa"
            ],
            "correct": 0,
            "explanation": "\"Människor kan mena olika saker när de pratar om det\" = la gente puede querer decir cosas distintas."
          },
          {
            "text": "Para algunos, ¿de qué trata la integración?",
            "options": [
              "De aprender el idioma lo más rápido posible",
              "De ganar dinero",
              "De viajar",
              "De hacer amigos suecos"
            ],
            "correct": 0,
            "explanation": "\"Lära sig språket så snabbt som möjligt\" = aprender el idioma lo más rápido posible."
          },
          {
            "text": "Para otros, ¿qué es lo más importante?",
            "options": [
              "Tener trabajo y sentirse parte de la sociedad",
              "Tener casa propia",
              "Aprender a cocinar",
              "Conocer el país"
            ],
            "correct": 0,
            "explanation": "\"Få ett arbete eller att känna sig delaktig i samhället\" = conseguir un trabajo o sentirse partícipe de la sociedad."
          },
          {
            "text": "Según su experiencia, la integración es...",
            "options": [
              "Varias cosas al mismo tiempo",
              "Solo el idioma",
              "Solo el trabajo",
              "Algo imposible"
            ],
            "correct": 0,
            "explanation": "\"Integration... handlar om flera saker samtidigt\" = trata de varias cosas a la vez."
          },
          {
            "text": "¿Por qué es importante el idioma?",
            "options": [
              "Facilita estudiar, trabajar y crear relaciones",
              "Es obligatorio por ley",
              "Da dinero",
              "Es divertido"
            ],
            "correct": 0,
            "explanation": "\"Det gör det lättare att studera, arbeta och skapa relationer\" = facilita estudiar, trabajar y crear relaciones."
          },
          {
            "text": "¿Basta con saber sueco, según Sophie?",
            "options": [
              "No, no es suficiente",
              "Sí, es lo único",
              "No opina",
              "Solo para trabajar"
            ],
            "correct": 0,
            "explanation": "\"Det räcker inte att bara kunna svenska\" = no basta con solo saber sueco."
          },
          {
            "text": "¿Qué más se necesita entender?",
            "options": [
              "Cómo funciona la sociedad",
              "La historia antigua",
              "La geografía",
              "El clima"
            ],
            "correct": 0,
            "explanation": "\"Förstå hur samhället fungerar\" = entender cómo funciona la sociedad."
          },
          {
            "text": "¿De quién es la responsabilidad de integrarse?",
            "options": [
              "Es una responsabilidad compartida",
              "Solo del recién llegado",
              "Solo del gobierno",
              "De nadie"
            ],
            "correct": 0,
            "explanation": "\"Integration är ett gemensamt ansvar\" = la integración es una responsabilidad conjunta."
          },
          {
            "text": "¿Qué debe hacer quien llega a un país nuevo?",
            "options": [
              "Ser curioso y querer aprender",
              "Esperar ayuda",
              "Quedarse aislado",
              "Cambiar de país"
            ],
            "correct": 0,
            "explanation": "\"Den som flyttar behöver vara nyfiken\" = quien se muda necesita ser curioso."
          },
          {
            "text": "¿Qué debe hacer la sociedad?",
            "options": [
              "Crear oportunidades para participar",
              "No hacer nada",
              "Poner más reglas",
              "Cerrar fronteras"
            ],
            "correct": 0,
            "explanation": "\"Samhället behöver också skapa möjligheter\" = la sociedad también debe crear oportunidades."
          }
        ]
      },
      {
        "id": "d-03",
        "title": "Att våga misslyckas",
        "subtitle": "Atreverse a fracasar",
        "icon": "💡",
        "duration": "~1:05",
        "level": "D",
        "audioKey": "d03",
        "ttsScript": "Jag har märkt att många människor är rädda för att misslyckas. De väntar tills allt känns perfekt innan de vågar börja med något nytt. Tidigare tänkte jag på samma sätt. Om jag inte trodde att jag skulle lyckas direkt, valde jag ibland att inte försöka alls. Men med tiden har jag förstått att de flesta utvecklas just genom sina misstag. När vi misslyckas får vi ofta veta vad vi behöver förbättra. Om allting alltid gick bra skulle vi kanske aldrig behöva tänka på hur vi kan bli bättre. Det betyder inte att det känns roligt att göra fel. Tvärtom kan det vara frustrerande. Trots det tror jag att misslyckanden ofta är en viktig del av lärandet.",
        "questions": [
          {
            "text": "¿Qué ha notado Sophie en muchas personas?",
            "options": [
              "Que tienen miedo de fracasar",
              "Que trabajan demasiado",
              "Que no estudian",
              "Que viajan mucho"
            ],
            "correct": 0,
            "explanation": "\"Många människor är rädda för att misslyckas\" = mucha gente tiene miedo de fracasar."
          },
          {
            "text": "¿Qué esperan esas personas antes de empezar algo nuevo?",
            "options": [
              "Que todo se sienta perfecto",
              "Tener dinero",
              "Cumplir años",
              "Recibir permiso"
            ],
            "correct": 0,
            "explanation": "\"Väntar tills allt känns perfekt\" = esperan hasta que todo se sienta perfecto."
          },
          {
            "text": "¿Cómo pensaba Sophie antes?",
            "options": [
              "Igual que ellos",
              "Al revés",
              "No le importaba",
              "Con más valentía"
            ],
            "correct": 0,
            "explanation": "\"Tidigare tänkte jag på samma sätt\" = antes yo pensaba igual."
          },
          {
            "text": "¿Qué hacía a veces si no creía que lograría algo?",
            "options": [
              "No lo intentaba en absoluto",
              "Lo intentaba igual",
              "Pedía ayuda",
              "Lo dejaba para después"
            ],
            "correct": 0,
            "explanation": "\"Valde jag ibland att inte försöka alls\" = a veces elegía no intentarlo siquiera."
          },
          {
            "text": "¿Qué entendió con el tiempo?",
            "options": [
              "Que la mayoría se desarrolla gracias a sus errores",
              "Que es mejor no arriesgar",
              "Que el éxito es suerte",
              "Que hay que ser perfecto"
            ],
            "correct": 0,
            "explanation": "\"De flesta utvecklas just genom sina misstag\" = la mayoría se desarrolla precisamente a través de sus errores."
          },
          {
            "text": "¿Qué nos da saber cuando fracasamos?",
            "options": [
              "Saber qué necesitamos mejorar",
              "Dinero",
              "Vacaciones",
              "Fama"
            ],
            "correct": 0,
            "explanation": "\"Får vi ofta veta vad vi behöver förbättra\" = a menudo descubrimos qué necesitamos mejorar."
          },
          {
            "text": "Si todo saliera siempre bien, ¿qué pasaría?",
            "options": [
              "Quizá nunca pensaríamos en cómo mejorar",
              "Seríamos más felices",
              "Ganaríamos más",
              "Aprenderíamos más rápido"
            ],
            "correct": 0,
            "explanation": "\"Skulle vi kanske aldrig behöva tänka på hur vi kan bli bättre\" = quizá nunca pensaríamos en cómo mejorar."
          },
          {
            "text": "¿Dice Sophie que equivocarse es agradable?",
            "options": [
              "No, puede ser frustrante",
              "Sí, es divertido",
              "Le es indiferente",
              "Es siempre fácil"
            ],
            "correct": 0,
            "explanation": "\"Tvärtom kan det vara frustrerande\" = al contrario, puede ser frustrante."
          },
          {
            "text": "¿Qué son los fracasos, según Sophie?",
            "options": [
              "Una parte importante del aprendizaje",
              "Algo que evitar siempre",
              "Una pérdida de tiempo",
              "Señal de debilidad"
            ],
            "correct": 0,
            "explanation": "\"Misslyckanden ofta är en viktig del av lärandet\" = los fracasos suelen ser una parte importante del aprendizaje."
          },
          {
            "text": "¿Cuál es el mensaje central del audio?",
            "options": [
              "Hay que atreverse a fracasar para crecer",
              "Nunca hay que fallar",
              "El éxito es lo único que importa",
              "Es mejor no intentar cosas nuevas"
            ],
            "correct": 0,
            "explanation": "El título \"Att våga misslyckas\" y el contenido animan a atreverse a fallar para poder desarrollarse."
          }
        ]
      },
      {
        "id": "d-04",
        "title": "Behöver vi alltid ha så bråttom?",
        "subtitle": "¿Siempre con prisa?",
        "icon": "⏳",
        "duration": "~1:00",
        "level": "D",
        "audioKey": "d04",
        "ttsScript": "I dagens samhälle känns det ibland som om allting ska gå snabbare. Vi vill få svar direkt, leveranser samma dag och resultat så fort som möjligt. Samtidigt undrar jag om den här utvecklingen verkligen gör oss lyckligare. När allting går fort finns det en risk att vi aldrig känner oss riktigt nöjda. Så snart vi har uppnått ett mål börjar vi tänka på nästa. Jag tror att det ibland är viktigt att sakta ner och uppskatta det man redan har. Det kan handla om något så enkelt som att ta en promenad utan att titta på mobilen eller att äta middag utan att känna sig stressad. Naturligtvis behöver vi ibland arbeta effektivt, men jag tror inte att ett högt tempo alltid leder till ett bättre liv.",
        "questions": [
          {
            "text": "¿Cómo siente Sophie la sociedad actual?",
            "options": [
              "Como si todo tuviera que ir más rápido",
              "Muy tranquila",
              "Sin cambios",
              "Aburrida"
            ],
            "correct": 0,
            "explanation": "\"Allting ska gå snabbare\" = todo debe ir más rápido."
          },
          {
            "text": "¿Qué queremos hoy, según ella?",
            "options": [
              "Respuestas y entregas inmediatas",
              "Más vacaciones",
              "Menos trabajo",
              "Más silencio"
            ],
            "correct": 0,
            "explanation": "\"Svar direkt, leveranser samma dag och resultat så fort som möjligt\" = respuestas inmediatas, entregas el mismo día y resultados rápidos."
          },
          {
            "text": "¿Qué se pregunta Sophie?",
            "options": [
              "Si ese ritmo realmente nos hace más felices",
              "Si es legal",
              "Cuánto cuesta",
              "Quién lo inventó"
            ],
            "correct": 0,
            "explanation": "\"Om den här utvecklingen verkligen gör oss lyckligare\" = si este desarrollo realmente nos hace más felices."
          },
          {
            "text": "¿Qué riesgo hay cuando todo va rápido?",
            "options": [
              "Nunca sentirnos realmente satisfechos",
              "Gastar más dinero",
              "Dormir demasiado",
              "Perder el trabajo"
            ],
            "correct": 0,
            "explanation": "\"Att vi aldrig känner oss riktigt nöjda\" = que nunca nos sintamos realmente satisfechos."
          },
          {
            "text": "¿Qué pasa apenas alcanzamos una meta?",
            "options": [
              "Empezamos a pensar en la siguiente",
              "Descansamos",
              "Nos rendimos",
              "Celebramos mucho"
            ],
            "correct": 0,
            "explanation": "\"Börjar vi tänka på nästa\" = empezamos a pensar en la siguiente."
          },
          {
            "text": "¿Qué cree que a veces es importante?",
            "options": [
              "Frenar y apreciar lo que ya se tiene",
              "Trabajar más",
              "Comprar más",
              "Competir más"
            ],
            "correct": 0,
            "explanation": "\"Sakta ner och uppskatta det man redan har\" = frenar y apreciar lo que ya se tiene."
          },
          {
            "text": "¿Qué ejemplo sencillo da?",
            "options": [
              "Pasear sin mirar el móvil",
              "Ir de compras",
              "Ver la tele",
              "Dormir una siesta"
            ],
            "correct": 0,
            "explanation": "\"Ta en promenad utan att titta på mobilen\" = dar un paseo sin mirar el móvil."
          },
          {
            "text": "¿Qué otro ejemplo menciona?",
            "options": [
              "Cenar sin sentirse estresado",
              "Correr por la mañana",
              "Trabajar de noche",
              "Estudiar más"
            ],
            "correct": 0,
            "explanation": "\"Äta middag utan att känna sig stressad\" = cenar sin sentirse estresado."
          },
          {
            "text": "¿Reconoce Sophie que a veces hay que ser eficiente?",
            "options": [
              "Sí, a veces hay que trabajar de forma eficiente",
              "No, nunca",
              "Solo los lunes",
              "Solo en el trabajo"
            ],
            "correct": 0,
            "explanation": "\"Ibland behöver vi arbeta effektivt\" = a veces necesitamos trabajar de forma eficiente."
          },
          {
            "text": "¿Cuál es su conclusión?",
            "options": [
              "Un ritmo alto no siempre lleva a una vida mejor",
              "La prisa siempre es buena",
              "Hay que ir siempre despacio",
              "La eficiencia no sirve"
            ],
            "correct": 0,
            "explanation": "\"Ett högt tempo alltid leder till ett bättre liv\" (negado) = un ritmo alto no siempre lleva a una vida mejor."
          }
        ]
      },
      {
        "id": "d-05",
        "title": "Livslångt lärande",
        "subtitle": "Aprender toda la vida",
        "icon": "🎓",
        "duration": "~1:10",
        "level": "D",
        "audioKey": "d05",
        "ttsScript": "För några år sedan trodde många att utbildning var något man gjorde när man var ung. Idag ser arbetsmarknaden helt annorlunda ut. Tekniken utvecklas snabbt och många yrken förändras eller försvinner. Samtidigt skapas nya arbeten som kräver andra kunskaper än tidigare. Därför tror jag att vi behöver fortsätta lära oss genom hela livet. Det behöver inte alltid innebära att man studerar på universitet. Man kan gå kortare kurser, läsa böcker eller utveckla nya färdigheter genom sitt arbete. Personligen tycker jag att det är inspirerande att lära mig nya saker. Varje gång jag förstår något som tidigare kändes svårt får jag större självförtroende.",
        "questions": [
          {
            "text": "¿Qué se creía hace unos años sobre la educación?",
            "options": [
              "Que era algo que se hacía de joven",
              "Que no servía",
              "Que era solo para ricos",
              "Que era obligatoria siempre"
            ],
            "correct": 0,
            "explanation": "\"Utbildning var något man gjorde när man var ung\" = la educación era algo que se hacía de joven."
          },
          {
            "text": "¿Cómo es el mercado laboral hoy?",
            "options": [
              "Muy diferente",
              "Igual que antes",
              "Más pequeño",
              "Sin cambios"
            ],
            "correct": 0,
            "explanation": "\"Arbetsmarknaden ser helt annorlunda ut\" = el mercado laboral se ve totalmente distinto."
          },
          {
            "text": "¿Qué pasa con muchos oficios?",
            "options": [
              "Cambian o desaparecen",
              "Se quedan igual",
              "Ganan más",
              "Se prohíben"
            ],
            "correct": 0,
            "explanation": "\"Många yrken förändras eller försvinner\" = muchos oficios cambian o desaparecen."
          },
          {
            "text": "¿Qué ocurre al mismo tiempo?",
            "options": [
              "Surgen nuevos trabajos con otras exigencias",
              "Todos se jubilan",
              "Bajan los sueldos",
              "Se cierran las empresas"
            ],
            "correct": 0,
            "explanation": "\"Skapas nya arbeten som kräver andra kunskaper\" = se crean nuevos empleos que exigen otros conocimientos."
          },
          {
            "text": "¿Qué cree Sophie que necesitamos hacer?",
            "options": [
              "Seguir aprendiendo toda la vida",
              "Dejar de estudiar de adultos",
              "Trabajar menos",
              "Cambiar de país"
            ],
            "correct": 0,
            "explanation": "\"Vi behöver fortsätta lära oss genom hela livet\" = necesitamos seguir aprendiendo toda la vida."
          },
          {
            "text": "¿Aprender significa siempre ir a la universidad?",
            "options": [
              "No, no siempre",
              "Sí, siempre",
              "Solo de joven",
              "Nunca"
            ],
            "correct": 0,
            "explanation": "\"Det behöver inte alltid innebära att man studerar på universitet\" = no siempre implica estudiar en la universidad."
          },
          {
            "text": "¿Qué alternativas menciona?",
            "options": [
              "Cursos cortos, leer libros o desarrollar destrezas en el trabajo",
              "Solo ver videos",
              "Solo viajar",
              "Solo escuchar radio"
            ],
            "correct": 0,
            "explanation": "\"Gå kortare kurser, läsa böcker eller utveckla nya färdigheter genom sitt arbete\" = cursos cortos, leer libros o desarrollar habilidades en el trabajo."
          },
          {
            "text": "¿Cómo le resulta a Sophie aprender cosas nuevas?",
            "options": [
              "Inspirador",
              "Aburrido",
              "Innecesario",
              "Estresante"
            ],
            "correct": 0,
            "explanation": "\"Det är inspirerande att lära mig nya saker\" = es inspirador aprender cosas nuevas."
          },
          {
            "text": "¿Qué obtiene al entender algo que antes le costaba?",
            "options": [
              "Más confianza en sí misma",
              "Más dinero",
              "Más tiempo libre",
              "Un diploma"
            ],
            "correct": 0,
            "explanation": "\"Får jag större självförtroende\" = obtengo más confianza en mí misma."
          },
          {
            "text": "¿Cuál es el tema central del audio?",
            "options": [
              "El aprendizaje a lo largo de toda la vida",
              "La jubilación",
              "Los viajes",
              "El ahorro"
            ],
            "correct": 0,
            "explanation": "El título \"Livslångt lärande\" significa \"aprendizaje permanente / de por vida\"."
          }
        ]
      },
      {
        "id": "d-06",
        "title": "Vad är egentligen ett rikt liv?",
        "subtitle": "¿Qué es una vida rica?",
        "icon": "🌿",
        "duration": "~1:15",
        "level": "D",
        "audioKey": "d06",
        "ttsScript": "När människor pratar om framgång handlar samtalet ofta om pengar, karriär eller status. Men jag är inte säker på att det räcker för att känna sig lycklig. Visst är ekonomi viktig. Den ger oss trygghet och möjlighet att göra många saker. Samtidigt har jag träffat människor som tjänar mycket pengar men ändå känner sig ensamma eller stressade. För mig handlar ett rikt liv om balans. Jag vill ha ett arbete som känns meningsfullt, tid för människor jag tycker om och möjlighet att utvecklas. Dessutom tror jag att uppskattning inte alltid kommer från stora händelser. Ibland kan de viktigaste stunderna vara de enklaste, som ett bra samtal eller en promenad i naturen. Ett rikt liv mäts inte i hur mycket vi äger, utan i hur vi väljer att leva.",
        "questions": [
          {
            "text": "¿De qué suele tratar la conversación sobre el éxito?",
            "options": [
              "De dinero, carrera o estatus",
              "De salud",
              "De viajes",
              "De familia"
            ],
            "correct": 0,
            "explanation": "\"Pengar, karriär eller status\" = dinero, carrera o estatus."
          },
          {
            "text": "¿Está Sophie segura de que eso basta para ser feliz?",
            "options": [
              "No está segura",
              "Sí, está segura",
              "Cree que sí siempre",
              "No opina"
            ],
            "correct": 0,
            "explanation": "\"Jag är inte säker på att det räcker för att känna sig lycklig\" = no estoy segura de que baste para sentirse feliz."
          },
          {
            "text": "¿Reconoce que la economía es importante?",
            "options": [
              "Sí, da seguridad y posibilidades",
              "No, no importa",
              "Solo para viajar",
              "Solo para los jóvenes"
            ],
            "correct": 0,
            "explanation": "\"Ekonomi... ger oss trygghet och möjlighet att göra många saker\" = la economía da seguridad y posibilidades."
          },
          {
            "text": "¿A qué tipo de personas ha conocido?",
            "options": [
              "Gente con mucho dinero pero sola o estresada",
              "Gente pobre y feliz siempre",
              "Gente sin trabajo",
              "Gente famosa"
            ],
            "correct": 0,
            "explanation": "\"Tjänar mycket pengar men ändå känner sig ensamma eller stressade\" = ganan mucho pero se sienten solos o estresados."
          },
          {
            "text": "Para Sophie, ¿de qué trata una vida rica?",
            "options": [
              "Del equilibrio",
              "Del dinero",
              "De la fama",
              "Del poder"
            ],
            "correct": 0,
            "explanation": "\"Ett rikt liv om balans\" = una vida rica trata del equilibrio."
          },
          {
            "text": "¿Qué tipo de trabajo quiere?",
            "options": [
              "Uno que se sienta significativo",
              "Uno muy bien pagado",
              "Uno sin esfuerzo",
              "Uno lejano"
            ],
            "correct": 0,
            "explanation": "\"Ett arbete som känns meningsfullt\" = un trabajo que se sienta significativo."
          },
          {
            "text": "¿Qué más quiere en su vida?",
            "options": [
              "Tiempo para las personas que quiere y poder desarrollarse",
              "Un coche nuevo",
              "Una casa grande",
              "Más estatus"
            ],
            "correct": 0,
            "explanation": "\"Tid för människor jag tycker om och möjlighet att utvecklas\" = tiempo para las personas que quiere y posibilidad de desarrollarse."
          },
          {
            "text": "¿De dónde viene la apreciación, según ella?",
            "options": [
              "No siempre de grandes acontecimientos",
              "Solo de logros grandes",
              "Solo del dinero",
              "De la suerte"
            ],
            "correct": 0,
            "explanation": "\"Uppskattning inte alltid kommer från stora händelser\" = la apreciación no siempre viene de grandes eventos."
          },
          {
            "text": "¿Qué ejemplos de momentos importantes da?",
            "options": [
              "Una buena conversación o un paseo por la naturaleza",
              "Ganar la lotería",
              "Comprar algo caro",
              "Un ascenso"
            ],
            "correct": 0,
            "explanation": "\"Ett bra samtal eller en promenad i naturen\" = una buena conversación o un paseo por la naturaleza."
          },
          {
            "text": "¿Cómo se mide una vida rica, según Sophie?",
            "options": [
              "Por cómo elegimos vivir, no por lo que poseemos",
              "Por cuánto dinero tenemos",
              "Por el tamaño de la casa",
              "Por el trabajo"
            ],
            "correct": 0,
            "explanation": "\"Ett rikt liv mäts inte i hur mycket vi äger, utan i hur vi väljer att leva\" = no se mide por lo que poseemos, sino por cómo elegimos vivir."
          }
        ]
      }
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
    las:   { label: 'Grammatik',     es: 'Gramática',            icon: '📐', color: '#7C3AED' },
    tala:  { label: 'Ordförråd',     es: 'Vocabulario',          icon: '📚', color: '#F59E0B' },
    hor:   { label: 'Hörförståelse', es: 'Comprensión auditiva', icon: '🎧', color: '#0EA5E9' },
    skriv: { label: 'Skriva',        es: 'Escritura',            icon: '✍️', color: '#10B981' },
  },
  questions: [
    // ═════════════ NIVEL A · Principiante ═════════════
    { nivel: 'A', skill: 'las', type: 'mc',
      question: '¿en o ett?  «___ bok» (un libro)',
      options: ['en', 'ett'], correct: 0,
      explanation: '«en bok». La mayoría de las palabras usan «en» (8 de cada 10).' },
    { nivel: 'A', skill: 'las', type: 'mc',
      question: 'Elige la forma correcta: «Jag ___ svenska» (yo hablo sueco)',
      options: ['talar', 'tala', 'talade'], correct: 0,
      explanation: '«talar» es el presente (termina en -r). «talade» es pasado.' },
    { nivel: 'A', skill: 'tala', type: 'mc',
      question: '«hund» significa…',
      options: ['perro', 'gato', 'caballo'], correct: 0,
      explanation: '«hund» = perro. «katt» = gato, «häst» = caballo.' },
    { nivel: 'A', skill: 'tala', type: 'mc',
      question: '«tack» significa…',
      options: ['gracias', 'perdón', 'hola'], correct: 0,
      explanation: '«tack» = gracias. «förlåt» = perdón, «hej» = hola.' },
    { nivel: 'A', skill: 'hor', type: 'listen', audioKey: 'a01',
      question: 'Según el audio, ¿a qué hora se despierta Sophie?',
      options: ['A las siete', 'A las ocho', 'A las seis'], correct: 0,
      explanation: '«Varje morgon vaknar jag klockan sju» = cada mañana me despierto a las siete.' },
    { nivel: 'A', skill: 'hor', type: 'listen', audioKey: 'a02',
      question: '¿De dónde es Andree, el esposo de Sophie?',
      options: ['De Perú', 'De Suecia', 'De España'], correct: 0,
      explanation: '«Min man heter Andree och kommer från Peru» = mi esposo se llama Andree y viene de Perú.' },
    { nivel: 'A', skill: 'skriv', type: 'order',
      question: 'Ordena para decir «Me llamo María».',
      words: ['Jag', 'heter', 'Maria'], answer: ['Jag', 'heter', 'Maria'],
      explanation: '«Jag heter Maria». «heter» = me llamo.' },
    { nivel: 'A', skill: 'skriv', type: 'mc',
      question: '¿Cómo se dice «bebo café»?',
      options: ['Jag dricker kaffe', 'Jag kaffe dricker', 'Dricker jag kaffe'], correct: 0,
      explanation: 'Orden normal: sujeto + verbo + resto → «Jag dricker kaffe».' },

    // ═════════════ NIVEL B · Básico ═════════════
    { nivel: 'B', skill: 'las', type: 'mc',
      question: 'Elige el pasado: «Igår ___ jag hem» (ayer fui a casa)',
      options: ['gick', 'går', 'gå'], correct: 0,
      explanation: '«gick» = fui (pasado de gå). «går» es presente.' },
    { nivel: 'B', skill: 'las', type: 'mc',
      question: 'Plural: «en bil» (un coche) → «två ___» (dos coches)',
      options: ['bilar', 'bilor', 'biler'], correct: 0,
      explanation: 'Muchas palabras «en» hacen el plural con -ar: bil → bilar.' },
    { nivel: 'B', skill: 'tala', type: 'mc',
      question: '«igår» significa…',
      options: ['ayer', 'hoy', 'mañana'], correct: 0,
      explanation: '«igår» = ayer. «idag» = hoy, «imorgon» = mañana.' },
    { nivel: 'B', skill: 'tala', type: 'mc',
      question: '«jobb» significa…',
      options: ['trabajo', 'casa', 'escuela'], correct: 0,
      explanation: '«jobb» = trabajo (también «arbete»).' },
    { nivel: 'B', skill: 'hor', type: 'listen', audioKey: 'a03',
      question: 'En el audio, ¿cómo paga Sophie en la tienda?',
      options: ['Con tarjeta', 'En efectivo', 'Con Swish'], correct: 0,
      explanation: '«Jag betalar med kort» = pago con tarjeta.' },
    { nivel: 'B', skill: 'hor', type: 'listen', audioKey: 'a04',
      question: 'Según el audio, ¿qué tiempo hace hoy?',
      options: ['Nublado y frío', 'Soleado y cálido', 'Nieva mucho'], correct: 0,
      explanation: '«Det är molnigt och kallt» = está nublado y frío. Solo cuatro grados.' },
    { nivel: 'B', skill: 'skriv', type: 'mc',
      question: '¿Cómo se pregunta «¿Bebes café?»?',
      options: ['Dricker du kaffe?', 'Du dricker kaffe?', 'Kaffe du dricker?'], correct: 0,
      explanation: 'En las preguntas de sí/no, el verbo va primero: «Dricker du kaffe?».' },
    { nivel: 'B', skill: 'skriv', type: 'order',
      question: 'Ordena para decir «Voy a comprar mañana».',
      words: ['Jag', 'ska', 'handla', 'imorgon'], answer: ['Jag', 'ska', 'handla', 'imorgon'],
      explanation: '«Jag ska handla imorgon». «ska» = voy a (futuro/plan).' },

    // ═════════════ NIVEL C · Intermedio ═════════════
    { nivel: 'C', skill: 'las', type: 'mc',
      question: 'Perfecto: «Jag har ___ frukost» (he comido el desayuno)',
      options: ['ätit', 'äter', 'åt'], correct: 0,
      explanation: '«har ätit» = he comido. El perfecto es «har + supino» (ätit).' },
    { nivel: 'C', skill: 'las', type: 'mc',
      question: 'Subordinada: «Jag vet att han ___» (sé que él no viene)',
      options: ['inte kommer', 'kommer inte'], correct: 0,
      explanation: 'En una frase subordinada, el «inte» va ANTES del verbo: «…att han inte kommer».' },
    { nivel: 'C', skill: 'tala', type: 'mc',
      question: '«eftersom» significa…',
      options: ['porque', 'aunque', 'mientras'], correct: 0,
      explanation: '«eftersom» = porque (da la razón).' },
    { nivel: 'C', skill: 'tala', type: 'mc',
      question: '«ändå» significa…',
      options: ['aun así / de todos modos', 'además', 'por ejemplo'], correct: 0,
      explanation: '«ändå» = aun así. «dessutom» = además.' },
    { nivel: 'C', skill: 'hor', type: 'listen', audioKey: 'b01',
      question: 'En el audio, ¿qué fue lo primero que hizo Sophie al llegar a Suecia?',
      options: ['Registrarse en Skatteverket', 'Buscar trabajo', 'Comprar una casa'], correct: 0,
      explanation: '«Det första jag gjorde var att registrera mig hos Skatteverket» = lo primero fue registrarme en Skatteverket (la agencia tributaria).' },
    { nivel: 'C', skill: 'hor', type: 'listen', audioKey: 'b03',
      question: 'Según el audio, ¿cómo practicaba sueco en casa?',
      options: ['Viendo TV con subtítulos', 'Leyendo el periódico', 'Escuchando la radio'], correct: 0,
      explanation: '«titta på svenska tv-program med undertexter» = ver programas suecos con subtítulos.' },
    { nivel: 'C', skill: 'skriv', type: 'mc',
      question: 'Elige la frase correcta (ella dijo que no viene):',
      options: ['Hon sa att hon inte kommer', 'Hon sa att hon kommer inte', 'Att hon inte kommer hon sa'], correct: 0,
      explanation: 'Tras «att» (que), el «inte» va antes del verbo: «…att hon inte kommer».' },
    { nivel: 'C', skill: 'skriv', type: 'order',
      question: 'Ordena para decir «Creo que el sueco es útil».',
      words: ['Jag', 'tycker', 'att', 'svenska', 'är', 'användbart'],
      answer: ['Jag', 'tycker', 'att', 'svenska', 'är', 'användbart'],
      explanation: '«Jag tycker att svenska är användbart». «tycker att» = creo que.' },

    // ═════════════ NIVEL D · Avanzado ═════════════
    { nivel: 'D', skill: 'las', type: 'mc',
      question: 'Voz pasiva: «Dörren ___» (la puerta se abre)',
      options: ['öppnas', 'öppnar', 'öppnade'], correct: 0,
      explanation: 'La pasiva se forma con -s: «Dörren öppnas» = la puerta se abre / es abierta.' },
    { nivel: 'D', skill: 'las', type: 'mc',
      question: 'Condicional: «Jag ___ vilja ha en kaffe» (querría un café)',
      options: ['skulle', 'ska', 'vill'], correct: 0,
      explanation: '«skulle vilja» = querría (forma cortés). «skulle» = -ría.' },
    { nivel: 'D', skill: 'tala', type: 'mc',
      question: '«hävda» significa…',
      options: ['afirmar / sostener', 'preguntar', 'olvidar'], correct: 0,
      explanation: '«hävda» = afirmar/sostener algo con firmeza.' },
    { nivel: 'D', skill: 'tala', type: 'mc',
      question: 'En un texto, «inledning» es…',
      options: ['la introducción', 'la conclusión', 'el título'], correct: 0,
      explanation: '«inledning» = introducción. «avslutning» = conclusión.' },
    { nivel: 'D', skill: 'hor', type: 'listen', audioKey: 'b05',
      question: 'En el audio, ¿a qué número se llama para consejo médico en Suecia?',
      options: ['1177', '112', '90000'], correct: 0,
      explanation: '«Man kan också ringa 1177 — det är sjukvårdsrådgivningen» = también puedes llamar al 1177, que es la línea de consejo sanitario.' },
    { nivel: 'D', skill: 'hor', type: 'listen', audioKey: 'b06',
      question: 'Según el audio, ¿qué se come en Midsommar?',
      options: ['Arenque y fresas', 'Albóndigas y puré', 'Pizza'], correct: 0,
      explanation: '«man dansar runt en majstång och äter sill och jordgubbar» = se baila alrededor del palo de mayo y se come arenque y fresas.' },
    { nivel: 'D', skill: 'skriv', type: 'order',
      question: 'Ordena para decir «Es divertido aprender sueco».',
      words: ['Det', 'är', 'kul', 'att', 'lära', 'sig', 'svenska'],
      answer: ['Det', 'är', 'kul', 'att', 'lära', 'sig', 'svenska'],
      explanation: '«Det är kul att lära sig svenska».' },
    { nivel: 'D', skill: 'skriv', type: 'mc',
      question: 'En un correo formal, ¿cómo te despides?',
      options: ['Med vänliga hälsningar', 'Hej då!', 'Tjena!'], correct: 0,
      explanation: '«Med vänliga hälsningar» (MVH) = saludos cordiales. Lo demás es informal.' },
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

    // ── Pronunciación (los sonidos) ─────────────────────────
    {
      id: 'u-pronunciacion',
      title: 'Los sonidos del sueco',
      subtitle: 'Cómo se leen las letras',
      icon: '🔊',
      color: '#10B981',
      level: 'A',
      grammarTopicId: 'pronunciacion',
      cards: [
        { title: 'La idea', body: 'El sueco se escribe casi como se lee… pero algunas letras suenan distinto a lo que esperas. Aquí van los sonidos clave para que te entiendan desde el primer día. (Pronto Sophie sumará audios para oírlos.) 🔊' },
        { title: 'Las vocales nuevas', body: 'El sueco tiene 9 vocales. Cuatro no existen en español: <br><strong>å</strong> suena como «o» (<em>gå</em> = «go»). <br><strong>ä</strong> es una «e» abierta (<em>äta</em>). <br><strong>ö</strong> está entre «o» y «e» (<em>öra</em>). <br><strong>y</strong> es una «i» con labios redondos (<em>ny</em>).' },
        { title: 'La «o» tramposa', body: 'La letra <strong>o</strong> muchas veces NO suena «o», sino <strong>«u»</strong>: <br><em>bok</em> se dice «buk» (libro). <br><em>sol</em> se dice «sul» (sol). <br>Es de las cosas que más despistan al principio. 🎯' },
        { title: 'Sonidos especiales', body: '<strong>sj</strong> es un soplido suave: <em>sju</em> (siete), <em>sjö</em> (lago). <br><strong>tj</strong> y la <strong>k</strong> antes de e/i/y/ä/ö suenan «ch» suave: <em>tjugo</em> (veinte), <em>kött</em> (carne). <br>La <strong>g</strong> antes de e/i/y suena «y»: <em>ge</em> = «ye».' },
        { title: 'Letras mudas y melodía', body: 'Al inicio, la primera letra de <strong>hj-, lj-, dj-</strong> es muda: <em>hjul</em> = «jul» (rueda). <br>Y ojo: el sueco «canta» — el tono sube y baja. Ese sonido melódico se pega escuchando mucho. ¡A practicar! 💪' },
      ]
    },


    // ── Genitivo ────────────────────────────────────────────
    {
      id: 'u-genitivo',
      title: 'El genitivo (de quién es)',
      subtitle: 'Annas bok = el libro de Ana',
      icon: '🔑',
      color: '#10B981',
      level: 'A',
      grammarTopicId: 'genitivo',
      cards: [
        { title: 'La idea', body: 'Para decir de <strong>quién</strong> es algo, el sueco tiene un truco facilísimo: le pega una <strong>-s</strong> al dueño. <br><em>Anna</em> → <em><strong>Annas</strong> bok</em> = el libro de Ana. Sin «de», sin nada más. 🔑' },
        { title: 'Cómo se arma', body: 'Primero el <strong>dueño</strong> (con -s), luego la <strong>cosa</strong>: <br><em>Eriks bil</em> = el coche de Erik. <br><em>pappas jobb</em> = el trabajo de papá. <br>Es como en inglés (Erik’s car), pero…' },
        { title: '¡Sin apóstrofo!', body: 'Ojo con esto: en sueco el genitivo <strong>NO lleva apóstrofo</strong>. Se escribe pegado: <em>Annas</em>, <em>Eriks</em>, <em>Sveriges</em> (de Suecia). Nada de «Anna’s». 🎯' },
        { title: 'También con «el/la»', body: 'Funciona igual con cosas: <br><em>hunden</em> (el perro) → <em>hundens namn</em> (el nombre del perro). <br><em>huset</em> (la casa) → <em>husets dörr</em> (la puerta de la casa). <br>Siempre: dueño + s, luego la cosa. ¡A practicar! 💪' },
      ]
    },

    // ── Imperativo ──────────────────────────────────────────
    {
      id: 'u-imperativo',
      title: 'Dar órdenes: el imperativo',
      subtitle: 'Kom! Ät! Läs!',
      icon: '📢',
      color: '#10B981',
      level: 'A',
      grammarTopicId: 'imperativo',
      cards: [
        { title: 'La idea', body: 'El imperativo es la forma de <strong>mandar o instruir</strong>: «¡Ven!», «¡Come!», «¡Espera!». Lo usas todo el día: con los niños, en recetas, en instrucciones. Y en sueco es cortito. 📢' },
        { title: 'La regla', body: 'El imperativo es casi siempre <strong>el verbo sin la persona</strong>, solo la acción: <br><em>komma</em> → <strong>Kom!</strong> (¡ven!). <br><em>äta</em> → <strong>Ät!</strong> (¡come!). <br><em>skriva</em> → <strong>Skriv!</strong> (¡escribe!). <br>No hace falta decir «du» (tú).' },
        { title: 'Los de «-ar» guardan la -a', body: 'Los verbos que terminan en <strong>-ar</strong> mantienen la -a en el imperativo: <br><em>öppna</em> → <strong>Öppna!</strong> (¡abre!). <br><em>titta</em> → <strong>Titta!</strong> (¡mira!). <br><em>vänta</em> → <strong>Vänta!</strong> (¡espera!).' },
        { title: 'Con amabilidad', body: 'Una orden directa puede sonar fuerte. Para suavizar, usa una pregunta: <br><em><strong>Kan du</strong> stänga dörren?</em> = ¿puedes cerrar la puerta? <br>Y para acompañar: <em>Kom <strong>hit</strong>!</em> = ¡ven aquí! ¡A practicar! 💪' },
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

    // ── Perfecto (har + supino) ─────────────────────────────
    {
      id: 'u-perfecto',
      title: 'Ya lo hice: el perfecto',
      subtitle: '«He comido»: har + supino',
      icon: '✅',
      color: '#0EA5E9',
      level: 'B',
      grammarTopicId: 'perfecto',
      cards: [
        { title: 'La idea', body: 'El perfecto es el «<strong>he hecho</strong>»: algo que ya pasó pero que sigue importando ahora. <em>He comido</em> (por eso no tengo hambre). <em>He estudiado sueco</em> (por eso lo hablo). En sueco se arma con dos piezas. ✅' },
        { title: 'La fórmula', body: 'Siempre es <strong>har + supino</strong>. El «supino» es una forma especial del verbo (no te asustes por el nombre). <br><em>Jag <strong>har ätit</strong></em> = he comido. <br><em>Jag <strong>har talat</strong></em> = he hablado. <br>«har» nunca cambia; solo cambia el segundo.' },
        { title: 'Cómo es el supino', body: 'Depende del verbo, pero hay patrones: <br>• Verbos en <strong>-ar</strong> → <strong>-at</strong>: <em>tala → talat</em>, <em>jobba → jobbat</em>. <br>• Verbos fuertes → <strong>-it</strong>: <em>skriva → skrivit</em>, <em>äta → ätit</em>. <br>Con el tiempo se pegan solos de tanto oírlos. 🎯' },
        { title: 'Perfecto vs. pasado', body: 'Cuidado, no es lo mismo: <br><em>Jag <strong>åt</strong> igår</em> = comí ayer (momento concreto). <br><em>Jag <strong>har ätit</strong></em> = he comido (y sigue valiendo ahora). <br>Si dices <em>cuándo</em> exacto, suele ir el pasado; si conecta con el presente, el perfecto.' },
        { title: 'Un paso más atrás', body: 'Si cambias «har» por <strong>hade</strong>, retrocedes otro escalón en el tiempo: <br><em>Jag <strong>hade</strong> ätit</em> = había comido (antes de otra cosa que también pasó). <br>Pero con el perfecto normal (har + supino) ya cubres el 90% del día a día. ¡A practicar! 💪' },
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

    // ── Este, ese, algún, ningún ────────────────────────────
    {
      id: 'u-demostrativos',
      title: 'Este, ese, algún, ningún',
      subtitle: 'den här, den där, någon, ingen',
      icon: '👉',
      color: '#D946EF',
      level: 'B',
      grammarTopicId: 'demostrativos',
      cards: [
        { title: 'La idea', body: 'Estas palabritas señalan y precisan: <strong>este</strong> (el de aquí), <strong>ese</strong> (el de allá), <strong>algún</strong>, <strong>ningún</strong>, <strong>cuál</strong>. Son cortas y se usan a cada rato para no repetir el nombre de las cosas. 👉' },
        { title: 'Este y ese', body: '<strong>den här</strong> = este (cerca). <strong>den där</strong> = ese/aquel (lejos). <br><em>den här bilen</em> (este coche), <em>den där bilen</em> (ese coche). <br>Truco: <em>här</em> = aquí, <em>där</em> = allá. Con «ett»: <em>det här</em> / <em>det där</em>. En plural: <em>de här</em> / <em>de där</em>.' },
        { title: 'El detalle clave', body: 'Con «den här/den där», el sustantivo va en su forma <strong>con el/la</strong> (definida): <br><em>den här <strong>bilen</strong></em> (no «bil»). <br><em>det här <strong>huset</strong></em>. <br>Es como decir «este el-coche». Raro, pero así es el sueco. 🎯' },
        { title: 'Algún y ningún', body: '<strong>någon</strong> = algún/alguien: <em>Har du någon fråga?</em> (¿tienes alguna pregunta?). <br><strong>ingen</strong> = ningún/nadie: <em>Ingen är hemma</em> (nadie está en casa). <br>Con «ett»: <em>något</em> / <em>inget</em>. En plural: <em>några</em> / <em>inga</em>.' },
        { title: '¿Cuál? y todo', body: '<strong>vilken</strong> = cuál/qué: <em>Vilken bok?</em> (¿cuál libro?). Con «ett»: <em>vilket</em>. <br><strong>hela</strong> = todo/entero: <em>hela dagen</em> (todo el día). <br>Con esto ya preguntas, señalas y precisas. ¡A practicar! 💪' },
      ]
    },


    // ── Reflexivos y «man» ──────────────────────────────────
    {
      id: 'u-reflexivos',
      title: 'Reflexivos y «man»',
      subtitle: 'Jag tvättar mig · Hur säger man?',
      icon: '🔄',
      color: '#3B82F6',
      level: 'B',
      grammarTopicId: 'reflexivos',
      cards: [
        { title: 'La idea', body: 'Algunos verbos «rebotan» sobre uno mismo: <em>lavarse</em>, <em>sentirse</em>, <em>sentarse</em>. En español usas «me, te, se». En sueco hay unas palabritas parecidas que acompañan al verbo. 🔄' },
        { title: 'Las formas reflexivas', body: 'Son como los pronombres de objeto: <br><em>jag → <strong>mig</strong></em>, <em>du → <strong>dig</strong></em>, <em>vi → <strong>oss</strong></em>. <br>Y para él/ella/ellos, una sola: <strong>sig</strong>. <br><em>Jag tvättar <strong>mig</strong></em> = me lavo. <em>Han lär <strong>sig</strong></em> = él aprende.' },
        { title: 'Verbos muy usados', body: '<em>känna sig</em> = sentirse: <em>Jag känner mig bra</em> (me siento bien). <br><em>lära sig</em> = aprender: <em>Hon lär sig svenska</em>. <br><em>sätta sig</em> = sentarse: <em>Sätt dig!</em> (¡siéntate!).' },
        { title: '«man» = se / uno', body: 'Cuando no importa quién hace algo, el sueco usa <strong>man</strong> (= se / uno): <br><em>Hur säger <strong>man</strong>…?</em> = ¿cómo se dice…? <br><em>Här talar <strong>man</strong> svenska</em> = aquí se habla sueco. <br>Palabra clave para preguntar cosas. ¡A practicar! 💪' },
      ]
    },

    // ── Adverbios ───────────────────────────────────────────
    {
      id: 'u-adverbios',
      title: 'Adverbios',
      subtitle: 'snabbt, ofta, alltid, aldrig',
      icon: '🏃',
      color: '#3B82F6',
      level: 'B',
      grammarTopicId: 'adverbios',
      cards: [
        { title: 'La idea', body: 'Los adverbios dicen <strong>cómo</strong>, <strong>cuándo</strong> o <strong>cuánto</strong> pasa algo: rápido, a menudo, siempre. Le dan vida a tus frases: no es lo mismo «corro» que «corro rápido». 🏃' },
        { title: 'De adjetivo a adverbio', body: 'Muy fácil: al adjetivo le sumas <strong>-t</strong>: <br><em>snabb</em> (rápido) → <em>Han springer <strong>snabbt</strong></em> (corre rápido). <br><em>vacker</em> (bonito) → <em>Hon sjunger <strong>vackert</strong></em> (canta bonito). <br>(Excepción común: <em>bra</em> = bien, no cambia.)' },
        { title: 'Cada cuánto (frecuencia)', body: '<strong>alltid</strong> = siempre. <strong>ofta</strong> = a menudo. <strong>ibland</strong> = a veces. <strong>aldrig</strong> = nunca. <br><em>Jag dricker <strong>alltid</strong> kaffe</em> = siempre bebo café. <br>Suelen ir justo después del verbo.' },
        { title: 'Otros muy útiles', body: '<strong>kanske</strong> = quizás. <strong>mycket</strong> = mucho. <strong>lite</strong> = poco. <strong>nu</strong> = ahora. <br><em>Kanske imorgon</em> = quizás mañana. Con estos ya matizas casi todo. ¡A practicar! 💪' },
      ]
    },

    // ── Lugar y movimiento ──────────────────────────────────
    {
      id: 'u-lugar-movimiento',
      title: 'Lugar y movimiento',
      subtitle: 'är hemma vs går hem',
      icon: '🧭',
      color: '#3B82F6',
      level: 'B',
      grammarTopicId: 'lugar-movimiento',
      cards: [
        { title: 'La idea', body: 'Aquí el sueco hace algo que el español no: usa <strong>una palabra distinta</strong> según si <strong>estás</strong> en un sitio o si <strong>vas</strong> hacia él. Parece raro, pero tiene toda la lógica. 🧭' },
        { title: 'Estar vs. ir', body: '<strong>här</strong> = aquí (estás) · <strong>hit</strong> = hacia aquí (vas). <br><strong>där</strong> = allí (está) · <strong>dit</strong> = hacia allá (vas). <br><em>Jag är <strong>här</strong></em> (estoy aquí) vs <em>Kom <strong>hit</strong>!</em> (ven aquí).' },
        { title: 'La estrella: hemma / hem', body: 'La más usada: <br><em>Jag är <strong>hemma</strong></em> = estoy en casa (ubicación). <br><em>Jag går <strong>hem</strong></em> = voy a casa (movimiento). <br>Mismo «casa», pero una para estar y otra para ir. Igual: <strong>ute/ut</strong> (afuera / hacia afuera).' },
        { title: 'Cómo «están» las cosas', body: 'El sueco dice cómo está colocado un objeto: <br><em>Boken <strong>ligger</strong> på bordet</em> = el libro está (acostado) en la mesa. <br><em>Glaset <strong>står</strong> på bordet</em> = el vaso está (de pie) en la mesa. <br><em>ligga</em> = acostado, <em>stå</em> = de pie, <em>sitta</em> = sentado/pegado. ¡A practicar! 💪' },
      ]
    },

    // ── Respuestas cortas ───────────────────────────────────
    {
      id: 'u-respuestas-cortas',
      title: 'Respuestas cortas',
      subtitle: 'Ja, det gör jag',
      icon: '💬',
      color: '#3B82F6',
      level: 'B',
      grammarTopicId: 'respuestas-cortas',
      cards: [
        { title: 'La idea', body: 'Cuando te preguntan algo, en sueco no se responde solo «Ja» o «Nej»: se añade una colita que suena natural y educada. <br><em>—Talar du svenska? —Ja, det <strong>gör</strong> jag.</em> (—¿Hablas sueco? —Sí.) 💬' },
        { title: 'El comodín «gör»', body: 'Para verbos de acción (hablar, vivir, trabajar…), la respuesta usa <strong>gör</strong> (= hago), para no repetir el verbo: <br><em>Ja, det <strong>gör</strong> jag</em> = sí (lo hago). <br><em>Nej, det <strong>gör</strong> jag inte</em> = no (no lo hago).' },
        { title: 'Con «är» y «har» se repiten', body: 'Si la pregunta usa <em>är</em> (ser/estar) o <em>har</em> (tener), la respuesta repite esa palabra: <br><em>—Är du trött? —Ja, det <strong>är</strong> jag.</em> <br><em>—Har du en bil? —Ja, det <strong>har</strong> jag.</em>' },
        { title: 'El truco del «Jo»', body: 'Si te preguntan algo <strong>en negativo</strong> y quieres decir «sí», no usas «Ja» sino <strong>Jo</strong>: <br><em>—Kommer du inte? —<strong>Jo</strong>, det gör jag!</em> (—¿No vienes? —¡Sí que voy!). <br>Ese «Jo» te hace sonar nativo. ¡A practicar! 💪' },
      ]
    },


    // ── Verbos con partícula ────────────────────────────────
    {
      id: 'u-partikelverb',
      title: 'Verbos con partícula',
      subtitle: 'tycka om, ge upp, stänga av',
      icon: '🧩',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'partikelverb',
      cards: [
        { title: 'La idea', body: 'Como en inglés (give <em>up</em>, turn <em>off</em>), el sueco tiene verbos formados por un verbo + una <strong>partícula</strong> (una palabrita) que juntos significan algo nuevo. Y esa partícula se dice con <strong>fuerza</strong>. 🧩' },
        { title: 'El clásico: tycka om', body: '<em>tycka</em> solo = opinar. Pero <em>tycka <strong>om</strong></em> = <strong>gustar</strong>: <br><em>Jag tycker om kaffe</em> = me gusta el café. <br>La partícula cambia todo el sentido.' },
        { title: 'Unos muy usados', body: '<em>ge <strong>upp</strong></em> = rendirse. <br><em>känna <strong>igen</strong></em> = reconocer. <br><em>stänga <strong>av</strong></em> = apagar · <em>slå <strong>på</strong></em> = encender. <br><em>ta reda <strong>på</strong></em> = averiguar.' },
        { title: 'Dónde va la partícula', body: 'La partícula va <strong>justo después del verbo</strong>, antes del objeto: <br><em>Stäng <strong>av</strong> lampan</em> = apaga la luz. <br>Y ojo: se pronuncia acentuada, eso la distingue de una preposición normal. ¡A practicar! 💪' },
      ]
    },

    // ── El condicional (skulle) ─────────────────────────────
    {
      id: 'u-condicional',
      title: 'El condicional (skulle)',
      subtitle: 'querría, sería, viajaría',
      icon: '🌤️',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'condicional',
      cards: [
        { title: 'La idea', body: 'El condicional es el «<strong>-ría</strong>»: haría, sería, querría. En sueco se arma con una sola palabra mágica: <strong>skulle</strong>. <br><em>Jag <strong>skulle</strong> resa</em> = yo viajaría. 🌤️' },
        { title: 'Para pedir con educación', body: 'Aquí es donde más lo vas a usar: para pedir cosas amablemente. <br><em>Jag <strong>skulle vilja</strong> ha en kaffe</em> = querría un café. <br>Suena mucho más fino que «Jag vill…» (quiero). ¡Muy útil en tiendas y restaurantes! 🎯' },
        { title: 'Lo hipotético', body: 'Para «si pasara X, haría Y»: <br><em>Om jag hade pengar, <strong>skulle</strong> jag resa</em> = si tuviera dinero, viajaría. <br>El «skulle» marca lo imaginado, lo que no es real (todavía).' },
        { title: 'La regla', body: 'Igual que los verbos que ayudan: después de <strong>skulle</strong> va el verbo en <strong>forma base</strong>: <br><em>Det skulle <strong>vara</strong> kul</em> = sería divertido. <br><em>Skulle du <strong>kunna</strong> hjälpa mig?</em> = ¿podrías ayudarme? ¡A practicar! 💪' },
      ]
    },

    // ── Verbos con preposición ──────────────────────────────
    {
      id: 'u-verbos-preposicion',
      title: 'Verbos con preposición',
      subtitle: 'tänka på, vänta på, tycka om',
      icon: '🔌',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'verbos-preposicion',
      cards: [
        { title: 'La idea', body: 'Muchos verbos suecos vienen «enchufados» a una preposición fija, y <strong>no siempre es la misma que en español</strong>. Hay que aprenderlos como pareja: verbo + preposición. 🔌' },
        { title: 'La estrella: «på»', body: 'La preposición «på» acompaña a muchísimos verbos: <br><em>tänka <strong>på</strong></em> = pensar en. <br><em>vänta <strong>på</strong></em> = esperar. <br><em>titta <strong>på</strong></em> = mirar · <em>lyssna <strong>på</strong></em> = escuchar. <br><em>tro <strong>på</strong></em> = creer en.' },
        { title: 'Ojo con el español', body: 'No traduzcas la preposición literal: <br>«pensar <u>en</u>» NO es «tänka i», es <em>tänka <strong>på</strong></em>. <br>«esperar» (sin «a») lleva «på»: <em>vänta <strong>på</strong> bussen</em>. <br>Por eso se memorizan en pareja. 🎯' },
        { title: 'Otros útiles', body: '<em>tycka <strong>om</strong></em> = gustar. <br><em>bero <strong>på</strong></em> = depender de: <em>Det beror på vädret</em> (depende del clima). <br>Cada vez que aprendas un verbo nuevo, apréndete también su preposición. ¡A practicar! 💪' },
      ]
    },

    // ── Conjunciones avanzadas ──────────────────────────────
    {
      id: 'u-conjunciones-avanzadas',
      title: 'Conjunciones avanzadas',
      subtitle: 'fastän, medan, innan, så att',
      icon: '🪢',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'conjunciones-avanzadas',
      cards: [
        { title: 'La idea', body: 'Ya conoces och, men, eftersom. Ahora sumamos conectores más ricos para hablar como un nativo: <strong>aunque, mientras, antes de, para que…</strong> Con ellos tus frases dejan de ser simples. 🪢' },
        { title: 'Contraste y tiempo', body: '<strong>fastän</strong> (o <em>trots att</em>) = aunque. <br><strong>medan</strong> = mientras. <br><strong>innan</strong> = antes de (que) · <strong>efter att</strong> = después de (que). <br><em>Fastän det regnar, går jag ut</em> = aunque llueve, salgo.' },
        { title: 'Causa y propósito', body: '<strong>därför att</strong> = porque (¡ojo! «därför» solo = por eso). <br><strong>så att</strong> = para que / así que: <em>Jag talar långsamt så att du förstår</em> (hablo despacio para que entiendas).' },
        { title: 'No olvides la regla BIFF', body: 'Todas crean una <strong>subordinada</strong>, así que dentro de ellas el «inte» va <strong>antes del verbo</strong>: <br><em>…fastän jag <strong>inte</strong> vill</em> = …aunque no quiero. <br>Misma regla de las subordinadas. ¡A practicar! 💪' },
      ]
    },

    // ── Palabras compuestas ─────────────────────────────────
    {
      id: 'u-palabras-compuestas',
      title: 'Palabras compuestas',
      subtitle: 'tandläkare, kylskåp, sommarhus',
      icon: '🧱',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'palabras-compuestas',
      cards: [
        { title: 'La idea', body: 'El sueco es famoso por <strong>pegar palabras</strong> para crear una nueva. Donde el español usa varias palabras («médico de dientes»), el sueco hace una sola: <em>tandläkare</em>. ¡Todo junto! 🧱' },
        { title: 'Cómo funciona', body: 'Se juntan y la <strong>última palabra manda</strong> (dice qué es); las de delante solo describen: <br><em>kyl</em> (frío) + <em>skåp</em> (armario) = <strong>kylskåp</strong> (refrigerador = armario del frío). <br><em>sommar</em> + <em>hus</em> = <strong>sommarhus</strong> (casa de verano).' },
        { title: 'El género lo da la última', body: 'Como la última palabra manda, ella decide el «en/ett»: <br><em>en boll</em> → <em>en fot<strong>boll</strong></em> (un balón de fútbol). <br><em>en bok</em> → <em>en barn<strong>bok</strong></em> (un libro infantil).' },
        { title: 'Un error típico', body: 'Separar lo que va junto (särskrivning) cambia el sentido o se ve mal: <em>en rödspätta</em> (un pez) no es lo mismo que «en röd spätta». Regla práctica: si es un concepto, <strong>va pegado</strong>. ¡A practicar! 💪' },
      ]
    },

    // ── Adjetivo en forma definida ──────────────────────────
    {
      id: 'u-adjetivo-definido',
      title: 'El adjetivo con «el/la»',
      subtitle: 'den stora bilen, det stora huset',
      icon: '🎯',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'adjetivo-definido',
      cards: [
        { title: 'La idea', body: 'Ya sabes «en röd bil» (un coche rojo). Ahora: cuando dices «<strong>EL</strong> coche rojo», el adjetivo cambia. Es la última pieza para que suenes correcto con los adjetivos. 🎯' },
        { title: 'El adjetivo se pone en -a', body: 'Con «el/la/los», el adjetivo casi siempre termina en <strong>-a</strong>: <br><em><strong>den stora</strong> bilen</em> = el coche grande. <br><em><strong>de nya</strong> böckerna</em> = los libros nuevos. <br>Nada de «stort» aquí: en definido siempre -a.' },
        { title: 'Hasta con «ett»', body: 'Sorpresa: aunque la palabra sea «ett», el adjetivo definido también va en -a (no -t): <br><em><strong>det stora</strong> huset</em> = la casa grande (no «det stort»). <br>Definido = -a, siempre.' },
        { title: 'La «triple marca»', body: 'El sueco marca «el» tres veces a la vez: <br><em><strong>den</strong> stor<strong>a</strong> bil<strong>en</strong></em> → den (delante) + -a (adjetivo) + -en (nombre definido). <br>Usa «den» para palabras «en», «det» para «ett», «de» para plural. ¡A practicar! 💪' },
      ]
    },

    // ── Subordinadas (frases largas) ────────────────────────
    {
      id: 'u-subordinadas',
      title: 'Frases largas: subordinadas',
      subtitle: 'att, som y la regla del «inte»',
      icon: '🔗',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'subordinadas',
      cards: [
        { title: 'La idea', body: 'Hasta ahora hiciste frases cortas. Ahora vas a <strong>unir dos ideas en una sola frase larga</strong>: «Sé <u>que</u> él vive aquí», «El hombre <u>que</u> trabaja aquí». Esas segunditas partes son las <strong>subordinadas</strong>. 🔗' },
        { title: 'att = que', body: '<strong>att</strong> mete una idea dentro de otra: <br><em>Jag vet <strong>att</strong> han bor här</em> = sé que vive aquí. <br><em>Jag vill <strong>att</strong> du kommer</em> = quiero que vengas. <br>Es el «que» del español.' },
        { title: 'som = que / quien', body: '<strong>som</strong> conecta un nombre con más información (sirve para personas y cosas): <br><em>Mannen <strong>som</strong> bor här</em> = el hombre que vive aquí. <br><em>Boken <strong>som</strong> jag läser</em> = el libro que leo.' },
        { title: '⭐ La regla estrella (BIFF)', body: 'Aquí el sueco cambia el orden. En una frase <strong>normal</strong>, «inte» va DESPUÉS del verbo: <br><em>Han kommer <strong>inte</strong></em> (él no viene). <br>Pero en una <strong>subordinada</strong>, «inte» va ANTES del verbo: <br><em>Jag vet att han <strong>inte</strong> kommer</em>. <br>Se llama regla «BIFF»: en subordinada, Inte va antes del verbo. 🎯' },
        { title: 'Preguntas metidas dentro', body: 'También puedes meter una pregunta dentro de la frase: <br><em>Jag vet inte <strong>var</strong> han bor</em> = no sé dónde vive. <br><em>Jag undrar <strong>om</strong> han kommer</em> = me pregunto si viene. <br>Con esto ya hablas de corrido, no a frases sueltas. ¡A practicar! 💪' },
      ]
    },

    // ── Sueco avanzado ──────────────────────────────────────
    {
      id: 'u-avanzado',
      title: 'Sueco avanzado',
      subtitle: 'Voz pasiva, participios y frases con «det»',
      icon: '🎓',
      color: '#F59E0B',
      level: 'C',
      grammarTopicId: 'avanzado',
      cards: [
        { title: 'La idea', body: 'Estos son los toques que hacen que tu sueco suene «de verdad»: la voz pasiva, los participios y esas frases que empiezan con <strong>det</strong>. Ninguno es difícil; son detalles finos. 🎓' },
        { title: 'Voz pasiva: la «-s»', body: 'Cuando lo importante es la acción (no quién la hace), se le pega una <strong>-s</strong> al verbo: <br><em>Dörren <strong>öppnas</strong></em> = la puerta se abre / es abierta. <br><em>Boken <strong>läses</strong></em> = el libro es leído. <br>También existe «bli + participio»: <em>Dörren blir öppnad</em>.' },
        { title: 'Participios como adjetivos', body: 'El participio pasado describe algo ya hecho, como un adjetivo: <br><em>en <strong>stängd</strong> dörr</em> = una puerta cerrada. <br><em>en <strong>målad</strong> vägg</em> = una pared pintada. <br>Y cambia con «ett»: <em>Fönstret är <strong>stängt</strong></em> (la ventana está cerrada).' },
        { title: 'El «det» de relleno', body: 'El sueco odia las frases sin sujeto, así que pone un <strong>det</strong> de relleno: <br><em><strong>Det</strong> regnar</em> = llueve. <br><em><strong>Det</strong> finns många bilar</em> = hay muchos coches. <br><em><strong>Det</strong> är kul att lära sig svenska</em> = es divertido aprender sueco.' },
        { title: 'Resaltar con «Det är … som»', body: 'Para poner el foco en algo, usas esta fórmula: <br><em><strong>Det är</strong> Anna <strong>som</strong> lagar maten</em> = es Anna quien cocina. <br>Cambias lo que va en medio para resaltar lo que quieras. Con esto cierras el temario. ¡Enorme trabajo! 🎉' },
      ]
    },

    // ── Estructura del texto ────────────────────────────────
    {
      id: 'u-estructura-texto',
      title: 'Cómo escribir un texto',
      subtitle: 'inledning · huvuddel · avslutning',
      icon: '📄',
      color: '#8B5CF6',
      level: 'D',
      grammarTopicId: 'estructura-texto',
      cards: [
        { title: 'La idea', body: 'Un buen texto no es soltar frases: tiene <strong>tres partes</strong>, como un sándwich. En sueco se llaman <strong>inledning</strong> (introducción), <strong>huvuddel</strong> (desarrollo) y <strong>avslutning</strong> (cierre). 📄' },
        { title: '1. Inledning (introducción)', body: 'Es el comienzo. Aquí <strong>presentas el tema</strong> y captas el interés del lector. Corto: una o dos frases que digan de qué vas a hablar. <em>«I den här texten ska jag skriva om…»</em> (En este texto voy a escribir sobre…).' },
        { title: '2. Huvuddel (desarrollo)', body: 'Es el cuerpo, la parte más larga. Aquí <strong>desarrollas tus ideas</strong>, das ejemplos y razones. Cada idea nueva en un <strong>stycke</strong> (párrafo) nuevo, para que se lea claro.' },
        { title: '3. Avslutning (cierre)', body: 'El final. <strong>Resumes</strong> lo dicho y das una conclusión. No metas ideas nuevas aquí. <em>«Sammanfattningsvis…»</em> (En resumen…) es una buena forma de empezarlo.' },
        { title: 'El truco', body: 'Antes de escribir, piensa las tres partes: ¿de qué hablo? (inledning), ¿qué digo? (huvuddel), ¿cómo cierro? (avslutning). Y no olvides la <strong>rubrik</strong> (título) arriba. ¡A practicar! 💪' },
      ]
    },

    // ── Conectores del texto ────────────────────────────────
    {
      id: 'u-conectores',
      title: 'Conectores del texto',
      subtitle: 'dessutom, däremot, därför, slutligen',
      icon: '🔗',
      color: '#8B5CF6',
      level: 'D',
      grammarTopicId: 'conectores',
      cards: [
        { title: 'La idea', body: 'Los <strong>sambandsord</strong> (conectores) son el hilo que une tu texto. Sin ellos, las frases suenan cortadas; con ellos, todo fluye. Son la marca de un texto de nivel. 🔗' },
        { title: 'Para sumar y ejemplificar', body: '<strong>dessutom</strong> = además. <strong>också</strong> = también. <strong>till exempel</strong> (t.ex.) = por ejemplo. <br><em>Svenska är nyttigt. <strong>Dessutom</strong> är det roligt.</em> (El sueco es útil. Además es divertido.)' },
        { title: 'Para contrastar', body: '<strong>däremot</strong> = en cambio. <strong>å andra sidan</strong> = por otro lado. <strong>ändå</strong> = aun así. <strong>dock</strong> = sin embargo. <br>Sirven para mostrar las dos caras de un tema.' },
        { title: 'Para razón y cierre', body: '<strong>därför</strong> = por eso. <strong>alltså</strong> = por lo tanto. <strong>slutligen</strong> = finalmente. <br><em><strong>Slutligen</strong> vill jag säga…</em> (Finalmente quiero decir…) — perfecto para la avslutning.' },
        { title: 'Ojo con el orden', body: 'Si empiezas la frase con un conector, recuerda la regla del segundo puesto: el verbo va justo después. <br><em><strong>Dessutom</strong> <u>är</u> det billigt</em> (Además es barato). ¡A practicar! 💪' },
      ]
    },

    // ── Argumentar y dar tu opinión ─────────────────────────
    {
      id: 'u-argumentar',
      title: 'Argumentar y dar tu opinión',
      subtitle: 'Enligt min åsikt… För det första…',
      icon: '💭',
      color: '#8B5CF6',
      level: 'D',
      grammarTopicId: 'argumentar',
      cards: [
        { title: 'La idea', body: 'Un <strong>texto argumentativo</strong> defiende una opinión con razones. Es de lo más pedido en SFI D y en la vida (una carta al periódico, un correo de queja). Se trata de decir <strong>qué piensas</strong> y <strong>por qué</strong>. 💭' },
        { title: 'Presentar tu opinión', body: 'Frases para abrir: <br><em><strong>Enligt min åsikt</strong>…</em> = en mi opinión… <br><em>Jag <strong>tycker att</strong>…</em> = creo que… <br><em>Jag <strong>anser att</strong>…</em> = considero que… (más formal).' },
        { title: 'Ordenar tus argumentos', body: 'En la huvuddel, ordena las razones: <br><em><strong>För det första</strong>…</em> = en primer lugar… <br><em><strong>För det andra</strong>…</em> = en segundo lugar… <br>Cada «argument» explica <strong>por qué</strong> piensas así.' },
        { title: 'Acuerdo y contraargumento', body: '<em>Jag <strong>håller med</strong></em> = estoy de acuerdo · <em>Jag <strong>håller inte med</strong></em> = no lo estoy. <br>Un texto fuerte también menciona el <strong>motargument</strong> (lo que diría el otro lado) y lo responde. Eso te hace convincente.' },
        { title: 'Cerrar con fuerza', body: 'En la avslutning, resume tu postura: <br><em>Sammanfattningsvis tycker jag att…</em> (En resumen, creo que…). <br>Deja claro qué quieres que el lector piense. ¡A practicar! 💪' },
      ]
    },

    // ── Lenguaje formal e informal ──────────────────────────
    {
      id: 'u-formal-informal',
      title: 'Lenguaje formal e informal',
      subtitle: 'Cuándo escribir «något» y no «nåt»',
      icon: '🎩',
      color: '#8B5CF6',
      level: 'D',
      grammarTopicId: 'formal-informal',
      cards: [
        { title: 'La idea', body: 'No se escribe igual un mensaje a un amigo que un correo a una oficina. Saber cambiar de <strong>registro</strong> (formal / informal) es señal de dominio del idioma. 🎩' },
        { title: 'Habla vs. escritura', body: 'Muchas palabras se dicen «cortas» pero se <strong>escriben completas</strong>: <br>«nåt» → se escribe <strong>något</strong>. <br>«sen» → <strong>sedan</strong>. <br>«dom» → <strong>de</strong> o <strong>dem</strong>. <br>En un texto formal, usa siempre la forma completa.' },
        { title: 'Saludos y despedidas', body: 'Informal: <em>Hej! / Tjena! … Ha det bra!</em> <br>Formal (un correo): abre con <em>Hej</em> y cierra con <strong>Med vänliga hälsningar</strong> (MVH) = saludos cordiales.' },
        { title: 'El «du» sueco', body: 'Buena noticia: en Suecia se trata de <strong>du</strong> a casi todos, incluso a desconocidos o al jefe. No necesitas un «usted». Eso sí, el <strong>tono</strong> sí se cuida: sin jerga ni abreviaturas en lo formal. ¡A practicar! 💪' },
      ]
    },

    // ── Contar lo que otros dicen (referat) ─────────────────
    {
      id: 'u-discurso-referido',
      title: 'Contar lo que otros dicen',
      subtitle: 'Enligt artikeln… Hon säger att…',
      icon: '🗣️',
      color: '#8B5CF6',
      level: 'D',
      grammarTopicId: 'discurso-referido',
      cards: [
        { title: 'La idea', body: 'A menudo necesitas contar lo que <strong>otra persona o una fuente</strong> dice: un artículo, un amigo, una noticia. A eso se le llama <strong>referat</strong> (estilo indirecto), y tiene sus palabras clave. 🗣️' },
        { title: 'Citar una fuente', body: '<strong>enligt</strong> = según: <br><em><strong>Enligt</strong> artikeln är det viktigt</em> = según el artículo, es importante. <br>Perfecto para apoyar tus argumentos con datos de fuera.' },
        { title: 'Contar lo que alguien dijo', body: 'Se usa un verbo de decir + <strong>att</strong>: <br><em>Hon <strong>säger att</strong>…</em> = ella dice que… <br><em>Han <strong>menar att</strong>…</em> = él quiere decir que… <br><em>De <strong>hävdar att</strong>…</em> = ellos afirman que…' },
        { title: 'Los «referatmarkörer»', body: 'Son esas marcas (enligt, säger att, menar att, hävdar att) que avisan: <strong>«esta idea no es mía, es de otro»</strong>. Usarlas bien hace que tu texto sea claro y honesto sobre de dónde viene cada idea. ¡A practicar! 💪' },
      ]
    },

    // ── Los participios ─────────────────────────────────────
    {
      id: 'u-participios',
      title: 'Los participios',
      subtitle: 'en leende flicka, ett växande problem',
      icon: '🌀',
      color: '#8B5CF6',
      level: 'D',
      grammarTopicId: 'participios',
      cards: [
        { title: 'La idea', body: 'Los participios son formas del verbo que funcionan como <strong>adjetivos</strong>: describen algo por lo que hace o por lo que le hicieron. Le dan riqueza a tu sueco. 🌀' },
        { title: 'Participio de presente (-ande/-ende)', body: 'Describe algo que <strong>está haciendo</strong> la acción. Se forma sumando <strong>-nde</strong>: <br><em>le → <strong>leende</strong></em> (sonriente): <em>en leende flicka</em>. <br><em>växa → <strong>växande</strong></em> (creciente): <em>ett växande problem</em>.' },
        { title: 'Participio de pasado', body: 'Describe algo <strong>ya hecho</strong> (como un adjetivo): <br><em>en <strong>stängd</strong> dörr</em> = una puerta cerrada. <br><em>en <strong>målad</strong> vägg</em> = una pared pintada. <br>Y concuerda: <em>ett <strong>skrivet</strong> brev</em> (una carta escrita).' },
        { title: 'Para qué sirven', body: 'Con participios dices en una palabra lo que si no necesitaría una frase entera: <em>«rinnande vatten»</em> (agua corriente) en vez de «agua que corre». Es lenguaje de nivel avanzado. ¡Enorme trabajo llegar hasta aquí! 🎉' },
      ]
    },
  ]
};


// ═══════════════════════════════════════════════════════════
//  GRAMMAR EXTRA — más preguntas para Intermedio (C) y Avanzado (D)
//  Se inyectan en los temas existentes al cargar (más variedad).
// ═══════════════════════════════════════════════════════════
const GRAMMAR_EXTRA = {
  // ───── INTERMEDIO (C) ─────
  'subordinadas': [
    { type: 'mc', text: '«Llámame cuando llegues» → «Ring mig ___ du kommer»', options: ['när', 'om', 'att'], correct: 0, explanation: '«när» = cuando.' },
    { type: 'mc', text: '«Si llueve, me quedo en casa» → «___ det regnar, stannar jag hemma»', options: ['Om', 'När', 'Att'], correct: 0, explanation: '«Om» = si (condición).' },
    { type: 'mc', text: '«El coche que compré» → «Bilen ___ jag köpte»', options: ['som', 'att', 'vilken'], correct: 0, explanation: '«som» = que (relativo).' },
    { type: 'type', prompt: '«que» (relativo, mannen ___ bor här):', answer: 'som', accept: [], explanation: '«som».' },
    { type: 'type', prompt: '«si» (condición):', answer: 'om', accept: [], explanation: '«om».' },
    { type: 'order', prompt: 'Ordena: «No sé si él viene»', words: ['Jag', 'vet', 'inte', 'om', 'han', 'kommer'], answer: ['Jag', 'vet', 'inte', 'om', 'han', 'kommer'], explanation: '«Jag vet inte om han kommer».' },
  ],
  'avanzado': [
    { type: 'mc', text: '«La comida se cocina» → «Maten ___»', options: ['lagas', 'lagar', 'lagade'], correct: 0, explanation: '«lagas» = se cocina (pasiva con -s).' },
    { type: 'mc', text: '«un problema conocido» → «ett ___ problem»', options: ['känt', 'känd', 'känna'], correct: 0, explanation: '«ett känt problem». El participio concuerda: känd (en) → känt (ett).' },
    { type: 'mc', text: '«Hay comida en la mesa» → «___ finns mat på bordet»', options: ['Det', 'Den', 'De'], correct: 0, explanation: '«Det finns…» = hay…' },
    { type: 'type', prompt: 'Terminación de la voz pasiva (una letra):', answer: 's', accept: [], explanation: '«-s»: lagas, öppnas.' },
    { type: 'type', prompt: '«llueve» → «___ regnar»:', answer: 'det', accept: [], explanation: '«Det regnar».' },
    { type: 'order', prompt: 'Ordena: «Aquí se habla sueco»', words: ['Här', 'talas', 'svenska'], answer: ['Här', 'talas', 'svenska'], explanation: '«Här talas svenska» (pasiva).' },
  ],
  'partikelverb': [
    { type: 'mc', text: '«visitar (a alguien)» → ___', options: ['hälsa på', 'hälsa', 'på hälsa'], correct: 0, explanation: '«hälsa på» = visitar. «hälsa» solo = saludar.' },
    { type: 'mc', text: '«ponerse (ropa)» → ___', options: ['ta på sig', 'ta', 'sig ta'], correct: 0, explanation: '«ta på sig» = ponerse (ropa).' },
    { type: 'mc', text: '«Enciende la luz» → «___ lampan»', options: ['Slå på', 'Slå', 'På slå'], correct: 0, explanation: '«Slå på lampan» = enciende la luz.' },
    { type: 'type', prompt: '«encender»:', answer: 'slå på', accept: [], explanation: '«slå på».' },
    { type: 'type', prompt: '«apagar»:', answer: 'stänga av', accept: [], explanation: '«stänga av».' },
    { type: 'order', prompt: 'Ordena: «Me pongo la chaqueta»', words: ['Jag', 'tar', 'på', 'mig', 'jackan'], answer: ['Jag', 'tar', 'på', 'mig', 'jackan'], explanation: '«Jag tar på mig jackan».' },
  ],
  'condicional': [
    { type: 'mc', text: '«Me gustaría viajar» → «Jag skulle vilja ___»', options: ['resa', 'reser', 'reste'], correct: 0, explanation: 'Tras «skulle vilja» va la forma base: resa.' },
    { type: 'mc', text: '«Sería mejor» → «Det skulle ___ bättre»', options: ['vara', 'är', 'var'], correct: 0, explanation: '«Det skulle vara bättre» = sería mejor.' },
    { type: 'mc', text: '«¿Podrías abrir la ventana?» → «___ du kunna öppna fönstret?»', options: ['Skulle', 'Ska', 'Vill'], correct: 0, explanation: '«Skulle du kunna…?» = ¿podrías…? (muy cortés).' },
    { type: 'type', prompt: 'La palabra del condicional («-ría»):', answer: 'skulle', accept: [], explanation: '«skulle».' },
    { type: 'type', prompt: '«querría» (cortés):', answer: 'skulle vilja', accept: [], explanation: '«skulle vilja».' },
    { type: 'order', prompt: 'Ordena: «Compraría una casa grande»', words: ['Jag', 'skulle', 'köpa', 'ett', 'stort', 'hus'], answer: ['Jag', 'skulle', 'köpa', 'ett', 'stort', 'hus'], explanation: '«Jag skulle köpa ett stort hus».' },
  ],
  'verbos-preposicion': [
    { type: 'mc', text: '«creer en» → «tro ___»', options: ['på', 'i', 'om'], correct: 0, explanation: '«tro på» = creer en.' },
    { type: 'mc', text: '«depender de» → «bero ___»', options: ['på', 'av', 'om'], correct: 0, explanation: '«bero på» = depender de.' },
    { type: 'mc', text: '«invitar / convidar a algo» → «bjuda ___»', options: ['på', 'till', 'med'], correct: 0, explanation: '«bjuda på» = invitar/convidar (Jag bjuder på kaffe).' },
    { type: 'type', prompt: '«pensar en» → «tänka ___»:', answer: 'på', accept: [], explanation: '«tänka på».' },
    { type: 'type', prompt: '«escuchar» → «lyssna ___»:', answer: 'på', accept: [], explanation: '«lyssna på».' },
    { type: 'order', prompt: 'Ordena: «Creo en ti»', words: ['Jag', 'tror', 'på', 'dig'], answer: ['Jag', 'tror', 'på', 'dig'], explanation: '«Jag tror på dig».' },
  ],
  'conjunciones-avanzadas': [
    { type: 'mc', text: '«después de que» → ___', options: ['efter att', 'innan', 'medan'], correct: 0, explanation: '«efter att» = después de que.' },
    { type: 'mc', text: '«Hablo despacio para que entiendas» → «…___ du förstår»', options: ['så att', 'fastän', 'medan'], correct: 0, explanation: '«så att» = para que.' },
    { type: 'mc', text: '«Aunque es caro, lo compro» → «___ det är dyrt, köper jag det»', options: ['Fastän', 'Eftersom', 'Medan'], correct: 0, explanation: '«Fastän» = aunque.' },
    { type: 'type', prompt: '«mientras»:', answer: 'medan', accept: [], explanation: '«medan».' },
    { type: 'type', prompt: '«para que / así que»:', answer: 'så att', accept: [], explanation: '«så att».' },
    { type: 'order', prompt: 'Ordena: «Leo antes de dormir»', words: ['Jag', 'läser', 'innan', 'jag', 'sover'], answer: ['Jag', 'läser', 'innan', 'jag', 'sover'], explanation: '«Jag läser innan jag sover».' },
  ],
  'palabras-compuestas': [
    { type: 'mc', text: '«zapatilla de deporte» = sport + sko =', options: ['sportsko', 'skosport', 'sport sko'], correct: 0, explanation: '«sportsko» = zapatilla deportiva.' },
    { type: 'mc', text: '«parada de autobús» = buss + hållplats =', options: ['busshållplats', 'hållplatsbuss', 'buss hållplats'], correct: 0, explanation: '«busshållplats» = parada de autobús.' },
    { type: 'mc', text: '«mesa de cocina» = köks + bord =', options: ['köksbord', 'bordköks', 'köks bord'], correct: 0, explanation: '«köksbord» = mesa de cocina.' },
    { type: 'type', prompt: '«parada de autobús» (buss + hållplats):', answer: 'busshållplats', accept: [], explanation: '«busshållplats».' },
    { type: 'type', prompt: '«mesa de cocina» (köks + bord):', answer: 'köksbord', accept: [], explanation: '«köksbord».' },
    { type: 'order', prompt: 'Ordena: «Espero en la parada»', words: ['Jag', 'väntar', 'vid', 'busshållplatsen'], answer: ['Jag', 'väntar', 'vid', 'busshållplatsen'], explanation: '«Jag väntar vid busshållplatsen».' },
  ],
  'adjetivo-definido': [
    { type: 'mc', text: '«la casa blanca» (ett hus) → «det ___ huset»', options: ['vita', 'vitt', 'vit'], correct: 0, explanation: '«det vita huset». En definido el adjetivo va en -a, aunque sea «ett».' },
    { type: 'mc', text: '«los niños pequeños» → «de ___ barnen»', options: ['små', 'liten', 'litet'], correct: 0, explanation: '«de små barnen». «liten» es irregular: plural/definido → «små».' },
    { type: 'mc', text: '«el hombre viejo» (en man) → «den ___ mannen»', options: ['gamla', 'gammal', 'gammalt'], correct: 0, explanation: '«den gamla mannen». Definido → -a: gamla.' },
    { type: 'type', prompt: 'La forma definida del adjetivo termina casi siempre en (una letra):', answer: 'a', accept: [], explanation: '«-a»: vita, stora, nya.' },
    { type: 'type', prompt: '«el… blanco» (en bil): «den ___ bilen»:', answer: 'vita', accept: [], explanation: '«den vita bilen».' },
    { type: 'order', prompt: 'Ordena: «Me gusta la casa roja»', words: ['Jag', 'gillar', 'det', 'röda', 'huset'], answer: ['Jag', 'gillar', 'det', 'röda', 'huset'], explanation: '«Jag gillar det röda huset».' },
  ],

  // ───── AVANZADO (D) ─────
  'estructura-texto': [
    { type: 'mc', text: '«En resumen…» (para cerrar el texto) → ___', options: ['Sammanfattningsvis', 'Först', 'Till exempel'], correct: 0, explanation: '«Sammanfattningsvis» = en resumen. Perfecto para la avslutning.' },
    { type: 'mc', text: 'Cada párrafo (stycke) debería tratar…', options: ['una idea principal', 'muchas ideas mezcladas'], correct: 0, explanation: 'Un párrafo = una idea. Así el texto se lee claro.' },
    { type: 'mc', text: 'El título de un texto se llama…', options: ['rubrik', 'stycke', 'inledning'], correct: 0, explanation: '«rubrik» = título.' },
    { type: 'type', prompt: '«introducción» en sueco:', answer: 'inledning', accept: [], explanation: '«inledning».' },
    { type: 'type', prompt: '«desarrollo / parte principal» en sueco:', answer: 'huvuddel', accept: [], explanation: '«huvuddel».' },
    { type: 'order', prompt: 'Ordena: «Escribo la conclusión al final»', words: ['Jag', 'skriver', 'avslutningen', 'till', 'slut'], answer: ['Jag', 'skriver', 'avslutningen', 'till', 'slut'], explanation: '«Jag skriver avslutningen till slut».' },
  ],
  'conectores': [
    { type: 'mc', text: '«también» → ___', options: ['också', 'dock', 'ändå'], correct: 0, explanation: '«också» = también.' },
    { type: 'mc', text: '«primero… luego» → «först… ___»', options: ['sedan', 'slutligen', 'dessutom'], correct: 0, explanation: '«sedan» = luego/después.' },
    { type: 'mc', text: '«Estaba cansado. ___, terminé» (aun así)', options: ['Ändå', 'Dessutom', 'Alltså'], correct: 0, explanation: '«Ändå» = aun así.' },
    { type: 'type', prompt: '«además»:', answer: 'dessutom', accept: [], explanation: '«dessutom».' },
    { type: 'type', prompt: '«finalmente / por último»:', answer: 'slutligen', accept: [], explanation: '«slutligen».' },
    { type: 'order', prompt: 'Ordena: «Además, es barato»', words: ['Dessutom', 'är', 'det', 'billigt'], answer: ['Dessutom', 'är', 'det', 'billigt'], explanation: '«Dessutom är det billigt».' },
  ],
  'argumentar': [
    { type: 'mc', text: '«En segundo lugar…» → ___', options: ['För det andra', 'För det första', 'Till slut'], correct: 0, explanation: '«För det andra» = en segundo lugar.' },
    { type: 'mc', text: '«Considero que…» (formal) → «Jag ___ att…»', options: ['anser', 'frågar', 'svarar'], correct: 0, explanation: '«Jag anser att…» = considero que… (más formal que «tycker»).' },
    { type: 'mc', text: '«por un lado» → «å ena ___»', options: ['sidan', 'handen', 'sida'], correct: 0, explanation: '«å ena sidan» = por un lado.' },
    { type: 'type', prompt: '«opinión» en sueco:', answer: 'åsikt', accept: [], explanation: '«åsikt».' },
    { type: 'type', prompt: '«no estoy de acuerdo» → «Jag håller ___ med»:', answer: 'inte', accept: [], explanation: '«håller inte med».' },
    { type: 'order', prompt: 'Ordena: «Considero que es caro»', words: ['Jag', 'anser', 'att', 'det', 'är', 'dyrt'], answer: ['Jag', 'anser', 'att', 'det', 'är', 'dyrt'], explanation: '«Jag anser att det är dyrt».' },
  ],
  'formal-informal': [
    { type: 'mc', text: '«dem» se usa cuando la palabra es…', options: ['objeto (los / les)', 'sujeto (ellos)'], correct: 0, explanation: '«dem» = objeto (Jag ser dem). «de» = sujeto.' },
    { type: 'mc', text: '«de» se usa cuando la palabra es…', options: ['sujeto (ellos)', 'objeto (los)'], correct: 0, explanation: '«de» = sujeto (De kommer). Ambos suenan «dom».' },
    { type: 'mc', text: '«typ», «ba» son ejemplos de…', options: ['jerga (informal)', 'lenguaje formal'], correct: 0, explanation: 'Son muletillas coloquiales; evítalas en textos formales.' },
    { type: 'type', prompt: 'Despedida formal de un correo (3 palabras):', answer: 'med vänliga hälsningar', accept: ['mvh'], explanation: '«Med vänliga hälsningar».' },
    { type: 'type', prompt: 'Forma escrita de «dom» cuando es sujeto:', answer: 'de', accept: [], explanation: '«de» (sujeto).' },
    { type: 'order', prompt: 'Ordena: «Gracias por tu respuesta»', words: ['Tack', 'för', 'ditt', 'svar'], answer: ['Tack', 'för', 'ditt', 'svar'], explanation: '«Tack för ditt svar».' },
  ],
  'discurso-referido': [
    { type: 'mc', text: '«alegar / pretender / afirmar» → ___', options: ['påstå', 'fråga', 'svara'], correct: 0, explanation: '«påstå» = afirmar/alegar (a veces con duda).' },
    { type: 'mc', text: '«Ella preguntó SI…» → «Hon frågade ___…»', options: ['om', 'att', 'när'], correct: 0, explanation: '«Hon frågade om…» = ella preguntó si…' },
    { type: 'mc', text: '«según yo / en mi opinión» → «Enligt ___»', options: ['mig', 'jag', 'min'], correct: 0, explanation: '«Enligt mig» = según yo.' },
    { type: 'type', prompt: '«según» (citar fuente):', answer: 'enligt', accept: [], explanation: '«enligt».' },
    { type: 'type', prompt: '«dice que» → «säger ___»:', answer: 'att', accept: [], explanation: '«säger att».' },
    { type: 'order', prompt: 'Ordena: «Dice que tiene tiempo»', words: ['Hon', 'säger', 'att', 'hon', 'har', 'tid'], answer: ['Hon', 'säger', 'att', 'hon', 'har', 'tid'], explanation: '«Hon säger att hon har tid».' },
  ],
  'participios': [
    { type: 'mc', text: '«un libro leído» → «en ___ bok»', options: ['läst', 'läsen', 'läsa'], correct: 0, explanation: '«en läst bok». Participio pasado de läsa = läst.' },
    { type: 'mc', text: '«gente trabajadora / que trabaja» → «___ människor»', options: ['arbetande', 'arbetar', 'arbetade'], correct: 0, explanation: '«arbetande» = trabajadora (participio presente de arbeta).' },
    { type: 'mc', text: '«agua hirviendo» → «___ vatten»', options: ['kokande', 'kokar', 'kokade'], correct: 0, explanation: '«kokande vatten» (de koka = hervir).' },
    { type: 'type', prompt: 'Terminación del participio de presente:', answer: 'ande', accept: ['-ande', 'ende', '-ende'], explanation: '«-ande / -ende».' },
    { type: 'type', prompt: '«cerrada» (participio, en «en ___ dörr»):', answer: 'stängd', accept: [], explanation: '«stängd».' },
    { type: 'order', prompt: 'Ordena: «Un niño que llora»', words: ['Ett', 'gråtande', 'barn'], answer: ['Ett', 'gråtande', 'barn'], explanation: '«Ett gråtande barn».' },
  ],
};

// Inyectar las preguntas extra en sus temas (más variedad en la práctica infinita)
try {
  if (typeof GRAMMAR_DATA !== 'undefined' && GRAMMAR_DATA.topics) {
    GRAMMAR_DATA.topics.forEach(t => {
      if (GRAMMAR_EXTRA[t.id]) t.questions = t.questions.concat(GRAMMAR_EXTRA[t.id]);
    });
  }
} catch (e) {}
