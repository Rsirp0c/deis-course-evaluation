
import express from 'express';
const router = express.Router();

import {add, remove, get} from '../controllers/likedCourseController.js';


/**
 * Liked courses API routes
 * GET api/liked-courses
 * POST api/liked-courses/add
 * POST api/liked-courses/remove
 */
router.get('/', get);
router.post('/add', add);
router.post('/remove', remove);


export default router; 