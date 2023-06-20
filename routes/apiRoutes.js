/**
 * Routes that start with /api are API routes. The rest are page routes.
 */
import express from "express";
const router = express.Router();

import { create, read } from "../controllers/evaluationsController.js";

/**
 * Evaluations API routes
 * GET /api/evaluations/forms
 * POST api/v1/evaluations?course=course&semester=semester&professor=professor
 */
router.post("/evaluations/forms", create);
router.get("/evaluations", read);

/**
 * Users API routes
 */  

/**
 * Courses API routes
 */

export default router;
