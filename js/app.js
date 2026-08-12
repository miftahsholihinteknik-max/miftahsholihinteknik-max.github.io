const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]);
async function getJSON(file,fallback){try{const r=await fetch(file);if(!r.ok)throw 0;return await r.json()}catch(e){return fallback}}
const FALLBACK_PROFILE={"stats": [["AI / ML", "Focus"], ["Deep Learning", "Research"], ["Computer Vision", "Focus"], ["Smart Agriculture", "Application"]], "links": [["Google Scholar", "#"], ["SINTA", "#"], ["ORCID", "#"], ["GitHub", "https://github.com/miftahsholihinteknik-max"]], "skills": ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision", "Image Processing", "CNN", "LSTM", "Transfer Learning", "Python", "TensorFlow", "Keras"], "research": [["01", "Artificial Intelligence", "Sistem cerdas untuk klasifikasi, prediksi, diagnosis, dan pengambilan keputusan berbasis data."], ["02", "Computer Vision", "Deep learning untuk klasifikasi citra, deteksi objek, dan analisis visual."], ["03", "Smart Agriculture", "AI untuk pertanian presisi, diagnosis tanaman, prediksi lingkungan, dan monitoring."]], "contact": [["Email", "Tambahkan email akademik", "#"], ["Institution", "Universitas Islam Lamongan", "#"], ["GitHub", "miftahsholinhinteknik-max", "https://github.com/miftahsholihinteknik-max"]]};
const FALLBACK_PUBS=[["2025", "Deep Learning for Plant Disease Classification", "Journal / Publisher", "https://doi.org/"], ["2025", "LSTM-Based Environmental Prediction", "Journal / Publisher", "https://doi.org/"], ["2024", "Explainable AI for Precision Agriculture", "Journal / Publisher", "https://doi.org/"]];
const FALLBACK_COURSES=[{"code": "IF4501", "name": "Machine Learning", "description": "Konsep, algoritma, implementasi, evaluasi, dan pengembangan model.", "meetings": 16}, {"code": "—", "name": "Artificial Intelligence", "description": "Konsep kecerdasan buatan dan sistem cerdas.", "meetings": 16}, {"code": "—", "name": "Pengolahan Citra Digital", "description": "Pengolahan citra dan implementasi computer vision.", "meetings": 16}, {"code": "—", "name": "Struktur Data", "description": "Struktur data, algoritma, dan kompleksitas.", "meetings": 16}];
const FALLBACK_RESOURCES=[{"course": "Machine Learning", "meeting": 1, "title": "Pengantar Machine Learning", "type": "PDF", "description": "Konsep dasar, paradigma, dan workflow machine learning.", "url": "materials/machine-learning/pertemuan-01/README.txt"}, {"course": "Machine Learning", "meeting": 2, "title": "Data Preprocessing", "type": "PDF", "description": "Data cleaning, transformation, encoding, dan scaling.", "url": "materials/machine-learning/pertemuan-02/README.txt"}, {"course": "Machine Learning", "meeting": 3, "title": "Regression", "type": "PDF", "description": "Konsep regresi dan evaluasi model.", "url": "materials/machine-learning/pertemuan-03/README.txt"}, {"course": "Machine Learning", "meeting": 4, "title": "Classification", "type": "PDF", "description": "Konsep klasifikasi dan evaluasi model.", "url": "materials/machine-learning/pertemuan-04/README.txt"}];

async function init(){
 const [p,pubs,courses,res]=await Promise.all([
  getJSON("data/profile.json",FALLBACK_PROFILE),
  getJSON("data/publications.json",FALLBACK_PUBS),
  getJSON("data/courses.json",FALLBACK_COURSES),
  getJSON("data/resources.json",FALLBACK_RESOURCES)
 ]);
 document.getElementById("stats").innerHTML=p.stats.map(x=>`<div class="number"><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div>`).join("");
 document.getElementById("links").innerHTML=p.links.map(x=>`<a href="${esc(x[1])}" target="_blank" rel="noopener">${esc(x[0])}</a>`).join("");
 document.getElementById("skills").innerHTML=p.skills.map(x=>`<span class="skill">${esc(x)}</span>`).join("");
 document.getElementById("researchGrid").innerHTML=p.research.map(x=>`<article class="research"><span class="index">${esc(x[0])}</span><h3>${esc(x[1])}</h3><p>${esc(x[2])}</p></article>`).join("");
 document.getElementById("contactData").innerHTML=p.contact.map(x=>`<div class="contact-item"><label>${esc(x[0])}</label><a href="${esc(x[2])}" target="_blank" rel="noopener">${esc(x[1])}</a></div>`).join("");

 const years=[...new Set(pubs.map(x=>String(x[0])))].sort((a,b)=>b-a);
 document.getElementById("pubFilters").innerHTML=["All",...years].map((x,i)=>`<button class="filter ${i===0?"active":""}" data-filter="${esc(x)}">${esc(x)}</button>`).join("");
 document.getElementById("pubs").innerHTML=pubs.map(x=>`<article class="publication" data-year="${esc(x[0])}"><div class="year">${esc(x[0])}</div><div><h3>${esc(x[1])}</h3><div class="meta">${esc(x[2])}</div></div><a href="${esc(x[3])}" target="_blank" rel="noopener">DOI ↗</a></article>`).join("");
 document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  document.querySelectorAll(".publication").forEach(x=>x.style.display=btn.dataset.filter==="All"||btn.dataset.filter===x.dataset.year?"grid":"none");
 });

 document.getElementById("courses").innerHTML=courses.map(x=>`<article class="course"><div class="code">${esc(x.code)} · ${esc(x.meetings)} MEETINGS</div><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p></article>`).join("");

 const renderResources=q=>{
  const items=res.filter(x=>(x.title+" "+x.course+" "+x.description+" "+x.type).toLowerCase().includes(q.toLowerCase()));
  document.getElementById("resourcesGrid").innerHTML=items.length?items.map(x=>`<article class="resource"><div class="type">${esc(x.type)} · PERTEMUAN ${esc(x.meeting)}</div><h3>${esc(x.title)}</h3><p>${esc(x.course)} — ${esc(x.description)}</p><a href="${esc(x.url)}" target="_blank" rel="noopener">Open resource ↗</a></article>`).join(""):"<p>Tidak ada resource yang cocok.</p>";
 };
 renderResources();
 document.getElementById("search").oninput=e=>renderResources(e.target.value);
}
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menu").onclick=()=>document.getElementById("navlinks").classList.toggle("open");
document.querySelectorAll(".navlinks a").forEach(a=>a.onclick=()=>document.getElementById("navlinks").classList.remove("open"));
document.getElementById("theme").onclick=()=>{document.body.classList.toggle("darkmode");localStorage.setItem("darkmode",document.body.classList.contains("darkmode"))};
if(localStorage.getItem("darkmode")==="true")document.body.classList.add("darkmode");
init();
