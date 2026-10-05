# Architecture

## Application composition

`src/main.jsx` mounts `App` inside React Strict Mode. `App` wraps the route tree in `CartProvider` and `BrowserRouter`, then renders the shared `SiteLayout` around home, menu, product, offers, about, contact, legal, cart, checkout, order-history, tracking, and confirmation pages. Unknown routes redirect to the not-found page. Evidence: [`src/main.jsx`](../../src/main.jsx), [`src/App.jsx`](../../src/App.jsx), [`src/components/SiteLayout.jsx`](../../src/components/SiteLayout.jsx).

## State and domain logic

`CartContext` is the shared client-side state boundary for cart items, coupon, locally stored orders, and transient toast feedback. `utils/order.js` contains unit pricing, totals, coupon eligibility, deterministic order-status progression, and guarded local-storage helpers. The catalogue and customization options are centralized in `data/pizzas.js`. Evidence: [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`src/utils/order.js`](../../src/utils/order.js), [`src/data/pizzas.js`](../../src/data/pizzas.js).

## Ordering flow

The menu filters and sorts catalogue data; product pages collect size, crust, toppings, quantity, and instructions; the cart and checkout consume shared pricing totals. Checkout validates customer and Indian delivery fields, then `placeOrder` saves an order to browser local storage before clearing the cart. Confirmation, history, tracking, and reorder operate on that local order record. Evidence: [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx), [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`src/utils/order.js`](../../src/utils/order.js).

## Presentation

`SiteLayout` supplies shared navigation, search entry, cart count, toast, and footer. `PizzaCard` is reused across catalogue surfaces. `Reveal` provides scroll-triggered opacity/vertical reveals and restrained hover animation, while honoring reduced-motion preferences. Page metadata is changed with `usePageMeta`. Evidence: [`src/components/SiteLayout.jsx`](../../src/components/SiteLayout.jsx), [`src/components/PizzaCard.jsx`](../../src/components/PizzaCard.jsx), [`src/components/Reveal.jsx`](../../src/components/Reveal.jsx), [`src/hooks/usePageMeta.js`](../../src/hooks/usePageMeta.js).

## Persistence boundary

The browser is the only persistence boundary. Data is per browser profile/device and is not shared, authenticated, or synchronized with a restaurant service. Evidence: [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`README.md`](../../README.md).
