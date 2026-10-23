import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import BlogCard from "@/components/blog/BlogCard";
import FinalCta from "@/components/home/FinalCta";
import posts, { blogCategories } from "@/data/posts";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Blog & Insights",
  description:
    "Practical articles on web development, SEO, performance marketing, WordPress, Shopify, branding and digital strategy from the Growthys team.",
  path: "/blog",
});

export default function BlogPage() {
  const used = new Set(posts.map((p) => p.category));
  return (
    <Animate>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Ideas that move <span className="text-gradient">businesses forward.</span>
          </>
        }
        lead="Practical, plain-language articles on building and growing a digital presence."
        crumbs={[{ label: "Blog", href: "/blog" }]}
      />
      <section className="section section--tight">
        <div className="container">
          <ul className="tags blog-topics" aria-label="Topics we write about" data-reveal>
            {blogCategories.map((c) => (
              <li key={c} className={`tag${used.has(c) ? " tag--active" : ""}`}>
                {c}
              </li>
            ))}
          </ul>
          <div className="blog-grid" data-stagger>
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </Animate>
  );
}
