const express = require('express');
import connectMongoDB from '@/libs/mongodb';
import { NextResponse } from 'next/server';
import Tags from '@/models/tagModel';

connectMongoDB();

export async function GET(req) {
    const tag = await Tags.find({});

    return NextResponse.json({tag})

}

export async function POST(req) {
    try {
        const { title, popularity, active } = await req.json();
        const tag = await Tags.create({ title, popularity, active });
        return NextResponse.json(tag, { status: 201 });
    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}