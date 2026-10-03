# WIMs Design System — Source of Truth

> **v2 — full multi-page build (2026-10-03).** The client brief supersedes earlier decisions where they conflict:
> - **Pages:** Home, Services, Testimonials, FAQ, Contact, Privacy Policy, Terms & Conditions, custom 404. All client content lives in `lib/site.ts`; the verbatim copy is marked there.
> - **Loader:** a CSS-only splash (wordmark rise, gold progress line, light sweep, then a wipe up). It shows once per session and removes itself even without JS, replacing the earlier "no loader" rule.
> - **Animated background:** a fixed canvas `Ambient` field of gold nodes that link, react to the pointer and drift with scroll. It is static under reduced motion and pauses when the tab is hidden.
> - **Buttons:** square-edged (no pills). Solid white, ghost hairline or gold-underline line variants. Each has an arrow cell and a gold light sweep on hover.
> - **Motion system:** `[data-reveal]` = `words` | `fade` | `clip` | `rule`, triggered by `components/site/motion.tsx`. Scroll-driven extras use CSS `view()` timelines (hero parallax, intro word-lighting, service band drift). Every effect is gated by `prefers-reduced-motion` and `html.js`.
> - **Imagery:** one client photo (hero, mirrored so the subject stands right of the type) plus a detail crop on Services. Client photos and testimonial videos slot into `images` / `testimonials` in `lib/site.ts`.
> - **Typography (v2.1):** **DM Serif Display** for display and editorial text (one weight, high contrast) and **Manrope** for interface and body text. This replaces Newsreader Light and Archivo: the light hairlines looked weak and cut off at hero sizes. Word-reveal masks are padded so large glyphs are never clipped.
> - **Logo:** the client logo, reversed for dark backgrounds, lives in `public/brand/` (globe, wordmark, favicons). The original `public/logo.png` is untouched.
> - **Section photos:** art-directed crops of the client photo in `public/images/` (architecture, network, studio, stair), set via `images` in `lib/site.ts`. Photos appear **only in hero backgrounds**: the home hero (full photo) and the Services, Testimonials, FAQ and Contact page heroes. Content sections stay photo-free.
> - Earlier sections below remain the token and colour reference; where they name Newsreader/Archivo, read DM Serif Display/Manrope.

Status: **`/frontend-design` pass built (2026-10-03).** Not yet rendered: dependencies aren't installed (`pnpm install` needs owner approval).
Every later skill (`/website`, `/high-end-visual-design`, `/emil-design-eng`, `/animate`, `/adapt`, `/polish`, `/optimize`, `/audit`) refines THIS document. None may introduce a competing palette, typeface, or motion vocabulary. Changes are made here first, then in code.

---

## 1. Subject, audience, job

- **Subject:** WIMs, the Waterloo Institute of Management Solutions. It is an ed-tech institute and private AI community, plus an AI lead-generation service for organizations.
- **Audience:** ambitious professionals, entrepreneurs, university students and small-business owners. Members have worked at Nasdaq, Amazon, Marriott and Aramark.
- **Primary job:** make a visitor feel they are being *admitted*, not *sold to*. That leads to two conversions: joining the community on NAS, and booking a lead-generation conversation.
- **Genre:** Luxury Technology + AI Education + Business Transformation + Exclusive Professional Community.

## 2. Concept: "The Institute after dark"

WIMs looks like a private institute seen at night: architectural, quiet and expensive. Gold appears only as light inside the black, never as paint.

The concept comes straight from the hero photograph, where gold network lines run across dark glass in a working studio. That image *is* the brand world: **people connected by a lit network inside serious architecture.**

**Signature element: the Constellation.** A thin gold network of nodes and lines that draws itself. It is the one memorable thing on the site. Everything around it stays quiet and disciplined, and nothing else competes with it.

## 3. Color: 6 tokens, black/gold/white

| Token | Hex | Role |
|---|---|---|
| `--black` | `#000000` | Ground. True black, not tinted near-black. Cinematic sections. |
| `--graphite` | `#16150F` | The only raised surface on dark (form fields, menu sheet, video frame). |
| `--white` | `#FFFFFF` | Text on black; ground for the editorial "paper" chapters. Pure white, not cream. |
| `--gold` | `#C9A45C` | Light, not paint: Constellation lines, focus rings, active states, rules. |
| `--champagne` | `#E8D5A6` | Gold *text* on black (14.5:1). |
| `--bronze` | `#8C6A2E` | The only gold allowed as text on white (4.98:1). |
| `--stone` / `--stone-ink` | `#8E8B85` / `#66635E` | Secondary text on black (6.18:1) / on white (5.98:1). |
| `--error` | `#E58A7A` | Invalid-field underline only. |

