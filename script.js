document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const scanBtn = document.getElementById('scanBtn');
    const domainInput = document.getElementById('domainInput');
    const resultsSection = document.getElementById('results');
    const riskBar = document.getElementById('riskBar');
    const riskScore = document.getElementById('riskScore');
    const riskLevel = document.getElementById('riskLevel');
    const sslSubject = document.getElementById('sslSubject');
    const sslIssuer = document.getElementById('sslIssuer');
    const sslFrom = document.getElementById('sslFrom');
    const sslTo = document.getElementById('sslTo');
    const htmlSummary = document.getElementById('htmlSummary');
    const insightsCard = document.getElementById('insightsCard');
    const insightsList = document.getElementById('insightsList');
    
    // Modal functionality
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    function setupModalClose(modal) {
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
    
    // Setup modal close handlers
    setupModalClose(loginModal);
    setupModalClose(signupModal);
    
    // Switch between modals
    document.querySelectorAll('.switch-modal').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const currentModal = link.closest('.modal');
            const targetModal = document.getElementById(targetId);
            
            if (currentModal && targetModal) {
                closeModal(currentModal);
                setTimeout(() => openModal(targetModal), 150);
            }
        });
    });
    
    // Event Listeners
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
    
    getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(signupModal);
    });
    
    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Here you would integrate with your backend
            console.log('Login attempt:', { email, password });
            
            // Simulate API call
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Login functionality will be connected to your backend API.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                // closeModal(loginModal);
            }, 1500);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Validate password length
            if (password.length < 8) {
                alert('Password must be at least 8 characters long!');
                return;
            }
            
            // Here you would integrate with your backend
            console.log('Signup attempt:', { name, email, password });
            
            // Simulate API call
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating account...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Signup functionality will be connected to your backend API.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                // closeModal(signupModal);
            }, 1500);
        });
    }
    
    scanBtn.addEventListener('click', () => {
        const domain = domainInput.value.trim();
        if (domain) {
            // UI-only scan effect (replace with your backend call)
            // Show results section
            if (resultsSection) {
                // Set temporary skeleton values
                setRisk(0);
                htmlSummary.textContent = 'Analyzing page content…';
                sslSubject.textContent = '—';
                sslIssuer.textContent = '—';
                sslFrom.textContent = '—';
                sslTo.textContent = '—';

                resultsSection.scrollIntoView({ behavior: 'smooth' });

                // Simulate async; replace with fetch to backend
                setTimeout(() => {
                    const demo = demoResult(domain);
                    applyResult(demo);
                }, 800);
            }
        } else {
            createModal('Error', 'Please enter a domain or email address to scan.');
        }
    });
    
    // Allow Enter key to trigger scan
    domainInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            scanBtn.click();
        }
    });
    
    // Animate stats
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50; // Adjust speed of counting
            
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = current >= 1000 ? 
                        `${Math.floor(current / 1000)}M+` : 
                        `${Math.floor(current)}+`;
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = stat.textContent.includes('M') ? 
                        stat.textContent : 
                        `${target}+`;
                }
            };
            
            updateNumber();
        });
    }
    
    // Start animation when stats are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // -----------------------------
    // Page animations
    // -----------------------------
    function markReveal(elements, variant = 'up', baseDelay = 0, step = 80) {
        const list = Array.from(elements).filter(Boolean);
        list.forEach((el, idx) => {
            el.classList.add('reveal');
            if (variant === 'left') el.classList.add('reveal-left');
            else if (variant === 'right') el.classList.add('reveal-right');
            else if (variant === 'scale') el.classList.add('reveal-scale');
            el.style.transitionDelay = `${baseDelay + idx * step}ms`;
        });
        return list;
    }

    // Stagger hero on initial load
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroItems = [];
        const h1 = hero.querySelector('h1');
        const p = hero.querySelector('p');
        const search = hero.querySelector('.search-container');
        const stats = hero.querySelectorAll('.stats .stat-item');
        heroItems.push(h1, p, search, ...stats);
        markReveal(heroItems, 'up', 80, 100);
    }

    // Mark common sections for reveal on scroll
    markReveal(document.querySelectorAll('.features .feature-card'), 'up', 0, 120);
    markReveal(document.querySelectorAll('.cards-grid .card'), 'up', 0, 120);
    markReveal(document.querySelectorAll('.results .results-header, .results .risk-bar'), 'up', 0, 0);

    // Intersection Observer to trigger reveals
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            } else {
                entry.target.classList.remove('in');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Accordion toggle
    document.querySelectorAll('[data-accordion-toggle]').forEach(toggle => {
        const card = toggle.closest('.accordion');
        const button = toggle.querySelector('button');
        toggle.addEventListener('click', () => {
            const open = card.classList.toggle('open');
            if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

    

    
    
});