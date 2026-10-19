import { Car, ShieldCheck, Wallet } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const icons = {
  "new-car": Car,
  finance: Wallet,
  insurance: ShieldCheck,
} as const;

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-surface py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-silver/30 opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 top-28 h-0 w-0 border-l-[70px] border-r-[70px] border-b-[120px] border-l-transparent border-r-transparent border-b-signal/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Built around the car you want"
            description="New car sourcing is our primary craft. Finance and insurance sit alongside when you are ready to move from preference to purchase."
          />
        </Reveal>

        <div className="mt-16 grid gap-7 lg:grid-cols-3 lg:gap-8">
          {site.services.map((service, index) => {
            const Icon = icons[service.id as keyof typeof icons] ?? Car;
            return (
              <Reveal
                key={service.id}
                delay={(Math.min(index, 3) as 0 | 1 | 2 | 3)}
                className="h-full"
              >
                <article
                  className={`flex h-full flex-col rounded-sm p-8 sm:p-9 ${
                    service.primary
                      ? "border border-signal/40 bg-ink text-white shadow-[0_28px_60px_-32px_rgba(7,9,13,0.7)] lg:scale-[1.03]"
                      : "glass border-chrome/30 bg-white/70 text-ink"
                  }`}
                >
                  {service.primary ? (
                    <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-chrome">
                      Primary service
                    </p>
                  ) : null}
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-sm ${
                      service.primary
                        ? "bg-white/8 text-chrome-bright"
                        : "bg-surface text-signal"
                    }`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3
                    id={service.primary ? "services-heading" : undefined}
                    className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]"
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-relaxed sm:text-base ${
                      service.primary ? "text-platinum/90" : "text-muted"
                    }`}
                  >
                    {service.description}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className={`flex gap-2.5 text-sm ${
                          service.primary ? "text-platinum" : "text-ink/80"
                        }`}
                      >
                        <span
                          className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                            service.primary ? "bg-signal-glow" : "bg-signal"
                          }`}
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
