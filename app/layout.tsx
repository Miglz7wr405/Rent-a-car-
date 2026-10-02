import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Kakeylka Rent a Car · Aluguer de viaturas em Quelimane",
    template: "%s · Kakeylka Rent a Car"
  },
  description:
    "Aluguer de viaturas em Quelimane, Moçambique. Sedans, SUVs 4x4, pickups e minibus com reserva simples via website ou WhatsApp.",
  openGraph: {
    title: "Kakeylka Rent a Car",
    description: "Aluguer de viaturas em Quelimane, Moçambique.",
    locale: "pt_MZ",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-MZ" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-night-900 font-sans text-bone-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
