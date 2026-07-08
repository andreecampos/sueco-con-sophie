// ═══════════════════════════════════════════════════════════
//  SUECO CON SOFI — Lógica de la aplicación
// ═══════════════════════════════════════════════════════════

// ── State ───────────────────────────────────────────────────
const state = {
  level: null,
  mode: null,
  // Listen
  currentAudio: null,
  currentQIndex: 0,
  listenAnswers: [],
  audioPlaying: false,
  audioSpeed: 1.0,
  // Read
  currentText: null,
  readQIndex: 0,
  readAnswers: [],
  // Write
  currentWrite: null,
  writeIndex: 0,
  // Speak
  currentSpeak: null,
  speakIndex: 0,
  // Test
  testQuestions: [],
  testIndex: 0,
  testScore: 0,
  testAnswered: false,
  // Stats
  stats: { sessions: 0, correct: 0, streak: 0 },
  // Admin
  adminLoggedIn: false,
  adminTab: 'listen',
  adminLevel: 'A',
};

// ── Supabase ──────────────────────────────────────────────────
const SUPABASE_URL  = 'https://nblxzqdtczitpzxdqexz.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ibHh6cWR0Y3ppdHB6eGRxZXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDEyOTAsImV4cCI6MjA5ODI3NzI5MH0.RGIoLkVc3ITLG6P_6obxz77dXClBtABb0J3rGTSbJL8';
const EDGE_FN       = SUPABASE_URL + '/functions/v1/admin-ops';
const sb            = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

const ADMIN_EMAILS = ['sophie.sahlin@hotmail.com', 'orlandoandree1998@gmail.com'];
let _wantAdmin = false;
function _adminLoginMode() {
  const b = document.getElementById('admin-mode-badge'); if (b) b.style.display = 'block';
  const c = document.getElementById('enroll-cta'); if (c) c.style.display = 'none';
  const d = document.getElementById('enroll-divider'); if (d) d.style.display = 'none';
}
function isAdminUser() { const e = (window._sbSession?.email || '').toLowerCase(); return ADMIN_EMAILS.includes(e); }

// Helper: calls the admin Edge Function.
// Auto-repara la sesión: si el token caducó (401), lo refresca y reintenta 1 vez.
async function adminOps(action, data = {}, _retry = true) {
  try {
    let _token = SUPABASE_ANON;
    try { const { data: { session } } = await sb.auth.getSession(); if (session?.access_token) _token = session.access_token; } catch (e) {}
    const res = await fetch(EDGE_FN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${_token}`
      },
      body: JSON.stringify({ action, data })
    });
    // Sesión caducada → refresca el token una vez y reintenta automáticamente
    if (res.status === 401 && _retry) {
      try { await sb.auth.refreshSession(); } catch (e) {}
      return await adminOps(action, data, false);
    }
    if (res.status === 401) return { error: 'sesion_expirada' };
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch(e) {
    console.error('adminOps error:', action, e);
    return { error: e.message };
  }
}

// Cache for student list (set by getStudents, used by filterDashStudents)
let _cachedStudents = null;

// ── Init ─────────────────────────────────────────────────────
window.addEventListener('load', () => {
  loadStats();
  updateStats();
  renderHomeDashboard();
  stopSpeech();
  initAnnounce();
  // Pre-cargar config de Stripe para que el botón "Inscríbete" funcione instantáneamente
  getStripeConfig();
});

window.addEventListener('beforeunload', () => stopSpeech());

// ── Navigation ───────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const v = document.getElementById('view-' + id);
  if (v) v.classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() {
  const session = getSession();
  if (!session) { showView('login'); return; }
  stopSpeech();
  state.level = null;
  showView('home');  renderHomeDashboard();
}

function goMenu() {
  stopSpeech();
  showView('menu');
}

function selectLevel(level) {
  if (!requireAccess()) return;
  const available = ['A','B'];
  if (!available.includes(level)) {
    showToast('¡Próximamente! Este nivel estará disponible pronto.', 'info');
    return;
  }
  state.level = level;
  updateMenuUI();
  showView('menu');
  state.stats.sessions++;
  saveStats();
  updateStats();
}

function updateMenuUI() {
  const L = state.level;
  const labels = { A: 'Nybörjare — Grundläggande svenska', B: 'Grundläggande — Mer komplex svenska', C: 'Mellannivå', D: 'Avancerad nivå' };
  const titles = { A: 'Principiante', B: 'Básico', C: 'Intermedio', D: 'Avanzado' };
  const classes = { A: 'level-a', B: 'level-b', C: 'level-c', D: 'level-d' };
  document.getElementById('menu-subtitle').textContent = `${titles[L]} — Välj övning`;
  document.getElementById('menu-level-title').textContent = titles[L];
  document.getElementById('menu-level-desc').textContent = labels[L];
  const badge = document.getElementById('menu-level-badge');
  badge.className = `${classes[L]} w-20 h-20 rounded-3xl flex items-center justify-center text-white text-4xl font-black mx-auto mb-3 shadow-xl`;
  badge.textContent = L;
}

function selectMode(mode) {
  state.mode = mode;
  stopSpeech();
  if (mode === 'listen') initListen();
  else if (mode === 'read') initRead();
  else if (mode === 'write') initWrite();
  else if (mode === 'speak') initSpeak();
  else if (mode === 'test') initTest();
}

// ── SPEECH SYNTHESIS ─────────────────────────────────────────
let currentUtterance = null;

function speak(text, onEnd) {
  stopSpeech();
  if (!window.speechSynthesis) {
    showToast('Tu navegador no soporta síntesis de voz. Prueba Chrome.', 'error');
    if (onEnd) onEnd();
    return;
  }
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = 'sv-SE';
  currentUtterance.rate = state.audioSpeed;
  currentUtterance.pitch = 1.0;
  // Pick the best available Swedish voice
  const voices = speechSynthesis.getVoices();
  const svVoices = voices.filter(v => v.lang.startsWith('sv'));
  const preferred = ['Alva', 'Nora', 'Svante', 'Microsoft Bengt', 'Enhanced', 'Natural'];
  let bestVoice = null;
  for (const name of preferred) {
    bestVoice = svVoices.find(v => v.name.includes(name));
    if (bestVoice) break;
  }
  if (!bestVoice) bestVoice = svVoices.find(v => !v.localService) || svVoices[0];
  if (bestVoice) currentUtterance.voice = bestVoice;
  currentUtterance.onend = () => {
    state.audioPlaying = false;
    updatePlayButton(false);
    if (onEnd) onEnd();
  };
  currentUtterance.onerror = () => {
    state.audioPlaying = false;
    updatePlayButton(false);
  };
  speechSynthesis.speak(currentUtterance);
  state.audioPlaying = true;
  updatePlayButton(true);
}

function stopSpeech() {
  if (window.speechSynthesis) speechSynthesis.cancel();
  state.audioPlaying = false;
  updatePlayButton(false);
}

function updatePlayButton(playing) {
  const pi = document.getElementById('play-icon');
  const pa = document.getElementById('pause-icon');
  const bars = document.querySelectorAll('.wave-bar');
  if (!pi || !pa) return;
  if (playing) {
    pi.classList.add('hidden');
    pa.classList.remove('hidden');
    document.getElementById('audio-status').textContent = 'Reproduciendo en sueco...';
    bars.forEach(b => b.style.animation = '');
  } else {
    pi.classList.remove('hidden');
    pa.classList.add('hidden');
    const stat = document.getElementById('audio-status');
    if (stat) stat.textContent = 'Haz clic en ▶ para escuchar';
    bars.forEach(b => b.style.animation = 'none');
  }
}

function speakText(ctx) {
  if (ctx === 'read') {
    const t = document.getElementById('read-text-content');
    if (t) speak(t.innerText);
  }
}

// ── LISTEN MODE ──────────────────────────────────────────────
function initListen() {
  const items = DB[state.level].listen || [];
  document.getElementById('listen-header-sub').textContent = `${LEVEL_LABEL[state.level]||state.level} — Comprensión auditiva`;
  document.getElementById('audio-player-area').classList.add('hidden');
  const grid = document.getElementById('listen-grid');
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.innerHTML = '<div class="col-span-2 text-center py-12 text-gray-400"><div class="text-4xl mb-2">📭</div><p>No hay audios disponibles.<br>¡Agrega contenido desde el panel Admin!</p></div>';
    showView('listen');
    return;
  }
  items.forEach((item, i) => {
    grid.innerHTML += `
      <div class="card-hover glass rounded-2xl p-5 shadow border border-blue-100 cursor-pointer" onclick="openAudio(${i})">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">${item.icon || '🎧'}</div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-gray-800 truncate">${item.title}</div>
            <div class="text-xs text-gray-500">${item.topic || ''}</div>
          </div>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400">
          <span>⏱ ${item.duration || '~45s'}</span>
          <span class="text-blue-500 font-medium">${item.questions?.length || 0} preguntas →</span>
        </div>
      </div>`;
  });
  showView('listen');
}

function openAudio(index) {
  const items = DB[state.level].listen || [];
  state.currentAudio = items[index];
  state.currentQIndex = 0;
  state.listenAnswers = [];
  stopSpeech();

  const area = document.getElementById('audio-player-area');
  area.classList.remove('hidden');
  area.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('audio-title').textContent = state.currentAudio.title;
  document.getElementById('audio-topic').textContent = state.currentAudio.topic || '';
  document.getElementById('audio-icon').textContent = state.currentAudio.icon || '🎧';
  document.getElementById('audio-duration').textContent = state.currentAudio.duration || '~45s';
  document.getElementById('audio-status').textContent = 'Haz clic en ▶ para escuchar';
  document.getElementById('questions-area').classList.add('hidden');
  document.getElementById('show-questions-btn').classList.remove('hidden');
  document.getElementById('listen-result').classList.add('hidden');
  document.getElementById('next-question-btn').classList.add('hidden');
  document.getElementById('questions-container').innerHTML = '';
  updatePlayButton(false);
}

function randomAudio() {
  const items = DB[state.level].listen || [];
  if (items.length === 0) { showToast('No hay audios disponibles', 'info'); return; }
  const idx = Math.floor(Math.random() * items.length);
  openAudio(idx);
}

function toggleAudio() {
  if (!state.currentAudio) return;
  if (state.audioPlaying) {
    stopSpeech();
  } else {
    speak(state.currentAudio.text, () => {
      document.getElementById('show-questions-btn').innerHTML = `
        <button onclick="showQuestions()" class="w-full bg-swe-blue text-white py-3 rounded-xl font-semibold hover:bg-swe-dark transition-colors mt-2 pulse-ring">
          ✅ Ver preguntas
        </button>`;
    });
  }
}

function setSpeed(speed) {
  state.audioSpeed = speed;
  document.querySelectorAll('.speed-btn').forEach(b => {
    b.classList.toggle('border-2', parseFloat(b.dataset.speed) === speed);
    b.classList.toggle('border-swe-blue', parseFloat(b.dataset.speed) === speed);
    b.classList.toggle('bg-blue-50', parseFloat(b.dataset.speed) === speed);
    b.classList.toggle('text-swe-blue', parseFloat(b.dataset.speed) === speed);
    b.classList.toggle('font-medium', parseFloat(b.dataset.speed) === speed);
    b.classList.toggle('border', parseFloat(b.dataset.speed) !== speed);
    b.classList.toggle('border-gray-200', parseFloat(b.dataset.speed) !== speed);
  });
}

function showQuestions() {
  if (!state.currentAudio) return;
  document.getElementById('show-questions-btn').classList.add('hidden');
  document.getElementById('questions-area').classList.remove('hidden');
  renderListenQuestion();
}

function renderListenQuestion() {
  const qs = state.currentAudio.questions || [];
  if (state.currentQIndex >= qs.length) {
    showListenResult();
    return;
  }
  const q = qs[state.currentQIndex];
  const total = qs.length;
  document.getElementById('q-progress-listen').textContent = `${state.currentQIndex + 1} / ${total}`;
  document.getElementById('next-question-btn').classList.add('hidden');

  const container = document.getElementById('questions-container');
  container.innerHTML = `
    <div class="mb-4">
      <p class="font-semibold text-gray-800 mb-3 text-base">${state.currentQIndex + 1}. ${q.text}</p>
      <div class="space-y-2" id="options-listen">
        ${q.options.map((opt, i) => `
          <button onclick="answerListen(${i})" class="option-btn w-full text-left px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center gap-3">
            <span class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0 text-xs">${'ABCD'[i]}</span>
            ${opt}
          </button>`).join('')}
      </div>
    </div>`;
}

function answerListen(idx) {
  const q = state.currentAudio.questions[state.currentQIndex];
  const btns = document.querySelectorAll('#options-listen .option-btn');
  btns.forEach(b => b.classList.add('disabled'));
  btns.forEach((b, i) => {
    if (i === q.correct) b.classList.add('correct');
    else if (i === idx && idx !== q.correct) b.classList.add('wrong');
  });

  const isCorrect = idx === q.correct;
  if (isCorrect) {
    state.stats.correct++;
    saveStats();
    updateStats();
  }
  state.listenAnswers.push(isCorrect);

  // Show explanation
  const container = document.getElementById('questions-container');
  container.innerHTML += `
    <div class="mt-3 p-3 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
      <div class="text-sm font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}">${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}</div>
      <div class="text-xs text-gray-600 mt-1">${q.explanation}</div>
    </div>`;

  document.getElementById('next-question-btn').classList.remove('hidden');
}

function nextQuestion() {
  state.currentQIndex++;
  renderListenQuestion();
}

function showListenResult() {
  const correct = state.listenAnswers.filter(Boolean).length;
  const total = state.listenAnswers.length;
  const pct = Math.round((correct / total) * 100);
  document.getElementById('questions-container').innerHTML = '';
  document.getElementById('next-question-btn').classList.add('hidden');
  const res = document.getElementById('listen-result');
  res.classList.remove('hidden');
  document.getElementById('listen-result-emoji').textContent = pct >= 75 ? '🎉' : pct >= 50 ? '💪' : '📚';
  document.getElementById('listen-result-score').textContent = `${correct} / ${total}`;
  document.getElementById('listen-result-msg').textContent = pct >= 75 ? '¡Excelente comprensión!' : pct >= 50 ? 'Buen trabajo, ¡sigue practicando!' : 'Escucha de nuevo y vuelve a intentarlo.';
}

function nextAudio() {
  const items = DB[state.level].listen || [];
  const idx = Math.floor(Math.random() * items.length);
  openAudio(idx);
}

// ── READ MODE ─────────────────────────────────────────────────
function initRead() {
  const items = DB[state.level].read || [];
  document.getElementById('read-header-sub').textContent = `${LEVEL_LABEL[state.level]||state.level} — Comprensión lectora`;
  document.getElementById('read-area').classList.add('hidden');
  const grid = document.getElementById('read-grid');
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.innerHTML = '<div class="col-span-2 text-center py-12 text-gray-400"><div class="text-4xl mb-2">📭</div><p>No hay textos disponibles.</p></div>';
    showView('read');
    return;
  }
  items.forEach((item, i) => {
    grid.innerHTML += `
      <div class="card-hover glass rounded-2xl p-5 shadow border border-blue-100 cursor-pointer" onclick="openText(${i})">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">${item.icon || '📖'}</div>
          <div>
            <div class="font-bold text-gray-800">${item.title}</div>
            <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">${item.tag || ''}</span>
          </div>
        </div>
        <div class="text-xs text-gray-500 line-clamp-2">${item.text?.substring(0, 80) || ''}...</div>
        <div class="mt-2 text-xs text-green-500 font-medium">${item.questions?.length || 0} preguntas →</div>
      </div>`;
  });
  showView('read');
}

function openText(index) {
  const items = DB[state.level].read || [];
  state.currentText = items[index];
  state.readQIndex = 0;
  state.readAnswers = [];

  document.getElementById('read-area').classList.remove('hidden');
  document.getElementById('read-area').scrollIntoView({ behavior: 'smooth' });

  document.getElementById('read-title').textContent = state.currentText.title;
  document.getElementById('read-tag').textContent = state.currentText.tag || '';
  document.getElementById('read-icon').textContent = state.currentText.icon || '📖';
  document.getElementById('read-text-content').innerHTML = (state.currentText.text || '').replace(/\n/g, '<br>');
  document.getElementById('read-result').classList.add('hidden');
  renderReadQuestion();
}

function randomText() {
  const items = DB[state.level].read || [];
  if (items.length === 0) { showToast('No hay textos disponibles', 'info'); return; }
  openText(Math.floor(Math.random() * items.length));
}

function renderReadQuestion() {
  const qs = state.currentText.questions || [];
  if (state.readQIndex >= qs.length) {
    showReadResult();
    return;
  }
  const q = qs[state.readQIndex];
  document.getElementById('q-progress-read').textContent = `${state.readQIndex + 1} / ${qs.length}`;
  document.getElementById('read-next-btn').classList.add('hidden');
  document.getElementById('read-questions-container').innerHTML = `
    <p class="font-semibold text-gray-800 mb-3">${state.readQIndex + 1}. ${q.text}</p>
    <div class="space-y-2" id="options-read">
      ${q.options.map((opt, i) => `
        <button onclick="answerRead(${i})" class="option-btn w-full text-left px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0 text-xs">${'ABCD'[i]}</span>
          ${opt}
        </button>`).join('')}
    </div>`;
}

function answerRead(idx) {
  const q = state.currentText.questions[state.readQIndex];
  const btns = document.querySelectorAll('#options-read .option-btn');
  btns.forEach(b => b.classList.add('disabled'));
  btns.forEach((b, i) => {
    if (i === q.correct) b.classList.add('correct');
    else if (i === idx && idx !== q.correct) b.classList.add('wrong');
  });
  const isCorrect = idx === q.correct;
  if (isCorrect) { state.stats.correct++; saveStats(); updateStats(); }
  state.readAnswers.push(isCorrect);

  document.getElementById('read-questions-container').innerHTML += `
    <div class="mt-3 p-3 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
      <div class="text-sm font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}">${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}</div>
      <div class="text-xs text-gray-600 mt-1">${q.explanation}</div>
    </div>`;
  document.getElementById('read-next-btn').classList.remove('hidden');
}

function nextReadQuestion() {
  state.readQIndex++;
  renderReadQuestion();
}

function showReadResult() {
  const correct = state.readAnswers.filter(Boolean).length;
  const total = state.readAnswers.length;
  const pct = Math.round((correct / total) * 100);
  document.getElementById('read-questions-container').innerHTML = '';
  document.getElementById('read-next-btn').classList.add('hidden');
  const res = document.getElementById('read-result');
  res.classList.remove('hidden');
  document.getElementById('read-result-emoji').textContent = pct >= 75 ? '🎉' : pct >= 50 ? '💪' : '📚';
  document.getElementById('read-result-score').textContent = `${correct} / ${total}`;
  document.getElementById('read-result-msg').textContent = pct >= 75 ? '¡Excelente lectura!' : '¡Sigue practicando!';
}

function nextText() {
  const items = DB[state.level].read || [];
  openText(Math.floor(Math.random() * items.length));
}

// ── WRITE MODE ────────────────────────────────────────────────
function initWrite() {
  const items = DB[state.level].write || [];
  document.getElementById('write-header-sub').textContent = `${LEVEL_LABEL[state.level]||state.level} — Producción escrita`;
  document.getElementById('write-area').classList.add('hidden');
  const grid = document.getElementById('write-grid');
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.innerHTML = '<div class="text-center py-12 text-gray-400"><div class="text-4xl mb-2">📭</div><p>No hay tareas disponibles.</p></div>';
    showView('write');
    return;
  }
  items.forEach((item, i) => {
    grid.innerHTML += `
      <div class="card-hover glass rounded-2xl p-5 shadow border border-blue-100 cursor-pointer flex items-center gap-4" onclick="openWrite(${i})">
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">${item.icon || '✍️'}</div>
        <div class="flex-1">
          <div class="font-bold text-gray-800">${item.title}</div>
          <div class="text-xs text-gray-400 mt-0.5">${item.words || ''}</div>
        </div>
        <div class="text-gray-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
      </div>`;
  });
  showView('write');
}

function openWrite(index) {
  const items = DB[state.level].write || [];
  state.currentWrite = items[index];
  state.writeIndex = index;

  document.getElementById('write-area').classList.remove('hidden');
  document.getElementById('write-area').scrollIntoView({ behavior: 'smooth' });

  document.getElementById('write-title').textContent = state.currentWrite.title;
  document.getElementById('write-words').textContent = state.currentWrite.words || '';
  document.getElementById('write-icon').textContent = state.currentWrite.icon || '✍️';
  document.getElementById('write-prompt').innerHTML = (state.currentWrite.prompt || '').replace(/\n/g, '<br>');
  document.getElementById('write-textarea').value = '';
  document.getElementById('word-counter').textContent = '0 ord';
  document.getElementById('example-area').classList.add('hidden');

  const cl = document.getElementById('write-checklist');
  cl.innerHTML = (state.currentWrite.checklist || []).map(c =>
    `<div class="flex items-start gap-2 text-xs text-blue-700"><span class="text-blue-400 mt-0.5">•</span>${c}</div>`
  ).join('');
}

function randomWrite() {
  const items = DB[state.level].write || [];
  if (items.length === 0) return;
  openWrite(Math.floor(Math.random() * items.length));
}

function countWords() {
  const txt = document.getElementById('write-textarea').value.trim();
  const words = txt ? txt.split(/\s+/).length : 0;
  document.getElementById('word-counter').textContent = `${words} ord`;
}

function showExample() {
  const area = document.getElementById('example-area');
  area.classList.remove('hidden');
  document.getElementById('example-text').innerHTML = (state.currentWrite?.example || '').replace(/\n/g, '<br>');
  const crit = document.getElementById('criteria-list');
  crit.innerHTML = (state.currentWrite?.criteria || []).map(c =>
    `<div class="flex items-start gap-2 text-xs text-green-700"><span>✔</span>${c}</div>`
  ).join('');
  area.scrollIntoView({ behavior: 'smooth' });
}

function clearWrite() {
  document.getElementById('write-textarea').value = '';
  document.getElementById('word-counter').textContent = '0 ord';
  document.getElementById('example-area').classList.add('hidden');
}

function nextWrite() {
  const items = DB[state.level].write || [];
  const nextIdx = (state.writeIndex + 1) % items.length;
  openWrite(nextIdx);
}

// ── SPEAK MODE ────────────────────────────────────────────────
function initSpeak() {
  const items = DB[state.level].speak || [];
  document.getElementById('speak-header-sub').textContent = `${LEVEL_LABEL[state.level]||state.level} — Expresión oral`;
  document.getElementById('speak-area').classList.add('hidden');
  const grid = document.getElementById('speak-grid');
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.innerHTML = '<div class="col-span-2 text-center py-12 text-gray-400"><div class="text-4xl mb-2">📭</div><p>No hay situaciones disponibles.</p></div>';
    showView('speak');
    return;
  }
  items.forEach((item, i) => {
    grid.innerHTML += `
      <div class="card-hover glass rounded-2xl p-5 shadow border border-orange-100 cursor-pointer" onclick="openSpeak(${i})">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-2xl">${item.icon || '🗣️'}</span>
          <div>
            <div class="font-bold text-gray-800">${item.title}</div>
            <div class="text-xs text-gray-500">${item.context || ''}</div>
          </div>
        </div>
        <div class="text-xs text-orange-500 font-medium mt-2">${item.teacherQuestions?.length || 0} preguntas del prof →</div>
      </div>`;
  });
  showView('speak');
}

function openSpeak(index) {
  const items = DB[state.level].speak || [];
  state.currentSpeak = items[index];
  state.speakIndex = index;

  document.getElementById('speak-area').classList.remove('hidden');
  document.getElementById('speak-area').scrollIntoView({ behavior: 'smooth' });

  document.getElementById('speak-icon').textContent = state.currentSpeak.icon || '🗣️';
  document.getElementById('speak-title').textContent = state.currentSpeak.title;
  document.getElementById('speak-context').textContent = state.currentSpeak.context || '';
  document.getElementById('card-a').innerHTML = (state.currentSpeak.cardA || '').replace(/\n/g, '<br>');
  document.getElementById('card-b').innerHTML = (state.currentSpeak.cardB || '').replace(/\n/g, '<br>');

  const tq = document.getElementById('teacher-questions');
  tq.innerHTML = (state.currentSpeak.teacherQuestions || []).map(q =>
    `<div class="flex items-start gap-2 text-sm text-gray-700">
      <span class="text-purple-400 mt-0.5 flex-shrink-0">❓</span>
      <span>${q}</span>
    </div>`
  ).join('');

  const ph = document.getElementById('useful-phrases');
  ph.innerHTML = (state.currentSpeak.phrases || []).map(p =>
    `<span class="text-xs bg-white border border-green-200 text-green-700 px-3 py-1.5 rounded-full cursor-pointer hover:bg-green-100 transition-colors" onclick="speak('${p.replace(/'/g, "\\'")}')">🔊 ${p}</span>`
  ).join('');
}

