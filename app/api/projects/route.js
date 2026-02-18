import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Project from '../../../models/Project';
import { getAuthUser } from '../../../lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('API Error /projects:', error);
    return NextResponse.json({ message: 'Error fetching projects', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, shortDescription, mainImage, detailImages, liveLink } = body;

    if (!title || !description || !shortDescription || !mainImage) {
      return NextResponse.json({ message: 'Please add all required fields' }, { status: 400 });
    }

    const project = await Project.create({
      title,
      description,
      shortDescription,
      mainImage,
      detailImages,
      liveLink
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
