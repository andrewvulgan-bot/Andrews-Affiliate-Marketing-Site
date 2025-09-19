// ===== THEME TOGGLE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to dark theme
    const currentTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = currentTheme;
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark-theme') {
            themeIcon.textContent = '🌙';
        } else {
            themeIcon.textContent = '☀️';
        }
    }
});

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
});

// ===== BLOG CATEGORY FILTERING =====
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.blog-category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.product-card, .blog-card, .stat-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== NAVIGATION SCROLL EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'var(--color-surface)';
        }
    });
});

// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'var(--gradient-primary)';
                }, 3000);
            }, 2000);
        });
    }
});

// ===== PRODUCT HOVER EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productBtn = card.querySelector('.product-btn');
        
        if (productBtn) {
            productBtn.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Simulate product view
                console.log('Viewing product:', card.querySelector('.product-name').textContent);
            });
        }
    });
});

// ===== HERO CTA BUTTON ACTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.hero-cta .btn-primary');
    const watchBtn = document.querySelector('.hero-cta .btn-secondary');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    if (watchBtn) {
        watchBtn.addEventListener('click', function() {
            // Simulate video modal or redirect
            alert('Coming Soon: Watch our craft process video!');
        });
    }
});

// ===== FLOATING ANIMATION PERFORMANCE =====
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.floating');
    
    // Pause animations when not in viewport to save performance
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    });
    
    floatingElements.forEach(el => {
        animationObserver.observe(el);
    });
});

// ===== ADD RIPPLE EFFECT CSS DYNAMICALLY =====
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.blog-category-btn, .product-btn, .theme-toggle');
    
    interactiveElements.forEach(el => {
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Ensure elements are focusable
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .blog-category-btn:focus,
        .product-btn:focus,
        .theme-toggle:focus,
        .btn:focus {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
});

// ===== PERFORMANCE OPTIMIZATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images when they come into viewport
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(function() {
            // Handle scroll events here
        });
    });
});
