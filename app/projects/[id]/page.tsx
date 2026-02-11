import React from 'react';
import { Metadata } from 'next';
import dbConnect from '../../../lib/db';
import Project from '../../../models/Project';
import ProjectDetailsClient from '../../../components/ProjectDetailsClient';

async function getProject(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id).lean(); // lean() for plain JS objects
    if (!project) return null;
    
    // Convert _id and dates to string to pass to client component
    project._id = project._id.toString();
    project.createdAt = project.createdAt?.toString();
    project.updatedAt = project.updatedAt?.toString();
    
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: 'Project Not Found | IRK Innovations',
    };
  }

  return {
    title: `${project.title} | IRK Innovations`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | IRK Innovations`,
      description: project.shortDescription,
      images: [
        {
          url: project.mainImage,
          width: 800,
          height: 600,
          alt: project.title,
        },
      ],
    },
  };
}

const ProjectDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const project = await getProject(id);

  return <ProjectDetailsClient project={project} />;
};

export default ProjectDetailsPage;
