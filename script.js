// Initialize EmailJS
(function() {
    emailjs.init('I4mkjj9BtQLr0QQMf'); // Replace with your EmailJS public key
})();

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        emailjs.send('service_tozi6co', 'template_ifwie1i', {
            from_name: formObject.name,
            from_email: formObject.email,
            phone: formObject.phone,
            company: formObject.company,
            project_type: formObject.projectType,
            budget: formObject.budget,
            message: formObject.message,
            to_email: 'a01203277@gmail.com' // Your email address
        })
        .then(function(response) {
            console.log('Email sent successfully:', response);
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            
            // Show error message
            showNotification('Failed to send message. Please try again or contact us directly.', 'error');
        })
        .finally(function() {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });

    // Get Quote button functionality
    const getQuoteButtons = document.querySelectorAll('.btn-primary');
    
    getQuoteButtons.forEach(button => {
        if (button.textContent.includes('Quote') || button.textContent.includes('Get Started')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to contact form
                const contactSection = document.querySelector('#contact');
                const offsetTop = contactSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Focus on the name input after scrolling
                setTimeout(() => {
                    const nameInput = document.querySelector('#name');
                    if (nameInput) {
                        nameInput.focus();
                    }
                }, 1000);
            });
        }
    });

    // View Our Work button functionality
    const viewWorkButtons = document.querySelectorAll('.btn-secondary');
    
    viewWorkButtons.forEach(button => {
        if (button.textContent.includes('View Our Work')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to projects section
                const projectsSection = document.querySelector('#projects');
                const offsetTop = projectsSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            });
        }
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

    // Observe sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe cards for staggered animation
    const cards = document.querySelectorAll('.service-card, .project-card, .stat-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Notification system
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 16px 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 400px;
        }
        
        .notification-success {
            border-left: 4px solid #16a34a;
        }
        
        .notification-error {
            border-left: 4px solid #dc2626;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 18px;
            font-weight: bold;
        }
        
        .notification-success .notification-icon {
            color: #16a34a;
        }
        
        .notification-error .notification-icon {
            color: #dc2626;
        }
        
        .notification-message {
            color: #374151;
            font-weight: 500;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Simple backend simulation for contact form
function submitContactForm(formData) {
    // In a real implementation, this would send data to your backend
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Message sent successfully!'
            });
        }, 2000);
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Initialize page
window.addEventListener('load', function() {
    // Set initial active nav item
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Add loaded class to body for any additional animations
    document.body.classList.add('loaded');

});
