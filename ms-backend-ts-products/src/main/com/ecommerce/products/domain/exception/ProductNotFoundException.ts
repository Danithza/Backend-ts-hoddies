export class ProductNotFoundException extends Error {
  constructor(id: number) {
    super(`Producto con id ${id} no encontrado`);
    this.name = "ProductNotFoundException";
  }
}