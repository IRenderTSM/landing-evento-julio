# Plan — Landing Evento Julio Iero · Symplemente Ventas

> Living build plan. Re-read this at the start of each phase. Brand/colors/typography
> live in [`../CLAUDE.md`](../CLAUDE.md) — this file is the **structure, phasing, and
> conventions** we agreed on, not the brand spec.

Event: **28 · 29 · 30 Julio 2026 · Guadalajara** (Terrania — Terraza y Salón).
Single page, mobile-first, must work flawlessly on **iPhone Safari**. Deployed to Vercel.

---

## Phase timeline

Each phase = one branch (`phase-<x>-<slug>`), build → verify (desktop + iPhone-width
screenshot) → commit. Push / PR / deploy only when asked.

| Phase | Scope | Sections | Status |
|-------|-------|----------|--------|
| **A** | Scaffold: Vite + GSAP, design tokens, fonts, `/assets` path casing | — | ✅ done (`906cea8`) |
| **B** | Hero + Nav + WhatsApp CTA | 1 | ✅ done (`ca5634b`, branch `phase-b-hero`) |
| **C** | Story — "Que loco verte de nuevo" narrative arc | 2 | ⬜ next |
| **D** | Event Details — fechas, lugar, mapa | 3 | ⬜ |
| **E** | EMPLiaDOS — clientes/team grid, liquid-glass cards | 4 | ⬜ |
| **F** | Viralidad — WhatsApp screenshots, la "apuesta" | 5 | ⬜ |
| **G** | Credenciales + Logística + Hotel/Mapa + CTA final | 6, 7, 8, 9 | ⬜ |
| **H** | QA pass — swap real WhatsApp number, font licensing, perf, iOS Safari device test | all | ⬜ |

> The empty `.placeholder` section under the hero exists only to make nav-reveal +
> parallax exercisable. **Phase C replaces it** with the real Story section.

---

## Section structure (target page, top → bottom)

