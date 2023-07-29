import express from 'express';
const router = express.Router();

import { index, display } from '../controllers/coursesController.js';

/**
 * Courses API routes
 * GET api/courses
 * GET api/courses/courseId
 */
router.get('/', index);
router.get('/:id', display);

export default router;
