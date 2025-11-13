/* script.js — controle de UI e dados simples */
const partnersData = [
  { id: 1, name: "Colégio Alfa", desc: "Excelência no ensino fundamental e médio." },
  { id: 2, name: "Escola Modelo RJ", desc: "Programas focados em inovação pedagógica." },
  { id: 3, name: "Instituto Saber", desc: "Projetos de formação continuada de professores." },
  { id: 4, name: "Centro Educacional Aurora", desc: "Foco em inclusão e desenvolvimento socioemocional." }
];

/* DOM helpers */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* Header: burger menu */
function setupMenu() {
  const btn = $('#btn-burger');
  const nav = $('#nav');
  btn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // fechar quando clicar em link (mobile)
  nav?.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
}

/* Header background change on scroll */
function headerScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

/* Populate partners preview (index) and partners page */
function renderPartners() {
  const preview = $('#partners-preview');
  const list = $('#partners-list');

  if(preview) {
    preview.innerHTML = partnersData.slice(0,3).map(p => `
      <article class="partner" data-animate>
        <h4>${p.name}</h4>
        <p class="muted">${p.desc}</p>
      </article>
    `).join('');
  }

  if(list) {
    list.innerHTML = partnersData.map(p => `
      <article class="partner" data-animate>
        <h4>${p.name}</h4>
        <p class="muted">${p.desc}</p>
        <a class="link-more" href="#" aria-label="Mais sobre ${p.name}">Detalhes →</a>
      </article>
    `).join('');
  }
}

/* Simple form handling (front-end demo) */
function setupForm() {
  const form = $('#contact-form');
  const msg = $('#contact-msg');

  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();
    if(!nome || !email || !mensagem) {
      msg.textContent = 'Por favor preencha todos os campos.';
      msg.style.color = '#f6c84c';
      return;
    }

    // Simular envio
    msg.textContent = 'Enviando...';
    setTimeout(() => {
      msg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato.';
      msg.style.color = '#9fe8a6';
      form.reset();
    }, 900);
  });
}

/* Animate elements when in viewport */
function setupReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  renderPartners();
  setupMenu();
  headerScroll();
  setupForm();
  setupReveal();

  // preencher ano no footer(s)
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year-2')?.textContent = y;
  document.getElementById('year-3')?.textContent = y;
});
