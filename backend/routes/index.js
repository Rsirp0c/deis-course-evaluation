
import express from 'express';
const router = express.Router();


import authRoutes from "./authRoutes.js";
import courseRoutes from './courseRoutes.js';
import evaluationRoutes from './evaluationRoutes.js';




router.use('/api/evaluations', evaluationRoutes);
router.use('/api/courses', courseRoutes);




export default router;
