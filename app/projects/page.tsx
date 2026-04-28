import React from 'react';
import dbConnect from '../../lib/db';
import Project from '../../models/Project';
import ProjectsClient from './ProjectsClient';

export const dynamic = 'force-dynamic';

async function getProjects() {
  await dbConnect();
  // Fetching essential fields for the grid to keep it fast
  const projects = await Project.find({}, {
    title: 1,
    shortDescription: 1,
    description: 1,
    mainImage: 1,
    isFeatured: 1,
    createdAt: 1
  }).sort({ createdAt: -1 }).lean();
  
  // Convert _id to string for serialization
  return projects.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString() || null
  }));
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ProjectsClient initialProjects={projects} />;
}
