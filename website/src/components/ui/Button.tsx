import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-crimson text-white shadow-[0_8px_28px_-10px_rgba(139,10,14,0.65)] hover:bg-crimson-deep hover:shadow-[0_12px_32px_-10px_rgba(139,10,14,0.75)]",
  secondary:
    "bg-ink text-white hover:bg-graphite-elevated",
  ghost:
    "bg-transparent text-ink hover:bg-platinum/35",
  "outline-light":
    "border border-chrome/70 bg-white/5 text-white backdrop-blur-md hover:border-chrome-bright hover:bg-white/10",
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", className = "", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
