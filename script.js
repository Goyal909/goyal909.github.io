// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Add particle background to hero section
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position, size and animation delay
            const size = Math.random() * 6 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            hero.appendChild(particle);
        }
    };
    
    createParticles();
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === '#' + currentId) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally handle form submission via AJAX
            // For this demo, we'll just show a success message
            
            const formElements = contactForm.elements;
            let isValid = true;
            
            // Basic validation
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                successMessage.style.color = '#3d5af1';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '15px';
                successMessage.style.backgroundColor = 'rgba(61, 90, 241, 0.1)';
                successMessage.style.borderRadius = '5px';
                successMessage.style.textAlign = 'center';
                
                // Add success message after the form
                contactForm.after(successMessage);
                
                // Reset the form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .skill, .contact-item, .social-link');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.service-card, .skill, .contact-item, .social-link').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
