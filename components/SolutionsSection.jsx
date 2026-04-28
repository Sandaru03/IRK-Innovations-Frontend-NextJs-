import React from 'react';
import Image from 'next/image';

const solutions = [
  {
    title: "Engineering Consultation",
    description: "Expert guidance in embedded product design, feasibility studies, and manufacturing strategies.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
  },
  {
    title: "System Architecture & PCB Design",
    description: "Professional PCB layout and architecture\noptimized for performance and cost.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
  },
  {
    title: "Cost & BOM Optimization",
    description: "Strategic component selection and Bill of Materials optimization to maximize value.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
  },
  {
    title: "DFM & DFA Analysis",
    description: "Optimized design and assembly reviews\nensuring seamless production scalability.",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=800",
  },
  {
    title: "Product Testing & QA",
    description: "Comprehensive testing protocols including functional, environmental, and reliability testing.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
  },
  {
    title: "Bulk Manufacturing",
    description: "End-to-end manufacturing services from prototyping to high-volume production waves.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=800",
  }
];

const SolutionsSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <p className="text-yellow-600 font-bold uppercase tracking-wider text-sm">OUR EXPERTISE</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Comprehensive Solutions for<br />
            <span className="text-emerald-700">Modern Challenges</span>
          </h2>
        </div>

        {/* Grid of Cards - 3 columns on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {solutions.map((item, index) => (
            <div key={index} className="flex flex-col group h-full">
              {/* Image Card - Top */}
              <div className="w-full h-52 rounded-[32px] overflow-hidden shadow-lg relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-emerald-900/0 transition-colors duration-500"></div>
              </div>

              {/* Content Card - Overlapping Bottom */}
              <div className="mx-4 -mt-16 bg-white p-8 rounded-[32px] shadow-xl relative z-10 transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center grow">
                <h3 className="text-lg font-black text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
