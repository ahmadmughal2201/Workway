import mongoose, { Schema, models } from "mongoose";

const resumeAuditTableSchema = new Schema({
    oldData: {
        type: Object,
        required: true,
    },
    newData: {
        type: Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    // Other fields you might want to include in the audit table
}, { timestamps: true });

const ResumeAudit = models.ResumeAudit || mongoose.model('ResumeAudit', resumeAuditTableSchema);
module.exports = ResumeAudit;
