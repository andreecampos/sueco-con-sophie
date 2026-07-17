/* ═══════════════════════════════════════════════════════════════════
   SISTEMA DE LOGROS  (Medallas + Otros logros)
   Sueco con Sophie

   Filosofía (misma que progress.js):
    · Las DEFINICIONES viven en el repositorio (este archivo), NO en la
      base de datos. Editar un umbral = editar una línea aquí.
    · El estado (ganado / progreso) se CALCULA al vuelo desde datos que YA
      guardas (exam_progress, user_progress, vocabulary_progress,
      tala_progress). Para 8 de 9 logros no se guarda NINGUNA fila nueva.
    · Medalla de nivel = aprobar el Examen Final del nivel (examStatus) Y
      tener ≥ 50 % del contenido de ese nivel completado (levelProgress).
      Así la medalla garantiza que el alumno estudió Y lo demostró.

   Depende de globales existentes: examStatus, levelProgress, SFI_LEVELS,
   moduleItems, isCompleted, vocabProgressMap, talaProgressMap,
   getStudyStreak, isAdminUser, fmtPct.
   ═══════════════════════════════════════════════════════════════════ */

// ── Umbrales de "Otros logros" (edítalos aquí, en una sola línea) ──────
const ACH_MEDAL_MIN_CONTENT = 50;   // % de contenido del nivel para la medalla
const ACH_STREAK_DAYS       = 30;   // días seguidos para la racha
const ACH_WORDS_MASTERED    = 100;  // palabras dominadas en Vokabulär
const ACH_AUDIOS_DONE       = 20;   // audios de Hörförståelse completados
const ACH_CONVERS_DONE      = 20;   // conversaciones (Tala) completadas

// ── Colores/etiquetas de cada medalla de nivel ────────────────────────
const MEDAL_META = {
  A: { key: 'bronce',   label: 'Bronce',   sub: 'Principiante', color: '#A9713B' },
  B: { key: 'plata',    label: 'Plata',    sub: 'Básico',       color: '#7C8794' },
  C: { key: 'oro',      label: 'Oro',      sub: 'Intermedio',   color: '#C79A1E' },
  D: { key: 'diamante', label: 'Diamante', sub: 'Avanzado',     color: '#3B82C4' }
};

// Modo previsualización (solo admin): muestra todo desbloqueado.
let _logrosPreview = false;

/* ── Contadores derivados de datos ya cargados ─────────────────────── */

function _countCompleted(moduleKey) {
  try { return moduleItems(moduleKey).filter(it => isCompleted(moduleKey, it.id)).length; }
  catch (e) { return 0; }
}
function _countVocabMastered() {
  try { return Object.values(vocabProgressMap || {}).filter(r => r && r.status === 'mastered').length; }
  catch (e) { return 0; }
}
function _streakDays() {
  try { return (typeof getStudyStreak === 'function') ? (Number(getStudyStreak()) || 0) : 0; }
  catch (e) { return 0; }
}

/* ── ¿Está ganada la medalla de un nivel? ─────────────────────────── */
// Regla: examen aprobado (examStatus.medal) Y ≥ 50 % del contenido del nivel.
function medalEarned(level) {
  try {
    const ex = (typeof examStatus === 'function') ? examStatus(level) : { medal: false };
    if (!ex.medal) return false;
    const lp = (typeof levelProgress === 'function') ? levelProgress(level) : { pct: 0 };
    return (lp.pct || 0) >= ACH_MEDAL_MIN_CONTENT;
  } catch (e) { return false; }
}
// Texto de "qué te falta" para una medalla no ganada.
function medalHint(level) {
  try {
    const ex = (typeof examStatus === 'function') ? examStatus(level) : { medal: false, passes: 0, required: 4 };
    const lp = (typeof levelProgress === 'function') ? levelProgress(level) : { pct: 0 };
    const okContent = (lp.pct || 0) >= ACH_MEDAL_MIN_CONTENT;
    if (!ex.medal && !okContent) return `Estudia el ${ACH_MEDAL_MIN_CONTENT}% del nivel y aprueba el Examen Final ${ex.required} veces.`;
    if (!ex.medal) return `Aprueba el Examen Final ${ex.required} veces (llevas ${ex.passes}/${ex.required}).`;
    return `Completa el ${ACH_MEDAL_MIN_CONTENT}% del contenido (llevas ${fmtPct(lp.pct)}).`;
  } catch (e) { return 'Sigue avanzando para conseguirla.'; }
}

