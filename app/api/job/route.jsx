const express = require('express');
const JobListing = require('../../../models/jobModel');
import Tags from '@/models/tagModel';
import User from '@/models/user';
import connectMongoDB from '@/libs/mongodb';
import { NextResponse } from 'next/server';

await connectMongoDB()


export async function GET(req, res) {
   const recruiterID = req.nextUrl.searchParams.get('recruiterID');
   console.log('route=', recruiterID)
   if (recruiterID) {
      // Retrieve jobs for the specified recruiter ID
      const jobs = await JobListing.find({ recruiterID }).populate('tags').populate('recruiterID');

      // Return the filtered jobs as JSON
      return NextResponse.json({ jobs });
   } else {
      // Retrieve all jobs
      const jobs = await JobListing.find({}).populate('tags').populate('recruiterID');

      // Return all jobs as JSON
      return NextResponse.json({ jobs });
   }
}

export async function POST(req, res) {
   try {
      // Extract data from the request body
      const { recruiterID, title, description, dueDate, active, tags } = await req.json();

      // Create a new job instance
      await JobListing.create({ recruiterID, title, description, dueDate, active, tags });
      return NextResponse.json({ message: 'job published' }, { status: 201 });

      // Return the response
      return new Response('success added');
   } catch (error) {
      console.error('Error in POST method:', error);
      return NextResponse.json({ message: 'Failed to publish job' }, { status: 500 });
   }
}

export async function DELETE(req, res) {
   try {
      // Extract the job ID from the request URL
      const jobID = req.nextUrl.searchParams.get('id');

      // Delete the job from the database
      await JobListing.findByIdAndDelete(jobID);
      return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });

      // Return the response
      return new Response('success deleted');
   } catch (error) {
      console.error('Error in DELETE method:', error);
      return NextResponse.json({ message: 'Failed to delete job' }, { status: 500 });
   }
}

export async function PUT(req) {
   try {
      await connectMongoDB();

      // Extract data from the request body
      const { _id,  hiredID } = await req.json();

      // Find the user by userID and update the resumeID
      const updatedJob = await JobListing.findByIdAndUpdate(
         _id,
         { $set: { hiredID } },
         { new: true } // Return the updated user
      );

      if (updatedJob) {
         return NextResponse.json({ job: updatedJob });
      } else {
         return NextResponse.json({
            status: 404,
            message: 'job not found',
         });
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json({
         status: 500,
         message: 'Internal Server Error',
      });
   }
}

