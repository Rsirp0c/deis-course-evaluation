import express from 'express';
const router = express.Router();


import { googleOauthHandler } from '../controllers/oauthController.js';

/**
 * Auth API routes
 * GET auth/oauth/google
 *
 */

// Convention to use post to send data to the server and in this case also to retrieve a JWT
// Post: changes the state of the server, can retrieve data
// Get: does not change the state of the server, only retrieves data
router.post('/oauth/google', googleOauthHandler);

export default router;
