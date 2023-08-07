
import express from 'express';
const router = express.Router();
import { create, read } from '../controllers/reviewController.js';

/**
 * review API routes
 * GET api/review/forms
 * POST api/review?course=course&semester=semester&professor=professor
 */
router.post('/forms', create);
router.get('/', read);


export default router; 