/* ===== THEME TOGGLE ===== */
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    function setTheme(theme) {
      root.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeLabel.textContent = 'Light';
      } else {
        themeIcon.textContent = '🌙';
        themeLabel.textContent = 'Dark';
      }
      localStorage.setItem('theme', theme);
    }

    // Load saved theme
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    /* ===== HAMBURGER ===== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

    /* ===== CUSTOM CURSOR ===== */
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    });

    function animateFollower() {
      fx += (mx - fx - 18) * 0.12;
      fy += (my - fy - 18) * 0.12;
      follower.style.transform = `translate(${fx}px, ${fy}px)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.6)';
        follower.style.transform += ' scale(1.5)';
        follower.style.opacity = '0.8';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.opacity = '0.5';
      });
    });

    /* ===== PROGRESS BAR ===== */
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
      const winH = document.body.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / winH) * 100;
      progressBar.style.width = scrolled + '%';
    });

    /* ===== SCROLL REVEAL ===== */
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => revealObserver.observe(r));

    /* ===== COUNT-UP ===== */
    function countUp(el, target, duration) {
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
        else { el.textContent = Math.floor(start); }
      }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('[data-count]').forEach(el => {
            countUp(el, parseInt(el.getAttribute('data-count')), 1500);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    /* ===== FORM SUBMIT ===== */
    function submitForm() {
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      if (!name || !email) {
        alert('Mohon lengkapi nama dan email Anda.');
        return;
      }
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }

    /* ===== SMOOTH ACTIVE NAV ===== */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 60) { current = s.getAttribute('id'); }
      });
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.classList.contains(current)) { a.classList.add('active'); }
      });
    });