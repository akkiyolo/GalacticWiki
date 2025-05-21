/**
 * Three.js Space Background
 * Creates an animated cosmic background with stars, nebulae, and moving particles
 */

// Initialize the space background
function initSpaceBackground() {
    const canvas = document.getElementById('space-background');
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);
    
    // Set up scene lighting
    const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x8844ff, 0.5);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Create stars
    createStarField(scene, 1000);
    
    // Create nebula
    createNebula(scene);
    
    // Create floating particles
    const particles = createParticles(scene, 100);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the camera slightly to create subtle movement
        camera.position.x = Math.sin(Date.now() * 0.0001) * 2;
        camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
        camera.lookAt(0, 0, 0);
        
        // Animate particles
        animateParticles(particles);
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
}

// Create a field of stars with random positions
function createStarField(scene, numStars) {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    const starPositions = [];
    const colors = [];
    
    // Color palette for stars
    const starColors = [
        new THREE.Color(0xffffff), // White
        new THREE.Color(0xaaaaff), // Blue-ish
        new THREE.Color(0xffffaa), // Yellow-ish
        new THREE.Color(0xffaa88)  // Orange-ish
    ];
    
    for (let i = 0; i < numStars; i++) {
        // Random position in a sphere
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        
        starPositions.push(x, y, z);
        
        // Random color from palette
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        colors.push(color.r, color.g, color.b);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    starMaterial.vertexColors = true;
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    return stars;
}

// Create a colorful nebula effect
function createNebula(scene) {
    // Create several colored clouds
    createNebulaCloud(scene, 0x4444ff, 30, 0.015); // Blue cloud
    createNebulaCloud(scene, 0xff44ff, 25, 0.02);  // Purple cloud
    createNebulaCloud(scene, 0x44ffff, 35, 0.01);  // Cyan cloud
}

// Helper function to create a single nebula cloud
function createNebulaCloud(scene, color, size, opacity) {
    const cloudGeometry = new THREE.BufferGeometry();
    const cloudMaterial = new THREE.PointsMaterial({
        color: color,
        size: 0.8,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const positions = [];
    
    // Create particles in a cloud-like distribution
    for (let i = 0; i < 1000; i++) {
        // Use gaussian distribution for more natural cloud formation
        const x = gaussianRandom() * size;
        const y = gaussianRandom() * size;
        const z = gaussianRandom() * size - 50; // Push the cloud back in the scene
        
        positions.push(x, y, z);
    }
    
    cloudGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    const cloud = new THREE.Points(cloudGeometry, cloudMaterial);
    scene.add(cloud);
    
    // Add slow rotation animation
    setInterval(() => {
        cloud.rotation.z += 0.0001;
        cloud.rotation.y += 0.00005;
    }, 16);
    
    return cloud;
}

// Create floating particles that move around
function createParticles(scene, count) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        
        // Random color with blue/purple tint
        const hue = 0.6 + Math.random() * 0.2; // 0.6-0.8 for blue/purple
        const saturation = 0.7 + Math.random() * 0.3; // 0.7-1.0
        const lightness = 0.5 + Math.random() * 0.5; // 0.5-1.0
        
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6 + Math.random() * 0.4
        });
        
        const particle = new THREE.Mesh(geometry, material);
        
        // Random position in a larger sphere
        particle.position.x = (Math.random() - 0.5) * 60;
        particle.position.y = (Math.random() - 0.5) * 60;
        particle.position.z = (Math.random() - 0.5) * 60;
        
        // Random speed
        particle.userData = {
            speed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            }
        };
        
        scene.add(particle);
        particles.push(particle);
    }
    
    return particles;
}

// Animate the floating particles
function animateParticles(particles) {
    particles.forEach(particle => {
        // Move particle according to its speed
        particle.position.x += particle.userData.speed.x;
        particle.position.y += particle.userData.speed.y;
        particle.position.z += particle.userData.speed.z;
        
        // If particle goes too far, wrap it around
        const limit = 30;
        if (Math.abs(particle.position.x) > limit) particle.position.x *= -0.9;
        if (Math.abs(particle.position.y) > limit) particle.position.y *= -0.9;
        if (Math.abs(particle.position.z) > limit) particle.position.z *= -0.9;
    });
}

// Helper function for gaussian distribution
function gaussianRandom() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Initialize the space background when the window loads
window.addEventListener('load', initSpaceBackground);
