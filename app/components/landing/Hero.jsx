"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
// import SocialMedia from "../components/SocialMedia";
import Link from "next/link";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;
        const progress = Math.min(scrollY / (windowH * 1.4), 1);
        setScrollProgress(progress);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const darkPanelRatio = Math.max(0, 1 - scrollProgress);
  const darkTextOpacity = Math.max(0, 1 - scrollProgress * 2.4);
  const belowOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.5) * 3));
  const belowTranslateY = Math.max(0, (1 - scrollProgress) * 24);

  return (
    <div id="home" className="relative">
      {/* ── STICKY HERO ── */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100svh" }}>

        {/* DESKTOP: left-right split */}
        <div className="hidden lg:flex h-full">
          <div
            className="relative flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ width: `${darkPanelRatio * 60}%`, backgroundColor: "#0E0E0E" }}
          >
            <GrainOverlay />
            <AccentLine direction="vertical" />
            <DarkContent opacity={darkTextOpacity} layout="desktop" />
          </div>
          <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#F6F4EF" }}>
            <ProfileCard isDesktop scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* TABLET: left-right split, narrower text */}
        <div className="hidden md:flex lg:hidden h-full">
          <div
            className="relative flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ width: `${darkPanelRatio * 55}%`, backgroundColor: "#0E0E0E" }}
          >
            <GrainOverlay />
            <AccentLine direction="vertical" />
            <DarkContent opacity={darkTextOpacity} layout="tablet" />
          </div>
          <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#F6F4EF" }}>
            <ProfileCard isDesktop={false} scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* MOBILE: top-bottom stack */}
        <div className="flex md:hidden flex-col h-full">
          <div
            className="relative flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ height: `${darkPanelRatio * 52}svh`, backgroundColor: "#0E0E0E" }}
          >
            <GrainOverlay />
            <AccentLine direction="horizontal" />
            <DarkContent opacity={darkTextOpacity} layout="mobile" />
          </div>
          <div className="flex-1 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#F6F4EF" }}>
            <ProfileCard isDesktop={false} scrollProgress={scrollProgress} />
          </div>
        </div>
      </div>

      {/* Scroll spacer */}
      <div style={{ height: "140svh" }} />

{/* ── BELOW-FOLD ── */}
<section
  className="relative bg-[#F6F4EF] px-5 sm:px-10 lg:px-20 pt-14 sm:pt-20 pb-28 sm:pb-36"
  style={{ opacity: belowOpacity, transform: `translateY(${belowTranslateY}px)` }}
