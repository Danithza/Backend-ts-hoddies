import { Router, Request, Response } from "express";
import { IProduct } from "../../../../application/IProduct";

export class ProductController {
  public router = Router();

  constructor(private service: IProduct) {
    this.routes();
  }

  private routes() {

    // Crear producto
    this.router.post("/", async (req: Request, res: Response) => {
      try {
        const product = await this.service.create(req.body);
        res.json(product);
      } catch (e: any) {
        res.status(400).json({ message: e.message });
      }
    });

    // Listar todos
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const products = await this.service.getAll();
        res.json(products);
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    });

    // Obtener por ID
    this.router.get("/:id", async (req: Request, res: Response) => {
      try {
        const product = await this.service.getById(Number(req.params.id));
        if (!product) return res.status(404).json({ message: "No encontrado" });
        res.json(product);
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    });

    // Actualizar producto
    this.router.put("/:id", async (req: Request, res: Response) => {
      try {
        const updated = await this.service.update(Number(req.params.id), req.body);
        res.json(updated);
      } catch (e: any) {
        res.status(400).json({ message: e.message });
      }
    });

    // Eliminar producto
    this.router.delete("/:id", async (req: Request, res: Response) => {
      try {
        await this.service.delete(Number(req.params.id));
        res.json({ message: "Producto eliminado correctamente" });
      } catch (e: any) {
        res.status(400).json({ message: e.message });
      }
    });

  }
}