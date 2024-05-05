import mongoose, { Schema, models } from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobListing',
        required: true,
    },
    applicantIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],

},
    { timestamps: true }
);

const Application = models.Application || mongoose.model('Application', applicationSchema);
module.exports = Application;
