---
name: NearPaws
description: Trusted pet care, close to home. A calm, photo-led editorial interface in warm paper, deep ink and a single tan accent.
# Status legend used in comments below and in the prose:
#   APPROVED  = you approved it explicitly.
#   DERIVED   = measured directly from Reference 02 (or the approved slider elements of Reference 01).
#   PROPOSED  = my recommendation. Needs your approval. Nothing marked PROPOSED is a decision yet.
colors:
  paper: "#FCF8F5"          # APPROVED. Page background.
  panel: "#F4F0ED"          # APPROVED. Secondary surface (image panel, filters, cards).
  ink: "#1A170F"            # APPROVED. Headlines, primary text, icons, focus ring.
  accent: "#E2C299"         # APPROVED. Flat blocks, rules, fills. NEVER used as text color.
  body: "#494743"           # PROPOSED (DERIVED from Reference 02 paragraph text). Paragraph text.
  muted: "#6A6152"          # PROPOSED (DERIVED from Reference 02 dog panel). Captions, secondary text.
  accent-ink: "#7A5C2E"     # PROPOSED. Darkened accent, for text and numerals that must read as "tan".
  field-border: "#857C70"   # PROPOSED. Form control borders and inactive pager markers (needs 3:1).
  error: "#A3261B"          # PROPOSED. Error text and borders (always paired with text or icon).
  success: "#2F6B4F"        # PROPOSED. Success text and borders (always paired with text or icon).
typography:
  display-xl:
    fontFamily: "Roboto Slab, Georgia, serif"   # APPROVED family and weight 300.
    fontSize: "clamp(2.75rem, 1.2rem + 7vw, 8.5rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  display-lg:
    fontFamily: "Roboto Slab, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.2rem + 3.6vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  display-md:
    fontFamily: "Roboto Slab, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.4vw, 2.25rem)"
    fontWeight: 400                              # PROPOSED. 300 is too thin below about 2rem.
    lineHeight: 1.15
  title-serif:
    fontFamily: "Roboto Slab, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
  numeral:
    fontFamily: "Roboto Slab, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.6vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "tnum"
  statement:
    fontFamily: "Montserrat, system-ui, sans-serif"   # PROPOSED family (not yet approved).
    fontSize: "clamp(1.75rem, 1rem + 2.4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.3
  lead:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.9
  body:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.9
  body-dense:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
  caption:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"       # DERIVED. Reference 02 has square blocks and photos.
  full: "9999px"    # PROPOSED. Only for round pager markers and radio controls.
spacing:
  unit: "4px"
  inset: "clamp(1rem, 3vw, 2.5rem)"          # DERIVED. About 2.9% of width in Reference 02.
  section: "clamp(5rem, 10vw, 10rem)"        # PROPOSED. Vertical rhythm between sections.
  gap-sm: "0.75rem"
  gap-md: "1.5rem"
  gap-lg: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
    height: "48px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-dense}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
    height: "48px"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# NearPaws Design Specification

This document is the specification for the redesign and the migration from BEM CSS to Tailwind CSS v4. It follows the DESIGN.md format (YAML tokens above, then the eight standard sections, then extra sections for routes, accessibility, motion, open decisions and sequencing) so it stays compatible with Impeccable's `document` command.

**Nothing in the application has been changed to match this yet.** It describes the target.

## Overview

**Source of truth.** The primary reference is Reference 02 (the "dogs.com" Labrador page). It supplies the overall direction, palette, typography, header, composition, spacing, hierarchy and photography. From Reference 01 (the "meow" cat page) I take only two things: the **slider structure** and the **subtle navigation arrows**. Nothing else from Reference 01 is used.

**The visual direction in one paragraph.** A quiet, editorial, photo-led interface on warm paper. One animal at a time, shown large and calm against a soft neutral panel. A very large, light slab-serif headline with small, airy sans-serif text beside it. One flat tan block that carries the main action. Square corners, no borders or shadows in the page chrome, thin-line icons, and generous whitespace. Trust comes from clarity and calm, not decoration.

**How each reference was interpreted**

