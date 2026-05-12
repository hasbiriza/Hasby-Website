import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollAwareHeader, Footer } from "@/components/layout";
import ExperienceLayer from "@/components/ui/experience-layer";
import CursorGlow from "@/components/ui/cursor-glow";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muhammad Hasbiriza — Commerce Engineer",
    template: "%s | Hasbi",
  },
  description:
    "Single-page portfolio for Muhammad Hasbiriza, an Commerce engineer building polished, fast storefront experiences.",
  metadataBase: new URL("https://hasbi.dev"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Muhammad Hasbiriza",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.variable} suppressHydrationWarning>
        <CursorGlow />
        <ScrollAwareHeader />
        <ExperienceLayer>
          <main>{children}</main>
        </ExperienceLayer>
        <Footer />
      </body>
    </html>
  );
}
