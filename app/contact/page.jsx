"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, ArrowRight, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) setHeaderHeight(header.offsetHeight);
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/contact`, formData);
      toast.success(response.data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { 
      icon: <Phone size={24} />, 
      title: "Call Us", 
      content: "+94 76 537 6106", 
      sub: "Mon-Fri 9am-6pm",
      link: "tel:+94765376106" 
    },
    { 
      icon: <Mail size={24} />, 
      title: "Email Us", 
      content: "irkinnovations2022@gmail.com", 
      sub: "Online support 24/7",
      link: "mailto:irkinnovations2022@gmail.com" 
    },
    { 
      icon: <MapPin size={24} />, 
      title: "Visit Us", 
      content: "Sample", 
      sub: "Colombo, Sri Lanka",
      link: "#" 
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <NavBar />
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 bg-[#143d2d] overflow-hidden" style={{ marginTop: headerHeight }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Get In <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or need technical consultation? Our engineering team is ready to help you innovate.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* INFO SIDEBAR (4 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-10">Reach out to us through any of these channels. We typically respond within 24 hours.</p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <a href={item.link} key={i} className="flex gap-6 p-6 bg-gray-50 rounded-4xl border border-gray-100 hover:border-emerald-200 hover:bg-white hover:shadow-xl transition-all group">
                  <div className="bg-emerald-900 text-yellow-400 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-black text-lg uppercase tracking-tight">{item.title}</h3>
                    <p className="text-emerald-700 text-lg font-bold">{item.content}</p>
                    <p className="text-gray-500 text-sm">{item.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* URGENT CARD */}
            <div className="bg-yellow-400 rounded-[2.5rem] p-8 mt-12 relative overflow-hidden shadow-2xl shadow-yellow-400/20">
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-emerald-950 mb-2 italic uppercase">Urgent Inquiry?</h3>
                <p className="text-emerald-900 font-bold mb-6">Skip the form and call our engineering hotline.</p>
                <a href="tel:+94765376106" className="inline-flex items-center gap-3 bg-emerald-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-colors">
                  <Phone size={20} /> Call Now
                </a>
              </div>
              <Phone size={200} className="absolute -right-10 -bottom-10 text-emerald-950 opacity-5 rotate-12" />
            </div>
          </div>

          {/* FORM SECTION (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 relative">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <MessageSquare size={28} />
                </div>
                <h2 className="text-3xl font-black text-gray-900">Send a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-emerald-900 uppercase tracking-widest ml-1">Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all text-gray-900 font-medium"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-emerald-900 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all text-gray-900 font-medium"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-emerald-900 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" name="subject" value={formData.subject} onChange={handleChange} required
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all text-gray-900 font-medium"
                    placeholder="E.g. PCB Design Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-emerald-900 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    name="message" rows={5} value={formData.message} onChange={handleChange} required
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all text-gray-900 font-medium resize-none"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-emerald-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/20 transition-all flex justify-center items-center gap-3 group disabled:opacity-70"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
                  ) : (
                    <>Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
