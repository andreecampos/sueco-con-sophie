# Audios con la voz de Sophie (ElevenLabs → Supabase Storage)

Tubería para generar la locución de Sophie y publicarla. El contenido (qué palabras/frases) sale de `src/pronData.js`. Los MP3 se guardan en Supabase Storage y la app los reproduce por URL.

## Requisitos (una sola vez)

1. **Node 18+** (para `fetch` nativo).
2. En **Supabase → Storage**, crea un bucket **público** llamado `sophie-audio`.
3. Ten a mano:
   - Tu **API key** de ElevenLabs (Profile → API Keys).
   - El **Voice ID** de la voz clonada de Sophie (ElevenLabs → Voices → la voz → «ID»).
   - Tu **service_role key** de Supabase (Settings → API).

> ⚠️ **Seguridad:** estas claves son secretas y de pago. **Nunca** las pongas en el repositorio ni en el frontend. Se usan solo aquí, en tu computadora.

## Pasos

```bash
# 1) Extraer la lista de audios desde el contenido
node scripts/audio/1-extraer.mjs

# 2) Generar los MP3 con la voz de Sophie (idempotente: no repite los ya hechos)
export ELEVENLABS_API_KEY="sk_..."
export ELEVENLABS_VOICE_ID="voice_id_de_sophie"
node scripts/audio/2-generar.mjs
#   → crea scripts/audio/out/*.mp3

# 3) Subir a Supabase Storage
export SUPABASE_URL="https://nblxzqdtczitpzxdqexz.supabase.co"
export SUPABASE_SERVICE_KEY="service_role_key"
node scripts/audio/3-subir.mjs
```

Listo: la sección **Uttal (Pronunciación)** de la app ya reproducirá los audios.

## Cómo añadir más audios después

1. Agrega palabras/frases nuevas en `src/pronData.js` (o, más adelante, en las lecturas de Läsa).
2. Vuelve a correr los 3 pasos. Solo se generan y suben los **nuevos** (los existentes se saltan → no gastas créditos).

## Notas

- Modelo por defecto: `eleven_multilingual_v2` (soporta sueco). Puedes cambiarlo con `export ELEVENLABS_MODEL=...`.
- La app reproduce desde: `https://<proyecto>.supabase.co/storage/v1/object/public/sophie-audio/<key>.mp3`. Si cambias de proyecto/bucket, actualiza `AUDIO_BASE` en `src/app.js`.
- Coste: ElevenLabs cobra por caracteres. La sección de Pronunciación es corta (palabras sueltas), así que gasta muy poco.
