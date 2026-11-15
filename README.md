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
```

## Screens

| Route | Screen |
| --- | --- |
| `/` | Landing page |
| `/caregivers` | Directory with area, care-type and pet-size filters |
| `/caregivers/:id` | Caregiver profile |
| `/book` | 3-step booking and pet-intake form, mock confirmation |
| `/become-a-caregiver` | Application form, mock confirmation |
| `/booking-status` | Request status with all four states (requested, more info, confirmed, declined) |
| `/caregiver-dashboard` | Caregiver view: requests, pet details, availability, updates |
| `/internal/admin` | Admin review of applications and support cases (not linked publicly) |

## Where things live

- `src/data/content.ts`: brand name and **all** sample content. Edit here.
- `src/styles/tokens.css`: colors, fonts, spacing, radius, shadows, widths, motion.
- `src/components/`: reusable UI (Button, Container, SectionHeading, CaregiverCard, ServiceCard, TrustPoint, form fields, header, footer).
- `src/sections/`: landing-page sections only.
- `src/pages/`: one file per screen.

Motion is limited to a gentle scroll fade-in, hover lift and two floating hero tags. All of it is disabled when the
visitor's system has "reduce motion" turned on.

## Deploy (Vercel)

`vercel.json` rewrites all paths to `index.html` so deep links work. Run `vercel` for a preview deployment.
