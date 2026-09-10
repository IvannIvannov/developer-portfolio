import { Router } from "express";

import { submitContactForm } from "../controllers/contactController.js";
import { contactRateLimit } from "../middleware/contactRateLimit.js";

const router = Router();

router.post("/", contactRateLimit, submitContactForm);

export default router;
