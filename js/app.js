/* =========================================================
   ACADEMIC PORTFOLIO
   Miftahus Sholihin
   ========================================================= */


/* =========================================================
   1. FALLBACK DATA
   Dipakai apabila file JSON gagal dibaca.
   ========================================================= */

const fallbackProfile = {
    name: "Miftahus Sholihin",

    title: "Dosen Teknik Informatika",

    institution: "Universitas Islam Lamongan",

    tagline:
        "Artificial Intelligence · Machine Learning · Deep Learning · Computer Vision",

    bio: [
        "Dosen Teknik Informatika yang berfokus pada pengembangan kecerdasan buatan dan penerapannya untuk menyelesaikan persoalan nyata.",

        "Aktivitas akademik mencakup pendidikan, penelitian, publikasi ilmiah, pembimbingan mahasiswa, dan pengembangan teknologi berbasis data."
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
        "Explainable AI",
        "Python",
        "TensorFlow",
        "Keras"
    ],

    links: [
        {
            label: "Google Scholar",
            url: "#"
        },
        {
            label: "SINTA",
            url: "#"
        },
        {
            label: "ORCID",
            url: "#"
        },
        {
            label: "Scopus",
            url: "#"
        },
        {
            label: "GitHub",
            url: "https://github.com/miftahsholihinteknik-max"
        }
    ],

    research: [
        {
            number: "01",
            title: "Artificial Intelligence",
            description:
                "Sistem cerdas untuk klasifikasi, prediksi, diagnosis, dan pengambilan keputusan berbasis data."
        },

        {
            number: "02",
            title: "Deep Learning",
            description:
                "CNN, LSTM, transfer learning, attention mechanism, dan explainable AI."
        },

        {
            number: "03",
            title: "Computer Vision",
            description:
                "Analisis citra, visual recognition, dan diagnosis otomatis berbasis deep learning."
        },

        {
            number: "04",
            title: "Smart Agriculture",
            description:
                "AI untuk pertanian presisi, diagnosis tanaman, dan prediksi lingkungan."
        }
    ],

    contact: [
        {
            label: "Email",
            value: "Tambahkan email akademik",
            url: "#"
        },

        {
            label: "Institution",
            value: "Universitas Islam Lamongan",
            url: "#"
        },

        {
            label: "GitHub",
            value: "miftahsholihinteknik-max",
            url: "https://github.com/miftahsholihinteknik-max"
        }
    ]
};


/* =========================================================
   FALLBACK PUBLICATIONS
   ========================================================= */

const fallbackPublications = [
    {
        year: 2025,
        title: "Judul publikasi Anda",
        authors: "Miftahus Sholihin, et al.",
        journal: "Nama Jurnal",
        quartile: "Q1 / Q2 / SINTA",
        indexing: [
            "Scopus"
        ],
        doi: "#",
        url: "#",
        keywords: [
            "Artificial Intelligence",
            "Deep Learning"
        ]
    }
];


/* =========================================================
   FALLBACK COURSES
   ========================================================= */

const fallbackCourses = [
    {
        code: "IF4501",
        name: "Machine Learning",
        meetings: 16,
        description:
            "Konsep, algoritma, implementasi, evaluasi, dan pengembangan model machine learning."
    },

    {
        code: "IF4502",
        name: "Artificial Intelligence",
        meetings: 16,
        description:
            "Konsep dan implementasi sistem kecerdasan buatan."
    },

    {
        code: "IF4503",
        name: "Pengolahan Citra Digital",
        meetings: 16,
        description:
            "Pengolahan citra digital dan implementasi computer vision."
    },

    {
        code: "IF4504",
        name: "Struktur Data",
        meetings: 16,
        description:
            "Struktur data, algoritma, dan kompleksitas."
    }
];


/* =========================================================
   FALLBACK RESOURCES
   ========================================================= */

