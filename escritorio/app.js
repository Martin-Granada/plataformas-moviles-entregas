// Variables de estado de la app (let: valor cambiante)
let ultimoConsejoEn = "";   // último consejo recibido en inglés
let ultimoConsejoEs = "";   // cache de traducción al español
let traducir = false;       // flag para alternar idioma
let autoTimer = null;       // id del temporizador del modo automático
const ESTADO_BASE = "";     // const: valor constante base para el estado
let historyList = [];       // historial de consejos (en inglés, base)
let totalFetched = 0;       // contador total de consejos obtenidos

// Mapa de elementos del DOM (const: referencia que no cambia)
const el = {
  resultado: document.getElementById('resultado'),
  estado: document.getElementById('estado'),
  btnTraducir: document.getElementById('btnTraducir'),
  btnHablar: document.getElementById('btnHablar'),
  btnFav: document.getElementById('btnFav'),
  autoChk: document.getElementById('autoChk'),
  autoSeg: document.getElementById('autoSeg'),
  toast: document.getElementById('toast'),
  card: document.getElementById('card'),
  // Vistas
  historyList: document.getElementById('historyList'),
  favList: document.getElementById('favList'),
  statTotalFetched: document.getElementById('statTotalFetched'),
  statTotalFavs: document.getElementById('statTotalFavs'),
  statUniqueHistory: document.getElementById('statUniqueHistory'),
  themeSelect: document.getElementById('themeSelect'),
  defaultLangSelect: document.getElementById('defaultLangSelect'),
  confAuto: document.getElementById('confAuto'),
  confSeg: document.getElementById('confSeg'),
  btnSaveConfig: document.getElementById('btnSaveConfig'),
  btnClearHistory: document.getElementById('btnClearHistory'),
  btnExportHistory: document.getElementById('btnExportHistory'),
  btnClearFavs: document.getElementById('btnClearFavs'),
  btnExportFavs: document.getElementById('btnExportFavs'),
  fileImportFavs: document.getElementById('fileImportFavs'),
};

// function: cambia el texto de estado
function setEstado(msg) {
  el.estado.textContent = msg || ESTADO_BASE;
}

// function: muestra un aviso temporal (toast)
function showToast(msg) {
  el.toast.textContent = msg;
  el.toast.style.opacity = 1;
  el.toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    el.toast.style.opacity = 0;
    el.toast.style.transform = 'translateY(8px)';
  }, 1800);
}

// function (async): obtiene un nuevo consejo de la API
async function obtenerConsejo() {
  const texto = el.resultado;
  el.card.style.opacity = 0.6;
  setEstado('Cargando…');
  try {
    const res = await fetch("https://api.adviceslip.com/advice", { cache: 'no-store' });
    const data = await res.json();
    ultimoConsejoEn = data.slip.advice;
    ultimoConsejoEs = '';
    await actualizarVista();
    setEstado('Listo');
    saltito();
    // estadísticas e historial
    totalFetched += 1;
    if (!historyList.includes(ultimoConsejoEn)) {
      historyList.unshift(ultimoConsejoEn);
      historyList = historyList.slice(0, 200); // límite
      renderHistory();
    }
    renderStats();
  } catch (error) {
    texto.textContent = "⚠️ Error al conectar con la API.";
    setEstado('Error de red');
    console.error(error);
  }
  el.card.style.opacity = 1;
}

