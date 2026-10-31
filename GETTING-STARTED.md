# Getting started on Windows with VS Code

A step-by-step guide for running and editing this portfolio on a Windows computer.
Every command below matches this project's real `package.json`. The project uses **npm** (there is a
`package-lock.json`) and **Vite + React + TypeScript**.

---

## Step 1: Extract the ZIP

1. Create a working folder **outside OneDrive**, for example `C:\Projects`.
   (Desktop and Documents are often synced by OneDrive, which slows down or locks `node_modules`.)
2. Right-click `karan-portfolio.zip` → **Extract All…** → choose `C:\Projects` → **Extract**.
3. Find the **project root**: the folder that directly contains `package.json`, `index.html` and the `src` folder.
   Windows may create a double folder. If you see `C:\Projects\karan-portfolio\karan-portfolio\`, the inner one
   is the project root.

What you should see in the project root:

```text
karan-portfolio\
  dist\              ← generated production build (do not edit)
  public\            ← favicon, OG image, and public\images\ for your photos
  scripts\
  src\               ← the website's source code (edit here)
  .env.example
  GETTING-STARTED.md
  index.html
  netlify.toml
  package.json
  package-lock.json
  README.md
  tsconfig.json
  vite.config.ts
```

There is no `node_modules` folder yet. Step 4 creates it.

## Step 2: Install Node.js and npm

1. Open **Command Prompt** (Start → type `cmd`) and run:

   ```bat
   node -v
   npm -v
   ```

2. You need Node **22.12 or newer**. If you see a version like `v26.x.x`, `v24.x.x` or `v22.12+`, you're ready.
3. If you see `'node' is not recognized…`, or a version older than 22.12:
   - Go to <https://nodejs.org/> and download the **LTS** version, **Windows Installer (.msi)**.
   - Run it with the default options (npm is included).
   - **Close and reopen** Command Prompt and VS Code, then run `node -v` again.

## Step 3: Open the project in VS Code

1. Install VS Code from <https://code.visualstudio.com/> if you don't have it.
2. In VS Code: **File → Open Folder…** → select the **project root** from Step 1 → **Select Folder**.
   If asked "Do you trust the authors?", choose **Yes, I trust the authors**.
3. Open the terminal: **Terminal → New Terminal** (or press ``Ctrl + ` ``).
4. Check that you are in the right folder:

   ```bat
   dir package.json
   ```

   It should list `package.json`. If it says "File Not Found", you opened the wrong folder. Go back to step 2 and
   open the folder that contains `package.json`.

## Step 4: Install dependencies

This project has a `package-lock.json`, so use:

```bat
npm ci
```

This downloads the exact library versions the project was built and tested with (React, Vite, Motion, Lucide,
TypeScript…) into a new `node_modules` folder. It takes about a minute and only needs to be run once, or again
after you replace the project folder.

Use `npm install` instead only if `npm ci` fails with a message that `package.json` and `package-lock.json` are
out of sync, or when you deliberately add a new library.

## Step 5: Start the website locally

```bat
npm run dev
```

The terminal shows something like:

```text
  VITE v8.x  ready in 300 ms
  ➜  Local:   http://localhost:5173/
```

- **Ctrl + click** the `http://localhost:5173/` link (or type it into your browser).
- In development the contact form shows a yellow **Development notice** until a Formspree ID is set. That is
  expected and never appears on the live site.
- **To stop the server:** click in the terminal and press **Ctrl + C** (in Command Prompt answer **Y** if asked).

## Step 6: Edit the website

