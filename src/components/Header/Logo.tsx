interface LogoProps {
  /** rendered size in px (square); defaults to the header mark size */
  size?: number;
  className?: string;
}

/**
 * panlabs brand mark (#16). A geometric, on-brand vector: the blue→violet
 * brand gradient on a rounded square, with a terminal prompt glyph (`>_`) for
 * the "build / automate" lab identity. Inline SVG so it stays crisp at any DPI
 * and needs no raster fallback; `forced-color-adjust: none` (in CSS) keeps the
 * brand in high-contrast mode, the canonical exception for a logo.
 */
export function Logo({ size = 30, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="panlabs"
      className={className}
    >
      <defs>
        <linearGradient
          id="panlabs-mark"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3d9be0" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#panlabs-mark)" />
      {/* terminal prompt: chevron + caret */}
      <path
        d="M11 11.5l5 4.5-5 4.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17.5 21h5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
