import type { NextFunction, Request, Response } from "express";

export type ErrorHandler = <T extends Error>(
  e: T,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
