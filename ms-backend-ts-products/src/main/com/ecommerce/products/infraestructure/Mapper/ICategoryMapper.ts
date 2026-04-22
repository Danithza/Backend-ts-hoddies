import { CategoryDomain } from "../../domain/DTO/CategoryDomain";
import { CategoryEntity } from "../Entity/CategoryEntity";

export interface ICategoryMapper {
  toDomain(entity: CategoryEntity): CategoryDomain;
  toEntity(domain: CategoryDomain): CategoryEntity;
  toDomainList(entities: CategoryEntity[]): CategoryDomain[];
}