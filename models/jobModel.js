import mongoose, { Schema, models } from "mongoose";

const jobSchema = new mongoose.Schema({
    recruiterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model, update it accordingly
        required: true,
    },
    hiredID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model, update it accordingly
    },
    title: String,
    description: String,
    dueDate: Date,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }], // Array of tag references
    active: Boolean,
},
    { timestamps: true }
);

const JobListing = models.JobListing || mongoose.model('JobListing', jobSchema);

module.exports = JobListing;
