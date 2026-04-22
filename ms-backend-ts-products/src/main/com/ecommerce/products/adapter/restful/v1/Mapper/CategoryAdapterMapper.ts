import { CategoryAdapter } from "../DTO/CategoryAdapter";
import { CategoryDomain } from "../../../../domain/DTO/CategoryDomain";

export class CategoryAdapterMapper {

  static toDomain(adapter: CategoryAdapter): CategoryDomain {
    return {
      nombre_categoria: adapter.nombre_categoria
    };
  }

  static toResponse(domain: CategoryDomain): object {
    return {
      id: domain.id,
      nombre_categoria: domain.nombre_categoria
    };
  }
}