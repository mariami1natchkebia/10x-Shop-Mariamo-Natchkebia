## Screenshots

### catalog-page
![catalog-page](./src/assets/catalog-page.png)

### cart-page
![cart-page](./src/assets/cart-page.png)

### login-page
![login-page](./src/assets/login-page.png)

### checkout-page
![checkout-page](./src/assets/checkout-page.png)

### placed-order
![placed-order](./src/assets/placed-order.png)

### dark-mode
![dark-mode](./src/assets/same-in-dark-mode.png)



# 10X Shop — E-Commerce Single Page Application

A modern, highly performant, and fully responsive E-Commerce Single Page Application (SPA) built with React 19, TypeScript (strict mode), Tailwind CSS v4, and integrated with the DummyJSON API. Developed as a diploma project for the 10X Front-end course.

**Live Demo**: [https://10x-shop-maro.vercel.app](https://10x-shop-maro.vercel.app)

---

## 🚀 Key Features

### 🛒 CORE Functionality
- **Catalog Page (`/`)**: Displays products fetched asynchronously from DummyJSON API with loading, error, and category filtering states.
- **Product Details Page (`/products/:id`)**: Detailed product view featuring image galleries, stock status calculations, descriptions, and dynamic route params handling.
- **Shopping Cart (`/cart`)**: Complete state management with immutable updates via React Context. Supports quantity updates, item removal, and automatic subtotal/total calculations.
- **Authentication Simulation (`/login`)**: Simple local authentication state using `AuthContext`. Guest users attempting to access protected routes are automatically redirected.
- **Controlled Checkout (`/checkout`)**: Multi-field form with strict client-side validation, error handling, order summary, and order confirmation simulation.
- **Protected Routing (`ProtectedRoute`)**: Restricts access to the checkout flow, remembering the intended navigation path.
- **Error Handling & Resiliency**: Integrated global `ErrorBoundary` component ensuring graceful runtime error fallbacks.

---

## 🛠️ Tech Stack & Tools

- **Framework**: React 19 + Vite
- **Language**: TypeScript (`strict: true`)
- **Styling**: Tailwind CSS v4 (Utility-first styling, CSS custom variables)
- **Routing**: React Router v7 (`react-router-dom`)
- **State Management**: React Context API (Auth & Cart management)
- **API**: DummyJSON Public REST API (`fetch`)
- **Deployment**: Vercel

---

## 📁 Project Architecture
src/
├── api/
│   └── products.api.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── ScrollToTop.tsx
│   │
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   │
│   └── ui/
│       ├── CategorySelect.tsx
│       ├── Toast.tsx
│       └── ErrorBoundary.tsx
│
├── context/
│   ├── AuthContext.tsx
│   ├── AuthProvider.tsx
│   ├── CartContext.tsx
│   └── CartProvider.tsx
│
├── pages/
│   ├── CatalogPage.tsx
│   ├── ProductPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── LoginPage.tsx
│   └── NotFoundPage.tsx
│
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
│
├── types/
│   ├── cart.ts
│   ├── order.ts
│   └── product.ts
│
└── utils/
    ├── checkoutValidation.ts
    ├── format.ts
    └── orders.ts
---

## 🧪 Setup & Execution

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mariami1nachkebia-5502/10x-shop.git](https://github.com/mariami1nachkebia-5502/10x-shop.git)
   cd 10x-shop

   
