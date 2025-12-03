// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
}

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Keyboard accessibility for menu
if (hamburger) {
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
    });
}

// FAQ Accordion functionality
// FAQ Accordion functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });

    // Keyboard accessibility for FAQ
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    }
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe various elements
document.querySelectorAll('.service-card, .info-card, .stat-box, .example-item, .feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        let isValid = true;
        
        // Validation
        if (!name || name.length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        if (!subject || subject.length < 3) {
            document.getElementById('subjectError').textContent = 'Subject must be at least 3 characters';
            isValid = false;
        }
        
        if (!message || message.length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        console.log('Form submitted:', {
            name,
            email,
            subject,
            message
        });
        
        // Show success message
        const formMessage = document.getElementById('formMessage');
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
        formMessage.style.display = 'block';
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Reset after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    });
}

// Service card toggle functionality
document.querySelectorAll('.service-toggle').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = button.closest('.service-card');
        card.classList.toggle('expanded');
        
        const text = card.classList.contains('expanded') ? 'Show Less ↑' : 'Learn More ↓';
        button.textContent = text;
    });
});

// Pricing toggle functionality
const pricingToggleBtns = document.querySelectorAll('.toggle-btn');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const periodLabels = document.querySelectorAll('.period');

pricingToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        pricingToggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const billing = btn.getAttribute('data-billing');
        
        // Update prices and period labels
        monthlyPrices.forEach((price, index) => {
            if (billing === 'annual') {
                const annualPrice = price.getAttribute('data-annual');
                price.textContent = annualPrice;
                if (periodLabels[index] && periodLabels[index].textContent !== '') {
                    periodLabels[index].textContent = '/year';
                }
            } else {
                const monthlyPrice = price.getAttribute('data-monthly');
                price.textContent = monthlyPrice;
                if (periodLabels[index] && periodLabels[index].textContent !== '') {
                    periodLabels[index].textContent = '/month';
                }
            }
        });
    });
});

// Counter animation for stat numbers
function animateCounter(element) {
    if (element.classList.contains('animated')) return;
    
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2500; // milliseconds
    const increment = target / (duration / 10); // 20ms per frame (~60fps)
    
    let current = 0;
    
    function updateCounter() {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + suffix;
            element.classList.add('animated');
        } else {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Observe counter elements
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            if (!entry.target.hasAttribute('data-no-animate')) {
                animateCounter(entry.target);
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.counter').forEach(el => {
    counterObserver.observe(el);
});

// Loading screen - only show on first visit
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const hasVisited = sessionStorage.getItem('inobex-visited');
    
    if (hasVisited && loadingScreen) {
        // Hide loading screen immediately if already visited
        loadingScreen.style.display = 'none';
    } else if (!hasVisited) {
        // Mark that user has visited
        sessionStorage.setItem('inobex-visited', 'true');
        
        // Animate percentage
        const percentageValue = document.getElementById('percentageValue');
        
        if (percentageValue) {
            let percentage = 0;
            const totalDuration = 3500; // 3.5 seconds in milliseconds
            const interval = 100; // Update every 100ms
            const increment = 100 / (totalDuration / interval);
            
            const percentageInterval = setInterval(() => {
                percentage += increment;
                if (percentage >= 100) {
                    percentage = 100;
                    clearInterval(percentageInterval);
                }
                percentageValue.textContent = Math.floor(percentage);
            }, interval);
        }
    }
});

// Typewriter effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Chat Coming Soon Popup
const chatToggle = document.getElementById('chatToggle');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'modal-content coming-soon';
        
        modal.innerHTML = `
            <button class="modal-close">&times;</button>
            <div class="modal-icon">🤖</div>
            <h2>Chatbot Coming Soon</h2>
            <p>We're working hard to bring you an intelligent chat experience. Stay tuned!</p>
            <p class="modal-signature">Sorry for any inconvenience.<br><strong>- The Inobex Team</strong></p>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Close modal on close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            overlay.remove();
        });
        
        // Close modal on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    });
}
