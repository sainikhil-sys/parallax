# LIMINAL — BETWEEN WORLDS
### An Interactive Study of Depth and Multi-Axis Parallax
**Submission for Techfest IIT Bombay Web-Development Competition**

---

## 🌌 Overview

**LIMINAL — BETWEEN WORLDS** is an award-quality, experimental interactive parallax experience built for the Techfest IIT Bombay web development challenge. Rather than a conventional marketing landing page or a collection of static cards, LIMINAL is structured as a continuous digital art installation where the user travels through physical layers of depth and perspective.

---

## ⚡ Core Parallax Engine Architecture

The website is engineered with a custom, high-performance parallax engine built on top of **GSAP ScrollTrigger** and **Lenis Virtual Scroll**:

1. **Decoupled Multi-Tier Velocities**:
   - Background celestial strata: `0.08x` - `0.15x`
   - Atmospheric haze & corona glow: `0.18x` - `0.25x`
   - Midground geometric architecture & pylons: `0.45x` - `0.65x`
   - Subject focal cores: `0.75x` - `0.85x`
   - Foreground structural elements & frame crossing: `1.15x` - `1.45x`

2. **Zero-Jitter Ticker Synchronization**:
   - Lenis virtual smooth scrolling is directly piped into the GSAP ticker:
     ```ts
     lenis.on('scroll', ScrollTrigger.update);
     gsap.ticker.add((time) => lenis.raf(time * 1000));
     gsap.ticker.lagSmoothing(0);
     ```
   - Hardware-accelerated GPU transforms (`translate3d`, `scale`, `rotate`, `will-change`) prevent browser layout thrashing and maintain 120 FPS fluid motion.

3. **Compound Interactive Physics**:
   - **Mouse Gyro Perspective**: Real-time normalized cursor tracking (`smoothX`, `smoothY`) calculates interactive pitch, yaw, and lateral offsets on the portal core and interactive fragments.
   - **Magnetic Button Pull**: Interactive magnetic buttons that physically follow the cursor with dual-spring damping.
   - **Reduced Motion Support**: Automatic detection of `prefers-reduced-motion: reduce` gracefully switches intensive camera displacement to subtle, accessible transitions.

---

## 🏛️ Scene Breakdown

- **Opening Sequence**: A black cinematic sequence with the title `LIMINAL // AN INTERACTIVE STUDY OF DEPTH` and an expanding laser horizon line that reveals the space.
- **Scene 01 — THE PORTAL**: 8 independent depth layers ranging from `0.08` to `1.30` parallax multipliers, featuring asymmetrical typography `BETWEEN WORLDS` and a mouse-reactive dimensional portal.
- **Scene 02 — FRAGMENTS**: A 3D spatial field of floating artifacts with individual depth channels (`0.15x`, `0.40x`, `0.72x`, `1.30x`), interactive hover states, metadata telemetry, and custom Phosphor Icons.
- **Scene 03 — THE VOID**: Monumental typographic parallax where `DEPTH` (slow: `0.25x`), `IS` (medium: `0.70x`), and `PERCEPTION.` (aggressive: `1.40x`) slide past one another at differential velocities.
- **Scene 04 — DESCENT**: A vertical camera descent through 6 intersecting strata, including background stars, cyan fog, structural pylons, an expanding descending core (`0.85 -> 1.45`), and rapid foreground crossing beams.
- **Scene 05 — SIGNAL**: Transition into a discovered tactical interface panel styled with shadcn/ui primitives (Badges, Progress, Separator, Tooltip, and Dialog modal) to inspect the spatial telemetry archive.
- **Epilogue & Finale**: Converging horizon perspective rays collapsing inward, returning the giant typography `BETWEEN WORLDS` -> `[ END ]`, with a magnetic restart trigger and minimal footer.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript (Strict Type Safety)
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS + Custom Fluid Typography Clamps (`clamp()`)
- **Scroll Engine**: Lenis
- **Animation Orchestration**: GSAP & GSAP ScrollTrigger
- **Micro-Interactions**: Framer Motion
- **Iconography**: Phosphor Icons (`@phosphor-icons/react`)
- **UI System**: Tailored shadcn/ui component primitives

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```
