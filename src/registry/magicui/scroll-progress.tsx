import { useScroll, motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = "" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className={`fixed left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 ${className}`}
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </>
  );
} 