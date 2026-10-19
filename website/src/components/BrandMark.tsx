import Image from "next/image";
import { site } from "@/lib/site";

type BrandMarkProps = {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
};

/** Wide lockup (~5:1). Width drives size; height stays auto so nothing clips. */
const sizeMap = {
  sm: { width: 240 },
  md: { width: 300 },
  lg: { width: 380 },
};

export function BrandMark({
  tone = "dark",
  size = "md",
  showWordmark = true,
}: BrandMarkProps) {
  const s = sizeMap[size];
  const src = showWordmark
    ? tone === "light"
      ? site.brand.logoOnDarkRaster
      : site.brand.logoRaster
    : tone === "light"
      ? site.brand.iconOnDark
      : site.brand.icon;

  const width = showWordmark ? s.width : 40;
  const height = showWordmark ? Math.round(s.width / 4.82) : 40;

  return (
    <span className="inline-flex max-w-full items-center overflow-visible">
      <Image
        src={src}
        alt={site.name}
        width={width}
        height={height}
        className="h-auto w-auto max-w-full object-contain object-left"
        style={{ width, height: "auto", maxWidth: "100%" }}
        priority
        unoptimized
      />
    </span>
  );
}
