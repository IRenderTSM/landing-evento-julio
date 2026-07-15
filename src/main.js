import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Play the reveal when an element scrolls into view from below. Scrolling
   back up never hides or re-animates a visible element; only once it has
   fully left the bottom of the viewport does it reset — so scrolling back
   down replays the effect. */
ScrollTrigger.defaults({ toggleActions: 'restart none none reset' })

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* ---------------- Hero text reveal ----------------
   headline rises line-by-line, then chip/CTA + nav */
function buildTextReveal() {
  return gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from('[data-line] > span', { yPercent: 110, duration: 0.95, stagger: 0.12 }, 0)
    .from('[data-reveal]', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.35)
    .from('[data-nav] > *', { y: -16, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0)
}

if (!prefersReduced) {
  buildTextReveal().delay(0.2)
}

/* ------------------------------------------------------------------
   Magnetic micro-hover on CTAs (pointer devices only — never on touch)
   ------------------------------------------------------------------ */
if (canHover && !prefersReduced) {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: mx * 0.3, y: my * 0.3, scale: 1.03, duration: 0.4, ease: 'power3.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    })
  })
}

/* ==================================================================
   SECTIONS 2–10
   ================================================================== */

/* ---------------- Scroll reveals ----------------
   data-sr           → single element rises + fades on enter
   data-sr-group     → its data-sr children stagger in together
   (reduced-motion: CSS forces everything visible; we skip JS here) */
