import express from 'express';
import { addProject, getProjects } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getProjects)
    .post(protect, addProject);

export default router;
