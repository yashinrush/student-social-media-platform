import express from 'express';
import { askDoubt, getDoubts, answerDoubt } from '../controllers/doubtController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getDoubts)
    .post(protect, askDoubt);

router.route('/:id/answer').post(protect, answerDoubt);

export default router;
