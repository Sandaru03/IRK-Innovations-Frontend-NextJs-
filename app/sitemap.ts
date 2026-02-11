import { MetadataRoute } from 'next';
import dbConnect from '../lib/db';
import Project from '../models/Project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://irkinnovations.com'; // Replace with actual domain

  // Static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic routes (Projects)
    await dbConnect();
    const projects = await Project.find({}, '_id updatedAt').lean();
    
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project._id}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...routes, ...projectRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return routes;
  }
}
