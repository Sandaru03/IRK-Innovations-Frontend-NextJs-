import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import JsonLd from "../components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "IRK Innovations | Electronics Products & Engineering Solutions",
    template: "%s | IRK Innovations"
  },
  description: "Leading electronics product design and manufacturing company. specialized in custom PCB design, embedded systems, and end-to-end electronics engineering solutions.",
  keywords: ["IRK Innovations", "Electronics products", "PCB Design", "Electronics Manufacturing", "Embedded Systems", "Engineering Solutions", "Sri Lanka Electronics"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://irkinnovations.com',
    siteName: 'IRK Innovations',
    title: "IRK Innovations | Electronics Products Design & Manufacturing",
    description: "Customized Electronics Products Design & Manufacturing. Transform your ideas into reality with our expert engineering solutions.",
    images: [
      {
        url: '/IRK-Logo.jpg',
        width: 1200,
        height: 630,
        alt: 'IRK Innovations Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "IRK Innovations | Electronics Products",
    description: "Your trusted partner for all electronics needs. Design, Manufacturing, and Sourcing.",
    images: ['/IRK-Logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <JsonLd />
        <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
