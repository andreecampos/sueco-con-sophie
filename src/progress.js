/* ═══════════════════════════════════════════════════════════════════
   SISTEMA DE PROGRESO UNIFICADO  (Fase 2)
   Único, coherente y escalable para todos los módulos de la plataforma.

   Filosofía:
    · El PORCENTAJE nunca es la fuente de verdad. Se calcula:
        progreso = completadas / total_activo × 100   (limitado 0–100)
    · Los denominadores son DINÁMICOS: se cuentan desde el contenido real
      (THEORY_DATA, GRAMMAR_DATA, DB[].listen, TALA_SITUATIONS). Si añades
      contenido, el denominador cambia solo. No hay números escritos a mano.
    · Repetir una actividad NO sube el progreso por encima de 100 %: una
      actividad cuenta como completada UNA sola vez (status 'completed').
    · Almacén: theory/grammar/listening → Supabase `user_progress`
      (1 fila por alumno+módulo+contenido, upsert). Tala → `tala_progress`
      (ya existente); esta capa la LEE, no la duplica.
    · Carga en UNA sola consulta por sesión (sin N+1).

   Depende de funciones/objetos globales ya existentes:
     sb, window._sbSession, THEORY_DATA, GRAMMAR_DATA, DB, TALA_SITUATIONS,
     talaProgressMap, getTheoryProgress(), getNivelLast()/nivel_resultados,
     LEVEL_LABEL.
   ═══════════════════════════════════════════════════════════════════ */

const SFI_LEVELS = ['A', 'B', 'C', 'D'];
const LEVEL_COLORS = { // identidad visual por nivel
  A: { name: 'Principiante', bar: 'bg-emerald-500', text: 'text-emerald-600', soft: 'bg-emerald-50', border: 'border-emerald-200' },
  B: { name: 'Básico',       bar: 'bg-blue-500',    text: 'text-blue-600',    soft: 'bg-blue-50',    border: 'border-blue-200' },
  C: { name: 'Intermedio',   bar: 'bg-orange-500',  text: 'text-orange-600',  soft: 'bg-orange-50',  border: 'border-orange-200' },
  D: { name: 'Avanzado',     bar: 'bg-purple-500',  text: 'text-purple-600',  soft: 'bg-purple-50',  border: 'border-purple-200' }
};

/* ── Utilidades puras de cálculo/formato ───────────────────────────── */

// Limita 0–100 y evita NaN/Infinity.
function pctClamp(done, total) {
  const d = Number(done) || 0, t = Number(total) || 0;
  if (t <= 0) return 0;
  let p = (d / t) * 100;
  if (!isFinite(p) || isNaN(p)) return 0;
  if (p < 0) return 0;
  if (p > 100) return 100;
  return p;
}

// Formato español: coma decimal, 1 decimal solo si no es entero. Ej: 27.9→"27,9 %", 70→"70 %".
function fmtPct(p) {
  const n = Math.max(0, Math.min(100, Number(p) || 0));
  const rounded = Math.round(n * 10) / 10;
  const isInt = Math.abs(rounded - Math.round(rounded)) < 0.05;
  const str = isInt ? String(Math.round(rounded)) : rounded.toFixed(1).replace('.', ',');
  return str + ' %';
}

/* ── Nivel asignado (prueba de nivel) — reutiliza la fuente existente ─ */

// Devuelve 'A'|'B'|'C'|'D'. Preferimos el resultado de la prueba (nivel_resultados,
// cacheado en scs_nivel_last). Si no hay, 'A'.
let _assignedDB = null; // nivel más alto guardado en Supabase (nivel_resultados)
function setAssignedLevelDB(lv) {
  if (lv && SFI_LEVELS.indexOf(String(lv).toUpperCase()[0]) >= 0) _assignedDB = String(lv).toUpperCase()[0];
}
function assignedLevel() {
  let lv = 'A';
  try {
    const last = (typeof getNivelLast === 'function') ? getNivelLast() : null;
    const nv = last && last.nivel ? String(last.nivel).toUpperCase().replace('SFI', '').trim() : null;
    if (nv && SFI_LEVELS.includes(nv[0])) lv = nv[0];
  } catch (e) {}
  // Supabase manda si es más alto (robusto entre dispositivos).
  if (_assignedDB && SFI_LEVELS.indexOf(_assignedDB) > SFI_LEVELS.indexOf(lv)) lv = _assignedDB;
  return lv;
}

// ¿El alumno ya hizo la prueba de nivel? (localStorage o Supabase)
function hasLevelTest() {
  try { if (typeof getNivelLast === 'function' && getNivelLast()) return true; } catch (e) {}
  return !!_assignedDB;
}

