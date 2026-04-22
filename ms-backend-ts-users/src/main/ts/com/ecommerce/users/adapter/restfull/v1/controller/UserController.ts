import { Router, Request, Response } from "express";
import { IUser } from "../../../../application/IUser";
import { JwtMiddleware } from "../handler/JwtMiddleware";

export class UserController {
  public router = Router();

  constructor(private service: IUser) { 
    this.routes();
  }

  private routes() {
    this.router.post("/register", async (req: Request, res: Response) => {
      const user = await this.service.register(req.body);
      res.json(user);
    });

    this.router.post("/login", async (req: Request, res: Response) => {
      const token = await this.service.login(req.body.correo, req.body.password);
      res.json({ token });
    });

    this.router.get(
      "/profile",
      async (req: any, res: Response) => {
        res.json({
          message: "Acceso autorizado",
          user: req.user
        });
      }
    );


    // Listar todos
this.router.get(
  "/",
  JwtMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    try {
      const users = await this.service.getAll();
      res.json(users);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

// Obtener por ID
this.router.get(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const user = await this.service.getById(Number(req.params.id));
      if (!user) return res.status(404).json({ message: "No encontrado" });
      res.json(user);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

// Actualizar
this.router.put(
  "/:id",
  JwtMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    try {
      const updated = await this.service.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
);

// Desactivar usuario 
this.router.delete(
  "/:id",
  JwtMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    try {
      await this.service.delete(Number(req.params.id));
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
);
  }
}