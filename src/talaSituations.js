/* ═══════════════════════════════════════════════════════════════════
   TALA — Conversaciones interactivas (ordenar palabras, estilo Duolingo)
   El contenido vive aquí (en código) → 0 espacio en la base de datos.
   El progreso se guarda en la tabla `tala_progress` (1 fila por alumno+situación).

   Reglas de nivel:
     · SFI A, B → se muestran las traducciones al español (npcEs / answerEs).
     · SFI C, D → todo en sueco; las explicaciones/pistas siguen en español.
     · Desbloqueo: hay que completar TODAS las situaciones de un nivel para
       abrir el siguiente (A → B → C → D).

   Estructura de cada situación:
     id, title, icon, level ('A'|'B'|'C'|'D'), context, intro
     steps[]:  npc, npcEs, answer[], distractors[], answerEs, hint, explain
   ═══════════════════════════════════════════════════════════════════ */

const TALA_SITUATIONS = [

  /* ═══════════════ NIVEL SFI A ═══════════════ */
  {
    id: 'supermercado', title: 'En el supermercado', icon: '🛒', level: 'A',
    context: 'Compras comida y hablas con el empleado (butiksbiträde).',
    intro: 'Entras a ICA. Necesitas leche, pan y manzanas.',
    steps: [
      { npc: 'Hej och välkommen! Vad söker du?', npcEs: '¡Hola y bienvenido! ¿Qué buscas?', answer: ['Hej','jag','söker','mjölk'], distractors: ['bok','är'], answerEs: 'Hola, busco leche.', hint: 'Empieza saludando con "Hej".', explain: 'Orden normal: Sujeto + Verbo → "jag söker" (yo busco).' },
      { npc: 'Mjölken står där borta i kylen. Något mer?', npcEs: 'La leche está allá en el refrigerador. ¿Algo más?', answer: ['Ja','jag','behöver','bröd'], distractors: ['nej','har'], answerEs: 'Sí, necesito pan.', hint: '"behöver" = necesito.', explain: '"behöva" = necesitar. Con "jag" → "behöver".' },
      { npc: 'Vi har färskt bröd här. Vill du ha något annat?', npcEs: 'Tenemos pan fresco. ¿Quieres algo más?', answer: ['Har','ni','äpplen','?'], distractors: ['jag','du'], answerEs: '¿Tienen manzanas?', hint: 'En preguntas sí/no el verbo va primero.', explain: 'Pregunta sí/no: verbo PRIMERO → "Har ni äpplen?"' },
      { npc: 'Ja, äpplena ligger vid frukten.', npcEs: 'Sí, están junto a la fruta.', answer: ['Hur','mycket','kostar','äpplena','?'], distractors: ['är','du'], answerEs: '¿Cuánto cuestan las manzanas?', hint: '"Hur mycket kostar...?"', explain: 'Forma fija para precios: "Hur mycket kostar det?"' },
      { npc: 'Äpplena kostar 25 kronor kilot.', npcEs: 'Cuestan 25 coronas el kilo.', answer: ['Jag','tar','ett','kilo'], distractors: ['två','är'], answerEs: 'Me llevo un kilo.', hint: '"Jag tar..." = me llevo...', explain: '"ett kilo" porque "kilo" es ett-ord (neutro).' },
      { npc: 'Perfekt. Något mer idag?', npcEs: 'Perfecto. ¿Algo más hoy?', answer: ['Nej','tack','det','är','allt'], distractors: ['ja','mer'], answerEs: 'No gracias, es todo.', hint: '"Det är allt" = es todo.', explain: '"Det är allt" cierra el pedido con cortesía.' },
      { npc: 'Då blir det 89 kronor.', npcEs: 'Entonces son 89 coronas.', answer: ['Kan','jag','betala','med','kort','?'], distractors: ['kontant','du'], answerEs: '¿Puedo pagar con tarjeta?', hint: 'Empieza con el verbo "Kan".', explain: 'Pregunta: verbo primero; "med kort" = con tarjeta.' },
      { npc: 'Javisst, du kan betala med kort.', npcEs: 'Claro, puedes pagar con tarjeta.', answer: ['Här','är','mitt','kort'], distractors: ['din','är'], answerEs: 'Aquí está mi tarjeta.', hint: '"Här är..." = aquí está...', explain: '"mitt kort" porque "kort" es ett-ord (mi → mitt).' },
      { npc: 'Tack! Vill du ha kvitto?', npcEs: '¡Gracias! ¿Quieres el recibo?', answer: ['Ja','tack','gärna'], distractors: ['nej','inte'], answerEs: 'Sí, con gusto.', hint: '"gärna" = con gusto.', explain: '"Ja tack, gärna" es una forma cortés de aceptar.' },
      { npc: 'Varsågod. Ha en bra dag!', npcEs: '¡Aquí tienes. Buen día!', answer: ['Tack','detsamma','!'], distractors: ['hej','nej'], answerEs: '¡Gracias, igualmente!', hint: '"detsamma" = igualmente.', explain: '"Tack, detsamma!" devuelve el buen deseo.' }
    ]
  },
  {
    id: 'lakartid', title: 'Pedir cita médica', icon: '🏥', level: 'A',
    context: 'En el centro de salud (vårdcentralen).',
    intro: 'Te duele la garganta desde hace días. Llama para pedir una cita.',
    steps: [
      { npc: 'Vårdcentralen, hej! Hur kan jag hjälpa dig?', npcEs: 'Centro de salud, ¡hola! ¿Cómo puedo ayudarte?', answer: ['Hej','jag','vill','boka','en','tid'], distractors: ['är','har'], answerEs: 'Hola, quiero reservar una cita.', hint: '"vill boka" = quiero reservar.', explain: '"vill" + infinitivo → "vill boka" (quiero reservar).' },
      { npc: 'Javisst. Vad heter du?', npcEs: 'Claro. ¿Cómo te llamas?', answer: ['Jag','heter','Ana','Ruiz'], distractors: ['är','du'], answerEs: 'Me llamo Ana Ruiz.', hint: '"Jag heter..."', explain: '"Jag heter..." para decir tu nombre.' },
      { npc: 'Vad är problemet?', npcEs: '¿Cuál es el problema?', answer: ['Jag','har','ont','i','halsen'], distractors: ['huvudet','är'], answerEs: 'Me duele la garganta.', hint: '"ha ont i..." = tener dolor en...', explain: '"Jag har ont i halsen" = me duele la garganta.' },
      { npc: 'Hur länge har du haft ont?', npcEs: '¿Cuánto llevas con dolor?', answer: ['I','tre','dagar'], distractors: ['två','timmar'], answerEs: 'Desde hace tres días.', hint: '"i tre dagar" = durante tres días.', explain: '"i + tiempo" indica duración.' },
      { npc: 'Har du feber?', npcEs: '¿Tienes fiebre?', answer: ['Ja','jag','har','lite','feber'], distractors: ['nej','mycket'], answerEs: 'Sí, tengo un poco de fiebre.', hint: '"lite" = un poco.', explain: '"lite feber" = un poco de fiebre.' },
      { npc: 'Kan du komma på tisdag klockan 14?', npcEs: '¿Puedes venir el martes a las 14?', answer: ['Ja','det','passar','bra'], distractors: ['nej','dåligt'], answerEs: 'Sí, me viene bien.', hint: '"det passar bra" = me viene bien.', explain: '"passa" = venir bien / convenir.' },
      { npc: 'Var bor du?', npcEs: '¿Dónde vives?', answer: ['Jag','bor','på','Vasagatan','8'], distractors: ['i','gatan'], answerEs: 'Vivo en Vasagatan 8.', hint: '"bo på" + calle.', explain: 'Con calles se usa "på": "bor på Vasagatan".' },
      { npc: 'Perfekt. Då ses vi på tisdag!', npcEs: '¡Perfecto. Nos vemos el martes!', answer: ['Tack','så','mycket','hej','då'], distractors: ['nej','igen'], answerEs: 'Muchas gracias, adiós.', hint: '"Tack så mycket" + "hej då".', explain: '"hej då" = adiós.' }
    ]
  },
  {
    id: 'restaurang', title: 'En el restaurante', icon: '🍽️', level: 'A',
    context: 'Pides comida y pagas.',
    intro: 'Llegas a un restaurante sueco a cenar solo/a.',
    steps: [
      { npc: 'Hej och välkommen! Ett bord för en?', npcEs: '¡Bienvenido! ¿Una mesa para uno?', answer: ['Ja','tack','för','en','person'], distractors: ['två','nej'], answerEs: 'Sí, para una persona.', hint: '"för en person" = para una persona.', explain: '"för + número + person".' },
      { npc: 'Varsågod och sitt. Här är menyn.', npcEs: 'Siéntate. Aquí está el menú.', answer: ['Tack','kan','jag','få','vatten'], distractors: ['öl','nej'], answerEs: 'Gracias, ¿me trae agua?', hint: '"Kan jag få...?" = ¿me da...?', explain: '"Kan jag få..." es la forma cortés de pedir.' },
      { npc: 'Självklart. Vill du beställa nu?', npcEs: 'Claro. ¿Quieres pedir ya?', answer: ['Ja','jag','tar','köttbullar'], distractors: ['nej','dricka'], answerEs: 'Sí, tomo albóndigas.', hint: '"jag tar" para pedir un plato.', explain: '"jag tar..." = yo tomo/pido...' },
      { npc: 'Bra val! Något att dricka?', npcEs: '¡Buena elección! ¿Algo de beber?', answer: ['Ja','en','läsk','tack'], distractors: ['nej','kaffe'], answerEs: 'Sí, un refresco, gracias.', hint: '"en läsk" = un refresco.', explain: '"läsk" = refresco.' },
      { npc: 'Kommer strax. Smaklig måltid!', npcEs: 'Enseguida. ¡Buen provecho!', answer: ['Tack','så','mycket'], distractors: ['nej','igen'], answerEs: 'Muchas gracias.', hint: 'Cortesía.', explain: '"Tack så mycket" = muchas gracias.' },
      { npc: 'Smakade det bra?', npcEs: '¿Estuvo bueno?', answer: ['Ja','det','var','jättegott'], distractors: ['nej','dåligt'], answerEs: 'Sí, estuvo riquísimo.', hint: '"jättegott" = riquísimo.', explain: '"jätte-" intensifica → "jättegott".' },
      { npc: 'Vad kul! Vill du ha notan?', npcEs: '¡Qué bien! ¿Quieres la cuenta?', answer: ['Ja','kan','jag','betala','med','kort'], distractors: ['kontant','nej'], answerEs: 'Sí, ¿puedo pagar con tarjeta?', hint: 'Pregunta: verbo primero.', explain: '"Kan jag betala med kort?"' },
      { npc: 'Absolut. Varsågod!', npcEs: 'Claro. ¡Aquí tienes!', answer: ['Tack','ha','en','bra','dag'], distractors: ['natt','nej'], answerEs: 'Gracias, buen día.', hint: 'Despedida.', explain: '"Ha en bra dag" = que tengas buen día.' }
    ]
  },

  /* ═══════════════ NIVEL SFI B ═══════════════ */
  {
    id: 'jobbintervju', title: 'Entrevista de trabajo', icon: '💼', level: 'B',
    context: 'Te presentas ante quien te contrata.',
    intro: 'Tienes una entrevista para un trabajo en un restaurante.',
    steps: [
      { npc: 'Hej och välkommen! Slå dig ner.', npcEs: '¡Bienvenido! Toma asiento.', answer: ['Tack','för','att','jag','fick','komma'], distractors: ['nej','gå'], answerEs: 'Gracias por recibirme.', hint: '"Tack för att..." = gracias por que...', explain: '"Tack för att jag fick komma" = gracias por dejarme venir.' },
      { npc: 'Kan du berätta lite om dig själv?', npcEs: '¿Puedes contarme sobre ti?', answer: ['Jag','heter','Carlos','och','kommer','från','Peru'], distractors: ['är','bor'], answerEs: 'Me llamo Carlos y vengo de Perú.', hint: 'Une con "och" (y).', explain: 'Presentación: "heter... och kommer från...".' },
      { npc: 'Vad har du för arbetslivserfarenhet?', npcEs: '¿Qué experiencia laboral tienes?', answer: ['Jag','har','jobbat','som','kock'], distractors: ['är','servitör'], answerEs: 'He trabajado como cocinero.', hint: '"har jobbat" = he trabajado.', explain: 'Perfecto: "har + participio" → "har jobbat".' },
      { npc: 'Varför söker du det här jobbet?', npcEs: '¿Por qué buscas este trabajo?', answer: ['Jag','vill','lära','mig','nya','saker'], distractors: ['gamla','inte'], answerEs: 'Quiero aprender cosas nuevas.', hint: '"lära mig" = aprender (reflexivo).', explain: '"lära sig" es reflexivo → "lära mig".' },
      { npc: 'Vilka språk pratar du?', npcEs: '¿Qué idiomas hablas?', answer: ['Jag','pratar','spanska','och','lite','svenska'], distractors: ['mycket','engelska'], answerEs: 'Hablo español y un poco de sueco.', hint: '"lite" = un poco.', explain: '"lite svenska" = un poco de sueco.' },
      { npc: 'Kan du jobba helger?', npcEs: '¿Puedes trabajar fines de semana?', answer: ['Ja','det','går','bra'], distractors: ['nej','inte'], answerEs: 'Sí, está bien.', hint: '"det går bra" = está bien.', explain: '"det går bra" = se puede / está bien.' },
      { npc: 'Har du några frågor till oss?', npcEs: '¿Tienes preguntas para nosotros?', answer: ['När','kan','jag','börja','?'], distractors: ['var','vem'], answerEs: '¿Cuándo puedo empezar?', hint: 'Pregunta con "När" + verbo.', explain: '"När kan jag börja?" = ¿cuándo puedo empezar?' },
      { npc: 'Vi hör av oss nästa vecka. Tack för idag!', npcEs: 'Te contactamos la próxima semana. ¡Gracias!', answer: ['Tack','för','din','tid'], distractors: ['min','nej'], answerEs: 'Gracias por tu tiempo.', hint: '"din tid" = tu tiempo.', explain: '"Tack för din tid" cierra con cortesía.' }
    ]
  },
  {
    id: 'apotek', title: 'En la farmacia', icon: '💊', level: 'B',
    context: 'Pides un medicamento.',
    intro: 'Tienes dolor de cabeza y vas a la farmacia (apoteket).',
    steps: [
      { npc: 'Hej! Vad kan jag hjälpa dig med?', npcEs: '¡Hola! ¿En qué te ayudo?', answer: ['Hej','jag','behöver','medicin'], distractors: ['vill','bok'], answerEs: 'Hola, necesito medicina.', hint: '"behöver" = necesito.', explain: '"Jag behöver medicin" = necesito medicina.' },
      { npc: 'Vad har du för besvär?', npcEs: '¿Qué molestias tienes?', answer: ['Jag','har','huvudvärk'], distractors: ['ont','feber'], answerEs: 'Tengo dolor de cabeza.', hint: '"huvudvärk" = dolor de cabeza.', explain: '"huvud" (cabeza) + "värk" (dolor).' },
      { npc: 'Har du provat något?', npcEs: '¿Has probado algo?', answer: ['Nej','inte','än'], distractors: ['ja','nu'], answerEs: 'No, todavía no.', hint: '"inte än" = todavía no.', explain: '"inte än" = aún no.' },
      { npc: 'Då rekommenderar jag Alvedon.', npcEs: 'Entonces recomiendo Alvedon.', answer: ['Hur','ofta','ska','jag','ta','den','?'], distractors: ['mycket','när'], answerEs: '¿Cada cuánto debo tomarla?', hint: '"Hur ofta" = con qué frecuencia.', explain: '"Hur ofta ska jag..." = ¿con qué frecuencia debo...?' },
      { npc: 'En tablett var sjätte timme.', npcEs: 'Una pastilla cada seis horas.', answer: ['Kan','jag','ta','den','med','mat','?'], distractors: ['utan','nej'], answerEs: '¿Puedo tomarla con comida?', hint: '"med mat" = con comida.', explain: '"med mat" = con comida.' },
      { npc: 'Ja, det är bra att äta något först.', npcEs: 'Sí, es bueno comer algo antes.', answer: ['Tack','hur','mycket','kostar','det','?'], distractors: ['var','när'], answerEs: 'Gracias, ¿cuánto cuesta?', hint: 'Precio: "Hur mycket kostar det?"', explain: 'Forma fija de precios.' },
      { npc: 'Det blir 49 kronor.', npcEs: 'Son 49 coronas.', answer: ['Jag','betalar','med','kort'], distractors: ['kontant','nej'], answerEs: 'Pago con tarjeta.', hint: '"betalar med kort".', explain: '"Jag betalar med kort" = pago con tarjeta.' },
      { npc: 'Tack. Krya på dig!', npcEs: 'Gracias. ¡Que te mejores!', answer: ['Tack','så','mycket','hej','då'], distractors: ['nej','natt'], answerEs: 'Muchas gracias, adiós.', hint: 'Despedida.', explain: '"Krya på dig" = mejórate (se responde con gracias).' }
    ]
  },
  {
    id: 'transport', title: 'Transporte público', icon: '🚌', level: 'B',
    context: 'Compras billete y preguntas rutas.',
    intro: 'Necesitas ir al centro en autobús.',
    steps: [
      { npc: 'Hej! Vill du köpa en biljett?', npcEs: '¡Hola! ¿Quieres comprar un billete?', answer: ['Ja','en','biljett','till','centrum','tack'], distractors: ['två','från'], answerEs: 'Sí, un billete al centro, gracias.', hint: '"till centrum" = al centro.', explain: '"till" indica destino.' },
      { npc: 'Enkel eller tur och retur?', npcEs: '¿Sencillo o ida y vuelta?', answer: ['Tur','och','retur','tack'], distractors: ['enkel','nej'], answerEs: 'Ida y vuelta, gracias.', hint: '"tur och retur" = ida y vuelta.', explain: '"tur och retur" = ida y vuelta.' },
      { npc: 'Det blir 60 kronor.', npcEs: 'Son 60 coronas.', answer: ['Kan','jag','betala','med','kort','?'], distractors: ['kontant','nej'], answerEs: '¿Puedo pagar con tarjeta?', hint: 'Pregunta: verbo primero.', explain: '"Kan jag betala med kort?"' },
      { npc: 'Javisst. Här är biljetten.', npcEs: 'Claro. Aquí está el billete.', answer: ['Vilken','buss','ska','jag','ta','?'], distractors: ['tåg','var'], answerEs: '¿Qué autobús debo tomar?', hint: '"Vilken buss" = qué autobús.', explain: '"Vilken" = cuál/qué (con en-ord).' },
      { npc: 'Ta buss nummer 4.', npcEs: 'Toma el autobús número 4.', answer: ['Var','är','hållplatsen','?'], distractors: ['när','stationen'], answerEs: '¿Dónde está la parada?', hint: '"hållplats" = parada.', explain: '"Var är...?" = ¿dónde está...?' },
      { npc: 'Den ligger utanför, till höger.', npcEs: 'Está afuera, a la derecha.', answer: ['Hur','lång','tid','tar','det','?'], distractors: ['mycket','när'], answerEs: '¿Cuánto tiempo tarda?', hint: '"Hur lång tid" = cuánto tiempo.', explain: '"Hur lång tid tar det?" = ¿cuánto tarda?' },
      { npc: 'Ungefär tjugo minuter.', npcEs: 'Unos veinte minutos.', answer: ['Tack','för','hjälpen'], distractors: ['nej','din'], answerEs: 'Gracias por la ayuda.', hint: '"Tack för hjälpen".', explain: '"Tack för hjälpen" = gracias por la ayuda.' },
      { npc: 'Ingen orsak. Trevlig resa!', npcEs: 'De nada. ¡Buen viaje!', answer: ['Tack','detsamma'], distractors: ['nej','igen'], answerEs: 'Gracias, igualmente.', hint: '"detsamma" = igualmente.', explain: '"Tack, detsamma" = gracias, igualmente.' }
    ]
  },

  /* ═══════════════ NIVEL SFI C (todo en sueco) ═══════════════ */
  {
    id: 'lagenhet', title: 'Buscar apartamento', icon: '🏠', level: 'C',
    context: 'Hablas con el arrendador (hyresvärd).',
    intro: 'Llamas por un anuncio de un apartamento.',
    steps: [
      { npc: 'Hej, du ringde om lägenheten?', npcEs: '', answer: ['Ja','jag','är','intresserad','av','lägenheten'], distractors: ['huset','nej'], answerEs: '', hint: '"intresserad av" = interesado en.', explain: '"vara intresserad av" = estar interesado en.' },
      { npc: 'Vad bra! Hur många rum söker du?', npcEs: '', answer: ['Jag','söker','två','rum','och','kök'], distractors: ['tre','bad'], answerEs: '', hint: '"rum och kök" = habitaciones y cocina.', explain: 'Los pisos se describen como "rum och kök".' },
      { npc: 'Vi har en tvåa ledig. Vad har du för budget?', npcEs: '', answer: ['Jag','kan','betala','åtta','tusen','i','månaden'], distractors: ['nio','veckan'], answerEs: '', hint: '"i månaden" = al mes.', explain: '"i månaden" = mensualmente.' },
      { npc: 'Det låter bra. När vill du flytta in?', npcEs: '', answer: ['Så','snart','som','möjligt'], distractors: ['aldrig','sent'], answerEs: '', hint: '"så snart som möjligt".', explain: '"så snart som möjligt" = lo antes posible.' },
      { npc: 'Har du fast anställning?', npcEs: '', answer: ['Ja','jag','har','fast','jobb'], distractors: ['nej','löst'], answerEs: '', hint: '"fast jobb" = trabajo fijo.', explain: '"fast anställning/jobb" = empleo fijo.' },
      { npc: 'Kan du visa referenser?', npcEs: '', answer: ['Ja','jag','kan','skicka','dem','imorgon'], distractors: ['igår','nej'], answerEs: '', hint: '"skicka dem" = enviarlas.', explain: '"imorgon" = mañana.' },
      { npc: 'Perfekt. Vill du se lägenheten först?', npcEs: '', answer: ['Ja','gärna','när','passar','det','?'], distractors: ['nej','var'], answerEs: '', hint: '"när passar det?" = ¿cuándo viene bien?', explain: '"passa" = convenir/venir bien.' },
      { npc: 'På lördag klockan elva?', npcEs: '', answer: ['Det','passar','utmärkt','tack'], distractors: ['dåligt','nej'], answerEs: '', hint: '"utmärkt" = excelente.', explain: '"utmärkt" = excelente.' }
    ]
  },
  {
    id: 'bank', title: 'En el banco', icon: '🏦', level: 'C',
    context: 'Abres una cuenta y haces trámites.',
    intro: 'Vas al banco a abrir tu primera cuenta en Suecia.',
    steps: [
      { npc: 'Välkommen till banken. Vad gäller det?', npcEs: '', answer: ['Jag','vill','öppna','ett','konto'], distractors: ['stänga','en'], answerEs: '', hint: '"öppna ett konto" = abrir una cuenta.', explain: '"konto" es ett-ord → "ett konto".' },
      { npc: 'Har du svenskt personnummer?', npcEs: '', answer: ['Ja','jag','har','ett','personnummer'], distractors: ['nej','inget'], answerEs: '', hint: 'Afirma que lo tienes.', explain: '"ett personnummer" (número personal sueco).' },
      { npc: 'Bra. Har du med dig legitimation?', npcEs: '', answer: ['Ja','här','är','mitt','ID-kort'], distractors: ['pass','din'], answerEs: '', hint: '"mitt ID-kort".', explain: '"legitimation" = identificación; "mitt" (ett-ord).' },
      { npc: 'Tack. Vill du ha ett bankkort också?', npcEs: '', answer: ['Ja','det','vill','jag','gärna'], distractors: ['nej','inte'], answerEs: '', hint: '"gärna" = con gusto.', explain: '"Det vill jag gärna" = eso quiero, con gusto.' },
      { npc: 'Vill du ha tillgång till internetbank?', npcEs: '', answer: ['Ja','det','låter','praktiskt'], distractors: ['nej','dåligt'], answerEs: '', hint: '"det låter praktiskt".', explain: '"låta" = sonar/parecer → "suena práctico".' },
      { npc: 'Hur mycket vill du sätta in idag?', npcEs: '', answer: ['Jag','vill','sätta','in','tusen','kronor'], distractors: ['ta','ut'], answerEs: '', hint: '"sätta in" = depositar.', explain: '"sätta in" = ingresar; "ta ut" = retirar.' },
      { npc: 'Klart! Kortet kommer på posten.', npcEs: '', answer: ['När','kommer','det','ungefär','?'], distractors: ['var','vem'], answerEs: '', hint: '"när kommer det?"', explain: '"ungefär" = aproximadamente.' },
      { npc: 'Inom en vecka. Något mer?', npcEs: '', answer: ['Nej','tack','det','var','allt'], distractors: ['ja','mer'], answerEs: '', hint: '"det var allt" = eso era todo.', explain: '"Det var allt" cierra el trámite.' }
    ]
  },

  /* ═══════════════ NIVEL SFI D (todo en sueco, avanzado) ═══════════════ */
  {
    id: 'foraldramote', title: 'Reunión escolar', icon: '🎒', level: 'D',
    context: 'Hablas con la maestra de tu hijo/a (utvecklingssamtal).',
    intro: 'Vas a la reunión de seguimiento escolar de tu hija.',
    steps: [
      { npc: 'Hej och välkommen till utvecklingssamtalet.', npcEs: '', answer: ['Tack','jag','ser','fram','emot','det'], distractors: ['bak','nej'], answerEs: '', hint: '"se fram emot" = esperar con ilusión.', explain: '"se fram emot" = tener ganas de / esperar con ilusión.' },
      { npc: 'Hur trivs ditt barn i skolan?', npcEs: '', answer: ['Hon','trivs','mycket','bra','tycker','jag'], distractors: ['dåligt','han'], answerEs: '', hint: '"trivas" = estar a gusto.', explain: '"trivas" = sentirse a gusto.' },
      { npc: 'Vad tycker du om läxorna?', npcEs: '', answer: ['Ibland','är','de','lite','för','svåra'], distractors: ['alltid','lätta'], answerEs: '', hint: '"för svåra" = demasiado difíciles.', explain: '"för + adjetivo" = demasiado...' },
      { npc: 'Jag förstår. Vi kan ge extra stöd.', npcEs: '', answer: ['Det','skulle','uppskattas','mycket'], distractors: ['inte','aldrig'], answerEs: '', hint: '"skulle uppskattas" (condicional).', explain: '"skulle uppskattas" = se agradecería.' },
      { npc: 'Hur går det med svenskan hemma?', npcEs: '', answer: ['Vi','försöker','prata','svenska','varje','dag'], distractors: ['aldrig','ingen'], answerEs: '', hint: '"försöker prata" = intentamos hablar.', explain: '"försöka" + infinitivo → "försöker prata".' },
      { npc: 'Det är jättebra för språkutvecklingen.', npcEs: '', answer: ['Finns','det','något','vi','kan','göra','mer','?'], distractors: ['mindre','ingen'], answerEs: '', hint: '"Finns det...?" = ¿hay...?', explain: '"Finns det något...?" = ¿hay algo...?' },
      { npc: 'Läs gärna tillsammans varje kväll.', npcEs: '', answer: ['Det','ska','vi','börja','med','direkt'], distractors: ['sluta','aldrig'], answerEs: '', hint: '"börja med" = empezar con.', explain: '"direkt" = enseguida.' },
      { npc: 'Tack för ett bra samtal!', npcEs: '', answer: ['Tack','detsamma','ha','det','bra'], distractors: ['nej','dåligt'], answerEs: '', hint: '"Ha det bra" = que te vaya bien.', explain: '"Ha det bra" es una despedida cordial.' }
    ]
  },
  {
    id: 'myndighet', title: 'Trámite en una agencia', icon: '🗂️', level: 'D',
    context: 'Migrationsverket / Skatteverket.',
    intro: 'Preguntas por el estado de tu solicitud.',
    steps: [
      { npc: 'God morgon. Hur kan jag hjälpa dig?', npcEs: '', answer: ['God','morgon','jag','har','en','fråga'], distractors: ['kväll','inget'], answerEs: '', hint: '"God morgon" = buenos días.', explain: '"Jag har en fråga" = tengo una pregunta.' },
      { npc: 'Javisst. Vad gäller din fråga?', npcEs: '', answer: ['Det','gäller','mitt','uppehållstillstånd'], distractors: ['din','ert'], answerEs: '', hint: '"det gäller" = se trata de.', explain: '"uppehållstillstånd" es ett-ord → "mitt".' },
      { npc: 'Har du ansökt tidigare?', npcEs: '', answer: ['Ja','jag','ansökte','förra','året'], distractors: ['nästa','nej'], answerEs: '', hint: '"ansökte" = solicité (pasado).', explain: 'Pretérito de "ansöka" → "ansökte".' },
      { npc: 'Har du fått något beslut?', npcEs: '', answer: ['Nej','inte','än','tyvärr'], distractors: ['ja','redan'], answerEs: '', hint: '"inte än" = todavía no.', explain: '"tyvärr" = lamentablemente.' },
      { npc: 'Jag ser att ärendet är under handläggning.', npcEs: '', answer: ['Hur','lång','tid','tar','det','vanligtvis','?'], distractors: ['kort','aldrig'], answerEs: '', hint: '"vanligtvis" = normalmente.', explain: '"under handläggning" = en trámite.' },
      { npc: 'Det kan ta upp till sex månader.', npcEs: '', answer: ['Kan','jag','göra','något','under','tiden','?'], distractors: ['ingen','aldrig'], answerEs: '', hint: '"under tiden" = mientras tanto.', explain: '"under tiden" = entretanto.' },
      { npc: 'Se till att din adress är uppdaterad.', npcEs: '', answer: ['Det','ska','jag','kontrollera','direkt'], distractors: ['aldrig','inte'], answerEs: '', hint: '"kontrollera" = comprobar.', explain: '"Se till att..." = asegúrate de que...' },
      { npc: 'Bra. Hör av dig om du undrar något.', npcEs: '', answer: ['Tack','för','hjälpen','ha','en','bra','dag'], distractors: ['nej','natt'], answerEs: '', hint: 'Cierre cortés.', explain: '"Hör av dig" = ponte en contacto.' }
    ]
  }
];

if (typeof window !== 'undefined') window.TALA_SITUATIONS = TALA_SITUATIONS;
