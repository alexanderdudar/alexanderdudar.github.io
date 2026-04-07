"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ShaderAnimation = dynamic(
  () => import("@/components/ui/shader-animation").then((m) => m.ShaderAnimation),
  { ssr: false, loading: () => <div className="w-full h-full bg-black" /> }
);

export function Hero() {
  const [visible, setVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setHintVisible(true), 3000);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-black" style={{ height: "100dvh" }}>
      {/* Shader fills entire hero */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <ShaderAnimation />
      </div>

      {/* Blur overlay */}
      <div className="absolute inset-0" style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }} />

      {/* Name */}
      <div className="relative z-10 text-center pointer-events-none select-none">
        <h1
          className="text-[clamp(3rem,8vw,7rem)] font-semibold tracking-tight leading-none text-white"
          style={{ letterSpacing: "-0.03em" }}
        >
          Alexander Dudar
        </h1>
      </div>

      {/* Scroll hint — 3 dots wave */}
      <div
        className="absolute bottom-10 left-0 right-0 flex justify-center z-10 transition-opacity duration-700"
        style={{ opacity: hintVisible && !scrolled ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          {[0, 0.1, 0.2].map((delay, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-white"
              style={{ animation: `dotPulse 2s ease-in-out infinite`, animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 35%, 100% { opacity: 0.15; }
          15% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
