// Portfolio Website - Vanilla JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCustomCursor();
    initThemeToggle();
    initScrollProgress();
    initScrollAnimations();
    initBackToTop();
    initSkillAnimations();
    initStatCounters();
    initContactForm();
    updateCopyrightYear();
    
    // Add loading animation class to body
    document.body.classList.add('loaded');
});

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if cursor elements exist
    if (!cursorDot || !cursorOutline) return;
    
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
        
        // Interactive elements cursor effect
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .tool-item, .stat-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.width = '16px';
                cursorDot.style.height = '16px';
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'rgba(108, 99, 255, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'rgba(108, 99, 255, 0.5)';
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });
}

// Scroll Animations for Sections
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .tool-item, .stat-card, .about-text, .contact-info');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill Level Animations
function initSkillAnimations() {
    const skillLevels = document.querySelectorAll('.level-fill');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}

// Animated Stat Counters
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element, target) {
    const duration = 2000; // Animation duration in ms
    const stepTime = 20; // Time between each step
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Contact Form Animation and Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Input focus effects
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add focus class on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class on blur if empty
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission (UI only - no backend)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');
        const btnIcon = submitBtn.querySelector('i');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        btnIcon.classList.remove('fa-paper-plane');
        btnIcon.classList.add('fa-spinner', 'fa-spin');
        submitBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Show success state
            btnText.textContent = 'Message Sent!';
            btnIcon.classList.remove('fa-spinner', 'fa-spin');
            btnIcon.classList.add('fa-check');
            
            // Reset form
            this.reset();
            
            // Remove focus classes
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btnIcon.classList.remove('fa-check');
                btnIcon.classList.add('fa-paper-plane');
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Update Copyright Year
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Add some additional interactivity for premium feel
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to all cards
    const cards = document.querySelectorAll('.skill-card, .tool-item, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Add new ripple
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});