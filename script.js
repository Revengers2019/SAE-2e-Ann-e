const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

const mobileToggle = $('.mobile-toggle');
const primaryNavList = $('.primary-nav ul');

if (mobileToggle && primaryNavList) {
    mobileToggle.addEventListener('click', () => {
        const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!expanded));
        primaryNavList.classList.toggle('open');
    });
}

const themeToggle = $('.theme-toggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark') root.classList.add('dark-mode');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const active = root.classList.toggle('dark-mode');
        localStorage.setItem('theme', active ? 'dark' : 'light');
        themeToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

(() => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slidesEl = carousel.querySelector('.slides');
    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    let idx = 0;
    const total = slides.length;
    const INTERVAL = 5000;
    let timer = null;

    const goTo = (i) => {
        idx = (i + total) % total;
        slidesEl.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    };

    const next = () => goTo(idx + 1);
    const prev = () => goTo(idx - 1);

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));

    const startTimer = () => { timer = setInterval(next, INTERVAL); };
    const resetTimer = () => { clearInterval(timer); startTimer(); };

    // Touch support (swipe)
    let startX = 0;
    slidesEl.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    slidesEl.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 40) diff > 0 ? prev() : next();
        resetTimer();
    });

    // init
    goTo(0);
    startTimer();
})();

(() => {
    const accItems = $$('.accordion-item');
    accItems.forEach(item => {
        const btn = item.querySelector('.accordion-header');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            item.classList.toggle('open');
        });
    });
})();

$$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', href);
        }
    });
});

(() => {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.type = 'button';
    btn.title = 'Remonter en haut';
    btn.innerText = '↑';
    document.body.appendChild(btn);

    const showAt = 400;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > showAt);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

(() => {
    const animated = $$('.animate-on-scroll');
    if (!('IntersectionObserver' in window) || animated.length === 0) {
        // fallback: reveal all
        animated.forEach(el => el.classList.add('in-view'));
        return;
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in-view');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });
    animated.forEach(el => io.observe(el));
})();

$$('.form-generic').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const feedback = form.querySelector('.form-feedback');
        const invalid = Array.from(form.querySelectorAll('[required]')).filter(f => !f.value.trim());
        if (invalid.length) {
            feedback.textContent = 'Merci de remplir tous les champs obligatoires.';
            feedback.style.color = '#b91c1c';
            invalid[0].focus();
            return;
        }
        // Simule un envoi
        feedback.textContent = 'Envoi en cours…';
        feedback.style.color = 'var(--color-primary)';
        setTimeout(() => {
            feedback.textContent = 'Message envoyé — merci !';
            form.reset();
        }, 900);
    });
});

(() => {
    const y = new Date().getFullYear();
    const el = document.getElementById('year');
    if (el) el.textContent = y;
})();