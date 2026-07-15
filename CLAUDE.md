# Proyecto: Página del Evento Julio Iero — Symplemente Ventas

Landing page para el evento del 28-30 de Julio 2026 en Guadalajara,
vendiendo el programa Symplemente Ventas (Mente Ventas).

## NON-NEGOTIABLES — Enforce on every section

- Asset assignments per the approved plan are FIXED. 
  Each photo/video maps to one specific section only. 
  Do not reassign assets across sections without explicit 
  approval. Reference inspiration/PLAN.md for the canonical 
  asset → section map.
- The hero is typography-led on a dark-green background. 
  No portrait photo of Julio in the hero. The portrait 
  belongs in later sections.
- Color system is exact: #123940, #4a7875, #f6f0e0, 
  #0e1e1b, #ffffff. No other hex values appear in CSS.

## Deployment
Vercel, subdomain on julioiero.com (TBD).
Single page, mobile-first, must work flawlessly on iPhone Safari.

## Brand System (SYMPLE®)

### Colors (exact hex from brand palette PDF)
- `--dark-green: #123940`   (primary background)
- `--cadet-blue: #4a7875`   (secondary green / accents)
- `--linen: #f6f0e0`        (warm cream — the "light" moment)
- `--black: #0e1e1b`        (deep near-black)
- `--white: #ffffff`        (reserve for high-contrast use)

### Typography
- Aeonik — Light/Regular/Bold — titles, headlines
- Neutral Sans — Regular/Medium/Bold/Black — body, subtitles, UI

### Logo
- Use SVG from assets/brand/isotipo-1.svg,  assets/brand/isotipo-2.svg, assets/brand/isotipo-3.svg, assets/brand/isotipo-4.svg, or assets/brand/isotipo-5.svg (isotipo only).
- NEVER distort, recolor, add effects, or change angle.
- Always preserve clear space (see brandbook page 8).

### Visual Language
- SY-derived organic blob shapes as background pattern (from brandbook).
- Liquid-glass / frosted cards for the EMPLiaDOS section.
- Constant subtle motion: parallax, scroll-reveal, idle drift.
- Mixed type: Aeonik for impact headlines, Neutral Sans for everything else.
- Vertical media content (portraits, videos are vertical).

## Stack
- Vanilla HTML + CSS + JS (lean and fast), or Astro if we want components
- GSAP + ScrollTrigger for animations
- No frameworks beyond what's necessary
- All assets self-hosted

## Sections (current plan)
1. Hero — "El negocio de mi familia quebró 
   por culpa de la pandemia."
   
   Typography-led. The headline does all the work.
   No subhead needed — the story continues on scroll.
   Date chip stays: "28 · 29 · 30 JULIO · GUADALAJARA"
   CTA: "Contactar al equipo" → WhatsApp
   Floating icons in background (unchanged)
   
   Tone: vulnerable, direct, unexpected.
   The dark-green + linen Aeonik Bold does the heavy lifting.
   Let it breathe — don't crowd it with a subhead.

2. Mama's Story — family book business broke in pandemic, 
   mama starts posting, 500k video, "le devolvió la esperanza"
   Photos: parents selling books, mama's reels, the viral moment

3. January Event proof — "Enero marcó un antes y un después"
   Alumni videos, collaborations, the viralidad apuesta
   Photos/video: VIDEOS EVENTO folder, apuesta screenshots

4. Invitation — "Y si estás leyendo esto…"
   Personal turn, warm linen beat, ultima-foto.jpg

5. Julio's Credentials — mesero → +1M USD, +8 años contenido,
   +1M USD invertidos en publicidad, +5k dueños
   Photos: ANTES.jpeg + oso-trava-y-julio-iero.jpg (después)

6. EMPLiaDOS — "chat gpiti sea tu mejor EMPLiaDO"
   AI as employee framing + +5k dueños grid
   liquid-glass cards, fotos-clientes folder

7. Event Details — Terrania venue, fechas, 
   "al cerebro le entran mejor las ideas cuando duermes bien"
   Photo: argentina.JPG

8. Hotel + Illustrated Map — Vendome + Stays,
   transport route (Stays → Vendome → Terrania),
   code UNDIAMENOS2026, Cloudbeds links

9. Logística + FAQ accordion — day tabs + all FAQ answers
   (gafete, acompañante $500 usd, grabar sí, outfit colores,
   qué llevar: celular/mic/tripié/laptop/outfit)

10. Contact CTA + footer — "Nos vemos en Julio. Atte: Julio Iero."
    Contactar al equipo → WhatsApp deeplink