| From Reference 02 (primary) | Interpretation for NearPaws |
|---|---|
| Warm cream page `#FCF8F5` with a slightly darker left panel `#F4F0ED` | Approved `paper` and `panel`. Panels separate areas by tone only. |
| Near-black brown ink `#1A170F` | Approved `ink`. |
| Tan block `#E2C299` with a thin white arrow | Approved `accent`. The block is kept; the arrow becomes ink (the white arrow measures 1.60:1, see Accessibility). |
| Huge light slab headline "Labrador Retriever" | Roboto Slab Light (approved) for display text. |
| Geometric sans for the logo, nav, body and the stacked keywords | Montserrat is the closest match. **Recommended, not yet approved.** |
| Tan slab labels ("Lemon", "02 Rocky") | `title-serif` and `numeral`, in `accent-ink` where they are text. |
| Header: lowercase logo, 3 links, search icon, hamburger | Kept as the header pattern. Items need your content decisions (see Unresolved). |
| Cut-out subject on a panel, a second peek card bleeding off the edge, a thin tan rule, a stacked keyword statement | Kept as composition rules for the hero (see Layout and Components). |
| Square corners, no shadows, flat | Kept: `rounded.none`, no elevation. |
| Vertical rotated social labels | **Not carried over.** NearPaws has no social accounts, and the labels measure 1.81:1. |
| Star rating "4.75/20 587" | Only as an explicitly labeled sample, if at all. **Unresolved.** |

| From Reference 01 (approved elements only) | Interpretation for NearPaws |
|---|---|
| **Slider structure** | One dominant slide; a smaller "peek" card showing the next slide; a vertical numeric pager at the right edge (current item shown as a dot inside a thin ring, the others as plain numerals); the controls attached to the peek card. I interpret "structure" as exactly these four parts. **Please confirm this interpretation (see Unresolved).** |
| **Subtle navigation arrows** | Thin single-stroke chevrons, with no filled button behind them. Reference 01 places them stacked vertically beside the peek card, next above and previous below. |
| Everything else in Reference 01 | **Not used:** the cool grey/white palette, the heavy didone headline, the full-bleed hero with a bottom text band, the amber rotated-label tab, the grey control block (`#D0D0D0` is not in the approved palette), and the device frame with its shadow. |

## Colors

**Approved palette (4 colors).**

| Token | Value | Role |
|---|---|---|
| `paper` | `#FCF8F5` | Page background and default surface. |
| `panel` | `#F4F0ED` | Image panels, filter panels, cards, any secondary surface. |
| `ink` | `#1A170F` | Headlines, primary text, icons, borders on emphasis, focus ring. |
| `accent` | `#E2C299` | Flat blocks (the call-to-action block), thin rules, selected-state fills. **Never text.** |

**Proposed supporting tokens (need your approval).** Reference 02 uses tints that fail contrast, so these are the minimum additions needed to keep the interface readable.

| Token | Value | Role | Source |
|---|---|---|---|
| `body` | `#494743` | Paragraph text | Sampled from Reference 02 |
| `muted` | `#6A6152` | Captions, secondary text | Sampled from Reference 02 |
| `accent-ink` | `#7A5C2E` | Text or numerals that should read as tan | A darker shade of the approved accent hue |
| `field-border` | `#857C70` | Input borders, inactive pager markers | Proposed |
| `error` | `#A3261B` | Error text and borders | Proposed (carried from the current site) |
| `success` | `#2F6B4F` | Success text and borders | Proposed |

**Measured contrast (WCAG 2.x, computed from the hex values).**

| Pair | Ratio | Verdict |
|---|---|---|
| `ink` on `paper` | 16.95:1 | Passes AAA |
| `ink` on `panel` | 15.80:1 | Passes AAA |
| `ink` on `accent` | 10.58:1 | Passes AAA |
| `body` on `paper` / `panel` | 8.78 / 8.18:1 | Passes AAA |
| `muted` on `paper` / `panel` | 5.77 / 5.38:1 | Passes AA |
| `accent-ink` on `paper` / `panel` | 5.85 / 5.45:1 | Passes AA |
| `accent-ink` on `accent` | 3.65:1 | Large text and icons only. Use `ink` on accent instead. |
| `field-border` on `paper` / `panel` | 3.89 / 3.62:1 | Passes 3:1 for UI components |
| `error` on `paper` / `panel` | 6.98 / 6.50:1 | Passes AA |
| `success` on `paper` / `panel` | 5.96 / 5.55:1 | Passes AA |
| **`accent` on `paper` (as text)** | **1.60:1** | **Fails. Forbidden for text.** |
| **`paper` (white arrow) on `accent`** | **1.60:1** | **Fails. Reference 02's white arrow is replaced by ink.** |
| `paper` vs `panel` | 1.07:1 | Too close to carry meaning alone. Use with a hairline, a photo edge or a heading. |

