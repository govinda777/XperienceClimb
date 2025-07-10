// Cursor customizado que segue o mouse e deixa rastro
const cursor = document.querySelector('.cursor-trail');
let mouseX = -100, mouseY = -100;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
});

// Navegação que muda de posição no hover - CORRIGIDO
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const randomX = Math.random() * (window.innerWidth - 200);
        const randomY = Math.random() * 150 + 20;
        const randomRotation = Math.random() * 360;
        
        item.style.transition = 'all 0.3s ease';
        item.style.position = 'fixed';
        item.style.left = randomX + 'px';
        item.style.top = randomY + 'px';
        item.style.transform = `rotate(${randomRotation}deg) scale(1.2)`;
        item.style.zIndex = '9999';
    });
    
    item.addEventListener('mouseleave', () => {
        setTimeout(() => {
            item.style.position = 'absolute';
            item.style.transform = item.dataset.originalTransform || 'rotate(0deg)';
            item.style.left = '';
            item.style.top = '';
            item.style.zIndex = '';
        }, 2000);
    });
});

// Store original transforms
document.addEventListener('DOMContentLoaded', () => {
    navItems.forEach(item => {
        item.dataset.originalTransform = window.getComputedStyle(item).transform;
    });
});

// CTA dissolve / reconstrói - CORRIGIDO
const cta = document.getElementById('main-cta');
let isDissolving = false;

cta.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (isDissolving) return;
    isDissolving = true;
    
    // Dissolve effect
    cta.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cta.style.opacity = '0';
    cta.style.transform = 'scale(0.1) rotate(360deg)';
    
    setTimeout(() => {
        cta.textContent = 'REALIDADE QUEBRADA!';
        cta.style.background = 'linear-gradient(45deg, #00FF41, #7B68EE)';
        
        // Reconstruct effect
        cta.style.opacity = '1';
        cta.style.transform = 'scale(1.1) rotate(0deg)';
        
        setTimeout(() => {
            cta.style.transform = 'scale(1) rotate(0deg)';
            cta.textContent = 'INSCREVA-SE AGORA';
            cta.style.background = 'linear-gradient(45deg, #FF0080, #00FFFF)';
            isDissolving = false;
        }, 1000);
    }, 500);
});

// Hover interferência em preços
const prices = document.querySelectorAll('.package-price');
prices.forEach(price => {
    price.addEventListener('mouseenter', () => {
        price.style.filter = 'blur(2px) contrast(2) hue-rotate(90deg)';
        price.style.animation = 'glitch-text 0.5s ease-in-out';
        setTimeout(() => {
            price.style.filter = 'none';
            price.style.animation = '';
        }, 500);
    });
});

// Scroll que inverte direção ocasionalmente
let invertScroll = false;
let scrollTimeout;

window.addEventListener('wheel', (e) => {
    if (Math.random() < 0.05) {
        invertScroll = !invertScroll;
        document.body.style.filter = 'invert(1)';
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.style.filter = 'none';
        }, 500);
    }
    
    if (invertScroll) {
        e.preventDefault();
        window.scrollBy(0, -e.deltaY * 0.5);
    }
});

// Elementos que colam no cursor
const clingElements = document.querySelectorAll('.partner-card, .package-card');
clingElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        const originalPosition = {
            position: el.style.position,
            left: el.style.left,
            top: el.style.top,
            zIndex: el.style.zIndex
        };
        
        const moveWithCursor = (e) => {
            el.style.position = 'fixed';
            el.style.left = (e.clientX - el.offsetWidth/2) + 'px';
            el.style.top = (e.clientY - el.offsetHeight/2) + 'px';
            el.style.zIndex = '9999';
            el.style.pointerEvents = 'none';
        };
        
        document.addEventListener('mousemove', moveWithCursor);
        
        setTimeout(() => {
            document.removeEventListener('mousemove', moveWithCursor);
            el.style.position = originalPosition.position;
            el.style.left = originalPosition.left;
            el.style.top = originalPosition.top;
            el.style.zIndex = originalPosition.zIndex;
            el.style.pointerEvents = '';
        }, 2000);
    });
});

