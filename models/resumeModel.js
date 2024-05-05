import mongoose, { Schema, models } from "mongoose";
import User from "./user";

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model, update it accordingly
        required: true,
        unique:true,
    },
    name: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    purpose: {
        type: String,
        required: false,
    },
    experience: {
        type: String,
        required: false,
    },
    project: {
        type: String,
        required: false,
    },
    achievement: {
        type: String,
        required: false,
    },

},
    { timestamps: true }
);


const Resume = models.Resume || mongoose.model('Resume', resumeSchema);


module.exports = Resume;
