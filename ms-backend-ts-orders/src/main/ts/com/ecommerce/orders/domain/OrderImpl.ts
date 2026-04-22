import { IOrder } from "../application/IOrder";
import axios from "axios";

export class OrderImpl implements IOrder {

  private USERS_URL = "http://localhost:3008/dev/users";
  private PRODUCTS_URL = "http://localhost:3005/dev/products";

  async getPersonByIdProductById(idUsuario: number, idProducto: number): Promise<any> {

    try {

      const [userResponse, productResponse] = await Promise.all([
        axios.get(`${this.USERS_URL}/${idUsuario}`, { timeout: 5000 }),
        axios.get(`${this.PRODUCTS_URL}/${idProducto}`, { timeout: 5000 })
      ]);

      if (!userResponse.data) {
        throw new Error("Usuario no existe");
      }

      if (!productResponse.data) {
        throw new Error("Producto no existe");
      }

      return {
        usuario: userResponse.data,
        producto: productResponse.data
      };

    } catch (error: any) {

      if (error.code === "ECONNREFUSED") {
        throw new Error("No se pudo conectar a los microservicios");
      }

      if (error.code === "ECONNABORTED") {
        throw new Error("Timeout: el microservicio no respondió");
      }

      if (error.response) {
        throw new Error(`Error del servicio externo: ${error.response.status}`);
      }

      throw new Error("Error consultando microservicios");
    }
  }
}