# Portfolio Website

A fast, responsive, static portfolio site (HTML/CSS/JS) that showcases projects and a resume.

## Structure
- `index.html` — Home with featured projects and skills
- `projects.html` — All projects, rendered from `data/projects.json`
- `resume.html` — Resume layout with sections
- `contact.html` — Contact links and mailto button
- `css/styles.css` — Theme and responsive layout
- `js/projects.js` — Loads and renders projects from JSON
- `js/main.js` — Navigation toggle and footer year
- `data/projects.json` — Project data (edit with real links)

## Local Preview
Use Python's simple server:

```powershell
Push-Location "C:\Users\cesre\OneDrive\Desktop\CNC Automation\web portfolio\portfolio"
py -m http.server 5500
```
Visit http://localhost:5500

## Customize
- Replace "Your Name" across pages
- Update `resume.html` sections with your info
- Edit `data/projects.json` with real `repo` and `demo` URLs
- Add logos/screenshots to `images/` and extend cards if desired

## Deploy (GitHub Pages)
1. Create a new GitHub repo and push the `portfolio` folder contents.
2. In repo settings → Pages → Deploy from branch → `main` and `/ (root)`.
3. Your site will be available at `https://<username>.github.io/<repo>/`.

Alternative: Deploy to Vercel/Netlify by importing the repo and choosing the root directory as `portfolio`.
