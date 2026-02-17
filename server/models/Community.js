import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    icon: { type: String },
    topics: [{ type: String }], // e.g., 'Web Dev', 'AI'
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);
export default Community;
