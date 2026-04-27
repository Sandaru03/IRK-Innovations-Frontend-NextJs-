import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Project from '../../../models/Project';
import { getAuthUser } from '../../../lib/auth';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const isFull = searchParams.get('full') === 'true';

    let projection = {};
    if (!isFull) {
      projection = {
        title: 1,
        shortDescription: 1,
        mainImage: 1,
        liveLink: 1,
        isFeatured: 1,
        createdAt: 1,
        updatedAt: 1
      };
    }

    const projects = await Project.find({}, projection).sort({ createdAt: -1 });
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
    const { title, description, shortDescription, mainImage, detailImages, liveLink, isFeatured } = body;

    const project = await Project.create({
      title,
      description,
      shortDescription,
      mainImage,
      detailImages,
      liveLink,
      isFeatured
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
