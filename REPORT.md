# 10X Shop – Final Report

## 1. Planned vs. delivered

| Module / scope | Status | Details |
| :--- | :---: | :--- |
| Project setup (Vite, React 19, TypeScript, Tailwind v4) | Done | `strict: true` in `tsconfig.app.json` and `tsconfig.node.json`; scripts `dev`, `build`, `preview`, `typecheck`, `lint` |
| Login (CORE) | Done | Controlled form, validation, `AuthContext`, redirect back to the page the guest came from |
| Catalog (CORE) | Done | DummyJSON fetch, loading / error / empty states, `ProductCard` + `ProductGrid` (`map` + stable `key`) |
| Product page (CORE) | Done | `useParams`, gallery, stock states, quantity, Add to cart, 404 for invalid or unknown ids |
| Cart (CORE) | Done | Add / change quantity / remove / clear, totals, `localStorage` persistence |
| Checkout (CORE) | Done | Controlled form, validation, local order simulation, "Thank you!" confirmation, cart cleared |
| Tailwind CSS (CORE) | Done | Utility classes, grid / flex, mobile-first breakpoints, hover / focus / disabled states |
| Optimization (CORE) | Done | Responsive layout, `ErrorBoundary`, `DEBUG-LOG.md`; hero image reduced from 2.55 MB to 64 KB |
| Practical project (CORE) | Done | README, PLAN, REPORT, Git history, Vercel deployment with SPA rewrite |
| FULL extras | Partly | Category filter and pagination (kept in the URL, so Back / refresh restore them), saved orders (`localStorage`), dark / light theme (`@theme` tokens) |
| Not done | – | Search, sorting, price filters in the URL (only category and page are in the URL), Orders / Profile pages, Reviews write form, Related products, Promo code, Formik + Yup, Lighthouse before / after comparison |

## 2. Hardest problems

1. **Outdated responses overwriting newer ones** (category switching) – solved with an `ignore` flag in the effect cleanup.
2. **Stale state in the cart** – the add / update decision moved inside `setItems((prev) => ...)`.
3. **Lint rule `set-state-in-effect`** – `loading` / `error` became values derived from the stored response and its request key instead of separate state set inside the effect.

Details and commit links: `DEBUG-LOG.md`.

## 3. Metrics

| Metric | Value |
| :--- | :--- |
| `npm run typecheck` (strict) | 0 errors |
| `npm run lint` | 0 errors, 0 warnings |
| Production bundle | JS 95 kB gzip, CSS 6 kB gzip |
| Hero image | 2.55 MB → 64 KB |
| Commits / merged PRs | see `git log` (41 commits and PRs #1–#12 before the final fixes) |
| Lighthouse (mobile, live URL, Chrome DevTools) | Performance 98 · Accessibility 93 · Best Practices 100 · SEO 92 |
| Core Web Vitals (same run) | FCP 1.5 s · LCP 2.3 s · TBT 60 ms · CLS 0 · Speed Index 1.5 s |
| Lighthouse screenshots | `docs/lighthouse/` |

## 4. What I would do differently

- Keep filters, page and category in the URL (`useSearchParams`) so refresh and the Back button work.
- Do price filtering on the server side of the request (or sort / filter the whole result) so that "Showing X of Y" is accurate.
- Add a Retry button and skeleton cards, and measure with Lighthouse from the first week rather than at the end.

## 5. AI usage

- **Delegated:** reviewing the code against the PRD, finding lint and accessibility problems, drafting documentation.
- **Kept myself:** architecture and folder structure, component design, validation rules, state management decisions, manual testing and debugging.
- **Rejected / checked:** claims in the first version of this report that did not match the code (strict mode, lint status) were corrected after running `typecheck`, `lint` and `build`.