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

// Helper: calls the admin Edge Function
async function adminOps(action, data = {}) {
  try {
    const res = await fetch(EDGE_FN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON}`
      },
      body: JSON.stringify({ action, password: 'sofi2025', data })
    });
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
  const titles = { A: 'SFI A', B: 'SFI B', C: 'SFI C', D: 'SFI D' };
  const classes = { A: 'level-a', B: 'level-b', C: 'level-c', D: 'level-d' };
  document.getElementById('menu-subtitle').textContent = `SFI ${L} — Välj övning`;
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
  document.getElementById('listen-header-sub').textContent = `SFI ${state.level} — Comprensión auditiva`;
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
  document.getElementById('read-header-sub').textContent = `SFI ${state.level} — Comprensión lectora`;
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
  document.getElementById('write-header-sub').textContent = `SFI ${state.level} — Producción escrita`;
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
  document.getElementById('speak-header-sub').textContent = `SFI ${state.level} — Expresión oral`;
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
  document.getElementById('test-header-sub').textContent = `SFI ${state.level} — Prueba completa`;
  document.getElementById('test-intro-title').textContent = `Prueba SFI ${state.level}`;
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
  if (!state.adminLoggedIn) {
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('admin-panel').classList.add('hidden');
  } else {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    adminTab('dashboard');
  }
  showView('admin');
}

function adminLogin() {
  const pwd = document.getElementById('admin-pwd').value;
  if (pwd === 'sofi2025') {
    state.adminLoggedIn = true;
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    adminTab('dashboard'); // Open dashboard by default
    showToast('¡Bienvenida, Sofi! 👋', 'success');
  } else {
    showToast('Contraseña incorrecta', 'error');
    document.getElementById('admin-pwd').value = '';
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
  const contentList     = document.getElementById('admin-content-list');
  const levelSelector   = document.querySelector('.admin-level-selector');

  // Hide all special sections first
  if (dashSection)     dashSection.classList.add('hidden');
  if (studentsSection) studentsSection.classList.add('hidden');
  if (configSection)   configSection.classList.add('hidden');
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
async function getStudents() {
  const result = await adminOps('list_students');
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
    .select('active, name, device_keys')
    .eq('id', data.user.id)
    .single();

  if (dbErr || !student) {
    await sb.auth.signOut();
    showErr('Error al verificar tu cuenta. Contacta a Sophie.');
    return;
  }

  if (!student.active) {
    await sb.auth.signOut();
    showErr('Tu acceso está desactivado. Contacta a Sophie para reactivarlo.');
    return;
  }

  // 3. Device check
  const deviceKeys = student.device_keys || [];
  const alreadyRegistered = deviceKeys.includes(DEVICE_KEY);

  if (!alreadyRegistered && deviceKeys.length >= MAX_DEVICES) {
    await sb.auth.signOut();
    showErr(`Límite de ${MAX_DEVICES} dispositivos alcanzado. Contacta a Sophie.`);
    return;
  }

  // 4. Register device if new
  const updFields = alreadyRegistered
    ? { last_login: new Date().toISOString() }
    : { device_keys: [...deviceKeys, DEVICE_KEY], last_login: new Date().toISOString() };
  await sb.from('students').update(updFields).eq('id', data.user.id);

  window._sbSession = { email: data.user.email, id: data.user.id, name: student.name };
  errEl?.classList.add('hidden');
  if (btn) { btn.disabled = false; btn.textContent = 'Entrar'; }
  // Ocultar botón admin para alumnos normales
  const adminBtn = document.getElementById('admin-btn-home');
  if (adminBtn) adminBtn.style.display = 'none';
  showView('home');
  renderHomeDashboard();
  showToast(`¡Välkommen, ${student.name}! 🇸🇪`, 'success');
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
        'Authorization': `Bearer ${SUPABASE_ANON}`
      },
      body: JSON.stringify({
        action: 'create_portal_session',
        password: 'sofi2025',
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

  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    const { data: student } = await sb
      .from('students').select('active').eq('id', session.user.id).single();
    if (student?.active) {
      window._sbSession = { email: session.user.email, id: session.user.id };
      // Ocultar botón admin para alumnos normales
      const adminBtn = document.getElementById('admin-btn-home');
      if (adminBtn) adminBtn.style.display = 'none';
      showView('home');
      return;
    }
    await sb.auth.signOut();
  }
  showView('login');
});

// ── Forgot password ───────────────────────────────────────
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

async function resetStudentDevices(id) {
  const result = await adminOps('reset_devices', { id });
  if (result.error) { showToast('Error: ' + result.error, 'error'); return; }
  showToast(`🔄 Dispositivos reseteados`, 'success');
  renderStudents();
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
  const students = await getStudents();

  if (students.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-gray-400 text-sm">
      <div class="text-3xl mb-2">👥</div>
      <p>No hay alumnos registrados.<br>Agrega el primero arriba.</p>
    </div>`;
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
    const borderColor = status === 'active' || status === 'manual' ? 'border-green-200' : status === 'cancelling' ? 'border-orange-200' : status === 'failed' ? 'border-red-200' : 'border-gray-200';
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
        ${cancelsAtStr ? `<span>·</span><span class="text-orange-500 font-semibold">⚠️ Pierde acceso: ${cancelsAtStr}</span>` : ''}
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
};

// ── Navigate to grammar topic selector ───────────────────────
function showGrammar() {
  stopSpeech();
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
function addMistake(q) {
  const arr = getMistakes();
  if (!arr.some(x => x.text === q.text)) {
    arr.push({ text: q.text, options: q.options, correct: q.correct, explanation: q.explanation });
    saveMistakes(arr);
  }
}
function removeMistake(q) {
  saveMistakes(getMistakes().filter(x => x.text !== q.text));
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
    <div class="grammar-topic-card rounded-2xl p-4 shadow-md border-2 border-white/60 cursor-pointer card-hover"
         style="background: linear-gradient(135deg, ${topic.color}15, ${topic.color}30); border-color: ${topic.color}40;"
         onclick="startGrammarTopic('${topic.id}')">
      <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-sm"
           style="background: linear-gradient(135deg, ${topic.color}dd, ${topic.color}aa);">
        ${topic.icon}
      </div>
      <div class="font-bold text-gray-800 text-sm leading-tight mb-1">${topic.title}</div>
      <div class="text-xs text-gray-500 mb-3">${topic.subtitle}</div>
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full"
              style="background:${topic.color}22; color:${topic.color};">
          SFI ${topic.level}
        </span>
        <span class="text-xs text-gray-400">${topic.questions.length} preguntas</span>
      </div>
    </div>
  `).join('');
}

// ── Start a grammar topic quiz ───────────────────────────────
function startGrammarTopic(topicId) {
  const topic = GRAMMAR_DATA.topics.find(t => t.id === topicId);
  if (!topic) return;

  grammarState.topic = topic;
  // Shuffle questions (Fisher-Yates)
  grammarState.questions = [...topic.questions].sort(() => Math.random() - 0.5).slice(0, topic.sessionSize || topic.questions.length);
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
  const total = grammarState.questions.length;
  const current = grammarState.index + 1;

  grammarState.answered = false;

  // Racha como barra (se llena con la racha, se reinicia al fallar)
  const progressBar = document.getElementById('gq-progress-bar');
  if (progressBar) progressBar.style.width = (Math.min(grammarState.streak, 10) * 10) + '%';

  // Racha en el header
  const streakEl = document.getElementById('gq-streak');
  if (streakEl) streakEl.textContent = `🔥 ${grammarState.streak}`;

  // Stats
  const catEl = document.getElementById('gq-category');
  if (catEl) catEl.textContent = `🔥 Racha: ${grammarState.streak}   ·   Respondidas: ${grammarState.total}`;

  // Question text
  const qEl = document.getElementById('gq-question-text');
  if (qEl) qEl.textContent = q.text;

  // Answer options
  const optionsEl = document.getElementById('gq-options');
  if (optionsEl) {
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

  // Hide explanation and next button
  const expEl = document.getElementById('gq-explanation');
  if (expEl) {
    expEl.className = 'hidden rounded-2xl p-4 border-2 mt-4 mb-2';
    expEl.style.display = '';
  }

  const nextBtn = document.getElementById('gq-next-btn');
  if (nextBtn) nextBtn.classList.add('hidden');

  // Hide result screen
  const resultEl = document.getElementById('gq-result');
  if (resultEl) resultEl.classList.add('hidden');

  // Show question area
  const questionArea = document.getElementById('gq-question-area');
  if (questionArea) questionArea.classList.remove('hidden');
}

// ── Handle answer selection ──────────────────────────────────
function answerGrammar(selectedIdx) {
  if (grammarState.answered) return;
  grammarState.answered = true;

  const q = grammarState.questions[grammarState.index];
  const isCorrect = selectedIdx === q.correct;

  grammarState.total++;
  if (isCorrect) {
    grammarState.score++;
    grammarState.streak++;
    if (grammarState.streak > grammarState.best) grammarState.best = grammarState.streak;
    removeMistake(q);
  } else {
    grammarState.streak = 0;
    grammarState.questions.push(q); // repasar: la fallada vuelve mas adelante
    addMistake(q);
  }

  // Style all option buttons
  q.options.forEach((_, i) => {
    const btn = document.getElementById(`gq-opt-${i}`);
    if (!btn) return;
    btn.disabled = true;

    if (i === q.correct) {
      // Correct answer → green
      btn.className = 'w-full text-left p-3.5 rounded-2xl border-2 font-medium text-sm transition-all border-green-400 bg-green-50 text-green-800';
      btn.innerHTML = btn.innerHTML.replace(
        `<span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">${String.fromCharCode(65 + i)}</span>`,
        `<span class="inline-flex w-7 h-7 rounded-full bg-green-500 items-center justify-center text-xs font-bold mr-2 text-white">✓</span>`
      );
    } else if (i === selectedIdx) {
      // Wrong selection → red
      btn.className = 'w-full text-left p-3.5 rounded-2xl border-2 font-medium text-sm transition-all border-red-400 bg-red-50 text-red-800';
      btn.innerHTML = btn.innerHTML.replace(
        `<span class="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-xs font-bold mr-2 text-gray-500">${String.fromCharCode(65 + i)}</span>`,
        `<span class="inline-flex w-7 h-7 rounded-full bg-red-500 items-center justify-center text-xs font-bold mr-2 text-white">✗</span>`
      );
    }
  });

  // Show explanation
  const expEl = document.getElementById('gq-explanation');
  const expIcon = document.getElementById('gq-explanation-icon');
  const expText = document.getElementById('gq-explanation-text');
  if (expEl) {
    if (expIcon) expIcon.textContent = isCorrect ? '✅' : '💡';
    if (expText) expText.textContent = q.explanation;
    // Set bg color first, then show (setting className would erase 'hidden' class anyway)
    expEl.className = `rounded-2xl p-4 border-2 mt-4 mb-2 ${isCorrect
      ? 'bg-green-50 border-green-200'
      : 'bg-amber-50 border-amber-200'}`;
    // className already removed 'hidden' above, but make explicit:
    expEl.style.display = '';
  }

  // Show next / finish button
  const nextBtn = document.getElementById('gq-next-btn');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = 'Siguiente →';
    nextBtn.className = 'w-full py-3.5 rounded-2xl font-bold text-white text-sm mt-3 transition-all bg-gradient-to-r from-swe-blue to-blue-600 shadow-lg';
  }

  // Update streak display
  const streakEl = document.getElementById('gq-streak');
  if (streakEl) streakEl.textContent = `🔥 ${grammarState.streak}`;
}

