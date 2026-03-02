# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AdityaVardhan is a premium fashion brand website built with Next.js 15 (App Router), React 19, and TypeScript. It is a frontend-focused, animation-heavy single-page marketing site with no backend or testing infrastructure.

## Commands

- **Dev server:** `pnpm dev` (uses Turbopack)
- **Build:** `pnpm build`
- **Start production:** `pnpm start`
- **Lint:** `pnpm lint`

Package manager is **pnpm**.

## Architecture

### Page Composition

Single-page app with the home page (`src/app/page.tsx`) composed from modular sections:

```
VideoBackground (fixed) → Navbar → Hero → ParallaxGallery → ParallaxCards → About → Footer
```

- `src/app/layout.tsx` — Root layout with Playfair Display font (via `next/font/google`) and metadata
- `src/app/globals.css` — Tailwind v4 `@theme` block with brand tokens, custom font-face declarations, utility classes
- `src/lib/utils.ts` — Shared utilities (likely `cn()` via clsx + tailwind-merge)

All section components live flat in `src/components/` (no subdirectory nesting).

### Animation Stack

All components use the `"use client"` directive. Two animation systems:

1. **Framer Motion** (`framer-motion ^11.15`) — Scroll-aware transforms, entrance animations, parallax effects
2. **Lenis** (`@studio-freight/lenis ^1.0.42`) — Smooth scrolling via `LenisProvider.tsx`

Note: GSAP is **not** currently a dependency. Scroll-driven effects use Framer Motion's `useScroll`/`useTransform`.

### Styling

- **Tailwind CSS v4** configured via `@tailwindcss/postcss` plugin (no `tailwind.config.ts` — uses CSS-first config in `globals.css`)
- Brand colors defined in `@theme`: `brand-gold` (#a1846c), `brand-black` (#231f20), `brand-white` (#ffffff)
- Fonts: Playfair Display (serif, logo/headings via next/font), Futura PT (sans-serif, body via local @font-face)
- Custom CSS utilities: `.text-gradient`, `.section-padding`, `.font-logo`, `.draw-link` (underline animation)
- Path alias: `@/*` maps to `./src/*`

### Key Patterns

- `VideoBackground` is a fixed-position video layer; sections overlay it with solid or transparent backgrounds to control video visibility
- `cn()` utility from `src/lib/utils.ts` for conditional class merging (clsx + tailwind-merge)

### Static Assets

Large media assets in `public/`:
- `frames/`, `frames-horse/` — Extracted video frames for scroll-based effects
- `hero-video.mp4`, `video.mp4` — Video assets
- `images/collections/`, `images/intro/`, `images/process/` — Section imagery
