
import express from 'express';
const router = express.Router();

import {add, get, getWithIds} from '../controllers/likedCourseController.js';


/**
 * Liked courses API routes
 * POST api/liked-courses
 * POST api/liked-courses/add
 * POST api/liked-courses/ids
 */
router.post('/', get);
router.post('/add', add);
router.post('/ids', getWithIds)


export default router; 