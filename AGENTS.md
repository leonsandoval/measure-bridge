# MeasureBridge — AGENTS.md

## Stack

**React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + Zustand 5 + PWA**

No .NET/Blazor — this is a pure React SPA. Tailwind v4 needs NO config file: `@import "tailwindcss"` in `src/index.css` and `@tailwindcss/vite` plugin in `vite.config.ts`.

## Commands

| Command | What it runs |
|---------|-------------|
| `npm run dev` | `vite` — dev server with HMR |
| `npm run build` | `tsc && vite build` — typecheck **before** build; order matters |
| `npm test` | `vitest run` — single run |
| `npm run test:watch` | `vitest` — watch mode |
| `npm run test:ui` | `vitest --ui` — browser UI for tests |

**Lint**: `npx eslint src/`. No formatter config found (no Prettier, no `.editorconfig`).

## Architecture

```
src/
├── main.tsx          # Entry — renders <App />
├── App.tsx           # Root: <Layout><ConverterForm /></Layout>
├── index.css         # Tailwind import + project utilities
├── App.css           # DEAD CODE — Vite template leftovers, don't touch
├── test/setup.ts     # Vitest setup: imports @testing-library/jest-dom/vitest
├── domain/           # Pure logic, zero React deps
│   ├── types.ts      # Unit, Category, Result, ParserResult interfaces
│   ├── registry.ts   # Category/unit definitions + lookup helpers
│   ├── parser.ts     # Imperial composite notation parser (6'2", 5ft 10in, 2 cups…)
│   └── categories/   # One file per type: length.ts, mass.ts, volume.ts, …
│       └── __tests__/
├── store/
│   └── useConverterStore.ts  # Single Zustand store: state + calculate()
├── hooks/
│   └── useConversion.ts      # Bridge: subscribes to store, auto-recalculates on change
├── utils/
│   ├── format.ts     # Intl.NumberFormat('es-AR') for display
│   └── precision.ts  # Per-category/per-unit rounding rules
└── components/
    ├── Layout.tsx        # Shell: header + CategoryTabs + main (responsive max-w-md/…/xl)
    ├── CategoryTabs.tsx  # 6 category buttons, horizontal scroll with snap
    ├── ConverterForm.tsx # From/To selects (stack on mobile), input, ResultDisplay
    ├── UnitSelect.tsx    # Single <select> with metric/imperial optgroups
    └── ResultDisplay.tsx # Shows result or error with copy button
```

## Key facts an agent would otherwise miss

- **`App.css` is dead code** — leftover from Vite template. No component imports it. Delete it or ignore it.
- **Tailwind v4**: no `tailwind.config.js`/`tailwind.config.ts`. Configuration happens via CSS `@theme` directive or inline in `@import "tailwindcss"`. All responsive classes use standard prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
- **Build** runs `tsc` first, **then** `vite build`. If you need to skip typecheck, use `vite build` directly.
- **PWA** with `vite-plugin-pwa`: `registerType: 'autoUpdate'` — service worker auto-updates on deploy. Manifest forces `orientation: 'portrait'`.
- **Conversion architecture**: each category has its own converter function (e.g. `convertLength`). Pattern: convert to metric-base → convert to target. The store dispatches to the right converter via a `Record<string, (v, f, t) => number>` map.
- **Parser** (`domain/parser.ts`): handles imperial composite notation. Patterns are in `PATTERNS[]` array with regex + parse function. Only matches explicit patterns; returns `null` for plain numbers.
- **Zustand store** is the single source of truth. The `useConversion` hook subscribes and auto-recalculates via `useEffect` on change. Components never call `calculate()` directly — the hook does it.
- **Tests**: Vitest + jsdom. Test files co-located with source (`__tests__/` folders). Setup imports `@testing-library/jest-dom/vitest` for matchers. No snapshot tests, no integration test prerequisites.
- **No CI/CD** — no GitHub Actions, no `.github/` directory, no issue templates. PRs are manual via browser (no `gh` CLI available).
- **Branch convention**: `type/description` (`fix/`, `feat/`). Conventional commits used historically.
- **Deployed** at `https://measure-bridge.vercel.app/`. Static files in `public/` (icons, sitemap, robots.txt) are copied to build root.

## CSS utilities (project-specific)

Defined in `src/index.css`:
- `.snap-x` — `scroll-snap-type: x mandatory` + `-webkit-overflow-scrolling: touch`
- `.snap-start` — `scroll-snap-align: start`
- `.scroll-fade` — mask gradient fade at edges for horizontal scroll containers
