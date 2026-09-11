import { Router } from "express";

import { createProjectPlan } from "../controllers/aiController.js";

const router = Router();

router.post("/project-plan", createProjectPlan);

export default router;
