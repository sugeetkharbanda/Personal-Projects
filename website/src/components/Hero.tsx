import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-ink text-white"
      aria-labelledby="hero-brand"
    >
      <Image
        src={site.hero.image.src}
        alt={site.hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-32">
        <div className="max-w-2xl animate-fade-rise">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Image
              src={site.brand.logo}
              alt=""
              width={112}
              height={98}
              priority
              className="h-16 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:h-20"
            />
            <p
              id="hero-brand"
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              {site.name}
            </p>
          </div>
          <h1 className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight text-white/95 sm:text-3xl md:text-4xl">
            {site.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-platinum sm:text-lg">
            {site.hero.support}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={site.cta.primary.href} variant="primary">
              {site.cta.primary.label}
            </Button>
            <Button href={site.cta.secondary.href} variant="outline-light">
              {site.cta.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
