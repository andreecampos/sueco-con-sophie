// Paso 1: extrae de src/pronData.js la lista de audios a generar.
// Genera scripts/audio/manifest.json = [{ key, text }]
// Uso:  node scripts/audio/1-extraer.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '../..');

function loadConst(file, name) {
  const src = fs.readFileSync(path.join(repo, file), 'utf8');
  // El archivo define `const <name> = {...}`. Lo evaluamos en un scope aislado.
  return new Function(src + `\n; return ${name};`)();
}

const manifest = [];
const seen = new Set();
function add(key, text) {
  if (!key || !text) return;
  if (seen.has(key)) return;
  seen.add(key);
  manifest.push({ key, text });
}

// ── Pronunciación (Uttal) ──
try {
  const PRON = loadConst('src/pronData.js', 'PRON_DATA');
  (PRON.categories || []).forEach(cat => (cat.items || []).forEach(it => add(it.key, it.say || it.sv)));
  console.log('Pronunciación:', (PRON.categories || []).reduce((n, c) => n + (c.items || []).length, 0), 'ítems');
} catch (e) { console.error('No se pudo leer pronData.js:', e.message); }

// (En el futuro aquí se pueden añadir lecturas de Läsa, vocabulario, etc.)

fs.writeFileSync(path.join(__dirname, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('✅ manifest.json con', manifest.length, 'audios.');
