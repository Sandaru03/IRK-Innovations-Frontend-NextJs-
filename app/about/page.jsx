"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { 
  Award, 
  Users, 
  Lightbulb, 
  TrendingUp,
  CheckCircle2,
  Target,
  ShieldCheck,
  Globe,
  ArrowRight
} from 'lucide-react';

// Counter Component for Animation
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuad = (t) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(percentage) * end);

      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const AboutPage = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) setHeaderHeight(header.offsetHeight);
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: 10, label: "Years Experience", suffix: "+" },
    { number: 300, label: "Units Deployed", suffix: "+" },
    { number: 50, label: "Projects Completed", suffix: "+" },
    { number: 100, label: "Client Satisfaction", suffix: "%" }
  ];

  const values = [
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation First",
      description: "We push boundaries with cutting-edge technology and creative electronics solutions."
    },
    {
      icon: <Target size={32} />,
      title: "Problem Solvers",
      description: "Bring us your toughest challenges. We deliver complete, market-ready solutions."
    },
    {
      icon: <Award size={32} />,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous industrial testing and validation processes."
    },
    {
      icon: <Users size={32} />,
      title: "Client Partnership",
      description: "We work alongside you as technical partners from concept to mass deployment."
    }
  ];

  const expertise = [
    "Embedded Systems Design",
    "IoT & Smart Automation",
    "Industrial Control Systems",
    "Product Architecture",
    "Manufacturing Optimization",
    "China Sourcing Networks"
  ];

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <NavBar />
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 bg-[#143d2d] overflow-hidden" style={{ marginTop: headerHeight }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              About <span className="text-yellow-400 underline decoration-white/10">IRK Innovations</span>
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Leading the way in customized electronics products design and manufacturing 
              with over a decade of proven industrial excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-12 bg-white relative -mt-10 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-emerald-800 mb-2 group-hover:text-yellow-500 transition-colors">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="relative">
               {/* Image Collage Style */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                   <div className="relative h-64 w-full rounded-3xl shadow-lg overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600" alt="Tech" fill className="object-cover" />
                   </div>
                 </div>
                 <div className="pt-12 space-y-4">
                   <div className="bg-[#143d2d] p-8 rounded-3xl shadow-lg text-white">
                     <h4 className="text-4xl font-black mb-1">10+</h4>
                     <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Years of Trust</p>
                   </div>
                   <div className="relative h-64 w-full rounded-3xl shadow-lg overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=600" alt="Electronics" fill className="object-cover" />
                   </div>
                 </div>
               </div>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
                <h2 className="text-yellow-600 font-bold uppercase tracking-widest text-sm">Our Mission</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Empowering businesses through <span className="text-emerald-700">innovative electronics</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide environmentally conscious and energy-efficient electronics solutions that exceed industry standards. 
                We transform complex technical problems into reliable, high-performance market-ready products.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                    <span className="font-bold text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Values that Drive Us</h2>
             <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="group p-10 bg-gray-50 rounded-[40px] border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="bg-emerald-900 text-yellow-400 w-16 h-16 flex items-center justify-center rounded-2xl mb-8 group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-900/20">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE BOXES ================= */}
      <section className="py-24 bg-[#143d2d] text-white overflow-hidden relative">
        <Globe className="absolute -right-20 -bottom-20 text-white opacity-5" size={500} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black mb-6 leading-tight">What sets us apart?</h2>
              <p className="text-emerald-100 opacity-80 mb-8">
                Our combination of technical depth and manufacturing agility makes us the preferred partner for complex projects.
              </p>
              <Link href="/projects" className="inline-flex items-center gap-2 bg-yellow-400 text-emerald-950 font-black px-8 py-4 rounded-2xl hover:bg-white transition-all">
                View Our Portfolio <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <TrendingUp className="text-yellow-400" />,
                  title: "Complete Solution Provider",
                  text: "We need your problem only. We deliver design, manufacturing, and installation."
                },
                {
                  icon: <Award className="text-yellow-400" />,
                  title: "Industry Authority",
                  text: "Over 10 years of specialized expertise in embedded electronics and bulk production."
                },
                {
                  icon: <Globe className="text-yellow-400" />,
                  title: "Global Supply Chain",
                  text: "Direct partnerships with leading international manufacturers and tier-1 component suppliers to ensure maximum value and premium quality for your projects.eke tiyna images "
                },
                {
                  icon: <ShieldCheck className="text-yellow-400" />,
                  title: "Certified Reliability",
                  text: "Rigorous testing protocols ensuring every unit meets international quality standards."
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all">
                  <div className="mb-4">{card.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{card.title}</h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-50 border-2 border-dashed border-emerald-900/20 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Ready to start your innovation?</h2>
            <p className="text-gray-500 text-xl mb-10 max-w-2xl mx-auto">
              Whether you have a full spec or just a rough idea, we have the expertise to bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-emerald-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20">
                Get in Touch
              </Link>
            
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
