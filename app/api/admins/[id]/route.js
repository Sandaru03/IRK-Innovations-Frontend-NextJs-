import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Admin from '../../../../models/Admin';
import { getAuthUser } from '../../../../lib/auth';

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { id } = await params;

    // Prevent deleting the currently logged-in admin
    if (user.id === id) {
      return NextResponse.json({ message: 'Cannot delete your own admin account' }, { status: 400 });
    }

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Admin deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error /admins/[id] DELETE:', error);
    return NextResponse.json({ message: 'Error deleting admin', error: error.message }, { status: 500 });
  }
}
