// Fallback for dynamic-route pages while their content streams in.
export default function PageSkeleton() {
  return (
    <section className="page-hero page-skeleton" aria-busy="true" aria-label="Loading">
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="container">
        <span className="page-skeleton__line page-skeleton__line--sm" />
        <span className="page-skeleton__line page-skeleton__line--lg" />
        <span className="page-skeleton__line page-skeleton__line--md" />
      </div>
    </section>
  );
}