**Color rules**
1. Dominant `paper`. `panel` for one or two surfaces per view. `accent` appears at most once or twice per view, as a block or a rule.
2. `accent` is a fill, never a text color. Text that should look tan uses `accent-ink`.
3. Text on `accent` is always `ink`.
4. Status is never shown by color alone: pair it with a word or an icon.
5. A dark `ink` surface is not part of Reference 02. Whether a dark footer or banner is allowed is unresolved.

## Typography

**Families.**
- **Display: Roboto Slab (APPROVED).** Weight 300 (Light) for large headlines. Because Light gets thin and hard to read at small sizes, I propose 400 for `display-md` and 500 for `title-serif`. Roboto Slab is on Google Fonts with a weight range that includes 300 to 600 (I confirmed the request succeeds).
- **Sans for body and UI: Montserrat (RECOMMENDED, NOT YET APPROVED).** Reference 02's logo, navigation, paragraph text and keyword stack are a geometric sans, and Montserrat is the closest match to what I can see. Weights 400, 500 and 600. I identified the fonts by appearance, so this is a recommendation to confirm, not a certainty.

**Type scale (responsive, all values are proposals derived from measured proportions).**

| Role | Family and weight | Size | Line height | Where used |
|---|---|---|---|---|
| `display-xl` | Roboto Slab 300 | `clamp(2.75rem, 1.2rem + 7vw, 8.5rem)` | 0.98 | Hero headline, 404. About 9.5% of screen width in Reference 02. |
| `display-lg` | Roboto Slab 300 | `clamp(2.25rem, 1.2rem + 3.6vw, 4.5rem)` | 1.05 | Page titles and section headings (h1, h2) |
| `display-md` | Roboto Slab 400 | `clamp(1.5rem, 1.1rem + 1.4vw, 2.25rem)` | 1.15 | Subheadings, card headings (h3) |
| `title-serif` | Roboto Slab 500 | 1.25rem | 1.3 | Names, short labels like "Lemon" |
| `numeral` | Roboto Slab 500, tabular | `clamp(1.75rem, 1.2rem + 1.6vw, 2.75rem)` | 1 | Index numbers ("01 / 04"), step numbers |
| `statement` | Montserrat 500 | `clamp(1.75rem, 1rem + 2.4vw, 3.25rem)` | 1.3 | The stacked keyword statement ("Friendly / Outgoing / Active") |
| `lead` | Montserrat 400 | 1.0625rem | 1.9 | Hero intro paragraph |
| `body` | Montserrat 400 | 0.9375rem | 1.9 | Editorial paragraphs (Reference 02 line spacing is about 2.1, which I reduced slightly for readability) |
| `body-dense` | Montserrat 400 | 0.9375rem | 1.6 | Forms, tables, dashboards, admin |
| `ui` | Montserrat 500 | 0.875rem | 1.4 | Navigation, buttons, labels. Tracking `0.01em` |
| `caption` | Montserrat 400 | 0.8125rem | 1.5 | Captions and fine print. Never below 0.75rem. |

**Typography rules**
- Headlines are sentence case, `ink`, never bold. Lightness is the character.
- Body paragraphs are limited to about 60 to 70 characters per line.
- Roboto Slab 300 is used only at 2rem and above.
- No letter-spaced all-caps except short labels at 0.75rem or larger.
- No rotated or vertical text for anything essential.

## Layout

**Grid and container.** A 12-column grid, 1.5rem gutters, centered in a container of at most 90rem (1440px). Side inset `clamp(1rem, 3vw, 2.5rem)`, which matches the 40px (about 2.9%) logo inset measured in Reference 02.

**Breakpoints (mobile-first, proposed).** `sm` 40rem (640px), `md` 56.25rem (900px), `lg` 75rem (1200px). These replace the nine different widths in the current CSS. Hero composition changes at `lg`.

**Spacing.** A 4px base unit. Section vertical rhythm `clamp(5rem, 10vw, 10rem)`. Element gaps `0.75rem`, `1.5rem`, `3rem`. Whitespace is a feature: keep large gaps between headline, rule, paragraph and controls, as in Reference 02.

