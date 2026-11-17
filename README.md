# NearPaws (prototype)

An interactive **front-end prototype** for a pet-care service: owners find a caregiver who looks after their pet at the
caregiver's home or the owner's home. "NearPaws" is a temporary brand name.

**Not real:** no backend, database, login, payment, booking or messaging. Caregivers, prices, reviews and availability are
fictional. Form input lives only in browser memory and is discarded on leaving the page.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint
npm run storybook        # http://localhost:6006, every UI piece with its states
npm run build-storybook  # static build into storybook-static/
npm run test:a11y        # axe check of every story (build Storybook first)
```

**Storybook on Windows:** start and build it from PowerShell or Command Prompt. From Git Bash the story paths come out wrong and no story loads. It also needs the Microsoft Visual C++ Redistributable (`winget install Microsoft.VCRedist.2015+.x64`). The a11y script uses the Playwright Chromium (`npx playwright-core install chromium` once, if it is missing).

## Screens

| Route | Screen |
| --- | --- |
| `/` | Home: hero slider, care options, caregivers, how it works, reviews, FAQ |
| `/caregivers` | Directory with area, care-type and pet-size filters |
| `/caregivers/:id` | Caregiver profile |
| `/book` | 3-step booking and pet-intake form, mock confirmation |
| `/become-a-caregiver` | Application form, mock confirmation |
| `/sign-in` | Demo sign-in: choose a sample pet owner or caregiver (no real accounts or passwords) |
| `/dashboard` | Pet owner dashboard: the requests sent and their status, replies, care updates (sign-in needed) |
| `/caregiver-dashboard` | Caregiver dashboard: requests received, accept, ask a question or decline, post updates, availability (sign-in needed) |
| `/internal/admin` | Admin review of applications and support cases (not linked publicly) |
| `*` | 404 |

The demo has two kinds of sample people: pet owners and caregivers. A request sent from the booking form (as a sample owner) appears in that owner's dashboard and in the dashboard of the caregiver it was sent to; the caregiver can accept, ask a question or decline, and the owner sees the new status. The state is kept only in the browser tab (sessionStorage); "Reset demo" in the account menu returns it to the start. There is no server.

## Where things live

React + Tailwind CSS v4 utilities + design tokens. There is no BEM and no component stylesheet: every component is
styled with utilities in its own file.

- `src/data/content.ts`: brand name, the prototype notice and the sample caregivers. `src/data/operations.ts` holds the sample
  requests, applications and support cases. Edit here.
- `src/styles/tailwind.css`: **the design tokens** (colors, fonts, type scale, breakpoints, the hero's layout variants).
  `np.css` is a small base layer (self-hosted fonts, CSS variables, reset); `motion.css` holds the scroll-reveal and hero entrance
  motion, driven by `data-` attributes.
- `src/ui/`: design-system primitives (Button, TextLink, Eyebrow, PageTitle, form fields, Badge, StatusBadge, FactList, ...). Each has a `*.stories.tsx` next to it with its states; config is in `.storybook/`.
- `src/pages/`: one file per screen. `src/Np*.tsx`: the shell (`NpLayout`) and the home-page sections.
- `src/forms/`: validation and empty values for the booking and caregiver forms. `src/useNpMotion.ts`: scroll motion.
- `DESIGN.md`: the design specification. `design-preview/index.html` (git tag `preview-approved`) is the frozen visual and
  motion reference the home page was built to match.

Motion is a scroll reveal, a hero entrance, photographs that settle, and small hover effects. All of it is reduced or off
when the visitor's system has "reduce motion" turned on.

## Deploy (Vercel)

`vercel.json` rewrites all paths to `index.html` so deep links work. Run `vercel` for a preview deployment.
