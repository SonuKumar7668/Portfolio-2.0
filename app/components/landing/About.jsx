"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TRAITS = [
  { num: "01", label: "CS Student", sub: "Building while learning" },
  { num: "02", label: "MERN Stack", sub: "Full-stack development" },
  { num: "03", label: "AI Explorer", sub: "Integrations & experiments" },
  { num: "04", label: "Problem Solver", sub: "Real-world solutions" },
];

export default function About() {
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) => ({ ...prev, [e.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (id) => (el) => { refs.current[id] = el; };
  const fadeIn = (id, delay = 0) => ({
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    },
    "data-id": id,
    ref: ref(id),
  });

  return (
    <main id="about" className="bg-[#F6F4EF] min-h-screen">

      {/* ── HERO BAND ── */}
      <section className="relative overflow-hidden bg-[#0E0E0E] pt-32 pb-20 sm:pt-40 sm:pb-28 px-5 sm:px-10 lg:px-20">
        <GrainOverlay />

        {/* Large background label */}
        <span
          className="absolute right-4 sm:right-10 bottom-0 font-black uppercase text-white/[0.03] leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}
        >
          ABOUT
        </span>

        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9F23D] uppercase font-mono mb-5 sm:mb-7">
            02 / About
          </p>
          <h1
            className="text-white font-black uppercase leading-[0.88] mb-8 sm:mb-10"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          >
            About<br />
            <span className="text-[#C9F23D]">Me.</span>
          </h1>

          {/* Trait chips */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {TRAITS.map(({ num, label }) => (
              <span
                key={num}
                className="inline-flex items-center gap-2 border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-white/60"
              >
                <span className="text-[#C9F23D]">{num}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Accent separator */}
      <div className="h-px w-full bg-[#0E0E0E]">
        <div
          className="h-px mx-auto"
          style={{ background: "linear-gradient(to right, #0E0E0E, #C9F23D 40%, #C9F23D 60%, #0E0E0E)", maxWidth: "600px" }}
        />
      </div>

      {/* ── BIO SECTION ── */}
      <section className="px-5 sm:px-10 lg:px-20 py-16 sm:py-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">

          {/* Left: index label + decorative block */}
          <div {...fadeIn("bio-label")} className="flex flex-col gap-6">
            <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#9A9785] uppercase font-mono">
              Who I am
            </p>
            <div className="hidden lg:block w-full border border-[#E2DFD6] p-6">
              <div className="flex flex-col gap-4">
                {TRAITS.map(({ num, label, sub }) => (
                  <div key={num} className="flex items-center gap-4 border-b border-[#E2DFD6] pb-4 last:border-0 last:pb-0">
                    <span className="text-[9px] font-mono text-[#9A9785] w-5 shrink-0">{num}</span>
                    <div>
                      <p className="text-[11px] tracking-widest uppercase font-mono text-[#0E0E0E]">{label}</p>
                      <p className="text-[10px] text-[#9A9785] font-light mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: bio text */}
          <div {...fadeIn("bio-text", 100)}>
            <p className="text-[#333] text-base sm:text-lg leading-[1.85] font-light">
              Hi, I&apos;m{" "}
              <span className="font-semibold text-[#0E0E0E]">Sonu Kumar</span>{" "}
              — a Computer Science student passionate about building efficient,
              user-friendly web applications. I enjoy working with the{" "}
              <span className="font-mono text-sm bg-[#0E0E0E] text-[#C9F23D] px-1.5 py-0.5">MERN stack</span>
              , exploring AI integrations, and solving real-world problems through code.
            </p>
            <p className="text-[#555] text-sm sm:text-base leading-[1.85] font-light mt-5 sm:mt-6">
              My projects range from small tools to full-scale platforms, and I&apos;m
              always looking for ways to improve my skills and take on new challenges.
            </p>

            {/* Inline decorative line */}
            <div className="flex items-center gap-4 mt-8 sm:mt-10">
              <div className="h-px flex-1 bg-[#E2DFD6]" />
              <span className="text-[9px] tracking-[0.4em] text-[#9A9785] uppercase font-mono shrink-0">
                Est. 2026
              </span>
              <div className="h-px w-8 bg-[#C9F23D]" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom breathing room */}
      <div className="h-20 sm:h-32" />
    </main>
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