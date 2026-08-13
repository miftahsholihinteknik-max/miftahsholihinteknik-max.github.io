/* =========================================================
   MIFTAHUS SHOLIHIN — ACADEMIC PORTFOLIO
   Main JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   FALLBACK DATA
   Digunakan jika file JSON gagal dimuat.
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


const fallbackPublications = [
    {
        year: 2025,
        title: "Judul publikasi Anda",
        authors: "Miftahus Sholihin, et al.",
        journal: "Nama Jurnal",
        quartile: "Q1 / Q2 / SINTA",
        indexing: ["Scopus"],
        doi: "#",
        url: "#",
        keywords: [
            "Artificial Intelligence",
            "Deep Learning"
        ]
    }
];


const fallbackCourses = [
    {
        code: "IF4501",
        name: "Machine Learning",
        meetings: 16,
        description:
            "Konsep, algoritma, implementasi, evaluasi, dan pengembangan model machine learning."
    },
    {
        code: "—",
        name: "Artificial Intelligence",
        meetings: 16,
        description:
            "Konsep dan implementasi sistem kecerdasan buatan."
    },
    {
        code: "—",
        name: "Pengolahan Citra Digital",
        meetings: 16,
        description:
            "Pengolahan citra dan implementasi computer vision."
    },
    {
        code: "—",
        name: "Struktur Data",
        meetings: 16,
        description:
            "Struktur data, algoritma, dan kompleksitas."
    }
];


const fallbackResources = [
    {
        course: "Machine Learning",
        meeting: 1,
        title: "Pengantar Machine Learning",
        type: "Modul",
        description:
            "Konsep dasar, paradigma, workflow, dan contoh penerapan machine learning.",
        links: []
    }
];


const fallbackAssignments = [
    {
        course: "Machine Learning",
        meeting: 1,
        title: "Eksplorasi Konsep Machine Learning",
        type: "Tugas Individu",
        deadline: "2026-09-01",
        status: "open",
        description:
            "Mahasiswa memahami konsep dasar machine learning dan mampu mengidentifikasi penerapannya pada permasalahan nyata.",

        instructions: [
            "Jelaskan pengertian machine learning dengan bahasa sendiri.",
            "Identifikasi minimal tiga contoh penerapan machine learning.",
            "Pilih satu permasalahan nyata yang dapat diselesaikan menggunakan machine learning.",
            "Jelaskan pendekatan machine learning yang sesuai.",
            "Susun laporan dalam format PDF."
        ],

        materials: [],

        submission: {
            label: "Kumpulkan Tugas",
            url: "#"
        }
    }
];


/* =========================================================
   HELPER
   ========================================================= */

/**
 * Shortcut getElementById
 */
const $ = (id) => document.getElementById(id);


/**
 * Escape HTML
 */
function esc(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]
    );
}


/**
 * Load JSON
 */
