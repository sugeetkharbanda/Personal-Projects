import { Compass, Ear, Handshake, Scale } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const icons = [Compass, Ear, Scale, Handshake];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="scroll-mt-24 bg-graphite py-24 text-white sm:py-32"
      aria-labelledby="why-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why AutoSourcing India"
            title="Luxury of attention. Focus on the brief. Determination in the search."
            description="Our differentiator is reach: a broader nationwide sourcing network. Shorter waits can happen when the right option surfaces sooner—but we never treat that as a promise."
            tone="light"
          />
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-10">
          {site.whyUs.map((item, index) => {
            const Icon = icons[index] ?? Compass;
            return (
              <Reveal
                key={item.title}
                delay={(Math.min(index, 3) as 0 | 1 | 2 | 3)}
              >
                <article className="glass-dark rounded-sm border-l-2 border-l-crimson/70 p-6 sm:p-7">
                  <div className="mb-4 inline-flex text-chrome-bright">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3
                    id={index === 0 ? "why-heading" : undefined}
                    className="font-display text-xl font-semibold sm:text-2xl"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-platinum/90 sm:text-base">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
