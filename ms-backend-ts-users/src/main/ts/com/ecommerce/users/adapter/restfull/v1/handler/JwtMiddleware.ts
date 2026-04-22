import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = "SUPER_SECRET";

export class JwtMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Token requerido" });
      return;
    }

    try {
      const token = authHeader.replace("Bearer ", "");

      const decoded = jwt.verify(token, SECRET, {
        algorithms: ["HS256"]
      });

      // 🔥 AQUÍ ESTÁ LO QUE TE FALTABA
      (req as any).user = decoded;

      next();
    } catch {
      res.status(403).json({ message: "Token inválido" });
    }
  }
}