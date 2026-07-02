import { Request, Response, NextFunction } from "express";

export const validateContactInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, email, message } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    res
      .status(400)
      .json({ error: "Invalid name. Name must be at least 2 characters." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email address format." });
    return;
  }

  if (!message || typeof message !== "string" || message.trim().length < 5) {
    res
      .status(400)
      .json({
        error: "Invalid message. Message must be at least 5 characters.",
      });
    return;
  }

  next();
};
