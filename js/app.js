/**
 * Academic Portal - Miftahus Sholihin
 * Main JavaScript File
 */

// ============================================
// DEFAULT DATA (Fallback)
// ============================================
const DEFAULT_DATA = {
    stats: [
        ["AI / ML", "Focus"],
        ["Deep Learning", "Research"],
        ["Computer Vision", "Focus"],
        ["Smart Agriculture", "Application"]
    ],
    links: [
        ["Google Scholar", "#"],
        ["SINTA", "#"],
        ["ORCID", "#"],
        ["GitHub", "https://github.com/miftahsholihinteknik-max"]
    ],
    skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Image Processing",
        "CNN",
        "LSTM",
        "Transfer Learning",
        "Python",
        "TensorFlow",
        "Keras"
    ],
    research: [
        ["01", "Artificial Intelligence", "Sistem cerdas untuk klasifikasi, prediksi, diagnosis, dan pengambilan keputusan berbasis data."],
        ["02", "Computer Vision", "Deep learning untuk klasifikasi citra, deteksi objek, dan analisis visual."],
        ["03", "Smart Agriculture", "AI untuk pertanian presisi, diagnosis tanaman, prediksi lingkungan, dan monitoring."]
    ],
    education: [
        ["—", "Program Magister / Doktor", "Tambahkan universitas dan tahun."],
        ["—", "Program Sarjana", "Tambahkan universitas dan tahun."]
    ],
    contact: [
        ["Email", "Tambahkan email akademik", "#"],
        ["Institution", "Universitas Islam Lamongan", "#"],
        ["GitHub", "miftahsholihinteknik-max", "https://github.com/miftahsholihinteknik-max"]
    ]
};

const DEFAULT_PUBLICATIONS = [
    ["2025", "Deep Learning for Plant Disease Classification", "Journal / Publisher", "https://doi.org/"],
    ["2025", "LSTM-Based Environmental Prediction", "Journal / Publisher", "https://doi.org/"],
    ["2024", "Explainable AI for Precision Agriculture", "Journal / Publisher", "https://doi.org/"]
];

const DEFAULT_COURSES = [
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

const DEFAULT_RESOURCES = [
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
// UTILITY FUNCTIONS
// ============================================

/**
 * Escape HTML special characters
 */
function escapeHTML(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, char => map[char]);
}

/**
 * Fetch JSON data with fallback
 */
async function fetchData(file, fallback) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.warn(`Failed to load ${file}, using fallback data:`, error);
        return fallback;
    }
}

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render stats section
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
        <a href="${escapeHTML(item[1])}" target="_blank">${escapeHTML(item[0])}</a>
    `).join('');
}

/**
 * Render skills
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
 * Render education (DISABLED - removed from layout)
 */
function renderEducation(data) {
    // Education section has been removed from HTML
    // This function is kept for reference but not used
    console.log('Education render disabled');
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
            <a href="${escapeHTML(item[2])}" target="_blank">${escapeHTML(item[1])}</a>
        </div>
    `).join('');
}

/**
 * Render publications
 */
function renderPublications(data) {
    const container = document.getElementById('pubs');
    if (!container) return;
    
    // Get unique years for filters
    const years = [...new Set(data.map(item => item[0]))].sort((a, b) => b - a);
    
    // Render filters
    const filterContainer = document.getElementById('pubFilters');
    if (filterContainer) {
        filterContainer.innerHTML = ['All', ...years].map((year, index) => `
            <button class="filter ${index === 0 ? 'active' : ''}" data-f="${year}">
                ${year}
            </button>
        `).join('');
    }
    
    // Render publications
    container.innerHTML = data.map(item => `
        <article class="publication" data-y="${escapeHTML(item[0])}">
            <div class="year">${escapeHTML(item[0])}</div>
            <div>
                <h3>${escapeHTML(item[1])}</h3>
                <div class="meta">${escapeHTML(item[2])}</div>
            </div>
            <a href="${escapeHTML(item[3])}" target="_blank">DOI ↗</a>
        </article>
    `).join('');
    
    // Setup filter click events
    document.querySelectorAll('.filter').forEach(button => {
        button.onclick = function() {
            // Remove active class from all filters
            document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.dataset.f;
            const isAll = filterValue === 'All';
            
            // Filter publications
            document.querySelectorAll('.publication').forEach(pub => {
                pub.style.display = (isAll || pub.dataset.y === filterValue) ? 'grid' : 'none';
            });
        };
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
            <div class="code">${escapeHTML(course.code)} · ${course.meetings} MEETINGS</div>
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
    if (!container) return;
    
    const searchInput = document.getElementById('search');
    
    function filterResources(query = '') {
        const filtered = data.filter(item => {
            const searchText = (item.title + ' ' + item.course + ' ' + item.description).toLowerCase();
            return searchText.includes(query.toLowerCase());
        });
        
        container.innerHTML = filtered.map(item => `
            <article class="resource">
                <div class="type">${escapeHTML(item.type)} · PERTEMUAN ${escapeHTML(item.meeting)}</div>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.course)} — ${escapeHTML(item.description)}</p>
                <a href="${escapeHTML(item.url)}" target="_blank">Open resource ↗</a>
            </article>
        `).join('');
    }
    
    // Initial render
    filterResources();
    
    // Setup search
    if (searchInput) {
        searchInput.oninput = function() {
            filterResources(this.value);
        };
    }
}

// ============================================
// THEME FUNCTIONS
// ============================================

/**
 * Initialize theme toggle
 */
function initTheme() {
    const themeBtn = document.getElementById('theme');
    if (!themeBtn) return;
    
    // Check saved theme
    if (localStorage.getItem('dark') === 'true') {
        document.body.classList.add('darkmode');
    }
    
    themeBtn.onclick = function() {
        document.body.classList.toggle('darkmode');
        localStorage.setItem('dark', document.body.classList.contains('darkmode'));
    };
}

/**
 * Initialize mobile menu
 */
function initMenu() {
    const menuBtn = document.getElementById('menu');
    const navLinks = document.getElementById('navlinks');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.onclick = function() {
        navLinks.classList.toggle('open');
        this.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    };
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.onclick = function() {
            navLinks.classList.remove('open');
            if (menuBtn) menuBtn.textContent = '☰';
        };
    });
}

/**
 * Set current year in footer
 */
function setYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// MAIN INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
async function init() {
    try {
        // Load all data
        const [profile, publications, courses, resources] = await Promise.all([
            fetchData('data/profile.json', DEFAULT_DATA),
            fetchData('data/publications.json', DEFAULT_PUBLICATIONS),
            fetchData('data/courses.json', DEFAULT_COURSES),
            fetchData('data/resources.json', DEFAULT_RESOURCES)
        ]);
        
        // Render all sections
        renderStats(profile);
        renderLinks(profile);
        renderSkills(profile);
        renderResearch(profile);
        renderEducation(profile); // Kept for reference but education section removed
        renderContact(profile);
        renderPublications(publications);
        renderCourses(courses);
        renderResources(resources);
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core features
    setYear();
    initMenu();
    initTheme();
    
    // Initialize main application
    init();
});
