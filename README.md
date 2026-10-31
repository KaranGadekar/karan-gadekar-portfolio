# Karan Gadekar — Portfolio

Single-page personal portfolio for **Karan Gadekar** (Data Engineer Associate | Developer | Entrepreneur).
Dark, responsive, accessible, prerendered for speed and search engines.

---

## 1. Project overview

Sections, in order: Navigation, Hero, About, Professional Experience (Bootcamp and Associate timeline), Selected Projects, Technical Skills,
Featured Personal Project (Gadekar Market Complex), Entrepreneurship, Education with Courses & Training, Contact, Footer.

Content rules baked into the code:

- No fabricated metrics, screenshots, photos, links or certificates. Anything not yet supplied is **hidden**, not faked.
- Company (InfoCepts) work is text-only and high level. No internal data, code, screenshots or logos.
- No location other than the hometown (Jalna, Maharashtra, India) labelled as **Hometown**.
- Visible content is English only (`<html lang="en">`).

## 2. Technology stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite 8 (+ build-time prerender to static HTML) |
| Animation | Motion for React (`LazyMotion` + `m`, features lazy-loaded) |
| Icons | Lucide React (LinkedIn/GitHub marks are small inline SVGs: Lucide has no brand icons) |
| Font | Inter Variable, self-hosted via `@fontsource-variable/inter` (no Google Fonts request) |
| Contact form | Formspree (plain `fetch`, JSON) |
| Hosting | Netlify (`netlify.toml`) or Vercel (zero-config) |

Project layout:

```text
src/
  config/site.ts        ← contact details, photo, screenshots, social links (one place to edit)
  data/                 ← experience, projects, skills, education, courses
  components/           ← Navbar, Footer, ContactForm, ProjectCard, Reveal, Button, TagList, BackToTop
  sections/             ← one file per page section
  styles/               ← variables.css (palette/type tokens), global.css, components.css
  entry-server.tsx      ← used only at build time for prerendering
scripts/prerender.mjs   ← injects prerendered HTML + font preload into dist/index.html
vite.config.ts          ← SEO plugin: JSON-LD, canonical/OG URL tags, robots.txt, sitemap.xml
```

## 3. Installation

Requires Node.js 22.12 or newer (the current LTS, Node 26, is recommended).

```bash
npm install
```

## 4. Development server

```bash
cp .env.example .env     # optional; fill values when you have them
npm run dev              # http://localhost:5173
```

In development, if no Formspree ID is set, the form shows a yellow **Development notice** and refuses to submit.
That notice never appears in a production build.

## 5. Production build

```bash
npm run build
```

This runs, in order: TypeScript check → client build → SSR build → prerender into `dist/index.html`.
Output folder: `dist/`.

Other scripts: `npm run typecheck`, `npm run build:client` (no prerender).

## 6. Local preview

```bash
npm run preview          # serves dist/ at http://localhost:4173
```

## 7. Formspree setup (contact form)

1. Create an account at <https://formspree.io/>.
2. Create a new form.
3. Set the recipient email to `karangadekar937@gmail.com`.
4. Complete Formspree's email verification for that address.
5. Copy the form ID — the part after `/f/` in `https://formspree.io/f/{FORM_ID}`.
6. Create a `.env` file in the project root (copy `.env.example`).
7. Add `VITE_FORMSPREE_FORM_ID=yourFormId`.
8. Restart the dev server (`npm run dev`) — env vars are read at startup.
9. Submit a real test message from the site.
10. Confirm the email arrives in the inbox (check spam the first time).
11. Add the same `VITE_FORMSPREE_FORM_ID` variable in Netlify/Vercel and redeploy.

Behaviour:

- **Without an ID (production):** the form is replaced by an "Email me / Open WhatsApp" card. Nothing pretends to send.
- **With an ID:** success is shown **only** when Formspree returns HTTP 2xx. Validation errors from Formspree are mapped to
  fields; network/server failures show the failure message with the direct email address. Values are kept on failure,
  duplicate submissions are blocked while a request is in flight, and a hidden `_gotcha` honeypot filters basic spam.
- The form ID is public by design (it is visible in any Formspree form). Never put a Formspree **API key** in the frontend.

## 8. Replacing the profile photo

Images live in `public/images/` (not `public/assets/`: `/assets/*` is cached for a year by `netlify.toml`,
so a replaced file with the same name would not update for returning visitors).

1. Export a portrait as **WebP**, 4:5, about **800×1000 px**, under ~150 KB (JPG also works).
2. Save it as `public/images/karan-gadekar.webp`.
3. In `src/config/site.ts` (block marked **YOUR IMAGES**) change `const profilePhoto: SiteImage | null = null;` to:

   ```ts
   const profilePhoto: SiteImage | null = { src: '/images/karan-gadekar.webp', width: 800, height: 1000 };
   ```

   Use the image's real pixel size. The `src` starts with `/images/` (no `public`).

The photo is cropped to 4:5 with `object-fit: cover` (never stretched), loads with high priority (it is above the
fold), and falls back to the KG monogram if the file is missing. Component: `PortraitPhoto` in `src/sections/Hero.tsx`.
Full walkthrough: `GETTING-STARTED.md`, section "Add your photo".

## 9. Gadekar Market Complex screenshots

Only use genuine screenshots of <https://gadekarmarketcomplex.app/>.

