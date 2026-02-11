import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-zinc-400 py-16 border-t border-zinc-900 relative overflow-hidden">
      {/* Decorative Circle Line - simulating screenshot style */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-zinc-800 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 relative rounded-lg overflow-hidden border border-yellow-500/50">
                    <Image src="/IRK-Logo.jpg" alt="Logo" fill className="object-cover" sizes="40px" />
                </div>
                <span className="font-bold text-3xl text-white tracking-tighter">IRK <span className="text-zinc-600">Innovations</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Our team can assist with the installation and integration of home automation systems, allowing you to control your lighting and other electronic devices with ease.
            </p>
            <div className="flex gap-4 pt-4">
               {[Facebook, Instagram, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="bg-yellow-500 hover:bg-yellow-400 text-black p-2 transition-colors">
                   <Icon size={20} />
                 </a>
               ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-yellow-500 font-bold text-xl mb-8 uppercase tracking-wide">Explore</h3>
            <ul className="space-y-4 font-bold text-sm uppercase tracking-wider">
               {[
                 { name: 'Home', href: '/' },
                 { name: 'About', href: '/about' },
                 { name: 'services', href: '/services' },
                 { name: 'Project', href: '/projects' },
                 { name: 'Contacts', href: '/contact' }
               ].map((item) => (
                 <li key={item.name}>
                   <Link href={item.href} className="flex items-center hover:text-yellow-500 transition-colors">
                     <span className="text-yellow-500 mr-2">▸</span> {item.name}
                   </Link>
                 </li>
               ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-yellow-500 font-bold text-xl mb-8 uppercase tracking-wide">Contact Us</h3>
            <ul className="space-y-6 text-sm">
               <li className="flex gap-4">
                  <MapPin className="text-yellow-500 shrink-0" size={20} />
                  <div>
                    <span className="block text-white font-bold mb-1">Address</span>
                    Sample
                  </div>
               </li>
               <li className="flex gap-4">
                  <Phone className="text-yellow-500 shrink-0" size={20} />
                  <div>
                    <span className="block text-white font-bold mb-1">Phone:</span>
                    +94 76 537 6106
                  </div>
               </li>
               <li className="flex gap-4">
                  <Mail className="text-yellow-500 shrink-0" size={20} />
                  <div>
                    <span className="block text-white font-bold mb-1">Email:</span>
                    irkinnovations2022@gmail.com
                  </div>
               </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-zinc-600">
           <span>IRK Innovations © All Rights Reserved - {new Date().getFullYear()}</span>
        </div>
      </div>
      

    </footer>
  );
};

export default Footer;
