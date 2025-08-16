// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const opened = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
  });
}

// Active section highlighting
const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const byId = id => sections.find(s => s.id === id.replace('#',''));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

sections.forEach(s => observer.observe(s));

// Reveal on scroll
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .project-card, .timeline li').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// Smooth scroll for in-page links (fallback for older browsers)
navAnchors.forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (links.classList.contains('open')) links.classList.remove('open');
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
