import Image from "next/image";
import { site } from "@/lib/site";

type BrandMarkProps = {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  /** Full official lockup, or wordmark-only for tight spaces */
  variant?: "lockup" | "wordmark" | "icon";
};

const lockupWidths = { sm: 200, md: 280, lg: 420 } as const;
const wordmarkWidths = { sm: 150, md: 200, lg: 280 } as const;
const iconSizes = { sm: 36, md: 44, lg: 56 } as const;

export function BrandMark({
  tone = "dark",
  size = "md",
  variant = "lockup",
}: BrandMarkProps) {
  const onDark = tone === "light";

  if (variant === "icon") {
    const s = iconSizes[size];
    return (
      <span className="inline-flex shrink-0 items-center overflow-visible">
        <Image
          src={site.brand.icon}
          alt={site.name}
          width={s}
          height={s}
          className="h-auto w-auto object-contain"
          style={{ width: s, height: s }}
          priority
          unoptimized
        />
      </span>
    );
  }

  if (variant === "wordmark") {
    const width = wordmarkWidths[size];
    const height = Math.round(width * (264 / 900));
    const src = onDark ? site.brand.wordmarkOnDark : site.brand.wordmark;
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

  const width = lockupWidths[size];
  const height = Math.round(width * (210 / 1080));
  const src = onDark ? site.brand.logoOnDark : site.brand.logo;

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
