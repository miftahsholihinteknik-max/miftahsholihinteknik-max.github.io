/**
 * Academic Portal - Miftahus Sholihin
 * Main JavaScript File
 * Version: 2.0
 */

// ============================================
// 1. UTILITY FUNCTIONS
// ============================================

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHTML(text) {
    if (!text && text !== 0) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, char => map[char] || char);
}

/**
 * Fetch JSON data with fallback
 * @param {string} file - File path to fetch
 * @param {*} fallback - Fallback data if fetch fails
 * @returns {Promise<*>} JSON data or fallback
 */
async function getJSON(file, fallback) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`⚠️ Failed to load ${file}:`, error.message);
        return fallback;
    }
}

// ============================================
// 2. FALLBACK DATA
// ============================================

const FALLBACK_PROFILE = {
    stats: [
        ["AI / ML", "Focus"],
        ["Deep Learning", "Research"],
        ["Computer Vision", "Focus"],
        ["Smart Agriculture", "Application"]
    ],
    links: [
        ["Google Scholar", "https://scholar.google.com/citations?user=RNCkAXAAAAAJ&hl=id&oi=ao"],
        ["SINTA", "https://sinta.kemdiktisaintek.go.id/authors/profile/6019553"],
        ["ORCID", "#"],
        ["GitHub", "https://github.com/miftahsholihinteknik-max"]
    ],
    skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Image Processing",
        "Python"
    ],
    research: [
        ["01", "Artificial Intelligence", "Sistem cerdas untuk klasifikasi, prediksi, diagnosis, dan pengambilan keputusan berbasis data."],
        ["02", "Computer Vision", "Deep learning untuk klasifikasi citra, deteksi objek, dan analisis visual."],
        ["03", "Smart Agriculture", "AI untuk pertanian presisi, diagnosis tanaman, prediksi lingkungan, dan monitoring."]
    ],
    contact: [
        ["Email", "Tambahkan email akademik", "#"],
        ["Institution", "Universitas Islam Lamongan", "#"],
        ["GitHub", "miftahsholihinteknik-max", "https://github.com/miftahsholihinteknik-max"]
    ]
};

const FALLBACK_PUBS = [
    ["2025", "Deep Learning for Plant Disease Classification", "Journal / Publisher", "https://doi.org/"],
    ["2025", "LSTM-Based Environmental Prediction", "Journal / Publisher", "https://doi.org/"],
    ["2024", "Explainable AI for Precision Agriculture", "Journal / Publisher", "https://doi.org/"]
];

const FALLBACK_COURSES = [
    {
        code: "IF4501",
        name: "Machine Learning",
        description: "Konsep, algoritma, implementasi, evaluasi, dan pengembangan model.",
        meetings: 16
    },
    {
        code: "—",
        name: "Artificial Intelligence",
        description: "Konsep kecerdasan buatan dan sistem cerdas.",
        meetings: 16
    },
    {
        code: "—",
        name: "Pengolahan Citra Digital",
        description: "Pengolahan citra dan implementasi computer vision.",
        meetings: 16
    },
    {
        code: "—",
        name: "Struktur Data",
        description: "Struktur data, algoritma, dan kompleksitas.",
        meetings: 16
    }
];

const FALLBACK_RESOURCES = [
    {
        course: "Machine Learning",
        meeting: 1,
        title: "Pengantar Machine Learning",
        type: "PDF",
        description: "Konsep dasar, paradigma, dan workflow machine learning.",
        url: "materials/machine-learning/pertemuan-01/README.txt"
    },
    {
        course: "Machine Learning",
        meeting: 2,
        title: "Data Preprocessing",
        type: "PDF",
        description: "Data cleaning, transformation, encoding, dan scaling.",
        url: "materials/machine-learning/pertemuan-02/README.txt"
    },
    {
        course: "Machine Learning",
        meeting: 3,
        title: "Regression",
        type: "PDF",
        description: "Konsep regresi dan evaluasi model.",
        url: "materials/machine-learning/pertemuan-03/README.txt"
    },
    {
        course: "Machine Learning",
        meeting: 4,
        title: "Classification",
        type: "PDF",
        description: "Konsep klasifikasi dan evaluasi model.",
        url: "materials/machine-learning/pertemuan-04/README.txt"
    }
];

// ============================================
// 3. RENDER FUNCTIONS
// ============================================

/**
 * Render statistics section
 */
function renderStats(data) {
    const container = document.getElementById('stats');
    if (!container) return;
    
    container.innerHTML = data.stats.map(item => `
        <div class="number">
            <strong>${escapeHTML(item[0])}</strong>
            <span>${escapeHTML(item[1])}</span>
        </div>
    `).join('');
}

/**
 * Render social links
 */
function renderLinks(data) {
    const container = document.getElementById('links');
    if (!container) return;
    
    container.innerHTML = data.links.map(item => `
        <a href="${escapeHTML(item[1])}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(item[0])}
        </a>
    `).join('');
}

/**
 * Render skills tags
 */
function renderSkills(data) {
    const container = document.getElementById('skills');
    if (!container) return;
    
    container.innerHTML = data.skills.map(skill => `
        <span class="skill">${escapeHTML(skill)}</span>
    `).join('');
}

/**
 * Render research items
 */
