// app/api/schools/route.js
import connectDB from '@/lib/connectDB';
import School from '@/models/EdunifySchool';
import EdunifyUsers from '@/models/EdunifyUsers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // Adjust path for App Router
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let schools;
    if (session.user.userType === 'SUPERADMIN') {
      schools = await School.find().populate('createdBy', 'name email');
    } else if (session.user.userType === 'SCHOOLADMIN') {
      schools = await School.find({ createdBy: session.user.id });
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(schools, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== 'SCHOOLADMIN') {
    return NextResponse.json({ error: 'Only schooladmins can add schools' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const schoolData = { ...data, createdBy: session.user.id };
    const school = new School(schoolData);
    await school.save();
    return NextResponse.json(school, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}