// Progreso combinado de un nivel (todos los módulos): cuánto avanzó el alumno en ese nivel.
function levelProgress(lv) {
  let done = 0, total = 0;
  PROGRESS_MODULES.forEach(m => {
    const bl = moduleProgress(m.key).byLevel[lv];
    if (bl) { done += bl.done; total += bl.total; }
  });
  return { done, total, pct: pctClamp(done, total), available: levelAvailable(lv) };
}

// Conteo ENTERO de actividades completadas (para mostrar al usuario, nunca decimales).
function completedCount() {
  let n = 0;
  ['theory', 'listening', 'tala', 'grammar'].forEach(m => {
    moduleItems(m).forEach(it => { if (isCompleted(m, it.id)) n++; });
  });
  return n;
}
// Total de actividades activas disponibles para el alumno (denominador entero).
function totalActivities() {
  let t = 0;
  PROGRESS_MODULES.forEach(m => { t += moduleItems(m.key).filter(it => !it.level || levelAvailable(it.level)).length; });
  return t;
}

// Índice del nivel más alto DISPONIBLE = max(asignado, primer nivel incompleto en la progresión).
// Los niveles inferiores SIEMPRE quedan disponibles (repaso). Nunca se re-bloquea algo ya abierto.
function highestUnlockedIndex() {
  const assignedIdx = SFI_LEVELS.indexOf(assignedLevel());
  // Progresión: se abre el siguiente nivel al completar el actual.
  let progIdx = 0;
  for (let i = 0; i < SFI_LEVELS.length; i++) {
    if (levelFullyComplete(SFI_LEVELS[i])) progIdx = i + 1; else break;
  }
  return Math.max(assignedIdx, Math.min(progIdx, SFI_LEVELS.length - 1));
}

// ¿El alumno tiene disponible este nivel? (por prueba de nivel O por progresión)
function levelAvailable(level) {
  const i = SFI_LEVELS.indexOf(level);
  if (i < 0) return true;
  return i <= highestUnlockedIndex();
}

// ¿Están completas TODAS las actividades (de todos los módulos con nivel) de este nivel?
// Se usa para la progresión de desbloqueo entre niveles.
function levelFullyComplete(level) {
  let total = 0, done = 0;
  ['theory', 'listening', 'tala'].forEach(m => {
    const items = moduleItems(m).filter(it => it.level === level);
    total += items.length;
    done += items.filter(it => isCompleted(m, it.id)).length;
  });
  return total > 0 && done >= total;
}

/* ── Registro de módulos: denominadores dinámicos desde el contenido ── */

// Cada módulo expone sus ítems completables como {id, level}. Solo contenido ACTIVO.
function moduleItems(moduleKey) {
  try {
    switch (moduleKey) {
      case 'theory': {
        const units = (typeof THEORY_DATA !== 'undefined' && THEORY_DATA.units) ? THEORY_DATA.units : [];
        return units.filter(u => u && u.active !== false).map(u => ({ id: String(u.id), level: u.level || null }));
      }
      case 'grammar': {
        const topics = (typeof GRAMMAR_DATA !== 'undefined' && GRAMMAR_DATA.topics) ? GRAMMAR_DATA.topics : [];
        return topics.filter(t => t && t.active !== false).map(t => ({ id: String(t.id || t.key || t.title), level: t.level || null }));
      }
      case 'listening': {
        // Hörförståelse vive en HORST_DATA.levels (los audios se irán agregando).
        const out = [];
        if (typeof HORST_DATA !== 'undefined' && HORST_DATA.levels) SFI_LEVELS.forEach(lv => {
          const arr = HORST_DATA.levels[lv] || [];
          arr.forEach((ep, i) => out.push({ id: lv + ':' + (ep.id || i), level: lv }));
        });
        return out;
      }
      case 'tala': {
        const sits = (typeof TALA_SITUATIONS !== 'undefined') ? TALA_SITUATIONS : [];
        return sits.filter(s => s && s.active !== false).map(s => ({ id: String(s.id), level: s.level || null }));
      }
      default: return [];
    }
  } catch (e) { return []; }
}

// Lista de módulos "estructurales" que cuentan para el progreso general.
const PROGRESS_MODULES = [
  { key: 'theory',    label: 'Teoría',              icon: '📖' },
  { key: 'grammar',   label: 'Practicar gramática', icon: '🎯' },
  { key: 'listening', label: 'Hörförståelse',       icon: '🎧' },
  { key: 'tala',      label: 'Tala',                icon: '🗣️' }
];

