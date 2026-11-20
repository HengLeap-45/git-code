# Portfolio 3D

A 3D personal portfolio built with React, TypeScript, Vite, Tailwind, Three.js (React Three Fiber + Drei), Framer Motion, and GSAP-ready structure.

## Pages
Home, About, Skills, Projects, Journey, Contact, and a custom 404.

## Run it

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # type-check and production build to dist/
npm run preview    # preview the production build
```

## Customize (everything personal is in `src/data/` and `public/`)

| What | Where |
| --- | --- |
| Name, title, bio, email, socials, stats, goals | `src/data/profile.ts` |
| Skills and proficiency levels (0-100) | `src/data/skills.ts` |
| Projects, links, challenges, solutions | `src/data/projects.ts` |
| Education, work, certifications, achievements | `src/data/experience.ts` |
| CV | `public/cv.pdf` |
| Profile photo | `public/profile.jpg` |
| Project thumbnails | `public/projects/` (referenced by the `image` field) |

Placeholder values are intentionally generic. Replace them before publishing. Set a project's `liveUrl` or `githubUrl` to `""` to hide that button.

## Contact form setup

The form sends through `api/contact.ts`, a serverless function, so no secrets reach the browser.

1. Create a free account with an email provider such as [Resend](https://resend.com) and generate an API key.
2. Copy `.env.example` values into your hosting dashboard (Vercel, Netlify, or similar) as environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM`
3. Deploy. The form includes validation, a honeypot spam trap, and rate limiting (5 messages per minute per IP).

Without these variables the form shows a clear "not configured" message rather than failing silently.

## Deploy

Works on Vercel (uses `vercel.json`) and Netlify (uses `public/_redirects`). Both handle client-side routing.

## 3D performance

The 3D scene is lazy-loaded and skipped automatically on devices without WebGL, with `prefers-reduced-motion` enabled, or on low-core or narrow screens. Those visitors see a static gradient instead. The Three.js bundle is code-split, so pages load without it.

## Notes

- Skill levels default to 50 so they are not a self-assessment. Set your real values.
- The custom cursor only activates on fine-pointer desktop devices.
- Light and dark themes are both defined and persisted.
