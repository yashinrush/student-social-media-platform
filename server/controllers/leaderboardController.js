import User from '../models/User.js';

// @desc    Get leaderboard users
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
    try {
        // Top 10 users by points
        const users = await User.find({})
            .sort({ points: -1 })
            .limit(10)
            .select('name profilePic points college branch');

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
