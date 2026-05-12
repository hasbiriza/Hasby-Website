"use client";

import Link from "next/link";
import { useSpring, m, useReducedMotion } from "framer-motion";

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticLink({
  href,
  children,
  className,
  strength = 20,
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 20, mass: 0.35 });
  const y = useSpring(0, { stiffness: 260, damping: 20, mass: 0.35 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set((offsetX / rect.width) * strength);
    y.set((offsetY / rect.height) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      style={reduceMotion ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </m.div>
  );
}
