import User from '../models/User.js';
import Post from '../models/Post.js';

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
            res.json({ ...user._doc, posts });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.bio = req.body.bio || user.bio;
            user.college = req.body.college || user.college;
            user.branch = req.body.branch || user.branch;
            user.year = req.body.year || user.year;
            user.skills = req.body.skills ? req.body.skills.split(',').map(s => s.trim()) : user.skills;

            if (req.body.profilePic) {
                user.profilePic = req.body.profilePic;
            }

            if (req.body.password) {
                // Hash password logic needs to be here if we were updating password directly, 
                // but for now we skip standard password update in this route to keep it simple
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profilePic: updatedUser.profilePic,
                token: req.body.token, // Keep the same token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
