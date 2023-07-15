
import express from 'express';
const router = express.Router();
// import userRoutes from "./userRoutes";
// import courseRoutes from "./courseRoutes";

import evaluationRoutes from './evaluationRoutes.js';
// router.use("/users", userRoutes);
// router.use("/courses", courseRoutes);

import courseRoutes from './courseRoutes.js';

router.use('/api/evaluations', evaluationRoutes);
router.use('/api/courses', courseRoutes);



export default router;
