# Shahriar Nadim — Portfolio

Next.js portfolio and digital-agency site (App Router, TypeScript, Tailwind CSS, Framer Motion).

The production build is **fully static** (`output: "export"`), so it can be hosted on GitHub Pages,
and the contact form posts directly to Formspree from the browser.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and preview

```bash
npm run build      # writes the static site to out/
npm run preview    # serves out/ at http://localhost:3000
```

`npm run typecheck` runs TypeScript with no emit.

## Environment

Copy `.env.example` to `.env.local` for local overrides:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree form endpoint. Defaults to `https://formspree.io/f/xbgodown`. |
| `NEXT_PUBLIC_SITE_URL` | Public site origin used for canonical/OG/sitemap/robots. Set automatically by the Pages workflow. |
| `NEXT_PUBLIC_BASE_PATH` | Subpath for project Pages sites (e.g. `/my-portfolio`). Empty for local dev, user sites, and custom domains. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics 4 ID. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console verification token. |

`NEXT_PUBLIC_*` values are inlined at build time. `.env.local` is git-ignored.

## Deploy to GitHub Pages (step by step)

### 1. Create the repository

Create a **public** repository on GitHub. Do **not** initialize it with a README if you are pushing
this existing history.

- User site (recommended, served at the domain root): name it `<your-username>.github.io`
- Project site (served under `/<repo>/`): any other name, e.g. `portfolio`

The workflow reads the correct base path automatically, so both work.

### 2. Push this project

```bash
git remote add origin https://github.com/<your-username>/<repo>.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### 4. Let the workflow deploy

Open the **Actions** tab. The **Deploy to GitHub Pages** workflow runs on the push (or start it with
**Run workflow**). When it finishes, the deployment URL is shown in the run and under
**Settings → Pages**:

- User site: `https://<your-username>.github.io/`
- Project site: `https://<your-username>.github.io/<repo>/`

Every later push to `main` redeploys automatically.

### 5. Optional: custom domain

Add the domain under **Settings → Pages → Custom domain** and create the DNS records GitHub shows.
After the domain is active, add a repository variable **Settings → Secrets and variables → Actions →
Variables → New variable** named `SITE_URL` with `https://your-domain.com`, then re-run the workflow so
canonical URLs and the sitemap use the custom domain.

## Notes

- Static export means no Next.js API routes or server-rendered redirects. Legacy paths
  (`/home`, `/portfolio`, `/projects`, `/privacy`, `/cases`) use small HTML redirect pages in `public/`.
- The contact form validates in the browser and posts JSON to Formspree (CORS is supported by
  Formspree). Submissions appear in the Formspree dashboard and are emailed to the form owner.
- `out/` and `.next/` are generated and git-ignored. Never commit `.env.local`.
