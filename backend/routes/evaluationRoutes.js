
import express from 'express';
const router = express.Router();
import { create, read } from '../controllers/evaluationsController.js';

/**
 * Evaluations API routes
 * GET api/evaluations/forms
 * POST api/evaluations?course=course&semester=semester&professor=professor
 */
router.post('/forms', create);
router.get('/', read);


export default router; 