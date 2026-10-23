import Link from "next/link";

// Temporary typographic logo. To use the official asset, drop it in
// /public/logos and replace the <svg> + wordmark below with next/image.
export default function Logo({ className = "", onClick, id = "logo" }) {
  const gradId = `${id}-grad`;
  return (
    <Link href="/" className={`logo ${className}`} aria-label="Growthys home" onClick={onClick}>
      <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#648BFF" />
            <stop offset="1" stopColor="#57E6D2" />
          </linearGradient>
        </defs>
        <path
          d="M25.5 11.2A11 11 0 1 0 27 17h-9.5"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M21.5 5.5 27.5 4l-1.4 6"
          fill="none"
          stroke="#57E6D2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__word">
        Growth<span className="logo__ys">ys</span>
      </span>
    </Link>
  );
}
