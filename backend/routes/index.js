
import express from 'express';
const router = express.Router();
// import userRoutes from "./userRoutes";
// import courseRoutes from "./courseRoutes";
import apiRoutes from './apiRoutes.js';

// router.use("/users", userRoutes);
// router.use("/courses", courseRoutes);
router.use('/api', apiRoutes);



export default router;
