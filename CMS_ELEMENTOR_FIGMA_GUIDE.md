# CMS, Elementor & Figma Architecture Guide

**Portfolio Owner:** Md. Shahriar Rahman Nadim  
**Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React  
**Design Alignment:** 1:1 Figma Variables + Elementor Flexbox/Grid Containers + Headless WordPress Ready

---

## 1. Figma Variable Token Table (1:1 Sync)

Import these variables directly into **Figma Local Variables** (`Variables → Create collection → Design Tokens`) and **Elementor Site Settings → Global Colors / Fonts**:

| Token Name | CSS Variable | Value | Usage |
| :--- | :--- | :--- | :--- |
| `bg/canvas` | `--token-bg-canvas` | `#080301` | Deep Espresso page canvas |
| `bg/surface-dark` | `--token-bg-surface-dark` | `#120906` | Floating nav pills & dark footer bars |
| `bg/hero-gradient` | `--token-bg-hero-gradient` | `linear-gradient(135deg, #D1450F 0%, #A02C07 55%, #2A1107 100%)` | Hero & Contact CTA surfaces |
| `card/cream` | `--token-card-cream` | `#F9F6F2` | High-contrast cream Bento cards |
| `card/orange` | `--token-card-orange` | `#C0390B` | AA-compliant burnt orange surfaces with white text |
| `card/glass` | `--token-card-glass` | `rgba(255, 255, 255, 0.12)` | Frosted Bento stat & contact cards |
| `text/primary` | `--token-text-primary` | `#FFFFFF` | Primary display & dark-mode body copy |
| `text/muted` | `--token-text-muted` | `#8C7A70` | Dual-tone headline words & secondary labels |
| `text/dark` | `--token-text-dark` | `#18120F` | Primary copy inside `#F9F6F2` cream cards |
| `radius/hero` | `--token-radius-hero` | `32px` | Outer Hero Bento container |
| `radius/card` | `--token-radius-card` | `20px` | Standard Bento cards |
| `radius/pill` | `--token-radius-pill` | `9999px` | Pill navigation, tags, and CTA buttons |
| `font/family` | `--font-plus-jakarta` | `Plus Jakarta Sans` | Display & UI typography (`-0.03em` tracking on headings) |

---

## 2. How to Add New Pages in Next.js (Zero Code Rewrites)

The dynamic route `src/app/[...slug]/page.tsx` automatically creates any new page defined in `src/data/pagesData.ts` or returned by WordPress.

### Option A: Local Config (`src/data/pagesData.ts`)
1. Open `src/data/pagesData.ts`.
2. Add a new key to `pagesData`, for example `seoAudit`:
   ```ts
   "seo-audit": {
     slug: "seo-audit",
     title: "Technical SEO Audit — Md. Shahriar Rahman Nadim",
     description: "Full technical SEO & conversion optimization audit.",
     blocks: [
       servicesBlock,
       contactBlock,
     ],
   }
   ```
3. Visit `/seo-audit` — it renders immediately with full SEO metadata, sticky header, and modular Bento blocks.
4. Optionally add `{ label: "SEO Audit", href: "/seo-audit" }` to `src/data/siteConfig.ts` under `navigation`.

### Option B: Connect Headless WordPress (WPGraphQL or REST API)
1. Create a `.env.local` file in the project root:
   ```env
   # Either WPGraphQL:
   WORDPRESS_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql

   # Or WP REST API:
   NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com
   ```
2. In WordPress, attach an ACF Flexible Content / JSON field (`page_blocks` in REST or `portfolioBlocks.blocks` in WPGraphQL) returning objects matching `PageBlock` in `src/types/cms.ts`.
3. `src/lib/wordpress.ts` queries WordPress first (with ISR `revalidate: 60`) and automatically falls back to `src/data/pagesData.ts` if no external CMS endpoint is configured or reachable.

---

## 3. Elementor Pro Flexbox/Grid Container Blueprint

Every section in `src/components/blocks/` mirrors Elementor's **Flexbox & CSS Grid Containers** so you can recreate or paste these exact styles inside WordPress + Elementor Pro.

### Step 1: Elementor Site Settings → Custom CSS
Paste into **Site Settings → Custom CSS** (or **Theme Customizer → Additional CSS**):

```css
:root {
  --token-bg-canvas: #080301;
  --token-bg-surface-dark: #120906;
  --token-bg-hero-gradient: linear-gradient(135deg, #D1450F 0%, #A02C07 55%, #2A1107 100%);
  --token-card-cream: #F9F6F2;
  --token-card-orange: #C0390B;
  --token-card-glass: rgba(255, 255, 255, 0.12);
  --token-text-primary: #FFFFFF;
  --token-text-muted: #8C7A70;
  --token-text-dark: #18120F;
}

body {
  background-color: var(--token-bg-canvas);
  color: var(--token-text-primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.bento-hero-container {
  background: var(--token-bg-hero-gradient);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.bento-card-cream {
  background-color: var(--token-card-cream);
  color: var(--token-text-dark);
  border-radius: 20px;
}

.bento-card-orange {
  background-color: var(--token-card-orange);
  color: var(--token-text-primary);
  border-radius: 20px;
}

.bento-card-glass {
  background: var(--token-card-glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
}

.bento-heading-tight {
  letter-spacing: -0.03em;
  line-height: 1.02;
}
```

### Step 2: Section Container Mapping in Elementor
1. **`HeroBentoBlock`:**
   - Outer Container: **Boxed (`1320px`)**, CSS Class `bento-hero-container`, Padding `24px 40px`.
   - Inner Container: **Flexbox Row** (`60%` Left / `40%` Right on Desktop, `Wrap` on Tablet/Mobile).
   - Left Bottom Stats: Nested **2-Column CSS Grid Container** (`gap: 16px`), applying `bento-card-cream` to Card 1 and `bento-card-glass` to Card 2.
   - Right Profile Card: Vertical **Flexbox Container** with class `bento-card-cream`, `border-radius: 22px`, `max-width: 330px`.
2. **`AboutSplitBlock`:**
   - Outer Container: **Boxed (`1320px`)**, Background `#080301`.
   - Main Split: **2-Column Container** (`42%` Portrait / `58%` Story + Sub-Cards).
   - Right Bottom: Nested **2-Column CSS Grid Container** (`gap: 16px`).
3. **`ServicesMatrixBlock`:**
   - Outer Container: **Boxed (`1320px`)**.
   - Matrix: **Elementor Grid Container** set to `4 Columns × 2 Rows` (`gap: 16px`).
   - Row 1 Col 3: Leave an empty **Flexbox Container** centered vertically/horizontally for the editorial micro-quote.
   - Row 2 Cols 1–2: Set **Column Span = 2** for the bottom-left summary text + `View my work` pill button.
4. **`ContactFooterBlock`:**
   - Outer Container: **Boxed (`1320px`)**.
   - Layout: **2-Column Container** (`50%` Orange Gradient CTA / `50%` 2×2 Contact Bento Grid + Full-Width Credentials Bar).

