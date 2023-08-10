
import express from 'express';
const router = express.Router();

import {add, remove, get, getWithIds} from '../controllers/likedCourseController.js';


/**
 * Liked courses API routes
 * POST api/liked-courses
 * POST api/liked-courses/add
 * POST api/liked-courses/remove
 */
router.post('/', get);
router.post('/add', add);
router.post('/remove', remove);
router.post('/ids', getWithIds)


export default router; 