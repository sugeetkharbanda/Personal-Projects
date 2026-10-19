"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const frosted = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 animate-nav-in transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        frosted
          ? "border-b border-chrome/25 bg-surface/75 shadow-[0_10px_40px_-24px_rgba(7,9,13,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.75rem]">
        <a
          href="#home"
          className="relative z-10"
          onClick={() => setOpen(false)}
          aria-label={`${site.name} home`}
        >
          <BrandMark
            tone={frosted ? "dark" : "light"}
            size="sm"
            showWordmark
          />
        </a>

        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Primary"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                frosted
                  ? "text-ink/75 hover:text-ink"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <Button href={site.cta.primary.href} variant="primary">
            {site.cta.primary.label}
          </Button>
        </nav>

        <button
          type="button"
          className={`relative z-10 inline-flex items-center justify-center rounded-sm p-2 md:hidden ${
            frosted ? "text-ink" : "text-white"
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={`md:hidden ${open ? "block" : "hidden"}`}
      >
        <div className="border-t border-chrome/20 bg-surface/90 px-5 py-7 backdrop-blur-xl">
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              href={site.cta.primary.href}
              variant="primary"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              {site.cta.primary.label}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
