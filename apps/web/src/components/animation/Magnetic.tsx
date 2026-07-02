"use client";

import * as React from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
}

export const Magnetic = ({ children, range = 45 }: MagneticProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const xTo = gsap.quickTo(container, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(container, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        xTo(distanceX * 0.4);
        yTo(distanceY * 0.4);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range]);

  return (
    <div ref={containerRef} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
};
