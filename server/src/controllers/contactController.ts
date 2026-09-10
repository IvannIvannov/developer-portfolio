import type { Request, Response } from "express";

import { sendContactEmail } from "../services/emailService.js";
import { verifyTurnstileToken } from "../services/turnstileService.js";

type ContactRequestBody = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  turnstileToken?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContactForm = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    ContactRequestBody
  >,
  res: Response,
) => {
  const { name, email, projectType, budget, message, turnstileToken } =
    req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !projectType?.trim() ||
    !budget?.trim() ||
    !message?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (name.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "Name is too long.",
    });
  }

  if (email.trim().length > 200) {
    return res.status(400).json({
      success: false,
      message: "Email address is too long.",
    });
  }

  if (projectType.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "Project type is invalid.",
    });
  }

  if (budget.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "Budget value is invalid.",
    });
  }

  if (message.trim().length > 2000) {
    return res.status(400).json({
      success: false,
      message: "Project message is too long.",
    });
  }

  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (!turnstileToken) {
    return res.status(400).json({
      success: false,
      message: "Please complete the security check.",
    });
  }

  try {
    const verification = await verifyTurnstileToken(turnstileToken);

    if (!verification.success) {
      return res.status(403).json({
        success: false,
        message: "Security verification failed. Please try again.",
      });
    }

    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      projectType: projectType.trim(),
      budget: budget.trim(),
      message: message.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "Your project enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your enquiry right now. Please try again later.",
    });
  }
};
