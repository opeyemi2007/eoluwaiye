# Esther's portfolio (eoluwaiye.)
React + TypeScript + Vite, React Router, CSS Modules, Framer Motion. No Tailwind.

## Run
```
npm install
npm run dev        # local development
npm run build      # typecheck (site + api) + production build + robots/sitemap
npm run preview    # serve the production build
```

## Deploy (Vercel recommended: serves /api functions and SPA routes via vercel.json)
1. Push to GitHub, import in Vercel. 2. Add the variables from `.env.example` (server secrets without `VITE_`). 3. Add the domain under Project > Domains, then set `VITE_SITE_URL` and redeploy (enables canonical tags and sitemap.xml).

## Connect services (nothing works until these are done; forms say "not connected" until then)
- **Contact form:** create a Resend account, verify a sending domain/address, set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `VITE_CONTACT_ENDPOINT=/api/contact`.
- **Email list:** MailerLite account, create an API token and (optionally) a group, set `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID`, `VITE_NEWSLETTER_ENDPOINT=/api/subscribe`. Turn on double opt-in and the welcome email in MailerLite itself; export subscribers from MailerLite. MailerLite has no tags: the group marks site sign-ups.
- **Booking:** set `VITE_BOOKING_URL` (Calendly/Cal.com). The button appears automatically.
- **Analytics:** set `VITE_ANALYTICS_DOMAIN` (Plausible). Only event names plus `service`/`label` are sent, never form contents.
- **CV:** put the PDF in `public/` and set `VITE_CV_URL=/file.pdf`. **Socials:** `VITE_INSTAGRAM_URL`, `VITE_TIKTOK_URL`, `VITE_LINKEDIN_URL`, `VITE_WHATSAPP_URL`.
- **Video:** host on YouTube/Vimeo/Cloudflare Stream/Bunny and use the direct file/stream URL in `mediaUrl`. Do not commit large videos.

## Update content (all in `src/data/`)
- **Add a project:** push an object into `projects.ts` (fields in `types/content.ts`). It shows only when `approval:'approved'` and `permission:true`. Set `featured:true` for case-study cards.
- **Add a result:** `results.ts`; shows only when `verified`, `permission` and `visible` are all true. Use `countTo` (+ `prefix`/`suffix`) for count-up numbers.
- **Add a testimonial:** `testimonials.ts` with `approval:'approved'`. The section appears at 2+ approved quotes.
- **Certificates / bio / response time / contact channels:** `data/site.ts`. **Services copy and status (`live`, `coming-soon`, `hidden`):** `data/services.ts`.
- **Logo:** replace the markup in `components/common/Logo.tsx` with the approved SVG. **Colours:** `styles/variables.css`.
- Later option: a headless CMS (e.g. Sanity or Decap) could feed these same types without changing components.

## Content Esther must supply
Final logo SVG and colour approval; domain; professional photos; written client permissions; verified result figures and date ranges (and hook/hold-rate definitions from the platform analytics); approved testimonials (Fitt.Ola, Abiscentnstuff, Classic Makeup USA, The Passage Co); work samples with captions; 3+ finished Graphics samples; certificates (ALX file + year); CV PDF; booking link; social URLs and verified TikTok/Instagram profile URLs (TikTok handle is @petitefave__ugc), Classic Skincare and Mamarazzi logos, revised About bio and photo; response-time claim; working terms; profile details for About; Passage Co boost info; legal review of the privacy policy.

## Media supplied by Esther
Images are in `public/work` (webp), client logos in `public/clients`, the "eo." logo in `public/brand` (raster, trimmed from the supplied PNG; replace with a vector when available). Videos are H.264 MP4s in `public/media` for **local preview only** (gitignored). Upload them to a video host/CDN, then set `VITE_MEDIA_BASE` to that folder URL (file names are in `src/data/projects.ts`). Client logos can be hidden individually with `permission:false` in `src/data/clients.ts`; Esther confirmed client permission for all supplied media. The green "+F" logo still needs its client name in `src/data/clients.ts`.

## Client revision pass (latest)
Done: wordmark only in intro + footer (lettermark everywhere else), uppercase centred ESTHER, cream token `--cream:#F6F0E4`, editorial UGC card from real UGC frames, `@petitefave__ugc`, smaller client logos + Classic Skincare and Mamarazzi, new About (verbatim copy, portrait, facts, ALX certificate with enlarge viewer), new newsletter copy, side-by-side contact panels, centred footer copyright.
Still needed from Esther (these buttons/icons stay hidden or plain text until set, never faked): `VITE_CV_URL` (CV PDF), `VITE_BOOKING_URL`, `VITE_TIKTOK_URL` (also powers "See Petitefave"), `VITE_INSTAGRAM_URL`, `VITE_WHATSAPP_URL`, `VITE_LINKEDIN_URL`, the green "+F" client's name, and the Resend/MailerLite keys.

## Cloudinary videos
Add a video with `...cloud(`${CL}/v<version>/<File>.mp4`)` in `src/data/projects.ts` (full HTTPS URL, unchanged). Thumbnails are automatic: Cloudinary generates a still frame 1.5 seconds in (`so_1.5,w_720,c_limit,q_auto`, `.jpg`), so you never make cover images. Change `so_1.5` to pick another second. If Cloudinary refuses the thumbnail (e.g. strict transformations are on), the gallery shows the video's own first frame; if even that fails, a neutral placeholder. To edit a video, change its `title`, `alt`, `caption`, `attribution`, or add `result`/`featured` only for verified facts.