function randomSpeak() {
  const items = DB[state.level].speak || [];
  if (items.length === 0) return;
  openSpeak(Math.floor(Math.random() * items.length));
}

function nextSpeak() {
  const items = DB[state.level].speak || [];
  const nextIdx = (state.speakIndex + 1) % items.length;
  openSpeak(nextIdx);
}

// ── TEST MODE ─────────────────────────────────────────────────
function initTest() {
  const questions = DB[state.level].test || [];
  document.getElementById('test-header-sub').textContent = `${LEVEL_LABEL[state.level]||state.level} — Prueba completa`;
  document.getElementById('test-intro-title').textContent = `Prueba ${LEVEL_LABEL[state.level]||state.level}`;
  document.getElementById('test-q-count').textContent = `${questions.length} preguntas`;
  document.getElementById('test-intro').classList.remove('hidden');
  document.getElementById('test-questions').classList.add('hidden');
  document.getElementById('test-results').classList.add('hidden');
  showView('test');
}

function startTest() {
  const all = [...(DB[state.level].test || [])];
  // Shuffle
  state.testQuestions = all.sort(() => Math.random() - 0.5);
  state.testIndex = 0;
  state.testScore = 0;
  state.testAnswered = false;

  document.getElementById('test-intro').classList.add('hidden');
  document.getElementById('test-questions').classList.remove('hidden');
  document.getElementById('test-results').classList.add('hidden');
  renderTestQuestion();
}

function renderTestQuestion() {
  const q = state.testQuestions[state.testIndex];
  const total = state.testQuestions.length;
  const pct = (state.testIndex / total) * 100;

  document.getElementById('test-q-label').textContent = `Pregunta ${state.testIndex + 1} de ${total}`;
  document.getElementById('test-score-live').textContent = `${state.testScore} ✓`;
  document.getElementById('test-progress-bar').style.width = pct + '%';
  document.getElementById('test-q-category').textContent = q.category || '';
  document.getElementById('test-q-text').textContent = q.text;
  document.getElementById('test-feedback').classList.add('hidden');
  document.getElementById('test-next-btn').classList.add('hidden');
  state.testAnswered = false;

  const opts = document.getElementById('test-options');
  opts.innerHTML = q.options.map((opt, i) => `
    <button onclick="answerTest(${i})" class="option-btn w-full text-left px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center gap-3">
      <span class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0">${'ABCD'[i]}</span>
      ${opt}
    </button>`).join('');
}

function answerTest(idx) {
  if (state.testAnswered) return;
  state.testAnswered = true;
  const q = state.testQuestions[state.testIndex];
  const btns = document.querySelectorAll('#test-options .option-btn');
  btns.forEach(b => b.classList.add('disabled'));
  btns.forEach((b, i) => {
    if (i === q.correct) b.classList.add('correct');
    else if (i === idx && idx !== q.correct) b.classList.add('wrong');
  });

  const isCorrect = idx === q.correct;
  if (isCorrect) { state.testScore++; state.stats.correct++; saveStats(); updateStats(); }

  const fb = document.getElementById('test-feedback');
  fb.classList.remove('hidden');
  fb.className = `mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`;
  document.getElementById('test-feedback-text').textContent = isCorrect ? '✅ ¡Correcto!' : `❌ Incorrecto — La respuesta correcta es: ${q.options[q.correct]}`;
  document.getElementById('test-feedback-text').className = `font-semibold text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`;
  document.getElementById('test-feedback-explain').textContent = q.explanation || '';
  document.getElementById('test-next-btn').classList.remove('hidden');
}

function nextTestQuestion() {
  state.testIndex++;
  if (state.testIndex >= state.testQuestions.length) {
    finishTest();
  } else {
    renderTestQuestion();
  }
}

function finishTest() {
  const total = state.testQuestions.length;
  const score = state.testScore;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  document.getElementById('test-questions').classList.add('hidden');
  document.getElementById('test-results').classList.remove('hidden');

  document.getElementById('result-emoji').textContent = passed ? '🎉' : '📚';
  const badge = document.getElementById('result-passed-badge');
  badge.textContent = passed ? '✅ GODKÄND — Aprobado' : '❌ UNDERKÄND — Reprobado';
  badge.className = `inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-lg mb-3 ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`;
  document.getElementById('result-score').textContent = `${score} / ${total}`;
  document.getElementById('result-pct').textContent = `${pct}%`;
  document.getElementById('result-msg').textContent = passed
    ? '¡Excelente! Estás preparado para el examen SFI.'
    : `Necesitas el 70% para aprobar. ¡Sigue practicando, tú puedes!`;

  const bar = document.getElementById('result-bar');
  setTimeout(() => {
    bar.style.width = pct + '%';
    bar.className = `h-5 rounded-full transition-all duration-1000 ${passed ? 'bg-green-500' : 'bg-red-400'}`;
  }, 100);
}

function restartTest() {
  initTest();
}

// ── STATS ─────────────────────────────────────────────────────
function loadStats() {
  try {
    const s = JSON.parse(localStorage.getItem('scs_stats') || '{}');
    state.stats = { sessions: s.sessions || 0, correct: s.correct || 0, streak: s.streak || 0 };
  } catch(e) {}
}

function saveStats() {
  localStorage.setItem('scs_stats', JSON.stringify(state.stats));
}

function updateStats() {
  document.getElementById('stat-sessions').textContent = state.stats.sessions;
  document.getElementById('stat-correct').textContent = state.stats.correct;
  document.getElementById('stat-streak').textContent = `${state.stats.streak}🔥`;
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  const colors = { info: '#006AA7', success: '#16A34A', error: '#DC2626', warning: '#D97706' };
  t.style.background = colors[type] || colors.info;
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}

// ── ADMIN ─────────────────────────────────────────────────────
function goAdmin() {
  stopSpeech();
  if (!isAdminUser()) {
    if (window._sbSession) { showToast('No tienes acceso de administrador.', 'error'); return; }
    _wantAdmin = true;
    _adminLoginMode();
    showView('login');
    showToast('Inicia sesión con tu cuenta de administrador', 'info');
    return;
  }
  state.adminLoggedIn = true;
  const lg = document.getElementById('admin-login'); if (lg) lg.classList.add('hidden');
  const pn = document.getElementById('admin-panel'); if (pn) pn.classList.remove('hidden');
  adminTab('dashboard');
  showView('admin');
}

function adminLogin() {
  if (isAdminUser()) {
    state.adminLoggedIn = true;
    document.getElementById('admin-login')?.classList.add('hidden');
    document.getElementById('admin-panel')?.classList.remove('hidden');
    adminTab('dashboard');
    showToast('¡Bienvenida! 👋', 'success');
  } else {
    showToast('No tienes acceso de administrador.', 'error');
  }
}

function adminLogout() {
  state.adminLoggedIn = false;
  showToast('Sesión cerrada', 'info');
  goHome();
}

function adminTab(tab) {
  state.adminTab = tab;
  document.querySelectorAll('.admin-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });

  const dashSection     = document.getElementById('admin-dashboard-section');
  const studentsSection = document.getElementById('admin-students-section');
  const configSection   = document.getElementById('admin-config-section');
  const reviewsSection  = document.getElementById('admin-reviews-section');
  const contentList     = document.getElementById('admin-content-list');
  const levelSelector   = document.querySelector('.admin-level-selector');

  // Hide all special sections first
  if (dashSection)     dashSection.classList.add('hidden');
  if (studentsSection) studentsSection.classList.add('hidden');
  if (configSection)   configSection.classList.add('hidden');
  if (reviewsSection)  reviewsSection.classList.add('hidden');
  if (contentList)     contentList.classList.remove('hidden');
  document.querySelectorAll('#admin-panel .glass').forEach(el => {
    if (el.querySelector('#admin-form') || el.querySelector('#import-file')) el.classList.remove('hidden');
  });

  if (tab === 'dashboard') {
    if (dashSection) dashSection.classList.remove('hidden');
    if (contentList) contentList.classList.add('hidden');
    document.querySelectorAll('#admin-panel .glass').forEach(el => {
      if (el.querySelector('#admin-form') || el.querySelector('#import-file')) el.classList.add('hidden');
    });
    renderAdminDashboard();
  } else if (tab === 'students') {
    if (studentsSection) studentsSection.classList.remove('hidden');
    if (contentList) contentList.classList.add('hidden');
    document.querySelectorAll('#admin-panel .glass').forEach(el => {
      if (el.querySelector('#admin-form') || el.querySelector('#import-file')) el.classList.add('hidden');
    });
    renderStudents();
  } else if (tab === 'config') {
    if (configSection) configSection.classList.remove('hidden');
    if (contentList) contentList.classList.add('hidden');
    document.querySelectorAll('#admin-panel .glass').forEach(el => {
      if (el.querySelector('#admin-form') || el.querySelector('#import-file')) el.classList.add('hidden');
    });
    loadStripeConfigUI();
  } else if (tab === 'reviews') {
    if (reviewsSection) reviewsSection.classList.remove('hidden');
    if (contentList) contentList.classList.add('hidden');
    document.querySelectorAll('#admin-panel .glass').forEach(el => {
      if (el.querySelector('#admin-form') || el.querySelector('#import-file')) el.classList.add('hidden');
    });
    renderAdminReviews();
  } else {
    renderAdminContent();
    renderAdminForm();
  }
}

function adminLevel(level) {
  state.adminLevel = level;
  document.querySelectorAll('.admin-level-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.level === level);
  });
  renderAdminContent();
  renderAdminForm();
}

function renderAdminContent() {
  const items = DB[state.adminLevel]?.[state.adminTab] || [];
  const container = document.getElementById('admin-content-list');
  if (items.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-gray-400 text-sm">No hay contenido. Usa el formulario de abajo para agregar.</div>`;
    renderAdminForm();
    return;
  }
  container.innerHTML = items.map((item, i) => `
    <div class="glass rounded-xl p-4 border border-gray-200 flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-gray-800 text-sm">${item.title || item.text?.substring(0,50) || 'Sin título'}</div>
        <div class="text-xs text-gray-400 mt-0.5">${item.topic || item.tag || item.category || ''} ${item.questions ? '· ' + item.questions.length + ' preguntas' : ''}</div>
      </div>
      <button onclick="deleteAdminItem(${i})" class="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 text-sm">🗑️</button>
    </div>`).join('');
  renderAdminForm();
}

function renderAdminForm() {
  const form = document.getElementById('admin-form');
  const tab = state.adminTab;

  if (tab === 'listen') {
    form.innerHTML = `
      <div class="space-y-3">
        <div><label class="text-sm font-medium text-gray-700 block mb-1">Título del audio *</label>
          <input id="f-title" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Ej: I butiken"></div>
        <div><label class="text-sm font-medium text-gray-700 block mb-1">Tema</label>
          <input id="f-topic" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Ej: Supermercado"></div>
        <div><label class="text-sm font-medium text-gray-700 block mb-1">Texto del audio en sueco *</label>
          <textarea id="f-text" rows="4" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none resize-none" placeholder="Escribe el diálogo o texto en sueco que se leerá en voz alta..."></textarea></div>
        <div><label class="text-sm font-medium text-gray-700 block mb-1">Pregunta 1</label>
          <input id="f-q1" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Texto de la pregunta">
          <div class="grid grid-cols-2 gap-2 mt-2">
            <input id="f-q1a" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción A">
            <input id="f-q1b" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción B">
            <input id="f-q1c" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción C">
            <input id="f-q1d" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción D">
          </div>
          <select id="f-q1c-idx" class="mt-2 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs">
            <option value="0">Correcta: A</option><option value="1">Correcta: B</option>
            <option value="2">Correcta: C</option><option value="3">Correcta: D</option>
          </select>
          <input id="f-q1ex" class="mt-1 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Explicación de la respuesta correcta">
        </div>
      </div>`;
  } else if (tab === 'read') {
    form.innerHTML = `
      <div class="space-y-3">
        <input id="f-title" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Título del texto *">
        <input id="f-tag" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Etiqueta temática (ej: Familia)">
        <textarea id="f-text" rows="5" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none resize-none" placeholder="Texto en sueco para leer *"></textarea>
        <div class="text-xs text-gray-500">Agrega las preguntas desde el editor JSON o contacta a soporte para más opciones.</div>
      </div>`;
  } else if (tab === 'write') {
    form.innerHTML = `
      <div class="space-y-3">
        <input id="f-title" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Título de la tarea de escritura *">
        <input id="f-words" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Número de palabras (ej: 30-50 ord)">
        <textarea id="f-prompt" rows="4" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none resize-none" placeholder="Instrucciones / consigna para el alumno *"></textarea>
        <textarea id="f-example" rows="4" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none resize-none" placeholder="Ejemplo de respuesta excelente (opcional)"></textarea>
      </div>`;
  } else if (tab === 'speak') {
    form.innerHTML = `
      <div class="space-y-3">
        <input id="f-title" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Título de la situación *">
        <input id="f-context" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Contexto (ej: En el médico)">
        <textarea id="f-cardA" rows="3" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none resize-none" placeholder="Tarjeta Estudiante A (instrucciones para A) *"></textarea>
        <textarea id="f-cardB" rows="3" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none resize-none" placeholder="Tarjeta Estudiante B (instrucciones para B) *"></textarea>
        <textarea id="f-phrases" rows="2" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none resize-none" placeholder="Frases útiles (separadas por punto y coma ; )"></textarea>
      </div>`;
  } else if (tab === 'test') {
    form.innerHTML = `
      <div class="space-y-3">
        <select id="f-category" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none">
          <option>Gramática</option><option>Vocabulario</option><option>Comprensión</option><option>Pronunciación</option>
        </select>
        <input id="f-qtext" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Texto de la pregunta *">
        <div class="grid grid-cols-2 gap-2">
          <input id="f-o0" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción A *">
          <input id="f-o1" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción B *">
          <input id="f-o2" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción C *">
          <input id="f-o3" class="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Opción D *">
        </div>
        <select id="f-correct" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none">
          <option value="0">Respuesta correcta: A</option><option value="1">Respuesta correcta: B</option>
          <option value="2">Respuesta correcta: C</option><option value="3">Respuesta correcta: D</option>
        </select>
        <input id="f-explain" class="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-swe-blue focus:outline-none" placeholder="Explicación de la respuesta">
      </div>`;
  }
}

function adminSave() {
  const tab = state.adminTab;
  const level = state.adminLevel;
  let item = null;

  if (tab === 'listen') {
    const title = document.getElementById('f-title')?.value.trim();
    const text = document.getElementById('f-text')?.value.trim();
    if (!title || !text) { showToast('Título y texto son obligatorios', 'error'); return; }
    const q1 = document.getElementById('f-q1')?.value.trim();
    const questions = [];
    if (q1) {
      questions.push({
        text: q1,
        options: [
          document.getElementById('f-q1a')?.value || 'A',
          document.getElementById('f-q1b')?.value || 'B',
          document.getElementById('f-q1c')?.value || 'C',
          document.getElementById('f-q1d')?.value || 'D',
        ],
        correct: parseInt(document.getElementById('f-q1c-idx')?.value || '0'),
        explanation: document.getElementById('f-q1ex')?.value || '',
      });
    }
    item = { id: 'custom-' + Date.now(), title, topic: document.getElementById('f-topic')?.value || '', text, icon: '🎧', duration: '~45s', questions };
  } else if (tab === 'read') {
    const title = document.getElementById('f-title')?.value.trim();
    const text = document.getElementById('f-text')?.value.trim();
    if (!title || !text) { showToast('Título y texto son obligatorios', 'error'); return; }
    item = { id: 'custom-' + Date.now(), title, tag: document.getElementById('f-tag')?.value || '', text, icon: '📖', questions: [] };
  } else if (tab === 'write') {
    const title = document.getElementById('f-title')?.value.trim();
    const prompt = document.getElementById('f-prompt')?.value.trim();
    if (!title || !prompt) { showToast('Título y consigna son obligatorios', 'error'); return; }
    item = { id: 'custom-' + Date.now(), title, words: document.getElementById('f-words')?.value || '', prompt, icon: '✍️', example: document.getElementById('f-example')?.value || '', checklist: [], criteria: [] };
  } else if (tab === 'speak') {
    const title = document.getElementById('f-title')?.value.trim();
    const cardA = document.getElementById('f-cardA')?.value.trim();
    const cardB = document.getElementById('f-cardB')?.value.trim();
    if (!title || !cardA) { showToast('Título y Tarjeta A son obligatorios', 'error'); return; }
    const phrasesRaw = document.getElementById('f-phrases')?.value || '';
    item = { id: 'custom-' + Date.now(), title, context: document.getElementById('f-context')?.value || '', cardA, cardB, icon: '🗣️', teacherQuestions: [], phrases: phrasesRaw.split(';').map(p => p.trim()).filter(Boolean) };
  } else if (tab === 'test') {
    const qtext = document.getElementById('f-qtext')?.value.trim();
    const o0 = document.getElementById('f-o0')?.value.trim();
    const o1 = document.getElementById('f-o1')?.value.trim();
    if (!qtext || !o0 || !o1) { showToast('Pregunta y al menos 2 opciones son obligatorias', 'error'); return; }
    item = {
      category: document.getElementById('f-category')?.value || 'Gramática',
      text: qtext,
      options: [o0, o1, document.getElementById('f-o2')?.value || 'C', document.getElementById('f-o3')?.value || 'D'],
      correct: parseInt(document.getElementById('f-correct')?.value || '0'),
      explanation: document.getElementById('f-explain')?.value || '',
    };
  }

  if (item) {
    saveCustomContent(level, tab, item);
    showToast('¡Guardado correctamente! ✅', 'success');
    renderAdminContent();
  }
}

function deleteAdminItem(index) {
  const items = DB[state.adminLevel]?.[state.adminTab];
  if (!items) return;
  items.splice(index, 1);
  // Also update localStorage
  const saved = JSON.parse(localStorage.getItem('scs_data') || '{}');
  if (saved[state.adminLevel]?.[state.adminTab]) {
    saved[state.adminLevel][state.adminTab].splice(index, 1);
    localStorage.setItem('scs_data', JSON.stringify(saved));
  }
  renderAdminContent();
  showToast('Elemento eliminado', 'info');
}

function exportData() {
  const data = JSON.stringify(DB, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'scs-data.json';
  a.click();
  showToast('Datos exportados', 'success');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem('scs_data', JSON.stringify(data));
      showToast('Datos importados. Recarga la página.', 'success');
    } catch(err) {
      showToast('Error al importar el archivo JSON', 'error');
    }
  };
  reader.readAsText(file);
}

// ═══════════════════════════════════════════════════════════
//  SISTEMA DE LOGIN Y GESTIÓN DE ALUMNOS
// ═══════════════════════════════════════════════════════════

// ── Device Fingerprint ────────────────────────────────────
function getDeviceKey() {
  const data = [
    navigator.userAgent,
    screen.width + 'x' + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.language,
    screen.colorDepth
  ].join('|');
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'dk_' + Math.abs(hash).toString(36);
}

const DEVICE_KEY = getDeviceKey();
const MAX_DEVICES = 2;

// ── Student Storage (Supabase) ────────────────────────────
let _lastStudentsError = null;
async function getStudents() {
  const result = await adminOps('list_students');
  // Si hubo error (sesión/permiso), NO borres los datos que ya tenías: solo marca el error
  if (result.error || !result.students) {
    _lastStudentsError = result.error || 'sin_datos';
    if (!_cachedStudents) _cachedStudents = [];
    return _cachedStudents;
  }
  _lastStudentsError = null;
  // Map snake_case DB columns → camelCase for existing UI code
  _cachedStudents = (result.students || []).map(s => ({
    id: s.id,
    name: s.name,
    email: s.email,
    active: s.active,
    status: s.status,
    price: s.price,
    paymentMethod: s.payment_method,
    stripeCustomerId: s.stripe_customer_id,
    stripeSubscriptionId: s.stripe_subscription_id,
    joinDate: s.join_date,
    nextPaymentDate: s.next_payment_date,
    deviceKeys: s.device_keys || [],
    createdAt: s.created_at,
    lastLogin: s.last_login,
    cancelsAt: s.cancels_at || null,
    level: s.level || null,
    grupo: s.grupo || null,
  }));
  return _cachedStudents;
}

function saveStudents() { /* deprecated — use adminOps directly */ }

