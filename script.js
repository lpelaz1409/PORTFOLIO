const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .project-item, .skill-pill, .soft-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  // FORMULAIRE DE CONTACT — Formspree
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const status = document.getElementById('form-status');
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      const data = new FormData(form);

      try {
        const res = await fetch('https://formspree.io/f/xbdpzaby', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          status.textContent = 'Message envoyé. Je vous réponds bientôt !';
          status.className = 'form-status success';
          form.reset();
          btn.textContent = 'Envoyer →';
          btn.disabled = false;
        } else {
          throw new Error();
        }
      } catch {
        status.textContent = 'Une erreur est survenue. Réessayez ou écrivez-moi directement.';
        status.className = 'form-status error';
        btn.textContent = 'Envoyer →';
        btn.disabled = false;
      }
    });
  }

  // REVEAL ON SCROLL
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));