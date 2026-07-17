/* ═══════════════════════════════════════════════════════════════════
   SISTEMA DE LOGROS  (Medallas + logros progresivos)
   Sueco con Sophie

   Almacenamiento (mínimo, SIN tabla nueva):
    · Se REUTILIZA la tabla existente `user_progress` con
      module_type = 'achievement'. Mapeo:
        user_id       → user_id
        achievement_id → content_id     (ej: 'medal_A', 'streak_7')
        unlocked_at    → completed_at
        best_value     → progress_value
        updated_at     → updated_at      (trigger automático)
      Ya tiene RLS por usuario y se carga en loadUnifiedProgress().
      Un logro desbloqueado se mantiene aunque el alumno cambie de
      dispositivo o navegador.

   Reglas:
    · Medalla de nivel = aprobar el Examen Final del nivel Y tener
      ≥ 50 % del contenido. UNA VEZ desbloqueada NO se revoca aunque
      luego se agregue contenido nuevo y el % baje (queda guardada).
    · Logros progresivos por niveles (se consiguen más temprano):
        Racha:        7 · 30 · 100 días
        Vocabulario:  100 · 500 · 1000 palabras
        Audios:       10 · 25 · 50
        Conversaciones: 5 · 10 · 20

   Depende de globales: examStatus, levelProgress, SFI_LEVELS,
   moduleItems, isCompleted, progressMark, UNIFIED_PROGRESS,
   vocabProgressMap, getStudyStreak, isAdminUser, fmtPct, showToast.
   ═══════════════════════════════════════════════════════════════════ */

const ACH_MEDAL_MIN_CONTENT = 50;   // % de contenido del nivel para la medalla

const MEDAL_META = {
  A: { key: 'bronce',   label: 'Bronce',   sub: 'Principiante', color: '#A9713B' },
  B: { key: 'plata',    label: 'Plata',    sub: 'Básico',       color: '#7C8794' },
  C: { key: 'oro',      label: 'Oro',      sub: 'Intermedio',   color: '#C79A1E' },
  D: { key: 'diamante', label: 'Diamante', sub: 'Avanzado',     color: '#3B82C4' }
};

// Categorías de logros progresivos (edita los umbrales aquí).
const ACH_TIERS = [
  { id: 'streak',  icon: '🔥', bg: '#DBEAFE', name: 'Racha de días',    unit: 'días seguidos', tiers: [7, 30, 100] },
  { id: 'words',   icon: '📚', bg: '#EDE9FE', name: 'Palabras dominadas', unit: 'palabras',    tiers: [100, 500, 1000] },
  { id: 'audios',  icon: '🎧', bg: '#FEF3C7', name: 'Audios completados', unit: 'audios',      tiers: [10, 25, 50] },
  { id: 'convers', icon: '💬', bg: '#DCFCE7', name: 'Conversaciones',     unit: 'conversaciones', tiers: [5, 10, 20] }
];

let _logrosPreview = false; // modo admin: ver todo desbloqueado

/* ── Contadores derivados de datos ya cargados ─────────────────────── */
function _countCompleted(moduleKey) {
  try { return moduleItems(moduleKey).filter(it => isCompleted(moduleKey, it.id)).length; } catch (e) { return 0; }
}
function _countVocabMastered() {
  try { return Object.values(vocabProgressMap || {}).filter(r => r && r.status === 'mastered').length; } catch (e) { return 0; }
}
function _streakDays() {
  try { return (typeof getStudyStreak === 'function') ? (Number(getStudyStreak()) || 0) : 0; } catch (e) { return 0; }
}
function _catValue(id) {
  if (id === 'streak') return _streakDays();
  if (id === 'words') return _countVocabMastered();
  if (id === 'audios') return _countCompleted('listening');
  if (id === 'convers') return _countCompleted('tala');
  return 0;
}

