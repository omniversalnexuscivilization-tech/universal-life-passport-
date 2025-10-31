// ========================================
// ULP Dashboard JavaScript
// ========================================

// Load user data from localStorage
let userData = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    initializeDashboard();
    startLiveUpdates();
    updateDateTime();
    populateAllSections();
});

// ========================================
// Load User Data
// ========================================

function loadUserData() {
    const savedData = localStorage.getItem('ulp_registration_data');
    
    if (savedData) {
        userData = JSON.parse(savedData);
        console.log('User data loaded:', userData);
    } else {
        // Sample data for demonstration
        userData = {
            fullName: "John Doe",
            ulpId: "#ULP-2025-247-8934",
            dob: "1990-01-15",
            gender: "male",
            nationality: "India",
            phone: "+91 98765-43210",
            email: "john.doe@example.com",
            address: "123 Main Street",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001",
            country: "India",
            bioregion: "South Asia",
            occupation: "Software Engineer",
            education: "Graduate",
            skills: "JavaScript, React, Node.js, Blockchain Development",
            goals: "Contributing to Education 5.0 by building scalable learning platforms",
            website: "https://johndoe.com",
            sectors: ["education", "technology", "environment", "health", "governance", "economy"],
            registrationDate: "2025-10-28",
            lci: 77,
            totalContributions: 142,
            activeSectors: 6,
            globalRank: 1247
        };
        localStorage.setItem('ulp_registration_data', JSON.stringify(userData));
    }
}

// ========================================
// Initialize Dashboard
// ========================================

function initializeDashboard() {
    // Sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    const pageTitle = document.getElementById('pageTitle');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked
            item.classList.add('active');
            const sectionId = item.dataset.section + '-section';
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Update page title
                const titles = {
                    'overview': 'Dashboard Overview',
                    'passport': 'My Passport',
                    'profile': 'Full Profile',
                    'contributions': 'My Contributions',
                    'sectors': 'Sector Details',
                    'portfolio': 'Portfolio',
                    'analytics': 'Analytics & Reports',
                    'downloads': 'Downloads'
                };
                
                pageTitle.textContent = titles[item.dataset.section] || 'Dashboard';
            }
        });
    });
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    mobileMenuBtn?.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
    });
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn?.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('ulp_auth_token');
            window.location.href = 'index.html';
        }
    });
}

// ========================================
// Populate All Sections
// ========================================

function populateAllSections() {
    populateUserInfo();
    populateOverview();
    populatePassport();
    populateProfile();
    populateContributions();
    populateSectors();
    populatePortfolio();
    populateAnalytics();
}

// ========================================
// Populate User Info
// ========================================

function populateUserInfo() {
    document.getElementById('userName').textContent = userData.fullName?.split(' ')[0] || 'User';
    document.getElementById('userNameWelcome').textContent = userData.fullName?.split(' ')[0] || 'User';
}

// ========================================
// Update Date and Time
// ========================================

function updateDateTime() {
    const now = new Date();
    
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
    
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
    
    // Update last update time
    document.getElementById('lastUpdate').textContent = 'Just now';
    
    // Update every second
    setTimeout(updateDateTime, 1000);
}

// ========================================
// Live Updates
// ========================================

function startLiveUpdates() {
    // Simulate live updates every 30 seconds
    setInterval(() => {
        const lastUpdate = document.getElementById('lastUpdate');
        const now = new Date();
        lastUpdate.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        // Randomly update stats (simulation)
        if (Math.random() > 0.7) {
            const currentLCI = parseInt(document.getElementById('lciScore').textContent);
            document.getElementById('lciScore').textContent = currentLCI + Math.floor(Math.random() * 2);
        }
    }, 30000);
}

// ========================================
// Populate Overview
// ========================================

