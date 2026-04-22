import { Router, Request, Response } from "express";
import { ICategory } from "../../../../application/ICategory";

export class CategoryController {
  public router = Router();

  constructor(private service: ICategory) {
    this.routes();
  }

  private routes() {

    // Crear categoría
    this.router.post("/", async (req: Request, res: Response) => {
      try {
        const category = await this.service.create(req.body);
        res.json(category);
      } catch (e: any) {
        res.status(400).json({ message: e.message });
      }
    });

    // Listar todas
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const categories = await this.service.getAll();
        res.json(categories);
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    });

    // Obtener por ID
    this.router.get("/:id", async (req: Request, res: Response) => {
      try {
        const category = await this.service.getById(Number(req.params.id));
        if (!category) return res.status(404).json({ message: "No encontrado" });
        res.json(category);
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    });

    // Actualizar categoría
    this.router.put("/:id", async (req: Request, res: Response) => {
      try {
        const updated = await this.service.update(Number(req.params.id), req.body);
        res.json(updated);
      } catch (e: any) {
        res.status(400).json({ message: e.message });
      }
    });

    // Eliminar categoría
    this.router.delete("/:id", async (req: Request, res: Response) => {
      try {
        await this.service.delete(Number(req.params.id));
        res.json({ message: "Categoría eliminada correctamente" });
      } catch (e: any) {
        res.status(400).json({ message: e.message });
      }
    });

  }
}