const fallbackResources = [

    {
        course: "Machine Learning",
        meeting: 1,
        title: "Pengantar Machine Learning",
        type: "Modul",
        description:
            "Konsep dasar, paradigma, workflow, dan contoh penerapan machine learning.",

        links: []
    },

    {
        course: "Machine Learning",
        meeting: 2,
        title: "Data Preprocessing",
        type: "Modul",
        description:
            "Data cleaning, transformation, encoding, normalization, dan scaling.",

        links: []
    },

    {
        course: "Machine Learning",
        meeting: 3,
        title: "Regression",
        type: "Modul",
        description:
            "Regresi, training, prediksi, dan evaluasi model.",

        links: []
    },

    {
        course: "Machine Learning",
        meeting: 4,
        title: "Classification",
        type: "Modul",
        description:
            "Klasifikasi, confusion matrix, precision, recall, F1, dan ROC-AUC.",

        links: []
    }
];


/* =========================================================
   2. HELPER
   ========================================================= */


/**
 * Shortcut mengambil element berdasarkan ID.
 */
const $ = (id) => {
    return document.getElementById(id);
};


/**
 * Escape HTML
 * Mencegah karakter khusus merusak HTML.
 */
const esc = (value) => {

    return String(value ?? "").replace(
        /[&<>"']/g,

        (match) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[match]
    );
};


/**
 * Load JSON
 *
 * Jika gagal:
 * menggunakan fallback.
 */
async function loadJSON(file, fallback) {

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Gagal membaca ${file}`
            );
        }

        return await response.json();

    } catch (error) {

        console.warn(
            `Menggunakan fallback untuk ${file}`,
            error
        );

        return fallback;
    }
}


/**
 * Scroll ke section.
 */
function scrollToSection(id) {

    const element = $(id);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   3. PROFILE
   ========================================================= */

function renderProfile(profile) {

    if (!profile) {
        return;
    }


    /* Title */

    if ($("title")) {
        $("title").textContent =
            profile.title || "";
    }


    /* Tagline */

    if ($("tagline")) {
        $("tagline").textContent =
            profile.tagline || "";
    }


    /* Bio */

    if ($("bio")) {

        $("bio").innerHTML =
            Array.isArray(profile.bio)

                ? profile.bio
                    .map(
                        text =>
                            `<p>${esc(text)}</p>`
                    )
                    .join("")

                : "";
    }


    /* Skills */

    if ($("skills")) {

        $("skills").innerHTML =
            Array.isArray(profile.skills)

                ? profile.skills
                    .map(
                        (skill, index) => `
                            <span>
                                ${String(index + 1).padStart(2, "0")}
                                ·
                                ${esc(skill)}
                            </span>
                        `
                    )
                    .join("")

                : "";
    }


    /* Social / academic links */

    if ($("links")) {

        $("links").innerHTML =
            Array.isArray(profile.links)

                ? profile.links
                    .map(link => {

                        const url =
                            link.url || "#";

                        return `
                            <a
                                href="${esc(url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${esc(link.label)}
                                <b>↗</b>
                            </a>
                        `;
                    })
                    .join("")

                : "";
    }


    /* Research */

    if ($("researchGrid")) {

        $("researchGrid").innerHTML =
            Array.isArray(profile.research)

                ? profile.research
                    .map(item => `
                        <article class="research-card">

                            <div class="r-top">
                                <span>
                                    ${esc(item.number)}
                                </span>

                                <b>↗</b>
                            </div>

                            <h3>
                                ${esc(item.title)}
                            </h3>

                            <p>
                                ${esc(item.description)}
                            </p>

                        </article>
                    `)
                    .join("")

                : "";
    }


    /* Contact */

    if ($("contactData")) {

        $("contactData").innerHTML =
            Array.isArray(profile.contact)

                ? profile.contact
                    .map(item => `
                        <div class="contact-item">

                            <small>
                                ${esc(item.label)}
                            </small>

                            <a
                                href="${esc(item.url || "#")}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${esc(item.value)}
                                ↗
                            </a>

                        </div>
                    `)
                    .join("")

                : "";
    }
}


/* =========================================================
   4. PUBLICATIONS
   ========================================================= */

function initPublications(publications) {

    if (!$("pubs")) {
        return;
    }


    /* -----------------------------------------------------
       Tahun publikasi
       ----------------------------------------------------- */

    const years = [
        ...new Set(
            publications.map(
                publication =>
                    String(publication.year)
            )
        )
    ].sort(
        (a, b) =>
            Number(b) - Number(a)
    );


    /* -----------------------------------------------------
       Filter tahun
       ----------------------------------------------------- */

    if ($("pubFilters")) {

        $("pubFilters").innerHTML = `

            <button
                class="active"
                data-year="all"
                type="button"
            >
                All
            </button>

            ${years.map(year => `
                <button
                    data-year="${esc(year)}"
                    type="button"
                >
                    ${esc(year)}
                </button>
            `).join("")}

        `;
    }


    /* -----------------------------------------------------
       Render publications
       ----------------------------------------------------- */

    function renderPublications() {

        const search =
            $("pubSearch")
                ?.value
                .toLowerCase()
                .trim() || "";


        const activeFilter =
            document.querySelector(
                "#pubFilters .active"
            );


        const selectedYear =
            activeFilter
                ?.dataset
                .year || "all";


        const filtered =
            publications.filter(
                publication => {

                    const text = `
                        ${publication.title || ""}
                        ${publication.authors || ""}
                        ${publication.journal || ""}
                        ${(publication.keywords || []).join(" ")}
                    `.toLowerCase();


                    const matchesSearch =
                        !search ||
                        text.includes(search);


                    const matchesYear =
                        selectedYear === "all" ||
                        String(
                            publication.year
                        ) === selectedYear;


                    return (
                        matchesSearch &&
                        matchesYear
                    );
                }
            );


        /* -------------------------------------------------
           Empty
           ------------------------------------------------- */

        if (!filtered.length) {

            $("pubs").innerHTML = `
                <div class="empty">
                    Belum ada publikasi
                    yang cocok.
                </div>
            `;

            return;
        }


        /* -------------------------------------------------
           Publications HTML
           ------------------------------------------------- */

        $("pubs").innerHTML =
            filtered
                .map(publication => {

                    const doi =
                        publication.doi &&
                        publication.doi !== "#"
                            ? `
                                <a
                                    href="${esc(publication.doi)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    DOI ↗
                                </a>
                            `
                            : "";


                    const article =
                        publication.url &&
                        publication.url !== "#"
                            ? `
                                <a
                                    href="${esc(publication.url)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Article ↗
                                </a>
                            `
                            : "";


                    const keywords =
                        Array.isArray(
                            publication.keywords
                        )
                            ? `
                                <div class="tags">
                                    ${publication.keywords
                                        .map(
                                            keyword =>
                                                `<span>
                                                    ${esc(keyword)}
                                                </span>`
                                        )
                                        .join("")
                                    }
                                </div>
                            `
                            : "";


                    return `
                        <article class="pub">

                            <div class="pub-year">
                                ${esc(publication.year)}
                            </div>

                            <div>

                                <h3>
                                    ${esc(publication.title)}
                                </h3>

                                <p>
                                    ${esc(publication.authors)}
                                </p>

                                <p>
                                    <b>
                                        ${esc(publication.journal)}
                                    </b>

                                    ${
                                        publication.quartile
                                            ? ` · ${esc(publication.quartile)}`
                                            : ""
                                    }

                                    ${
                                        Array.isArray(
                                            publication.indexing
                                        ) &&
                                        publication.indexing.length
                                            ? ` · ${esc(
                                                publication.indexing.join(", ")
                                            )}`
                                            : ""
                                    }
                                </p>

                                ${keywords}

                            </div>

                            <div class="pub-links">

                                ${doi}

                                ${article}

                            </div>

                        </article>
                    `;
                })
                .join("");
    }


    /* -----------------------------------------------------
       Search
       ----------------------------------------------------- */

    if ($("pubSearch")) {

        $("pubSearch").addEventListener(
            "input",
            renderPublications
        );
    }


    /* -----------------------------------------------------
       Filter tahun
       ----------------------------------------------------- */

    if ($("pubFilters")) {

        $("pubFilters").addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "button"
                    );


                if (!button) {
                    return;
                }


                document
                    .querySelectorAll(
                        "#pubFilters button"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                renderPublications();
            }
        );
    }


    renderPublications();
}


/* =========================================================
   5. COURSES
   ========================================================= */

function initCourses(courses, resources) {

    if (!$("courses")) {
        return;
    }


    /* -----------------------------------------------------
       Render course cards
       ----------------------------------------------------- */

    $("courses").innerHTML =
        courses
            .map(course => `

                <article class="course-card">

                    <div>

                        <span>
                            ${esc(course.code)}
                        </span>

                        <small>
                            ${esc(course.meetings)}
                            MEETINGS
                        </small>

                    </div>

                    <h3>
                        ${esc(course.name)}
                    </h3>

                    <p>
                        ${esc(course.description)}
                    </p>

                    <a
                        href="#resources"
                        class="explore-course"
                        data-course="${esc(course.name)}"
                    >
                        Explore resources ↗
                    </a>

                </article>

            `)
            .join("");


    /* -----------------------------------------------------
       Populate course filter
       ----------------------------------------------------- */

    if ($("courseFilter")) {

        const resourceCourses = [
            ...new Set(
                resources
                    .map(resource =>
                        resource.course
                    )
                    .filter(Boolean)
            )
        ];


        const courseNames = [
            ...new Set([
                ...courses.map(
                    course =>
                        course.name
                ),
                ...resourceCourses
            ])
        ];


        $("courseFilter").innerHTML = `

            <option value="">
                All courses
            </option>

            ${courseNames
                .map(courseName => `
                    <option value="${esc(courseName)}">
                        ${esc(courseName)}
                    </option>
                `)
                .join("")
            }

        `;
    }
}


/* =========================================================
   6. RESOURCES
   ========================================================= */

function initResources(resources) {

    if (!$("resourcesGrid")) {
        return;
    }


    /* -----------------------------------------------------
       Render resource
       ----------------------------------------------------- */

    function renderResources() {

        const search =
            $("resourceSearch")
                ?.value
                .toLowerCase()
                .trim() || "";


        const selectedCourse =
            $("courseFilter")
                ?.value || "";


        const filtered =
            resources.filter(
                resource => {

                    const text = `
                        ${resource.course || ""}
                        ${resource.title || ""}
                        ${resource.description || ""}
                        ${resource.type || ""}
                        ${resource.meeting || ""}
                    `.toLowerCase();


                    const matchesSearch =
                        !search ||
                        text.includes(search);


                    const matchesCourse =
                        !selectedCourse ||
                        resource.course ===
                            selectedCourse;


                    return (
                        matchesSearch &&
                        matchesCourse
                    );
                }
            );


        /* -------------------------------------------------
           Empty
           ------------------------------------------------- */

        if (!filtered.length) {

            $("resourcesGrid").innerHTML = `
                <div class="empty">

                    Tidak ada resource
                    yang cocok.

                </div>
            `;

            return;
        }


        /* -------------------------------------------------
           Sort berdasarkan pertemuan
           ------------------------------------------------- */

        filtered.sort(
            (a, b) =>
                Number(a.meeting || 0) -
                Number(b.meeting || 0)
        );


        /* -------------------------------------------------
           Render cards
           ------------------------------------------------- */

        $("resourcesGrid").innerHTML =
            filtered
                .map(resource => {

                    const links =
                        Array.isArray(
                            resource.links
                        )
                            ? resource.links
                            : [];


                    const linkHTML =
                        links.length

                            ? links
                                .map(link => `

                                    <a
                                        href="${esc(link.url || "#")}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        ${esc(
                                            link.label ||
                                            link.type ||
                                            "Open"
                                        )}
                                        ↗
                                    </a>

                                `)
                                .join("")

                            : `
                                <span>
                                    Materi belum tersedia
                                </span>
                            `;


                    return `

                        <article class="resource-card">

                            <div class="resource-meta">

                                <span>
                                    ${esc(
                                        resource.type ||
                                        "Resource"
                                    )}
                                </span>

                                <b>
                                    PERTEMUAN
                                    ${esc(
                                        resource.meeting
                                    )}
                                </b>

                            </div>


                            <h3>
                                ${esc(
                                    resource.title
                                )}
                            </h3>


                            <p>

                                ${esc(
                                    resource.course
                                )}

                                —

                                ${esc(
                                    resource.description
                                )}

                            </p>


                            <div class="files">

                                ${linkHTML}

                            </div>

                        </article>

                    `;
                })
                .join("");
    }


    /* -----------------------------------------------------
       Search resource
       ----------------------------------------------------- */

    if ($("resourceSearch")) {

        $("resourceSearch").addEventListener(
            "input",
            renderResources
        );
    }


    /* -----------------------------------------------------
       Course filter
       ----------------------------------------------------- */

    if ($("courseFilter")) {

        $("courseFilter").addEventListener(
            "change",
            renderResources
        );
    }


    /* -----------------------------------------------------
       Explore resources
       ----------------------------------------------------- */

    document
        .querySelectorAll(
            ".explore-course"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const courseName =
                        link.dataset.course;


                    /* Set dropdown */

                    if ($("courseFilter")) {

                        $("courseFilter").value =
                            courseName;
                    }


                    /* Clear search */

                    if ($("resourceSearch")) {

                        $("resourceSearch").value =
                            "";
                    }


                    /* Render */

                    renderResources();


                    /* Update URL */

                    window.history.replaceState(
                        null,
                        "",
                        "#resources"
                    );


                    /* Scroll */

                    scrollToSection(
                        "resources"
                    );

                }
            );
        });


    /* -----------------------------------------------------
       Initial render
       ----------------------------------------------------- */

    renderResources();
}


/* =========================================================
   7. THEME
   ========================================================= */

function initTheme() {

    const themeButton =
        $("theme");


    if (!themeButton) {
        return;
    }


    /* Restore theme */

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );
    }


    /* Toggle */

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "portfolio-theme",
                isDark
                    ? "dark"
                    : "light"
            );
        }
    );
}


/* =========================================================
   8. MOBILE MENU
   ========================================================= */

function initMenu() {

    const menu =
        $("menu");

    const navlinks =
        $("navlinks");


    if (!menu || !navlinks) {
        return;
    }


    menu.addEventListener(
        "click",
        () => {

            navlinks.classList.toggle(
                "open"
            );
        }
    );


    /* Close menu after clicking navigation */

    navlinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navlinks.classList.remove(
                        "open"
                    );
                }
            );
        });
}


/* =========================================================
   9. SCROLL PROGRESS
   ========================================================= */

function initProgress() {

    const progress =
        $("progress");


    if (!progress) {
        return;
    }


    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight;


        const windowHeight =
            window.innerHeight;


        const scrollable =
            documentHeight -
            windowHeight;


        if (scrollable <= 0) {

            progress.style.width =
                "0%";

            return;
        }


        const percentage =
            (
                scrollTop /
                scrollable
            ) * 100;


        progress.style.width =
            `${percentage}%`;
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();
}


/* =========================================================
   10. FOOTER YEAR
   ========================================================= */

function initFooter() {

    if ($("year")) {

        $("year").textContent =
            new Date()
                .getFullYear();
    }
}


/* =========================================================
   11. IMAGE FALLBACK
   ========================================================= */

function initImageFallback() {

    const image =
        document.querySelector(
            ".portrait img"
        );


    const initials =
        $("initials");


    if (!image) {
        return;
    }


    image.addEventListener(
        "error",
        () => {

            image.style.display =
                "none";


            if (initials) {

                initials.style.display =
                    "grid";
            }
        }
    );
}


/* =========================================================
   12. INITIALIZE WEBSITE
   ========================================================= */

async function init() {

    try {

        /* -------------------------------------------------
           Load all JSON simultaneously
           ------------------------------------------------- */

        const [
            profile,
            publications,
            courses,
            resources
        ] = await Promise.all([

            loadJSON(
                "data/profile.json",
                fallbackProfile
            ),

            loadJSON(
                "data/publications.json",
                fallbackPublications
            ),

            loadJSON(
                "data/courses.json",
                fallbackCourses
            ),

            loadJSON(
                "data/resources.json",
                fallbackResources
            )

        ]);


        /* -------------------------------------------------
           Render
           ------------------------------------------------- */

        renderProfile(profile);

        initPublications(
            Array.isArray(publications)
                ? publications
                : fallbackPublications
        );


        const courseData =
            Array.isArray(courses)
                ? courses
                : fallbackCourses;


        const resourceData =
            Array.isArray(resources)
                ? resources
                : fallbackResources;


        initCourses(
            courseData,
            resourceData
        );


        initResources(
            resourceData
        );


        /* -------------------------------------------------
           Other features
           ------------------------------------------------- */

        initTheme();

        initMenu();

        initProgress();

        initFooter();

        initImageFallback();


        console.log(
            "Academic Portfolio berhasil dimuat."
        );

    } catch (error) {

        console.error(
            "Terjadi kesalahan saat menjalankan website:",
            error
        );
    }
}


/* =========================================================
   13. START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);
