import express from 'express';
const router = express.Router();

import { index, getEvalWithIds } from '../controllers/coursesController.js';

/**
 * Courses API routes
 * GET api/courses
 * GET api/courses/reviews
 */
router.get('/', index);
router.post('/reviews', getEvalWithIds);

export default router;
