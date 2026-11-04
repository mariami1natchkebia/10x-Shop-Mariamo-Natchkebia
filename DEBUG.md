# 10X Shop — Debugging Log (DEBUG-LOG.md)

This log documents real technical issues encountered during the development of the 10X Shop application, detailing diagnosis, root causes, and fixes.

---

**### Issue #1: Race Conditions in Category Filtering (`CatalogPage.tsx`)**

- **Symptom**: Fast switching between categories sometimes displayed products from a previously selected category instead of the current one.
- **Reproduction**: Click category "laptops", then rapidly click "smartphones" before the first API request completes.
- **Tool Used**: Browser Network Tab & React DevTools.
- **Root Cause**: The async API response for "laptops" resolved *after* the "smartphones" request, overwriting the latest state.
- **Fix**: Added a cleanup function with an `ignore` flag inside the `useEffect` hook:

```typescript
    useEffect(() => {
    let ignore = false;

    fetchProductsByCategory(selectedCategory).then((data) => {
        if (!ignore) setProducts(data.products);
    });

    return () => {
        ignore = true;
    };
    }, [selectedCategory]);
    ```

---

**### Issue #2: Stale Closure During Cart Quantity Addition (`CartContext.tsx`)**

- **Symptom**: Rapidly clicking "Add to Cart" on a product card caused inconsistent cart quantities.
- **Reproduction**: Click "Add to Cart" three times in very rapid succession.
- **Tool Used**: Console Logging & React DevTools Profiler.
- **Root Cause**: The `addItem` function was calculating stock limits using the captured state variable `items` instead of the functional state updater callback.
- **Fix**: Refactored `setItems` to use functional state updates (`setItems(prev => ...)`), ensuring each operation works with the most current state value.

---

**### Issue #3: ESLint Fast Refresh Warnings (AuthProvider / CartProvider)**

- **Symptom**: Running `npm run lint` produced `react-refresh/only-export-components` errors.
- **Reproduction**: Run `npm run lint` in the terminal.
- **Tool Used**: ESLint CLI.
- **Root Cause**: Context files exported both React components (`AuthProvider`) and custom hooks (`useAuth`) from the same module, violating Vite Fast Refresh isolation rules.
- **Fix**: Separated context creation, Provider components, and custom hooks into individual dedicated files:
  - `AuthContext.tsx`
  - `AuthProvider.tsx`
  - `useAuth.ts`
  - `CartContext.tsx`
  - `CartProvider.tsx`
  - `useCart.ts`

---

**### Issue #4: Deployment 404 Errors on Route Refresh (Vercel)**

- **Symptom**: Refreshing the browser on routes such as `/products/5` or `/cart` resulted in a Vercel 404 page.
- **Reproduction**: Navigate to `/products/5` or `/cart` and press F5 / Refresh.
- **Tool Used**: Vercel Deployment Logs & Chrome DevTools.
- **Root Cause**: Vercel attempted to locate a physical static file matching the requested route instead of serving the SPA `index.html`.
- **Fix**: Created a `vercel.json` configuration file in the project root with rewrite rules:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```