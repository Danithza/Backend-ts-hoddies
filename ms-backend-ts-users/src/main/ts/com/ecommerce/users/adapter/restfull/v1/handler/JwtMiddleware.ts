import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET no está configurado en las variables de entorno");
}

export interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export class JwtMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Token requerido" });
      return;
    }

    try {
      const token = authHeader.replace("Bearer ", "");

      // Forzamos el tipo a 'string' porque la comprobación if (!SECRET) superior ya asegura su existencia
      const decoded = jwt.verify(token, SECRET as string, {
        algorithms: ["HS256"],
      });

      (req as AuthenticatedRequest).user = decoded;

      next();
    } catch {
      res.status(403).json({ message: "Token inválido" });
    }
  }
}