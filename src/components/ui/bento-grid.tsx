import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className = "" }: BentoGridProps) => {
  return (
    <div className={`grid gap-4 ${className}`}>
      {children}
    </div>
  );
}; 