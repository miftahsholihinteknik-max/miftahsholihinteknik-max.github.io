const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const safeUrl=u=>/^(https?:\/\/|mailto:|#)/i.test(String(u??""))?String(u):"#";

const fallbackProfile={"name":"Miftahus Sholihin","title":"Dosen Teknik Informatika","institution":"Universitas Islam Lamongan","tagline":"Artificial Intelligence · Machine Learning · Deep Learning · Computer Vision","bio":["Dosen Teknik Informatika yang berfokus pada pengembangan kecerdasan buatan dan penerapannya untuk menyelesaikan persoalan nyata.","Aktivitas akademik mencakup pendidikan, penelitian, publikasi ilmiah, pembimbingan mahasiswa, dan pengembangan teknologi berbasis data."],"skills":["Artificial Intelligence","Machine Learning","Deep Learning","Computer Vision","Image Processing","CNN","LSTM","Transfer Learning","Explainable AI","Python","TensorFlow","Keras"],"links":[{"label":"Google Scholar","url":"#"},{"label":"SINTA","url":"#"},{"label":"ORCID","url":"#"},{"label":"Scopus","url":"#"},{"label":"GitHub","url":"https://github.com/miftahsholihinteknik-max"}],"research":[{"number":"01","title":"Artificial Intelligence","description":"Sistem cerdas untuk klasifikasi, prediksi, diagnosis, dan pengambilan keputusan berbasis data."},{"number":"02","title":"Deep Learning","description":"CNN, LSTM, transfer learning, attention mechanism, dan explainable AI."},{"number":"03","title":"Computer Vision","description":"Analisis citra, visual recognition, dan diagnosis otomatis berbasis deep learning."},{"number":"04","title":"Smart Agriculture","description":"AI untuk pertanian presisi, diagnosis tanaman, dan prediksi lingkungan."}],"contact":[{"label":"Email","value":"Tambahkan email akademik","url":"#"},{"label":"Institution","value":"Universitas Islam Lamongan","url":"#"},{"label":"GitHub","value":"miftahsholihinteknik-max","url":"https://github.com/miftahsholihinteknik-max"}]};
const fallbackPublications=[{"year":2025,"title":"Judul publikasi Anda","authors":"Miftahus Sholihin, et al.","journal":"Nama Jurnal","quartile":"Q1 / Q2 / SINTA","indexing":["Scopus"],"doi":"#","url":"#","keywords":["Artificial Intelligence","Deep Learning"]}];
const fallbackCourses=[{"code":"IF4501","name":"Machine Learning","meetings":16,"description":"Konsep, algoritma, implementasi, evaluasi, dan pengembangan model machine learning."},{"code":"—","name":"Artificial Intelligence","meetings":16,"description":"Konsep dan implementasi sistem kecerdasan buatan."},{"code":"—","name":"Pengolahan Citra Digital","meetings":16,"description":"Pengolahan citra dan implementasi computer vision."},{"code":"—","name":"Struktur Data","meetings":16,"description":"Struktur data, algoritma, dan kompleksitas."}];
const fallbackResources=[{"course":"Machine Learning","meeting":1,"title":"Pengantar Machine Learning","type":"Modul","description":"Konsep dasar, paradigma, workflow, dan contoh penerapan machine learning.","files":[]}];
const fallbackAssignments=[{"course":"Machine Learning","meeting":1,"title":"Eksplorasi Konsep Machine Learning","type":"Tugas Individu","deadline":"2026-09-01","status":"open","description":"Memahami konsep dasar machine learning dan penerapannya.","instructions":["Jelaskan pengertian machine learning.","Identifikasi minimal tiga contoh penerapan.","Pilih satu permasalahan nyata."],"materials":[],"submission":{"label":"Kumpulkan Tugas","url":"#"}}];

async function load(file,fallback){try{const r=await fetch(file,{cache:"no-store"});if(!r.ok)throw new Error(r.status);return await r.json()}catch(e){console.warn("Fallback:",file,e);return fallback}}
function formatDeadline(date){if(!date)return"No deadline";const d=new Date(`${date}T00:00:00`);return Number.isNaN(d.getTime())?date:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"long",year:"numeric"}).format(d)}

