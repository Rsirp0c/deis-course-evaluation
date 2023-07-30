import express from 'express';
const router = express.Router();


import { googleOauthHandler } from '../controllers/oauthController.js';
import { login, register, remove, getUser } from '../controllers/authController.js';

/**
 * Auth API routes
 * POST auth/oauth/google
 * POST auth/login
 * POST auth/register
 * DELETE auth/:id
 */

// Convention to use post to send data to the server and in this case also to retrieve a JWT
// Post: changes the state of the server, can retrieve data
// Get: does not change the state of the server, only retrieves data
router.post('/oauth/google', googleOauthHandler);
router.post('/login', login);
router.post('/register', register);
router.get('/:id', getUser)
router.delete('/:id', remove);

export default router;
