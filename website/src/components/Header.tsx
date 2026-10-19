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
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  // Over dark hero: transparent/dark integrated. On scroll: frosted glass.
  // Mobile menu open: dark frosted so it never flashes light-grey over hero.
  const elevated = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 animate-nav-in transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        elevated
          ? "border-b border-white/10 bg-ink/70 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.75rem]">
        <a
          href="#home"
          className="relative z-10 min-w-0 shrink overflow-visible"
          onClick={() => setOpen(false)}
          aria-label={`${site.name} home`}
        >
          <BrandMark tone="light" size="sm" showWordmark />
        </a>

        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Primary"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-white/80 transition-colors duration-300 hover:text-white"
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
          className="relative z-10 inline-flex items-center justify-center rounded-sm p-2 text-white md:hidden"
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
        <div className="border-t border-white/10 bg-ink/90 px-5 py-7 backdrop-blur-xl">
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-white"
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
