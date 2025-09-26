// Initialize Three.js scene for the rotating pyramid
let scene, camera, renderer, pyramid;

// GSAP animations and scroll triggers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js scene
    initThreeJS();

    // Initialize navbar functionality
    initNavbar();

    // Initialize GSAP animations
    initGSAPAnimations();

    // Initialize scroll effects
    initScrollEffects();
});

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x576e85);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, 300);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const pyramidContainer = document.getElementById('pyramid-container');
    pyramidContainer.appendChild(renderer.domElement);

    // Create pyramid geometry
    const pyramidGeometry = new THREE.ConeGeometry(1.5, 2, 4);
    const pyramidMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b6b,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });

    pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    pyramid.position.set(0, 0, 0);
    pyramid.castShadow = true;
    scene.add(pyramid);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Add point light for more dramatic effect
    const pointLight = new THREE.PointLight(0x4ecdc4, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate pyramid
    pyramid.rotation.x += 0.01;
    pyramid.rotation.y += 0.02;

    // Add floating animation
    pyramid.position.y = Math.sin(Date.now() * 0.001) * 0.1;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / 300;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 300);
}

function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');

            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

function initGSAPAnimations() {
    // Animate hero section elements
    gsap.from('.hero-section h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-section p', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    // Animate about section
    gsap.from('.about-section h2', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.about-section p', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate video section
    gsap.from('.video-container', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate gallery items
    gsap.from('.gallery-item', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Sphere logo animation - spinning slowly on multiple axes
    gsap.to('.sphere-logo', {
        duration: 8,
        rotationY: 360,
        rotationX: 180,
        repeat: -1,
        ease: 'none'
    });

    // Add parallax effect to hero section
    gsap.to('.hero-section', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

function initScrollEffects() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                gsap.to(window, {
                    duration: 1,
                    scrollTo: targetPosition,
                    ease: 'power3.inOut'
                });
            }
        });
    });

}
