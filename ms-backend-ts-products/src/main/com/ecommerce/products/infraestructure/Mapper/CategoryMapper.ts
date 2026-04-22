import { ICategoryMapper } from "./ICategoryMapper";
import { CategoryDomain } from "../../domain/DTO/CategoryDomain";
import { CategoryEntity } from "../Entity/CategoryEntity";

export class CategoryMapper implements ICategoryMapper {

  toDomain(entity: CategoryEntity): CategoryDomain {
    return {
      id: entity.id_categoria,
      nombre_categoria: entity.nombre_categoria
    };
  }

  toEntity(domain: CategoryDomain): CategoryEntity {
    const e = new CategoryEntity();
    e.id_categoria = domain.id || 0;
    e.nombre_categoria = domain.nombre_categoria;
    return e;
  }

  toDomainList(entities: CategoryEntity[]): CategoryDomain[] {
    return entities.map(e => this.toDomain(e));
  }
}