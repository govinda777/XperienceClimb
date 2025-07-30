// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollReveal();
    initFormHandling();
    initInteractiveElements();
    initFloatingAnimations();
    initMobileOptimizations();
});

// Navigation functionality - FIXED
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Remove active class from all nav items
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // Calculate offset for navigation
                const navHeight = 120; // Account for fixed navigation
                const elementPosition = targetElement.offsetTop - navHeight;
                
                // Smooth scroll to target - FIXED
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav item on scroll
    window.addEventListener('scroll', throttle(updateActiveNavItem, 100));
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === currentSection) {
            item.classList.add('active');
        }
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.dia-card, .galeria-item, .pacote-card, .parceiro-card');
    
    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Add staggered animation delay
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.animationDelay = `${delay}ms`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Form handling - FIXED
function initFormHandling() {
    const form = document.querySelector('.inscricao-form');
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc3545';
                input.style.background = 'rgba(220, 53, 69, 0.1)';
            } else {
                input.style.borderColor = '';
                input.style.background = '';
            }
        });
        
        if (!isValid) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '✓ Inscrição Enviada!';
            submitBtn.style.background = '#28a745';
            
            // Show success message
            showNotification('Inscrição realizada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
    
    // Add input animations and prevent scroll jumping
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function(e) {
            e.preventDefault();
            this.parentElement.classList.add('focused');
            
            // Prevent scroll jumping
            const scrollY = window.scrollY;
            setTimeout(() => {
                window.scrollTo(0, scrollY);
            }, 10);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Interactive elements - FIXED
function initInteractiveElements() {
    // Pacote cards interaction - FIXED AUTO-SELECTION
    const pacoteCards = document.querySelectorAll('.pacote-card');
    const formSelect = document.querySelector('select');
    
    pacoteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(5deg) scale(1.05)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
        
        // Click handler for pacote selection - FIXED
        card.addEventListener('click', function() {
            const pacoteName = this.querySelector('h3').textContent.trim();
            const pacotePrice = this.querySelector('.preco').textContent.trim();
            
            // Remove selection from other cards
            pacoteCards.forEach(c => c.classList.remove('selected'));
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Auto-select in form - FIXED
            if (formSelect) {
                const optionValue = pacoteName.toLowerCase();
                const option = Array.from(formSelect.options).find(opt => 
                    opt.value === optionValue
                );
                if (option) {
                    formSelect.value = option.value;
                    formSelect.dispatchEvent(new Event('change'));
                }
            }
            
            // Scroll to form
            setTimeout(() => {
                document.getElementById('inscricao').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
            
            showNotification(`Pacote ${pacoteName} selecionado! ${pacotePrice}`, 'success');
        });
    });
    
    // Galeria hover effects
    const galeriaItems = document.querySelectorAll('.galeria-item');
    galeriaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Dim other items
            galeriaItems.forEach(other => {
                if (other !== this) {
                    other.style.opacity = '0.5';
                    other.style.transform = 'scale(0.95)';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Restore all items
            galeriaItems.forEach(other => {
                other.style.opacity = '';
                other.style.transform = '';
            });
        });
    });
    
    // Hero CTA button effect - FIXED
    const heroBtn = document.querySelector('.hero-cta .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            // Scroll to pacotes section
            const pacotesSection = document.getElementById('pacotes');
            if (pacotesSection) {
                const elementPosition = pacotesSection.offsetTop - 120;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Contact items interaction
    const contatoItems = document.querySelectorAll('.contato-item');
    contatoItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            if (text.includes('@')) {
                // Email
                showNotification('Abrindo cliente de email...', 'info');
            } else if (text.includes('(')) {
                // Phone
                showNotification('Abrindo WhatsApp...', 'info');
            } else {
                // Instagram
                showNotification('Abrindo Instagram...', 'info');
            }
        });
    });
}

// Floating animations
function initFloatingAnimations() {
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    floatingShapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const currentTransform = shape.style.transform || '';
            
            shape.style.transform = `${currentTransform} translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.decorative-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + index * 0.2;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    }, 16));
}

// Mobile optimizations
function initMobileOptimizations() {
    // Touch interactions for mobile
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.pacote-card, .parceiro-card, .galeria-item');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
    
    // Resize handler
    window.addEventListener('resize', debounce(() => {
        // Recalculate animations and positions
        updateActiveNavItem();
    }, 250));
}

// Notification system - ENHANCED
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        z-index: 99999;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-weight: 600;
        max-width: 350px;
        font-size: 14px;
        border: 2px solid rgba(255,255,255,0.2);
    `;
    
    // Style the close button
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
            opacity: 0.8;
        `;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return '✓';
        case 'error': return '✗';
        case 'warning': return '⚠️';
        default: return 'ℹ️';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#17a2b8';
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Easter eggs and special effects
function initEasterEggs() {
    let konamiCode = '';
    const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
    
    document.addEventListener('keydown', function(e) {
        konamiCode += e.code;
        
        if (konamiCode === konamiSequence) {
            // Activate special climbing mode
            document.body.classList.add('climbing-mode');
            showNotification('🧗‍♂️ Modo Escalada Ativado! 🧗‍♀️', 'success');
            
            // Add special effects
            const specialEffects = document.createElement('div');
            specialEffects.className = 'special-effects';
            specialEffects.innerHTML = '🧗‍♂️'.repeat(20);
            document.body.appendChild(specialEffects);
            
            setTimeout(() => {
                specialEffects.remove();
                document.body.classList.remove('climbing-mode');
            }, 5000);
            
            konamiCode = '';
        }
        
        // Reset if sequence is wrong
        if (konamiCode.length > konamiSequence.length || !konamiSequence.startsWith(konamiCode)) {
            konamiCode = '';
        }
    });
}

// Initialize easter eggs
initEasterEggs();

// Add dynamic cursor effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--climb-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Change cursor on hover
    const interactiveElements = document.querySelectorAll('button, a, .pacote-card, .galeria-item, .nav-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'var(--climb-orange)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--climb-green)';
        });
    });
}

// Initialize cursor effect for desktop
if (window.innerWidth > 768) {
    initCursorEffect();
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        updateActiveNavItem();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

initPerformanceMonitoring();

// Add loading screen
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">🏔️</div>
            <h2>XPERIENCE CLIMB</h2>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <p>Preparando sua aventura...</p>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--climb-green), var(--climb-orange));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        color: white;
        text-align: center;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Animate loading
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
}

// Show loading screen
showLoadingScreen();