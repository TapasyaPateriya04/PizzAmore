# Stack

## Runtime and build

- React 18.3 with JavaScript ES modules and JSX. There is no TypeScript configuration. Evidence: [`package.json`](../../package.json), [`src/main.jsx`](../../src/main.jsx).
- Vite 6 with the React plugin serves the development application and produces the static production bundle. Evidence: [`vite.config.js`](../../vite.config.js), [`package.json`](../../package.json).
- React Router 7 provides client-side routing. Evidence: [`package.json`](../../package.json), [`src/App.jsx`](../../src/App.jsx).
- Motion provides React viewport and hover animation primitives; the shared reveal component checks reduced-motion preferences. Evidence: [`package.json`](../../package.json), [`src/components/Reveal.jsx`](../../src/components/Reveal.jsx).
- Styling is plain CSS split between global reset/base styles and the application stylesheet. Tailwind and PostCSS packages are installed, but the rendered storefront uses CSS classes rather than Tailwind utilities. Evidence: [`src/index.css`](../../src/index.css), [`src/styles/site.css`](../../src/styles/site.css), [`tailwind.config.js`](../../tailwind.config.js), [`postcss.config.js`](../../postcss.config.js).

## Commands

- `npm ci` installs the lockfile-defined dependencies.
- `npm run dev` starts Vite.
- `npm run lint` runs ESLint.
- `npm run build` creates `dist/`.
- `npm run preview` serves the built output locally.

Evidence: [`package.json`](../../package.json), [`package-lock.json`](../../package-lock.json).
