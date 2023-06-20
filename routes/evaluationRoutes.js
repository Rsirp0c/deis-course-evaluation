import { create, read } from "../controllers/evaluationsController.js";
import express from "express";
const router = express.Router();

router.post("/forms", create);
router.get("/", read);

export default router;