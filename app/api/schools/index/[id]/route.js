import { getSchoolsById } from "@/models/School";
import { NextResponse } from "next/server";


export const GET = async (req,{params}) => {
    const {id} = await params;
    try {
        const schools = await getSchoolsById(id);
        return NextResponse.json(
            {
                status: 200,
                schools:schools
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