// Paso 2: genera los MP3 con la voz clonada de Sophie (ElevenLabs).
// Lee manifest.json y guarda scripts/audio/out/<key>.mp3 (idempotente: no regenera lo ya hecho).
//
// Antes de correr, exporta tus variables (NO las guardes en el repo):
//   export ELEVENLABS_API_KEY="tu_api_key"
//   export ELEVENLABS_VOICE_ID="id_de_la_voz_de_sophie"
// Uso:  node scripts/audio/2-generar.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID;
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2'; // soporta sueco

if (!API || !VOICE) {
  console.error('❌ Falta ELEVENLABS_API_KEY o ELEVENLABS_VOICE_ID.');
  console.error('   Ejemplo: export ELEVENLABS_API_KEY="..."; export ELEVENLABS_VOICE_ID="..."');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
const outDir = path.join(__dirname, 'out');
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, skip = 0, fail = 0;
for (const { key, text } of manifest) {
  const file = path.join(outDir, key + '.mp3');
  if (fs.existsSync(file)) { skip++; continue; }
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'xi-api-key': API, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: { stability: 0.5, similarity_boost: 0.85, style: 0.0, use_speaker_boost: true }
      })
    });
    if (!res.ok) { fail++; console.error('❌', key, res.status, (await res.text()).slice(0, 200)); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(file, buf);
    ok++; console.log('✅', key, `(${(buf.length / 1024).toFixed(0)} KB)`);
    await new Promise(r => setTimeout(r, 300)); // pausa suave entre llamadas
  } catch (e) { fail++; console.error('❌', key, e.message); }
}
console.log(`\nListo. Nuevos: ${ok} · Ya existían: ${skip} · Errores: ${fail}`);
console.log('Los MP3 están en scripts/audio/out/. Siguiente paso: node scripts/audio/3-subir.mjs');
