/**
 * Routes that start with /api are API routes. The rest are page routes.
 */
import express from "express";
const router = express.Router();

import { create, read } from "../controllers/evaluationsController.js";

router.post("/evaluations/forms", create);
router.get("/evaluations", read);

// import { index, respondJSON, join, errorJSON } from "../controllers/coursesController";
// const usersController = require("../controllers/usersController");

// router.use(usersController.verifyToken);

// router.get("/courses", index, respondJSON);
// router.get(
//   "/courses/:id/join",
//   join,
//   respondJSON
// );
// router.use(errorJSON);

export default router;
