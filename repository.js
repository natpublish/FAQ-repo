const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const themeSelect = document.querySelector('#theme-select');
const fontSelect = document.querySelector('#font-select');
const saveButton = document.querySelector('#save-settings');
const saveStatus = document.querySelector('#save-status');

function applySettings() {
  const theme = themeSelect.value;
  document.body.classList.remove('theme-dark', 'system-theme');
  if (theme === 'dark') document.body.classList.add('theme-dark');
  if (theme === 'system') document.body.classList.add('system-theme');
  document.body.classList.remove('font-large', 'font-xlarge');
  if (fontSelect.value === 'large') document.body.classList.add('font-large');
  if (fontSelect.value === 'xlarge') document.body.classList.add('font-xlarge');
}

function loadSettings() {
  const saved = JSON.parse(sessionStorage.getItem('repository-settings') || '{}');
  document.querySelectorAll('[data-setting]').forEach((input) => {
    if (typeof saved[input.dataset.setting] === 'boolean') input.checked = saved[input.dataset.setting];
  });
  if (saved.theme) themeSelect.value = saved.theme;
  if (saved.font) fontSelect.value = saved.font;
  applySettings();
}

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

themeSelect.addEventListener('change', applySettings);
fontSelect.addEventListener('change', applySettings);

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

saveButton.addEventListener('click', () => {
  const settings = { theme: themeSelect.value, font: fontSelect.value };
  document.querySelectorAll('[data-setting]').forEach((input) => { settings[input.dataset.setting] = input.checked; });
  sessionStorage.setItem('repository-settings', JSON.stringify(settings));
  saveStatus.textContent = 'Pengaturan berhasil disimpan untuk sesi ini.';
  window.setTimeout(() => { saveStatus.textContent = ''; }, 3500);
});

loadSettings();