function populateOverview() {
    // Update stats
    document.getElementById('lciScore').textContent = userData.lci || 77;
    document.getElementById('activeSectors').textContent = userData.activeSectors || 6;
    document.getElementById('totalContributions').textContent = userData.totalContributions || 142;
    document.getElementById('globalRank').textContent = userData.globalRank || 1247;
    
    // Activity timeline
    const activities = [
        { icon: '🎓', title: 'Education Contribution', desc: 'Completed online course on Sustainable Development', time: '2 hours ago' },
        { icon: '🌍', title: 'Environment Action', desc: 'Participated in tree planting drive - 50 trees planted', time: '5 hours ago' },
        { icon: '🔬', title: 'Technology Innovation', desc: 'Submitted blockchain solution for healthcare tracking', time: '1 day ago' },
        { icon: '🏥', title: 'Health Initiative', desc: 'Volunteer work at community health center', time: '2 days ago' },
        { icon: '🏛️', title: 'Governance Participation', desc: 'Attended local community governance meeting', time: '3 days ago' }
    ];
    
    const activityTimeline = document.getElementById('activityTimeline');
    activityTimeline.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-desc">${activity.desc}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// ========================================
// Populate Passport
// ========================================

function populatePassport() {
    document.getElementById('passportName').textContent = userData.fullName?.toUpperCase() || 'CITIZEN NAME';
    document.getElementById('passportULPID').textContent = userData.ulpId || '#ULP-2025-XXX-XXXX';
    document.getElementById('passportDOB').textContent = formatDate(userData.dob) || '01/01/1990';
    document.getElementById('passportNationality').textContent = userData.nationality || 'Earth Citizen';
    document.getElementById('passportLCI').textContent = userData.lci || 77;
    document.getElementById('passportLCIBar').style.width = `${userData.lci || 77}%`;
    
    // Address
    const address = `${userData.address || 'Street Address'}, ${userData.city || 'City'}, ${userData.state || 'State'}, ${userData.postalCode || 'Postal Code'}<br>${userData.country || 'Country'}, ${userData.bioregion || 'Bioregion'}`;
    document.getElementById('passportAddress').innerHTML = address;
    
    // Sectors
    if (userData.sectors && userData.sectors.length > 0) {
        const sectorIcons = {
            education: '🎓',
            health: '🏥',
            environment: '🌍',
            technology: '🔬',
            governance: '🏛️',
            economy: '💰',
            social: '👥',
            culture: '🎨',
            infrastructure: '🏗️',
            research: '🔬',
            resources: '📊',
            global: '🌐'
        };
        
        const sectorsHTML = userData.sectors.map(sector => 
            `<span class="sector-badge" title="${sector}">${sectorIcons[sector] || '🌐'}</span>`
        ).join('');
        
        document.getElementById('passportSectors').innerHTML = sectorsHTML;
    }
    
    // Issue date
    document.getElementById('issueDate').textContent = formatDate(userData.registrationDate) || '28 Oct 2025';
    
    // Stats
    document.getElementById('memberSince').textContent = formatMonthYear(userData.registrationDate) || 'Oct 2025';
    document.getElementById('bioregionStat').textContent = userData.bioregion || 'South Asia';
    
    // Blockchain hash (simulated)
    document.getElementById('blockchainHash').textContent = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`;
}

// ========================================
// Populate Profile
// ========================================

function populateProfile() {
    // Personal Information
    const personalInfo = document.getElementById('personalInfo');
    personalInfo.innerHTML = `
        <div class="profile-row">
            <span class="profile-label">Full Name:</span>
            <span class="profile-value">${userData.fullName || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Date of Birth:</span>
            <span class="profile-value">${formatDate(userData.dob) || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Gender:</span>
            <span class="profile-value">${capitalize(userData.gender) || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Nationality:</span>
            <span class="profile-value">${userData.nationality || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Phone:</span>
            <span class="profile-value">${userData.phone || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Email:</span>
            <span class="profile-value">${userData.email || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Address:</span>
            <span class="profile-value">${userData.city || 'N/A'}, ${userData.country || 'N/A'}</span>
        </div>
    `;
    
    // Professional Information
    const professionalInfo = document.getElementById('professionalInfo');
    professionalInfo.innerHTML = `
        <div class="profile-row">
            <span class="profile-label">Occupation:</span>
            <span class="profile-value">${userData.occupation || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Education:</span>
            <span class="profile-value">${capitalize(userData.education) || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">ULP ID:</span>
            <span class="profile-value">${userData.ulpId || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Member Since:</span>
            <span class="profile-value">${formatMonthYear(userData.registrationDate) || 'N/A'}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">Bioregion:</span>
            <span class="profile-value">${userData.bioregion || 'N/A'}</span>
        </div>
        ${userData.website ? `
        <div class="profile-row">
            <span class="profile-label">Website:</span>
            <span class="profile-value"><a href="${userData.website}" target="_blank">${userData.website}</a></span>
        </div>
        ` : ''}
    `;
    
    // Skills
    if (userData.skills) {
        const skills = userData.skills.split(',').map(s => s.trim());
        const skillsHTML = skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        document.getElementById('skillsContainer').innerHTML = skillsHTML;
    }
    
    // Goals
    document.getElementById('goalsContent').textContent = userData.goals || 'No goals specified yet.';
}

// ========================================
// Populate Contributions
// ========================================

function populateContributions() {
    const contributions = [
        {
            title: 'Online Learning Platform Development',
            sector: '🎓 Education',
            desc: 'Built a scalable e-learning platform serving 5,000+ students with interactive courses and real-time collaboration features.',
            date: '2025-10-25',
            lci: 15
        },
        {
            title: 'Community Health Awareness Campaign',
            sector: '🏥 Health',
            desc: 'Organized health screening camps reaching 2,000+ people in rural areas with focus on preventive healthcare.',
            date: '2025-10-20',
            lci: 12
        },
        {
            title: 'Tree Plantation Drive',
            sector: '🌍 Environment',
            desc: 'Led initiative planting 500 trees in degraded forest areas, involving 100+ volunteers from local community.',
            date: '2025-10-15',
            lci: 10
        },
        {
            title: 'Blockchain Solution for Supply Chain',
            sector: '🔬 Technology',
            desc: 'Developed blockchain-based transparency solution for agricultural supply chain benefiting 50+ farmers.',
            date: '2025-10-10',
            lci: 18
        },
        {
            title: 'Local Governance Workshop',
            sector: '🏛️ Governance',
            desc: 'Conducted workshop on participatory governance attended by 75 community members and local officials.',
            date: '2025-10-05',
            lci: 8
        }
    ];
    
    const contributionsList = document.getElementById('contributionsList');
    contributionsList.innerHTML = contributions.map(contrib => `
        <div class="contribution-card">
            <div class="contrib-header">
                <div class="contrib-title">${contrib.title}</div>
                <div class="contrib-sector">${contrib.sector}</div>
            </div>
            <div class="contrib-desc">${contrib.desc}</div>
            <div class="contrib-footer">
                <span>LCI Impact: +${contrib.lci}</span>
                <span>${formatDate(contrib.date)}</span>
            </div>
        </div>
    `).join('');
}

// ========================================
// Populate Sectors
// ========================================

function populateSectors() {
    const sectorData = [
        { name: 'Education', icon: '🎓', lci: 15, contributions: 28, progress: 75 },
        { name: 'Technology', icon: '🔬', lci: 18, contributions: 35, progress: 90 },
        { name: 'Environment', icon: '🌍', lci: 12, contributions: 22, progress: 60 },
        { name: 'Health', icon: '🏥', lci: 14, contributions: 25, progress: 70 },
        { name: 'Governance', icon: '🏛️', lci: 10, contributions: 18, progress: 50 },
        { name: 'Economy', icon: '💰', lci: 8, contributions: 14, progress: 40 }
    ];
    
    const sectorsDetailed = document.getElementById('sectorsDetailed');
    sectorsDetailed.innerHTML = sectorData.map(sector => `
        <div class="sector-detail-card">
            <div class="sector-detail-header">
                <div class="sector-detail-title">
                    <div class="sector-detail-icon">${sector.icon}</div>
                    <div>
                        <h3>${sector.name}</h3>
                        <p style="color: #666; font-size: 0.9rem;">${sector.contributions} contributions</p>
                    </div>
                </div>
                <div class="sector-detail-lci">LCI: ${sector.lci}</div>
            </div>
            <div class="sector-progress-bar">
                <div class="sector-progress-fill" style="width: ${sector.progress}%"></div>
            </div>
            <p style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">Progress: ${sector.progress}%</p>
        </div>
    `).join('');
}

// ========================================
// Populate Portfolio
// ========================================

function populatePortfolio() {
    const portfolioItems = [
        {
            year: '2025',
            projects: [
                { month: 'Oct', title: 'E-Learning Platform Launch', type: 'Education', status: 'Completed' },
                { month: 'Sep', title: 'Blockchain Supply Chain', type: 'Technology', status: 'In Progress' },
                { month: 'Aug', title: 'Community Health Drive', type: 'Health', status: 'Completed' }
            ]
        },
        {
            year: '2024',
            projects: [
                { month: 'Dec', title: 'Environmental Assessment', type: 'Environment', status: 'Completed' },
                { month: 'Nov', title: 'Governance Workshop Series', type: 'Governance', status: 'Completed' }
            ]
        }
    ];
    
    const portfolioTimeline = document.getElementById('portfolioTimeline');
    portfolioTimeline.innerHTML = portfolioItems.map(yearGroup => `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${yearGroup.year}</h3>
            </div>
            ${yearGroup.projects.map(project => `
                <div class="activity-item" style="margin-bottom: 1rem;">
                    <div class="activity-icon">📂</div>
                    <div class="activity-content">
                        <div class="activity-title">${project.title}</div>
                        <div class="activity-desc">${project.type} • ${project.status}</div>
                        <div class="activity-time">${project.month} ${yearGroup.year}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// ========================================
// Populate Analytics
// ========================================

function populateAnalytics() {
    // LCI Chart (simple text representation)
    const lciCanvas = document.getElementById('lciCanvas');
    if (lciCanvas) {
        const ctx = lciCanvas.getContext('2d');
        lciCanvas.width = lciCanvas.parentElement.clientWidth;
        lciCanvas.height = 300;
        
        // Simple line chart simulation
        ctx.clearRect(0, 0, lciCanvas.width, lciCanvas.height);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const points = [45, 52, 58, 65, 68, 72, 77];
        const step = lciCanvas.width / (points.length - 1);
        
        points.forEach((point, i) => {
            const x = i * step;
            const y = lciCanvas.height - (point / 100) * lciCanvas.height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    }
    
    // Activity Heatmap
    const activityHeatmap = document.getElementById('activityHeatmap');
    let heatmapHTML = '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem;">';
    
    for (let i = 0; i < 56; i++) {
        const intensity = Math.floor(Math.random() * 5);
        const color = intensity === 0 ? '#e0e0e0' : 
                     intensity === 1 ? '#FFE0B2' :
                     intensity === 2 ? '#FFD54F' :
                     intensity === 3 ? '#FFC107' : '#FFD700';
        
        heatmapHTML += `<div style="width: 30px; height: 30px; background: ${color}; border-radius: 4px;"></div>`;
    }
    
    heatmapHTML += '</div>';
    activityHeatmap.innerHTML = heatmapHTML;
}

// ========================================
// Download Functions
// ========================================

function downloadPassportPDF() {
    alert('Generating your ULP Passport Card PDF...\n\nThis will include:\n• Full passport card with all details\n• QR code for verification\n• Blockchain verification hash\n• All sector badges\n\nThe download will start in a moment.');
    
    // Simulate PDF generation
    setTimeout(() => {
        const filename = `ULP_Passport_${userData.ulpId?.replace('#', '')}.pdf`;
        console.log(`Downloading: ${filename}`);
        alert('PDF download complete! Check your downloads folder.');
    }, 2000);
}

function printPassport() {
    window.print();
}

function sharePassport() {
    const shareText = `Check out my Universal Life Passport!\nULP ID: ${userData.ulpId}\nLCI Score: ${userData.lci}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Universal Life Passport',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText);
        alert('Passport details copied to clipboard!');
    }
}

function downloadCV() {
    alert('Generating your complete CV/Resume PDF...\n\nThis will include:\n• Personal & professional information\n• All skills and expertise\n• Contribution history\n• Sector achievements\n• LCI breakdown\n\nThe download will start in a moment.');
    
    setTimeout(() => {
        const filename = `CV_${userData.fullName?.replace(/\s+/g, '_')}.pdf`;
        console.log(`Downloading: ${filename}`);
        alert('CV PDF download complete!');
    }, 2000);
}

function downloadCertificates() {
    alert('Downloading all certificates...');
}

function downloadReports() {
    alert('Generating analytics reports...');
}

function logContribution() {
    alert('Log New Contribution\n\nThis feature allows you to add your latest contributions across sectors and track your LCI impact.');
}

function addPortfolioItem() {
    alert('Add Portfolio Project\n\nAdd a new project or achievement to your contribution portfolio.');
}

function editProfile() {
    alert('Edit Profile\n\nUpdate your personal information, skills, and contribution goals.');
}

// ========================================
// Utility Functions
// ========================================

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatMonthYear(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ========================================
// Console Welcome
// ========================================

console.log('%c🌌 Universal Life Passport - Dashboard', 'font-size: 20px; font-weight: bold; color: #FFD700;');
console.log('%cDashboard loaded successfully!', 'font-size: 14px; color: #667eea;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');
console.log('%c✓ User data loaded', 'color: #00b894;');
console.log('%c✓ Live updates active', 'color: #00b894;');
console.log('%c✓ All sections populated', 'color: #00b894;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;');

