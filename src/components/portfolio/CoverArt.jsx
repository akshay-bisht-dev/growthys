// Generated, abstract cover art for demo case studies — an honest stand-in
// until real, approved project screenshots are available.
export default function CoverArt({ project, className = "" }) {
  const [accent, deep] = project.palette;
  const id = `cov-${project.slug}`;
  return (
    <svg
      className={`cover-art ${className}`}
      viewBox="0 0 800 560"
      role="img"
      aria-label={`Illustrative cover for the ${project.title} concept project`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${id}-g`} cx="70%" cy="20%" r="90%">
          <stop offset="0" stopColor={accent} stopOpacity="0.55" />
          <stop offset="0.45" stopColor={deep} />
          <stop offset="1" stopColor="#080B12" />
        </radialGradient>
        <linearGradient id={`${id}-l`} x1="0" x2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor="#648BFF" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" fill={`url(#${id}-g)`} />
      <g opacity="0.08" stroke="#fff">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={i * 60} y1="0" x2={i * 60} y2="560" />
        ))}
      </g>
      {/* Browser frame */}
      <g transform="translate(120 96)">
        <rect width="560" height="380" rx="18" fill="#0B1019" stroke="rgba(255,255,255,.14)" />
        <circle cx="24" cy="22" r="5" fill="rgba(255,255,255,.25)" />
        <circle cx="42" cy="22" r="5" fill="rgba(255,255,255,.18)" />
        <circle cx="60" cy="22" r="5" fill="rgba(255,255,255,.12)" />
        <rect x="0" y="44" width="560" height="1" fill="rgba(255,255,255,.1)" />
        <Layout kind={project.layout} grad={`url(#${id}-l)`} accent={accent} />
      </g>
    </svg>
  );
}

function Layout({ kind, grad, accent }) {
  const bar = (x, y, w, o = 0.18, h = 10) => (
    <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={`rgba(255,255,255,${o})`} />
  );
  switch (kind) {
    case "store":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${32 + i * 172} 76)`}>
              <rect width="152" height="150" rx="12" fill="rgba(255,255,255,.05)" />
              <circle cx="76" cy="72" r="38" fill={i === 1 ? grad : "rgba(255,255,255,.1)"} />
              {bar(0, 166, 110, 0.3)}
              {bar(0, 186, 60, 0.15)}
            </g>
          ))}
          <rect x="32" y="300" width="140" height="36" rx="18" fill={grad} />
          {bar(204, 312, 180)}
        </g>
      );
    case "saas":
      return (
        <g>
          {bar(40, 90, 300, 0.45, 22)}
          {bar(40, 126, 220, 0.25, 22)}
          {bar(40, 176, 260, 0.14)}
          <rect x="40" y="214" width="130" height="38" rx="19" fill={grad} />
          <g transform="translate(330 196)">
            <rect width="190" height="140" rx="14" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" />
            <polyline
              points="18,110 58,80 92,94 128,48 172,30"
              fill="none"
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      );
    case "clinic":
      return (
        <g>
          <rect x="32" y="72" width="496" height="120" rx="14" fill="rgba(255,255,255,.05)" />
          {bar(56, 102, 240, 0.4, 18)}
          {bar(56, 134, 180, 0.18)}
          <rect x="400" y="104" width="104" height="54" rx="27" fill={grad} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${32 + i * 128} 216)`}>
              <rect width="112" height="128" rx="12" fill="rgba(255,255,255,.05)" />
              <circle cx="28" cy="32" r="14" fill={i === 0 ? accent : "rgba(255,255,255,.14)"} />
              {bar(14, 64, 80, 0.25)}
              {bar(14, 84, 56, 0.12)}
            </g>
          ))}
        </g>
      );
    default:
      return (
        <g>
          <circle cx="160" cy="210" r="100" fill={grad} opacity="0.9" />
          <circle cx="160" cy="210" r="60" fill="#0B1019" />
          {bar(310, 140, 200, 0.45, 26)}
          {bar(310, 182, 150, 0.22, 14)}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={310 + i * 44}
              y="236"
              width="34"
              height="34"
              rx="8"
              fill={i === 0 ? accent : `rgba(255,255,255,${0.08 + i * 0.03})`}
            />
          ))}
        </g>
      );
  }
}