**Header.** Height `clamp(4.5rem, 9vw, 8rem)` (Reference 02: about 128px on a 1371×771 screen, 17% of the height). Solid `paper`, no border, no shadow. Logo at left, 3 to 4 links centered, search and menu icons at right. Logo wordmark is lowercase, bold sans, with an optional small tan label.

**Desktop hero composition (from Reference 02, measured on its 1371px screen).**

| Element | Measurement | Rule |
|---|---|---|
| Image panel | Left 49% of the width, full hero height, `panel` fill | `lg:` columns 1–6 |
| Content area | Right 51% | `lg:` columns 7–12 |
| Headline | About 9.5% of screen width, two lines | `display-xl` |
| Short tan rule | About 88px wide, about 2px tall | `accent`, between headline and paragraph |
| Paragraph | Sits below the rule, indented from the headline's left edge | `body` |
| Accent block | About 18% of the width × 22% of the hero height, flush to the bottom-left of the panel, containing a thin arrow | `accent` fill, `ink` arrow |
| Peek card | About 19% of the width × 35% of the hero height, bottom-right, photo bleeding off the right and bottom edges | `panel` fill |
| Keyword statement | Three stacked lines, bottom-left, layered with the subject | `statement` (see the legibility rule below) |
| Subject | A single animal, cut out or against a very soft neutral, large, breaking the panel boundary | See Photography |

**Layering rule.** Text may overlap the subject or the accent block only where the text is `ink` and every overlapped pixel behind it is a light, plain area. Wherever the overlap would drop below 4.5:1, move the text. This is a constraint on the composition, and it is **unresolved** whether you accept it (see Unresolved).

**Responsive behavior (extrapolation, since the references are desktop-only).**
- **Phone (under 640px).** Single column. Hero stacks: photo panel first (about 60svh), then headline, rule, paragraph, accent-block action, then the slider controls. The peek card becomes a swipe hint at the right edge. The pager becomes horizontal. The header keeps the logo and a menu button (links move into a full-screen menu).
- **Tablet (640–1200px).** Two columns where it helps. The hero keeps the image panel above the text, or a 5/7 split from `md:` up.
- **Desktop (1200px and up).** The full Reference 02 composition.
- Touch targets are at least 44×44px at every size. No horizontal scrolling at 360px.

## Elevation & Depth

**Flat.** There are no drop shadows anywhere in the page chrome. Depth comes from tone (`paper` against `panel`), overlap (the subject across a panel boundary, the accent block over the photo edge) and photography. A hairline (1px, `field-border`) is used only where tone alone cannot separate things, because `paper` against `panel` is only 1.07:1.

## Shapes

- **Square corners** on every surface, image, button, field and block (`rounded.none`), as in Reference 02.
- **Round only** for pager markers and radio controls (`rounded.full`).
- **Borders:** none on cards. Fields use a 1px `field-border` (or a thin bottom line, see Components). Focus uses an outline.
- **Rules:** thin 2px `accent` lines as a typographic device, one per view.
- **Icons:** thin single-stroke line icons (Lucide, which the project already uses), stroke 1.5px, `ink` or `body`.

## Components

**Header and navigation.** As described in Layout. Links use `ui`, `ink`, with a 2px `accent` underline on hover and the current page (hover gated to hover-capable devices). The current page also has `aria-current="page"`. Search icon: only if a search feature exists (see Unresolved). Menu button: opens a full-width panel on `paper`.

**Buttons.**
- **Primary:** `accent` fill, `ink` text, `ui` type, square, 48px high, 16px 32px padding. Pressed: `scale(0.97)`.
- **Secondary:** `paper` fill with a 1px `ink` border, `ink` text, same size.
- **Text link with arrow:** `ink` text, thin arrow, underline on hover.
- **Disabled:** `muted` text on `panel`, no pointer events, with a visible reason where useful.
- **Hover (proposed):** primary swaps to `ink` fill with `paper` text; secondary fills `ink`. Validate at implementation.

**Hero slider (Reference 01 structure, Reference 02 composition).**
- One dominant slide (photo, name, location, short text, accent-block action).
- A **peek card** for the next slide, bottom-right.
- A **vertical numeric pager** at the right edge: the current slide shown as a dot inside a thin ring (`ink`), the others as plain numerals (`ink` or `body`). Each marker is a real button, 44px target, with `aria-label` ("Show slide 2").
- **Arrows:** thin chevrons, stroke about 1.5px, `ink`, no filled block. Reference 01 stacks them (next above, previous below) beside the peek card. They have at least 44px hit areas even though they look small.
- A visible **Pause/Play** button (autoplay off by default under reduced motion).
- Reference 02's `01 / 04` index and dots are **not** included unless you say so (see Unresolved).

