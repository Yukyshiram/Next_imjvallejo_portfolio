import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DockProps {
  children: React.ReactNode;
  direction?: "left" | "middle" | "right";
  className?: string;
}

export function Dock({ 
  children, 
  direction = "middle",
  className = "" 
}: DockProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-white/20 bg-black/10 p-2 backdrop-blur-md ${className}`}
      style={{
        alignItems: "center",
        justifyContent: direction === "middle" ? "center" : direction === "left" ? "flex-start" : "flex-end"
      }}
    >
      {children}
    </div>
  );
}

interface DockIconProps {
  children: React.ReactNode;
}

export function DockIcon({ children }: DockIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
} 