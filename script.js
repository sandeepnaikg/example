// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 1800);
    }
});

// ========== NAV SCROLL + PROGRESS BAR + BACK TO TOP ==========
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Nav shadow
    navbar.classList.toggle('scrolled', scrollY > 30);

    // Scroll progress bar
    if (progressBar) progressBar.style.width = (scrollY / docHeight * 100) + '%';

    // Back-to-top visibility
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 420);
});

// Back to top click
if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========== HAMBURGER ==========
document.getElementById('hamburger').addEventListener('click', () => navbar.classList.toggle('menu-open'));

// ========== SCROLL REVEAL ==========
const allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            ro.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
allReveal.forEach(el => ro.observe(el));

// ========== NAV SCROLL SPY ==========
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const spySections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY;
    const navHeight = navbar.offsetHeight + 20;
    let currentId = '';

    spySections.forEach(section => {
        const top = section.offsetTop - navHeight;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            currentId = section.id;
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + currentId) {
            a.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ========== FAQ TOGGLE ==========
function toggleFaq(el) {
    const item = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ========== COUNT-UP STATS ==========
// Watches the .about-stats-row container; starts counting after the reveal fade-in
function runCounter(el) {
    const target = +el.dataset.target;
    const dur = 1800;
    const start = performance.now();
    el.textContent = '0';
    function anim(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
}

const statsRow = document.querySelector('.about-stats-row');
if (statsRow) {
    const statObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                statObs.unobserve(e.target);
                // Small delay so the reveal opacity transition is visible first
                const els = e.target.querySelectorAll('.count-up');
                els.forEach((el, i) => setTimeout(() => runCounter(el), 300 + i * 120));
            }
        });
    }, { threshold: 0.15 });
    statObs.observe(statsRow);
}



// ========== 3D TILT CARDS ==========
document.querySelectorAll('.service-card, .belief-card, .why-item').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
});

// ========== CURSOR GLOW ==========
const glow = document.createElement('div');
glow.style.cssText = 'position:fixed;width:300px;height:300px;background:radial-gradient(circle,rgba(77,121,202,0.06) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left 0.1s,top 0.1s;';
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
