/** Generative brand geometry — triangle + arc from the Auto Traders mark. No photos. */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      {/* Deep radial stage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#2a2827_0%,#0a0909_58%,#050505_100%)]" />

      {/* Subtle drifting technical grid */}
      <div className="geom-grid absolute inset-0 opacity-40 mix-blend-soft-light" />

      {/* Signal red ambient bloom */}
      <div className="absolute -right-1/4 top-1/4 h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(225,0,15,0.3),transparent_65%)] blur-2xl" />
      <div className="absolute bottom-0 left-0 h-[45vmin] w-[45vmin] rounded-full bg-[radial-gradient(circle,rgba(240,241,242,0.1),transparent_70%)] blur-3xl" />

      {/* Large mark geometry */}
      <svg
        className="absolute -right-[8%] top-[8%] h-[92%] w-[72%] text-chrome opacity-90"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c5c7c8" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#9c9e9f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e1000f" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="triGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f0f1f2" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#c8cacd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e1000f" stopOpacity="0.5" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbit ring */}
        <g className="hero-orbit" style={{ transformOrigin: "200px 200px" }}>
          <circle
            cx="200"
            cy="200"
            r="168"
            stroke="url(#arcGrad)"
            strokeWidth="1.25"
            strokeDasharray="6 14"
            opacity="0.55"
          />
          <circle
            cx="200"
            cy="200"
            r="148"
            stroke="#9c9e9f"
            strokeWidth="0.6"
            opacity="0.25"
          />
        </g>

        {/* Brand arc (open at bottom) */}
        <g className="hero-pulse" style={{ transformOrigin: "200px 200px" }}>
          <path
            d="M86 268 A130 130 0 1 1 314 268"
            stroke="url(#arcGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
            filter="url(#softGlow)"
          />
        </g>

        {/* Brand triangle */}
        <path
          d="M200 78 L318 286 L82 286 Z"
          fill="url(#triGrad)"
          stroke="#c5c7c8"
          strokeWidth="1.2"
          opacity="0.42"
        />
        <path
          d="M200 118 L278 264 L122 264 Z"
          stroke="#e1000f"
          strokeWidth="1.4"
          opacity="0.6"
        />

        {/* Horizon lines */}
        <path
          d="M40 300 L360 300"
          stroke="#565757"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <path
          d="M70 318 L330 318"
          stroke="#9c9e9f"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <path
          d="M110 336 L290 336"
          stroke="#e1000f"
          strokeWidth="0.7"
          opacity="0.4"
        />
      </svg>

      {/* Light sweep */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 hero-sweep">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md" />
      </div>

      {/* Edge vignette for typography legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
    </div>
  );
}
