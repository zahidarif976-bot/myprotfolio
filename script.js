
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initParticles();
    initSkillBars();
    initFormValidation();
    initScrollAnimations();
    initThemeControl();
    initProjectHoverEffects();
    initTypewriterEffect();
    
    document.querySelector('.footer-copyright').textContent = 
        document.querySelector('.footer-copyright').textContent.replace('2023', new Date().getFullYear());
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        const duration = Math.random() * 20 + 10;
        
        const hue = Math.floor(Math.random() * 60) + 180; 
        const saturation = Math.floor(Math.random() * 30) + 70;
        const lightness = Math.floor(Math.random() * 20) + 50;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: hsl(${hue}, ${saturation}%, ${lightness}%);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            filter: blur(${size/2}px);
            animation: float ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        container.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.1); }
            50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(0.9); }
            75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}


function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function initFormValidation() {
    const form = document.getElementById('messageForm');
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        clearErrors();
        
        if (!nameInput.value.trim()) {
            showError(nameError, 'Name is required');
            isValid = false;
        }
        
        if (!emailInput.value.trim()) {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!subjectInput.value.trim()) {
            showError(subjectError, 'Subject is required');
            isValid = false;
        }
        
        if (!messageInput.value.trim()) {
            showError(messageError, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.style.color = '#10b981';
            formStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            
            
            form.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.style.backgroundColor = 'transparent';
            }, 5000);
        }
    });
    
    function showError(element, message) {
        element.textContent = message;
        element.style.color = '#ef4444';
    }
    
    function clearErrors() {
        [nameError, emailError, subjectError, messageError].forEach(el => {
            el.textContent = '';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-stats, .project-card, .testimonial-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}
function initThemeControl() {
    
    console.log('Dark theme activated');
}


function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3)';
        });
    });
}

function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const textArray = ['Full Stack Web Developer', 'Problem Solver', 'Creative Thinker', 'SEO Specialist'];
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeWriter() {
        if (isPaused) return;
        
        const currentText = textArray[currentTextIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            heroTitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 50);
        } else if (isDeleting && charIndex > 0) {
            heroTitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, 30);
        } else if (!isDeleting && charIndex === currentText.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeWriter();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % textArray.length;
            setTimeout(typeWriter, 500);
        }
    }
    
    
    setTimeout(typeWriter, 1000);
}

(function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Staggered animation for timeline items */
        .timeline-item:nth-child(1).animated { animation-delay: 0.1s; }
        .timeline-item:nth-child(2).animated { animation-delay: 0.3s; }
        .timeline-item:nth-child(3).animated { animation-delay: 0.5s; }
        
        /* Staggered animation for project cards */
        .project-card:nth-child(1).animated { animation-delay: 0.1s; }
        .project-card:nth-child(2).animated { animation-delay: 0.3s; }
        .project-card:nth-child(3).animated { animation-delay: 0.5s; }
        
        /* Staggered animation for testimonial cards */
        .testimonial-card:nth-child(1).animated { animation-delay: 0.1s; }
        .testimonial-card:nth-child(2).animated { animation-delay: 0.3s; }
        .testimonial-card:nth-child(3).animated { animation-delay: 0.5s; }
        
        /* Staggered animation for stats */
        .stat-card:nth-child(1).animated { animation-delay: 0.1s; }
        .stat-card:nth-child(2).animated { animation-delay: 0.2s; }
        .stat-card:nth-child(3).animated { animation-delay: 0.3s; }
        .stat-card:nth-child(4).animated { animation-delay: 0.4s; }
    `;
    document.head.appendChild(style);
})();