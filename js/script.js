const fallback={
stats:[{value:"AI / ML",label:"Fokus Keilmuan"},{value:"Deep Learning",label:"Riset Utama"},{value:"Computer Vision",label:"Bidang Riset"},{value:"Smart Agriculture",label:"Aplikasi AI"}],
academicLinks:[{label:"Google Scholar",url:"#"},{label:"SINTA",url:"#"},{label:"ORCID",url:"#"},{label:"GitHub",url:"https://github.com/miftahsholihinteknik-max"}],
skills:["Artificial Intelligence","Machine Learning","Deep Learning","Computer Vision","Image Processing","CNN","LSTM","Transfer Learning","Python","TensorFlow","Keras","Scikit-learn"],
research:[{icon:"🤖",title:"Artificial Intelligence",text:"Pengembangan sistem cerdas untuk klasifikasi, prediksi, diagnosis, dan pengambilan keputusan berbasis data."},{icon:"👁️",title:"Computer Vision",text:"Pemanfaatan deep learning dan CNN untuk klasifikasi citra, deteksi, dan analisis visual."},{icon:"🌱",title:"Smart Agriculture",text:"Penerapan AI untuk pertanian presisi, diagnosis tanaman, prediksi lingkungan, dan monitoring."}],
publications:[{year:"Publikasi",title:"Deep Learning for Plant Disease Classification",text:"Penerapan convolutional neural network dan transfer learning untuk klasifikasi penyakit tanaman berbasis citra.",url:"#"}],
courses:[{title:"Machine Learning",text:"Konsep, algoritma, implementasi, evaluasi, dan pengembangan model machine learning."},{title:"Artificial Intelligence",text:"Konsep kecerdasan buatan, representasi pengetahuan, pencarian, dan sistem cerdas."},{title:"Pengolahan Citra Digital",text:"Pengolahan citra, ekstraksi fitur, klasifikasi, dan implementasi computer vision."},{title:"Struktur Data",text:"Konsep struktur data, algoritma, kompleksitas, dan implementasi pemrograman."}],
education:[{year:"Tambahkan tahun",title:"Program Magister / Doktor",text:"Tambahkan program studi, universitas, dan tahun."},{year:"Tambahkan tahun",title:"Program Sarjana",text:"Tambahkan program studi, universitas, dan tahun."}],
contact:[{icon:"✉️",label:"Email",value:"Tambahkan email akademik",url:"#"},{icon:"🏛️",label:"Institusi",value:"Universitas Islam Lamongan",url:"#"},{icon:"💻",label:"GitHub",value:"miftahsholihinteknik-max",url:"https://github.com/miftahsholihinteknik-max"}]};
async function loadData(){try{const r=await fetch("data/site-data.json");if(!r.ok)throw 0;return await r.json()}catch(e){return fallback}}
function render(d){
document.getElementById("stats").innerHTML=d.stats.map(x=>`<div class="stat"><strong>${x.value}</strong><span>${x.label}</span></div>`).join("");
document.getElementById("academicLinks").innerHTML=d.academicLinks.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}</a>`).join("");
document.getElementById("skills").innerHTML=d.skills.map(x=>`<span class="chip">${x}</span>`).join("");
document.getElementById("researchGrid").innerHTML=d.research.map(x=>`<article class="research-card"><div class="card-icon">${x.icon}</div><h3>${x.title}</h3><p>${x.text}</p></article>`).join("");
document.getElementById("publicationList").innerHTML=d.publications.map(x=>`<article class="publication"><div class="meta">${x.year}</div><h3>${x.title}</h3><p>${x.text}</p>${x.url&&x.url!=="#"?`<a href="${x.url}" target="_blank" rel="noopener">Lihat publikasi →</a>`:""}</article>`).join("");
document.getElementById("courseGrid").innerHTML=d.courses.map(x=>`<article class="course-card"><h3>${x.title}</h3><p>${x.text}</p></article>`).join("");
document.getElementById("educationTimeline").innerHTML=d.education.map(x=>`<article class="timeline-item"><span class="timeline-dot"></span><div class="year">${x.year}</div><h3>${x.title}</h3><p>${x.text}</p></article>`).join("");
document.getElementById("contactCard").innerHTML=d.contact.map(x=>`<div class="contact-item"><div>${x.icon}</div><div><b>${x.label}</b><span>${x.url&&x.url!=="#"?`<a href="${x.url}" target="_blank" rel="noopener">${x.value}</a>`:x.value}</span></div></div>`).join("")}
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("open")));
window.addEventListener("scroll",()=>document.getElementById("toTop").classList.toggle("show",scrollY>500));
document.getElementById("toTop").addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
loadData().then(render);
