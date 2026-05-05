"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "#home",     label: "Home",     section: "home" },
  { href: "#about",    label: "About",    section: "about" },
  { href: "#skills",   label: "Skills",   section: "skills" },
  { href: "#projects", label: "Projects", section: "projects" },
  { href: "#contact",  label: "Contact",  section: "contact" },
];

const LIME = "#C9F23D";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrollY, setScrollY]         = useState(0);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActive]    = useState("home");
  const ticking                        = useRef(false);

  /* ── resize: close drawer on desktop ── */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const h  = (e) => { if (e.matches) setMenuOpen(false); };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  /* ── scroll position (for header bg) ── */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section tracker (IntersectionObserver) ── */
  useEffect(() => {
    if (!isHome) return;

    const ratios = {};
    const observers = NAV_LINKS.map(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[section] = entry.intersectionRatio;
          // pick whichever section has most pixels visible
          const best = Object.entries(ratios)
            .sort(([, a], [, b]) => b - a)[0];
          if (best && best[1] > 0.05) setActive(best[0]);
        },
        { threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.7, 1] }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [isHome]);

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── smooth scroll handler ── */
  const handleNavClick = (e, link) => {
    setMenuOpen(false);
    if (!isHome) return; // let Next.js navigate normally
    e.preventDefault();
    const target = document.getElementById(link.section);
    if (!target) return;
    const offset = 68; // fixed header height
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  /* ── header appearance ── */
  const windowH       = typeof window !== "undefined" ? window.innerHeight : 800;
  const scrollProgress = Math.min(scrollY / (windowH * 1.4), 1);
  const isAtTop        = scrollProgress < 0.04;
  const isTransition   = isHome && scrollProgress >= 0.04 && scrollProgress < 0.5;

  let bgAlpha = 1;
  if (isHome) {
    if (isAtTop)       bgAlpha = 0;
    else if (isTransition)
      bgAlpha = Math.min((scrollProgress - 0.04) / 0.15, 1) * 0.97;
  }

  const headerBg  = `rgba(246,244,239,${bgAlpha})`;
  const useBlur   = bgAlpha > 0.1 && bgAlpha < 1;
  const onDark    = isHome && scrollProgress < 0.12;
  const logoColor = onDark ? "#FFFFFF" : "#0E0E0E";
  const navColor  = onDark ? "rgba(255,255,255,0.6)" : "#555555";
  const burgerBg  = onDark ? "#FFFFFF" : "#0E0E0E";

  return (
    <>
      {/* ── HEADER BAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: headerBg,
          backdropFilter:       useBlur ? "blur(10px)" : "none",
          WebkitBackdropFilter: useBlur ? "blur(10px)" : "none",
          borderBottom: bgAlpha > 0.5 ? "0.5px solid rgba(0,0,0,0.06)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-[18px] sm:py-5 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={(e) => handleNavClick(e, { section: "home" })}
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold bg-transparent border-0 p-0 cursor-pointer"
            style={{ color: logoColor, transition: "color 0.3s ease" }}
          >
            SONU KUMAR
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            {NAV_LINKS.map((link) => {
              const active = isHome && activeSection === link.section;
              return (
                <a
                  key={link.section}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative px-4 py-2 text-[10px] tracking-[0.3em] uppercase font-mono"
                  style={{ color: active ? LIME : navColor, transition: "color 0.25s ease", textDecoration: "none" }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = onDark ? "#fff" : "#0E0E0E"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = navColor; }}
                >
                  {/* active underline */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px transition-transform duration-300 origin-left"
                    style={{
                      backgroundColor: LIME,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Burger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[
              menuOpen ? "rotate(45deg) translate(3.5px, 3.5px)"  : "none",
              null,
              menuOpen ? "rotate(-45deg) translate(3.5px, -3.5px)" : "none",
            ].map((transform, i) =>
              i === 1 ? (
                <span
                  key={i}
                  className="block h-px w-5 sm:w-6 transition-all duration-300"
                  style={{ backgroundColor: burgerBg, opacity: menuOpen ? 0 : 1 }}
                />
              ) : (
                <span
                  key={i}
                  className="block h-px w-5 sm:w-6 origin-center transition-all duration-300"
                  style={{ backgroundColor: burgerBg, transform }}
                />
              )
            )}
          </button>
        </div>
      </header>

      {/* ── OVERLAY ── */}
      <div
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          backgroundColor: "rgba(14,14,14,0.5)",
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition:    "opacity 0.3s ease",
        }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── DRAWER ── */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col"
        style={{
          width: "min(280px, 80vw)",
          backgroundColor: "#0E0E0E",
          transform:  menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* drawer header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
          <span className="text-[9px] tracking-[0.45em] text-[#9A9785] uppercase font-mono">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white/40 hover:text-white transition-colors p-1"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* drawer links */}
        <nav className="flex flex-col flex-1 px-7 pt-8">
          {NAV_LINKS.map((link, i) => {
            const active = isHome && activeSection === link.section;
            return (
              <a
                key={link.section}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="flex items-center gap-4 py-4 border-b border-white/[0.07]"
                style={{ textDecoration: "none" }}
              >
                <span className="text-[9px] font-mono" style={{ color: active ? LIME : "#444" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-sm tracking-[0.2em] uppercase font-mono transition-colors duration-200"
                  style={{ color: active ? LIME : "#CCCCCC" }}
                >
                  {link.label}
                </span>
                {/* active dot */}
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ backgroundColor: active ? LIME : "transparent", border: active ? "none" : "1px solid #333" }}
                />
              </a>
            );
          })}
        </nav>

        {/* drawer footer */}
        <div className="px-7 py-6 border-t border-white/10">
          <p className="text-[8px] tracking-[0.4em] text-[#444] uppercase font-mono">Portfolio · 2025</p>
        </div>
      </aside>
    </>
  );
}