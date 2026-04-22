import { Request, Response, NextFunction } from "express";

export function GlobalExceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {

  console.error("ERROR:", err.message);

  res.status(500).json({
    message: err.message || "Error interno del servidor"
  });
}