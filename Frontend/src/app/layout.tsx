import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";

const siteUrl = "https://www.makeyourownvoyage.com";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html
      lang="en-IN"
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className={`${plusJakartaSans.className} font-sans antialiased text-text bg-background`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
