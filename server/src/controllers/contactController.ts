import type { Request, Response } from "express";

import { sendContactEmail } from "../services/emailService.js";

type ContactRequestBody = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

export const submitContactForm = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    ContactRequestBody
  >,
  res: Response,
) => {
  const { name, email, projectType, budget, message } = req.body;

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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  try {
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
    console.error("Contact email error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your enquiry right now. Please try again later.",
    });
  }
};