if (!prefersReduced) {
  const inGroup = (el) => el.closest('[data-sr-group]')

  gsap.utils.toArray('[data-sr-group]').forEach((group) => {
    // only direct members: kids that belong to a nested group are revealed by
    // that group's own tween (double-tweening left them stuck invisible)
    const kids = [...group.querySelectorAll('[data-sr]')].filter(
      (el) => el.parentElement.closest('[data-sr-group]') === group
    )
    gsap.from(kids.length ? kids : group.children, {
      y: 28,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: group, start: 'top bottom' },
    })
  })

  gsap.utils.toArray('[data-sr]').forEach((el) => {
    if (inGroup(el) || el.hasAttribute('data-manifesto')) return
    gsap.from(el, {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top bottom' },
    })
  })

  /* hand-drawn doodles: the stroke draws on as the word enters
     (paths use pathLength="1"; replays via the default toggleActions) */
  gsap.utils.toArray('[data-doodle]').forEach((svg) => {
    const stroke = svg.querySelector('path, ellipse, line, polyline')
    if (!stroke) return
    gsap.set(stroke, { strokeDasharray: 1, strokeDashoffset: 1 })
    gsap.to(stroke, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: svg.closest('.doodle') || svg, start: 'top bottom' },
    })
  })

  /* manifesto — word by word (the one cinematic beat) */
  const manifesto = document.querySelector('[data-manifesto]')
  if (manifesto) {
    gsap.from(manifesto.querySelectorAll('span'), {
      yPercent: 110,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: manifesto, start: 'top 85%' },
    })
  }

  /* crayon frame — strokes itself on as the manifesto enters.
     Sync the SVG to its real pixel size (1:1) so the dash length is in
     px and getTotalLength() is accurate; reduced-motion keeps the solid
     fallback frame baked into the HTML. */
  gsap.utils.toArray('[data-crayon]').forEach((crayonSvg) => {
    const crayonRect = crayonSvg.querySelector('rect')
    if (!crayonRect) return
    const frame = crayonSvg.parentElement // the relatively-positioned box
    const inset = 5
    const syncGeom = () => {
      const w = Math.round(crayonSvg.clientWidth)
      const h = Math.round(crayonSvg.clientHeight)
      if (!w || !h) return 0
      crayonSvg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      crayonRect.removeAttribute('vector-effect') // 1:1 now, keep stroke px
      crayonRect.setAttribute('x', inset)
      crayonRect.setAttribute('y', inset)
      crayonRect.setAttribute('width', w - inset * 2)
      crayonRect.setAttribute('height', h - inset * 2)
      crayonRect.setAttribute('rx', 16)
      crayonRect.setAttribute('ry', 18)
      return crayonRect.getTotalLength()
    }
    let len = syncGeom()
    gsap.set(crayonRect, { strokeDasharray: len, strokeDashoffset: len })
    const drawTween = gsap.to(crayonRect, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: frame, start: 'top 75%' },
    })
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => {
        const pr = drawTween.progress()
        if (pr > 0 && pr < 1) return // don't disturb an in-progress draw
        len = syncGeom()
        gsap.set(crayonRect, { strokeDasharray: len, strokeDashoffset: pr >= 1 ? 0 : len })
      }).observe(crayonSvg)
    }
  })

  /* "perro atropellado" — crayon circle scribbles on as it enters */
  const scribbleSvg = document.querySelector('[data-scribble]')
  const ellipse = scribbleSvg && scribbleSvg.querySelector('ellipse')
  if (scribbleSvg && ellipse) {
    const syncEllipse = () => {
      const w = Math.round(scribbleSvg.clientWidth)
      const h = Math.round(scribbleSvg.clientHeight)
      if (!w || !h) return 0
      scribbleSvg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      ellipse.removeAttribute('vector-effect')
      ellipse.setAttribute('cx', w / 2)
      ellipse.setAttribute('cy', h / 2)
      ellipse.setAttribute('rx', w / 2 - 3)
      ellipse.setAttribute('ry', h / 2 - 3)
      return ellipse.getTotalLength()
    }
    let elen = syncEllipse()
    gsap.set(ellipse, { strokeDasharray: elen, strokeDashoffset: elen })
    const etw = gsap.to(ellipse, {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '.fechas__punch', start: 'top 82%' },
    })
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => {
        const pr = etw.progress()
        if (pr > 0 && pr < 1) return
        elen = syncEllipse()
        gsap.set(ellipse, { strokeDasharray: elen, strokeDashoffset: pr >= 1 ? 0 : elen })
      }).observe(scribbleSvg)
    }
  }

  /* "Porque eso es lo que mereces." — crayon underline draws on */
  const underlineSvg = document.querySelector('[data-underline]')
  const underlinePath = underlineSvg && underlineSvg.querySelector('path')
  if (underlineSvg && underlinePath) {
    const syncUnderline = () => {
      const w = Math.round(underlineSvg.clientWidth)
      const h = Math.round(underlineSvg.clientHeight)
      if (!w || !h) return 0
      underlineSvg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      underlinePath.removeAttribute('vector-effect')
      const mid = h * 0.55
      underlinePath.setAttribute(
        'd',
        `M${w * 0.01},${mid + 2} C${w * 0.25},${mid - 4} ${w * 0.5},${mid + 4} ${w * 0.72},${mid - 1} C${w * 0.86},${mid - 3} ${w * 0.95},${mid + 1} ${w * 0.99},${mid - 1}`
      )
      return underlinePath.getTotalLength()
    }
    let ulen = syncUnderline()
    gsap.set(underlinePath, { strokeDasharray: ulen, strokeDashoffset: ulen })
    const utw = gsap.to(underlinePath, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '.logistica__merece', start: 'top 85%' },
    })
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => {
        const pr = utw.progress()
        if (pr > 0 && pr < 1) return
        ulen = syncUnderline()
        gsap.set(underlinePath, { strokeDasharray: ulen, strokeDashoffset: pr >= 1 ? 0 : ulen })
      }).observe(underlineSvg)
    }
  }

  /* stats marquee — perpetual scroll */
  const track = document.querySelector('[data-marquee] .marquee__track')
  if (track) {
    gsap.to(track, { xPercent: -50, duration: 26, ease: 'none', repeat: -1 })
  }

  /* terrania photos — non-stop carousel (track holds two copies → -50% loops) */
  const terrTrack = document.querySelector('[data-marquee-img] .terrania-carousel__track')
  if (terrTrack) {
    gsap.to(terrTrack, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 })
  }

  /* hotel map — draw the route + drop the pins on enter */
  const route = document.querySelector('.map__route')
  if (route) {
    const len = route.getTotalLength()
    gsap.set(route, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(route, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '[data-map]', start: 'top 75%' },
    })
    gsap.from('[data-pin]', {
      y: -14,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'back.out(2)',
      stagger: 0.25,
      scrollTrigger: { trigger: '[data-map]', start: 'top 75%' },
    })

    // traveling dot — scrubs from point A to point B along the route as you scroll
    const dot = document.querySelector('[data-map-dot]')
    if (dot) {
      const place = (progress) => {
        const p = route.getPointAtLength(len * progress)
        gsap.set(dot, { x: p.x, y: p.y })
      }
      place(0)
      ScrollTrigger.create({
        trigger: '[data-map]',
        start: 'top 70%',
        end: 'bottom 55%',
        scrub: true,
        onUpdate: (self) => place(self.progress),
      })
    }
  }
}

