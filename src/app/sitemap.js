import services from "@/data/services";
import projects from "@/data/projects";
import posts from "@/data/posts";
import { absoluteUrl } from "@/data/site";

// Required for `output: "export"`.
export const dynamic = "force-static";

export default function sitemap() {
  const staticRoutes = [
    ["/", 1],
    ["/about", 0.8],
    ["/services", 0.9],
    ["/technologies", 0.6],
    ["/process", 0.6],
    ["/portfolio", 0.7],
    ["/industries", 0.6],
    ["/blog", 0.7],
    ["/contact", 0.8],
    ["/privacy-policy", 0.2],
    ["/terms", 0.2],
  ].map(([path, priority]) => ({ url: absoluteUrl(path), priority }));

  return [
    ...staticRoutes,
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/portfolio/${p.slug}`), priority: 0.5 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.date, priority: 0.6 })),
  ];
}
