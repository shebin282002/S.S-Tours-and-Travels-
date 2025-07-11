// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(n) {
    showSlide(n - 1);
}

// Auto-slide functionality
function autoSlide() {
    changeSlide(1);
}

// Set up auto-slide every 5 seconds
let slideInterval = setInterval(autoSlide, 5000);

// Pause auto-slide on hover
const heroSection = document.querySelector('.hero-section');
heroSection.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

heroSection.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(10, 61, 98, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(10, 61, 98, 0.1)';
    }
});

// Enquiry Form Handling with WhatsApp Integration
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Create WhatsApp message
    const message = `*New Travel Enquiry - S.S Tours & Travels*

*Customer Details:*
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}

*Travel Information:*
🎯 *Travel Type:* ${data.travelType}
📍 *Destination:* ${data.destination}
📅 *Travel Dates:* ${data.startDate} to ${data.endDate}

*Additional Message:*
${data.message || 'No additional message provided'}

---
*This enquiry was sent from the S.S Tours & Travels website*`;
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919873177307?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showNotification('Enquiry sent successfully! We\'ll contact you soon.', 'success');
    
    // Reset form
    this.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Open Sans', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const rate = scrolled * -0.5;
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to page elements
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const elements = document.querySelectorAll('.service-card, .gallery-item, .contact-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

// Hero slider touch support
heroSection.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

heroSection.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Performance Optimization - Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Navbar background change
    const navbar = document.querySelector('#navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(10, 61, 98, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(10, 61, 98, 0.1)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const rate = scrolled * -0.5;
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Gallery Item Click Effects
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Form Validation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiryForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#28a745';
            }
        });
    });
});

// Set minimum date for date inputs to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput) {
        startDateInput.min = today;
    }
    if (endDateInput) {
        endDateInput.min = today;
    }
    
    // Update end date minimum when start date changes
    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', function() {
            endDateInput.min = this.value;
        });
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('S.S Tours and Travels website loaded successfully!');
    
    // Add loading animation to body
    document.body.classList.add('loaded');
    
    // Initialize any additional features
    initializeFeatures();
});

function initializeFeatures() {
    // Add any additional initialization code here
    
    // Example: Add smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// WhatsApp Integration Helper Functions
function sendWhatsAppMessage(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919873177307?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

function createQuickEnquiry(type) {
    const message = `Hi! I'm interested in your ${type} services. Can you please provide more information?`;
    sendWhatsAppMessage(message);
}

// Add quick enquiry buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const serviceLink = card.querySelector('.service-link');
        if (serviceLink) {
            serviceLink.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceName = card.querySelector('h3').textContent;
                createQuickEnquiry(serviceName);
            });
        }
    });
}); 