async function loadJSON(file, fallback) {
    try {
        const response = await fetch(file, {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        return await response.json();

    } catch (error) {
        console.warn(`Tidak dapat memuat ${file}`, error);
        return fallback;
    }
}


/**
 * Format tanggal Indonesia
 */
function formatDate(dateString) {
    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(date);
}


/**
 * Status tugas
 */
function getAssignmentStatus(assignment) {

    const status = String(
        assignment.status || ""
    ).toLowerCase();

    if (status === "closed") {
        return {
            label: "Ditutup",
            className: "closed"
        };
    }

    if (status === "draft") {
        return {
            label: "Draft",
            className: "draft"
        };
    }

    if (status === "open") {
        return {
            label: "Terbuka",
            className: "open"
        };
    }

    return {
        label: "Informasi",
        className: ""
    };
}


/**
 * Ikon/link type
 */
function getLinkLabel(link) {

    if (!link) {
        return "Open";
    }

    if (link.label) {
        return link.label;
    }

    const type = String(
        link.type || ""
    ).toLowerCase();

    const labels = {
        pdf: "Modul PDF",
        youtube: "Video YouTube",
        notebook: "Notebook Colab",
        colab: "Notebook Colab",
        dataset: "Dataset",
        drive: "Google Drive",
        slide: "Slide",
        slides: "Slide",
        assignment: "Tugas",
        github: "GitHub"
    };

    return labels[type] || "Open Resource";
}


/**
 * Ikon sederhana berdasarkan type
 */
function getLinkIcon(link) {

    const type = String(
        link?.type || ""
    ).toLowerCase();

    const icons = {
        pdf: "PDF",
        youtube: "YT",
        notebook: "COLAB",
        colab: "COLAB",
        dataset: "DATA",
        drive: "DRIVE",
        slide: "SLIDE",
        slides: "SLIDE",
        github: "GIT"
    };

    return icons[type] || "↗";
}


/* =========================================================
   MAIN INIT
   ========================================================= */

async function init() {

    /* -----------------------------------------------------
       LOAD ALL DATA
       ----------------------------------------------------- */

    const [
        profile,
        publications,
        courses,
        resources,
        assignments
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
        ),

        loadJSON(
            "data/assignments.json",
            fallbackAssignments
        )
    ]);


    /* -----------------------------------------------------
       PROFILE
       ----------------------------------------------------- */

    if ($("title")) {
        $("title").textContent =
            profile.title || "";
    }

    if ($("tagline")) {
        $("tagline").textContent =
            profile.tagline || "";
    }


    /* -----------------------------------------------------
       BIO
       ----------------------------------------------------- */

    if ($("bio")) {

        $("bio").innerHTML =
            (profile.bio || [])
                .map(
                    paragraph =>
                        `<p>${esc(paragraph)}</p>`
                )
                .join("");
    }


    /* -----------------------------------------------------
       SKILLS
       ----------------------------------------------------- */

    if ($("skills")) {

        $("skills").innerHTML =
            (profile.skills || [])
                .map(
                    (skill, index) =>
                        `<span>
                            ${String(index + 1).padStart(2, "0")}
                            ·
                            ${esc(skill)}
                        </span>`
                )
                .join("");
    }


    /* -----------------------------------------------------
       SOCIAL LINKS
       ----------------------------------------------------- */

    if ($("links")) {

        $("links").innerHTML =
            (profile.links || [])
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
                .join("");
    }


    /* -----------------------------------------------------
       RESEARCH
       ----------------------------------------------------- */

    if ($("researchGrid")) {

        $("researchGrid").innerHTML =
            (profile.research || [])
                .map(item => {

                    return `
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
                    `;
                })
                .join("");
    }


    /* -----------------------------------------------------
       CONTACT
       ----------------------------------------------------- */

    if ($("contactData")) {

        $("contactData").innerHTML =
            (profile.contact || [])
                .map(item => {

                    return `
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
                    `;
                })
                .join("");
    }


    /* =====================================================
       PUBLICATIONS
       ===================================================== */

    const pubFilters =
        $("pubFilters");

    const pubSearch =
        $("pubSearch");

    const pubs =
        $("pubs");


    if (pubFilters && pubs) {

        const years = [
            ...new Set(
                publications.map(
                    item => String(item.year)
                )
            )
        ].sort(
            (a, b) => Number(b) - Number(a)
        );


        pubFilters.innerHTML =
            `<button
                class="active"
                data-year="all"
            >
                All
            </button>` +

            years
                .map(
                    year =>
                        `<button data-year="${esc(year)}">
                            ${esc(year)}
                        </button>`
                )
                .join("");


        function renderPublications() {

            const query =
                (pubSearch?.value || "")
                    .toLowerCase()
                    .trim();

            const activeYear =
                pubFilters
                    .querySelector(".active")
                    ?.dataset.year || "all";


            const filtered =
                publications.filter(item => {

                    const text = `
                        ${item.title || ""}
                        ${item.authors || ""}
                        ${item.journal || ""}
                        ${(item.keywords || []).join(" ")}
                    `.toLowerCase();


                    const matchSearch =
                        text.includes(query);

                    const matchYear =
                        activeYear === "all" ||
                        String(item.year) === activeYear;

                    return (
                        matchSearch &&
                        matchYear
                    );
                });


            if (!filtered.length) {

                pubs.innerHTML = `
                    <div class="empty">
                        Belum ada publikasi yang cocok.
                    </div>
                `;

                return;
            }


            pubs.innerHTML =
                filtered
                    .map(item => {

                        const keywords =
                            item.keywords || [];


                        const doi =
                            item.doi &&
                            item.doi !== "#"
                                ? `
                                    <a
                                        href="${esc(item.doi)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        DOI ↗
                                    </a>
                                `
                                : "";


                        const article =
                            item.url &&
                            item.url !== "#"
                                ? `
                                    <a
                                        href="${esc(item.url)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Article ↗
                                    </a>
                                `
                                : "";


                        return `
                            <article class="pub">

                                <div class="pub-year">
                                    ${esc(item.year)}
                                </div>

                                <div>

                                    <h3>
                                        ${esc(item.title)}
                                    </h3>

                                    <p>
                                        ${esc(item.authors)}
                                    </p>

                                    <p>
                                        <b>
                                            ${esc(item.journal)}
                                        </b>

                                        ${
                                            item.quartile
                                                ? ` · ${esc(item.quartile)}`
                                                : ""
                                        }

                                        ${
                                            item.indexing?.length
                                                ? ` · ${esc(
                                                    item.indexing.join(", ")
                                                  )}`
                                                : ""
                                        }
                                    </p>

                                    ${
                                        keywords.length
                                            ? `
                                                <div class="tags">
                                                    ${keywords
                                                        .map(
                                                            keyword =>
                                                                `<span>
                                                                    ${esc(keyword)}
                                                                </span>`
                                                        )
                                                        .join("")}
                                                </div>
                                            `
                                            : ""
                                    }

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


        if (pubSearch) {
            pubSearch.addEventListener(
                "input",
                renderPublications
            );
        }


        pubFilters.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest("button");

                if (!button) {
                    return;
                }


                pubFilters
                    .querySelectorAll("button")
                    .forEach(
                        item =>
                            item.classList.remove("active")
                    );


                button.classList.add("active");

                renderPublications();
            }
        );


        renderPublications();
    }


    /* =====================================================
       COURSES
       ===================================================== */

    const coursesContainer =
        $("courses");


    if (coursesContainer) {

        coursesContainer.innerHTML =
            courses
                .map(course => {

                    return `
                        <article class="course-card">

                            <div>

                                <span>
                                    ${esc(course.code || "—")}
                                </span>

                                <small>
                                    ${esc(course.meetings || 16)}
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
                                class="explore-resource"
                                data-course="${esc(course.name)}"
                            >
                                Explore resources ↗
                            </a>

                        </article>
                    `;
                })
                .join("");
    }


    /* =====================================================
       RESOURCES
       ===================================================== */

    const resourceSearch =
        $("resourceSearch");

    const courseFilter =
        $("courseFilter");

    const resourcesGrid =
        $("resourcesGrid");


    /*
       Isi dropdown mata kuliah
    */

    if (courseFilter) {

        const resourceCourses = [
            ...new Set(
                resources
                    .map(item => item.course)
                    .filter(Boolean)
            )
        ];


        resourceCourses.forEach(course => {

            const option =
                document.createElement("option");

            option.value = course;
            option.textContent = course;

            courseFilter.appendChild(option);
        });
    }


    /*
       Render resources
    */

    function renderResources() {

        if (!resourcesGrid) {
            return;
        }


        const query =
            (resourceSearch?.value || "")
                .toLowerCase()
                .trim();


        const selectedCourse =
            courseFilter?.value || "";


        const filtered =
            resources.filter(item => {

                const searchableText = `
                    ${item.course || ""}
                    ${item.title || ""}
                    ${item.description || ""}
                    ${item.type || ""}
                `.toLowerCase();


                const matchSearch =
                    searchableText.includes(query);


                const matchCourse =
                    !selectedCourse ||
                    item.course === selectedCourse;


                return (
                    matchSearch &&
                    matchCourse
                );
            });


        if (!filtered.length) {

            resourcesGrid.innerHTML = `
                <div class="empty">
                    Tidak ada resource yang cocok.
                </div>
            `;

            return;
        }


        resourcesGrid.innerHTML =
            filtered
                .map(item => {

                    const links =
                        Array.isArray(item.links)
                            ? item.links
                            : [];


                    const linksHTML =
                        links.length
                            ? links
                                .map(link => {

                                    return `
                                        <a
                                            href="${esc(link.url || "#")}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="${esc(link.label || "")}"
                                        >
                                            <span>
                                                ${esc(
                                                    getLinkIcon(link)
                                                )}
                                            </span>

                                            ${esc(
                                                getLinkLabel(link)
                                            )}

                                            ↗
                                        </a>
                                    `;
                                })
                                .join("")
                            : `
                                <span>
                                    Belum ada link materi
                                </span>
                            `;


                    return `
                        <article
                            class="resource-card"
                            data-course="${esc(item.course)}"
                        >

                            <div class="resource-meta">

                                <span>
                                    ${esc(item.type || "Resource")}
                                </span>

                                <b>
                                    PERTEMUAN
                                    ${esc(item.meeting)}
                                </b>

                            </div>

                            <h3>
                                ${esc(item.title)}
                            </h3>

                            <p>
                                ${esc(item.course)}
                                —
                                ${esc(item.description)}
                            </p>

                            <div class="files">
                                ${linksHTML}
                            </div>

                        </article>
                    `;
                })
                .join("");
    }


    if (resourceSearch) {

        resourceSearch.addEventListener(
            "input",
            renderResources
        );
    }


    if (courseFilter) {

        courseFilter.addEventListener(
            "change",
            renderResources
        );
    }


    /*
       Explore resources dari kartu mata kuliah
    */

    if (coursesContainer) {

        coursesContainer.addEventListener(
            "click",
            event => {

                const link =
                    event.target.closest(
                        ".explore-resource"
                    );

                if (!link) {
                    return;
                }


                event.preventDefault();


                const course =
                    link.dataset.course || "";


                if (courseFilter) {

                    courseFilter.value =
                        course;
                }


                if (resourceSearch) {

                    resourceSearch.value = "";
                }


                renderResources();


                const resourcesSection =
                    $("resources");


                if (resourcesSection) {

                    resourcesSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    }


    renderResources();


    /* =====================================================
       ASSIGNMENTS
       ===================================================== */

    /*
       Mendukung index.html yang sudah memiliki:
       #assignments
       #assignmentSearch
       #assignmentCourseFilter
       #assignmentsGrid
    */

    const assignmentsContainer =
        $("assignmentsGrid");

    const assignmentSearch =
        $("assignmentSearch");

    const assignmentCourseFilter =
        $("assignmentCourseFilter");


    /*
       Jika section assignment sudah tersedia,
       kita aktifkan.
    */

    if (
        assignmentsContainer &&
        assignmentCourseFilter
    ) {

        const assignmentCourses = [
            ...new Set(
                assignments
                    .map(item => item.course)
                    .filter(Boolean)
            )
        ];


        assignmentCourses.forEach(course => {

            const option =
                document.createElement("option");

            option.value = course;
            option.textContent = course;

            assignmentCourseFilter.appendChild(
                option
            );
        });
    }


    function renderAssignments() {

        if (!assignmentsContainer) {
            return;
        }


        const query =
            (assignmentSearch?.value || "")
                .toLowerCase()
                .trim();


        const selectedCourse =
            assignmentCourseFilter?.value || "";


        const filtered =
            assignments.filter(item => {

                const text = `
                    ${item.course || ""}
                    ${item.title || ""}
                    ${item.type || ""}
                    ${item.description || ""}
                    ${(item.instructions || []).join(" ")}
                `.toLowerCase();


                const matchSearch =
                    text.includes(query);


                const matchCourse =
                    !selectedCourse ||
                    item.course === selectedCourse;


                return (
                    matchSearch &&
                    matchCourse
                );
            });


        if (!filtered.length) {

            assignmentsContainer.innerHTML = `
                <div class="empty">
                    Tidak ada tugas yang cocok.
                </div>
            `;

            return;
        }


        assignmentsContainer.innerHTML =
            filtered
                .map(assignment => {

                    const status =
                        getAssignmentStatus(
                            assignment
                        );


                    const instructions =
                        Array.isArray(
                            assignment.instructions
                        )
                            ? assignment.instructions
                            : [];


                    const materials =
                        Array.isArray(
                            assignment.materials
                        )
                            ? assignment.materials
                            : [];


                    const instructionHTML =
                        instructions.length
                            ? `
                                <ol class="assignment-list">
                                    ${instructions
                                        .map(
                                            instruction =>
                                                `<li>
                                                    ${esc(instruction)}
                                                </li>`
                                        )
                                        .join("")}
                                </ol>
                            `
                            : "";


                    const materialsHTML =
                        materials.length
                            ? `
                                <div class="assignment-materials">

                                    ${materials
                                        .map(
                                            material =>
                                                `
                                                <a
                                                    href="${esc(
                                                        material.url || "#"
                                                    )}"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    ${esc(
                                                        material.label ||
                                                        "Materi"
                                                    )}
                                                    ↗
                                                </a>
                                                `
                                        )
                                        .join("")}

                                </div>
                            `
                            : "";


                    const submission =
                        assignment.submission;


                    const submissionHTML =
                        submission &&
                        submission.url
                            ? `
                                <a
                                    class="assignment-submit"
                                    href="${esc(
                                        submission.url
                                    )}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ${esc(
                                        submission.label ||
                                        "Kumpulkan Tugas"
                                    )}
                                    ↗
                                </a>
                            `
                            : "";


                    return `
                        <article
                            class="assignment-card"
                            data-course="${esc(
                                assignment.course
                            )}"
                        >

                            <div class="assignment-top">

                                <div>

                                    <span class="assignment-number">
                                        PERTEMUAN
                                        ${esc(
                                            assignment.meeting
                                        )}
                                    </span>

                                    <span class="assignment-type">
                                        ${esc(
                                            assignment.type ||
                                            "Tugas"
                                        )}
                                    </span>

                                </div>

                                <span
                                    class="assignment-status ${esc(
                                        status.className
                                    )}"
                                >
                                    ${esc(
                                        status.label
                                    )}
                                </span>

                            </div>


                            <h3>
                                ${esc(
                                    assignment.title
                                )}
                            </h3>


                            <p class="assignment-course">
                                ${esc(
                                    assignment.course
                                )}
                            </p>


                            <p class="assignment-description">
                                ${esc(
                                    assignment.description
                                )}
                            </p>


                            <div class="assignment-deadline">

                                <small>
                                    DEADLINE
                                </small>

                                <strong>
                                    ${esc(
                                        formatDate(
                                            assignment.deadline
                                        )
                                    )}
                                </strong>

                            </div>


                            ${
                                instructionHTML
                            }


                            ${
                                materialsHTML
                            }


                            ${
                                submissionHTML
                            }

                        </article>
                    `;
                })
                .join("");
    }


    if (assignmentSearch) {

        assignmentSearch.addEventListener(
            "input",
            renderAssignments
        );
    }


    if (assignmentCourseFilter) {

        assignmentCourseFilter.addEventListener(
            "change",
            renderAssignments
        );
    }


    renderAssignments();


    /* =====================================================
       YEAR
       ===================================================== */

    if ($("year")) {

        $("year").textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menu =
        $("menu");

    const navlinks =
        $("navlinks");


    if (menu && navlinks) {

        menu.addEventListener(
            "click",
            () => {

                navlinks.classList.toggle(
                    "open"
                );
            }
        );


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


    /* =====================================================
       DARK / LIGHT MODE
       ===================================================== */

    const themeButton =
        $("theme");


    if (themeButton) {

        const savedTheme =
            localStorage.getItem(
                "academic-theme"
            );


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );
        }


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
                    "academic-theme",
                    isDark
                        ? "dark"
                        : "light"
                );
            }
        );
    }


    /* =====================================================
       SCROLL PROGRESS
       ===================================================== */

    const progress =
        $("progress");


    function updateProgress() {

        if (!progress) {
            return;
        }


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progress.style.width = "0%";

            return;
        }


        const percentage =
            (window.scrollY /
                documentHeight) *
            100;


        progress.style.width =
            `${Math.min(
                100,
                Math.max(0, percentage)
            )}%`;
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    const portraitImage =
        document.querySelector(
            ".portrait img"
        );


    if (portraitImage) {

        portraitImage.addEventListener(
            "error",
            () => {

                portraitImage.style.display =
                    "none";


                const initials =
                    $("initials");


                if (initials) {

                    initials.style.display =
                        "grid";
                }
            }
        );
    }
}


/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);