/* ── Catálogo de "Otros logros" (calculados) ──────────────────────── */
// Cada uno: { id, icon, bg, title, desc, done() -> nº, goal }
function otherAchievements() {
  const medalsCount = SFI_LEVELS.filter(lv => medalEarned(lv)).length;
  return [
    { id: 'streak_30',  icon: '🔥', bg: '#DBEAFE', title: 'Racha de ' + ACH_STREAK_DAYS + ' días', desc: 'Aprende ' + ACH_STREAK_DAYS + ' días seguidos', done: _streakDays(), goal: ACH_STREAK_DAYS },
    { id: 'words',      icon: '📚', bg: '#EDE9FE', title: ACH_WORDS_MASTERED + ' palabras dominadas', desc: 'Domina ' + ACH_WORDS_MASTERED + ' palabras en Vokabulär', done: _countVocabMastered(), goal: ACH_WORDS_MASTERED },
    { id: 'audios',     icon: '🎧', bg: '#FEF3C7', title: ACH_AUDIOS_DONE + ' audios completados', desc: '¡Eres todo oídos!', done: _countCompleted('listening'), goal: ACH_AUDIOS_DONE },
    { id: 'convers',    icon: '💬', bg: '#DCFCE7', title: 'Conversaciones reales', desc: 'Completa ' + ACH_CONVERS_DONE + ' conversaciones', done: _countCompleted('tala'), goal: ACH_CONVERS_DONE },
    { id: 'master',     icon: '🏆', bg: '#FEE2E2', title: 'Maestro del sueco', desc: 'Consigue las 4 medallas de nivel', done: medalsCount, goal: 4 }
  ];
}
function otherEarned(a) { return _logrosPreview || (a.done >= a.goal); }

/* ── Render de la sección de Logros ───────────────────────────────── */

function _medalCard(level) {
  const m = MEDAL_META[level];
  const earned = _logrosPreview || medalEarned(level);
  const gray = earned ? '' : 'filter grayscale opacity-40';
  const img = `<img src="badges/${m.key}.webp" alt="${m.label}" class="w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto ${gray}" style="transition:.3s" onerror="this.style.display='none'">`;
  const chk = earned ? '<span class="absolute top-0 right-1 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow">✓</span>' : '';
  return `
    <button onclick="openMedalPreview('${level}')" class="flex flex-col items-center text-center card-hover">
      <div class="relative">${img}${chk}</div>
      <div class="font-black text-gray-800 text-base mt-1" style="${earned ? 'color:' + m.color : ''}">${m.label}</div>
      <div class="text-sm font-bold text-gray-700">SFI ${level}</div>
      <div class="text-xs text-gray-400">${m.sub}</div>
    </button>`;
}

function _otherRow(a) {
  const earned = otherEarned(a);
  const pct = Math.max(0, Math.min(100, Math.round((a.done / a.goal) * 100)));
  const right = earned
    ? '<span class="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow flex-shrink-0">✓</span>'
    : `<span class="text-xs font-bold text-gray-400 flex-shrink-0">${Math.min(a.done, a.goal)}/${a.goal}</span>`;
  const bar = earned ? '' :
    `<div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1.5"><div class="h-full bg-swe-blue rounded-full" style="width:${pct}%"></div></div>`;
  return `
    <div class="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 ${earned ? '' : 'opacity-80'}">
      <span class="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:${a.bg}">${a.icon}</span>
      <div class="flex-1 min-w-0">
        <div class="font-black text-gray-800 text-sm leading-tight">${a.title}</div>
        <div class="text-xs text-gray-500">${a.desc}</div>
        ${bar}
      </div>
      ${right}
    </div>`;
}

