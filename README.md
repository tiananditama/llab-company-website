# LLAB Design System

> **LLAB is an experimental and brave integrated creative agency.**
> We solve marketing problems by making real emotional connections — and we attract clients, talents, and partners who want the same.

This system codifies how LLAB looks, sounds, and behaves on the web. The product in scope is a single artefact: **the LLAB agency portfolio site**, designed in two parallel moods — **Brave** (dark, pure, declarative) and **Experimental** (light, abstract, full-bleed). Both moods share the same portfolio content; visitors choose their entry from a split-screen "How are you feeling?" gateway.

---

## Source materials

The system was reconstructed from materials the agency provided. None of these links are guaranteed reachable from this sandbox — they're recorded so a teammate with access can verify.

| Source | Detail |
| --- | --- |
| **Figma file** | Mounted as a virtual filesystem. 2 pages — `Design-System/` (Color, Typography, Logo, Components) and `Design/` (Home, Home/Experimental). 6 top-level frames; 17 colors, 4 fonts, 5 named components. |
| **uploads/llab.jpg** | Black `LLAB` wordmark on neon-green field. Treated as the primary social/profile mark. Copied to `assets/llab-mark.jpg`. |
| **uploads/LLAB_SIGN-03.png** | The LLAB wordmark in **white**, transparent background — for placing over dark imagery. Copied to `assets/llab-sign-white.png`. |
| **uploads/Concept.pptx** | *Mentioned in the brief but **not present** in the project uploads at build time. Flagged in caveats below.* |

---

## CONTENT FUNDAMENTALS

How LLAB writes, in service of "real emotional connections."

### Voice — confident, declarative, plain
LLAB does not hedge. Body copy reads like a manifesto, not a brochure. Sentences are short. Verbs are active. Adjectives earn their place.

> *"LLAB is an integrated creative agency built for the brave and the experimental. We create bold ideas that demand attention and drive real results."* — IntroBlock, from Figma

Notice: 28 words. Three sentences. Two compound nouns ("brave and the experimental", "demand attention and drive real results") used in parallel for rhythm. This is the template — match the cadence when writing new copy.

### Person — "we" speaking to "you"
First-person plural for the agency ("**we** create…"). Second-person for the reader on CTAs ("How are **you** feeling?"). Never third-person about ourselves.

### Casing & punctuation
- **Brand wordmark:** always **LLAB** — uppercase, no spacing, no styling tricks.
- **Display headings:** **Title Case** when soft, **lowercase** when introspective ("Experimental"), **UPPERCASE** when shouting ("HOW ARE YOU FEELING?", "BRAVE"). The Figma file uses all three deliberately.
- **Nav & labels:** **UPPERCASE**, mono, tracked open. Always: `PROJECTS · APPROACH · CONTACT`.
- **Buttons:** Title Case ("Brave", "Experimental") — not uppercase, not sentence case.
- **No exclamation points** outside of dialogic prompts ("How are you feeling?"). Otherwise periods.
- **No em-dashes between two adjectives** ("brave and experimental" — not "brave–experimental").

### Vibe
- **Brave** mood copy is **tight, ink-on-cream, certainty**. Statements.
- **Experimental** mood copy is **open, atmospheric, curious**. Questions and provocations.

### What we don't do
- **No emoji.** Anywhere. Not in copy, not in UI labels, not in social.
- **No corporate filler** ("solutions", "synergy", "innovative"). If you can't say what it does, don't ship it.
- **No clichéd agency hyperbole** ("we're a passionate team of dreamers and doers"). Show, don't tell.
- **No microcopy stand-ins** like "Lorem ipsum" in production. The Figma file uses it as a placeholder; real shipping copy must replace it.

### Sample tone

| Context | ✅ On-tone | ❌ Off-tone |
| --- | --- | --- |
| Hero | "How are you feeling?" | "Welcome to LLAB Creative Agency" |
| CTA | "Brave" / "Experimental" | "Click here to learn more" |
| Section eyebrow | "PROJECTS" | "Our Recent Work" |
| Manifesto | "We create bold ideas that demand attention." | "We're a full-service agency offering end-to-end creative solutions." |

---

## VISUAL FOUNDATIONS

### Palette
LLAB's chromatic story is a contrast play: **one electric green** holding everything together, anchored by near-black ink and bone-white paper. Mid-grey appears only as a structural device (the split-screen division).

