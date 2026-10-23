import Link from "next/link";
import Button from "@/components/ui/Button";
import services from "@/data/services";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="container">
        <p className="not-found__code" aria-hidden="true">
          4<span>0</span>4
        </p>
        <h1 className="h2">This page took a different growth path.</h1>
        <p className="lead">The page you are looking for does not exist or has moved. Try one of these instead.</p>
        <div className="page-hero__actions">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
        <ul className="not-found__links">
          {services.slice(0, 5).map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="link-arrow">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
