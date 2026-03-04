const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const menuToggle = $('.menu-toggle');
const menu = $('.menu');
const year = $('#year');
const form = $('#leadForm');
const formStatus = $('#formStatus');
const instrumentSelect = $('#instrumentSelect');

if (year) year.textContent = String(new Date().getFullYear());

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  $$('.menu a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

$$('.instrument').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-inst') || '';
    if (instrumentSelect) instrumentSelect.value = value;
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  });
});

const recommendBtn = $('#recommendBtn');
const tasteInput = $('#tasteInput');
const recommendOutput = $('#recommendOutput');

function recommendInstrument(text) {
  const t = text.toLowerCase();
  if (/norteñ|regional|acordeón|corrid|cumbia/.test(t)) return 'Acordeón';
  if (/ritmo|golpes|energ|rock|metal|drum/.test(t)) return 'Batería';
  if (/cantar|voz|karaoke|balada|pop/.test(t)) return 'Canto';
  if (/acompañar|armonía|teclas|clásic|melod/.test(t)) return 'Piano';
  if (/requinto|acústic|eléctric|guitarra/.test(t)) return 'Guitarra';
  return 'Bajo quinto';
}

if (recommendBtn && tasteInput && recommendOutput) {
  recommendBtn.addEventListener('click', () => {
    const text = tasteInput.value.trim();
    if (!text) {
      recommendOutput.style.display = 'block';
      recommendOutput.textContent = 'Cuéntanos un poco más de tus gustos para recomendarte mejor.';
      return;
    }

    const option = recommendInstrument(text);
    recommendOutput.style.display = 'block';
    recommendOutput.innerHTML = `Te recomendamos empezar con <strong>${option}</strong>.\nPor lo que escribiste, este instrumento encaja bien con tu estilo y objetivos.\nSi quieres, ya te lo prellenamos en tu ficha para agendar.`;
    if (instrumentSelect) instrumentSelect.value = option;
  });
}

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const nombre = String(data.get('nombre') || '').trim();
    const edad = String(data.get('edad') || '').trim();
    const instrumento = String(data.get('instrumento') || '').trim();
    const nivel = String(data.get('nivel') || '').trim();
    const horario = String(data.get('horario') || '').trim();
    const wa = String(data.get('wa') || '').replace(/\D/g, '');

    if (!nombre || !edad || !instrumento || !nivel || !horario || wa.length < 10) {
      formStatus.textContent = 'Completa todos los campos y revisa el WhatsApp (10 dígitos).';
      formStatus.style.color = '#9f1d1d';
      return;
    }

    const message = [
      '🎵 *Solicitud de clase - Talentos Artísticos*',
      '',
      `*Nombre:* ${nombre}`,
      `*Edad:* ${edad}`,
      `*Instrumento:* ${instrumento}`,
      `*Nivel:* ${nivel}`,
      `*Horario preferido:* ${horario}`,
      `*WhatsApp:* ${wa}`,
      '',
      'Vengo de la página web. ¿Qué horarios tienen disponibles?'
    ].join('\n');

    formStatus.textContent = '¡Listo! Abriendo WhatsApp...';
    formStatus.style.color = '#17613c';
    window.open(`https://wa.me/528118867675?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}
