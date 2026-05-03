"use client";
import { useEffect, useRef, useState } from "react";
import { ProjectInfo } from "@/app/Data/ProjectData";

const ALL_SKILLS = ["All", ...Array.from(new Set(ProjectInfo.flatMap((p) => p.skills)))];

const FEATURED = ["Digital Mentorship & Guidance Platform", "Skilled Trades", "Wanderlust"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((p) => ({ ...p, [e.target.dataset.id]: true }));
        }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    if (el) { el.dataset.id = id; refs.current[id] = el; }
  };

  const filtered = filter === "All"
    ? ProjectInfo
    : ProjectInfo.filter((p) => p.skills.includes(filter));

  const featured = filtered.filter((p) => FEATURED.includes(p.title));
  const rest = filtered.filter((p) => !FEATURED.includes(p.title));

  return (
    <main id="projects" className="bg-[#F6F4EF] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0E0E0E] pt-32 pb-20 sm:pt-40 sm:pb-28 px-5 sm:px-10 lg:px-20">
        <GrainOverlay />
        <span
          className="absolute right-4 sm:right-10 bottom-0 font-black uppercase leading-none select-none pointer-events-none text-white/[0.03]"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          WORK
        </span>

        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9F23D] uppercase font-mono mb-5 sm:mb-7">
            04 / Projects
          </p>
          <h1
            className="text-white font-black uppercase leading-[0.88] mb-8 sm:mb-10"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          >
            Selected<br />
            <span className="text-[#C9F23D]">Work.</span>
          </h1>

          {/* stat row */}
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              { val: ProjectInfo.length, label: "Projects" },
              { val: ALL_SKILLS.length - 1, label: "Technologies" },
              { val: featured.length || FEATURED.length, label: "Featured" },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-black text-white text-2xl sm:text-3xl font-mono">{String(val).padStart(2, "0")}</span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accent rule */}
      <div className="h-px bg-[#0E0E0E]">
        <div className="h-px mx-auto" style={{ background: "linear-gradient(to right, #0E0E0E, #C9F23D 40%, #C9F23D 60%, #0E0E0E)", maxWidth: "600px" }} />
      </div>

      {/* ── FILTER BAR ── */}
      <section className="sticky top-[57px] sm:top-[65px] z-30 bg-[#F6F4EF]/95 backdrop-blur-sm border-b border-[#E2DFD6]">
        <div className="max-w-5xl mx-auto px-5 sm:px-10 lg:px-20 py-3 sm:py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[8px] tracking-[0.4em] text-[#9A9785] uppercase font-mono shrink-0 mr-2">Filter</span>
          {ALL_SKILLS.map((skill) => (
            <button
              key={skill}
              onClick={() => setFilter(skill)}
              className="shrink-0 px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] tracking-widest uppercase font-mono border transition-all duration-200"
              style={{
                borderColor: filter === skill ? "#0E0E0E" : "#E2DFD6",
                backgroundColor: filter === skill ? "#0E0E0E" : "transparent",
                color: filter === skill ? "#C9F23D" : "#9A9785",
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 sm:px-10 lg:px-20 py-14 sm:py-20 flex flex-col gap-16 sm:gap-24">

        {/* ── FEATURED ── */}
        {featured.length > 0 && (
          <div>
            <SectionLabel num="—" label="Featured" />
            <div className="flex flex-col gap-5 sm:gap-6">
              {featured.map((project, i) => (
                <FeaturedCard key={project.title} project={project} index={i} setRef={setRef} visible={visible} />
              ))}
            </div>
          </div>
        )}

        {/* ── REST ── */}
        {rest.length > 0 && (
          <div>
            <SectionLabel num="—" label="All projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {rest.map((project, i) => (
                <SmallCard key={project.title} project={project} index={i} setRef={setRef} visible={visible} featured={featured} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#9A9785]">No projects match this filter.</p>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0E0E0E] relative overflow-hidden px-5 sm:px-10 lg:px-20 py-16 sm:py-24">
        <GrainOverlay />
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9F23D] uppercase font-mono mb-3">Get in touch</p>
            <h2 className="font-black uppercase text-white leading-[0.9]" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}>
              Lets build<br />something.
            </h2>
          </div>
          <a
            href="mailto:sonukumar@example.com"
            className="group inline-flex items-center gap-4 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-mono shrink-0"
          >
            <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 border border-[#C9F23D] text-[#C9F23D] text-lg group-hover:bg-[#C9F23D] group-hover:text-[#0E0E0E] transition-all duration-300">→</span>
            <span className="text-white/60 group-hover:text-white transition-colors duration-300">Say Hello</span>
          </a>
        </div>
      </section>
      <div className="h-px bg-[#0E0E0E]" />
    </main>
  );
}

/* ── Featured card — wide, prominent ── */
function FeaturedCard({ project, index, setRef, visible }) {
  const id = `feat-${index}`;
  return (
    <div
      ref={setRef(id)}
      className="group relative border border-[#E2DFD6] hover:border-[#0E0E0E] bg-[#F6F4EF] hover:bg-white overflow-hidden transition-all duration-300"
      style={{
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms, border-color 0.2s, background-color 0.2s`,
      }}
    >
      {/* lime top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C9F23D] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-0">
        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-5 sm:gap-6">
          {/* Featured badge + index */}
          <div className="flex items-center gap-3">
            <span className="inline-block px-2.5 py-1 text-[8px] tracking-widest uppercase font-mono border border-[#C9F23D] text-[#C9F23D]">
              Featured
            </span>
            <span className="text-[9px] font-mono text-[#D8D5CE]">{String(index + 1).padStart(2, "0")}</span>
          </div>

          {/* Title */}
          <h2
            className="font-black uppercase text-[#0E0E0E] leading-[0.9]"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-[#555] text-sm sm:text-base leading-relaxed font-light max-w-lg">
            {project.description}
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <span key={s} className="px-2.5 py-1 text-[8px] sm:text-[9px] tracking-widest uppercase font-mono border border-[#E2DFD6] text-[#777]">
                {s}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 mt-1">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[10px] tracking-widest uppercase font-mono text-[#0E0E0E] group/link"
            >
              <span className="w-6 h-px bg-[#C9F23D] group-hover/link:w-10 transition-all duration-300" />
              Live site
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-mono text-[#9A9785] hover:text-[#0E0E0E] transition-colors duration-200"
            >
              <GithubIcon />
              Source
            </a>
          </div>
        </div>

        {/* Right accent column */}
        <div className="hidden sm:flex flex-col items-center justify-between py-8 px-6 border-l border-[#E2DFD6] group-hover:border-[#C9F23D]/30 transition-colors duration-300 gap-6">
          <span className="text-[8px] tracking-[0.5em] text-[#D8D5CE] uppercase font-mono [writing-mode:vertical-rl]">
            {project.title}
          </span>
          <div className="w-px flex-1 bg-[#E2DFD6] group-hover:bg-[#C9F23D]/30 transition-colors duration-300" />
          <span className="text-[8px] tracking-widest text-[#C9F23D] font-mono">↗</span>
        </div>
      </div>
    </div>
  );
}

/* ── Small card — grid of 2 ── */
function SmallCard({ project, index, setRef, visible, featured }) {
  const id = `small-${index}`;
  const delay = index * 80;
  return (
    <div
      ref={setRef(id)}
      className="group relative border border-[#E2DFD6] hover:border-[#0E0E0E] bg-[#F6F4EF] hover:bg-white overflow-hidden transition-all duration-300 flex flex-col"
      style={{
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.2s, background-color 0.2s`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[#C9F23D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
        {/* index */}
        <span className="text-[9px] font-mono text-[#D8D5CE]">
          {String(featured.length + index + 1).padStart(2, "0")}
        </span>

        <h3 className="font-black uppercase text-[#0E0E0E] leading-[0.9] text-xl sm:text-2xl">
          {project.title}
        </h3>

        <p className="text-[#666] text-xs sm:text-sm leading-relaxed font-light flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((s) => (
            <span key={s} className="px-2 py-0.5 text-[8px] tracking-widest uppercase font-mono border border-[#E2DFD6] text-[#888]">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 pt-1 border-t border-[#E2DFD6]">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[9px] tracking-widest uppercase font-mono text-[#0E0E0E] group/link"
          >
            <span className="w-5 h-px bg-[#C9F23D] group-hover/link:w-8 transition-all duration-300" />
            Live
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[9px] tracking-widest uppercase font-mono text-[#9A9785] hover:text-[#0E0E0E] transition-colors duration-200"
          >
            <GithubIcon size={11} />
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-4 mb-6 sm:mb-8">
      <span className="text-[9px] font-mono text-[#9A9785]">{num}</span>
      <span className="text-[9px] tracking-[0.4em] text-[#9A9785] uppercase font-mono">{label}</span>
      <div className="flex-1 h-px bg-[#E2DFD6]" />
    </div>
  );
}

function GithubIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
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