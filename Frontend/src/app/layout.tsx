import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const siteUrl = "https://www.makeyourownvoyage.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Make Your Own Voyage | Flights, Hotels & Holiday Packages",
    template: "%s | Make Your Own Voyage",
  },

  description:
    "Book flights, hotels, holiday packages, cabs and cruises with Make Your Own Voyage. Explore domestic and international trips, visa assistance and customized travel experiences.",

  keywords: [
    "flight booking",
    "hotel booking",
    "holiday packages",
    "travel agency",
    "tour and travel",
    "domestic holiday packages",
    "international holiday packages",
    "visa assistance",
    "cab booking",
    "cruise booking",
    "travel packages India",
    "international tour packages",
    "domestic tour packages",
  ],

  authors: [
    {
      name: "Make Your Own Voyage",
      url: siteUrl,
    },
  ],

  creator: "Make Your Own Voyage",
  publisher: "Make Your Own Voyage",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Make Your Own Voyage",
    title: "Make Your Own Voyage | Flights, Hotels & Holiday Packages",
    description:
      "Book flights, hotels and holiday packages with Make Your Own Voyage. Explore domestic and international trips, visa assistance, cabs, cruises and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Make Your Own Voyage - Travel Booking",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Make Your Own Voyage | Flights, Hotels & Holiday Packages",
    description:
      "Book flights, hotels and holiday packages with Make Your Own Voyage.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
