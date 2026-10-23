/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every route becomes folder/index.html (GitHub Pages).
  output: "export",
  trailingSlash: true,
  // Set in CI for a project site, e.g. "/growthys"; empty for local dev.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
  // cacheComponents/partialPrefetching are server features and are
  // incompatible with static export, so they stay off here.
};

export default nextConfig;
