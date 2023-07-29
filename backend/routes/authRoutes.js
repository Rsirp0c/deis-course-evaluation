import express from 'express';
const router = express.Router();


import { googleOauthHandler } from '../controllers/oauthController.js';

/**
 * Auth API routes
 * GET auth/oauth/google
 *
 */
router.get('/oauth/google', googleOauthHandler);	// api for frontend to send a request and obtain a JWT after successful Google OAuth

export default router;
