# PizzAmore

A responsive vegetarian pizza ordering experience built with React, React Router, and Vite.

## Run locally

```sh
npm ci
npm run dev
```

Run `npm run build` to create the production bundle and `npm run lint` to run ESLint.

## Ordering experience

Browse or search pizzas, filter and sort the menu, customize a pizza, and add it to the persistent bucket. The bucket calculates coupon discounts, 5% tax, delivery fees, and totals. Checkout validates customer and Indian delivery details and places a cash-on-delivery demo order. Confirmation, tracking, order history, and reorder are available from the navigation.

## Local-first demo limitations

There is no backend or payment service configured in this repository. Bucket contents, orders, and contact-form submissions are saved in the current browser with local storage; orders are not transmitted to a restaurant and no payment or delivery is actually processed. Cash on delivery is the only checkout option. The tracking timeline advances deterministically from the locally saved order time.

Menu data and coupon rules are centralized in `src/data/pizzas.js` and `src/utils/order.js`.
