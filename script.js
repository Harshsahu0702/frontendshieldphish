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
    function createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                <p>${content}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking the X
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside the modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            }
        });
        
        modal.style.display = 'flex';
    }
    
    // Event Listeners
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createModal('Login', 'Login functionality will be implemented here.');
    });
    
    getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createModal('Get Started', 'Sign up form will be implemented here.');
    });
    
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

    // Helpers
    function setRisk(score) {
        const clamped = Math.max(0, Math.min(100, score));
        if (riskBar) riskBar.style.width = clamped + '%';
        if (riskScore) riskScore.textContent = `${clamped} / 100`;
        if (!riskLevel) return;
        let level = 'Low';
        riskLevel.classList.remove('badge-low', 'badge-med', 'badge-high');
        if (clamped < 34) {
            riskLevel.classList.add('badge-low'); level = 'Low';
        } else if (clamped < 67) {
            riskLevel.classList.add('badge-med'); level = 'Medium';
        } else {
            riskLevel.classList.add('badge-high'); level = 'High';
        }
        riskLevel.textContent = level;
    }

    function applyResult(result) {
        setRisk(result.score);
        if (sslSubject) sslSubject.textContent = result.ssl.subject;
        if (sslIssuer) sslIssuer.textContent = result.ssl.issuer;
        if (sslFrom) sslFrom.textContent = result.ssl.validFrom;
        if (sslTo) sslTo.textContent = result.ssl.validTo;
        if (htmlSummary) htmlSummary.textContent = result.htmlSummary;
        if (insightsList) {
            insightsList.innerHTML = '';
            result.insights.forEach((tip, idx) => {
                const li = document.createElement('li');
                li.textContent = `${idx + 1}. ${tip}`;
                insightsList.appendChild(li);
            });
        }
        if (insightsCard && !insightsCard.classList.contains('open')) {
            // start collapsed; do nothing
        }
    }

    // Demo placeholder data; replace with backend response mapping
    function demoResult(domain) {
        const tld = domain.split('.').pop() || 'com';
        const date = new Date();
        const toDate = new Date(date.getFullYear(), date.getMonth() + 2, date.getDate());
        const pad = n => String(n).padStart(2, '0');
        return {
            score: domain.includes('login') || domain.includes('verify') ? 62 : 12,
            ssl: {
                subject: `*.${tld}`,
                issuer: 'WR2',
                validFrom: `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()}`,
                validTo: `${pad(toDate.getDate())}/${pad(toDate.getMonth()+1)}/${toDate.getFullYear()}`
            },
            htmlSummary: 'The HTML content appears consistent with a legitimate site structure. External resources point to expected domains. No forms detected in provided snippet.',
            insights: [
                'Whitelist high-reputation domains and subdomains related to the brand',
                'Detect suspicious subdomain patterns and excessive keywords',
                'Assess DOM complexity vs brand baseline to flag simplified clones',
                'Check for robust JS globals and CSP nonces typical to the brand',
                'If a login form exists, validate action target and input patterns'
            ]
        };
    }
});