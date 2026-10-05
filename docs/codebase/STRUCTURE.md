# Structure

```text
.
├── docs/codebase/       Evidence-based repository guide
├── src/
│   ├── assets/          Local logo and pizza photography
│   ├── components/     Shared navigation, product card, and reveal primitive
│   ├── context/        Cart, coupon, order, and toast state
│   ├── data/           Pizza catalogue and customization choices
│   ├── hooks/          Page metadata hook
│   ├── pages/          Route-level storefront pages
│   ├── styles/         Main storefront CSS
│   ├── utils/          Pricing, coupon, status, and persistence helpers
│   ├── App.jsx         Router and application providers
│   ├── main.jsx        React DOM entry
│   └── index.css       Global base styles
├── index.html           Vite HTML shell and default SEO metadata
└── package.json         Scripts and dependencies
```

The page implementations currently live together in `src/pages/StorePages.jsx`; individual reusable UI pieces are in `src/components/`. Evidence: [`src/App.jsx`](../../src/App.jsx), [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx), [`src/components/`](../../src/components/), [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`src/data/pizzas.js`](../../src/data/pizzas.js), [`src/utils/order.js`](../../src/utils/order.js).

No server, database, API route, test directory, or generated code is present in the repository root. Evidence: [`package.json`](../../package.json) and the application tree above.
