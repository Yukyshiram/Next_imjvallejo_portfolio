interface GridPatternProps {
  width?: number;
  height?: number;
  className?: string;
}

export const GridPattern = ({
  width = 100,
  height = 100,
  className = "",
}: GridPatternProps) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: `${width}px ${height}px`,
      }}
    />
  );
}; 