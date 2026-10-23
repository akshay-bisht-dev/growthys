import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

export default function Button({
  href,
  children,
  variant = "primary",
  size,
  magnetic = false,
  arrow = true,
  className = "",
  ...rest
}) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""} ${className}`;
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowUpRight size={18} strokeWidth={2} />
        </span>
      )}
    </>
  );
  const el = href ? (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