**Cards (caregiver, service, review, stay).** `panel` fill, no border or shadow, square. Photo at the top or side, name in `title-serif`, location in `caption`/`muted`, price in `numeral`. The photo may bleed off one edge. Hover: photo scales by 1.03 over 400ms, hover devices only.

**Forms.**
- Labels above fields in `ui`, always visible. Hint text in `caption`/`muted`.
- Fields: `paper` fill, 1px `field-border`, square, 48px high, 12px 16px padding. Proposed alternative: a bottom line only. Please confirm (see Unresolved).
- Focus: a 2px `ink` outline with a 2px offset. Error: a 1px `error` border plus a text message beginning with "Error:" or an icon, linked with `aria-describedby`, and an error summary at the top that takes focus.
- Radios and checkboxes: 24px square boxes (round for radios), the selected state is an `ink` fill with a `paper` check, not color alone.
- Step indicator: large `numeral` step numbers ("01 / 03") with `display-md` step titles.

**Badges and status.** Square, `panel` fill, `ui` text, with a short word ("Confirmed", "More information needed") and a small leading marker. State is carried by the word and shape, with color as a secondary cue only.

**Accordion (FAQ).** Rows separated by 1px hairlines, question in `title-serif`, a plus icon that rotates, the answer in `body`.

**Tables and lists (admin, dashboard).** Hairline row separators, `body-dense`, a sticky header on long tables, no zebra striping.

**Photography frames.** Square, uncropped faces, `panel` background behind cut-outs, a small "Stock photo" label in `caption`.

## Do's and Don'ts

**Do**
- Let one large photograph and one large headline carry each screen.
- Keep one accent block per view, carrying the main action.
- Use `ink` on `accent` and `accent-ink` for tan-looking text.
- Keep corners square, surfaces flat, icons thin.
- Give every control a visible focus state and a 44px target.

**Don't**
- Don't use `accent` for text, icons on `accent`, or thin type.
- Don't use white (`paper`) arrows or text on the accent block.
- Don't add drop shadows, gradients, rounded cards or heavy borders.
- Don't carry over Reference 01's cool greys, heavy headline, amber tab or device frame.
- Don't rotate or reduce essential text, and don't put text on a photo without checking contrast.
- Don't show invented ratings, review counts or social links as real.

## Application to all existing routes

All of this is **extrapolation** beyond the two hero-only references. It applies the same language and needs your approval.

| Route | How the language extends |
|---|---|
| `/` Home | The full hero (Reference 02 composition with the Reference 01 slider), then sections that alternate `paper` and `panel`, each with one `display-lg` heading and one large photograph. The care options, caregivers, how it works, stay details, trust, reviews and FAQ keep their content, in the flat card and hairline styles above. The count-up stats use `numeral`. |
| `/caregivers` | A page title in `display-lg`. Filters in a `panel` column (left on `lg:`, a collapsible block on phones) using the form rules. Results as flat cards in a 3-column grid (2 on tablet, 1 on phone). |
| `/caregivers/:id` | A hero in the Reference 02 split: caregiver photo in the left `panel`, name in `display-xl`, neighborhood and care style beside it. Facts as a hairline `dl`. House rules and inclusions as lists with thin check icons. The request block is an `accent` block with the price in `numeral` and the primary button. |
| `/book` | A step title in `display-lg`, large step numeral, the form on `paper` with the form rules, a `panel` summary column on `lg:`. The mock confirmation is a large headline with the summary in a hairline `dl`. |
| `/become-a-caregiver` | Same pattern as `/book`. |
| `/booking-status` | The status as a large word in `display-lg` with a square status badge. Address and contact appear in a `panel` block only when confirmed, keeping the safety note. |
| `/caregiver-dashboard` | Two columns on `lg:`: request list on `panel`, detail on `paper`. The availability grid uses square cells with `ink` fill for busy days. `body-dense` text. |
| `/internal/admin` | A dense table with hairlines, `body-dense`, square status badges, and the "internal area" notice kept. No decorative elements. |
| `*` (404) | `display-xl` "404" in Roboto Slab Light, a short sentence, and the primary button. |
| Shell (all routes) | The Reference 02 header, a footer on `panel` (footer treatment unresolved), and the existing skip link, `<main>` focus and hash scrolling. |