// ── Advance to next question or show result ──────────────────
function nextGrammarQuestion() {
  grammarState.index++;
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

  // Update metric cards
  const fmt = n => n.toLocaleString('sv-SE') + ' SEK';
  _setEl('dash-revenue-month',    fmt(revenueMonth));
  _setEl('dash-revenue-label',    active.length + ' alumnos activos');
  _setEl('dash-revenue-expected', fmt(revenueExpected));
  _setEl('dash-active-count',     active.length);
  _setEl('dash-total-label',      'de ' + students.length + ' total');
  _setEl('dash-issues-count',     failed.length + pending.length + cancelling.length);
  _setEl('dash-issues-label',     `${failed.length} fallidos · ${cancelled.length} cancelados · ${cancelling.length} cancelando`);

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

  const statusLabels = { active:'✅ Activo', failed:'⚠️ Fallido', cancelled:'❌ Cancelado', pending:'⏳ Pendiente', manual:'💵 Manual' };
  const statusClass  = { active:'status-badge-active', failed:'status-badge-failed', cancelled:'status-badge-cancelled', pending:'status-badge-pending', manual:'status-badge-manual' };
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
      <div class="text-sm mt-1">Sophie está grabando los audios de SFI ${level}</div>
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
          <span class="text-xs bg-swe-blue/10 text-swe-blue px-2 py-0.5 rounded-full font-semibold">SFI ${ep.level}</span>
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
function _stopWebAudio() {
  if (horstState._source) {
    try { horstState._source.stop(); } catch(e) {}
    try { horstState._source.disconnect(); } catch(e) {}
    horstState._source = null;
  }
  if (horstState._rafId) {
    cancelAnimationFrame(horstState._rafId);
    horstState._rafId = null;
  }
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

// ── Setup audio for episode (Web Audio API) ──────────────────
function setupHorstAudio(ep) {
  // Tear down any previous playback
  _stopWebAudio();
  if (horstState._blobUrl) { URL.revokeObjectURL(horstState._blobUrl); horstState._blobUrl = null; }
  horstState.audioEl   = null;
  horstState._buffer   = null;
  horstState._duration = 0;
  horstState._offset   = 0;

  const playBtn     = document.getElementById('hq-play-btn');
  const progressBar = document.getElementById('hq-audio-progress');
  const timeEl      = document.getElementById('hq-audio-time');
  const totalEl     = document.getElementById('hq-audio-total');

  if (playBtn)     playBtn.textContent = '▶';
  if (progressBar) progressBar.style.width = '0%';
  if (timeEl)      timeEl.textContent = '0:00';
  if (totalEl)     totalEl.textContent = '...';

  const hasAudio = (typeof SOPHIE_AUDIO !== 'undefined') && ep.audioKey && SOPHIE_AUDIO[ep.audioKey];
  if (!hasAudio) { if (totalEl) totalEl.textContent = '0:00'; return; }

  try {
    const ctx  = _getAudioCtx();
    // iOS requiere resume() antes de decodificar
    const decode = () => {
      const b64  = SOPHIE_AUDIO[ep.audioKey].split(',')[1];
      const bin  = atob(b64);
      const arr  = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);

      // decodeAudioData takes ownership of the buffer — .slice(0) avoids detached-buffer errors on retry
      ctx.decodeAudioData(arr.buffer.slice(0), function(buffer) {
        horstState._buffer   = buffer;
        horstState._duration = buffer.duration;
        const tot = document.getElementById('hq-audio-total');
        if (tot) tot.textContent = formatTime(buffer.duration);
      }, function(err) {
        console.error('decodeAudioData error:', err);
        if (totalEl) totalEl.textContent = '0:00';
      });
    };
    // En iOS el contexto puede estar suspendido — resume y luego decodifica
    if (ctx.state === 'suspended') {
      ctx.resume().then(decode).catch(decode);
    } else {
      decode();
    }
  } catch(e) {
    console.error('Audio setup error:', e);
  }
}

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── Play / Pause audio (Web Audio API) ───────────────────────
function toggleHorstAudio() {
  const playBtn  = document.getElementById('hq-play-btn');
  const ep       = horstState.episode;
  const hasAudio = (typeof SOPHIE_AUDIO !== 'undefined') && ep?.audioKey && SOPHIE_AUDIO[ep.audioKey];

  if (hasAudio) {
    if (!horstState._buffer) return; // still decoding

    if (horstState._playing) {
      // ── Pause: snapshot current offset ──────────────────────
      horstState._offset += horstState._ctx.currentTime - horstState._startTime;
      horstState._offset  = Math.min(horstState._offset, horstState._duration);
      _stopWebAudio();
      if (playBtn) playBtn.textContent = '▶';
    } else {
      // ── Play / Resume ────────────────────────────────────────
      const ctx = _getAudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const source = ctx.createBufferSource();
      source.buffer = horstState._buffer;
      source.connect(ctx.destination);

      const startOffset = Math.min(Math.max(0, horstState._offset), horstState._duration - 0.01);
      source.start(0, startOffset);

      horstState._source    = source;
      horstState._startTime = ctx.currentTime;
      horstState._playing   = true;
      if (playBtn) playBtn.textContent = '⏸';

      // onended fires when the clip finishes naturally
      source.onended = function() {
        if (horstState._source !== source) return; // stale source
        horstState._offset  = 0;
        horstState._playing = false;
        horstState._source  = null;
        if (horstState._rafId) { cancelAnimationFrame(horstState._rafId); horstState._rafId = null; }
        const pb   = document.getElementById('hq-play-btn');
        const pbar = document.getElementById('hq-audio-progress');
        const tel  = document.getElementById('hq-audio-time');
        if (pb)   pb.textContent        = '▶';
        if (pbar) pbar.style.width      = '100%';
        if (tel)  tel.textContent       = formatTime(horstState._duration);
      };

      horstState._rafId = requestAnimationFrame(_updateAudioProgress);
    }
  } else {
    // ── TTS fallback (no Sophie recording yet) ────────────────
    if (playBtn) playBtn.textContent = '🔊';
    const utt = new SpeechSynthesisUtterance(ep.ttsScript);
    utt.lang  = 'sv-SE';
    utt.rate  = 0.85;
    utt.onend = () => { if (playBtn) playBtn.textContent = '▶'; };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  }
}

// ── Replay from the beginning ────────────────────────────────
function replayHorstAudio() {
  const ep = horstState.episode;
  const hasAudio = (typeof SOPHIE_AUDIO !== 'undefined') && ep?.audioKey && SOPHIE_AUDIO[ep.audioKey];
  if (hasAudio) {
    _stopWebAudio();
    horstState._offset = 0;
    const progressBar = document.getElementById('hq-audio-progress');
    if (progressBar) progressBar.style.width = '0%';
    const timeEl = document.getElementById('hq-audio-time');
    if (timeEl) timeEl.textContent = '0:00';
    toggleHorstAudio();
  } else {
    window.speechSynthesis.cancel();
    toggleHorstAudio();
  }
}

// ── Seek by clicking on the progress bar ────────────────────
function seekHorstAudio(event) {
  if (!horstState._buffer || !horstState._duration) return;
  const bar = document.getElementById('hq-audio-bar');
  if (!bar) return;
  const rect    = bar.getBoundingClientRect();
  const pct     = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  const newTime = pct * horstState._duration;

  const wasPlaying = horstState._playing;
  _stopWebAudio();
  horstState._offset = newTime;

  const progressBar = document.getElementById('hq-audio-progress');
  if (progressBar) progressBar.style.width = (pct * 100) + '%';
  const timeEl = document.getElementById('hq-audio-time');
  if (timeEl) timeEl.textContent = formatTime(newTime);

  if (wasPlaying) toggleHorstAudio();
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
  stopSpeech();
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

  // Cabecera: progreso y nivel actual
  const bar = document.getElementById('nt-progress-bar');
  if (bar) bar.style.width = Math.round((nivelState.i / total) * 100) + '%';
  const counter = document.getElementById('nt-counter');
  if (counter) counter.textContent = `Pregunta ${nivelState.i + 1} de ${total}`;
  const lvlBadge = document.getElementById('nt-level-badge');
  const lvlNames = { A: 'Nivel A · básico', B: 'Nivel B · sube', C: 'Nivel C · difícil' };
  const lvlColors = { A: '#10B981', B: '#006AA7', C: '#7C3AED' };
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
        <button onclick="nivelPlayAudio()" class="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-3 rounded-2xl font-bold shadow hover:bg-sky-600 transition-colors">
          🔊 Escuchar
        </button>
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

function nivelPlayAudio() {
  const q = nivelCurrent();
  if (q.audio) speak(q.audio);
}

// ── Preguntas de opción (leer / escuchar / escribir) ─────────
function answerNivel(idx) {
  if (nivelState.answered) return;
  nivelState.answered = true;
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
  const per = { A: { c: 0, t: 0 }, B: { c: 0, t: 0 }, C: { c: 0, t: 0 } };
  const skills = { las: { c: 0, t: 0 }, hor: { c: 0, t: 0 }, skriv: { c: 0, t: 0 }, tala: { c: 0, t: 0 } };
  let correct = 0;
  nivelState.answers.forEach(a => {
    per[a.nivel].t++; if (a.correct) per[a.nivel].c++;
    skills[a.skill].t++; if (a.correct) { skills[a.skill].c++; correct++; }
  });
  // Ubicación: hay que aprobar el nivel anterior (>=3 de 5) para subir
  let nivel = 'A';
  const passA = per.A.c >= 3, passB = per.B.c >= 3, passC = per.C.c >= 3;
  if (passA && passB) nivel = 'B';
  if (passA && passB && passC) nivel = 'C';
  return { nivel, per, skills, correct, total: nivelState.answers.length, passA, passB, passC };
}

async function finishNivelTest() {
  const r = computeNivel();
  try { localStorage.setItem('scs_nivel_last', JSON.stringify({ nivel: r.nivel, pct: Math.round(r.correct / (r.total||1) * 100), skills: { las: pctOf(r.skills.las), hor: pctOf(r.skills.hor), skriv: pctOf(r.skills.skriv), tala: pctOf(r.skills.tala) }, ts: Date.now() })); } catch (e) {}
  showView('nivel-result');

  // Insignia de nivel
  const names = { A: 'SFI A', B: 'SFI B', C: 'SFI C' };
  const descs = {
    A: 'Estás construyendo la base. ¡Vas por buen camino!',
    B: '¡Muy bien! Ya dominas lo básico y avanzas al nivel intermedio.',
    C: '¡Excelente! Manejas frases complejas. Estás en un nivel avanzado.',
  };
  const colors = { A: '#10B981', B: '#006AA7', C: '#7C3AED' };
  const badge = document.getElementById('nt-result-level');
  if (badge) { badge.textContent = names[r.nivel]; badge.style.background = colors[r.nivel]; }
  const emoji = document.getElementById('nt-result-emoji');
  if (emoji) emoji.textContent = r.nivel === 'C' ? '🏆' : (r.nivel === 'B' ? '🌟' : '🌱');
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
    tiers.innerHTML = row('Nivel A · básico', r.per.A, '#10B981') + row('Nivel B · intermedio', r.per.B, '#006AA7') + row('Nivel C · avanzado', r.per.C, '#7C3AED');
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

// ── Alce (älg): mascota del idioma, dibujada para verse igual en todo teléfono
function mooseSVG(stage) {
  const brown = '#8B5E3C', dark = '#5E3E28', snout = '#C9A27E', antler = '#CFAE5E';
  let antlers = '';
  if (stage >= 1) {
    const big = stage >= 2;
    antlers += `<path d="M36 24 Q22 ${big ? 6 : 13} ${big ? 9 : 17} ${big ? 16 : 21}" stroke="${antler}" stroke-width="${big ? 5 : 4}" fill="none" stroke-linecap="round"/>`;
    antlers += `<path d="M64 24 Q78 ${big ? 6 : 13} ${big ? 91 : 83} ${big ? 16 : 21}" stroke="${antler}" stroke-width="${big ? 5 : 4}" fill="none" stroke-linecap="round"/>`;
    if (big) {
      antlers += `<path d="M27 15 Q22 9 15 10" stroke="${antler}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      antlers += `<path d="M73 15 Q78 9 85 10" stroke="${antler}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      antlers += `<path d="M20 22 Q16 18 10 19" stroke="${antler}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      antlers += `<path d="M80 22 Q84 18 90 19" stroke="${antler}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    }
  }
  const crown = stage >= 3
    ? `<path d="M40 10 l3 6 l7 -8 l7 8 l3 -6 l0 9 l-20 0 z" fill="#FECC02" stroke="#E0A800" stroke-width="0.6"/>
       <circle cx="43" cy="10" r="1.6" fill="#FECC02"/><circle cx="50" cy="8" r="1.6" fill="#FECC02"/><circle cx="57" cy="10" r="1.6" fill="#FECC02"/>`
    : '';
  return `<svg viewBox="0 0 100 100" class="w-full h-full">
    ${antlers}${crown}
    <ellipse cx="26" cy="34" rx="8" ry="11" fill="${dark}"/>
    <ellipse cx="74" cy="34" rx="8" ry="11" fill="${dark}"/>
    <path d="M32 32 Q32 18 50 18 Q68 18 68 32 L68 48 Q68 60 50 62 Q32 60 32 48 Z" fill="${brown}"/>
    <ellipse cx="50" cy="68" rx="15" ry="13" fill="${snout}"/>
    <ellipse cx="44" cy="71" rx="2" ry="2.8" fill="${dark}"/>
    <ellipse cx="56" cy="71" rx="2" ry="2.8" fill="${dark}"/>
    <circle cx="43" cy="42" r="4.4" fill="#fff"/><circle cx="43.6" cy="42.4" r="2.3" fill="#222"/>
    <circle cx="57" cy="42" r="4.4" fill="#fff"/><circle cx="57.6" cy="42.4" r="2.3" fill="#222"/>
  </svg>`;
}

function renderHomeDashboard() {
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
      return `<div class="flex items-center gap-1.5 ${isWeak ? 'ring-1 ring-amber-300 bg-amber-50 rounded-lg px-1 py-0.5 -mx-0.5' : ''}" title="${sk.es} · ${sk.label}">
        <span class="text-sm w-4 text-center flex-shrink-0">${sk.icon}</span>
        <span class="text-[9px] font-semibold w-11 flex-shrink-0 leading-tight ${isWeak ? 'text-amber-700' : 'text-gray-500'}">${sk.es}</span>
        <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full rounded-full" style="width:${has ? v : 6}%; background:${has ? sk.color : '#E5E7EB'}; transition:width .8s ease;"></div>
        </div>
        <span class="text-[10px] font-bold w-7 text-right ${isWeak ? 'text-amber-600' : 'text-gray-400'}">${has ? v + '%' : '–'}</span>
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

  // Alce (älg): crece con el nivel de la prueba
  const mooseEl = document.getElementById('dash-moose');
  const mLabel = document.getElementById('dash-baby-label');
  const mSub = document.getElementById('dash-moose-sub');
  let stage = 0, mname = 'Alce bebé', msub = 'Haz la prueba para crecer';
  if (last) {
    const map = { A: [1, 'Alce joven'], B: [2, 'Alce adulto'], C: [3, 'Alce rey 👑'] };
    const m = map[last.nivel] || [1, 'Alce joven'];
    stage = m[0]; mname = m[1];
    msub = 'Nivel ' + last.nivel + (last.pct != null ? ' · ' + last.pct + '%' : '');
  }
  if (mooseEl) mooseEl.innerHTML = mooseSVG(stage);
  if (mLabel) mLabel.textContent = mname;
  if (mSub) mSub.textContent = msub;
}