1. **Hero** — "QUE LOCO VERTE DE NUEVO"
Purpose: instant emotional hook + date/place + first contact CTA.
Copy: headline "QUE LOCO VERTE DE NUEVO." (line 7); subhead from "este 28, 29 y 30 de Julio vuelvas a conectar con gente que te inspira" (line 31). Date chip "28 · 29 · 30 JULIO · Guadalajara".
Assets: logp-render.mp4 (autoplay muted loop), symple-ventas-white.svg.
Motion: on load, staggered reveal — "S" shapes draw first, portrait fade+scale (1.05→1), headline rises line-by-line (Aeonik), subhead+CTA last. On scroll: portrait parallaxes slower than text; blobs drift. Pulsing scroll cue.
Pattern: Notion layer-offset CSS-var pseudo-parallax for portrait/text depth, adapted to the dark-green stage with linen text.
2. **Story** — "Enero marcó un antes y un después"
Purpose: social proof through momentum — what alumni did after January.
Copy: lines 9–25: "Enero marcó un antes y un después… Muchos salieron con videos listos para subir" → "Algunos más con alianzas y nuevos amigos" → "Otros eligieron hacer un grupo y apostar…".
Assets: videos-evento/JAIR/MARCO/PACO BENÍTEZ (vertical mosaic), amigas.mp4, mariedva-abin.JPG, naranja-amarillo.mp4.
Motion: per-block scroll-reveal (text up, media fade+scale); vertical media light parallax; a decorative "S" line draws along the narrative. Spoken videos = tap-to-play with sound (poster + play button that scales on hover); naranja-amarillo.mp4 previews muted then bridges to Viralidad.
Pattern: Notion stacked-images-with-parallax; adapted as portrait video tiles, not Notion's product shots.
3. **Viralidad** — Purpose: playful proof of culture/engagement.
Copy: lines 21–27: "apostar sobre 'quién lograba el video más viral'… La apuesta está entre Lily, Mariedva, Mika y Abin… Ya veremos quién gana jiji."
Assets: apuesta-viralidad/FOTO 1–4.png (WhatsApp screenshots, vertical).
Motion: screenshots enter as a fanned stack (stagger + slight rotation/offset), inter-card parallax for chat depth; tap → lightbox. Names in cadet-blue.
Pattern: itsjosie hover/stack microinteraction + Notion carousel translate; adapted to a WhatsApp-mock card stack in SYMPLE colors.
4. **Invitacion** — the personal turn (LINEN light-moment)
Purpose: direct, warm invitation; the emotional pivot before credentials.
Copy: lines 29–37: "Si estás leyendo esto es porque quiero que estés ahí… Que te lleves claridad, sistemas… un plan de acción claro, para convertir tus redes sociales en tu mejor pasivo."
Assets: ultima-foto.jpg (vertical).
Motion: background cross-fades to linen (the brandbook "light moment"); text reveals calmly, photo scales in. Minimal motion = breathing room.
Pattern: none borrowed — intentional quiet beat (contrast against the busier neighbors).
5. **Credenciales** — Purpose: authority/trust; Julio's track record.
Copy: lines 39–61: "logré pasar de mesero a tener +1M usd invertidos en bienes raíces…", "+15 años creando contenido / +1M usd invertidos en publicidad y capacitaciones", "+5k dueños y dueñas de negocio", manifesto "HACER CONTENIDO PUEDE CAMBIARTE LA VIDA", signature "Con cariño y un vaso de café — Julio Iero."
Assets: julio-antes.jpeg ↔ julio-despues.jpg (antes/después).
Motion: (a) conveyor SVG path timeline mesero→+1M, with floating nodes that advance on a scroll-scrubbed ScrollTrigger; (b) stats marquee ("+5K dueños · +15 años contenido · +1M USD invertidos") looping; (c) antes/después cross-fade or scrubbed comparison; (d) manifesto reveals word-by-word (the one cinematic moment); count-ups respect reduced-motion (show final number).
Pattern: Notion conveyor-path (NOTES line 6→ career timeline) + Notion marquee (NOTES line 8→ stats), both recolored to dark-green/linen/cadet-blue.
6. **Clientes** — clientes/team grid (ONLY liquid-glass section)
Purpose: show the community of implementers ("+5k" made tangible).
Copy: derived from line 49 ("+5k dueños y dueñas… han cambiado su realidad") + line 51 "FOTOS DE CLIENTES".
Assets: fotos-clientes/ (6 portraits, vertical).
Motion: frosted/liquid-glass cards (backdrop-filter: blur + light border + highlight) over dark-green with drifting "S" blobs behind (the blur makes them glow). Cards enter in stagger (fade + translateY + slight rotation); desktop hover = subtle 3D tilt + glass sheen sweep; mobile = reveal + scale only.
Pattern: Notion "Keep work moving 24/7" card-reveal grid (NOTES line 4→ EMPLiaDOS); adapted with SYMPLE glass and cadet-blue edges.
7. **Event Detailsr** dónde & cuándo
Purpose: the essential facts + travel advice.
Copy: lines 65–90: "¿Dónde será tu evento? Terrania, Terraza y Salón. Guadalajara, Jalisco"; "¿Qué fechas será? 28, 29, y 30 de Julio"; "te recomiendo llegar el día 27… irte el día 31".
Assets: argentina.JPG (Julio + hermano Abin — ties to "al cerebro le entran mejor las ideas cuando duermes bien", line 83).
Motion: big Aeonik dates enter with scale-stagger; venue card reveals from below; light parallax.
Pattern: Notion CSS-var layout/parallax; SYMPLE data-card styling.
8. **Hotel + Mapa** — one stylized GDL (venue + hotel together)
Purpose: spatial clarity in a single branded picture; hosts the hotel offer.
Copy: lines 157–171: "Me hospedaría en Providencia o Americana… NO cerca de la terraza (está cerca del aeropuerto)… transporte que los lleve y regrese… te conseguimos mejor precio"; code UNDIAMENOS2026.
Assets: custom single SVG illustration of GDL with two pins (Terrania venue near airport + recommended hotel zone) drawn in the "S" line language; hotel offer card with Cloudbeds link + code.
Motion: on enter, map paths stroke-draw (dashoffset), pins drop with a small bounce, the route line between hotel↔venue animates; hotel code micro-pulse; "Reservar hotel" hover-scale.
Pattern: itsjosie SVG-blob/draw interaction; adapted to a map in cadet-blue/linen on dark-green. hotel recomendado (código `UNDIAMENOS2026`), ubicación, transporte
9. **Logística** — agenda + accordion
Purpose: reduce friction; answer everything.
Copy: lines 94–209: day tabs Martes 28 / Miércoles 29 / Jueves 30 (check-in 10:00, arranque 10:30, break 12:00, fin 15:00, tardes libres), Xokol degustación note (Día 2, $2,500 mxn, opcional); FAQ — "¿llego temprano, mejor lugar?", "¿acompañante?" ($500 usd), "¿puedo grabar?" (@julioiero), "¿qué llevar?" (5-item list), "¿qué ropa?" (blanco/negro/verde 19-6027 tcx, smart casual).
Assets: none (typographic).
Motion: day tabs cross-fade + slide (translateX); accordion via max-height transition with +/– icon rotate; items reveal staggered on enter.
Pattern: Notion carousel translate + accordion patterns directly; SYMPLE styling.
10. **CTA / Reservar lugar** Purpose: single conversion action — talk to the team.
Copy: lines 213–221: "Tu lugar es intransferible y necesitamos que confirmes tu asistencia lo antes posible… Nos vemos en Julio. Atte: Julio Iero." IG @julioiero (line 191).
Assets: large isotipo, symple-ventas-white.svg.
Motion: isotipo scale-in + "S" line draw; "Contactar al equipo" button idle-pulse + magnetic hover → WhatsApp deeplink (placeholder); footer fade. Blobs breathe to close.
Pattern: itsjosie magnetic button; Notion-style calm footer; SYMPLE colors.

