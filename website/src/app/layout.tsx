import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Nationwide New Car Sourcing`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Auto Traders",
    "new car sourcing",
    "car finance",
    "car insurance",
    "nationwide car sourcing",
    "Faridabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Nationwide New Car Sourcing`,
    description: site.description,
    images: [
      {
        url: site.brand.logoOnDarkRaster,
        width: 1440,
        height: 490,
        alt: `${site.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Nationwide New Car Sourcing`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/brand/logo-icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-surface font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
