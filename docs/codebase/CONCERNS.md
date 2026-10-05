# Concerns and open decisions

## Known product/production limits

- The app is a local-first demonstration: orders and contact messages never reach a restaurant, and local storage is device/browser-specific. Evidence: [`README.md`](../../README.md), [`src/context/CartContext.jsx`](../../src/context/CartContext.jsx), [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx).
- Cash on delivery is a demonstration choice; there is no payment processing, customer account, or authentication. Evidence: [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx), [`package.json`](../../package.json).
- Order progress advances deterministically from elapsed time rather than a restaurant/delivery update. Evidence: [`src/utils/order.js`](../../src/utils/order.js).
- Some pizza images and all web fonts depend on third-party network availability. Evidence: [`src/data/pizzas.js`](../../src/data/pizzas.js), [`src/index.css`](../../src/index.css).
- Prices, ratings, reviews, offers, tax, and delivery rules are demonstration catalogue/business data and have no server-side validation. Evidence: [`src/data/pizzas.js`](../../src/data/pizzas.js), [`src/utils/order.js`](../../src/utils/order.js).
- The project has no automated behavior tests, so critical cart and checkout regressions currently require manual browser verification. Evidence: [`package.json`](../../package.json).

## Product intent questions

- [ASK USER] Should this remain a local demo, or should it connect to a production ordering backend and restaurant operations?
- [ASK USER] Which payment provider, delivery service, and customer-account model should be used if moving beyond the demo?
- [ASK USER] Are the current INR prices, 5% tax, free-delivery threshold, delivery fee, and coupon rules the intended commercial policy?
- [ASK USER] What data-retention, privacy, and customer-support contact requirements apply to a production launch?

Until answered, do not represent local confirmation, deterministic status, or cash-on-delivery selection as a real placed/paid/delivered order. Evidence: [`README.md`](../../README.md), [`src/utils/order.js`](../../src/utils/order.js).
