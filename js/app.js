// ============================================================
// FALLBACK DATA
// Digunakan jika file JSON di folder /data tidak dapat dibaca.
// ============================================================

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
        "Explainable AI",
        "Python"
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


// ============================================================
// HELPER
// ============================================================

const $ = (id) => document.getElementById(id);


const esc = (value) => {
    return String(value ?? "").replace(
        /[&<>"']/g,
        (match) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[match])
    );
};


// ============================================================
// LOAD JSON
// ============================================================

async function load(file, fallback) {
    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Gagal membaca ${file}`);
        }

        return await response.json();

    } catch (error) {
        console.warn(
            `Menggunakan fallback karena ${file} tidak dapat dibaca.`,
            error
        );

        return fallback;
    }
}


// ============================================================
// INITIALIZATION
// ============================================================

async function init() {

    const [
        profile,
        publications,
        courses,
        resources
    ] = await Promise.all([
        load("data/profile.json", fallbackProfile),
        load("data/publications.json", fallbackPublications),
        load("data/courses.json", fallbackCourses),
        load("data/resources.json", fallbackResources)
    ]);


    // ========================================================
    // PROFILE
    // ========================================================

    $("title").textContent = profile.title || "";

    $("tagline").textContent = profile.tagline || "";


    // ========================================================
    // BIO
    // ========================================================

    $("bio").innerHTML = (profile.bio || [])
        .map((item) => `<p>${esc(item)}</p>`)
        .join("");


    // ========================================================
    // SKILLS
    // ========================================================

    $("skills").innerHTML = (profile.skills || [])
        .map(
            (skill, index) => `
                <span>
                    ${String(index + 1).padStart(2, "0")} ·
                    ${esc(skill)}
                </span>
            `
        )
        .join("");


    // ========================================================
    // SOCIAL / EXTERNAL LINKS
    // ========================================================

    $("links").innerHTML = (profile.links || [])
        .map(
            (link) => `
                <a
                    href="${esc(link.url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${esc(link.label)}
                    <b>↗</b>
                </a>
            `
        )
        .join("");


    // ========================================================
    // RESEARCH
    // ========================================================

    $("researchGrid").innerHTML = (profile.research || [])
        .map(
            (item) => `
                <article class="research-card">

                    <div class="r-top">
                        <span>${esc(item.number)}</span>
                        <b>↗</b>
                    </div>

                    <h3>
                        ${esc(item.title)}
                    </h3>

                    <p>
                        ${esc(item.description)}
                    </p>

                </article>
            `
        )
        .join("");


    // ========================================================
    // CONTACT
    // ========================================================

    $("contactData").innerHTML = (profile.contact || [])
        .map(
            (item) => `
                <div class="contact-item">

                    <small>
                        ${esc(item.label)}
                    </small>

                    <a
                        href="${esc(item.url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${esc(item.value)} ↗
                    </a>

                </div>
            `
        )
        .join("");


    // ========================================================
    // PUBLICATION FILTER
    // ========================================================

    const years = [
        ...new Set(
            publications.map((item) => String(item.year))
        )
    ].sort((a, b) => b - a);


    $("pubFilters").innerHTML = `
        <button
            class="active"
            data-year="all"
        >
            All
        </button>

        ${years
            .map(
                (year) => `
                    <button data-year="${year}">
                        ${year}
                    </button>
                `
            )
            .join("")}
    `;


    // ========================================================
    // PUBLICATION RENDER
    // ========================================================

    function renderPublications() {

        const search =
            $("pubSearch").value.toLowerCase();

        const activeYear =
            document
                .querySelector("#pubFilters .active")
                ?.dataset.year || "all";


        const filtered = publications.filter((item) => {

            const matchYear =
                activeYear === "all" ||
                String(item.year) === activeYear;

            const searchableText = `
                ${item.title}
                ${item.authors}
                ${item.journal}
            `.toLowerCase();

            const matchSearch =
                searchableText.includes(search);

            return matchYear && matchSearch;
        });


        $("pubs").innerHTML = filtered.length
            ? filtered
                .map(
                    (item) => `
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

                                    · ${esc(item.quartile || "")}

                                    ${
                                        item.indexing?.length
                                            ? ` · ${esc(
                                                item.indexing.join(", ")
                                            )}`
                                            : ""
                                    }
                                </p>

                                ${
                                    item.keywords?.length
                                        ? `
                                            <div class="tags">
                                                ${item.keywords
                                                    .map(
                                                        (keyword) => `
                                                            <span>
                                                                ${esc(keyword)}
                                                            </span>
                                                        `
                                                    )
                                                    .join("")}
                                            </div>
                                        `
                                        : ""
                                }

                            </div>

                            <div class="pub-links">

                                ${
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
                                        : ""
                                }

                                ${
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
                                        : ""
                                }

                            </div>

                        </article>
                    `
                )
                .join("")

            : `
                <div class="empty">
                    Belum ada publikasi yang cocok.
                </div>
            `;
    }


    $("pubSearch").oninput =
        renderPublications;


    $("pubFilters").onclick = (event) => {

        if (event.target.tagName !== "BUTTON") {
            return;
        }


        document
            .querySelectorAll("#pubFilters button")
            .forEach((button) => {
                button.classList.remove("active");
            });


        event.target.classList.add("active");

        renderPublications();
    };


    renderPublications();


    // ========================================================
    // COURSES
    // ========================================================

    $("courses").innerHTML = courses
        .map(
            (course) => `
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
                        data-course="${esc(course.name)}"
                    >
                        Explore resources ↗
                    </a>

                </article>
            `
        )
        .join("");


    // ========================================================
    // RESOURCE COURSE FILTER
    // ========================================================

    const resourceCourses = [
        ...new Set(
            resources.map((item) => item.course)
        )
    ];


    resourceCourses.forEach((course) => {

        $("courseFilter").insertAdjacentHTML(
            "beforeend",
            `
                <option value="${esc(course)}">
                    ${esc(course)}
                </option>
            `
        );
    });


    // ========================================================
    // RESOURCE RENDER
    // ========================================================

    function renderResources() {

        const search =
            $("resourceSearch").value.toLowerCase();

        const selectedCourse =
            $("courseFilter").value;


        const filtered = resources.filter((item) => {

            const matchCourse =
                !selectedCourse ||
                item.course === selectedCourse;


            const searchableText = `
                ${item.title}
                ${item.course}
                ${item.description}
            `.toLowerCase();


            const matchSearch =
                searchableText.includes(search);


            return matchCourse && matchSearch;
        });


        $("resourcesGrid").innerHTML = filtered.length
            ? filtered
                .map(
                    (item) => `
                        <article class="resource-card">

                            <div class="resource-meta">

                                <span>
                                    ${esc(item.type)}
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

                                ${
                                    item.links?.length
                                        ? item.links
                                            .map(
                                                (link) => `
                                                    <a
                                                        href="${esc(link.url)}"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        ${esc(link.label)}
                                                        ↗
                                                    </a>
                                                `
                                            )
                                            .join("")

                                        : `
                                            <span>
                                                Belum tersedia
                                            </span>
                                        `
                                }

                            </div>

                        </article>
                    `
                )
                .join("")

            : `
                <div class="empty">
                    Tidak ada resource yang cocok.
                </div>
            `;
    }


    $("resourceSearch").oninput =
        renderResources;


    $("courseFilter").onchange =
        renderResources;


    renderResources();
}


// ============================================================
// GLOBAL UI
// ============================================================

$("year").textContent =
    new Date().getFullYear();


$("menu").onclick = () => {
    $("navlinks").classList.toggle("open");
};


document
    .querySelectorAll(".navlinks a")
    .forEach((link) => {

        link.onclick = () => {
            $("navlinks").classList.remove("open");
        };

    });


// ============================================================
// SCROLL PROGRESS
// ============================================================

window.addEventListener("scroll", () => {

    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;


    $("progress").style.width =
        `${progress}%`;
});


// ============================================================
// START APPLICATION
// ============================================================

init();