// ── Session (Supabase Auth) ───────────────────────────────
function getSession() {
  // Returns cached session (set on login or DOMContentLoaded check)
  return window._sbSession || null;
}

function clearSession() {
  window._sbSession = null;
  sb.auth.signOut();
}

// ── Login (Supabase Auth) ─────────────────────────────────
async function loginStudent() {
  const email    = (document.getElementById('login-email')?.value || '').trim().toLowerCase();
  const password = (document.getElementById('login-password')?.value || '').trim();
  const errEl    = document.getElementById('login-error');
  const btn      = document.getElementById('login-btn');

  const showErr = msg => {
    if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
    if (btn) { btn.disabled = false; btn.textContent = 'Entrar'; }
  };

  if (!email || !password) { showErr('Por favor ingresa tu correo y contraseña.'); return; }
  if (btn) { btn.disabled = true; btn.textContent = 'Verificando...'; }

  // 1. Auth via Supabase
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) { showErr('Correo o contraseña incorrectos. Verifica tus datos.'); return; }

  // 2. Check student record (RLS: student reads own row only)
  const { data: student, error: dbErr } = await sb
    .from('students')
    .select('active, status, name, device_keys')
    .eq('id', data.user.id)
    .single();

  const _isAdmin = ADMIN_EMAILS.includes((email || '').toLowerCase());

  if ((dbErr || !student) && !_isAdmin) {
    await sb.auth.signOut();
    showErr('Error al verificar tu cuenta. Contacta a Sophie.');
    return;
  }

  // Admin: entra siempre (aunque no tenga fila de alumno). Alumno inactivo: entra en modo bloqueado.
  const blocked = student ? !student.active : false;

  if (student && !blocked && !_isAdmin) {
    const deviceKeys = student.device_keys || [];
    const alreadyRegistered = deviceKeys.includes(DEVICE_KEY);
    if (!alreadyRegistered && deviceKeys.length >= MAX_DEVICES) {
      await sb.auth.signOut();
      showErr(`Límite de ${MAX_DEVICES} dispositivos alcanzado. Contacta a Sophie.`);
      return;
    }
    const updFields = alreadyRegistered
      ? { last_login: new Date().toISOString() }
      : { device_keys: [...deviceKeys, DEVICE_KEY], last_login: new Date().toISOString() };
    await sb.from('students').update(updFields).eq('id', data.user.id);
  }

  window._sbSession = {
    email: data.user.email, id: data.user.id,
    name: (student && student.name) || (_isAdmin ? 'Admin' : (email || '')),
    active: student ? student.active : true,
    status: student ? student.status : 'active',
  };
  errEl?.classList.add('hidden');
  if (btn) { btn.disabled = false; btn.textContent = 'Entrar'; }
  const adminBtn = document.getElementById('admin-btn-home');
  if (adminBtn) adminBtn.style.display = isAdminUser() ? '' : 'none';
  showView('home');
  renderHomeDashboard();
  showToast(_isAdmin ? '¡Bienvenida! Tienes acceso de administrador 👋' : (blocked ? `Hej ${student.name}. Tu suscripción está inactiva.` : `¡Välkommen, ${student.name}! 🇸🇪`), 'success');
  if (isAdminUser() && _wantAdmin) { _wantAdmin = false; goAdmin(); }
}

async function logoutStudent() {
  window._sbSession = null;
  await sb.auth.signOut();
  showView('login');
  showToast('Sesión cerrada', 'info');
}

async function manageSubscription() {
  showToast('Cargando portal...', 'info');
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { showToast('Debes iniciar sesión primero', 'error'); return; }

    // Obtener stripe_customer_id del alumno
    const { data: student } = await sb
      .from('students')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single();

    if (!student?.stripe_customer_id) {
      showToast('No tienes una suscripción activa de Stripe. Contacta a Sophie.', 'info');
      return;
    }

    // Pedir al Edge Function que cree una sesión del portal
    const res = await fetch(EDGE_FN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        action: 'create_portal_session',
        data: {
          customer_id: student.stripe_customer_id,
          return_url: window.location.href
        }
      })
    });
    const result = await res.json();
    if (result.url) {
      window.location.href = result.url;
    } else {
      showToast('No se pudo abrir el portal. Contacta a Sophie.', 'error');
    }
  } catch(e) {
    console.error('manageSubscription error:', e);
    showToast('Error al cargar el portal. Intenta de nuevo.', 'error');
  }
}

// ── Check session on load (Supabase Auth) ────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Detect password recovery link (from "forgot password" email)
  const hash = window.location.hash;
  if (hash.includes('type=recovery') || hash.includes('type=invite')) {
    showView('newpass');
    return;
  }
  if (new URLSearchParams(window.location.search).has('bienvenido')) { showView('welcome'); return; }
  // Página pública de reseñas (no requiere iniciar sesión). Acepta /reseñas y /resenas.
  const _rpath = (() => { try { return decodeURIComponent(window.location.pathname || ''); } catch (e) { return window.location.pathname || ''; } })();
  if (/\/rese[nñ]as\/?$/i.test(_rpath) || hash === '#resenas' || hash === '#reseñas') {
    showView('resenas'); initResenasPage(); return;
  }
  if (hash === '#admin' || /\/admin\/?$/i.test(window.location.pathname || '')) _wantAdmin = true;

  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    const _adm = ADMIN_EMAILS.includes((session.user.email || '').toLowerCase());
    const { data: student } = await sb
      .from('students').select('active, status').eq('id', session.user.id).single();
    if (student || _adm) {
      window._sbSession = { email: session.user.email, id: session.user.id, active: student ? student.active : true, status: student ? student.status : 'active' };
      const adminBtn = document.getElementById('admin-btn-home');
      if (adminBtn) adminBtn.style.display = isAdminUser() ? '' : 'none';
      showView('home');
      renderHomeDashboard();
      if (_wantAdmin && isAdminUser()) { _wantAdmin = false; goAdmin(); }
      return;
    }
    await sb.auth.signOut();
  }
  if (_wantAdmin) _adminLoginMode();
  showView('login');
});

// ── Forgot password ───────────────────────────────────────
function goToLoginFromWelcome() {
  try { window.history.replaceState(null, '', window.location.pathname); } catch (e) {}
  showView('login');
}

// ── Aviso superior (se puede cerrar; cambia 'v1' si actualizas el mensaje) ──
const _ANNOUNCE_KEY = 'sc_banner_v1';
function _todayStr() { return new Date().toISOString().slice(0, 10); }
function dismissAnnounce() {
  const el = document.getElementById('announce-banner');
  if (el) el.style.display = 'none';
  // Se oculta solo por HOY; vuelve a aparecer mañana.
  try { localStorage.setItem(_ANNOUNCE_KEY, _todayStr()); } catch (e) {}
}
function initAnnounce() {
  try {
    if (localStorage.getItem(_ANNOUNCE_KEY) === _todayStr()) {
      const el = document.getElementById('announce-banner');
      if (el) el.style.display = 'none';
    }
  } catch (e) {}
}

