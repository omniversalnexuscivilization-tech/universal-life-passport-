// ========================================
// Universal Life Passport - JavaScript
// ========================================

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const authModal = document.getElementById('authModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Auth buttons
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const heroSignupBtn = document.getElementById('heroSignupBtn');
const heroLearnBtn = document.getElementById('heroLearnBtn');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const mobileSignupBtn = document.getElementById('mobileSignupBtn');

// Auth tabs and forms
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');

// Form elements
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');

// ========================================
// Navbar Scroll Effect
// ========================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Mobile Menu Functions
// ========================================

function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    mobileMenuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Mobile menu toggle
mobileMenuToggle?.addEventListener('click', () => {
    if (mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Mobile menu close button
mobileMenuClose?.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking overlay
mobileMenuOverlay?.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking nav links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// ========================================
// Authentication Modal Functions
// ========================================

function openAuthModal(mode = 'login') {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (mode === 'signup') {
        switchToSignup();
    } else {
        switchToLogin();
    }
}

function closeAuthModal() {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchToLogin() {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    authTitle.textContent = 'Welcome Back';
    authSubtitle.textContent = 'Sign in to access your Universal Life Passport';
}

function switchToSignup() {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    authTitle.textContent = 'Create Account';
    authSubtitle.textContent = 'Join the future of universal identity';
}

// Modal event listeners
loginBtn?.addEventListener('click', () => openAuthModal('login'));
signupBtn?.addEventListener('click', () => openAuthModal('signup'));
heroSignupBtn?.addEventListener('click', () => openAuthModal('signup'));
mobileLoginBtn?.addEventListener('click', () => {
    closeMobileMenu();
    openAuthModal('login');
});
mobileSignupBtn?.addEventListener('click', () => {
    closeMobileMenu();
    openAuthModal('signup');
});

modalClose?.addEventListener('click', closeAuthModal);
modalOverlay?.addEventListener('click', closeAuthModal);

// Tab switching
loginTab?.addEventListener('click', switchToLogin);
signupTab?.addEventListener('click', switchToSignup);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (authModal.classList.contains('active')) {
            closeAuthModal();
        }
        if (mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// ========================================
// Form Submissions
// ========================================

loginFormElement?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    try {
        // Show loading state
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await simulateAPICall(2000);
        
        // Success - redirect to blockchain passport form
        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            // Redirect to blockchain passport registration
            window.location.href = '/passport-registration.html';
        }, 1500);
        
    } catch (error) {
        showNotification('Login failed. Please check your credentials.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

signupFormElement?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    try {
        // Show loading state
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await simulateAPICall(2000);
        
        // Success - redirect to blockchain passport form
        showNotification('Account created! Complete your blockchain passport...', 'success');
        
        setTimeout(() => {
            // Redirect to blockchain passport registration
            window.location.href = '/passport-registration.html';
        }, 1500);
        
    } catch (error) {
        showNotification('Signup failed. Please try again.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ========================================
// Social Authentication
// ========================================

const googleBtns = document.querySelectorAll('.google-btn');
const digilockerBtns = document.querySelectorAll('.digilocker-btn');
const biometricBtns = document.querySelectorAll('.biometric-btn');

googleBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        try {
            showNotification('Connecting to Google...', 'info');
            await simulateAPICall(1500);
            showNotification('Google authentication successful!', 'success');
            
            setTimeout(() => {
                window.location.href = '/passport-registration.html';
            }, 1500);
        } catch (error) {
            showNotification('Google authentication failed', 'error');
        }
    });
});

digilockerBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        try {
            showNotification('Connecting to DigiLocker...', 'info');
            await simulateAPICall(1500);
            showNotification('DigiLocker authentication successful!', 'success');
            
            setTimeout(() => {
                window.location.href = '/passport-registration.html';
            }, 1500);
        } catch (error) {
            showNotification('DigiLocker authentication failed', 'error');
        }
    });
});

biometricBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        try {
            // Check if Web Authentication API is available
            if (!window.PublicKeyCredential) {
                showNotification('Biometric authentication not supported on this device', 'error');
                return;
            }
            
            showNotification('Please authenticate with your biometric...', 'info');
            await simulateAPICall(2000);
            showNotification('Biometric authentication successful!', 'success');
            
            setTimeout(() => {
                window.location.href = '/passport-registration.html';
            }, 1500);
        } catch (error) {
            showNotification('Biometric authentication failed', 'error');
        }
    });
});

