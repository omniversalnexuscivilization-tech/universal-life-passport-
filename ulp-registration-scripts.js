// ========================================
// ULP Registration Page JavaScript
// ========================================

// DOM Elements
const welcomeSection = document.getElementById('welcomeSection');
const registrationForm = document.getElementById('registrationForm');
const successSection = document.getElementById('successSection');
const startRegistration = document.getElementById('startRegistration');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const loadingSubtext = document.getElementById('loadingSubtext');

// Progress tracking
const currentStepEl = document.getElementById('currentStep');
const progressFill = document.getElementById('progressFill');

// Form steps
const formSteps = document.querySelectorAll('.form-step');
let currentStep = 1;
const totalSteps = 5;

// Form data storage
let formData = {};

// ========================================
// Start Registration
// ========================================

startRegistration?.addEventListener('click', () => {
    welcomeSection.style.display = 'none';
    registrationForm.style.display = 'block';
    updateProgress();
});

// ========================================
// Navigation Functions
// ========================================

function showStep(stepNumber) {
    formSteps.forEach(step => step.classList.remove('active'));
    const targetStep = document.getElementById(`step${stepNumber}`);
    if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepNumber;
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    currentStepEl.textContent = currentStep;
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
}

// Next buttons
document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const nextStep = parseInt(e.target.closest('.btn-next').dataset.next);
        const currentStepEl = e.target.closest('.form-step');
        
        if (validateStep(currentStepEl)) {
            saveStepData(currentStepEl);
            showStep(nextStep);
        }
    });
});

// Back buttons
document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const prevStep = parseInt(e.target.closest('.btn-back').dataset.prev);
        showStep(prevStep);
    });
});

// Edit buttons
document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const editStep = parseInt(e.target.dataset.edit);
        showStep(editStep);
    });
});

// ========================================
// Form Validation
// ========================================

function validateStep(stepElement) {
    const inputs = stepElement.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (!input.checked && input.name !== 'sectors') {
                isValid = false;
                showValidationError(input, 'This field is required');
            }
        } else if (!input.value.trim()) {
            isValid = false;
            showValidationError(input, 'This field is required');
        } else {
            removeValidationError(input);
        }
    });
    
    return isValid;
}

function showValidationError(input, message) {
    input.style.borderColor = '#ff7675';
    
    let errorEl = input.parentElement.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.style.cssText = 'color: #ff7675; font-size: 0.85rem; margin-top: 0.25rem;';
        input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

function removeValidationError(input) {
    input.style.borderColor = '#e0e0e0';
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.remove();
}

// Real-time validation
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            showValidationError(input, 'This field is required');
        } else {
            removeValidationError(input);
        }
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            removeValidationError(input);
        }
    });
});

// ========================================
// Sector Selection Logic
// ========================================

const sectorCheckboxes = document.querySelectorAll('input[name="sectors"]');
const sectorsCount = document.getElementById('sectorsCount');
const sectorsNextBtn = document.getElementById('sectorsNext');

function updateSectorCount() {
    const selectedCount = document.querySelectorAll('input[name="sectors"]:checked').length;
    sectorsCount.textContent = `${selectedCount} sector${selectedCount !== 1 ? 's' : ''} selected (minimum 3 required)`;
    
    if (selectedCount >= 3) {
        sectorsNextBtn.disabled = false;
        sectorsCount.style.color = '#00b894';
    } else {
        sectorsNextBtn.disabled = true;
        sectorsCount.style.color = '#ff7675';
    }
}

sectorCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateSectorCount);
});

// ========================================
// Save Step Data
// ========================================

function saveStepData(stepElement) {
    const inputs = stepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox' && input.name === 'sectors') {
            if (!formData.sectors) formData.sectors = [];
            if (input.checked && !formData.sectors.includes(input.value)) {
                formData.sectors.push(input.value);
            } else if (!input.checked) {
                formData.sectors = formData.sectors.filter(s => s !== input.value);
            }
        } else if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else {
            formData[input.name] = input.value;
        }
    });
    
    // Update review section if on step 5
    if (currentStep === 5) {
        updateReviewSection();
    }
}

// ========================================
// Review Section
// ========================================

