// Base path the site is served under (e.g. "/growthys" on GitHub Pages).
// next/link and _next assets get it automatically; plain URLs use withBase().
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const withBase = (path) => `${BASE_PATH}${path}`;