/* ---------------- Keep trigger positions honest ----------------
   Lazy images have no reserved height, so each load pushes the page taller
   and every ScrollTrigger start drifts — elements then "never arrive" until
   a manual refresh. Re-measure (debounced) as they come in. */
{
  let refreshTimer = 0
  const queueRefresh = () => {
    clearTimeout(refreshTimer)
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120)
  }
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (!img.complete) img.addEventListener('load', queueRefresh, { once: true })
  })
  window.addEventListener('load', queueRefresh)
}

/* ---------------- Pull quotes — one-time rise on scroll-enter ----------------
   (reduced-motion: skipped entirely → quotes are simply visible) */
if (!prefersReduced) {
  gsap.utils.toArray('.pullquote').forEach((q) => {
    gsap.from(q, {
      y: 20,
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: q, start: 'top 88%', once: true },
    })
  })
}

/* ---------------- Stats — count up from 0 on scroll-enter ----------------
   [data-countup] holds the final string ("+500k", "+1M USD"); the numeric
   part ticks from 0 over 1.2s and the exact original text is restored at
   the end. (reduced-motion: skipped → the HTML text is never touched) */
if (!prefersReduced) {
  document.querySelectorAll('[data-countup]').forEach((el) => {
    const final = el.textContent
    const m = final.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
    if (!m) return
    const [, pre, numStr, suf] = m
    const target = parseFloat(numStr)
    // small round numbers (+5K, +1M) tick with one decimal so the count reads
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : target < 10 ? 1 : 0
    const state = { v: 0 }
    el.textContent = pre + (0).toFixed(decimals) + suf
    gsap.to(state, {
      v: target,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = pre + state.v.toFixed(decimals) + suf },
      onComplete: () => { el.textContent = final },
    })
  })
}

/* ---------------- Tap-to-play video tiles (story + apuesta) ---------------- */
const tiles = document.querySelectorAll('[data-video]')
tiles.forEach((tile) => {
  const video = tile.querySelector('video')
  tile.addEventListener('click', () => {
    if (video.paused) {
      // pause any other playing tile
      tiles.forEach((t) => {
        if (t !== tile) {
          const v = t.querySelector('video')
          v.pause()
          t.classList.remove('is-playing')
        }
      })
      video.muted = false
      video.play()
      tile.classList.add('is-playing')
    } else {
      video.pause()
      tile.classList.remove('is-playing')
    }
  })
  video.addEventListener('ended', () => tile.classList.remove('is-playing'))
})

/* ---------------- Viral carousel: auto-advance + muted tap-to-play + sound ----------------
   Auto-slides one tile per second through all the event videos; the side tiles
   fade (CSS mask). Tap a tile to play it (muted); the speaker button activates
   sound (only one tile is audible at a time). Auto-advance pauses on hover and
   whenever a video is playing. */