function updateReviewSection() {
    // Personal Information
    const reviewPersonal = document.getElementById('reviewPersonal');
    reviewPersonal.innerHTML = `
        <div class="review-item">
            <span class="review-label">Full Name:</span>
            <span class="review-value">${formData.fullName || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Date of Birth:</span>
            <span class="review-value">${formData.dob || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Gender:</span>
            <span class="review-value">${formData.gender || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Nationality:</span>
            <span class="review-value">${formData.nationality || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Phone:</span>
            <span class="review-value">${formData.phone || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Email:</span>
            <span class="review-value">${formData.email || 'N/A'}</span>
        </div>
    `;
    
    // Address & Location
    const reviewAddress = document.getElementById('reviewAddress');
    reviewAddress.innerHTML = `
        <div class="review-item">
            <span class="review-label">Address:</span>
            <span class="review-value">${formData.address || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">City:</span>
            <span class="review-value">${formData.city || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">State:</span>
            <span class="review-value">${formData.state || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Country:</span>
            <span class="review-value">${formData.country || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Postal Code:</span>
            <span class="review-value">${formData.postalCode || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Bioregion:</span>
            <span class="review-value">${formData.bioregion || 'N/A'}</span>
        </div>
    `;
    
    // Selected Sectors
    const reviewSectors = document.getElementById('reviewSectors');
    if (formData.sectors && formData.sectors.length > 0) {
        const sectorBadges = formData.sectors.map(sector => {
            const sectorNames = {
                education: '🎓 Education',
                health: '🏥 Health',
                environment: '🌍 Environment',
                technology: '🔬 Technology',
                governance: '🏛️ Governance',
                economy: '💰 Economy',
                social: '👥 Social Impact',
                culture: '🎨 Culture & Arts',
                infrastructure: '🏗️ Infrastructure',
                research: '🔬 Research',
                resources: '📊 Resources',
                global: '🌐 Global Network'
            };
            return `<span style="display: inline-block; padding: 0.5rem 1rem; background: rgba(255, 215, 0, 0.2); border: 2px solid #FFD700; border-radius: 10px; margin: 0.25rem;">${sectorNames[sector] || sector}</span>`;
        }).join('');
        reviewSectors.innerHTML = `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${sectorBadges}</div>`;
    } else {
        reviewSectors.innerHTML = 'No sectors selected';
    }
    
    // Professional Profile
    const reviewProfile = document.getElementById('reviewProfile');
    reviewProfile.innerHTML = `
        <div class="review-item">
            <span class="review-label">Occupation:</span>
            <span class="review-value">${formData.occupation || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Education:</span>
            <span class="review-value">${formData.education || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Skills:</span>
            <span class="review-value">${formData.skills || 'N/A'}</span>
        </div>
        <div class="review-item">
            <span class="review-label">Goals:</span>
            <span class="review-value">${formData.goals || 'N/A'}</span>
        </div>
        ${formData.website ? `
        <div class="review-item">
            <span class="review-label">Website:</span>
            <span class="review-value">${formData.website}</span>
        </div>
        ` : ''}
    `;
}

// ========================================
// Terms Checkbox Logic
// ========================================

const termsCheckbox = document.getElementById('termsCheckbox');
const blockchainCheckbox = document.getElementById('blockchainCheckbox');
const submitBtn = document.getElementById('submitBtn');

function checkSubmitEnabled() {
    if (termsCheckbox?.checked && blockchainCheckbox?.checked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

termsCheckbox?.addEventListener('change', checkSubmitEnabled);
blockchainCheckbox?.addEventListener('change', checkSubmitEnabled);

// ========================================
// Form Submission
// ========================================

registrationForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!termsCheckbox.checked || !blockchainCheckbox.checked) {
        alert('Please accept all terms and conditions');
        return;
    }
    
    try {
        // Step 1: Preparing data
        showLoading('Preparing your data...', 'Encrypting information');
        await simulateAPICall(2000);
        
        // Step 2: Blockchain registration
        showLoading('Registering on Blockchain...', 'Creating your unique identity');
        await simulateAPICall(3000);
        
        // Step 3: Generating passport
        showLoading('Generating Your Passport...', 'Creating QR code and ID');
        await simulateAPICall(2000);
        
        // Step 4: Final verification
        showLoading('Final Verification...', 'Almost done!');
        await simulateAPICall(1500);
        
        hideLoading();
        
        // Generate ULP ID
        const ulpId = generateULPID();
        document.getElementById('generatedULPID').textContent = ulpId;
        
        // Show success section
        registrationForm.style.display = 'none';
        successSection.style.display = 'block';
        
        // Save to localStorage
        localStorage.setItem('ulp_registration_data', JSON.stringify({
            ...formData,
            ulpId,
            registrationDate: new Date().toISOString()
        }));
        
        // Track event
        console.log('Registration completed:', ulpId);
        
    } catch (error) {
        hideLoading();
        alert('Registration failed. Please try again.');
        console.error('Registration error:', error);
    }
});

