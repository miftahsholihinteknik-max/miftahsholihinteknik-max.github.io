/* =========================================================
   MIFTAHUS SHOLIHIN
   Academic Portfolio
   Main Application
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector) => {
  return document.querySelector(selector);
};


const esc = (value = "") => {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

};


const isExternal = (url = "") => {

  return /^https?:\/\//i.test(url);

};


const linkAttrs = (url = "") => {

  if (isExternal(url)) {

    return 'target="_blank" rel="noopener noreferrer"';

  }

  return "";

};


const load = async (path, fallback = []) => {

  try {

    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

  } catch (error) {

    console.warn(
      `Gagal memuat ${path}:`,
      error
    );

    return fallback;

  }

};


/* =========================================================
   FALLBACK PROFILE
========================================================= */

const fallbackProfile = {

  name: "Miftahus Sholihin",

  title: "Dosen Teknik Informatika",

  institution: "Universitas Islam Lamongan",

  tagline:
    "Artificial Intelligence · Machine Learning · Deep Learning · Computer Vision",

  bio: [
    "Dosen Teknik Informatika dengan fokus pada kecerdasan buatan, machine learning, deep learning, dan computer vision.",
    "Aktivitas akademik mencakup penelitian, publikasi, pengembangan sistem berbasis AI, serta pembelajaran teknologi komputasi untuk menyelesaikan persoalan nyata."
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
        "Pengembangan CNN, LSTM, transfer learning, attention mechanism, dan explainable AI."
    },
    {
      number: "03",
      title: "Computer Vision",
      description:
        "Analisis citra dan visual recognition untuk klasifikasi serta diagnosis otomatis."
    },
    {
      number: "04",
      title: "Smart Agriculture",
      description:
        "Penerapan AI untuk pertanian presisi, diagnosis tanaman, dan prediksi lingkungan."
    }
  ],

  links: [],

  contact: [
    {
      label: "Email",
      value: "miftahus.sholihin@unisla.ac.id",
      url: "mailto:miftahus.sholihin@unisla.ac.id"
    },
    {
      label: "Institution",
      value: "Universitas Islam Lamongan",
      url: "https://unisla.ac.id"
    },
    {
      label: "GitHub",
      value: "miftahsholihinteknik-max",
      url: "https://github.com/miftahsholihinteknik-max"
    }
  ]

};


/* =========================================================
   FALLBACK ASSIGNMENTS
========================================================= */

const fallbackAssignments = [
  {
    course: "Machine Learning",
    meeting: 1,
    title: "Eksplorasi Konsep Machine Learning",
    type: "Tugas Individu",
    deadline: "2026-09-01",
    status: "open",
    description:
      "Eksplorasi konsep dasar, paradigma, workflow, dan contoh penerapan machine learning.",
    instructions: [
      "Pelajari materi pertemuan 1.",
      "Buat ringkasan konsep machine learning.",
      "Berikan minimal tiga contoh penerapan machine learning."
    ],
    materials: [],
    submission: {
      label: "Kumpulkan Tugas",
      url: "#"
    }
  }
];


/* =========================================================
   GLOBAL DATA
========================================================= */

let profileData = fallbackProfile;
let publicationsData = [];
let coursesData = [];
let resourcesData = [];
let assignmentsData = [];


/* =========================================================
   PROFILE
========================================================= */