/* ── Capa de guardado en user_progress (module_type='achievement') ─── */
function _achRow(id) { try { return UNIFIED_PROGRESS['achievement|' + id] || null; } catch (e) { return null; } }
function achUnlocked(id) { try { return isCompleted('achievement', id); } catch (e) { return false; } }
function achDate(id) { const r = _achRow(id); return (r && (r.completed_at || r.updated_at)) || null; }
// Desbloquea (o actualiza best_value). Devuelve true si es NUEVO.
function unlockAchievement(id, bestValue) {
  try {
    const already = achUnlocked(id);
    const r = _achRow(id);
    const prevBest = (r && Number(r.progress_value)) || 0;
    const best = Math.max(prevBest, Number(bestValue) || 0);
    if (!already || best !== prevBest) {
      progressMark('achievement', id, { status: 'completed', progress_value: best });
    }
    return !already;
  } catch (e) { return false; }
}

/* ── Medalla de nivel (sticky: nunca se revoca) ────────────────────── */
function _medalLive(level) {
  try {
    const ex = (typeof examStatus === 'function') ? examStatus(level) : { medal: false };
    if (!ex.medal) return false;
    const lp = (typeof levelProgress === 'function') ? levelProgress(level) : { pct: 0 };
    return (lp.pct || 0) >= ACH_MEDAL_MIN_CONTENT;
  } catch (e) { return false; }
}
function medalEarned(level) { return achUnlocked('medal_' + level) || _medalLive(level); }
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

/* ── Detección/persistencia de logros conseguidos ──────────────────── */
function _tierEarned(catId, tier) { return _logrosPreview || _catValue(catId) >= tier || achUnlocked(catId + '_' + tier); }

// Medalla nueva → persistir + celebrar a pantalla completa (una sola vez).
function checkNewMedals() {
  if (_logrosPreview) return;
  for (let i = 0; i < SFI_LEVELS.length; i++) {
    const lv = SFI_LEVELS[i];
    if (_medalLive(lv) && !achUnlocked('medal_' + lv)) { celebrateMedalNow(lv); return; }
  }
}
// Logros progresivos alcanzados → persistir (silencioso; se ven en la lista).
function checkOtherAchievements() {
  if (_logrosPreview) return;
  ACH_TIERS.forEach(cat => {
    const v = _catValue(cat.id);
    cat.tiers.forEach(t => { if (v >= t && !achUnlocked(cat.id + '_' + t)) unlockAchievement(cat.id + '_' + t, v); });
  });
  const medals = SFI_LEVELS.filter(medalEarned).length;
  if (medals >= 4 && !achUnlocked('master')) unlockAchievement('master', 4);
}

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
function _catRow(cat) {
  const value = _catValue(cat.id);
  const earnedN = cat.tiers.filter(t => _tierEarned(cat.id, t)).length;
  const next = cat.tiers.find(t => !_tierEarned(cat.id, t));
  const allDone = earnedN === cat.tiers.length;
  const pct = next ? Math.min(100, Math.round(value / next * 100)) : 100;
  const chips = cat.tiers.map(t => {
    const e = _tierEarned(cat.id, t);
    return `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${e ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}">${e ? '✓ ' : ''}${t}</span>`;
  }).join(' ');
  return `
    <div class="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
      <div class="flex items-center gap-3">
        <span class="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:${cat.bg}">${cat.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <div class="font-black text-gray-800 text-sm">${cat.name}</div>
            <div class="text-xs font-bold text-gray-400">${earnedN}/${cat.tiers.length}</div>
          </div>
          <div class="text-xs text-gray-500">${value} ${cat.unit}${allDone ? ' · ¡todos conseguidos!' : (next ? ' · próximo: ' + next : '')}</div>
          ${allDone ? '' : `<div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1.5"><div class="h-full bg-swe-blue rounded-full" style="width:${pct}%"></div></div>`}
        </div>
      </div>
      <div class="flex gap-1.5 mt-2 pl-14">${chips}</div>
    </div>`;
}
function _masterRow() {
  const medals = SFI_LEVELS.filter(lv => _logrosPreview || medalEarned(lv)).length;
  const earned = _logrosPreview || medals >= 4;
  const right = earned
    ? '<span class="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow flex-shrink-0">✓</span>'
    : `<span class="text-xs font-bold text-gray-400 flex-shrink-0">${medals}/4</span>`;
  return `
    <div class="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
      <span class="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:#FEE2E2">🏆</span>
      <div class="flex-1 min-w-0">
        <div class="font-black text-gray-800 text-sm">Maestro del sueco</div>
        <div class="text-xs text-gray-500">Consigue las 4 medallas de nivel</div>
      </div>
      ${right}
    </div>`;
}

function renderLogros() {
  const el = document.getElementById('logros-content');
  if (!el) return;
  const admin = (typeof isAdminUser === 'function') && isAdminUser();
  const totalMedals = SFI_LEVELS.filter(lv => _logrosPreview || medalEarned(lv)).length;
  const earnedTiers = ACH_TIERS.reduce((n, c) => n + c.tiers.filter(t => _tierEarned(c.id, t)).length, 0);
  const masterOn = _logrosPreview || SFI_LEVELS.filter(medalEarned).length >= 4;
  const totalOther = ACH_TIERS.reduce((n, c) => n + c.tiers.length, 0) + 1;
  const gotOther = earnedTiers + (masterOn ? 1 : 0);

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
      <div class="mt-3 text-[11px] text-gray-400 leading-snug">Cada medalla se consigue estudiando al menos el ${ACH_MEDAL_MIN_CONTENT}% del nivel y aprobando su Examen Final. Es un reconocimiento interno de Sueco con Sophie.</div>
    </div>

    <div class="flex items-center justify-between mb-3">
      <div class="font-black text-gray-800">Otros logros</div>
      <div class="text-xs font-bold text-gray-400">${gotOther}/${totalOther}</div>
    </div>
    <div class="space-y-2.5">
      ${ACH_TIERS.map(_catRow).join('')}
      ${_masterRow()}
    </div>`;

  try { checkOtherAchievements(); } catch (e) {}
  try { checkNewMedals(); } catch (e) {}
}

