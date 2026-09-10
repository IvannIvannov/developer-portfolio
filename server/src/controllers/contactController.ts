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

  if (!turnstileToken) {
    return res.status(400).json({
      success: false,
      message: "Please complete the security check.",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  try {
    const verification = await verifyTurnstileToken(turnstileToken);

    if (!verification.success) {
      console.warn(
        "Turnstile verification failed:",
        verification["error-codes"],
      );

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
