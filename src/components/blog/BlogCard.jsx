import Link from "next/link";
import BlogArt from "@/components/blog/BlogArt";
import { formatDate } from "@/lib/format";

export default function BlogCard({ post, featured = false }) {
  return (
    <article className={`blog-card${featured ? " blog-card--featured" : ""}`}>
      <div className="blog-card__media">
        <BlogArt post={post} />
      </div>
      <div className="blog-card__body">
        <p className="blog-card__meta">
          <span className="tag">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </p>
        <h3 className="blog-card__title">
          <Link href={`/blog/${post.slug}`} className="blog-card__link">
            {post.title}
          </Link>
        </h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <span className="link-arrow" aria-hidden="true">
          Read article
        </span>
      </div>
    </article>
  );
}