function renderProfile(profile) {

  $("#title").textContent =
    profile.title || "";

  $("#tagline").textContent =
    profile.tagline || "";


  /* -------------------------
     BIO
  ------------------------- */

  const bioContainer = $("#bio");

  if (bioContainer) {

    const bio = Array.isArray(profile.bio)
      ? profile.bio
      : [profile.bio];

    bioContainer.innerHTML =
      bio
        .filter(Boolean)
        .map(text => `<p>${esc(text)}</p>`)
        .join("");

  }


  /* -------------------------
     SKILLS
  ------------------------- */

  const skillsContainer = $("#skills");

  if (skillsContainer) {

    skillsContainer.innerHTML =
      (profile.skills || [])
        .map(skill =>
          `<span>${esc(skill)}</span>`
        )
        .join("");

  }


  /* -------------------------
     SOCIAL LINKS
  ------------------------- */

  const linksContainer = $("#links");

  if (linksContainer) {

    linksContainer.innerHTML =
      (profile.links || [])
        .map(link => {

          if (!link.url || link.url === "#") {
            return "";
          }

          return `
            <a
              href="${esc(link.url)}"
              ${linkAttrs(link.url)}
            >
              ${esc(link.label)}
            </a>
          `;

        })
        .join("");

  }


  /* -------------------------
     RESEARCH
  ------------------------- */

  const researchContainer =
    $("#researchGrid");

  if (researchContainer) {

    researchContainer.innerHTML =
      (profile.research || [])
        .map(item => {

          return `
            <article class="research-card">

              <div class="r-top">
                <span>${esc(item.number || "")}</span>
                <span>✦</span>
              </div>

              <h3>
                ${esc(item.title || "")}
              </h3>

              <p>
                ${esc(item.description || "")}
              </p>

            </article>
          `;

        })
        .join("");

  }


  /* -------------------------
     CONTACT
  ------------------------- */

  const contactContainer =
    $("#contactData");

  if (contactContainer) {

    contactContainer.innerHTML =
      (profile.contact || [])
        .map(item => {

          const url = item.url || "#";

          return `
            <div class="contact-item">

              <small>
                ${esc(item.label || "")}
              </small>

              <a
                href="${esc(url)}"
                ${linkAttrs(url)}
              >
                ${esc(item.value || "")}
              </a>

            </div>
          `;

        })
        .join("");

  }

}


/* =========================================================
   PUBLICATIONS
========================================================= */

function renderPublicationFilters() {

  const container =
    $("#pubFilters");

  if (!container) {
    return;
  }

  const years = [
    ...new Set(
      publicationsData
        .map(item => item.year)
        .filter(Boolean)
    )
  ].sort((a, b) => b - a);


  container.innerHTML = `
    <button
      class="active"
      data-year=""
    >
      All
    </button>

    ${years
      .map(year => `
        <button data-year="${esc(year)}">
          ${esc(year)}
        </button>
      `)
      .join("")
    }
  `;


  container
    .querySelectorAll("button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          container
            .querySelectorAll("button")
            .forEach(btn =>
              btn.classList.remove("active")
            );

          button.classList.add("active");

          renderPublications();

        }
      );

    });

}


function renderPublications() {

  const container =
    $("#pubs");

  if (!container) {
    return;
  }


  const keyword =
    ($("#pubSearch")?.value || "")
      .toLowerCase()
      .trim();


  const activeButton =
    $("#pubFilters .active");


  const selectedYear =
    activeButton?.dataset.year || "";


  const filtered =
    publicationsData.filter(item => {

      const searchable = [

        item.title,
        item.authors,
        item.venue,
        item.abstract,
        ...(item.tags || [])

      ]
        .join(" ")
        .toLowerCase();


      const matchSearch =
        !keyword ||
        searchable.includes(keyword);


      const matchYear =
        !selectedYear ||
        String(item.year) === selectedYear;


      return (
        matchSearch &&
        matchYear
      );

    });


  if (!filtered.length) {

    container.innerHTML = `
      <div class="empty-state">
        No publications found.
      </div>
    `;

    return;
  }


  container.innerHTML =
    filtered
      .map(item => {

        return `
          <article class="pub">

            <div class="pub-year">
              ${esc(item.year || "")}
            </div>

            <div>

              <h3>
                ${esc(item.title || "")}
              </h3>

              <p>
                ${esc(item.authors || "")}
              </p>

              <p>
                ${esc(item.venue || "")}
              </p>

              ${
                Array.isArray(item.tags) &&
                item.tags.length
                  ? `
                    <div class="tags">
                      ${item.tags
                        .map(tag =>
                          `<span>${esc(tag)}</span>`
                        )
                        .join("")
                      }
                    </div>
                  `
                  : ""
              }

            </div>

            <div class="pub-links">

              ${
                item.url
                  ? `
                    <a
                      href="${esc(item.url)}"
                      ${linkAttrs(item.url)}
                    >
                      View ↗
                    </a>
                  `
                  : ""
              }

              ${
                item.pdf
                  ? `
                    <a
                      href="${esc(item.pdf)}"
                      ${linkAttrs(item.pdf)}
                    >
                      PDF ↗
                    </a>
                  `
                  : ""
              }

            </div>

          </article>
        `;

      })
      .join("");

}


