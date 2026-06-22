import Image from "next/image";

interface LogoProps {
  /** rendered size in px (square); defaults to the header mark size */
  size?: number;
  className?: string;
}

/**
 * panlabs brand logo. Renders the canonical apple-touch-icon raster (the same
 * mark used as the home-screen/app icon) so the header carries the real brand
 * face instead of a generic terminal glyph. Fixed, above-the-fold, so it loads
 * with `priority`; the header CSS rounds the corners.
 */
export function Logo({ size = 30, className }: LogoProps) {
  return (
    <Image
      src="/assets/apple-touch-icon.png"
      alt="panlabs"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
