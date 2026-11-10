# SAMARPAN TECHNO SOLUTIONS: Corporate Website

Corporate website for **SAMARPAN TECHNO SOLUTIONS**, Bangalore (manufacturers of electrical control panels, providing seva in the field of electrical engineering).

Built with React 19, Vite, TypeScript, Tailwind CSS v4, React Router, Framer Motion, React Hook Form + Zod, and Lucide icons.

---

## 1. Quick start

Requirements: **Node.js 20+** (tested on Node 24) and npm.

```bash
npm install
cp .env.example .env      # then fill in the values (see section 2)
npm run dev               # http://localhost:5173
```

| Command           | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Development server with hot reload                   |
| `npm run build`   | Type-check + production build into `dist/`           |
| `npm run preview` | Serve the production build locally (port 4173)       |
| `npm run lint`    | Lint with oxlint                                     |

## 2. Environment variables (required before going live)

| Variable                    | Purpose |
| --------------------------- | ------- |
| `VITE_SITE_URL`             | Final verified domain, e.g. `https://www.example.com` (no trailing slash). Enables canonical URLs, `og:url`, `sitemap.xml` and the `url` field in structured data. If empty, these are **omitted**, not filled with a fake domain. |
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key for the contact form. Create a free key at <https://web3forms.com> **using samarpantekk@gmail.com** so enquiries arrive in that inbox. |

Variables are embedded at **build time**. After changing them, rebuild and redeploy.

### How the contact form behaves
- All fields are validated (name, phone with 10–13 digits, email format, service selection, message of 10+ characters). Company name is optional.
- While sending, the button shows "Sending…" and is disabled.
- A success message is shown **only** when Web3Forms confirms delivery (`success: true`).
- On any failure (server error, network error, timeout after 15 s) an error is shown with **"Send via WhatsApp"** and **"Send via Email"** buttons pre-filled with the visitor's message.
- If no access key is configured, the form says online delivery is not set up and offers the same WhatsApp/email fallback. It never fakes a success message.
- A hidden honeypot field reduces spam.

## 3. Project structure

```
src/
  assets/            Local images (place real company photos here)
  components/
    layout/          Header, DesktopNav, MobileNav, Footer, Logo
    sections/        HeroSection, PageHero, CTASection, ContactInfo, Nameplate
    ui/              Button, Reveal, SectionHeading, ResponsiveImage, PlaceholderBadge, WhatsAppIcon
    ServiceCard, ProjectCard, GalleryGrid (+ lightbox), ContactForm, MapEmbed,
    Breadcrumbs, FloatingActions (WhatsApp + Back-to-top), PageLoader
  data/              ← EDIT CONTENT HERE
    company.ts       Verified company details (single source of truth)
    services.ts      Service categories & descriptions
    content.ts       Navigation, "Why choose us", capabilities, enquiry steps
    projects.ts      Project portfolio (currently DEMO placeholders)
    gallery.ts       Gallery images & categories
    photos.ts        Image registry (currently illustrative Unsplash photos)
    routes.ts        Page titles, meta descriptions, sitemap settings
  hooks/useSeo.ts    Per-page title/meta/OG/canonical/breadcrumb JSON-LD
  layouts/           MainLayout (header, footer, floating buttons, scroll handling)
  lib/               contact links, enquiry submission + validation, image URLs, schema
  pages/             Home, About, Services, Projects, Gallery, Contact, 404
  types/             Shared TypeScript types
```

## 4. Content awaiting company approval

The brief prohibits inventing company facts, so the following are clearly labelled placeholders:

| Item | File | What to do |
| ---- | ---- | ---------- |
| Mission & vision | `src/pages/AboutPage.tsx` (`missionVision`) | Replace text, set `approved: true` |
| Proprietor photo | `src/pages/AboutPage.tsx` (monogram "MNG") | Replace with an approved portrait |
| Engineering capabilities list | `src/data/content.ts` (`capabilities`) | Confirm or edit panel types |
| Service descriptions | `src/data/services.ts` | Add confirmed technical scope if desired |
| Projects | `src/data/projects.ts` | Replace demo entries with real ones, set `isDemo: false` |
| Gallery & site photos | `src/data/photos.ts`, `src/data/gallery.ts` | Replace with company photographs |

Once **all** placeholders are replaced, set `SHOW_PLACEHOLDER_LABELS = false` in `src/data/company.ts` to hide the remaining labels.

Do not add client names, statistics, certifications or years of experience unless they are verified and approved for publication.

## 5. Replacing images

Images are currently free-licence illustrative photos from [Unsplash](https://unsplash.com/license), served through Unsplash's CDN. The CDN automatically delivers AVIF or WebP at responsive sizes.

To use company photos:
1. Convert them to **WebP** (or AVIF), about 1600–2000 px on the long edge, ideally under 300 KB each.
2. Put them in `public/images/` (for example `public/images/panel-01.webp`).
3. Update `src/lib/images.ts` so `photoUrl()` returns the local path for local entries (for example, add an optional `src` field to `Photo` and return it when present).
4. Write accurate, descriptive `alt` text for each photo in `src/data/photos.ts`.

## 6. SEO

- Unique title and meta description per page (`src/data/routes.ts`), applied by `useSeo()`.
- Open Graph and Twitter card tags.
- Canonical URLs and `og:url` (when `VITE_SITE_URL` is set).
- `robots.txt` is always generated; `sitemap.xml` is generated when `VITE_SITE_URL` is set (see `vite.config.ts`).
- `ElectricalContractor` (a schema.org LocalBusiness type) JSON-LD is injected statically into `index.html`, built **only** from verified details (no ratings, hours or coordinates).
- `BreadcrumbList` JSON-LD on inner pages; the 404 page is marked `noindex`.
- Semantic landmarks, one `<h1>` per page, and descriptive alt text.

Content targets phrases such as "Electrical Control Panel Manufacturers in Bangalore". Search rankings are not guaranteed. After launch, submit the sitemap in Google Search Console and create a Google Business Profile using the same name, address and phone number.

## 7. Deployment

This is a single-page app, so the host must serve `index.html` for unknown paths. Config for this is included.

**Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` handles SPA routing. Add the environment variables under Site settings → Environment variables.

**Vercel:** framework preset "Vite". `vercel.json` handles SPA routing. Add the environment variables in Project settings.

**Other static hosts / cPanel (Apache):** upload the contents of `dist/` and add an `.htaccess` file:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

Before going live:
- [ ] Set `VITE_SITE_URL` to the verified domain
- [ ] Set `VITE_WEB3FORMS_ACCESS_KEY` and send one real test enquiry
- [ ] Replace or approve placeholder content (section 4)
- [ ] Check that the Google Maps pin matches the office location