/* =========================================================
   COURSES
========================================================= */

function renderCourses() {

  const container =
    $("#courses");

  if (!container) {
    return;
  }


  if (!coursesData.length) {

    container.innerHTML = `
      <div class="empty-state">
        No courses available.
      </div>
    `;

    return;
  }


  container.innerHTML =
    coursesData
      .map((course, index) => {

        const courseName =
          course.name ||
          course.course ||
          "";


        const code =
          course.code ||
          `0${index + 1}`;


        return `
          <article class="course-card">

            <div>

              <span>
                ${esc(code)}
              </span>

              <small>
                ${esc(course.semester || "")}
              </small>

            </div>

            <h3>
              ${esc(courseName)}
            </h3>

            <p>
              ${esc(course.description || "")}
            </p>

            <a
              href="#resources"
              class="course-resource-link"
              data-course="${esc(courseName)}"
            >
              Explore resources ↗
            </a>

          </article>
        `;

      })
      .join("");


  /* -------------------------
     Course → Resources
  ------------------------- */

  container
    .querySelectorAll(".course-resource-link")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          const course =
            link.dataset.course || "";

          const filter =
            $("#courseFilter");

          if (filter) {

            filter.value = course;

            renderResources();

          }

        }
      );

    });

}


/* =========================================================
   RESOURCES
========================================================= */

function initResourceCourseFilter() {

  const filter =
    $("#courseFilter");

  if (!filter) {
    return;
  }


  const courses = [
    ...new Set(
      resourcesData
        .map(item => item.course)
        .filter(Boolean)
    )
  ].sort();


  filter.innerHTML =
    `<option value="">All courses</option>` +
    courses
      .map(course =>
        `<option value="${esc(course)}">
          ${esc(course)}
        </option>`
      )
      .join("");


  filter.addEventListener(
    "change",
    renderResources
  );

}


function renderResources() {

  const container =
    $("#resourcesGrid");

  if (!container) {
    return;
  }


  const keyword =
    ($("#resourceSearch")?.value || "")
      .toLowerCase()
      .trim();


  const selectedCourse =
    $("#courseFilter")?.value || "";


  const filtered =
    resourcesData.filter(item => {

      const searchable = [

        item.course,
        item.title,
        item.type,
        item.description

      ]
        .join(" ")
        .toLowerCase();


      const matchSearch =
        !keyword ||
        searchable.includes(keyword);


      const matchCourse =
        !selectedCourse ||
        item.course === selectedCourse;


      return (
        matchSearch &&
        matchCourse
      );

    });


  if (!filtered.length) {

    container.innerHTML = `
      <div class="empty-state">
        No resources found.
      </div>
    `;

    return;
  }


  container.innerHTML =
    filtered
      .map(item => {

        /*
          Prioritas:
          1. links
          2. files
        */

        const links =
          Array.isArray(item.links) &&
          item.links.length
            ? item.links
            : (
                Array.isArray(item.files)
                  ? item.files
                  : []
              );


        const linkHTML =
          links.length

            ? links
                .map(link => {

                  const url =
                    link.url || "#";

                  return `
                    <a
                      href="${esc(url)}"
                      ${linkAttrs(url)}
                    >
                      ${esc(
                        link.label ||
                        link.type ||
                        "Open"
                      )}
                      ↗
                    </a>
                  `;

                })
                .join("")

            : `
                <span>
                  Resource belum tersedia
                </span>
              `;


        return `
          <article class="resource-card">

            <div class="resource-meta">

              <span>
                ${esc(item.course || "")}
              </span>

              <b>
                Pertemuan
                ${esc(item.meeting || "")}
              </b>

            </div>


            <h3>
              ${esc(item.title || "")}
            </h3>


            <p>
              ${esc(item.description || "")}
            </p>


            <div class="files">
              ${linkHTML}
            </div>

          </article>
        `;

      })
      .join("");

}