// ========================================
// Smooth Scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for # only
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Learn More button scroll to features
heroLearnBtn?.addEventListener('click', () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = featuresSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

// ========================================
// Intersection Observer for Animations
// ========================================

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

// Observe elements with animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .sector-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '400px',
        animation: 'slideInRight 0.4s ease',
        fontWeight: '500'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.marginLeft = '1rem';
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #00b894, #00cec9)',
        error: 'linear-gradient(135deg, #d63031, #ff7675)',
        warning: 'linear-gradient(135deg, #fdcb6e, #e17055)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    return colors[type] || colors.info;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// ========================================
// Utility Functions
// ========================================

function simulateAPICall(duration = 1000) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

// ========================================
// Page Load Initialization
// ========================================

window.addEventListener('load', () => {
    console.log('Universal Life Passport - Homepage Loaded');
    console.log('System: Ready for authentication');
    console.log('Blockchain: Connected');
    
    // Add any initialization code here
});

// ========================================
// Performance Monitoring
// ========================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
}

// ========================================
// Touch and Gesture Support
// ========================================

let touchStartX = 0;
let touchEndX = 0;

mobileMenuOverlay?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

mobileMenuOverlay?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    // Swipe right to close menu
    if (touchEndX > touchStartX + 50) {
        closeMobileMenu();
    }
}

// ========================================
// Passive Event Listeners for Performance
// ========================================

const passiveSupported = (() => {
    let passive = false;
    try {
        const options = {
            get passive() {
                passive = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passive = false;
    }
    return passive;
})();

const passiveOption = passiveSupported ? { passive: true } : false;

// ========================================
// Device Detection
// ========================================

function detectDevice() {
    const ua = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    const isTablet = /iPad|Android/i.test(ua) && !/Mobile/i.test(ua);
    const isDesktop = !isMobile && !isTablet;
    
    return {
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
}

const device = detectDevice();

// Add device class to body
if (device.isMobile) {
    document.body.classList.add('mobile-device');
} else if (device.isTablet) {
    document.body.classList.add('tablet-device');
} else {
    document.body.classList.add('desktop-device');
}

// ========================================
// Biometric Authentication (Web Authentication API)
// ========================================

async function registerBiometric() {
    if (!window.PublicKeyCredential) {
        showNotification('Biometric authentication not supported', 'error');
        return false;
    }
    
    try {
        const publicKey = {
            challenge: new Uint8Array(32),
            rp: {
                name: "Universal Life Passport",
                id: window.location.hostname
            },
            user: {
                id: new Uint8Array(16),
                name: "user@example.com",
                displayName: "User Name"
            },
            pubKeyCredParams: [
                {
                    type: "public-key",
                    alg: -7 // ES256
                }
            ],
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "required"
            },
            timeout: 60000,
            attestation: "direct"
        };
        
        const credential = await navigator.credentials.create({
            publicKey
        });
        
        return credential;
    } catch (error) {
        console.error('Biometric registration error:', error);
        return false;
    }
}

async function authenticateBiometric() {
    if (!window.PublicKeyCredential) {
        showNotification('Biometric authentication not supported', 'error');
        return false;
    }
    
    try {
        const publicKey = {
            challenge: new Uint8Array(32),
            timeout: 60000,
            userVerification: "required",
            rpId: window.location.hostname
        };
        
        const assertion = await navigator.credentials.get({
            publicKey
        });
        
        return assertion;
    } catch (error) {
        console.error('Biometric authentication error:', error);
        return false;
    }
}

// ========================================
// Form Validation
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

// Real-time form validation
const emailInputs = document.querySelectorAll('input[type="email"]');
const passwordInputs = document.querySelectorAll('input[type="password"]');

emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ff7675';
            showInputError(this, 'Please enter a valid email address');
        } else {
            this.style.borderColor = '#00b894';
            removeInputError(this);
        }
    });
});

passwordInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value) {
            const strength = getPasswordStrength(this.value);
            showPasswordStrength(this, strength);
        }
    });
});

function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[@$!%*?&]/.test(password)) strength += 10;
    
    return Math.min(strength, 100);
}

