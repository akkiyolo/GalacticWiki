/**
 * WikiGalaxy Main JavaScript
 * Initializes all components and manages the application
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('WikiGalaxy initialized');
    
    // Initialize all components
    initializeApplication();
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Set up service worker for offline capability if supported
    setupServiceWorker();
});

// Initialize the application
function initializeApplication() {
    // Focus on search input when the page loads
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        setTimeout(() => {
            searchInput.focus();
        }, 500);
    }
    
    // Add a welcome message to the console
    console.log(
        "%cWelcome to WikiGalaxy! 🚀✨",
        "color: #6a50ff; font-size: 20px; font-weight: bold;"
    );
    console.log(
        "%cExplore the universe of knowledge.",
        "color: #50e3ff; font-size: 14px;"
    );
}

// Set up keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // If ESC key is pressed, close results or clear search
        if (e.key === 'Escape') {
            const resultsSection = document.getElementById('results-section');
            const errorSection = document.getElementById('error-section');
            const searchInput = document.getElementById('search-input');
            
            if (!resultsSection.classList.contains('hidden')) {
                // If results are showing, close them
                resultsSection.classList.add('hidden');
            } else if (!errorSection.classList.contains('hidden')) {
                // If error is showing, close it
                errorSection.classList.add('hidden');
            } else if (searchInput.value) {
                // If search has text, clear it
                searchInput.value = '';
            }
        }
        
        // If / key is pressed outside of input, focus the search box
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            searchInput.focus();
        }
        
        // If Alt+Enter is pressed in search input, open directly in Wikipedia
        if (e.key === 'Enter' && e.altKey && document.activeElement.id === 'search-input') {
            e.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (query) {
                window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`, '_blank');
            }
        }
    });
}

// Set up service worker for offline capabilities
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        // We'll keep this commented out for now as we don't have the service worker file
        // navigator.serviceWorker.register('/sw.js')
        //    .then(reg => console.log('Service Worker registered', reg))
        //    .catch(err => console.error('Service Worker registration failed', err));
    }
}

// Create some animated stars in the background
function createBackgroundStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'background-stars';
    document.body.appendChild(starsContainer);
    
    // Create 50 stars with random properties
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'bg-star';
        
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
            left: ${posX}vw;
            top: ${posY}vh;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        starsContainer.appendChild(star);
    }
}

// Add some dynamic styles for background stars
function addStarStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .background-stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }
        
        .bg-star {
            position: absolute;
            background-color: #ffffff;
            border-radius: 50%;
            animation: twinkle ease-in-out infinite;
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Initialize background stars
addStarStyles();
createBackgroundStars();

// Detect device capabilities and adjust effects for performance
function detectCapabilitiesAndOptimize() {
    // Check if device is likely mobile or low-powered
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPower = isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isLowPower) {
        // Reduce animations and effects for better performance
        document.body.classList.add('reduced-motion');
        
        // Apply optimizations
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .reduced-motion .orbit-loader .orbit {
                animation-duration: 10s;
            }
            
            .reduced-motion .pulsing-star {
                display: none;
            }
            
            .reduced-motion .background-stars .bg-star {
                animation: none !important;
                opacity: 0.5;
            }
        `;
        
        document.head.appendChild(styleElement);
        
        console.log('Performance optimizations applied for this device');
    }
}

// Check device capabilities and optimize
detectCapabilitiesAndOptimize();