// ═══════════════════════════════════════════════════════════
//  RESEÑAS (públicas) + SOPORTE
// ═══════════════════════════════════════════════════════════
const _AVATAR_COLORS = ['#006AA7','#10B981','#F59E0B','#8B5CF6','#EF4444','#EC4899','#0EA5E9','#14B8A6'];
function reviewAvatar(name) {
  const n = (name || '?').trim();
  const initial = (n.charAt(0) || '?').toUpperCase();
  let h = 0; for (let i=0;i<n.length;i++) h = (h*31 + n.charCodeAt(i)) & 0xffff;
  return { initial, color: _AVATAR_COLORS[h % _AVATAR_COLORS.length] };
}
function starsHtml(n) {
  n = Math.round(n||0); let s = '';
  for (let i=1;i<=5;i++) s += `<span style="color:${i<=n?'#F59E0B':'#D1D5DB'}">★</span>`;
  return s;
}
function escHtml(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmtReviewDate(iso){ try { return new Date(iso).toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'}); } catch(e){ return ''; } }

let _publicReviews = [];
let _reviewRating = 0;
let _reviewsPage = 0;

async function initResenasPage() {
  try { const { data: { session } } = await sb.auth.getSession(); if (session) window._sbSession = { email: session.user.email, id: session.user.id }; } catch (e) {}
  updateReviewFormVisibility();
  await loadPublicReviews();
}

async function loadPublicReviews() {
  try {
    const { data, error } = await sb.from('reviews').select('*').eq('status','approved').order('created_at',{ascending:false});
    if (error) throw error;
    _publicReviews = data || [];
  } catch (e) { _publicReviews = []; }
  renderResenasPage();
}

function renderResenasPage() {
  const r = _publicReviews;
  const barsEl = document.getElementById('resenas-bars');
  const avgEl = document.getElementById('resenas-average');
  if (r.length === 0) {
    if (barsEl) barsEl.innerHTML = '<div class="text-gray-400 text-sm text-center py-4">Aún no hay reseñas. ¡Sé el primero! 🙌</div>';
    if (avgEl) avgEl.innerHTML = '<div class="text-5xl font-black" style="color:#006AA7">–</div><div class="text-sm text-gray-400 mt-2">Sin reseñas todavía</div>';
  } else {
    const avg = r.reduce((a,x)=>a+(x.rating||0),0)/r.length;
    const bars = [5,4,3,2,1].map(st => {
      const c = r.filter(x=>x.rating===st).length, pct = Math.round(c/r.length*100);
      return `<div class="flex items-center gap-2 text-xs mb-1.5">
        <span class="w-3 text-gray-600 font-semibold">${st}</span>
        <span style="color:#F5B301">★</span>
        <div class="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full rounded-full" style="width:${pct}%;background:#F5B301"></div></div>
        <span class="w-8 text-right text-gray-400">${c}</span>
      </div>`;
    }).join('');
    if (barsEl) barsEl.innerHTML = bars;
    if (avgEl) avgEl.innerHTML = `
      <div class="text-5xl font-black" style="color:#006AA7">${avg.toFixed(1)}</div>
      <div class="text-2xl my-1">${starsHtml(avg)}</div>
      <div class="text-sm text-gray-500 font-semibold">${r.length} reseña${r.length!==1?'s':''}</div>`;
  }
  const list = document.getElementById('resenas-list');
  const pag = document.getElementById('resenas-pagination');
  const perPage = 5;
  const pages = Math.max(1, Math.ceil(r.length / perPage));
  if (_reviewsPage >= pages) _reviewsPage = 0;
  const slice = r.slice(_reviewsPage * perPage, _reviewsPage * perPage + perPage);
  if (list) {
    list.innerHTML = slice.map(rv => {
      const av = reviewAvatar(rv.name);
      return `<div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex gap-3">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style="background:${av.color}">${av.initial}</div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <div class="font-bold text-gray-800 text-sm truncate">${escHtml(rv.name)}</div>
              <div class="text-sm flex-shrink-0">${starsHtml(rv.rating)}</div>
            </div>
            ${rv.verified ? '<div class="text-[11px] text-emerald-600 font-semibold mb-1">✔ Alumno verificado</div>' : '<div class="text-[11px] text-gray-400 mb-1">Reseña</div>'}
            <p class="text-gray-600 text-sm leading-relaxed">${escHtml(rv.comment)}</p>
            <div class="text-[11px] text-gray-400 mt-1">${fmtReviewDate(rv.created_at)}</div>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  if (pag) {
    if (pages <= 1) { pag.innerHTML = ''; }
    else {
      const btn = 'px-4 py-2 rounded-xl text-sm font-bold transition-colors';
      pag.innerHTML = `
        <button onclick="reviewsGoPage(${_reviewsPage-1})" ${_reviewsPage===0?'disabled style=\"opacity:.4;cursor:default\"':''} class="${btn} bg-white border border-gray-200 text-swe-blue hover:bg-blue-50">‹ Anterior</button>
        <span class="text-sm text-gray-500 font-semibold">Página ${_reviewsPage+1} de ${pages}</span>
        <button onclick="reviewsGoPage(${_reviewsPage+1})" ${_reviewsPage>=pages-1?'disabled style=\"opacity:.4;cursor:default\"':''} class="${btn} bg-white border border-gray-200 text-swe-blue hover:bg-blue-50">Siguiente ›</button>`;
    }
  }
}

function reviewsGoPage(n) {
  const pages = Math.max(1, Math.ceil(_publicReviews.length / 5));
  _reviewsPage = Math.min(Math.max(0, n), pages - 1);
  renderResenasPage();
  const top = document.getElementById('resenas-summary');
  if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateReviewFormVisibility() {
  const logged = !!(window._sbSession && window._sbSession.id);
  const formBox = document.getElementById('review-form-box');
  const loginBox = document.getElementById('review-login-box');
  if (formBox) formBox.classList.toggle('hidden', !logged);
  if (loginBox) loginBox.classList.toggle('hidden', logged);
}

function setReviewRating(n) {
  _reviewRating = n;
  document.querySelectorAll('#review-stars .rv-star').forEach((el,i) => { el.style.color = (i < n) ? '#F59E0B' : '#D1D5DB'; });
}

async function submitReview() {
  if (!(window._sbSession && window._sbSession.id)) { showToast('Inicia sesión para dejar tu reseña', 'info'); return; }
  if (_reviewRating < 1) { showToast('Elige cuántas estrellas ⭐', 'info'); return; }
  const comment = (document.getElementById('review-comment')?.value || '').trim();
  const nameInput = (document.getElementById('review-name')?.value || '').trim();
  const name = nameInput || (window._sbSession.email || 'Alumno').split('@')[0];
  const btn = document.getElementById('review-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
  try {
    const { error } = await sb.from('reviews').insert({ user_id: window._sbSession.id, name, rating: _reviewRating, comment, verified: true, status: 'pending' });
    if (error) throw error;
    const fb = document.getElementById('review-form-box');
    if (fb) fb.innerHTML = '<div class="text-center py-6"><div class="text-4xl mb-2">🙏</div><p class="font-bold text-gray-800">¡Gracias por tu reseña!</p><p class="text-gray-500 text-sm mt-1">La revisaremos y aparecerá pronto.</p></div>';
  } catch (e) {
    showToast('No se pudo enviar: ' + (e.message||''), 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Publicar reseña'; }
  }
}

async function submitSupport() {
  const name = (document.getElementById('sup-name')?.value || '').trim();
  const email = (document.getElementById('sup-email')?.value || '').trim();
  const tipo = (document.getElementById('sup-tipo')?.value || 'Mensaje');
  const message = (document.getElementById('sup-msg')?.value || '').trim();
  if (!email || !message) { showToast('Escribe tu correo y tu mensaje', 'info'); return; }
  const btn = document.getElementById('sup-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
  const result = await adminOps('send_support', { name, email, tipo, message });
  if (result.error || result.ok === false) {
    showToast('No se pudo enviar. Intenta de nuevo.', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Enviar mensaje'; }
    return;
  }
  const box = document.getElementById('support-box');
  if (box) box.innerHTML = '<div class="text-center py-4"><div class="text-3xl mb-2">✅</div><p class="font-bold text-gray-800">¡Mensaje enviado!</p><p class="text-gray-500 text-sm mt-1">Te responderemos a tu correo pronto.</p></div>';
}

// ── Reseñas: panel admin ──
let _adminReviews = [];
async function renderAdminReviews() {
  const container = document.getElementById('admin-reviews-list');
  if (!container) return;
  container.innerHTML = '<div class="text-center py-8 text-gray-400 text-sm">⏳ Cargando reseñas...</div>';
  const result = await adminOps('list_reviews');
  if (result.error) { container.innerHTML = '<div class="text-center py-8 text-sm text-gray-500">No se pudieron cargar las reseñas.</div>'; return; }
  _adminReviews = result.reviews || [];
  paintAdminReviews();
}

function paintAdminReviews() {
  const container = document.getElementById('admin-reviews-list');
  if (!container) return;
  const r = _adminReviews;
  const cnt = document.getElementById('admin-reviews-counts');
  if (cnt) {
    const pend = r.filter(x=>x.status==='pending').length, appr = r.filter(x=>x.status==='approved').length, hid = r.filter(x=>x.status==='hidden').length;
    cnt.innerHTML = `<span class="text-amber-600 font-semibold">⏳ ${pend} pendientes</span> · <span class="text-emerald-600">✔ ${appr} publicadas</span> · <span class="text-gray-400">🚫 ${hid} ocultas</span>`;
  }
  if (r.length === 0) { container.innerHTML = '<div class="text-center py-8 text-gray-400 text-sm">Aún no hay reseñas.</div>'; return; }
  container.innerHTML = r.map(rv => {
    const av = reviewAvatar(rv.name);
    const badge = rv.status==='approved' ? '<span class="text-emerald-600 font-semibold">✔ Publicada</span>' : rv.status==='hidden' ? '<span class="text-gray-400">🚫 Oculta</span>' : '<span class="text-amber-600 font-semibold">⏳ Pendiente</span>';
    const border = rv.status==='pending' ? 'border-amber-200' : rv.status==='approved' ? 'border-emerald-200' : 'border-gray-200';
    return `<div class="bg-white rounded-2xl p-4 shadow border ${border}">
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style="background:${av.color}">${av.initial}</div>
          <div><div class="font-bold text-gray-800 text-sm">${escHtml(rv.name)} ${rv.verified?'<span class="text-emerald-600 text-[10px]">✔</span>':''}</div><div class="text-sm">${starsHtml(rv.rating)}</div></div>
        </div>
        <div class="text-[11px]">${badge}</div>
      </div>
      <p class="text-gray-700 text-sm mb-2">${escHtml(rv.comment)}</p>
      <div class="text-[11px] text-gray-400 mb-3">${fmtReviewDate(rv.created_at)}</div>
      <div class="flex gap-2 flex-wrap">
        ${rv.status!=='approved' ? `<button onclick="moderateReview('${rv.id}','approved')" class="py-1.5 px-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100">✔ Aprobar</button>`:''}
        ${rv.status!=='hidden' ? `<button onclick="moderateReview('${rv.id}','hidden')" class="py-1.5 px-3 rounded-xl text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100">🚫 Ocultar</button>`:''}
        <button onclick="deleteReview('${rv.id}')" class="py-1.5 px-3 rounded-xl text-xs font-semibold bg-gray-50 text-gray-400 hover:text-red-500 border border-gray-200">🗑️</button>
      </div>
    </div>`;
  }).join('');
}

async function moderateReview(id, status) {
  const result = await adminOps('moderate_review', { id, status });
  if (result.error) { showToast('Error: '+result.error,'error'); return; }
  const rv = _adminReviews.find(x=>x.id===id); if (rv) rv.status = status;
  paintAdminReviews();
  showToast(status==='approved'?'✔ Reseña publicada':'Reseña actualizada','success');
}

async function deleteReview(id) {
  if (!confirm('¿Eliminar esta reseña? No se puede deshacer.')) return;
  const result = await adminOps('delete_review', { id });
  if (result.error) { showToast('Error: '+result.error,'error'); return; }
  _adminReviews = _adminReviews.filter(x=>x.id!==id);
  paintAdminReviews();
  showToast('Reseña eliminada','info');
}

function showForgotPassword() {
  document.getElementById('forgot-email').value = '';
  document.getElementById('forgot-error').classList.add('hidden');
  document.getElementById('forgot-success').classList.add('hidden');
  showView('forgot');
}

async function sendResetEmail() {
  const email = (document.getElementById('forgot-email')?.value || '').trim().toLowerCase();
  const errEl = document.getElementById('forgot-error');
  const okEl  = document.getElementById('forgot-success');
  const btn   = document.getElementById('forgot-btn');

  if (!email) {
    errEl.textContent = 'Ingresa tu correo electrónico.';
    errEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true; btn.textContent = 'Enviando...';
  errEl.classList.add('hidden');

  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });

  btn.disabled = false; btn.textContent = 'Enviar link →';

  if (error) {
    errEl.textContent = 'Error al enviar. Verifica el correo e intenta de nuevo.';
    errEl.classList.remove('hidden');
  } else {
    okEl.classList.remove('hidden');
  }
}

// ── Save new password (desde el link del email) ───────────
async function saveNewPassword() {
  const password = (document.getElementById('newpass-input')?.value || '').trim();
  const errEl    = document.getElementById('newpass-error');
  const btn      = document.getElementById('newpass-btn');

  if (password.length < 6) {
    errEl.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    errEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true; btn.textContent = 'Guardando...';

  const { error } = await sb.auth.updateUser({ password });

  if (error) {
    errEl.textContent = 'Error: ' + error.message;
    errEl.classList.remove('hidden');
    btn.disabled = false; btn.textContent = 'Guardar contraseña →';
    return;
  }

  showToast('✅ ¡Contraseña actualizada! Ya puedes entrar.', 'success');
  // Clean URL hash
  window.history.replaceState(null, '', window.location.pathname);
  showView('login');
}

// goHome already includes session check (see top of file)

// ── Student management (Admin) ────────────────────────────
async function addStudent() {
  const name     = (document.getElementById('s-name')?.value || '').trim();
  const email    = (document.getElementById('s-email')?.value || '').trim().toLowerCase();
  const password = (document.getElementById('s-password')?.value || '').trim();

  if (!name || !email || !password) { showToast('Nombre, correo y contraseña son obligatorios', 'error'); return; }
  if (password.length < 6) { showToast('La contraseña debe tener al menos 6 caracteres', 'error'); return; }

  const priceVal  = parseInt(document.getElementById('s-price')?.value || '0') || 0;
  const paymethod = document.getElementById('s-paymethod')?.value || 'manual';
  const statusVal = document.getElementById('s-status')?.value || 'active';

  const addBtn = document.querySelector('[onclick="addStudent()"]');
  if (addBtn) { addBtn.disabled = true; addBtn.textContent = 'Guardando...'; }

  const result = await adminOps('create_student', {
    name, email, studentPassword: password,
    status: statusVal, price: priceVal, paymentMethod: paymethod
  });

  if (addBtn) { addBtn.disabled = false; addBtn.textContent = '+ Agregar Alumno'; }

  if (result.error) {
    showToast('Error: ' + result.error, 'error');
    return;
  }

  document.getElementById('s-name').value = '';
  document.getElementById('s-email').value = '';
  document.getElementById('s-password').value = '';
  if (document.getElementById('s-price')) document.getElementById('s-price').value = '';
  showToast(`✅ Alumno "${name}" agregado en Supabase`, 'success');
  renderStudents();
}

async function toggleStudent(id) {
  const s = (_cachedStudents || []).find(st => st.id === id);
  const newActive = !(s?.active);
  const result = await adminOps('update_student', {
    id, fields: { active: newActive, status: newActive ? 'active' : 'cancelled' }
  });
  if (result.error) { showToast('Error: ' + result.error, 'error'); return; }
  showToast(newActive ? `✅ Acceso activado` : `🔒 Acceso desactivado`, newActive ? 'success' : 'info');
  renderStudents();
}

const GRUPOS = ['Vamos svenska 1', 'Vamos svenska 2', 'Vamos svenska 3', 'Vamos svenska 4'];

async function updateStudentGroup(id, grupo) {
  const result = await adminOps('update_student', { id, fields: { grupo: grupo || null } });
  if (result.error) { showToast('Error: ' + result.error, 'error'); return; }
  const s = (_cachedStudents || []).find(st => st.id === id);
  if (s) s.grupo = grupo || null;
  paintGroupChips();
  showToast(grupo ? `👥 Grupo asignado: ${grupo}` : '👥 Grupo quitado', grupo ? 'success' : 'info');
}

async function resetStudentDevices(id) {
  const result = await adminOps('reset_devices', { id });
  if (result.error) { showToast('Error: ' + result.error, 'error'); return; }
  showToast(`🔄 Dispositivos reseteados`, 'success');
  renderStudents();
}

async function resendAccess(id) {
  const s = (_cachedStudents || []).find(st => st.id === id);
  if (!confirm(`¿Reenviar el correo de acceso a ${s?.email || 'este alumno'}?\n\nRecibirá un enlace para crear su contraseña y entrar.`)) return;
  showToast('📧 Generando enlace de acceso...', 'info');
  const result = await adminOps('resend_access', { id });
  if (result.error) { showToast('Error: ' + result.error, 'error'); return; }
  showAccessLinkModal(result.email || s?.email || '', result.link || '', result.sent);
}

function showAccessLinkModal(email, link, sent) {
  const old = document.getElementById('access-link-modal');
  if (old) old.remove();
  const wrap = document.createElement('div');
  wrap.id = 'access-link-modal';
  wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
  wrap.innerHTML = `
    <div style="background:#fff;border-radius:18px;max-width:460px;width:100%;padding:26px 24px;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <div style="font-size:1.05rem;font-weight:800;color:#003f6b;margin-bottom:10px;">📧 Enlace de acceso</div>
      <div style="font-size:0.85rem;line-height:1.6;color:${sent ? '#059669' : '#b45309'};margin-bottom:16px;">
        ${sent
          ? '✅ Correo enviado a <b>' + email + '</b>.<br>Si no le llega, también puedes copiar el enlace de abajo y mandárselo tú mismo.'
          : '⚠️ El correo no salió por Resend. Copia el enlace de abajo y mándaselo tú (WhatsApp, tu correo, etc.).'}
      </div>
      <div style="font-size:0.72rem;color:#6b7280;margin-bottom:6px;">Enlace para crear su contraseña (válido 24 h):</div>
      <textarea readonly id="access-link-text" onclick="this.select()" style="width:100%;height:78px;font-size:0.72rem;padding:10px;border:1px solid #d1d5db;border-radius:10px;color:#374151;resize:none;font-family:monospace;box-sizing:border-box;">${link || '(no se pudo generar el enlace)'}</textarea>
      <div style="display:flex;gap:8px;margin-top:14px;">
        <button onclick="copyAccessLink()" style="flex:1;background:#006AA7;color:#fff;border:none;border-radius:10px;padding:11px;font-size:0.9rem;font-weight:700;cursor:pointer;">📋 Copiar enlace</button>
        <button onclick="document.getElementById('access-link-modal').remove()" style="background:#f3f4f6;color:#374151;border:none;border-radius:10px;padding:11px 18px;font-size:0.9rem;font-weight:700;cursor:pointer;">Cerrar</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', (e) => { if (e.target === wrap) wrap.remove(); });
}

function copyAccessLink() {
  const ta = document.getElementById('access-link-text');
  if (!ta) return;
  ta.select();
  try { navigator.clipboard.writeText(ta.value); } catch (e) { try { document.execCommand('copy'); } catch (_e) {} }
  showToast('📋 Enlace copiado al portapapeles', 'success');
}

async function deleteStudent(id) {
  const s = (_cachedStudents || []).find(st => st.id === id);
  if (!confirm(`¿Eliminar a ${s?.name || 'este alumno'}? Esta acción no se puede deshacer.`)) return;
  const result = await adminOps('delete_student', { id });
  if (result.error) { showToast('Error: ' + result.error, 'error'); return; }
  showToast(`🗑️ Alumno eliminado`, 'info');
  renderStudents();
}

async function renderStudents() {
  const container = document.getElementById('students-list');
  if (!container) return;
  container.innerHTML = '<div class="text-center py-8 text-gray-400 text-sm">⏳ Cargando alumnos...</div>';
  await getStudents();
  if (_lastStudentsError) {
    container.innerHTML = `<div class="text-center py-8 text-sm">
      <div class="text-3xl mb-2">🔒</div>
      <p class="font-bold text-gray-700 mb-1">No pudimos cargar tus alumnos</p>
      <p class="text-gray-500 mb-1">Tu sesión pudo haber expirado (llevas mucho rato). Tus datos están a salvo.</p>
      <p class="text-gray-400 text-xs mb-4">Solo vuelve a entrar y aparecerán todos.</p>
      <button onclick="location.reload()" class="bg-swe-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-swe-dark transition-colors">🔄 Recargar sesión</button>
    </div>`;
    return;
  }
  paintStudents();
}

let _studentSearch = '';
let _groupFilter = '__all__';
function filterStudentCards(term) { _studentSearch = (term || '').toLowerCase().trim(); paintStudents(); }
function setGroupFilter(g) { _groupFilter = g; paintStudents(); }

function paintGroupChips() {
  const box = document.getElementById('group-filter');
  if (!box) return;
  const all = _cachedStudents || [];
  const count = (g) => g === '__all__' ? all.length : g === '__none__' ? all.filter(s => !s.grupo).length : all.filter(s => s.grupo === g).length;
  const chips = [{ v: '__all__', label: '👥 Todos' }, ...GRUPOS.map(g => ({ v: g, label: g })), { v: '__none__', label: 'Sin grupo' }];
  box.innerHTML = chips.map(c => {
    const active = _groupFilter === c.v;
    const cls = active
      ? 'bg-swe-blue text-white border-swe-blue'
      : 'bg-white text-gray-600 border-gray-200 hover:border-swe-blue';
    return `<button onclick="setGroupFilter('${c.v}')" class="text-xs font-semibold px-3 py-1.5 rounded-full border ${cls} transition-colors">${c.label} (${count(c.v)})</button>`;
  }).join('');
}
function paintStudents() {
  const container = document.getElementById('students-list');
  if (!container) return;
  const all = _cachedStudents || [];
  if (all.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-gray-400 text-sm">
      <div class="text-3xl mb-2">👥</div>
      <p>No hay alumnos registrados.<br>Agrega el primero arriba.</p>
    </div>`;
    return;
  }
  paintGroupChips();
  const _q = _studentSearch;
  let students = _q ? all.filter(s => ((s.name || '') + ' ' + (s.email || '')).toLowerCase().includes(_q)) : all;
  if (_groupFilter === '__none__') students = students.filter(s => !s.grupo);
  else if (_groupFilter !== '__all__') students = students.filter(s => s.grupo === _groupFilter);
  if (students.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-gray-400 text-sm">🔎 Ningún alumno coincide con el filtro</div>`;
    return;
  }
  container.innerHTML = students.map(s => {
    const lastLogin = s.lastLogin
      ? new Date(s.lastLogin).toLocaleDateString('es-ES', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })
      : 'Nunca';
    const deviceCount = (s.deviceKeys || []).length;
    const status = s.status || (s.active ? 'active' : 'cancelled');
    const statusLabels = { active:'✅ Activo', failed:'⚠️ Pago fallido', cancelled:'❌ Cancelado', pending:'⏳ Pendiente', manual:'💵 Manual', cancelling:'🔶 Cancela pronto', inactive:'⛔ Inactivo' };
    const statusClass  = { active:'status-badge-active', failed:'status-badge-failed', cancelled:'status-badge-cancelled', pending:'status-badge-pending', manual:'status-badge-manual', cancelling:'status-badge-failed', inactive:'status-badge-cancelled' };
    const price = s.price || 0;
    const payIcon = s.paymentMethod === 'stripe' ? '💳' : '💵';
    const nextPay = s.nextPaymentDate ? s.nextPaymentDate : '—';
    const cancelsAtStr = s.cancelsAt ? new Date(s.cancelsAt).toLocaleDateString('es-ES', { day:'numeric', month:'short', year:'numeric' }) : null;
    const _days = s.lastLogin ? Math.floor((Date.now() - new Date(s.lastLogin).getTime()) / 86400000) : null;
    const lastAccessStr = _days === null ? 'Nunca ha entrado' : (_days === 0 ? 'hoy' : `hace ${_days} d`);
    const lastAccessCls = (_days === null || _days >= 21) ? 'text-red-500 font-semibold' : 'text-gray-400';
    const memberSince = s.createdAt ? new Date(s.createdAt).toLocaleDateString('es-ES', { month:'short', year:'numeric' }) : null;
    const borderColor = status === 'active' || status === 'manual' ? 'border-green-200' : status === 'cancelling' ? 'border-orange-200' : status === 'failed' ? 'border-red-200' : 'border-gray-200';
    const grupoOpts = '<option value="">— Sin grupo —</option>' + GRUPOS.map(g => `<option value="${g}" ${s.grupo === g ? 'selected' : ''}>${g}</option>`).join('');
    return `
    <div class="glass rounded-2xl p-4 shadow border ${borderColor}">
      <div class="flex items-start justify-between gap-3 mb-2">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style="background:${status === 'active' || status === 'manual' ? '#10B981' : status === 'failed' ? '#EF4444' : '#9CA3AF'};">
            ${s.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div class="font-bold text-gray-800 text-sm">${s.name}</div>
            <div class="text-xs text-gray-500">${s.email}</div>
          </div>
        </div>
        <span class="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${statusClass[status] || 'status-badge-cancelled'}">
          ${statusLabels[status] || status}
        </span>
      </div>

      <div class="flex items-center gap-3 text-xs text-gray-400 mb-3 flex-wrap">
        <span>${payIcon} ${price > 0 ? price + ' SEK/mes' : 'Sin precio'}</span>
        <span>·</span>
        <span>📱 ${deviceCount}/${MAX_DEVICES}</span>
        <span>·</span><span class="${lastAccessCls}">🕒 ${lastAccessStr}</span>
        ${memberSince ? `<span>·</span><span>📅 desde ${memberSince}</span>` : ''}
        <span>·</span><span>🎯 ${s.level ? (typeof LEVEL_LABEL !== 'undefined' && LEVEL_LABEL[s.level] || s.level) : 'sin prueba'}</span>
        ${cancelsAtStr ? `<span>·</span><span class="text-orange-500 font-semibold">⚠️ Pierde acceso: ${cancelsAtStr}</span>` : ''}
      </div>

      <div class="flex items-center gap-2 mb-2">
        <span class="text-xs text-gray-400 flex-shrink-0">👥 Grupo:</span>
        <select onchange="updateStudentGroup('${s.id}', this.value)"
          class="flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-purple-50 border border-purple-200 text-purple-700 focus:outline-none focus:border-purple-400">
          ${grupoOpts}
        </select>
      </div>

      <div class="flex gap-2 flex-wrap">
        <select onchange="updateStudentStatus('${s.id}', this.value)"
          class="flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold bg-gray-50 border border-gray-200 focus:outline-none focus:border-swe-blue">
          <option value="active" ${status==='active'?'selected':''}>✅ Activo</option>
          <option value="manual" ${status==='manual'?'selected':''}>💵 Manual</option>
          <option value="pending" ${status==='pending'?'selected':''}>⏳ Pendiente</option>
          <option value="failed" ${status==='failed'?'selected':''}>⚠️ Pago fallido</option>
          <option value="cancelled" ${status==='cancelled'?'selected':''}>❌ Cancelado</option>
        </select>
        <button onclick="resendAccess('${s.id}')"
          class="py-1.5 px-3 rounded-xl text-xs font-semibold bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 transition-colors">
          📧 Reenviar acceso
        </button>
        <button onclick="resetStudentDevices('${s.id}')"
          class="py-1.5 px-3 rounded-xl text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors">
          🔄 Dispositivos
        </button>
        <button onclick="deleteStudent('${s.id}')"
          class="py-1.5 px-3 rounded-xl text-xs font-semibold bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 border border-gray-200 transition-colors">
          🗑️
        </button>
      </div>
    </div>`;
  }).join('');
}


// ═══════════════════════════════════════════════════════════
//  GRAMMAR SECTION — Práctica de gramática (Ta Körkort style)
// ═══════════════════════════════════════════════════════════

// Grammar state
const grammarState = {
  topic: null,          // current topic object from GRAMMAR_DATA
  questions: [],        // shuffled questions for current session
  index: 0,            // current question index (0-based)
  score: 0,            // count of correct answers
  answered: false,     // whether current question has been answered
  filter: 'all',       // 'all' | 'A' | 'B'
  search: '',          // texto del buscador
  streak: 0,           // racha actual
  best: 0,             // mejor racha
  total: 0,            // total respondidas
  limit: null,         // Teoría: 10 preguntas; Gramática: null (infinitas)
  fromTheory: null,    // id de la unidad de Teoría que lanzó la práctica
};

// ── Navigate to grammar topic selector ───────────────────────
function showGrammar() {
  if (!requireAccess()) return;
  stopSpeech();
  grammarState.fromTheory = null;
  grammarState.limit = null;
  showView('grammar');
  renderGrammarTopics(grammarState.filter);
  renderReviewCard();
}

// ── Buscar tema (español o sueco) ─────────────
function searchGrammar(value) {
  grammarState.search = value || '';
  renderGrammarTopics(grammarState.filter);
}

// ── Errores para repasar (se guardan en el dispositivo) ──────
function getMistakes() {
  try { return JSON.parse(localStorage.getItem('sc_mistakes') || '[]'); } catch(e) { return []; }
}
function saveMistakes(arr) {
  try { localStorage.setItem('sc_mistakes', JSON.stringify(arr)); } catch(e) {}
}
function _gkey(q) { return q.text || q.prompt || ''; }
function addMistake(q) {
  const arr = getMistakes();
  const k = _gkey(q);
  if (!arr.some(x => _gkey(x) === k)) { arr.push({ ...q }); saveMistakes(arr); }
}
function removeMistake(q) {
  const k = _gkey(q);
  saveMistakes(getMistakes().filter(x => _gkey(x) !== k));
}

// ── Tarjeta "Repasar mis errores" ────────────────────────────
function renderReviewCard() {
  const el = document.getElementById('grammar-review-card');
  if (!el) return;
  const m = getMistakes();
  if (!m.length) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <div onclick="startReviewMistakes()" class="cursor-pointer rounded-2xl p-4 shadow-md border-2 flex items-center gap-3 card-hover"
         style="background:linear-gradient(135deg,#FEE2E2,#FECACA); border-color:#FCA5A5;">
      <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-sm" style="background:#EF4444;">🔁</div>
      <div class="flex-1">
        <div class="font-bold text-gray-800 text-sm">Repasar mis errores</div>
        <div class="text-xs text-gray-600">Tienes ${m.length} pregunta${m.length === 1 ? '' : 's'} por corregir</div>
      </div>
      <span class="text-xl" style="color:#EF4444;">→</span>
    </div>`;
}

// ── Practicar solo las preguntas falladas ────────────────────
function startReviewMistakes() {
  const m = getMistakes();
  if (!m.length) { showToast('¡No tienes errores para repasar! 🎉', 'success'); return; }
  const topic = { id: '__review__', title: '🔁 Repasar mis errores', questions: m.map(x => x), sessionSize: m.length, color: '#EF4444', level: 'A' };
  grammarState.fromTheory = null;
  grammarState.limit = null;
  grammarState.topic = topic;
  grammarState.questions = [...topic.questions].sort(() => Math.random() - 0.5);
  grammarState.index = 0;
  grammarState.score = 0;
  grammarState.answered = false;
  grammarState.streak = 0;
  grammarState.best = 0;
  grammarState.total = 0;
  const titleEl = document.getElementById('gq-topic-title');
  if (titleEl) titleEl.textContent = topic.title;
  showView('grammar-quiz');
  renderGrammarQuestion();
}

// ── Filter grammar topics by level ──────────────────────────
function filterGrammar(level) {
  grammarState.filter = level;

  // Update filter button styles
  document.querySelectorAll('.grammar-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`.grammar-filter-btn[data-level="${level}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  renderGrammarTopics(level);
}

// ── Render topic cards grid ──────────────────────────────────
function renderGrammarTopics(filter) {
  const grid = document.getElementById('grammar-topics-grid');
  if (!grid) return;

  let topics = filter === 'all'
    ? GRAMMAR_DATA.topics
    : GRAMMAR_DATA.topics.filter(t => t.level === filter);

  const _q = (grammarState.search || '').trim().toLowerCase();
  if (_q) {
    topics = topics.filter(t => ((t.title||'') + ' ' + (t.subtitle||'') + ' ' + (t.keywords||'')).toLowerCase().includes(_q));
  }

  if (!topics.length) {
    grid.innerHTML = '<div class="col-span-2 text-center text-gray-400 py-10 text-sm">No se encontraron temas. Prueba otra palabra 🔎</div>';
    return;
  }

  grid.innerHTML = topics.map(topic => `
    <div class="grammar-topic-card rounded-2xl p-3.5 shadow-md border-2 cursor-pointer card-hover flex flex-col"
         style="background: linear-gradient(135deg, ${topic.color}15, ${topic.color}30); border-color: ${topic.color}40;"
         onclick="startGrammarTopic('${topic.id}')">
      <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl mb-2.5 shadow-sm"
           style="background: linear-gradient(135deg, ${topic.color}dd, ${topic.color}aa);">
        ${topic.icon}
      </div>
      <div class="font-bold text-gray-800 text-sm leading-tight mb-1">${topic.title}</div>
      <div class="text-xs text-gray-500 mb-3" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.4em;">${topic.subtitle}</div>
      <div class="mt-auto flex items-center gap-2 flex-wrap">
        <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
              style="background:${topic.color}22; color:${topic.color};">
          ${LEVEL_LABEL[topic.level] || topic.level}
        </span>
        <span class="text-[11px] text-gray-400 whitespace-nowrap">${topic.questions.length} preguntas</span>
      </div>
    </div>
  `).join('');
}

// ── Start a grammar topic quiz ───────────────────────────────
function startGrammarTopic(topicId) {
  const topic = GRAMMAR_DATA.topics.find(t => t.id === topicId);
  if (!topic) return;

  grammarState.topic = topic;
  // Desde Teoría: sesión corta de 10 preguntas. En Gramática: infinitas.
  const _cap = grammarState.fromTheory ? 10 : null;
  grammarState.limit = _cap;
  // Shuffle questions (Fisher-Yates)
  grammarState.questions = [...topic.questions].sort(() => Math.random() - 0.5).slice(0, _cap || topic.sessionSize || topic.questions.length);
  grammarState.index = 0;
  grammarState.score = 0;
  grammarState.answered = false;
  grammarState.streak = 0;
  grammarState.best = 0;
  grammarState.total = 0;

  // Update quiz header
  const titleEl = document.getElementById('gq-topic-title');
  if (titleEl) titleEl.textContent = topic.title;

  showView('grammar-quiz');
  renderGrammarQuestion();
}

// ── Render current question ──────────────────────────────────
function renderGrammarQuestion() {
  const q = grammarState.questions[grammarState.index];
  grammarState.answered = false;
  const type = q.type || 'mc';

  // Racha como barra
  const progressBar = document.getElementById('gq-progress-bar');
  if (progressBar) progressBar.style.width = (Math.min(grammarState.streak, 10) * 10) + '%';
  const streakEl = document.getElementById('gq-streak');
  if (streakEl) streakEl.textContent = `🔥 ${grammarState.streak}`;
  const catEl = document.getElementById('gq-category');
  if (catEl) catEl.textContent = grammarState.limit
    ? `Pregunta ${Math.min(grammarState.index + 1, grammarState.limit)} de ${grammarState.limit}   ·   🔥 Racha: ${grammarState.streak}`
    : `🔥 Racha: ${grammarState.streak}   ·   Respondidas: ${grammarState.total}`;

  // Enunciado
  const qEl = document.getElementById('gq-question-text');
  if (qEl) qEl.textContent = q.text || q.prompt || '';

  const optionsEl = document.getElementById('gq-options');
  if (optionsEl) {
    if (type === 'order') {
      grammarState.gorder = { pool: shuffleArray(q.words.map((w, idx) => ({ w, id: idx }))), built: [] };
      optionsEl.innerHTML = `
        <div class="text-xs text-gray-400 mb-1">Tu frase:</div>
        <div id="gq-built" class="min-h-[52px] rounded-2xl border-2 border-dashed border-gray-300 p-2 mb-3 flex flex-wrap gap-2" style="background:#FAFAFA;"></div>
        <div class="text-xs text-gray-400 mb-1">Toca las palabras en orden:</div>
        <div id="gq-pool" class="flex flex-wrap gap-2"></div>
        <button id="gq-check-btn" onclick="checkGrammarOrder()" class="w-full mt-3 py-3 rounded-2xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow">Comprobar</button>`;
      renderGrammarOrder();
    } else if (type === 'type') {
      optionsEl.innerHTML = `
        <input id="gq-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          onkeydown="if(event.key==='Enter')checkGrammarType()"
          placeholder="Escribe aquí…" class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-base focus:border-swe-blue focus:outline-none" />
        <button id="gq-check-btn" onclick="checkGrammarType()" class="w-full mt-3 py-3 rounded-2xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow">Comprobar</button>`;
      setTimeout(() => { const i = document.getElementById('gq-input'); if (i) i.focus(); }, 60);
    } else {
      optionsEl.innerHTML = q.options.map((opt, i) => `
      <button
        onclick="answerGrammar(${i})"
        class="w-full text-left p-3.5 rounded-2xl border-2 border-gray-200 bg-white font-medium text-gray-700 text-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
        id="gq-opt-${i}">
        <span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">
          ${String.fromCharCode(65 + i)}
        </span>
        ${opt}
      </button>
    `).join('');
    }
  }

  const expEl = document.getElementById('gq-explanation');
  if (expEl) { expEl.className = 'hidden rounded-2xl p-4 border-2 mt-4 mb-2'; expEl.style.display = ''; }
  const nextBtn = document.getElementById('gq-next-btn');
  if (nextBtn) nextBtn.classList.add('hidden');
  const resultEl = document.getElementById('gq-result');
  if (resultEl) resultEl.classList.add('hidden');
  const questionArea = document.getElementById('gq-question-area');
  if (questionArea) questionArea.classList.remove('hidden');
}

// ── Ordenar palabras (grammar) ───────────────────────────────
function renderGrammarOrder() {
  const pool = document.getElementById('gq-pool'), built = document.getElementById('gq-built');
  if (!pool || !built) return;
  pool.innerHTML = grammarState.gorder.pool.map(it => `<button onclick="grammarPick(${it.id})" class="px-3.5 py-2 rounded-xl bg-white border-2 border-swe-blue text-swe-blue font-bold shadow-sm hover:bg-blue-50 transition-all">${it.w}</button>`).join('');
  built.innerHTML = grammarState.gorder.built.length
    ? grammarState.gorder.built.map(it => `<button onclick="grammarUnpick(${it.id})" class="px-3.5 py-2 rounded-xl bg-swe-blue text-white font-bold shadow-sm hover:bg-swe-dark transition-all">${it.w}</button>`).join('')
    : '<span class="text-gray-300 text-sm py-2 px-1">…</span>';
}
function grammarPick(id) {
  if (grammarState.answered) return;
  const i = grammarState.gorder.pool.findIndex(x => x.id === id); if (i < 0) return;
  grammarState.gorder.built.push(grammarState.gorder.pool.splice(i, 1)[0]); renderGrammarOrder();
}
function grammarUnpick(id) {
  if (grammarState.answered) return;
  const i = grammarState.gorder.built.findIndex(x => x.id === id); if (i < 0) return;
  grammarState.gorder.pool.push(grammarState.gorder.built.splice(i, 1)[0]); renderGrammarOrder();
}
function checkGrammarOrder() {
  if (grammarState.answered) return;
  const q = grammarState.questions[grammarState.index];
  if (grammarState.gorder.built.length < q.words.length) { showToast('Usa todas las palabras 😊', 'info'); return; }
  const built = grammarState.gorder.built.map(x => x.w);
  const isCorrect = built.join(' ') === q.answer.join(' ');
  document.getElementById('gq-check-btn') && document.getElementById('gq-check-btn').classList.add('hidden');
  const b = document.getElementById('gq-built');
  if (b) { b.style.borderStyle = 'solid'; b.style.borderColor = isCorrect ? '#10B981' : '#F87171'; b.style.background = isCorrect ? '#ECFDF5' : '#FEF2F2'; }
  if (!isCorrect) {
    const oe = document.getElementById('gq-options');
    if (oe) { const h = document.createElement('div'); h.className = 'mt-2 text-sm text-gray-700'; h.innerHTML = `✅ Correcto: <b class="text-swe-blue">${q.answer.join(' ')}</b>`; oe.appendChild(h); }
  }
  _gradeGrammar(q, isCorrect);
}

// ── Escribir / traducir (grammar) ────────────────────────────
function _gnorm(s) { return (s || '').toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.!?¡¿,;:]+$/g, ''); }
function checkGrammarType() {
  if (grammarState.answered) return;
  const q = grammarState.questions[grammarState.index];
  const inp = document.getElementById('gq-input'); if (!inp) return;
  const val = _gnorm(inp.value);
  if (!val) { showToast('Escribe tu respuesta 😊', 'info'); return; }
  const accept = [q.answer].concat(q.accept || []).map(_gnorm);
  const isCorrect = accept.indexOf(val) !== -1;
  document.getElementById('gq-check-btn') && document.getElementById('gq-check-btn').classList.add('hidden');
  inp.disabled = true;
  inp.style.borderColor = isCorrect ? '#10B981' : '#F87171';
  inp.style.background = isCorrect ? '#ECFDF5' : '#FEF2F2';
  if (!isCorrect) {
    const oe = document.getElementById('gq-options');
    if (oe) { const h = document.createElement('div'); h.className = 'mt-2 text-sm text-gray-700'; h.innerHTML = `✅ Respuesta: <b class="text-swe-blue">${q.answer}</b>`; oe.appendChild(h); }
  }
  _gradeGrammar(q, isCorrect);
}

// ── Calificación común (todos los formatos) ──────────────────
function _gradeGrammar(q, isCorrect) {
  grammarState.answered = true;
  grammarState.total++;
  if (isCorrect) {
    grammarState.score++; grammarState.streak++;
    if (grammarState.streak > grammarState.best) grammarState.best = grammarState.streak;
    removeMistake(q);
  } else {
    grammarState.streak = 0;
    grammarState.questions.push(q);
    addMistake(q);
  }
  const expEl = document.getElementById('gq-explanation');
  const expIcon = document.getElementById('gq-explanation-icon');
  const expText = document.getElementById('gq-explanation-text');
  if (expEl) {
    if (expIcon) expIcon.textContent = isCorrect ? '✅' : '💡';
    if (expText) expText.textContent = (isCorrect ? '¡Correcto! ' : '') + q.explanation;
    expEl.className = `rounded-2xl p-4 border-2 mt-4 mb-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`;
    expEl.style.display = '';
  }
  const nextBtn = document.getElementById('gq-next-btn');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = 'Siguiente →';
    nextBtn.className = 'w-full py-3.5 rounded-2xl font-bold text-white text-sm mt-3 transition-all bg-gradient-to-r from-swe-blue to-blue-600 shadow-lg';
    if (grammarState.limit && grammarState.index >= grammarState.limit - 1) nextBtn.textContent = 'Ver mi resultado 🎉';
  }
  const streakEl = document.getElementById('gq-streak');
  if (streakEl) streakEl.textContent = `🔥 ${grammarState.streak}`;
}

// ── Handle answer selection ──────────────────────────────────
function answerGrammar(selectedIdx) {
  if (grammarState.answered) return;
  const q = grammarState.questions[grammarState.index];
  const isCorrect = selectedIdx === q.correct;

  q.options.forEach((_, i) => {
    const btn = document.getElementById(`gq-opt-${i}`);
    if (!btn) return;
    btn.disabled = true;
    if (i === q.correct) {
      btn.className = 'w-full text-left p-3.5 rounded-2xl border-2 font-medium text-sm transition-all border-green-400 bg-green-50 text-green-800';
      btn.innerHTML = btn.innerHTML.replace(
        `<span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">${String.fromCharCode(65 + i)}</span>`,
        `<span class="inline-flex w-7 h-7 rounded-full bg-green-500 items-center justify-center text-xs font-bold mr-2 text-white">✓</span>`
      );
    } else if (i === selectedIdx) {
      btn.className = 'w-full text-left p-3.5 rounded-2xl border-2 font-medium text-sm transition-all border-red-400 bg-red-50 text-red-800';
      btn.innerHTML = btn.innerHTML.replace(
        `<span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">${String.fromCharCode(65 + i)}</span>`,
        `<span class="inline-flex w-7 h-7 rounded-full bg-red-500 items-center justify-center text-xs font-bold mr-2 text-white">✗</span>`
      );
    }
  });

  _gradeGrammar(q, isCorrect);
}

// ── Advance to next question or show result ──────────────────
function nextGrammarQuestion() {
  grammarState.index++;
  // Teoría: sesión corta → al llegar a 10 preguntas, mostrar resultado.
  if (grammarState.limit && grammarState.index >= grammarState.limit) { finishGrammar(); return; }
  // Modo sin parar: si se acaba la cola, se rellena con mas preguntas al azar
  if (grammarState.index >= grammarState.questions.length) {
    const t = grammarState.topic;
    if (t) {
      const more = [...t.questions].sort(() => Math.random() - 0.5).slice(0, t.sessionSize || t.questions.length);
      grammarState.questions.push(...more);
    }
  }
  renderGrammarQuestion();
  const qa = document.getElementById('gq-question-area');
  if (qa) qa.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Terminar la practica y ver resultado ─────────────
function finishGrammar() {
  showGrammarResult();
}

// ── Show final result screen ─────────────────────────────────
function showGrammarResult() {
  const score = grammarState.score;
  const total = grammarState.total || 1;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  // Hide question area, show result
  const qa = document.getElementById('gq-question-area');
  if (qa) qa.classList.add('hidden');
  const resultEl = document.getElementById('gq-result');
  if (resultEl) resultEl.classList.remove('hidden');

  // Emoji and badge
  const emojiEl = document.getElementById('gq-result-emoji');
  if (emojiEl) emojiEl.textContent = passed ? '🎉' : '💪';

  const badgeEl = document.getElementById('gq-result-badge');
  if (badgeEl) {
    badgeEl.textContent = passed ? '¡Aprobado!' : 'Sigue practicando';
    badgeEl.className = `text-xs font-bold px-3 py-1 rounded-full ${passed
      ? 'bg-green-100 text-green-700'
      : 'bg-orange-100 text-orange-700'}`;
  }

  // Score numbers
  const scoreNumEl = document.getElementById('gq-result-score');
  if (scoreNumEl) scoreNumEl.textContent = `${score} / ${grammarState.total}`;
  const scorePctEl = document.getElementById('gq-result-pct');
  if (scorePctEl) scorePctEl.textContent = `${pct}% aciertos   ·   🔥 mejor racha: ${grammarState.best}`;

  // Result progress bar
  const resultBar = document.getElementById('gq-result-bar');
  if (resultBar) {
    resultBar.style.width = pct + '%';
    resultBar.style.background = passed
      ? 'linear-gradient(90deg, #10B981, #34D399)'
      : 'linear-gradient(90deg, #F59E0B, #FBBF24)';
  }

  // Topic name
  const topicNameEl = document.getElementById('gq-result-topic');
  if (topicNameEl) topicNameEl.textContent = grammarState.topic ? grammarState.topic.title : '';

  // Photos from existing DOM images
  const sophiePhoto = document.getElementById('sophie-photo-src');
  const andreePhoto = document.getElementById('andree-photo-src');
  const gqSophie = document.getElementById('gq-sophie-img');
  const gqAndree = document.getElementById('gq-andree-img');
  if (sophiePhoto && gqSophie) gqSophie.src = sophiePhoto.src;
  if (andreePhoto && gqAndree) gqAndree.src = andreePhoto.src;

  // Motivational message
  const msgEl = document.getElementById('gq-motivation-msg');
  const subEl = document.getElementById('gq-motivation-sub');
  if (passed) {
    if (msgEl) msgEl.textContent = '¡Bra jobbat! ¡Eso muy bien! 🎉';
    if (subEl) subEl.textContent = 'Estamos muy orgullosos de tu progreso. ¡Sigue así!';
  } else {
    if (msgEl) msgEl.textContent = 'La práctica hace al maestro. Si fuera fácil, todos lo harían. 💪';
    if (subEl) subEl.textContent = 'Vuelve a intentarlo, ¡tú puedes! Cada intento te hace más fuerte.';
  }

  // Enganche con la Seccion Teoria
  const _tBack = document.getElementById('gq-theory-back');
  if (grammarState.fromTheory) {
    if (typeof markTheoryDone === 'function') markTheoryDone(grammarState.fromTheory, pct / 100);
    if (_tBack) _tBack.classList.remove('hidden');
  } else if (_tBack) {
    _tBack.classList.add('hidden');
  }

  // Scroll to result
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Restart current topic ────────────────────────────────────
function restartGrammarTopic() {
  if (!grammarState.topic) return;
  startGrammarTopic(grammarState.topic.id);
}


// ═══════════════════════════════════════════════════════════
//  STUDENT STATUS — Quick status update
// ═══════════════════════════════════════════════════════════
async function updateStudentStatus(id, newStatus) {
  const newActive = newStatus === 'active' || newStatus === 'manual';
  const result = await adminOps('update_student', {
    id, fields: { status: newStatus, active: newActive }
  });
  if (result.error) { showToast('Error: ' + result.error, 'error'); return; }
  showToast(`Estado actualizado: ${newStatus}`, 'success');
  renderStudents();
  const dashEl = document.getElementById('admin-dashboard-section');
  if (dashEl && !dashEl.classList.contains('hidden')) renderAdminDashboard();
}

// ═══════════════════════════════════════════════════════════
//  STRIPE CONFIG — Payment link + pricing (stored in Supabase)
// ═══════════════════════════════════════════════════════════
// ── Stripe config cache ───────────────────────────────────
let _stripeConfigCache = null;

async function getStripeConfig() {
  if (_stripeConfigCache) return _stripeConfigCache;
  try {
    // Leer directamente de Supabase (la tabla config es pública de solo lectura)
    const { data, error } = await sb.from('config').select('value').eq('key', 'stripe_config').single();
    if (error || !data) {
      _stripeConfigCache = { link: '', priceNew: 339 };
    } else {
      let cfg = data.value || {}; if (cfg.constructor === String) { try { cfg = JSON.parse(cfg); } catch(e) { cfg = {}; } }
      _stripeConfigCache = {
        link:     cfg.stripe_link || '',
        priceNew: parseInt(cfg.price_new || '339'),
      };
    }
  } catch(e) {
    console.error('getStripeConfig error:', e);
    _stripeConfigCache = { link: '', priceNew: 339 };
  }
  return _stripeConfigCache;
}

async function saveStripeConfig() {
  const link     = (document.getElementById('cfg-stripe-link')?.value || '').trim();
  const priceNew = parseInt(document.getElementById('cfg-price-new')?.value || '0') || 339;

  const result = await adminOps('save_config', {
    config: { stripe_link: link, price_new: String(priceNew) }
  });
  if (result.error) { showToast('Error al guardar: ' + result.error, 'error'); return; }

  _stripeConfigCache = { link, priceNew };

  const preview = document.getElementById('cfg-price-preview');
  if (preview) preview.textContent = priceNew + ' SEK/mes';

  const savedDiv = document.getElementById('cfg-saved-link');
  if (savedDiv && link) {
    savedDiv.textContent = '✅ Link activo: ' + link;
    savedDiv.classList.remove('hidden');
  }
  showToast('✅ Configuración guardada', 'success');
}

async function loadStripeConfigUI() {
  const cfg    = await getStripeConfig();
  const linkEl = document.getElementById('cfg-stripe-link');
  const newEl  = document.getElementById('cfg-price-new');
  const preview  = document.getElementById('cfg-price-preview');
  const savedDiv = document.getElementById('cfg-saved-link');

  if (linkEl) linkEl.value = cfg.link    || '';
  if (newEl)  newEl.value  = cfg.priceNew || 339;
  if (preview) preview.textContent = (cfg.priceNew || 339) + ' SEK/mes';
  if (savedDiv && cfg.link) {
    savedDiv.textContent = '✅ Link activo: ' + cfg.link;
    savedDiv.classList.remove('hidden');
  }
}

// Overlay de carga con logo de Sophie mientras redirige al pago
function showLoadingOverlay(message) {
  if (document.getElementById('sc-loading-overlay')) return;
  const ov = document.createElement('div');
  ov.id = 'sc-loading-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:linear-gradient(135deg,#006AA7 0%,#003f6b 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;text-align:center;padding:24px;font-family:Helvetica,Arial,sans-serif;';
  ov.innerHTML = [
    '<img src="https://nblxzqdtczitpzxdqexz.supabase.co/storage/v1/object/public/assets/logosophie.jpg" alt="Sueco con Sophie" style="width:110px;height:110px;border-radius:22px;object-fit:cover;box-shadow:0 8px 32px rgba(0,0,0,0.35);"/>',
    '<div style="width:52px;height:52px;border:5px solid rgba(255,255,255,0.25);border-top-color:#FECC02;border-radius:50%;animation:scspin 0.9s linear infinite;"></div>',
    '<p style="margin:0;color:#fff;font-size:20px;font-weight:800;">' + (message || 'Cargando...') + '</p>',
    '<p style="margin:0;color:#90cdf4;font-size:14px;">Te llevamos al pago seguro \uD83D\uDD12</p>',
    '<style>@keyframes scspin{to{transform:rotate(360deg)}}</style>'
  ].join('');
  document.body.appendChild(ov);
}

async function openEnrollLink() {
  const cfg = _stripeConfigCache || await getStripeConfig();
  if (cfg.link) {
    showLoadingOverlay('Preparando tu inscripción...');
    window.location.href = cfg.link;
  } else {
    showToast('El link de pago aún no está configurado. Avisa a tu profesora.', 'info');
  }
}

// ═══════════════════════════════════════════════════════════
//  ADMIN DASHBOARD — Métricas y gráficas
// ═══════════════════════════════════════════════════════════
let _dashRevenueChart = null;
let _dashStatusChart  = null;

async function renderAdminDashboard() {
  // Show loading state
  ['dash-revenue-month','dash-revenue-expected','dash-active-count','dash-issues-count'].forEach(id => _setEl(id, '...'));
  const students = await getStudents();
  const cfg = await getStripeConfig();
  const defaultPrice = cfg.priceLegacy || 339;

  // Compute metrics
  const active      = students.filter(s => s.status === 'active' || s.status === 'manual' || (!s.status && s.active));
  const cancelling  = students.filter(s => s.status === 'cancelling');
  const failed      = students.filter(s => s.status === 'failed');
  const cancelled   = students.filter(s => s.status === 'cancelled');
  const pending     = students.filter(s => s.status === 'pending');

  const revenueMonth    = active.reduce((sum, s) => sum + (s.price || defaultPrice), 0);
  const revenueExpected = active.filter(s => s.status !== 'cancelled').reduce((sum, s) => sum + (s.price || defaultPrice), 0);
  // Mes actual, alumnos en riesgo de fuga (>21 días sin entrar) e ingreso perdido (cancelados)
  const _mn = new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const monthName = _mn.charAt(0).toUpperCase() + _mn.slice(1);
  const atRisk = active.filter(s => !s.lastLogin || (Date.now() - new Date(s.lastLogin).getTime()) / 86400000 >= 21).length;
  const revenueLost = cancelled.reduce((sum, s) => sum + (s.price || defaultPrice), 0);

  // Update metric cards
  const fmt = n => n.toLocaleString('sv-SE') + ' SEK';
  _setEl('dash-revenue-month',    fmt(revenueMonth));
  _setEl('dash-revenue-label',    active.length + ' alumnos activos');
  _setEl('dash-revenue-expected', fmt(revenueExpected));
  _setEl('dash-active-count',     active.length);
  _setEl('dash-total-label',      'de ' + students.length + ' total');
  _setEl('dash-issues-count',     failed.length + pending.length + cancelling.length);
  _setEl('dash-issues-label',     `${failed.length} fallidos · ${cancelled.length} cancelados · ${cancelling.length} cancelando`);
  _setEl('dash-month-header',      '💰 ' + monthName);
  _setEl('dash-risk-count',        atRisk);
  _setEl('dash-lost-month',        fmt(revenueLost));

  // ── Desglose por precio ──────────────────────────────────
  const pricingSection = document.getElementById('dash-pricing-section');
  const pricingList    = document.getElementById('dash-pricing-list');
  if (pricingSection && pricingList && active.length > 0) {
    // Agrupar alumnos activos por precio
    const priceGroups = {};
    active.forEach(s => {
      const p = s.price || defaultPrice;
      if (!priceGroups[p]) priceGroups[p] = [];
      priceGroups[p].push(s);
    });
    const sortedPrices = Object.keys(priceGroups).map(Number).sort((a, b) => a - b);
    pricingList.innerHTML = sortedPrices.map(p => {
      const group = priceGroups[p];
      const total = group.length * p;
      const isLegacy = p <= (cfg.priceLegacy || 339);
      const badgeColor = isLegacy ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-blue-100 text-blue-700 border-blue-200';
      const tierLabel  = isLegacy ? '🏷️ Legacy' : '🆕 Nuevo';
      return `
      <div class="flex items-center justify-between gap-3 py-2 border-b border-indigo-100 last:border-0">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-2 py-0.5 rounded-full border ${badgeColor}">${tierLabel}</span>
          <span class="text-sm font-semibold text-gray-700">${p} SEK/mes</span>
          <span class="text-xs text-gray-400">× ${group.length} alumno${group.length !== 1 ? 's' : ''}</span>
        </div>
        <span class="text-sm font-black text-indigo-700">${fmt(total)}</span>
      </div>`;
    }).join('');
    // Añadir fila de total si hay más de un precio
    if (sortedPrices.length > 1) {
      pricingList.innerHTML += `
      <div class="flex items-center justify-between gap-3 pt-2 mt-1">
        <span class="text-xs font-bold text-indigo-600 uppercase tracking-wide">Total activos</span>
        <span class="text-sm font-black text-indigo-800">${fmt(revenueMonth)}</span>
      </div>`;
    }
    pricingSection.classList.remove('hidden');
  } else if (pricingSection) {
    pricingSection.classList.add('hidden');
  }

  // Sección "Cancela pronto"
  const cancellingSection = document.getElementById('dash-cancelling-section');
  const cancellingList    = document.getElementById('dash-cancelling-list');
  if (cancellingSection && cancellingList) {
    if (cancelling.length === 0) {
      cancellingSection.classList.add('hidden');
    } else {
      cancellingSection.classList.remove('hidden');
      cancellingList.innerHTML = cancelling.map(s => {
        const date = s.cancelsAt
          ? new Date(s.cancelsAt).toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' })
          : 'fecha desconocida';
        return `
        <div class="flex items-center justify-between gap-3 py-2 border-b border-orange-100 last:border-0">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              ${s.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-800">${s.name}</div>
              <div class="text-xs text-gray-500">${s.email}</div>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <div class="text-xs text-orange-600 font-semibold">Pierde acceso</div>
            <div class="text-xs text-gray-500">${date}</div>
          </div>
        </div>`;
      }).join('');
    }
  }

  // Build revenue bar chart (last 6 months estimate based on join dates)
  _buildRevenueChart(students, defaultPrice);

  // Build status donut
  _buildStatusChart({ active: active.length, failed: failed.length, cancelled: cancelled.length, pending: pending.length });

  // Render filtered list (default: all)
  filterDashStudents('all');
  // Highlight all button
  document.querySelectorAll('.dash-filter-btn').forEach(b => b.classList.remove('active'));
  const allBtn = document.getElementById('df-all');
  if (allBtn) allBtn.classList.add('active');
}

function _setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function _buildRevenueChart(students, defaultPrice) {
  const ctx = document.getElementById('dash-revenue-chart');
  if (!ctx) return;
  if (_dashRevenueChart) { _dashRevenueChart.destroy(); _dashRevenueChart = null; }

  // Generate last 6 months labels
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ label: d.toLocaleDateString('es-ES', { month:'short', year:'2-digit' }), date: d });
  }

  // Count active students per month (students who joined before or during that month)
  const data = months.map(m => {
    const endOfMonth = new Date(m.date.getFullYear(), m.date.getMonth() + 1, 0);
    const count = students.filter(s => {
      if (!s.joinDate) return false;
      const joined = new Date(s.joinDate);
      const statusOk = s.status === 'active' || s.status === 'manual' || (!s.status && s.active);
      return joined <= endOfMonth && statusOk;
    }).length;
    return count * defaultPrice;
  });

  _dashRevenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months.map(m => m.label),
      datasets: [{
        label: 'Ingresos (SEK)',
        data,
        backgroundColor: 'rgba(0,106,167,0.8)',
        borderColor: '#006AA7',
        borderWidth: 1,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => v.toLocaleString('sv-SE') + ' SEK', font: { size: 10 } } },
        x: { ticks: { font: { size: 10 } } }
      }
    }
  });
}

