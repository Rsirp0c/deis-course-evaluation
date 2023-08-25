
import express from 'express';
const router = express.Router();
import { create, read, readWithIds} from '../controllers/evaluationsController.js';

/**
 * Evaluations API routes
 * GET api/evaluations/forms
 * POST api/evaluations?course=course&semester=semester&professor=professor
 * POST api/evaluations/user
 */
router.post('/forms', create);
router.get('/', read);
router.post('/user', readWithIds);


export default router; 