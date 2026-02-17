import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    githubLink: { type: String },
    liveLink: { type: String },
    techStack: [{ type: String }], // e.g., ['React', 'Node.js']
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
