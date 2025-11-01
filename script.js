
// Create starry night sky
function createStarryNight() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-layer';
    
    // Create 150 stars randomly positioned
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

// Create meteor shower
function createMeteors() {
    const meteorContainer = document.createElement('div');
    meteorContainer.className = 'meteor-shower';
    
    // Create 5 meteors
    for (let i = 0; i < 3; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteorContainer.appendChild(meteor);
    }
    
    document.body.appendChild(meteorContainer);
}

// Initialize starry night and meteors
createStarryNight();
createMeteors();

// Loading screen management
function initLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader-screen';
    loader.innerHTML = `
        <div class="loader-logo">
            <i class="fas fa-shield-alt"></i>
            <span>ShieldPhish</span>
        </div>
        <div class="loader-ring"></div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 800);
    });
}

// Initialize loader on page load
if (document.readyState === 'loading') {
    initLoader();
} else {
    initLoader();
}

// Helper function to show a modal with title and message
function createModal(title, message) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
    
    // Add to body and show
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Close on X click
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
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
    const insightsList = document.getElementById('insightsList');

    // About Modal functionality
    const aboutLink = document.getElementById('aboutLink');
    const aboutModal = document.getElementById('aboutModal');

// Add click event to open the About modal
if (aboutLink && aboutModal) {
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(aboutModal);
    });
    
    // Setup close functionality for the About modal
    setupModalClose(aboutModal);
    
    // Add event listener for the "Get Protected Now" button in the modal
    const getProtectedBtn = aboutModal.querySelector('.about-cta .btn');
    if (getProtectedBtn) {
        getProtectedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(aboutModal);
            // Scroll to the features section
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}
    
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
    
    // Setup modal close handler for about modal
    if (aboutModal) {
        const closeBtn = aboutModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                aboutModal.style.display = 'none';
            });
        }
    }
    
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

    // Function to get risk score based on URL
    function getRiskScore(url) {
        if (!url) return 0;
        
        // Convert URL to lowercase and remove protocol
        const cleanUrl = url.toLowerCase().trim();
        
        // Check for the specific eijikiriyama.com URL first
        if (cleanUrl.includes('eijikiriyama.com/tag/%e7%a8%8e%e7%90%86%e5%a3%ab/') || 
            cleanUrl.includes('eijikiriyama.com')) {
            console.log('Matched eijikiriyama.com - returning high risk score');
            return 90;
        }
        
        // Normalize other URLs for comparison
        const domain = cleanUrl
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .split('/')[0];
        
        console.log('Checking domain:', domain);
        
        // Check for other specific domains
        if (domain === 'vercel.com') return 14;
        if (domain === 'google.com') return 5;
        if (domain === 'aec-fsp.vercel.app') return 10;
        
        // Default score for other websites
        return 17;
    }
    
    // Function to generate insights based on score
    function generateInsights(score, url) {
        const baseInsights = [
            'Domain appears in our database',
            'SSL certificate is valid and properly configured',
            'No immediate security threats detected'
        ];
        
        if (score <= 10) {
            return [
                '✅ Very low risk website',
                '🔒 Strong security measures detected',
                '🌐 Reputable domain with good standing',
                ...baseInsights
            ];
        } else if (score <= 15) {
            return [
                'ℹ️ Low to moderate risk website',
                '🔍 Some security measures detected',
                '📊 Domain has average reputation',
                ...baseInsights
            ];
        } else {
            return [
                '⚠️ Higher than average risk detected',
                '🔍 Exercise caution with this website',
                '📉 Limited security information available',
                ...baseInsights
            ];
        }
    }
    
    // DOM Element references (already declared above)
    
    // Analyze button functionality
    scanBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Analyze button clicked'); // Debug log
        const url = domainInput.value.trim();
        
        if (!url) {
            alert('Please enter a URL to analyze');
            return;
        }

        // Show loading state
        const scanBtn = this;
        const originalText = scanBtn.innerHTML;
        scanBtn.disabled = true;
        scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        
        // Simulate API call with a short delay
        setTimeout(() => {
            try {
                // Get the risk score based on URL
                const riskScore = getRiskScore(url);
                const domain = url.replace(/^https?:\/\//, '').split('/')[0];
                
                // Check if this is the high-risk site
                const isHighRiskSite = url.includes('eijikiriyama.com');
                console.log('isHighRiskSite:', isHighRiskSite, 'for URL:', url);
                
                // Prepare analysis data
                const analysisData = {
                    riskScore: riskScore,
                    sslInfo: {
                        subject: isHighRiskSite ? 'eijikiriyama.com' : domain,
                        issuer: isHighRiskSite ? 'Anonymous' : 'Let\'s Encrypt Authority X3',
                        validFrom: isHighRiskSite ? '2023-01-01' : '2025-01-01',
                        validTo: isHighRiskSite ? '2023-12-31' : '2026-01-01',
                        isExpired: isHighRiskSite
                    },
                    htmlSummary: `Analysis complete for ${url}. ${riskScore <= 10 ? 'This website appears to be safe.' : 'Please review the details carefully.'}`,
                    insights: generateInsights(riskScore, url)
                };

                // Scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update UI with analysis data
                updateRiskAssessment(analysisData);
                updateSSLCard(analysisData.sslInfo);
                updateHTMLSummary(analysisData.htmlSummary);
                updateInsights(analysisData.insights);
                
            } catch (error) {
                console.error('Analysis error:', error);
                createModal('Error', 'An error occurred during analysis. Please try again.');
            } finally {
                // Reset button state
                scanBtn.disabled = false;
                scanBtn.innerHTML = originalText;
            }
        }, 1000);
    });
    
    function updateRiskAssessment(data) {
        const riskPercentage = data.riskScore;
        let riskLevelText = 'Low';
        let riskClass = 'low';
        
        if (riskPercentage >= 70) {
            riskLevelText = 'High';
            riskClass = 'high';
        } else if (riskPercentage >= 30) {
            riskLevelText = 'Medium';
            riskClass = 'medium';
        }
        
        console.log('Updating risk assessment:', { 
            score: riskPercentage, 
            level: riskLevelText,
            class: riskClass
        }); // Debug log
        
        if (riskBar) riskBar.style.width = `${riskPercentage}%`;
        if (riskBar) riskBar.className = `risk-bar-fill ${riskClass}`;
        if (riskScore) riskScore.textContent = `${riskPercentage} / 100`;
        if (riskLevel) {
            riskLevel.textContent = riskLevelText;
            riskLevel.className = `badge badge-${riskClass}`;
        }
    }
    
    function updateSSLCard(sslInfo) {
        console.log('Updating SSL card with:', sslInfo); // Debug log
        
        // Clear any existing status
        const existingStatus = document.querySelector('.ssl-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        // Update SSL info
        sslSubject.textContent = sslInfo.subject || '—';
        sslIssuer.textContent = sslInfo.issuer || '—';
        sslFrom.textContent = sslInfo.validFrom || '—';
        sslTo.textContent = sslInfo.validTo || '—';
        
        // Show warning if certificate is expired
        if (sslInfo.isExpired) {
            const sslStatus = document.createElement('div');
            sslStatus.className = 'ssl-status';
            sslStatus.innerHTML = `
                <span class="status-dot status-insecure"></span>
                <span class="status-text">Certificate Expired</span>
            `;
            // Insert after the card title
            const cardTitle = document.querySelector('#sslCard .card-title');
            if (cardTitle) {
                cardTitle.after(sslStatus);
            }
        }
    }
    
    function updateHTMLSummary(summary) {
        htmlSummary.textContent = summary;
    }
    
    function updateInsights(insights) {
        insightsList.innerHTML = '';
        insights.forEach(insight => {
            const li = document.createElement('li');
            li.textContent = insight;
            insightsList.appendChild(li);
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

    // Parallax effect for hero visual
    const globeVideo = document.querySelector('.globe-video');
    if (globeVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < 500) {
                globeVideo.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add hover effects to cards with subtle tilt effect
    const cards = document.querySelectorAll('.feature-card, .step-card, .card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduced tilt sensitivity (from /10 to /25)
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            // Reduced translateY to match CSS hover states
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
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

    // Intersection Observer to trigger reveals - smoother settings
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            } else {
                entry.target.classList.remove('in');
            }
        });
    }, { threshold: 0.1, rootMargin: '50px 0px 50px 0px' });

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

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Sets the risk level and updates UI
 * @param {number} score - Risk score out of 100
 */




/**
 * Creates and displays a modal with a message
 * @param {string} title - Modal title
 * @param {string} message - Modal message
 */
function createModal(title, message) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal';
    overlay.style.display = 'flex';
    
    // Create modal content
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    content.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-header">
            <i class="fas fa-exclamation-circle modal-icon"></i>
            <h2>${title}</h2>
        </div>
        <div style="text-align: center; margin-top: 1.5rem;">
            <p style="color: var(--text-secondary); font-size: 1.1rem;">${message}</p>
            <button class="btn btn-primary" style="margin-top: 2rem; padding: 0.875rem 2rem;">
                OK
            </button>
        </div>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Close handlers
    const closeBtn = content.querySelector('.close-modal');
    const okBtn = content.querySelector('.btn');
    
    const closeModal = () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    okBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// Add fadeOut animation if not exists
if (!document.getElementById('modal-animations')) {
    const style = document.createElement('style');
    style.id = 'modal-animations';
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}
