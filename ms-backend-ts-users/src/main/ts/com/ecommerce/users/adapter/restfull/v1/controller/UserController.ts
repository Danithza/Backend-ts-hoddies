import { Router, Request, Response, NextFunction } from "express";
import { IUser } from "../../../../application/IUser";
import { JwtMiddleware } from "../handler/JwtMiddleware";

export class UserController {
  public router = Router();

  constructor(private service: IUser) { 
    this.routes();
  }

  private routes() {
    this.router.post(
      "/register", 
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user = await this.service.register(req.body);
          res.status(201).json(user);
        } catch (error) {
          next(error);
        }
      }
    );

    this.router.post(
      "/login", 
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const token = await this.service.login(req.body.correo, req.body.password);
          res.status(200).json({ token });
        } catch (error) {
          next(error);
        }
      }
    );

    // Listar todos
    this.router.get(
      "/",
      JwtMiddleware.verifyToken,
      async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const users = await this.service.getAll();
          res.json(users);
        } catch (error) {
          next(error);
        }
      }
    );

    // Obtener por ID
    this.router.get(
      "/:id",
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user = await this.service.getById(Number(req.params.id));
          res.json(user);
        } catch (error) {
          next(error);
        }
      }
    );

    // Actualizar
    this.router.put(
      "/:id",
      JwtMiddleware.verifyToken,
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const updated = await this.service.update(Number(req.params.id), req.body);
          res.json(updated);
        } catch (error) {
          next(error);
        }
      }
    );

    // Desactivar usuario 
    this.router.delete(
      "/:id",
      JwtMiddleware.verifyToken,
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          await this.service.delete(Number(req.params.id));
          res.json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}