const viralCarousel = document.querySelector('[data-viral-carousel]')
if (viralCarousel) {
  // duplicate the tiles once so scrolling can loop seamlessly
  ;[...viralCarousel.children].forEach((t) => viralCarousel.appendChild(t.cloneNode(true)))

  const viralTiles = [...viralCarousel.querySelectorAll('[data-viral]')]
  const anyPlaying = () => viralTiles.some((t) => !t.querySelector('video').paused)

  // non-stop continuous drift (loops seamlessly across the duplicated set)
  let rafId = null
  let lastTs = 0
  const SPEED = 55 // px per second
  const tick = (ts) => {
    if (!lastTs) lastTs = ts
    const dt = Math.min((ts - lastTs) / 1000, 0.05) // cap so tab-switches don't jump
    lastTs = ts
    const half = viralCarousel.scrollWidth / 2
    viralCarousel.scrollLeft += SPEED * dt
    if (viralCarousel.scrollLeft >= half) viralCarousel.scrollLeft -= half
    rafId = requestAnimationFrame(tick)
  }
  function startAuto() {
    if (!rafId && !prefersReduced && !anyPlaying()) {
      lastTs = 0
      rafId = requestAnimationFrame(tick)
    }
  }
  function stopAuto() {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = null
  }

  viralTiles.forEach((tile) => {
    const video = tile.querySelector('video')
    const playBtn = tile.querySelector('[data-viral-play]')
    const soundBtn = tile.querySelector('[data-viral-sound]')
    video.muted = true
    tile.classList.add('is-muted')

    const pauseOthers = () =>
      viralTiles.forEach((t) => {
        if (t !== tile) {
          t.querySelector('video').pause()
          t.classList.remove('is-playing')
        }
      })

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        pauseOthers()
        video.play()
        tile.classList.add('is-playing')
        stopAuto()
      } else {
        video.pause()
        tile.classList.remove('is-playing')
        startAuto()
      }
    })

    soundBtn.addEventListener('click', () => {
      if (video.muted) {
        // only one tile carries sound at a time
        viralTiles.forEach((t) => {
          if (t !== tile) {
            t.querySelector('video').muted = true
            t.classList.add('is-muted')
          }
        })
        video.muted = false
        tile.classList.remove('is-muted')
        if (video.paused) {
          pauseOthers()
          video.play()
          tile.classList.add('is-playing')
          stopAuto()
        }
      } else {
        video.muted = true
        tile.classList.add('is-muted')
      }
    })
  })

  viralCarousel.addEventListener('pointerenter', stopAuto)
  viralCarousel.addEventListener('pointerleave', () => {
    if (!anyPlaying()) startAuto()
  })
  startAuto()
}

/* ---------------- Viralidad: lightbox ---------------- */
const modal = document.querySelector('[data-lightbox-modal]')
if (modal) {
  const modalImg = modal.querySelector('.lightbox__img')
  let closeTimer = 0
  const open = (src) => {
    clearTimeout(closeTimer)
    modalImg.src = src
    modal.hidden = false
    document.body.style.overflow = 'hidden'
    // next frame: add the class so opacity/scale transition in
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('is-open')))
  }
  const close = () => {
    modal.classList.remove('is-open')
    document.body.style.overflow = ''
    // hide once the fade-out finishes
    closeTimer = setTimeout(() => {
      modal.hidden = true
      modalImg.src = ''
    }, 300)
  }
  document.querySelectorAll('[data-lightbox]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.querySelector('img').src))
  })
  modal.querySelector('[data-lightbox-close]').addEventListener('click', close)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close()
  })
}

