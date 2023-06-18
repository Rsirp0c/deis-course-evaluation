import { create, read } from "../controllers/evaluationsController.js";
import express from "express";
const router = express.Router();

router.post("/forms", create);
router.get("/forms", read);

export default router;