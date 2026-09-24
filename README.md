# PARALLAX / Interactive Motion Laboratory
### An Experimental Study of Typography, Shapes & Depth
**Submission for Techfest IIT Bombay Web-Development Competition**

---

## ✦ Design Philosophy

Inspired by the visual clarity, playful minimalism, and motion craftsmanship of contemporary interactive design benchmarks (such as [animejs.com](https://animejs.com/)), **PARALLAX / Interactive Motion Laboratory** is designed around a singular principle:

> **TYPOGRAPHY + SHAPES + MOTION + WHITESPACE.**
> *Simple at rest, spectacular in motion.*

All cyberpunk tropes, neon cyan glows, HUD radars, and visual clutter have been stripped away. In their place is an editorial, gallery-caliber design laboratory featuring an asymmetrical 12-column grid, generous off-white breathing room, contemporary grotesk typography, and clean vector geometry.

---

## 🎨 Palette & Visual System

- **Primary Background**: `#F5F5F0` (Warm off-white)
- **Primary Text**: `#111111` (Near-black)
- **Secondary**: `#666666` (Clean neutral gray)
- **Playful Accent**: `#B8FF3D` (Acid / Lime Green)
- **Secondary Accent**: `#FF6B4A` (Warm Coral)
- **Contrast Section**: `#111111` (Pure deep black)
- **Hairline Borders**: `#E2E2DC`

---

## ⚡ Core Parallax Engine Architecture

The experience satisfies the Techfest requirement through genuine, multi-tier, hardware-accelerated parallax:

1. **Decoupled Velocity Multipliers**:
   - **Background Layer**: `0.08x` – `0.15x`
   - **Midground Layer**: `0.35x` – `0.50x`
   - **Content & Typography**: `0.70x` – `0.85x`
   - **Foreground Camera Crossings**: `1.15x` – `1.35x`

2. **Zero-Jitter Ticker Synchronization**:
   - **Lenis Smooth Scroll** is directly piped into the **GSAP ticker**:
     ```ts
     lenis.on('scroll', ScrollTrigger.update);
     gsap.ticker.add((time) => lenis.raf(time * 1000));
     gsap.ticker.lagSmoothing(0);
     ```
   - Hardware-accelerated GPU transforms (`translate3d`, `scale`, `rotate`) ensure continuous 60–120 FPS fluid motion.

3. **Motion Craftsmanship**:
   - SVG path self-drawing via `getTotalLength()` and scrubbed `strokeDashoffset`.
   - Native SVG coordinate tracking via `getPointAtLength()` following dynamic Bezier paths.
   - Synchronous matrix grid staggering (`stagger: { grid: [6, 12], from: 'center' }`).
   - Accessible reduced motion detection via `useReducedMotion()`.

---

## 🧪 Experiments Breakdown

| Experiment | Title | Description & Interaction Mechanics |
| :--- | :--- | :--- |
| **01** | **Hero: Parallax Typography** | **7 Independent Layers**:<br>• Subtle background coordinate ticks (`0.08x`)<br>• Large acid-lime ring (`0.18x`)<br>• Thin SVG spline with coral point (`0.32x`)<br>• Organic morphing vector shape in acid lime (`0.48x`)<br>• Small geometric design nodes (`0.65x`)<br>• Monumental heading `MAKE THINGS MOVE.` (`0.85x`)<br>• Foreground geometric block crossing camera (`1.15x`) |
| **02** | **Layer Separation Collage** | **Physical Collage Pulling Apart**:<br>• Acid-lime circle in deep background (`0.16vh`)<br>• Black geometric card tilting (`0.38vh`)<br>• Thin coral axis line rotating (`0.52vh`)<br>• Abstract vector graphic square (`0.68vh`)<br>• Heading `EVERYTHING HAS A DEPTH.` (`0.88vh`)<br>• High-velocity foreground plane crossing directly over typography (`1.35vh`) |
| **03** | **Staggered Shapes** | **Black Contrast Section (`#111111`)**:<br>• Deep black field with heading `SCROLL CHANGES EVERYTHING.`<br>• 72 crisp graphic design elements (crosses, squares, circles, dashes) that synchronously scale, rotate (±180°), and translate based on scroll displacement using GSAP stagger |
| **04** | **Typographic Motion** | **Poster-Scale Typography Choreography**:<br>• `SPACE`: Slow vertical drift (`30vh`)<br>• `MOTION`: Continuous horizontal displacement across the viewport (`-22vw`)<br>• `DEPTH`: Fast vertical sweep crossing behind/in front (`125vh`)<br>• Clipped vector viewport box with mathematical offset annotations |
| **05** | **SVG Motion** | **Vector Precision Animation**:<br>• Self-drawing continuous cubic Bezier curve scrubbed by scroll<br>• Follower circle traversing dynamically along the path via native `getPointAtLength()`<br>• Concentric animated stagger rings in acid lime and warm coral |
| **06** | **Conclusion & Replay** | **Minimal Final Section**:<br>• Heading `KEEP MOVING.`<br>• Quote: *"Good interaction should feel inevitable."*<br>• Magnetic `REPLAY EXPERIENCE →` button with Lenis smooth-glide back to top |

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript (Strict Type Safety)
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS + Custom Fluid Clamps
- **Smooth Scroll Engine**: Lenis
- **Animation Choreography**: GSAP & GSAP ScrollTrigger
- **Micro-Interactions**: Framer Motion
- **Iconography**: Phosphor Icons (`@phosphor-icons/react`)
- **Linter**: Oxlint (0 errors, 0 warnings across all files)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build
```
