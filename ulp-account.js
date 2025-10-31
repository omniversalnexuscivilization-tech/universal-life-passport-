// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
    mobileMenuToggle.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add floating animation to step cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'float 6s ease-in-out infinite';
            entry.target.style.animationDelay = Math.random() * 2 + 's';
        }
    });
}, observerOptions);

document.querySelectorAll('.step-card').forEach(card => {
    observer.observe(card);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