function initAssignments(assignments){
 const search=$("assignmentSearch"),course=$("assignmentCourse"),type=$("assignmentType"),status=$("assignmentStatus"),grid=$("assignmentsGrid");
 if(!search||!course||!type||!status||!grid)return;
 [...new Set(assignments.map(x=>x.course).filter(Boolean))].sort().forEach(x=>course.insertAdjacentHTML("beforeend",`<option value="${esc(x)}">${esc(x)}</option>`));
 [...new Set(assignments.map(x=>x.type).filter(Boolean))].sort().forEach(x=>type.insertAdjacentHTML("beforeend",`<option value="${esc(x)}">${esc(x)}</option>`));
 function render(){
  const q=search.value.trim().toLowerCase(),c=course.value,t=type.value,s=status.value;
  const items=assignments.filter(x=>`${x.title||""} ${x.course||""} ${x.type||""} ${x.description||""}`.toLowerCase().includes(q)&&(!c||x.course===c)&&(!t||x.type===t)&&(!s||x.status===s)).sort((a,b)=>String(a.course).localeCompare(String(b.course))||Number(a.meeting||0)-Number(b.meeting||0));
  grid.innerHTML=items.length?items.map(x=>{
   const instructions=Array.isArray(x.instructions)?x.instructions:[],materials=Array.isArray(x.materials)?x.materials:[];
   const links=materials.filter(m=>m?.url).map(m=>`<a href="${esc(safeUrl(m.url))}" target="_blank" rel="noopener">${esc(m.label||"Material")} ↗</a>`).join("");
   const sub=x.submission||{};
   const submit=sub.url&&sub.url!=="#"?`<a class="assignment-submit" href="${esc(safeUrl(sub.url))}" target="_blank" rel="noopener">${esc(sub.label||"Submit Assignment")} ↗</a>`:`<span class="assignment-disabled">Submission link not available</span>`;
   return `<article class="assignment-card"><div class="assignment-card-top"><span class="assignment-course">${esc(x.course)}</span><span class="assignment-meeting">PERTEMUAN ${esc(x.meeting)}</span></div><div class="assignment-status-row"><span class="assignment-type">${esc(x.type)}</span><span class="assignment-status ${x.status==="closed"?"closed":"open"}">${x.status==="closed"?"Closed":"Open"}</span></div><h3>${esc(x.title)}</h3><p class="assignment-description">${esc(x.description)}</p>${instructions.length?`<div class="assignment-instructions"><small>TASK</small><ul>${instructions.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`:""}<div class="assignment-deadline"><small>DEADLINE</small><strong>${formatDeadline(x.deadline)}</strong></div><div class="assignment-actions">${links}${submit}</div></article>`
  }).join(""):`<div class="assignment-empty"><strong>No assignments found.</strong><span>Tidak ada penugasan yang sesuai dengan filter.</span></div>`;
 }
 ["input","change"].forEach(ev=>{search.addEventListener(ev,render);course.addEventListener(ev,render);type.addEventListener(ev,render);status.addEventListener(ev,render)});
 render();
}

async function init(){
 const [p,pubs,courses,res,assignments]=await Promise.all([load("data/profile.json",fallbackProfile),load("data/publications.json",fallbackPublications),load("data/courses.json",fallbackCourses),load("data/resources.json",fallbackResources),load("data/assignments.json",fallbackAssignments)]);
 if($("title"))$("title").textContent=p.title||"";
 if($("tagline"))$("tagline").textContent=p.tagline||"";
 if($("bio"))$("bio").innerHTML=(p.bio||[]).map(x=>`<p>${esc(x)}</p>`).join("");
 if($("skills"))$("skills").innerHTML=(p.skills||[]).map((x,i)=>`<span>${String(i+1).padStart(2,"0")} · ${esc(x)}</span>`).join("");
 if($("links"))$("links").innerHTML=(p.links||[]).map(x=>`<a href="${esc(safeUrl(x.url))}" target="_blank" rel="noopener">${esc(x.label)} <b>↗</b></a>`).join("");
 if($("researchGrid"))$("researchGrid").innerHTML=(p.research||[]).map(x=>`<article class="research-card"><div class="r-top"><span>${esc(x.number)}</span><b>↗</b></div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`).join("");
 if($("contactData"))$("contactData").innerHTML=(p.contact||[]).map(x=>`<div class="contact-item"><small>${esc(x.label)}</small><a href="${esc(safeUrl(x.url))}" target="_blank" rel="noopener">${esc(x.value)} ↗</a></div>`).join("");

 if($("pubFilters")&&$("pubSearch")&&$("pubs")){
  const years=[...new Set(pubs.map(x=>String(x.year)).filter(Boolean))].sort((a,b)=>b-a);
  $("pubFilters").innerHTML=`<button class="active" data-year="all">All</button>`+years.map(y=>`<button data-year="${esc(y)}">${esc(y)}</button>`).join("");
  function renderPubs(){const q=$("pubSearch").value.toLowerCase(),y=document.querySelector("#pubFilters .active")?.dataset.year||"all";const items=pubs.filter(x=>(y==="all"||String(x.year)===y)&&`${x.title} ${x.authors} ${x.journal} ${(x.keywords||[]).join(" ")}`.toLowerCase().includes(q));$("pubs").innerHTML=items.length?items.map(x=>`<article class="pub"><div class="pub-year">${esc(x.year)}</div><div><h3>${esc(x.title)}</h3><p>${esc(x.authors)}</p><p><b>${esc(x.journal)}</b> · ${esc(x.quartile||"")}${x.indexing?.length?" · "+esc(x.indexing.join(", ")):""}</p>${x.keywords?.length?`<div class="tags">${x.keywords.map(k=>`<span>${esc(k)}</span>`).join("")}</div>`:""}</div><div class="pub-links">${x.doi&&x.doi!=="#"?`<a href="${esc(safeUrl(x.doi))}" target="_blank">DOI ↗</a>`:""}${x.url&&x.url!=="#"?`<a href="${esc(safeUrl(x.url))}" target="_blank">Article ↗</a>`:""}</div></article>`).join(""):`<div class="empty">Belum ada publikasi yang cocok.</div>`}
  $("pubSearch").addEventListener("input",renderPubs);$("pubFilters").addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;document.querySelectorAll("#pubFilters button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");renderPubs()});renderPubs();
 }

 if($("courses")){
  $("courses").innerHTML=courses.map(c=>`<article class="course-card"><div><span>${esc(c.code)}</span><small>${esc(c.meetings)} MEETINGS</small></div><h3>${esc(c.name)}</h3><p>${esc(c.description)}</p><div class="course-actions"><a href="#resources" class="course-resource-link" data-course="${esc(c.name)}">Explore resources ↗</a><a href="#assignments" class="course-assignment-link" data-course="${esc(c.name)}">Explore assignments ↗</a></div></article>`).join("");
 }
 if($("courseFilter")&&$("resourceSearch")&&$("resourcesGrid")){
  [...new Set(res.map(x=>x.course).filter(Boolean))].sort().forEach(c=>$("courseFilter").insertAdjacentHTML("beforeend",`<option value="${esc(c)}">${esc(c)}</option>`));
  function renderResources(){const q=$("resourceSearch").value.toLowerCase(),c=$("courseFilter").value;const items=res.filter(x=>(!c||x.course===c)&&`${x.title} ${x.course} ${x.description} ${x.type}`.toLowerCase().includes(q));$("resourcesGrid").innerHTML=items.length?items.map(x=>`<article class="resource-card"><div class="resource-meta"><span>${esc(x.type)}</span><b>PERTEMUAN ${esc(x.meeting)}</b></div><h3>${esc(x.title)}</h3><p>${esc(x.course)} — ${esc(x.description)}</p><div class="files">${x.files?.length?x.files.map(f=>`<a href="${esc(safeUrl(f.url))}" target="_blank" rel="noopener">${esc(f.label||f.type||"Open")} ↗</a>`).join(""):`<span>Folder siap diisi</span>`}</div></article>`).join(""):`<div class="empty">Tidak ada resource yang cocok.</div>`}
  $("resourceSearch").addEventListener("input",renderResources);$("courseFilter").addEventListener("change",renderResources);renderResources();
 }
 initAssignments(assignments);
 document.querySelectorAll(".course-resource-link").forEach(a=>a.addEventListener("click",()=>{const f=$("courseFilter");if(f){f.value=a.dataset.course;f.dispatchEvent(new Event("change"))}}));
 document.querySelectorAll(".course-assignment-link").forEach(a=>a.addEventListener("click",()=>{const f=$("assignmentCourse");if(f){f.value=a.dataset.course;f.dispatchEvent(new Event("change"))}}));
 if($("year"))$("year").textContent=new Date().getFullYear();
 if($("menu")&&$("navlinks")){$("menu").addEventListener("click",()=>$("navlinks").classList.toggle("open"));document.querySelectorAll(".navlinks a").forEach(a=>a.addEventListener("click",()=>$("navlinks").classList.remove("open")))}
 if($("progress")){const update=()=>{$("progress").style.width=`${Math.min(100,Math.max(0,window.scrollY/(document.documentElement.scrollHeight-innerHeight)*100))}%`};window.addEventListener("scroll",update,{passive:true});update()}
 if($("theme"))$("theme").addEventListener("click",()=>$("theme").classList.toggle("active"));
}
init();
