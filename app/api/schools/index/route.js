import { addSchool, getSchools } from "@/models/School";
import { NextResponse } from "next/server";
const { uploadMedia } = require("@/utils/uploadMedia");

export const POST = async (req) => {
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const address = formData.get("address");
        const contact = formData.get("contact");
        const city = formData.get("city");
        const state = formData.get("state");
        const email_id = formData.get("email_id");
        const file = formData.get("image");
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        if (!file) {
            return NextResponse.json(
                {
                    status: 400,
                    error: "Image file required",
                },
                { status: 400 }
            );
        }

        if (file.size > 500 * 1024) {
            return NextResponse.json(
                {
                    status: 400,
                    error: "Image size exceeds 500 KB. Please upload a smaller file.",
                },
                { status: 400 }
            );
        }

        // Convert the image file to a Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let mediaUrl;

        try {
            const mediaDetails = await uploadMedia(buffer, "edunify");
            mediaUrl = mediaDetails.url;
        } catch (uploadError) {
            console.error("Error uploading media:", uploadError.message);
            return NextResponse.json(
                {
                    status: 500,
                    error: "Failed to upload media. School details not saved.",
                },
                { status: 500 }
            );
        }

        const result = await addSchool({
            slug,
            name,
            address,
            city,
            state,
            contact,
            email_id,
            image: mediaUrl,
        });

        return NextResponse.json(
            {
                status: 201,
                message: "School added successfully!",
                school: result,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST handler:", error.message);
        return NextResponse.json(
            {
                status: 500,
                error: `Failed to add school: ${error.message}`,
            },
            { status: 500 }
        );
    }
};

export const GET = async (req) => {
    try {
        const schools = await getSchools();
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