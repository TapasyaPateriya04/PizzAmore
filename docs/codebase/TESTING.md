# Testing

## Available automated checks

- `npm run lint` runs ESLint across the repository.
- `npm run build` verifies Vite can produce the production bundle.

There is no test runner, unit/integration test suite, browser-test setup, or test script currently configured. Evidence: [`package.json`](../../package.json), [`eslint.config.js`](../../eslint.config.js).

## Manual verification

The primary customer journey to manually exercise is home → menu/search/filter → customize → bucket/coupon → checkout → confirmation → order history/tracking → reorder. Refresh should retain local bucket/order state. Confirm responsive layouts and the `prefers-reduced-motion` experience in a browser. Relevant implementation: [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx), [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`src/components/Reveal.jsx`](../../src/components/Reveal.jsx).

## Build note

The production build currently succeeds. Vite may warn that the lockfile's Browserslist data is old; update that data only as a scoped maintenance task. Evidence: [`package-lock.json`](../../package-lock.json), [`package.json`](../../package.json).
