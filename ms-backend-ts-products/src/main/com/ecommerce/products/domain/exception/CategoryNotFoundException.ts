export class CategoryNotFoundException extends Error {
  constructor(id: number) {
    super(`Categoría con id ${id} no encontrada`);
    this.name = "CategoryNotFoundException";
  }
}