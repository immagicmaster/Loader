/* ============================================
   MagicHub V1 - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scriptContents = document.querySelectorAll('.script-content');
    const btnCopyScript = document.getElementById('btnCopyScript');
    const btnDiscord = document.getElementById('btnDiscord');
    const btnGetScript = document.getElementById('btnGetScript');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const bgMusic = document.getElementById('bgMusic');
    const particlesContainer = document.getElementById('particles');

    /* ============================================
       AUDIO AUTOPLAY HANDLER
       ============================================ */
    function initAudio() {
        // Try autoplay (may be blocked by browser)
        bgMusic.volume = 0.3;
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked, wait for first interaction
                const unlockAudio = () => {
                    bgMusic.play().catch(() => {});
                    document.removeEventListener('click', unlockAudio);
                    document.removeEventListener('touchstart', unlockAudio);
                };
                document.addEventListener('click', unlockAudio, { once: true });
                document.addEventListener('touchstart', unlockAudio, { once: true });
            });
        }
    }
    initAudio();

    /* ============================================
       PARTICLES ANIMATION
       ============================================ */
    function createParticles() {
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';

            const size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            const colors = ['#a78bfa', '#c4b5fd', '#f59e0b', '#6d28d9'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.opacity = 0.2 + Math.random() * 0.5;

            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    /* ============================================
       MOBILE MENU
       ============================================ */
    function openMenu() {
        menuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
        if (menuOverlay.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) closeMenu();
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    /* ============================================
       SMOOTH SCROLL & ACTIVE MENU
       ============================================ */
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                closeMenu();
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active menu on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveMenu() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveMenu, { passive: true });
    updateActiveMenu();

    /* ============================================
       TAB TOGGLE (MAIN / FARM)
       ============================================ */
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            // Animate out current
            const currentContent = document.querySelector('.script-content.active');
            if (currentContent) {
                currentContent.style.animation = 'fadeOut 0.2s ease forwards';
                setTimeout(() => {
                    currentContent.style.animation = '';
                    currentContent.classList.remove('active');

                    // Show new content
                    const newContent = document.getElementById('tab-' + tab);
                    newContent.classList.add('active');
                }, 200);
            }

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Add fadeOut keyframe dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(styleSheet);

    /* ============================================
       COPY FUNCTIONS
       ============================================ */
    function showToast(message, icon = 'fa-check-circle') {
        toastMessage.textContent = message;
        toast.querySelector('i').className = 'fas ' + icon;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    async function copyToClipboard(text, successMsg) {
        try {
            await navigator.clipboard.writeText(text);
            showToast(successMsg);
        } catch (err) {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast(successMsg);
        }
    }

    // Copy Script
    btnCopyScript.addEventListener('click', () => {
        const activeContent = document.querySelector('.script-content.active code');
        const scriptText = activeContent.textContent;

        copyToClipboard(scriptText, 'Script copied to clipboard!');

        // Button animation
        const originalHTML = btnCopyScript.innerHTML;
        btnCopyScript.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btnCopyScript.classList.add('copied');

        setTimeout(() => {
            btnCopyScript.innerHTML = originalHTML;
            btnCopyScript.classList.remove('copied');
        }, 2000);
    });

    // Copy Discord
    btnDiscord.addEventListener('click', () => {
        copyToClipboard('dsc.gg/magichubv1', 'Discord link copied!');
    });

    /* ============================================
       SCROLL ANIMATIONS (Intersection Observer)
       ============================================ */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.script-card, .games-card, .dev-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    /* ============================================
       NAVBAR SCROLL EFFECT
       ============================================ */
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    /* ============================================
       BUTTON HOVER SOUND EFFECT (Optional)
       ============================================ */
    // Add subtle click feedback
    document.querySelectorAll('.btn, .tab-btn, .btn-copy').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.97)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    console.log('%c MagicHub V1 ', 'background: linear-gradient(135deg, #6d28d9, #f59e0b); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%c Loaded successfully! ', 'color: #a78bfa; font-size: 14px;');
});
