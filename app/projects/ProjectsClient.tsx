"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';

const ProjectsClient = ({ initialProjects }: { initialProjects: any[] }) => {
  const [projects, setProjects] = useState<any[]>(initialProjects || []);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = (projects || []).filter(project => {
    if (!project) return false;
    const title = (project.title || "").toLowerCase();
    const description = (project.description || "").toLowerCase();
    const shortDescription = (project.shortDescription || "").toLowerCase();
    const search = (searchTerm || "").toLowerCase();

    return title.includes(search) ||
      description.includes(search) ||
      shortDescription.includes(search);
  });

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-48 pb-20 bg-[#143d2d] overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
            Our <span className="text-yellow-400 underline decoration-white/10">Projects</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover how we've helped industries transform with cutting-edge
            electronics, automation, and industrial engineering solutions.
          </p>
        </div>
      </section>

      {/* ================= TOOLBAR (Filter & Search) ================= */}
      <section className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            {/* Search Bar - Centered */}
            <div className="w-full max-w-xl mx-auto">

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search projects by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

          </div>
        </div>


      </section>
      {/* ================= PROJECTS GRID ================= */}
      <section className="py-20 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredProjects.map((project, index) => (
                  <div key={project._id} className="group transition-all duration-500">
                    <ProjectCard project={project} priority={index < 3} />
                  </div>
                ))}
              </motion.div>
            ) : (
            <div className="text-center py-24">
              <div className="inline-block p-12 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-black text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">We couldn't find any projects matching your current search or filter criteria.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-emerald-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
          </AnimatePresence>
        </div>

      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#143d2d] rounded-[3rem] p-10 md:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden isolate">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Have a custom project in mind?</h2>
              <p className="text-emerald-100 text-lg opacity-80 leading-relaxed">
                We specialize in turning unique ideas into high-performance industrial solutions.
                Let's discuss how we can engineer your vision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-yellow-400 text-emerald-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-xl shadow-yellow-400/20 text-center"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer removed */}
    </div>
  );
};

export default ProjectsClient;