/* ---------------- Logística: day tabs ---------------- */
document.querySelectorAll('[data-tabs]').forEach((tabs) => {
  const nav = tabs.querySelector('.tabs__nav')
  const btns = [...tabs.querySelectorAll('.tabs__btn')]
  const panels = [...tabs.querySelectorAll('.tabs__panel')]
  const wrap = tabs.querySelector('.tabs__panels')

  // sliding pill that glides behind the active date button
  const pill = document.createElement('span')
  pill.className = 'tabs__pill'
  pill.setAttribute('aria-hidden', 'true')
  nav.prepend(pill)
  tabs.classList.add('tabs--ready')

  const movePill = (btn, animate = true) => {
    const box = { x: btn.offsetLeft, y: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight }
    if (animate && !prefersReduced) {
      gsap.to(pill, { ...box, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.set(pill, box)
    }
  }
  const current = () => btns.find((b) => b.classList.contains('is-active')) || btns[0]
  movePill(current(), false)
  // re-measure once fonts settle and on resize (button widths can shift)
  document.fonts?.ready.then(() => movePill(current(), false))
  window.addEventListener('resize', () => movePill(current(), false))

  const select = (btn) => {
    if (btn.classList.contains('is-active')) return
    const id = btn.dataset.tab
    btns.forEach((b) => {
      const on = b === btn
      b.classList.toggle('is-active', on)
      b.setAttribute('aria-selected', on ? 'true' : 'false')
    })
    movePill(btn)

    const next = panels.find((p) => p.dataset.panel === id)
    if (prefersReduced) {
      panels.forEach((p) => { const on = p === next; p.classList.toggle('is-active', on); p.hidden = !on })
      return
    }
    // animate the panel container height while cross-fading the new content
    const startH = wrap.offsetHeight
    panels.forEach((p) => { const on = p === next; p.classList.toggle('is-active', on); p.hidden = !on })
    const endH = wrap.offsetHeight
    gsap.fromTo(
      wrap,
      { height: startH },
      { height: endH, duration: 0.42, ease: 'power2.inOut', onComplete: () => { wrap.style.height = '' } }
    )
    gsap.from(next.querySelectorAll('.agenda li, .agenda__note, .xokol'), {
      autoAlpha: 0,
      y: 12,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.06,
    })
  }

  btns.forEach((btn) => btn.addEventListener('click', () => select(btn)))

  // mobile: drag/swipe left or right to change the day
  let sx = 0
  let sy = 0
  let tracking = false
  wrap.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length !== 1) return
      sx = e.touches[0].clientX
      sy = e.touches[0].clientY
      tracking = true
    },
    { passive: true }
  )
  wrap.addEventListener(
    'touchend',
    (e) => {
      if (!tracking) return
      tracking = false
      const dx = e.changedTouches[0].clientX - sx
      const dy = e.changedTouches[0].clientY - sy
      // require a clearly horizontal swipe
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) return
      const cur = btns.findIndex((b) => b.classList.contains('is-active'))
      const next = cur + (dx < 0 ? 1 : -1)
      if (next >= 0 && next < btns.length) select(btns[next])
    },
    { passive: true }
  )
})

/* ---------------- FAQ: single-open accordion (smooth) ---------------- */
const faq = document.querySelector('[data-accordion]')
if (faq) {
  const top = [...faq.querySelectorAll(':scope > details')] // top-level only
  const subs = [...faq.querySelectorAll('[data-faq-sub]')] // nested "¿Por qué?"
  if (prefersReduced) {
    // instant native toggle, just enforce single-open at the top level
    top.forEach((d) =>
      d.addEventListener('toggle', () => {
        if (d.open) top.forEach((o) => { if (o !== d) o.open = false })
      })
    )
  } else {
    const bodyOf = (d) => d.querySelector('.faq__body')
    const close = (d) => {
      const body = bodyOf(d)
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          d.open = false
          gsap.set(body, { clearProps: 'height,opacity,overflow' })
        },
      })
    }
    const open = (d) => {
      const body = bodyOf(d)
      d.open = true
      gsap.set(body, { overflow: 'hidden' })
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => gsap.set(body, { clearProps: 'height,overflow' }),
        }
      )
    }
    const wire = (d, siblings) => {
      d.querySelector('summary').addEventListener('click', (e) => {
        e.preventDefault()
        if (d.open) {
          close(d)
        } else {
          siblings.forEach((o) => { if (o !== d && o.open) close(o) })
          open(d)
        }
      })
    }
    top.forEach((d) => wire(d, top))
    subs.forEach((d) => wire(d, [])) // nested toggles on its own
  }
}

