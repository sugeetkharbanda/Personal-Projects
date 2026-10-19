import { BrandMark } from "@/components/BrandMark";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-platinum">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandMark tone="light" size="sm" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-platinum/80">
              {site.footerBlurb}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-chrome">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-platinum/85 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-chrome">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {site.services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-sm text-platinum/85 transition hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-chrome">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-platinum/85">
              <li>
                <a href={site.contact.phoneHref} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={site.contact.emailHref} className="hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li>{site.contact.address}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium uppercase tracking-[0.16em] text-platinum/70 transition hover:text-chrome"
                >
                  {item.label}
                  {item.placeholder ? (
                    <span className="sr-only"> (placeholder)</span>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-platinum/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-platinum">
              Privacy
            </a>
            <a href="#terms" className="hover:text-platinum">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
