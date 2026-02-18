import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Project from '../../../../models/Project';
import { getAuthUser } from '../../../../lib/auth';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Note: params is a promise in recent Next.js versions, but in 15/16 route handlers it's often passed directly or awaited.
    // To be safe, let's treat it as an object we can destructure if the middleware has unwrapped it, 
    // but in standard Route Handlers `params` is available.
    
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error(`API Error /projects/${params.id} GET:`, error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { id } = await params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    const body = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error(`API Error /projects/${params.id} PUT:`, error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { id } = await params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    await project.deleteOne();
    return NextResponse.json({ message: 'Project removed' });
  } catch (error) {
    console.error(`API Error /projects/${params.id} DELETE:`, error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
