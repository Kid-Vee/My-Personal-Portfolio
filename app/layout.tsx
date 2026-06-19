import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Gideon Vision Olufeagba — Product Manager",
  description:
    "Certified Product Manager (CPM) with 4+ years leading end-to-end product development across fintech, edtech, real estate, and commodities. Agile, strategy, user research, and data-driven delivery.",
  keywords: [
    "Product Manager",
    "Product Lead",
    "Gideon Vision Olufeagba",
    "Fintech",
    "EdTech",
    "Agile",
    "Product Strategy",
  ],
  authors: [{ name: "Gideon Vision Olufeagba" }],
  openGraph: {
    title: "Gideon Vision Olufeagba — Product Manager",
    description:
      "Certified Product Manager building scalable products across fintech, edtech, real estate, and commodities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
