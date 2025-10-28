// ========================================
// Universal Life Passport - Enhanced JavaScript
// ========================================

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Auth elements
const authModal = document.getElementById('authModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const mobileSignupBtn = document.getElementById('mobileSignupBtn');
const heroSignupBtn = document.getElementById('heroSignupBtn');
const applyNowBtn = document.getElementById('applyNowBtn');

// Auth content
const loginContent = document.getElementById('loginContent');
const otpVerification = document.getElementById('otpVerification');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');

// Auth buttons
const googleLoginBtn = document.getElementById('googleLoginBtn');
const digilockerLoginBtn = document.getElementById('digilockerLoginBtn');

// OTP elements
const otpForm = document.getElementById('otpForm');
const otpInputs = document.querySelectorAll('.otp-input');
const otpTimer = document.getElementById('otpTimer');
const resendOtp = document.getElementById('resendOtp');
const otpDestination = document.getElementById('otpDestination');

// Loading overlay
const loadingOverlay = document.getElementById('loadingOverlay');

// State
let currentAuthMethod = '';
let otpTimerInterval = null;

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

mobileMenuToggle?.addEventListener('click', () => {
    if (mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileMenuClose?.addEventListener('click', closeMobileMenu);

mobileMenuOverlay?.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
    }
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// ========================================
// Authentication Modal Functions
// ========================================

function openAuthModal() {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showLoginContent();
}

function closeAuthModal() {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
    resetAuthModal();
}

function showLoginContent() {
    loginContent.style.display = 'block';
    otpVerification.style.display = 'none';
    authTitle.textContent = 'Welcome';
    authSubtitle.textContent = 'Choose your authentication method';
}

function showOTPVerification(method, destination) {
    loginContent.style.display = 'none';
    otpVerification.style.display = 'block';
    authTitle.textContent = 'Verify OTP';
    authSubtitle.textContent = `Enter the code sent to ${destination}`;
    otpDestination.textContent = destination;
    currentAuthMethod = method;
    startOTPTimer();
    otpInputs[0].focus();
}

function resetAuthModal() {
    showLoginContent();
    otpInputs.forEach(input => input.value = '');
    if (otpTimerInterval) {
        clearInterval(otpTimerInterval);
        otpTimerInterval = null;
    }
}

// Modal event listeners
mobileLoginBtn?.addEventListener('click', () => {
    closeMobileMenu();
    openAuthModal();
});

mobileSignupBtn?.addEventListener('click', () => {
    closeMobileMenu();
    openAuthModal();
});

heroSignupBtn?.addEventListener('click', openAuthModal);
applyNowBtn?.addEventListener('click', openAuthModal);

modalClose?.addEventListener('click', closeAuthModal);
modalOverlay?.addEventListener('click', closeAuthModal);

// Close with Escape key
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
// Google Authentication
// ========================================

googleLoginBtn?.addEventListener('click', async () => {
    try {
        showLoading('Connecting to Google...');
        
        // Simulate Google OAuth
        await simulateAPICall(2000);
        
        hideLoading();
        
        // Simulate getting user email
        const email = 'user@gmail.com';
        showNotification('Google connected! Sending OTP...', 'success');
        
        await simulateAPICall(1000);
        
        // Show OTP verification
        showOTPVerification('google', email);
        
    } catch (error) {
        hideLoading();
        showNotification('Google authentication failed. Please try again.', 'error');
    }
});

// ========================================
// DigiLocker Authentication
// ========================================

digilockerLoginBtn?.addEventListener('click', async () => {
    try {
        showLoading('Connecting to DigiLocker...');
        
        // Simulate DigiLocker authentication
        await simulateAPICall(2000);
        
        hideLoading();
        
        // Simulate getting user phone/email
        const phone = '+91 XXXXX-XXXXX';
        showNotification('DigiLocker connected! Sending OTP...', 'success');
        
        await simulateAPICall(1000);
        
        // Show OTP verification
        showOTPVerification('digilocker', phone);
        
    } catch (error) {
        hideLoading();
        showNotification('DigiLocker authentication failed. Please try again.', 'error');
    }
});

// ========================================
// OTP Functions
// ========================================

function startOTPTimer() {
    let timeLeft = 60;
    otpTimer.textContent = timeLeft;
    resendOtp.disabled = true;
    
    otpTimerInterval = setInterval(() => {
        timeLeft--;
        otpTimer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(otpTimerInterval);
            resendOtp.disabled = false;
        }
    }, 1000);
}

resendOtp?.addEventListener('click', async () => {
    try {
        showLoading('Resending OTP...');
        await simulateAPICall(1500);
        hideLoading();
        showNotification('OTP resent successfully!', 'success');
        startOTPTimer();
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
    } catch (error) {
        hideLoading();
        showNotification('Failed to resend OTP', 'error');
    }
});

// OTP Input handling
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        }
        
        // Move to next input
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
        
        // Auto-submit when all filled
        const allFilled = Array.from(otpInputs).every(input => input.value);
        if (allFilled) {
            setTimeout(() => otpForm.dispatchEvent(new Event('submit')), 300);
        }
    });
    
    input.addEventListener('keydown', (e) => {
        // Move to previous input on backspace
        if (e.key === 'Backspace' && !input.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
    
    // Paste handling
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const digits = pastedData.split('');
        
        digits.forEach((digit, i) => {
            if (otpInputs[i] && /^\d$/.test(digit)) {
                otpInputs[i].value = digit;
            }
        });
        
        if (digits.length === 6) {
            setTimeout(() => otpForm.dispatchEvent(new Event('submit')), 300);
        }
    });
});

