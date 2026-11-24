import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eelias-portfolio.vercel.app"),
  title: "Elias Luzwehimana — Senior Software Engineer",
  description:
    "Senior software engineer in Stockholm. Product and platform engineering across Telia, Coredination, Symetri and Vornify AI. Open to founding, senior and product engineering roles.",
  openGraph: {
    title: "Elias Luzwehimana — Senior Software Engineer",
    description: "Product and platform engineer in Stockholm. Open to founding, senior and product engineering roles.",
    images: ["/images/portrait.webp"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#fafbf6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
