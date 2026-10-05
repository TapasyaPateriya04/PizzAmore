# Integrations

## Browser storage

The app persists cart, orders, and coupon under versioned local-storage keys. Contact-form messages use a separate key. Storage read/write helpers report failures to the console, and order placement fails explicitly if the order cannot be saved. Evidence: [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`src/utils/order.js`](../../src/utils/order.js), [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx).

## Remote assets

Some catalogue photography is requested directly from Unsplash; base typography is imported from Google Fonts. These resources require network access. Local pizza images and a logo are in `src/assets/`. Evidence: [`src/data/pizzas.js`](../../src/data/pizzas.js), [`src/index.css`](../../src/index.css), [`src/assets/`](../../src/assets/).

## Payments, accounts, and messaging

There is no payment gateway, authentication provider, email sender, delivery provider, or backend API configured. The only checkout method is explicitly presented as cash on delivery for this local demo; submitting contact form saves locally and does not send email. Evidence: [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx), [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`README.md`](../../README.md).

## External secrets

No application environment variables or server credentials are used by the current frontend. Evidence: [`package.json`](../../package.json), [`src/`](../../src/).