/* =========================================================
   STUDENT ASSIGNMENTS
========================================================= */

function initAssignmentFilters() {

  const courseFilter =
    $("#assignmentCourseFilter");

  const statusFilter =
    $("#assignmentStatusFilter");

  const search =
    $("#assignmentSearch");


  if (!courseFilter) {
    return;
  }


  /* -------------------------
     Generate Course Options
  ------------------------- */

  const courses = [
    ...new Set(
      assignmentsData
        .map(item => item.course)
        .filter(Boolean)
    )
  ].sort();


  courseFilter.innerHTML =
    `
      <option value="">
        All courses
      </option>
    ` +
    courses
      .map(course => `
        <option value="${esc(course)}">
          ${esc(course)}
        </option>
      `)
      .join("");


  /* -------------------------
     Events
  ------------------------- */

  courseFilter.addEventListener(
    "change",
    renderAssignments
  );


  if (statusFilter) {

    statusFilter.addEventListener(
      "change",
      renderAssignments
    );

  }


  if (search) {

    search.addEventListener(
      "input",
      renderAssignments
    );

  }


  renderAssignments();

}


/* =========================================================
   RENDER ASSIGNMENTS
========================================================= */

function renderAssignments() {

  const container =
    $("#assignmentsGrid");

  if (!container) {
    return;
  }


  const keyword =
    ($("#assignmentSearch")?.value || "")
      .toLowerCase()
      .trim();


  const selectedCourse =
    $("#assignmentCourseFilter")?.value || "";


  const selectedStatus =
    $("#assignmentStatusFilter")?.value || "";


  const filtered =
    assignmentsData.filter(item => {

      const searchable = [

        item.course,
        item.title,
        item.type,
        item.description,

        ...(Array.isArray(item.instructions)
          ? item.instructions
          : [])

      ]
        .join(" ")
        .toLowerCase();


      const matchSearch =
        !keyword ||
        searchable.includes(keyword);


      const matchCourse =
        !selectedCourse ||
        item.course === selectedCourse;


      const matchStatus =
        !selectedStatus ||
        item.status === selectedStatus;


      return (
        matchSearch &&
        matchCourse &&
        matchStatus
      );

    });


  /* -------------------------
     Empty Result
  ------------------------- */

  if (!filtered.length) {

    container.innerHTML = `
      <div class="empty-state assignment-empty">

        <strong>
          No assignments found.
        </strong>

        <span>
          Coba pilih course atau status
          yang berbeda.
        </span>

      </div>
    `;

    return;
  }


  /* -------------------------
     Assignment Cards
  ------------------------- */

  container.innerHTML =
    filtered
      .map(item => {

        const status =
          String(item.status || "open")
            .toLowerCase();


        const statusLabel =
          status === "open"
            ? "Open"
            : "Closed";


        const statusClass =
          status === "open"
            ? "status-open"
            : "status-closed";


        const deadline =
          item.deadline
            ? formatDate(item.deadline)
            : "Tidak ditentukan";


        /* -------------------------
           Materials
        ------------------------- */

        const materials =
          Array.isArray(item.materials)
            ? item.materials
            : [];


        const materialsHTML =
          materials.length

            ? `
              <div class="assignment-materials">

                ${materials
                  .map(material => {

                    const url =
                      material.url || "#";

                    return `
                      <a
                        href="${esc(url)}"
                        ${linkAttrs(url)}
                      >
                        ${esc(
                          material.label ||
                          "Material"
                        )}
                        ↗
                      </a>
                    `;

                  })
                  .join("")
                }

              </div>
            `

            : "";


        /* -------------------------
           Instructions
        ------------------------- */

        const instructions =
          Array.isArray(item.instructions)
            ? item.instructions
            : [];


        const instructionsHTML =
          instructions.length

            ? `
              <div class="assignment-instructions">

                <strong>
                  Instructions
                </strong>

                <ol>

                  ${instructions
                    .map(instruction =>
                      `<li>
                        ${esc(instruction)}
                      </li>`
                    )
                    .join("")
                  }

                </ol>

              </div>
            `

            : "";


        /* -------------------------
           Submission
        ------------------------- */

        let submissionHTML = "";

        if (
          item.submission &&
          item.submission.url
        ) {

          const url =
            item.submission.url;

          submissionHTML = `
            <a
              class="assignment-submit"
              href="${esc(url)}"
              ${linkAttrs(url)}
            >
              ${esc(
                item.submission.label ||
                "Submit Assignment"
              )}
              ↗
            </a>
          `;

        }


        return `
          <article class="assignment-card">

            <div class="assignment-top">

              <div>

                <span class="assignment-course">
                  ${esc(item.course || "")}
                </span>

                <span class="assignment-meeting">
                  PERTEMUAN
                  ${esc(item.meeting || "")}
                </span>

              </div>


              <span
                class="assignment-status ${statusClass}"
              >
                ${statusLabel}
              </span>

            </div>


            <h3>
              ${esc(item.title || "")}
            </h3>


            <div class="assignment-meta">

              <span>
                ${esc(item.type || "Assignment")}
              </span>

              <span>
                Deadline:
                <strong>
                  ${esc(deadline)}
                </strong>
              </span>

            </div>


            <p class="assignment-description">
              ${esc(item.description || "")}
            </p>


            ${instructionsHTML}


            ${materialsHTML}


            <div class="assignment-bottom">

              <span class="assignment-deadline">
                Deadline:
                ${esc(deadline)}
              </span>

              ${submissionHTML}

            </div>

          </article>
        `;

      })
      .join("");

}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(dateString) {

  if (!dateString) {
    return "";
  }


  const date =
    new Date(dateString + "T00:00:00");


  if (Number.isNaN(date.getTime())) {
    return dateString;
  }


  return date.toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMenu() {

  const menu =
    $("#menu");

  const nav =
    $("#navlinks");


  if (!menu || !nav) {
    return;
  }


  menu.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

    }
  );


  nav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove("open");

        }
      );

    });

}


