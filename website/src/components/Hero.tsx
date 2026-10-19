"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!section || !media || !content) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight || 1;
        // 0 at top of viewport, 1 when section has scrolled fully past
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        const scale = 1 + progress * 0.12;
        const translateY = progress * viewH * 0.18;
        media.style.transform = `translate3d(0, ${translateY * 0.35}px, 0) scale(${scale})`;
        content.style.opacity = String(1 - progress * 1.15);
        content.style.transform = `translate3d(0, ${progress * 48}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-[155svh] bg-ink text-white"
      aria-labelledby="hero-brand"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          ref={mediaRef}
          className="hero-parallax-media absolute inset-[-8%] will-change-transform"
        >
          <Image
            src={site.hero.image.src}
            alt={site.hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-[68%_center]"
          />
        </div>

        {/* Brand-harmonised grading overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-graphite/50"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_55%,rgba(161,28,30,0.22),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent"
          aria-hidden="true"
        />

        <Container className="relative flex h-full flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-28 sm:pt-32">
          <div
            ref={contentRef}
            className="max-w-3xl animate-fade-rise will-change-transform"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <Image
                src={site.brand.logo}
                alt=""
                width={140}
                height={116}
                priority
                className="h-[4.25rem] w-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:h-24"
              />
              <p
                id="hero-brand"
                className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
              >
                {site.name}
              </p>
            </div>
            <h1 className="mt-8 max-w-2xl font-display text-3xl font-medium leading-[1.15] tracking-tight text-chrome-bright sm:text-4xl md:text-5xl">
              {site.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-platinum/90 sm:text-lg md:text-xl">
              {site.hero.support}
            </p>
            <div className="mt-11 flex flex-wrap gap-3.5">
              <Button href={site.cta.primary.href} variant="primary">
                {site.cta.primary.label}
              </Button>
              <Button href={site.cta.secondary.href} variant="outline-light">
                {site.cta.secondary.label}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