| Token | Hex | Role |
| --- | --- | --- |
| `--llab-green` | `#AEFE00` | Primary signal. CTAs, accent blocks, the protection square behind the wordmark. |
| `--llab-green-bright` | `#D7FF2E` | Hover/active highlight. |
| `--ink-2` | `#0A0B08` | Primary surface in Brave mood. **Never pure `#000`** — there's a green undertone (B<R<G). |
| `--paper-3` | `#F4F5EF` | Primary surface in Experimental mood. Warmish off-white. |
| `--mid-1` | `#797979` | Structural mid-grey (split screen, dividers). |

Refuse:
- Pure black `#000` (use `--ink-2`)
- Pure white `#FFFFFF` (only for type-on-dark; never for backgrounds — use `--paper-3`)
- Any second hue. There is no "secondary brand color." Green does that job.
- Gradients of any kind in the chrome. The only "gradient" on the site is the experimental hero image itself.

### Typography
A three-family stack, each with a single weight in production:

| Family | Weight | Role | Sizes (px) |
| --- | --- | --- | --- |
| **Rubik** | 700 / 400 | Display + headline + manifesto body | 120, 96, 72, **56**, 48, 36, 28, 20 |
| **Space Grotesk** | 700 / 400 | Navbar, buttons, body copy | 32, 24, 18, 16 |
| **JetBrains Mono** | 700 | Eyebrows, tags, metadata only | 14, 13, 11 |

- **Letter-spacing default is `-0.020em`** on every display family. The brand wants type packed, not airy.
- **Line-height is `100%`** on headlines (the famous "FEELING?" treatment). 1.5 only for true paragraph copy.
- **Mono is the labeling voice.** If something repeats across screens (PROJECTS / APPROACH / CONTACT / 2024 / VOL.01), it's mono uppercase. Never set body copy in mono.

If the production font files aren't checked in, the system loads them from Google Fonts. **Rubik and Space Grotesk ship with the system** — variable `.ttf` files in `/fonts/` give us the full weight axis for both. **JetBrains Mono** loads from Google Fonts until a foundry-licensed file is provided.

### Backgrounds
Three valid background treatments. Pick exactly one per screen — never combine.

1. **Flat ink** (`--ink-2`) — the default Brave field.
2. **Flat paper** (`--paper-3`) — the default Experimental field.
3. **Full-bleed abstract imagery** — only the Experimental mood uses this; only in the hero region; image must read as gestural/painterly (see `assets/hero-experimental.png`). Never crop tightly. Never tile.

No repeating patterns. No noise overlays. No vignettes. No mesh gradients. No subtle texture. The brand's energy comes from contrast, not surface decoration.

### Layout rules
- **Canvas:** 1440 design width. Hero compositions scale up by photographic stretch, not by rearrangement.
- **Brave hero:** **two equal vertical halves** — left `--ink-5` `#191919`, right `--mid-1` `#797979`. The split screen IS the layout.
- **Centered title block:** the "HOW ARE YOU FEELING?" treatment uses two stacked ink rectangles as protection blocks, with white type overlapping the boundary. Use this whenever big type needs to sit over an image or a tonal split.
- **Nav:** logo top-left (160×160 ink-on-green tile), three mono links right-aligned, a single utility icon (the flip toggle) far right. No search. No menu hamburger at desktop.
- **IntroBlock:** a full-width green band, 460px tall, manifesto-sized type, no other ornament. This is the only "section break" device in the system.

### Borders & corners
- **Hairlines:** 1px, `rgba(255,255,255,0.12)` on dark; `rgba(11,12,9,0.12)` on light.
- **Corners:** mostly **sharp (0px)**. The exceptions are:
  - Buttons → pill (`999px`)
  - Card containers (rare) → `5px`
- The logo tile is a hard square. The IntroBlock is a hard rectangle. Hard edges are the default.

### Shadows & elevation
**No shadows on chrome.** Elevation is signalled by:
- **Color contrast** (ink on paper, green on ink)
- **Stacked protection blocks** (the FEELING? technique — solid rectangles behind type)
- **Backdrop blur** on the outline button only (`backdrop-filter: blur(8px)`), so it can sit over imagery.

If you find yourself reaching for `box-shadow`, you're solving the wrong problem.

