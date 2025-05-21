/**
 * WikiGalaxy UI Effects
 * Handles various UI animations and effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI effects
    initGlassmorphismEffect();
    initParallaxEffect();
    initHoverEffects();
    initPulseEffects();
});

// Create glassmorphism effect on cards
function initGlassmorphismEffect() {
    const glassElements = document.querySelectorAll('.results-card, .error-container, .search-input-container');
    
    glassElements.forEach(element => {
        // Add subtle shadow movement on mouse move for depth effect
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate percentage position
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            // Calculate the shadow position (inverted for natural feel)
            const shadowX = (0.5 - xPercent) * 10;
            const shadowY = (0.5 - yPercent) * 10;
            
            // Apply the shadow effect
            this.style.boxShadow = `
                0 10px 30px rgba(0, 0, 0, 0.3),
                ${shadowX}px ${shadowY}px 20px rgba(106, 80, 255, 0.15)
            `;
        });
        
        // Reset the shadow when mouse leaves
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Add parallax effect to background elements
function initParallaxEffect() {
    document.addEventListener('mousemove', function(e) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate mouse position as percentage of window
        const mouseXPercent = e.clientX / windowWidth;
        const mouseYPercent = e.clientY / windowHeight;
        
        // Apply subtle movement to cosmic elements based on mouse position
        const starfield = document.querySelector('.starfield-bottom');
        if (starfield) {
            starfield.style.transform = `translateX(${mouseXPercent * -20}px)`;
        }
        
        // Move the logo slightly with mouse movement
        const logo = document.querySelector('.logo-svg');
        if (logo) {
            logo.style.transform = `
                rotate(${Date.now() * 0.01 % 360}deg)
                translateX(${mouseXPercent * 10 - 5}px)
                translateY(${mouseYPercent * 10 - 5}px)
            `;
        }
    });
}

// Add hover effects to interactive elements
function initHoverEffects() {
    // Interactive buttons and links
    const interactiveElements = document.querySelectorAll('.search-button, .wiki-button, .try-again-button, .control-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add a glowing pulse effect on hover
            this.classList.add('pulse-hover');
            
            // Play a subtle hover sound if audio is enabled
            playHoverSound();
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-hover');
        });
        
        // Add click effect
        element.addEventListener('click', function() {
            // Play a click sound if audio is enabled
            playClickSound();
            
            // Add quick scale effect
            this.classList.add('click-effect');
            setTimeout(() => {
                this.classList.remove('click-effect');
            }, 300);
        });
    });
}

// Add pulse effects to cosmic elements
function initPulseEffects() {
    // Stars pulse effect
    const stars = document.createElement('div');
    stars.classList.add('stars-pulse-effect');
    document.body.appendChild(stars);
    
    // Create 5 random pulsing stars
    for (let i = 0; i < 5; i++) {
        createPulsingStar();
    }
    
    // Periodically create new pulsing stars
    setInterval(createPulsingStar, 10000);
}

// Helper function to create a pulsing star
function createPulsingStar() {
    const star = document.createElement('div');
    star.classList.add('pulsing-star');
    
    // Random position on screen
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size and color
    const size = 3 + Math.random() * 10;
    const hue = 180 + Math.random() * 60; // Blue to purple range
    
    star.style.cssText = `
        left: ${x}vw;
        top: ${y}vh;
        width: ${size}px;
        height: ${size}px;
        background-color: hsl(${hue}, 100%, 70%);
        box-shadow: 0 0 ${size * 2}px hsl(${hue}, 100%, 70%);
        animation-duration: ${3 + Math.random() * 4}s;
    `;
    
    document.body.appendChild(star);
    
    // Remove the star after animation completes
    setTimeout(() => {
        star.remove();
    }, 8000);
}

// Sound effects (only if user has interacted with the page)
let audioEnabled = false;
let audioContext = null;

// Enable audio after user interaction
document.addEventListener('click', function enableAudio() {
    if (!audioEnabled) {
        audioEnabled = true;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        document.removeEventListener('click', enableAudio);
    }
});

// Play hover sound
function playHoverSound() {
    if (!audioEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1800, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Play click sound
function playClickSound() {
    if (!audioEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
}

// Add CSS styles for dynamic effects
function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .pulse-hover {
            animation: pulse 0.5s ease-in-out infinite alternate;
        }
        
        .click-effect {
            animation: clickScale 0.3s ease-out;
        }
        
        .pulsing-star {
            position: fixed;
            border-radius: 50%;
            animation: starPulse 3s ease-in-out infinite;
            z-index: -1;
            pointer-events: none;
        }
        
        @keyframes clickScale {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
        
        @keyframes starPulse {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0; transform: scale(0.5); }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Add dynamic styles
addDynamicStyles();
