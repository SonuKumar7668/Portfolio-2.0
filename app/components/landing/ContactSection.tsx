"use client";
import { useState, useRef } from "react";
import { sendEmail, type ContactFormData } from "../../lib/Mailer";
import { Button, Input, Textarea } from "../../components/primitives";

type Status = "idle" | "sending" | "success" | "error";

const FIELDS: {
  id: keyof ContactFormData;
  label: string;
  type?: string;
  placeholder: string;
  required: boolean;
  span?: boolean;
  textarea?: boolean;
  rows?: number;
}[] = [
  {
    id: "name",
    label: "Name",
    placeholder: "Your name",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    required: true,
  },
  {
    id: "subject",
    label: "Subject",
    placeholder: "What's this about?",
    required: false,
    span: true,
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Tell me about your project, idea, or just say hi.",
    required: true,
    span: true,
    textarea: true,
    rows: 6,
  },
];

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError]   = useState<string | null>(null);
  const formRef             = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name:    fd.get("name")    as string,
      email:   fd.get("email")   as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    };

    const result = await sendEmail(data);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0E0E0E] overflow-hidden px-5 sm:px-10 lg:px-20 py-20 sm:py-32"
    >
      <GrainOverlay />

      {/* Ghost heading */}
      <span
        className="absolute right-4 sm:right-10 bottom-0 font-black uppercase text-white/[0.025] leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
      >
        CONTACT
      </span>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Section header ── */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9F23D] uppercase font-mono mb-5 sm:mb-7">
            05 / Contact
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-10">
            <h2
              className="font-black uppercase text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            >
              Lets build<br />
              <span className="text-[#C9F23D]">something.</span>
            </h2>
            <p className="text-[#555] text-sm sm:text-base font-light leading-relaxed max-w-xs sm:text-right">
              Have a project in mind, or just want to say hi?
              Drop a message and Ill get back to you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* ── Left: contact info ── */}
          <div className="flex flex-col gap-8">
            {[
              {
                label: "Email",
                value: "sonu108rp@gmail.com",
                href: "mailto:sonu108rp@gmail.com",
                icon: "→",
              },
              {
                label: "GitHub",
                value: "SonuKumar7668",
                href: "https://github.com/SonuKumar7668",
                icon: "↗",
              },
              {
                label: "Portfolio",
                value: "sonukumarsingh.tech",
                href: "https://sonukumarsingh.tech/",
                icon: "↗",
              },
            ].map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 border-b border-white/[0.07] pb-6 hover:border-white/20 transition-colors duration-300"
                style={{ textDecoration: "none" }}
              >
                <span className="flex items-center justify-center w-8 h-8 border border-white/10 text-[#C9F23D] text-sm shrink-0 group-hover:border-[#C9F23D] group-hover:bg-[#C9F23D] group-hover:text-[#0E0E0E] transition-all duration-300">
                  {icon}
                </span>
                <div>
                  <p className="text-[9px] tracking-[0.4em] text-[#555] uppercase font-mono mb-1">{label}</p>
                  <p className="text-sm text-white/70 font-mono group-hover:text-white transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/* availability badge */}
            <div className="flex items-center gap-3 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9F23D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9F23D]" />
              </span>
              <p className="text-[9px] tracking-[0.35em] text-[#555] uppercase font-mono">
                Open to opportunities
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div>
            {status === "success" ? (
              <SuccessState onReset={() => setStatus("idle")} />
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {FIELDS.map((field) => (
                  <div
                    key={field.id}
                    className={field.span ? "sm:col-span-2" : "col-span-1"}
                  >
                    <label className="block text-[9px] tracking-[0.4em] text-[#555] uppercase font-mono mb-2">
                      {field.label}
                      {field.required && (
                        <span className="text-[#C9F23D] ml-1">*</span>
                      )}
                    </label>

                    {field.textarea ? (
                      <Textarea
                        name={field.id}
                        rows={field.rows}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white/80 font-mono placeholder-white/20 outline-none resize-none transition-colors duration-200 focus:border-[#C9F23D]/60 focus:bg-white/[0.05]"
                      />
                    ) : (
                      <Input
                        name={field.id}
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white/80 font-mono placeholder-white/20 outline-none transition-colors duration-200 focus:border-[#C9F23D]/60 focus:bg-white/[0.05]"
                      />
                    )}
                  </div>
                ))}

                {/* error */}
                {status === "error" && error && (
                  <div className="sm:col-span-2 flex items-center gap-3 border border-red-900/50 bg-red-900/10 px-4 py-3">
                    <span className="text-red-400 text-xs font-mono">{error}</span>
                  </div>
                )}

                {/* submit */}
                <div className="sm:col-span-2 flex items-center justify-between pt-2">
                  <p className="text-[8px] tracking-[0.3em] text-white/20 uppercase font-mono">
                    * Required fields
                  </p>
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center w-10 h-10 border border-[#C9F23D] text-[#C9F23D] text-base group-hover:bg-[#C9F23D] group-hover:text-[#0E0E0E] disabled:group-hover:bg-transparent transition-all duration-300">
                      {status === "sending" ? (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : "→"}
                    </span>
                    <span className="text-white/60 group-hover:text-white transition-colors duration-200">
                      {status === "sending" ? "Sending…" : "Send message"}
                    </span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col gap-6 border border-white/10 p-8 sm:p-10">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9F23D] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9F23D]" />
        </span>
        <span className="text-[9px] tracking-[0.4em] text-[#C9F23D] uppercase font-mono">Message sent</span>
      </div>
      <h3 className="font-black uppercase text-white leading-[0.9] text-3xl sm:text-4xl">
        Got it.<br />
        <span className="text-[#C9F23D]">Talk soon.</span>
      </h3>
      <p className="text-[#555] text-sm leading-relaxed font-light">
        Your message is in my inbox. Ill get back to you within 24–48 hours.
      </p>
      <button
        onClick={onReset}
        className="self-start inline-flex items-center gap-3 text-[9px] tracking-[0.35em] uppercase font-mono group"
      >
        <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-[#C9F23D] transition-all duration-300" />
        <span className="text-white/30 group-hover:text-white/60 transition-colors duration-200">Send another</span>
      </button>
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