/* ---------------- Custom cursor: hand-drawn arrow pointer ---------------- */
const cursorEl = document.querySelector('[data-cursor]')
const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)')
if (cursorEl && finePointer.matches) {
  document.body.classList.add('has-custom-cursor')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let mx = -100, my = -100, cx = -100, cy = -100
  let shown = false

  // luminance (0 dark → 1 light) of an "rgb(a)" string; null if fully transparent
  const lum = (c) => {
    const m = c.match(/[\d.]+/g)
    if (!m) return null
    const a = m[3] === undefined ? 1 : parseFloat(m[3])
    if (a === 0) return null
    const [r, g, b] = m.map(Number)
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }
  // walk up to the first element with an opaque-ish background
  const bgLumOf = (el) => {
    while (el && el.nodeType === 1) {
      const l = lum(getComputedStyle(el).backgroundColor)
      if (l !== null) return l
      el = el.parentElement
    }
    return 0 // body is dark-green
  }

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX
    my = e.clientY
    if (!shown) {
      shown = true
      cx = mx
      cy = my
      cursorEl.classList.add('is-visible')
    }
    // contrast: dark cursor over light surfaces, light cursor over dark
    cursorEl.classList.toggle('is-dark', bgLumOf(e.target) > 0.55)
    // grow over interactive targets
    cursorEl.classList.toggle(
      'is-active',
      !!e.target.closest('a, button, summary, [data-magnetic], [data-video]')
    )
  })
  window.addEventListener('pointerdown', () => cursorEl.classList.add('is-active'))
  window.addEventListener('pointerup', () => cursorEl.classList.remove('is-active'))
  document.addEventListener('mouseleave', () => cursorEl.classList.remove('is-visible'))
  document.addEventListener('mouseenter', () => mx >= 0 && cursorEl.classList.add('is-visible'))

  const render = () => {
    const k = reduce ? 1 : 0.22
    cx += (mx - cx) * k
    cy += (my - cy) * k
    // anchor the arrow tip (~4.3px,2.8px in its 30×41 box) at the pointer
    cursorEl.style.transform = `translate(${cx}px, ${cy}px) translate(-4.3px, -2.8px)`
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

/* ---------------- Hotel: copy discount code ---------------- */
const code = document.querySelector('[data-code]')
if (code) {
  code.style.cursor = 'pointer'
  code.title = 'Copiar código'
  code.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.trim())
      const prev = code.textContent
      code.textContent = '¡Copiado!'
      setTimeout(() => (code.textContent = prev), 1400)
    } catch (_) {
      /* clipboard unavailable — no-op */
    }
  })
}

/* ---------------- VIP hospedaje: smooth collapsible (height + fade) ----------------
   Native <details> snaps open/closed; animate it so the expand/collapse glides.
   (reduced-motion keeps the instant native toggle.) */
const vipCard = document.querySelector('[data-vip]')
if (vipCard && !prefersReduced) {
  const summary = vipCard.querySelector('.vip-card__summary')
  const body = vipCard.querySelector('.vip-card__body')
  if (summary && body) {
    let animating = false
    const openCard = () => {
      animating = true
      vipCard.open = true
      gsap.set(body, { overflow: 'hidden' })
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        {
          height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out',
          onComplete: () => { gsap.set(body, { clearProps: 'height,overflow' }); animating = false },
        }
      )
    }
    const closeCard = () => {
      animating = true
      gsap.set(body, { overflow: 'hidden' })
      gsap.to(body, {
        height: 0, opacity: 0, duration: 0.38, ease: 'power3.inOut',
        onComplete: () => {
          vipCard.open = false
          gsap.set(body, { clearProps: 'height,opacity,overflow' })
          animating = false
        },
      })
    }
    summary.addEventListener('click', (e) => {
      e.preventDefault()
      if (animating) return
      vipCard.open ? closeCard() : openCard()
    })
  }
}