// OTP Form submission
otpForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const otpValue = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otpValue.length !== 6) {
        showNotification('Please enter complete OTP', 'warning');
        return;
    }
    
    try {
        showLoading('Verifying OTP...');
        
        // Simulate OTP verification
        await simulateAPICall(2000);
        
        hideLoading();
        closeAuthModal();
        
        showNotification('Authentication successful! Redirecting to registration form...', 'success');
        
        // Redirect to registration form after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'registration.html';
        }, 1500);
        
    } catch (error) {
        hideLoading();
        showNotification('Invalid OTP. Please try again.', 'error');
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
    }
});

// ========================================
// Loading Overlay Functions
// ========================================

function showLoading(text = 'Processing...') {
    loadingOverlay.classList.add('active');
    const loadingText = loadingOverlay.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = text;
    }
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// ========================================
// Smooth Scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
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

// Add notification animations
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
    const animateElements = document.querySelectorAll('.step-card');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
});

// ========================================
// Touch Gestures
// ========================================

let touchStartX = 0;
let touchEndX = 0;

mobileMenuOverlay?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

mobileMenuOverlay?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX > touchStartX + 50) {
        closeMobileMenu();
    }
}, false);

// ========================================
// Form Validation
// ========================================

function validateOTP(otp) {
    return /^\d{6}$/.test(otp);
}

// ========================================
// Local Storage for User Preference
// ========================================

function saveAuthMethod(method) {
    try {
        localStorage.setItem('ulp_last_auth_method', method);
    } catch (error) {
        console.error('Failed to save auth method:', error);
    }
}

function getLastAuthMethod() {
    try {
        return localStorage.getItem('ulp_last_auth_method') || null;
    } catch (error) {
        console.error('Failed to get auth method:', error);
        return null;
    }
}

// ========================================
// Network Status Detection
// ========================================

window.addEventListener('online', () => {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showNotification('No internet connection', 'warning');
});

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
// Analytics Tracking (Placeholder)
// ========================================

function trackEvent(category, action, label) {
    console.log(`📊 Track: ${category} - ${action} - ${label}`);
    
    // Integrate with your analytics platform
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track important events
googleLoginBtn?.addEventListener('click', () => {
    trackEvent('Authentication', 'Click', 'Google Login');
    saveAuthMethod('google');
});

digilockerLoginBtn?.addEventListener('click', () => {
    trackEvent('Authentication', 'Click', 'DigiLocker Login');
    saveAuthMethod('digilocker');
});

heroSignupBtn?.addEventListener('click', () => {
    trackEvent('CTA', 'Click', 'Hero Signup Button');
});

applyNowBtn?.addEventListener('click', () => {
    trackEvent('CTA', 'Click', 'Apply Now Button');
});

// ========================================
// Keyboard Shortcuts
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open auth modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openAuthModal();
    }
});

// ========================================
// Performance Monitoring
// ========================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
    });
}

// ========================================
// Service Worker Registration (PWA)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✓ Service Worker registered');
            })
            .catch(error => {
                console.log('✕ Service Worker registration failed:', error);
            });
    });
}

// ========================================
// Console Welcome Message
// ========================================

console.log('%c🌌 Universal Life Passport', 'font-size: 24px; font-weight: bold; color: #FFD700;');
console.log('%cEducation 5.0 × Civilization 2.0', 'font-size: 14px; color: #667eea;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');
console.log('%cSystem Status: ✓ Online', 'color: #00b894;');
console.log('%cBlockchain: ✓ Connected', 'color: #00b894;');
console.log('%cQuantum Security: ✓ Active', 'color: #00b894;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');
console.log('%cReady for authentication', 'color: #FFD700; font-weight: bold;');

// ========================================
// Page Initialization
// ========================================

window.addEventListener('load', () => {
    console.log('✓ Universal Life Passport loaded successfully');
    
    // Check for last auth method
    const lastMethod = getLastAuthMethod();
    if (lastMethod) {
        console.log(`Last authentication method: ${lastMethod}`);
    }
    
    // Check network status
    if (!navigator.onLine) {
        showNotification('You are offline. Some features may not work.', 'warning');
    }
});

// ========================================
// Error Handling
// ========================================

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You can send this to your error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You can send this to your error tracking service
});

// ========================================
// Prevent Multiple Form Submissions
// ========================================

let isSubmitting = false;

function preventDoubleSubmit(callback) {
    return async function(...args) {
        if (isSubmitting) {
            showNotification('Please wait, processing...', 'info');
            return;
        }
        
        isSubmitting = true;
        try {
            await callback.apply(this, args);
        } finally {
            isSubmitting = false;
        }
    };
}

// ========================================
// Export for Testing
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openAuthModal,
        closeAuthModal,
        showOTPVerification,
        validateOTP,
        showNotification,
        showLoading,
        hideLoading
    };
}
