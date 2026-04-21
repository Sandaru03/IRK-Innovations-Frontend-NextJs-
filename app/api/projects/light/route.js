import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Project from '../../../../models/Project';

// Lightweight projects list: no images, only summary fields
export async function GET() {
  try {
    await dbConnect();
    // Only select summary fields, exclude images and description
    const projects = await Project.find({}, {
      title: 1,
      shortDescription: 1,
      liveLink: 1,
      createdAt: 1,
      updatedAt: 1,
      // _id is always included by default
    }).sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('API Error /projects/light:', error);
    return NextResponse.json({ message: 'Error fetching projects', error: error.message }, { status: 500 });
  }
}
