import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Animate from "@/components/animations/Animate";
import PageSkeleton from "@/components/layout/PageSkeleton";
import PageHero from "@/components/layout/PageHero";
import JsonLd from "@/components/layout/JsonLd";
import BlogArt from "@/components/blog/BlogArt";
import BlogCard from "@/components/blog/BlogCard";
import FinalCta from "@/components/home/FinalCta";
import posts, { getPost } from "@/data/posts";
import services from "@/data/services";
import site, { absoluteUrl } from "@/data/site";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/metadata";

// Only the slugs listed here exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
  });
}

// Internal links from each category to the most relevant service.
const relatedService = {
  "Web Development": "web-development",
  SEO: "seo",
  "Performance Marketing": "performance-marketing",
  "Digital Strategy": "digital-marketing",
  WordPress: "web-development",
  Shopify: "ecommerce-growth",
  Branding: "branding",
  Technology: "web-development",
};

export default function PostPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const service = services.find((s) => s.slug === relatedService[post.category]);
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <Animate>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.category,
          mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        wide
        crumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${slug}` },
        ]}
      />

      <article className="section section--tight article">
        <div className="container">
          <p className="article__meta" data-reveal>
            <span>By {post.author}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} min read</span>
          </p>
          <div className="article__media" data-img-reveal>
            <BlogArt post={post} />
          </div>
          <div className="article__layout">
            <div className="prose">
              <p className="article__lead">{post.excerpt}</p>
              {post.body.map((block, i) => {
                if (block.h2) return <h2 key={i}>{block.h2}</h2>;
                if (block.ul)
                  return (
                    <ul key={i}>
                      {block.ul.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  );
                return <p key={i}>{block.p}</p>;
              })}
            </div>
            {service && (
              <aside className="article__aside" aria-label="Related service">
                <div className="card">
                  <p className="eyebrow">
                    <span className="eyebrow__dot" />
                    Related service
                  </p>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <Link href={`/services/${service.slug}`} className="link-arrow">
                    Explore {service.title}
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-split>
              Related articles
            </h2>
          </div>
          <div className="blog-grid" data-stagger>
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </Animate>
  );
}
