import Community from '../models/Community.js';

// @desc    Create a new community
// @route   POST /api/communities
// @access  Private
export const createCommunity = async (req, res) => {
    try {
        const { name, description, topics } = req.body;

        const community = await Community.create({
            name,
            description,
            admin: req.user._id,
            members: [req.user._id],
            topics: topics.split(',').map(t => t.trim()),
        });

        res.status(201).json(community);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all communities
// @route   GET /api/communities
// @access  Public
export const getCommunities = async (req, res) => {
    try {
        const communities = await Community.find()
            .populate('members', 'name profilePic')
            .sort({ createdAt: -1 });
        res.json(communities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Join a community
// @route   PUT /api/communities/:id/join
// @access  Private
export const joinCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        if (community.members.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already a member' });
        }

        community.members.push(req.user._id);
        await community.save();

        res.json(community);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