function _buildStatusChart({ active, failed, cancelled, pending }) {
  const ctx = document.getElementById('dash-status-chart');
  if (!ctx) return;
  if (_dashStatusChart) { _dashStatusChart.destroy(); _dashStatusChart = null; }

  const total = active + failed + cancelled + pending || 1;
  const data  = [active, failed, cancelled, pending];
  const labels = ['Activos', 'Pago fallido', 'Cancelados', 'Pendientes'];
  const colors = ['#10B981', '#EF4444', '#9CA3AF', '#F59E0B'];

  _dashStatusChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2 }] },
    options: {
      responsive: false,
      plugins: { legend: { display: false } },
      cutout: '65%'
    }
  });

  // Legend
  const legend = document.getElementById('dash-status-legend');
  if (legend) {
    legend.innerHTML = labels.map((l, i) => `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full flex-shrink-0" style="background:${colors[i]};"></div>
          <span class="text-xs text-gray-600">${l}</span>
        </div>
        <span class="text-xs font-bold text-gray-800">${data[i]} <span class="font-normal text-gray-400">(${Math.round(data[i]/total*100)}%)</span></span>
      </div>`).join('');
  }
}

function filterDashStudents(filter) {
  document.querySelectorAll('.dash-filter-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('df-' + filter);
  if (activeBtn) activeBtn.classList.add('active');

  const students = _cachedStudents || [];
  let filtered = students;
  if (filter !== 'all') {
    filtered = students.filter(s => {
      const status = s.status || (s.active ? 'active' : 'cancelled');
      return status === filter;
    });
  }

  const container = document.getElementById('dash-students-list');
  if (!container) return;
  if (filtered.length === 0) {
    container.innerHTML = `<div class="text-center py-4 text-gray-400 text-xs">No hay alumnos en esta categoría</div>`;
    return;
  }

  const statusLabels = { active:'✅ Activo', failed:'⚠️ Fallido', cancelled:'❌ Cancelado', pending:'⏳ Pendiente', manual:'💵 Manual', cancelling:'🔶 Cancela pronto' };
  const statusClass  = { active:'status-badge-active', failed:'status-badge-failed', cancelled:'status-badge-cancelled', pending:'status-badge-pending', manual:'status-badge-manual', cancelling:'status-badge-failed' };
  const defaultPrice = (_cachedStudents ? 250 : 250); // uses cached config via renderAdminDashboard

  container.innerHTML = filtered.map(s => {
    const status = s.status || (s.active ? 'active' : 'cancelled');
    const price  = s.price || defaultPrice;
    const initials = (s.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    return `
    <div class="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white gap-3">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style="background:${status === 'active' || status === 'manual' ? '#10B981' : status === 'failed' ? '#EF4444' : '#9CA3AF'};">
          ${initials}
        </div>
        <div class="min-w-0">
          <div class="text-xs font-semibold text-gray-800 truncate">${s.name}</div>
          <div class="text-xs text-gray-400 truncate">${s.email}</div>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <span class="text-xs font-semibold text-gray-600">${price} SEK</span>
        <span class="text-xs px-2 py-0.5 rounded-full font-semibold ${statusClass[status] || 'status-badge-cancelled'}">${statusLabels[status] || status}</span>
      </div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
//  HÖRFÖRSTÅELSE — Comprensión auditiva con voz de Sophie
// ═══════════════════════════════════════════════════════════

const horstState = {
  level: 'A',
  episode: null,
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  audioEl: null,
  progressTimer: null,
  _blobUrl: null,
  // Web Audio API state
  _ctx: null,
  _buffer: null,
  _source: null,
  _startTime: 0,
  _offset: 0,
  _playing: false,
  _duration: 0,
  _rafId: null,
};

function _getAudioCtx() {
  if (!horstState._ctx) {
    horstState._ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // iOS/mobile: el contexto empieza suspendido hasta un gesto del usuario
  if (horstState._ctx.state === 'suspended') {
    horstState._ctx.resume();
  }
  return horstState._ctx;
}

// ── Navigate to episode selector ────────────────────────────
function showHorst() {
  if (!requireAccess()) return;
  stopSpeech();
  _stopWebAudio();
  clearInterval(horstState.progressTimer);
  showView('horst');
  renderHorstEpisodes(horstState.level);
}

// ── Filter by level ─────────────────────────────────────────
function filterHorst(level) {
  horstState.level = level;
  document.querySelectorAll('.horst-filter-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.querySelector(`.horst-filter-btn[data-hlevel="${level}"]`);
  if (btn) btn.classList.add('active');
  renderHorstEpisodes(level);
}

// ── Render episode cards ─────────────────────────────────────
function renderHorstEpisodes(level) {
  const grid = document.getElementById('horst-episodes-grid');
  if (!grid) return;
  const episodes = (HORST_DATA.levels[level] || []);
  if (!episodes.length) {
    grid.innerHTML = `<div class="glass rounded-2xl p-6 text-center text-gray-400">
      <div class="text-4xl mb-3">🎙️</div>
      <div class="font-semibold">Próximamente</div>
      <div class="text-sm mt-1">Sophie está grabando los audios de ${LEVEL_LABEL[level]||level}</div>
    </div>`;
    return;
  }
  grid.innerHTML = episodes.map((ep, i) => `
    <div class="glass rounded-2xl p-4 shadow border border-white/60 cursor-pointer card-hover flex items-center gap-4"
         onclick="startHorstEpisode('${ep.id}', '${level}')">
      <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
           style="background:linear-gradient(135deg,#006AA7,#004F7C);">${ep.icon}</div>
      <div class="flex-1 min-w-0">
        <div class="font-bold text-gray-800 text-sm">${ep.title}</div>
        <div class="text-xs text-gray-500 truncate">${ep.subtitle}</div>
        <div class="flex items-center gap-2 mt-1.5">
          <span class="text-xs bg-swe-blue/10 text-swe-blue px-2 py-0.5 rounded-full font-semibold">${LEVEL_LABEL[ep.level]||ep.level}</span>
          <span class="text-xs text-gray-400">🎧 ${ep.duration}</span>
          <span class="text-xs text-gray-400">· ${ep.questions.length} preguntas</span>
        </div>
      </div>
      <div class="text-swe-blue text-lg flex-shrink-0">▶</div>
    </div>
  `).join('');
}

// ── Start an episode ─────────────────────────────────────────
function startHorstEpisode(epId, level) {
  const lvl = level || horstState.level;
  const ep = (HORST_DATA.levels[lvl] || []).find(e => e.id === epId);
  if (!ep) return;

  horstState.episode = ep;
  horstState.questions = [...ep.questions];
  horstState.index = 0;
  horstState.score = 0;
  horstState.answered = false;

  // Set header
  const titleEl = document.getElementById('hq-topic-title');
  const subEl   = document.getElementById('hq-topic-sub');
  const iconEl  = document.getElementById('hq-audio-icon');
  const aTitle  = document.getElementById('hq-audio-title');
  const aDur    = document.getElementById('hq-audio-duration');
  if (titleEl) titleEl.textContent = ep.title;
  if (subEl)   subEl.textContent   = ep.subtitle;
  if (iconEl)  iconEl.textContent  = ep.icon;
  if (aTitle)  aTitle.textContent  = ep.title;
  if (aDur)    aDur.textContent    = ep.duration + ' · ' + ep.questions.length + ' preguntas';

  // Setup audio
  setupHorstAudio(ep);

  showView('horst-quiz');
  renderHorstQuestion();
}

// ── Internal: stop Web Audio playback ───────────────────────
// ── Parar el audio actual (grabación HTML5 o TTS) ───────────
function _stopWebAudio() {
  if (horstState.audioEl) { try { horstState.audioEl.pause(); } catch (e) {} }
  if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  horstState._playing = false;
}

// ── Internal: rAF loop for progress bar ─────────────────────
function _updateAudioProgress() {
  if (!horstState._playing || !horstState._buffer || !horstState._ctx) return;
  const elapsed = horstState._ctx.currentTime - horstState._startTime;
  const current = Math.min(horstState._offset + elapsed, horstState._duration);

  const progressBar = document.getElementById('hq-audio-progress');
  const timeEl      = document.getElementById('hq-audio-time');
  if (progressBar && horstState._duration > 0)
    progressBar.style.width = ((current / horstState._duration) * 100) + '%';
  if (timeEl) timeEl.textContent = formatTime(current);

  if (current < horstState._duration) {
    horstState._rafId = requestAnimationFrame(_updateAudioProgress);
  }
}

// Lista de audios grabados por Sophie (los .mp3 viven en /audio, se cargan bajo demanda)
const SOPHIE_AUDIO_KEYS = ['a01','a02','a03','a04','a05','a06','b01','b02','b03','b04','b05','b06'];

// ── Preparar el audio del episodio (HTML5 <audio>, carga solo el que se abre) ──
function setupHorstAudio(ep) {
  _stopWebAudio();
  horstState.audioEl = null;
  horstState._duration = 0;

  const playBtn = document.getElementById('hq-play-btn');
  const progressBar = document.getElementById('hq-audio-progress');
  const timeEl = document.getElementById('hq-audio-time');
  const totalEl = document.getElementById('hq-audio-total');
  if (playBtn) playBtn.textContent = '▶';
  if (progressBar) progressBar.style.width = '0%';
  if (timeEl) timeEl.textContent = '0:00';
  if (totalEl) totalEl.textContent = '...';

  const hasAudio = ep.audioKey && SOPHIE_AUDIO_KEYS.indexOf(ep.audioKey) !== -1;
  if (!hasAudio) { if (totalEl) totalEl.textContent = '0:00'; return; }

  const audio = new Audio();
  audio.preload = 'metadata';
  audio.src = 'audio/' + ep.audioKey + '.mp3';
  horstState.audioEl = audio;

  audio.addEventListener('loadedmetadata', function () {
    horstState._duration = audio.duration || 0;
    const tot = document.getElementById('hq-audio-total');
    if (tot) tot.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('timeupdate', function () {
    if (horstState.audioEl !== audio) return;
    const dur = audio.duration || horstState._duration || 0;
    const pb = document.getElementById('hq-audio-progress');
    const tel = document.getElementById('hq-audio-time');
    if (pb && dur > 0) pb.style.width = ((audio.currentTime / dur) * 100) + '%';
    if (tel) tel.textContent = formatTime(audio.currentTime);
  });
  audio.addEventListener('ended', function () {
    if (horstState.audioEl !== audio) return;
    horstState._playing = false;
    const pb = document.getElementById('hq-play-btn');
    const bar = document.getElementById('hq-audio-progress');
    const tel = document.getElementById('hq-audio-time');
    if (pb) pb.textContent = '▶';
    if (bar) bar.style.width = '100%';
    if (tel) tel.textContent = formatTime(horstState._duration);
  });
  audio.addEventListener('error', function () {
    const tot = document.getElementById('hq-audio-total');
    if (tot) tot.textContent = '0:00';
  });
}

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── Play / Pausa (HTML5 audio; el play sale del gesto = seguro en móvil) ──
function toggleHorstAudio() {
  const playBtn = document.getElementById('hq-play-btn');
  const ep = horstState.episode;
  const hasAudio = ep && ep.audioKey && SOPHIE_AUDIO_KEYS.indexOf(ep.audioKey) !== -1;

  if (hasAudio && horstState.audioEl) {
    const audio = horstState.audioEl;
    if (!audio.paused) {
      audio.pause();
      horstState._playing = false;
      if (playBtn) playBtn.textContent = '▶';
    } else {
      const pr = audio.play();
      horstState._playing = true;
      if (playBtn) playBtn.textContent = '⏸';
      if (pr && pr.catch) pr.catch(function () { if (playBtn) playBtn.textContent = '▶'; horstState._playing = false; });
    }
  } else {
    // Fallback TTS (episodio sin grabación aún)
    if (playBtn) playBtn.textContent = '🔊';
    const utt = new SpeechSynthesisUtterance(ep.ttsScript);
    utt.lang = 'sv-SE';
    utt.rate = 0.85;
    utt.onend = () => { if (playBtn) playBtn.textContent = '▶'; };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  }
}

// ── Repetir desde el inicio ──────────────────────────────────
function replayHorstAudio() {
  const ep = horstState.episode;
  const hasAudio = ep && ep.audioKey && SOPHIE_AUDIO_KEYS.indexOf(ep.audioKey) !== -1;
  if (hasAudio && horstState.audioEl) {
    const audio = horstState.audioEl;
    try { audio.currentTime = 0; } catch (e) {}
    const pr = audio.play();
    horstState._playing = true;
    const pb = document.getElementById('hq-play-btn');
    if (pb) pb.textContent = '⏸';
    if (pr && pr.catch) pr.catch(function () {});
  } else {
    window.speechSynthesis.cancel();
    toggleHorstAudio();
  }
}

// ── Seek con clic en la barra ────────────────────────────────
function seekHorstAudio(event) {
  const audio = horstState.audioEl;
  if (!audio || !horstState._duration) return;
  const bar = document.getElementById('hq-audio-bar');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  try { audio.currentTime = pct * horstState._duration; } catch (e) {}
  const progressBar = document.getElementById('hq-audio-progress');
  if (progressBar) progressBar.style.width = (pct * 100) + '%';
  const timeEl = document.getElementById('hq-audio-time');
  if (timeEl) timeEl.textContent = formatTime(audio.currentTime);
}

// ── Render current question ──────────────────────────────────
function renderHorstQuestion() {
  const q = horstState.questions[horstState.index];
  const total = horstState.questions.length;
  const current = horstState.index + 1;
  horstState.answered = false;

  const pct = ((current - 1) / total) * 100;
  const pb = document.getElementById('hq-progress-bar');
  if (pb) pb.style.width = pct + '%';

  const scoreEl = document.getElementById('hq-score-live');
  if (scoreEl) scoreEl.textContent = `${horstState.score} / ${horstState.index}`;

  const catEl = document.getElementById('hq-category');
  if (catEl) catEl.textContent = `Pregunta ${current} de ${total}`;

  const qEl = document.getElementById('hq-question-text');
  if (qEl) qEl.textContent = q.text;

  const optEl = document.getElementById('hq-options');
  if (optEl) {
    optEl.innerHTML = q.options.map((opt, i) => `
      <button onclick="answerHorst(${i})"
        class="w-full text-left p-3.5 rounded-2xl border-2 border-gray-200 bg-white font-medium text-gray-700 text-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
        id="hq-opt-${i}">
        <span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">${String.fromCharCode(65+i)}</span>
        ${opt}
      </button>`).join('');
  }

  const expEl = document.getElementById('hq-explanation');
  if (expEl) expEl.className = 'hidden rounded-2xl p-4 border-2 mt-2 mb-2';

  const nextBtn = document.getElementById('hq-next-btn');
  if (nextBtn) nextBtn.classList.add('hidden');

  const resultEl = document.getElementById('hq-result');
  if (resultEl) resultEl.classList.add('hidden');

  const qaEl = document.getElementById('hq-question-area');
  if (qaEl) qaEl.classList.remove('hidden');
}

// ── Handle answer ────────────────────────────────────────────
function answerHorst(idx) {
  if (horstState.answered) return;
  horstState.answered = true;

  const q = horstState.questions[horstState.index];
  const isCorrect = idx === q.correct;
  if (isCorrect) horstState.score++;

  q.options.forEach((_, i) => {
    const btn = document.getElementById(`hq-opt-${i}`);
    if (!btn) return;
    btn.disabled = true;
    if (i === q.correct) {
      btn.className = 'w-full text-left p-3.5 rounded-2xl border-2 font-medium text-sm transition-all border-green-400 bg-green-50 text-green-800';
      btn.innerHTML = btn.innerHTML.replace(
        `<span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">${String.fromCharCode(65+i)}</span>`,
        `<span class="inline-flex w-7 h-7 rounded-full bg-green-500 items-center justify-center text-xs font-bold mr-2 text-white">✓</span>`
      );
    } else if (i === idx) {
      btn.className = 'w-full text-left p-3.5 rounded-2xl border-2 font-medium text-sm transition-all border-red-400 bg-red-50 text-red-800';
      btn.innerHTML = btn.innerHTML.replace(
        `<span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">${String.fromCharCode(65+i)}</span>`,
        `<span class="inline-flex w-7 h-7 rounded-full bg-red-500 items-center justify-center text-xs font-bold mr-2 text-white">✗</span>`
      );
    }
  });

  const expEl  = document.getElementById('hq-explanation');
  const expIcon = document.getElementById('hq-explanation-icon');
  const expText = document.getElementById('hq-explanation-text');
  if (expEl) {
    if (expIcon) expIcon.textContent = isCorrect ? '✅' : '💡';
    if (expText) expText.textContent = q.explanation;
    expEl.className = `rounded-2xl p-4 border-2 mt-2 mb-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`;
  }

  const nextBtn = document.getElementById('hq-next-btn');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    const isLast = horstState.index === horstState.questions.length - 1;
    nextBtn.textContent = isLast ? '🏁 Ver resultado' : 'Siguiente →';
    nextBtn.className = `w-full py-3.5 rounded-2xl font-bold text-white text-sm mt-2 transition-all ${isLast ? 'bg-gradient-to-r from-swe-blue to-blue-600 shadow-lg' : 'bg-gradient-to-r from-gray-700 to-gray-600 shadow'}`;
  }

  const scoreEl = document.getElementById('hq-score-live');
  if (scoreEl) scoreEl.textContent = `${horstState.score} / ${horstState.index + 1}`;
}

