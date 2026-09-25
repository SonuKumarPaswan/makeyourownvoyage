import React from "react";

export interface FlipTextProps {
  text: string;
  className?: string;
  flippedClassName?: string;
}

export const FlipText: React.FC<FlipTextProps> = ({
  text,
  className = "",
  flippedClassName = "",
}) => {
  return (
    <span className="relative inline-flex flex-col overflow-hidden h-[1.35em] leading-[1.35em] select-none align-middle pointer-events-none">
      <span
        className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full ${className}`}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full ${flippedClassName || className}`}
      >
        {text}
      </span>
    </span>
  );
};

export default FlipText;
