import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Providers } from "./providers";
import "@/styles/more-nutrition.css";
import "@/styles/kinuami-theme.css";
import "@/styles/main.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EWW - The Future of Bathing",
  description:
    "Experience the luxury of ultra-dense foam with EverythingWorldWide. Innovative shower technology for a frictionless, spa-like wash.",
  openGraph: {
    title: "EWW - The Future of Bathing",
    description:
      "Experience the luxury of ultra-dense foam with EverythingWorldWide. Innovative shower technology for a frictionless, spa-like wash.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} body`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
