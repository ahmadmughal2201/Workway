import connectMongoDB from "@/libs/mongodb";
import JobListing from "@/models/jobModel";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
  const { id } = params;
  const {recruiterID:recruiterID,title: title, description: description, dueDate: dueDate, active: active } = await request.json();
  await connectMongoDB;
  await JobListing.findByIdAndUpdate(id, { recruiterID, title, description, dueDate, active});
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const Job= await JobListing.find({recruiterID: id }).populate('recruiterID');
  return NextResponse.json({ Job }, { status: 200 });
}
