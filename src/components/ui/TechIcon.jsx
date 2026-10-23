import brandIcons from "@/data/brand-icons";
import { withBase } from "@/lib/paths";

export const SPRITE = withBase("/icons/brand-sprite.svg");

// Dark brand colours (e.g. Next.js black) would vanish on the dark theme.
export const readableHex = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.32 ? "#F7F8FC" : hex;
};

// Brand mark from the Simple Icons sprite, or a neutral monogram tile when no
// accurate mark is available (we never invent or redraw brand logos).
export default function TechIcon({ icon, name, size = 28, className = "" }) {
  const data = icon ? brandIcons[icon] : null;
  if (!data) {
    return (
      <span className={`tech-icon tech-icon--text ${className}`} style={{ "--size": `${size}px` }} aria-hidden="true">
        {name}
      </span>
    );
  }
  return (
    <svg
      className={`tech-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      style={{ "--brand": readableHex(data.hex) }}
    >
      <use href={`${SPRITE}#${icon}`} />
    </svg>
  );
}

export function getIconData(icon) {
  return icon ? brandIcons[icon] || null : null;
}
