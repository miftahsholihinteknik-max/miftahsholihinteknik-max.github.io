# Panduan Mengelola Data Website

Jangan edit `index.html`, `css/style.css`, atau `js/app.js` untuk perubahan data biasa.

- `profile.json` → nama, jabatan, bio, skill, link akademik, research, kontak
- `publications.json` → publikasi, authors, jurnal, quartile, indexing, DOI, abstract, keywords
- `courses.json` → mata kuliah
- `resources.json` → bahan ajar dan file pembelajaran

## Link akademik
Ganti `#` pada `profile.json` dengan URL Google Scholar, SINTA, ORCID, Scopus, dll.

## Menambah file bahan ajar
1. Upload file ke `materials/.../pertemuan-XX/`.
2. Tambahkan objek file pada `files` di `resources.json`.
3. Commit changes.

Contoh:
```json
"files": [
  {"label":"Modul PDF","type":"PDF","url":"materials/machine-learning/pertemuan-01/modul.pdf"},
  {"label":"Slide","type":"PPTX","url":"materials/machine-learning/pertemuan-01/slide.pptx"},
  {"label":"Notebook","type":"IPYNB","url":"materials/machine-learning/pertemuan-01/praktikum.ipynb"}
]
```
