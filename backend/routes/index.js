
import express from 'express';
const router = express.Router();
// import userRoutes from "./userRoutes";
// import courseRoutes from "./courseRoutes";

import evaluationRoutes from './evaluationRoutes.js';
// router.use("/users", userRoutes);
// router.use("/courses", courseRoutes);

router.use('/api/evaluations', evaluationRoutes);



export default router;
