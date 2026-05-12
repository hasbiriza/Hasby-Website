"use client";

import { useEffect } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const smoothX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.25 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.25 });

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [reduceMotion, x, y]);

  if (reduceMotion) {
    return null;
  }

  return (
    <m.div
      aria-hidden
      className="cursor-glow"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 260,
        height: 260,
        borderRadius: "50%",
        pointerEvents: "none",
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 30,
        opacity: 0.75,
        mixBlendMode: "screen",
        background:
          "radial-gradient(circle at center, rgba(148, 192, 245, 0.34) 0%, rgba(110, 168, 255, 0.16) 28%, rgba(8, 8, 8, 0) 70%)",
        filter: "blur(18px)",
      }}
    />
  );
}
