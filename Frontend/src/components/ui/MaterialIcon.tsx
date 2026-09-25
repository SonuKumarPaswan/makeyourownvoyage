import React from "react";

export interface MaterialIconProps {
  name: string;
  className?: string;
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  size?: number | string;
  style?: React.CSSProperties;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  className = "",
  fill = false,
  weight = 400,
  size,
  style = {},
}) => {
  const customStyle: React.CSSProperties = {
    fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
    fontSize: typeof size === "number" ? `${size}px` : size,
    lineHeight: 1,
    ...style,
  };

  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center shrink-0 align-middle ${className}`}
      style={customStyle}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

export default MaterialIcon;
