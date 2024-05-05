import connectMongoDB from '@/libs/mongodb';
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req) {
  await connectMongoDB();
  const userID = req.nextUrl.searchParams.get('userId');

  if (!userID) {
    return NextResponse.json({
      status: 400,
      message: 'User ID is required for fetching user',
    });
  }

  const user = await User.findOne({ _id: userID });
  return NextResponse.json({ user });
}

export async function PUT(req) {
  try {
    await connectMongoDB();

    // Extract data from the request body
    const { userId, resumeID} = await req.json();

    // Find the user by userID and update the resumeID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { resumeID } },
      { new: true } // Return the updated user
    );

    if (updatedUser) {
      return NextResponse.json({ user: updatedUser });
    } else {
      return NextResponse.json({
        status: 404,
        message: 'User not found',
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
