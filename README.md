# DIAS 350 — Real Estate Project Website

A clean, bilingual (English / Portuguese) landing page for the **DIAS 350 Residence** real estate project in Porto, Portugal.

---

## 📁 File Structure

```
dias350/
├── index.html              ← Main HTML file (page structure)
├── css/
│   └── styles.css          ← All styling
├── js/
│   ├── content.js          ← ⭐ EDIT THIS FILE for all text, images, and project data
│   └── main.js             ← App logic (language switching, rendering, form)
├── assets/
│   └── images/             ← Put all your photos here
│       ├── hero.jpg
│       ├── facade.jpg
│       ├── entrance.jpg
│       ├── interior-1.jpg
│       ├── interior-2.jpg
│       ├── street-view.jpg
│       ├── neighborhood.jpg
│       ├── existing-building-1.jpg
│       ├── existing-building-2.jpg
│       ├── team-developer.jpg
│       ├── team-architect.jpg
│       ├── team-pm.jpg
│       └── team-commercial.jpg
├── favicon.ico             ← Replace with your favicon
└── README.md
```

---

## ✏️ How to Edit Content

### All text, images, and project data → `js/content.js`

This is the **only file you need to edit** for most updates:

| What to change | Where in content.js |
|---|---|
| Project name, address, phone, email | `CONFIG` object at the top |
| Google Maps embed URL | `CONFIG.GOOGLE_MAPS_EMBED_URL` |
| Delivery date, units, floors | `CONFIG.DELIVERY_DATE`, `NUMBER_OF_UNITS`, `FLOORS` |
| Gallery photos (filenames) | `CONFIG.GALLERY_IMAGES` array |
| Team names, roles, bios | `CONFIG.TEAM_MEMBERS` array |
| All page text (EN) | `CONTENT.en` object |
| All page text (PT) | `CONTENT.pt` object |

### Google Maps embed

1. Go to [Google Maps](https://maps.google.com)
2. Search for your address
3. Click **Share → Embed a map**
4. Copy the `src="..."` URL from the `<iframe>` code
5. Paste it into `CONFIG.GOOGLE_MAPS_EMBED_URL` in `js/content.js`

### Hero image

Place your main photo at `assets/images/hero.jpg`, then in `index.html` find the hero section and replace the placeholder div with:
```html
<img class="hero-bg-image" src="assets/images/hero.jpg" alt="DIAS 350 building exterior" />
```

### Contact form (Formspree)

1. Sign up at [formspree.io](https://formspree.io) (free)
2. Create a new form and get your endpoint URL
3. Open `js/main.js` and find the comment `HOW TO CONNECT TO FORMSPREE`
4. Replace the mock success block with the real `fetch()` call shown in the comment

---

## 🚀 Local Development

No build step required. Open `index.html` in a browser directly, or use a simple local server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then open: [http://localhost:8080](http://localhost:8080)

---

## 📤 Deploying to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and log in
2. Click **New repository**
3. Name it `dias350` (or any name you like)
4. Set to **Public** (required for free GitHub Pages)
5. Do **not** initialize with README (you already have one)
6. Click **Create repository**

### Step 2 — Connect and push from terminal

Run these commands in the `dias350/` folder:

```bash
git init
git add .
git commit -m "Initial commit: DIAS 350 website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/dias350.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select: `Deploy from a branch`
4. Branch: `main` / Folder: `/ (root)`
5. Click **Save**

Your site will be live at:
```
https://YOUR_GITHUB_USERNAME.github.io/dias350/
```

(It may take 1–2 minutes to go live the first time.)

### Step 4 — Update the site later

After making changes:
```bash
git add .
git commit -m "Update content"
git push
```

GitHub Pages will automatically redeploy within ~1 minute.

---

## 🌐 Custom Domain (optional)

If you have a domain (e.g. `dias350.pt`):

1. In GitHub repo → **Settings → Pages → Custom domain**, enter your domain
2. At your domain registrar, add a CNAME record pointing to `YOUR_GITHUB_USERNAME.github.io`
3. GitHub will handle HTTPS automatically

---

## 🔤 Language Switching

The site supports English and Portuguese. The language is remembered in the browser via `localStorage`. The default is English.

---

## 📝 Notes

- No build tools or npm required — pure HTML/CSS/JS
- Fonts loaded from Google Fonts (requires internet connection)
- Images fall back to placeholders if files are missing
- All SEO meta tags are in `index.html` `<head>` section