Rules:
- Gold covers **≤5% of any viewport**. No gold-filled sections, no gold gradients, no glow or bloom in CSS. Glow only lives inside photography.
- `#C9A45C` is **never body text on white** (2.35:1, fails). Use `--bronze`.
- Hairlines: `rgba(255,255,255,.14)` on black, `rgba(0,0,0,.12)` on white. They are used only where they separate content.
- Section rhythm is mostly black, with white chapters for long reading (About, FAQ). Contact sits on black, not gold.

### Brand conflict (open decision)
`public/logo.png` is a **blue/orange globe with a gradient wordmark**. It cannot sit inside this system. Proposal: use the typographic **WIMs wordmark** on the site, plus a single-colour (white or gold) version of the globe for favicon and social images. **Needs owner sign-off.**

## 4. Typography: two families, clearly distinct

Loaded with `next/font/google`, which is built into Next.js, so no npm install is needed.

| Role | Face | Setting |
|---|---|---|
| Display + editorial | **Newsreader** (variable, optical size 6–72) | Weight 300–400, roman. Display sizes use opsz 72; tracking −0.02em at display, 0 at text. |
| Interface + body | **Archivo** (variable width 62–125) | Body: width 100, weight 400, 17px/1.6. Structural labels: width 112, weight 500, 13px, **sentence case**. |

Why these: the institute side (academic and editorial authority) is carried by a newsroom serif built for long reading, not the luxury defaults (Playfair, Cormorant, Didone italics). The technology side is carried by a grotesque whose *width axis* turns type into a material. Wide Archivo works as an engraved, credential-like voice.

Scale (Perfect fourth, 1.333, 17px base): 13 · 17 · 23 · 30 · 40 · 54 · 72 · 96 · 128 (hero, `clamp(56px, 9vw, 128px)`).

Banned (generated-page tells, all present in the current v0 build):
- One italic or gold word inside a headline (`<em>work, learn,</em>`).
- Tracked ALL-CAPS eyebrows above headings.
- `01 / 02` numbering on content that is not a sequence. It is allowed only for a real stepped process.
- Middle-dot meta strings (`Private community · Technology & IT`).
- `→` / `↗` appended to button text. The external-link icon is allowed because it tells people they're leaving the site.

Measure ≤ 68ch for Newsreader body and ≤ 72ch for Archivo body.

## 5. Layout and spacing

