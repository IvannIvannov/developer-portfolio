import type { Request, Response } from "express";

import { generateProjectPlan } from "../services/aiService.js";

type AIRequestBody = {
  description?: string;
  projectType?: string;
};

export const createProjectPlan = async (
  req: Request<Record<string, never>, Record<string, never>, AIRequestBody>,
  res: Response,
) => {
  const { description, projectType } = req.body;

  if (!description?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Project description is required.",
    });
  }

  if (description.trim().length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Project description is too long.",
    });
  }

  if (!projectType?.trim() || projectType.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "Project type is invalid.",
    });
  }

  try {
    const plan = await generateProjectPlan({
      description: description.trim(),

      projectType: projectType.trim(),
    });

    return res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error("AI planner error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate a project plan right now.",
    });
  }
};
