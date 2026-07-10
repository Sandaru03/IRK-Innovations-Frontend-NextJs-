import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Admin from '../../../models/Admin';
import { getAuthUser } from '../../../lib/auth';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const admins = await Admin.find({}, { password: 0 }); // Exclude password from results
    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error('API Error /admins:', error);
    return NextResponse.json({ message: 'Error fetching admins', error: error.message }, { status: 500 });
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
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
       return NextResponse.json({ message: 'Admin with this email already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email,
      password: hashedPassword
    });

    return NextResponse.json({
      _id: admin._id,
      email: admin.email
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
