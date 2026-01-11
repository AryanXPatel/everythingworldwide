# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server (Next.js 16)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is currently configured.

## Architecture Overview

Next.js 16 ecommerce application for KINUAMI U shower products with scroll-driven animations and Shopify checkout.

### State Management

Custom reducer pattern in `src/context/CartContext.tsx` using `useReducer`. Cart persists to localStorage with key `kinuami-cart`. Access via `useCart()` hook.

### Animation System

GSAP with ScrollTrigger for scroll-driven animations. Always import from the lib to ensure plugins are registered:
```typescript
import { gsap, ScrollTrigger } from '@/lib/gsap';
```

**Mobile breakpoint (992px)**: Canvas-based animations (`useSequenceAnimation`) are completely disabled below this width. Design accordingly.

Custom hooks:
- `useSequenceAnimation`: Canvas-based image sequence rendering synced to scroll
- `useHorizontalScroll`: Scroll-triggered horizontal panning

### Server vs Client Components

Default to Server Components. Use `'use client'` for:
- Animation hooks
- Context providers and consumers
- Any component using browser APIs

### Providers

All app-wide providers live in `src/app/providers.tsx`. This component also manages loading states via CSS classes (`is-ready`, `fonts-loaded`) on the document root.

### Styling

Two CSS variable systems in `src/styles/`:
- `kinuami-theme.css`: Design tokens (colors, typography, spacing)
- `main.css`: Animation easings, grid system, transitions

### Shopify Integration

Shopify Storefront API client in `src/lib/shopify.ts`. Requires:
```
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-token
```

### Path Aliases

`@/*` maps to `./src/*`
