import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden bg-surface-elevated py-24 sm:py-32"
      aria-labelledby="how-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from brief to handover"
            description="Four deliberate steps. We expand the search through our network, then keep you informed as real options appear."
          />
        </Reveal>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {site.steps.map((item, index) => (
            <Reveal
              key={item.step}
              delay={(Math.min(index, 3) as 0 | 1 | 2 | 3)}
            >
              <li className="relative">
                <div className="mb-6 flex items-baseline gap-3">
                  <span
                    className="font-display text-5xl font-semibold tracking-tight text-signal"
                    aria-hidden="true"
                  >
                    {String(item.step).padStart(2, "0")}
                  </span>
                  {index < site.steps.length - 1 ? (
                    <span
                      className="hidden h-px flex-1 bg-gradient-to-r from-chrome to-transparent lg:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <h3
                  id={index === 0 ? "how-heading" : undefined}
                  className="font-display text-xl font-semibold text-ink sm:text-2xl"
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
