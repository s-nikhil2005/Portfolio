"use client";

import * as React from "react";
import gsap from "gsap";

export const CursorGlow = () => {
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX - 200,
        y: e.clientY - 200,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, var(--glow-cyan) 0%, transparent 65%)",
        opacity: 0.15,
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "screen",
        transform: "translate3d(0, 0, 0)",
      }}
    />
  );
};