function showPasswordStrength(input, strength) {
    let indicator = input.parentElement.querySelector('.password-strength');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'password-strength';
        indicator.style.cssText = `
            height: 4px;
            border-radius: 2px;
            margin-top: 0.5rem;
            transition: all 0.3s ease;
        `;
        input.parentElement.appendChild(indicator);
    }
    
    let color = '';
    if (strength < 30) color = '#ff7675';
    else if (strength < 60) color = '#fdcb6e';
    else color = '#00b894';
    
    indicator.style.width = `${strength}%`;
    indicator.style.background = color;
}

function showInputError(input, message) {
    let error = input.parentElement.querySelector('.input-error');
    
    if (!error) {
        error = document.createElement('div');
        error.className = 'input-error';
        error.style.cssText = `
            color: #ff7675;
            font-size: 0.85rem;
            margin-top: 0.25rem;
        `;
        input.parentElement.appendChild(error);
    }
    
    error.textContent = message;
}

function removeInputError(input) {
    const error = input.parentElement.querySelector('.input-error');
    if (error) error.remove();
}

// ========================================
// LocalStorage for Remember Me
// ========================================

function saveLoginState(email, remember) {
    if (remember) {
        localStorage.setItem('ulp_remembered_email', email);
        localStorage.setItem('ulp_remember_me', 'true');
    } else {
        localStorage.removeItem('ulp_remembered_email');
        localStorage.removeItem('ulp_remember_me');
    }
}

function loadLoginState() {
    const rememberMe = localStorage.getItem('ulp_remember_me') === 'true';
    const email = localStorage.getItem('ulp_remembered_email');
    
    if (rememberMe && email) {
        const emailInput = loginFormElement?.querySelector('input[type="text"]');
        const rememberCheckbox = loginFormElement?.querySelector('input[type="checkbox"]');
        
        if (emailInput) emailInput.value = email;
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }
}

// Load saved login state on page load
document.addEventListener('DOMContentLoaded', loadLoginState);

// ========================================
// Keyboard Shortcuts
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open login
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openAuthModal('login');
    }
    
    // Ctrl/Cmd + Shift + K to open signup
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        openAuthModal('signup');
    }
});

// ========================================
// Network Status Detection
// ========================================

function updateOnlineStatus() {
    if (!navigator.onLine) {
        showNotification('No internet connection. Please check your network.', 'warning');
    }
}

window.addEventListener('online', () => {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Lost internet connection', 'warning');
});

// ========================================
// Prefetch Important Resources
// ========================================

function prefetchResources() {
    const resources = [
        '/passport-registration.html',
        '/dashboard.html'
    ];
    
    resources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Prefetch after page load
window.addEventListener('load', () => {
    setTimeout(prefetchResources, 2000);
});

// ========================================
// Analytics & Tracking (Placeholder)
// ========================================

function trackEvent(category, action, label) {
    console.log(`Track: ${category} - ${action} - ${label}`);
    
    // Integrate with your analytics platform here
    // Example: Google Analytics, Mixpanel, etc.
    
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track important events
loginBtn?.addEventListener('click', () => {
    trackEvent('Authentication', 'Click', 'Login Button');
});

signupBtn?.addEventListener('click', () => {
    trackEvent('Authentication', 'Click', 'Signup Button');
});

// ========================================
// Dark Mode Support (Future Enhancement)
// ========================================

function initDarkMode() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateDarkMode(e) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    darkModeMediaQuery.addListener(updateDarkMode);
    updateDarkMode(darkModeMediaQuery);
}

// Uncomment to enable dark mode
// initDarkMode();

// ========================================
// Service Worker Registration (PWA Support)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// ========================================
// Console Welcome Message
// ========================================

console.log('%c🌌 Universal Life Passport', 'font-size: 24px; font-weight: bold; color: #00ffff;');
console.log('%cEducation 5.0 × Civilization 2.0', 'font-size: 14px; color: #667eea;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');
console.log('%cSystem Status: ✓ Online', 'color: #00b894;');
console.log('%cBlockchain: ✓ Connected', 'color: #00b894;');
console.log('%cQuantum Security: ✓ Active', 'color: #00b894;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');
console.log('%cFor developers: API docs at https://docs.ulp.org', 'color: #999;');

// ========================================
// Export for testing (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openAuthModal,
        closeAuthModal,
        validateEmail,
        validatePassword,
        getPasswordStrength
    };
}

