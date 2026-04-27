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
    // Construct a new object to avoid TS type errors assigning string to ObjectId
    return {
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt?.toString(),
      updatedAt: project.updatedAt?.toString(),
    };
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
    title: `${project.title || 'Untitled'} | IRK Innovations`,
    description: project.shortDescription || '',
    openGraph: {
      title: `${project.title || 'Untitled'} | IRK Innovations`,
      description: project.shortDescription || '',
      images: [
        {
          url: project.mainImage || '',
          width: 800,
          height: 600,
          alt: project.title || 'Project image',
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
