"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import ProjectCard from '../components/ProjectCard';
import SolutionsSection from '../components/SolutionsSection';
import { motion } from 'framer-motion';
import {
  CheckCircle, ArrowRight, Phone, Mail, MapPin,
  ChevronLeft, ChevronRight, Zap, Award, Users, Target,
  Plus, Minus, Cpu, CircuitBoard, Factory, Globe, Settings,
  Shield, Sparkles, TrendingUp, Wrench, Star, Clock, ThumbsUp,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Circle, Square, Hexagon, Activity
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

      // Easing function for smooth animation
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

const HomePage = () => {
  const [apiProjects, setApiProjects] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const headerRef = useRef(null);
  const scrollRef = useRef(null);

  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mapping fields to backend expected: name, email, subject, message
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: `Home Page Inquiry from ${formData.phone}`,
        message: formData.message
      };
      // Use NEXT_PUBLIC_API_URL or fallback
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await axios.post(`${apiUrl}/contact`, payload);
      toast.success(response.data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  // Continuous Auto-scroll effect (Marquee)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scroll = () => {
      if (scrollContainer) {
        // Continuous scroll speed
        scrollContainer.scrollLeft += 1;

        // Check if we are near the end (looping logic)
        // We have duplicates. Reset when we scroll past half the width (approx one set of items)
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
          // Reset to 0 (or a small offset if needed for perfect smoothness, but 0 works if duplicates are exact)
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start scrolling
    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const stopScroll = () => cancelAnimationFrame(animationFrameId);
    const startScroll = () => { cancelAnimationFrame(animationFrameId); animationFrameId = requestAnimationFrame(scroll); };

    scrollContainer.addEventListener('mouseenter', stopScroll);
    scrollContainer.addEventListener('mouseleave', startScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', stopScroll);
      scrollContainer.removeEventListener('mouseleave', startScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hero Slider Images
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=2070&auto=format&fit=crop", // Close-up circuit board
      title: "Electronic Innovation",
      subtitle: "10+ Years Industry Experience"
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", // Logic board / manufacturing
      title: "Precision Manufacturing",
      subtitle: "End-to-End Solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", // Industrial/technical work
      title: "Smart Solutions",
      subtitle: "Quality You Can Trust"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        console.log('Current API URL:', apiUrl);
        const response = await axios.get(`${apiUrl}/projects`);
        setApiProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();

    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">

      {/* ================= HERO SLIDER SECTION ================= */}
      <section id="home" className="relative h-screen min-h-[600px] pt-20 md:pt-32 overflow-hidden">

        {/* Slider Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-yellow-400 hover:border-yellow-400 transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-yellow-400 hover:border-yellow-400 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8 md:mt-32">

              {/* Left: Text Content */}
              <div className="text-white">


                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                  Your Trusted Partner for
                  <span className="block text-yellow-400 underline decoration-white/10">All Your Electronics Needs</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                  Customized Electronics Products Design & Manufacturing. We Need Your Problem only. We Will Give You the Solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-yellow-400 hover:text-emerald-950 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg shadow-emerald-900/20"
                  >
                    Our Services
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-white hover:text-emerald-950 hover:scale-105 hover:shadow-xl active:scale-95"
                  >
                    Our Projects
                  </Link>
                </div>

                {/* Stats */}
                {/* Stats Removed as per request */}
              </div>



            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide
                ? 'w-12 bg-yellow-400'
                : 'w-8 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>

      </section>

      {/* ================= SERVICES INTRO ================= */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Image Grid with Floating Animation */}
            <div className="relative">
              <style jsx>{`
                @keyframes float-1 {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-15px); }
                }
                @keyframes float-2 {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(15px); }
                }
                .animate-float-1 {
                  animation: float-1 5s ease-in-out infinite;
                }
                .animate-float-2 {
                  animation: float-2 6s ease-in-out infinite;
                }
              `}</style>

              <div className="grid grid-cols-2 gap-4">
                {/* Column 1: Floats Up/Down */}
                <div className="space-y-4 animate-float-1">
                  <div className="relative w-full h-48 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop"
                      alt="Electronics Lab"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full h-64 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
                      alt="Circuit Design"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Column 2: Floats Down/Up (Diff Rhythm) */}
                <div className="space-y-4 pt-8 animate-float-2">
                  <div className="relative w-full h-64 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop"
                      alt="PCB Board"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full h-48 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
                      alt="Manufacturing"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <p className="text-yellow-600 font-bold uppercase tracking-wider text-sm">ABOUT IRK INNOVATIONS</p>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Complete Electronics Services for
                <span className="block text-emerald-600">Every Industry</span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                IRK Innovations is a leading electronics product design and manufacturing company with over 10 years of industry experience. We specialize in delivering customized, end-to-end solutions that transform ideas into reality.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From initial consultation to final installation, we handle every aspect of product development with precision, quality, and innovation at the core.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-emerald-950 px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg shadow-yellow-400/20"
              >
                Learn More
                <ArrowRight size={20} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SOLUTIONS SECTION ================= */}
      <SolutionsSection />

      {/* ================= SPECIALIZED SERVICES (Green Section) ================= */}
      <section className="py-24 bg-[#143d2d] text-white relative overflow-hidden font-sans">

        {/* Background Pattern */}
        {/* User Patterns - Transparent SVGs */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 text-white opacity-5 pointer-events-none"
        >
          <Circle strokeWidth={1} size={300} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 30, 0], rotate: [12, -5, 12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-24 text-white opacity-5 pointer-events-none"
        >
          <Square strokeWidth={1} size={400} />
        </motion.div>

        <motion.div
          animate={{ x: [0, 20, 0], rotate: [45, 90, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-20 text-white opacity-5 pointer-events-none"
        >
          <Hexagon strokeWidth={1} size={200} />
        </motion.div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-r border-b border-white/20 rounded-br-[100px]"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-tl-full border-t border-l border-white/10"></div>
          <div className="absolute right-10 bottom-10 grid grid-cols-12 gap-2">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/30 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <p className="text-yellow-400 font-bold uppercase tracking-wider text-sm">Our Services</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              Specialized Electrical Services<br />
              for <span className="text-yellow-400">Every Industry</span>
            </h2>
          </div>

          {/* Horizontal Scrolling Container - Hiding Scrollbar Explicitly */}
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 items-stretch hide-scrollbar px-4"
          >
            {[
              {
                number: "01",
                title: "Custom Electronics Design & Manufacturing",
                description: "From idea to mass production — we design, prototype, validate and manufacture customized electronic products.",
                image: "/Custom Electronics Design & Manufacturing.jpg"
              },
              {
                number: "02",
                title: "Electronics Engineering Consulting",
                description: "Expert guidance in product architecture designing, testing, cost optimization, DFM/DFA and bulk manufacturing.",
                image: "/Electronics Engineering Consulting.jpg"
              },
              {
                number: "03",
                title: "Tech Product Sourcing",
                description: "We help to source reliable tech products with quality assurance.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
              },
              // Duplicate Set for Infinite Scroll
              {
                number: "01",
                title: "Custom Electronics Design & Manufacturing",
                description: "From idea to mass production — we design, prototype, validate and manufacture customized electronic products.",
                image: "/Custom Electronics Design & Manufacturing.jpg"
              },
              {
                number: "02",
                title: "Electronics Engineering Consulting",
                description: "Expert guidance in product architecture, testing, cost optimization, DFM/DFA and bulk manufacturing.",
                image: "/Electronics Engineering Consulting.jpg"
              },
              {
                number: "03",
                title: "Tech Product Sourcing",
                description: "We help source reliable tech products directly from China with quality assurance.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="flex-none w-[85vw] sm:w-[400px] group relative rounded-3xl overflow-hidden h-[450px] shadow-2xl border border-white/10"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient - LIGHTENED as per request */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#143d2d]/80 via-[#143d2d]/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="absolute top-8 left-8">
                    <span className="text-6xl font-black text-white/20 select-none">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white relative z-10">
                    {service.title}
                  </h3>

                  <p className="text-gray-100 text-sm leading-relaxed mb-6 pl-4 font-medium backdrop-blur-sm bg-black/10 p-2 rounded-r-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-300 font-medium text-sm">
              Professional Electronics Solutions for Every Need. <Link href="/contact" className="text-yellow-400 underline hover:text-yellow-300">Contact Us Today!</Link>
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US (RE-DESIGNED) ================= */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <p className="text-yellow-600 font-bold uppercase tracking-wider text-sm">WHY CHOOSE US</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Awards and Certifications that<br />Reflect <span className="text-yellow-400">Our Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Licensed Company",
                description: "Certified and registered electronics manufacturing company",
                color: "emerald"
              },
              {
                title: "Insured Service",
                description: "All projects covered with comprehensive warranty",
                color: "yellow"
              },
              {
                title: "Certified Technicians",
                description: "Highly trained and certified electronics engineers",
                color: "emerald"
              },
              {
                title: "Trusted Experts",
                description: "Over 10 years of industry experience and expertise",
                color: "yellow"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                className="relative group p-6 md:p-10 rounded-[40px] bg-gray-50 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]"
              >
                {/* Background Number Accent */}
                <span className="absolute top-6 right-8 text-6xl font-black text-gray-200/40 group-hover:text-emerald-500/10 transition-colors duration-500 select-none">
                  0{index + 1}
                </span>

                {/* Left Accent Bar */}
                <div className={`absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r-full transition-all duration-500 transform scale-y-0 group-hover:scale-y-100 ${item.color === 'emerald' ? 'bg-emerald-600' : 'bg-yellow-400'
                  }`}></div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Bottom Shine Effect */}
                <div className="absolute inset-0 rounded-[40px] border-2 border-transparent group-hover:border-emerald-500/10 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= OUR GOALS / IMAGE GRID ================= */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT COLUMN: Content */}
            <div className="order-2 lg:order-1">
              {/* Subtitle */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                <p className="text-gray-900 font-bold uppercase tracking-wider text-sm">OUR GOALS</p>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Our Goals to Deliver top-notch <span className="text-emerald-600">Electrical Solutions</span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Our goal is to be a leader in providing environmentally conscious electrical services. We focus on energy-efficient solutions and sustainable practices to not only meet industry standards but to exceed them.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {/* Card 1 */}
                <div className="p-6 rounded-3xl border border-gray-100 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">

                  <h3 className="font-bold text-xl mb-3 text-gray-900">Commitment To Innovation</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">We strive to continuously innovate, incorporating modern tech into our workflow.</p>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-3xl border border-gray-100 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">

                  <h3 className="font-bold text-xl mb-3 text-gray-900">Customer-Centric Focus</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">We aim to build long-lasting relationships by providing exceptional service.</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-emerald-950 px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg shadow-yellow-400/20"
                >
                  Know More <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Image Collage */}
            <div className="order-1 lg:order-2 relative">
              {/* Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 sm:h-80 rounded-tl-[60px] rounded-br-[60px] overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop" fill className="object-cover" alt="Worker" />
                </div>
                <div className="relative h-64 sm:h-80 rounded-tr-[60px] rounded-bl-[60px] overflow-hidden mt-8 md:mt-12">
                  {/* FIXED: Replaced broken Engineer image with a reliable one */}
                  <Image src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=600&auto=format&fit=crop" fill className="object-cover" alt="Engineer" />
                </div>
                <div className="relative h-64 sm:h-80 rounded-bl-[60px] rounded-tr-[60px] overflow-hidden -mt-8 md:-mt-12">
                  <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" fill className="object-cover" alt="Circuit" />
                </div>
                <div className="relative h-64 sm:h-80 rounded-br-[60px] rounded-tl-[60px] overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop" fill className="object-cover" alt="Panel" />
                </div>
              </div>

              {/* Center Rotating Logo */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative group cursor-pointer">
                  {/* Spinning Text/Ring */}
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-yellow-400 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] shadow-2xl border-4 border-white">
                    {/* Text Path or simple ring effect */}
                    <svg className="w-full h-full absolute inset-0 text-black/10" viewBox="0 0 100 100">
                      <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                      <text className="text-[10px] font-bold uppercase tracking-widest fill-current">
                        <textPath href="#curve">
                          Irk Innovations • E x c e l l e n c e •
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-27 md:h-24 rounded-full overflow-hidden bg-white shadow-inner animate-[spin_15s_linear_infinite_reverse]">
                      <div className="w-full h-full relative">
                        <Image src="/IRKLogo.jpg" alt="IRK Logo" fill className="object-cover scale-125" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS / ESTIMATES (Green) ================= */}
      <section className="pt-20 pb-10 bg-linear-to-br from-emerald-700 to-emerald-900 text-white relative overflow-hidden">
        {/* Background Patterns - Transparent SVGs */}
        <motion.div
          animate={{ x: [-10, 10, -10], y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 text-white opacity-5 pointer-events-none -rotate-12"
        >
          <Activity strokeWidth={1} size={300} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 text-white opacity-5 pointer-events-none"
        >
          <Circle strokeWidth={1} size={400} />
        </motion.div>

        <motion.div
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -right-16 text-white opacity-5 pointer-events-none"
        >
          <Square strokeWidth={1} size={200} />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Hassle-Free Estimates Just a<br /><span className="text-yellow-400">Click Away</span>
            </h2>
            <p className="text-xl text-white/90">
              Simple, transparent process from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your requirements" },
              { step: "02", title: "Design", desc: "Architecture & PCB design" },
              { step: "03", title: "Manufacturing", desc: "Bulk production with QA" },
              { step: "04", title: "Delivery", desc: "Installation & support" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-black text-white/20 mb-3">{item.step}</div>
                <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>



        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <p className="text-yellow-600 font-bold uppercase tracking-wider text-sm">OUR PORTFOLIO</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Discover Our Latest Insights and<br /><span className="text-emerald-600">Expert Projects</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.isArray(apiProjects) && apiProjects.length > 0 ? (
              (apiProjects.some(p => p.isFeatured) ? apiProjects.filter(p => p.isFeatured) : apiProjects).slice(0, 6).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-500 text-lg">No projects to display at the moment.</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg"
            >
              View All Projects
              <ArrowRight size={20} />
            </Link>
          </div>

        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <p className="text-yellow-600 font-bold uppercase tracking-wider text-sm">FAQ</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Common Questions About Our<br /><span className="text-yellow-400">Electronics Services</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What types of electronics do you manufacture?",
                a: "We manufacture a wide range of electronics including embedded systems, IoT devices, industrial controllers, consumer electronics, and custom PCB assemblies. From concept to mass production."
              },
              {
                q: "What is your typical turnaround time?",
                a: "Turnaround time varies by project complexity. Prototypes typically take 1-2 months, while bulk manufacturing timelines depend on order volume. We provide detailed timelines during consultation."
              },
              {
                q: "Do you offer warranty on your products?",
                a: "Yes, all our products come with comprehensive warranty coverage. The duration varies based on product type and application. We also offer extended warranty options and ongoing support."
              },
              {
                q: "Can you handle international shipping?",
                a: "Absolutely! We have experience shipping globally and can handle all customs, documentation, and logistics. We work with trusted shipping partners to ensure safe delivery worldwide."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-lg font-black text-gray-900 pr-4">
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center transition-transform duration-300 ${expandedFaq === i ? 'rotate-180' : ''}`}>
                    {expandedFaq === i ? (
                      <Minus size={24} className="text-white" strokeWidth={3} />
                    ) : (
                      <Plus size={24} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${expandedFaq === i
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed text-lg border-t-2 border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CONTACT CTA (Parallax & Boxed) ================= */}
      <div className="py-6 bg-white">
        <section className="relative py-8 bg-black overflow-hidden mx-4 md:mx-8 lg:mx-12 rounded-[40px] shadow-2xl isolate">
          {/* Parallax Background Image */}
          <div
            className="absolute inset-0 bg-fixed bg-cover bg-center opacity-40 pointer-events-none -z-10"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2000&auto=format&fit=crop")' }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

              {/* LEFT: Text Content */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  <p className="text-yellow-400 font-bold uppercase tracking-wider text-sm">CONTACT US</p>
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  We're here to answer your<br />
                  <span className="text-yellow-400">questions and help</span>
                </h2>

                <p className="text-gray-300 text-base leading-relaxed mb-8 w-full md:w-5/6">
                  Whether you're planning a new project or need emergency support, we're available to provide fast and reliable assistance.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Link
                    href="/contact"
                    className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-base hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    Contact Us <ArrowRight size={18} />
                  </Link>

                  <span className="text-gray-400 font-bold hidden sm:block">OR</span>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">CALL US ANY TIME</p>
                      <p className="text-white font-black text-lg text-nowrap">+94 76 537 6106</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Contact Form (Moved from Hero) */}
              <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20">
                  <h3 className="text-2xl font-black text-white mb-6">
                    Get a Quote Now!
                  </h3>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleContactChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none font-medium transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleContactChange}
                      required
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none font-medium transition-colors"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleContactChange}
                      required
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none font-medium transition-colors"
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleContactChange}
                      required
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none font-medium resize-none transition-colors"
                    ></textarea>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-3 bg-yellow-400 text-emerald-950 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-yellow-400/20 group"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-950 border-t-transparent group-hover:border-white"></div>
                      ) : (
                        <>Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* ================= BLOG CTA ================= */}
      <section className="py-20 bg-linear-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Discover Our Latest Insights and<br /><span className="text-yellow-400">Expert Advice</span>
          </h2>
          <p className="text-xl mb-10 text-white/90">
            End-to-end electronics design and manufacturing services built for quality, efficiency, and long-term reliability.
          </p>
          <div className="inline-flex items-center group">
            {/* Highlighted Main Text */}
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter text-emerald-950 uppercase italic leading-none">
                IRK
              </span>
              {/* Underline wenuwata podi dot indicator ekak use karamu highlight ekata */}
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5 opacity-80"></div>
            </div>

            {/* Vertical Technical Divider */}
            <div className="h-10 w-[2px] bg-gray-200 mx-4 rotate-12 transition-colors group-hover:bg-yellow-400"></div>

            {/* Supporting Brand Text */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold tracking-[0.3em] text-emerald-700/70 uppercase">
                Innovations
              </span>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">
                Engineering Solutions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      {/* Footer removed from here */}
      {/* Scroll To Top Button removed - now global */}
    </div>
  );
};

export default HomePage;
