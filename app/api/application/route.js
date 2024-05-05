// Import necessary modules and models
import connectMongoDB from '@/libs/mongodb';
import Application from '@/models/applicationModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectMongoDB();

    try {
        const { jobID, applicantID } = await req.json();

        // Find the existing application or create a new one if it doesn't exist
        const existingApplication = await Application.findOne({ jobID });

        if (existingApplication) {
            // If the application exists, add the new applicant to the array
            existingApplication.applicantIDs.push(applicantID);
            await existingApplication.save();

            return NextResponse.json({
                status: 200,
                message: 'Applicant added to the application successfully',
                application: existingApplication,
            });
        } else {
            // If the application doesn't exist, create a new one with the applicant
            const newApplication = new Application({
                jobID,
                applicantIDs: [applicantID],
            });

            // Save the new application to the database
            await newApplication.save();

            return NextResponse.json({
                status: 201,
                message: 'Application created successfully',
                application: newApplication,
            });
        }
    } catch (error) {
        console.error('Error processing application:', error.message);
        return NextResponse.json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}


export async function GET(req) {
    await connectMongoDB();

    try {
        const  jobId  = req.nextUrl.searchParams.get('jobID');

        // Check if jobId is provided in the request
        if (!jobId) {
            return NextResponse.json({
                status: 400,
                message: 'Job ID is required for fetching applications',
            });
        }

        const applications = await Application.find({ jobID: jobId }).populate('jobID applicantIDs');

        return NextResponse.json({ applications });
    } catch (error) {
        console.error('Error fetching applications:', error.message);
        return NextResponse.json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}
