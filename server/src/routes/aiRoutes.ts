import { Router } from "express";

import { createProjectPlan } from "../controllers/aiController.js";
import { aiRateLimit } from "../middleware/aiRateLimit.js";

const router = Router();

router.post("/project-plan", aiRateLimit, createProjectPlan);

export default router;
