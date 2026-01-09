import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "@/styles/more-nutrition.css";
import "@/styles/kinuami-theme.css";
import "@/styles/main.css";
import "./globals.css";

const foundersGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/founders-grotesk-condensed-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/founders-grotesk-condensed-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/founders-grotesk-condensed-semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-founders-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KINUAMI U - The Future of Bathing",
  description:
    "Experience the luxury of ultra-dense foam with KINUAMI U. Innovative shower technology for a frictionless, spa-like wash.",
  openGraph: {
    title: "KINUAMI U - The Future of Bathing",
    description:
      "Experience the luxury of ultra-dense foam with KINUAMI U. Innovative shower technology for a frictionless, spa-like wash.",
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
      <body className={`${foundersGrotesk.variable} body`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
