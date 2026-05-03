"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { frameworks, languages, databases } from "../../Data/skillData";
import Image from "next/image";

const CATEGORIES = [
  {
    id: "languages",
    num: "01",
    label: "Languages",
    sub: "The core I write in",
    data: languages,
  },
  {
    id: "frameworks",
    num: "02",
    label: "Frameworks & Libraries",
    sub: "Tools I build with",
    data: frameworks,
  },
  {
    id: "databases",
    num: "03",
    label: "Databases",
    sub: "How I store data",
    data: databases,
  },
];

export default function SkillsPage() {
  const [visible, setVisible] = useState({});
  const [active, setActive] = useState("languages");
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((p) => ({ ...p, [e.target.dataset.id]: true }));
        }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fadeRef = (id, delay = 0) => (el) => {
    refs.current[id] = el;
    if (el) {
      el.dataset.id = id;
      el.style.opacity = visible[id] ? 1 : 0;
      el.style.transform = visible[id] ? "translateY(0)" : "translateY(28px)";
      el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    }
  };

  return (
    <main id="skills" className="bg-[#F6F4EF] min-h-screen">

      {/* ── HERO BAND ── */}
      <section className="relative overflow-hidden bg-[#0E0E0E] pt-32 pb-20 sm:pt-40 sm:pb-28 px-5 sm:px-10 lg:px-20">
        <GrainOverlay />
        <span
          className="absolute right-4 sm:right-10 bottom-0 font-black uppercase text-white/[0.03] leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(4.5rem, 16vw, 13rem)" }}
        >
          SKILLS
        </span>

        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9F23D] uppercase font-mono mb-5 sm:mb-7">
            03 / Skills
          </p>
          <h1
            className="text-white font-black uppercase leading-[0.88] mb-8 sm:mb-10"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          >
            Technical<br />
            <span className="text-[#C9F23D]">Stack.</span>
          </h1>

          {/* category pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CATEGORIES.map(({ num, label, id }) => (
              <button
                key={id}
                onClick={() => {
                  setActive(id);
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 border px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase transition-colors duration-200"
                style={{
                  borderColor: active === id ? "#C9F23D" : "rgba(255,255,255,0.15)",
                  color: active === id ? "#C9F23D" : "rgba(255,255,255,0.55)",
                  backgroundColor: active === id ? "rgba(201,242,61,0.08)" : "transparent",
                }}
              >
                <span className="text-[#C9F23D] opacity-70">{num}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accent rule */}
      <div className="h-px w-full bg-[#0E0E0E]">
        <div
          className="h-px mx-auto"
          style={{
            background:
              "linear-gradient(to right, #0E0E0E, #C9F23D 40%, #C9F23D 60%, #0E0E0E)",
            maxWidth: "600px",
          }}
        />
      </div>

      {/* ── SKILL CATEGORIES ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-10 lg:px-20 py-16 sm:py-24 flex flex-col gap-20 sm:gap-28">
        {CATEGORIES.map(({ id, num, label, sub, data }, ci) => (
          <section key={id} id={id}>
            {/* Section header */}
            <div
              ref={fadeRef(`head-${id}`, 0)}
              className="flex items-end justify-between mb-8 sm:mb-12 border-b border-[#E2DFD6] pb-5"
            >
              <div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#9A9785] uppercase font-mono mb-1">
                  {num} / {sub}
                </p>
                <h2
                  className="font-black uppercase text-[#0E0E0E] leading-[0.9]"
                  style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}
                >
                  {label}
                </h2>
              </div>
              <span className="text-[9px] font-mono text-[#9A9785] shrink-0 pb-1">
                {String(data.length).padStart(2, "0")} items
              </span>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {data.map((skill, i) => (
                <SkillCard
                  key={skill.title}
                  skill={skill}
                  index={i}
                  sectionId={id}
                  visible={visible}
                  refs={refs}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="h-px bg-[#0E0E0E]" />
    </main>
  );
}

function SkillCard({ skill, index, sectionId, visible, refs }) {
  const cardId = `card-${sectionId}-${index}`;
  const delay = index * 80;

  const cardRef = (el) => {
    refs.current[cardId] = el;
    if (el) {
      el.dataset.id = cardId;
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative border border-[#E2DFD6] bg-[#F6F4EF] hover:border-[#0E0E0E] hover:bg-white transition-all duration-300 overflow-hidden"
      style={{
        opacity: visible[cardId] ? 1 : 0,
        transform: visible[cardId] ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.2s, background-color 0.2s`,
      }}
    >
      {/* Lime accent top bar — reveals on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#C9F23D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-5 sm:p-6 flex flex-col gap-4">
        {/* Icon + title row */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 bg-[#0E0E0E]/5 group-hover:bg-[#0E0E0E]/8 transition-colors duration-300">
            <Image
              src={skill.image}
              alt={skill.title}
              width={140}
                height={140}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
              onError={(e) => {
                // fallback: show first letter if image missing
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML = `<span style="font-family:monospace;font-size:13px;font-weight:700;color:#0E0E0E">${skill.title[0]}</span>`;
              }}
            />
          </div>
          <h3 className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#0E0E0E] font-bold">
            {skill.title}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E2DFD6] group-hover:bg-[#C9F23D]/40 transition-colors duration-300" />

        {/* Description */}
        <p className="text-[#666] text-xs sm:text-sm font-light leading-relaxed">
          {skill.desc}
        </p>
      </div>

      {/* Bottom-right index number */}
      <span className="absolute bottom-3 right-4 text-[9px] font-mono text-[#D8D5CE] group-hover:text-[#C9F23D]/50 transition-colors duration-300">
        {String(index + 1).padStart(2, "0")}
      </span>
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