import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ project, priority = false }) => {
  return (
    <Link href={`/projects/${project._id}`} className="group flex flex-col h-full bg-transparent">
      
      {/* Image Section - Large Rounded Corners */}

      <div className="relative h-64 w-full overflow-hidden rounded-[32px] mb-6 shadow-sm">
        {project.mainImage ? (
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // fallback to local image if Supabase or remote image fails
              e.target.onerror = null;
              e.target.src = "/fallback-project.png";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400 text-2xl font-bold">
            No Image
          </div>
        )}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
        
        {/* Project Number Badge */}
        {project.projectNumber > 0 && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-900 px-3 py-1 rounded-full text-xs font-black shadow-sm border border-emerald-100 z-10">
            Project #{project.projectNumber}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col grow px-2">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription || project.description}
        </p>

        {/* Read More Link (now as a div since parent is a Link) */}
        <div 
          className="mt-auto inline-flex items-center gap-2 text-[#143d2d] font-bold text-sm group-hover:gap-3 transition-all duration-300"
        >
          Read More <ArrowRight size={18} />
        </div>
      </div>

    </Link>
  );
};

export default ProjectCard;