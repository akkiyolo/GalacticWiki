/**
 * WikiGalaxy Contact Page JavaScript
 * Handles form submission and animations for the Contact page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const backBtn = document.getElementById('back-btn');
    
    // Initialize contact page animations
    initContactAnimations();
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form data
            if (!name || !email || !message) {
                showError('Please fill in all fields');
                return;
            }
            
            // Show rocket launch animation
            launchMessageRocket();
            
            // In a real application, this is where you would send the form data to a server
            // For now, we'll just simulate a successful submission
            setTimeout(() => {
                // Show success message
                successMessage.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Handle "Return to Space" button click
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            successMessage.classList.add('hidden');
            
            // Reset submit button
            submitBtn.classList.remove('launching');
        });
    }
});

// Initialize contact page animations
function initContactAnimations() {
    // Add starfield effect specific to the Contact page
    createContactStarfield();
    
    // Set up interactive elements animations
    setupFormInteractions();
    
    // Animate spacecraft
    animateSpacecraft();
}

// Create a starfield effect specific to the Contact page
function createContactStarfield() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'contact-stars-container';
    starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        pointer-events: none;
    `;
    
    document.body.appendChild(starsContainer);
    
    // Create 30 stars with random properties
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = 1 + Math.random() * 3;
        
        // Random animation duration
        const duration = 3 + Math.random() * 7;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        // Apply styles
        star.style.cssText = `
            position: absolute;
            left: ${posX}vw;
            top: ${posY}vh;
            width: ${size}px;
            height: ${size}px;
            background-color: #ffffff;
            border-radius: 50%;
            opacity: ${0.5 + Math.random() * 0.5};
            animation: pulseStar ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        starsContainer.appendChild(star);
    }
    
    // Add keyframes for star animation
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes pulseStar {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.5); opacity: 1; }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Set up form interactions
function setupFormInteractions() {
    // Add focus animations to form inputs
    const inputs = document.querySelectorAll('.cosmic-input');
    
    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            // Add glowing effect to the current input
            const inputContainer = this.closest('.input-container');
            if (inputContainer) {
                inputContainer.classList.add('active');
            }
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            const inputContainer = this.closest('.input-container');
            if (inputContainer) {
                inputContainer.classList.remove('active');
            }
        });
    });
    
    // Add hover effects to submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            const rocket = this.querySelector('.button-rocket');
            if (rocket) {
                rocket.style.transform = 'translateY(-50%) translateX(5px)';
            }
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            const rocket = this.querySelector('.button-rocket');
            if (rocket) {
                rocket.style.transform = 'translateY(-50%)';
            }
        });
    }
    
    // Add parallax effect
    window.addEventListener('mousemove', function(e) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate mouse position as percentage of window
        const mouseXPercent = e.clientX / windowWidth;
        const mouseYPercent = e.clientY / windowHeight;
        
        // Move the orbiting system
        const orbitingSystem = document.querySelector('.orbiting-system');
        if (orbitingSystem) {
            const moveX = (mouseXPercent - 0.5) * 20;
            const moveY = (mouseYPercent - 0.5) * 20;
            
            orbitingSystem.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        // Move the spacecraft
        const spacecraft = document.querySelector('.spacecraft');
        if (spacecraft) {
            const moveX = (mouseXPercent - 0.5) * 30;
            const moveY = (mouseYPercent - 0.5) * 30;
            
            spacecraft.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// Animate spacecraft and UFO
function animateSpacecraft() {
    const spacecraft = document.querySelector('.spacecraft-svg');
    if (!spacecraft) return;
    
    // Add light blink animations to UFO lights
    const lights = spacecraft.querySelectorAll('.ufo-light');
    lights.forEach((light, index) => {
        light.style.animation = `blinkLight ${1 + index * 0.2}s ease-in-out ${index * 0.5}s infinite alternate`;
    });
    
    // Add beam pulse animation
    const beam = spacecraft.querySelector('.ufo-beam');
    if (beam) {
        beam.style.animation = 'pulseBeam 3s ease-in-out infinite';
    }
}

// Show error message
function showError(message) {
    // Create error message element if it doesn't exist
    let errorElement = document.getElementById('form-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'form-error';
        errorElement.className = 'form-error';
        errorElement.style.cssText = `
            color: #ff5e5e;
            background: rgba(255, 94, 94, 0.1);
            border: 1px solid rgba(255, 94, 94, 0.3);
            border-radius: 8px;
            padding: 10px 15px;
            margin-bottom: 20px;
            font-size: 0.9rem;
            animation: fadeIn 0.3s ease-out;
        `;
        
        // Add error before the form
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(errorElement, form);
    }
    
    // Set error message
    errorElement.textContent = message;
    
    // Hide error after 5 seconds
    setTimeout(() => {
        errorElement.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        setTimeout(() => {
            errorElement.remove();
        }, 300);
    }, 5000);
    
    // Add keyframes for animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Launch rocket animation for the submit button
function launchMessageRocket() {
    const submitBtn = document.getElementById('submit-btn');
    
    if (submitBtn) {
        // Add launching class to start animation
        submitBtn.classList.add('launching');
        
        // Create trail particles
        const trail = submitBtn.querySelector('.rocket-trail');
        if (trail) {
            trail.style.opacity = '1';
            
            // Position particles
            const particles = trail.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                particle.style.top = `${50 + (index - 1) * 3}%`;
                particle.style.right = `${20 - index * 5}px`;
            });
        }
    }
}