- 12-column grid, max 1320px, gutters 24px, side margin `clamp(20px, 5vw, 64px)`.
- **Left-aligned** throughout and asymmetric. Headlines start at column 1; supporting copy sits at columns 7–12. Nothing is centered except the final closing line.
- Spacing scale (4px base): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192.
- Section padding: `clamp(96px, 12vw, 192px)` vertical.
- Radius hierarchy: `0` for media, panels and structure; `999px` for interactive buttons; `16px` for the membership credential only, because it is a physical-card metaphor. Never one radius for everything.
- No card grids. Content is set as **rows and registers** (like a members' register or an annual report), separated by hairlines.

```
HERO (black, full-bleed photograph)
┌──────────────────────────────────────────────────────────┐
│ WIMs                          About  Services  Community │
│                                          [Join on NAS]   │
│                                                          │
│        (photo: figure left, gold network on glass)       │
│                    ╲   ·───·                             │
│ Learn. Build.        ·─────·──·   ← Constellation draws  │
│ Grow. With AI.          ╲ ·      over the glass          │
│ ─────────────────────────────────────────────────────── │
│ Applied AI education,          [Join the community]      │
│ tools and opportunity.         Book a strategy call      │
└──────────────────────────────────────────────────────────┘

EDITORIAL CHAPTER (white)
┌──────────────────────────────────────────────────────────┐
│ About                                                    │
│ AI is changing how we work,       WIMs is an ed-tech     │
│ learn and create opportunity.     startup and a private  │
│ (Newsreader 72, cols 1–7)         community… (cols 8–12) │
│ ─────────────────────────────────────────────────────── │
│ Members have worked at   Nasdaq   Amazon   Marriott  …   │
└──────────────────────────────────────────────────────────┘
```

## 6. Imagery

- Cinematic photography of **real people in serious architecture**: low-key light, crushed blacks, warm practical highlights. Gold only appears as light (lamps, screens, the network). This matches `wims-hero.png`.
- Grade: desaturated, neutral-to-warm, consistent across every image.
- Banned: glowing brains, robot hands, blue circuit boards, generic stock handshakes, purple AI gradients.
- `wims-hero.png` appears AI-generated. For an exclusive community, **real member and founder photography** plus the real testimonial videos will do more for trust than any visual effect. This is an owner decision.
- Delivery: AVIF/WebP via `next/image` (currently `images.unoptimized: true`, which `/optimize` should revisit), explicit dimensions, hero `priority`. The 1.6 MB PNG must be compressed.

## 7. Component language

- **Primary button:** white pill on black (black pill on white), Archivo 500 15px, 48px tall minimum. Gold is *not* the button color; gold stays reserved for light.
- **Secondary action:** text link that is underlined at rest (so it reads as clickable); the underline retracts on hover and focus.
- **Navigation:** transparent over the hero, then solid black with a hairline after scrolling. The mobile menu is a full-height graphite sheet.
- **Register row** (services, member companies, FAQ): full-width row, hairline above and below, title in Newsreader, detail in Archivo.
- **Membership credential:** the WIMs AI Club discount is shown as a black card with an engraved gold hairline border, like a members' card. It is static, the one card on the site.
- **Form:** underline fields on graphite, visible labels above (no placeholder-only labels), optional fields marked "(optional)". Validation uses the browser's native messages plus an `--error` underline after the visitor interacts (`:user-invalid`). The success state is in the same voice.
- **Action names:** every link to nas.com/wims is called "Join the community", except the AI Club offer ("Join the AI Club").
- **Focus:** 2px `--gold` outline with 3px offset on every interactive element.

## 8. Motion language

One orchestrated moment, one scroll moment, and everything else responds to the user.

| Moment | Behavior |
|---|---|
| **Page load** | The hero photo "exposes" from black (1.2s): the gold network already in the photograph is what lights up. At the same time the photo settles from `scale(1.04)` to 1 over 2.4s, like a slow camera push-out. The headline lines then rise in behind a mask (600ms, 80ms stagger), and the hero footer fades in. **No fake loader screen**: the old 850ms loader hid the LCP and has been removed. *Revised during build:* an SVG Constellation over the photo would have doubled the photo's own network, and responsive cropping makes alignment impossible. |
| **Scroll (signature, one only)** | In the Community chapter, the Constellation's lines draw and its nodes appear, staggered, as the section scrolls into view. It uses CSS `animation-timeline: view()`; where that's unsupported, or with reduced motion, it shows fully drawn and static. The header also turns from transparent to solid over the first 160px of scroll (`scroll()` timeline, solid by default). |
| **Responsive** | Hover/focus 180ms; press `scale(.98)` 120ms; accordion height via `grid-template-rows` 260ms; menu sheet 320ms. |
| **Not allowed** | Fade-and-slide-up on every section, blur reveals, parallax on text, scroll-jacking, infinite looping decoration. |

Tokens: `--ease-out: cubic-bezier(.23,1,.32,1)`, `--ease-in-out: cubic-bezier(.77,0,.175,1)`. UI durations stay ≤ 280ms (press 160, hover 180–200, menu 240 in / 160 out, accordion 260); only the cinematic load uses 600–2400ms. Hover effects only apply on devices with a real pointer.
Only `transform` and `opacity` are animated (plus `stroke-dashoffset` for the Constellation).
**Reduced motion:** the Constellation shows fully drawn and static, with no rises or scrubs. Content is never hidden behind motion.
**Stack:** CSS and native APIs first. GSAP would need an npm install, which **requires owner approval** and is only worth it if the scroll moment can't be done natively.

## 9. Review against generic defaults (what was revised)

| First instinct / current v0 | Revised to | Why |
|---|---|---|
| Cream paper `#F2F0EB` + Helvetica + Georgia italic accents | Pure white chapters, Newsreader + Archivo, no italic accents | The cream + serif-italic combination is the most common AI-template tell. |
| Near-black `#090909` | True `#000000` + one graphite surface | Tinted near-black is a default, not a choice. |
| Gold-filled contact section, gold everywhere | Gold limited to ≤5%, used as light | Gold everywhere reads cheap; gold as light reads expensive and matches the photo. |
| Orbit-ring illustration in Community | The Constellation (from the hero photo) | Orbits are generic; the network comes from the brand's own image. |
| Blur fade-up on every block + loader | One load sequence + one scroll moment | Scattered effects read as generated, and the loader hurts LCP. |
| Big-number stats strip (considered) | Not used | It's the default hero/proof treatment; the member-company register is more credible. |

## 10. Open decisions (owner)

1. Logo: approve the single-colour globe and the typographic wordmark (§3).
2. Photography: real member/founder imagery and the testimonial videos (§6).
3. ~~Permission to name member employers~~ **Confirmed (2026-10-04):** WIMs has permission to display the member companies' names and logos (Nasdaq, Amazon, Marriott International, Leadpoet, Aramark).
4. The contact form needs a real endpoint; it currently only fakes success.
5. Single page vs. multi-page (the Privacy and Terms links currently go to 404).

## 11. Skill hand-off order

`/frontend-design` (this doc) → `/website` (narrative and section arc) → `/high-end-visual-design` (material detail) → `/emil-design-eng` (component feel) → `/animate` (§8 only) → `/adapt` → `/polish` → `/optimize` → `/audit`.
Constraints for every skill: no `/impeccable`; no npm installs, publishing, helper or cleanup scripts without approval; never `cleanup-deprecated.mjs`.