### Motion
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for everything entering. Snap-out (`cubic-bezier(0.7, 0, 0.3, 1)`) for toggles.
- **Durations:** 140ms / 220ms / 420ms. Nothing slower.
- **No bounces.** No springs. No "playful" overshoot. Brave means controlled.
- **Hover:** background color shift OR a 1-2px lift. Never both.
- **Press:** `translateY(1px)`. No scale-down.
- **Entry animations on hero copy:** mask reveals from the protection blocks work well — the block stays still, the type slides up from inside it. This is the visual idiom.

### Transparency & blur
- **Outline button** uses `rgba(11,12,9,0.7)` + 8px backdrop blur so it sits cleanly over imagery.
- **Nav** is opaque. We don't blur the chrome behind it.
- **Modal overlays** (when introduced): `rgba(10,11,8,0.85)` — no blur. The viewer should feel the ink, not a glassy haze.

### Imagery
- **Mood:** abstract, kinetic, blue/silver/chrome — the Experimental hero is the reference (`assets/hero-experimental.png`). No people. No photography of products or offices. No stock business imagery.
- **Treatment:** full-bleed, high contrast, room to breathe. If imagery is forced into a card, the system is broken.
- **Color cast:** cool (blue-grey) when used. Never warm. Never sepia or duotone.
- **Grain:** none in chrome. The hero artwork itself may be naturally grainy — that's the artwork, not a filter we apply on top.

### Cards
Cards are **rare** in this system. When used:
- Background: `--ink-4` on dark, `--paper-2` on light
- Radius: 0 (default) or 5px (`--radius-card`) only
- Border: 1px hairline
- Padding: 32px minimum
- No shadow
- Title in Rubik 28 (`--type-card`), metadata in JetBrains Mono 11–14

---

## ICONOGRAPHY

LLAB uses **almost no icons**. This is intentional — the system's expressive load is carried by type, color, and image. The few icons that exist are utilitarian only.

### What's actually in the system

1. **`assets/icon-flip-light.svg` / `icon-flip-dark.svg`** — the "flip mood" toggle, 24×24, single-color vector. Extracted from Figma (it's the [`material-symbols:flip`](https://fonts.google.com/icons?icon.query=flip) glyph). This is the *only* custom icon in the design.

2. **No icon font, no icon library, no Lucide/Heroicons/Phosphor.** If a future surface needs a glyph (close, arrow, external link), the suggested CDN match is **Material Symbols (Outlined, weight 400)** — same family the existing flip icon comes from. Link from CDN; do not redraw.

   ```html
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
   ```

3. **No emoji. No Unicode characters as icons.** Don't use `→` or `✕` or `⌘` in production strings. If you need an arrow, draw it in CSS or use the Material Symbols match.

### Iconography rules
- **Stroke / fill:** filled. The brand's energy is mass, not outline.
- **Size:** 24px is the only size used today. 16px is permitted for inline metadata.
- **Color:** inherits from the current foreground. Never tinted.
- **Treatment:** never decorated — no circular containers, no green pills behind. The flip icon sits as a bare vector on the nav.

### The LLAB wordmark itself
The strongest brand asset is the wordmark, not an icon. Use it:
- On a `--llab-green` square (the primary social/avatar mark — see `assets/llab-mark.jpg`)
- White on `--ink-2` (in nav, header) — see `assets/llab-sign-white.png`
- Never on a colored field other than green or ink. Never outlined. Never animated mid-letter.

---

## Index — files in this system

```
/
├── README.md                  ← you are here
├── SKILL.md                   ← Claude-Code-compatible skill entry point
├── colors_and_type.css        ← tokens + semantic classes for every surface
├── fonts/                     ← Rubik + Space Grotesk variable .ttf, local
│   ├── Rubik-VariableFont_wght.ttf
│   ├── Rubik-Italic-VariableFont_wght.ttf
│   └── SpaceGrotesk-VariableFont_wght.ttf
├── assets/
│   ├── llab-logo-green.png    ← LLAB wordmark on neon green (primary)
│   ├── llab-mark.jpg          ← profile/avatar version of the wordmark
│   ├── llab-sign-white.png    ← white wordmark, transparent (for dark/imagery)
│   ├── hero-experimental.png  ← the abstract chrome-and-blue hero artwork
│   ├── icon-flip-light.svg    ← mood-flip toggle, light variant
│   └── icon-flip-dark.svg     ← mood-flip toggle, dark variant
├── preview/                   ← Design-System tab cards (typography, color, components)
└── ui_kits/
    └── portfolio_site/        ← Brave + Experimental moods; index.html is interactive
```

See `ui_kits/portfolio_site/README.md` for component-level documentation.
