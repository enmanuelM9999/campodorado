// Campo Dorado - JavaScript para interactividad
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGACIÓN MÓVIL =====
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarBurger && navbarMenu) {
        navbarBurger.addEventListener('click', function() {
            navbarBurger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }
    
    // ===== SCROLL SUAVE PARA NAVEGACIÓN =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (navbarMenu.classList.contains('is-active')) {
                    navbarBurger.classList.remove('is-active');
                    navbarMenu.classList.remove('is-active');
                }
            }
        });
    });
    
    // ===== EFECTO DE NAVBAR AL HACER SCROLL =====
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(212, 175, 55, 0.15)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(212, 175, 55, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== ANIMACIONES AL HACER SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validación básica
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos.', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'warning');
                return;
            }
            
            // Simular envío (aquí conectarías con tu backend)
            showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
            this.reset();
        });
    }
    
    // ===== FUNCIÓN DE VALIDACIÓN DE EMAIL =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== SISTEMA DE NOTIFICACIONES =====
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification is-${type} is-light`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
            border-radius: 8px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <button class="delete" onclick="this.parentElement.remove()"></button>
            ${message}
        `;
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ===== EFECTOS DE HOVER PARA TARJETAS =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== CONTADOR ANIMADO PARA ESTADÍSTICAS (opcional) =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // ===== EFECTO DE TYPING PARA EL HERO =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de typing al subtítulo del hero
    const heroSubtitle = document.querySelector('.hero-bg .subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }
    
    // ===== EFECTO DE PARTÍCULAS DORADAS (opcional) =====
    function createParticles() {
        const hero = document.querySelector('.hero-bg');
        if (!hero) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        hero.appendChild(particlesContainer);
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 6000);
        }
        
        // Crear partículas cada 2 segundos
        setInterval(createParticle, 2000);
    }
    
    // Activar partículas (descomenta si quieres el efecto)
    // createParticles();
    
    // ===== LAZY LOADING PARA IMÁGENES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== MEJORAR ACCESIBILIDAD =====
    // Agregar soporte para navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarMenu.classList.contains('is-active')) {
            navbarBurger.classList.remove('is-active');
            navbarMenu.classList.remove('is-active');
        }
    });
    
    // ===== INDICADOR DE PROGRESO DE SCROLL =====
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--gold), var(--gold-dark));
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Activar indicador de progreso
    createScrollProgress();
    
    console.log('🌟 Campo Dorado - Sitio web cargado con éxito');
});

// ===== FUNCIONES DE WHATSAPP =====
function openWhatsApp(serviceName) {
    // Número de WhatsApp (reemplaza con tu número real)
    const phoneNumber = '51926586014'; // Código de país +51 para Perú
    
    // Mensaje personalizado según el servicio
    let message = '';
    
    if (serviceName === 'Consulta General') {
        message = `¡Hola! Me interesa conocer más sobre los servicios de Campo Dorado. ¿Podrían brindarme más información?`;
    } else {
        message = `¡Hola! Me interesa reservar el servicio de *${serviceName}* en Campo Dorado. ¿Podrían ayudarme con la disponibilidad y precios?`;
    }
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp en nueva ventana
    window.open(whatsappURL, '_blank');
    
    // Mostrar notificación de confirmación
    showNotification(`¡Redirigiendo a WhatsApp para ${serviceName}!`, 'success');
}

// ===== FUNCIONES GLOBALES =====
// Función para mostrar/ocultar menú móvil
function toggleMobileMenu() {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarBurger && navbarMenu) {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    }
}

// Función para scroll suave a una sección
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
