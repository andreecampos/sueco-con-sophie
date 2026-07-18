// Paso 3: sube los MP3 de scripts/audio/out/ a Supabase Storage (bucket público).
//
// Antes de correr, exporta (NO guardar en el repo):
//   export SUPABASE_URL="https://nblxzqdtczitpzxdqexz.supabase.co"
//   export SUPABASE_SERVICE_KEY="tu_service_role_key"   (Settings → API → service_role)
//   export BUCKET="sophie-audio"                        (opcional; por defecto sophie-audio)
//
// El bucket debe existir y ser PÚBLICO (créalo en Supabase → Storage → New bucket → Public).
// Uso:  node scripts/audio/3-subir.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = process.env.BUCKET || 'sophie-audio';

if (!URL || !KEY) {
  console.error('❌ Falta SUPABASE_URL o SUPABASE_SERVICE_KEY.');
  process.exit(1);
}

const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) { console.error('No existe la carpeta out/. Corre primero 2-generar.mjs'); process.exit(1); }
const files = fs.readdirSync(outDir).filter(f => f.endsWith('.mp3'));

let ok = 0, fail = 0;
for (const f of files) {
  const buf = fs.readFileSync(path.join(outDir, f));
  try {
    const res = await fetch(`${URL}/storage/v1/object/${BUCKET}/${f}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'audio/mpeg', 'x-upsert': 'true' },
      body: buf
    });
    if (res.ok) { ok++; console.log('⬆️ ', f); }
    else { fail++; console.error('❌', f, res.status, (await res.text()).slice(0, 200)); }
  } catch (e) { fail++; console.error('❌', f, e.message); }
}
console.log(`\nSubidos: ${ok} · Errores: ${fail}`);
console.log(`URL pública de ejemplo: ${URL}/storage/v1/object/public/${BUCKET}/${files[0] || '<key>.mp3'}`);
