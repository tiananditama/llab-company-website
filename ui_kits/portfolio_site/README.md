# LLAB Portfolio Site — UI Kit

The single product LLAB ships: the agency's own portfolio. Two moods, one content set, one toggle.

## What this kit covers

| Surface | Component | File |
| --- | --- | --- |
| Mood gateway (the "HOW ARE YOU FEELING?" splash) | `<Gateway />` | `Gateway.jsx` |
| Brave home (dark) | `<BraveHome />` | `BraveHome.jsx` |
| Experimental home (light, full-bleed hero) | `<ExperimentalHome />` | `ExperimentalHome.jsx` |
| Navigation | `<Navbar mood />` | `Navbar.jsx` |
| Pill buttons | `<Button variant />` | `Button.jsx` |
| Green manifesto band | `<IntroBlock />` | `IntroBlock.jsx` |
| Project tile | `<ProjectCard mood />` | `ProjectCard.jsx` |
| Footer | `<Footer mood />` | `Footer.jsx` |

## Click-thru

1. Load `index.html` → **Gateway** (split-screen "Brave / Experimental")
2. Click **Brave** → dark home + project grid + manifesto + footer
3. Click **Experimental** → light home with the abstract hero + same content downstream
4. The **flip icon** (top-right of the navbar) swaps between moods at any time without leaving the page
5. The **LLAB** logo tile returns to the Gateway

## Faithfulness

Everything visual comes from the Figma source — colors, type sizes, tracking, the protection-block treatment behind the hero, the 158px navbar height, the 460px IntroBlock height, the 1440px design canvas. Below the hero, the Figma file uses `Lorem ipsum`; we substitute on-tone placeholder copy and flag it inline. Project tiles are invented at this stage — the Figma file doesn't yet have populated case-study pages.

## Known gaps vs production

- Project images are CSS gradient placeholders. Real artwork should be commissioned in the same chrome-and-blue family as the Experimental hero.
- No transitions between mood switches yet — production should mask-reveal between fields, not cut.
- No `/projects/:slug` detail pages — Figma source stops at the home.