// Clique no logo faz a tela rachar
const logoPieces = document.querySelectorAll('.logo-piece');
logoPieces.forEach(piece => {
    piece.addEventListener('click', () => {
        document.body.style.background = 'linear-gradient(45deg, #FF0080, #00FFFF, #00FF41)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'crack-bg 1s ease-in-out';
        
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.animation = '';
        }, 1000);
    });
});

// Screen crack effect via CSS injection
const style = document.createElement('style');
style.textContent = `
@keyframes crack-bg {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;
document.head.appendChild(style);

// Formulário Surrealista: inputs que mudam de tamanho enquanto digita - CORRIGIDO
const inputs = document.querySelectorAll('.expanding-input');
inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const length = input.value.length;
        const scale = Math.min(1 + length * 0.02, 1.5);
        const rotation = Math.sin(length * 0.1) * 5;
        
        input.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        input.style.transition = 'transform 0.3s ease';
        
        // Change colors based on input length
        if (length > 5) {
            input.style.borderColor = '#FF0080';
            input.style.boxShadow = '0 0 20px #FF0080';
        } else if (length > 0) {
            input.style.borderColor = '#00FF41';
            input.style.boxShadow = '0 0 15px #00FF41';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    input.addEventListener('blur', () => {
        input.style.animation = '';
    });
});

// Labels que se movem quando foca no campo - CORRIGIDO
const labels = document.querySelectorAll('.floating-label');
labels.forEach((label, index) => {
    const input = inputs[index];
    if (input) {
        input.addEventListener('focus', () => {
            label.style.transform = 'translateY(-10px) scale(1.2) rotate(5deg)';
            label.style.color = '#FF0080';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                label.style.color = '#00FFFF';
            }
        });
    }
});

// Botão enviar se multiplica - CORRIGIDO
const form = document.getElementById('chaos-form');
const submitBtn = document.querySelector('.submit-multiplier');
let clones = [];

submitBtn.addEventListener('mouseenter', () => {
    if (clones.length < 3) {
        for (let i = 0; i < 3; i++) {
            const clone = submitBtn.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = (Math.random() * 100 - 50) + 'px';
            clone.style.left = (Math.random() * 100 - 50) + 'px';
            clone.style.transform = `scale(0.8) rotate(${Math.random() * 360}deg)`;
            clone.style.opacity = '0.7';
            clone.style.zIndex = '999';
            
            clone.addEventListener('click', (e) => {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            });
            
            submitBtn.parentElement.appendChild(clone);
            clones.push(clone);
        }
    }
});

submitBtn.addEventListener('mouseleave', () => {
    setTimeout(() => {
        clones.forEach(clone => {
            if (clone.parentElement) {
                clone.parentElement.removeChild(clone);
            }
        });
        clones = [];
    }, 1000);
});

// Konami Code => Matrix mode
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
let konamiIndex = 0;

window.addEventListener('keydown', (e) => {
    if (e.code === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
            activateMatrix();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateMatrix() {
    const matrix = document.querySelector('.matrix-rain');
    matrix.classList.remove('hidden');
    document.body.style.filter = 'hue-rotate(120deg) contrast(1.5)';
    
    setTimeout(() => {
        matrix.classList.add('hidden');
        document.body.style.filter = 'none';
    }, 10000);
}

// Clique triplo spawna emojis montanha
let clickCount = 0;
let clickTimer;

document.addEventListener('click', (e) => {
    clickCount++;
    if (clickCount === 3) {
        spawnMountain(e.clientX, e.clientY);
        clickCount = 0;
    }
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => clickCount = 0, 500);
});

function spawnMountain(x, y) {
    const container = document.querySelector('.mountain-emojis');
    const emojis = ['🏔️', '🗻', '⛰️', '🏕️', '🧗'];
    
    for (let i = 0; i < 8; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'mountain-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = (x + (Math.random() * 300 - 150)) + 'px';
        emoji.style.top = (y + (Math.random() * 300 - 150)) + 'px';
        emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
        emoji.style.animation = 'fall 3s linear forwards';
        container.appendChild(emoji);
        
        emoji.addEventListener('animationend', () => {
            if (emoji.parentElement) {
                emoji.parentElement.removeChild(emoji);
            }
        });
    }
}

// Pressionar espaço explode elementos
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        explodeElements();
    }
});

function explodeElements() {
    const allEls = document.querySelectorAll('section, .logo-piece, .nav-item');
    allEls.forEach(el => {
        el.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        el.style.transform = `translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) rotate(${Math.random() * 1080 - 540}deg) scale(${Math.random() * 0.5 + 0.5})`;
        el.style.opacity = '0.3';
    });
    
    setTimeout(() => {
        allEls.forEach(el => {
            el.style.transform = '';
            el.style.opacity = '1';
        });
    }, 1500);
}

// Acessibilidade: foco visível nas navegações
navItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
});

// Foco surpresa
navItems.forEach(item => {
    item.addEventListener('focus', () => {
        item.style.filter = 'invert(1) hue-rotate(180deg)';
        item.style.transform = 'scale(1.5)';
    });
    item.addEventListener('blur', () => {
        item.style.filter = 'none';
        item.style.transform = '';
    });
});

// Prevent default form submission e adiciona feedback
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Feedback visual
    const formData = new FormData(form);
    const submitContainer = document.querySelector('.submit-container');
    
    submitContainer.innerHTML = '<div style="color: #00FF41; font-size: 1.5rem; animation: glow 1s ease-in-out infinite;">INSCRIÇÃO ENVIADA! REALIDADE QUEBRADA COM SUCESSO!</div>';
    
    setTimeout(() => {
        submitContainer.innerHTML = '<button type="submit" class="submit-multiplier">ENVIAR</button>';
        // Re-bind events to new button
        const newBtn = submitContainer.querySelector('.submit-multiplier');
        bindSubmitButton(newBtn);
    }, 3000);
});

function bindSubmitButton(btn) {
    let clones = [];
    
    btn.addEventListener('mouseenter', () => {
        if (clones.length < 3) {
            for (let i = 0; i < 3; i++) {
                const clone = btn.cloneNode(true);
                clone.style.position = 'absolute';
                clone.style.top = (Math.random() * 100 - 50) + 'px';
                clone.style.left = (Math.random() * 100 - 50) + 'px';
                clone.style.transform = `scale(0.8) rotate(${Math.random() * 360}deg)`;
                clone.style.opacity = '0.7';
                clone.style.zIndex = '999';
                
                clone.addEventListener('click', (e) => {
                    e.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                });
                
                btn.parentElement.appendChild(clone);
                clones.push(clone);
            }
        }
    });
    
    btn.addEventListener('mouseleave', () => {
        setTimeout(() => {
            clones.forEach(clone => {
                if (clone.parentElement) {
                    clone.parentElement.removeChild(clone);
                }
            });
            clones = [];
        }, 1000);
    });
}

// Palavras que mudam de cor aleatoriamente
setInterval(() => {
    const textElements = document.querySelectorAll('h1, h2, h3, .package-name, .partner-name');
    textElements.forEach(el => {
        if (Math.random() < 0.1) {
            const colors = ['#00FF41', '#00FFFF', '#FF0080', '#7B68EE'];
            el.style.color = colors[Math.floor(Math.random() * colors.length)];
        }
    });
}, 2000);

// Elementos que pulsam e respiram
const pulsingElements = document.querySelectorAll('.package-card, .partner-card');
pulsingElements.forEach(el => {
    el.style.animation = `pulse ${2 + Math.random() * 2}s ease-in-out infinite`;
});

console.log('🏔️ XPERIENCE CLIMB - REALIDADE QUEBRADA ATIVADA! 🏔️');
console.log('Easter Eggs: Konami Code, Clique Triplo, Barra de Espaço');