function renderLogros() {
  const el = document.getElementById('logros-content');
  if (!el) return;
  const admin = (typeof isAdminUser === 'function') && isAdminUser();
  const totalMedals = SFI_LEVELS.filter(lv => _logrosPreview || medalEarned(lv)).length;
  const others = otherAchievements();
  const gotOthers = others.filter(otherEarned).length;

  const adminBar = admin ? `
    <button onclick="toggleLogrosPreview()" class="w-full mb-4 py-2.5 rounded-xl font-bold text-sm ${_logrosPreview ? 'bg-swe-blue text-white' : 'bg-violet-100 text-violet-700'} flex items-center justify-center gap-2">
      👁 ${_logrosPreview ? 'Viendo como alumno (todo desbloqueado) — salir' : 'Ver como alumno (previsualizar todo)'}
    </button>` : '';

  el.innerHTML = `
    ${adminBar}
    <div class="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-5">
      <div class="flex items-center justify-between mb-4">
        <div class="font-black text-gray-800">Medallas de nivel</div>
        <div class="text-xs font-bold text-swe-blue bg-blue-50 px-2.5 py-1 rounded-full">${totalMedals}/4</div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${SFI_LEVELS.map(lv => _medalCard(lv)).join('')}
      </div>
      <div class="mt-3 text-center text-xs text-gray-400">Toca una medalla para verla y saber cómo conseguirla.</div>
      <div class="mt-4 text-[11px] text-gray-400 leading-snug">Cada medalla se consigue estudiando al menos el ${ACH_MEDAL_MIN_CONTENT}% del nivel y aprobando su Examen Final. Es un reconocimiento interno de Sueco con Sophie.</div>
    </div>

    <div class="flex items-center justify-between mb-3">
      <div class="font-black text-gray-800">Otros logros</div>
      <div class="text-xs font-bold text-gray-400">${gotOthers}/${others.length}</div>
    </div>
    <div class="space-y-2.5">
      ${others.map(_otherRow).join('')}
    </div>`;

  try { checkNewMedals(); } catch (e) {}
}

function openLogros() {
  if (typeof requireAccess === 'function' && !requireAccess()) return;
  try { stopSpeech(); } catch (e) {}
  showView('progreso');
  renderLogros();
}

function toggleLogrosPreview() {
  _logrosPreview = !_logrosPreview;
  renderLogros();
}

/* ── Previsualización de UNA medalla (el alumno ve color y cómo ganarla) ── */
function openMedalPreview(level) {
  const m = MEDAL_META[level];
  if (!m) return;
  const earned = _logrosPreview || medalEarned(level);
  const admin = (typeof isAdminUser === 'function') && isAdminUser();
  const setH = (id, v) => { const e = document.getElementById(id); if (e) e.innerHTML = v; };
  setH('mp-img', `<img src="badges/${m.key}.webp" class="w-40 h-40 object-contain mx-auto" alt="${m.label}">`);
  setH('mp-title', `Medalla de ${m.label}`);
  setH('mp-sub', `SFI ${level} · ${m.sub}`);
  setH('mp-status', earned
    ? `<div class="bg-green-50 text-green-700 font-bold rounded-xl px-4 py-2.5 text-sm">✓ ¡Ya conseguiste esta medalla!</div>`
    : `<div class="bg-amber-50 text-amber-800 rounded-xl px-4 py-2.5 text-sm text-left"><b>Cómo conseguirla:</b><br>${medalHint(level)}</div>`);
  let btns = '';
  if (earned) btns += `<button onclick="closeMedalPreview();showMedalCelebration('${level}')" class="w-full bg-swe-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-swe-dark">🎉 Ver y descargar mi medalla</button>`;
  if (admin && !earned) btns += `<button onclick="closeMedalPreview();showMedalCelebration('${level}')" class="w-full bg-violet-100 text-violet-700 py-3 rounded-xl font-bold text-sm">👁 Ver celebración (solo admin)</button>`;
  btns += `<button onclick="closeMedalPreview()" class="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-sm">Cerrar</button>`;
  setH('mp-btns', btns);
  const mod = document.getElementById('medal-preview-modal'); if (mod) mod.classList.remove('hidden');
}
function closeMedalPreview() { const m = document.getElementById('medal-preview-modal'); if (m) m.classList.add('hidden'); }

/* ── Celebración a pantalla completa + descarga para redes ──────────── */
function showMedalCelebration(level) {
  const m = MEDAL_META[level];
  if (!m) return;
  const name = (window._sbSession && window._sbSession.name) || '';
  const t = document.getElementById('celebrate-title'); if (t) t.textContent = '¡Nivel SFI ' + level + ' completado!';
  const med = document.getElementById('celebrate-medal'); if (med) med.innerHTML = `<img src="badges/${m.key}.webp" class="w-44 h-44 object-contain mx-auto celebrate-pop" alt="${m.label}">`;
  const lbl = document.getElementById('celebrate-label'); if (lbl) lbl.textContent = 'Has ganado la medalla de ' + m.label;
  const inp = document.getElementById('celebrate-name'); if (inp) inp.value = name;
  window._celebrateLevel = level;
  const mod = document.getElementById('medal-celebrate-modal'); if (mod) mod.classList.remove('hidden');
}
function closeMedalCelebrate() { const m = document.getElementById('medal-celebrate-modal'); if (m) m.classList.add('hidden'); }