// ── Next question or result ──────────────────────────────────
function nextHorstQuestion() {
  if (horstState.index === horstState.questions.length - 1) {
    showHorstResult();
  } else {
    horstState.index++;
    renderHorstQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ── Show result ──────────────────────────────────────────────
function showHorstResult() {
  const score = horstState.score;
  const total = horstState.questions.length;
  const pct   = Math.round((score / total) * 100);
  const passed = pct >= 70;

  const qaEl = document.getElementById('hq-question-area');
  if (qaEl) qaEl.classList.add('hidden');
  const resultEl = document.getElementById('hq-result');
  if (resultEl) resultEl.classList.remove('hidden');

  const emojiEl = document.getElementById('hq-result-emoji');
  if (emojiEl) emojiEl.textContent = passed ? '🎉' : '💪';

  const badgeEl = document.getElementById('hq-result-badge');
  if (badgeEl) {
    badgeEl.textContent = passed ? '¡Aprobado!' : 'Sigue practicando';
    badgeEl.className = `text-xs font-bold px-3 py-1 rounded-full ${passed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`;
  }

  const scoreNumEl = document.getElementById('hq-result-score');
  if (scoreNumEl) scoreNumEl.textContent = `${score} / ${total}`;
  const scorePctEl = document.getElementById('hq-result-pct');
  if (scorePctEl) scorePctEl.textContent = `${pct}%`;

  const resultBar = document.getElementById('hq-result-bar');
  if (resultBar) {
    resultBar.style.width = pct + '%';
    resultBar.style.background = passed ? 'linear-gradient(90deg,#10B981,#34D399)' : 'linear-gradient(90deg,#F59E0B,#FBBF24)';
  }

  const topicEl = document.getElementById('hq-result-topic');
  if (topicEl) topicEl.textContent = horstState.episode?.title || '';

  const gqSophie = document.getElementById('hq-sophie-img');
  const gqAndree = document.getElementById('hq-andree-img');
  const srcSophie = document.getElementById('sophie-photo-src');
  const srcAndree = document.getElementById('andree-photo-src');
  if (srcSophie && gqSophie) gqSophie.src = srcSophie.src;
  if (srcAndree && gqAndree) gqAndree.src = srcAndree.src;

  const msgEl = document.getElementById('hq-motivation-msg');
  const subEl = document.getElementById('hq-motivation-sub');
  if (passed) {
    if (msgEl) msgEl.textContent = '¡Bra jobbat! ¡Eso muy bien! 🎉';
    if (subEl) subEl.textContent = 'Tu comprensión auditiva mejora cada día. ¡Sigue escuchando!';
  } else {
    if (msgEl) msgEl.textContent = 'La práctica hace al maestro. Si fuera fácil, todos lo harían. 💪';
    if (subEl) subEl.textContent = 'Vuelve a escuchar el audio y repite. ¡Tú puedes!';
  }

  _stopWebAudio();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Restart episode ──────────────────────────────────────────
function restartHorstEpisode() {
  if (horstState.episode) startHorstEpisode(horstState.episode.id, horstState.level);
}

/* ═══════════════════════════════════════════════════════════════
   PRUEBA DE NIVEL — lógica (Sueco con Sophie)
   Escalado real A→B→C. Guarda el resultado en Supabase (tabla
   nivel_resultados) y muestra el progreso con gráficos (Chart.js).
═══════════════════════════════════════════════════════════════ */
let nivelState = {
  i: 0,
  answered: false,
  answers: [],        // { nivel, skill, correct }
  order: { pool: [], built: [] },
  charts: { radar: null, prog: null },
};

// ── Abrir la pantalla de inicio de la prueba ─────────────────
function showNivelTest() {
  if (!requireAccess()) return;
  stopSpeech();
  stopNivelAudio();
  showView('nivel-intro');
}

// ── Empezar la prueba ────────────────────────────────────────
function startNivelTest() {
  nivelState.i = 0;
  nivelState.answered = false;
  nivelState.answers = [];
  nivelState.order = { pool: [], built: [] };
  showView('nivel-quiz');
  renderNivelQuestion();
}

function nivelCurrent() { return LEVEL_TEST.questions[nivelState.i]; }

// ── Pintar la pregunta actual ────────────────────────────────
function renderNivelQuestion() {
  const q = nivelCurrent();
  const total = LEVEL_TEST.questions.length;
  nivelState.answered = false;
  stopNivelAudio();

  // Cabecera: progreso y nivel actual
  const bar = document.getElementById('nt-progress-bar');
  if (bar) bar.style.width = Math.round((nivelState.i / total) * 100) + '%';
  const counter = document.getElementById('nt-counter');
  if (counter) counter.textContent = `Pregunta ${nivelState.i + 1} de ${total}`;
  const lvlBadge = document.getElementById('nt-level-badge');
  const lvlNames = { A: 'Nivel Principiante', B: 'Nivel Básico', C: 'Nivel Intermedio', D: 'Nivel Avanzado' };
  const lvlColors = { A: '#10B981', B: '#3B82F6', C: '#F59E0B', D: '#8B5CF6' };
  if (lvlBadge) { lvlBadge.textContent = lvlNames[q.nivel]; lvlBadge.style.background = lvlColors[q.nivel]; }

  const sk = LEVEL_TEST.skills[q.skill];
  const skillTag = document.getElementById('nt-skill-tag');
  if (skillTag) skillTag.textContent = `${sk.icon} ${sk.label} · ${sk.es}`;

  // Ocultar explicación y botón siguiente
  const expl = document.getElementById('nt-explanation'); if (expl) expl.classList.add('hidden');
  const nextBtn = document.getElementById('nt-next-btn'); if (nextBtn) nextBtn.classList.add('hidden');
  const checkBtn = document.getElementById('nt-check-btn'); if (checkBtn) checkBtn.classList.add('hidden');

  const area = document.getElementById('nt-question-area');

  if (q.type === 'read') {
    area.innerHTML = `
      <div class="rounded-2xl p-4 mb-4 border-l-4 border-swe-blue" style="background:#EFF6FF;">
        <div class="text-xs text-swe-blue font-bold mb-1">📖 Lee este texto en sueco:</div>
        <p class="text-gray-800 font-semibold leading-relaxed">${q.text}</p>
      </div>
      <p class="font-bold text-gray-800 mb-3">${q.question}</p>
      <div id="nt-options" class="space-y-2.5"></div>`;
    renderNivelOptions(q);

  } else if (q.type === 'listen') {
    area.innerHTML = `
      <div class="rounded-2xl p-5 mb-4 text-center border-2 border-dashed" style="border-color:#0EA5E9; background:#F0F9FF;">
        <div class="text-xs text-sky-600 font-bold mb-2">🎧 Escucha (no se ve el texto)</div>
        <button id="nt-audio-btn" onclick="nivelPlayAudio()" class="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-3 rounded-2xl font-bold shadow hover:bg-sky-600 transition-colors">🔊 Escuchar</button>
        <div class="text-xs text-gray-400 mt-2">Puedes escuchar las veces que quieras</div>
      </div>
      <p class="font-bold text-gray-800 mb-3">${q.question}</p>
      <div id="nt-options" class="space-y-2.5"></div>`;
    renderNivelOptions(q);

  } else if (q.type === 'mc') {
    area.innerHTML = `
      <p class="font-bold text-gray-800 mb-4 text-base">${q.question}</p>
      <div id="nt-options" class="space-y-2.5"></div>`;
    renderNivelOptions(q);

  } else if (q.type === 'order') {
    nivelState.order.built = [];
    nivelState.order.pool = shuffleArray(q.words.map((w, idx) => ({ w, id: idx })));
    area.innerHTML = `
      <p class="font-bold text-gray-800 mb-4">${q.question}</p>
      <div class="text-xs text-gray-400 mb-1">Tu frase:</div>
      <div id="nt-built" class="min-h-[54px] rounded-2xl border-2 border-dashed border-gray-300 p-2 mb-3 flex flex-wrap gap-2" style="background:#FAFAFA;"></div>
      <div class="text-xs text-gray-400 mb-1">Toca las palabras en orden:</div>
      <div id="nt-pool" class="flex flex-wrap gap-2"></div>`;
    renderNivelOrder();
    const checkBtn = document.getElementById('nt-check-btn');
    if (checkBtn) checkBtn.classList.remove('hidden');
  }

  const _skip = document.getElementById('nt-skip-btn'); if (_skip) _skip.classList.remove('hidden');
  const qa = document.getElementById('nt-question-area');
  if (qa) qa.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderNivelOptions(q) {
  const box = document.getElementById('nt-options');
  if (!box) return;
  box.innerHTML = q.options.map((opt, idx) => `
    <button onclick="answerNivel(${idx})" data-idx="${idx}"
      class="nt-opt w-full text-left px-4 py-3 rounded-2xl border-2 border-gray-200 font-semibold text-gray-700 hover:border-swe-blue hover:bg-blue-50 transition-all">
      ${opt}
    </button>`).join('');
}

let _ntAudio = null, _ntAudioKey = null;
function _ntSetAudioBtn(txt) { const b = document.getElementById('nt-audio-btn'); if (b) b.innerHTML = txt; }
function stopNivelAudio() {
  if (_ntAudio) { try { _ntAudio.pause(); } catch (e) {} }
  _ntAudio = null; _ntAudioKey = null;
  _ntSetAudioBtn('🔊 Escuchar');
}
function nivelPlayAudio() {
  const q = nivelCurrent();
  const ok = q.audioKey && typeof SOPHIE_AUDIO_KEYS !== 'undefined' && SOPHIE_AUDIO_KEYS.indexOf(q.audioKey) !== -1;
  if (!ok) { if (q.audio) speak(q.audio); return; }
  // Misma pista: alternar play / pausa
  if (_ntAudio && _ntAudioKey === q.audioKey) {
    if (_ntAudio.paused) { _ntAudio.play(); _ntSetAudioBtn('⏸️ Pausar'); }
    else { _ntAudio.pause(); _ntSetAudioBtn('▶️ Continuar'); }
    return;
  }
  // Pista nueva: detener la anterior y empezar
  if (_ntAudio) { try { _ntAudio.pause(); } catch (e) {} }
  try {
    _ntAudio = new Audio('audio/' + q.audioKey + '.mp3');
    _ntAudioKey = q.audioKey;
    _ntAudio.addEventListener('ended', () => _ntSetAudioBtn('🔁 Escuchar de nuevo'));
    _ntAudio.play();
    _ntSetAudioBtn('⏸️ Pausar');
  } catch (e) { if (q.audio) speak(q.audio); }
}

// ── Saltar la pregunta (No lo sé) — cuenta como no acertada ──
function skipNivel() {
  if (nivelState.answered) return;
  nivelState.answered = true;
  stopNivelAudio();
  const q = nivelCurrent();
  nivelState.answers.push({ nivel: q.nivel, skill: q.skill, correct: false });
  if (q.type === 'order') {
    const cb = document.getElementById('nt-check-btn'); if (cb) cb.classList.add('hidden');
    const area = document.getElementById('nt-question-area');
    if (area && q.answer) {
      const hint = document.createElement('div');
      hint.className = 'mt-3 text-sm text-gray-700';
      hint.innerHTML = '✅ La frase correcta es: <span class=\'font-bold text-swe-blue\'>' + q.answer.join(' ') + '</span>';
      area.appendChild(hint);
    }
  } else {
    document.querySelectorAll('.nt-opt').forEach(btn => {
      const i = parseInt(btn.getAttribute('data-idx'), 10);
      btn.disabled = true;
      if (i === q.correct) { btn.classList.add('border-emerald-500'); btn.style.background = '#ECFDF5'; }
      else { btn.classList.add('opacity-50'); }
    });
  }
  showNivelExplanation(false, q.explanation);
}

// ── Preguntas de opción (leer / escuchar / escribir) ─────────
function answerNivel(idx) {
  if (nivelState.answered) return;
  nivelState.answered = true;
  stopNivelAudio();
  const q = nivelCurrent();
  const isCorrect = idx === q.correct;
  nivelState.answers.push({ nivel: q.nivel, skill: q.skill, correct: isCorrect });

  document.querySelectorAll('.nt-opt').forEach(btn => {
    const i = parseInt(btn.getAttribute('data-idx'), 10);
    btn.disabled = true;
    btn.classList.remove('hover:border-swe-blue', 'hover:bg-blue-50');
    if (i === q.correct) { btn.classList.add('border-emerald-500'); btn.style.background = '#ECFDF5'; }
    else if (i === idx) { btn.classList.add('border-red-400'); btn.style.background = '#FEF2F2'; }
    else { btn.classList.add('opacity-50'); }
  });

  showNivelExplanation(isCorrect, q.explanation);
}

// ── Preguntas de ordenar (tala) ──────────────────────────────
function renderNivelOrder() {
  const poolEl = document.getElementById('nt-pool');
  const builtEl = document.getElementById('nt-built');
  if (!poolEl || !builtEl) return;
  poolEl.innerHTML = nivelState.order.pool.map(item => `
    <button onclick="nivelPick(${item.id})" class="nt-chip px-3.5 py-2 rounded-xl bg-white border-2 border-swe-blue text-swe-blue font-bold shadow-sm hover:bg-blue-50 transition-all">${item.w}</button>`).join('');
  builtEl.innerHTML = nivelState.order.built.length
    ? nivelState.order.built.map(item => `
        <button onclick="nivelUnpick(${item.id})" class="nt-chip px-3.5 py-2 rounded-xl bg-swe-blue text-white font-bold shadow-sm hover:bg-swe-dark transition-all">${item.w}</button>`).join('')
    : '<span class="text-gray-300 text-sm py-2 px-1">…</span>';
}

function nivelPick(id) {
  if (nivelState.answered) return;
  const idx = nivelState.order.pool.findIndex(x => x.id === id);
  if (idx === -1) return;
  nivelState.order.built.push(nivelState.order.pool.splice(idx, 1)[0]);
  renderNivelOrder();
}

function nivelUnpick(id) {
  if (nivelState.answered) return;
  const idx = nivelState.order.built.findIndex(x => x.id === id);
  if (idx === -1) return;
  nivelState.order.pool.push(nivelState.order.built.splice(idx, 1)[0]);
  renderNivelOrder();
}

function checkNivelOrder() {
  if (nivelState.answered) return;
  const q = nivelCurrent();
  if (nivelState.order.built.length < q.words.length) {
    showToast('Usa todas las palabras 😊', 'info');
    return;
  }
  nivelState.answered = true;
  const built = nivelState.order.built.map(x => x.w);
  const isCorrect = built.join(' ') === q.answer.join(' ');
  nivelState.answers.push({ nivel: q.nivel, skill: q.skill, correct: isCorrect });

  const checkBtn = document.getElementById('nt-check-btn');
  if (checkBtn) checkBtn.classList.add('hidden');
  const builtEl = document.getElementById('nt-built');
  if (builtEl) {
    builtEl.style.borderStyle = 'solid';
    builtEl.style.borderColor = isCorrect ? '#10B981' : '#F87171';
    builtEl.style.background = isCorrect ? '#ECFDF5' : '#FEF2F2';
  }
  if (!isCorrect) {
    // Mostrar la frase correcta
    const area = document.getElementById('nt-question-area');
    if (area) {
      const hint = document.createElement('div');
      hint.className = 'mt-3 text-sm text-gray-700';
      hint.innerHTML = `✅ La frase correcta es: <span class="font-bold text-swe-blue">${q.answer.join(' ')}</span>`;
      area.appendChild(hint);
    }
  }
  showNivelExplanation(isCorrect, q.explanation);
}

// ── Explicación + botón siguiente ────────────────────────────
function showNivelExplanation(isCorrect, text) {
  const _skip = document.getElementById('nt-skip-btn'); if (_skip) _skip.classList.add('hidden');
  const expl = document.getElementById('nt-explanation');
  const icon = document.getElementById('nt-explanation-icon');
  const body = document.getElementById('nt-explanation-text');
  if (expl && body) {
    expl.classList.remove('hidden');
    expl.style.background = isCorrect ? '#ECFDF5' : '#FFF7ED';
    expl.style.borderColor = isCorrect ? '#6EE7B7' : '#FDBA74';
    if (icon) icon.textContent = isCorrect ? '✅' : '💡';
    body.textContent = (isCorrect ? '¡Correcto! ' : '') + text;
  }
  const nextBtn = document.getElementById('nt-next-btn');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = (nivelState.i >= LEVEL_TEST.questions.length - 1) ? '🏁 Ver mi nivel' : 'Siguiente →';
  }
}

function nextNivelQuestion() {
  if (nivelState.i >= LEVEL_TEST.questions.length - 1) {
    finishNivelTest();
  } else {
    nivelState.i++;
    renderNivelQuestion();
  }
}

// ── Calcular nivel y mostrar resultado ───────────────────────
function computeNivel() {
  const per = { A: { c: 0, t: 0 }, B: { c: 0, t: 0 }, C: { c: 0, t: 0 }, D: { c: 0, t: 0 } };
  const skills = { las: { c: 0, t: 0 }, hor: { c: 0, t: 0 }, skriv: { c: 0, t: 0 }, tala: { c: 0, t: 0 } };
  let correct = 0;
  nivelState.answers.forEach(a => {
    if (per[a.nivel]) { per[a.nivel].t++; if (a.correct) per[a.nivel].c++; }
    if (skills[a.skill]) { skills[a.skill].t++; if (a.correct) skills[a.skill].c++; }
    if (a.correct) correct++;
  });
  // Ubicación: aprobar cada nivel (>=60% de sus preguntas) para subir al siguiente
  const need = lvl => Math.max(1, Math.ceil((per[lvl].t || 1) * 0.6));
  const passA = per.A.c >= need('A'), passB = per.B.c >= need('B'), passC = per.C.c >= need('C'), passD = per.D.c >= need('D');
  let nivel = 'A';
  if (passA && passB) nivel = 'B';
  if (passA && passB && passC) nivel = 'C';
  if (passA && passB && passC && passD) nivel = 'D';
  return { nivel, per, skills, correct, total: nivelState.answers.length, passA, passB, passC, passD };
}

async function finishNivelTest() {
  stopNivelAudio();
  const r = computeNivel();
  try { localStorage.setItem('scs_nivel_last', JSON.stringify({ nivel: r.nivel, pct: Math.round(r.correct / (r.total||1) * 100), skills: { las: pctOf(r.skills.las), hor: pctOf(r.skills.hor), skriv: pctOf(r.skills.skriv), tala: pctOf(r.skills.tala) }, ts: Date.now() })); } catch (e) {}
  showView('nivel-result');

  // Insignia de nivel
  const names = { A: 'Principiante', B: 'Básico', C: 'Intermedio', D: 'Avanzado' };
  const descs = {
    A: 'Estás construyendo la base. ¡Vas por buen camino!',
    B: '¡Muy bien! Ya dominas lo básico y avanzas al nivel intermedio.',
    C: '¡Excelente! Manejas frases complejas. Estás en un nivel avanzado.',
    D: '¡Impresionante! Tu sueco es de nivel avanzado. Puedes con textos y matices.',
  };
  const colors = { A: '#10B981', B: '#3B82F6', C: '#F59E0B', D: '#8B5CF6' };
  const badge = document.getElementById('nt-result-level');
  if (badge) { badge.textContent = names[r.nivel]; badge.style.background = colors[r.nivel]; }
  const emoji = document.getElementById('nt-result-emoji');
  if (emoji) emoji.textContent = ({ A: '🌱', B: '🌟', C: '🎓', D: '🏆' })[r.nivel] || '🌱';
  const desc = document.getElementById('nt-result-desc');
  if (desc) desc.textContent = descs[r.nivel];
  const scoreEl = document.getElementById('nt-result-score');
  if (scoreEl) scoreEl.textContent = `${r.correct} / ${r.total} respuestas correctas`;

  // Desglose por nivel (barras A/B/C)
  const tiers = document.getElementById('nt-tier-breakdown');
  if (tiers) {
    const row = (lbl, o, col) => `
      <div class="mb-2">
        <div class="flex justify-between text-xs font-semibold mb-1"><span>${lbl}</span><span>${o.c}/${o.t}</span></div>
        <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full rounded-full" style="width:${o.t ? Math.round(o.c / o.t * 100) : 0}%; background:${col};"></div></div>
      </div>`;
    tiers.innerHTML = row('Principiante', r.per.A, '#10B981') + row('Básico', r.per.B, '#3B82F6') + row('Intermedio', r.per.C, '#F59E0B') + row('Avanzado', r.per.D, '#8B5CF6');
  }

  // Gráfico radar de las 4 destrezas
  drawNivelRadar(r.skills);

  // Guardar en Supabase y dibujar el progreso histórico
  const saved = await saveNivelResult(r);
  await drawNivelProgress(saved);
}

function drawNivelRadar(skills) {
  const canvas = document.getElementById('nt-radar');
  if (!canvas || !window.Chart) return;
  if (nivelState.charts.radar) { nivelState.charts.radar.destroy(); nivelState.charts.radar = null; }
  const order = ['las', 'hor', 'skriv', 'tala'];
  const labels = order.map(k => LEVEL_TEST.skills[k].es);
  const data = order.map(k => skills[k].t ? Math.round(skills[k].c / skills[k].t * 100) : 0);
  nivelState.charts.radar = new Chart(canvas, {
    type: 'radar',
    data: { labels, datasets: [{ label: '% aciertos', data, fill: true, backgroundColor: 'rgba(0,106,167,0.2)', borderColor: '#006AA7', pointBackgroundColor: '#FECC02', pointRadius: 4 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { r: { min: 0, max: 100, ticks: { stepSize: 25, backdropColor: 'transparent', color: '#9CA3AF' }, pointLabels: { font: { size: 12, weight: 'bold' }, color: '#374151' } } } }
  });
}

// ── Supabase: guardar y leer el historial ────────────────────
async function nivelStudentId() {
  if (window._sbSession?.id) return window._sbSession.id;
  try { const { data: { session } } = await sb.auth.getSession(); return session?.user?.id || null; } catch (e) { return null; }
}

async function saveNivelResult(r) {
  try {
    const sid = await nivelStudentId();
    if (!sid) return null;
    const row = {
      student_id: sid, nivel: r.nivel, puntaje: r.correct, total: r.total,
      las: pctOf(r.skills.las), hor: pctOf(r.skills.hor), skriv: pctOf(r.skills.skriv), tala: pctOf(r.skills.tala),
      detalle: { per: r.per },
    };
    const { data, error } = await sb.from('nivel_resultados').insert(row).select().single();
    if (error) { console.log('[nivel] guardar error', error.message); return null; }
    return data;
  } catch (e) { console.log('[nivel] guardar excepción', e); return null; }
}

function pctOf(o) { return o.t ? Math.round(o.c / o.t * 100) : 0; }

async function drawNivelProgress(justSaved) {
  const wrap = document.getElementById('nt-progress-wrap');
  const canvas = document.getElementById('nt-progress-chart');
  if (!wrap || !canvas || !window.Chart) return;
  let history = [];
  try {
    const sid = await nivelStudentId();
    if (sid) {
      const { data } = await sb.from('nivel_resultados').select('*').eq('student_id', sid).order('created_at', { ascending: true });
      if (data) history = data;
    }
  } catch (e) { history = []; }

  if (!history.length && justSaved) history = [justSaved];
  if (history.length < 2) {
    // Con un solo intento no hay línea de progreso todavía
    wrap.querySelector('#nt-progress-empty')?.classList.remove('hidden');
    canvas.classList.add('hidden');
    return;
  }
  wrap.querySelector('#nt-progress-empty')?.classList.add('hidden');
  canvas.classList.remove('hidden');

  const map = { A: 1, B: 2, C: 3 };
  const labels = history.map((h, i) => `Intento ${i + 1}`);
  const lvlData = history.map(h => map[h.nivel] || 1);
  const pctData = history.map(h => h.total ? Math.round(h.puntaje / h.total * 100) : 0);
  if (nivelState.charts.prog) { nivelState.charts.prog.destroy(); nivelState.charts.prog = null; }
  nivelState.charts.prog = new Chart(canvas, {
    type: 'line',
    data: { labels, datasets: [
      { label: 'Nivel (A=1, B=2, C=3)', data: lvlData, borderColor: '#006AA7', backgroundColor: 'rgba(0,106,167,0.1)', tension: 0.3, yAxisID: 'y', pointRadius: 5, pointBackgroundColor: '#006AA7' },
      { label: '% aciertos', data: pctData, borderColor: '#FECC02', backgroundColor: 'rgba(254,204,2,0.1)', tension: 0.3, yAxisID: 'y1', pointRadius: 4, pointBackgroundColor: '#F59E0B' },
    ] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
      scales: {
        y: { position: 'left', min: 0, max: 3, ticks: { stepSize: 1, color: '#006AA7', callback: v => ({ 1: 'A', 2: 'B', 3: 'C' }[v] || '') } },
        y1: { position: 'right', min: 0, max: 100, grid: { drawOnChartArea: false }, ticks: { color: '#F59E0B', callback: v => v + '%' } },
      } }
  });
}

// ── Utilidad: barajar ────────────────────────────────────────
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ═══════════════════════════════════════════════════════════════
   PANEL DEL ALUMNO (inicio) — Sueco con Sophie
   Izquierda: círculo de AVANCE · Centro: destrezas (gráfico) ·
   Derecha: bebé (¿qué tan sueco eres?) · Abajo: botón prueba + corregir
═══════════════════════════════════════════════════════════════ */
const DASH_RING_C = 326.7; // circunferencia del anillo (2·π·52)
const DASH_PRACTICE_TARGET = 300; // aciertos para llenar la parte de práctica

function getLastNivel() {
  try { return JSON.parse(localStorage.getItem('scs_nivel_last') || 'null'); } catch (e) { return null; }
}

function computeAvance() {
  const last = getLastNivel();
  const testScore = last ? Math.round(last.pct || 0) : 0;
  const correct = (typeof state !== 'undefined' && state.stats && state.stats.correct) || 0;
  const practiceScore = Math.min(100, Math.round(correct / DASH_PRACTICE_TARGET * 100));
  // 50% prueba de nivel + 50% práctica. 100% = 100 en la prueba Y mucha práctica.
  const avance = last ? Math.round(testScore * 0.5 + practiceScore * 0.5) : Math.round(practiceScore * 0.5);
  return { avance, testScore, practiceScore, correct, last };
}

// ── Alce (älg) bebé de cuerpo completo, animado, crece por nivel
function mooseSVG(stage) {
  const B = '#C0894F', D = '#9B6B39', belly = '#F5E6CF', earIn = '#E7A9A0', antler = '#7A5230', hoof = '#5E3E28', nose = '#4A3220';
  const big = stage >= 2;
  // Astas: crecen con la etapa
  let antlers = '';
  if (stage >= 1) {
    antlers = `
      <path d="M40 30 C36 20 33 16 30 13" stroke="${antler}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M60 30 C64 20 67 16 70 13" stroke="${antler}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M34.5 20 C31 17 28 16 25 17" stroke="${antler}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M65.5 20 C69 17 72 16 75 17" stroke="${antler}" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${big ? `<path d="M31 14 C28 10 25 9 22 10" stroke="${antler}" stroke-width="3" fill="none" stroke-linecap="round"/>
              <path d="M69 14 C72 10 75 9 78 10" stroke="${antler}" stroke-width="3" fill="none" stroke-linecap="round"/>` : ''}`;
  } else {
    // bebé: solo dos botoncitos
    antlers = `<circle cx="40" cy="27" r="3.2" fill="${antler}"/><circle cx="60" cy="27" r="3.2" fill="${antler}"/>`;
  }
  const crown = stage >= 3
    ? `<path d="M41 11 l3.5 6 l5.5 -7.5 l5.5 7.5 l3.5 -6 l0 8.5 l-18 0 z" fill="#FECC02" stroke="#E0A800" stroke-width="0.6"/>`
    : '';
  return `<svg viewBox="0 0 100 122" class="w-full h-full" style="overflow:visible">
    <style>
      .alce-head{transform-box:fill-box;transform-origin:50% 88%;animation:alceBob 3.2s ease-in-out infinite;}
      .alce-eye{transform-box:fill-box;transform-origin:center;animation:alceBlink 4.5s infinite;}
      .alce-tail{transform-box:fill-box;transform-origin:12% 60%;animation:alceTail 1.8s ease-in-out infinite;}
      .alce-ear{transform-box:fill-box;transform-origin:60% 100%;animation:alceEar 3.2s ease-in-out infinite;}
      @keyframes alceBob{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}
      @keyframes alceBlink{0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(0.12)}}
      @keyframes alceTail{0%,100%{transform:rotate(-18deg)}50%{transform:rotate(16deg)}}
      @keyframes alceEar{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}
    </style>

    <!-- PATAS -->
    <rect x="36" y="92" width="6.5" height="26" rx="3" fill="${D}"/>
    <rect x="57.5" y="92" width="6.5" height="26" rx="3" fill="${D}"/>
    <rect x="43" y="94" width="6.5" height="25" rx="3" fill="${B}"/>
    <rect x="50.5" y="94" width="6.5" height="25" rx="3" fill="${B}"/>
    <rect x="43" y="113" width="6.5" height="6" rx="2.5" fill="${hoof}"/>
    <rect x="50.5" y="113" width="6.5" height="6" rx="2.5" fill="${hoof}"/>
    <rect x="36" y="112" width="6.5" height="6" rx="2.5" fill="${hoof}"/>
    <rect x="57.5" y="112" width="6.5" height="6" rx="2.5" fill="${hoof}"/>

    <!-- COLA -->
    <g class="alce-tail"><path d="M70 84 q10 -3 9 6 q-1 6 -9 3 z" fill="${B}"/><path d="M72 86 q5 -1 5 3" fill="${belly}"/></g>

    <!-- CUERPO -->
    <ellipse cx="50" cy="86" rx="24" ry="18" fill="${B}"/>
    <ellipse cx="50" cy="92" rx="15" ry="11" fill="${belly}"/>
    <circle cx="40" cy="80" r="2.2" fill="#fff" opacity=".85"/>
    <circle cx="59" cy="82" r="2.2" fill="#fff" opacity=".85"/>
    <circle cx="49" cy="76" r="1.8" fill="#fff" opacity=".85"/>
    <circle cx="63" cy="88" r="1.6" fill="#fff" opacity=".8"/>

    <!-- CABEZA (grande = bebé, se mueve) -->
    <g class="alce-head">
      ${antlers}${crown}
      <g class="alce-ear"><ellipse cx="26" cy="40" rx="8.5" ry="12" fill="${B}" transform="rotate(-24 26 40)"/><ellipse cx="26" cy="40" rx="4" ry="7" fill="${earIn}" transform="rotate(-24 26 40)"/></g>
      <g class="alce-ear"><ellipse cx="74" cy="40" rx="8.5" ry="12" fill="${B}" transform="rotate(24 74 40)"/><ellipse cx="74" cy="40" rx="4" ry="7" fill="${earIn}" transform="rotate(24 74 40)"/></g>
      <path d="M31 44 Q31 24 50 24 Q69 24 69 44 Q69 58 58 62 L42 62 Q31 58 31 44 Z" fill="${B}"/>
      <ellipse cx="50" cy="60" rx="15" ry="12" fill="${belly}"/>
      <g class="alce-eye"><circle cx="41" cy="46" r="6.2" fill="#fff"/><circle cx="41.5" cy="46.6" r="4.4" fill="#3A2A1A"/><circle cx="43" cy="45" r="1.5" fill="#fff"/></g>
      <g class="alce-eye"><circle cx="59" cy="46" r="6.2" fill="#fff"/><circle cx="58.5" cy="46.6" r="4.4" fill="#3A2A1A"/><circle cx="60" cy="45" r="1.5" fill="#fff"/></g>
      <ellipse cx="50" cy="62" rx="5.5" ry="4.2" fill="${nose}"/>
      <path d="M46 68 Q50 71 54 68" stroke="${nose}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}

// Imagen real del alce por nivel (con animación suave); si falla, usa el dibujo SVG
const ALCE_IMG = ['bebe', 'joven', 'adulto', 'rey'];
function mooseVisual(stage) {
  const name = ALCE_IMG[stage] || 'bebe';
  return `<img src="alce/${name}.webp" alt="Alce" class="w-full h-full object-cover rounded-2xl shadow-sm alce-float" onerror="this.onerror=null; this.parentNode.innerHTML=mooseSVG(${stage});">`;
}

// ── Candado por estado de pago ───────────────────────────────
function _paymentState() {
  const s = window._sbSession || {};
  const status = (s.status || '').toLowerCase();
  // Cancelado y ya terminado / inactivo → bloqueo (sin acceso)
  if (status === 'cancelled' || status === 'canceled' || status === 'inactive' || status === 'unpaid') return 'blocked';
  // Canceló pero AÚN tiene tiempo pagado → mantiene acceso (modelo Netflix)
  if (status === 'cancelling') return 'cancelling';
  // Problema de pago, Stripe reintentando → mantiene acceso (periodo de gracia)
  if (status === 'failed' || status === 'past_due' || status === 'pending') return 'payment_issue';
  if (s.active === false) return 'blocked';
  return 'ok';
}

// Reactivar pagando: abre el link de pago (checkout). Al pagar, el webhook reactiva.
async function reactivarSuscripcion() {
  try {
    const cfg = await getStripeConfig();
    if (cfg && cfg.link) { window.location.href = cfg.link; return; }
  } catch (e) {}
  manageSubscription();
}
function paymentBlocked() { return _paymentState() === 'blocked'; }
function requireAccess() {
  if (paymentBlocked()) {
    showToast('🔒 Tu suscripción está inactiva por falta de pago. Reactívala para continuar.', 'error');
    renderPaymentBanner();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
    return false;
  }
  return true;
}
function renderPaymentBanner() {
  const el = document.getElementById('payment-banner');
  if (!el) return;
  const st = _paymentState();
  if (st === 'ok') { el.innerHTML = ''; return; }
  if (st === 'cancelling') {
    el.innerHTML = `<div class="rounded-2xl p-4 border-2 flex items-center gap-3" style="background:#EFF6FF;border-color:#93C5FD;">
      <span class="text-2xl flex-shrink-0">📅</span>
      <div class="flex-1 min-w-0"><div class="font-bold text-blue-900 text-sm">Cancelaste tu suscripción</div>
      <div class="text-xs text-blue-700">Sigues con acceso completo hasta que termine tu periodo pagado. ¿Cambiaste de opinión?</div></div>
      <button onclick="manageSubscription()" class="text-xs font-bold px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex-shrink-0">Reactivar</button>
    </div>`;
  } else if (st === 'payment_issue') {
    el.innerHTML = `<div class="rounded-2xl p-4 border-2 flex items-center gap-3" style="background:#FFFBEB;border-color:#FCD34D;">
      <span class="text-2xl flex-shrink-0">⚠️</span>
      <div class="flex-1 min-w-0"><div class="font-bold text-amber-800 text-sm">Tu último pago no se procesó</div>
      <div class="text-xs text-amber-700">Se volverá a intentar automáticamente. Mientras tanto puedes seguir usando la plataforma con normalidad.</div></div>
      <button onclick="manageSubscription()" class="text-xs font-bold px-3 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 flex-shrink-0">Actualizar pago</button>
    </div>`;
  } else {
    el.innerHTML = `<div class="rounded-2xl p-4 border-2 flex items-center gap-3" style="background:#FEF2F2;border-color:#FCA5A5;">
      <span class="text-2xl flex-shrink-0">🔒</span>
      <div class="flex-1 min-w-0"><div class="font-bold text-red-800 text-sm">Tu suscripción está inactiva</div>
      <div class="text-xs text-red-700">Por un problema de pago no puedes usar el contenido. Reactiva tu suscripción para volver a entrar.</div></div>
      <button onclick="reactivarSuscripcion()" class="text-xs font-bold px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 flex-shrink-0">Reactivar</button>
    </div>`;
  }
}

function renderHomeDashboard() {
  renderPaymentBanner();
  const ring = document.getElementById('dash-ring-fg');
  if (!ring) return;
  const { avance, last } = computeAvance();

  // Anillo de avance
  ring.style.strokeDashoffset = (DASH_RING_C * (1 - avance / 100)).toFixed(1);
  const col = avance >= 70 ? '#7C3AED' : (avance >= 40 ? '#006AA7' : '#10B981');
  ring.setAttribute('stroke', col);
  const pctEl = document.getElementById('dash-pct');
  if (pctEl) { pctEl.textContent = avance + '%'; pctEl.style.color = col; }

  // Destrezas: 4 barras (gráfico). Se resalta la más floja.
  const skillsEl = document.getElementById('dash-skills');
  if (skillsEl) {
    const order = ['las', 'hor', 'skriv', 'tala'];
    const has = last && last.skills;
    let weakKey = null;
    if (has) {
      let min = 101;
      order.forEach(k => { const v = last.skills[k] != null ? last.skills[k] : 0; if (v < min) { min = v; weakKey = k; } });
    }
    const rows = order.map(k => {
      const sk = LEVEL_TEST.skills[k];
      const v = has ? (last.skills[k] != null ? last.skills[k] : 0) : 0;
      const isWeak = k === weakKey;
      return `<div class="flex items-center gap-2 ${isWeak ? 'ring-1 ring-amber-300 bg-amber-50 rounded-lg px-1.5 py-1 -mx-0.5' : ''}" title="${sk.es} · ${sk.label}">
        <span class="text-base sm:text-sm w-5 sm:w-4 text-center flex-shrink-0">${sk.icon}</span>
        <span class="text-[12px] sm:text-[10px] font-semibold w-24 sm:w-16 flex-shrink-0 leading-tight ${isWeak ? 'text-amber-700' : 'text-gray-500'}">${sk.es}</span>
        <div class="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full rounded-full" style="width:${has ? v : 6}%; background:${has ? sk.color : '#E5E7EB'}; transition:width .8s ease;"></div>
        </div>
        <span class="text-[11px] sm:text-[10px] font-bold w-8 sm:w-7 text-right ${isWeak ? 'text-amber-600' : 'text-gray-400'}">${has ? v + '%' : '–'}</span>
      </div>`;
    }).join('');
    const caption = has && weakKey
      ? `<div class="text-[10px] text-amber-600 font-bold text-center mt-2">🎯 Enfócate en ${LEVEL_TEST.skills[weakKey].es}</div>`
      : (!has ? `<div class="text-[10px] text-gray-400 text-center mt-2">Haz la prueba para medir esto</div>` : '');
    skillsEl.innerHTML = rows + caption;
  }

  // Botón de la prueba de nivel (azul)
  const testBtn = document.getElementById('dash-test-btn');
  if (testBtn) testBtn.textContent = last ? '🔄 Repetir prueba de nivel' : '🎯 Hacer la prueba de nivel';

  // Chip "por corregir" (en qué mejorar ya mismo)
  const fixBtn = document.getElementById('dash-fix-btn');
  const fixCount = document.getElementById('dash-fix-count');
  const mistakes = (typeof getMistakes === 'function') ? getMistakes().length : 0;
  if (fixBtn && fixCount) {
    if (mistakes > 0) { fixCount.textContent = mistakes; fixBtn.classList.remove('hidden'); fixBtn.classList.add('inline-flex'); }
    else { fixBtn.classList.add('hidden'); fixBtn.classList.remove('inline-flex'); }
  }

  // Alce (älg): crece GRADUALMENTE con el avance — el bebé se mantiene y no salta al hacer la prueba
  const mooseEl = document.getElementById('dash-moose');
  const mLabel = document.getElementById('dash-baby-label');
  const mSub = document.getElementById('dash-moose-sub');
  const ALCE_STAGES = [
    [0, 'Alce bebé', '¡Aquí empieza todo!'],
    [1, 'Alce joven', 'Vas creciendo 💪'],
    [2, 'Alce adulto', '¡Ya casi llegas!'],
    [3, 'Alce rey 👑', '¡Eres un rey! 👑'],
  ];
  const si = avance >= 75 ? 3 : (avance >= 50 ? 2 : (avance >= 25 ? 1 : 0));
  const stage = ALCE_STAGES[si][0];
  if (mooseEl) mooseEl.innerHTML = mooseVisual(stage);
  if (mLabel) mLabel.textContent = ALCE_STAGES[si][1];
  if (mSub) mSub.textContent = ALCE_STAGES[si][2];
}


// ═══════════════════════════════════════════════════════════
//  SECCIÓN TEORÍA — camino del estudiante (leer → practicar → ✓)
//  Progreso en localStorage con forma Supabase-ready (una sola clave).
// ═══════════════════════════════════════════════════════════
const theoryState = { unitId: null, card: 0 };

// ── Progreso (formato listo para subir a una columna JSONB) ──
function getTheoryProgress() {
  try { return JSON.parse(localStorage.getItem('sc_theory') || '{}'); } catch (e) { return {}; }
}
function saveTheoryProgress(p) {
  try { localStorage.setItem('sc_theory', JSON.stringify(p)); } catch (e) {}
}
function theoryUnitStatus(id) { return getTheoryProgress()[id] || {}; }
function markTheoryRead(id) {
  const p = getTheoryProgress(); const cur = p[id] || {};
  p[id] = { ...cur, read: true }; saveTheoryProgress(p);
}
function markTheoryDone(id, score) {
  const p = getTheoryProgress(); const cur = p[id] || {};
  p[id] = {
    read: true, done: true,
    bestScore: Math.max(cur.bestScore || 0, score || 0),
    date: new Date().toISOString().slice(0, 10)
  };
  saveTheoryProgress(p);
}

// ── Camino (lista de unidades) ───────────────────────────────
function showTheory() {
  if (!requireAccess()) return;
  stopSpeech();
  showView('theory');
  renderTheoryPath();
}

const THEORY_LEVEL_COLORS = { A: '#10B981', B: '#3B82F6', C: '#F59E0B', D: '#8B5CF6' };
const LEVEL_LABEL = { A: 'Principiante', B: 'Básico', C: 'Intermedio', D: 'Avanzado' };
const LEVEL_SFI   = { A: 'SFI A', B: 'SFI B', C: 'SFI C', D: 'SFI D' };
function theoryColor(u) { return THEORY_LEVEL_COLORS[(u && u.level) || 'A'] || '#10B981'; }

function theoryGoLevel(lvl) {
  const el = document.getElementById('theory-level-' + lvl);
  if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderTheoryTabs(units, p) {
  const tabsEl = document.getElementById('theory-tabs');
  if (!tabsEl) return;
  const seen = [];
  units.forEach(u => { const l = u.level || 'A'; if (!seen.includes(l)) seen.push(l); });
  tabsEl.innerHTML = seen.map(l => {
    const col = THEORY_LEVEL_COLORS[l] || '#10B981';
    const inLevel = units.filter(x => (x.level || 'A') === l);
    const doneLevel = inLevel.filter(x => p[x.id] && p[x.id].done).length;
    const full = doneLevel === inLevel.length && inLevel.length > 0;
    return `
      <button onclick="theoryGoLevel('${l}')"
        class="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border-2 transition-all card-hover"
        style="background:${col}18; color:${col}; border-color:${col}55;">
        <span class="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black" style="background:${col};">${full ? '✓' : l}</span>
        ${LEVEL_LABEL[l] || l}
      </button>`;
  }).join('');
}

function renderTheoryPath() {
  const wrap = document.getElementById('theory-path');
  if (!wrap) return;
  const units = (typeof THEORY_DATA !== 'undefined' && THEORY_DATA.units) ? THEORY_DATA.units : [];
  const p = getTheoryProgress();
  const doneCount = units.filter(u => p[u.id] && p[u.id].done).length;
  const firstOpen = units.findIndex(u => !(p[u.id] && p[u.id].done));

  renderTheoryTabs(units, p);

  const bar = document.getElementById('theory-progress-bar');
  if (bar) bar.style.width = units.length ? Math.round(doneCount / units.length * 100) + '%' : '0%';
  const lbl = document.getElementById('theory-progress-label');
  if (lbl) lbl.textContent = `${doneCount} de ${units.length} lecciones completadas`;

  let html = '';
  let curLevel = null;
  units.forEach((u, i) => {
    const lvl = (u.level || 'A');
    const col = theoryColor(u);
    // Encabezado cuando empieza un nivel nuevo
    if (lvl !== curLevel) {
      curLevel = lvl;
      const inLevel = units.filter(x => (x.level || 'A') === lvl);
      const doneLevel = inLevel.filter(x => p[x.id] && p[x.id].done).length;
      const restan = inLevel.length - doneLevel;
      const nota = restan === 0
        ? '¡Nivel completado! 🎉'
        : `${doneLevel} de ${inLevel.length} lecciones · te faltan ${restan} para el siguiente nivel`;
      html += `
        <div id="theory-level-${lvl}" class="flex items-center gap-2 mb-2" style="margin-top:${i === 0 ? '0' : '1.5rem'}; scroll-margin-top:12px;">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black shadow" style="background:linear-gradient(135deg, ${col}, ${col}cc);">${lvl}</div>
          <div class="flex-1">
            <div class="text-sm font-extrabold text-gray-700">${LEVEL_LABEL[lvl] || lvl} <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full align-middle" style="background:${col}22; color:${col};">${LEVEL_SFI[lvl] || ('SFI ' + lvl)}</span></div>
            <div class="text-[11px] text-gray-400">${nota}</div>
          </div>
        </div>`;
    }
    const st = p[u.id] || {};
    const done = !!st.done;
    const isNext = i === firstOpen;
    const badge = done
      ? `<div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-lg shadow flex-shrink-0" style="background:${col};">✓</div>`
      : `<div class="w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-sm flex-shrink-0" style="background:${col}22;">${u.icon || '📘'}</div>`;
    const ring = isNext ? `box-shadow:0 0 0 3px ${col}66;` : '';
    html += `
      <div onclick="openTheoryUnit('${u.id}')"
           class="rounded-2xl p-4 shadow-md border-2 cursor-pointer card-hover flex items-center gap-3"
           style="background:linear-gradient(135deg, ${col}12, ${col}22); border-color:${col}40; ${ring}">
        ${badge}
        <div class="flex-1 min-w-0">
          <div class="font-bold text-gray-800 text-sm leading-tight">${u.title}</div>
          <div class="text-xs text-gray-500 truncate">${u.subtitle || ''}</div>
        </div>
        ${isNext && !done ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style="background:${col}; color:#fff;">Empieza aquí</span>` : ''}
        <span class="text-lg flex-shrink-0" style="color:${col};">→</span>
      </div>`;
  });
  wrap.innerHTML = html;
}

// ── Lector de la lección (tarjetas) ──────────────────────────
function openTheoryUnit(id) {
  const u = THEORY_DATA.units.find(x => x.id === id);
  if (!u) return;
  theoryState.unitId = id;
  theoryState.card = 0;
  showView('theory-lesson');
  renderTheoryCard();
}

function renderTheoryCard() {
  const u = THEORY_DATA.units.find(x => x.id === theoryState.unitId);
  if (!u) return;
  const col = theoryColor(u);
  const cards = u.cards || [];
  const i = Math.max(0, Math.min(theoryState.card, cards.length - 1));
  theoryState.card = i;
  const c = cards[i] || {};
  const isLast = i === cards.length - 1;

  const titleEl = document.getElementById('theory-lesson-title');
  if (titleEl) titleEl.textContent = u.title;
  const subEl = document.getElementById('theory-lesson-sub');
  if (subEl) subEl.textContent = `Tarjeta ${i + 1} de ${cards.length}`;

  const dots = document.getElementById('theory-dots');
  if (dots) dots.innerHTML = cards.map((_, k) =>
    `<span style="width:8px;height:8px;border-radius:50%;background:${k === i ? col : '#D1D5DB'};display:inline-block;"></span>`
  ).join('');

  const body = document.getElementById('theory-card-body');
  if (body) body.innerHTML = `
    <div class="text-4xl mb-3">${c.icon || u.icon || '📘'}</div>
    ${c.title ? `<h2 class="text-lg font-extrabold text-gray-800 mb-3" style="color:${col};">${c.title}</h2>` : ''}
    <div class="text-gray-700 leading-relaxed" style="font-size:1.02rem;">${c.body || ''}</div>
    ${c.example ? `<div class="mt-4 rounded-xl p-3 text-sm" style="background:${col}12; border-left:4px solid ${col};">${c.example}</div>` : ''}
  `;

  const prev = document.getElementById('theory-prev');
  if (prev) prev.style.visibility = i === 0 ? 'hidden' : 'visible';
  const next = document.getElementById('theory-next');
  const finish = document.getElementById('theory-finish');
  if (next) next.classList.toggle('hidden', isLast);
  if (finish) {
    finish.classList.toggle('hidden', !isLast);
    finish.textContent = u.grammarTopicId ? '✅ ¡Entendido! Practicar' : '✅ Marcar como completada';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function theoryNext() {
  const u = THEORY_DATA.units.find(x => x.id === theoryState.unitId);
  if (!u) return;
  if (theoryState.card < u.cards.length - 1) { theoryState.card++; renderTheoryCard(); }
}
function theoryPrev() {
  if (theoryState.card > 0) { theoryState.card--; renderTheoryCard(); }
}

// ── Fin de la lectura → practicar (o completar si no hay práctica) ──
function theoryFinish() {
  const u = THEORY_DATA.units.find(x => x.id === theoryState.unitId);
  if (!u) return;
  if (u.grammarTopicId && typeof startGrammarTopic === 'function') {
    markTheoryDone(u.id, theoryUnitStatus(u.id).bestScore || 0.7);
    grammarState.fromTheory = u.id;
    startGrammarTopic(u.grammarTopicId);
  } else {
    markTheoryDone(u.id, 1);
    showTheory();
    if (typeof showToast === 'function') showToast('¡Lección completada! ✓', 'success');
  }
}

// ── Volver a la Teoría desde el resultado de la práctica ─────
function backToTheory() {
  if (typeof grammarState !== 'undefined') grammarState.fromTheory = null;
  showTheory();
}
