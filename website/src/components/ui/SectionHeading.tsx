type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = tone === "dark" ? "text-ink" : "text-white";
  const descColor = tone === "dark" ? "text-muted" : "text-platinum/90";
  const eyeColor = tone === "dark" ? "text-signal" : "text-chrome";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p
          className={`mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] ${eyeColor}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${descColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
