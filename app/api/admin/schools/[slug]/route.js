// app/api/schools/[slug]/route.js
import connectDB from '@/lib/connectDB';
import School from '@/models/EdunifySchool';
import EdunifyUsers from '@/models/EdunifyUsers'; // Import to ensure registration
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const { slug } = params; // Correct destructuring (no await needed)
  console.log('Slug:', slug); // Debugging line

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const school = await School.findOne({ slug }).populate('createdBy', 'name email');
    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    // Role-based access check
    if (!session.user.userType === 'SCHOOLADMIN' && school.createdBy._id.toString() !== session.user.id) {
      return NextResponse.json({ error: 'You can only access your own schools' }, { status: 403 });
    }

    return NextResponse.json(school, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const { slug } = await params;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const school = await School.findOne({ slug });
    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    if (session.user.userType !== 'SCHOOLADMIN' && school.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: 'You can only edit your own schools' }, { status: 403 });
    }

    const data = await req.json();
    const updatedSchool = await School.findOneAndUpdate({ slug }, data, { new: true });
    return NextResponse.json(updatedSchool, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const { slug } = params;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const school = await School.findOne({ slug });
    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    if (session.user.userType !== 'SCHOOLADMIN' && school.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: 'You can only delete your own schools' }, { status: 403 });
    }

    await School.deleteOne({ slug });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}