/* ═══════════════════════════════════════════════════════════════════
   PRONUNCIACIÓN (Uttal) — contenido
   Cada ítem tiene un `key` que corresponde a un archivo de audio
   (voz clonada de Sophie) guardado en Supabase Storage:
     https://<proyecto>.supabase.co/storage/v1/object/public/sophie-audio/<key>.mp3
   El texto que locuta Sophie es el campo `say`.
   Para generar/subir los audios, ver scripts/audio/README.md
   ═══════════════════════════════════════════════════════════════════ */
const PRON_DATA = {
  intro: 'Escucha a Sophie y repite en voz alta. La pronunciación mejora con la práctica: escucha, imita y repite.',
  categories: [
    {
      id: 'vokaler', title: 'Las 9 vocales suecas', icon: '🅰️',
      desc: 'El sueco tiene 9 vocales. Las tres especiales (å, ä, ö) y la «u» y la «y» son las más difíciles.',
      items: [
        { key: 'pron_v_a', sv: 'A a', tip: 'Como la «a» española: «katt» (gato).', ex: ['katt', 'glass'], say: 'A. Katt. Glass.' },
        { key: 'pron_v_e', sv: 'E e', tip: 'Como «e», más cerrada en «se».', ex: ['hem', 'se'], say: 'E. Hem. Se.' },
        { key: 'pron_v_i', sv: 'I i', tip: 'Como la «i» española.', ex: ['fisk', 'bil'], say: 'I. Fisk. Bil.' },
        { key: 'pron_v_o', sv: 'O o', tip: '¡Ojo! Suele sonar como «u» española: «bok» ≈ /buk/.', ex: ['bok', 'sol'], say: 'O. Bok. Sol.' },
        { key: 'pron_v_u', sv: 'U u', tip: 'Sonido entre «u» e «i», con labios redondeados.', ex: ['hus', 'buss'], say: 'U. Hus. Buss.' },
        { key: 'pron_v_y', sv: 'Y y', tip: 'Di «i» pero con labios de «u» (como la «u» francesa).', ex: ['ny', 'by'], say: 'Y. Ny. By.' },
        { key: 'pron_v_aa', sv: 'Å å', tip: 'Como una «o» española cerrada.', ex: ['år', 'båt'], say: 'Å. År. Båt.' },
        { key: 'pron_v_ae', sv: 'Ä ä', tip: 'Como una «e» abierta, casi «a».', ex: ['äta', 'här'], say: 'Ä. Äta. Här.' },
        { key: 'pron_v_oe', sv: 'Ö ö', tip: 'Como «e» con labios redondeados (como «eu» en francés).', ex: ['öra', 'kött'], say: 'Ö. Öra. Kött.' }
      ]
    },
    {
      id: 'sj', title: 'El sonido «sj»', icon: '🌬️',
      desc: 'Un sonido soplado, típico del sueco. Aparece en sj-, skj-, stj- y en sk- antes de e, i, y, ä, ö.',
      items: [
        { key: 'pron_sj_sju', sv: 'sju', tip: 'siete', ex: ['sju'], say: 'Sju.' },
        { key: 'pron_sj_sjo', sv: 'sjö', tip: 'lago', ex: ['sjö'], say: 'Sjö.' },
        { key: 'pron_sj_sjalv', sv: 'själv', tip: 'mismo/a', ex: ['själv'], say: 'Själv.' },
        { key: 'pron_sj_stjarna', sv: 'stjärna', tip: 'estrella', ex: ['stjärna'], say: 'Stjärna.' },
        { key: 'pron_sj_skjorta', sv: 'skjorta', tip: 'camisa', ex: ['skjorta'], say: 'Skjorta.' },
        { key: 'pron_sj_skon', sv: 'skön', tip: 'agradable', ex: ['skön'], say: 'Skön.' },
        { key: 'pron_sj_station', sv: 'station', tip: 'estación', ex: ['station'], say: 'Station.' }
      ]
    },
    {
      id: 'tj', title: 'El sonido «tj» / «k» suave', icon: '👅',
      desc: 'Como una «ch» suave. Aparece en tj-, kj- y en k- antes de e, i, y, ä, ö.',
      items: [
        { key: 'pron_tj_tjugo', sv: 'tjugo', tip: 'veinte', ex: ['tjugo'], say: 'Tjugo.' },
        { key: 'pron_tj_tjena', sv: 'tjena', tip: 'hola (informal)', ex: ['tjena'], say: 'Tjena.' },
        { key: 'pron_tj_kott', sv: 'kött', tip: 'carne', ex: ['kött'], say: 'Kött.' },
        { key: 'pron_tj_kyrka', sv: 'kyrka', tip: 'iglesia', ex: ['kyrka'], say: 'Kyrka.' },
        { key: 'pron_tj_kopa', sv: 'köpa', tip: 'comprar', ex: ['köpa'], say: 'Köpa.' },
        { key: 'pron_tj_kar', sv: 'kär', tip: 'enamorado/a', ex: ['kär'], say: 'Kär.' }
      ]
    },
    {
      id: 'ng', title: 'El sonido «ng»', icon: '🔔',
      desc: 'Un sonido nasal suave, sin pronunciar la «g» al final.',
      items: [
        { key: 'pron_ng_ung', sv: 'ung', tip: 'joven', ex: ['ung'], say: 'Ung.' },
        { key: 'pron_ng_lang', sv: 'lång', tip: 'largo/alto', ex: ['lång'], say: 'Lång.' },
        { key: 'pron_ng_sang', sv: 'säng', tip: 'cama', ex: ['säng'], say: 'Säng.' },
        { key: 'pron_ng_tanke', sv: 'tanke', tip: 'pensamiento', ex: ['tanke'], say: 'Tanke.' },
        { key: 'pron_ng_pengar', sv: 'pengar', tip: 'dinero', ex: ['pengar'], say: 'Pengar.' }
      ]
    },
    {
      id: 'svara', title: 'Palabras difíciles', icon: '🧗',
      desc: 'Las palabras que a todos les cuestan. Escúchalas varias veces.',
      items: [
        { key: 'pron_sv_sjukskoterska', sv: 'sjuksköterska', tip: 'enfermera (¡la más famosa!)', ex: ['sjuksköterska'], say: 'Sjuksköterska.' },
        { key: 'pron_sv_kottbullar', sv: 'köttbullar', tip: 'albóndigas', ex: ['köttbullar'], say: 'Köttbullar.' },
        { key: 'pron_sv_tradgard', sv: 'trädgård', tip: 'jardín', ex: ['trädgård'], say: 'Trädgård.' },
        { key: 'pron_sv_sjuttiosju', sv: 'sjuttiosju', tip: 'setenta y siete', ex: ['sjuttiosju'], say: 'Sjuttiosju.' },
        { key: 'pron_sv_forlat', sv: 'förlåt', tip: 'perdón', ex: ['förlåt'], say: 'Förlåt.' },
        { key: 'pron_sv_ursakta', sv: 'ursäkta', tip: 'disculpa', ex: ['ursäkta'], say: 'Ursäkta.' },
        { key: 'pron_sv_choklad', sv: 'choklad', tip: 'chocolate', ex: ['choklad'], say: 'Choklad.' },
        { key: 'pron_sv_restaurang', sv: 'restaurang', tip: 'restaurante', ex: ['restaurang'], say: 'Restaurang.' }
      ]
    },
    {
      id: 'fraser', title: 'Saludos y frases útiles', icon: '👋',
      desc: 'Frases del día a día con buena pronunciación.',
      items: [
        { key: 'pron_fr_hej', sv: 'Hej', tip: 'Hola', ex: ['Hej'], say: 'Hej.' },
        { key: 'pron_fr_hejda', sv: 'Hej då', tip: 'Adiós', ex: ['Hej då'], say: 'Hej då.' },
        { key: 'pron_fr_tack', sv: 'Tack', tip: 'Gracias', ex: ['Tack'], say: 'Tack.' },
        { key: 'pron_fr_tacksamycket', sv: 'Tack så mycket', tip: 'Muchas gracias', ex: ['Tack så mycket'], say: 'Tack så mycket.' },
        { key: 'pron_fr_forlat', sv: 'Förlåt', tip: 'Perdón', ex: ['Förlåt'], say: 'Förlåt.' },
        { key: 'pron_fr_ursakta', sv: 'Ursäkta', tip: 'Disculpe', ex: ['Ursäkta'], say: 'Ursäkta.' },
        { key: 'pron_fr_varsagod', sv: 'Varsågod', tip: 'De nada / aquí tienes', ex: ['Varsågod'], say: 'Varsågod.' },
        { key: 'pron_fr_trevligt', sv: 'Trevligt att träffas', tip: 'Encantado de conocerte', ex: ['Trevligt att träffas'], say: 'Trevligt att träffas.' }
      ]
    }
  ]
};
if (typeof window !== 'undefined') window.PRON_DATA = PRON_DATA;
