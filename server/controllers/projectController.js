import Project from '../models/Project.js';

// @desc    Add a new project
// @route   POST /api/projects
// @access  Private
export const addProject = async (req, res) => {
    try {
        const { title, description, githubLink, liveLink, techStack } = req.body;

        const project = await Project.create({
            author: req.user._id,
            title,
            description,
            githubLink,
            liveLink,
            techStack: techStack.split(',').map((stack) => stack.trim()), // data sent as comma separated string
        });

        await project.populate('author', 'name profilePic');
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('author', 'name profilePic college')
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

