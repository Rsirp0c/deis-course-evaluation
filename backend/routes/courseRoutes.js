import express from 'express';
const router = express.Router();

import { getCourses, getCourse, getEvalWithIds } from '../controllers/coursesController.js';

/**
 * Courses API routes
 * GET api/courses
 * GET api/courses/:id
 * POST api/courses/reviews
 */
router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/reviews', getEvalWithIds);

export default router;
