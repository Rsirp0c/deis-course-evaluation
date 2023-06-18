
import express from "express";
const router = express.Router();
// import userRoutes from "./userRoutes";
// import courseRoutes from "./courseRoutes";
// import errorRoutes from "./errorRoutes";
// import apiRoutes from "./apiRoutes";
import evalFormRoutes from "./evalFormRoutes.js";

router.use("/evaluation", evalFormRoutes);
// router.use("/users", userRoutes);
// router.use("/courses", courseRoutes);
// router.use("/api", apiRoutes);
// router.use("/", errorRoutes);


export default router;
