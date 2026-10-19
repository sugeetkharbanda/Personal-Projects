import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <WhyUs />
        <ContactForm />
      </main>
      <Footer />
      <LegalStubs />
    </>
  );
}

function LegalStubs() {
  return (
    <>
      <section id="privacy" className="sr-only" aria-hidden="true">
        Privacy policy placeholder — content pending.
      </section>
      <section id="terms" className="sr-only" aria-hidden="true">
        Terms of use placeholder — content pending.
      </section>
    </>
  );
}
