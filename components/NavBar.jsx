import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NavBar = ({ position = "fixed" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navClasses =
    position === "fixed"
      ? "fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-yellow-500/20"
      : "w-full bg-zinc-950/90 backdrop-blur-md border-b border-yellow-500/20";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 relative rounded-lg overflow-hidden border border-yellow-500/50 group-hover:border-yellow-500 transition-colors">
              {/* Using the public folder image as requested */}
              <Image
                src="/IRK-Logo.jpg"
                alt="IRK Innovations"
                fill
                className="object-cover scale-125"
                sizes="(max-width: 768px) 40px, 40px"
              />
            </div>
            <span className="font-bold text-2xl text-white tracking-tighter">
              IRK <span className="text-yellow-500">Innovations</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              Projects
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black px-6 py-2 uppercase font-bold text-sm tracking-wider transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-400 hover:text-yellow-500"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-yellow-500/20">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-zinc-300 hover:text-yellow-500 border-b border-zinc-800 uppercase tracking-wider"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-zinc-300 hover:text-yellow-500 border-b border-zinc-800 uppercase tracking-wider"
            >
              About
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-zinc-300 hover:text-yellow-500 border-b border-zinc-800 uppercase tracking-wider"
            >
              Services
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-zinc-300 hover:text-yellow-500 border-b border-zinc-800 uppercase tracking-wider"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-zinc-300 hover:text-yellow-500 border-b border-zinc-800 uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
