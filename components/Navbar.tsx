"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const offsets = sections.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: el.getBoundingClientRect().top };
      });

      const current = offsets.filter((o) => o.top <= 120).pop();
      setActive(current?.id ?? "");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const barColor = scrolled || menuOpen ? "rgba(0,0,0,0.7)" : "#fff";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled && !menuOpen ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-[840px] mx-auto px-8 py-3 md:py-5 flex items-center justify-between">
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-sm font-medium tracking-tight hover:opacity-60 transition-opacity"
            style={{ color: scrolled ? "#1d1d1f" : "#ffffff", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s ease" }}
          >
            Alexander Dudar
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm transition-colors"
                style={{
                  color: scrolled
                    ? active === id ? "#1d1d1f" : "#6e6e73"
                    : active === id ? "#ffffff" : "rgba(255,255,255,0.65)",
                  fontWeight: active === id ? 500 : 400,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "#1d1d1f" : "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled
                  ? active === id ? "#1d1d1f" : "#6e6e73"
                  : active === id ? "#ffffff" : "rgba(255,255,255,0.65)"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-5 h-px transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
              style={{ background: barColor }}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              style={{ background: barColor }}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
              style={{ background: barColor }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div
        className="md:hidden fixed inset-0 z-40"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: menuOpen ? "opacity 0.22s ease" : "opacity 0.32s cubic-bezier(0.4,0,1,1)",
        }}
      >
        {/* Frosted dark bg */}
        <div
          className="absolute inset-0"
          style={{
            background: "#ffffff",
          }}
        />

        {/* Links */}
        <div
          className="relative flex flex-col"
          style={{ paddingTop: "6rem", paddingLeft: "2.5rem", gap: "0.125rem" }}
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: active === id ? "#000000" : "rgba(0,0,0,0.58)",
                fontSize: "1.75rem",
                fontWeight: 600,
                lineHeight: 1.25,
                padding: "0.5rem 0",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
