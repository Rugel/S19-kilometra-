// Allow importing global (non-module) CSS as a side effect,
// e.g. `import "./globals.css";` in app/layout.tsx.
//
// Next.js's bundled types only declare `*.module.css` / `*.module.sass` /
// `*.module.scss`. Without an explicit declaration, TS can report
// "Cannot find module for the side-effect import of './globals.css'",
// especially when `noUncheckedSideEffectImports` is enabled or the
// language server hasn't loaded the generated `next-env.d.ts`.
//
// This bare declaration marks any `*.css` import as resolvable without
// introducing a default export (global CSS has no JS export).
declare module "*.css";