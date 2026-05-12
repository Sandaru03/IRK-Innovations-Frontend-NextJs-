"use client";

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/adminlogin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <TopBar />
        <NavBar position="static" />
      </header>
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
