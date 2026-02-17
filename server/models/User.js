import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: String, default: '' },
    branch: { type: String, default: '' },
    year: { type: String, default: '' }, // e.g., "1st Year", "2024"
    bio: { type: String, default: '' },
    skills: [{ type: String }],
    profilePic: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    socialLinks: {
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        instagram: { type: String, default: '' }
    },
    points: { type: Number, default: 0 }, // For Leaderboard
    badges: [{ type: String }], // 'Top Contributor', 'Verified'
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
