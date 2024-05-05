const express = require('express');
import connectMongoDB from '@/libs/mongodb';
import { NextResponse } from 'next/server';
import Tags from '@/models/tagModel';

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const tag= await Tags.findOne({ _id: id });
    return NextResponse.json({ tag }, { status: 200 });
  }