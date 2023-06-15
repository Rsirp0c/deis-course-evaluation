import create from "../controllers/evalFormsController.js";
import express from "express";
const router = express.Router();

router.post("/", create);

export default router;