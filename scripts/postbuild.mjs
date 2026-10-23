// Runs after `next build` (static export): adds the long-cache rule for
// hashed assets, which can't live in public/ because _next/ is generated.
import { copyFileSync, existsSync } from "node:fs";

if (existsSync("out/_next/static")) {
  copyFileSync("deploy/static-cache.htaccess", "out/_next/static/.htaccess");
  console.log("postbuild: added out/_next/static/.htaccess");
}