**Functionality that must be preserved:** the directory filters and reset, the 3-step booking validation, estimate, caregiver preselection and confirmation, the caregiver form, status states, dashboard selection and availability toggle, the admin approve rule, slider autoplay, pause, swipe, keys and reduced motion, the FAQ accordion, count-up, the reviews scroller, and every "prototype, nothing is sent or saved" notice.

## Photography

- **Style (DERIVED from Reference 02):** one animal as the subject, calm and direct, soft warm-neutral studio-like light, very plain backgrounds close to `panel`, natural colors with a warm bias, no filters.
- **Hero subject:** ideally a cut-out or a subject on a background close to `#F4F0ED` so it blends into the panel. A near-white background can also be blended with `mix-blend-mode: multiply` over the panel. Preparing such images is a dependency (see Unresolved).
- **Peek card:** a tight crop of the next animal, bleeding off the right and bottom edges.
- **Homes and gardens:** bright, uncluttered, soft light, same warm bias.
- **Rules:** consistent crops per component, descriptive alt text, a visible "Stock photo" label while photos are illustrative, `width`/`height` set to avoid layout shift, lazy loading below the fold, and no real private addresses or identifiable people.

## Motion and interaction principles

These are **PROPOSED**. The values come from the installed Emil Kowalski standards and must be validated with `review-animations` during implementation.

- **Purpose first.** Motion explains, confirms or guides. Frequently used controls (navigation, form fields, filters) get no or near-instant motion.
- **Easing.** Entering and exiting: `cubic-bezier(0.23, 1, 0.32, 1)`. On-screen movement: `cubic-bezier(0.77, 0, 0.175, 1)`. Never `ease-in` on UI. Never `scale(0)`; start from 0.96 to 0.98 with opacity.
- **Durations.** Button press 100–160ms. Hover and color 150–200ms. Ordinary UI under 300ms. The hero slide change is an explanatory case and may take up to about 500ms.
- **Hero slider.** Slides change with a crossfade plus a small translate. Autoplay interval about 6s, paused on hover, focus and by the Pause button. Interruptible: changing slides mid-transition retargets from the current state.
- **Scroll reveals.** Optional and restrained: opacity plus a 12–16px rise, once, 400ms. Never on elements the user is already about to act on.
- **Hover** effects only on hover-capable devices (`@media (hover: hover)`).
- **Reduced motion.** Autoplay off; transitions become a short opacity change (150ms or less) or none; no parallax, no count-up animation (show the final value).
- **Tailwind implementation.** `@theme` keyframes and `--animate-*` tokens, with `motion-safe:` and `motion-reduce:` variants.

## Accessibility requirements

| Area | Requirement |
|---|---|
| Contrast | Text 4.5:1 (3:1 for 24px+ or 18.66px bold), UI components and state indicators 3:1. All tokens above are computed. `accent` is never text. |
| Text size | Body at least 15px, captions at least 12px, no essential text below that. |
| Keyboard | Everything operable by keyboard. Skip link first. The slider works with arrow keys, pager buttons, a Pause button, and no trap. Peek cards are real buttons, not clickable `div`s. |
| Focus | Visible on every control: 2px `ink` outline, 2px offset (use `paper` on dark surfaces). Never `outline: none` without a replacement. |
| Touch targets | At least 44×44px as the project standard (WCAG AA minimum is 24px). Small arrows and pager numerals get larger hit areas. |
| Reduced motion | `prefers-reduced-motion` honored as above, and autoplay never starts under it. Autoplay is always pausable. |
| Forms | Visible labels, hints, `aria-describedby` for errors, an error summary that takes focus, errors never shown by color alone, `autocomplete` where appropriate. |
| Structure | One `h1` per page, ordered headings, landmarks (`header`, `nav`, `main`, `footer`), `aria-current` on the current page and step, `aria-pressed` on toggles, live regions for slide changes only when autoplay is off. |
| Images | Meaningful alt text, decorative images with empty alt, "Stock photo" labels. |
| Language | `lang="en"` set. |
| Verification | Automated checks and screenshot tests at 390, 768 and 1440px in Playwright, plus a manual keyboard and screen reader pass. |

