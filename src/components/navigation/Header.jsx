"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { mainNav } from "@/data/navigation";
import services from "@/data/services";
import { getLenis } from "@/lib/lenis";

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuButton = useRef(null);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const openedByHover = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        dropdownRef.current?.querySelector("button")?.focus();
      }
    };
    const onClick = (e) => !dropdownRef.current?.contains(e.target) && setDropdownOpen(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [dropdownOpen]);

  // Hover opens the menu. A click that lands while (or right after) hover
  // opened it must not toggle it shut, so hover-opened state lives in a ref
  // that is immune to stale closures.
  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    openedByHover.current = true;
    setDropdownOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      openedByHover.current = false;
      setDropdownOpen(false);
    }, 160);
  };
  const toggleDropdown = () => {
    if (openedByHover.current) {
      openedByHover.current = false;
      setDropdownOpen(true);
      return;
    }
    setDropdownOpen((v) => !v);
  };

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -6, scale: 0.98 },
      };

  return (
    <header className={`site-header${scrolled || menuOpen ? " is-scrolled" : ""}`}>
      <div className="site-header__inner container">
        <Logo id="header-logo" onClick={() => setMenuOpen(false)} />

        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              if (item.hasDropdown) {
                return (
                  <li
                    key={item.href}
                    className="nav__item nav__item--dropdown"
                    ref={dropdownRef}
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={`nav__link${active ? " is-active" : ""}`}
                      aria-expanded={dropdownOpen}
                      aria-controls="services-menu"
                      onClick={toggleDropdown}
                    >
                      {item.label}
                      <ChevronDown size={14} className="nav__chevron" aria-hidden="true" />
                      {active && <ActiveDot />}
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          id="services-menu"
                          className="dropdown"
                          {...panelMotion}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ul className="dropdown__grid">
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  className="dropdown__link"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  <span className="dropdown__icon">
                                    <Icon name={s.icon} size={18} />
                                  </span>
                                  <span>
                                    <span className="dropdown__title">{s.title}</span>
                                    <span className="dropdown__tags">{s.tags.slice(0, 3).join(" · ")}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link href="/services" className="dropdown__all" onClick={() => setDropdownOpen(false)}>
                            View all services <ArrowUpRight size={16} aria-hidden="true" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }
              return (
                <li key={item.href} className="nav__item">
                  <Link
                    href={item.href}
                    className={`nav__link${active ? " is-active" : ""}`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                    {active && <ActiveDot />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Link href="/contact" className="btn btn--primary btn--sm site-header__cta">
            <span className="btn__label">Let&apos;s Talk</span>
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              aria-label="Mobile"
              className="mobile-menu__nav container"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.05 } } }}
            >
              {mainNav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    href={item.href}
                    className={`mobile-menu__link${isActive(pathname, item.href) ? " is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                    autoFocus={item.href === "/"}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mobile-menu__services">
                <p className="eyebrow">Services</p>
                <ul>
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} onClick={() => setMenuOpen(false)}>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <Link href="/contact" className="btn btn--primary" onClick={() => setMenuOpen(false)}>
                <span className="btn__label">Let&apos;s Talk</span>
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ActiveDot() {
  return (
    <motion.span
      layoutId="nav-active"
      className="nav__indicator"
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      aria-hidden="true"
    />
  );
}