/* ── Estado de un ítem (fuente unificada, sin duplicar) ────────────── */

// Caché en memoria del progreso de user_progress (theory/grammar/listening).
// Clave: moduleType + '|' + contentId
let UNIFIED_PROGRESS = {};
let UNIFIED_LOADED = false;

function _upKey(m, id) { return m + '|' + id; }

// ¿Ítem completado? Tala se lee de talaProgressMap; el resto de UNIFIED_PROGRESS.
function isCompleted(moduleKey, contentId) {
  if (moduleKey === 'tala') {
    try { return !!(talaProgressMap && talaProgressMap[contentId] && talaProgressMap[contentId].completed); }
    catch (e) { return false; }
  }
  const row = UNIFIED_PROGRESS[_upKey(moduleKey, contentId)];
  return !!(row && row.status === 'completed');
}
function itemStatus(moduleKey, contentId) {
  if (isCompleted(moduleKey, contentId)) return 'completed';
  let row = null;
  if (moduleKey === 'tala') { try { row = talaProgressMap[contentId]; } catch (e) {} }
  else row = UNIFIED_PROGRESS[_upKey(moduleKey, contentId)];
  if (row && (row.status === 'in_progress' || (row.current_step > 0) || (row.progress_value > 0))) return 'in_progress';
  return 'not_started';
}

/* ── Cálculo de progreso por módulo / por nivel / general ──────────── */

// { done, total, pct, byLevel:{A:{done,total,pct}, ...} }
// onlyAvailable=true → el denominador considera solo niveles desbloqueados para el alumno.
function moduleProgress(moduleKey, opts) {
  opts = opts || {};
  // Gramática: progreso fraccional por tema (% dominado), sube gradual.
  if (moduleKey === 'grammar' && typeof grammarTopicPct === 'function') {
    const topics = moduleItems('grammar').filter(it => (!opts.onlyAvailable || !it.level || levelAvailable(it.level)));
    const byLevel = {}; SFI_LEVELS.forEach(lv => byLevel[lv] = { done: 0, total: 0, pct: 0 });
    let doneFrac = 0;
    topics.forEach(it => {
      const f = grammarTopicPct(it.id) / 100;
      doneFrac += f;
      if (it.level && byLevel[it.level]) { byLevel[it.level].total++; byLevel[it.level].done += f; }
    });
    SFI_LEVELS.forEach(lv => { byLevel[lv].pct = byLevel[lv].total ? pctClamp(byLevel[lv].done, byLevel[lv].total) : 0; });
    return { done: doneFrac, total: topics.length, pct: pctClamp(doneFrac, topics.length), byLevel };
  }
  const items = moduleItems(moduleKey).filter(it => {
    if (opts.onlyAvailable && it.level) return levelAvailable(it.level);
    return true;
  });
  const byLevel = {};
  SFI_LEVELS.forEach(lv => { byLevel[lv] = { done: 0, total: 0, pct: 0 }; });
  let done = 0;
  items.forEach(it => {
    const c = isCompleted(moduleKey, it.id);
    if (c) done++;
    if (it.level && byLevel[it.level]) { byLevel[it.level].total++; if (c) byLevel[it.level].done++; }
  });
  SFI_LEVELS.forEach(lv => { byLevel[lv].pct = pctClamp(byLevel[lv].done, byLevel[lv].total); });
  return { done, total: items.length, pct: pctClamp(done, items.length), byLevel };
}

// Progreso general = suma de completadas / suma de activas disponibles (ponderado por volumen real).
// Solo cuenta contenido de niveles desbloqueados para el alumno.
function overallProgress() {
  let done = 0, total = 0;
  PROGRESS_MODULES.forEach(m => {
    const p = moduleProgress(m.key, { onlyAvailable: true });
    done += p.done; total += p.total;
  });
  return { done, total, pct: pctClamp(done, total) };
}

/* ── Capa de datos Supabase (una sola consulta) ────────────────────── */

async function loadUnifiedProgress() {
  UNIFIED_PROGRESS = {};
  const s = window._sbSession;
  if (!s || !s.id || typeof sb === 'undefined') { UNIFIED_LOADED = true; return; }
  try {
    const { data } = await sb.from('user_progress').select('*').eq('user_id', s.id);
    (data || []).forEach(r => { UNIFIED_PROGRESS[_upKey(r.module_type, r.content_id)] = r; });
  } catch (e) {}
  UNIFIED_LOADED = true;
  try { await backfillLocalProgress(); } catch (e) {}
}

