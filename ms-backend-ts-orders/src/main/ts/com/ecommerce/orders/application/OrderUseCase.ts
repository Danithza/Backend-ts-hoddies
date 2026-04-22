import { IOrder } from "./IOrder";

export class OrderUseCase {

  constructor(private orderImpl: IOrder) {}

  async getPersonByIdProductById(idUsuario: number, idProducto: number) {
  if (!idUsuario || !idProducto) {
    throw new Error("Datos inválidos");
  }

  return this.orderImpl.getPersonByIdProductById(idUsuario, idProducto);
}

  async createOrder(data: any) {
    if (!data) {
      throw new Error("Datos vacíos");
    }

    return this.orderImpl.createOrder(data);
  }
}