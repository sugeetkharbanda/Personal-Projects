import Image from "next/image";
import { site } from "@/lib/site";

type BrandMarkProps = {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
};

const sizeMap = {
  sm: { mark: 40, word: "text-base sm:text-lg" },
  md: { mark: 48, word: "text-lg sm:text-xl" },
  lg: { mark: 64, word: "text-2xl" },
};

export function BrandMark({
  tone = "dark",
  size = "md",
  showWordmark = true,
}: BrandMarkProps) {
  const wordColor = tone === "dark" ? "text-ink" : "text-white";
  const s = sizeMap[size];

  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3">
      <Image
        src={site.brand.icon}
        alt=""
        width={s.mark}
        height={s.mark}
        className="h-auto w-auto shrink-0 object-contain"
        style={{ width: s.mark, height: s.mark }}
        sizes={`${s.mark}px`}
        priority
      />
      {showWordmark ? (
        <span
          className={`font-display font-semibold tracking-tight ${s.word} ${wordColor}`}
        >
          {site.name}
        </span>
      ) : (
        <span className="sr-only">{site.name}</span>
      )}
    </span>
  );
}
