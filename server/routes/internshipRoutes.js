import express from 'express';
import { postInternship, getInternships } from '../controllers/internshipController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getInternships)
    .post(protect, postInternship);

export default router;
