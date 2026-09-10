import type { Request, Response } from "express";

type ContactRequestBody = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

export const submitContactForm = (
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

  console.log("New contact request:", {
    name,
    email,
    projectType,
    budget,
    message,
  });

  return res.status(200).json({
    success: true,
    message: "Your project enquiry has been received.",
  });
};
