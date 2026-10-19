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
      className="scroll-mt-20 bg-graphite py-20 text-white sm:py-24"
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {site.whyUs.map((item, index) => {
            const Icon = icons[index] ?? Compass;
            return (
              <Reveal
                key={item.title}
                delay={(Math.min(index, 3) as 0 | 1 | 2 | 3)}
              >
                <article className="border-l border-chrome/50 pl-5 sm:pl-6">
                  <div className="mb-3 inline-flex text-crimson">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3
                    id={index === 0 ? "why-heading" : undefined}
                    className="font-display text-xl font-semibold"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-platinum/90 sm:text-base">
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
