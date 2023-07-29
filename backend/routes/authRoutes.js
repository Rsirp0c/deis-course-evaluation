import express from 'express';
const router = express.Router();


import { googleOauthHandler } from '../controllers/oauthController.js';

router.get('/oauth/google', googleOauthHandler);

export default router;
