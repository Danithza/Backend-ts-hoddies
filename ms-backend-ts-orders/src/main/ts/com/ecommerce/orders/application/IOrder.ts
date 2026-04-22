import { OrderDomain } from "../domain/DTO/OrderDomain";

export interface IOrder {
  getPersonByIdProductById(
    idUsuario: number,
    idProducto: number
  ): Promise<OrderDomain | null>;
}