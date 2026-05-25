---
name: llab-design
description: Use this skill to generate well-branded interfaces and assets for LLAB, an experimental and brave integrated creative agency, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. The README covers brand context, content fundamentals, visual foundations, and iconography in detail.

Key files in this skill:
- `README.md` — full brand and design guide
- `colors_and_type.css` — drop-in CSS tokens (`--llab-green`, `--ink-2`, `--paper-3`, `--font-display`, etc.) and semantic classes (`.llab-display`, `.llab-btn--green`, …)
- `assets/` — logos (`llab-logo-green.png`, `llab-sign-white.png`, `llab-mark.jpg`), hero artwork (`hero-experimental.png`), the lone flip icon (light + dark)
- `ui_kits/portfolio_site/` — JSX components for the portfolio site in both Brave and Experimental moods (Navbar, Gateway, IntroBlock, ProjectCard, Footer, etc.) plus a working `index.html`
- `preview/` — small Design System tab cards for each token group

When the user asks for visual artifacts (slides, mocks, throwaway prototypes), copy the assets out and create static HTML files for them to view. Always import `colors_and_type.css` so tokens stay consistent.

When working on production code, you can copy the assets and read the rules here to become an expert in designing with this brand. Key non-negotiables to enforce:
- Two moods only — **Brave** (ink/green) and **Experimental** (paper/abstract imagery). Never blend.
- Three families, one weight each in practice — **Rubik 700** display, **Space Grotesk 700** UI, **JetBrains Mono 700** labels. Default letter-spacing `-0.020em`.
- One brand color — **`#AEFE00`** neon green. Don't invent a second hue.
- Sharp corners by default. Pill (`999px`) only for buttons. `5px` only for cards.
- No emoji. No icon fonts except Material Symbols (matching the single flip icon already shipping).
- No shadows on chrome. No gradients in surfaces.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask 4–6 clarifying questions (which mood, audience, length, must-include content, output format), and then act as an expert LLAB designer who outputs HTML artifacts *or* production code, depending on the need.