---

## Conventions & locked decisions

### Asset pipeline
- Raw source lives in `media-src/` and `reference/` — **gitignored, never deployed**
  (see [`../vite.config.js`](../vite.config.js), [`../.gitignore`](../.gitignore), [`../.vercelignore`](../.vercelignore)).
- Each phase **optimizes + promotes** only the assets it needs into `public/assets/**`,
  served at `/assets/**` (lowercase, case-sensitive to match Vercel/Linux).
- Optimize aggressively before promoting (mobile budgets matter):
  - Images via `sips` (resize + re-encode). Hero portrait: 3.3M → 648K at 1800px tall.
  - Video via `ffmpeg` (scale down, strip audio, h264 `crf 28`, `+faststart`) + a poster
    frame. Logo seal: 36M → 84K. **Never ship a multi-MB autoplay video.**

### Motion (GSAP + ScrollTrigger)
- Vocabulary: staggered on-load reveals, scroll parallax, idle drift, magnetic hover.
- **Every animation gated behind `prefers-reduced-motion`.** State that must persist for
  reduced-motion users (e.g. nav visibility) is driven by a **CSS class toggle**
  (`.is-visible`), made instant by the global `transition:none` rule — never by a
  GSAP-only tween that would leave reduced-motion users stuck in the hidden state.
- Magnetic / hover effects: pointer devices only (`(hover: hover) and (pointer: fine)`),
  never on touch.

### iOS Safari (non-negotiable)
- Every autoplay video MUST have `muted playsinline autoplay loop` **together**, + poster.
- Use `100svh` for full-height heroes; respect `env(safe-area-inset-*)`.
- `viewport-fit=cover` + `theme-color #123940` already set.

### Brand / content
- 5-color system only (tokens in [`../src/style.css`](../src/style.css)). Aeonik = display, Neutral Sans = body.
- Nav uses `symple-ventas-white.svg` (the isotipo SVGs have a baked-in green background
  square that disappears on the dark hero).
- Aeonik is currently the **TRIAL** font — must license before launch (Phase H).
- WhatsApp links use placeholder `https://wa.me/00000000000` until **Phase H** swaps the real number.
- Copy source of truth: [`../reference/copy/symplemente-ventas.md`](../reference/copy/symplemente-ventas.md).

### Workflow
- Branch per phase; build with `npm run build`; verify via `npm run preview` + headless
  Chrome screenshots (desktop 1440 + iPhone-width 390). Commit when asked; push/PR/deploy
  only on explicit request.
