import Post from '../models/Post.js';
import User from '../models/User.js';

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        let image = '';

        if (req.file) {
            image = `/${req.file.path.replace(/\\/g, '/')}`; // Normalize path
        }

        const post = await Post.create({
            author: req.user._id,
            content,
            images: image ? [image] : [],
        });

        // Populate author details immediately
        await post.populate('author', 'name profilePic');

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name profilePic college')
            .populate('comments.user', 'name profilePic')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.includes(req.user._id)) {
            // Unlike
            post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
        } else {
            // Like
            post.likes.push(req.user._id);
        }

        await post.save();
        res.json(post.likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Comment on a post
// @route   POST /api/posts/:id/comment
// @access  Private
export const commentPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        const comment = {
            user: req.user._id,
            text,
            date: Date.now(),
        };

        post.comments.push(comment);
        await post.save();

        // Populate the user of the new comment to return it
        const populatedPost = await Post.findById(req.params.id).populate('comments.user', 'name profilePic');
        const newComment = populatedPost.comments[populatedPost.comments.length - 1];

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






