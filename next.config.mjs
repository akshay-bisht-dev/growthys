/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Hostinger shared hosting (Apache, no Node.js).
  // Every route becomes folder/index.html; see public/.htaccess.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // cacheComponents/partialPrefetching are server features and are
  // incompatible with static export, so they stay off here.
};

export default nextConfig;
