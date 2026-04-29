import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import JsonLd from "../components/JsonLd";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
  description: "Expert PCB Design, Smart Control Systems, and Electronics Manufacturing. Specialized in Gate Control, AC Control, Hoist Protection, and Tech Product Sourcing.",
  keywords: [
    "Smart gate control system",
    "Smart Air Condition control system",
    "Hoist protection system",
    "Tech Products Sourcing",
    "Electronics Engineering Consultation",
    "PCB Design", 
    "Circuit Board Design", 
    "Electronics Manufacturing", 
    "Embedded Systems", 
    "Sri Lanka Electronics"
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://irkinnovations.com',
    siteName: 'IRK Innovations',
    title: "IRK Innovations | Electronics Products & Engineering Solutions",
    description: "Expert PCB Design and Electronics Manufacturing services. Custom engineering solutions from concept to production.",
    images: [
      {
        url: '/IRKLogo.jpg',
        width: 1200,
        height: 630,
        alt: 'IRK Innovations Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "IRK Innovations | Electronics Products & Engineering Solutions",
    description: "Expert PCB Design and Electronics Manufacturing services.",
    images: ['/IRKLogo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "wj0IQ1rCdjfrPObI8aE0v_A_elFNj6ALEenRP2iWKTM",
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
        <header className="fixed top-0 w-full z-50">
          <TopBar />
          <NavBar position="static" />
        </header>
        <main>
          {children}
        </main>
        <Footer />
        <JsonLd />
        <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
