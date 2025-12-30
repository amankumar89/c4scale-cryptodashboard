# C4Scale - Crypto Dashboard

A small React + TypeScript dashboard that visualizes CoinGecko cryptocurrency data (top gainers/losers, price charts, trading volume).

## Quickstart ✅

Prerequisites:

- Node.js 18+ (tested with Node 18)
- npm (or pnpm/yarn)

Install and run locally:

```bash
# install dependencies
npm ci

# run dev server
npm run dev
```

Open http://localhost:5173 in your browser.

## Available scripts

- `npm run dev` — start Vite dev server
- `npm run build` — run TypeScript build and Vite production build
- `npm run lint` — run ESLint
- `npm test` — placeholder test script (update when tests are added)

## Project structure

- `src/` — application source
  - `components/` — React components (chart panel, gainers/losers, layout)
  - `hooks/` — `useCoinGeckoAPI` data hooks
  - `utils/` — API client `apiClient.ts`
  - `types/` — TypeScript types

## Notes & future improvements

- Add unit and integration tests (Vitest + React Testing Library)
- Add caching and retries for CoinGecko API (rate limits)
- Harden runtime validation for API responses (zod/io-ts)
- Add GitHub Actions CI (already scaffolded)

## License

MIT