## Unresolved decisions

I have not assumed any approval beyond the ones you listed. Everything below needs your answer.

**Typography**
1. **Body and UI sans.** Montserrat is my recommendation, based on Reference 02. Not approved.
2. **Roboto Slab weights.** You approved Light (300) for display. Using 400 and 500 for smaller text is my proposal.
3. **Font delivery.** Google Fonts link vs self-hosted files.

**Color**
4. **Supporting tokens.** `body`, `muted`, `accent-ink`, `field-border`, `error`, `success` are proposals. The exact `accent-ink` shade in particular is mine.
5. **Dark surface.** Whether a dark `ink` footer or banner is allowed. Reference 02 has none.

**Slider interpretation (Reference 01 elements)**
6. Do you agree "slider structure" means: dominant slide, peek card, vertical numeric pager, controls beside the peek card?
7. Pager style: Reference 01's vertical numbers with a ringed current item, or Reference 02's dots plus a `01 / 04` index (or both)?
8. Arrow placement: stacked beside the peek card as in Reference 01, or horizontal like Reference 02?
9. The grey control block behind Reference 01's next arrow is not in your palette, so I left it out. Confirm.
10. Autoplay: on by default (paused under reduced motion) or off by default?

**Composition and content**
11. **Text over the photo** (Reference 02's keyword stack behind the dog and block): I propose the contrast-safe rule above. Do you accept it?
12. **Header contents.** A search icon with no search feature, a desktop hamburger, the nav link list, and the logo wordmark and its small tan label are all open.
13. **Star rating, review counts, social labels.** Reference 02 shows them. Do you want sample ratings (clearly labeled), or none?
14. **Square corners everywhere**, including form fields, and **field style** (boxed vs bottom-line only).
15. **Footer design** has no reference.

**Photography and assets**
16. Hero images need a plain background or cut-outs. Current Unsplash photos may not suit. Who prepares or chooses them, and do we self-host (the license allows it) instead of hotlinking?

**Scope**
17. **Phone and tablet layouts** are my extrapolation. Approve or provide references.
18. **Pages with no reference** (all routes except the hero) follow my extension above. Approve, or give references.
19. **Dark mode** is not in the references and is out of scope unless you ask.
20. **Armenian name and bilingual text** remain out of scope unless you say otherwise.

## Implementation record (BEM to Tailwind v4, together with the redesign)

Status: done. The redesign was built on a branch beside the original site, checked against the frozen preview, and then
replaced it. What was actually done differs from the plan that stood here earlier:

- **Verification** used a small headless-browser harness (Edge over the DevTools protocol, no Playwright): full-page pixel
  diffs against `design-preview/index.html` at 1440, 1366, 1024, 820, 390 and 360px (the home page was identical, pixel for
  pixel), computed-style comparisons, and scripted behavior comparisons of every page against the original. `clsx` and
  `tailwind-merge` were not needed.
- **Tokens** live in `src/styles/tailwind.css` (`@theme`). The type scale gained `text-section` (the capped section heading)
  and the hairline color `hair`. The hero's two layouts are the custom variants `composed` and `stacked`.
- **Layers**: `@layer theme, base, np, components, utilities`. The small base stylesheet sits in the `np` layer so utilities always win.
- **Motion hooks** are data attributes (`data-rv`, `data-ph`, `data-enter`, ...), not class names.
- **Pages**: home, directory, profile, booking, become a caregiver, booking status, caregiver dashboard, admin and 404, all in
  Tailwind with no BEM. Shared validation lives in `src/forms`.
- **Cut over**: the original site (its pages, sections, components and stylesheets) was deleted. The notice, footer and logo
  tag now say "prototype" instead of "design preview", each page sets its own title, and the sample booking status and
  caregiver dashboard are linked from the two confirmation screens (the footer stays as in the approved preview).
- **Not done yet**: a refinement pass with Impeccable (`critique`, `audit`, `polish`) and the Emil `review-animations` check, and a
  preview deployment.

**Notes on tooling.** Impeccable's `document` command also writes a `DESIGN.md` at the project root. This file is a hand-written specification, so running that command must not silently replace it: it asks before overwriting, and the right choice then is merge or skip. The numeric values in this document come from pixel sampling and proportion measurements of two low-resolution mockups, so treat them as close estimates.
