/* ============================================
   SUMIT SAH — PORTFOLIO WEBSITE
   JavaScript Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Toggle ----
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon   = document.getElementById('themeIcon');
    const html        = document.documentElement;

    // Load saved preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next    = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }


    // ---- Cursor Glow Effect ----
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        });
    }


    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX  = mouseX;
        let ringY  = mouseY;
        const LERP = 0.12; // ring lag — lower = more lag

        // Update dot position instantly
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
            document.body.classList.remove('cursor-hidden');
        });

        // Animate ring with smooth lerp
        function animateRing() {
            ringX += (mouseX - ringX) * LERP;
            ringY += (mouseY - ringY) * LERP;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hide when cursor leaves window
        document.addEventListener('mouseleave', () => {
            document.body.classList.add('cursor-hidden');
        });
        document.addEventListener('mouseenter', () => {
            document.body.classList.remove('cursor-hidden');
        });

        // Hover states on interactive elements
        const hoverEls = document.querySelectorAll(
            'a, button, .btn, .btn-outline-hero, .nav-cta, .project-card, .skill-category, .contact-card, .theme-toggle, .nav-toggle'
        );
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        // Text cursor on paragraphs and headings
        const textEls = document.querySelectorAll('p, h1, h2, h3, .hero-tagline, .section-subtitle');
        textEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-text');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-text');
            });
        });

        // Image cursor on photo
        const photoEl = document.querySelector('.hero-photo-img');
        if (photoEl) {
            photoEl.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-image');
            });
            photoEl.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-image');
            });
        }

        // Click effect — squish the ring
        document.addEventListener('mousedown', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(0.75)';
            cursorDot.style.transform  = 'translate(-50%, -50%) scale(0.6)';
        });
        document.addEventListener('mouseup', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform  = 'translate(-50%, -50%) scale(1)';
        });
    }

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close menu when link clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll(
        '.skill-category, .project-card, .about-grid, .contact-grid, .highlight-item, .contact-card, .hero-stats-row'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const animateCounters = () => {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats-row');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ---- Smooth Scroll for all anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Contact Form Handler ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create mailto link
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:sumitsah03690@gmail.com?subject=${subject}&body=${body}`;

            // Show success feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = 'var(--success)';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ---- Typing effect for terminal cursor ----
    const terminalCursor = document.querySelector('.terminal-cursor');
    if (terminalCursor) {
        setInterval(() => {
            terminalCursor.style.opacity = terminalCursor.style.opacity === '0' ? '1' : '0';
        }, 530);
    }

    // ---- Parallax effect for hero grid ----
    const heroGrid = document.querySelector('.hero-bg-grid');
    if (heroGrid && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // ---- Add stagger delay to reveal elements ----
    document.querySelectorAll('.skills-grid .skill-category').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
    });

    document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.contact-cards .contact-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
    });

    document.querySelectorAll('.about-highlights .highlight-item').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
    });

});