// Compone la imagen descargable (1080×1350, formato vertical para redes).
function _composeMedalCard(level, name, cb) {
  const m = MEDAL_META[level];
  const W = 1080, H = 1350;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#0A66A8'); g.addColorStop(0.55, '#004F7C'); g.addColorStop(1, '#002D54');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // rayos suaves detrás de la medalla
  ctx.save(); ctx.translate(W / 2, 560); ctx.globalAlpha = 0.10; ctx.fillStyle = '#FECC02';
  for (let i = 0; i < 24; i++) { ctx.rotate(Math.PI / 12); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(40, -520); ctx.lineTo(-40, -520); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FECC02'; ctx.font = '800 62px Poppins, system-ui, Arial';
  ctx.fillText('¡Nivel SFI ' + level + ' completado!', W / 2, 170);
  const draw = (img) => {
    if (img) { const s = 520; ctx.drawImage(img, (W - s) / 2, 300, s, s); }
    ctx.fillStyle = '#FFFFFF'; ctx.font = '700 52px Poppins, system-ui, Arial';
    ctx.fillText('Medalla de ' + m.label, W / 2, 930);
    ctx.fillStyle = '#CFE3F3'; ctx.font = '500 40px Poppins, system-ui, Arial';
    ctx.fillText('conseguida por', W / 2, 1010);
    ctx.fillStyle = '#FFFFFF'; ctx.font = '800 66px Poppins, system-ui, Arial';
    ctx.fillText((name || '').slice(0, 32), W / 2, 1092);
    // pie con la web
    ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.fillRect(0, H - 130, W, 130);
    ctx.fillStyle = '#FECC02'; ctx.font = '700 42px Poppins, system-ui, Arial';
    ctx.fillText('www.suecoconsophie.com', W / 2, H - 52);
    cb(cv);
  };
  const img = new Image();
  img.onload = () => draw(img);
  img.onerror = () => draw(null);
  img.src = 'badges/' + m.key + '.webp';
}
function downloadMedalCard() {
  const level = window._celebrateLevel || 'A';
  const inp = document.getElementById('celebrate-name');
  const name = ((inp && inp.value) || (window._sbSession && window._sbSession.name) || '').trim();
  _composeMedalCard(level, name, (cv) => {
    try {
      cv.toBlob((b) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.download = 'medalla-sfi-' + level + '-suecoconsophie.png';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 3000);
      }, 'image/png');
    } catch (e) { alert('No se pudo generar la imagen en este navegador.'); }
  });
}

/* ── Disparo automático al conseguir una medalla (sin tabla nueva) ──── */
function _seenMedals() { try { return JSON.parse(localStorage.getItem('scs_medals_seen') || '[]'); } catch (e) { return []; } }
function _saveSeenMedals(a) { try { localStorage.setItem('scs_medals_seen', JSON.stringify(a)); } catch (e) {} }
function checkNewMedals() {
  if (_logrosPreview) return;
  let raw = null; try { raw = localStorage.getItem('scs_medals_seen'); } catch (e) {}
  if (raw === null) { _saveSeenMedals(SFI_LEVELS.filter(medalEarned)); return; } // 1ª vez: sembrar sin celebrar
  const seen = _seenMedals();
  for (let i = 0; i < SFI_LEVELS.length; i++) {
    const lv = SFI_LEVELS[i];
    if (medalEarned(lv) && seen.indexOf(lv) < 0) { seen.push(lv); _saveSeenMedals(seen); showMedalCelebration(lv); return; }
  }
}
// Marca como vista y celebra (se llama en el momento exacto de ganarla).
function celebrateMedalNow(level) {
  try { const seen = _seenMedals(); if (seen.indexOf(level) < 0) { seen.push(level); _saveSeenMedals(seen); } } catch (e) {}
  showMedalCelebration(level);
}

if (typeof window !== 'undefined') {
  Object.assign(window, {
    medalEarned, medalHint, otherAchievements, renderLogros, openLogros, toggleLogrosPreview,
    openMedalPreview, closeMedalPreview, showMedalCelebration, closeMedalCelebrate,
    downloadMedalCard, checkNewMedals, celebrateMedalNow,
    MEDAL_META, ACH_MEDAL_MIN_CONTENT
  });
}
