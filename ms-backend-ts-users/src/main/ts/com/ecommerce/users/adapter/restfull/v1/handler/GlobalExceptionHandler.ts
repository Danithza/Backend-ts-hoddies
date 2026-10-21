import { Request, Response, NextFunction } from "express";

export const globalExceptionHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const message = error.message || "Error interno del servidor";

  
  if (
    message.toLowerCase().includes("incorrecta") ||
    message.toLowerCase().includes("inválida") ||
    message.toLowerCase().includes("no encontrado")
  ) {
    res.status(401).json({ message });
    return;
  }

 
  if (error.name === "ValidationError") {
    res.status(400).json({ message });
    return;
  }

  res.status(500).json({ message });
};