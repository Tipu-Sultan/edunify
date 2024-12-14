import { deleteSchoolsById, getSchoolsById } from "@/models/School";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary (if not already done)
cloudinary.config({
    cloud_name: process.env.MY_CLOUD_NAME,
    api_key: process.env.MY_API_KEY,
    api_secret: process.env.MY_API_SECRET,
});

export const GET = async (req, { params }) => {
    const { id } = await params;
    try {
        const schools = await getSchoolsById(id);
        return NextResponse.json(
            {
                status: 200,
                schools: schools
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: 500,
                error: `Failed to get school: ${error.message}`,
            },
            { status: 500 }
        );
    }
};

export const DELETE = async (req, { params }) => {
    const { id } = await params;
    try {
        const schools = await getSchoolsById(id);
    // Check if the post has a media URL
        if (schools?.image) {
            // Extract the public ID and resource type
            const publicId = schools?.image.split('/').slice(-1)[0].split('.')[0];
            const lastId = `edunify/${publicId}`;

            // Check the file type (image or video)
            const isVideo =  schools?.image.includes('video');

            // Delete the media from Cloudinary
            const cloudinaryResult = await cloudinary.uploader.destroy(lastId, {
                resource_type: isVideo ? 'video' : 'image',
            });

            if (cloudinaryResult.result !== 'ok') {
                console.error('Error deleting file from Cloudinary:', cloudinaryResult);
                return NextResponse.json(
                    { error: 'Error deleting file from Cloudinary.' },
                    { status: 500 }
                );
            }
        }
        await deleteSchoolsById(id);
        return NextResponse.json(
            {
                status: 200,
                message: 'schools deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: 500,
                error: `Failed to get school: ${error.message}`,
            },
            { status: 500 }
        );
    }
};