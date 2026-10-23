// Generated featured artwork per category — swap for real imagery via
// next/image when available.
const palettes = {
  "Web Development": ["#57E6D2", "#648BFF"],
  SEO: ["#648BFF", "#A78BFA"],
  "Performance Marketing": ["#A78BFA", "#57E6D2"],
  "Digital Strategy": ["#57E6D2", "#A78BFA"],
};

export default function BlogArt({ post }) {
  const [a, b] = palettes[post.category] || ["#57E6D2", "#648BFF"];
  const id = `art-${post.slug}`;
  const seed = post.slug.length;
  return (
    <svg className="blog-art" viewBox="0 0 640 400" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id={`${id}-r`} cx="20%" cy="0%" r="100%">
          <stop offset="0" stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor="#0D1320" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill="#0D1320" />
      <rect width="640" height="400" fill={`url(#${id}-r)`} />
      {Array.from({ length: 6 }, (_, i) => (
        <circle
          key={i}
          cx={420 + ((seed * (i + 3)) % 80)}
          cy={200}
          r={40 + i * 26}
          fill="none"
          stroke={`url(#${id}-g)`}
          strokeOpacity={0.7 - i * 0.1}
          strokeWidth="1.5"
        />
      ))}
      <path
        d={`M0 ${320 - (seed % 40)} C 160 ${300 - seed}, 260 ${200 + (seed % 30)}, 640 ${120 + (seed % 50)}`}
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="3"
      />
    </svg>
  );
}
