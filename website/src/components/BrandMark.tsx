import Image from "next/image";
import { site } from "@/lib/site";

type BrandMarkProps = {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
};

const sizeMap = {
  sm: { width: 168, height: 58 },
  md: { width: 210, height: 72 },
  lg: { width: 280, height: 96 },
};

export function BrandMark({
  tone = "dark",
  size = "md",
  showWordmark = true,
}: BrandMarkProps) {
  const s = sizeMap[size];
  // Raster for next/image; SVG kept in public for crisp exports
  const src = showWordmark
    ? tone === "light"
      ? site.brand.logoOnDarkRaster
      : site.brand.logoRaster
    : tone === "light"
      ? site.brand.iconOnDark
      : site.brand.icon;

  return (
    <span className="inline-flex items-center">
      <Image
        src={src}
        alt={site.name}
        width={showWordmark ? s.width : Math.round(s.height * 0.95)}
        height={s.height}
        className="h-auto object-contain"
        style={{
          width: showWordmark ? s.width : Math.round(s.height * 0.95),
          height: "auto",
          maxHeight: s.height,
        }}
        priority
      />
    </span>
  );
}
