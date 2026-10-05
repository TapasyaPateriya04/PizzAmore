# Conventions

- Source uses JavaScript ES modules and JSX; React components and hooks follow the repository's existing default/named-export pattern. Evidence: [`src/components/`](../../src/components/), [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx).
- Route paths are declared centrally in `App.jsx`; shared layout belongs in `SiteLayout`, while route content currently belongs in `StorePages.jsx`. Evidence: [`src/App.jsx`](../../src/App.jsx), [`src/components/SiteLayout.jsx`](../../src/components/SiteLayout.jsx), [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx).
- Catalogue and pricing configuration are centralized rather than duplicated across cards and pages. Evidence: [`src/data/pizzas.js`](../../src/data/pizzas.js), [`src/utils/order.js`](../../src/utils/order.js).
- Component styles use semantic, kebab-case CSS class names in `src/styles/site.css`; global reset/font defaults are in `src/index.css`. Evidence: [`src/styles/site.css`](../../src/styles/site.css), [`src/index.css`](../../src/index.css).
- Forms use associated labels and inline errors; async-style order submission has a pending state and explicit failure message. Evidence: [`src/pages/StorePages.jsx`](../../src/pages/StorePages.jsx).
- ESLint is the available static check; there is no formatter script or enforced TypeScript type-check in `package.json`. Evidence: [`eslint.config.js`](../../eslint.config.js), [`package.json`](../../package.json).

Keep changes aligned with these patterns unless the project grows enough to justify extracting route pages or domain modules.