function openLogros() {
  if (typeof requireAccess === 'function' && !requireAccess()) return;
  try { stopSpeech(); } catch (e) {}
  showView('progreso');
  renderLogros();
}
function toggleLogrosPreview() { _logrosPreview = !_logrosPreview; renderLogros(); }

/* ── Previsualización de UNA medalla (color + cómo ganarla) ────────── */
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

/* ── Fecha del certificado (es-ES) ─────────────────────────────────── */
function _fmtCertDate(iso) {
  const d = iso ? new Date(iso) : new Date();
  try { return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch (e) { return d.toISOString().slice(0, 10); }
}
function _certParagraph(level) {
  if (level === 'D') return 'En Sueco con Sophie reconocemos tu esfuerzo y dedicación. Has demostrado que dominas los contenidos del nivel SFI D, el nivel más alto. ¡Enhorabuena!';
  return 'En Sueco con Sophie reconocemos tu esfuerzo y dedicación. Has demostrado que dominas los contenidos del nivel SFI ' + level + ' y estás listo para avanzar al siguiente nivel.';
}

/* ── Celebración a pantalla completa + descarga para redes ──────────── */
function showMedalCelebration(level) {
  const m = MEDAL_META[level];
  if (!m) return;
  const name = (window._sbSession && window._sbSession.name) || '';
  const dateISO = achDate('medal_' + level);
  const dateStr = _fmtCertDate(dateISO);
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const setH = (id, v) => { const e = document.getElementById(id); if (e) e.innerHTML = v; };
  set('celebrate-title', '¡Nivel ' + m.sub + ' completado!');
  setH('celebrate-medal', `<img src="badges/${m.key}.webp" class="w-40 h-40 object-contain mx-auto celebrate-pop" alt="${m.label}">`);
  set('celebrate-medal-name', '🏅 Medalla de ' + m.label);
  const inp = document.getElementById('celebrate-name'); if (inp) inp.value = name;
  set('celebrate-para', _certParagraph(level));
  set('celebrate-date', dateStr + ' · Stockholm, Sweden');
  window._celebrateLevel = level;
  window._celebrateDate = dateStr;
  const mod = document.getElementById('medal-celebrate-modal'); if (mod) mod.classList.remove('hidden');
}
function closeMedalCelebrate() { const m = document.getElementById('medal-celebrate-modal'); if (m) m.classList.add('hidden'); }

// Compone la imagen descargable (1080×1350, vertical para redes).
function _wrapText(ctx, text, maxW) {
  const words = String(text).split(' '); const lines = []; let line = '';
  words.forEach(w => { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
  if (line) lines.push(line); return lines;
}
function _composeMedalCard(level, name, dateStr, cb) {
  const m = MEDAL_META[level];
  const W = 1080, H = 1350;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#0A66A8'); g.addColorStop(0.55, '#004F7C'); g.addColorStop(1, '#002D54');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // rayos suaves
  ctx.save(); ctx.translate(W / 2, 520); ctx.globalAlpha = 0.09; ctx.fillStyle = '#FECC02';
  for (let i = 0; i < 24; i++) { ctx.rotate(Math.PI / 12); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(40, -560); ctx.lineTo(-40, -560); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  ctx.textAlign = 'center';
  const F = (s, w) => `${w || 700} ${s}px Poppins, system-ui, Arial`;
  ctx.fillStyle = '#FECC02'; ctx.font = F(46, 800); ctx.fillText('¡Felicidades!', W / 2, 108);
  ctx.fillStyle = '#FFFFFF'; ctx.font = F(56, 800); ctx.fillText('¡Nivel ' + m.sub + ' completado!', W / 2, 176);
  const draw = (img) => {
    if (img) { const s = 400; ctx.drawImage(img, (W - s) / 2, 235, s, s); }
    ctx.fillStyle = '#FFFFFF'; ctx.font = F(50, 800); ctx.fillText('Medalla de ' + m.label, W / 2, 705);
    ctx.fillStyle = '#CFE3F3'; ctx.font = F(34, 500); ctx.fillText('OTORGADA A', W / 2, 770);
    ctx.fillStyle = '#FFFFFF'; ctx.font = F(60, 800); ctx.fillText((name || '').slice(0, 32), W / 2, 838);
    // párrafo
    ctx.fillStyle = '#DCEBF7'; ctx.font = F(33, 500);
    const lines = _wrapText(ctx, _certParagraph(level), 880);
    let y = 920; lines.forEach(ln => { ctx.fillText(ln, W / 2, y); y += 48; });
    // fecha + lugar
    ctx.fillStyle = '#FECC02'; ctx.font = F(34, 700);
    ctx.fillText((dateStr || _fmtCertDate()) + '  ·  Stockholm, Sweden', W / 2, y + 34);
    // pie web
    ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(0, H - 120, W, 120);
    ctx.fillStyle = '#FECC02'; ctx.font = F(40, 700); ctx.fillText('www.suecoconsophie.com', W / 2, H - 46);
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
  const dateStr = window._celebrateDate || _fmtCertDate();
  _composeMedalCard(level, name, dateStr, (cv) => {
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

// Marca como desbloqueada (persistente) y celebra. Se llama al ganarla.
function celebrateMedalNow(level) {
  try { unlockAchievement('medal_' + level, 100); } catch (e) {}
  showMedalCelebration(level);
}

if (typeof window !== 'undefined') {
  Object.assign(window, {
    medalEarned, medalHint, renderLogros, openLogros, toggleLogrosPreview,
    openMedalPreview, closeMedalPreview, showMedalCelebration, closeMedalCelebrate,
    downloadMedalCard, checkNewMedals, checkOtherAchievements, celebrateMedalNow,
    unlockAchievement, achUnlocked, MEDAL_META, ACH_MEDAL_MIN_CONTENT
  });
}
