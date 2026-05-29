    /* ── Scroll progress ─── */
    const prog   = document.getElementById('scrollProgress');
    const header = document.getElementById('header');
    const b2t    = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      const m = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (s / m * 100) + '%';
      header.classList.toggle('scrolled', s > 40);
      b2t.classList.toggle('show', s > 400);
    }, { passive: true });

    b2t.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ── Smooth scroll ─── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const el = document.querySelector(a.getAttribute('href'));
        if (!el) return;
        e.preventDefault();
        window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });

    /* ── Mobile menu ─── */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    /* ── Active nav ─── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(s => {
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const ac = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
            if (ac) ac.classList.add('active');
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
    });

    /* ── Reveal ─── */
    const revIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revIO.observe(el));

    /* ── Skill bars ─── */
    const skillIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.skill-fill').forEach(b => {
          b.style.width = b.dataset.width + '%';
        });
        skillIO.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skills-intro-grid').forEach(g => skillIO.observe(g));

    /* ── Typewriter ─── */
    const roles = ['Frontend Developer','Vue.js Engineer','Laravel Developer','UI/UX Implementer','Fullstack Developer'];
    let ri = 0, ci = 0, del = false;
    const tw = document.getElementById('typewriter');
    function type() {
      if (!tw) return;
      const cur = roles[ri];
      if (!del) {
        tw.textContent = cur.slice(0, ci + 1);
        ci++;
        if (ci === cur.length) { del = true; setTimeout(type, 1800); return; }
        setTimeout(type, 80);
      } else {
        tw.textContent = cur.slice(0, ci - 1);
        ci--;
        if (ci === 0) { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 400); return; }
        setTimeout(type, 45);
      }
    }
    setTimeout(type, 1000);

    /* ── Contact form ─── */
    const form = document.getElementById('contactForm');
    const btn  = document.getElementById('submitBtn');
    const suc  = document.getElementById('formSuccess');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        let ok = true;
        form.querySelectorAll('[required]').forEach(f => {
          f.classList.remove('error');
          if (!f.value.trim()) { f.classList.add('error'); ok = false; }
        });
        if (!ok) return;
        btn.textContent = 'Sending…'; btn.disabled = true;
        setTimeout(() => {
          form.reset();
          btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
          suc.classList.add('show');
          setTimeout(() => {
            btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
            btn.disabled = false; suc.classList.remove('show');
          }, 5000);
        }, 1500);
      });
      form.querySelectorAll('input,textarea').forEach(f => {
        f.addEventListener('input', () => f.classList.remove('error'));
      });
    }