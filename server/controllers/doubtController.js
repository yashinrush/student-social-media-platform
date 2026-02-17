import Doubt from '../models/Doubt.js';

// @desc    Ask a doubt
// @route   POST /api/doubts
// @access  Private
export const askDoubt = async (req, res) => {
    try {
        const { question, subject, description } = req.body;

        const doubt = await Doubt.create({
            author: req.user._id,
            question,
            subject,
            description,
        });

        await doubt.populate('author', 'name profilePic');
        res.status(201).json(doubt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all doubts
// @route   GET /api/doubts
// @access  Public
export const getDoubts = async (req, res) => {
    try {
        const doubts = await Doubt.find()
            .populate('author', 'name profilePic')
            .populate('answers.user', 'name profilePic')
            .sort({ createdAt: -1 });
        res.json(doubts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Answer a doubt
// @route   POST /api/doubts/:id/answer
// @access  Private
export const answerDoubt = async (req, res) => {
    try {
        const { text } = req.body;
        const doubt = await Doubt.findById(req.params.id);

        const answer = {
            user: req.user._id,
            text,
            date: Date.now(),
        };

        doubt.answers.push(answer);
        await doubt.save();

        const populatedDoubt = await Doubt.findById(req.params.id)
            .populate('author', 'name profilePic')
            .populate('answers.user', 'name profilePic');

        res.status(201).json(populatedDoubt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