>
  <div className="max-w-5xl mx-auto">

    {/* ── TOP ROW: label + name card ── */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 border-b border-[#E2DFD6] pb-8 sm:pb-10">
      <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#9A9785] uppercase font-mono">
        01 / Overview
      </p>
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9F23D]" />
        <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#9A9785] uppercase font-mono">
          CS Student · MERN Stack · Open to work
        </p>
      </div>
    </div>

    {/* ── HERO TEXT + BIO ── */}
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 mb-14 sm:mb-20">
      <div>
        <h2
          className="font-black uppercase text-[#0E0E0E] leading-[0.86] mb-6 sm:mb-8"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)" }}
        >
          Building<br />
          <span className="text-[#C9F23D]">real-world</span><br />
          solutions.
        </h2>
        <p className="text-[#555] leading-[1.85] text-sm sm:text-base font-light max-w-sm mb-7 sm:mb-9">
          Im <span className="text-[#0E0E0E] font-medium">Sonu Kumar</span> — a CS student
          turning ideas into efficient, user-friendly web apps. I build with the
          <span className="font-mono text-[11px] bg-[#0E0E0E] text-[#C9F23D] px-1.5 py-0.5 mx-1">MERN stack</span>,
          explore AI integrations, and care deeply about shipping things that actually work.
        </p>
        <button
          onClick={() => {
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="inline-flex items-center gap-3 text-[9px] sm:text-[10px] tracking-widest uppercase text-[#0E0E0E] group font-mono bg-transparent border-0 p-0 cursor-pointer"
        >
          <span className="w-7 sm:w-9 h-px bg-[#C9F23D] group-hover:w-14 transition-all duration-500" />
          Full story
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 content-start">
        {[
          { val: "6+",  label: "Projects shipped",    sub: "From tools to platforms" },
          { val: "9+",  label: "Technologies",         sub: "Across the full stack" },
          { val: "3+",  label: "Languages",            sub: "JS · Java · C++" },
          { val: "∞",   label: "Problems to solve",    sub: "Always learning" },
        ].map(({ val, label, sub }) => (
          <div
            key={label}
            className="group border border-[#E2DFD6] hover:border-[#0E0E0E] bg-[#F6F4EF] hover:bg-white p-4 sm:p-5 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-[#C9F23D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <p className="font-black text-[#0E0E0E] leading-none mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
              {val}
            </p>
            <p className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-[#0E0E0E] mb-1">{label}</p>
            <p className="text-[9px] sm:text-[10px] font-light text-[#9A9785]">{sub}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── SKILL BARS ── */}
    <div className="mb-14 sm:mb-20">
      <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#9A9785] uppercase font-mono mb-6 sm:mb-8">
        Core stack
      </p>
      <div className="flex flex-col">
        {[
          { label: "JavaScript / TypeScript", level: 90, tag: "Primary" },
          { label: "React / Next.js",          level: 85, tag: "Frontend" },
          { label: "Node.js / Express.js",     level: 78, tag: "Backend" },
          { label: "MongoDB / MySQL",           level: 72, tag: "Database" },
          { label: "Java",                      level: 70, tag: "OOP · DSA" },
          { label: "C++",                       level: 55, tag: "Systems" },
        ].map((skill, i) => (
          <div key={skill.label} className="group py-3 sm:py-4 border-b border-[#E2DFD6] flex items-center gap-3 sm:gap-5 hover:bg-white/60 px-2 -mx-2 transition-colors duration-200">
            <span className="text-[8px] sm:text-[9px] font-mono text-[#D8D5CE] group-hover:text-[#C9F23D] transition-colors duration-200 w-4 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs text-[#0E0E0E] uppercase tracking-widest font-mono flex-1 leading-tight">
              {skill.label}
            </span>
            <span className="hidden sm:block text-[8px] tracking-widest uppercase font-mono text-[#9A9785] w-16 text-right shrink-0">
              {skill.tag}
            </span>
            <div className="w-16 sm:w-24 h-px bg-[#E2DFD6] relative shrink-0">
              <div
                className="absolute left-0 top-0 h-px bg-[#C9F23D] transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-[#9A9785] shrink-0 w-7 text-right">
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* ── BOTTOM CTA ROW ── */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-0 pt-6 border-t border-[#E2DFD6]">
      <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#9A9785] uppercase font-mono">
        Explore the full picture
      </p>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {[
          { section: "projects", label: "View projects" },
          { section: "skills",   label: "All skills" },
          { section: "about",    label: "About me" },
        ].map(({ section, label }) => (
          <button
            key={section}
            onClick={() => {
              const el = document.getElementById(section);
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 68;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="group inline-flex items-center gap-2.5 sm:gap-3 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-mono bg-transparent border-0 p-0 cursor-pointer"
          >
            <span className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 border border-[#C9F23D] text-[#0E0E0E] group-hover:bg-[#C9F23D] transition-colors duration-300 text-xs">
              →
            </span>
            <span className="text-[#555] group-hover:text-[#0E0E0E] transition-colors duration-200">{label}</span>
          </button>
        ))}
      </div>
    </div>

  </div>
</section>
    </div>
  );
}

function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.045,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "120px 120px",
      }}
    />
  );
}

function AccentLine({ direction }) {
  if (direction === "vertical") {
    return (
      <div
        className="absolute right-0 top-0 h-full w-px"
        style={{ background: "linear-gradient(to bottom, transparent, #C9F23D 35%, #C9F23D 65%, transparent)", opacity: 0.45 }}
      />
    );
  }
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-px"
      style={{ background: "linear-gradient(to right, transparent, #C9F23D 35%, #C9F23D 65%, transparent)", opacity: 0.45 }}
    />
  );
}

function DarkContent({ opacity, layout }) {
  const isMobile = layout === "mobile";
  const isTablet = layout === "tablet";

  const headingSize = isMobile
    ? "text-[clamp(2.2rem,11vw,3.8rem)]"
    : isTablet
    ? "text-[clamp(1.8rem,4.5vw,3.8rem)]"
    : "text-[clamp(2rem,4.2vw,5.2rem)]";

  return (
    <div
      className={`relative z-10 w-full ${isMobile ? "flex flex-col items-center text-center px-6 py-4" : "flex flex-col items-start text-left px-8 xl:px-12"}`}
      style={{ opacity, transition: "opacity 0.06s" }}
    >
      <p className="text-[8px] sm:text-[9px] tracking-[0.45em] text-[#C9F23D] uppercase font-mono mb-3 sm:mb-5">
        Portfolio · 2025
      </p>

      <h1 className={`text-white font-black uppercase leading-[0.85] ${isMobile ? "text-center" : ""}`}>
        <span className={`block ${headingSize}`}>WEB</span>
        <span className={`block ${headingSize}`}>DEV</span>
        <span className={`block text-[#C9F23D] ${headingSize}`}>ELOPER</span>
      </h1>

      <p className={`mt-3 sm:mt-5 text-[#777] text-[11px] sm:text-xs font-light leading-relaxed ${isMobile ? "max-w-[220px]" : "max-w-[180px] xl:max-w-[220px]"}`}>
        Learning, building, and eager to solve real-world problems.
      </p>

      {/* <Link
        href="#about"
        className="inline-flex items-center mt-5 sm:mt-7 gap-3 text-[9px] sm:text-[10px] tracking-widest uppercase text-[#C9F23D] group font-mono"
      >
        <span className="w-6 sm:w-8 h-px bg-[#C9F23D] group-hover:w-12 transition-all duration-300" />
        Know more
      </Link> */}
    </div>
  );
}

function ProfileCard({ isDesktop, scrollProgress }) {
  const spin = scrollProgress * 160;
  const imgSize = isDesktop
    ? "clamp(110px, 13vw, 190px)"
    : "clamp(80px, 22vw, 130px)";

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-5 px-4">
      <div className="relative" style={{ width: imgSize, height: imgSize }}>
        <svg
          className="absolute"
          style={{
            inset: "-10px",
            width: "calc(100% + 20px)",
            height: "calc(100% + 20px)",
            transform: `rotate(${spin}deg)`,
            opacity: 0.3,
          }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="47" fill="none" stroke="#C9F23D" strokeWidth="0.8" strokeDasharray="5 7" />
        </svg>
<Image
  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
  src="/profile.jpg"
  alt="Sonu Kumar"
  width={140}
  height={140}
  priority
/>
      </div>

      <div className="text-center">
        <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#9A9785] uppercase font-mono">
          Sonu Kumar
        </p>
        <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#555] uppercase font-light mt-0.5">
          Full Stack Developer
        </p>
      </div>

      {/* <SocialMedia /> */}
    </div>
  );
}