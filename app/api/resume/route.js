import connectMongoDB from '@/libs/mongodb';
import Resume from '@/models/resumeModel';
import User from '@/models/user';
import { NextResponse } from 'next/server';

// Import other necessary modules and models

export async function GET(req) {
    await connectMongoDB();
    const userID = req.nextUrl.searchParams.get('userId');

    if (!userID) {
        return NextResponse.json({
            status: 400,
            message: 'User ID is required for fetching resume',
        });
    }

    const existingResume = await Resume.findOne({ userId: userID });
    return NextResponse.json({ existingResume });
}

export async function POST(req, res) {
    await connectMongoDB();

    const { userId, name, address, email, phone, purpose, experience, project, achievement } = await req.json();

    // Find the resume based on userId
    const existingResume = await Resume.findOne({ userId });
    let resumeId;


    if (existingResume) {
        // If the resume exists, update it
        await existingResume.updateOne({
            name,
            address,
            email,
            phone,
            purpose,
            experience,
            project,
            achievement,
        });
        resumeId = existingResume._id;

    } else {
        // If the resume doesn't exist, create a new one
        const newResume = new Resume({
            userId,
            name,
            address,
            email,
            phone,
            purpose,
            experience,
            project,
            achievement,
        });

        const savedResume = await newResume.save();

        // Get the resumeId after the save
        resumeId = savedResume._id;
        }

    return NextResponse.json({
        status: 201,
        message: 'Resume created/updated successfully',
        resumeId: resumeId,

    });
}