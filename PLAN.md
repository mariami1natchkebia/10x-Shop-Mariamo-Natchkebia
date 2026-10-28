# 10X Shop - Project Plan (PLAN.md)

## 1. Project Goal & Scope
- **Goal**: Build a fully responsive Single Page E-Commerce application ("10X Shop") using React, TypeScript, Tailwind CSS v4, and DummyJSON API within a strict 2-week timeframe for the diploma project.
- **Core Scope (Week 1)**: 
  - Project setup, architecture, and routing (`react-router-dom`).
  - Authentication simulation via React Context (`/login`).
  - Product Catalog fetching from DummyJSON (`/`).
  - Product Details page (`/products/:id`).
  - Shopping Cart with immutable state management (`/cart`).
  - Controlled Checkout form and local order simulation (`/checkout`).
- **Design & Polish Scope (Week 2)**:
  - Tailwind CSS v4 styling, responsive layouts (mobile & desktop).
  - Loading, error, and empty states UX.
  - TypeScript strict compilation and build optimization (0 errors).
  - Final documentation and Vercel/Netlify deployment.

---

## 2. Work Breakdown Structure (WBS) & Timeline

### Week 1: Core Functionality, Logic & Routing
- **Task 1**: Project initialization, Vite + TS strict config, and architecture folders setup (`components/`, `pages/`, `context/`, `types/`, `api/`, `utils/`).
- **Task 2**: Layout configuration (Header, Footer) and React Router setup (`/`, `/login`, `/products/:id`, `/cart`, `/checkout`).
- **Task 3**: TypeScript interfaces setup (`Product`, `CartItem`, `AuthUser`, etc.).
- **Task 4**: AuthContext implementation & Login Page controlled form.
- **Task 5**: Catalog Page implementation with DummyJSON API integration (`useEffect` / `fetch`).
- **Task 6**: Product Details Page (`/products/:id`) with dynamic routing and stock handling.
- **Task 7**: CartContext & Shopping Cart Page (immutable updates, quantities, subtotal calculations).
- **Task 8**: Checkout Page controlled form, validation, and local order simulation.

### Week 2: Design, Tailwind Styling, Polish & Deployment
- **Task 9**: Apply Tailwind CSS v4 utility classes across all pages (Catalog, Product, Cart, Login, Checkout).
- **Task 10**: Responsive design verification (mobile-first, ensuring no horizontal scroll on small viewports).
- **Task 11**: Loading, error, and empty state UI components implementation.
- **Task 12**: TypeScript type-check (`tsc --noEmit`) and production build verification (0 errors).
- **Task 13**: Deployment on Vercel/Netlify and SPA route rewrite testing.
- **Task 14**: Finalizing documentation (`README.md`, `PLAN.md`, `REPORT.md`).

---

## 3. Risk Management & Mitigations
1. **Risk**: DummyJSON API might experience connectivity issues.
   - *Mitigation*: Implement robust error handling and fallback states.
2. **Risk**: Time constraints (2-week strict deadline).
   - *Mitigation*: Strictly prioritize CORE features in Week 1 and leave optional/FULL features out unless time permits.
3. **Risk**: TypeScript strict mode compilation issues.
   - *Mitigation*: Continuously run `npm run typecheck` during development.
