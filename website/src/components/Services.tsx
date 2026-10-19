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
      className="scroll-mt-20 bg-surface py-20 sm:py-24"
      aria-labelledby="services-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Built around the car you want"
            description="New car sourcing is our primary craft. Finance and insurance sit alongside when you are ready to move from preference to purchase."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {site.services.map((service, index) => {
            const Icon = icons[service.id as keyof typeof icons] ?? Car;
            return (
              <Reveal
                key={service.id}
                delay={(Math.min(index, 3) as 0 | 1 | 2 | 3)}
                className="h-full"
              >
                <article
                  className={`flex h-full flex-col rounded-sm border p-7 sm:p-8 ${
                    service.primary
                      ? "border-crimson/45 bg-ink text-white shadow-[0_20px_50px_-28px_rgba(11,20,38,0.55)] lg:scale-[1.02]"
                      : "border-platinum bg-white text-ink"
                  }`}
                >
                  {service.primary ? (
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-chrome">
                      Primary service
                    </p>
                  ) : null}
                  <div
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-sm ${
                      service.primary
                        ? "bg-white/10 text-chrome"
                        : "bg-surface text-crimson"
                    }`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3
                    id={service.primary ? "services-heading" : undefined}
                    className="font-display text-2xl font-semibold tracking-tight"
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed sm:text-base ${
                      service.primary ? "text-platinum/90" : "text-muted"
                    }`}
                  >
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className={`flex gap-2 text-sm ${
                          service.primary ? "text-platinum" : "text-ink/80"
                        }`}
                      >
                        <span
                          className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                            service.primary ? "bg-crimson" : "bg-chrome-deep"
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
