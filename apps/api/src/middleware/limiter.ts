import { Request, Response, NextFunction } from "express";

const ipRequests = new Map<string, { count: number; resetTime: number }>();
const LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const ip = req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";
  const now = Date.now();

  const record = ipRequests.get(ip);

  if (!record) {
    ipRequests.set(ip, { count: 1, resetTime: now + LIMIT_WINDOW_MS });
    return next();
  }

  if (now > record.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + LIMIT_WINDOW_MS });
    return next();
  }

  record.count += 1;
  if (record.count > MAX_REQUESTS) {
    res.status(429).json({
      error: "Too many requests. Connection rate limited.",
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    });
    return;
  }

  next();
};
