
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Project from './models/Project.js';
import Internship from './models/Internship.js';
import Doubt from './models/Doubt.js';
import Community from './models/Community.js';
import Message from './models/Message.js';
import Notification from './models/Notification.js';

dotenv.config();

const resetDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Delete all data
        await User.deleteMany();
        await Post.deleteMany();
        await Project.deleteMany();
        await Internship.deleteMany();
        await Doubt.deleteMany();
        await Community.deleteMany();
        await Message.deleteMany();
        await Notification.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

resetDb();
