// RecyclAI Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality (reuse from main script)
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle external links (to other pages)
            if (href.includes('.html')) {
                return; // Let the browser handle navigation
            }
            
            // Handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
            
            // Close mobile menu if open
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Demo functionality - Updated for external site integration
    const embedOverlay = document.querySelector('.embed-overlay');
    const demoIframe = document.querySelector('.demo-iframe');
    
    // Handle embed overlay click
    if (embedOverlay) {
        embedOverlay.addEventListener('click', function(e) {
            // If clicking the button, let it handle the navigation
            if (e.target.classList.contains('btn')) {
                return;
            }
            
            // Otherwise, hide the overlay to reveal the iframe
            this.style.opacity = '0';
            this.style.pointerEvents = 'none';
            
            // Focus the iframe for interaction
            if (demoIframe) {
                demoIframe.focus();
            }
        });
    }
    
    // Re-show overlay when iframe loses focus (optional)
    if (demoIframe) {
        demoIframe.addEventListener('blur', function() {
            if (embedOverlay) {
                setTimeout(() => {
                    embedOverlay.style.opacity = '1';
                    embedOverlay.style.pointerEvents = 'auto';
                }, 2000); // Show overlay again after 2 seconds of inactivity
            }
        });
    }
    
    // Button click handlers
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Try the Demo')) {
                // External link - let browser handle navigation
                return;
            } else if (buttonText.includes('See it in Action')) {
                // Scroll to how it works section
                const howItWorksSection = document.querySelector('#how-it-works');
                if (howItWorksSection) {
                    const offsetTop = howItWorksSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else if (buttonText.includes('Open Full Demo Site') || buttonText.includes('Open in New Tab')) {
                // External links - let browser handle navigation
                return;
            } else if (buttonText.includes('Request') || buttonText.includes('Pilot')) {
                showNotification('Pilot request submitted! We\'ll contact you soon.');
            } else if (buttonText.includes('Download')) {
                showNotification('Technical specifications downloaded!');
            }
        });
    });
    
    // Intersection Observer for animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.step-card, .use-case-card, .stat-card, .testimonial-card, .content-card, .section-header'
    );
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d,]/g, '');
        
        if (number) {
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }, 30);
        }
    }
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.step-card, .use-case-card, .stat-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Utility function to show notifications (reuse from main script)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add mobile navigation styles dynamically (reuse from main script)
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 0 0 16px 16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-top: none;
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            transform: translateY(-10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