/* =========================================================
   THEME
========================================================= */

function initTheme() {

  const button =
    $("#theme");

  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "dark-mode"
      );

    }
  );

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initProgress() {

  const progress =
    $("#progress");

  if (!progress) {
    return;
  }


  window.addEventListener(
    "scroll",
    () => {

      const scrollTop =
        window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


      const percentage =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;


      progress.style.width =
        `${percentage}%`;

    }
  );

}


/* =========================================================
   YEAR
========================================================= */

function renderYear() {

  const year =
    $("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}


/* =========================================================
   INITIALIZATION
========================================================= */

async function init() {

  /* -------------------------
     Load JSON
  ------------------------- */

  const [
    profile,
    publications,
    courses,
    resources,
    assignments
  ] = await Promise.all([

    load(
      "data/profile.json",
      fallbackProfile
    ),

    load(
      "data/publications.json",
      []
    ),

    load(
      "data/courses.json",
      []
    ),

    load(
      "data/resources.json",
      []
    ),

    load(
      "assignments.json",
      fallbackAssignments
    )

  ]);


  profileData =
    profile || fallbackProfile;

  publicationsData =
    Array.isArray(publications)
      ? publications
      : [];

  coursesData =
    Array.isArray(courses)
      ? courses
      : [];

  resourcesData =
    Array.isArray(resources)
      ? resources
      : [];

  assignmentsData =
    Array.isArray(assignments)
      ? assignments
      : fallbackAssignments;


  /* -------------------------
     Render
  ------------------------- */

  renderProfile(profileData);

  renderPublicationFilters();
  renderPublications();

  renderCourses();

  initResourceCourseFilter();
  renderResources();


  initAssignmentFilters();


  /* -------------------------
     UI
  ------------------------- */

  initMenu();
  initTheme();
  initProgress();
  renderYear();


  /* -------------------------
     Search Events
  ------------------------- */

  const pubSearch =
    $("#pubSearch");

  if (pubSearch) {

    pubSearch.addEventListener(
      "input",
      renderPublications
    );

  }


  const resourceSearch =
    $("#resourceSearch");

  if (resourceSearch) {

    resourceSearch.addEventListener(
      "input",
      renderResources
    );

  }

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);
