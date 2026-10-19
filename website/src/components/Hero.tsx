"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!section || !stage || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        stage.style.transform = `scale(${1 + progress * 0.08})`;
        content.style.opacity = String(Math.max(0, 1 - progress * 1.2));
        content.style.transform = `translate3d(0, ${progress * 40}px, 0)`;
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
      className="relative h-[150svh] bg-ink text-white"
      aria-labelledby="hero-brand"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          ref={stageRef}
          className="absolute inset-0 will-change-transform"
        >
          <HeroBackdrop />
        </div>

        <Container className="relative flex h-full flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-28 sm:pt-32">
          <div
            ref={contentRef}
            className="max-w-3xl animate-fade-rise will-change-transform"
          >
            <h2 id="hero-brand" className="sr-only">
              {site.name}
            </h2>
            <Image
              src={site.brand.logoOnDarkRaster}
              alt={`${site.name} — ${site.tagline}`}
              width={960}
              height={199}
              priority
              unoptimized
              className="h-auto w-[min(100%,30rem)] max-w-full object-contain object-left sm:w-[34rem] md:w-[40rem]"
            />
            <h1 className="mt-8 max-w-2xl font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-chrome-bright sm:text-5xl md:text-6xl">
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