1. Save WebP files in `public/images/`: desktop **1600×1000** (16:10), phone **780×1688**, each under ~200 KB.
2. Add them to `const gmcScreenshots` in `src/config/site.ts` (first entry = desktop homepage, shown on the card):

   ```ts
   const gmcScreenshots: (SiteImage & { alt: string })[] = [
     { src: '/images/gmc-homepage.webp', alt: 'Gadekar Market Complex website homepage', width: 1600, height: 1000 },
     { src: '/images/gmc-mobile.webp', alt: 'Gadekar Market Complex website on a phone', width: 780, height: 1688 },
   ];
   ```

The first screenshot replaces the illustrated card; a **View Website Screenshots** button appears and opens a
gallery. Every screenshot links to the live site in a new tab. Images are lazy-loaded, framed at 16:10, and phone
shots are shown whole (`object-fit: contain`). Component: `src/sections/FeaturedProject.tsx`.
To enable **Contact GMC**, set `gmcContactHref` to a verified business `tel:`, `mailto:` or URL.

## 10. LinkedIn and GitHub

Set in `.env` (and in the hosting dashboard):

```bash
VITE_LINKEDIN_URL=https://www.linkedin.com/in/your-handle
VITE_GITHUB_URL=https://github.com/your-handle
```

Links then appear in the Contact section and footer, and are added to the JSON-LD `sameAs` list. Empty = hidden.

## 11. Custom domain

1. Buy/choose the domain and connect it in Netlify or Vercel (both provide free HTTPS).
2. Set `VITE_SITE_URL=https://your-domain` (no trailing slash needed) in the hosting dashboard.
3. Redeploy. The build then adds: canonical URL, `og:url`, `og:image` (`/og-image.png`), the `WebSite` JSON-LD,
   `sitemap.xml`, and a `Sitemap:` line in `robots.txt`.

Without `VITE_SITE_URL`, none of these URL-dependent tags are emitted — no domain is guessed.

## 12. Deploy on Netlify

1. Push this project to a Git repository (the `.gitignore` already excludes `.env`, `node_modules`, `dist`).
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 22).
4. **Site configuration → Environment variables**: add `VITE_FORMSPREE_FORM_ID`, `VITE_SITE_URL`, and optionally
   `VITE_LINKEDIN_URL`, `VITE_GITHUB_URL`.
5. Deploy, then **Deploys → Trigger deploy** again whenever you change a variable.

Drag-and-drop alternative: run `npm run build` locally (with `.env` filled) and drop the `dist/` folder on
<https://app.netlify.com/drop>.

## 13. Deploy on Vercel

1. <https://vercel.com/new> → import the repo. Vercel detects Vite.
2. Build command `npm run build`, output directory `dist`.
3. Add the same environment variables under **Settings → Environment Variables**, then redeploy.

## 14. Google Search Console

1. Open <https://search.google.com/search-console/about> and add a **Domain** property (DNS TXT record) or a
   **URL-prefix** property (HTML tag or file).
2. **Sitemaps** → submit `https://your-domain/sitemap.xml`.
3. **URL Inspection** → inspect the homepage → **Request indexing**. Confirm "URL is available to Google".
4. Monitor **Pages** (indexing) for errors.
5. **Performance → Search results → Queries**: review real queries, including Marathi ones (e.g. करण गाडेकर), with
   impressions, clicks and position.
6. Check **Core Web Vitals** and **HTTPS** reports for technical issues.

What the site does for English/Marathi discovery, honestly:

- Clear English content, one `h1`, descriptive title/description, `Person` structured data with
  `alternateName: "करण गाडेकर"` (Devanagari spelling — **Karan should confirm it**), hometown, employer and education.
- No hidden text, keyword lists, translated duplicates or fake local pages.
- Ranking is decided by Google and depends on competition, links and time. Nothing here guarantees a position.
  The best boosts: link to the site from LinkedIn, GitHub and the GMC website.

## 15. Sitemap

Generated automatically at build time when `VITE_SITE_URL` is set (single canonical URL). Submit it in Search Console
(step 14.2). Do not submit preview/staging URLs.

## 16. Troubleshooting

| Problem | Fix |
| --- | --- |
| Form shows Email/WhatsApp card instead of fields | `VITE_FORMSPREE_FORM_ID` missing at **build** time. Set it in hosting env vars and redeploy. |
| Form submits but no email | Verify the recipient in Formspree; check spam; check the Formspree dashboard for the submission. |
| Formspree 403 / "form not found" | Wrong ID, or form disabled in Formspree. |
| No canonical / sitemap in `dist` | `VITE_SITE_URL` not set or not an `https://` URL. |
| LinkedIn/GitHub not showing | Env var empty or not a full `https://` URL. |
| Hydration warning in console | Content differs between build and browser. Rebuild after editing `src/config/site.ts`. |
| Build fails on old Node | Install the current LTS from nodejs.org (Netlify uses 22 via `netlify.toml`). |
| Fonts look different locally | Hard refresh; the font is bundled, no network font request is made. |

## Content to confirm / supply

New to the tools? Read `GETTING-STARTED.md` (Windows + VS Code, step by step).


- Real profile photo (section 8).
- Genuine GMC screenshots and a verified GMC business contact (section 9).
- LinkedIn and GitHub URLs (section 10).
- Production domain (section 11).
- Formspree form ID (section 7).
- Certification status of the three courses. If certified, rename the heading in `src/sections/Education.tsx` to
  "Courses & Certifications" and add real certificate URLs in `src/data/skills.ts`.
- That the GMC site's stack is HTML5/CSS3/JavaScript on Netlify (as stated in the brief).
- Devanagari name spelling "करण गाडेकर" in `vite.config.ts`.
