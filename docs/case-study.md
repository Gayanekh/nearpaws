# NearPaws: case study

A pet-care marketplace prototype with its own component library.

- **Live app:** https://nearpaws.vercel.app
- **Storybook (component library):** https://nearpaws-storybook.vercel.app
- **Code:** https://github.com/Gayanekh/nearpaws

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Storybook, axe-core, Playwright, Vercel.

## About

NearPaws is a prototype for a pet-care service. A pet owner looks for a caregiver who will look after their pet, either at the caregiver's home or at the owner's. It is a front-end demonstration only: there is no backend and there are no payments, and the caregivers, prices and reviews are fictional. The goal was to design and build a complete, believable product experience, and a maintainable design system behind it.

## What you can do in the app

- **Landing page:** a hero with a sample-stay slider, care options, caregivers, how it works, reviews and an FAQ.
- **Find a caregiver:** filter the directory by area, care type and pet size. Each caregiver has a profile with a month calendar that shows availability.
- **Request a stay:** a multi-step booking form with validation, an error summary, and a pet photo that is resized in the browser. Busy days are checked against the caregiver's calendar.
- **Two dashboards:** a demo sign-in gives you a pet owner or a caregiver. Requests move through five states (requested, more information needed, confirmed, declined, cancelled), with messages and care updates. The caregiver sees the pet's photo, name and care details.
- **My profile:** both roles can change their name and photo. Caregivers can also change their area, tagline, about text and price, and the change shows across the site.
- **No data leaves the browser:** the demo state lives in React context and `sessionStorage`, and is cleared when the tab closes.

## How it was built

1. **Design direction first.** I wrote a design specification ([`DESIGN.md`](../DESIGN.md)) from references: palette, type scale, spacing, layout, motion and accessibility rules. I then built the home page to match an approved visual preview closely.
2. **Design tokens in one place.** Colors, fonts, type sizes, breakpoints and radii are defined once, in the Tailwind v4 theme file ([`src/styles/tailwind.css`](../src/styles/tailwind.css)). Every component uses utilities and those tokens. There is no BEM and there are no component stylesheets.
3. **Components with one source of truth.** There are 26 components in [`src/ui`](../src/ui). For example, one shared definition (`controlClasses`) makes every input 44px high with 14px corners, so every form looks the same. Buttons, text links, chips, a segmented control, status badges, cards and a calendar all follow the same rules.
4. **Accessibility built in.** A skip link, visible focus rings, labelled fields with linked errors, `aria-pressed` and `aria-current`, 4.5:1 text contrast, keyboard-operable menus, and reduced-motion support.
5. **A demo layer instead of a server.** Sample accounts, requests and statuses live in a small provider ([`src/demo`](../src/demo)), and route guards keep each dashboard for the right role.
6. **Checked in real browsers.** I scripted end-to-end checks with Playwright (sign-in, the dashboards, profile editing, keyboard use of the menu, the directory), and did a code-level accessibility and performance audit and fixed what it found.

## The component library (Storybook)

- **Coverage:** 26 components and 95 stories, each showing its real states: default, hint, required, filled, error and disabled for form fields; every status for the status badge; empty, with photo and with fallback for the photo field; and so on. Only states that exist in the code are shown.
- **Accessibility checks:** the Storybook accessibility panel shows axe results for each story. A script (`npm run test:a11y`) also opens every story in a headless browser and runs axe-core against WCAG 2.0 to 2.2 level A and AA plus best-practice rules. The published Storybook has 0 violations across all 95 stories. To confirm the check works, I injected known problems (a missing alt text, an unnamed button, low contrast) and it caught all three.
- **Realistic context:** each story renders inside the same shell as the app (fonts, router and demo state), so components look and behave as they do on the site.
- **Separate deployment:** Storybook is its own Vercel project, `nearpaws-storybook`, built from the same repository with its own build command. It deploys independently of the app.

## Deployment

The code lives in one GitHub repository. Two Vercel projects build from it: the app (`npm run build`, output `dist`) and Storybook (`npm run build-storybook`, output `storybook-static`). Pushing to `main` deploys both.

## Challenges and what I learned

- **State without a backend.** Dashboards had to stay in sync: when an owner changes a pet's photo, the caregiver sees it. A small provider plus `sessionStorage` kept this simple and survives a reload.
- **One design language.** Inputs, links and toggles had to look the same on every page. Moving each of them into a single shared component removed the drift.
- **Accessibility as a test, not a hope.** An automated check on every story catches regressions that eyes miss.
- **Real-world tooling.** Storybook's native dependency needs the Visual C++ runtime on Windows, and building it from Git Bash produces wrong story paths. Both are documented in the README.

## What I would do next

A real backend and authentication, running the accessibility check in CI on every push, mapping components to code with Figma Code Connect, and unit tests for the booking validation.

## Credits and notes

- Photos are stock photos (Unsplash) of people who are not the fictional caregivers. Prices, reviews and availability are invented, and each page says so.
- I directed the design and the build, working with an AI coding assistant (Claude Code).
