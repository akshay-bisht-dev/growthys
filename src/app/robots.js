import { absoluteUrl } from "@/data/site";

// Required for `output: "export"`.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
