/**
 * WikiGalaxy About Page JavaScript
 * Handles animations and interactions for the About page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield effect
    createAboutStarfield();
    
    // Animate the astronaut
    animateAstronaut();
    
    // Set up the satellite orbit animation
    animateSatellite();
    
    // Rocket animation
    animateRocket();
    
    // Add floating animation to planets
    animateFloatingElements();
});

// Create a starfield effect specific to the About page
function createAboutStarfield() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'about-stars-container';
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

// Animate the astronaut with additional effects
function animateAstronaut() {
    const astronaut = document.querySelector('.astronaut-svg');
    if (!astronaut) return;
    
    // Add gentle float and rotate animations
    astronaut.style.animation = 'floatAstronaut 8s ease-in-out infinite';
    
    // Add mouseover effect to astronaut
    astronaut.addEventListener('mouseover', function() {
        this.style.animation = 'floatAstronautFast 2s ease-in-out infinite';
        
        // Return to normal animation after mouse leaves
        this.addEventListener('mouseout', function() {
            this.style.animation = 'floatAstronaut 8s ease-in-out infinite';
        }, { once: true });
    });
    
    // Add keyframes for astronaut animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes floatAstronautFast {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Animate the satellite with additional effects
function animateSatellite() {
    const satellite = document.querySelector('.satellite-svg');
    if (!satellite) return;
    
    // Add light pulse effect to satellite elements
    satellite.querySelectorAll('rect, circle').forEach(element => {
        // Random animation duration
        const duration = 2 + Math.random() * 3;
        
        // Random animation delay
        const delay = Math.random() * 2;
        
        element.style.animation = `pulseSatellite ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Add keyframes for satellite animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes pulseSatellite {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Animate the rocket
function animateRocket() {
    const rocket = document.querySelector('.rocket-svg');
    if (!rocket) return;
    
    // Add flame flicker animation
    const flame = rocket.querySelector('.rocket-flame');
    if (flame) {
        flame.style.animation = 'flameFlicker 0.3s ease-in-out infinite alternate';
    }
    
    // Add keyframes for rocket animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes flameFlicker {
            0% { transform: scaleY(0.8) scaleX(0.9); opacity: 0.7; }
            100% { transform: scaleY(1.2) scaleX(1.1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Add floating animations to planets and other elements
function animateFloatingElements() {
    // Add parallax effect to the page content
    window.addEventListener('mousemove', function(e) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate mouse position as percentage of window
        const mouseXPercent = e.clientX / windowWidth;
        const mouseYPercent = e.clientY / windowHeight;
        
        // Apply subtle movement to planets based on mouse position
        const planets = document.querySelectorAll('.planet-1, .planet-2, .planet-3');
        planets.forEach(planet => {
            const moveX = (mouseXPercent - 0.5) * 20;
            const moveY = (mouseYPercent - 0.5) * 20;
            
            planet.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Apply movement to the rocket
        const rocket = document.querySelector('.rocket-container');
        if (rocket) {
            const rocketMoveX = (mouseXPercent - 0.5) * 10;
            const rocketMoveY = (mouseYPercent - 0.5) * 10;
            
            rocket.style.transform = `translate(${rocketMoveX}px, ${rocketMoveY}px) rotate(15deg)`;
        }
    });
}