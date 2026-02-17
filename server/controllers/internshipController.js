import Internship from '../models/Internship.js';

// @desc    Post an internship
// @route   POST /api/internships
// @access  Private
export const postInternship = async (req, res) => {
    try {
        const { company, role, location, stipend, description, skillsRequired, applyLink } = req.body;

        const internship = await Internship.create({
            poster: req.user._id,
            company,
            role,
            location,
            stipend,
            description,
            skillsRequired: skillsRequired.split(',').map(skill => skill.trim()),
            applyLink,
        });

        await internship.populate('poster', 'name profilePic');
        res.status(201).json(internship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req, res) => {
    try {
        const internships = await Internship.find()
            .populate('poster', 'name profilePic college')
            .sort({ createdAt: -1 });
        res.json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