// function (async): traduce solo cuando corresponde
async function traducirSiHaceFalta() {
  if (!traducir) return '';
  if (ultimoConsejoEs) return ultimoConsejoEs;
  try {
    // Traducción gratuita (limitaciones) usando MyMemory
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(ultimoConsejoEn)}&langpair=en|es`;
    const r = await fetch(url);
    const j = await r.json();
    const t = j?.responseData?.translatedText || '';
    ultimoConsejoEs = t;
    return t;
  } catch (e) {
    console.warn('No se pudo traducir', e);
    return '';
  }
}

// function (async): refresca el contenido mostrado
async function actualizarVista() {
  const mostrar = traducir ? (await traducirSiHaceFalta() || ultimoConsejoEn) : ultimoConsejoEn;
  el.resultado.textContent = mostrar ? `"${mostrar}"` : '—';
  actualizarBotonFav();
}

// function: alterna entre mostrar en inglés/español
function toggleTraduccion() {
  traducir = !traducir;
  el.btnTraducir.textContent = traducir ? '🌐 Mostrar en inglés' : '🌐 Mostrar en español';
  actualizarVista();
}

// function: copia el texto visible al portapapeles
function copiar() {
  const texto = el.resultado.textContent.replace(/^"|"$/g, '');
  navigator.clipboard.writeText(texto).then(() => showToast('Copiado al portapapeles')).catch(() => showToast('No se pudo copiar'));
}

// function: comparte el texto según destino elegido
function compartir(dest) {
  const texto = el.resultado.textContent.replace(/^"|"$/g, '');
  const url = location.href;
  if (dest === 'twitter') {
    const u = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`; // const u: URL armada para Twitter
    window.open(u, '_blank');
  } else if (dest === 'whatsapp') {
    const u = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto + ' — ' + url)}`; // const u: URL armada para WhatsApp
    window.open(u, '_blank');
  }
}

// function: lee el texto en voz (SpeechSynthesis)
function leer() {
  const texto = el.resultado.textContent.replace(/^"|"$/g, '');
  try { window.speechSynthesis.cancel(); } catch {}
  const utter = new SpeechSynthesisUtterance(texto); // const utter: objeto de síntesis de voz
  utter.lang = traducir ? 'es-ES' : 'en-US';
  window.speechSynthesis.speak(utter);
}

// Favoritos en localStorage (CRUD simple)
function getFavs() {
  try { return JSON.parse(localStorage.getItem('advice_favs') || '[]'); } catch { return []; }
}
function setFavs(list) {
  localStorage.setItem('advice_favs', JSON.stringify(list.slice(0, 100)));
}
function esFavorito(texto) {
  return getFavs().includes(texto);
}
function actualizarBotonFav() {
  const texto = el.resultado.textContent.replace(/^"|"$/g, '');
  el.btnFav.textContent = esFavorito(texto) ? '★ Favorito' : '☆ Favorito';
}
function toggleFavorito() {
  const texto = el.resultado.textContent.replace(/^"|"$/g, '');
  if (!texto) return;
  const favs = getFavs();
  const i = favs.indexOf(texto);
  if (i >= 0) { favs.splice(i, 1); showToast('Eliminado de favoritos'); }
  else { favs.unshift(texto); showToast('Agregado a favoritos'); }
  setFavs(favs);
  actualizarBotonFav();
  renderFavorites();
}
function verFavoritos() {
  const favs = getFavs();
  if (favs.length === 0) { showToast('Sin favoritos aún'); return; } // guard clause: nada que mostrar
  const elegido = prompt('Favoritos:\n\n' + favs.map((f, i) => `${i+1}. ${f}`).join('\n') + '\n\nIngresa número para mostrar, o 0 para borrar todos:');
  if (elegido === null) return;
  const n = parseInt(elegido, 10);
  if (!isNaN(n)) {
    if (n === 0) { if (confirm('¿Borrar todos los favoritos?')) { setFavs([]); showToast('Favoritos borrados'); } return; }
    const idx = n - 1;
    if (idx >= 0 && idx < favs.length) {
      el.resultado.textContent = `"${favs[idx]}"`;
      actualizarBotonFav();
    }
  }
}

// function: activa/desactiva el modo automático
function toggleAuto() {
  if (el.autoChk.checked) {
    const seg = Math.max(5, parseInt(el.autoSeg.value, 10) || 15);
    el.autoSeg.value = seg;
    autoTimer = setInterval(obtenerConsejo, seg * 1000);
    showToast(`Auto: cada ${seg}s`);
  } else {
    clearInterval(autoTimer);
    autoTimer = null;
    showToast('Auto desactivado');
  }
}

// Pequeña animación de la tarjeta al actualizar
function saltito() {
  el.card.style.transform = 'translateY(-2px)';
  setTimeout(() => { el.card.style.transform = 'translateY(0)'; }, 140);
}

// Render: Historial
function renderHistory() {
  if (!el.historyList) return;
  if (historyList.length === 0) {
    el.historyList.innerHTML = '<div class="text-muted">Sin historial aún.</div>';
    return;
  }
  el.historyList.innerHTML = historyList.map((txt, i) => `
    <div class="glass-card p-3 mb-2 d-flex justify-content-between align-items-start">
      <div class="text-start">"${txt}"</div>
      <div class="ms-3 d-flex gap-2">
        <button class="btn btn-sm btn-outline-light" onclick="copiarTexto('${encodeURIComponent(txt)}')">Copiar</button>
        <button class="btn btn-sm btn-outline-light" onclick="toggleFavDesdeLista('${encodeURIComponent(txt)}')">${esFavorito(txt) ? '★' : '☆'}</button>
      </div>
    </div>
  `).join('');
}

// Render: Favoritos
function renderFavorites() {
  if (!el.favList) return;
  const favs = getFavs();
  if (favs.length === 0) {
    el.favList.innerHTML = '<div class="text-muted">Aún no hay favoritos.</div>';
    renderStats();
    return;
  }
  el.favList.innerHTML = favs.map((txt) => `
    <div class="glass-card p-3 mb-2 d-flex justify-content-between align-items-start">
      <div class="text-start">"${txt}"</div>
      <div class="ms-3 d-flex gap-2">
        <button class="btn btn-sm btn-outline-light" onclick="copiarTexto('${encodeURIComponent(txt)}')">Copiar</button>
        <button class="btn btn-sm btn-outline-light" onclick="removeFav('${encodeURIComponent(txt)}')">Quitar</button>
      </div>
    </div>
  `).join('');
  renderStats();
}

// Render: Estadísticas
function renderStats() {
  if (el.statTotalFetched) el.statTotalFetched.textContent = String(totalFetched);
  if (el.statTotalFavs) el.statTotalFavs.textContent = String(getFavs().length);
  if (el.statUniqueHistory) el.statUniqueHistory.textContent = String(historyList.length);
}

// Utilidades de listas
function decodeTextParam(s) { try { return decodeURIComponent(s); } catch { return s; } }
function copiarTexto(encoded) {
  const t = decodeTextParam(encoded);
  navigator.clipboard.writeText(t).then(() => showToast('Copiado al portapapeles'));
}
function toggleFavDesdeLista(encoded) {
  const t = decodeTextParam(encoded);
  const favs = getFavs();
  const i = favs.indexOf(t);
  if (i >= 0) { favs.splice(i,1); } else { favs.unshift(t); }
  setFavs(favs);
  renderFavorites();
  renderHistory();
}
function removeFav(encoded) {
  const t = decodeTextParam(encoded);
  const favs = getFavs().filter(f => f !== t);
  setFavs(favs);
  renderFavorites();
}

// Export/Import
function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// Configuración y tema
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'auto') {
    root.removeAttribute('data-bs-theme');
  } else {
    root.setAttribute('data-bs-theme', theme);
  }
}
function saveSettings(s) {
  localStorage.setItem('advice_settings', JSON.stringify(s));
}
function loadSettings() {
  try { return JSON.parse(localStorage.getItem('advice_settings') || '{}'); } catch { return {}; }
}
function applySettingsToUI(s) {
  if (el.themeSelect && s.theme) el.themeSelect.value = s.theme;
  if (el.defaultLangSelect && s.defaultLang) el.defaultLangSelect.value = s.defaultLang;
  if (el.confAuto != null && typeof s.autoStart === 'boolean') el.confAuto.checked = s.autoStart;
  if (el.confSeg && s.autoSeconds) el.confSeg.value = s.autoSeconds;
}
function applySettingsRuntime(s) {
  applyTheme(s.theme || 'auto');
  traducir = (s.defaultLang || 'en') === 'es';
  if (el.btnTraducir) el.btnTraducir.textContent = traducir ? '🌐 Mostrar en inglés' : '🌐 Mostrar en español';
  if (s.autoStart) {
    if (el.autoChk) el.autoChk.checked = true;
    if (el.autoSeg && s.autoSeconds) el.autoSeg.value = s.autoSeconds;
    toggleAuto();
  }
}

// Atajos de teclado
function setupShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    const k = e.key.toLowerCase();
    if (k === 'n') obtenerConsejo();
    if (k === 't') toggleTraduccion();
    if (k === 'c') copiar();
    if (k === 'f') toggleFavorito();
    if (k === 'h') leer();
  });
}

// Inicialización
function init() {
  // Cargar settings
  const settings = loadSettings();
  applySettingsToUI({
    theme: settings.theme || 'auto',
    defaultLang: settings.defaultLang || 'en',
    autoStart: settings.autoStart || false,
    autoSeconds: settings.autoSeconds || 15
  });
  applySettingsRuntime({
    theme: settings.theme || 'auto',
    defaultLang: settings.defaultLang || 'en',
    autoStart: settings.autoStart || false,
    autoSeconds: settings.autoSeconds || 15
  });

  // Eventos UI
  if (el.themeSelect) el.themeSelect.addEventListener('change', () => {
    const s = loadSettings(); s.theme = el.themeSelect.value; saveSettings(s); applyTheme(s.theme);
  });
  if (el.btnSaveConfig) el.btnSaveConfig.addEventListener('click', () => {
    const s = loadSettings();
    s.defaultLang = el.defaultLangSelect.value;
    s.autoStart = el.confAuto.checked;
    s.autoSeconds = Math.max(5, parseInt(el.confSeg.value,10) || 15);
    saveSettings(s);
    showToast('Configuración guardada');
  });
  if (el.btnClearHistory) el.btnClearHistory.addEventListener('click', () => {
    historyList = [];
    renderHistory(); renderStats();
  });
  if (el.btnExportHistory) el.btnExportHistory.addEventListener('click', () => {
    downloadJSON('historial.json', historyList);
  });
  if (el.btnClearFavs) el.btnClearFavs.addEventListener('click', () => {
    if (confirm('¿Borrar todos los favoritos?')) { setFavs([]); renderFavorites(); }
  });
  if (el.btnExportFavs) el.btnExportFavs.addEventListener('click', () => {
    downloadJSON('favoritos.json', getFavs());
  });
  if (el.fileImportFavs) el.fileImportFavs.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const arr = JSON.parse(text);
      if (Array.isArray(arr)) {
        setFavs(arr);
        renderFavorites();
        showToast('Favoritos importados');
      } else {
        showToast('Archivo inválido');
      }
    } catch {
      showToast('No se pudo importar');
    } finally {
      e.target.value = '';
    }
  });

  setupShortcuts();
  renderFavorites();
  renderHistory();
  renderStats();
  obtenerConsejo();
}

// Ejecutar init al cargar
document.addEventListener('DOMContentLoaded', init);


