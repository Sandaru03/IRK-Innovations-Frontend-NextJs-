"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { 
  Cpu, Settings, Search, CheckCircle2, ArrowRight, Zap, 
  Layers, Box, Factory, ChevronRight, 
  ShieldCheck, Globe, FlaskConical, PenTool
} from 'lucide-react';

const ServicesPage = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Header height eka measure karala margin eka hadanna
    const header = document.querySelector('header');
    if (header) setHeaderHeight(header.offsetHeight);
    window.scrollTo(0, 0);
  }, []);

  const mainServices = [
    {
      title: "End-to-End Customized Electronics",
      description: "We need your problem only — we will give you the solution. From design to manufacturing and installation, we follow standard industrial development steps.",
      icon: <Cpu size={32} />,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"
    },
    {
      title: "Electronics Engineering Consultation",
      description: "10+ years of industry experience in Embedded products design and Manufacturing. Experts in architecture, testing, and cost optimization.",
      icon: <Settings size={32} />,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800"
    },
    {
      title: "Tech Products Sourcing",
      description: "Need to source specific tech products? We have established networks to source high-quality components directly from China with QA.",
      icon: <Search size={32} />,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
    }
  ];

  const fullWorkflow = [
    { step: "01", title: "Information gathering", detail: "Requirements collection" },
    { step: "02", title: "Proof of Concept", detail: "Prototype development" },
    { step: "03", title: "EVT", detail: "Engineering Validation" },
    { step: "04", title: "DVT", detail: "Design Validation" },
    { step: "05", title: "Molding", detail: "Plastic parts molding" },
    { step: "06", title: "PVT / Mini Bulk", detail: "Process finalize" },
    { step: "07", title: "Bulk Production", detail: "Mass production" }
  ];

  const consultPoints = [
    "Electronics products architecture design",
    "Products testing",
    "Cost optimization / BOM optimization",
    "Design for Manufacturing (DFM)",
    "Design for Assembly (DFA)",
    "Assembly process optimization",
    "Electronics components sourcing",
    "Electronics bulk manufacturing"
  ];

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <NavBar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 bg-[#143d2d] overflow-hidden" style={{ marginTop: headerHeight }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Comprehensive <span className="text-yellow-400">Electronics</span> <br/>
            Engineering Services
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
            From initial concept to mass production, we provide end-to-end solutions 
            tailored to solve your most complex technical challenges.
          </p>
        </div>
      </section>

      {/* ================= MAIN SERVICES GRID ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service, i) => (
              <div key={i} className="group bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="h-48 overflow-hidden relative">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-emerald-900/40 group-hover:bg-emerald-900/20 transition-colors"></div>
                  <div className="absolute top-4 left-4 bg-yellow-400 p-3 rounded-2xl shadow-lg text-emerald-900">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW SECTION ================= */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Product Development Lifecycle</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {fullWorkflow.map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 h-full shadow-sm group-hover:border-emerald-500 group-hover:shadow-md transition-all text-center">
                  <span className="text-4xl font-black text-gray-100 group-hover:text-emerald-50 transition-colors block mb-2">{item.step}</span>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-tight">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </div>
                {index < fullWorkflow.length - 1 && (
                  <div className="hidden xl:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-gray-300">
                    <ChevronRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-emerald-900 rounded-4xl p-8 text-white flex flex-col md:flex-row items-center gap-6 shadow-2xl">

            <div>
              <h4 className="text-xl font-bold mb-2">Efficiency Note:</h4>
              <p className="text-emerald-100 opacity-90">
                If the product does not require customized enclosures, we simplify the process by moving directly from 
                <span className="font-bold text-yellow-400 px-2 uppercase">Prototyping</span> to 
                <span className="font-bold text-yellow-400 px-2 uppercase">Mini Bulk</span>, saving you significant time and cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONSULTATION & SOURCING ================= */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Consultation Points */}
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                Expert <span className="text-emerald-700">Engineering</span><br/>Consultancy
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {consultPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-lg transition-all">
                    <div className="bg-emerald-100 p-1 rounded-full text-emerald-700">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sourcing Card */}
            <div className="relative">
              <div className="bg-[#143d2d] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                <Globe className="absolute -right-20 -bottom-20 text-white opacity-5" size={400} />
                <div className="relative z-10">
                  <div className="bg-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-950 mb-8 shadow-xl shadow-yellow-400/20">
                    <Factory size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-6">Global Tech Sourcing</h3>
                  <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
                    Leverage our established factory networks in China. We handle the technical verification, 
                    quality audits, and logistics so you get the best products at factory prices.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      { icon: <ShieldCheck className="text-yellow-400" />, text: "Strict Component Quality Verification" },
                      { icon: <PenTool className="text-yellow-400" />, text: "Direct Technical Communication with Factories" },
                      { icon: <Box className="text-yellow-400" />, text: "Reliable Shipping & Logistics Management" }
                    ].map((li, i) => (
                      <li key={i} className="flex items-center gap-3 font-medium">
                        {li.icon} {li.text}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="w-full bg-yellow-400 text-emerald-950 font-black py-5 rounded-2xl hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                    Start Sourcing Today <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-emerald-900 rounded-[3rem] p-12 text-center relative overflow-hidden isolate">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 -z-10"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Have a technical problem?</h2>
            <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto opacity-80">
              Consult with our engineering team today and let's build your next innovation together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
              <Link href="/projects" className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                View Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