// Marca un ítem. status por defecto 'completed'. Idempotente (upsert, no crea filas nuevas al repetir).
async function progressMark(moduleKey, contentId, fields) {
  fields = fields || {};
  const s = window._sbSession;
  const id = String(contentId);
  const prev = UNIFIED_PROGRESS[_upKey(moduleKey, id)] || {};
  const status = fields.status || 'completed';
  const row = {
    module_type: moduleKey,
    content_id: id,
    level: fields.level != null ? fields.level : (prev.level || null),
    status,
    progress_value: fields.progress_value != null ? fields.progress_value : (status === 'completed' ? 100 : (prev.progress_value || 0)),
    score: fields.score != null ? Math.max(prev.score || 0, fields.score) : (prev.score != null ? prev.score : null),
    attempts: (prev.attempts || 0) + (fields.countAttempt ? 1 : 0),
    updated_at: new Date().toISOString()
  };
  if (status === 'completed' && !prev.completed_at) row.completed_at = new Date().toISOString();
  if (!prev.started_at) row.started_at = new Date().toISOString();
  // Actualiza caché primero (UI instantánea, sin recargar)
  UNIFIED_PROGRESS[_upKey(moduleKey, id)] = { ...prev, ...row, user_id: s && s.id };
  if (!s || !s.id || typeof sb === 'undefined') return;
  try { await sb.from('user_progress').upsert({ user_id: s.id, ...row }, { onConflict: 'user_id,module_type,content_id' }); } catch (e) {}
}

// Conveniencia: marcar completado.
function markCompleted(moduleKey, contentId, level, score) {
  return progressMark(moduleKey, contentId, { status: 'completed', level: level || null, score });
}

/* ── Backfill idempotente desde localStorage (no se pierde progreso) ── */

async function backfillLocalProgress() {
  const s = window._sbSession;
  if (!s || !s.id) return;
  // Teoría: sc_theory { unitId: {done:true, bestScore} }
  try {
    const tp = (typeof getTheoryProgress === 'function') ? getTheoryProgress() : {};
    for (const uid in tp) {
      if (tp[uid] && tp[uid].done && !isCompleted('theory', uid)) {
        const unit = (THEORY_DATA.units || []).find(u => String(u.id) === String(uid));
        await progressMark('theory', uid, { status: 'completed', level: unit ? unit.level : null, score: tp[uid].bestScore || 0 });
      }
    }
  } catch (e) {}
}

/* ── Helpers de render reutilizables (HTML string; sin frameworks) ──── */

// Barra de progreso. colorKey opcional (A/B/C/D) para color por nivel.
function progressBar(pct, colorKey) {
  const c = (colorKey && LEVEL_COLORS[colorKey]) ? LEVEL_COLORS[colorKey].bar : 'bg-swe-blue';
  const w = Math.max(0, Math.min(100, Number(pct) || 0));
  return `<div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden"><div class="h-full ${c} rounded-full" style="width:${w}%;transition:width .4s ease"></div></div>`;
}
// Porcentaje en texto (chip pequeño para esquina de tarjeta).
function progressPercentage(pct, extraClass) {
  return `<span class="text-sm font-black text-swe-blue ${extraClass || ''}">${fmtPct(pct)}</span>`;
}
// Insignia/ícono según estado.
function contentStatusIcon(status) {
  if (status === 'completed') return '<span class="text-green-500" title="Completada">✓</span>';
  if (status === 'in_progress') return '<span class="text-amber-500" title="En progreso">◑</span>';
  if (status === 'locked') return '<span class="text-gray-400" title="Bloqueada">🔒</span>';
  return '<span class="text-gray-300" title="Sin comenzar">○</span>';
}
function completionBadge() {
  return '<span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ Completada</span>';
}
// Mensaje de contenido bloqueado.
function lockedContentMessage(reason) {
  return `<div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 font-semibold">🔒 ${reason}</div>`;
}

// Expone a window para que app.js (inline) las use.
if (typeof window !== 'undefined') {
  Object.assign(window, {
    SFI_LEVELS, LEVEL_COLORS, PROGRESS_MODULES,
    pctClamp, fmtPct, assignedLevel, setAssignedLevelDB, levelAvailable, levelFullyComplete, highestUnlockedIndex,
    levelProgress, completedCount, totalActivities, hasLevelTest,
    moduleItems, isCompleted, itemStatus, moduleProgress, overallProgress,
    loadUnifiedProgress, progressMark, markCompleted, backfillLocalProgress,
    progressBar, progressPercentage, contentStatusIcon, completionBadge, lockedContentMessage
  });
}
