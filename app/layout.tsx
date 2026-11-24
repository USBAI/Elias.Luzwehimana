import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://elias-luzwehimana.vercel.app"),
  title: "Elias Luzwehimana — Senior Software Engineer",
  description:
    "Senior software engineer in Stockholm. Product and platform engineering across Telia, Coredination, Symetri and Vornify AI. Open to founding, senior and product engineering roles.",
  openGraph: {
    title: "Elias Luzwehimana — Senior Software Engineer",
    description: "Product and platform engineer in Stockholm. Open to founding, senior and product engineering roles.",
    url: "/",
    siteName: "Elias Luzwehimana",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Elias Luzwehimana, Senior & Product Engineer" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#fafbf6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
