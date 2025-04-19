import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedGradientText = ({
  children,
  className = "",
}: AnimatedGradientTextProps) => {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[200%_auto] bg-clip-text text-transparent animate-gradient ${className}`}
    >
      {children}
    </span>
  );
}; 