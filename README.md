# Harsh — Portfolio

A black-and-crimson, single-page portfolio built with React, Vite, GSAP (ScrollTrigger) and Lenis.

## Run it

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev       # http://localhost:5173, shows "add this" chips for missing details
npm run build     # production site in dist/
npm run preview   # serve the production build at http://localhost:4173
```

## Edit your content

Everything you see on the site comes from `src/data/`:

| File | What it holds |
|---|---|
| `profile.js` | Name, titles, intro, location, availability, email and social links, About text |
| `projects.js` | Every project: summary, problem, solution, workflow, features, tech, status, links, screenshots |
| `externalWebsites.js` | Project 09 websites (TechUpgrad, Positive Quadrant, Wise Engineering and others) |
| `experience.js` | Roles, education, measured milestones |
| `skills.js` | Toolkit, with where each tool was found |
| `process.js` | The five process steps |
| `collaborations.js` | Clients and collaborations (empty on purpose) |

Empty values are never shown to visitors. In `npm run dev` they appear as dashed yellow chips.

### Things only you can fill in

1. **Portrait.** Put a photo at `src/assets/profile/portrait.webp` (or `.png` / `.jpg`). It replaces the H monogram in the hero and About sections automatically.
2. **Email, LinkedIn, Instagram.** In `src/data/profile.js` under `contact`.
3. **Your role at Positive Quadrant.** In `src/data/experience.js`, add the dates, check the title and summary, then set `confirmed: true`. Until then it only shows in dev.
4. **External websites.** In `src/data/externalWebsites.js`, write your real `contribution` and `technologies` for each site and set `confirmed: true`. Unconfirmed sites never appear in a production build. Delete the Barber, Furniture and Real Estate entries if they don't exist or are the same as OBARBA.
5. **Availability.** `profile.availability.open` drives the green "Available for projects" dot.

### Contact form

The form validates name, email and message, and sends JSON with a `POST` request. It shows "received" only when the endpoint replies with a 2xx status. Without an endpoint it says plainly that nothing was sent.

To turn it on:

1. Create a form at a service such as [Formspree](https://formspree.io) and copy its endpoint URL.
2. Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxx`.
3. On Vercel, add the same variable under Project → Settings → Environment Variables, then redeploy.

### Screenshots

Real screenshots live in `public/work/` as WebP. Projects without a public screenshot use abstract artwork labelled "Project artwork, not a screenshot". To add a real one, put the image in `public/work/` and set the project's `thumb` to `{ type: 'image', src: '/work/your-file.webp', caption: '...' }`.

## Swarm cursors

A swarm of coloured cursors orbits close around the visitor's mouse on every page (`src/components/SwarmCursors.jsx`, original code). Each arrow faces the way it is flying. Run the mouse into one and it is knocked away, tumbling, then flies back into orbit; a click knocks away the ones near it. It is drawn on one canvas that ignores clicks, so every link and button stays clickable.

- Counts: `swarmCursors` in `src/data/profile.js` (`count` for mouse screens, `touchCount` for phones).
- On phones the swarm orbits the finger and otherwise circles over the big red name.
- Turned off when the visitor's device asks for reduced motion.

## Deploy

The build is a static site, so any static host works. On Vercel: import the folder, keep the defaults (Vite, `npm run build`, output `dist`), and add `VITE_CONTACT_ENDPOINT`.

## Accessibility and motion

- Skip link, visible focus styles, labelled form fields, and a project dialog that closes with Escape and returns focus.
- With *reduce motion* turned on in the operating system, smooth scrolling, reveals, parallax, the cursor and the marquee are all off, and everything is visible immediately.
