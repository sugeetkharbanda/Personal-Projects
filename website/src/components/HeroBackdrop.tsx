/**
 * Abstract animated stage — not a logo recreation.
 * Cool graphite/slate field + drifting light orbs, ribbons, and a soft mesh.
 */
export function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#0c1018]"
      aria-hidden="true"
    >
      {/* Cool slate base (intentionally not pure ink-black) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#1a2336_0%,transparent_50%),radial-gradient(ellipse_at_90%_80%,#1c1420_0%,transparent_45%),linear-gradient(165deg,#0e141f_0%,#121820_40%,#0a0d14_100%)]" />

      {/* Soft color wash — playful signal + cool cyan undertone */}
      <div className="hero-blob hero-blob-a absolute -right-[20%] top-[-10%] h-[75vmin] w-[75vmin] rounded-full bg-[radial-gradient(circle,rgba(225,0,15,0.34),transparent_62%)] blur-3xl" />
      <div className="hero-blob hero-blob-b absolute -left-[15%] bottom-[-20%] h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(90,140,200,0.22),transparent_65%)] blur-3xl" />
      <div className="hero-blob hero-blob-c absolute left-[35%] top-[20%] h-[40vmin] w-[40vmin] rounded-full bg-[radial-gradient(circle,rgba(240,241,242,0.1),transparent_70%)] blur-2xl" />

      {/* Floating soft capsules / playful shapes (not brand geometry) */}
      <div className="hero-float-1 absolute right-[12%] top-[22%] h-24 w-24 rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm sm:h-32 sm:w-32" />
      <div className="hero-float-2 absolute right-[28%] top-[48%] h-14 w-40 rounded-full border border-signal/25 bg-signal/10 sm:h-16 sm:w-48" />
      <div className="hero-float-3 absolute bottom-[22%] right-[18%] h-20 w-20 rounded-full border border-chrome/20 bg-gradient-to-br from-white/10 to-transparent sm:h-28 sm:w-28" />

      {/* Diagonal light ribbons */}
      <div className="hero-ribbon pointer-events-none absolute -left-1/4 top-[10%] h-[140%] w-[55%] rotate-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className="hero-ribbon-delay pointer-events-none absolute left-[20%] top-[-20%] h-[140%] w-[40%] rotate-[-18deg] bg-gradient-to-r from-transparent via-signal/15 to-transparent" />

      {/* Speckled starfield — subtle, modern */}
      <div className="hero-stars absolute inset-0 opacity-70" />

      {/* Horizontal scan shimmer */}
      <div className="hero-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent" />

      {/* Left vignette for copy legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1018] via-[#0c1018]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-transparent to-[#0c1018]/40" />
    </div>
  );
}