// ========================================
// Success Actions
// ========================================

document.getElementById('goToDashboard')?.addEventListener('click', () => {
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});

document.getElementById('downloadPassport')?.addEventListener('click', () => {
    // Download PDF functionality
    alert('PDF download will be available once blockchain verification is complete (2-5 minutes)');
});

// ========================================
// Helper Functions
// ========================================

function showLoading(text, subtext) {
    loadingOverlay.classList.add('active');
    loadingText.textContent = text;
    loadingSubtext.textContent = subtext;
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function simulateAPICall(duration = 1000) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

function generateULPID() {
    const year = new Date().getFullYear();
    const random1 = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const random2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `#ULP-${year}-${random1}-${random2}`;
}

// ========================================
// Auto-save to localStorage
// ========================================

function autoSave() {
    localStorage.setItem('ulp_draft_registration', JSON.stringify({
        formData,
        currentStep,
        timestamp: Date.now()
    }));
}

// Auto-save every 30 seconds
setInterval(autoSave, 30000);

// ========================================
// Load Draft on Page Load
// ========================================

window.addEventListener('load', () => {
    const draft = localStorage.getItem('ulp_draft_registration');
    
    if (draft) {
        const { formData: savedData, currentStep: savedStep, timestamp } = JSON.parse(draft);
        
        // Check if draft is less than 24 hours old
        const hoursSinceLastSave = (Date.now() - timestamp) / (1000 * 60 * 60);
        
        if (hoursSinceLastSave < 24) {
            const shouldResume = confirm('We found a saved draft. Would you like to continue where you left off?');
            
            if (shouldResume) {
                formData = savedData;
                
                // Fill form fields
                Object.keys(formData).forEach(key => {
                    const input = document.querySelector(`[name="${key}"]`);
                    if (input) {
                        if (input.type === 'checkbox' && key === 'sectors') {
                            if (formData.sectors.includes(input.value)) {
                                input.checked = true;
                            }
                        } else if (input.type === 'checkbox') {
                            input.checked = formData[key];
                        } else {
                            input.value = formData[key];
                        }
                    }
                });
                
                // Update sector count
                updateSectorCount();
                
                // Show appropriate step
                welcomeSection.style.display = 'none';
                registrationForm.style.display = 'block';
                showStep(savedStep || 1);
            }
        }
    }
});

// ========================================
// Prevent accidental page close
// ========================================

window.addEventListener('beforeunload', (e) => {
    if (registrationForm.style.display !== 'none' && currentStep > 1) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// ========================================
// Keyboard shortcuts
// ========================================

document.addEventListener('keydown', (e) => {
    // Alt + Right Arrow - Next step
    if (e.altKey && e.key === 'ArrowRight' && currentStep < totalSteps) {
        const nextBtn = document.querySelector(`#step${currentStep} .btn-next`);
        if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
        }
    }
    
    // Alt + Left Arrow - Previous step
    if (e.altKey && e.key === 'ArrowLeft' && currentStep > 1) {
        const backBtn = document.querySelector(`#step${currentStep} .btn-back`);
        if (backBtn) {
            backBtn.click();
        }
    }
});

// ========================================
// Analytics & Tracking
// ========================================

function trackStep(stepNumber) {
    console.log(`📊 User reached step ${stepNumber}`);
    // Add your analytics code here
}

// Track step changes
const stepObserver = new MutationObserver(() => {
    trackStep(currentStep);
});

formSteps.forEach(step => {
    stepObserver.observe(step, {
        attributes: true,
        attributeFilter: ['class']
    });
});

// ========================================
// Console Welcome
// ========================================

console.log('%c🌌 Universal Life Passport - Registration', 'font-size: 20px; font-weight: bold; color: #FFD700;');
console.log('%cWelcome to the registration process!', 'font-size: 14px; color: #667eea;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');
console.log('%cKeyboard Shortcuts:', 'font-weight: bold; color: #FFD700;');
console.log('%cAlt + → : Next step', 'color: #999;');
console.log('%cAlt + ← : Previous step', 'color: #999;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');

// ========================================
// Initialize
// ========================================

updateProgress();
updateSectorCount();
console.log('✓ Registration system initialized');
console.log('✓ Auto-save enabled');
console.log('✓ Ready for user input');

