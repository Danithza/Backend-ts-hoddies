import { Request, Response, NextFunction } from "express";

export function GlobalExceptionHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {

  console.error("ERROR:", err.message);

  res.status(500).json({
    message: err.message || "Error interno del servidor"
  });
}