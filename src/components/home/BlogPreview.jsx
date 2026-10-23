import Button from "@/components/ui/Button";
import BlogCard from "@/components/blog/BlogCard";
import posts from "@/data/posts";

export default function BlogPreview() {
  const [first, ...rest] = posts;
  return (
    <section className="section blog-preview" aria-labelledby="blog-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Insights
            </p>
            <h2 id="blog-title" className="h2" data-split>
              Ideas That Move
              <br />
              Businesses Forward.
            </h2>
          </div>
          <div className="section-head__aside" data-reveal>
            <Button href="/blog" variant="ghost">
              All articles
            </Button>
          </div>
        </div>
        <div className="blog-grid blog-grid--home" data-stagger>
          <BlogCard post={first} featured />
          {rest.slice(0, 2).map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
