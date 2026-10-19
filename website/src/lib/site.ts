export const site = {
  name: "Auto Traders",
  shortName: "AT",
  tagline: "The next automotive era.",
  description:
    "Auto Traders helps you find the right new car through a broader nationwide sourcing network—plus finance and insurance support when you need it.",
  url: "https://autotraders.example",

  brand: {
    /** Official lockup (chrome mark + wordmark) — light surfaces */
    logo: "/brand/logo.png",
    logo2x: "/brand/logo@2x.png",
    /** Official lockup with light chrome text — dark surfaces */
    logoOnDark: "/brand/logo-on-dark.png",
    logoOnDark2x: "/brand/logo-on-dark@2x.png",
    /** Wordmark only (tight header / mobile) */
    wordmark: "/brand/wordmark.png",
    wordmarkOnDark: "/brand/wordmark-on-dark.png",
    /** 3D chrome mark alone */
    icon: "/brand/logo-mark.png",
    icon2x: "/brand/logo-mark@2x.png",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact Us", href: "#contact" },
  ] as const,

  cta: {
    primary: { label: "Find Your Car", href: "#contact" },
    secondary: { label: "Explore Our Services", href: "#services" },
  },

  hero: {
    headline: "The car you want, sourced with precision.",
    support:
      "A broader nationwide network means more options on the table—so we can pursue the right match with focus, not guesswork.",
  },

  services: [
    {
      id: "new-car",
      title: "New Car Sourcing",
      primary: true,
      description:
        "Tell us the brand, model, and variant you have in mind. We tap a wider sourcing network across India to pursue availability that fits your preferences—without promising what we cannot control.",
      points: [
        "Nationwide dealer and partner reach",
        "Preference-led search, not a fixed inventory list",
        "Clear updates as options surface",
      ],
    },
    {
      id: "finance",
      title: "Finance Assistance",
      primary: false,
      description:
        "When you are ready to move forward, we help you explore financing pathways suited to your situation—so paperwork and conversations stay organised.",
      points: [
        "Guidance through loan conversations",
        "Structured document checklists",
        "Support until terms are clear to you",
      ],
    },
    {
      id: "insurance",
      title: "Insurance Support",
      primary: false,
      description:
        "Protect your purchase with insurance options explained in plain language—coverage choices that match the car and how you drive.",
      points: [
        "Policy options explained simply",
        "Aligned with your vehicle and usage",
        "Help comparing cover essentials",
      ],
    },
  ] as const,

  steps: [
    {
      step: 1,
      title: "Share your brief",
      description:
        "Brand, model, variant, city, and any must-haves—so we know exactly what “right” means for you.",
    },
    {
      step: 2,
      title: "We activate the network",
      description:
        "Your request goes into our nationwide sourcing network. We look wider so more possibilities can come into view.",
    },
    {
      step: 3,
      title: "Review real options",
      description:
        "We bring you clear, actionable updates as suitable availability emerges—no padded claims, no invented stocks.",
    },
    {
      step: 4,
      title: "Close with confidence",
      description:
        "When you choose a path, we support finance and insurance conversations so the final stretch stays deliberate.",
    },
  ] as const,

  whyUs: [
    {
      title: "Broader reach",
      description:
        "A wider nationwide sourcing network is our edge—more doors to knock on when the car you want is scarce locally.",
    },
    {
      title: "Focused brief",
      description:
        "We work from your preferences, not a one-size showroom pitch. Determination starts with listening.",
    },
    {
      title: "Honest process",
      description:
        "No guaranteed timelines, prices, or stock claims. You get clarity on what we can pursue—and what we cannot promise.",
    },
    {
      title: "End-to-end care",
      description:
        "Sourcing first; finance and insurance when you need them—one relationship through the journey.",
    },
  ] as const,

  contact: {
    phone: "+91 XXXXX XXXXX",
    phoneHref: "tel:+91XXXXXXXXXX",
    email: "autotraders@airtelmail.in",
    emailHref: "mailto:autotraders@airtelmail.in",
    whatsapp: "+91 XXXXX XXXXX",
    whatsappHref: "https://wa.me/91XXXXXXXXXX",
    address: "Faridabad, Haryana · Nationwide sourcing",
    hours: "Mon–Sat, 10:00–19:00 IST",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/", placeholder: true },
    { label: "LinkedIn", href: "https://linkedin.com/", placeholder: true },
    { label: "X", href: "https://x.com/", placeholder: true },
  ] as const,

  serviceOptions: [
    "New Car Sourcing",
    "Finance Assistance",
    "Insurance Support",
  ] as const,

  footerBlurb:
    "Auto Traders connects discerning buyers with new cars through a broader nationwide sourcing network—executed with focus on the brief and determination to find a fit.",
} as const;

export type ServiceOption = (typeof site.serviceOptions)[number];
