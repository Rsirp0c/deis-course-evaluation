import { create } from "../controllers/evalFormsController";
import router from "express";

router.post("/", create);

export default router;