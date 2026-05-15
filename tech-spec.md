# Tech Spec — Dr. Divya Sahni Kalra Website

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | Vite React plugin |
| typescript | ^5.7.0 | Type safety |
| tailwindcss | ^4.0.0 | Utility CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| gsap | ^3.12.7 | Core animation engine, ScrollTrigger, scroll-driven animations |
| lenis | ^1.2.3 | Smooth scroll with inertia |
| lucide-react | ^0.469.0 | Line-art icons for services |
| clsx | ^2.1.1 | Conditional class merging |
| tailwind-merge | ^3.0.0 | Tailwind class deduplication |

---

## Component Inventory

### Layout Components

| Component | Source | Notes |
|-----------|--------|-------|
| Navbar | Custom | Fixed top, transparent on load. Transparent → solid on scroll (scroll listener). Mobile: hamburger menu. |

### Section Components

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Split-screen 55/45. Left: stacked H1 + subtitle + CTA row + social proof avatars. Right: portrait + floating video thumbnail + experience badge. |
| IntroductionPanel | Custom | 100vh split-panel with GSAP ScrollTrigger slide animation. |
| ServicesGrid | Custom | 4-column glassmorphic card grid on Deep Navy background. |
| LivingBackgroundSection | Custom | Fullscreen procedural canvas + centered text overlay + floating metric card. |
| TestimonialsCarousel | Custom | Draggable horizontal carousel with 3D-feeling cards. |
| ContactFooter | Custom | 2-column split: contact form + Google Maps embed. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| PillButton | Custom | Navbar, HeroSection, ContactFooter. Two variants: filled (navy bg) and outlined (transparent). |
| GlassCard | Custom | ServicesGrid, TestimonialsCarousel. Subtle border + radial gradient bg. |
| OrganicCanvas | Custom | LivingBackgroundSection. Owns canvas ref, rAF loop, IntersectionObserver pause. |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initialize and expose Lenis instance. Connect to GSAP ScrollTrigger. |
| useIntersectionObserver | Wraps IntersectionObserver for pausing/resuming the canvas rAF loop. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| **Scroll-Driven Split Panel Slide** | GSAP ScrollTrigger | Scrub timeline: two panels animate from opposite sides (`xPercent: -120` → `0`, `xPercent: 120` → `0`) concurrent with different durations. `scrub: 1.2` ties to scroll position. | High |
| **Organic Thread Network (Canvas)** | Native Canvas API | Two-pass procedural drawing: 30 threads × 600 segments each, bezier curves with sine-wave undulation and peristalsis. Own rAF loop with `lastTime` delta. IntersectionObserver pause when offscreen. | High |
| **Lenis Smooth Scroll** | Lenis | Global `lerp: 0.15` wrapper. Integrate with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. | Medium |
| **Navbar Scroll Transform** | CSS + JS | Scroll listener toggles transparent → solid background class. | Low |
| **Button Hover (scale + bg)** | CSS Transitions | `transition: transform 0.2s, background-color 0.2s`. `hover:scale-102` via Tailwind. | Low |
| **Card Hover (elevate + border)** | CSS Transitions | `transition: transform 0.3s, border-color 0.3s`. `hover:-translate-y-1` + border opacity change. | Low |
| **Testimonial Carousel Drag** | Pointer events | Custom `onPointerDown/Move/Up` tracking velocity + snap-to-card logic. Transform via `translateX`. | Medium |

---

## Architecture Decisions

### Canvas Lifecycle (Critical)
The OrganicCanvas component must manage its own `requestAnimationFrame` loop independently of React's render cycle. Use a `useRef` for the canvas element and a `useEffect` to start/stop the loop. The IntersectionObserver (threshold 0.1) toggles a `isVisible` ref that the rAF loop checks before drawing — this prevents GPU burn when the section is scrolled offscreen.

### Lenis ↔ GSAP Integration
Lenis must be initialized at the app root level. On every Lenis scroll event, call `ScrollTrigger.update()` to keep GSAP's scroll-position tracking in sync with Lenis's interpolated scroll position. Without this, the scrubbed split-panel animation will desync from the actual viewport position.

### Google Maps Embed
Use a standard `<iframe>` embed for the Contact section pointing to the Uttam Nagar location. No Maps API key required for a simple embed. Wrap in an `aspect-video` container.

---

## State & Logic Plan

### OrganicCanvas — Procedural Generation
The canvas uses deterministic pseudo-randomness: each thread's seed is derived from its index (`seed = i * 123.45`). This means the pattern is stable across frames — only the time-dependent sine offsets (`xoffset`, `time`) create motion. No React state is involved in the render loop; all mutable values (time, offsets) live in refs to avoid re-renders.

### Testimonials Carousel — Drag Physics
Track `dragStartX` and `currentTranslate` via refs. On pointer move, apply direct translation. On pointer up, calculate velocity and snap to the nearest card. Use `transition: transform 0.3s ease-out` for the snap animation. No external carousel library — the interaction is simple enough for custom pointer events.

---

## Other Key Decisions

- **No shadcn/ui components:** The design is fully custom with specific styling (pill buttons, glass cards, custom form inputs). Using shadcn would require more overrides than building from scratch.
- **No external carousel library:** Custom drag-to-scroll with pointer events is sufficient for a single-row card carousel.
- **Canvas 2D only:** No WebGL/Three.js needed — the organic thread effect is 2D bezier curves, achievable with standard Canvas 2D API and significantly lighter.
- **Hero portrait layering:** The doctor portrait sits in the right column with `position: relative`. The video thumbnail and experience badge are `position: absolute` children overlapping the portrait edges. Text readability is ensured by the 55/45 split — the portrait never overlaps the text block.
