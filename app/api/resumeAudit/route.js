// Import necessary modules and models
import connectMongoDB from '@/libs/mongodb';
import ResumeAudit from '@/models/resumeAuditTable';
import { NextResponse } from 'next/server';


// Other imports and configurations...

export async function POST(req, res) {
    await connectMongoDB();
    try {
        // Extract data from the request body
        const { resumeID, updatedData } = await req.json();
        console.log('route res id',resumeID)

        // Check if there is an existing item with the same Resume ID
        const existingAuditEntry = await ResumeAudit.findOne({ newData: resumeID });

        if (existingAuditEntry) {
            // If an entry already exists, update only oldData
            existingAuditEntry.newData = resumeID;
            await existingAuditEntry.save();
        } else {
            // If no entry exists, create a new entry with both oldData and newData
            await ResumeAudit.create({ oldData: resumeID, newData: resumeID });
        }

        return NextResponse.json({ message: 'Audit entry added' }, { status: 201 });
    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: 'Failed to add audit entry' }, { status: 500 });
    }
}