/* ---------------- Hero "scroll hacia abajo" arrow ----------------
   Clic → baja suavemente a la siguiente sección. */
{
  // barra (nav) fija: aparece el fondo translúcido al scrollear
  const navBar = document.querySelector('.nav')
  if (navBar) {
    const onNavScroll = () => navBar.classList.toggle('nav--scrolled', window.scrollY > 30)
    window.addEventListener('scroll', onNavScroll, { passive: true })
    onNavScroll()
  }

  // flecha del hero + enlaces del mini-menú → scroll suave a su sección,
  // descontando la altura de la barra fija para que la sección no quede tapada.
  const smoothLinks = document.querySelectorAll('[data-hero-scroll], [data-nav-link]')
  smoothLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'))
      if (target) {
        e.preventDefault()
        const navH = navBar ? navBar.offsetHeight : 0
        const y = target.getBoundingClientRect().top + window.scrollY - navH - 8
        window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' })
      }
    })
  })
}

/* ---------------- Floating "Reservar mi lugar" CTA ----------------
   Appears once you've scrolled past the hero (which already has its own CTA)
   and tucks away as the final "Reservar mi lugar" section scrolls into place,
   so the inline button takes over at the bottom. */
{
  const floatCta = document.querySelector('[data-floating-cta]')
  const finalCta = document.querySelector('#reservar')
  if (floatCta) {
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const pastHero = window.scrollY > vh * 0.6
      const finalNear = finalCta ? finalCta.getBoundingClientRect().top < vh * 0.85 : false
      floatCta.classList.toggle('is-visible', pastHero && !finalNear)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
  }
}


/* ==================================================================
   Side scroll-progress rail
   Evenly-spaced section dots over a progress fill; hover reveals the
   labels and the current section shows in a lighter (contrasting) tone.
   Flips to dark over the linen section so it stays visible.
   ================================================================== */
{
  const rail = document.querySelector('[data-rail]')
  if (rail && window.matchMedia('(min-width: 860px)').matches) {
    const LABELS = {
      top: 'Inicio', story: 'Historia', viralidad: 'La apuesta',
      invitacion: 'Invitación', credenciales: 'Julio', clientes: 'Clientes',
      manifiesto: 'Manifiesto', lugar: 'Lugar', fechas: 'Fechas',
      logistica: 'Logística', hotel: 'Hotel', faq: 'FAQ', reservar: 'Reservar',
    }
    const LIGHT = 'invitacion' // the linen section — rail flips to dark here
    const secs = [...document.querySelectorAll('main section')].map((el) => ({
      el,
      id: el.id || 'top',
    }))

    const track = document.createElement('span')
    track.className = 'rail__track'
    const fill = document.createElement('span')
    fill.className = 'rail__fill'
    track.appendChild(fill)
    rail.appendChild(track)

    const items = secs.map(({ el, id }) => {
      const a = document.createElement('a')
      a.className = 'rail__item'
      a.href = `#${id}`
      const label = LABELS[id] || id
      a.setAttribute('aria-label', label)
      a.innerHTML = `<span class="rail__label">${label}</span><span class="rail__dot"></span>`
      a.addEventListener('click', (e) => {
        e.preventDefault()
        el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      })
      rail.appendChild(a)
      return a
    })

    let raf = 0
    const update = () => {
      raf = 0
      const winH = window.innerHeight
      const probe = winH * 0.4
      const n = secs.length
      let active = 0
      for (let i = 0; i < n; i++) {
        if (secs[i].el.getBoundingClientRect().top <= probe) active = i
      }
      const r = secs[active].el.getBoundingClientRect()
      const within = Math.min(1, Math.max(0, (probe - r.top) / Math.max(1, r.height)))
      const p = n > 1 ? (active + within) / (n - 1) : 1
      fill.style.height = `${Math.min(100, p * 100)}%`
      items.forEach((a, i) => a.classList.toggle('is-active', i === active))

      // contrast: which section sits behind the rail's vertical centre?
      let centre = active
      for (let i = 0; i < n; i++) {
        const b = secs[i].el.getBoundingClientRect()
        if (b.top <= winH / 2 && b.bottom >= winH / 2) { centre = i; break }
      }
      rail.classList.toggle('rail--on-light', secs[centre].id === LIGHT)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
  }
}
