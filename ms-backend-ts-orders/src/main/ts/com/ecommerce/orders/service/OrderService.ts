import { IOrder } from "../application/IOrder";

export class OrderService {

  constructor(private orderImpl: IOrder) {}

  async getPersonByIdProductById(
    idUsuario: number,
    idProducto: number
  ) {

    return this.orderImpl.getPersonByIdProductById(
      idUsuario,
      idProducto
    );
  }
}