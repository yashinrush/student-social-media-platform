import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
    poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recruiter or Student
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String }, // Remote, Bangalore, etc.
    stipend: { type: String },
    description: { type: String, required: true },
    skillsRequired: [{ type: String }],
    applyLink: { type: String }, // External link or email
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // If applying within app
}, { timestamps: true });

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
