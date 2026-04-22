import { Router, Request, Response } from "express";
import { IOrder } from "../../../../application/IOrder";

export class OrderController {
  public router = Router();

  constructor(private service: IOrder) {
    this.routes();
  }

  private routes() {

    this.router.get("/:idUsuario/:idProducto", async (req: Request, res: Response) => {
      console.log("🔥 ENTRÓ AL CONTROLADOR");

      try {
        const idUsuario = Number(req.params.idUsuario);
        const idProducto = Number(req.params.idProducto);

        console.log("➡️ ANTES DEL SERVICE");

        const data = await this.service.getPersonByIdProductById(
          idUsuario,
          idProducto
        );

        console.log("✅ DESPUÉS DEL SERVICE:", data);

        return res.json(data);

      } catch (e: any) {
        console.error("❌ ERROR:", e);

        return res.status(400).json({
          message: e.message || "Error obteniendo datos"
        });
      }
    });

  }
}