function renderResearch(data) {
    const container = document.getElementById('researchGrid');
    if (!container) return;
    
    container.innerHTML = data.research.map(item => `
        <article class="research">
            <span class="index">${escapeHTML(item[0])}</span>
            <h3>${escapeHTML(item[1])}</h3>
            <p>${escapeHTML(item[2])}</p>
        </article>
    `).join('');
}

/**
 * Render contact information
 */
function renderContact(data) {
    const container = document.getElementById('contactData');
    if (!container) return;
    
    container.innerHTML = data.contact.map(item => `
        <div class="contact-item">
            <label>${escapeHTML(item[0])}</label>
            <a href="${escapeHTML(item[2])}" target="_blank" rel="noopener noreferrer">
                ${escapeHTML(item[1])}
            </a>
        </div>
    `).join('');
}

/**
 * Render publications with filters
 */
function renderPublications(data) {
    const container = document.getElementById('pubs');
    const filterContainer = document.getElementById('pubFilters');
    if (!container || !filterContainer) return;
    
    // Get unique years
    const years = [...new Set(data.map(item => String(item[0])))].sort((a, b) => b - a);
    
    // Render filters
    filterContainer.innerHTML = ['All', ...years].map((year, index) => `
        <button class="filter ${index === 0 ? 'active' : ''}" data-filter="${escapeHTML(year)}">
            ${escapeHTML(year)}
        </button>
    `).join('');
    
    // Render publications
    container.innerHTML = data.map(item => `
        <article class="publication" data-year="${escapeHTML(item[0])}">
            <div class="year">${escapeHTML(item[0])}</div>
            <div>
                <h3>${escapeHTML(item[1])}</h3>
                <div class="meta">${escapeHTML(item[2])}</div>
            </div>
            <a href="${escapeHTML(item[3])}" target="_blank" rel="noopener noreferrer">
                DOI ↗
            </a>
        </article>
    `).join('');
    
    // Setup filter click events
    document.querySelectorAll('.filter').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter publications
            const filterValue = this.dataset.filter;
            document.querySelectorAll('.publication').forEach(pub => {
                const shouldShow = filterValue === 'All' || filterValue === pub.dataset.year;
                pub.style.display = shouldShow ? 'grid' : 'none';
            });
        });
    });
}

/**
 * Render courses
 */
function renderCourses(data) {
    const container = document.getElementById('courses');
    if (!container) return;
    
    container.innerHTML = data.map(course => `
        <article class="course">
            <div class="code">
                ${escapeHTML(course.code)} · ${escapeHTML(course.meetings)} MEETINGS
            </div>
            <h3>${escapeHTML(course.name)}</h3>
            <p>${escapeHTML(course.description)}</p>
        </article>
    `).join('');
}

/**
 * Render resources with search functionality
 */
function renderResources(data) {
    const container = document.getElementById('resourcesGrid');
    const searchInput = document.getElementById('search');
    
    if (!container) return;
    
    function filterResources(query = '') {
        const searchTerm = query.toLowerCase().trim();
        
        // Filter resources
        const filtered = data.filter(item => {
            const searchableText = (
                item.title + ' ' + 
                item.course + ' ' + 
                item.description + ' ' + 
                item.type
            ).toLowerCase();
            return searchableText.includes(searchTerm);
        });
        
        // Render or show empty state
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>📚 Tidak ada resource yang cocok dengan pencarian.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filtered.map(item => `
            <article class="resource">
                <div class="type">
                    ${escapeHTML(item.type)} · PERTEMUAN ${escapeHTML(item.meeting)}
                </div>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.course)} — ${escapeHTML(item.description)}</p>
                <a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">
                    Open resource ↗
                </a>
            </article>
        `).join('');
    }
    
    // Initial render
    filterResources();
    
    // Setup search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterResources(this.value);
        });
    }
}

// ============================================
// 4. UI INTERACTIONS
// ============================================

/**
 * Set current year in footer
 */
function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('menu');
    const navLinks = document.getElementById('navlinks');
    
    if (!menuBtn || !navLinks) return;
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        this.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            if (menuBtn) menuBtn.textContent = '☰';
        });
    });
}

/**
 * Initialize dark mode theme
 */
function initTheme() {
    const themeBtn = document.getElementById('theme');
    if (!themeBtn) return;
    
    // Check saved theme preference
    const isDarkMode = localStorage.getItem('darkmode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('darkmode');
    }
    
    // Toggle theme on button click
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('darkmode');
        const isNowDark = document.body.classList.contains('darkmode');
        localStorage.setItem('darkmode', String(isNowDark));
    });
}

// ============================================
// 5. MAIN INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
async function init() {
    console.log('🚀 Initializing Academic Portal...');
    
    try {
        // Load all data
        const [profile, pubs, courses, resources] = await Promise.all([
            getJSON('data/profile.json', FALLBACK_PROFILE),
            getJSON('data/publications.json', FALLBACK_PUBS),
            getJSON('data/courses.json', FALLBACK_COURSES),
            getJSON('data/resources.json', FALLBACK_RESOURCES)
        ]);
        
        // Render all sections
        renderStats(profile);
        renderLinks(profile);
        renderSkills(profile);
        renderResearch(profile);
        renderContact(profile);
        renderPublications(pubs);
        renderCourses(courses);
        renderResources(resources);
        
        console.log('✅ Application initialized successfully!');
        
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
    }
}

// ============================================
// 6. DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Setup UI interactions
    setCurrentYear();
    initMobileMenu();
    initTheme();
    
    // Start the application
    init();
});