Edit files under `src\` and `public\`. Press **Ctrl + S** to save. The browser updates automatically within a
second (no restart needed). The only exception is `.env`: after changing it, stop the server (Ctrl + C) and run
`npm run dev` again.

| What you want to change | File |
| --- | --- |
| Email, phone, WhatsApp text, hometown, GMC link, **your photo**, **GMC screenshots** | `src\config\site.ts` |
| Hero text (intro paragraph, buttons) | `src\sections\Hero.tsx` |
| About text | `src\sections\About.tsx` |
| InfoCepts experience, Bootcamp / Associate timeline | `src\data\experience.ts` |
| The four project cards | `src\data\projects.ts` |
| Skills, courses, degree | `src\data\skills.ts` |
| GMC project text | `src\sections\FeaturedProject.tsx` |
| Entrepreneurship text | `src\sections\Entrepreneurship.tsx` |
| Colors, fonts, spacing | `src\styles\variables.css` |
| Page title, description (search results) | `index.html` |
| Formspree ID, domain, LinkedIn, GitHub | `.env` (see README section 7) |

**Never edit files inside `dist\`.** That folder is regenerated from `src\` on every build, so changes there are
lost.

### Add your photo

1. Prepare the photo: portrait orientation, ideally 4:5 (for example **800×1000 px**).
   Convert it to **WebP** for a smaller file at <https://squoosh.app/> (free, runs in your browser): drop the photo
   in, pick **WebP** on the right, quality about 80, then download. Aim for under 150 KB. JPG also works.
2. Save it exactly as:

   ```text
   public\images\karan-gadekar.webp
   ```

3. Open `src\config\site.ts`. Near the top, in the block marked **YOUR IMAGES**, find:

   ```ts
   const profilePhoto: SiteImage | null = null;
   ```

   and change it to (use your image's real width and height):

   ```ts
   const profilePhoto: SiteImage | null = { src: '/images/karan-gadekar.webp', width: 800, height: 1000 };
   ```

4. Save. The KG monogram in the hero is replaced by your photo. It is cropped to 4:5 without stretching; if your
   photo is a different shape, the top-centre part (where faces usually are) is kept.

How the code works: `src\sections\Hero.tsx` → `PortraitPhoto` renders an `<img>` with `width`, `height`,
`fetchPriority="high"` and alt text "Karan Gadekar, Data Engineer Associate". If the file can't be found, it shows
the monogram instead of a broken image.

### Add GMC website screenshots

Only real screenshots of <https://gadekarmarketcomplex.app/>.

1. Take the screenshots:
   - **Desktop:** open the site in Chrome with the window wide, press `Win + Shift + S` to capture, or use Chrome
     DevTools (F12 → `Ctrl + Shift + P` → "Capture screenshot"). Crop/resize to **1600×1000**.
   - **Phone (optional):** DevTools device toolbar (`Ctrl + Shift + M`), pick a phone, "Capture screenshot".
     About **780×1688**.
2. Convert to WebP at <https://squoosh.app/> (under ~200 KB each) and save as:

   ```text
   public\images\gmc-homepage.webp
   public\images\gmc-mobile.webp
   ```

3. In `src\config\site.ts` (block marked **YOUR IMAGES**), change
   `const gmcScreenshots: (SiteImage & { alt: string })[] = [];` to:

   ```ts
   const gmcScreenshots: (SiteImage & { alt: string })[] = [
     { src: '/images/gmc-homepage.webp', alt: 'Gadekar Market Complex website homepage', width: 1600, height: 1000 },
     { src: '/images/gmc-mobile.webp', alt: 'Gadekar Market Complex website on a phone', width: 780, height: 1688 },
   ];
   ```

4. Save. The first screenshot replaces the illustrated card in the GMC section and a **View Website Screenshots**
   button appears. Every screenshot opens the live site in a new tab. Screenshots load lazily (only when scrolled
   near), keep a 16:10 frame on all screen sizes, and phone screenshots are shown whole.

**Path rules (most image problems come from these):**

- The file lives in `public\images\…`, but the code path starts with `/images/…`. Never write `public` in the path.
- Use forward slashes `/` in code, even on Windows.
- Match upper/lower case exactly. Windows ignores case, but Netlify does not: `Karan-Gadekar.webp` and
  `karan-gadekar.webp` are different files online.

## Step 7: Build the production version

```bat
npm run build
```

This runs the TypeScript check, builds the site, and prerenders the page to static HTML.

- **Success** looks like this at the end, with no red `error` lines:

  ```text
  Prerendered 38.7 KB of HTML into dist/index.html
  ```

- The finished website is in the **`dist\`** folder. That folder is what gets deployed.
- **Test the built version locally:**

  ```bat
  npm run preview
  ```

  Open `http://localhost:4173/`. Stop it with Ctrl + C.

## Step 8: Common errors

| Problem | Fix |
| --- | --- |
| `'node' is not recognized` / `'npm' is not recognized` | Install Node.js LTS (Step 2), then **close and reopen** VS Code. |
| `npm.ps1 cannot be loaded because running scripts is disabled` | VS Code is using PowerShell. Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once and answer **Y**, or switch the terminal to Command Prompt (the `+ ▾` menu in the terminal → **Command Prompt**). |
| `npm ERR! enoent … package.json` | Wrong folder. Run `dir package.json`; open the folder that contains it (Step 3). |
| `'vite' is not recognized` or `Cannot find module …` | Dependencies not installed. Run `npm ci`. |
| `npm ci` fails with "lock file out of sync" | Run `npm install` instead. |
| `Port 5173 is in use` | Vite normally picks the next free port (5174…), so use the address it prints. Or close the other terminal running `npm run dev`. |
| Photo/screenshot not showing (monogram still visible) | Check the file is in `public\images\`, the name and case match exactly, the path in `site.ts` starts with `/images/`, and you saved `site.ts`. |
| Image looks squashed or blurry | Set `width` and `height` in `site.ts` to the image's real pixel size (right-click the file → Properties → Details). Use at least 800 px wide for the photo. |
| Build fails with `error TS…` | A typing mistake in a `.ts`/`.tsx` file. The message shows the file and line, for example `src/config/site.ts(52,3)`. Usually a missing comma, quote or bracket. |
| Contact form missing on the built site | Expected until `VITE_FORMSPREE_FORM_ID` is set (README section 7). |
| Changes to `.env` not showing | Stop the dev server and start it again, or rebuild. |

---

## Publishing on your own domain (summary)

1. **Formspree:** create the form at <https://formspree.io/> with recipient `karangadekar937@gmail.com`, verify the
   email, copy the form ID.
2. **Domain:** buy one from any registrar.
3. **Netlify:** sign up at <https://www.netlify.com/>. Either drag the `dist` folder onto
   <https://app.netlify.com/drop> (after building with your `.env` filled in), or connect a GitHub repository
   (settings come from `netlify.toml`).
4. **Environment variables** (Netlify → Site configuration → Environment variables):
   `VITE_FORMSPREE_FORM_ID`, `VITE_SITE_URL=https://your-domain`, and optionally `VITE_LINKEDIN_URL`,
   `VITE_GITHUB_URL`. Redeploy after adding them.
5. **Connect the domain:** Netlify → Domain management → Add a domain, then follow its DNS instructions at your
   registrar. HTTPS is issued automatically.
6. **Test** a real message through the contact form and confirm it arrives.
7. **Google Search Console:** verify the domain and submit `https://your-domain/sitemap.xml` (README section 14).
